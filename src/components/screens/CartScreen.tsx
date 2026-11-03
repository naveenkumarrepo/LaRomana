import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Truck, 
  Lock, 
  Gem, 
  ChevronRight,
  Clock,
  Heart
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SAMPLE_PRODUCTS } from '../../data/sampleData';
import { Product } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { CheckoutModal } from '../modals/CheckoutModal';

export const CartScreen: React.FC = () => {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    cartSubtotal, 
    cartShipping, 
    cartTax, 
    cartTotal,
    navigate,
    isGuest,
    setAuthModalOpen,
    addToCart,
    showToast,
    toggleFavourite,
    isFavourite
  } = useApp();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Free shipping threshold ($150 USD)
  const freeShippingThreshold = 150;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  // Final total
  const finalCartTotal = cartTotal;

  // Dominican Peso (DOP) conversion (indicative rate: 59.5 DOP / USD)
  const dominicanPesosTotal = useMemo(() => {
    return Math.round(finalCartTotal * 59.5).toLocaleString();
  }, [finalCartTotal]);

  // Products recommended to add to basket (excluding ones already in cart)
  const recommendedProducts = useMemo(() => {
    const cartProductIds = new Set(cartItems.map((item) => item.product.id));
    return SAMPLE_PRODUCTS.filter((p) => !cartProductIds.has(p.id)).slice(0, 3);
  }, [cartItems]);

  const handleStartCheckout = () => {
    if (isGuest) {
      setAuthModalOpen(true);
      return;
    }
    setIsCheckoutOpen(true);
  };

  // ---------------------------------------------------------------------------
  // EMPTY STATE: Pristine Light Theme Experience
  // ---------------------------------------------------------------------------
  if (cartItems.length === 0) {
    return (
      <div className="pb-28 px-4 pt-4 space-y-6 animate-in fade-in duration-200">
        
        {/* Header */}
        <div className="pt-2">
          <span className="text-xs font-semibold text-slate-500 block">
            Dominican Artisan Marketplace
          </span>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Shopping Cart
          </h1>
        </div>

        {/* Empty State Card */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-100 text-teal-600 mx-auto flex items-center justify-center shadow-2xs">
            <ShoppingBag className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-base font-extrabold text-slate-900">
              Your Shopping Basket is Empty
            </h2>
            <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
              Explore authentic Dominican blue Larimar gems, hand-rolled La Romana cigars, aged reserve rums, and organic Hispaniola cacao.
            </p>
          </div>

          <button
            onClick={() => navigate({ name: 'explore', initialCategory: 'shop' })}
            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs inline-flex items-center gap-2 shadow-xs transition-all cursor-pointer active:scale-95"
          >
            <span>Explore Artisan Shop</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Curated Popular Artisan Picks */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-extrabold text-slate-900">
                Popular Dominican Artisan Treasures
              </h3>
              <p className="text-[11px] text-slate-500">
                Handcrafted in La Romana and Barahona ateliers
              </p>
            </div>
            <button
              onClick={() => navigate({ name: 'explore', initialCategory: 'shop' })}
              className="text-xs font-bold text-teal-600 hover:underline"
            >
              View all
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SAMPLE_PRODUCTS.slice(0, 2).map((product) => (
              <div
                key={product.id}
                onClick={() => navigate({ name: 'product_detail', id: product.id })}
                className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-teal-500 transition-all cursor-pointer flex gap-3 items-center group"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                  <ImageWithFallback src={product.images[0]} alt={product.name} category="product" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider block">
                    {product.category}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-teal-600">
                    {product.name}
                  </h4>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-900">
                      ${product.price} USD
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-700 font-bold text-[11px] border border-teal-200 transition-colors cursor-pointer"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dominican Trust Badges */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 grid grid-cols-3 gap-2 text-center text-slate-600">
          <div className="space-y-1">
            <Gem className="w-4 h-4 text-teal-600 mx-auto" />
            <span className="text-[10px] font-bold text-slate-800 block">100% Genuine</span>
            <span className="text-[9px] text-slate-500 block">Certified Larimar</span>
          </div>
          <div className="space-y-1 border-x border-slate-200">
            <Truck className="w-4 h-4 text-teal-600 mx-auto" />
            <span className="text-[10px] font-bold text-slate-800 block">Fast Courier</span>
            <span className="text-[9px] text-slate-500 block">Nationwide Delivery</span>
          </div>
          <div className="space-y-1">
            <ShieldCheck className="w-4 h-4 text-teal-600 mx-auto" />
            <span className="text-[10px] font-bold text-slate-800 block">Secure Escrow</span>
            <span className="text-[9px] text-slate-500 block">Protected Purchase</span>
          </div>
        </div>

      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // ACTIVE CART: High-End Light Theme Experience
  // ---------------------------------------------------------------------------
  return (
    <div className="pb-32 space-y-4 px-4 pt-2 animate-in fade-in duration-200">
      
      {/* Top Header */}
      <div className="pt-2 flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
            <span>Dominican Artisan Marketplace</span>
            <span aria-hidden="true">·</span>
            <span className="text-teal-600 font-bold">La Romana Atelier</span>
          </span>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)} item{cartItems.length > 1 ? 's' : ''} in your basket
          </p>
        </div>

        <button
          onClick={() => {
            clearCart();
            showToast('Shopping cart cleared', 'info');
          }}
          className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer border border-rose-200/60"
          title="Clear all items in cart"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear</span>
        </button>
      </div>

      {/* Cart Items List */}
      <div className="space-y-3">
        <span className="text-xs font-bold text-slate-800 block px-0.5">
          Items in Your Basket ({cartItems.length})
        </span>

        {cartItems.map((item, idx) => {
          const isFav = isFavourite(item.product.id);
          const lineTotal = item.product.price * item.quantity;

          return (
            <div
              key={`${item.product.id}-${item.selectedVariant || 'default'}-${idx}`}
              className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all flex gap-3.5 items-start"
            >
              {/* Product Image */}
              <div 
                onClick={() => navigate({ name: 'product_detail', id: item.product.id })}
                className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200/80 cursor-pointer relative group"
              >
                <ImageWithFallback src={item.product.images[0]} alt={item.product.name} category="product" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>

              {/* Product Info & Controls */}
              <div className="flex-1 min-w-0 space-y-1">
                
                {/* Category & Provenance */}
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-teal-700 uppercase tracking-wider">
                    {item.product.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => toggleFavourite(item.product.id, item.product.name)}
                      className="text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                      title={isFav ? 'Remove from favourites' : 'Save to favourites'}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id, item.selectedVariant)}
                      className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer p-0.5"
                      title="Remove item from basket"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Product Name */}
                <h3 
                  onClick={() => navigate({ name: 'product_detail', id: item.product.id })}
                  className="text-xs font-extrabold text-slate-900 truncate cursor-pointer hover:text-teal-600 transition-colors"
                >
                  {item.product.name}
                </h3>

                {/* Selected Variant */}
                {item.selectedVariant && (
                  <p className="text-[11px] text-slate-500 truncate">
                    Selected: <span className="font-semibold text-slate-700">{item.selectedVariant}</span>
                  </p>
                )}

                {/* In Stock Badge */}
                <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-semibold pt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>In Stock · Ready for Courier</span>
                </div>

                {/* Price and Quantity Stepper */}
                <div className="pt-1.5 flex items-center justify-between border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Item Total</span>
                    <span className="text-xs font-black text-slate-900 tabular-nums">
                      ${lineTotal.toLocaleString()} USD
                    </span>
                    {item.quantity > 1 && (
                      <span className="text-[10px] text-slate-400 block">
                        (${item.product.price} each)
                      </span>
                    )}
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 border border-slate-200 rounded-xl p-0.5 bg-slate-50 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.selectedVariant, -1)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-700 hover:bg-white hover:shadow-2xs active:scale-95 transition-all cursor-pointer"
                      title="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-extrabold tabular-nums min-w-[20px] text-center text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.selectedVariant, 1)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-700 hover:bg-white hover:shadow-2xs active:scale-95 transition-all cursor-pointer"
                      title="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>
            </div>
          );
        })}
      </div>



      {/* Cross-Sell Recommendations: Complete Your Dominican Order */}
      {recommendedProducts.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-0.5">
            <span className="text-xs font-bold text-slate-800">
              Complete Your Dominican Order
            </span>
            <button
              type="button"
              onClick={() => navigate({ name: 'explore', initialCategory: 'shop' })}
              className="text-[11px] font-semibold text-teal-600 hover:underline"
            >
              More gifts →
            </button>
          </div>

          {/* Mobile swipeable recommendation carousel */}
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1 snap-x">
            {recommendedProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => navigate({ name: 'product_detail', id: prod.id })}
                className="w-64 shrink-0 snap-start p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-teal-500 transition-all flex items-center justify-between gap-2.5 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                  <ImageWithFallback src={prod.images[0]} alt={prod.name} category="product" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-teal-600">
                    {prod.name}
                  </h4>
                  <span className="text-xs font-extrabold text-slate-800 block">
                    ${prod.price} USD
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(prod);
                  }}
                  className="px-2.5 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 font-bold text-xs border border-teal-200 transition-colors cursor-pointer shrink-0"
                  title="Add to basket"
                >
                  + Add
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Order Pricing Breakdown Card - Aligned inside mobile frame */}
      <div className="w-full p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2.5 text-xs box-border">
        <h3 className="font-extrabold text-slate-900 pb-2 border-b border-slate-100 flex items-center justify-between">
          <span>Order Price Summary</span>
          <span className="text-[10px] text-slate-500 font-normal">All taxes included</span>
        </h3>

        <div className="space-y-2 text-slate-600">
          <div className="flex items-center justify-between">
            <span className="truncate pr-2">Items Subtotal</span>
            <span className="font-semibold text-slate-900 tabular-nums shrink-0">
              ${cartSubtotal.toLocaleString()} USD
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="truncate pr-2">Insured Courier (La Romana / RD)</span>
            <span className="font-semibold text-slate-900 tabular-nums shrink-0">
              {cartShipping === 0 || cartSubtotal >= freeShippingThreshold ? (
                <span className="text-teal-700 font-bold">FREE</span>
              ) : (
                `$${cartShipping} USD`
              )}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="truncate pr-2">Dominican ITBIS (Sales Tax)</span>
            <span className="font-semibold text-slate-900 tabular-nums shrink-0">
              ${cartTax.toLocaleString()} USD
            </span>
          </div>
        </div>

        {/* Divider & Total */}
        <div className="border-t border-slate-200 pt-2.5 space-y-1">
          <div className="flex items-baseline justify-between font-black text-sm text-slate-900">
            <span>Estimated Total</span>
            <span className="text-base text-teal-700 tabular-nums shrink-0 font-extrabold">
              ${finalCartTotal.toLocaleString()} USD
            </span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500">
            <span className="truncate pr-2">Dominican Peso (approx)</span>
            <span className="font-semibold text-slate-700 tabular-nums shrink-0">
              ≈ RD$ {dominicanPesosTotal} DOP
            </span>
          </div>
        </div>

        {/* Delivery Guarantee Note */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[10px] text-slate-500">
          <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
          <span className="truncate">Dispatches in 24h from La Romana. Arrives tomorrow.</span>
        </div>
      </div>



      {/* Primary Checkout Button */}
      <button
        onClick={handleStartCheckout}
        className="w-full py-3.5 px-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs flex items-center justify-between shadow-sm active:scale-[0.99] transition-all cursor-pointer shrink-0"
      >
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 shrink-0" />
          <span>Proceed to Secure Checkout</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="tabular-nums font-mono">${finalCartTotal.toLocaleString()} USD</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </button>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

    </div>
  );
};
