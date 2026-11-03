import React from 'react';
import { AppProvider } from './context/AppContext';
import { MobileShell } from './components/layout/MobileShell';

function AppContent() {
  return (
    <div className="relative min-h-screen bg-slate-900">
      <MobileShell />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
