import Icon from "../../../components/ui/AppIcon";

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
      titleEnglish: "",
      descriptionBengali: "অর্ডার করুন, টোকেন নিন, অপেক্ষা ছাড়াই চা পান",
      descriptionEnglish: "",
      color: "text-conversion",
    },
    {
      icon: "DevicePhoneMobileIcon",
      titleBengali: "মোবাইল অর্ডারিং",
      titleEnglish: "",
      descriptionBengali: "যেকোনো জায়গা থেকে সহজে অর্ডার করুন",
      descriptionEnglish: "",
      color: "text-accent",
    },
    {
      icon: "UserGroupIcon",
      titleBengali: "সম্প্রদায়ের আড্ডা",
      titleEnglish: "",
      descriptionBengali: "চায়ের সাথে গল্প, হাসি এবং সংযোগ",
      descriptionEnglish: "",
      color: "text-primary",
    },
    {
      icon: "ShieldCheckIcon",
      titleBengali: "মান নিশ্চিতকরণ",
      titleEnglish: "",
      descriptionBengali: "প্রতিটি কাপে খাঁটি উপাদান এবং ভালোবাসা",
      descriptionEnglish: "",
      color: "text-secondary",
    },
  ];

  return (
    <section className="py-20 px-4 bg-muted">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-bengali text-primary mb-4">
            কেন চা ওয়ালা?
          </h2>
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
              <p className="text-base font-bengali text-foreground mb-2 leading-relaxed">
                {feature.descriptionBengali}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg md:text-xl font-bengali text-foreground mb-4">
            আজই আমাদের সাথে যুক্ত হন এবং চায়ের নতুন অভিজ্ঞতা নিন
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
