"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Icon from "../../../components/ui/AppIcon";
import AppImage from "../../../components/ui/AppImage";
import CartSummary from "../components/CartSummary";
import MenuItemCard from "../components/MenuItemCard";
import FeedbackModal from "../../hero-gateway/components/FeedbackModal";
import React from "react";
import { gsap } from "gsap";

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

interface ProductReview {
  _id: string;
  productId: string;
  name: string;
  nameBengali: string;
  role: string;
  roleBengali: string;
  rating: number;
  testimonial: string;
  testimonialBengali: string;
  image: string;
  date: string;
}

export default function MenuItemDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = React.use(params);
  const [item, setItem] = useState<MenuItem | null>(null);
  const [relatedItems, setRelatedItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const mainRef = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isReviewsLoading, setIsReviewsLoading] = useState(false);

  const bengaliTranslations: Record<string, { name: string; desc: string }> = {
    "Masala Chai": { name: "মশলা চা", desc: "এলাচ, আদা এবং দারুচিনি দিয়ে তৈরি আমাদের ঐতিহ্যবাহী মশলা চা।" },
    "Samosa": { name: "সিঙ্গারা", desc: "মশলাদার আলু এবং মটর দিয়ে তৈরি মুচমুচে নাস্তা।" },
    "Karak Tea": { name: "কড়ক চা", desc: "ঘন দুধ এবং সেরা চা পাতার মিশ্রণে তৈরি কড়া স্বাদের চা।" },
    "Gulab Jamun": { name: "গোলাপ জামুন", desc: "গোলাপের সুবাসযুক্ত চিনির সিরায় ভেজানো সুস্বাদু মিষ্টি।" }
  };

  const mapItem = (data: any) => {
    const translation = bengaliTranslations[data.name] || {};
    return {
      id: data._id,
      name: data.name,
      nameBengali: data.nameBengali || translation.name || data.name,
      description: data.description,
      descriptionBengali: data.descriptionBengali || translation.desc || data.description,
      price: data.price,
      image: data.imageUrl || "https://images.unsplash.com/photo-1544787219-7f47ccb76574",
      alt: data.name,
      category: (data.category || "chai").toLowerCase(),
      ingredients: data.ingredients || [],
      ingredientsBengali: data.ingredientsBengali || [],
      preparationTime: data.preparationTime || "5 min",
      spiceLevel: data.spiceLevel || "medium",
      isVegetarian: data.isVegetarian !== false,
      isPopular: data.isPopular,
      reviewCount: data.reviewCount || 0,
      avgRating: data.avgRating || 0,
    };
  };


  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(`/api/menu/${id}`);
        if (!res.ok) throw new Error("Item not found");
        const data = await res.json();
        const currentItem = mapItem(data);
        setItem(currentItem);

        const allRes = await fetch("/api/menu");
        const allData = await allRes.json();
        
        if (Array.isArray(allData)) {
            const currentItemCategory = currentItem.category.trim().toLowerCase();
            const currentItemId = String(currentItem.id);

            const related = allData
                .map(mapItem)
                .filter(i => {
                    const itemCategory = i.category.trim().toLowerCase();
                    const itemId = String(i.id);
                    return itemId !== currentItemId && itemCategory === currentItemCategory;
                })
                .sort(() => Math.random() - 0.5) 
                .slice(0, 10);
            
            setRelatedItems(related);
        }
      } catch (err) {
        console.error("Failed to fetch item details", err);
        setError("Item not found");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    fetchReviews();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchReviews = async () => {
    try {
      setIsReviewsLoading(true);
      const res = await fetch(`/api/testimonials?productId=${id}`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    } finally {
      setIsReviewsLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && item) {
      gsap.from(".detail-fade-in", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      });
    }
  }, [loading, item]);

  // Load cart
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

  // Save cart
  useEffect(() => {
    localStorage.setItem("chaOwalaCart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (itm: MenuItem = item!, qty: number = quantity) => {
    if (!itm) return;
    setIsAdding(true);
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === itm.id);
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === itm.id
            ? { ...cartItem, quantity: cartItem.quantity + qty }
            : cartItem
        );
      } else {
        return [
          ...prevItems,
          {
            id: itm.id,
            name: itm.name,
            nameBengali: itm.nameBengali,
            price: itm.price,
            quantity: qty,
            image: itm.image,
            alt: itm.alt,
          },
        ];
      }
    });

    setTimeout(() => {
      setIsAdding(false);
      if (itm.id === item?.id) setQuantity(1);
    }, 500);
  };

  const handleUpdateQuantity = (id: number | string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((itm) =>
        itm.id === id ? { ...itm, quantity: newQty } : itm
      )
    );
  };

  const handleRemoveItem = (id: number | string) => {
    setCartItems((prevItems) => prevItems.filter((itm) => itm.id !== id));
  };

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      router.push("/order-fulfillment-center");
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const scrollToItem = (index: number) => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.querySelector('div')?.clientWidth || 0;
      const gap = 16; // md:gap-6 lg:gap-8 adjustments needed but let's approximate or get computed style
      scrollRef.current.scrollTo({ left: index * (itemWidth + gap), behavior: 'smooth' });
      setActiveIndex(index);
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / (scrollRef.current.querySelector('div')?.clientWidth || clientWidth));
      setActiveIndex(index);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-32 px-4">
        <div className="max-w-6xl mx-auto">
            <div className="animate-pulse space-y-8">
                <div className="h-10 w-48 bg-muted rounded-xl"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="h-[500px] bg-muted rounded-4xl"></div>
                    <div className="space-y-6">
                        <div className="h-12 w-3/4 bg-muted rounded-xl"></div>
                        <div className="h-8 w-1/4 bg-muted rounded-xl"></div>
                        <div className="h-32 w-full bg-muted rounded-xl"></div>
                        <div className="h-16 w-full bg-muted rounded-xl"></div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <div className="bg-card p-12 rounded-4xl shadow-warm text-center max-w-md w-full border border-border/50">
            <Icon name="ExclamationCircleIcon" size={64} className="text-destructive mx-auto mb-6" />
            <h1 className="text-3xl font-bold font-bengali text-foreground mb-4">আইটেম পাওয়া যায়নি</h1>
            <p className="text-muted-foreground mb-8 font-bengali">দুঃখিত, আপনি যে আইটেমটি খুঁজছেন তা আমাদের ডেটাবেসে পাওয়া যায়নি।</p>
            <Link href="/interactive-menu-hub" className="block w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold font-bengali hover:scale-105 transition-transform shadow-lg shadow-primary/20">
                মেনুতে ফিরে যান
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-32 lg:pb-16" ref={mainRef}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Breadcrumb / Back Navigation */}
        <nav className="mb-10 detail-fade-in">
          <Link
            href="/interactive-menu-hub"
            className="group inline-flex items-center text-muted-foreground hover:text-primary transition-all font-bengali font-bold"
          >
            <div className="w-10 h-10 rounded-full bg-card border border-border/50 flex items-center justify-center mr-3 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
                <Icon name="ArrowLeftIcon" size={20} />
            </div>
            মেনুতে ফিরে যান
          </Link>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-20 mb-16 md:mb-24 items-start">
          {/* Left Side: Product Image with Frame */}
          <div className="lg:col-span-5 detail-fade-in md:sticky md:top-32">
            <div className="relative group mx-auto max-w-md md:max-w-none">
                {/* Decorative Background Elements */}
                <div className="absolute -inset-4 bg-primary/5 rounded-3xl md:rounded-4xl blur-2xl group-hover:bg-primary/10 transition-colors duration-500"></div>
                
                <div className="relative aspect-square md:aspect-4/5 lg:aspect-square rounded-4xl overflow-hidden shadow-2xl border-4 md:border-8 border-card group-hover:border-primary/5 transition-all duration-500">
                    <AppImage
                        src={item.image}
                        alt={item.alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    
                    {item.isPopular && (
                        <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-primary text-primary-foreground px-4 py-1.5 md:px-5 md:py-2 rounded-full flex items-center space-x-2 shadow-xl backdrop-blur-md">
                            <Icon name="FireIcon" size={16} variant="solid" className="animate-pulse" />
                            <span className="text-[10px] md:text-xs font-bold font-bengali">জনপ্রিয়</span>
                        </div>
                    )}
                    
                    {item.isVegetarian && (
                        <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-green-500 text-white p-1.5 md:p-2 rounded-full shadow-xl backdrop-blur-md">
                            <Icon name="CheckCircleIcon" size={18}  variant="solid" />
                        </div>
                    )}
                </div>
            </div>
          </div>

          {/* Right Side: Product Info */}
          <div className="lg:col-span-7 flex flex-col detail-fade-in mt-8 md:mt-0">
            <div className="mb-8 md:mb-10">
                <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4 md:mb-6">
                    <span className="px-4 py-1.5 md:px-5 md:py-2 rounded-xl md:rounded-2xl bg-primary/10 text-primary text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]">{item.category}</span>
                    {item.spiceLevel && (
                        <span className={`px-4 py-1.5 md:px-5 md:py-2 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-bold flex items-center space-x-1.5 ${
                            item.spiceLevel === 'hot' ? 'bg-red-500/10 text-red-500' : 'bg-orange-500/10 text-orange-500'
                        }`}>
                            <Icon name="FireIcon" size={12}  />
                            <span>ঝাল: {item.spiceLevel === 'hot' ? 'বেশি' : 'মাঝারি'}</span>
                        </span>
                    )}
                </div>
                
                <h1 className="font-bengali font-black text-4xl md:text-5xl lg:text-7xl text-foreground mb-4 md:mb-6 leading-[1.1] md:leading-[1.1]">
                    {item.nameBengali}
                </h1>
                
                <div className="flex items-end space-x-4 mb-8">
                    <span className="font-heading font-black text-5xl text-primary">৳{item.price}</span>
                    <span className="text-muted-foreground font-bengali text-lg mb-1">(ভ্যাট অন্তর্ভুক্ত)</span>
                </div>

                <div className="space-y-8">
                    <div className="bg-card/50 backdrop-blur-sm p-6 rounded-3xl border border-border/50">
                        <h3 className="font-bengali font-bold text-xl mb-3 flex items-center">
                            <Icon name="DocumentTextIcon" size={20} className="mr-2 text-primary" />
                            বর্ণনা
                        </h3>
                        <p className="text-muted-foreground font-bengali leading-relaxed text-lg">
                            {item.descriptionBengali}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-muted/50 p-6 rounded-3xl border border-border/30">
                            <h3 className="font-bengali font-bold text-sm text-muted-foreground mb-2 flex items-center">
                                <Icon name="BeakerIcon" size={16} className="mr-2" />
                                উপাদানসমূহ
                            </h3>
                            <p className="font-bengali font-semibold text-foreground">
                                {item.ingredientsBengali.length > 0 ? item.ingredientsBengali.join(", ") : "খাঁটি উপাদান"}
                            </p>
                        </div>
                        <div className="bg-muted/50 p-6 rounded-3xl border border-border/30">
                            <h3 className="font-bengali font-bold text-sm text-muted-foreground mb-2 flex items-center">
                                <Icon name="ClockIcon" size={16} className="mr-2" />
                                প্রস্তুতি সময়
                            </h3>
                            <p className="font-bengali font-semibold text-foreground">
                                {item.preparationTime}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="space-y-6 pt-8 border-t border-border mt-auto">
                <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center bg-card border-2 border-border/50 rounded-2xl overflow-hidden h-16 shadow-inner">
                        <button
                            onClick={() => quantity > 1 && setQuantity((q) => q - 1)}
                            disabled={quantity <= 1}
                            className="w-14 h-full flex items-center justify-center hover:bg-muted cultural-transition disabled:opacity-30 cursor-pointer"
                        >
                            <Icon name="MinusIcon" size={20} />
                        </button>
                        <div className="w-16 h-full flex items-center justify-center font-heading font-black text-2xl">
                            {quantity}
                        </div>
                        <button
                            onClick={() => quantity < 10 && setQuantity((q) => q + 1)}
                            disabled={quantity >= 10}
                            className="w-14 h-full flex items-center justify-center hover:bg-muted cultural-transition disabled:opacity-30 cursor-pointer"
                        >
                            <Icon name="PlusIcon" size={20} />
                        </button>
                    </div>

                    <button
                        onClick={() => handleAddToCart()}
                        disabled={isAdding}
                        className={`
                            flex-1 h-16 flex items-center justify-center space-x-3 rounded-2xl
                            font-bengali font-black text-xl cultural-transition shadow-2xl cursor-pointer
                            ${
                                isAdding
                                ? "bg-green-500 text-white"
                                : "bg-primary text-primary-foreground hover:scale-[1.03] active:scale-95 shadow-primary/30"
                            }
                        `}
                    >
                        <Icon
                            name={isAdding ? "CheckIcon" : "ShoppingCartIcon"}
                            size={28}
                            variant="solid"
                        />
                        <span>
                            {isAdding ? "যোগ করা হয়েছে" : "কার্টে যোগ করুন"}
                        </span>
                    </button>
                </div>
            </div>
          </div>
        </div>

        {/* Product Reviews Section */}
        <section className="mt-24 border-t border-border pt-20">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                <div className="text-center md:text-left">
                    <h2 className="font-bengali font-black text-4xl text-foreground mb-3">গ্রাহকদের রিভিউ</h2>
                    <p className="text-muted-foreground font-bengali">এই প্রোডাক্ট সম্পর্কে অন্যান্য গ্রাহকরা কী বলছেন।</p>
                </div>
                <button 
                  onClick={() => setIsReviewModalOpen(true)}
                  className="px-8 py-4 bg-primary text-white rounded-2xl font-bengali font-bold hover:scale-105 transition-transform shadow-xl shadow-primary/20 flex items-center gap-2 cursor-pointer"
                >
                  <Icon name="ChatBubbleBottomCenterTextIcon" size={24} />
                  রিভিউ দিন
                </button>
            </div>

            {isReviewsLoading ? (
               <div className="max-w-4xl mx-auto space-y-8">
                  {[1, 2].map(i => (
                    <div key={i} className="h-40 bg-card animate-pulse rounded-3xl border border-border/30"></div>
                  ))}
               </div>
            ) : reviews.length > 0 ? (
                <div className="max-w-4xl mx-auto space-y-12">
                    {reviews.map((review) => (
                        <div key={review._id} className="flex flex-col md:flex-row gap-6 items-start group animate-in slide-in-from-bottom-4 duration-700">
                            {/* User Avatar */}
                            <div className="flex-shrink-0">
                                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border-2 border-primary/20 shadow-lg group-hover:border-primary transition-colors">
                                    <AppImage 
                                        src={review.image} 
                                        alt={review.name} 
                                        className="w-full h-full object-cover" 
                                    />
                                </div>
                            </div>
                            
                            {/* Review Content */}
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                    <div>
                                        <h4 className="font-bengali font-black text-2xl text-foreground mb-1">{review.nameBengali}</h4>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm text-primary font-bengali font-bold bg-primary/5 px-3 py-1 rounded-lg">{review.roleBengali}</span>
                                            <span className="text-xs text-muted-foreground font-heading">{review.date}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Icon 
                                                key={i} 
                                                name="StarIcon" 
                                                size={18} 
                                                className={i < review.rating ? "text-warning" : "text-muted-foreground/20"} 
                                                variant="solid" 
                                            />
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="relative">
                                    <Icon name="ChatBubbleLeftIcon" size={40} className="absolute -top-4 -left-4 text-primary/5 -z-1" />
                                    <p className="text-foreground/80 font-bengali leading-relaxed text-xl mb-4 pl-2">
                                        {review.testimonialBengali}
                                    </p>
                                </div>
                                
                                <div className="flex items-center gap-2 text-success/80">
                                    <Icon name="CheckBadgeIcon" size={16} variant="solid" />
                                    <span className="text-xs font-bengali font-bold uppercase tracking-wider">ভেরিফাইড কাস্টমার</span>
                                </div>
                                
                                <div className="mt-8 h-px w-full bg-gradient-to-r from-border/50 via-border/20 to-transparent"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="max-w-4xl mx-auto bg-card/30 backdrop-blur-sm py-20 px-4 rounded-4xl text-center border-2 border-dashed border-primary/10">
                    <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Icon name="ChatBubbleLeftEllipsisIcon" size={40} className="text-primary/40" />
                    </div>
                    <h3 className="text-2xl font-bengali font-bold text-foreground mb-2">এখনো কোনো রিভিউ নেই</h3>
                    <p className="text-muted-foreground font-bengali text-lg max-w-md mx-auto">এই অসাধারণ {item.nameBengali} সম্পর্কে প্রথম রিভিউটি আপনিই দিন!</p>
                </div>
            )}
        </section>

        {/* Feedback Modal for Specific Product */}
        <FeedbackModal 
           isOpen={isReviewModalOpen}
           onClose={() => setIsReviewModalOpen(false)}
           onSuccess={fetchReviews}
           productId={id}
        />

        {/* Related Products Section */}
        {relatedItems.length > 0 && (
            <div className="mt-32">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <h2 className="font-bengali font-black text-4xl text-foreground mb-2">রিলেটেড আইটেম</h2>
                        <div className="h-1.5 w-24 bg-primary rounded-full"></div>
                    </div>
                    <Link href="/interactive-menu-hub" className="text-primary font-bengali font-bold hover:underline flex items-center">
                        সবগুলো দেখুন
                        <Icon name="ArrowRightIcon" size={18} className="ml-1" />
                    </Link>
                </div>
                
                <div className="relative group/slider">
                    {/* Navigation Buttons - Visible on all screens but optimized for touch as well */}
                    <button 
                        onClick={() => scroll('left')}
                        className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-6 z-30 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/95 backdrop-blur-md border border-primary/20 shadow-2xl flex items-center justify-center text-primary transition-all duration-500 hover:bg-primary hover:text-white cursor-pointer"
                        aria-label="Previous"
                    >
                        <Icon name="ChevronLeftIcon" size={20} className="md:w-7 md:h-7" />
                    </button>
                    
                    <button 
                        onClick={() => scroll('right')}
                        className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 md:translate-x-6 z-30 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/95 backdrop-blur-md border border-primary/20 shadow-2xl flex items-center justify-center text-primary transition-all duration-500 hover:bg-primary hover:text-white cursor-pointer"
                        aria-label="Next"
                    >
                        <Icon name="ChevronRightIcon" size={20} className="md:w-7 md:h-7" />
                    </button>

                    {/* Horizontal Scroll Container */}
                    <div 
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="flex overflow-x-auto pb-8 gap-4 md:gap-6 lg:gap-8 snap-x snap-mandatory no-scrollbar scroll-smooth -mx-4 px-4 md:mx-0 md:px-0"
                    >
                        {relatedItems.map((relatedItem, idx) => (
                            <div 
                                key={relatedItem.id} 
                                className={`min-w-[80vw] sm:min-w-[300px] md:min-w-[340px] snap-center md:snap-start transition-all duration-500 transform ${
                                    activeIndex === idx ? 'scale-100 opacity-100' : 'scale-95 opacity-50 md:scale-100 md:opacity-100'
                                }`}
                            >
                                <MenuItemCard 
                                    item={relatedItem} 
                                    onAddToCart={(item, qty) => handleAddToCart(item, qty)} 
                                />
                            </div>
                        ))}
                    </div>

                    {/* Navigation Dots / Indicators */}
                    <div className="flex justify-center items-center space-x-3 mt-4">
                        {relatedItems.slice(0, Math.min(relatedItems.length, 10)).map((_, idx) => (
                            <button 
                                key={idx} 
                                onClick={() => scrollToItem(idx)}
                                className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                                    activeIndex === idx 
                                    ? 'bg-primary w-8 shadow-lg shadow-primary/30' 
                                    : 'bg-primary/20 w-2.5 hover:bg-primary/40'
                                }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        )}
      </div>
      
      {/* Real-time Order Summary */}
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
