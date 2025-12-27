"use client";

import { useState, useEffect } from "react";
import Icon from "@/components/ui/AppIcon";

interface SocialLink {
  name: string;
  nameBengali: string;
  icon: string;
  url: string;
  color: string;
}

interface SocialConnectProps {
  links: SocialLink[];
}

export default function SocialConnect({ links }: SocialConnectProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-lg shadow-warm p-6 border border-border">
        <h3 className="text-xl font-bengali font-bold text-primary mb-4">
          আমাদের সাথে যুক্ত হন
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-24 bg-muted rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  const handleSocialClick = (url: string) => {
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-warm p-6 border border-border">
      <h3 className="text-xl font-bengali font-bold text-primary mb-2">
        আমাদের সাথে যুক্ত হন
      </h3>
      <p className="text-sm font-heading text-muted-foreground mb-6">
        Connect With Us
      </p>

      <div className="grid grid-cols-2 gap-4">
        {links.map((link, index) => (
          <button
            key={index}
            onClick={() => handleSocialClick(link.url)}
            className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-border cultural-transition hover:scale-105 hover:border-primary hover:shadow-warm-sm"
          >
            <Icon name={link.icon as any} size={32} className={link.color} />
            <span className="font-bengali font-semibold text-foreground mt-2">
              {link.nameBengali}
            </span>
            <span className="text-xs font-heading text-muted-foreground">
              {link.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
