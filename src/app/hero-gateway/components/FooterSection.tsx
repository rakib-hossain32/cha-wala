"use client";

import Link from "next/link";
import Icon from "../../../components/ui/AppIcon";

const FooterSection = () => {
  const currentYear = new Date()?.getFullYear();

  const quickLinks = [
    { nameBengali: "হোম", nameEnglish: "Home", href: "/hero-gateway" },
    { nameBengali: "ঐতিহ্য", nameEnglish: "Heritage", href: "/heritage-story" },
    { nameBengali: "মেনু", nameEnglish: "Menu", href: "/interactive-menu-hub" },
    {
      nameBengali: "উৎকর্ষতা",
      nameEnglish: "Excellence",
      href: "/excellence-showcase",
    },
    {
      nameBengali: "কমিউনিটি",
      nameEnglish: "Community",
      href: "/community-gallery",
    },
    {
      nameBengali: "অর্ডার",
      nameEnglish: "Order",
      href: "/order-fulfillment-center",
    },
  ];

  const socialLinks = [
    { icon: "facebook", name: "Facebook", url: "https://facebook.com" },
    { icon: "instagram", name: "Instagram", url: "https://instagram.com" },
    { icon: "twitter", name: "Twitter", url: "https://twitter.com" },
  ];

  return (
    <footer className="relative bg-[#0f0806] text-[#f5f5dc] overflow-hidden pt-20 pb-10">
      {/* =======================
          DECORATIVE BACKGROUNDS
      ======================== */}

      {/* 1. Top Gradient Line (Golden Separator) */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d2691e]/50 to-transparent" />

      {/* 2. Ambient Glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#d2691e]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#bf953f]/5 blur-[100px] rounded-full pointer-events-none" />

      {/* 3. Giant Watermark Logo (Subtle Brand Presence) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-[0.03] pointer-events-none select-none">
        <svg width="600" height="600" viewBox="0 0 40 40" fill="white">
          <path d="M8 15C8 15 8 12 10 10C12 8 15 8 15 8H25C25 8 28 8 30 10C32 12 32 15 32 15V28C32 30 30 32 28 32H12C10 32 8 30 8 28V15Z" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* =======================
            MAIN CONTENT GRID
        ======================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          {/* --- Column 1: Brand Info (Span 4) --- */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-flex items-center space-x-3 group">
              <div className="relative w-12 h-12 transition-transform duration-500 group-hover:rotate-12">
                <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                  <path
                    d="M8 15C8 15 8 12 10 10C12 8 15 8 15 8H25C25 8 28 8 30 10C32 12 32 15 32 15V28C32 30 30 32 28 32H12C10 32 8 30 8 28V15Z"
                    fill="url(#gold-gradient)"
                  />
                  <path
                    d="M14 6C14 6 14 4 15 3"
                    stroke="#d2691e"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="animate-pulse"
                  />
                  <path
                    d="M20 5C20 5 20 3 21 2"
                    stroke="#d2691e"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="animate-pulse delay-75"
                  />
                  <path
                    d="M26 6C26 6 26 4 27 3"
                    stroke="#d2691e"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="animate-pulse delay-150"
                  />
                  <defs>
                    <linearGradient
                      id="gold-gradient"
                      x1="0"
                      y1="0"
                      x2="40"
                      y2="40"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#bf953f" />
                      <stop offset="1" stopColor="#fcf6ba" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold font-bengali text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] to-[#fcf6ba]">
                  চা ওয়ালা
                </h2>
              </div>
            </Link>

            <div className="space-y-4">
              <p className="text-lg font-bengali text-white/80 leading-relaxed border-l-2 border-[#d2691e] pl-4">
                এক কাপ চা, হাজারো গল্প।
              </p>
            </div>

            {/* Social Icons (Moved here for better layout) */}
            <div className="flex gap-3 pt-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-[#d2691e] hover:bg-white/10 hover:border-[#d2691e]/50 transition-all duration-300"
                  aria-label={social.name}
                >
                  {/* Note: Ensure Icon component handles these names or map them */}
                  <Icon name="ShareIcon" size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* --- Column 2: Quick Links (Span 3) --- */}
          <div className="lg:col-span-3 lg:pl-8">
            <h3 className="text-lg font-bengali font-bold text-[#bf953f] mb-6 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#bf953f]/50"></span> দ্রুত লিংক
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="group flex items-center space-x-2 text-white/70 hover:text-[#fcf6ba] transition-colors duration-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d2691e] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="font-bengali group-hover:translate-x-1 transition-transform duration-300">
                      {link.nameBengali}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Column 3: Contact (Span 3) --- */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-bengali font-bold text-[#bf953f] mb-6 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#bf953f]/50"></span> যোগাযোগ
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#d2691e] group-hover:bg-[#d2691e] group-hover:text-white transition-all duration-300">
                  <Icon name="MapPinIcon" size={20} />
                </div>
                <div>
                  <p className="font-bengali text-white/90">
                    ১২৩ চা রোড, গুলশান, ঢাকা
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#d2691e] group-hover:bg-[#d2691e] group-hover:text-white transition-all duration-300">
                  <Icon name="PhoneIcon" size={20} />
                </div>
                <div>
                  <p className="font-heading text-white/90 tracking-wide">
                    +880 1234-567890
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#d2691e] group-hover:bg-[#d2691e] group-hover:text-white transition-all duration-300">
                  <Icon name="EnvelopeIcon" size={20} />
                </div>
                <div>
                  <p className="font-heading text-white/90">hello@chawala.com</p>
                </div>
              </li>
            </ul>
          </div>

          {/* --- Column 4: Hours (Span 2) --- */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bengali font-bold text-[#bf953f] mb-6 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#bf953f]/50"></span> সময়সূচী
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#d2691e]/30 transition-colors">
                <p className="font-bengali text-white text-lg">সোম - শুক্র</p>
                <p className="font-heading text-white/60 text-sm">
                  সকাল ৭:০০ - রাত ১০:০০
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#d2691e]/30 transition-colors">
                <p className="font-bengali text-white text-lg">শনি - রবি</p>
                <p className="font-heading text-white/60 text-sm">
                  সকাল ৮:০০ - রাত ১১:০০
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =======================
            BOTTOM BAR
        ======================== */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-heading text-white/40">
            © {currentYear} <span className="text-[#bf953f]">চা ওয়ালা</span>। সর্বস্বত্ব সংরক্ষিত।
          </p>

          <div className="flex gap-6">
            <Link
              href="#"
              className="text-sm font-bengali text-white/40 hover:text-[#d2691e] transition-colors relative group"
            >
              গোপনীয়তা নীতি
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#d2691e] transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="#"
              className="text-sm font-bengali text-white/40 hover:text-[#d2691e] transition-colors relative group"
            >
              সেবার শর্তাবলী
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#d2691e] transition-all group-hover:w-full"></span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
