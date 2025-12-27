"use client";

import { useState, useEffect } from "react";
import Icon from "@/components/ui/AppIcon";

interface WhatsAppConnectProps {
  phoneNumber: string;
  message: string;
}

export default function WhatsAppConnect({
  phoneNumber,
  message,
}: WhatsAppConnectProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="bg-gradient-to-r from-success to-accent rounded-lg p-6 shadow-warm">
        <div className="h-20 bg-success/20 rounded animate-pulse"></div>
      </div>
    );
  }

  const handleWhatsAppClick = () => {
    if (typeof window !== "undefined") {
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="bg-gradient-to-r from-success to-accent rounded-lg p-6 shadow-warm">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-bengali font-bold text-white mb-2">
            হোয়াটসঅ্যাপে অর্ডার করুন
          </h3>
          <p className="text-sm font-heading text-white opacity-90 mb-4">
            Order via WhatsApp for Quick Service
          </p>
          <button
            onClick={handleWhatsAppClick}
            className="flex items-center space-x-2 px-6 py-3 bg-white text-success rounded-lg font-bengali font-semibold cultural-transition hover:scale-105 shadow-warm-sm"
          >
            <Icon name="ChatBubbleLeftRightIcon" size={20} />
            <span>এখনই চ্যাট করুন</span>
          </button>
        </div>
        <div className="hidden md:block">
          <Icon
            name="DevicePhoneMobileIcon"
            size={80}
            className="text-white opacity-20"
          />
        </div>
      </div>
    </div>
  );
}
