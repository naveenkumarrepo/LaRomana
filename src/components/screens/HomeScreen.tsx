import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  MapPin, 
  Bell, 
  Sparkles, 
  ShieldAlert, 
  Compass, 
  Package, 
  UserCheck, 
  Building, 
  Utensils, 
  ShoppingBag, 
  ChevronRight, 
  ChevronLeft,
  Heart, 
  ArrowRight,
  Star,
  Palmtree,
  Key,
  ShieldCheck,
  Check,
  MessageSquare,
  Clock,
  Sparkle,
  Copy,
  Tag,
  Info,
  X,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Languages,
  Filter,
  Calendar,
  ListFilter,
  Zap,
  Home
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { 
  SAMPLE_PLACES, 
  SAMPLE_PACKAGES, 
  SAMPLE_GUIDES,
  SAMPLE_HOTELS, 
  SAMPLE_PRODUCTS, 
  SAMPLE_PROPERTIES 
} from '../../data/sampleData';
import { RealEstateProperty, TourPackage, TourGuide } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { StarRating } from '../common/StarRating';
import { EnquiryModal } from '../modals/EnquiryModal';
import { BookingFlowModal } from '../modals/BookingFlowModal';

export const HomeScreen: React.FC = () => {
  const { 
    navigate, 
    toggleFavourite, 
    isFavourite, 
    setAiAssistantOpen, 
    setHelpSafetyOpen, 
    user, 
    showToast,
    addToCart,
    cartCount,
    cartTotal,
    switchTab,
    activeDomain,
    setActiveDomain
  } = useApp();

  const [currentLocation, setCurrentLocation] = useState('La Romana, Dominican Republic');
  const [selectedVillaEnquiry, setSelectedVillaEnquiry] = useState<RealEstateProperty | null>(null);
  const [selectedPackageBooking, setSelectedPackageBooking] = useState<TourPackage | null>(null);
  const [selectedGuideEnquiry, setSelectedGuideEnquiry] = useState<TourGuide | null>(null);

  // Tourism Interface Workflow: Filters & Itinerary State
  const [tourismDestination, setTourismDestination] = useState<string>('all');
  const [tourismLanguage, setTourismLanguage] = useState<string>('all');
  const [tourismDuration, setTourismDuration] = useState<string>('all');
  const [tourismPriceRange, setTourismPriceRange] = useState<string>('all');
  const [tourismSearch, setTourismSearch] = useState<string>('');
  const [expandedItineraries, setExpandedItineraries] = useState<Record<string, boolean>>({});

  // Realtors Interface Workflow State
  const [realtorCategoryFilter, setRealtorCategoryFilter] = useState<string>('all');
  const [realtorSearchQuery, setRealtorSearchQuery] = useState<string>('');
  const [propertyImageIndexes, setPropertyImageIndexes] = useState<Record<string, number>>({});

  const nextPropertyImage = (e: React.MouseEvent, propId: string, maxImages: number) => {
    e.stopPropagation();
    setPropertyImageIndexes((prev) => ({
      ...prev,
      [propId]: ((prev[propId] || 0) + 1) % maxImages
    }));
  };

  const prevPropertyImage = (e: React.MouseEvent, propId: string, maxImages: number) => {
    e.stopPropagation();
    setPropertyImageIndexes((prev) => ({
      ...prev,
      [propId]: ((prev[propId] || 0) - 1 + maxImages) % maxImages
    }));
  };

  const toggleItinerary = (pkgId: string) => {
    setExpandedItineraries((prev) => ({
      ...prev,
      [pkgId]: !prev[pkgId]
    }));
  };

  // Sponsored Advertisement state
  const [isAdDismissed, setIsAdDismissed] = useState(false);
  const [isAdCopied, setIsAdCopied] = useState(false);
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);

  // Multi-Banner Carousel State
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isBannerAutoPlay, setIsBannerAutoPlay] = useState(true);
  const packageScrollRef = useRef<HTMLDivElement>(null);

  const tourismCategories = [
    { id: 'places', label: 'Places', icon: Compass, color: 'bg-teal-50 text-teal-600 border border-teal-100' },
    { id: 'packages', label: 'Packages', icon: Package, color: 'bg-blue-50 text-blue-600 border border-blue-100' },
    { id: 'guides', label: 'Guides', icon: UserCheck, color: 'bg-emerald-50 text-emerald-600 border border-emerald-100' },
    { id: 'hotels', label: 'Hotels', icon: Building, color: 'bg-indigo-50 text-indigo-600 border border-indigo-100' },
    { id: 'food', label: 'Dining', icon: Utensils, color: 'bg-rose-50 text-rose-600 border border-rose-100' },
  ];

  // Domain-Specific Promotional Banners for Home Screen Carousel
  const domainBannersMap: Record<string, Array<{
    id: string;
    tag: string;
    title: string;
    subtitle: string;
    priceBadge: string;
    ctaText: string;
    image: string;
    action: () => void;
    badgeColor: string;
    accentColor: string;
  }>> = {
    tourism: [
      {
        id: 'banner-saona',
        tag: 'EXCLUSIVE EXCURSION · BAYAHÍBE',
        title: 'Saona Island VIP Catamaran & Lobster Feast',
        subtitle: 'Sail turquoise lagoons, starfish sandbars & enjoy open aged rum bar.',
        priceBadge: 'From $135 USD / person',
        ctaText: 'Book Catamaran',
        image: '/assets/images/hero_isla_saona_caribbean_1793268342016.jpg',
        action: () => navigate({ name: 'package_detail', id: 'pkg-1' }),
        badgeColor: 'bg-teal-600 text-white',
        accentColor: 'text-teal-600'
      },
      {
        id: 'banner-chavon',
        tag: 'HISTORIC WONDER · RÍO CHAVÓN',
        title: 'Altos de Chavón & Riverboat Canyon Cruise',
        subtitle: '16th-century Mediterranean stone artistry, amphitheater & paddleboat.',
        priceBadge: 'From $95 USD / person',
        ctaText: 'Explore Chavón',
        image: '/assets/images/altos_de_chavon_village_1793268343997.jpg',
        action: () => navigate({ name: 'package_detail', id: 'pkg-2' }),
        badgeColor: 'bg-indigo-600 text-white',
        accentColor: 'text-indigo-600'
      },
      {
        id: 'banner-catalina',
        tag: 'MARINE SANCTUARY · ISLA CATALINA',
        title: 'The Wall Coral Drop-off & Beach Lounge',
        subtitle: 'Plunge into 100m coral drop-offs with sea turtles & stingrays.',
        priceBadge: 'From $120 USD / person',
        ctaText: 'Discover Catalina',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
        action: () => navigate({ name: 'package_detail', id: 'pkg-3' }),
        badgeColor: 'bg-sky-600 text-white',
        accentColor: 'text-sky-600'
      },
      {
        id: 'banner-maravillas',
        tag: 'TAÍNO HERITAGE · CUEVA MARAVILLAS',
        title: 'Ancient Caverns & Organic Cacao Plantation Safari',
        subtitle: 'Subterranean mirror lagoon, indigenous pictographs & chocolate tasting.',
        priceBadge: 'From $85 USD / person',
        ctaText: 'Explore Caverns',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
        action: () => navigate({ name: 'package_detail', id: 'pkg-4' }),
        badgeColor: 'bg-emerald-600 text-white',
        accentColor: 'text-emerald-600'
      }
    ],
    realtors: [
      {
        id: 'banner-realestate-1',
        tag: 'PRIME REAL ESTATE · CASA DE CAMPO',
        title: 'Casa de Campo Oceanfront Villas & Golf Estates',
        subtitle: 'Freehold Caribbean property, private yacht docks & Pete Dye greens.',
        priceBadge: 'From $1,850,000 USD',
        ctaText: 'View Residences',
        image: '/assets/images/casa_de_campo_villa_caribbean_1793268344505.jpg',
        action: () => navigate({ name: 'property_detail', id: 'prop-1' }),
        badgeColor: 'bg-amber-600 text-white',
        accentColor: 'text-amber-700'
      },
      {
        id: 'banner-realestate-2',
        tag: 'EXCLUSIVE PENTHOUSE · VISTA CHAVÓN',
        title: '2 BHK Flat In Provident Park Squarepark One For Sale',
        subtitle: 'Turnkey luxury penthouse with stone balcony overlooking Dye Fore golf.',
        priceBadge: '$500,000 USD (₹ 50 Lacs eq.)',
        ctaText: 'Contact Realtor',
        image: '/assets/images/altos_de_chavon_village_1793268343997.jpg',
        action: () => navigate({ name: 'property_detail', id: 'prop-2' }),
        badgeColor: 'bg-rose-600 text-white',
        accentColor: 'text-rose-700'
      },
      {
        id: 'banner-realestate-3',
        tag: 'MARINA CONDO · BAYAHÍBE COAST',
        title: '3 BHK Beachfront Sunset Condominium',
        subtitle: 'Steps from catamaran docks with high rental return yield.',
        priceBadge: '$340,000 USD',
        ctaText: 'Explore Condo',
        image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80',
        action: () => navigate({ name: 'property_detail', id: 'prop-3' }),
        badgeColor: 'bg-indigo-600 text-white',
        accentColor: 'text-indigo-700'
      }
    ],
    artisans: [
      {
        id: 'banner-artisan-1',
        tag: 'AUTHENTIC HANDMADE · DIRECT ARTISANS',
        title: 'Rare Blue Larimar & Hand-Rolled Master Cigars',
        subtitle: 'Certified volcanic pectolite gems from Barahona & aged torpedoes.',
        priceBadge: 'Up to 20% OFF · Free Courier $150+',
        ctaText: 'Shop Artisans',
        image: '/assets/images/dominican_larimar_cigar_craft_1793268344267.jpg',
        action: () => navigate({ name: 'explore', initialCategory: 'shop' }),
        badgeColor: 'bg-rose-600 text-white',
        accentColor: 'text-rose-600'
      },
      {
        id: 'banner-artisan-2',
        tag: 'MASTER TABAQUEROS · LA ROMANA ATELIER',
        title: 'Hand-Rolled La Romana Robusto Cigars (Box of 10)',
        subtitle: 'Aged Dominican Piloto Cubano long-fillers in cedar humidor box.',
        priceBadge: '$180 USD (20% OFF)',
        ctaText: 'Buy Cigars',
        image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80',
        action: () => navigate({ name: 'product_detail', id: 'prod-2' }),
        badgeColor: 'bg-amber-600 text-white',
        accentColor: 'text-amber-600'
      },
      {
        id: 'banner-artisan-3',
        tag: 'AGED RESERVE · ONYX FILTERED',
        title: 'Ron Barceló Imperial Onyx Cask Blend',
        subtitle: 'Filtered through Dominican onyx stones with notes of roasted oak & cocoa.',
        priceBadge: '$75 USD / 750ml',
        ctaText: 'Order Reserve',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80',
        action: () => navigate({ name: 'product_detail', id: 'prod-3' }),
        badgeColor: 'bg-purple-600 text-white',
        accentColor: 'text-purple-600'
      }
    ]
  };

  const promoBanners = domainBannersMap[activeDomain] || domainBannersMap.tourism;

  // Reset slide index when switching domains
  useEffect(() => {
    setCurrentBannerIndex(0);
  }, [activeDomain]);

  // Safe active banner index calculation
  const safeBannerIndex = currentBannerIndex % promoBanners.length;
  const currentBanner = promoBanners[safeBannerIndex] || promoBanners[0];

  // Auto-play timer for Hero Banner Carousel
  useEffect(() => {
    if (!isBannerAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % promoBanners.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isBannerAutoPlay, promoBanners.length]);

  const nextBanner = () => {
    setCurrentBannerIndex((prev) => (prev + 1) % promoBanners.length);
  };

  const prevBanner = () => {
    setCurrentBannerIndex((prev) => (prev - 1 + promoBanners.length) % promoBanners.length);
  };

  const scrollPackages = (direction: 'left' | 'right') => {
    if (packageScrollRef.current) {
      const offset = direction === 'left' ? -280 : 280;
      packageScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="pb-28 space-y-6 animate-in fade-in duration-200">
      
      {/* Top Welcome & Location Header */}
      <div className="pt-2 px-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
            <button 
              type="button"
              onClick={() => {
                const locations = [
                  'La Romana, Dominican Republic', 
                  'Casa de Campo Marina', 
                  'Bayahíbe Beach Coast', 
                  'Altos de Chavón', 
                  'Isla Saona'
                ];
                const next = locations[(locations.indexOf(currentLocation) + 1) % locations.length];
                setCurrentLocation(next);
                showToast(`Location set to ${next}`, 'info');
              }}
              className="text-xs font-bold text-slate-800 hover:text-teal-600 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span className="truncate max-w-[200px]">{currentLocation}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate({ name: 'help_safety' })}
              className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer border border-slate-200/80"
              title="Help & Safety / Politur"
            >
              <ShieldAlert className="w-4 h-4 text-amber-500" />
            </button>
            <button
              onClick={() => showToast('All notifications are up to date.', 'info')}
              className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:text-teal-600 hover:bg-teal-50 transition-colors cursor-pointer border border-slate-200/80"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div>
          <span className="text-xs font-semibold text-slate-500 block">
            {user.isGuest ? 'Welcome Explorer,' : `¡Hola, ${user.name.split(' ')[0]}! 👋`}
          </span>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            OnePlace · La Romana
          </h1>
        </div>
      </div>

      {/* 3 Pillar Sector Switcher (Segmented Control - Colourful & Vibrant UI) */}
      <div className="px-4">
        <div className="p-1.5 rounded-2xl bg-gradient-to-r from-teal-50 via-amber-50 to-rose-50 border border-slate-200 shadow-sm flex items-center gap-1.5 text-xs relative overflow-hidden">
          <button
            type="button"
            onClick={() => setActiveDomain('tourism')}
            className={`flex-1 py-2.5 px-3 rounded-xl font-extrabold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
              activeDomain === 'tourism'
                ? 'bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 text-white shadow-md shadow-teal-500/30 scale-[1.02]'
                : 'text-teal-900 hover:bg-teal-100/60'
            }`}
          >
            <div className={`p-1 rounded-lg transition-colors ${activeDomain === 'tourism' ? 'bg-white/20' : 'bg-teal-500/10 text-teal-700'}`}>
              <Palmtree className="w-3.5 h-3.5" />
            </div>
            <span className="tracking-tight text-xs">Tourism</span>
            {activeDomain === 'tourism' && (
              <span className="w-1.5 h-1.5 rounded-full bg-teal-200 animate-pulse" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveDomain('realtors')}
            className={`flex-1 py-2.5 px-3 rounded-xl font-extrabold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
              activeDomain === 'realtors'
                ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-slate-950 shadow-md shadow-amber-500/30 scale-[1.02]'
                : 'text-amber-950 hover:bg-amber-100/60'
            }`}
          >
            <div className={`p-1 rounded-lg transition-colors ${activeDomain === 'realtors' ? 'bg-slate-950/20' : 'bg-amber-500/10 text-amber-700'}`}>
              <Key className="w-3.5 h-3.5" />
            </div>
            <span className="tracking-tight text-xs">Realtors</span>
            {activeDomain === 'realtors' && (
              <span className="w-1.5 h-1.5 rounded-full bg-amber-200 animate-pulse" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveDomain('artisans')}
            className={`flex-1 py-2.5 px-3 rounded-xl font-extrabold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
              activeDomain === 'artisans'
                ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white shadow-md shadow-rose-500/30 scale-[1.02]'
                : 'text-rose-950 hover:bg-rose-100/60'
            }`}
          >
            <div className={`p-1 rounded-lg transition-colors ${activeDomain === 'artisans' ? 'bg-white/20' : 'bg-rose-500/10 text-rose-700'}`}>
              <ShoppingBag className="w-3.5 h-3.5" />
            </div>
            <span className="tracking-tight text-xs">Artisans</span>
            {activeDomain === 'artisans' && (
              <span className="w-1.5 h-1.5 rounded-full bg-pink-200 animate-pulse" />
            )}
          </button>
        </div>
      </div>

      {/* =========================================================================
          HERO PROMOTIONAL BANNERS CAROUSEL & ELEGANT FILTER SYSTEM
      ========================================================================= */}
      <div 
        className="px-4 space-y-3.5"
        onMouseEnter={() => setIsBannerAutoPlay(false)}
        onMouseLeave={() => setIsBannerAutoPlay(true)}
      >
        {/* Luxury Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-md border border-slate-200/90 bg-white">
          
          {/* Active Banner Slide */}
          <div 
            onClick={currentBanner.action}
            className="relative aspect-[16/9] w-full overflow-hidden cursor-pointer group bg-slate-100"
          >
            <ImageWithFallback
              src={currentBanner.image}
              alt={currentBanner.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />
            
            {/* Category Badge Top Left */}
            <div className="absolute top-3 left-3 z-10">
              <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full tracking-wider uppercase shadow-xs ${currentBanner.badgeColor}`}>
                {currentBanner.tag}
              </span>
            </div>

            {/* Slide Counter Top Right */}
            <div className="absolute top-3 right-3 z-10 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-extrabold text-white border border-white/20">
              {safeBannerIndex + 1} / {promoBanners.length}
            </div>

            {/* Banner Information Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white space-y-1.5 z-10">
              <h2 className="text-base sm:text-lg font-black leading-tight text-white drop-shadow-md">
                {currentBanner.title}
              </h2>
              
              <p className="text-xs text-slate-200 line-clamp-1 font-medium">
                {currentBanner.subtitle}
              </p>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-black text-amber-300 drop-shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  {currentBanner.priceBadge}
                </span>

                <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs transition-all shadow-md active:scale-95">
                  <span>{currentBanner.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>



          {/* Active Dot Indicators */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
            {promoBanners.map((banner, index) => (
              <button
                key={banner.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentBannerIndex(index);
                }}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentBannerIndex === index
                    ? 'w-6 h-1.5 bg-teal-400 shadow-xs'
                    : 'w-1.5 h-1.5 bg-white/60 hover:bg-white'
                }`}
                title={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

        </div>

        {/* ELEGANT INTERACTIVE TOURISM FILTERS PANEL */}
        {activeDomain === 'tourism' && (
          <div className="p-3.5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-900">
                <Filter className="w-4 h-4 text-teal-600" />
                <span>Filter Tour Experiences</span>
              </div>
              {(tourismDestination !== 'all' || tourismDuration !== 'all' || tourismPriceRange !== 'all' || tourismSearch.trim() !== '') && (
                <button
                  type="button"
                  onClick={() => {
                    setTourismDestination('all');
                    setTourismDuration('all');
                    setTourismPriceRange('all');
                    setTourismSearch('');
                    showToast('Filters reset', 'info');
                  }}
                  className="text-[10px] font-bold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                  <span>Reset All</span>
                </button>
              )}
            </div>

            {/* Live Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={tourismSearch}
                onChange={(e) => setTourismSearch(e.target.value)}
                placeholder="Search Saona, catamaran, diving, cave, river..."
                className="w-full pl-8 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {tourismSearch && (
                <button
                  type="button"
                  onClick={() => setTourismSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Destination Filters */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Destination:
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                {[
                  { id: 'all', label: 'All Places' },
                  { id: 'saona', label: 'Bayahíbe / Saona' },
                  { id: 'casadecampo', label: 'Casa de Campo' },
                  { id: 'chavon', label: 'Altos de Chavón' },
                  { id: 'catalina', label: 'Isla Catalina' }
                ].map((dest) => {
                  const isActive = tourismDestination === dest.id;
                  return (
                    <button
                      key={dest.id}
                      type="button"
                      onClick={() => setTourismDestination(dest.id)}
                      className={`px-2.5 py-1 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer border ${
                        isActive
                          ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      {dest.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Duration & Price Range Controls */}
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
              {/* Duration Filter */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Duration:
                </label>
                <div className="p-0.5 rounded-xl bg-slate-100 flex items-center gap-0.5 text-[11px]">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'full', label: 'Full Day' },
                    { id: 'half', label: 'Half Day' }
                  ].map((dur) => (
                    <button
                      key={dur.id}
                      type="button"
                      onClick={() => setTourismDuration(dur.id)}
                      className={`flex-1 py-1 rounded-lg font-bold transition-all text-center cursor-pointer ${
                        tourismDuration === dur.id
                          ? 'bg-white text-teal-700 shadow-2xs'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {dur.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Price Rate:
                </label>
                <select
                  value={tourismPriceRange}
                  onChange={(e) => setTourismPriceRange(e.target.value)}
                  className="w-full py-1 px-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                >
                  <option value="all">All Rates ($85 – $135+)</option>
                  <option value="under100">Under $100 USD</option>
                  <option value="100to150">$100 – $150 USD</option>
                  <option value="above150">Above $150 USD</option>
                </select>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* =========================================================================
          PILLAR 1: TOURISM & GUIDED EXPEDITIONS WORKFLOW
          Order: Interactive Filters -> Tourist Guides List -> Tour Packages with Proper Itineraries
      ========================================================================= */}
      {(activeDomain === 'tourism') && (() => {
        // Dynamic filtering for Tourism Guides
        const filteredGuides = SAMPLE_GUIDES.filter((guide) => {
          if (tourismLanguage !== 'all' && !guide.languages.includes(tourismLanguage)) {
            return false;
          }
          if (tourismDestination !== 'all') {
            const matchArea = guide.serviceAreas.some((area) =>
              area.toLowerCase().includes(tourismDestination.toLowerCase())
            );
            if (!matchArea) return false;
          }
          if (tourismSearch.trim()) {
            const q = tourismSearch.toLowerCase().trim();
            const match =
              guide.name.toLowerCase().includes(q) ||
              guide.bio.toLowerCase().includes(q) ||
              guide.serviceAreas.some((a) => a.toLowerCase().includes(q)) ||
              guide.languages.some((l) => l.toLowerCase().includes(q));
            if (!match) return false;
          }
          return true;
        });

        // Dynamic filtering for Tour Packages
        const filteredPackages = SAMPLE_PACKAGES.filter((pkg) => {
          if (tourismDestination !== 'all') {
            const matchDest =
              pkg.destination.toLowerCase().includes(tourismDestination.toLowerCase()) ||
              pkg.name.toLowerCase().includes(tourismDestination.toLowerCase());
            if (!matchDest) return false;
          }
          if (tourismDuration === 'full' && !pkg.duration.toLowerCase().includes('full') && !pkg.duration.includes('8') && !pkg.duration.includes('6')) {
            return false;
          }
          if (tourismDuration === 'half' && !pkg.duration.toLowerCase().includes('half') && !pkg.duration.includes('4') && !pkg.duration.includes('5')) {
            return false;
          }
          if (tourismPriceRange === 'under100' && pkg.pricePerPerson >= 100) {
            return false;
          }
          if (tourismPriceRange === '100to150' && (pkg.pricePerPerson < 100 || pkg.pricePerPerson > 150)) {
            return false;
          }
          if (tourismPriceRange === 'above150' && pkg.pricePerPerson <= 150) {
            return false;
          }
          if (tourismSearch.trim()) {
            const q = tourismSearch.toLowerCase().trim();
            const match =
              pkg.name.toLowerCase().includes(q) ||
              pkg.destination.toLowerCase().includes(q) ||
              pkg.description.toLowerCase().includes(q) ||
              pkg.itinerary.some((item) => item.title.toLowerCase().includes(q) || item.details.toLowerCase().includes(q));
            if (!match) return false;
          }
          return true;
        });

        const isAnyFilterActive = tourismDestination !== 'all' || tourismLanguage !== 'all' || tourismDuration !== 'all' || tourismSearch.trim() !== '';

        return (
          <section className="space-y-4">
            
            
            



            {/* =====================================================================
                2. TOUR PACKAGES GRID ("show more package lists as a grid")
            ===================================================================== */}
            <div className="px-4 space-y-3.5 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Package className="w-4 h-4 text-teal-600" />
                    <h3 className="text-sm font-extrabold text-slate-900">
                      Tour Packages & Expeditions
                    </h3>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-teal-50 text-teal-700 border border-teal-200/60">
                      {filteredPackages.length} Available
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Day-by-day itineraries, catamaran charters, permits & lobster lunches
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate({ name: 'explore', initialCategory: 'packages' })}
                  className="text-xs font-bold text-teal-700 hover:underline cursor-pointer shrink-0"
                >
                  All packages →
                </button>
              </div>

              {filteredPackages.length === 0 ? (
                <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center text-xs text-slate-500 space-y-1">
                  <span className="font-bold text-slate-700 block">No tour packages match the selected filters</span>
                  <span>Try changing destination or duration filters above</span>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {filteredPackages.map((pkg) => {
                    const isFav = isFavourite(pkg.id);
                    const isExpanded = !!expandedItineraries[pkg.id];
                    const displayedItinerary = isExpanded ? pkg.itinerary : pkg.itinerary.slice(0, 2);

                    return (
                      <div
                        key={pkg.id}
                        className="rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-2xs hover:border-teal-500 hover:shadow-md transition-all flex flex-col justify-between group"
                      >
                        {/* Media Header */}
                        <div>
                          <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                            <ImageWithFallback src={pkg.images[0]} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavourite(pkg.id, pkg.name);
                              }}
                              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center text-slate-700 hover:text-rose-500 transition-colors shadow-2xs cursor-pointer"
                              title="Save Tour"
                            >
                              <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                            </button>

                            <div className="absolute top-2 left-2">
                              <span className="px-2 py-0.5 rounded-md bg-teal-600/90 backdrop-blur-xs text-white font-extrabold text-[9px] shadow-xs flex items-center gap-1">
                                <Clock className="w-2.5 h-2.5" />
                                {pkg.duration}
                              </span>
                            </div>

                            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[9px] font-bold text-amber-300 flex items-center gap-1">
                              <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                              <span>{pkg.rating} ({pkg.reviewCount})</span>
                            </div>
                          </div>

                          {/* Details */}
                          <div className="p-2.5 space-y-1">
                            <div className="flex items-center gap-1 text-[10px] font-semibold text-teal-700">
                              <MapPin className="w-3 h-3 shrink-0" />
                              <span className="truncate">{pkg.destination}</span>
                            </div>

                            <h4 
                              onClick={() => navigate({ name: 'package_detail', id: pkg.id })}
                              className="text-xs font-extrabold text-slate-900 leading-tight hover:text-teal-600 transition-colors cursor-pointer line-clamp-2"
                            >
                              {pkg.name}
                            </h4>

                            <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">
                              {pkg.description}
                            </p>

                            {/* Itinerary schedule preview indicator */}
                            <div className="pt-1">
                              <button
                                type="button"
                                onClick={() => toggleItinerary(pkg.id)}
                                className="w-full py-1 px-2 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-[9px] font-bold flex items-center justify-between transition-colors cursor-pointer"
                              >
                                <span>{isExpanded ? 'Hide itinerary' : `${pkg.itinerary.length} Steps Schedule`}</span>
                                {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                              </button>

                              {isExpanded && (
                                <div className="mt-1.5 space-y-1.5 p-2 rounded-lg bg-slate-50 border border-slate-200/80 text-[10px] animate-in fade-in duration-200">
                                  {displayedItinerary.map((stage, sIdx) => (
                                    <div key={sIdx} className="flex items-start gap-1.5">
                                      <span className="w-3.5 h-3.5 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-[8px] shrink-0 mt-0.5">
                                        {stage.day}
                                      </span>
                                      <div>
                                        <span className="font-bold text-slate-800 block leading-tight">{stage.title}</span>
                                        <span className="text-slate-500 text-[9px] line-clamp-2">{stage.details}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Card Footer: Price & Primary Action */}
                        <div className="p-2.5 pt-0 flex flex-col gap-1.5">
                          <div className="flex items-baseline justify-between border-t border-slate-100 pt-1.5">
                            <span className="text-[9px] text-slate-400 font-bold uppercase">Rate/person</span>
                            <span className="text-xs font-black text-slate-900 tabular-nums">${pkg.pricePerPerson} USD</span>
                          </div>

                          <div className="grid grid-cols-2 gap-1">
                            <button
                              type="button"
                              onClick={() => navigate({ name: 'package_detail', id: pkg.id })}
                              className="py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[10px] text-center transition-colors border border-slate-200/80 cursor-pointer"
                            >
                              Details
                            </button>

                            <button
                              type="button"
                              onClick={() => setSelectedPackageBooking(pkg)}
                              className="py-1 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-[10px] text-center shadow-2xs transition-colors cursor-pointer active:scale-95"
                            >
                              Book Now
                            </button>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* =====================================================================
                3. HOTELS & RESORTS SECTION ("Hotels section with detailed cards")
            ===================================================================== */}
            <div className="px-4 space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-indigo-600" />
                    <h3 className="text-sm font-extrabold text-slate-900">
                      Luxury Hotels & Coastal Resorts
                    </h3>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                      {SAMPLE_HOTELS.length} Resorts
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Pete Dye golf villas, ocean suites & all-inclusive beach resorts
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate({ name: 'explore', initialCategory: 'hotels' })}
                  className="text-xs font-bold text-indigo-700 hover:underline cursor-pointer shrink-0"
                >
                  All hotels →
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {SAMPLE_HOTELS.map((hotel) => (
                  <div
                    key={hotel.id}
                    onClick={() => navigate({ name: 'hotel_detail', id: hotel.id })}
                    className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-2xs hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer group p-3 space-y-2.5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-20 h-20 rounded-xl overflow-hidden relative shrink-0 bg-slate-100">
                        <ImageWithFallback src={hotel.images[0]} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <span className="absolute bottom-1 left-1 px-1 py-0.2 rounded bg-black/70 backdrop-blur-xs text-amber-300 text-[8px] font-extrabold">
                          ★ {hotel.rating}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center gap-1 text-[10px] font-semibold text-indigo-700">
                          <MapPin className="w-3 h-3 shrink-0" />
                          <span className="truncate">{hotel.location}</span>
                        </div>

                        <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                          {hotel.name}
                        </h4>

                        <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">
                          {hotel.description}
                        </p>

                        <div className="flex flex-wrap gap-1 pt-0.5">
                          {hotel.amenities.slice(0, 2).map((amenity, aIdx) => (
                            <span key={aIdx} className="px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-800 text-[8px] font-semibold border border-indigo-100">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[8px] text-slate-400 block font-bold uppercase">Price / night</span>
                        <span className="font-extrabold text-slate-900 text-xs tabular-nums">${hotel.pricePerNight} <span className="text-[9px] font-normal text-slate-500">USD</span></span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate({ name: 'hotel_detail', id: hotel.id });
                        }}
                        className="py-1 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                      >
                        <span>View Resort</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </section>
        );
      })()}



      {/* =========================================================================
          PILLAR 2: PRIME REAL ESTATE & VILLA INVESTMENTS (Light Luxury Gold / Ivory)
      ========================================================================= */}
      {(activeDomain === 'realtors') && (
        <section className="px-4 space-y-4 animate-in fade-in duration-200">
          
          {/* Top Location Header Strip */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between text-xs">
            <div className="min-w-0 flex-1 pr-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600 block">
                Verified Realtors & Direct Owner Properties
              </span>
              <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 truncate mt-0.5">
                566 - Flats, Apartments & Luxury Estates for Sale in La Romana, DR
              </h2>
            </div>
            <button
              onClick={() => navigate({ name: 'explore', initialCategory: 'properties' })}
              className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold text-xs shrink-0 transition-colors"
            >
              Explore All
            </button>
          </div>

          {/* Quick Real Estate Search & Filters Bar */}
          <div className="space-y-2.5">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={realtorSearchQuery}
                onChange={(e) => setRealtorSearchQuery(e.target.value)}
                placeholder="Search by location, project, BHK, sqft..."
                className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all shadow-2xs"
              />
              {realtorSearchQuery && (
                <button
                  onClick={() => setRealtorSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Filter Categories Strip */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
              {[
                { id: 'all', label: 'All Properties' },
                { id: 'sale', label: 'For Sale' },
                { id: 'rent', label: 'For Rent' },
                { id: 'villas', label: 'Luxury Villas' },
                { id: 'apartments', label: 'Apartments' },
                { id: 'land', label: 'Land / Plots' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setRealtorCategoryFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                    realtorCategoryFilter === cat.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* PROPERTY CARDS FEED (Matching attached image layout) */}
          <div className="space-y-4">
            {SAMPLE_PROPERTIES
              .filter((prop) => {
                const q = realtorSearchQuery.toLowerCase();
                const matchesQuery = !q || prop.title.toLowerCase().includes(q) || prop.location.toLowerCase().includes(q) || prop.area.toLowerCase().includes(q);
                if (!matchesQuery) return false;

                if (realtorCategoryFilter === 'villas') return prop.propertyType.toLowerCase().includes('villa');
                if (realtorCategoryFilter === 'apartments') return prop.propertyType.toLowerCase().includes('apartment') || prop.title.toLowerCase().includes('flat');
                if (realtorCategoryFilter === 'land') return prop.propertyType.toLowerCase().includes('land');
                if (realtorCategoryFilter === 'sale') return prop.saleOrRent === 'Sale' || !prop.saleOrRent;
                if (realtorCategoryFilter === 'rent') return prop.saleOrRent === 'Rent';
                return true;
              })
              .map((prop) => {
                const activeImgIdx = propertyImageIndexes[prop.id] || 0;
                const currentImg = prop.images[activeImgIdx] || prop.images[0];
                const totalImgs = prop.images.length;
                const isFav = isFavourite(prop.id);

                return (
                  <div
                    key={prop.id}
                    onClick={() => navigate({ name: 'property_detail', id: prop.id })}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                  >
                    {/* Top Image Carousel Container */}
                    <div className="relative aspect-[16/9] bg-slate-900 overflow-hidden">
                      <ImageWithFallback
                        src={currentImg}
                        alt={prop.title}
                        category="property"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Top-Left Price Badge (e.g. $650,000 USD / ₹ 65 Lacs eq.) */}
                      <div className="absolute top-2.5 left-2.5 px-3 py-1 rounded-xl bg-white/95 backdrop-blur-md text-slate-900 font-black text-xs sm:text-sm shadow-md border border-slate-100/90 flex items-center gap-1">
                        <span className="text-emerald-700 font-extrabold">
                          {prop.priceFormatted}
                        </span>
                      </div>

                      {/* Top-Right Live Viewer Badge (⚡ 3 people viewing this property right now) */}
                      <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white font-medium text-[10px] flex items-center gap-1.5 border border-white/10 shadow-sm">
                        <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
                        <span>{prop.liveViewers || 3} people viewing this property right now</span>
                      </div>

                      {/* Bottom-Left Feature Badge (Exclusive Deal / Verified) */}
                      <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-sky-500 text-white font-extrabold text-[10px] tracking-wide shadow-sm flex items-center gap-1">
                        <Star className="w-3 h-3 fill-white text-white" />
                        <span>{prop.badgeTag || 'Exclusive Deal'}</span>
                      </div>

                      {/* Bottom-Right Image Counter & Next/Prev Controls */}
                      <div 
                        onClick={(e) => e.stopPropagation()} 
                        className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded-xl text-white text-[10px] font-bold"
                      >
                        {totalImgs > 1 && (
                          <button
                            type="button"
                            onClick={(e) => prevPropertyImage(e, prop.id, totalImgs)}
                            className="p-0.5 hover:bg-white/20 rounded transition-colors cursor-pointer"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <span>{activeImgIdx + 1}/{totalImgs}</span>
                        {totalImgs > 1 && (
                          <button
                            type="button"
                            onClick={(e) => nextPropertyImage(e, prop.id, totalImgs)}
                            className="p-0.5 hover:bg-white/20 rounded transition-colors cursor-pointer"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Locality Hint Strip (Suggested property in nearby locality) */}
                    <div className="bg-sky-50/90 text-sky-900 text-[11px] font-bold px-3.5 py-2 border-y border-sky-100 flex items-center gap-1.5">
                      <Home className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <span className="truncate">{prop.localityHint || 'Suggested property in nearby locality'}</span>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-3.5 space-y-3">
                      <div>
                        <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 line-clamp-2 leading-snug group-hover:text-rose-600 transition-colors">
                          {prop.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1 truncate">
                          <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                          <span>{prop.location}</span>
                        </p>
                      </div>

                      {/* Specs Row: Sq Ft, EMI Estimate & Actions */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-xs sm:text-sm font-black text-slate-900 block">
                            {prop.area}
                          </span>
                          <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                            {prop.estimatedEmi || 'EMI Available'}
                          </span>
                        </div>

                        {/* Actions: Heart + Contact Owner Button */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavourite(prop.id, prop.title);
                            }}
                            className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:text-rose-500 hover:border-rose-200 transition-colors cursor-pointer"
                          >
                            <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedVillaEnquiry(prop);
                            }}
                            className="px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-black text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>Contact Owner</span>
                          </button>
                        </div>
                      </div>

                    </div>

                  </div>
                );
              })}
          </div>

        </section>
      )}

      {/* =========================================================================
          PILLAR 3: ARTISAN E-COMMERCE & SOUVENIR MARKETPLACE
      ========================================================================= */}
      {(activeDomain === 'artisans') && (
        <section className="px-4 space-y-4">
          
          {/* Domain Title Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-5 rounded-full bg-orange-500" />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-extrabold text-slate-900">
                    Artisan E-Commerce Shop
                  </h2>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-orange-50 text-orange-700 border border-orange-200/60">
                    Handmade in DR
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Direct from certified cigar ateliers, Larimar jewelers & organic cacao farms
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate({ name: 'explore', initialCategory: 'shop' })}
              className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>View catalog</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Shop Value Props Strip */}
          <div className="p-3 rounded-2xl bg-orange-50/70 border border-orange-200 flex items-center justify-between text-xs text-orange-950">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-orange-600 shrink-0" />
              <span className="font-semibold text-[11px]">100% Genuine Barahona Larimar & Humidor Cigars</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-200/70 text-orange-900">
              Free Courier $150+
            </span>
          </div>

          {/* 4 E-Commerce Products Grid with Direct "Add to Cart" */}
          <div className="grid grid-cols-2 gap-3">
            {SAMPLE_PRODUCTS.map((prod) => {
              const isFav = isFavourite(prod.id);
              return (
                <div
                  key={prod.id}
                  onClick={() => navigate({ name: 'product_detail', id: prod.id })}
                  className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-2xs hover:shadow-md cursor-pointer group transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                    <ImageWithFallback src={prod.images[0]} alt={prod.name} category="product" />
                    
                    {prod.discountPercent && (
                      <span className="absolute top-2 left-2 text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-orange-500 text-white shadow-xs">
                        {prod.discountPercent}% OFF
                      </span>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavourite(prod.id, prod.name);
                      }}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-700 hover:text-rose-500 transition-colors shadow-2xs"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  </div>

                  <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <span className="text-[10px] font-semibold text-orange-700 block truncate">
                        {prod.category}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-2 mt-0.5 group-hover:text-orange-600 transition-colors leading-snug">
                        {prod.name}
                      </h4>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-black text-slate-900 tabular-nums">
                          ${prod.price} USD
                        </span>
                        {prod.originalPrice && (
                          <span className="text-[10px] text-slate-400 line-through tabular-nums">
                            ${prod.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Interactive Add to Cart button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(prod);
                          showToast(`Added "${prod.name}" to cart!`, 'success');
                        }}
                        className="w-full py-2 px-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.98] transition-all cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Cart Notification Strip if items added */}
          {cartCount > 0 && (
            <div 
              onClick={() => switchTab('cart')}
              className="p-3.5 rounded-2xl bg-teal-600 text-white flex items-center justify-between cursor-pointer hover:bg-teal-700 transition-colors shadow-md"
            >
              <div className="flex items-center gap-2.5 text-xs">
                <ShoppingBag className="w-4 h-4" />
                <span className="font-bold">
                  {cartCount} item{cartCount > 1 ? 's' : ''} in your basket (${cartTotal.toLocaleString()} USD)
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs font-extrabold underline">
                <span>View Cart & Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          )}

        </section>
      )}

      

      {/* Politur Tourist Police & 911 Emergency Helpline */}
      <div className="px-4">
        <div
          onClick={() => setHelpSafetyOpen(true)}
          className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-200/70 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                Politur Tourist Police & 911 Assistance
              </span>
              <span className="text-[10px] text-slate-500">
                Official Dominican Republic 24/7 emergency helplines & safety
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
        </div>
      </div>

      {/* Villa Viewing Enquiry Modal */}
      {selectedVillaEnquiry && (
        <EnquiryModal
          isOpen={true}
          onClose={() => setSelectedVillaEnquiry(null)}
          type="property"
          targetId={selectedVillaEnquiry.id}
          targetTitle={selectedVillaEnquiry.title}
          recipientName={selectedVillaEnquiry.mediator.name}
          recipientContact={selectedVillaEnquiry.mediator.phone}
        />
      )}

      {/* Quick Package Booking Modal */}
      {selectedPackageBooking && (
        <BookingFlowModal
          isOpen={true}
          onClose={() => setSelectedPackageBooking(null)}
          tourPackage={selectedPackageBooking}
        />
      )}

      {/* Guide Enquiry Modal */}
      {selectedGuideEnquiry && (
        <EnquiryModal
          isOpen={true}
          onClose={() => setSelectedGuideEnquiry(null)}
          type="guide"
          targetId={selectedGuideEnquiry.id}
          targetTitle={selectedGuideEnquiry.name}
          recipientName={selectedGuideEnquiry.name}
          recipientContact={selectedGuideEnquiry.phone}
        />
      )}

      {/* Sponsored Partner Offer Details Modal */}
      {isAdModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[85vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-4 bg-white border-b border-slate-200 text-slate-900 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-600">
                  Official Tourism Partner Spotlight
                </span>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Banreservas × Casa de Campo® Privilege
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAdModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-600">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100">
                <ImageWithFallback
                  src="/assets/images/casa_de_campo_villa_caribbean_1793268344505.jpg"
                  alt="Casa de Campo Luxury Grounds"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-teal-600 text-white font-extrabold text-[10px]">
                  VIP Travel Pass
                </div>
              </div>

              <div>
                <h4 className="text-sm font-extrabold text-slate-900">
                  Dominicana Descubre Luxury Perks Program
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Through our official partnership with Banreservas and the Central Romana Corporation, OnePlace app users enjoy exclusive savings across La Romana's premier resorts, excursions, and dining.
                </p>
              </div>

              {/* Benefits Checklist */}
              <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200/80 space-y-2">
                <span className="text-[11px] font-extrabold text-teal-900 uppercase block tracking-wider">
                  Included Privileges
                </span>
                <ul className="space-y-1.5 text-xs text-teal-800">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span><strong>15% Instant Statement Credit</strong> at all La Marina & Altos de Chavón restaurants.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span><strong>Complimentary 4-Passenger Golf Cart</strong> for all Teeth of the Dog® tee times.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span><strong>Priority VIP Boarding & Open Bar</strong> on Bayahíbe catamaran charters to Saona Island.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span><strong>Certified Larimar Gift Voucher</strong> ($25 value) with any artisan jewelry order over $100.</span>
                  </li>
                </ul>
              </div>

              {/* Promo code redemption */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">Your Promo Code</span>
                  <span className="text-sm font-mono font-black text-slate-900 tracking-wider">DOMINICANA25</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsAdCopied(true);
                    navigator.clipboard?.writeText?.('DOMINICANA25');
                    showToast('Code DOMINICANA25 copied! Applied to your clipboard.', 'success');
                    setTimeout(() => setIsAdCopied(false), 3000);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {isAdCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isAdCopied ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAdModalOpen(false);
                    navigate({ name: 'explore', initialCategory: 'packages' });
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs text-center transition-colors cursor-pointer"
                >
                  Explore Eligible Packages
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
