"use client";

import { useState, useEffect } from "react";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

interface TestimonialCardProps {
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

export default function TestimonialCard({
  name,
  nameBengali,
  role,
  roleBengali,
  testimonial,
  testimonialBengali,
  image,
  alt,
  rating,
}: TestimonialCardProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-xl p-6 shadow-warm border border-border">
        <div className="flex items-start space-x-4 mb-4">
          <div className="w-16 h-16 bg-muted rounded-full flex-shrink-0" />
          <div className="flex-1">
            <div className="h-5 bg-muted rounded w-32 mb-2" />
            <div className="h-4 bg-muted rounded w-24" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-3/4" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl p-6 shadow-warm hover-lift cultural-transition border border-border">
      <div className="flex items-start space-x-4 mb-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
          <AppImage
            src={image}
            alt={alt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h4 className="font-bengali text-lg font-semibold text-foreground">
            {nameBengali}
          </h4>
          <p className="font-heading text-sm text-muted-foreground mb-2">
            {name}
          </p>
          <p className="font-bengali text-xs text-foreground/70">
            {roleBengali}
          </p>
          <p className="font-body text-xs text-muted-foreground">{role}</p>
        </div>
      </div>
      <div className="flex items-center space-x-1 mb-3">
        {[...Array(5)].map((_, index) => (
          <Icon
            key={index}
            name="StarIcon"
            variant={index < rating ? "solid" : "outline"}
            size={16}
            className={
              index < rating ? "text-warning" : "text-muted-foreground"
            }
          />
        ))}
      </div>
      <p className="font-bengali text-sm text-foreground/80 mb-2 leading-relaxed">
        {testimonialBengali}
      </p>
      <p className="font-body text-xs text-muted-foreground leading-relaxed">
        {testimonial}
      </p>
    </div>
  );
}
