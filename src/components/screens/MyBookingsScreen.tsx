import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  ChevronRight,
  Package
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ImageWithFallback } from '../common/ImageWithFallback';

export const MyBookingsScreen: React.FC = () => {
  const { goBack, bookings, cancelBooking, navigate } = useApp();
  const [filter, setFilter] = useState<'All' | 'Upcoming' | 'Completed' | 'Cancelled'>('All');

  const filteredBookings = bookings.filter((b) => {
    if (filter === 'All') return true;
    return b.status === filter;
  });

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

        <h1 className="text-sm font-bold text-slate-900">My Tour Bookings</h1>
        <div className="w-9" />
      </div>

      {/* Tabs */}
      <div className="p-4 bg-white border-b border-slate-200">
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
          {['All', 'Upcoming', 'Completed', 'Cancelled'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filter === tab
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      <div className="p-4 space-y-3.5">
        {filteredBookings.length === 0 ? (
          <div className="py-12 text-center space-y-3 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
            <Package className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-sm font-bold text-slate-900">No {filter.toLowerCase()} bookings</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Plan your next holiday in Isla Saona, Altos de Chavón, or Catalina Reef.
            </p>
            <button
              onClick={() => navigate({ name: 'explore', initialCategory: 'packages' })}
              className="px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-bold hover:bg-teal-700 transition-colors cursor-pointer shadow-xs"
            >
              Discover Tour Packages
            </button>
          </div>
        ) : (
          filteredBookings.map((b) => (
            <div
              key={b.id}
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
                <span className="font-bold text-slate-900">
                  Ref #{b.id}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                  b.status === 'Upcoming'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : b.status === 'Completed'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}>
                  {b.status}
                </span>
              </div>

              <div className="flex gap-3">
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                  <ImageWithFallback src={b.image} alt={b.packageName} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-bold text-slate-900 line-clamp-1">
                    {b.packageName}
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                    <MapPin className="w-3 h-3 text-teal-600 shrink-0" />
                    <span>{b.destination}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>Departure: {b.travelDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <Users className="w-3 h-3 text-slate-400" />
                    <span>{b.guestsCount} Guests</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Total Amount</span>
                  <span className="text-xs font-black text-slate-900 tabular-nums">
                    ${b.totalAmount.toLocaleString()} USD
                  </span>
                </div>

                <div className="flex gap-2">
                  {b.status === 'Upcoming' && (
                    <button
                      onClick={() => cancelBooking(b.id)}
                      className="px-3 py-1.5 rounded-lg border border-rose-200 text-[11px] font-semibold text-rose-600 hover:bg-rose-50 cursor-pointer"
                    >
                      Cancel Booking
                    </button>
                  )}
                  <button
                    onClick={() => navigate({ name: 'package_detail', id: b.packageId })}
                    className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-[11px] font-bold cursor-pointer shadow-xs"
                  >
                    View Tour
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
