import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  Clock, 
  Utensils, 
  Sparkles, 
  Map, 
  Leaf, 
  ChefHat,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SAMPLE_RESTAURANTS, SAMPLE_DISHES } from '../../data/sampleData';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { StarRating } from '../common/StarRating';

export const FoodDetailScreen: React.FC<{ id: string }> = ({ id }) => {
  const { goBack, navigate, toggleFavourite, isFavourite, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'restaurants' | 'dishes'>('restaurants');

  const selectedRestaurant = SAMPLE_RESTAURANTS.find((r) => r.id === id) || SAMPLE_RESTAURANTS[0];
  const isFav = isFavourite(selectedRestaurant.id);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast(`Culinary guide shared to clipboard!`, 'info');
  };

  return (
    <div className="pb-24 animate-in fade-in duration-200">
      
      {/* Top Floating App Bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between p-3.5 bg-white/95 backdrop-blur-md text-slate-900 border-b border-slate-200 shadow-2xs">
        <button
          onClick={goBack}
          className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer border border-slate-200/80"
          title="Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="text-center truncate max-w-[200px]">
          <span className="text-xs font-bold text-slate-900 truncate block">Food & Dining Guide</span>
          <span className="text-[10px] text-teal-600 font-semibold truncate block">Dominican Gastronomy</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleShare}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer border border-slate-200/80"
            title="Share Dining Guide"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleFavourite(selectedRestaurant.id, selectedRestaurant.name)}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer border border-slate-200/80"
            title="Save to Favourites"
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Segmented Filter: Restaurants vs Local Dishes */}
      <div className="p-4 bg-slate-50 border-b border-slate-200">
        <div className="flex p-1 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <button
            onClick={() => setActiveTab('restaurants')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'restaurants'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Curated Restaurants ({SAMPLE_RESTAURANTS.length})
          </button>
          <button
            onClick={() => setActiveTab('dishes')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'dishes'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Dominican Specialties ({SAMPLE_DISHES.length})
          </button>
        </div>
      </div>

      {/* VIEW A: Restaurants */}
      {activeTab === 'restaurants' && (
        <div className="p-4 space-y-5">
          {/* Featured restaurant hero */}
          <div className="rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-sm">
            <div className="relative aspect-[16/9] bg-slate-900 overflow-hidden">
              <ImageWithFallback src={selectedRestaurant.images[0]} alt={selectedRestaurant.name} category="food" />
              <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/70 text-white">
                {selectedRestaurant.priceLevel} · {selectedRestaurant.cuisine}
              </span>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <StarRating rating={selectedRestaurant.rating} size="sm" showNumber={true} reviewCount={selectedRestaurant.reviewCount} />
                <span className="text-[11px] text-teal-600 font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {selectedRestaurant.openingHours}
                </span>
              </div>

              <div>
                <h1 className="text-base font-extrabold text-slate-900">
                  {selectedRestaurant.name}
                </h1>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-teal-600 shrink-0" />
                  {selectedRestaurant.address}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Signature Specialty Dishes
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedRestaurant.signatureDishes.map((dish, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 text-[11px] font-semibold border border-teal-200/60"
                    >
                      {dish}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => navigate({ name: 'map', focusId: selectedRestaurant.id })}
                className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Map className="w-3.5 h-3.5" />
                <span>View Venue on Interactive Map</span>
              </button>
            </div>
          </div>

          {/* Other restaurants listing */}
          <div className="space-y-3 pt-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              More Recommended Dining Spots
            </h2>
            {SAMPLE_RESTAURANTS.map((rest) => (
              <div
                key={rest.id}
                onClick={() => navigate({ name: 'food_detail', id: rest.id })}
                className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-teal-500 flex gap-3 cursor-pointer transition-all"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-100">
                  <ImageWithFallback src={rest.images[0]} alt={rest.name} category="food" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                  <div>
                    <span className="text-[10px] font-semibold text-teal-700">
                      {rest.cuisine}
                    </span>
                    <h3 className="text-xs font-bold text-slate-900 truncate">
                      {rest.name}
                    </h3>
                    <span className="text-[10px] text-slate-500 truncate block">
                      {rest.location}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <StarRating rating={rest.rating} size="sm" showNumber={true} />
                    <span className="text-xs font-bold text-slate-900">{rest.priceLevel}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW B: Regional Culinary Dishes */}
      {activeTab === 'dishes' && (
        <div className="p-4 space-y-4">
          <div className="p-3 rounded-2xl bg-teal-50/70 border border-teal-200 text-xs text-teal-950 flex items-center gap-2">
            <ChefHat className="w-4 h-4 text-teal-600 shrink-0" />
            <span>Discover authentic recipes and Creole culinary heritage of the Dominican Republic.</span>
          </div>

          <div className="space-y-3.5">
            {SAMPLE_DISHES.map((dish) => (
              <div
                key={dish.id}
                className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5"
              >
                <div className="flex gap-3">
                  <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-slate-100 relative border border-slate-100">
                    <ImageWithFallback src={dish.image} alt={dish.name} category="food" />
                    {dish.vegetarian && (
                      <span className="absolute top-1 left-1 p-1 rounded-full bg-emerald-600 text-white shadow-xs" title="Vegetarian">
                        <Leaf className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">
                      {dish.regionalOrigin}
                    </span>
                    <h3 className="text-xs font-bold text-slate-900">
                      {dish.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                      {dish.description}
                    </p>
                    <span className="text-xs font-extrabold text-slate-900 tabular-nums mt-1 block">
                      Approx ${dish.priceApprox} USD
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 text-[11px] space-y-1 border border-slate-200/70">
                  <span className="font-semibold text-slate-700 block">
                    Best Experienced At:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {dish.recommendedSpots.map((spot, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                        {spot}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
