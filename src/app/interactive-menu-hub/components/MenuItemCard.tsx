"use client";

import { useState } from "react";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

interface MenuItem {
  id: number;
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
}

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem, quantity: number) => void;
}

export default function MenuItemCard({ item, onAddToCart }: MenuItemCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

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
    <div className="bg-card rounded-lg shadow-warm overflow-hidden hover-lift">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <AppImage
          src={item.image}
          alt={item.alt}
          className="w-full h-full object-cover"
        />
        {item.isPopular && (
          <div className="absolute top-3 right-3 bg-conversion text-conversion-foreground px-3 py-1 rounded-full flex items-center space-x-1">
            <Icon name="FireIcon" size={16} variant="solid" />
            <span className="text-xs font-heading font-semibold">Popular</span>
          </div>
        )}
        {item.isVegetarian && (
          <div className="absolute top-3 left-3 bg-success text-success-foreground p-1.5 rounded-full">
            <Icon name="CheckCircleIcon" size={16} variant="solid" />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title & Price */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="font-bengali font-bold text-lg text-foreground leading-tight">
              {item.nameBengali}
            </h3>
            <p className="font-heading text-sm text-muted-foreground">
              {item.name}
            </p>
          </div>
          <div className="text-right ml-3">
            <p className="font-heading font-bold text-xl text-primary">
              ৳{item.price}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {item.descriptionBengali}
        </p>

        {/* Quick Info */}
        <div className="flex items-center space-x-4 mb-3 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="ClockIcon" size={14} />
            <span>{item.preparationTime}</span>
          </div>
          {item.spiceLevel && (
            <div className="flex items-center space-x-1">
              <Icon name="FireIcon" size={14} />
              <span className="capitalize">{item.spiceLevel}</span>
            </div>
          )}
        </div>

        {/* Details Toggle */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center space-x-1 text-sm text-primary hover:text-secondary cultural-transition mb-3"
        >
          <span className="font-heading">
            {showDetails ? "Hide Details" : "View Details"}
          </span>
          <Icon
            name={showDetails ? "ChevronUpIcon" : "ChevronDownIcon"}
            size={16}
          />
        </button>

        {/* Expanded Details */}
        {showDetails && (
          <div className="mb-4 p-3 bg-muted rounded-lg space-y-2">
            <div>
              <p className="font-bengali font-semibold text-sm mb-1">উপাদান:</p>
              <p className="text-xs text-muted-foreground">
                {item.ingredientsBengali.join(", ")}
              </p>
            </div>
            <div>
              <p className="font-heading font-semibold text-sm mb-1">
                Ingredients:
              </p>
              <p className="text-xs text-muted-foreground">
                {item.ingredients.join(", ")}
              </p>
            </div>
            <p className="text-xs text-muted-foreground italic">
              {item.description}
            </p>
          </div>
        )}

        {/* Quantity Selector & Add Button */}
        <div className="flex items-center space-x-3">
          {/* Quantity Controls */}
          <div className="flex items-center border border-border rounded-lg overflow-hidden">
            <button
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              className="px-3 py-2 bg-muted hover:bg-primary hover:text-primary-foreground cultural-transition disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Decrease quantity"
            >
              <Icon name="MinusIcon" size={16} />
            </button>
            <div className="px-4 py-2 bg-background font-heading font-semibold min-w-[3rem] text-center">
              {quantity}
            </div>
            <button
              onClick={incrementQuantity}
              disabled={quantity >= 10}
              className="px-3 py-2 bg-muted hover:bg-primary hover:text-primary-foreground cultural-transition disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Increase quantity"
            >
              <Icon name="PlusIcon" size={16} />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`
              flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg
              font-heading font-semibold cultural-transition
              ${
                isAdding
                  ? "bg-success text-success-foreground"
                  : "bg-conversion text-conversion-foreground hover:scale-105"
              }
              disabled:cursor-not-allowed
            `}
          >
            <Icon
              name={isAdding ? "CheckIcon" : "ShoppingCartIcon"}
              size={18}
              variant="solid"
            />
            <span className="font-bengali">
              {isAdding ? "যোগ হয়েছে" : "যোগ করুন"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
