"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Icon from "../../../components/ui/AppIcon";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MenuItemCard from "../../interactive-menu-hub/components/MenuItemCard";

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

interface TopProductsProps {
  onAddToCart: (item: MenuItem, quantity: number) => void;
}

const TopProducts = ({ onAddToCart }: TopProductsProps) => {
  const [products, setProducts] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    async function fetchTopProducts() {
      try {
        const res = await fetch("/api/menu");
        const data = await res.json();

        if (Array.isArray(data)) {
          const bengaliTranslations: Record<string, { name: string; desc: string }> = {
            "Masala Chai": { name: "মশলা চা", desc: "এলাচ, আদা এবং দারুচিনি দিয়ে তৈরি আমাদের ঐতিহ্যবাহী মশলা চা।" },
            "Samosa": { name: "সিঙ্গারা", desc: "মশলাদার আলু এবং মটর দিয়ে তৈরি মুচমুচে নাস্তা।" },
            "Karak Tea": { name: "কড়ক চা", desc: "ঘন দুধ এবং সেরা চা পাতার মিশ্রণে তৈরি কড়া স্বাদের চা।" },
            "Gulab Jamun": { name: "গোলাপ জামুন", desc: "গোলাপের সুবাসযুক্ত চিনির সিরায় ভেজানো সুসুাদু মিষ্টি।" }
          };

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
              category: (item.category || "chai").toLowerCase(),
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

          let popular = mappedItems.filter(item => item.isPopular);
          if (popular.length === 0) {
            popular = mappedItems.slice(0, 4);
          } else {
            popular = popular.slice(0, 4);
          }
          setProducts(popular);
        }
      } catch (err) {
        console.error("Failed to fetch top products", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTopProducts();
  }, []);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const cardWidth = scrollRef.current.querySelector('div')?.clientWidth || clientWidth;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(index);
    }
  };

  const scrollToItem = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.querySelector('div')?.clientWidth || 0;
      const gap = 16; 
      scrollRef.current.scrollTo({ left: index * (cardWidth + gap), behavior: 'smooth' });
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    if (!loading && products.length > 0) {
      gsap.registerPlugin(ScrollTrigger);
      
      const ctx = gsap.context(() => {
        // Simple subtle entrance without affecting visibility or alignment
        gsap.from(".product-card-anim", {
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [loading, products]);

  if (loading) {
    return (
      <section className="py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto text-center">
            <div className="animate-pulse flex flex-col items-center">
                <div className="h-10 w-64 bg-muted rounded-lg mb-8"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-96 bg-muted rounded-4xl"></div>
                    ))}
                </div>
            </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-background relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] opacity-40" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] opacity-40" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="text-left">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black font-bengali text-foreground mb-6 leading-tight">
              জনপ্রিয় <span className="text-primary relative inline-block">
                পছন্দসমূহ
                <div className="absolute -bottom-2 left-0 w-full h-2 bg-primary/20 rounded-full"></div>
              </span>
            </h2>
            <p className="text-xl text-muted-foreground font-bengali max-w-2xl leading-relaxed">
              আমাদের অতিথিদের সবচেয়ে প্রিয় এবং প্রশংসিত আইটেমগুলো এখানে। প্রতিটি স্বাদেই পাবেন বিশুদ্ধতার ছোঁয়া।
            </p>
          </div>
          <Link 
            href="/interactive-menu-hub"
            className="group flex items-center space-x-3 bg-card hover:bg-primary hover:text-primary-foreground border-2 border-primary/20 hover:border-primary px-10 py-5 rounded-4xl transition-all duration-500 shadow-xl hover:shadow-primary/30"
          >
            <span className="font-bengali font-black text-xl">মেনু দেখুন</span>
            <Icon name="ArrowRightIcon" size={24} className="group-hover:translate-x-2 transition-transform duration-500" />
          </Link>
        </div>

        {/* Mobile Slider / Desktop Grid Container */}
        <div className="relative group/slider">
            <div 
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 items-stretch overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory no-scrollbar -mx-4 px-4 md:mx-0 md:px-0"
            >
                {products.map((product, idx) => (
                    <div 
                        key={product.id} 
                        className="product-card-anim min-w-[85vw] sm:min-w-[340px] md:min-w-0 snap-center md:snap-align-none flex flex-col h-full transition-all duration-300"
                    >
                        <MenuItemCard
                            item={product}
                            onAddToCart={onAddToCart}
                        />
                    </div>
                ))}
            </div>

            {/* Mobile Navigation Dots */}
            <div className="flex md:hidden justify-center items-center space-x-2 mt-4">
                {products.map((_, idx) => (
                    <button 
                        key={idx} 
                        onClick={() => scrollToItem(idx)}
                        className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                            activeIndex === idx 
                            ? 'bg-primary w-6 shadow-lg shadow-primary/30' 
                            : 'bg-primary/20 w-2 hover:bg-primary/40'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>

            {/* Mobile Navigation Arrows (Optional but nice) */}
            <div className="flex md:hidden justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 pointer-events-none px-2">
                <button 
                    onClick={() => scroll('left')}
                    className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border border-border shadow-lg flex items-center justify-center text-foreground pointer-events-auto"
                >
                    <Icon name="ChevronLeftIcon" size={20} />
                </button>
                <button 
                    onClick={() => scroll('right')}
                    className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border border-border shadow-lg flex items-center justify-center text-foreground pointer-events-auto"
                >
                    <Icon name="ChevronRightIcon" size={20} />
                </button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default TopProducts;
