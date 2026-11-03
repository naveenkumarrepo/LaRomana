export type CategoryType = 
  | 'places' 
  | 'packages' 
  | 'guides' 
  | 'hotels' 
  | 'food' 
  | 'properties' 
  | 'shop';

export interface Place {
  id: string;
  name: string;
  location: string;
  state: string;
  rating: number;
  reviewCount: number;
  description: string;
  highlights: string[];
  openingHours: string;
  entryFee: string;
  images: string[];
  category: 'Heritage' | 'Nature' | 'Spiritual' | 'Lakeside' | 'Adventure';
  coords: { x: number; y: number }; // Simulated map percentages (0-100)
  mapAddress: string;
  relatedPlaceIds?: string[];
}

export interface TourPackage {
  id: string;
  name: string;
  destination: string;
  pricePerPerson: number;
  duration: string;
  rating: number;
  reviewCount: number;
  description: string;
  images: string[];
  itinerary: { day: number; title: string; details: string }[];
  inclusions: string[];
  exclusions: string[];
  departureDates: string[];
  meetingPoint: string;
  cancellationPolicy: string;
  guideId?: string;
}

export interface TourGuide {
  id: string;
  name: string;
  avatar: string;
  languages: string[];
  serviceAreas: string[];
  rating: number;
  reviewCount: number;
  perDayFee: number;
  bio: string;
  phone: string;
  email: string;
  experienceYears: number;
  verified: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  priceRange: string;
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  description: string;
  images: string[];
  amenities: string[];
  coords: { x: number; y: number };
  address: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  location: string;
  openingHours: string;
  rating: number;
  reviewCount: number;
  images: string[];
  address: string;
  coords: { x: number; y: number };
  signatureDishes: string[];
  priceLevel: '$' | '$$' | '$$$' | '$$$$';
}

export interface CulinaryDish {
  id: string;
  name: string;
  regionalOrigin: string;
  description: string;
  image: string;
  recommendedSpots: string[];
  vegetarian: boolean;
  priceApprox: number;
}

export interface RealEstateProperty {
  id: string;
  title: string;
  propertyType: 'Luxury Villa' | 'Apartment' | 'Independent House' | 'Land Plot' | string;
  type?: string;
  saleOrRent?: 'Sale' | 'Rent' | string;
  price: number | string;
  priceNumeric?: number;
  priceFormatted: string;
  area: string;
  areaSqm?: number;
  location: string;
  shortDetails: string;
  status: 'Available' | 'Under Offer' | 'Exclusive' | 'Sold' | 'Rented' | string;
  images: string[];
  bedrooms?: number;
  bathrooms?: number;
  furnishing?: string;
  description: string;
  features?: string[];
  mediator: {
    name: string;
    phone: string;
    company?: string;
    experience?: string;
    avatar?: string;
  };
  coords: { x: number; y: number };
  liveViewers?: number;
  badgeTag?: string;
  localityHint?: string;
  estimatedEmi?: string;
  sqftNumber?: number;
}

export interface Product {
  id: string;
  name: string;
  category: 'Spices & Teas' | 'Textiles & Shawls' | 'Handicrafts' | 'Wellness & Pottery' | 'Crafts' | 'Jewelry' | 'Spirits' | 'Cigars' | string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  variants?: string[];
  inStock: boolean;
  stockQuantity?: number;
  sku?: string;
  artisan?: string;
  artisanStory?: string;
  materials?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered';
  address: {
    fullName: string;
    addressLine: string;
    city: string;
    postalCode: string;
    phone: string;
  };
  paymentMethod: string;
}

export interface Booking {
  id: string;
  packageId: string;
  packageName: string;
  destination: string;
  image: string;
  travelDate: string;
  guestsCount: number;
  totalAmount: number;
  bookingDate: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  guestDetails: {
    fullName: string;
    email: string;
    phone: string;
  };
  paymentMethod: string;
}

export interface Enquiry {
  id: string;
  type: 'guide' | 'property';
  targetId: string;
  targetName: string;
  submittedAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  message: string;
  status: 'Received' | 'Under Review' | 'Mediator Contacted';
}

export interface Review {
  id: string;
  targetId: string;
  targetType: 'place' | 'package' | 'guide' | 'hotel' | 'product';
  authorName: string;
  rating: number;
  date: string;
  comment: string;
  helpfulCount: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  isGuest: boolean;
  savedAddresses: {
    id: string;
    label: string;
    addressLine: string;
    city: string;
    postalCode: string;
  }[];
  notificationSettings: {
    orderUpdates: boolean;
    travelDeals: boolean;
    priceAlerts: boolean;
  };
}

export type ScreenRoute =
  | { name: 'home' }
  | { name: 'explore'; initialCategory?: CategoryType; initialQuery?: string }
  | { name: 'map'; focusId?: string }
  | { name: 'cart' }
  | { name: 'profile' }
  | { name: 'place_detail'; id: string }
  | { name: 'package_detail'; id: string }
  | { name: 'package_booking'; id: string }
  | { name: 'guide_detail'; id: string }
  | { name: 'hotel_detail'; id: string }
  | { name: 'food_detail'; id: string }
  | { name: 'property_detail'; id: string }
  | { name: 'product_detail'; id: string }
  | { name: 'my_bookings' }
  | { name: 'my_orders' }
  | { name: 'my_enquiries' }
  | { name: 'favourites' }
  | { name: 'help_safety' };
