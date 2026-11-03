import React, { useState } from 'react';
import { X, MapPin, CreditCard, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { 
    user, 
    cartItems, 
    cartSubtotal, 
    cartShipping, 
    cartTax, 
    cartTotal, 
    placeOrder, 
    navigate, 
    showToast 
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [fullName, setFullName] = useState(user.name || 'Alejandro De La Cruz');
  const [addressLine, setAddressLine] = useState(
    user.savedAddresses[0]?.addressLine || 'Villa Palmeras 14, Barranca Este'
  );
  const [city, setCity] = useState(user.savedAddresses[0]?.city || 'Casa de Campo, La Romana');
  const [postalCode, setPostalCode] = useState(user.savedAddresses[0]?.postalCode || '22000');
  const [phone, setPhone] = useState(user.phone || '+1 (809) 556-8821');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card (Visa / Mastercard)');
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePlaceOrder = () => {
    if (isProcessing || confirmedOrderId) return;
    setIsProcessing(true);

    setTimeout(() => {
      const orderId = placeOrder(
        {
          fullName,
          addressLine,
          city,
          postalCode,
          phone
        },
        paymentMethod
      );
      setConfirmedOrderId(orderId);
      setIsProcessing(false);
      setStep(4);
      showToast(`Order Placed! Reference: #${orderId}`, 'success');
    }, 600);
  };

  const handleClose = () => {
    setStep(1);
    setConfirmedOrderId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 bg-white border-b border-slate-200 text-slate-900 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-600">Checkout Step {step} of 4</span>
            <h3 className="text-sm font-extrabold text-slate-900">
              {step === 1 && 'Delivery Address'}
              {step === 2 && 'Order Summary Review'}
              {step === 3 && 'Payment Method'}
              {step === 4 && 'Order Confirmed!'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer border border-slate-200/80"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-100 h-1">
          <div
            className="bg-teal-600 h-1 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 text-slate-800 space-y-4">
          
          {/* STEP 1: Address */}
          {step === 1 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                <span>Shipping Destination</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Recipient Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Street Address / House No.
                </label>
                <input
                  type="text"
                  required
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City, State
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Postal PIN Code
                  </label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Summary */}
          {step === 2 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase text-slate-600">
                Items ({cartItems.length})
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {cartItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                  >
                    <div className="truncate max-w-[200px]">
                      <span className="font-bold text-slate-900 block truncate">
                        {item.product.name}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {item.selectedVariant || 'Standard'} · Qty: {item.quantity}
                      </span>
                    </div>
                    <span className="font-bold tabular-nums text-slate-900">
                      ${(item.product.price * item.quantity).toLocaleString('en-US')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Details */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="tabular-nums font-semibold">${cartSubtotal.toLocaleString('en-US')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Express Insured Shipping:</span>
                  <span className="tabular-nums font-semibold text-teal-700">{cartShipping === 0 ? 'FREE' : `$${cartShipping}`}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Dominican ITBIS (5%):</span>
                  <span className="tabular-nums font-semibold">${cartTax.toLocaleString('en-US')}</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-sm text-slate-900">
                  <span>Order Total:</span>
                  <span className="text-teal-700">${cartTotal.toLocaleString('en-US')} USD</span>
                </div>
              </div>

              {/* Delivery destination preview */}
              <div className="p-3 rounded-xl border border-dashed border-slate-300 text-xs text-slate-600">
                <span className="font-bold text-slate-900 block">Delivering to:</span>
                <span>{fullName} · {addressLine}, {city} ({postalCode})</span>
              </div>
            </div>
          )}

          {/* STEP 3: Payment */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                <span className="text-teal-900 font-medium">
                  Select a simulated payment method. This is an interactive sandbox test.
                </span>
              </div>

              <div className="space-y-2">
                {[
                  { id: 'Credit Card (Visa / Mastercard)', label: 'International Cards (Visa / Mastercard / Amex)' },
                  { id: 'Banco Popular Dominicano Transfer', label: 'Banco Popular Dominicano (BPD)' },
                  { id: 'Pay upon Delivery (La Romana)', label: 'Payment on Delivery in La Romana / Casa de Campo' }
                ].map((item) => {
                  const isSelected = paymentMethod === item.id;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setPaymentMethod(item.id)}
                      className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'border-teal-500 bg-teal-50/70 font-bold'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-xs text-slate-900">{item.label}</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-teal-600 bg-teal-600' : 'border-slate-300'}`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between font-bold text-xs">
                <span className="text-slate-500">Final Payable:</span>
                <span className="text-slate-900">${cartTotal.toLocaleString('en-US')} USD</span>
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
                  Order Successfully Placed
                </span>
                <h4 className="text-xl font-black text-slate-900 mt-1">
                  #{confirmedOrderId}
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Your artisanal order is confirmed and will be packed with care by our Dominican heritage craft partners.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Status:</span>
                  <span className="font-bold text-teal-700">Confirmed (Demo)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment:</span>
                  <span className="font-bold text-slate-800">{paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Delivery to:</span>
                  <span className="font-semibold text-slate-800 truncate max-w-[200px]">{city}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    navigate({ name: 'my_orders' });
                  }}
                  className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Track in My Orders
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
                >
                  Continue Shopping
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
                disabled={isProcessing}
                onClick={handlePlaceOrder}
                className="flex-1 py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? 'Confirming Order...' : 'Confirm Demo Order'}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
