"use client";

import { useRef } from "react";
import Header from "@/components/common/Header";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import TestimonialsSection from "./TestimonialsSection";
import CTASection from "./CTASection";
import FooterSection from "./FooterSection";

const HeroGatewayInteractive = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  const handleExploreClick = () => {
    if (featuresRef?.current) {
      featuresRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        <HeroSection onExploreClick={handleExploreClick} />

        <div ref={featuresRef}>
          <FeaturesSection />
        </div>

        <TestimonialsSection />
        <CTASection />
      </main>

      <FooterSection />
    </div>
  );
};

export default HeroGatewayInteractive;
