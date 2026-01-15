"use client";

import { useState, useEffect } from "react";
import AppImage from "../../../components/ui/AppImage";
import Icon from "../../../components/ui/AppIcon";

interface CartItem {
  id: number | string;
  name: string;
  nameBengali: string;
  price: number;
  quantity: number;
  image: string;
  alt: string;
}

interface CartSummaryProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: number | string, quantity: number) => void;
  onRemoveItem: (id: number | string) => void;
  onCheckout: () => void;
}

export default function CartSummary({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartSummaryProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="fixed bottom-0 left-0 right-0 lg:top-20 lg:right-4 lg:left-auto lg:bottom-auto lg:w-96 bg-card shadow-warm-lg rounded-t-2xl lg:rounded-2xl p-4 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="ShoppingCartIcon" size={24} className="text-primary" />
            <span className="font-bengali font-bold text-lg">আপনার অর্ডার</span>
          </div>
        </div>
      </div>
    );
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 
        lg:left-auto lg:right-6 lg:bottom-6 lg:w-[400px] 
        bg-card/95 backdrop-blur-2xl shadow-2xl lg:shadow-2xl 
        rounded-t-[2rem] lg:rounded-[2.5rem] z-50 transition-all duration-700
        border-t lg:border border-white/10
        ${isExpanded ? "max-h-[90vh]" : "max-h-20 lg:max-h-24"}
        overflow-hidden group
      `}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-5 lg:p-6 cursor-pointer border-b border-white/5"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 rotate-3 group-hover:rotate-0 transition-transform">
              <Icon name="ShoppingCartIcon" size={20} className="text-white lg:hidden" />
              <Icon name="ShoppingCartIcon" size={24} className="text-white hidden lg:block" />
            </div>
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 lg:w-6 lg:h-6 bg-red-500 text-white text-[9px] lg:text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-card animate-bounce">
                {totalItems}
              </span>
            )}
          </div>
          <div>
            <span className="font-bengali font-black text-lg lg:text-xl text-foreground">আপনার অর্ডার</span>
            <p className="text-[10px] lg:text-xs text-muted-foreground font-bengali">
              {totalItems} আইটেম
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="font-heading font-black text-xl lg:text-2xl text-primary">
            ৳{totalPrice}
          </span>
          <button className="flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
            <Icon
              name={isExpanded ? "ChevronDownIcon" : "ChevronUpIcon"}
              size={18}
              className="text-foreground"
            />
          </button>
        </div>
      </div>

      {/* Cart Items */}
      <div
        className={`${isExpanded || "hidden"} overflow-y-auto max-h-[50vh] lg:max-h-[60vh] p-4 lg:p-6 space-y-4 custom-scrollbar bg-black/5`}
      >
        {cartItems.length === 0 ? (
          <div className="text-center py-10 lg:py-12">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 opacity-50">
              <Icon name="ShoppingBagIcon" size={32} className="text-muted-foreground lg:hidden" />
              <Icon name="ShoppingBagIcon" size={40} className="text-muted-foreground hidden lg:block" />
            </div>
            <p className="font-bengali text-muted-foreground lg:text-lg mb-1">
              আপনার কার্ট খালি
            </p>
            <p className="text-xs lg:text-sm text-muted-foreground/60 font-bengali">
              শুরু করতে আইটেম যোগ করুন
            </p>
          </div>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-3 lg:space-x-4 bg-white/5 backdrop-blur-md rounded-xl lg:rounded-2xl p-2.5 lg:p-3 border border-white/5 hover:border-primary/30 transition-all group/item"
            >
              <div className="w-14 h-14 lg:w-20 lg:h-20 rounded-lg lg:rounded-xl overflow-hidden shrink-0 shadow-md">
                <AppImage
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform group-hover/item:scale-110"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bengali font-bold text-sm lg:text-base truncate mb-0.5 lg:mb-1">
                  {item.nameBengali}
                </h4>
                <p className="font-heading font-black text-primary text-lg lg:text-xl">
                  ৳{item.price}
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center bg-card rounded-lg lg:rounded-xl overflow-hidden shadow-inner border border-white/5">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="p-1.5 lg:p-2 hover:bg-primary hover:text-white transition-colors"
                  >
                    <Icon name="MinusIcon" size={10} className="lg:hidden" />
                    <Icon name="MinusIcon" size={12} className="hidden lg:block" />
                  </button>
                  <span className="w-6 lg:w-8 text-center font-heading font-bold text-xs lg:text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="p-1.5 lg:p-2 hover:bg-primary hover:text-white transition-colors"
                  >
                    <Icon name="PlusIcon" size={10} className="lg:hidden" />
                    <Icon name="PlusIcon" size={12} className="hidden lg:block" />
                  </button>
                </div>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-red-400/50 hover:text-red-500 transition-colors p-1"
                >
                  <Icon name="TrashIcon" size={14} className="lg:hidden" />
                  <Icon name="TrashIcon" size={16} className="hidden lg:block" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {cartItems.length > 0 && (
        <div
          className={`${isExpanded || "hidden"} p-5 lg:p-6 bg-card border-t border-white/10`}
        >
          <div className="flex justify-between items-center mb-4 lg:mb-6">
            <span className="font-bengali font-bold text-base lg:text-lg opacity-60">সর্বমোট</span>
            <span className="font-heading font-black text-2xl lg:text-3xl text-primary">
              ৳{totalPrice}
            </span>
          </div>
          <button
            onClick={onCheckout}
            className="w-full relative overflow-hidden flex items-center justify-center space-x-3 px-6 py-4 lg:px-8 lg:py-5 bg-primary text-white rounded-xl lg:rounded-2xl font-bengali font-black text-lg lg:text-xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/30 group/btn"
          >
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
            <Icon name="CheckCircleIcon" size={20} variant="solid" className="lg:hidden" />
            <Icon name="CheckCircleIcon" size={24} variant="solid" className="hidden lg:block" />
            <span>অর্ডার সম্পন্ন করুন</span>
          </button>
        </div>
      )}
    </div>
  );
}
