import React, { useState } from 'react';
import { Compass, Building, ShoppingBag, Utensils, Home, UserCheck } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  category?: 'place' | 'hotel' | 'property' | 'product' | 'food' | 'guide';
}

const CATEGORY_FALLBACK_URLS: Record<string, string> = {
  place: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
  hotel: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
  property: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80',
  product: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1000&q=80',
  food: 'https://images.unsplash.com/photo-1545247181-516773cae7be?auto=format&fit=crop&w=800&q=80',
  guide: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
};

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  category = 'place'
}) => {
  const [attempt, setAttempt] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Sanitize path: convert legacy /src/assets/ to /assets/ for production Vite static serving
  const cleanSrc = (rawSrc: string): string => {
    if (!rawSrc) return '';
    if (rawSrc.startsWith('/src/assets/')) {
      return rawSrc.replace('/src/assets/', '/assets/');
    }
    return rawSrc;
  };

  const getEffectiveSrc = (): string => {
    if (attempt === 0) {
      return cleanSrc(src);
    }
    if (attempt === 1) {
      return CATEGORY_FALLBACK_URLS[category] || CATEGORY_FALLBACK_URLS.place;
    }
    return '';
  };

  const currentSrc = getEffectiveSrc();

  const getFallbackIcon = () => {
    switch (category) {
      case 'hotel': return <Building className="w-8 h-8 text-teal-400 opacity-80" />;
      case 'property': return <Home className="w-8 h-8 text-teal-400 opacity-80" />;
      case 'product': return <ShoppingBag className="w-8 h-8 text-teal-400 opacity-80" />;
      case 'food': return <Utensils className="w-8 h-8 text-teal-400 opacity-80" />;
      case 'guide': return <UserCheck className="w-8 h-8 text-teal-400 opacity-80" />;
      default: return <Compass className="w-8 h-8 text-teal-400 opacity-80" />;
    }
  };

  if (attempt >= 2 || !currentSrc) {
    return (
      <div className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-4 text-center overflow-hidden ${className}`}>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative z-10 flex flex-col items-center gap-1">
          {getFallbackIcon()}
          <span className="text-[11px] font-medium text-slate-300 max-w-[85%] truncate mt-1">{alt}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-900">
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-800/80 animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 rounded-full border-2 border-teal-500/30 border-t-teal-400 animate-spin" />
        </div>
      )}
      <img
        src={currentSrc}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setIsLoaded(false);
          setAttempt((prev) => prev + 1);
        }}
        className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

