"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "../../../components/ui/AppIcon";

interface HeroSectionProps {
  onExploreClick: () => void;
}

const HeroSection = ({ onExploreClick }: HeroSectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsHydrated(true);

    // Parallax Effect Logic
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20,
        y: (e.clientY / window.innerHeight) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!isHydrated) {
    return (
      <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-[#1a0f0a]">
        <div className="animate-pulse space-y-6 text-center">
          <div className="w-32 h-32 mx-auto bg-white/5 rounded-full" />
          <div className="w-64 h-8 mx-auto bg-white/5 rounded" />
          <div className="w-48 h-4 mx-auto bg-white/5 rounded" />
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-[#0f0806]">
      {/* =======================
          BACKGROUND LAYERS
      ======================== */}

      {/* 1. Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2c1810] via-[#1a0f0a] to-black opacity-100" />

      {/* 2. Noise Texture (Cinematic Grain) */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 3. Ambient Gold Glows (Animated) */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#d2691e]/20 blur-[150px] rounded-full mix-blend-screen animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#bf953f]/10 blur-[150px] rounded-full mix-blend-screen animate-pulse delay-1000" />

      {/* 4. Abstract Mandala Pattern (Rotating) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03] animate-[spin_60s_linear_infinite] pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="0.5">
          <circle cx="50" cy="50" r="40" strokeDasharray="4 4" />
          <circle cx="50" cy="50" r="30" strokeDasharray="2 2" />
          <path d="M50 10 L50 90 M10 50 L90 50" />
          <path d="M22 22 L78 78 M78 22 L22 78" />
        </svg>
      </div>

      {/* =======================
          MAIN CONTENT
      ======================== */}
      <div
        className="relative z-10 max-w-7xl px-4 pb-20 pt-40 mx-auto text-center"
        style={{
          transform: `translate(${mousePosition.x * -1}px, ${mousePosition.y * -1}px)`,
        }}
      >
        {/* Animated Tea Cup Visual */}
        <div className="flex justify-center mb-10 relative">
          {/* Glow behind cup */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-orange-500/30 blur-[50px] rounded-full" />

          <div className="relative w-32 h-32 md:w-40 md:h-40 drop-shadow-2xl hover:scale-105 transition-transform duration-500 ease-out">
            <svg
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              {/* Cup Body with Gradient Fill */}
              <defs>
                <linearGradient
                  id="cupGradient"
                  x1="25"
                  y1="26"
                  x2="95"
                  y2="96"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#d2691e" />
                  <stop offset="100%" stopColor="#8b4513" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <path
                d="M25 45C25 45 25 38 30 32C35 26 45 26 45 26H75C75 26 85 26 90 32C95 38 95 45 95 45V84C95 90 90 96 84 96H36C30 96 25 90 25 84V45Z"
                fill="url(#cupGradient)"
                stroke="#f5f5dc"
                strokeWidth="1"
              />

              {/* Handle */}
              <path
                d="M95 54C95 54 105 54 108 60C111 66 111 72 108 78C105 84 95 84 95 84"
                stroke="#d2691e"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />

              {/* Stylized Steam (Smoother Animation) */}
              <path
                d="M42 20 Q 45 15, 42 10"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                className="opacity-0 animate-[steam-rise_2.5s_ease-out_infinite]"
              />
              <path
                d="M60 18 Q 65 12, 60 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                className="opacity-0 animate-[steam-rise_2.5s_ease-out_infinite_0.5s]"
              />
              <path
                d="M78 20 Q 82 15, 78 10"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                className="opacity-0 animate-[steam-rise_2.5s_ease-out_infinite_1s]"
              />
            </svg>
          </div>
        </div>

        {/* Headlines */}
        <div className="space-y-6 mb-12">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold font-bengali leading-none tracking-tight">
            <span className="text-[#f5f5dc] drop-shadow-lg">চা</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728]">
              ওয়ালা
            </span>
          </h1>

          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl md:text-4xl font-bengali text-[#d2691e] tracking-wide">
              এক কাপ চা, হাজারো গল্প
            </p>
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#f5f5dc]/40 to-transparent" />
          </div>

          <p className="max-w-2xl mx-auto text-lg md:text-xl font-bengali text-[#f5f5dc]/70 leading-relaxed">
            খাঁটি স্বাদ, খাঁটি আড্ডা — যেখানে ঐতিহ্যের সাথে ঘটে আধুনিকতার অপূর্ব
            মেলবন্ধন। আপনার চায়ের অভিজ্ঞতাকে নিয়ে যান নতুন উচ্চতায়।
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
          <Link
            href="/interactive-menu-hub"
            className="group relative w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-[#d2691e] to-[#a0522d] rounded-full overflow-hidden shadow-[0_0_30px_-5px_rgba(210,105,30,0.5)] transition-all hover:scale-105 hover:shadow-[0_0_50px_-10px_rgba(210,105,30,0.7)]"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <div className="relative flex items-center justify-center gap-2 text-white font-bengali font-bold text-lg">
              <Icon name="ShoppingCartIcon" size={22} />
              <span>এখনই অর্ডার করুন</span>
            </div>
          </Link>

          <button
            onClick={onExploreClick}
            className="group w-full sm:w-auto px-10 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-[#f5f5dc] font-bengali font-bold text-lg hover:bg-white/10 hover:border-white/40 transition-all flex items-center justify-center gap-2"
          >
            <Icon name="BookOpenIcon" size={22} />
            <span>আমাদের গল্প</span>
          </button>
        </div>

        {/* Premium Features (Glass Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              icon: "ClockIcon",
              title: "দ্রুত সেবা",
              color: "text-[#bf953f]",
            },
            {
              icon: "SparklesIcon",
              title: "প্রিমিয়াম কোয়ালিটি",
              color: "text-[#fcf6ba]",
            },
            {
              icon: "HeartIcon",
              title: "ঐতিহ্যবাহী স্বাদ",
              color: "text-[#d2691e]",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="group p-6 rounded-2xl bg-[#1a0f0a]/60 backdrop-blur-md border border-white/5 hover:border-[#d2691e]/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`mb-3 ${feature.color} transition-transform group-hover:scale-110 duration-300`}
              >
                <Icon name={feature.icon as any} size={32} />
              </div>
              <h3 className="text-xl font-bengali text-[#f5f5dc] mb-1">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Elegant Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[#d2691e] to-transparent" />
      </div>

      {/* Global Style for Keyframe Animation (Include this if not in global css) */}
      <style jsx global>{`
        @keyframes steam-rise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-15px) scale(1.2);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
