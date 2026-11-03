import React, { useState } from 'react';
import { ImageOff, Compass, Building, ShoppingBag, Utensils, Home } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  category?: 'place' | 'hotel' | 'property' | 'product' | 'food' | 'guide';
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  category = 'place'
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const getFallbackIcon = () => {
    switch (category) {
      case 'hotel': return <Building className="w-8 h-8 text-teal-400 opacity-80" />;
      case 'property': return <Home className="w-8 h-8 text-teal-400 opacity-80" />;
      case 'product': return <ShoppingBag className="w-8 h-8 text-teal-400 opacity-80" />;
      case 'food': return <Utensils className="w-8 h-8 text-teal-400 opacity-80" />;
      default: return <Compass className="w-8 h-8 text-teal-400 opacity-80" />;
    }
  };

  if (hasError || !src) {
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
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};
