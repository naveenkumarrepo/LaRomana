import React, { useState } from 'react';
import { X, Calendar, Users, Check, ArrowRight, ShieldCheck, CreditCard, Sparkles, AlertCircle } from 'lucide-react';
import { TourPackage } from '../../types';
import { useApp } from '../../context/AppContext';

interface BookingFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  tourPackage: TourPackage;
}

export const BookingFlowModal: React.FC<BookingFlowModalProps> = ({
  isOpen,
  onClose,
  tourPackage
}) => {
  const { user, createBooking, navigate, showToast } = useApp();
  
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedDate, setSelectedDate] = useState<string>(tourPackage.departureDates[0] || '2026-11-20');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [fullName, setFullName] = useState<string>(user.name || 'Alejandro De La Cruz');
  const [email, setEmail] = useState<string>(user.email || 'alejandro.delacruz@oneplace.do');
  const [phone, setPhone] = useState<string>(user.phone || '+1 (809) 556-8821');
  const [paymentMethod, setPaymentMethod] = useState<string>('Credit Card (Visa / Mastercard)');
  const [bookingRef, setBookingRef] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const pricePerPerson = tourPackage.pricePerPerson;
  const packageSubtotal = pricePerPerson * guestCount;
  const taxesGst = Math.round(packageSubtotal * 0.05);
  const grandTotal = packageSubtotal + taxesGst;

  const handleConfirmBooking = () => {
    if (isSubmitting || bookingRef) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const ref = createBooking({
        packageId: tourPackage.id,
        packageName: tourPackage.name,
        destination: tourPackage.destination,
        image: tourPackage.images[0],
        travelDate: selectedDate,
        guestsCount: guestCount,
        totalAmount: grandTotal,
        guestDetails: {
          fullName,
          email,
          phone
        },
        paymentMethod
      });
      setBookingRef(ref);
      setIsSubmitting(false);
      setStep(4);
      showToast(`Package Booking Confirmed! Ref: ${ref}`, 'success');
    }, 600);
  };

  const handleClose = () => {
    setStep(1);
    setBookingRef(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs p-0 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl shadow-2xl overflow-hidden border-t border-x border-slate-200 max-h-[90%] flex flex-col animate-in slide-in-from-bottom duration-200">
        
        {/* Header - Light Theme */}
        <div className="p-4 bg-white text-slate-900 flex items-center justify-between border-b border-slate-200 shrink-0">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-600">Step {step} of 4</span>
            <h3 className="text-sm font-extrabold text-slate-900 truncate max-w-[260px]">
              {step === 1 && 'Travel Dates & Travellers'}
              {step === 2 && 'Traveller Details & Review'}
              {step === 3 && 'Simulated Payment Selection'}
              {step === 4 && 'Booking Confirmed!'}
            </h3>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="w-full bg-slate-100 h-1">
          <div
            className="bg-teal-600 h-1 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 text-slate-800 space-y-4">
          
          {/* STEP 1: Date & Guests */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 block">Package Selected</span>
                <span className="text-xs font-bold text-slate-900 block mt-0.5">{tourPackage.name}</span>
                <span className="text-[11px] text-teal-700 block font-semibold mt-0.5">
                  ${pricePerPerson.toLocaleString()} USD per person · {tourPackage.duration}
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Select Departure Date
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {tourPackage.departureDates.map((date) => {
                    const isSelected = selectedDate === date;
                    const dateFormatted = new Date(date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    });
                    return (
                      <button
                        type="button"
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-teal-500 bg-teal-50/70 text-teal-950 font-bold'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs">{dateFormatted}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-teal-600" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Number of Travellers
                </label>
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-500" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Adult Guests</span>
                      <span className="text-[11px] text-slate-500">Ages 12 and above</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={guestCount <= 1}
                      onClick={() => setGuestCount((g) => Math.max(1, g - 1))}
                      className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center font-bold text-slate-700 disabled:opacity-40 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-sm font-bold tabular-nums min-w-[20px] text-center">
                      {guestCount}
                    </span>
                    <button
                      type="button"
                      disabled={guestCount >= 10}
                      onClick={() => setGuestCount((g) => Math.min(10, g + 1))}
                      className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center font-bold text-slate-700 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-200 text-xs flex justify-between items-center">
                <span className="text-slate-600">Estimated Total:</span>
                <span className="font-extrabold text-teal-800 text-sm">
                  ${grandTotal.toLocaleString('en-US')} USD
                </span>
              </div>
            </div>
          )}

          {/* STEP 2: Customer Details & Itinerary confirmation */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Lead Traveller Information
                </h4>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name (as on Govt ID)
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <span className="font-bold text-slate-900 block mb-1">Cost Breakdown</span>
                <div className="flex justify-between text-slate-600">
                  <span>{tourPackage.name.slice(0, 30)}... × {guestCount}</span>
                  <span className="tabular-nums font-semibold">${packageSubtotal.toLocaleString('en-US')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>ITBIS & Marine Park Fee (5%)</span>
                  <span className="tabular-nums font-semibold">${taxesGst.toLocaleString('en-US')}</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-sm text-slate-900">
                  <span>Total Payable</span>
                  <span className="text-teal-700">${grandTotal.toLocaleString('en-US')} USD</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Simulated Payment Method */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-xs flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0" />
                <span className="text-teal-900 font-medium leading-relaxed">
                  Sandbox demo environment. No real funds will be deducted. Select your preferred test channel.
                </span>
              </div>

              <div className="space-y-2.5">
                {[
                  { id: 'Credit/Debit Card (Visa / Mastercard)', label: 'International Cards (Visa / Mastercard / Amex)', desc: 'Instant 3DS secure mock gateway' },
                  { id: 'Banco Popular Dominicano Transfer', label: 'Banco Popular Dominicano (BPD)', desc: 'Direct online bank transfer demo' },
                  { id: 'Banreservas Online', label: 'Banreservas TuEfectivo', desc: 'Dominican Republic national network' }
                ].map((method) => {
                  const isSelected = paymentMethod === method.id;
                  return (
                    <button
                      type="button"
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'border-teal-500 bg-teal-50/60 shadow-xs'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">{method.label}</span>
                        <span className="text-[11px] text-slate-500">{method.desc}</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-teal-600 bg-teal-600' : 'border-slate-300'}`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex justify-between font-bold">
                <span className="text-slate-500">Amount to Authorize:</span>
                <span className="text-slate-900">${grandTotal.toLocaleString('en-US')} USD</span>
              </div>
            </div>
          )}

          {/* STEP 4: Success confirmation */}
          {step === 4 && (
            <div className="py-4 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-600 mx-auto flex items-center justify-center">
                <Sparkles className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                  Booking Confirmed
                </span>
                <h4 className="text-xl font-black text-slate-900 mt-1">
                  #{bookingRef}
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Pack your bags! A voucher copy has been logged to your OnePlace profile.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Destination:</span>
                  <span className="font-bold text-slate-800">{tourPackage.destination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Departure Date:</span>
                  <span className="font-bold text-slate-800">{selectedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Travellers:</span>
                  <span className="font-bold text-slate-800">{guestCount} Guests</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment:</span>
                  <span className="font-bold text-teal-700">{paymentMethod}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    navigate({ name: 'my_bookings' });
                  }}
                  className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  View My Bookings
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
                >
                  Continue Exploring
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer controls for steps 1-3 */}
        {step < 4 && (
          <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as any)}
                className="py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-white cursor-pointer"
              >
                Back
              </button>
            ) : (
              <button
                type="button"
                onClick={handleClose}
                className="py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Cancel
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s + 1) as any)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleConfirmBooking}
                className="flex-1 py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Processing Demo Booking...</span>
                ) : (
                  <>
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Authorize Demo Booking</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
