import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { 
  ScreenRoute, 
  CartItem, 
  Product, 
  Booking, 
  Order, 
  Enquiry, 
  Review, 
  UserProfile, 
  CategoryType 
} from '../types';
import { 
  SAMPLE_PRODUCTS, 
  INITIAL_BOOKINGS, 
  INITIAL_ORDERS, 
  INITIAL_ENQUIRIES, 
  INITIAL_REVIEWS 
} from '../data/sampleData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  // Navigation & Domain
  currentRoute: ScreenRoute;
  activeTab: 'home' | 'explore' | 'map' | 'cart' | 'profile';
  activeDomain: 'tourism' | 'realtors' | 'artisans';
  setActiveDomain: (domain: 'tourism' | 'realtors' | 'artisans') => void;
  navigate: (route: ScreenRoute) => void;
  goBack: () => void;
  canGoBack: boolean;
  switchTab: (tab: 'home' | 'explore' | 'map' | 'cart' | 'profile') => void;

  // Favourites
  favourites: Set<string>;
  toggleFavourite: (id: string, title?: string) => void;
  isFavourite: (id: string) => boolean;

  // Cart
  cartItems: CartItem[];
  addToCart: (product: Product, selectedVariant?: string, quantity?: number) => void;
  updateQuantity: (productId: string, variant: string | undefined, delta: number) => void;
  removeFromCart: (productId: string, variant?: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartShipping: number;
  cartTax: number;
  cartTotal: number;

  // Orders & Bookings & Enquiries
  orders: Order[];
  placeOrder: (address: Order['address'], paymentMethod: string) => string;
  bookings: Booking[];
  createBooking: (booking: Omit<Booking, 'id' | 'bookingDate' | 'status'>) => string;
  cancelBooking: (id: string) => void;
  enquiries: Enquiry[];
  submitEnquiry: (enquiry: Omit<Enquiry, 'id' | 'submittedAt' | 'status'>) => string;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => void;

  // Auth & Profile
  user: UserProfile;
  isGuest: boolean;
  loginAsDemoUser: () => void;
  logoutToGuest: () => void;
  updateUserProfile: (name: string, phone: string, email: string) => void;

  // Modals & Sheets
  isAiAssistantOpen: boolean;
  setAiAssistantOpen: (open: boolean) => void;
  isHelpSafetyOpen: boolean;
  setHelpSafetyOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;

  // Toast System
  toast: Toast | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;

  // Device Frame Toggle
  isDeviceFrame: boolean;
  toggleDeviceFrame: () => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'usr-101',
  name: 'Alejandro De La Cruz',
  email: 'alejandro.delacruz@oneplace.do',
  phone: '+1 (809) 556-8821',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  isGuest: false,
  savedAddresses: [
    {
      id: 'addr-1',
      label: 'Villa (Casa de Campo)',
      addressLine: 'Villa Palmeras 14, Barranca Este',
      city: 'Casa de Campo, La Romana',
      postalCode: '22000'
    },
    {
      id: 'addr-2',
      label: 'Marina Office',
      addressLine: 'Paseo del Mar, Suite 204, Marina Chavón',
      city: 'La Romana',
      postalCode: '22000'
    }
  ],
  notificationSettings: {
    orderUpdates: true,
    travelDeals: true,
    priceAlerts: false
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [navStack, setNavStack] = useState<ScreenRoute[]>([{ name: 'home' }]);
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'map' | 'cart' | 'profile'>('home');
  const [activeDomain, setActiveDomain] = useState<'tourism' | 'realtors' | 'artisans'>('tourism');
  const [favourites, setFavourites] = useState<Set<string>>(new Set(['place-1', 'pkg-1', 'prod-1', 'prop-1']));
  
  // Shopping Cart state with initial sample item
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: SAMPLE_PRODUCTS[0],
      quantity: 1,
      selectedVariant: '100g Vintage Tin'
    }
  ]);

  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(INITIAL_ENQUIRIES);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);

  // User Auth State
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);
  const [isGuest, setIsGuest] = useState<boolean>(false);

  // Modals
  const [isAiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [isHelpSafetyOpen, setHelpSafetyOpen] = useState(false);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  // Device mockup frame toggle (true = phone frame view, false = full viewport)
  const [isDeviceFrame, setIsDeviceFrame] = useState(true);

  const currentRoute = navStack[navStack.length - 1];
  const canGoBack = navStack.length > 1;

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((curr) => (curr?.id === id ? null : curr));
    }, 2800);
  };

  const navigate = (route: ScreenRoute) => {
    // Determine tab match if root screen
    if (route.name === 'home') setActiveTab('home');
    else if (route.name === 'explore') setActiveTab('explore');
    else if (route.name === 'map') setActiveTab('map');
    else if (route.name === 'cart') setActiveTab('cart');
    else if (route.name === 'profile') setActiveTab('profile');

    setNavStack((prev) => [...prev, route]);
  };

  const handleSetHelpSafetyOpen = (open: boolean) => {
    setHelpSafetyOpen(open);
    if (open) {
      navigate({ name: 'help_safety' });
    }
  };

  const goBack = () => {
    if (navStack.length > 1) {
      setNavStack((prev) => {
        const next = prev.slice(0, prev.length - 1);
        const last = next[next.length - 1];
        if (last.name === 'home') setActiveTab('home');
        else if (last.name === 'explore') setActiveTab('explore');
        else if (last.name === 'map') setActiveTab('map');
        else if (last.name === 'cart') setActiveTab('cart');
        else if (last.name === 'profile') setActiveTab('profile');
        return next;
      });
    }
  };

  const switchTab = (tab: 'home' | 'explore' | 'map' | 'cart' | 'profile') => {
    setActiveTab(tab);
    setNavStack([{ name: tab }]);
  };

  const toggleFavourite = (id: string, title?: string) => {
    setFavourites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast(title ? `Removed "${title}" from Favourites` : 'Removed from Favourites', 'info');
      } else {
        next.add(id);
        showToast(title ? `Saved "${title}" to Favourites` : 'Added to Favourites', 'success');
      }
      return next;
    });
  };

  const isFavourite = (id: string) => favourites.has(id);

  // Cart operations
  const addToCart = (product: Product, selectedVariant?: string, quantity: number = 1) => {
    const variantKey = selectedVariant || (product.variants ? product.variants[0] : undefined);
    setCartItems((prev) => {
      const index = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedVariant === variantKey
      );
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          quantity: updated[index].quantity + quantity
        };
        return updated;
      } else {
        return [...prev, { product, quantity, selectedVariant: variantKey }];
      }
    });
    showToast(`Added ${product.name.slice(0, 24)}... to Cart`, 'success');
  };

  const updateQuantity = (productId: string, variant: string | undefined, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId && item.selectedVariant === variant) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (productId: string, variant?: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedVariant === variant)
      )
    );
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => setCartItems([]);

  const cartCount = useMemo(() => {
    return cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [cartItems]);

  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);
  }, [cartItems]);

  const cartShipping = useMemo(() => (cartSubtotal > 150 || cartSubtotal === 0 ? 0 : 15), [cartSubtotal]);
  const cartTax = useMemo(() => Math.round(cartSubtotal * 0.05), [cartSubtotal]);
  const cartTotal = useMemo(() => cartSubtotal + cartShipping + cartTax, [cartSubtotal, cartShipping, cartTax]);

  // Order Placement
  const placeOrder = (address: Order['address'], paymentMethod: string): string => {
    const newOrderId = `OP-ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      id: newOrderId,
      date: new Date().toISOString().split('T')[0],
      items: [...cartItems],
      subtotal: cartSubtotal,
      shipping: cartShipping,
      tax: cartTax,
      total: cartTotal,
      status: 'Confirmed',
      address,
      paymentMethod
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrderId;
  };

  // Booking Package
  const createBooking = (bookingData: Omit<Booking, 'id' | 'bookingDate' | 'status'>): string => {
    const newBookingId = `OP-PKG-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBooking: Booking = {
      ...bookingData,
      id: newBookingId,
      bookingDate: new Date().toISOString().split('T')[0],
      status: 'Upcoming'
    };
    setBookings((prev) => [newBooking, ...prev]);
    return newBookingId;
  };

  const cancelBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'Cancelled' } : b))
    );
    showToast('Booking cancelled successfully', 'info');
  };

  // Submit Enquiry
  const submitEnquiry = (enquiryData: Omit<Enquiry, 'id' | 'submittedAt' | 'status'>): string => {
    const enquiryId = `ENQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const newEnquiry: Enquiry = {
      ...enquiryData,
      id: enquiryId,
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'Received'
    };
    setEnquiries((prev) => [newEnquiry, ...prev]);
    return enquiryId;
  };

  // Reviews
  const addReview = (reviewData: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'Today',
      helpfulCount: 0
    };
    setReviews((prev) => [newReview, ...prev]);
    showToast('Thank you! Your review has been published.', 'success');
  };

  // Auth
  const loginAsDemoUser = () => {
    setUser(DEFAULT_USER);
    setIsGuest(false);
    showToast('Signed in as Alejandro De La Cruz', 'success');
  };

  const logoutToGuest = () => {
    setUser({
      id: 'guest',
      name: 'Guest Traveler',
      email: '',
      phone: '',
      avatar: '',
      isGuest: true,
      savedAddresses: [],
      notificationSettings: {
        orderUpdates: false,
        travelDeals: false,
        priceAlerts: false
      }
    });
    setIsGuest(true);
    showToast('Switched to Guest mode', 'info');
  };

  const updateUserProfile = (name: string, phone: string, email: string) => {
    setUser((prev) => ({
      ...prev,
      name,
      phone,
      email
    }));
    showToast('Profile updated successfully', 'success');
  };

  const toggleDeviceFrame = () => setIsDeviceFrame((v) => !v);

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        activeTab,
        activeDomain,
        setActiveDomain,
        navigate,
        goBack,
        canGoBack,
        switchTab,
        favourites,
        toggleFavourite,
        isFavourite,
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        cartShipping,
        cartTax,
        cartTotal,
        orders,
        placeOrder,
        bookings,
        createBooking,
        cancelBooking,
        enquiries,
        submitEnquiry,
        reviews,
        addReview,
        user,
        isGuest,
        loginAsDemoUser,
        logoutToGuest,
        updateUserProfile,
        isAiAssistantOpen,
        setAiAssistantOpen,
        isHelpSafetyOpen,
        setHelpSafetyOpen: handleSetHelpSafetyOpen,
        isAuthModalOpen,
        setAuthModalOpen,
        toast,
        showToast,
        isDeviceFrame,
        toggleDeviceFrame
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
