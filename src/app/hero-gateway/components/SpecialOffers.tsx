"use client";

import { useEffect, useState, useRef } from "react";
import Icon from "../../../components/ui/AppIcon";
import MenuItemCard from "../../interactive-menu-hub/components/MenuItemCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  reviewCount?: number;
  avgRating?: number;
}

interface SpecialOffersProps {
  onAddToCart: (item: any, quantity: number) => void;
}

export default function SpecialOffers({ onAddToCart }: SpecialOffersProps) {
  const [specialItems, setSpecialItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    async function fetchSpecialItems() {
      try {
        const res = await fetch("/api/menu");
        const data = await res.json();

        if (Array.isArray(data)) {
          const filtered = data
            .filter((item: any) => {
              const discount = typeof item.discount === 'string' ? parseInt(item.discount) : item.discount || 0;
              return discount > 0 || item.isSpecial === true;
            })
            .map((item: any, index: number) => ({
              id: item._id || index + 500,
              name: item.name,
              nameBengali: item.nameBengali || item.name,
              description: item.description,
              descriptionBengali: item.descriptionBengali || item.description,
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
              discount: item.discount,
              isSpecial: item.isSpecial,
              specialTag: item.specialTag,
              reviewCount: item.reviewCount || 0,
              avgRating: item.avgRating || 0,
            }));
          setSpecialItems(filtered);
        }
      } catch (err) {
        console.error("Failed to fetch special items", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSpecialItems();
  }, []);

  useEffect(() => {
    if (!loading && specialItems.length > 0) {
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        gsap.from(".special-card-anim", {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        });
      }, sectionRef);
      return () => ctx.revert();
    }
  }, [loading, specialItems]);

  if (loading || specialItems.length === 0) return null;

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-primary/5 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-black font-bengali mb-4 border border-primary/20">
             <Icon name="GiftIcon" size={16} variant="solid" className="text-primary" />
             <span>সীমিত সময়ের অফার</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black font-bengali text-foreground mb-6">
            আজকের <span className="text-primary">স্পেশাল</span> ধামাকা
          </h2>
          <p className="text-lg text-muted-foreground font-bengali max-w-2xl mx-auto">
            সেরা স্বাদের চা আর নাস্তা পান আকর্ষণীয় ডিসকাউন্টে। এই অফারগুলো শুধুমাত্র নির্দিষ্ট সময়ের জন্য প্রযোজ্য।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {specialItems.map((item) => (
            <div key={item.id} className="special-card-anim">
              <MenuItemCard 
                item={item} 
                onAddToCart={onAddToCart} 
                isSpecialVariant={item.isSpecial}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
