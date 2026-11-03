import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Share2, 
  Star, 
  MapPin, 
  Languages, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MessageSquare, 
  Calendar,
  Package,
  Clock,
  Check,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sparkles,
  Heart
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SAMPLE_GUIDES, SAMPLE_PACKAGES } from '../../data/sampleData';
import { TourPackage } from '../../types';
import { StarRating } from '../common/StarRating';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { EnquiryModal } from '../modals/EnquiryModal';
import { BookingFlowModal } from '../modals/BookingFlowModal';

export const GuideDetailScreen: React.FC<{ id: string }> = ({ id }) => {
  const { goBack, reviews, showToast, navigate, toggleFavourite, isFavourite } = useApp();
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedBookingPackage, setSelectedBookingPackage] = useState<TourPackage | null>(null);
  const [expandedItineraries, setExpandedItineraries] = useState<Record<string, boolean>>({});
  const [activeImageIndexes, setActiveImageIndexes] = useState<Record<string, number>>({});

  const guide = SAMPLE_GUIDES.find((g) => g.id === id) || SAMPLE_GUIDES[0];
  const guideReviews = reviews.filter((r) => r.targetId === guide.id || r.targetType === 'guide');

  // Match packages for this specific guide
  const guidePackages = (() => {
    if (guide.id === 'guide-1') {
      return SAMPLE_PACKAGES.filter((p) => p.id === 'pkg-1' || p.destination.toLowerCase().includes('saona') || p.destination.toLowerCase().includes('bayahíbe'));
    }
    if (guide.id === 'guide-2') {
      return SAMPLE_PACKAGES.filter((p) => p.id === 'pkg-2' || p.id === 'pkg-4' || p.destination.toLowerCase().includes('chavón') || p.destination.toLowerCase().includes('maravillas'));
    }
    if (guide.id === 'guide-3') {
      return SAMPLE_PACKAGES.filter((p) => p.id === 'pkg-3' || p.destination.toLowerCase().includes('catalina'));
    }
    // Fallback match by service areas
    return SAMPLE_PACKAGES.filter((pkg) =>
      guide.serviceAreas.some((area) => pkg.destination.toLowerCase().includes(area.toLowerCase()))
    );
  })();

  const toggleItinerary = (pkgId: string) => {
    setExpandedItineraries((prev) => ({
      ...prev,
      [pkgId]: !prev[pkgId]
    }));
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast(`Shared "${guide.name}" profile link copied!`, 'info');
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
          <span className="text-xs font-bold text-slate-900 truncate block">{guide.name}</span>
          <span className="text-[10px] text-teal-600 font-semibold truncate block">Guided Tour Packages ({guidePackages.length})</span>
        </div>

        <button
          onClick={handleShare}
          className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer border border-slate-200/80"
          title="Share Guide Profile"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Guide Header Banner */}
      <div className="p-6 bg-teal-50/70 border-b border-teal-100 text-slate-900 text-center relative overflow-hidden">
        <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-3 border-teal-500 shadow-sm mb-3">
          <img src={guide.avatar} alt={guide.name} className="w-full h-full object-cover" />
        </div>

        <div className="flex items-center justify-center gap-1.5">
          <h1 className="text-lg font-extrabold text-slate-900">{guide.name}</h1>
          <ShieldCheck className="w-4 h-4 text-teal-600" />
        </div>

        <p className="text-xs text-slate-600 mt-0.5">
          {guide.experienceYears} Years Guiding Experience · Politur & Mitur Certified
        </p>

        <div className="mt-3 flex items-center justify-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <StarRating rating={guide.rating} size="sm" showNumber={true} reviewCount={guide.reviewCount} />
          </div>
          <span className="text-slate-600">|</span>
          <span className="font-extrabold text-teal-700 tabular-nums">
            ${guide.perDayFee.toLocaleString()} USD{' '}
            <span className="text-[10px] font-normal text-slate-500">/ day</span>
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="p-4 space-y-5 text-slate-800">
        
        {/* Service Areas & Languages */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-500">
              <Languages className="w-3.5 h-3.5 text-teal-600" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Languages</span>
            </div>
            <span className="text-xs font-bold text-slate-900 block">
              {guide.languages.join(', ')}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-teal-600" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Regions Covered</span>
            </div>
            <span className="text-xs font-bold text-slate-900 block truncate">
              {guide.serviceAreas.join(', ')}
            </span>
          </div>
        </div>

        {/* Biography */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            About {guide.name}
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            {guide.bio}
          </p>
        </div>

        {/* =====================================================================
            PACKAGES LED BY THIS GUIDE WITH DETAILED EXPLANATIONS & ITINERARIES
        ===================================================================== */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 border border-teal-200/80 flex items-center justify-center shrink-0">
                <Package className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-extrabold text-slate-900">
                  Tour Packages Guided by {guide.name.split(' ')[0]}
                </h2>
                <span className="text-[10px] text-slate-500 block">
                  Complete itineraries, high-res images & package details
                </span>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 border border-teal-200/60">
              {guidePackages.length} Package{guidePackages.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="space-y-5">
            {guidePackages.map((pkg) => {
              const isFav = isFavourite(pkg.id);
              const activeImgIdx = activeImageIndexes[pkg.id] || 0;
              const isExpanded = !!expandedItineraries[pkg.id];
              const displayedItinerary = isExpanded ? pkg.itinerary : pkg.itinerary;

              return (
                <div
                  key={pkg.id}
                  className="rounded-3xl border border-slate-200 bg-white p-4 shadow-xs space-y-3.5 hover:border-teal-500 transition-all"
                >
                  {/* Hero Package Image Gallery & Badges */}
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100">
                    <ImageWithFallback 
                      src={pkg.images[activeImgIdx] || pkg.images[0]} 
                      alt={pkg.name} 
                    />

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavourite(pkg.id, pkg.name);
                      }}
                      className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center text-slate-700 hover:text-rose-500 transition-colors shadow-2xs cursor-pointer"
                      title="Save Package"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>

                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-md bg-teal-600 text-white font-extrabold text-[10px] shadow-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {pkg.duration}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                      <div className="flex gap-1.5">
                        {pkg.images.map((img, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setActiveImageIndexes((prev) => ({ ...prev, [pkg.id]: idx }))}
                            className={`w-9 h-7 rounded-md overflow-hidden border-2 transition-all cursor-pointer ${
                              activeImgIdx === idx ? 'border-teal-400 scale-105' : 'border-white/60 opacity-80'
                            }`}
                          >
                            <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>

                      <span className="px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-md text-[10px] font-bold text-slate-900 flex items-center gap-1 shadow-2xs">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{pkg.rating} ({pkg.reviewCount})</span>
                      </span>
                    </div>
                  </div>

                  {/* Header info */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-teal-700">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span>{pkg.destination}</span>
                    </div>
                    <h3 
                      onClick={() => navigate({ name: 'package_detail', id: pkg.id })}
                      className="text-sm font-extrabold text-slate-900 leading-snug hover:text-teal-600 transition-colors cursor-pointer"
                    >
                      {pkg.name}
                    </h3>
                  </div>

                  {/* Detailed Tour Explanation */}
                  <div className="p-3.5 rounded-2xl bg-teal-50/60 border border-teal-200/70 space-y-1.5 text-xs">
                    <div className="flex items-center gap-1.5 text-teal-900 font-extrabold text-[11px] uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>Package Details & Tour Explanation</span>
                    </div>
                    <p className="text-slate-700 text-xs leading-relaxed">
                      {pkg.description}
                    </p>
                    <div className="pt-2 border-t border-teal-200/50 flex flex-col gap-1 text-[11px] text-teal-950 font-medium">
                      <span><strong>Pickup & Meeting Point:</strong> {pkg.meetingPoint}</span>
                      <span><strong>Cancellation Policy:</strong> {pkg.cancellationPolicy}</span>
                    </div>
                  </div>

                  {/* Complete Stage-by-Stage Detailed Itinerary */}
                  <div className="rounded-2xl bg-slate-50 border border-slate-200/90 p-3.5 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-teal-600" />
                        <span className="text-xs font-bold text-slate-900">
                          Complete Itinerary ({pkg.itinerary.length} Stages)
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2.5 pt-1 border-t border-slate-200/70">
                      {displayedItinerary.map((stage, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2.5 text-xs">
                          <span className="w-5 h-5 rounded-full bg-teal-600 text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                            {stage.day}
                          </span>
                          <div className="min-w-0 flex-1">
                            <span className="font-bold text-slate-900 block leading-tight">
                              {stage.title}
                            </span>
                            <span className="text-[11px] text-slate-600 leading-relaxed block mt-0.5">
                              {stage.details}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Inclusions summary */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Package Inclusions:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {pkg.inclusions.map((inc, iIdx) => (
                        <span key={iIdx} className="px-2 py-0.5 rounded-md bg-teal-50/80 text-[10px] text-teal-900 font-medium border border-teal-200/60">
                          ✓ {inc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing & Booking Action */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[9px] text-slate-400 block font-bold uppercase">Rate per Person</span>
                      <span className="text-base font-black text-slate-900 tabular-nums">
                        ${pkg.pricePerPerson} USD
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => navigate({ name: 'package_detail', id: pkg.id })}
                        className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer border border-slate-200/80"
                      >
                        Full Page
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedBookingPackage(pkg)}
                        className="py-2 px-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                      >
                        <span>Book Package</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Contact information card */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
          <span className="font-bold text-slate-900 block">
            Direct Guide Verification Details
          </span>
          <div className="flex items-center gap-2 text-slate-600">
            <Phone className="w-3.5 h-3.5 text-teal-600" />
            <span>{guide.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Mail className="w-3.5 h-3.5 text-teal-600" />
            <span>{guide.email}</span>
          </div>
        </div>

        {/* Reviews */}
        <div className="space-y-2.5 pt-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Traveler Testimonials
          </h2>
          {guideReviews.length > 0 ? (
            guideReviews.map((rev) => (
              <div key={rev.id} className="p-3.5 rounded-2xl bg-white border border-slate-200/80 space-y-1 shadow-2xs">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-900">{rev.authorName}</span>
                  <span className="text-[10px] text-slate-400">{rev.date}</span>
                </div>
                <StarRating rating={rev.rating} size="sm" showNumber={false} />
                <p className="text-xs text-slate-600">{rev.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-500">
              "Carlos showed us hidden mangrove channels at Saona and ensured our VIP catamaran passes were ready beforehand. Highly recommended!"
            </p>
          )}
        </div>

      </div>

      {/* Sticky Bottom Action */}
      <div className="sticky bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 z-30 w-full shadow-lg">
        <button
          onClick={() => setIsEnquiryOpen(true)}
          className="w-full py-3.5 px-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Contact Guide Directly (Demo Enquiry)</span>
        </button>
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        type="guide"
        targetId={guide.id}
        targetTitle={guide.name}
        recipientName={guide.name}
        recipientContact={guide.phone}
      />

      {/* Package Booking Modal */}
      {selectedBookingPackage && (
        <BookingFlowModal
          isOpen={true}
          onClose={() => setSelectedBookingPackage(null)}
          tourPackage={selectedBookingPackage}
        />
      )}

    </div>
  );
};
