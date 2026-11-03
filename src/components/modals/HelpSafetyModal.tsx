import React, { useState } from 'react';
import { X, PhoneCall, ShieldAlert, HeartPulse, LifeBuoy, AlertTriangle, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HelpSafetyModal: React.FC = () => {
  const { isHelpSafetyOpen, setHelpSafetyOpen, showToast } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!isHelpSafetyOpen) return null;

  const emergencyContacts = [
    { title: 'National Emergency', number: '911', desc: 'Police, Fire, Ambulance (Dominican Republic 24/7)' },
    { title: 'Politur Tourist Police', number: '+1 (809) 200-3500', desc: 'Specialized Tourist Security Corp 24/7' },
    { title: 'Cruz Roja Dominicana', number: '+1 (809) 334-4545', desc: 'Dominican Red Cross Medical Aid' },
    { title: 'Clínica Canela La Romana', number: '+1 (809) 550-6060', desc: 'Regional Emergency Medical Center' },
  ];

  const safetyTips = [
    'Always carry verified digital copies of your passport and Dominican tourist entry card.',
    'Keep your resort concierge and catamaran charter contacts saved offline when sailing to Isla Saona.',
    'Use certified authorized resort taxis or hotel transfer shuttles between La Romana and Punta Cana / Santo Domingo.',
    'Drink sealed bottled water and apply reef-safe sunscreen when visiting Cotubanamá National Park coral reefs.'
  ];

  const faqs = [
    {
      q: 'How does booking work in this La Romana prototype?',
      a: 'This interactive prototype allows you to explore Saona catamaran excursions, Casa de Campo villas, Altos de Chavón guides, and artisan Larimar crafts with simulated confirmations and instant vouchers.'
    },
    {
      q: 'Are the emergency contacts real for Dominican Republic?',
      a: 'Yes, 9-1-1 and Politur (+1 809 200-3500) are the official national emergency and tourist police services in the Dominican Republic, configured as demonstration data. Tapping copies the helpline.'
    },
    {
      q: 'What is the refund and cancellation policy for excursions?',
      a: 'Catamaran excursions to Isla Saona and Catalina Island offer free cancellation up to 24-48 hours before scheduled departure. Real estate enquiries in Casa de Campo are completely free and non-binding.'
    }
  ];

  const handleCopyContact = (num: string, title: string) => {
    navigator.clipboard?.writeText(num);
    showToast(`Copied ${title} (${num}) to clipboard`, 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white text-slate-900 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200">
              <ShieldAlert className="w-4 h-4 text-teal-600" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Help & Safety Hub</h2>
              <p className="text-[11px] text-slate-500">24/7 Traveler Care & Advisory · Dominican Republic</p>
            </div>
          </div>
          <button
            onClick={() => setHelpSafetyOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer border border-slate-200"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-slate-800">
          
          {/* Emergency Alert Banner */}
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-semibold text-amber-900 block">Sample Demo Data Notice</span>
              <p className="text-amber-800 mt-0.5 leading-relaxed">
                Emergency values are sample configuration data for the prototype. In actual emergency situations, dial your region's local emergency department directly.
              </p>
            </div>
          </div>

          {/* Emergency Helplines Grid */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-teal-600" />
              Emergency Helplines
            </h3>
            <div className="grid grid-cols-1 gap-2.5">
              {emergencyContacts.map((contact, idx) => (
                <div
                  key={idx}
                  onClick={() => handleCopyContact(contact.number, contact.title)}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-teal-500 cursor-pointer transition-all flex items-center justify-between"
                >
                  <div className="min-w-0 pr-2">
                    <span className="text-xs font-medium text-slate-900 block truncate">{contact.title}</span>
                    <span className="text-[11px] text-slate-500 block truncate">{contact.desc}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-50 text-teal-700 font-bold text-xs shrink-0 border border-teal-200/60">
                    <PhoneCall className="w-3 h-3" />
                    <span>{contact.number}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Traveler Safety Tips */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <HeartPulse className="w-3.5 h-3.5 text-rose-500" />
              Essential Safety Tips
            </h3>
            <div className="space-y-2">
              {safetyTips.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Accordion */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <LifeBuoy className="w-3.5 h-3.5 text-indigo-500" />
              Frequently Asked Questions
            </h3>
            <div className="space-y-2">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-2xs">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full px-4 py-3 text-left flex items-center justify-between text-xs font-semibold text-slate-900 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>
                    {isOpen && (
                      <div className="px-4 py-3 text-xs text-slate-600 bg-white leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Support Action */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between gap-3">
            <div>
              <span className="text-xs font-semibold block">Need direct concierge assistance?</span>
              <span className="text-[11px] text-slate-300">Our customer care team is available 24/7</span>
            </div>
            <button
              onClick={() => {
                showToast('Concierge chat request submitted. A representative will connect shortly.', 'success');
              }}
              className="px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold text-xs whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Support Chat
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={() => setHelpSafetyOpen(false)}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors cursor-pointer"
          >
            Back to Application
          </button>
        </div>

      </div>
    </div>
  );
};
