import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  Clock, 
  Ticket, 
  Map, 
  Star, 
  Plus, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SAMPLE_PLACES } from '../../data/sampleData';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { StarRating } from '../common/StarRating';
import { WriteReviewModal } from '../modals/WriteReviewModal';

export const PlaceDetailScreen: React.FC<{ id: string }> = ({ id }) => {
  const { goBack, navigate, toggleFavourite, isFavourite, reviews, showToast } = useApp();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);

  const place = SAMPLE_PLACES.find((p) => p.id === id) || SAMPLE_PLACES[0];
  const isFav = isFavourite(place.id);

  // Reviews for this place
  const placeReviews = reviews.filter((r) => r.targetId === place.id || r.targetType === 'place');

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast(`Shared "${place.name}" link copied to clipboard!`, 'info');
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
          <span className="text-xs font-bold text-slate-900 truncate block">{place.name}</span>
          <span className="text-[10px] text-teal-600 font-semibold truncate block">{place.location}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleShare}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer border border-slate-200/80"
            title="Share Destination"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleFavourite(place.id, place.name)}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer border border-slate-200/80"
            title="Save to Favourites"
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Hero Image & Gallery Slider */}
      <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
        <ImageWithFallback
          src={place.images[activeImageIndex] || place.images[0]}
          alt={place.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />
        
        {/* Gallery Thumbnails Strip */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
          <div className="flex gap-2">
            {place.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-12 h-9 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                  activeImageIndex === idx ? 'border-teal-400 scale-105' : 'border-white/50 opacity-70'
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white">
            {activeImageIndex + 1} / {place.images.length}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-5 text-slate-800">
        
        {/* Title, rating, address */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-600">
              {place.category} Destination
            </span>
            <StarRating rating={place.rating} size="md" showNumber={true} reviewCount={place.reviewCount} />
          </div>

          <h1 className="text-xl font-extrabold text-slate-900 leading-tight">
            {place.name}
          </h1>

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span>{place.mapAddress}</span>
          </div>
        </div>

        {/* Info Grid (Hours, Fees) */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-1.5 text-slate-500 mb-1">
              <Clock className="w-3.5 h-3.5 text-teal-600" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Visiting Hours</span>
            </div>
            <span className="text-xs font-bold text-slate-900 block line-clamp-1">
              {place.openingHours}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-1.5 text-slate-500 mb-1">
              <Ticket className="w-3.5 h-3.5 text-teal-600" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Entry Tariff</span>
            </div>
            <span className="text-xs font-bold text-slate-900 block line-clamp-1">
              {place.entryFee}
            </span>
          </div>
        </div>

        {/* Overview Description */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Destination Overview
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            {place.description}
          </p>
        </div>

        {/* Key Highlights */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Key Highlights & Experiences
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {place.highlights.map((highlight, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-teal-50 border border-teal-200/70 flex items-center gap-2 text-xs font-medium text-teal-900"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Map Location Preview Card */}
        <div className="p-4 rounded-2xl bg-teal-50/70 text-slate-900 space-y-3 shadow-2xs border border-teal-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Map className="w-4 h-4 text-teal-600" />
              <span className="text-xs font-bold text-slate-900">Location & Coordinates</span>
            </div>
            <span className="text-[10px] font-semibold text-teal-700">Interactive Map View</span>
          </div>
          <p className="text-[11px] text-slate-600">
            Explore nearby boutique hotels, local food pavilions, and walking guides on the interactive map.
          </p>
          <button
            onClick={() => navigate({ name: 'map', focusId: place.id })}
            className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            <span>Open Location on Map</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Visitor Reviews Section */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Visitor Reviews
              </h2>
              <span className="text-xs font-bold text-slate-900">
                {place.rating} ★ Average Rating ({place.reviewCount} total reviews)
              </span>
            </div>
            <button
              onClick={() => setIsWriteReviewOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 flex items-center gap-1 cursor-pointer border border-slate-200"
            >
              <Plus className="w-3.5 h-3.5 text-teal-600" />
              <span>Write Review</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {placeReviews.slice(0, 3).map((rev) => (
              <div
                key={rev.id}
                className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    {rev.authorName}
                  </span>
                  <span className="text-[10px] text-slate-400">{rev.date}</span>
                </div>
                <StarRating rating={rev.rating} size="sm" showNumber={false} />
                <p className="text-xs text-slate-600 leading-relaxed">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Destinations */}
        {place.relatedPlaceIds && place.relatedPlaceIds.length > 0 && (
          <div className="space-y-2.5 pt-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Related Destinations to Pair
            </h2>
            <div className="grid grid-cols-2 gap-2.5">
              {place.relatedPlaceIds.map((relId) => {
                const relPlace = SAMPLE_PLACES.find((p) => p.id === relId);
                if (!relPlace) return null;
                return (
                  <div
                    key={relPlace.id}
                    onClick={() => navigate({ name: 'place_detail', id: relPlace.id })}
                    className="p-2.5 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-teal-500 transition-all shadow-2xs"
                  >
                    <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-900 mb-1.5">
                      <ImageWithFallback src={relPlace.images[0]} alt={relPlace.name} />
                    </div>
                    <span className="text-xs font-bold text-slate-900 line-clamp-1 block">
                      {relPlace.name}
                    </span>
                    <span className="text-[10px] text-slate-500 block truncate">
                      {relPlace.location}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* Review Modal */}
      <WriteReviewModal
        isOpen={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
        targetId={place.id}
        targetType="place"
        targetTitle={place.name}
      />

    </div>
  );
};
