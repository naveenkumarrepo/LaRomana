import React, { useState } from 'react';
import { X, Lock, Mail, User, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setAuthModalOpen, loginAsDemoUser, logoutToGuest, isGuest, showToast } = useApp();
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [email, setEmail] = useState('alejandro.delacruz@oneplace.do');
  const [password, setPassword] = useState('••••••••••');
  const [name, setName] = useState('Alejandro De La Cruz');
  const [isResetSent, setIsResetSent] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'forgot') {
      setIsResetSent(true);
      showToast('Demo password reset link dispatched to your inbox!', 'info');
      return;
    }
    loginAsDemoUser();
    setAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="relative p-6 bg-slate-900 text-white overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-teal-500/10 blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between relative z-10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400">OnePlace Access</span>
              <h2 className="text-xl font-extrabold mt-0.5">
                {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Reset Password'}
              </h2>
            </div>
            <button
              onClick={() => {
                setAuthModalOpen(false);
                setIsResetSent(false);
              }}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-slate-300 mt-1 relative z-10">
            {mode === 'login' 
              ? 'Sign in to access bookings, orders, and synchronized saved places in La Romana.'
              : mode === 'signup'
              ? 'Join OnePlace for exclusive Dominican travel packages and villa viewing perks.'
              : 'Enter your registered email to receive a recovery link.'}
          </p>
        </div>

        {/* Body */}
        <div className="p-6">
          {isResetSent ? (
            <div className="py-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Recovery Link Sent</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                We sent instructions to <strong className="text-slate-800">{email}</strong>. Use any new password for prototype testing.
              </p>
              <button
                onClick={() => {
                  setIsResetSent(false);
                  setMode('login');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-semibold hover:bg-teal-700 cursor-pointer shadow-xs"
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alejandro De La Cruz"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {mode !== 'forgot' && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Password
                    </label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => setMode('forgot')}
                        className="text-[11px] font-medium text-teal-600 hover:underline cursor-pointer"
                      >
                        Forgot?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.98] mt-2 cursor-pointer"
              >
                <span>{mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Demo Account' : 'Send Reset Link'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Mode switch */}
              <div className="pt-2 text-center text-xs text-slate-500">
                {mode === 'login' ? (
                  <span>
                    New to OnePlace?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('signup')}
                      className="font-bold text-teal-600 hover:underline cursor-pointer"
                    >
                      Sign Up
                    </button>
                  </span>
                ) : (
                  <span>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="font-bold text-teal-600 hover:underline cursor-pointer"
                    >
                      Sign In
                    </button>
                  </span>
                )}
              </div>

              {/* Quick Guest exploration toggle */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  <span>Prototype switch:</span>
                </div>
                {isGuest ? (
                  <button
                    type="button"
                    onClick={() => {
                      loginAsDemoUser();
                      setAuthModalOpen(false);
                    }}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                  >
                    Quick Sign-In (Alejandro)
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      logoutToGuest();
                      setAuthModalOpen(false);
                    }}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                  >
                    Browse as Guest
                  </button>
                )}
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
