import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  SlidersHorizontal, 
  Heart, 
  MapPin, 
  Star, 
  ChevronRight, 
  Compass, 
  Package, 
  UserCheck, 
  Building, 
  Utensils, 
  Home, 
  ShoppingBag,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CategoryType } from '../../types';
import { 
  SAMPLE_PLACES, 
  SAMPLE_PACKAGES, 
  SAMPLE_GUIDES, 
  SAMPLE_HOTELS, 
  SAMPLE_RESTAURANTS, 
  SAMPLE_PRODUCTS, 
  SAMPLE_PROPERTIES 
} from '../../data/sampleData';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { StarRating } from '../common/StarRating';

export const ExploreScreen: React.FC = () => {
  const { navigate, toggleFavourite, isFavourite, currentRoute } = useApp();

  const initialCat = (currentRoute.name === 'explore' && currentRoute.initialCategory) 
    ? currentRoute.initialCategory 
    : 'all';

  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>(initialCat);
  const [searchQuery, setSearchQuery] = useState(
    (currentRoute.name === 'explore' && currentRoute.initialQuery) || ''
  );
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'price_asc' | 'price_desc'>('relevance');
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);

  const recentSearches = ['Isla Saona VIP', 'Casa de Campo Villa', 'Altos de Chavón', 'Dominican Larimar'];
  const popularSearches = ['Bayahíbe Catamaran', 'Sancocho 7 Carnes', 'Chavón River Cruise', 'La Romana Cigars'];

  const categoryChips: { id: CategoryType | 'all'; label: string }[] = [
    { id: 'all', label: 'All Categories' },
    { id: 'places', label: 'Places' },
    { id: 'packages', label: 'Packages' },
    { id: 'guides', label: 'Guides' },
    { id: 'hotels', label: 'Hotels' },
    { id: 'food', label: 'Food & Dining' },
    { id: 'properties', label: 'Properties' },
    { id: 'shop', label: 'Artisan Shop' },
  ];

  // Aggregated Search Results
  const filteredResults = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    type UnifiedItem = {
      id: string;
      category: CategoryType;
      title: string;
      subtitle: string;
      price?: number;
      priceFormatted?: string;
      rating: number;
      reviewCount?: number;
      image: string;
      tag?: string;
    };

    let items: UnifiedItem[] = [];

    // Places
    if (selectedCategory === 'all' || selectedCategory === 'places') {
      SAMPLE_PLACES.forEach((p) => {
        if (!q || p.name.toLowerCase().includes(q) || p.location.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) {
          items.push({
            id: p.id,
            category: 'places',
            title: p.name,
            subtitle: p.location,
            rating: p.rating,
            reviewCount: p.reviewCount,
            image: p.images[0],
            tag: p.category
          });
        }
      });
    }

    // Packages
    if (selectedCategory === 'all' || selectedCategory === 'packages') {
      SAMPLE_PACKAGES.forEach((pkg) => {
        if (!q || pkg.name.toLowerCase().includes(q) || pkg.destination.toLowerCase().includes(q)) {
          items.push({
            id: pkg.id,
            category: 'packages',
            title: pkg.name,
            subtitle: pkg.destination,
            price: pkg.pricePerPerson,
            priceFormatted: `$${pkg.pricePerPerson.toLocaleString()} USD`,
            rating: pkg.rating,
            reviewCount: pkg.reviewCount,
            image: pkg.images[0],
            tag: pkg.duration
          });
        }
      });
    }

    // Guides
    if (selectedCategory === 'all' || selectedCategory === 'guides') {
      SAMPLE_GUIDES.forEach((g) => {
        if (!q || g.name.toLowerCase().includes(q) || g.serviceAreas.some((a) => a.toLowerCase().includes(q)) || g.languages.some((l) => l.toLowerCase().includes(q))) {
          items.push({
            id: g.id,
            category: 'guides',
            title: g.name,
            subtitle: g.serviceAreas.join(', '),
            price: g.perDayFee,
            priceFormatted: `$${g.perDayFee.toLocaleString()} USD/day`,
            rating: g.rating,
            reviewCount: g.reviewCount,
            image: g.avatar,
            tag: `${g.experienceYears}y Exp`
          });
        }
      });
    }

    // Hotels
    if (selectedCategory === 'all' || selectedCategory === 'hotels') {
      SAMPLE_HOTELS.forEach((h) => {
        if (!q || h.name.toLowerCase().includes(q) || h.location.toLowerCase().includes(q)) {
          items.push({
            id: h.id,
            category: 'hotels',
            title: h.name,
            subtitle: h.location,
            price: h.pricePerNight,
            priceFormatted: `$${h.pricePerNight.toLocaleString()} USD/nt`,
            rating: h.rating,
            reviewCount: h.reviewCount,
            image: h.images[0],
            tag: 'Luxury Stay'
          });
        }
      });
    }

    // Food
    if (selectedCategory === 'all' || selectedCategory === 'food') {
      SAMPLE_RESTAURANTS.forEach((r) => {
        if (!q || r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q) || r.location.toLowerCase().includes(q)) {
          items.push({
            id: r.id,
            category: 'food',
            title: r.name,
            subtitle: `${r.cuisine} · ${r.location}`,
            priceFormatted: r.priceLevel,
            rating: r.rating,
            reviewCount: r.reviewCount,
            image: r.images[0],
            tag: r.priceLevel
          });
        }
      });
    }

    // Properties
    if (selectedCategory === 'all' || selectedCategory === 'properties') {
      SAMPLE_PROPERTIES.forEach((prop) => {
        if (!q || prop.title.toLowerCase().includes(q) || prop.location.toLowerCase().includes(q) || prop.propertyType.toLowerCase().includes(q)) {
          items.push({
            id: prop.id,
            category: 'properties',
            title: prop.title,
            subtitle: `${prop.propertyType} · ${prop.location}`,
            price: typeof prop.price === 'number' ? prop.price : prop.priceNumeric || 0,
            priceFormatted: prop.priceFormatted || String(prop.price),
            rating: 4.9,
            image: prop.images[0],
            tag: prop.status
          });
        }
      });
    }

    // Shop Products
    if (selectedCategory === 'all' || selectedCategory === 'shop') {
      SAMPLE_PRODUCTS.forEach((prod) => {
        if (!q || prod.name.toLowerCase().includes(q) || prod.category.toLowerCase().includes(q)) {
          items.push({
            id: prod.id,
            category: 'shop',
            title: prod.name,
            subtitle: prod.category,
            price: prod.price,
            priceFormatted: `$${prod.price.toLocaleString()} USD`,
            rating: prod.rating,
            reviewCount: prod.reviewCount,
            image: prod.images[0],
            tag: prod.discountPercent ? `${prod.discountPercent}% OFF` : undefined
          });
        }
      });
    }

    // Filter by rating
    if (minRating > 0) {
      items = items.filter((i) => i.rating >= minRating);
    }

    // Sort items
    if (sortBy === 'rating') {
      items.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price_asc') {
      items.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === 'price_desc') {
      items.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    return items;
  }, [searchQuery, selectedCategory, sortBy, minRating]);

  const handleItemClick = (cat: CategoryType, id: string) => {
    switch (cat) {
      case 'places': navigate({ name: 'place_detail', id }); break;
      case 'packages': navigate({ name: 'package_detail', id }); break;
      case 'guides': navigate({ name: 'guide_detail', id }); break;
      case 'hotels': navigate({ name: 'hotel_detail', id }); break;
      case 'food': navigate({ name: 'food_detail', id }); break;
      case 'properties': navigate({ name: 'property_detail', id }); break;
      case 'shop': navigate({ name: 'product_detail', id }); break;
    }
  };

  return (
    <div className="pb-24 space-y-4 animate-in fade-in duration-200">
      
      {/* Sticky Top Search Header */}
      <div className="pt-2 px-4 space-y-3">
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Explore OnePlace
        </h1>

        {/* Input & Filter button */}
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white border border-slate-200 shadow-xs focus-within:ring-2 focus-within:ring-teal-500">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search places, packages, hotels, food..."
              className="w-full bg-transparent text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={() => setIsFilterSheetOpen((v) => !v)}
            className={`p-3 rounded-2xl border transition-colors cursor-pointer ${
              minRating > 0 || sortBy !== 'relevance'
                ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
            title="Filters & Sorting"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Category Horizontal Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categoryChips.map((chip) => {
            const isSelected = selectedCategory === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => setSelectedCategory(chip.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Bottom Sheet / Modal Drawer */}
      {isFilterSheetOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs p-0 animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-t-3xl shadow-2xl p-5 border-t border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Sort & Refine Filters</h3>
              <button onClick={() => setIsFilterSheetOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sort selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Sort Results By
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'relevance', label: 'Best Match' },
                  { id: 'rating', label: 'Highest Rated' },
                  { id: 'price_asc', label: 'Price: Low to High' },
                  { id: 'price_desc', label: 'Price: High to Low' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSortBy(s.id as any)}
                    className={`p-2.5 rounded-xl text-xs font-semibold border text-center transition-all ${
                      sortBy === s.id
                        ? 'bg-teal-50 border-teal-500 text-teal-800 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Minimum Rating
              </label>
              <div className="flex gap-2">
                {[0, 4.5, 4.8, 4.9].map((val) => (
                  <button
                    key={val}
                    onClick={() => setMinRating(val)}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold border text-center transition-all ${
                      minRating === val
                        ? 'bg-teal-600 text-white border-teal-600 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    {val === 0 ? 'All' : `${val}+ ★`}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => {
                  setSortBy('relevance');
                  setMinRating(0);
                }}
                className="py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Reset
              </button>
              <button
                onClick={() => setIsFilterSheetOpen(false)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs cursor-pointer shadow-xs"
              >
                Apply Filters ({filteredResults.length} Results)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* When no query is typed, display Recent & Popular Searches */}
      {!searchQuery && (
        <div className="px-4 space-y-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Recent Inquiries
            </span>
            <div className="flex flex-wrap gap-1.5">
              {recentSearches.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setSearchQuery(s)}
                  className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 hover:bg-teal-50 hover:text-teal-700 text-xs transition-colors cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-1.5">
              {popularSearches.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setSearchQuery(s)}
                  className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 hover:bg-teal-50 hover:text-teal-700 text-xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-teal-600" />
                  <span>{s}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results Header */}
      <div className="px-4 flex items-center justify-between pt-1">
        <span className="text-xs font-bold text-slate-700">
          Showing {filteredResults.length} items
        </span>
        {minRating > 0 && (
          <span className="text-[11px] text-teal-700 font-bold">
            Filtered by {minRating}+ ★
          </span>
        )}
      </div>

      {/* Results List */}
      <div className="px-4 space-y-3">
        {filteredResults.length === 0 ? (
          <div className="py-12 text-center space-y-3 bg-white rounded-3xl border border-slate-200 p-6">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">No listings found</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              We couldn't find matches for "{searchQuery}". Try exploring other categories or clearing filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setMinRating(0);
              }}
              className="px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-bold hover:bg-teal-700 transition-colors cursor-pointer shadow-xs"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          filteredResults.map((item) => {
            const isFav = isFavourite(item.id);
            return (
              <div
                key={`${item.category}-${item.id}`}
                onClick={() => handleItemClick(item.category, item.id)}
                className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-teal-500 cursor-pointer transition-all flex gap-3 group"
              >
                <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 relative bg-slate-100">
                  <ImageWithFallback src={item.image} alt={item.title} />
                  {item.tag && (
                    <span className="absolute bottom-1.5 left-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/70 text-white max-w-[85%] truncate">
                      {item.tag}
                    </span>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">
                        {item.category}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavourite(item.id, item.title);
                        }}
                        className="p-1 text-slate-400 hover:text-rose-500 cursor-pointer"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                      </button>
                    </div>

                    <h3 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-teal-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                    <StarRating rating={item.rating} size="sm" showNumber={true} reviewCount={item.reviewCount} />
                    {item.priceFormatted && (
                      <span className="text-xs font-bold text-slate-900 tabular-nums">
                        {item.priceFormatted}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
