import React, { useState } from 'react';
import { 
  User, 
  Package, 
  ShoppingBag, 
  MessageSquare, 
  Heart, 
  ShieldAlert, 
  LogOut, 
  LogIn, 
  ChevronRight, 
  Edit3, 
  Check, 
  Sparkles,
  Compass,
  Globe
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProfileScreen: React.FC = () => {
  const { 
    user, 
    isGuest, 
    loginAsDemoUser, 
    logoutToGuest, 
    updateUserProfile,
    navigate, 
    bookings, 
    orders, 
    enquiries, 
    favourites, 
    setHelpSafetyOpen, 
    setAuthModalOpen,
    showToast 
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editPhone, setEditPhone] = useState(user.phone);
  const [editEmail, setEditEmail] = useState(user.email);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(editName, editPhone, editEmail);
    setIsEditing(false);
  };

  return (
    <div className="pb-28 space-y-5 px-4 pt-2 animate-in fade-in duration-200">
      
      {/* Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Account & Hub
        </h1>
        {isGuest ? (
          <button
            onClick={() => setAuthModalOpen(true)}
            className="text-xs font-bold text-teal-600 flex items-center gap-1 hover:underline cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
        ) : (
          <button
            onClick={logoutToGuest}
            className="text-xs font-semibold text-slate-500 hover:text-rose-500 flex items-center gap-1 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Switch to Guest</span>
          </button>
        )}
      </div>

      {/* User Card */}
      <div className="p-4 rounded-3xl bg-white text-slate-900 relative overflow-hidden shadow-xs border border-slate-200">
        <div className="flex items-center gap-3.5 relative z-10">
          <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border-2 border-teal-500 shrink-0">
            {user.avatar && !isGuest ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-teal-600">
                <User className="w-7 h-7" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-slate-900 truncate">
                {isGuest ? 'Guest Traveler' : user.name}
              </h2>
              {!isGuest && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 font-bold border border-teal-200">
                  Verified Member
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 truncate">
              {isGuest ? 'Exploring as anonymous guest' : user.email}
            </p>
            <span className="text-[11px] text-teal-700 font-semibold block mt-0.5">
              {isGuest ? 'Sign in to sync your bookings & orders' : user.phone}
            </span>
          </div>

          {!isGuest && (
            <button
              onClick={() => {
                setEditName(user.name);
                setEditPhone(user.phone);
                setEditEmail(user.email);
                setIsEditing((v: boolean) => !v);
              }}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors border border-slate-200 cursor-pointer"
              title="Edit Profile"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Demo Switcher Quick Pill */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 relative z-10">
          <span>Simulation Mode:</span>
          {isGuest ? (
            <button
              onClick={loginAsDemoUser}
              className="text-teal-600 font-bold hover:underline cursor-pointer"
            >
              Switch to Demo User (Alejandro) →
            </button>
          ) : (
            <span className="text-slate-600 font-medium">Demo Customer Active</span>
          )}
        </div>
      </div>

      {/* Edit Profile Drawer inline if active */}
      {isEditing && (
        <form onSubmit={handleSaveProfile} className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 text-xs animate-in slide-in-from-top duration-200 shadow-xs">
          <h3 className="font-bold text-slate-900">Edit Profile Information</h3>
          <div>
            <label className="text-slate-500 block mb-1">Full Name</label>
            <input
              type="text"
              required
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="text-slate-500 block mb-1">Phone</label>
            <input
              type="tel"
              required
              value={editPhone}
              onChange={(e) => setEditPhone(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="text-slate-500 block mb-1">Email</label>
            <input
              type="email"
              required
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-teal-600 text-white font-bold hover:bg-teal-700 cursor-pointer shadow-xs"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}

      {/* Quick Activity Metric Cards */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'Bookings', count: bookings.length, icon: Package, screen: 'my_bookings' as const },
          { label: 'Orders', count: orders.length, icon: ShoppingBag, screen: 'my_orders' as const },
          { label: 'Enquiries', count: enquiries.length, icon: MessageSquare, screen: 'my_enquiries' as const },
          { label: 'Saved', count: favourites.size, icon: Heart, screen: 'favourites' as const },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={() => navigate({ name: item.screen })}
              className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-teal-500 flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
            >
              <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-base font-extrabold text-slate-900 tabular-nums">
                {item.count}
              </span>
              <span className="text-[10px] font-medium text-slate-500">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Navigation Menu List */}
      <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden divide-y divide-slate-100 shadow-xs">
        
        <button
          onClick={() => navigate({ name: 'my_bookings' })}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">My Tour Bookings</span>
              <span className="text-[11px] text-slate-500">Upcoming, completed & voucher tickets</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={() => navigate({ name: 'my_orders' })}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">Artisan Shop Orders</span>
              <span className="text-[11px] text-slate-500">Tracking, delivery address & receipts</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={() => navigate({ name: 'my_enquiries' })}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">Real Estate & Guide Enquiries</span>
              <span className="text-[11px] text-slate-500">Direct mediator contacts & status</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={() => navigate({ name: 'favourites' })}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Heart className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">Saved Favourites</span>
              <span className="text-[11px] text-slate-500">Places, stays, villas and crafts</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={() => navigate({ name: 'help_safety' })}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">Help & Safety Advisory</span>
              <span className="text-[11px] text-slate-500">24/7 Helplines & traveller protocols</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Regional App Settings & Version */}
      <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2 text-xs">
        <div className="flex items-center justify-between text-slate-600">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-teal-600" />
            <span className="font-semibold text-slate-800">Language & Region</span>
          </div>
          <span className="font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200/60 text-[10px]">
            Español / English (DO)
          </span>
        </div>
        <div className="flex items-center justify-between text-slate-600 pt-1.5 border-t border-slate-100">
          <span className="font-semibold text-slate-800">Display Currency</span>
          <span className="font-bold text-slate-700 text-[11px]">
            USD ($) · RD$ (DOP)
          </span>
        </div>
        <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
          <span>OnePlace Mobile · Dominican Republic</span>
          <span>v2.4.0 (Build 2026)</span>
        </div>
      </div>

    </div>
  );
};
