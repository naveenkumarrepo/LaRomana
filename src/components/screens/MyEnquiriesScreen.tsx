import React from 'react';
import { ArrowLeft, MessageSquare, Clock, CheckCircle2, User, Home, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MyEnquiriesScreen: React.FC = () => {
  const { goBack, enquiries, navigate } = useApp();

  return (
    <div className="pb-24 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="sticky top-0 z-30 flex items-center justify-between p-4 bg-white/95 backdrop-blur-md text-slate-900 border-b border-slate-200 shadow-2xs">
        <button
          onClick={goBack}
          className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <h1 className="text-sm font-bold text-slate-900">My Enquiries & Advisory</h1>
        <div className="w-9" />
      </div>

      <div className="p-4 space-y-3.5">
        {enquiries.length === 0 ? (
          <div className="py-12 text-center space-y-3 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
            <MessageSquare className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-sm font-bold text-slate-900">No active enquiries</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              You can contact certified local tour guides or real estate mediators without obligation.
            </p>
            <button
              onClick={() => navigate({ name: 'explore', initialCategory: 'properties' })}
              className="px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-bold hover:bg-teal-700 transition-colors cursor-pointer shadow-xs"
            >
              Browse Properties & Guides
            </button>
          </div>
        ) : (
          enquiries.map((enq) => (
            <div
              key={enq.id}
              className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  {enq.type === 'property' ? <Home className="w-3.5 h-3.5 text-teal-600" /> : <User className="w-3.5 h-3.5 text-teal-600" />}
                  <span>Ref #{enq.id}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-teal-50 text-teal-700 border border-teal-200">
                  {enq.status}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 block">
                  {enq.type === 'property' ? 'Real Estate Property Enquiry' : 'Private Guide Enquiry'}
                </span>
                <h3 className="text-xs font-bold text-slate-900 mt-0.5">
                  {enq.targetName}
                </h3>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Submitted on {enq.submittedAt}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                <span className="text-[10px] font-bold text-slate-400 block mb-0.5 uppercase tracking-wider">Your Message:</span>
                <p className="italic">"{enq.message}"</p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>Sender: {enq.customerName} ({enq.customerPhone})</span>
                <button
                  onClick={() => {
                    if (enq.type === 'property') navigate({ name: 'property_detail', id: enq.targetId });
                    else navigate({ name: 'guide_detail', id: enq.targetId });
                  }}
                  className="font-bold text-teal-750 hover:underline flex items-center cursor-pointer"
                >
                  View Listing <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
