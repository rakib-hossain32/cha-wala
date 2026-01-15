"use client";

import { useState, useEffect } from "react";
import Icon from "../../../components/ui/AppIcon";
import GalleryFilters from "./GalleryFilters";
import GalleryCard from "./GalleryCard";
import TestimonialCard from "./TestimonialCard";
import CulturalQuote from "./CulturalQuote";
import ShareModal from "./ShareModal";
import SubmissionForm from "./SubmissionForm";

interface GalleryItem {
  id: number;
  image: string;
  alt: string;
  category: string;
  title: string;
  titleBengali: string;
  description: string;
  descriptionBengali: string;
  author: string;
  authorBengali: string;
  date: string;
  likes: number;
  shares: number;
}

interface Testimonial {
  id: number;
  name: string;
  nameBengali: string;
  role: string;
  roleBengali: string;
  image: string;
  alt: string;
  rating: number;
  testimonial: string;
  testimonialBengali: string;
  date: string;
}

interface Quote {
  id: number;
  quote: string;
  quoteBengali: string;
  author: string;
  authorBengali: string;
}

interface SubmissionData {
  name: string;
  email: string;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  role?: string;
  rating?: number;
}

const CommunityGalleryInteractive = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [submissionFormOpen, setSubmissionFormOpen] = useState(false);
  const [selectedItemTitle, setSelectedItemTitle] = useState("");
  const [displayCount, setDisplayCount] = useState(6);
  const [isHydrated, setIsHydrated] = useState(false);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      if (Array.isArray(data)) {
        const mappedItems = data.map((item: any, index: number) => ({
          id: item._id || index + 100,
          image: item.imageUrl,
          alt: item.title,
          category: item.category || "মুহূর্ত",
          title: item.title,
          titleBengali: item.titleBengali || item.title,
          description: item.description || item.title,
          descriptionBengali: item.descriptionBengali || item.description || item.title,
          author: item.author,
          authorBengali: item.authorBengali || item.author,
          date: item.createdAt ? new Date(item.createdAt).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
          likes: item.likes || 0,
          shares: item.shares || 0,
        }));
        setGalleryItems(mappedItems);
      }
    } catch (e) {
      console.error("Failed to fetch gallery:", e);
    }
  };

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      if (Array.isArray(data)) {
        const mappedItems = data.map((item: any, index: number) => ({
          id: item._id || index + 200,
          name: item.name,
          nameBengali: item.nameBengali || item.name,
          role: item.role || "Customer",
          roleBengali: item.roleBengali || item.role,
          image: item.image || "https://img.rocket.new/generatedImages/rocket_gen_img_1b2063027-1763295402790.png",
          alt: item.name,
          rating: item.rating || 5,
          testimonial: item.testimonial,
          testimonialBengali: item.testimonialBengali || item.testimonial,
          date: item.date || (item.createdAt ? new Date(item.createdAt).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]),
        }));
        setTestimonials(mappedItems);
      }
    } catch (e) {
      console.error("Failed to fetch testimonials:", e);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchGallery(), fetchTestimonials()]);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleSubmission = async (data: SubmissionData) => {
    try {
      if (data.category === "testimonials") {
        const payload = {
          name: data.name,
          nameBengali: data.name,
          role: data.role,
          image: data.imageUrl,
          rating: data.rating,
          testimonial: data.description,
          testimonialBengali: data.description,
        };
        const res = await fetch("/api/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          fetchTestimonials();
        }
      } else {
        const payload = {
          title: data.title,
          imageUrl: data.imageUrl,
          author: data.name,
          category: data.category === "moments" ? "মুহূর্ত" : data.category === "events" ? "ইভেন্ট" : "সংস্কৃতি"
        };
        const res = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          fetchGallery();
        }
      }
    } catch (err) {
      console.error("Submission failed", err);
    }
  };

  const culturalQuotes: Quote[] = [
    {
      id: 1,
      quote:
        "A cup of chai is not just a beverage, it is a conversation waiting to happen.",
      quoteBengali:
        "এক কাপ চা শুধু একটি পানীয় নয়, এটি একটি কথোপকথন যা ঘটতে অপেক্ষা করছে।",
      author: "Bengali Proverb",
      authorBengali: "বাংলা প্রবাদ",
    },
    {
      id: 2,
      quote:
        "In every sip of chai, there is a story of tradition, warmth, and community.",
      quoteBengali:
        "চায়ের প্রতিটি চুমুকে ঐতিহ্য, উষ্ণতা এবং সম্প্রদায়ের একটি গল্প রয়েছে।",
      author: "চাই টোকেন দর্শন",
      authorBengali: "চাই টোকেন দর্শন",
    },
  ];

  const filteredItems =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => {
          const categoryMap: { [key: string]: string } = {
            moments: "মুহূর্ত",
            testimonials: "প্রশংসাপত্র",
            events: "ইভেন্ট",
            culture: "সংস্কৃতি",
          };
          return item.category === categoryMap[activeFilter];
        });

  const displayedItems = filteredItems.slice(0, displayCount);

  const handleShare = (id: number) => {
    const item = galleryItems.find((i) => i.id === id);
    if (item) {
      setSelectedItemTitle(item.titleBengali);
      setShareModalOpen(true);
    }
  };

  const handleLike = (id: number) => {
    console.log("Liked item:", id);
  };

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 6);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon
            name="ArrowPathIcon"
            size={48}
            className="text-primary animate-spin mx-auto mb-4"
          />
          <p className="font-bengali text-lg text-foreground">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-primary/10 via-secondary/10 to-accent/10 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/20 rounded-full mb-6">
            <Icon name="UserGroupIcon" size={24} className="text-primary" />
            <span className="font-bengali text-sm font-semibold text-primary">
              সম্প্রদায় গ্যালারি
            </span>
          </div>

          <h1 className="font-bengali text-4xl md:text-6xl font-bold text-foreground mb-4">
            আমাদের চা গল্প
          </h1>
          

          <p className="font-bengali text-lg text-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            প্রতিটি কাপ চায়ের সাথে একটি গল্প আছে। আমাদের সম্প্রদায়ের মুহূর্ত,
            স্মৃতি এবং অভিজ্ঞতা দেখুন।
          </p>
          <p className="font-heading text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            প্রতিটি কাপ চায়ের একটি গল্প আছে। আমাদের সম্প্রদায়ের মুহূর্ত,
            স্মৃতি এবং অভিজ্ঞতা অন্বেষণ করুন।
          </p>

          <button
            onClick={() => setSubmissionFormOpen(true)}
            className="mt-8 inline-flex items-center space-x-3 px-8 py-4 bg-conversion text-conversion-foreground rounded-xl  font-semibold cultural-transition hover:scale-105 shadow-warm-sm"
          >
            <Icon name="PlusCircleIcon" size={24} />
            <span className="font-bengali text-lg">আপনার গল্প শেয়ার করুন</span>
          </button>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <GalleryFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="aspect-square bg-muted rounded-2xl animate-pulse" />
                ))}
             </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedItems.map((item) => (
                  <GalleryCard
                    key={item.id}
                    item={item}
                    onShare={handleShare}
                    onLike={handleLike}
                  />
                ))}
              </div>

              {displayCount < filteredItems.length && (
                <div className="text-center mt-12">
                  <button
                    onClick={handleLoadMore}
                    className="inline-flex items-center space-x-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-heading font-semibold cultural-transition hover:scale-105 shadow-warm-sm"
                  >
                    <Icon name="ArrowDownCircleIcon" size={24} />
                    <span className="font-bengali">আরও দেখুন</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Cultural Quotes */}
      <section className="py-16 px-4 bg-linear-to-br from-muted/30 to-background">
        <div className="max-w-4xl mx-auto space-y-8">
          {culturalQuotes.map((quote) => (
            <CulturalQuote key={quote.id} quote={quote} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-bengali text-3xl md:text-4xl font-bold text-foreground mb-3">
              গ্রাহক প্রশংসাপত্র
            </h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-64 bg-muted rounded-2xl animate-pulse" />
                ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16 px-4 bg-linear-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: "UserGroupIcon",
                count: "10,000+",
                label: "সম্প্রদায় সদস্য",
              },
              {
                icon: "PhotoIcon",
                count: "5,000+",
                label: "শেয়ার করা মুহূর্ত",
              },
              {
                icon: "HeartIcon",
                count: "50,000+",
                label: "পছন্দ",
              },
              {
                icon: "ChatBubbleLeftRightIcon",
                count: "2,000+",
                label: "প্রশংসাপত্র",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 text-center shadow-warm hover-lift"
              >
                <Icon
                  name={stat.icon as any}
                  size={40}
                  className="text-primary mx-auto mb-4"
                />
                <p className="font-heading text-3xl font-bold text-foreground mb-2">
                  {stat.count}
                </p>
                <p className="font-bengali text-sm font-semibold text-muted-foreground mb-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Integration */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-bengali text-3xl md:text-4xl font-bold text-foreground mb-4">
            আমাদের সাথে যুক্ত হন
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: "Facebook", icon: "ShareIcon", color: "bg-blue-600" },
              { name: "Instagram", icon: "CameraIcon", color: "bg-pink-600" },
              {
                name: "Twitter",
                icon: "ChatBubbleLeftRightIcon",
                color: "bg-sky-500",
              },
              { name: "YouTube", icon: "VideoCameraIcon", color: "bg-red-600" },
            ].map((social) => (
              <button
                key={social.name}
                className={`
                  flex items-center space-x-2 px-6 py-3 rounded-xl cultural-transition hover:scale-105
                  ${social.color} text-white shadow-warm-sm
                `}
              >
                <Icon name={social.icon as any} size={24} />
                <span className="font-heading font-semibold">
                  {social.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        itemTitle={selectedItemTitle}
      />

      <SubmissionForm
        isOpen={submissionFormOpen}
        onClose={() => setSubmissionFormOpen(false)}
        onSubmit={handleSubmission}
      />
    </div>
  );
};

export default CommunityGalleryInteractive;
