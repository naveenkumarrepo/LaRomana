import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  Star, 
  Building, 
  Wifi, 
  Check, 
  Map, 
  Phone, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SAMPLE_HOTELS } from '../../data/sampleData';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { StarRating } from '../common/StarRating';
import { EnquiryModal } from '../modals/EnquiryModal';

export const HotelDetailScreen: React.FC<{ id: string }> = ({ id }) => {
  const { goBack, navigate, toggleFavourite, isFavourite, reviews, showToast } = useApp();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const hotel = SAMPLE_HOTELS.find((h) => h.id === id) || SAMPLE_HOTELS[0];
  const isFav = isFavourite(hotel.id);
  const hotelReviews = reviews.filter((r) => r.targetId === hotel.id || r.targetType === 'hotel');

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast(`Shared "${hotel.name}" link copied!`, 'info');
  };

  return (
    <div className="pb-28 animate-in fade-in duration-200">
      
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
          <span className="text-xs font-bold text-slate-900 truncate block">{hotel.name}</span>
          <span className="text-[10px] text-teal-600 font-semibold truncate block">{hotel.location}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleShare}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer border border-slate-200/80"
            title="Share Resort"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleFavourite(hotel.id, hotel.name)}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer border border-slate-200/80"
            title="Save to Favourites"
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Gallery */}
      <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
        <ImageWithFallback
          src={hotel.images[activeImageIndex] || hotel.images[0]}
          alt={hotel.name}
          category="hotel"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />

        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
          <div className="flex gap-2">
            {hotel.images.map((img, idx) => (
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
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/70 text-white">
            ${hotel.pricePerNight.toLocaleString()} USD/nt
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="p-4 space-y-4 text-slate-800">
        
        {/* Title & Location */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">
              Dominican Luxury Caribbean Beach & Golf Resort
            </span>
            <StarRating rating={hotel.rating} size="md" showNumber={true} reviewCount={hotel.reviewCount} />
          </div>

          <h1 className="text-xl font-extrabold text-slate-900 leading-tight">
            {hotel.name}
          </h1>

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span>{hotel.address}</span>
          </div>

          <div className="pt-1 text-xs text-slate-600">
            Estimated Tariff: <strong className="text-slate-900">{hotel.priceRange}</strong> / night
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            About the Property
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            {hotel.description}
          </p>
        </div>

        {/* Facilities & Amenities */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Signature Amenities & Facilities
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {hotel.amenities.map((amenity, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2 text-xs text-slate-700"
              >
                <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span className="truncate">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Map Preview */}
        <div className="p-3.5 rounded-2xl bg-slate-900 text-white space-y-2">
          <div className="flex justify-between items-center text-xs font-bold">
            <span>Location Discovery</span>
            <span className="text-teal-400 text-[11px]">{hotel.location}</span>
          </div>
          <p className="text-[11px] text-slate-300">
            Situated right on the tranquil Caribbean shoreline with private marina access and golf greens.
          </p>
          <button
            onClick={() => navigate({ name: 'map', focusId: hotel.id })}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Map className="w-3.5 h-3.5 text-teal-400" />
            <span>Show on Interactive Map</span>
          </button>
        </div>

        {/* Reviews */}
        <div className="space-y-2.5 pt-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Guest Reviews
          </h2>
          {hotelReviews.slice(0, 2).map((rev) => (
            <div key={rev.id} className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-2xs">
              <div className="flex justify-between items-center text-xs font-bold text-slate-900">
                <span>{rev.authorName}</span>
                <span className="text-[10px] text-slate-400">{rev.date}</span>
              </div>
              <StarRating rating={rev.rating} size="sm" showNumber={false} />
              <p className="text-xs text-slate-600">{rev.comment}</p>
            </div>
          ))}
        </div>

      </div>

      {/* Sticky Bottom Bar */}
      <div className="sticky bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 z-30 w-full flex items-center justify-between gap-3 shadow-lg">
        <div>
          <span className="text-[10px] text-slate-500 uppercase font-bold block">From</span>
          <span className="text-base font-extrabold text-slate-900 tabular-nums">
            ${hotel.pricePerNight.toLocaleString()} USD{' '}
            <span className="text-[10px] font-normal text-slate-500">/ night</span>
          </span>
        </div>

        <button
          onClick={() => setIsEnquiryOpen(true)}
          className="py-3 px-5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Contact Concierge</span>
        </button>
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        type="guide"
        targetId={hotel.id}
        targetTitle={hotel.name}
        recipientName={`${hotel.name} Concierge Desk`}
        recipientContact="+1 809 523-3333"
      />

    </div>
  );
};
