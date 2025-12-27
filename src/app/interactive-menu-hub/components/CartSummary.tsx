"use client";

import { useState, useEffect } from "react";
import Icon from "@/components/ui/AppIcon";
import AppImage from "@/components/ui/AppImage";

interface CartItem {
  id: number;
  name: string;
  nameBengali: string;
  price: number;
  quantity: number;
  image: string;
  alt: string;
}

interface CartSummaryProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
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
        fixed bottom-0 left-0 right-0 lg:top-20 lg:right-4 lg:left-auto lg:bottom-auto lg:w-96 
        bg-card shadow-warm-lg rounded-t-2xl lg:rounded-2xl z-40
        cultural-transition
        ${isExpanded ? "max-h-[80vh]" : "max-h-20 lg:max-h-[80vh]"}
        overflow-hidden
      `}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 border-b border-border cursor-pointer lg:cursor-default"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2">
          <Icon name="ShoppingCartIcon" size={24} className="text-primary" />
          <div>
            <span className="font-bengali font-bold text-lg">আপনার অর্ডার</span>
            <p className="text-xs text-muted-foreground font-heading">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className="font-heading font-bold text-xl text-primary">
            ৳{totalPrice}
          </span>
          <button className="lg:hidden">
            <Icon
              name={isExpanded ? "ChevronDownIcon" : "ChevronUpIcon"}
              size={24}
            />
          </button>
        </div>
      </div>

      {/* Cart Items */}
      <div
        className={`${isExpanded || "hidden"} lg:block overflow-y-auto max-h-[50vh] p-4 space-y-3`}
      >
        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <Icon
              name="ShoppingBagIcon"
              size={48}
              className="mx-auto text-muted-foreground mb-3"
            />
            <p className="font-bengali text-muted-foreground">
              আপনার কার্ট খালি
            </p>
            <p className="text-sm text-muted-foreground font-heading">
              Add items to get started
            </p>
          </div>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-3 bg-muted rounded-lg p-3"
            >
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <AppImage
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bengali font-semibold text-sm truncate">
                  {item.nameBengali}
                </h4>
                <p className="text-xs text-muted-foreground font-heading truncate">
                  {item.name}
                </p>
                <p className="font-heading font-bold text-primary mt-1">
                  ৳{item.price} × {item.quantity}
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center border border-border rounded overflow-hidden">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 bg-background hover:bg-muted cultural-transition"
                    aria-label="Decrease quantity"
                  >
                    <Icon name="MinusIcon" size={12} />
                  </button>
                  <span className="px-2 py-1 bg-background text-xs font-heading font-semibold min-w-[2rem] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 bg-background hover:bg-muted cultural-transition"
                    aria-label="Increase quantity"
                  >
                    <Icon name="PlusIcon" size={12} />
                  </button>
                </div>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-destructive hover:text-destructive-foreground cultural-transition"
                  aria-label="Remove item"
                >
                  <Icon name="TrashIcon" size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Checkout Button */}
      {cartItems.length > 0 && (
        <div
          className={`${isExpanded || "hidden"} lg:block p-4 border-t border-border`}
        >
          <div className="flex justify-between items-center mb-3">
            <span className="font-bengali font-semibold">মোট:</span>
            <span className="font-heading font-bold text-2xl text-primary">
              ৳{totalPrice}
            </span>
          </div>
          <button
            onClick={onCheckout}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-conversion text-conversion-foreground rounded-lg font-heading font-semibold cultural-transition hover:scale-105 shadow-warm"
          >
            <Icon name="CheckCircleIcon" size={20} variant="solid" />
            <span className="font-bengali text-lg">অর্ডার সম্পন্ন করুন</span>
          </button>
        </div>
      )}
    </div>
  );
}
