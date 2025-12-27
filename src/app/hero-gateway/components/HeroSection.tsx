"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "@/components/ui/AppIcon";

interface HeroSectionProps {
  onExploreClick: () => void;
}

const HeroSection = ({ onExploreClick }: HeroSectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-linear-to-br from-background via-card to-muted">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-64 h-64 rounded-full top-20 left-10 bg-primary blur-3xl animate-pulse"></div>
          <div className="absolute rounded-full bottom-20 right-10 w-96 h-96 bg-secondary blur-3xl animate-pulse"></div>
        </div>
        <div className="relative z-10 max-w-5xl px-4 mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="relative w-32 h-32 rounded-full animate-pulse bg-primary/20"></div>
          </div>
          <div className="space-y-4">
            <div className="h-16 max-w-3xl mx-auto rounded-lg bg-primary/20 animate-pulse"></div>
            <div className="h-12 max-w-2xl mx-auto rounded-lg bg-secondary/20 animate-pulse"></div>
            <div className="h-8 max-w-xl mx-auto rounded-lg bg-muted animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-linear-to-br from-background via-card to-muted">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-64 h-64 rounded-full top-20 left-10 bg-primary blur-3xl animate-pulse"></div>
        <div className="absolute rounded-full bottom-20 right-10 w-96 h-96 bg-secondary blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/30 rounded-full blur-3xl animate-pattern-morph"></div>
      </div>

      {/* Traditional Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `repeating-linear-linear(45deg, var(--color-primary) 0px, var(--color-primary) 2px, transparent 2px, transparent 10px)`,
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl px-4 py-20 mx-auto text-center">
        {/* Animated Tea Cup Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative w-32 h-32 hover-lift">
            <svg
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              {/* Tea Cup */}
              <path
                d="M25 45C25 45 25 38 30 32C35 26 45 26 45 26H75C75 26 85 26 90 32C95 38 95 45 95 45V84C95 90 90 96 84 96H36C30 96 25 90 25 84V45Z"
                fill="var(--color-primary)"
                className="cultural-transition"
              />
              {/* Steam Lines */}
              <path
                d="M42 18C42 18 42 12 45 9"
                stroke="var(--color-secondary)"
                strokeWidth="4"
                strokeLinecap="round"
                className="animate-steam"
                style={{ animationDelay: "0s" }}
              />
              <path
                d="M60 15C60 15 60 9 63 6"
                stroke="var(--color-secondary)"
                strokeWidth="4"
                strokeLinecap="round"
                className="animate-steam"
                style={{ animationDelay: "0.5s" }}
              />
              <path
                d="M78 18C78 18 78 12 81 9"
                stroke="var(--color-secondary)"
                strokeWidth="4"
                strokeLinecap="round"
                className="animate-steam"
                style={{ animationDelay: "1s" }}
              />
              {/* Handle */}
              <path
                d="M95 54C95 54 105 54 108 60C111 66 111 72 108 78C105 84 95 84 95 84"
                stroke="var(--color-primary)"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              {/* Tea Level */}
              <ellipse
                cx="60"
                cy="70"
                rx="30"
                ry="8"
                fill="var(--color-secondary)"
                opacity="0.6"
              />
            </svg>
          </div>
        </div>

        {/* Main Heading - Bengali */}
        <h1 className="mb-4 text-5xl font-bold leading-tight md:text-7xl lg:text-8xl font-bengali text-primary cultural-transition hover:scale-105">
          চাই টোকেন
        </h1>

        {/* Tagline - Bengali */}
        <p className="mb-6 text-2xl leading-relaxed md:text-4xl lg:text-5xl font-bengali text-secondary">
          এক কাপ চা, হাজারো গল্প
        </p>

        {/* English Translation */}
        <p className="mb-4 text-xl italic md:text-2xl lg:text-3xl font-heading text-muted-foreground">
          One Cup of Tea, Thousands of Stories
        </p>

        {/* Subtitle - Bengali */}
        <p className="max-w-3xl mx-auto mb-8 text-lg leading-relaxed md:text-xl lg:text-2xl font-bengali text-foreground">
          খাঁটি স্বাদ, খাঁটি আড্ডা — ঐতিহ্যের সাথে আধুনিকতার মেলবন্ধন
        </p>

        {/* English Subtitle */}
        <p className="max-w-2xl mx-auto mb-12 text-base leading-relaxed md:text-lg lg:text-xl font-body text-muted-foreground">
          Pure Taste, Pure Conversation — Where Tradition Meets Innovation
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/interactive-menu-hub"
            className="flex items-center justify-center w-full px-8 py-4 space-x-3 text-lg font-semibold rounded-lg group bg-conversion text-conversion-foreground font-heading cultural-transition hover:scale-105 shadow-warm hover:shadow-warm-lg sm:w-auto"
          >
            <Icon name="ShoppingCartIcon" size={24} />
            <span className="font-bengali">এখনই অর্ডার করুন</span>
            <Icon
              name="ArrowRightIcon"
              size={20}
              className="group-hover:translate-x-1 cultural-transition"
            />
          </Link>

          <button
            onClick={onExploreClick}
            className="flex items-center justify-center w-full px-8 py-4 space-x-3 text-lg font-semibold rounded-lg group bg-primary text-primary-foreground font-heading cultural-transition hover:scale-105 shadow-warm hover:shadow-warm-lg sm:w-auto"
          >
            <Icon name="BookOpenIcon" size={24} />
            <span className="font-bengali">আমাদের গল্প জানুন</span>
            <Icon
              name="ChevronDownIcon"
              size={20}
              className="group-hover:translate-y-1 cultural-transition"
            />
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="grid max-w-4xl grid-cols-1 gap-6 mx-auto mt-16 sm:grid-cols-3">
          <div className="flex flex-col items-center p-6 space-y-2 rounded-lg bg-card/50 backdrop-blur-sm hover-lift">
            <Icon name="ClockIcon" size={32} className="text-accent" />
            <p className="text-lg font-semibold font-bengali text-foreground">
              দ্রুত সেবা
            </p>
            <p className="text-sm font-body text-muted-foreground">
              No Waiting Time
            </p>
          </div>

          <div className="flex flex-col items-center p-6 space-y-2 rounded-lg bg-card/50 backdrop-blur-sm hover-lift">
            <Icon name="SparklesIcon" size={32} className="text-secondary" />
            <p className="text-lg font-semibold font-bengali text-foreground">
              খাঁটি উপাদান
            </p>
            <p className="text-sm font-body text-muted-foreground">
              Authentic Ingredients
            </p>
          </div>

          <div className="flex flex-col items-center p-6 space-y-2 rounded-lg bg-card/50 backdrop-blur-sm hover-lift">
            <Icon name="HeartIcon" size={32} className="text-primary" />
            <p className="text-lg font-semibold font-bengali text-foreground">
              ঐতিহ্যবাহী স্বাদ
            </p>
            <p className="text-sm font-body text-muted-foreground">
              Traditional Taste
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute transform -translate-x-1/2 bottom-8 left-1/2 animate-bounce">
        <Icon name="ChevronDownIcon" size={32} className="text-primary" />
      </div>
    </section>
  );
};

export default HeroSection;
