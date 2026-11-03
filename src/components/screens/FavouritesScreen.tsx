import React from 'react';
import { ArrowLeft, Heart, Trash2, MapPin, ChevronRight, Compass } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { 
  SAMPLE_PLACES, 
  SAMPLE_PACKAGES, 
  SAMPLE_HOTELS, 
  SAMPLE_PROPERTIES, 
  SAMPLE_PRODUCTS, 
  SAMPLE_RESTAURANTS 
} from '../../data/sampleData';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { StarRating } from '../common/StarRating';

export const FavouritesScreen: React.FC = () => {
  const { goBack, favourites, toggleFavourite, navigate } = useApp();

  // Combine items in favourites
  const savedItems = [
    ...SAMPLE_PLACES.filter((p) => favourites.has(p.id)).map((p) => ({
      id: p.id,
      title: p.name,
      subtitle: p.location,
      image: p.images[0],
      category: 'places' as const,
      rating: p.rating,
      price: undefined
    })),
    ...SAMPLE_PACKAGES.filter((pkg) => favourites.has(pkg.id)).map((pkg) => ({
      id: pkg.id,
      title: pkg.name,
      subtitle: pkg.destination,
      image: pkg.images[0],
      category: 'packages' as const,
      rating: pkg.rating,
      price: `$${pkg.pricePerPerson.toLocaleString()} USD`
    })),
    ...SAMPLE_HOTELS.filter((h) => favourites.has(h.id)).map((h) => ({
      id: h.id,
      title: h.name,
      subtitle: h.location,
      image: h.images[0],
      category: 'hotels' as const,
      rating: h.rating,
      price: `$${h.pricePerNight.toLocaleString()} USD/nt`
    })),
    ...SAMPLE_PROPERTIES.filter((prop) => favourites.has(prop.id)).map((prop) => ({
      id: prop.id,
      title: prop.title,
      subtitle: prop.location,
      image: prop.images[0],
      category: 'properties' as const,
      rating: 4.9,
      price: prop.priceFormatted
    })),
    ...SAMPLE_PRODUCTS.filter((prod) => favourites.has(prod.id)).map((prod) => ({
      id: prod.id,
      title: prod.name,
      subtitle: prod.category,
      image: prod.images[0],
      category: 'shop' as const,
      rating: prod.rating,
      price: `$${prod.price.toLocaleString()} USD`
    })),
    ...SAMPLE_RESTAURANTS.filter((r) => favourites.has(r.id)).map((r) => ({
      id: r.id,
      title: r.name,
      subtitle: r.cuisine,
      image: r.images[0],
      category: 'food' as const,
      rating: r.rating,
      price: r.priceLevel
    }))
  ];

  const handleOpenItem = (cat: string, id: string) => {
    switch (cat) {
      case 'places': navigate({ name: 'place_detail', id }); break;
      case 'packages': navigate({ name: 'package_detail', id }); break;
      case 'hotels': navigate({ name: 'hotel_detail', id }); break;
      case 'properties': navigate({ name: 'property_detail', id }); break;
      case 'shop': navigate({ name: 'product_detail', id }); break;
      case 'food': navigate({ name: 'food_detail', id }); break;
    }
  };

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

        <h1 className="text-sm font-bold text-slate-900">Saved Favourites ({savedItems.length})</h1>
        <div className="w-9" />
      </div>

      <div className="p-4 space-y-3">
        {savedItems.length === 0 ? (
          <div className="py-12 text-center space-y-3 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
            <Heart className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-sm font-bold text-slate-900">No saved items yet</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Tap the heart icon on any destination, stay, property, or product to save it here.
            </p>
            <button
              onClick={() => navigate({ name: 'explore' })}
              className="px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-bold hover:bg-teal-700 transition-colors cursor-pointer shadow-xs"
            >
              Start Exploring
            </button>
          </div>
        ) : (
          savedItems.map((item) => (
            <div
              key={`${item.category}-${item.id}`}
              onClick={() => handleOpenItem(item.category, item.id)}
              className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs flex gap-3 cursor-pointer hover:border-teal-500 transition-all group"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                <ImageWithFallback src={item.image} alt={item.title} />
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">
                      {item.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavourite(item.id, item.title);
                      }}
                      className="p-1 text-rose-500 hover:text-slate-400 cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 fill-rose-500" />
                    </button>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 truncate group-hover:text-teal-600 transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-[10px] text-slate-500 truncate block">
                    {item.subtitle}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <StarRating rating={item.rating} size="sm" showNumber={true} />
                  {item.price && (
                    <span className="text-xs font-bold text-slate-900 tabular-nums">
                      {item.price}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
