import React from 'react';
import { 
  Home, 
  Compass, 
  Map, 
  ShoppingBag, 
  User, 
  Sparkles, 
  Smartphone, 
  Maximize2, 
  Wifi, 
  Battery, 
  Signal, 
  ShieldAlert,
  ArrowLeft,
  UserCheck,
  Building,
  Calendar,
  MessageSquare,
  Key,
  FileText,
  Package,
  Palmtree
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HomeScreen } from '../screens/HomeScreen';
import { ExploreScreen } from '../screens/ExploreScreen';
import { MapScreen } from '../screens/MapScreen';
import { CartScreen } from '../screens/CartScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { PlaceDetailScreen } from '../screens/PlaceDetailScreen';
import { PackageDetailScreen } from '../screens/PackageDetailScreen';
import { GuideDetailScreen } from '../screens/GuideDetailScreen';
import { HotelDetailScreen } from '../screens/HotelDetailScreen';
import { FoodDetailScreen } from '../screens/FoodDetailScreen';
import { PropertyDetailScreen } from '../screens/PropertyDetailScreen';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';
import { MyBookingsScreen } from '../screens/MyBookingsScreen';
import { MyOrdersScreen } from '../screens/MyOrdersScreen';
import { MyEnquiriesScreen } from '../screens/MyEnquiriesScreen';
import { FavouritesScreen } from '../screens/FavouritesScreen';
import { HelpSafetyScreen } from '../screens/HelpSafetyScreen';
import { AiAssistantDrawer } from '../modals/AiAssistantDrawer';
import { AuthModal } from '../modals/AuthModal';

export const MobileShell: React.FC = () => {
  const { 
    currentRoute, 
    activeTab, 
    switchTab, 
    navigate,
    activeDomain,
    setActiveDomain,
    cartCount, 
    toast, 
    isAiAssistantOpen, 
    setAiAssistantOpen,
    isDeviceFrame,
    toggleDeviceFrame
  } = useApp();

  const renderActiveScreen = () => {
    switch (currentRoute.name) {
      case 'home': return <HomeScreen />;
      case 'explore': return <ExploreScreen />;
      case 'map': return <MapScreen />;
      case 'cart': return <CartScreen />;
      case 'profile': return <ProfileScreen />;
      case 'place_detail': return <PlaceDetailScreen id={currentRoute.id} />;
      case 'package_detail': return <PackageDetailScreen id={currentRoute.id} />;
      case 'guide_detail': return <GuideDetailScreen id={currentRoute.id} />;
      case 'hotel_detail': return <HotelDetailScreen id={currentRoute.id} />;
      case 'food_detail': return <FoodDetailScreen id={currentRoute.id} />;
      case 'property_detail': return <PropertyDetailScreen id={currentRoute.id} />;
      case 'product_detail': return <ProductDetailScreen id={currentRoute.id} />;
      case 'my_bookings': return <MyBookingsScreen />;
      case 'my_orders': return <MyOrdersScreen />;
      case 'my_enquiries': return <MyEnquiriesScreen />;
      case 'favourites': return <FavouritesScreen />;
      case 'help_safety': return <HelpSafetyScreen />;
      default: return <HomeScreen />;
    }
  };

  const isMainPage = [
    'home', 
    'explore', 
    'map', 
    'cart', 
    'profile', 
    'my_bookings', 
    'my_orders', 
    'my_enquiries', 
    'favourites', 
    'help_safety'
  ].includes(currentRoute.name);

  return (
    <div className="h-screen w-full bg-slate-100 flex flex-col items-center justify-center p-0 sm:p-2 md:p-3 overflow-hidden select-none font-sans">
      
      {/* Top Prototype Controls Toolbar */}
      <header className="w-full max-w-md mb-1.5 hidden sm:flex items-center justify-between text-xs text-slate-600 px-3 shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-slate-900 text-sm tracking-tight flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 shadow-xs" />
            OnePlace
          </span>
          <span className="text-[10px] text-slate-500 font-medium">La Romana · Dominican Republic</span>
        </div>

        <button
          onClick={toggleDeviceFrame}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-slate-900 shadow-xs transition-colors cursor-pointer"
          title="Toggle Smartphone Mockup Frame"
        >
          {isDeviceFrame ? <Maximize2 className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
          <span className="font-medium">{isDeviceFrame ? 'Fluid View' : 'Phone Frame'}</span>
        </button>
      </header>

      {/* Mobile Smartphone Viewport / Container */}
      <div
        className={`w-full max-w-md h-full sm:h-[min(844px,calc(100vh-3.25rem))] bg-[#F8FAFC] flex flex-col relative overflow-hidden transform translate-x-0 transition-all duration-300 ${
          isDeviceFrame
            ? 'sm:rounded-[48px] sm:shadow-[0_25px_60px_-15px_rgba(15,23,42,0.14),0_0_0_10px_#E2E8F0,0_0_0_12px_#CBD5E1]'
            : 'sm:rounded-2xl sm:shadow-xl border border-slate-200'
        }`}
      >
        {/* Android Hardware Camera Punch-hole Notch */}
        {isDeviceFrame && (
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-50 w-28 h-5 bg-slate-900 rounded-full flex items-center justify-center pointer-events-none hidden sm:flex">
            <div className="w-3 h-3 rounded-full bg-slate-800 border border-slate-700" />
          </div>
        )}

        {/* Android Status Bar Simulation */}
        <div className="shrink-0 h-10 px-6 flex items-center justify-between text-[11px] font-semibold text-slate-800 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100">
          <span>09:41</span>
          <div className="flex items-center gap-2 text-slate-700">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <div className="flex items-center gap-1">
              <span className="text-[10px] tabular-nums font-bold">98%</span>
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>



        {/* Main Scrollable App Screen Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative no-scrollbar bg-[#F8FAFC]">
          {renderActiveScreen()}
        </main>

        {/* Floating AI Assistant Trigger Button (Bottom Right - Root Tabs) */}
        {!isAiAssistantOpen && isMainPage && (
          <div className="absolute right-4 bottom-20 z-40 animate-in fade-in duration-300">
            <button
              onClick={() => setAiAssistantOpen(true)}
              className="group relative flex items-center gap-2 pl-3.5 pr-4 py-2.5 rounded-full bg-white text-slate-900 shadow-xl border border-teal-500/30 hover:border-teal-500 hover:shadow-teal-500/10 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title="Ask OnePlace AI Assistant"
            >
              <div className="relative">
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-teal-500 animate-ping" />
                <span className="w-2 h-2 rounded-full bg-teal-500 block" />
              </div>
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span className="text-xs font-extrabold tracking-tight text-slate-900">AI Guide</span>
            </button>
          </div>
        )}

        {/* Toast Notification Container */}
        {toast && (
          <div className="absolute top-12 left-4 right-4 z-50 animate-in slide-in-from-top duration-200">
            <div className={`p-3 rounded-2xl shadow-xl backdrop-blur-md flex items-center justify-between text-xs font-semibold ${
              toast.type === 'success'
                ? 'bg-teal-600 text-white shadow-teal-600/20'
                : toast.type === 'error'
                ? 'bg-rose-600 text-white shadow-rose-600/20'
                : 'bg-slate-900 text-white border border-slate-800'
            }`}>
              <span>{toast.message}</span>
            </div>
          </div>
        )}

        {/* Persistent Bottom Navigation Bar with Dynamic Destinations per Portal Domain */}
        {isMainPage && (() => {
          const items = 
            activeDomain === 'realtors' ? [
              { id: 'home', label: 'Listings', icon: Key, action: () => navigate({ name: 'home' }) },
              { id: 'my_enquiries', label: 'Enquiries', icon: FileText, action: () => navigate({ name: 'my_enquiries' }) },
              { id: 'map', label: 'Map', icon: Map, action: () => switchTab('map') },
              { id: 'profile', label: 'Profile', icon: User, action: () => switchTab('profile') }
            ] : activeDomain === 'artisans' ? [
              { id: 'shop', label: 'Market', icon: ShoppingBag, action: () => navigate({ name: 'explore', initialCategory: 'shop' }) },
              { id: 'artisans', label: 'Artisans', icon: Sparkles, action: () => navigate({ name: 'explore', initialCategory: 'shop' }) },
              { id: 'my_orders', label: 'Orders', icon: Package, action: () => navigate({ name: 'my_orders' }) },
              { id: 'cart', label: 'Cart', icon: ShoppingBag, badge: cartCount, action: () => switchTab('cart') },
              { id: 'profile', label: 'Profile', icon: User, action: () => switchTab('profile') }
            ] : [
              { id: 'home', label: 'Explore', icon: Compass, action: () => navigate({ name: 'home' }) },
              { id: 'guides', label: 'Guides', icon: UserCheck, action: () => navigate({ name: 'explore', initialCategory: 'guides' }) },
              { id: 'my_bookings', label: 'Bookings', icon: Calendar, action: () => navigate({ name: 'my_bookings' }) },
              { id: 'cart', label: 'Cart', icon: ShoppingBag, badge: cartCount, action: () => switchTab('cart') },
              { id: 'profile', label: 'Profile', icon: User, action: () => switchTab('profile') }
            ];

          const activeColor = 
            activeDomain === 'realtors' ? 'text-amber-600' :
            activeDomain === 'artisans' ? 'text-rose-600' :
            'text-teal-600';

          return (
            <nav 
              className="shrink-0 h-16 bg-white/95 backdrop-blur-md border-t border-slate-200/90 grid items-center px-1 z-40 relative shadow-sm"
              style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
            >
              {items.map((tab) => {
                const Icon = tab.icon;
                const isSelected = 
                  currentRoute.name === tab.id || 
                  (tab.id === 'home' && currentRoute.name === 'home') ||
                  (tab.id === 'cart' && activeTab === 'cart') ||
                  (tab.id === 'profile' && activeTab === 'profile') ||
                  (tab.id === 'map' && activeTab === 'map');

                return (
                  <button
                    key={tab.id + tab.label}
                    onClick={tab.action}
                    className="flex flex-col items-center justify-center h-full relative group cursor-pointer focus:outline-none min-h-[44px]"
                  >
                    <div className="relative">
                      <Icon
                        className={`w-5 h-5 transition-transform duration-200 ${
                          isSelected
                            ? `${activeColor} scale-110`
                            : 'text-slate-400 group-hover:text-slate-600'
                        }`}
                      />
                      {tab.badge !== undefined && tab.badge > 0 && (
                        <span className={`absolute -top-1.5 -right-2 px-1.5 py-0.2 rounded-full text-white font-black text-[9px] tabular-nums shadow-xs ${
                          activeDomain === 'realtors' ? 'bg-amber-500' :
                          activeDomain === 'artisans' ? 'bg-rose-500' :
                          'bg-teal-500'
                        }`}>
                          {tab.badge}
                        </span>
                      )}
                    </div>

                    <span
                      className={`text-[10px] font-semibold mt-1 tracking-tight transition-colors ${
                        isSelected
                          ? `${activeColor} font-bold`
                          : 'text-slate-500'
                      }`}
                    >
                      {tab.label}
                    </span>

                    {/* Active tab pill indicator */}
                    {isSelected && (
                      <span className={`absolute bottom-1 w-1 h-1 rounded-full ${
                        activeDomain === 'realtors' ? 'bg-amber-600' :
                        activeDomain === 'artisans' ? 'bg-rose-600' :
                        'bg-teal-600'
                      }`} />
                    )}
                  </button>
                );
              })}
            </nav>
          );
        })()}

        {/* Android Bottom Navigation Pill Gesture Handle */}
        <div className="shrink-0 h-4 bg-white/95 flex items-center justify-center pointer-events-none pb-1">
          <div className="w-32 h-1 bg-slate-300 rounded-full" />
        </div>

        {/* Global Modals & Drawers - Strictly Contained in Mobile Chassis */}
        <AiAssistantDrawer />
        <AuthModal />

      </div>

    </div>
  );
};
