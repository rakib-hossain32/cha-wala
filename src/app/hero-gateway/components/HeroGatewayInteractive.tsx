"use client";

import { useRef } from "react";
// import Header from "@/components/common/Header";

import HeroSection from "./HeroSection";
import SpecialOffers from "./SpecialOffers";
import FeaturesSection from "./FeaturesSection";
import TopProducts from "./TopProducts";
import TestimonialsSection from "./TestimonialsSection";
import CTASection from "./CTASection";
import CartSummary from "../../interactive-menu-hub/components/CartSummary";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface CartItem {
  id: number | string;
  name: string;
  nameBengali: string;
  price: number;
  quantity: number;
  image: string;
  alt: string;
}

const HeroGatewayInteractive = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const savedCart = localStorage.getItem("chaOwalaCart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chaOwalaCart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (item: any, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        const itemImage = item.image || item.imageUrl || "https://images.unsplash.com/photo-1544787219-7f47ccb76574";
        const discountValue = typeof item.discount === 'string' ? parseInt(item.discount) : item.discount || 0;
        const finalPrice = discountValue > 0 ? Math.round(item.price - (item.price * (discountValue / 100))) : item.price;
        
        return [
          ...prevItems,
          {
            id: item.id,
            name: item.name,
            nameBengali: item.nameBengali,
            price: finalPrice,
            quantity: quantity,
            image: itemImage,
            alt: item.alt || item.name,
          },
        ];
      }
    });
  };

  const handleUpdateQuantity = (id: number | string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: number | string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      router.push("/order-fulfillment-center");
    }
  };

  const handleExploreClick = () => {
    if (featuresRef?.current) {
      featuresRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
    

      <main className="">
        <HeroSection onExploreClick={handleExploreClick} />

        <SpecialOffers onAddToCart={handleAddToCart} />

        <div ref={featuresRef}>
          <FeaturesSection />
        </div>

        <TopProducts onAddToCart={handleAddToCart} />

        <TestimonialsSection />
        <CTASection />
      </main>

      {/* Global Cart Summary for Home Page */}
      {cartItems.length > 0 && (
        <CartSummary
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
        />
      )}

     
    </div>
  );
};

export default HeroGatewayInteractive;
