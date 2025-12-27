"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Icon from "@/components/ui/AppIcon";
import QualityMetric from "./QualityMetric";
import SupplierCard from "./SupplierCard";
import PreparationStep from "./PreparationStep";
import CertificationBadge from "./CertificationBadge";
import TestimonialCard from "./TestimonialCard";
import IngredientOriginMap from "./IngredientOriginMap";

interface QualityMetricData {
  icon: string;
  titleEnglish: string;
  titleBengali: string;
  value: string;
  description: string;
  descriptionBengali: string;
}

interface SupplierData {
  name: string;
  nameBengali: string;
  location: string;
  locationBengali: string;
  specialty: string;
  specialtyBengali: string;
  image: string;
  alt: string;
  partnership: string;
  partnershipBengali: string;
}

interface PreparationStepData {
  step: number;
  titleEnglish: string;
  titleBengali: string;
  description: string;
  descriptionBengali: string;
  icon: string;
  time: string;
  timeBengali: string;
}

interface CertificationData {
  name: string;
  nameBengali: string;
  issuer: string;
  issuerBengali: string;
  icon: string;
  year: string;
}

interface TestimonialData {
  name: string;
  nameBengali: string;
  role: string;
  roleBengali: string;
  testimonial: string;
  testimonialBengali: string;
  image: string;
  alt: string;
  rating: number;
}

interface MapLocationData {
  name: string;
  nameBengali: string;
  lat: number;
  lng: number;
  ingredient: string;
  ingredientBengali: string;
}

export default function ExcellenceShowcaseInteractive() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "quality" | "suppliers" | "preparation"
  >("quality");

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const qualityMetrics: QualityMetricData[] = [
    {
      icon: "🌿",
      titleEnglish: "Organic Ingredients",
      titleBengali: "জৈব উপাদান",
      value: "100%",
      description:
        "All our tea leaves and spices are sourced from certified organic farms",
      descriptionBengali:
        "আমাদের সমস্ত চা পাতা এবং মসলা প্রত্যয়িত জৈব খামার থেকে সংগ্রহ করা হয়",
    },
    {
      icon: "⏱️",
      titleEnglish: "Fresh Preparation",
      titleBengali: "তাজা প্রস্তুতি",
      value: "< 5 মিনিট",
      description: "Every cup is prepared fresh within 5 minutes of ordering",
      descriptionBengali:
        "প্রতিটি কাপ অর্ডারের ৫ মিনিটের মধ্যে তাজা প্রস্তুত করা হয়",
    },
    {
      icon: "🏆",
      titleEnglish: "Customer Satisfaction",
      titleBengali: "গ্রাহক সন্তুষ্টি",
      value: "98.5%",
      description: "Based on over 10,000 customer reviews and feedback",
      descriptionBengali:
        "১০,০০০+ গ্রাহক পর্যালোচনা এবং প্রতিক্রিয়ার উপর ভিত্তি করে",
    },
    {
      icon: "🔬",
      titleEnglish: "Quality Testing",
      titleBengali: "মান পরীক্ষা",
      value: "প্রতিদিন",
      description:
        "Daily quality checks ensure consistent taste and safety standards",
      descriptionBengali:
        "দৈনিক মান পরীক্ষা সামঞ্জস্যপূর্ণ স্বাদ এবং নিরাপত্তা মান নিশ্চিত করে",
    },
  ];

  const suppliers: SupplierData[] = [
    {
      name: "Sylhet Tea Gardens",
      nameBengali: "সিলেট চা বাগান",
      location: "Sylhet Division, Bangladesh",
      locationBengali: "সিলেট বিভাগ, বাংলাদেশ",
      specialty: "Premium Black Tea Leaves",
      specialtyBengali: "প্রিমিয়াম কালো চা পাতা",
      image: "https://images.unsplash.com/photo-1690107645337-afd51cf66da0",
      alt: "Lush green tea plantation on rolling hills in Sylhet with workers harvesting tea leaves",
      partnership: "15+ Years",
      partnershipBengali: "১৫+ বছর",
    },
    {
      name: "Chittagong Spice Collective",
      nameBengali: "চট্টগ্রাম মসলা সমবায়",
      location: "Chittagong, Bangladesh",
      locationBengali: "চট্টগ্রাম, বাংলাদেশ",
      specialty: "Organic Cardamom & Ginger",
      specialtyBengali: "জৈব এলাচ এবং আদা",
      image: "https://images.unsplash.com/photo-1704712125409-8043fec3b709",
      alt: "Colorful array of fresh spices including cardamom pods and ginger roots displayed at market",
      partnership: "10+ Years",
      partnershipBengali: "১০+ বছর",
    },
    {
      name: "Rajshahi Dairy Farms",
      nameBengali: "রাজশাহী দুগ্ধ খামার",
      location: "Rajshahi Division, Bangladesh",
      locationBengali: "রাজশাহী বিভাগ, বাংলাদেশ",
      specialty: "Fresh Organic Milk",
      specialtyBengali: "তাজা জৈব দুধ",
      image: "https://images.unsplash.com/photo-1635436338433-89747d0ca0ef",
      alt: "Fresh milk being poured into glass bottle at organic dairy farm with cows grazing in background",
      partnership: "8+ Years",
      partnershipBengali: "৮+ বছর",
    },
  ];

  const preparationSteps: PreparationStepData[] = [
    {
      step: 1,
      titleEnglish: "Water Boiling",
      titleBengali: "পানি ফুটানো",
      description:
        "Pure filtered water is brought to precise boiling temperature for optimal extraction",
      descriptionBengali:
        "সর্বোত্তম নিষ্কাশনের জন্য বিশুদ্ধ ফিল্টার করা পানি সঠিক ফুটন্ত তাপমাত্রায় আনা হয়",
      icon: "💧",
      time: "2 minutes",
      timeBengali: "২ মিনিট",
    },
    {
      step: 2,
      titleEnglish: "Tea Infusion",
      titleBengali: "চা মিশ্রণ",
      description:
        "Premium tea leaves are added with perfect timing for rich flavor development",
      descriptionBengali:
        "সমৃদ্ধ স্বাদ বিকাশের জন্য নিখুঁত সময়ে প্রিমিয়াম চা পাতা যোগ করা হয়",
      icon: "🍃",
      time: "3 minutes",
      timeBengali: "৩ মিনিট",
    },
    {
      step: 3,
      titleEnglish: "Spice Addition",
      titleBengali: "মসলা যোগ",
      description:
        "Fresh ground spices are carefully measured and added for authentic taste",
      descriptionBengali:
        "খাঁটি স্বাদের জন্য তাজা গুঁড়া মসলা সাবধানে পরিমাপ করে যোগ করা হয়",
      icon: "🌶️",
      time: "1 minute",
      timeBengali: "১ মিনিট",
    },
    {
      step: 4,
      titleEnglish: "Milk Integration",
      titleBengali: "দুধ মিশ্রণ",
      description:
        "Fresh organic milk is blended to create the perfect creamy texture",
      descriptionBengali:
        "নিখুঁত ক্রিমি টেক্সচার তৈরি করতে তাজা জৈব দুধ মিশ্রিত করা হয়",
      icon: "🥛",
      time: "2 minutes",
      timeBengali: "২ মিনিট",
    },
    {
      step: 5,
      titleEnglish: "Final Straining",
      titleBengali: "চূড়ান্ত ছাঁকনি",
      description:
        "Tea is carefully strained and served at optimal temperature for enjoyment",
      descriptionBengali:
        "চা সাবধানে ছেঁকে নেওয়া হয় এবং উপভোগের জন্য সর্বোত্তম তাপমাত্রায় পরিবেশন করা হয়",
      icon: "☕",
      time: "1 minute",
      timeBengali: "১ মিনিট",
    },
  ];

  const certifications: CertificationData[] = [
    {
      name: "Organic Certified",
      nameBengali: "জৈব প্রত্যয়িত",
      issuer: "Bangladesh Organic Products Manufacturers Association",
      issuerBengali: "বাংলাদেশ জৈব পণ্য প্রস্তুতকারক সমিতি",
      icon: "🌱",
      year: "2020",
    },
    {
      name: "Food Safety Excellence",
      nameBengali: "খাদ্য নিরাপত্তা উৎকর্ষতা",
      issuer: "Bangladesh Food Safety Authority",
      issuerBengali: "বাংলাদেশ খাদ্য নিরাপত্তা কর্তৃপক্ষ",
      icon: "🛡️",
      year: "2021",
    },
    {
      name: "Quality Management",
      nameBengali: "মান ব্যবস্থাপনা",
      issuer: "ISO 9001:2015 Certified",
      issuerBengali: "আইএসও ৯০০১:২০১৫ প্রত্যয়িত",
      icon: "⭐",
      year: "2022",
    },
    {
      name: "Sustainable Sourcing",
      nameBengali: "টেকসই সংগ্রহ",
      issuer: "Fair Trade Bangladesh",
      issuerBengali: "ফেয়ার ট্রেড বাংলাদেশ",
      icon: "♻️",
      year: "2023",
    },
  ];

  const testimonials: TestimonialData[] = [
    {
      name: "Rahul Sharma",
      nameBengali: "রাহুল শর্মা",
      role: "Tea Consultant",
      roleBengali: "চা পরামর্শদাতা",
      testimonial:
        "চাই টোকেনের চা প্রস্তুতির মান এবং উপাদানের গুণমান অসাধারণ। প্রতিটি কাপে খাঁটি বাংলার স্বাদ পাওয়া যায়।",
      testimonialBengali:
        "চাই টোকেনের চা প্রস্তুতির মান এবং উপাদানের গুণমান অসাধারণ। প্রতিটি কাপে খাঁটি বাংলার স্বাদ পাওয়া যায়।",
      image:
        "https://img.rocket.new/generatedImages/rocket_gen_img_1c1f09ffa-1763296911571.png",
      alt: "Professional South Asian man in his 40s with short black hair wearing blue shirt smiling at camera",
      rating: 5,
    },
    {
      name: "Priya Das",
      nameBengali: "প্রিয়া দাস",
      role: "Food Blogger",
      roleBengali: "খাদ্য ব্লগার",
      testimonial:
        "জৈব উপাদান এবং ঐতিহ্যবাহী প্রস্তুতি পদ্ধতির সমন্বয় চাই টোকেনকে অনন্য করে তুলেছে। সত্যিই প্রশংসনীয়!",
      testimonialBengali:
        "জৈব উপাদান এবং ঐতিহ্যবাহী প্রস্তুতি পদ্ধতির সমন্বয় চাই টোকেনকে অনন্য করে তুলেছে। সত্যিই প্রশংসনীয়!",
      image: "https://images.unsplash.com/photo-1652396944757-ad27b62b33f6",
      alt: "Young Indian woman with long dark hair in casual attire smiling warmly at camera outdoors",
      rating: 5,
    },
    {
      name: "Ahmed Khan",
      nameBengali: "আহমেদ খান",
      role: "Regular Customer",
      roleBengali: "নিয়মিত গ্রাহক",
      testimonial:
        "প্রতিদিন সকালে চাই টোকেনের চা ছাড়া আমার দিন শুরু হয় না। স্বাদ এবং মান সবসময় একই থাকে।",
      testimonialBengali:
        "প্রতিদিন সকালে চাই টোকেনের চা ছাড়া আমার দিন শুরু হয় না। স্বাদ এবং মান সবসময় একই থাকে।",
      image:
        "https://img.rocket.new/generatedImages/rocket_gen_img_1de396b82-1763296323320.png",
      alt: "Middle-aged Bangladeshi man with beard wearing traditional kurta smiling confidently",
      rating: 5,
    },
  ];

  const mapLocations: MapLocationData[] = [
    {
      name: "Sylhet Tea Gardens",
      nameBengali: "সিলেট চা বাগান",
      lat: 24.8949,
      lng: 91.8687,
      ingredient: "Premium Tea Leaves",
      ingredientBengali: "প্রিমিয়াম চা পাতা",
    },
    {
      name: "Chittagong Spice Markets",
      nameBengali: "চট্টগ্রাম মসলা বাজার",
      lat: 22.3569,
      lng: 91.7832,
      ingredient: "Fresh Spices",
      ingredientBengali: "তাজা মসলা",
    },
    {
      name: "Rajshahi Dairy Farms",
      nameBengali: "রাজশাহী দুগ্ধ খামার",
      lat: 24.3745,
      lng: 88.6042,
      ingredient: "Organic Milk",
      ingredientBengali: "জৈব দুধ",
    },
  ];

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="h-16 bg-card animate-pulse" />
        <div className="container mx-auto px-4 py-16">
          <div className="space-y-8">
            <div className="h-32 bg-card rounded-xl animate-pulse" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-48 bg-card rounded-xl animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full font-heading text-sm font-semibold mb-6">
              🏆 মান ও উৎকর্ষতা | Quality & Excellence
            </div>
            <h1 className="font-bengali text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              আমাদের মানের প্রতিশ্রুতি
            </h1>
            <p className="font-heading text-xl md:text-2xl text-muted-foreground mb-6">
              Our Commitment to Quality
            </p>
            <p className="font-bengali text-lg text-foreground/80 mb-4 leading-relaxed">
              প্রতিটি কাপ চায়ে আমরা নিশ্চিত করি সর্বোচ্চ মান, খাঁটি স্বাদ এবং
              ঐতিহ্যবাহী প্রস্তুতি পদ্ধতি। \ আমাদের উৎকর্ষতার যাত্রা শুরু হয়
              সেরা উপাদান নির্বাচন থেকে এবং শেষ হয় আপনার সন্তুষ্টিতে।
            </p>
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              In every cup of tea, we ensure the highest quality, authentic
              taste, and traditional preparation methods. \ Our journey of
              excellence begins with selecting the finest ingredients and ends
              with your satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Quality Metrics */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-bengali text-3xl md:text-4xl font-bold text-foreground mb-3">
              মানের সূচক
            </h2>
            <p className="font-heading text-lg text-muted-foreground">
              Quality Indicators
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityMetrics.map((metric, index) => (
              <QualityMetric key={index} {...metric} />
            ))}
          </div>
        </div>
      </section>

      {/* Tabbed Content Section */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab("quality")}
              className={`px-6 py-3 rounded-lg font-heading font-semibold cultural-transition ${
                activeTab === "quality"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground hover:bg-muted"
              }`}
            >
              <span className="font-bengali block mb-1">মান প্রত্যয়ন</span>
              <span className="text-sm">Quality Certifications</span>
            </button>
            <button
              onClick={() => setActiveTab("suppliers")}
              className={`px-6 py-3 rounded-lg font-heading font-semibold cultural-transition ${
                activeTab === "suppliers"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground hover:bg-muted"
              }`}
            >
              <span className="font-bengali block mb-1">সরবরাহকারী</span>
              <span className="text-sm">Our Suppliers</span>
            </button>
            <button
              onClick={() => setActiveTab("preparation")}
              className={`px-6 py-3 rounded-lg font-heading font-semibold cultural-transition ${
                activeTab === "preparation"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground hover:bg-muted"
              }`}
            >
              <span className="font-bengali block mb-1">প্রস্তুতি পদ্ধতি</span>
              <span className="text-sm">Preparation Method</span>
            </button>
          </div>

          {activeTab === "quality" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <CertificationBadge key={index} {...cert} />
              ))}
            </div>
          )}

          {activeTab === "suppliers" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suppliers.map((supplier, index) => (
                <SupplierCard key={index} {...supplier} />
              ))}
            </div>
          )}

          {activeTab === "preparation" && (
            <div className="max-w-4xl mx-auto space-y-6">
              {preparationSteps.map((step) => (
                <PreparationStep key={step.step} {...step} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Ingredient Origin Map */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <IngredientOriginMap locations={mapLocations} />
        </div>
      </section>

      {/* Expert Testimonials */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-bengali text-3xl md:text-4xl font-bold text-foreground mb-3">
              বিশেষজ্ঞদের মতামত
            </h2>
            <p className="font-heading text-lg text-muted-foreground">
              Expert Testimonials
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary via-secondary to-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-bengali text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              মানসম্পন্ন চা অভিজ্ঞতা নিন
            </h2>
            <p className="font-heading text-xl text-primary-foreground/90 mb-8">
              Experience Quality Tea Today
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/interactive-menu-hub"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-background text-foreground rounded-lg font-heading font-semibold cultural-transition hover:scale-105 shadow-warm"
              >
                <Icon name="ClipboardDocumentListIcon" size={24} />
                <span className="font-bengali">মেনু দেখুন</span>
              </Link>
              <Link
                href="/order-fulfillment-center"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-conversion text-conversion-foreground rounded-lg font-heading font-semibold cultural-transition hover:scale-105 shadow-warm"
              >
                <Icon name="ShoppingCartIcon" size={24} />
                <span className="font-bengali">অর্ডার করুন</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
