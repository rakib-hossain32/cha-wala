"use client";

import { useState, useEffect } from "react";
import Icon from "@/components/ui/AppIcon";
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
}

const CommunityGalleryInteractive = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [submissionFormOpen, setSubmissionFormOpen] = useState(false);
  const [selectedItemTitle, setSelectedItemTitle] = useState("");
  const [displayCount, setDisplayCount] = useState(6);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1668673787511-ce8b37b937b7",
      alt: "Group of young Bengali friends laughing together over steaming cups of chai in cozy tea house with warm lighting",
      category: "মুহূর্ত",
      title: "Morning Chai Ritual",
      titleBengali: "সকালের চা অনুষ্ঠান",
      description:
        "Friends gathering for their daily chai ritual, sharing stories and laughter.",
      descriptionBengali:
        "বন্ধুরা তাদের দৈনিক চা অনুষ্ঠানের জন্য জড়ো হচ্ছে, গল্প এবং হাসি ভাগ করছে।",
      author: "Rahul Sharma",
      authorBengali: "রাহুল শর্মা",
      date: "2025-12-20",
      likes: 234,
      shares: 45,
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1616388560850-89b6a8df572d",
      alt: "Elderly Bengali man with white beard smiling warmly while holding traditional clay cup of masala chai",
      category: "সংস্কৃতি",
      title: "Traditional Tea Master",
      titleBengali: "ঐতিহ্যবাহী চা মাস্টার",
      description:
        "Our beloved tea master sharing his 40 years of chai-making wisdom.",
      descriptionBengali:
        "আমাদের প্রিয় চা মাস্টার তার ৪০ বছরের চা তৈরির জ্ঞান ভাগ করছেন।",
      author: "Priya Das",
      authorBengali: "প্রিয়া দাস",
      date: "2025-12-18",
      likes: 567,
      shares: 89,
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1657449723990-5499b8cf75f2",
      alt: "Young professional woman in blue blazer working on laptop with cup of chai and notebook in modern cafe setting",
      category: "মুহূর্ত",
      title: "Work & Chai Balance",
      titleBengali: "কাজ এবং চা ভারসাম্য",
      description:
        "Finding productivity in the perfect blend of work and chai.",
      descriptionBengali:
        "কাজ এবং চায়ের নিখুঁত মিশ্রণে উৎপাদনশীলতা খুঁজে পাওয়া।",
      author: "Amit Kumar",
      authorBengali: "অমিত কুমার",
      date: "2025-12-15",
      likes: 189,
      shares: 34,
    },
    {
      id: 4,
      image:
        "https://img.rocket.new/generatedImages/rocket_gen_img_182a4d038-1766521240468.png",
      alt: "Multi-generational Bengali family sitting around wooden table sharing chai and traditional sweets during festival celebration",
      category: "ইভেন্ট",
      title: "Festival Celebration",
      titleBengali: "উৎসব উদযাপন",
      description:
        "Community coming together to celebrate with chai and sweets.",
      descriptionBengali:
        "সম্প্রদায় চা এবং মিষ্টি দিয়ে উদযাপন করতে একসাথে আসছে।",
      author: "Sneha Banerjee",
      authorBengali: "স্নেহা ব্যানার্জী",
      date: "2025-12-12",
      likes: 423,
      shares: 78,
    },
    {
      id: 5,
      image:
        "https://img.rocket.new/generatedImages/rocket_gen_img_1edae3c66-1765129892610.png",
      alt: "Close-up of hands holding steaming cup of masala chai with cinnamon stick and cardamom pods on rustic wooden surface",
      category: "সংস্কৃতি",
      title: "Authentic Masala Chai",
      titleBengali: "খাঁটি মসলা চা",
      description: "The perfect blend of spices creating magic in every cup.",
      descriptionBengali: "মসলার নিখুঁত মিশ্রণ প্রতিটি কাপে জাদু তৈরি করছে।",
      author: "Rohan Gupta",
      authorBengali: "রোহন গুপ্তা",
      date: "2025-12-10",
      likes: 678,
      shares: 123,
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1643373977342-73cfc7cc0c5e",
      alt: "Two young women friends laughing and chatting over chai in bright modern cafe with plants and natural light",
      category: "মুহূর্ত",
      title: "Friendship & Chai",
      titleBengali: "বন্ধুত্ব এবং চা",
      description: "Best conversations happen over a cup of chai.",
      descriptionBengali: "সেরা কথোপকথন এক কাপ চায়ের উপর ঘটে।",
      author: "Ananya Singh",
      authorBengali: "অনন্যা সিং",
      date: "2025-12-08",
      likes: 345,
      shares: 67,
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1646649806497-4cdf1b8877e4",
      alt: "Street vendor in traditional Bengali attire preparing chai in large copper pot with steam rising at dawn",
      category: "সংস্কৃতি",
      title: "Street Chai Culture",
      titleBengali: "রাস্তার চা সংস্কৃতি",
      description:
        "The authentic street chai experience that inspired our journey.",
      descriptionBengali:
        "খাঁটি রাস্তার চা অভিজ্ঞতা যা আমাদের যাত্রাকে অনুপ্রাণিত করেছে।",
      author: "Vikram Mehta",
      authorBengali: "বিক্রম মেহতা",
      date: "2025-12-05",
      likes: 789,
      shares: 145,
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1731458769726-cef60c792665",
      alt: "Business meeting with diverse team members discussing over cups of chai with documents and laptops on conference table",
      category: "ইভেন্ট",
      title: "Corporate Chai Break",
      titleBengali: "কর্পোরেট চা বিরতি",
      description: "Bringing chai culture to modern workplaces.",
      descriptionBengali: "আধুনিক কর্মক্ষেত্রে চা সংস্কৃতি নিয়ে আসা।",
      author: "Neha Kapoor",
      authorBengali: "নেহা কাপুর",
      date: "2025-12-03",
      likes: 234,
      shares: 56,
    },
  ];

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Rajesh Patel",
      nameBengali: "রাজেশ প্যাটেল",
      role: "Regular Customer",
      roleBengali: "নিয়মিত গ্রাহক",
      image:
        "https://img.rocket.new/generatedImages/rocket_gen_img_1b2063027-1763295402790.png",
      alt: "Professional headshot of middle-aged Indian man with glasses and warm smile in business casual attire",
      rating: 5,
      testimonial:
        "The token system is brilliant! No more waiting in queues. The chai tastes exactly like my grandmother used to make.",
      testimonialBengali:
        "টোকেন সিস্টেম দুর্দান্ত! আর লাইনে অপেক্ষা করতে হয় না। চায়ের স্বাদ ঠিক আমার দাদির তৈরি চায়ের মতো।",
      date: "2025-12-22",
    },
    {
      id: 2,
      name: "Meera Desai",
      nameBengali: "মীরা দেশাই",
      role: "Office Worker",
      roleBengali: "অফিস কর্মী",
      image:
        "https://img.rocket.new/generatedImages/rocket_gen_img_1fe9b5695-1763296011297.png",
      alt: "Young Indian woman with long dark hair smiling confidently in professional office environment",
      rating: 5,
      testimonial:
        "Perfect for my morning rush! Order online, pick up with token, and I am never late to work anymore.",
      testimonialBengali:
        "আমার সকালের তাড়াহুড়োর জন্য নিখুঁত! অনলাইনে অর্ডার করুন, টোকেন দিয়ে নিন, এবং আমি আর কখনও কাজে দেরি করি না।",
      date: "2025-12-20",
    },
    {
      id: 3,
      name: "Arjun Malhotra",
      nameBengali: "অর্জুন মালহোত্রা",
      role: "Student",
      roleBengali: "ছাত্র",
      image: "https://images.unsplash.com/photo-1613683746628-a54a60277611",
      alt: "Young male college student with backpack smiling outdoors on campus with books",
      rating: 5,
      testimonial:
        "Best study spot! Great chai, fast service, and the community vibe is amazing.",
      testimonialBengali:
        "সেরা অধ্যয়ন স্থান! দুর্দান্ত চা, দ্রুত সেবা, এবং সম্প্রদায়ের পরিবেশ আশ্চর্যজনক।",
      date: "2025-12-18",
    },
  ];

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
      author: "Chai Token Philosophy",
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
    // In a real app, this would update the backend
    console.log("Liked item:", id);
  };

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 6);
  };

  const handleSubmission = (data: SubmissionData) => {
    // In a real app, this would send data to backend
    console.log("New submission:", data);
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
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-20 px-4">
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
          <p className="font-heading text-xl md:text-2xl text-muted-foreground mb-8">
            Our Chai Stories
          </p>

          <p className="font-bengali text-lg text-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            প্রতিটি কাপ চায়ের সাথে একটি গল্প আছে। আমাদের সম্প্রদায়ের মুহূর্ত,
            স্মৃতি এবং অভিজ্ঞতা দেখুন।
          </p>
          <p className="font-heading text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Every cup of chai has a story. Explore moments, memories, and
            experiences from our community.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => setSubmissionFormOpen(true)}
            className="mt-8 inline-flex items-center space-x-3 px-8 py-4 bg-conversion text-conversion-foreground rounded-xl font-heading font-semibold cultural-transition hover:scale-105 shadow-warm-sm"
          >
            <Icon name="PlusCircleIcon" size={24} />
            <span className="font-bengali text-lg">আপনার গল্প শেয়ার করুন</span>
            <span>Share Your Story</span>
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

          {/* Load More Button */}
          {displayCount < filteredItems.length && (
            <div className="text-center mt-12">
              <button
                onClick={handleLoadMore}
                className="inline-flex items-center space-x-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-heading font-semibold cultural-transition hover:scale-105 shadow-warm-sm"
              >
                <Icon name="ArrowDownCircleIcon" size={24} />
                <span className="font-bengali">আরও দেখুন</span>
                <span>Load More</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Cultural Quotes */}
      <section className="py-16 px-4 bg-gradient-to-br from-muted/30 to-background">
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
            <p className="font-heading text-lg text-muted-foreground">
              Customer Testimonials
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: "UserGroupIcon",
                count: "10,000+",
                label: "সম্প্রদায় সদস্য",
                labelEn: "Community Members",
              },
              {
                icon: "PhotoIcon",
                count: "5,000+",
                label: "শেয়ার করা মুহূর্ত",
                labelEn: "Shared Moments",
              },
              {
                icon: "HeartIcon",
                count: "50,000+",
                label: "পছন্দ",
                labelEn: "Likes",
              },
              {
                icon: "ChatBubbleLeftRightIcon",
                count: "2,000+",
                label: "প্রশংসাপত্র",
                labelEn: "Testimonials",
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
                <p className="font-heading text-xs text-muted-foreground">
                  {stat.labelEn}
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
          <p className="font-heading text-lg text-muted-foreground mb-8">
            Join Our Community on Social Media
          </p>

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

      {/* Modals */}
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
