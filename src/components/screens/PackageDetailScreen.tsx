import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Clock, 
  MapPin, 
  Calendar, 
  Check, 
  X as CloseIcon, 
  ShieldCheck, 
  Users, 
  Plus, 
  Star,
  ChevronDown,
  ChevronUp,
  UserCheck,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SAMPLE_PACKAGES, SAMPLE_GUIDES } from '../../data/sampleData';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { StarRating } from '../common/StarRating';
import { BookingFlowModal } from '../modals/BookingFlowModal';
import { WriteReviewModal } from '../modals/WriteReviewModal';
import { EnquiryModal } from '../modals/EnquiryModal';

export const PackageDetailScreen: React.FC<{ id: string }> = ({ id }) => {
  const { navigate, goBack, toggleFavourite, isFavourite, reviews, showToast, isGuest, setAuthModalOpen } = useApp();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [isGuideInquiryOpen, setIsGuideInquiryOpen] = useState(false);
  const [openItineraryDay, setOpenItineraryDay] = useState<number | null>(1);

  const pkg = SAMPLE_PACKAGES.find((p) => p.id === id) || SAMPLE_PACKAGES[0];
  const assignedGuide = SAMPLE_GUIDES.find((g) => g.id === pkg.guideId) || SAMPLE_GUIDES[0];
  const isFav = isFavourite(pkg.id);
  const pkgReviews = reviews.filter((r) => r.targetId === pkg.id || r.targetType === 'package');

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast(`Shared "${pkg.name}" link copied!`, 'info');
  };

  const handleStartBooking = () => {
    if (isGuest) {
      setAuthModalOpen(true);
      return;
    }
    setIsBookingModalOpen(true);
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
          <span className="text-xs font-bold text-slate-900 truncate block">{pkg.name}</span>
          <span className="text-[10px] text-teal-600 font-semibold truncate block">{pkg.destination}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleShare}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer border border-slate-200/80"
            title="Share Tour"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleFavourite(pkg.id, pkg.name)}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer border border-slate-200/80"
            title="Save to Favourites"
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Hero Image & Gallery */}
      <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
        <ImageWithFallback
          src={pkg.images[activeImageIndex] || pkg.images[0]}
          alt={pkg.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />

        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
          <div className="flex gap-2">
            {pkg.images.map((img, idx) => (
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
            {pkg.duration}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-5 text-slate-800">
        
        {/* Title, rating, price */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600">
              Guaranteed Departure Tour
            </span>
            <StarRating rating={pkg.rating} size="md" showNumber={true} reviewCount={pkg.reviewCount} />
          </div>

          <h1 className="text-xl font-extrabold text-slate-900 leading-tight">
            {pkg.name}
          </h1>

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span>{pkg.destination}</span>
          </div>

          <div className="pt-2 flex items-baseline gap-2">
            <span className="text-xl font-black text-slate-900 tabular-nums">
              ${pkg.pricePerPerson.toLocaleString()} USD
            </span>
            <span className="text-xs text-slate-500">/ person (park permits & lunch included)</span>
          </div>
        </div>

        {/* Overview */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Tour Overview
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            {pkg.description}
          </p>
        </div>

        {/* Assigned Tourist Guide Card (1 Package = 1 Assigned Guide) */}
        {assignedGuide && (
          <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-50/80 via-white to-emerald-50/60 border border-teal-200/90 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-700 flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-teal-600" />
                Assigned MITUR Tour Guide
              </span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                Exclusive Guide
              </span>
            </div>

            <div className="flex items-start gap-3">
              <div 
                onClick={() => navigate({ name: 'guide_detail', id: assignedGuide.id })}
                className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-teal-500 shrink-0 bg-slate-100 shadow-2xs cursor-pointer hover:scale-105 transition-transform"
              >
                <img src={assignedGuide.avatar} alt={assignedGuide.name} className="w-full h-full object-cover" />
              </div>

              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 
                    onClick={() => navigate({ name: 'guide_detail', id: assignedGuide.id })}
                    className="text-xs font-extrabold text-slate-900 hover:text-teal-600 cursor-pointer truncate"
                  >
                    {assignedGuide.name}
                  </h3>
                  <span className="text-xs font-bold text-teal-800 tabular-nums">
                    ★ {assignedGuide.rating}
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 font-medium">
                  {assignedGuide.experienceYears} Years Licensed Experience
                </p>

                <div className="flex flex-wrap gap-1 pt-0.5">
                  {assignedGuide.languages.map((lang, lIdx) => (
                    <span key={lIdx} className="px-1.5 py-0.2 rounded bg-white text-teal-800 text-[9px] font-semibold border border-teal-200">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
              {assignedGuide.bio}
            </p>

            <div className="pt-2 border-t border-teal-200/60 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => navigate({ name: 'guide_detail', id: assignedGuide.id })}
                className="py-1.5 px-3 rounded-xl bg-white hover:bg-teal-50 text-teal-800 font-bold text-xs border border-teal-200/80 transition-colors cursor-pointer"
              >
                View Profile
              </button>

              <button
                type="button"
                onClick={() => setIsGuideInquiryOpen(true)}
                className="py-1.5 px-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer active:scale-95"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Connect with Guide</span>
              </button>
            </div>
          </div>
        )}

        {/* Meeting point & cancellation policy */}
        <div className="grid grid-cols-1 gap-2.5">
          <div className="p-3 rounded-2xl bg-white border border-slate-200 text-xs shadow-2xs">
            <span className="font-bold text-slate-900 block mb-0.5">
              Pickup & Meeting Point
            </span>
            <span className="text-slate-600">{pkg.meetingPoint}</span>
          </div>

          <div className="p-3 rounded-2xl bg-white border border-slate-200 text-xs shadow-2xs">
            <span className="font-bold text-slate-900 block mb-0.5">
              Cancellation & Refund Policy
            </span>
            <span className="text-slate-600">{pkg.cancellationPolicy}</span>
          </div>
        </div>

        {/* Day-by-Day Itinerary Accordion */}
        <div className="space-y-2.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Day-by-Day Itinerary
          </h2>
          <div className="space-y-2">
            {pkg.itinerary.map((item) => {
              const isOpen = openItineraryDay === item.day;
              return (
                <div
                  key={item.day}
                  className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-2xs"
                >
                  <button
                    onClick={() => setOpenItineraryDay(isOpen ? null : item.day)}
                    className="w-full p-3.5 text-left flex items-center justify-between text-xs font-bold text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-teal-500/10 text-teal-700 flex items-center justify-center text-[10px] font-bold">
                        D{item.day}
                      </span>
                      <span>{item.title}</span>
                    </div>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-3.5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                      {item.details}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Inclusions & Exclusions */}
        <div className="flex flex-col gap-3 pt-1">
          <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200/80 space-y-2 text-xs">
            <span className="font-bold text-teal-950 block">What is Included</span>
            <ul className="space-y-1.5">
              {pkg.inclusions.map((inc, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-700">
                  <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-2 text-xs">
            <span className="font-bold text-rose-950 block">What is Excluded</span>
            <ul className="space-y-1.5">
              {pkg.exclusions.map((exc, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-700">
                  <CloseIcon className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                  <span>{exc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Customer Reviews
              </h2>
              <span className="text-xs font-bold text-slate-900">
                {pkg.rating} ★ Rating ({pkg.reviewCount} verified travelers)
              </span>
            </div>
            <button
              onClick={() => setIsWriteReviewOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-900 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-teal-600" />
              <span>Review</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {pkgReviews.slice(0, 3).map((rev) => (
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

      </div>

      {/* Sticky Bottom Booking Bar */}
      <div className="sticky bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 z-30 flex items-center justify-between gap-4 w-full shadow-lg">
        <div>
          <span className="text-[10px] text-slate-500 block uppercase font-bold">Total per person</span>
          <span className="text-lg font-black text-slate-900 tabular-nums">
            ${pkg.pricePerPerson.toLocaleString()} USD
          </span>
        </div>

        <button
          onClick={handleStartBooking}
          className="flex-1 py-3 px-5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
        >
          <span>Book Tour Package</span>
        </button>
      </div>

      {/* Booking Modal */}
      <BookingFlowModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        tourPackage={pkg}
      />

      {/* Review Modal */}
      <WriteReviewModal
        isOpen={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
        targetId={pkg.id}
        targetType="package"
        targetTitle={pkg.name}
      />

      {/* Connect with Assigned Guide Modal */}
      {assignedGuide && (
        <EnquiryModal
          isOpen={isGuideInquiryOpen}
          onClose={() => setIsGuideInquiryOpen(false)}
          type="guide"
          targetId={assignedGuide.id}
          targetTitle={`Assigned Guide for "${pkg.name}"`}
          recipientName={assignedGuide.name}
          recipientContact={assignedGuide.phone}
        />
      )}

    </div>
  );
};
