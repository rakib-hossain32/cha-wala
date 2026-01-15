import Link from "next/link";
import Icon from "../../../components/ui/AppIcon";

const CTASection = () => {
  return (
    <section className="relative py-32 overflow-hidden bg-[#1a0f0a]">
      {/* =======================
          BACKGROUND & ATMOSPHERE
      ======================== */}

      {/* 1. Deep Base with Radial Vignette (Focus on Center) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#2c1810] via-[#1a0f0a] to-black opacity-100" />

      {/* 2. Golden Glow (Spotlight Effect) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#d2691e]/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />

      {/* 3. Subtle Noise Texture (Adds rich texture feeling) */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 4. Abstract Ambient Lights (Animated) */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-[#d2691e]/5 rounded-full blur-3xl animate-pulse delay-700 pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-[#bf953f]/5 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none" />

      {/* =======================
          CONTENT CONTAINER
      ======================== */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* Header Block */}
        <div className="max-w-4xl mx-auto mb-16 space-y-8">
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm shadow-[0_0_20px_-10px_rgba(255,255,255,0.3)] hover:bg-white/10 transition-colors cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="text-amber-200/90 font-bengali text-[11px] font-bold tracking-[0.3em]">
              বিশেষ অফার
            </span>
          </div>

          {/* Main Title with Real Gold Gradient Effect */}
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold font-bengali leading-[1.1] drop-shadow-2xl">
            <span className="block text-[#f5f5dc] opacity-90 mb-2">
              ঐতিহ্যের স্বাদ
            </span>
            {/* Gold Gradient Text */}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] pb-4">
              আপনার চায়ের যাত্রা
            </span>
          </h2>

          {/* Subtitles & Divider */}
          <div className="space-y-5">
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mx-auto" />

            <p className="max-w-2xl mx-auto text-lg md:text-xl font-bengali text-[#f5f5dc]/70 leading-relaxed">
              প্রতিটি চুমুকে মিশে আছে খাঁটি বাংলার আভিজাত্য। অর্ডার করুন,
              এক্সক্লুসিভ টোকেন সংগ্রহ করুন এবং আমাদের এই যাত্রার অংশ হোন।
            </p>
          </div>
        </div>

        {/* Action Buttons Area */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24">
          {/* Primary CTA (Luxury Gold Gradient & Shine Animation) */}
          <Link
            href="/interactive-menu-hub"
            className="group relative w-full sm:w-auto min-w-[220px] px-8 py-5 rounded-xl overflow-hidden shadow-[0_0_40px_-10px_rgba(210,105,30,0.5)] transition-all duration-500 hover:shadow-[0_0_60px_-15px_rgba(210,105,30,0.7)] hover:-translate-y-1"
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#d2691e] to-[#b35412]" />
            {/* Shine Sweep Animation */}
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] bg-[0%_0%] group-hover:bg-[100%_100%] transition-[background-position] duration-[800ms] ease-out" />

            <div className="relative flex items-center justify-center gap-3">
              <Icon name="ShoppingCartIcon" size={24} className="text-white" />
              <span className="font-bengali font-bold text-xl text-white tracking-wide">
                মেনু দেখুন
              </span>
              <Icon
                name="ArrowRightIcon"
                size={20}
                className="text-white group-hover:translate-x-1 transition-transform"
              />
            </div>
          </Link>

          {/* Secondary CTA (Minimalist Frosted Glass) */}
          <Link
            href="/heritage-story"
            className="group w-full sm:w-auto min-w-[220px] px-8 py-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Icon
              name="BookOpenIcon"
              size={24}
              className="text-[#f5f5dc]/70 group-hover:text-amber-200 transition-colors"
            />
            <span className="font-bengali font-bold text-xl text-[#f5f5dc] group-hover:text-amber-200 transition-colors">
              আমাদের গল্প
            </span>
          </Link>
        </div>

        {/* Floating Glass Stats Panel */}
        <div className="relative max-w-5xl mx-auto">
          {/* Reflection Aura under card */}
          <div className="absolute -bottom-10 left-10 right-10 h-20 bg-gradient-to-b from-amber-500/10 to-transparent blur-3xl rounded-[100%] pointer-events-none" />

          <div className="relative bg-[#1a0f0a]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden hover:border-white/20 transition-colors duration-500">
            {/* Decorative Corner Light */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/5 blur-[80px] rounded-full pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 relative z-10">
              {/* Vertical Dividers with Fade Effect */}
              <div className="hidden md:block absolute top-4 bottom-4 left-1/3 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
              <div className="hidden md:block absolute top-4 bottom-4 right-1/3 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

              {/* Stat 1 */}
              <div className="flex flex-col items-center justify-center space-y-1 group cursor-default">
                <Icon
                  name="ShoppingBagIcon"
                  size={32}
                  className="text-amber-500/80 mb-4 group-hover:scale-110 transition-transform duration-300"
                />
                <h3 className="text-5xl font-bold text-white font-heading tracking-tight">
                  1K<span className="text-amber-500 text-3xl align-top">+</span>
                </h3>
                <p className="text-white/60 font-bengali text-lg">দৈনিক অর্ডার</p>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col items-center justify-center space-y-1 group cursor-default">
                <Icon
                  name="BeakerIcon"
                  size={32}
                  className="text-amber-500/80 mb-4 group-hover:scale-110 transition-transform duration-300"
                />
                <h3 className="text-5xl font-bold text-white font-heading tracking-tight">
                  50<span className="text-amber-500 text-3xl align-top">+</span>
                </h3>
                <p className="text-white/60 font-bengali text-lg">
                  সিগনেচার ব্লেন্ড
                </p>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col items-center justify-center space-y-1 group cursor-default">
                <Icon
                  name="StarIcon"
                  size={32}
                  className="text-amber-500/80 mb-4 group-hover:scale-110 transition-transform duration-300"
                />
                <h3 className="text-5xl font-bold text-white font-heading tracking-tight">
                  4.9
                </h3>
                <p className="text-white/60 font-bengali text-lg">
                  গ্রাহক সন্তুষ্টি
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
