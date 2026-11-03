import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  Home, 
  Maximize2, 
  BedDouble, 
  Bath, 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  Map,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SAMPLE_PROPERTIES } from '../../data/sampleData';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { EnquiryModal } from '../modals/EnquiryModal';

export const PropertyDetailScreen: React.FC<{ id: string }> = ({ id }) => {
  const { goBack, navigate, toggleFavourite, isFavourite, showToast } = useApp();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const prop = SAMPLE_PROPERTIES.find((p) => p.id === id) || SAMPLE_PROPERTIES[0];
  const isFav = isFavourite(prop.id);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast(`Property "${prop.title}" link copied!`, 'info');
  };

  return (
    <div className="pb-32 animate-in fade-in duration-200">
      
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
          <span className="text-xs font-bold text-slate-900 truncate block">{prop.title}</span>
          <span className="text-[10px] text-amber-700 font-semibold truncate block">{prop.propertyType}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleShare}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer border border-slate-200/80"
            title="Share Property"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleFavourite(prop.id, prop.title)}
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
          src={prop.images[activeImageIndex] || prop.images[0]}
          alt={prop.title}
          category="property"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />

        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
          <div className="flex gap-2">
            {prop.images.map((img, idx) => (
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
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-teal-500 text-slate-950">
            {prop.status}
          </span>
        </div>
      </div>

      {/* Main Details */}
      <div className="p-4 space-y-4 text-slate-800">
        
        {/* Title, location, price */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">
              {prop.propertyType}
            </span>
            <span className="text-xs font-extrabold text-teal-700">
              Direct Verified Mediator
            </span>
          </div>

          <h1 className="text-lg font-extrabold text-slate-900 leading-tight">
            {prop.title}
          </h1>

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span>{prop.location}</span>
          </div>

          <div className="pt-2">
            <span className="text-2xl font-black text-slate-900 tabular-nums">
              {prop.priceFormatted}
            </span>
          </div>
        </div>

        {/* Specifications Strip */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-2xs">
            <Maximize2 className="w-4 h-4 text-teal-600 mx-auto mb-1" />
            <span className="text-[10px] text-slate-500 block">Total Area</span>
            <span className="text-xs font-bold text-slate-900 line-clamp-1">{prop.area}</span>
          </div>

          {prop.bedrooms ? (
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-2xs">
              <BedDouble className="w-4 h-4 text-teal-600 mx-auto mb-1" />
              <span className="text-[10px] text-slate-500 block">Bedrooms</span>
              <span className="text-xs font-bold text-slate-900">{prop.bedrooms} Bedrooms</span>
            </div>
          ) : (
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-2xs">
              <Home className="w-4 h-4 text-teal-600 mx-auto mb-1" />
              <span className="text-[10px] text-slate-500 block">Property Type</span>
              <span className="text-xs font-bold text-slate-900">{prop.propertyType}</span>
            </div>
          )}

          {prop.bathrooms ? (
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-2xs">
              <Bath className="w-4 h-4 text-teal-600 mx-auto mb-1" />
              <span className="text-[10px] text-slate-500 block">Bathrooms</span>
              <span className="text-xs font-bold text-slate-900">{prop.bathrooms} Luxury</span>
            </div>
          ) : (
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-teal-600 mx-auto mb-1" />
              <span className="text-[10px] text-slate-500 block">Title Status</span>
              <span className="text-xs font-bold text-slate-900">Clear Freehold</span>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Property Overview
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            {prop.description}
          </p>
        </div>

        {/* Mediator Profile Card */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
            Authorized Property Advisor & Mediator
          </span>
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900 block text-sm">
                {prop.mediator.name}
              </span>
              <span className="text-slate-500 block">{prop.mediator.company}</span>
              <span className="text-[11px] text-teal-700 block mt-0.5">
                {prop.mediator.experience}
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 text-teal-700 font-bold border border-teal-200/60">
              <Phone className="w-3.5 h-3.5" />
              <span>{prop.mediator.phone}</span>
            </div>
          </div>
        </div>

        {/* Map Preview */}
        <div className="p-3.5 rounded-2xl bg-slate-900 text-white space-y-2">
          <div className="flex justify-between items-center text-xs font-bold">
            <span>Location Discovery</span>
            <span className="text-teal-400 text-[11px]">{prop.location}</span>
          </div>
          <button
            onClick={() => navigate({ name: 'map', focusId: prop.id })}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Map className="w-3.5 h-3.5 text-teal-400" />
            <span>Locate on Interactive Map</span>
          </button>
        </div>

      </div>

      {/* Sticky Bottom Enquiry CTA */}
      <div className="sticky bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 z-30 w-full flex items-center justify-between gap-3 shadow-lg">
        <div>
          <span className="text-[10px] text-slate-500 uppercase font-bold block">Listing Price</span>
          <span className="text-base font-extrabold text-slate-900 tabular-nums">
            {prop.priceFormatted}
          </span>
        </div>

        <button
          onClick={() => setIsEnquiryOpen(true)}
          className="flex-1 py-3 px-5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Contact Mediator / Enquiry</span>
        </button>
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        type="property"
        targetId={prop.id}
        targetTitle={prop.title}
        recipientName={prop.mediator.name}
        recipientContact={prop.mediator.phone}
      />

    </div>
  );
};
