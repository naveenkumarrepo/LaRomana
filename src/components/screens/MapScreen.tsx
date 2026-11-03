import React, { useState, useMemo } from 'react';
import { 
  Compass, 
  Building, 
  Utensils, 
  Home, 
  MapPin, 
  Plus, 
  Minus, 
  LocateFixed, 
  ArrowRight, 
  Star, 
  X,
  Layers,
  Search
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { 
  SAMPLE_PLACES, 
  SAMPLE_HOTELS, 
  SAMPLE_RESTAURANTS, 
  SAMPLE_PROPERTIES 
} from '../../data/sampleData';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { StarRating } from '../common/StarRating';

type MapMarkerItem = {
  id: string;
  type: 'place' | 'hotel' | 'food' | 'property';
  title: string;
  subtitle: string;
  image: string;
  rating: number;
  price?: string;
  coords: { x: number; y: number }; // Percentage on map canvas
};

export const MapScreen: React.FC = () => {
  const { navigate, showToast } = useApp();
  const [activeCategory, setActiveCategory] = useState<'all' | 'place' | 'hotel' | 'food' | 'property'>('all');
  const [selectedMarkerId, setSelectedMarkerId] = useState<string>('place-2'); // default to Altos de Chavón
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [searchFilter, setSearchFilter] = useState('');

  // Collect all mappable items
  const allMarkers: MapMarkerItem[] = useMemo(() => {
    const list: MapMarkerItem[] = [];

    SAMPLE_PLACES.forEach((p) => {
      list.push({
        id: p.id,
        type: 'place',
        title: p.name,
        subtitle: p.location,
        image: p.images[0],
        rating: p.rating,
        coords: p.coords
      });
    });

    SAMPLE_HOTELS.forEach((h) => {
      list.push({
        id: h.id,
        type: 'hotel',
        title: h.name,
        subtitle: h.location,
        image: h.images[0],
        rating: h.rating,
        price: `$${h.pricePerNight.toLocaleString()} USD/nt`,
        coords: h.coords
      });
    });

    SAMPLE_RESTAURANTS.forEach((r) => {
      list.push({
        id: r.id,
        type: 'food',
        title: r.name,
        subtitle: r.cuisine,
        image: r.images[0],
        rating: r.rating,
        price: r.priceLevel,
        coords: r.coords
      });
    });

    SAMPLE_PROPERTIES.forEach((prop) => {
      list.push({
        id: prop.id,
        type: 'property',
        title: prop.title,
        subtitle: prop.location,
        image: prop.images[0],
        rating: 4.9,
        price: prop.priceFormatted,
        coords: prop.coords
      });
    });

    return list;
  }, []);

  const visibleMarkers = useMemo(() => {
    return allMarkers.filter((m) => {
      const matchCat = activeCategory === 'all' || m.type === activeCategory;
      const matchSearch = !searchFilter || m.title.toLowerCase().includes(searchFilter.toLowerCase()) || m.subtitle.toLowerCase().includes(searchFilter.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [allMarkers, activeCategory, searchFilter]);

  const selectedItem = useMemo(() => {
    return allMarkers.find((m) => m.id === selectedMarkerId) || visibleMarkers[0] || null;
  }, [allMarkers, selectedMarkerId, visibleMarkers]);

  const handleOpenDetail = (item: MapMarkerItem) => {
    switch (item.type) {
      case 'place': navigate({ name: 'place_detail', id: item.id }); break;
      case 'hotel': navigate({ name: 'hotel_detail', id: item.id }); break;
      case 'food': navigate({ name: 'food_detail', id: item.id }); break;
      case 'property': navigate({ name: 'property_detail', id: item.id }); break;
    }
  };

  const getMarkerIcon = (type: MapMarkerItem['type']) => {
    switch (type) {
      case 'place': return <Compass className="w-3.5 h-3.5" />;
      case 'hotel': return <Building className="w-3.5 h-3.5" />;
      case 'food': return <Utensils className="w-3.5 h-3.5" />;
      case 'property': return <Home className="w-3.5 h-3.5" />;
    }
  };

  const getMarkerColor = (type: MapMarkerItem['type']) => {
    switch (type) {
      case 'place': return 'bg-emerald-600 text-white border-emerald-400';
      case 'hotel': return 'bg-indigo-600 text-white border-indigo-400';
      case 'food': return 'bg-rose-600 text-white border-rose-400';
      case 'property': return 'bg-teal-600 text-white border-teal-300';
    }
  };

  return (
    <div className="relative h-full w-full min-h-[500px] overflow-hidden bg-slate-100 select-none">
      
      {/* Top Floating Controls Bar */}
      <div className="absolute top-3 left-3 right-3 z-30 space-y-2 pointer-events-none">
        {/* Search Input */}
        <div className="pointer-events-auto flex items-center gap-2 p-2 rounded-2xl bg-white/95 backdrop-blur-md shadow-md border border-slate-200">
          <Search className="w-4 h-4 text-slate-400 shrink-0 ml-1.5" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search map destinations & listings..."
            className="w-full bg-transparent text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          {searchFilter && (
            <button onClick={() => setSearchFilter('')} className="p-1 text-slate-400 hover:text-slate-600">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Horizontal Filter Chips */}
        <div className="pointer-events-auto flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'all', label: 'All Listings' },
            { id: 'place', label: 'Places' },
            { id: 'hotel', label: 'Hotels' },
            { id: 'food', label: 'Dining' },
            { id: 'property', label: 'Real Estate' },
          ].map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap shadow-xs backdrop-blur-md transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Map Zoom & Location Action Buttons */}
      <div className="absolute right-3 top-28 z-30 flex flex-col gap-2">
        <button
          onClick={() => setZoomLevel((z) => Math.min(1.6, z + 0.2))}
          className="w-9 h-9 rounded-xl bg-white text-slate-700 shadow-md flex items-center justify-center hover:bg-slate-50 transition-colors border border-slate-200"
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.2))}
          className="w-9 h-9 rounded-xl bg-white text-slate-700 shadow-md flex items-center justify-center hover:bg-slate-50 transition-colors border border-slate-200"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            setSelectedMarkerId('place-2');
            setZoomLevel(1);
            showToast('Centered on current location: Altos de Chavón, La Romana', 'info');
          }}
          className="w-9 h-9 rounded-xl bg-teal-600 text-white shadow-md flex items-center justify-center hover:bg-teal-700 transition-colors font-bold"
          title="Recenter Map"
        >
          <LocateFixed className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive Map Canvas Simulation */}
      <div
        className="w-full h-full relative transition-transform duration-300 origin-center"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        {/* Stylized Vector Cartography Backdrop in Light Mode */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          {/* Base terrain */}
          <rect width="100" height="100" fill="#F8FAFC" />

          {/* Topographic contours & green reserves */}
          <path
            d="M 0,20 Q 25,10 45,25 T 90,15 L 100,0 L 0,0 Z"
            fill="#DCFCE7"
            opacity="0.8"
          />
          <path
            d="M 60,65 Q 85,55 100,75 L 100,100 L 50,100 Z"
            fill="#DCFCE7"
            opacity="0.7"
          />

          {/* Water body: Caribbean Sea / Río Chavón */}
          <path
            d="M 30,40 C 35,30 45,35 48,50 C 50,65 38,75 32,68 C 26,60 25,50 30,40 Z"
            fill="#BAE6FD"
            opacity="0.85"
          />
          <text x="31" y="52" fill="#0369A1" fontSize="2.4" opacity="0.8" fontWeight="bold">
            Río Chavón / Mar Caribe
          </text>

          {/* Major Expressways & Heritage Streets */}
          <path
            d="M 0,45 Q 35,48 50,42 T 100,55"
            stroke="#CBD5E1"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M 45,0 Q 42,40 48,100"
            stroke="#94A3B8"
            strokeWidth="1.8"
            fill="none"
          />
          <path
            d="M 10,10 Q 50,60 90,90"
            stroke="#CBD5E1"
            strokeWidth="1.0"
            fill="none"
            strokeDasharray="2,1"
          />

          {/* Subtle Grid lines for cartographic depth */}
          <line x1="0" y1="33" x2="100" y2="33" stroke="#E2E8F0" strokeWidth="0.3" />
          <line x1="0" y1="66" x2="100" y2="66" stroke="#E2E8F0" strokeWidth="0.3" />
          <line x1="33" y1="0" x2="33" y2="100" stroke="#E2E8F0" strokeWidth="0.3" />
          <line x1="66" y1="0" x2="66" y2="100" stroke="#E2E8F0" strokeWidth="0.3" />
        </svg>

        {/* Dynamic Markers */}
        {visibleMarkers.map((marker) => {
          const isSelected = selectedMarkerId === marker.id;
          return (
            <div
              key={marker.id}
              onClick={() => setSelectedMarkerId(marker.id)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
              style={{ left: `${marker.coords.x}%`, top: `${marker.coords.y}%` }}
            >
              {/* Pulse ripple when selected */}
              {isSelected && (
                <div className="absolute -inset-2 rounded-full bg-teal-400/40 animate-ping" />
              )}

              {/* Marker pin */}
              <div
                className={`relative flex items-center justify-center p-2 rounded-full border-2 shadow-xl transition-all duration-200 ${
                  isSelected ? 'scale-125 ring-4 ring-white/80 ring-offset-2' : 'hover:scale-110'
                } ${getMarkerColor(marker.type)}`}
              >
                {getMarkerIcon(marker.type)}
              </div>

              {/* Marker Label */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-[9px] font-bold text-white whitespace-nowrap shadow-sm pointer-events-none">
                {marker.title.split(' ')[0]}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Preview Card for Selected Item */}
      {selectedItem && (
        <div className="absolute bottom-4 left-3 right-3 z-30 animate-in slide-in-from-bottom duration-200">
          <div className="p-3.5 rounded-2xl bg-white backdrop-blur-md shadow-xl border border-slate-200 flex gap-3 items-center">
            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100 relative">
              <ImageWithFallback src={selectedItem.image} alt={selectedItem.title} />
              <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-bold text-teal-300 uppercase">
                {selectedItem.type}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <StarRating rating={selectedItem.rating} size="sm" showNumber={true} />
                {selectedItem.price && (
                  <span className="text-xs font-bold text-slate-900 tabular-nums">
                    {selectedItem.price}
                  </span>
                )}
              </div>

              <h4 className="text-xs font-bold text-slate-900 truncate mt-0.5">
                {selectedItem.title}
              </h4>
              <p className="text-[11px] text-slate-500 truncate flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-teal-600 shrink-0" />
                {selectedItem.subtitle}
              </p>

              <button
                onClick={() => handleOpenDetail(selectedItem)}
                className="mt-2 w-full py-1.5 px-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-[11px] flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-xs"
              >
                <span>View Complete Details</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
