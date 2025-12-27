"use client";

import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

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

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-warm hover-lift">
      {/* Rating Stars */}
      <div className="flex items-center space-x-1 mb-4">
        {[...Array(5)].map((_, index) => (
          <Icon
            key={index}
            name="StarIcon"
            size={20}
            variant={index < testimonial.rating ? "solid" : "outline"}
            className={
              index < testimonial.rating
                ? "text-warning"
                : "text-muted-foreground"
            }
          />
        ))}
      </div>

      {/* Testimonial Text */}
      <div className="mb-6">
        <p className="font-bengali text-base text-foreground leading-relaxed mb-3">
          "{testimonial.testimonialBengali}"
        </p>
        <p className="font-heading text-sm text-muted-foreground leading-relaxed italic">
          "{testimonial.testimonial}"
        </p>
      </div>

      {/* Author Info */}
      <div className="flex items-center space-x-4 pt-4 border-t border-border">
        <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
          <AppImage
            src={testimonial.image}
            alt={testimonial.alt}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1">
          <h4 className="font-bengali text-base font-bold text-foreground">
            {testimonial.nameBengali}
          </h4>
          <p className="font-heading text-sm text-muted-foreground">
            {testimonial.name}
          </p>
          <p className="font-bengali text-xs text-muted-foreground mt-1">
            {testimonial.roleBengali} • {testimonial.role}
          </p>
        </div>

        <Icon
          name="ChatBubbleLeftRightIcon"
          size={24}
          className="text-primary"
        />
      </div>
    </div>
  );
};

export default TestimonialCard;
