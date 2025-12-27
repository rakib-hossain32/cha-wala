import Icon from "@/components/ui/AppIcon";

interface Feature {
  icon: string;
  titleBengali: string;
  titleEnglish: string;
  descriptionBengali: string;
  descriptionEnglish: string;
  color: string;
}

const FeaturesSection = () => {
  const features: Feature[] = [
    {
      icon: "CpuChipIcon",
      titleBengali: "টোকেন সিস্টেম",
      titleEnglish: "Token System",
      descriptionBengali: "অর্ডার করুন, টোকেন নিন, অপেক্ষা ছাড়াই চা পান",
      descriptionEnglish: "Order, receive token, get your chai without waiting",
      color: "text-conversion",
    },
    {
      icon: "DevicePhoneMobileIcon",
      titleBengali: "মোবাইল অর্ডারিং",
      titleEnglish: "Mobile Ordering",
      descriptionBengali: "যেকোনো জায়গা থেকে সহজে অর্ডার করুন",
      descriptionEnglish: "Order easily from anywhere on your mobile",
      color: "text-accent",
    },
    {
      icon: "UserGroupIcon",
      titleBengali: "সম্প্রদায়ের আড্ডা",
      titleEnglish: "Community Adda",
      descriptionBengali: "চায়ের সাথে গল্প, হাসি এবং সংযোগ",
      descriptionEnglish: "Stories, laughter, and connections over chai",
      color: "text-primary",
    },
    {
      icon: "ShieldCheckIcon",
      titleBengali: "মান নিশ্চিতকরণ",
      titleEnglish: "Quality Assurance",
      descriptionBengali: "প্রতিটি কাপে খাঁটি উপাদান এবং ভালোবাসা",
      descriptionEnglish: "Authentic ingredients and love in every cup",
      color: "text-secondary",
    },
  ];

  return (
    <section className="py-20 px-4 bg-muted">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-bengali text-primary mb-4">
            কেন চাই টোকেন?
          </h2>
          <p className="text-xl md:text-2xl font-heading text-muted-foreground">
            Why Choose Chai Token?
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-lg shadow-warm hover-lift cultural-transition group"
            >
              <div className={`mb-6 ${feature.color}`}>
                <Icon name={feature.icon as any} size={48} />
              </div>
              <h3 className="text-2xl font-bengali font-semibold text-foreground mb-2">
                {feature.titleBengali}
              </h3>
              <p className="text-lg font-heading text-muted-foreground mb-4">
                {feature.titleEnglish}
              </p>
              <p className="text-base font-bengali text-foreground mb-2 leading-relaxed">
                {feature.descriptionBengali}
              </p>
              <p className="text-sm font-body text-muted-foreground leading-relaxed">
                {feature.descriptionEnglish}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg md:text-xl font-bengali text-foreground mb-4">
            আজই আমাদের সাথে যুক্ত হন এবং চায়ের নতুন অভিজ্ঞতা নিন
          </p>
          <p className="text-base md:text-lg font-body text-muted-foreground">
            Join us today and experience chai like never before
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
