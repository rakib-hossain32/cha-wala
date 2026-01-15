"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppImage from "../../../components/ui/AppImage";
import Icon from "../../../components/ui/AppIcon";

interface MenuItem {
  id: number | string;
  name: string;
  nameBengali: string;
  description: string;
  descriptionBengali: string;
  price: number;
  image: string;
  alt: string;
  category: string;
  ingredients: string[];
  ingredientsBengali: string[];
  preparationTime: string;
  spiceLevel?: "mild" | "medium" | "hot";
  isVegetarian: boolean;
  isPopular?: boolean;
  reviewCount?: number;
  avgRating?: number;
  discount?: number | string;
  isSpecial?: boolean;
  specialTag?: string;
}

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem, quantity: number) => void;
  isSpecialVariant?: boolean;
}

export default function MenuItemCard({ item, onAddToCart, isSpecialVariant = false }: MenuItemCardProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const discountValue = typeof item.discount === 'string' ? parseInt(item.discount) : item.discount || 0;
  const hasDiscount = discountValue > 0;
  const discountedPrice = hasDiscount ? Math.round(item.price - (item.price * (discountValue / 100))) : item.price;

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(item, quantity);
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 500);
  };

  const incrementQuantity = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className={`group bg-card rounded-4xl shadow-warm overflow-hidden hover-lift border transition-all duration-500 w-full max-w-sm mx-auto flex flex-col h-full ${isSpecialVariant ? 'border-primary shadow-xl shadow-primary/5 ring-4 ring-primary/5' : 'border-border/50 hover:border-primary/50'}`}>
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <AppImage
          src={item.image}
          alt={item.alt}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-6 text-center">
            <p className="text-white/90 font-bengali text-sm mb-6 line-clamp-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                {item.descriptionBengali}
            </p>
            <button 
                onClick={() => router.push(`/interactive-menu-hub/${item.id}`)}
                className="w-full bg-white/20 hover:bg-white text-white hover:text-primary border border-white/30 py-3 rounded-2xl flex items-center justify-center space-x-3 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 font-bengali font-bold cursor-pointer"
            >
                <Icon name="EyeIcon" size={20} />
                <span>বিস্তারিত দেখুন</span>
            </button>
        </div>

        {item.isPopular && (
          <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full flex items-center space-x-1 shadow-lg z-10">
            <Icon name="FireIcon" size={14} variant="solid" className="animate-pulse" />
            <span className="text-[10px] font-bold font-bengali">জনপ্রিয়</span>
          </div>
        )}

        {hasDiscount && (
          <div className="absolute top-4 left-4 bg-destructive text-white px-3 py-1 rounded-full flex items-center space-x-1 shadow-lg z-10 animate-bounce">
            <Icon name="TagIcon" size={14} variant="solid" />
            <span className="text-[10px] font-bold font-bengali">{discountValue}% ছাড়</span>
          </div>
        )}

        {item.isSpecial && (
          <div className={`absolute ${hasDiscount ? 'top-14' : 'top-4'} left-4 bg-amber-500 text-white px-3 py-1 rounded-full flex items-center space-x-1 shadow-lg z-10`}>
            <Icon name="StarIcon" size={14} variant="solid" />
            <span className="text-[10px] font-bold font-bengali">{item.specialTag || 'স্পেশাল'}</span>
          </div>
        )}

        {item.isVegetarian && (
          <div className="absolute top-4 right-4 bg-success text-success-foreground p-1.5 rounded-full shadow-lg z-10">
            <Icon name="CheckCircleIcon" size={16} variant="solid" />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title & Price */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bengali font-black text-xl text-foreground group-hover:text-primary transition-colors leading-tight">
            {item.nameBengali}
          </h3>
          <div className="text-right ml-2 shrink-0">
            {hasDiscount ? (
              <div className="flex flex-col items-end">
                <p className="font-heading font-black text-2xl text-primary leading-none">
                  ৳{discountedPrice}
                </p>
                <p className="text-sm text-muted-foreground line-through decoration-destructive/50 font-heading">
                  ৳{item.price}
                </p>
              </div>
            ) : (
              <p className="font-heading font-black text-2xl text-primary">
                ৳{item.price}
              </p>
            )}
          </div>
        </div>

        {/* Rating & Reviews - NEW */}
        <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                    <Icon 
                        key={i} 
                        name="StarIcon" 
                        size={12} 
                        className={i < Math.round(item.avgRating || 0) ? "text-warning" : "text-muted-foreground/20"} 
                        variant="solid" 
                    />
                ))}
            </div>
            {item.reviewCount ? (
                <span className="text-[10px] font-bengali text-muted-foreground">
                    ({item.avgRating}) {item.reviewCount}টি রিভিউ
                </span>
            ) : (
                <span className="text-[12px] font-bengali text-muted-foreground/50 italic">
                    কোন রিভিউ নেই
                </span>
            )}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 font-bengali leading-relaxed flex-1">
          {item.descriptionBengali}
        </p>

        {/* Quick Info */}
        <div className="flex items-center space-x-4 mb-6 text-[10px] text-muted-foreground font-bengali uppercase tracking-wider">
          <div className="flex items-center space-x-1">
            <Icon name="ClockIcon" size={14} className="text-primary" />
            <span>{item.preparationTime}</span>
          </div>
          {item.spiceLevel && (
            <div className="flex items-center space-x-1">
              <Icon name="FireIcon" size={14} className="text-orange-500" />
              <span>ঝাল: {item.spiceLevel === 'hot' ? 'বেশি' : 'মাঝারি'}</span>
            </div>
          )}
        </div>

        {/* Quantity Selector & Add Button Unified */}
        <div className="flex items-center space-x-3 bg-muted/30 p-1.5 rounded-2xl border border-border/30">
          {/* Quantity Controls */}
          <div className="flex items-center bg-card rounded-xl overflow-hidden shadow-sm border border-border/50">
            <button
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              className="w-8 h-10 flex items-center justify-center hover:bg-primary hover:text-white transition-all disabled:opacity-50 cursor-pointer"
              aria-label="পরিমাণ কমান"
            >
              <Icon name="MinusIcon" size={14} />
            </button>
            <div className="w-8 text-center font-heading font-black text-base">
              {quantity}
            </div>
            <button
              onClick={incrementQuantity}
              disabled={quantity >= 10}
              className="w-8 h-10 flex items-center justify-center hover:bg-primary hover:text-white transition-all disabled:opacity-50 cursor-pointer"
              aria-label="পরিমাণ বাড়ান"
            >
              <Icon name="PlusIcon" size={14} />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`
              flex-1 h-11 flex items-center justify-center space-x-2 rounded-xl
              font-bengali font-black transition-all duration-300 shadow-lg cursor-pointer
              ${
                isAdding
                  ? "bg-success text-success-foreground"
                  : "bg-primary text-primary-foreground hover:scale-[1.02] active:scale-95 shadow-primary/25"
              }
            `}
          >
            <Icon
              name={isAdding ? "CheckIcon" : "ShoppingCartIcon"}
              size={18}
              variant="solid"
            />
            <span className="text-sm">
              {isAdding ? "যোগ হয়েছে" : "যোগ করুন"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
