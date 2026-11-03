import React, { useState } from 'react';
import { X, CheckCircle2, Send, Phone, Mail, User, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'guide' | 'property';
  targetId: string;
  targetTitle: string;
  recipientName: string;
  recipientContact?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  type,
  targetId,
  targetTitle,
  recipientName,
  recipientContact
}) => {
  const { user, isGuest, submitEnquiry, showToast } = useApp();
  const [customerName, setCustomerName] = useState(user.name || 'Alejandro De La Cruz');
  const [customerPhone, setCustomerPhone] = useState(user.phone || '+1 (809) 556-8821');
  const [customerEmail, setCustomerEmail] = useState(user.email || 'alejandro.delacruz@oneplace.do');
  const [message, setMessage] = useState(
    type === 'property'
      ? 'I would like to schedule a private villa tour in Casa de Campo and request the floor plans and title deed summary.'
      : '¡Hola! I am planning a private catamaran excursion in La Romana / Saona and would love to enquire about your availability and itinerary options.'
  );
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = submitEnquiry({
      type,
      targetId,
      targetName: targetTitle,
      customerName,
      customerPhone,
      customerEmail,
      message
    });
    setSubmittedRef(ref);
    showToast(`Enquiry ${ref} sent successfully to ${recipientName}`, 'success');
  };

  const handleResetAndClose = () => {
    setSubmittedRef(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs p-0 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl shadow-2xl overflow-hidden border-t border-x border-slate-200 max-h-[90%] flex flex-col animate-in slide-in-from-bottom duration-200">
        
        {/* Header - Pristine Caribbean Light Theme */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white text-slate-900 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 border border-teal-200/60 flex items-center justify-center shrink-0">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-600 block">
                {type === 'property' ? 'Real Estate Advisory' : 'Licensed Guide Enquiry'}
              </span>
              <h3 className="text-sm font-extrabold text-slate-900 truncate max-w-[240px]">
                {type === 'property' ? 'Contact Property Mediator' : `Connect with ${recipientName}`}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {submittedRef ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-teal-50 text-teal-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Enquiry Dispatched</span>
              <h4 className="text-lg font-bold text-slate-900 mt-1">
                Reference #{submittedRef}
              </h4>
              <p className="text-xs text-slate-500 mt-2 max-w-xs mx-auto leading-relaxed">
                Your enquiry regarding <strong className="text-slate-800">"{targetTitle}"</strong> has been relayed to <strong className="text-slate-800">{recipientName}</strong>.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1">
              <div className="flex justify-between text-slate-500">
                <span>Direct Contact:</span>
                <span className="font-semibold text-slate-800">{recipientContact || '+1 (809) 556-8821'}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Status:</span>
                <span className="font-bold text-teal-700">Received (Demo)</span>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition-colors cursor-pointer shadow-xs"
            >
              Done & Return
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <span className="text-[11px] text-slate-500 block">Recipient</span>
              <span className="font-bold text-slate-900">{recipientName}</span>
              <span className="text-slate-600 block truncate">{targetTitle}</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full pl-8 pr-2.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full pl-8 pr-2.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Enquiry Details
              </label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
              />
            </div>

            <p className="text-[11px] text-slate-400">
              * Simulated submission. No real notifications or phone calls will be triggered.
            </p>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.98] cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Demo Enquiry</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
