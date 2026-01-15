"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import Icon from "../../../components/ui/AppIcon";
import HeroSection from "./HeroSection";
import TimelineItem from "./TimelineItem";
import CulturalValueCard from "./CulturalValueCard";
import TestimonialCard from "./TestimonialCard";
import PreparationStep from "./PreparationStep";
import FeedbackModal from "../../hero-gateway/components/FeedbackModal";

interface TimelineEvent {
  year: string;
  yearBengali: string;
  title: string;
  titleBengali: string;
  description: string;
  descriptionBengali: string;
  image: string;
  imageAlt: string;
}

interface CulturalValue {
  icon: string;
  title: string;
  titleBengali: string;
  description: string;
  descriptionBengali: string;
}

interface Testimonial {
  _id?: string;
  name: string;
  nameBengali: string;
  role: string;
  roleBengali: string;
  testimonial: string;
  testimonialBengali: string;
  image: string;
  imageAlt: string;
  rating: number;
}

interface PreparationStepData {
  icon: string;
  title: string;
  titleBengali: string;
  description: string;
  descriptionBengali: string;
}

const HeritageInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeTab, setActiveTab] = useState<"timeline" | "preparation">(
    "timeline"
  );
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);

  const fetchData = async () => {
    try {
      setLoadingTestimonials(true);
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      if (Array.isArray(data)) {
        setTestimonials(data.map(item => ({
          ...item,
          testimonial: item.testimonial || item.quoteEnglish || "",
          testimonialBengali: item.testimonialBengali || item.quoteBengali || "",
          imageAlt: item.nameBengali
        })));
      }
    } catch (err) {
      console.error("Failed to fetch testimonials", err);
    } finally {
      setLoadingTestimonials(false);
    }
  };

  useEffect(() => {
    setIsHydrated(true);
    fetchData();
  }, []);

  const heroData = {
    title: "আমাদের ঐতিহ্যের গল্প",
    titleBengali: "আমাদের ঐতিহ্যের গল্প",
    subtitle: "যেখানে প্রতিটি কাপে ঐতিহ্য এবং উদ্ভাবন মিলিত হয়",
    subtitleBengali: "যেখানে প্রতিটি কাপে ঐতিহ্য এবং উদ্ভাবন মিলিত হয়",
    heroImage:
      "https://img.rocket.new/generatedImages/rocket_gen_img_1edae3c66-1765129892610.png",
    heroImageAlt:
      "Traditional Bengali tea preparation with clay cups and steaming kettle on wooden table",
  };

  const timelineEvents: TimelineEvent[] = [
    {
      year: "1950s",
      yearBengali: "১৯৫০ এর দশক",
      title: "The Beginning",
      titleBengali: "শুরুর গল্প",
      description:
        "Tea culture took root in Bengali households, becoming an integral part of daily life and social gatherings. The tradition of 'adda' over chai began to flourish.",
      descriptionBengali:
        "চা সংস্কৃতি বাঙালি পরিবারে শিকড় গেড়ে বসে, দৈনন্দিন জীবন এবং সামাজিক সমাবেশের একটি অবিচ্ছেদ্য অংশ হয়ে ওঠে। চায়ের উপর 'আড্ডা' এর ঐতিহ্য বিকশিত হতে শুরু করে।",
      image: "https://images.unsplash.com/photo-1670222072132-a25a7c5a4924",
      imageAlt:
        "Vintage black and white photo of elderly Bengali man preparing tea in traditional clay pot",
    },
    {
      year: "1980s",
      yearBengali: "১৯৮০ এর দশক",
      title: "Street Tea Culture",
      titleBengali: "রাস্তার চা সংস্কৃতি",
      description:
        "Tea stalls became community hubs where people from all walks of life gathered to share stories, discuss politics, and build connections over steaming cups of chai.",
      descriptionBengali:
        "চায়ের দোকান সম্প্রদায়ের কেন্দ্র হয়ে ওঠে যেখানে সব শ্রেণীর মানুষ গল্প শেয়ার করতে, রাজনীতি নিয়ে আলোচনা করতে এবং গরম চায়ের কাপে সম্পর্ক তৈরি করতে জড়ো হত।",
      image: "https://images.unsplash.com/photo-1589552525378-21bde937c6d3",
      imageAlt:
        "Bustling street tea stall with vendor serving chai to diverse group of customers",
    },
    {
      year: "2000s",
      yearBengali: "২০০০ এর দশক",
      title: "মানের বিপ্লব",
      titleBengali: "মানের বিপ্লব",
      description:
        "প্রিমিয়াম উপাদান এবং খাঁটি প্রস্তুতি পদ্ধতিতে মনোনিবেশ করা হয়। আধুনিক মান মেনে চলার সাথে সাথে ঐতিহ্যবাহী রেসিপি সংরক্ষিত হয়।",
      descriptionBengali:
        "প্রিমিয়াম উপাদান এবং খাঁটি প্রস্তুতি পদ্ধতিতে মনোনিবেশ করা হয়। আধুনিক মান মেনে চলার সাথে সাথে ঐতিহ্যবাহী রেসিপি সংরক্ষিত হয়।",
      image:
        "https://img.rocket.new/generatedImages/rocket_gen_img_1dd2c845b-1765202507534.png",
      imageAlt:
        "Close-up of premium tea leaves being measured with traditional brass scale",
    },
    {
      year: "2025",
      yearBengali: "২০২৫",
      title: "ডিজিটাল উদ্ভাবন",
      titleBengali: "ডিজিটাল উদ্ভাবন",
      description:
        "চা ওয়ালা জন্ম নেয় - শতাব্দী প্রাচীন চা ঐতিহ্যকে আধুনিক প্রযুক্তির সাথে একীভূত করে। টোকেন-ভিত্তিক অর্ডারিং অপেক্ষার সময় দূর করে খাঁটি চা অভিজ্ঞতা সংরক্ষণ করে।",
      descriptionBengali:
        "চা ওয়ালা জন্ম নেয় - শতাব্দী প্রাচীন চা ঐতিহ্যকে আধুনিক প্রযুক্তির সাথে একীভূত করে। টোকেন-ভিত্তিক অর্ডারিং অপেক্ষার সময় দূর করে খাঁটি চা অভিজ্ঞতা সংরক্ষণ করে।",
      image:
        "https://img.rocket.new/generatedImages/rocket_gen_img_14b2bf197-1766490814463.png",
      imageAlt:
        "Modern digital ordering system displaying traditional tea menu on tablet screen",
    },
  ];

  const culturalValues: CulturalValue[] = [
    {
      icon: "HeartIcon",
      title: "খাঁটিত্ব",
      titleBengali: "খাঁটিত্ব",
      description:
        "প্রতিটি কাপ প্রজন্মের মধ্য দিয়ে চলে আসা ঐতিহ্যবাহী বাঙালি চা তৈরির পদ্ধতিকে সম্মান করে।",
      descriptionBengali:
        "প্রতিটি কাপ প্রজন্মের মধ্য দিয়ে চলে আসা ঐতিহ্যবাহী বাঙালি চা তৈরির পদ্ধতিকে সম্মান করে।",
    },
    {
      icon: "UserGroupIcon",
      title: "Community",
      titleBengali: "সম্প্রদায়",
      description:
        "চা মানুষকে একসাথে নিয়ে আসে। আমরা 'আড্ডা' এর চেতনা সংরক্ষণ করি - চায়ের উপর অর্থপূর্ণ কথোপকথন।",
      descriptionBengali:
        "চা মানুষকে একসাথে নিয়ে আসে। আমরা 'আড্ডা' এর চেতনা সংরক্ষণ করি - চায়ের উপর অর্থপূর্ণ কথোপকথন।",
    },
    {
      icon: "SparklesIcon",
      title: "মান",
      titleBengali: "মান",
      description:
        "বিশ্বস্ত সরবরাহকারীদের থেকে প্রিমিয়াম উপাদান প্রতিটি চায়ে ধারাবাহিক উৎকর্ষতা নিশ্চিত করে।",
      descriptionBengali:
        "বিশ্বস্ত সরবরাহকারীদের থেকে প্রিমিয়াম উপাদান প্রতিটি চায়ে ধারাবাহিক উৎকর্ষতা নিশ্চিত করে।",
    },
    {
      icon: "BoltIcon",
      title: "উদ্ভাবন",
      titleBengali: "উদ্ভাবন",
      description:
        "আধুনিক প্রযুক্তি ঐতিহ্যবাহী স্বাদ এবং সাংস্কৃতিক মূল্যবোধের সাথে আপস না করে সেবা বৃদ্ধি করে।",
      descriptionBengali:
        "আধুনিক প্রযুক্তি ঐতিহ্যবাহী স্বাদ এবং সাংস্কৃতিক মূল্যবোধের সাথে আপস না করে সেবা বৃদ্ধি করে।",
    },
  ];

  const preparationSteps: PreparationStepData[] = [
    {
      icon: "BeakerIcon",
      title: "প্রিমিয়াম নির্বাচন",
      titleBengali: "প্রিমিয়াম নির্বাচন",
      description:
        "আমরা বিশ্বস্ত সরবরাহকারীদের থেকে সেরা আসাম চা পাতা এবং খাঁটি মসলা সংগ্রহ করি।",
      descriptionBengali:
        "আমরা বিশ্বস্ত সরবরাহকারীদের থেকে সেরা আসাম চা পাতা এবং খাঁটি মসলা সংগ্রহ করি।",
    },
    {
      icon: "FireIcon",
      title: "ঐতিহ্যবাহী ফুটানো",
      titleBengali: "ঐতিহ্যবাহী ফুটানো",
      description:
        "Tea is boiled with milk and spices using time-honored methods for perfect infusion.",
      descriptionBengali:
        "নিখুঁত মিশ্রণের জন্য সময়-সম্মানিত পদ্ধতি ব্যবহার করে দুধ এবং মসলা দিয়ে চা ফোটানো হয়।",
    },
    {
      icon: "AdjustmentsHorizontalIcon",
      title: "নিখুঁত ভারসাম্য",
      titleBengali: "নিখুঁত ভারসাম্য",
      description:
        "চিনি এবং মসলা ভারসাম্যপূর্ণ করা হয় চা ওয়ালা স্বাক্ষর স্বাদ প্রোফাইল তৈরি করতে।",
      descriptionBengali:
        "চিনি এবং মসলা ভারসাম্যপূর্ণ করা হয় চা ওয়ালা স্বাক্ষর স্বাদ প্রোফাইল তৈরি করতে।",
    },
    {
      icon: "CheckBadgeIcon",
      title: "মান পরীক্ষা",
      titleBengali: "মান পরীক্ষা",
      description:
        "পরিবেশনের আগে প্রতিটি ব্যাচ ধারাবাহিকতা, তাপমাত্রা এবং খাঁটি স্বাদের জন্য পরীক্ষা করা হয়।",
      descriptionBengali:
        "পরিবেশনের আগে প্রতিটি ব্যাচ ধারাবাহিকতা, তাপমাত্রা এবং খাঁটি স্বাদের জন্য পরীক্ষা করা হয়।",
    },
  ];

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="h-16"></div>
        <div className="animate-pulse space-y-8 p-8">
          <div className="h-96 bg-muted rounded-2xl"></div>
          <div className="h-64 bg-muted rounded-2xl"></div>
          <div className="h-64 bg-muted rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection {...heroData} />

      {/* Cultural Values Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold font-bengali text-foreground">
              আমাদের মূল্যবোধ
            </h2>
            <p className="text-lg font-bengali text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              যে নীতিগুলি আমাদের প্রতিটি কাপ চায়ের মধ্যে প্রতিফলিত হয়
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {culturalValues.map((value, index) => (
              <CulturalValueCard key={index} {...value} />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Tabs Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold font-bengali text-foreground mb-4">
              আমাদের যাত্রা
            </h2>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-card border-2 border-border rounded-xl p-2 shadow-warm">
              <button
                onClick={() => setActiveTab("timeline")}
                className={`px-8 py-4 rounded-lg font-bengali font-semibold cultural-transition ${
                  activeTab === "timeline"
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <span className="block text-lg">সময়রেখা</span>
              </button>
              <button
                onClick={() => setActiveTab("preparation")}
                className={`px-8 py-4 rounded-lg font-bengali font-semibold cultural-transition ${
                  activeTab === "preparation"
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <span className="block text-lg">প্রস্তুতি</span>
              </button>
            </div>
          </div>

          {/* Timeline Content */}
          {activeTab === "timeline" && (
            <div className="space-y-20">
              {timelineEvents.map((event, index) => (
                <TimelineItem key={index} {...event} isLeft={index % 2 === 0} />
              ))}
            </div>
          )}

          {/* Preparation Content */}
          {activeTab === "preparation" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {preparationSteps.map((step, index) => (
                <PreparationStep key={index} stepNumber={index + 1} {...step} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold font-bengali text-foreground">
              গ্রাহকদের কণ্ঠস্বর
            </h2>
            <p className="text-lg font-bengali text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6">
              আমাদের সম্প্রদায়ের সদস্যরা কী বলেন
            </p>
            <button
               onClick={() => setIsModalOpen(true)}
               className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bengali font-bold shadow-lg hover:scale-105 transition-all"
            >
              <Icon name="ChatBubbleLeftRightIcon" size={20} />
              আপনার মতামত দিন
            </button>
          </div>

          {loadingTestimonials ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[1, 2, 3].map(i => (
                 <div key={i} className="h-64 bg-card animate-pulse rounded-2xl border border-border/50"></div>
               ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={testimonial._id || index} {...testimonial} />
              ))}
            </div>
          )}
        </div>
      </section>

      <FeedbackModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchData}
      />

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold font-bengali text-foreground">
              আমাদের ঐতিহ্যের অংশ হন
            </h2>
            <p className="text-lg font-bengali text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              প্রতিটি কাপ একটি গল্প বলে। আপনার গল্প আজ শুরু করুন।
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/interactive-menu-hub"
              className="flex items-center space-x-3 px-8 py-4 bg-conversion text-conversion-foreground rounded-xl font-heading font-semibold cultural-transition hover:scale-105 shadow-warm"
            >
              <Icon name="ShoppingCartIcon" size={24} />
              <span className="font-bengali text-lg">মেনু দেখুন</span>
            </Link>

            <Link
              href="/community-gallery"
              className="flex items-center space-x-3 px-8 py-4 bg-secondary text-secondary-foreground rounded-xl font-heading font-semibold cultural-transition hover:scale-105 shadow-warm"
            >
              <Icon name="PhotoIcon" size={24} />
              <span className="font-bengali text-lg">গ্যালারি</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeritageInteractive;
