import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShoppingBag, 
  MapPin, 
  CheckCircle2, 
  Truck, 
  Clock, 
  PackageCheck,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ImageWithFallback } from '../common/ImageWithFallback';

export const MyOrdersScreen: React.FC = () => {
  const { goBack, orders, navigate } = useApp();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const statuses = ['Confirmed', 'Processing', 'Shipped', 'Delivered'];

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

        <h1 className="text-sm font-bold text-slate-900">Artisan Shop Orders</h1>
        <div className="w-9" />
      </div>

      <div className="p-4 space-y-4">
        {orders.length === 0 ? (
          <div className="py-12 text-center space-y-3 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
            <ShoppingBag className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-sm font-bold text-slate-900">No active orders found</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Explore Dominican Larimar jewelry, hand-rolled cigars, and aged Barceló rum.
            </p>
            <button
              onClick={() => navigate({ name: 'explore', initialCategory: 'shop' })}
              className="px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-bold hover:bg-teal-700 transition-colors cursor-pointer shadow-xs"
            >
              Shop Artisan Crafts
            </button>
          </div>
        ) : (
          orders.map((order) => {
            const currentStatusIndex = statuses.indexOf(order.status);
            return (
              <div
                key={order.id}
                className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4"
              >
                {/* Order Top Bar */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
                  <div>
                    <span className="font-extrabold text-slate-900 block">
                      Order #{order.id}
                    </span>
                    <span className="text-[10px] text-slate-400">Placed on {order.date}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-teal-50 text-teal-700 border border-teal-200">
                    {order.status}
                  </span>
                </div>

                {/* Visual Status Timeline */}
                <div className="py-2">
                  <div className="relative flex items-center justify-between">
                    <div className="absolute left-3 right-3 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 -z-0" />
                    <div
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-0.5 bg-teal-600 transition-all duration-300"
                      style={{
                        width: `${(Math.max(0, currentStatusIndex) / (statuses.length - 1)) * 92}%`
                      }}
                    />

                    {statuses.map((st, idx) => {
                      const isCompleted = idx <= currentStatusIndex;
                      return (
                        <div key={st} className="relative z-10 flex flex-col items-center">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                              isCompleted
                                ? 'bg-teal-600 border-teal-600 text-white'
                                : 'bg-white border-slate-300 text-slate-400'
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                          <span className={`text-[9px] mt-1 font-bold ${isCompleted ? 'text-teal-700' : 'text-slate-400'}`}>
                            {st}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Items in this order */}
                <div className="space-y-2 pt-1">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-2.5 items-center text-xs">
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                        <ImageWithFallback src={item.product.images[0]} alt={item.product.name} category="product" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900 truncate">
                          {item.product.name}
                        </h4>
                        <span className="text-[11px] text-slate-500 block">
                          Qty: {item.quantity} · {item.selectedVariant || 'Standard'}
                        </span>
                      </div>
                      <span className="font-bold tabular-nums text-slate-900">
                        ${(item.product.price * item.quantity).toLocaleString()} USD
                      </span>
                    </div>
                  ))}
                </div>

                {/* Address and Total */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <MapPin className="w-3 h-3 text-teal-600" />
                    <span className="font-semibold text-slate-800">
                      Delivering to {order.address.fullName}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 pl-4">
                    {order.address.addressLine}, {order.address.city} - {order.address.postalCode}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    Payment Method: <strong className="text-slate-800">{order.paymentMethod}</strong>
                  </span>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-semibold">Total Paid</span>
                    <span className="text-sm font-black text-slate-900 tabular-nums">
                      ${order.total.toLocaleString()} USD
                    </span>
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
