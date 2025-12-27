import Link from "next/link";
import Icon from "@/components/ui/AppIcon";

const CTASection = () => {
  return (
    <section className="relative px-4 py-20 overflow-hidden bg-linear-to-br from-primary via-secondary to-accent">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, white 0px, white 2px, transparent 2px, transparent 10px)`,
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Main CTA Content */}
        <div className="mb-12">
          <h2 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl font-bengali">
            আজই শুরু করুন আপনার চায়ের যাত্রা
          </h2>
          <p className="mb-4 text-2xl md:text-3xl font-heading text-white/90">
            Start Your Chai Journey Today
          </p>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed md:text-xl font-bengali text-white/80">
            অর্ডার করুন, টোকেন নিন, এবং উপভোগ করুন খাঁটি বাংলার চায়ের স্বাদ
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-6 mb-12 sm:flex-row">
          <Link
            href="/interactive-menu-hub"
            className="flex items-center justify-center w-full px-10 py-5 space-x-3 text-xl font-bold bg-white rounded-lg group text-primary font-heading cultural-transition hover:scale-110 shadow-warm-lg sm:w-auto"
          >
            <Icon name="ShoppingCartIcon" size={28} />
            <span className="font-bengali">মেনু দেখুন</span>
            <Icon
              name="ArrowRightIcon"
              size={24}
              className="group-hover:translate-x-2 cultural-transition"
            />
          </Link>

          <Link
            href="/heritage-story"
            className="flex items-center justify-center w-full px-10 py-5 space-x-3 text-xl font-bold text-white bg-transparent border-2 border-white rounded-lg group font-heading cultural-transition hover:bg-white hover:text-primary sm:w-auto"
          >
            <Icon name="BookOpenIcon" size={28} />
            <span className="font-bengali">আমাদের সম্পর্কে</span>
            <Icon
              name="ArrowRightIcon"
              size={24}
              className="group-hover:translate-x-2 cultural-transition"
            />
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid max-w-4xl grid-cols-1 gap-8 mx-auto sm:grid-cols-3">
          <div className="text-center">
            <p className="mb-2 text-5xl font-bold text-white md:text-6xl font-heading">
              1000+
            </p>
            <p className="text-lg font-bengali text-white/90">দৈনিক অর্ডার</p>
            <p className="text-sm font-body text-white/70">Daily Orders</p>
          </div>

          <div className="text-center">
            <p className="mb-2 text-5xl font-bold text-white md:text-6xl font-heading">
              50+
            </p>
            <p className="text-lg font-bengali text-white/90">চায়ের ধরন</p>
            <p className="text-sm font-body text-white/70">Tea Varieties</p>
          </div>

          <div className="text-center">
            <p className="mb-2 text-5xl font-bold text-white md:text-6xl font-heading">
              5★
            </p>
            <p className="text-lg font-bengali text-white/90">গ্রাহক রেটিং</p>
            <p className="text-sm font-body text-white/70">Customer Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
