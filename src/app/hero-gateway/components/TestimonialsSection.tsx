"use client";

import { useState, useEffect } from "react";
import AppImage from "../../../components/ui/AppImage";
import Icon from "../../../components/ui/AppIcon";
import FeedbackModal from "./FeedbackModal";

interface Testimonial {
  _id?: string;
  name: string;
  nameBengali: string;
  role: string;
  roleBengali: string;
  image: string;
  alt: string;
  quoteBengali: string;
  quoteEnglish?: string;
  rating: number;
}

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      if (Array.isArray(data)) {
        setTestimonials(data);
      }
    } catch (err) {
      console.error("Failed to fetch testimonials", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 relative">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-bengali text-primary mb-4">
            গ্রাহকদের মতামত
          </h2>
          <p className="text-xl md:text-2xl font-heading text-muted-foreground mb-8">
            গ্রাহকরা যা বলেন
          </p>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bengali font-bold shadow-lg hover:scale-105 transition-all"
          >
            <Icon name="ChatBubbleLeftRightIcon" size={20} />
            আপনার মতামত দিন
          </button>
        </div>

        {/* Testimonials Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card p-8 rounded-lg animate-pulse h-64 border border-border/50"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.length > 0 ? (
              testimonials.map((testimonial, index) => (
                <div
                  key={testimonial._id || index}
                  className="bg-card p-8 rounded-lg shadow-warm hover-lift cultural-transition flex flex-col h-full"
                >
                  {/* Rating Stars */}
                  <div className="flex space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="StarIcon"
                        size={20}
                        className={i < (testimonial.rating || 5) ? "text-warning" : "text-muted-foreground/30"}
                        variant="solid"
                      />
                    ))}
                  </div>

                  {/* Quote - Bengali */}
                  <p className="text-base font-bengali text-foreground mb-6 leading-relaxed italic grow">
                    "{testimonial.quoteBengali || (testimonial as any).testimonialBengali || (testimonial as any).testimonial}"
                  </p>

                  {/* Customer Info */}
                  <div className="flex items-center space-x-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-primary/10">
                      <AppImage
                        src={testimonial.image || "https://images.unsplash.com/photo-1633332755192-727a05c4013d"}
                        alt={testimonial.alt || testimonial.nameBengali}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bengali text-lg font-semibold text-foreground leading-tight">
                        {testimonial.nameBengali}
                      </p>
                      <p className="font-bengali text-sm text-muted-foreground">
                        {testimonial.roleBengali}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                 <p className="text-muted-foreground font-bengali">এখনও কোনো মতামত নেই। আপনার মতামত দিন প্রথম জন হিসেবে!</p>
              </div>
            )}
          </div>
        )}

        {/* Trust Badge */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-3 px-8 py-4 bg-trust text-trust-foreground rounded-lg shadow-warm">
            <Icon name="ShieldCheckIcon" size={32} />
            <div className="text-left">
              <p className="font-bengali text-xl font-semibold">
                ১০০০+ সন্তুষ্ট গ্রাহক
              </p>
            </div>
          </div>
        </div>
      </div>

      <FeedbackModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchTestimonials}
      />
    </section>
  );
};

export default TestimonialsSection;
