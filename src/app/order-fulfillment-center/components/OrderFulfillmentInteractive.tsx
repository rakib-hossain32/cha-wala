"use client";

import { useState, useEffect } from "react";
import OrderSummaryCard from "./OrderSummaryCard";
import TokenDisplay from "./TokenDisplay";
import ContactForm from "./ContactForm";
import LocationInfo from "./LocationInfo";
import OpeningHours from "./OpeningHours";
import SocialConnect from "./SocialConnect";
import WhatsAppConnect from "./WhatsAppConnect";
import OrderInstructions from "./OrderInstructions";

interface OrderItem {
  id: number;
  name: string;
  nameBengali: string;
  quantity: number;
  price: number;
}

interface DaySchedule {
  day: string;
  dayBengali: string;
  hours: string;
  isToday: boolean;
}

interface SocialLink {
  name: string;
  nameBengali: string;
  icon: string;
  url: string;
  color: string;
}

interface Instruction {
  step: number;
  title: string;
  titleBengali: string;
  description: string;
  descriptionBengali: string;
  icon: string;
}

export default function OrderFulfillmentInteractive() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentToken, setCurrentToken] = useState("");

  useEffect(() => {
    setIsHydrated(true);

    if (typeof window !== "undefined") {
      const savedOrder = localStorage.getItem("chaiTokenOrder");
      if (savedOrder) {
        const orderData = JSON.parse(savedOrder);
        const tokenNum = `CT${new Date().getTime().toString().slice(-6)}`;
        setCurrentToken(tokenNum);
      }
    }
  }, []);

  const mockOrderItems: OrderItem[] = [
    {
      id: 1,
      name: "Classic Masala Chai",
      nameBengali: "ক্লাসিক মসলা চা",
      quantity: 2,
      price: 35,
    },
    {
      id: 2,
      name: "Ginger Tea",
      nameBengali: "আদা চা",
      quantity: 1,
      price: 30,
    },
    {
      id: 3,
      name: "Cardamom Tea",
      nameBengali: "এলাচ চা",
      quantity: 1,
      price: 40,
    },
  ];

  const totalAmount = mockOrderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const schedule: DaySchedule[] = [
    {
      day: "Saturday",
      dayBengali: "শনিবার",
      hours: "7:00 AM - 10:00 PM",
      isToday: false,
    },
    {
      day: "Sunday",
      dayBengali: "রবিবার",
      hours: "7:00 AM - 10:00 PM",
      isToday: false,
    },
    {
      day: "Monday",
      dayBengali: "সোমবার",
      hours: "7:00 AM - 10:00 PM",
      isToday: true,
    },
    {
      day: "Tuesday",
      dayBengali: "মঙ্গলবার",
      hours: "7:00 AM - 10:00 PM",
      isToday: false,
    },
    {
      day: "Wednesday",
      dayBengali: "বুধবার",
      hours: "7:00 AM - 10:00 PM",
      isToday: false,
    },
    {
      day: "Thursday",
      dayBengali: "বৃহস্পতিবার",
      hours: "7:00 AM - 10:00 PM",
      isToday: false,
    },
    {
      day: "Friday",
      dayBengali: "শুক্রবার",
      hours: "7:00 AM - 11:00 PM",
      isToday: false,
    },
  ];

  const socialLinks: SocialLink[] = [
    {
      name: "Facebook",
      nameBengali: "ফেসবুক",
      icon: "UserGroupIcon",
      url: "https://facebook.com/chaitoken",
      color: "text-blue-600",
    },
    {
      name: "Instagram",
      nameBengali: "ইনস্টাগ্রাম",
      icon: "CameraIcon",
      url: "https://instagram.com/chaitoken",
      color: "text-pink-600",
    },
    {
      name: "Twitter",
      nameBengali: "টুইটার",
      icon: "ChatBubbleLeftIcon",
      url: "https://twitter.com/chaitoken",
      color: "text-blue-400",
    },
    {
      name: "YouTube",
      nameBengali: "ইউটিউব",
      icon: "PlayCircleIcon",
      url: "https://youtube.com/chaitoken",
      color: "text-red-600",
    },
  ];

  const instructions: Instruction[] = [
    {
      step: 1,
      title: "Browse Menu",
      titleBengali: "মেনু দেখুন",
      description: "Explore our authentic tea collection",
      descriptionBengali:
        "আমাদের খাঁটি চা সংগ্রহ দেখুন এবং আপনার পছন্দের চা নির্বাচন করুন",
      icon: "ClipboardDocumentListIcon",
    },
    {
      step: 2,
      title: "Place Order",
      titleBengali: "অর্ডার করুন",
      description: "Add items to cart and confirm",
      descriptionBengali: "কার্টে আইটেম যোগ করুন এবং আপনার অর্ডার নিশ্চিত করুন",
      icon: "ShoppingCartIcon",
    },
    {
      step: 3,
      title: "Get Token",
      titleBengali: "টোকেন পান",
      description: "Receive your unique token number",
      descriptionBengali: "আপনার অনন্য টোকেন নম্বর পান এবং সংরক্ষণ করুন",
      icon: "TicketIcon",
    },
    {
      step: 4,
      title: "Pick Up",
      titleBengali: "সংগ্রহ করুন",
      description: "Collect your order without waiting",
      descriptionBengali:
        "অপেক্ষা ছাড়াই আপনার অর্ডার সংগ্রহ করুন এবং উপভোগ করুন",
      icon: "CheckCircleIcon",
    },
  ];

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="w-full px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="h-64 bg-muted rounded-lg animate-pulse mb-8"></div>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="h-96 bg-muted rounded-lg animate-pulse"></div>
              <div className="h-96 bg-muted rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="w-full px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bengali font-bold text-primary mb-4">
              অর্ডার সম্পূর্ণ কেন্দ্র
            </h1>
            <p className="text-xl font-heading text-muted-foreground mb-2">
              Order Fulfillment Center
            </p>
            <p className="text-foreground max-w-2xl mx-auto">
              আপনার অর্ডার সম্পূর্ণ করুন এবং আমাদের সাথে যোগাযোগ করুন। আমরা
              আপনার সেবায় সর্বদা প্রস্তুত।
            </p>
          </div>

          {/* Token Display Section */}
          {currentToken && (
            <div className="mb-12">
              <TokenDisplay
                tokenNumber={currentToken}
                estimatedTime="10-15 মিনিট / 10-15 minutes"
              />
            </div>
          )}

          {/* Order Summary & Contact Form */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <OrderSummaryCard
              items={mockOrderItems}
              totalAmount={totalAmount}
            />
            <ContactForm />
          </div>

          {/* WhatsApp Connect */}
          <div className="mb-12">
            <WhatsAppConnect
              phoneNumber="8801712345678"
              message="হ্যালো! আমি চাই টোকেন থেকে অর্ডার করতে চাই। / Hello! I want to order from Chai Token."
            />
          </div>

          {/* Order Instructions */}
          <div className="mb-12">
            <OrderInstructions instructions={instructions} />
          </div>

          {/* Location & Hours */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <LocationInfo
              address="123 Tea Street, Dhanmondi, Dhaka-1205, Bangladesh"
              addressBengali="১২৩ চা স্ট্রিট, ধানমন্ডি, ঢাকা-১২০৫, বাংলাদেশ"
              phone="+880 1712-345678"
              email="hello@chaitoken.com"
              latitude={23.7461}
              longitude={90.3742}
            />
            <OpeningHours schedule={schedule} />
          </div>

          {/* Social Connect */}
          <div>
            <SocialConnect links={socialLinks} />
          </div>
        </div>
      </div>
    </div>
  );
}
