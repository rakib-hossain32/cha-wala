"use client";

import { useState, useEffect } from "react";
import OrderSummaryCard from "./OrderSummaryCard";
import TokenDisplay from "./TokenDisplay";
import LocationInfo from "./LocationInfo";
import OpeningHours from "./OpeningHours";
import SocialConnect from "./SocialConnect";
import WhatsAppConnect from "./WhatsAppConnect";
import OrderInstructions from "./OrderInstructions";
import CheckoutForm from "./CheckoutForm";

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

interface CartItem {
  id: number | string;
  name: string;
  nameBengali: string;
  price: number;
  quantity: number;
  image: string;
}

export default function OrderFulfillmentInteractive() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentToken, setCurrentToken] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setIsHydrated(true);
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("chaOwalaCart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    }
  }, []);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [lastOrder, setLastOrder] = useState<{
    items: CartItem[];
    total: number;
    paymentMethod: string;
    customerName: string;
  } | null>(null);

  const handleOrderSuccess = (token: string, details: { paymentMethod: string; customerName: string }) => {
    setLastOrder({
        items: [...cartItems],
        total: totalAmount,
        paymentMethod: details.paymentMethod,
        customerName: details.customerName
    });
    setCurrentToken(token);
    setCartItems([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      url: "https://facebook.com/chaowala",
      color: "text-blue-600",
    },
    {
      name: "Instagram",
      nameBengali: "ইনস্টাগ্রাম",
      icon: "CameraIcon",
      url: "https://instagram.com/chaowala",
      color: "text-pink-600",
    },
    {
      name: "Twitter",
      nameBengali: "টুইটার",
      icon: "ChatBubbleLeftIcon",
      url: "https://twitter.com/chaowala",
      color: "text-blue-400",
    },
    {
      name: "YouTube",
      nameBengali: "ইউটিউব",
      icon: "PlayCircleIcon",
      url: "https://youtube.com/chaowala",
      color: "text-red-600",
    },
  ];

  const instructions: Instruction[] = [
    {
      step: 1,
      title: "মেনু দেখুন",
      titleBengali: "মেনু দেখুন",
      description:
        "আমাদের খাঁটি চা সংগ্রহ দেখুন এবং আপনার পছন্দের চা নির্বাচন করুন",
      descriptionBengali:
        "আমাদের খাঁটি চা সংগ্রহ দেখুন এবং আপনার পছন্দের চা নির্বাচন করুন",
      icon: "ClipboardDocumentListIcon",
    },
    {
      step: 2,
      title: "অর্ডার করুন",
      titleBengali: "অর্ডার করুন",
      description: "কার্টে আইটেম যোগ করুন এবং আপনার অর্ডার নিশ্চিত করুন",
      descriptionBengali: "কার্টে আইটেম যোগ করুন এবং আপনার অর্ডার নিশ্চিত করুন",
      icon: "ShoppingCartIcon",
    },
    {
      step: 3,
      title: "টোকেন পান",
      titleBengali: "টোকেন পান",
      description: "আপনার অনন্য টোকেন নম্বর পান এবং সংরক্ষণ করুন",
      descriptionBengali: "আপনার অনন্য টোকেন নম্বর পান এবং সংরক্ষণ করুন",
      icon: "TicketIcon",
    },
    {
      step: 4,
      title: "সংগ্রহ করুন",
      titleBengali: "সংগ্রহ করুন",
      description: "অপেক্ষা ছাড়াই আপনার অর্ডার সংগ্রহ করুন এবং উপভোগ করুন",
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
    <div className="min-h-screen bg-background lg:pt-30 py-24">
      <div className="w-full px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bengali font-bold text-primary mb-4">
              অর্ডার পূরণ কেন্দ্র
            </h1>
            <p className="text-xl font-heading text-muted-foreground mb-2">
              অর্ডার পূরণ কেন্দ্র
            </p>
            <p className="text-foreground max-w-2xl mx-auto">
              আপনার অর্ডার সম্পূর্ণ করুন এবং আমাদের সাথে যোগাযোগ করুন। আমরা
              আপনার সেবায় সর্বদা প্রস্তুত।
            </p>
          </div>

          {/* Token Display Section */}
          {currentToken && lastOrder && (
            <div className="mb-12">
              <TokenDisplay
                tokenNumber={currentToken}
                estimatedTime="১০-১৫ মিনিট"
                orderItems={lastOrder.items}
                totalAmount={lastOrder.total}
                paymentMethod={lastOrder.paymentMethod}
                customerName={lastOrder.customerName}
              />
            </div>
          )}

          {/* Order Summary & Checkout Form */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <OrderSummaryCard
              items={cartItems}
              totalAmount={totalAmount}
            />
            <CheckoutForm 
              orderItems={cartItems} 
              totalAmount={totalAmount} 
              onOrderSuccess={handleOrderSuccess} 
            />
          </div>

          {/* WhatsApp Connect */}
          <div className="mb-12">
            <WhatsAppConnect
              phoneNumber="8801712345678"
              message="হ্যালো! আমি টোকেন থেকে অর্ডার করতে চাই। চা ওয়ালা"
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
              email="hello@chawala.com"
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
