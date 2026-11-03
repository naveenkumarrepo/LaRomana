import React, { useState } from 'react';
import { 
  ArrowLeft, 
  PhoneCall, 
  ShieldAlert, 
  HeartPulse, 
  LifeBuoy, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare,
  Copy,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HelpSafetyScreen: React.FC = () => {
  const { goBack, showToast, setAiAssistantOpen } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

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
    setCopiedNumber(num);
    showToast(`Copied ${title} (${num}) to clipboard`, 'info');
    setTimeout(() => setCopiedNumber(null), 2500);
  };

  return (
    <div className="pb-24 animate-in fade-in duration-200">
      
      {/* Top Sticky App Bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between p-3.5 bg-white/95 backdrop-blur-md text-slate-900 border-b border-slate-200 shadow-2xs">
        <button
          onClick={goBack}
          className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer border border-slate-200/80"
          title="Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="text-center">
          <h1 className="text-sm font-bold text-slate-900">Help & Safety Advisory</h1>
          <p className="text-[10px] text-teal-700 font-semibold">24/7 Traveler Care · Dominican Republic</p>
        </div>

        <div className="w-9" />
      </div>

      {/* Screen Body */}
      <div className="p-4 space-y-5 text-slate-800">
        
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
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
            <PhoneCall className="w-3.5 h-3.5 text-teal-600" />
            24/7 Emergency Helplines
          </h3>
          <div className="grid grid-cols-1 gap-2.5">
            {emergencyContacts.map((contact, idx) => {
              const isCopied = copiedNumber === contact.number;
              return (
                <div
                  key={idx}
                  onClick={() => handleCopyContact(contact.number, contact.title)}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-teal-500 cursor-pointer transition-all shadow-2xs flex items-center justify-between group"
                >
                  <div className="min-w-0 pr-2">
                    <span className="text-xs font-bold text-slate-900 block truncate group-hover:text-teal-700 transition-colors">
                      {contact.title}
                    </span>
                    <span className="text-[11px] text-slate-500 block truncate mt-0.5">
                      {contact.desc}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 text-teal-700 font-bold text-xs shrink-0 border border-teal-200/60">
                    {isCopied ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <PhoneCall className="w-3 h-3" />}
                    <span>{contact.number}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Traveler Safety Tips */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
            <HeartPulse className="w-3.5 h-3.5 text-rose-500" />
            Essential Traveler Safety Tips
          </h3>
          <div className="space-y-2 bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
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
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
            <LifeBuoy className="w-3.5 h-3.5 text-indigo-500" />
            Frequently Asked Questions
          </h3>
          <div className="space-y-2">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-2xs">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-4 py-3.5 text-left flex items-center justify-between text-xs font-semibold text-slate-900 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span className="pr-2">{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-4 py-3 text-xs text-slate-600 bg-slate-50 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Support Action */}
        <div className="p-4 rounded-3xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between gap-3 shadow-md">
          <div>
            <span className="text-xs font-bold block">Need direct concierge assistance?</span>
            <span className="text-[11px] text-slate-300">Our customer care team is available 24/7</span>
          </div>
          <button
            onClick={() => {
              showToast('Concierge chat request submitted. A representative will connect shortly.', 'success');
              setAiAssistantOpen(true);
            }}
            className="px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Support Chat</span>
          </button>
        </div>

      </div>

    </div>
  );
};
