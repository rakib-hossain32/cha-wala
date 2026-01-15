"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MenuCategory from "./MenuCategory";
import MenuItemCard from "./MenuItemCard";
import CartSummary from "./CartSummary";

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
  discount?: number | string;
  isSpecial?: boolean;
  specialTag?: string;
}

interface CartItem {
  id: number | string;
  name: string;
  nameBengali: string;
  price: number;
  quantity: number;
  image: string;
  alt: string;
}

const categories = [
  { id: "all", name: "All Items", nameBengali: "সব আইটেম" },
  { id: "cha", name: "Chai", nameBengali: "চা" },
  { id: "snacks", name: "Snacks", nameBengali: "নাস্তা" },
  { id: "sweets", name: "Sweets", nameBengali: "মিষ্টি" },
];

export default function MenuInteractive() {
  const router = useRouter();
  // Hardcoded items removed in favor of API fetch
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch("/api/menu");
        const data = await res.json();
        
        const bengaliTranslations: Record<string, { name: string; desc: string }> = {
          "Masala Chai": { name: "মশলা চা", desc: "এলাচ, আদা এবং দারুচিনি দিয়ে তৈরি আমাদের ঐতিহ্যবাহী মশলা চা।" },
          "Samosa": { name: "সিঙ্গারা", desc: "মশলাদার আলু এবং মটর দিয়ে তৈরি মুচমুচে নাস্তা।" },
          "Karak Tea": { name: "কড়ক চা", desc: "ঘন দুধ এবং সেরা চা পাতার মিশ্রণে তৈরি কড়া স্বাদের চা।" },
          "Gulab Jamun": { name: "গোলাপ জামুন", desc: "গোলাপের সুবাসযুক্ত চিনির সিরায় ভেজানো সুস্বাদু মিষ্টি।" }
        };

        if (Array.isArray(data)) {
          const mappedItems = data.map((item: any, index: number) => {
            const translation = bengaliTranslations[item.name] || {};
            return {
              id: item._id || index + 100,
              name: item.name,
              nameBengali: item.nameBengali || translation.name || item.name,
              description: item.description,
              descriptionBengali: item.descriptionBengali || translation.desc || item.description,
              price: item.price,
              image: item.imageUrl || "https://images.unsplash.com/photo-1544787219-7f47ccb76574",
              alt: item.name,
              category: (item.category || "cha").toLowerCase(),
              ingredients: item.ingredients || [],
              ingredientsBengali: item.ingredientsBengali || [],
              preparationTime: item.preparationTime || "5 min",
              spiceLevel: item.spiceLevel || "medium",
              isVegetarian: item.isVegetarian !== false,
              isPopular: item.isPopular,
              reviewCount: item.reviewCount || 0,
              avgRating: item.avgRating || 0,
              discount: item.discount,
              isSpecial: item.isSpecial,
              specialTag: item.specialTag,
            };
          });
          setMenuItems(mappedItems);
        }
      } catch (err) {
        console.error("Failed to fetch menu", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, []);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);
  
  // Reset visible count when category or search changes
  useEffect(() => {
    setVisibleCount(10);
  }, [selectedCategory, searchQuery]);

  // Load cart from localStorage on mount
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

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("chaOwalaCart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (item: MenuItem, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        return [
          ...prevItems,
          {
            id: item.id,
            name: item.name,
            nameBengali: item.nameBengali,
            price: item.price,
            quantity: quantity,
            image: item.image,
            alt: item.alt,
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

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameBengali.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const gsap = require("gsap").gsap;
    const ScrollTrigger = require("gsap/ScrollTrigger").ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!loading && menuItems.length > 0) {
        // Header Animation
        gsap.from(".menu-header-content", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
        });

        // Filter Animation
        gsap.from(".menu-filter-pill", {
          scale: 0.8,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.08,
          delay: 0.3,
        });
      }
    });

    return () => ctx.revert();
  }, [loading, menuItems.length]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const gsap = require("gsap").gsap;
    const ScrollTrigger = require("gsap/ScrollTrigger").ScrollTrigger;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".menu-item-card-wrapper");
      
      // Clear existing ScrollTriggers for these items
      ScrollTrigger.getAll().forEach((st: any) => {
        if (st.vars.trigger && (st.vars.trigger as any).classList?.contains('menu-item-card-wrapper')) {
          st.kill();
        }
      });

      items.forEach((item: any) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top bottom-=50",
            toggleActions: "play none none none",
            once: true,
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      });
    });

    return () => ctx.revert();
  }, [filteredItems]);

  return (
    <div className="min-h-screen bg-background pt-20 pb-32">
      <div className="w-full py-8">
        {/* Header Section - Centered */}
        <div className="max-w-7xl mx-auto mb-12 text-center">
          <div className="mb-10">
            <h1 className="menu-header-content font-bengali font-bold text-5xl lg:text-7xl text-foreground mb-4">
              আমাদের মেনু
            </h1>
            <p className="menu-header-content font-heading text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              আমাদের খাঁটি স্বাদের সংগ্রহ দেখুন
            </p>
          </div>

          {/* Search Bar - Centered */}
          <div className="menu-header-content max-w-2xl mx-auto mb-10">
            <div className="relative group">
              <input
                type="text"
                placeholder="আপনার পছন্দের আইটেমটি খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-8 py-4 pl-14 rounded-2xl border-2 border-border/50 bg-card/80 backdrop-blur-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 shadow-xl font-bengali text-xl"
              />

              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary transition-transform group-focus-within:scale-110">
                <Icon name="MagnifyingGlassIcon" size={24} />
              </div>
            </div>
          </div>

          {/* Category Filter - Centered */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <div key={category.id} className="menu-filter-pill">
                <MenuCategory
                  category={category.name}
                  categoryBengali={category.nameBengali}
                  isActive={selectedCategory === category.id}
                  onClick={() => setSelectedCategory(category.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Menu Grid - Centered without offset */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 ">
          {filteredItems.length === 0 ? (
            <div className="text-center py-24 bg-card/30 backdrop-blur-sm rounded-3xl border-2 border-dashed border-border/50">
              <Icon
                name="MagnifyingGlassIcon"
                size={80}
                className="mx-auto text-muted-foreground/30 mb-6"
              />
              <p className="font-bengali text-2xl text-muted-foreground mb-2">
                কোন আইটেম পাওয়া যায়নি
              </p>
              <p className="text-muted-foreground font-bengali">
                আপনার অনুসন্ধানের সাথে মিলিত কোনো আইটেম পাওয়া যায়নি
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
                {filteredItems.slice(0, visibleCount).map((item) => (
                  <div key={item.id} className="menu-item-card-wrapper w-full">
                    <MenuItemCard
                      item={item}
                      onAddToCart={handleAddToCart}
                    />
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {visibleCount < filteredItems.length && (
                <div className="mt-16 text-center">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 10)}
                    className="group relative inline-flex items-center justify-center px-12 py-4 font-bengali font-black text-xl bg-card hover:bg-primary text-foreground hover:text-white border-2 border-primary/20 hover:border-primary rounded-2xl transition-all duration-500 shadow-xl hover:shadow-primary/30 transform hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Icon name="PlusCircleIcon" size={24} className="mr-3 group-hover:rotate-180 transition-transform duration-700" />
                    <span>আরো দেখুন</span>
                  </button>
                  <p className="mt-4 text-muted-foreground font-bengali text-sm">
                    {visibleCount} টি আইটেম দেখানো হচ্ছে (মোট {filteredItems.length} টি)
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Cart Summary - Now as a floating side component or responsive bottom drawer */}
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
}
