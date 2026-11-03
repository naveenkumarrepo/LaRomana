import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Check, 
  Star, 
  Sparkles, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SAMPLE_PRODUCTS } from '../../data/sampleData';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { StarRating } from '../common/StarRating';
import { WriteReviewModal } from '../modals/WriteReviewModal';
import { CheckoutModal } from '../modals/CheckoutModal';

export const ProductDetailScreen: React.FC<{ id: string }> = ({ id }) => {
  const { 
    goBack, 
    navigate, 
    toggleFavourite, 
    isFavourite, 
    addToCart, 
    reviews, 
    showToast,
    isGuest,
    setAuthModalOpen 
  } = useApp();

  const product = SAMPLE_PRODUCTS.find((p) => p.id === id) || SAMPLE_PRODUCTS[0];
  const isFav = isFavourite(product.id);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants ? product.variants[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [isBuyNowCheckoutOpen, setIsBuyNowCheckoutOpen] = useState(false);

  const productReviews = reviews.filter((r) => r.targetId === product.id || r.targetType === 'product');

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast(`Shared "${product.name}" product link!`, 'info');
  };

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariant, quantity);
    if (isGuest) {
      setAuthModalOpen(true);
      return;
    }
    setIsBuyNowCheckoutOpen(true);
  };

  return (
    <div className="pb-32 animate-in fade-in duration-200">
      
      {/* Top Floating App Bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between p-3.5 bg-white/95 backdrop-blur-md text-slate-900 border-b border-slate-200 shadow-2xs">
        <button
          onClick={goBack}
          className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer border border-slate-200/80"
          title="Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="text-center truncate max-w-[200px]">
          <span className="text-xs font-bold text-slate-900 truncate block">{product.name}</span>
          <span className="text-[10px] text-orange-600 font-semibold truncate block">{product.category}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleShare}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer border border-slate-200/80"
            title="Share Product"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleFavourite(product.id, product.name)}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer border border-slate-200/80"
            title="Save to Favourites"
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Product Image */}
      <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
        <ImageWithFallback src={product.images[0]} alt={product.name} category="product" />
        {product.discountPercent && (
          <span className="absolute top-3 left-3 text-[10px] font-black px-2.5 py-1 rounded-full bg-teal-500 text-slate-950">
            {product.discountPercent}% SPECIAL SAVINGS
          </span>
        )}
      </div>

      {/* Details */}
      <div className="p-4 space-y-5 text-slate-800">
        
        {/* Title, rating, price */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">
              {product.category}
            </span>
            <StarRating rating={product.rating} size="md" showNumber={true} reviewCount={product.reviewCount} />
          </div>

          <h1 className="text-lg font-extrabold text-slate-900 leading-tight">
            {product.name}
          </h1>

          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-2xl font-black text-slate-900 tabular-nums">
              ${product.price.toLocaleString()} USD
            </span>
            {product.originalPrice && (
              <span className="text-sm text-slate-400 line-through tabular-nums">
                ${product.originalPrice.toLocaleString()} USD
              </span>
            )}
            <span className="text-xs text-emerald-700 font-bold ml-1">
              In Stock & Ready in La Romana
            </span>
          </div>
        </div>

        {/* Variants Selector */}
        {product.variants && product.variants.length > 0 && (
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Select Option / Variant
            </label>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v) => {
                const isSelected = selectedVariant === v;
                return (
                  <button
                    key={v}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-950 text-white border-teal-500 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {v}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Quantity selector */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
          <span className="text-xs font-bold text-slate-900">Quantity</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center font-bold text-slate-700 disabled:opacity-40 cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-sm font-bold tabular-nums min-w-[20px] text-center text-slate-900">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center font-bold text-slate-700 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Artisan Story */}
        {product.artisanStory && (
          <div className="p-3.5 rounded-2xl bg-teal-50/60 border border-teal-200/70 text-xs space-y-1">
            <span className="font-bold text-teal-950 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              Artisan Craftsmanship
            </span>
            <p className="text-slate-700 leading-relaxed">
              {product.artisanStory}
            </p>
          </div>
        )}

        {/* Description */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Description & Provenance
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Reviews */}
        <div className="space-y-2.5 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Verified Buyer Reviews
            </h2>
            <button
              onClick={() => setIsWriteReviewOpen(true)}
              className="text-xs font-bold text-teal-600 hover:underline cursor-pointer"
            >
              + Write Review
            </button>
          </div>

          {productReviews.slice(0, 2).map((rev) => (
            <div key={rev.id} className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-2xs">
              <div className="flex justify-between items-center text-xs font-bold text-slate-900">
                <span>{rev.authorName}</span>
                <span className="text-[10px] text-slate-400">{rev.date}</span>
              </div>
              <StarRating rating={rev.rating} size="sm" showNumber={false} />
              <p className="text-xs text-slate-600">{rev.comment}</p>
            </div>
          ))}
        </div>

      </div>

      {/* Sticky Bottom Actions */}
      <div className="sticky bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 z-30 w-full flex items-center gap-2.5 shadow-lg">
        <button
          onClick={handleAddToCart}
          className="flex-1 py-3 px-4 rounded-2xl border-2 border-slate-900 text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>

        <button
          onClick={handleBuyNow}
          className="flex-1 py-3 px-4 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
        >
          <span>Buy Now</span>
        </button>
      </div>

      {/* Write review modal */}
      <WriteReviewModal
        isOpen={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
        targetId={product.id}
        targetType="product"
        targetTitle={product.name}
      />

      {/* Buy Now instant checkout */}
      <CheckoutModal
        isOpen={isBuyNowCheckoutOpen}
        onClose={() => setIsBuyNowCheckoutOpen(false)}
      />

    </div>
  );
};
