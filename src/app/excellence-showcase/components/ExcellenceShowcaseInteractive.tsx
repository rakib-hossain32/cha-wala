"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import Icon from "../../../components/ui/AppIcon";
import QualityMetric from "./QualityMetric";
import SupplierCard from "./SupplierCard";
import PreparationStep from "./PreparationStep";
import CertificationBadge from "./CertificationBadge";
import TestimonialCard from "./TestimonialCard";
import IngredientOriginMap from "./IngredientOriginMap";
import FeedbackModal from "../../hero-gateway/components/FeedbackModal";

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
  _id?: string;
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
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
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
          alt: item.nameBengali
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

  const qualityMetrics: QualityMetricData[] = [
    {
      icon: "🌿",
      titleEnglish: "Organic Ingredients",
      titleBengali: "জৈব উপাদান",
      value: "100%",
      description:
        "আমাদের সমস্ত চা পাতা এবং মসলা প্রত্যয়িত জৈব খামার থেকে সংগ্রহ করা হয়",
      descriptionBengali:
        "আমাদের সমস্ত চা পাতা এবং মসলা প্রত্যয়িত জৈব খামার থেকে সংগ্রহ করা হয়",
    },
    {
      icon: "⏱️",
      titleEnglish: "Fresh Preparation",
      titleBengali: "তাজা প্রস্তুতি",
      value: "< 5 মিনিট",
      description: "প্রতিটি কাপ অর্ডারের ৫ মিনিটের মধ্যে তাজা প্রস্তুত করা হয়",
      descriptionBengali:
        "প্রতিটি কাপ অর্ডারের ৫ মিনিটের মধ্যে তাজা প্রস্তুত করা হয়",
    },
    {
      icon: "🏆",
      titleEnglish: "Customer Satisfaction",
      titleBengali: "গ্রাহক সন্তুষ্টি",
      value: "98.5%",
      description: "১০,০০০+ গ্রাহক পর্যালোচনা এবং প্রতিক্রিয়ার উপর ভিত্তি করে",
      descriptionBengali:
        "১০,০০০+ গ্রাহক পর্যালোচনা এবং প্রতিক্রিয়ার উপর ভিত্তি করে",
    },
    {
      icon: "🔬",
      titleEnglish: "Quality Testing",
      titleBengali: "মান পরীক্ষা",
      value: "প্রতিদিন",
      description:
        "দৈনিক মান পরীক্ষা সামঞ্জস্যপূর্ণ স্বাদ এবং নিরাপত্তা মান নিশ্চিত করে",
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
      titleEnglish: "পানি ফুটানো",
      titleBengali: "পানি ফুটানো",
      description:
        "সর্বোত্তম নিষ্কাশনের জন্য বিশুদ্ধ ফিল্টার করা পানি সঠিক ফুটন্ত তাপমাত্রায় আনা হয়",
      descriptionBengali:
        "সর্বোত্তম নিষ্কাশনের জন্য বিশুদ্ধ ফিল্টার করা পানি সঠিক ফুটন্ত তাপমাত্রায় আনা হয়",
      icon: "💧",
      time: "২ মিনিট",
      timeBengali: "২ মিনিট",
    },
    {
      step: 2,
      titleEnglish: "Tea Infusion",
      titleBengali: "চা মিশ্রণ",
      description:
        "সমৃদ্ধ স্বাদ বিকাশের জন্য নিখুঁত সময়ে প্রিমিয়াম চা পাতা যোগ করা হয়",
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
        "খাঁটি স্বাদের জন্য তাজা গুঁড়া মসলা সাবধানে পরিমাপ করে যোগ করা হয়",
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
      name: "খাদ্য নিরাপত্তা উৎকর্ষতা",
      nameBengali: "খাদ্য নিরাপত্তা উৎকর্ষতা",
      issuer: "বাংলাদেশ খাদ্য নিরাপত্তা কর্তৃপক্ষ",
      issuerBengali: "বাংলাদেশ খাদ্য নিরাপত্তা কর্তৃপক্ষ",
      icon: "🛡️",
      year: "2021",
    },
    {
      name: "মান ব্যবস্থাপনা",
      nameBengali: "মান ব্যবস্থাপনা",
      issuer: "আইএসও ৯০०१:२०१৫ প্রত্যয়িত",
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

  const expertTestimonials: TestimonialData[] = [
    {
      name: "Dr. Anish Chowdhury",
      nameBengali: "ডাঃ অনিশ চৌধুরী",
      role: "Nutrition Specialist",
      roleBengali: "পুষ্টি বিশেষজ্ঞ",
      testimonial:
        "The organic sourcing methods used by Cha Wala ensure that every cup is packed with antioxidants while maintaining zero chemical residue. It's a healthy choice for daily consumption.",
      testimonialBengali:
        "চা ওয়ালা-র ব্যবহৃত জৈব সংগ্রহের পদ্ধতি নিশ্চিত করে যে প্রতিটি কাপ অ্যান্টিঅক্সিডেন্টে ভরপুর এবং রাসায়নিক অবশিষ্টাংশ মুক্ত। এটি দৈনন্দিন পানের জন্য একটি স্বাস্থ্যকর পছন্দ।",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
      alt: "Dr. Anish Chowdhury",
      rating: 5,
    },
    {
      name: "Sanjana Ahmed",
      nameBengali: "সানজানা আহমেদ",
      role: "Professional Tea Sommelier",
      roleBengali: "পেশাদার চা বিশেষজ্ঞ",
      testimonial:
        "I am impressed by the precision in their preparation. The timing of infusion and the temperature control perfectly bring out the complex notes of the Sylhet tea leaves.",
      testimonialBengali:
        "তাদের প্রস্তুতির নিখুঁততা দেখে আমি মুগ্ধ। মিশ্রণের সময় এবং তাপমাত্রা নিয়ন্ত্রণ সিলেটের চা পাতার জটিল বৈশিষ্ট্যগুলোকে চমৎকারভাবে ফুটিয়ে তোলে।",
      image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5",
      alt: "Sanjana Ahmed",
      rating: 5,
    },
    {
      name: "Chef Rakibul Hasan",
      nameBengali: "শেফ রাকিবুল হাসান",
      role: "Executive Chef",
      roleBengali: "এক্সিকিউটিভ শেফ",
      testimonial:
        "The spice ratio in their signature chai is a masterpiece. It strikes the perfect balance between the warmth of cardamom and the subtle kick of ginger without overpowering the tea itself.",
      testimonialBengali:
        "তাদের সিগনেচার চায়ে মসলার অনুপাত একটি মাস্টারপিস। এটি চায়ের স্বাদকে ছাপিয়ে না গিয়ে এলাচের উষ্ণতা এবং আদার সূক্ষ্ম স্বাদের মধ্যে নিখুঁত ভারসাম্য তৈরি করে।",
      image: "https://images.unsplash.com/photo-1583394828560-197621cc52de",
      alt: "Chef Rakibul Hasan",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full font-heading text-sm font-semibold mb-6">
              🏆 মান ও উৎকর্ষতা
            </div>
            <h1 className="font-bengali text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              আমাদের মানের প্রতিশ্রুতি
            </h1>
            <p className="font-bengali text-lg text-foreground/80 mb-4 leading-relaxed">
              প্রতিটি কাপ চায়ে আমরা নিশ্চিত করি সর্বোচ্চ মান, খাঁটি স্বাদ এবং
              ঐতিহ্যবাহী প্রস্তুতি পদ্ধতি। আমাদের উৎকর্ষতার যাত্রা শুরু হয়
              সেরা উপাদান নির্বাচন থেকে এবং শেষ হয় আপনার সন্তুষ্টিতে।
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
              className={`px-6 py-3 rounded-lg font-bengali font-semibold cultural-transition ${
                activeTab === "quality"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground hover:bg-muted"
              }`}
            >
              <span className="font-bengali block mb-1">মান প্রত্যয়ন</span>
            </button>
            <button
              onClick={() => setActiveTab("suppliers")}
              className={`px-6 py-3 rounded-lg  font-semibold cultural-transition font-bengali ${
                activeTab === "suppliers"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground hover:bg-muted"
              }`}
            >
              <span className="font-bengali block mb-1">সরবরাহকারী</span>
            </button>
            <button
              onClick={() => setActiveTab("preparation")}
              className={`px-6 py-3 rounded-lg font-semibold cultural-transition font-bengali ${
                activeTab === "preparation"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground hover:bg-muted"
              }`}
            >
              <span className="font-bengali block mb-1">প্রস্তুতি পদ্ধতি</span>
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
      <section className="py-20 bg-gradient-to-b from-card/50 to-background overflow-hidden">
        <div className="container mx-auto px-4 relative">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl invisible md:visible" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-64 h-64 bg-accent/5 rounded-full blur-3xl invisible md:visible" />

          <div className="text-center mb-16 relative">
            <h2 className="font-bengali text-4xl md:text-5xl font-bold text-foreground mb-4">
              বিশেষজ্ঞদের মতামত
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
            <p className="font-bengali text-lg text-muted-foreground max-w-2xl mx-auto">
              খাদ্য ও পুষ্টি খাতের অভিজ্ঞ ব্যক্তিরা আমাদের চায়ের মান সম্পর্কে যা বলেন
            </p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {expertTestimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="group bg-card p-8 rounded-3xl border border-border shadow-warm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bengali text-xl font-bold text-foreground">{testimonial.nameBengali}</h3>
                    <p className="font-bengali text-sm text-primary font-semibold">{testimonial.roleBengali}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="StarIcon" size={16} className="text-yellow-500 fill-yellow-500" />
                  ))}
                </div>

                <p className="font-bengali text-foreground/80 leading-relaxed italic relative">
                  <span className="absolute -top-4 -left-2 text-4xl text-primary/10 font-serif">"</span>
                  {testimonial.testimonialBengali}
                  <span className="absolute -bottom-8 -right-2 text-4xl text-primary/10 font-serif">"</span>
                </p>
              </div>
            ))}
          </div>

          {/* Community Feedback Link */}
          <div className="mt-20 text-center">
            <div className="inline-flex flex-col items-center p-8 rounded-3xl bg-primary/5 border border-primary/10">
              <h3 className="font-bengali text-2xl font-bold text-foreground mb-4">আপনিও আমাদের অংশ হতে চান?</h3>
              <p className="font-bengali text-muted-foreground mb-6">আপনার অভিজ্ঞতা আমাদের সাথে এবং সম্প্রদায়ের সাথে শেয়ার করুন।</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-xl font-bengali font-bold shadow-xl hover:scale-105 hover:bg-primary/90 transition-all"
              >
                <Icon name="ChatBubbleLeftRightIcon" size={24} />
                আপনার মতামত দিন
              </button>
            </div>
          </div>
        </div>
      </section>

      <FeedbackModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchData}
      />

      {/* CTA Section */}
      <section className="py-16 bg-linear-to-br from-primary via-secondary to-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-bengali text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              মানসম্পন্ন চা অভিজ্ঞতা নিন
            </h2>
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
