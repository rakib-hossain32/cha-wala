import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

interface Testimonial {
  name: string;
  nameBengali: string;
  role: string;
  roleBengali: string;
  image: string;
  alt: string;
  quoteBengali: string;
  quoteEnglish: string;
  rating: number;
}

const TestimonialsSection = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Rahul Sharma",
      nameBengali: "রাহুল শর্মা",
      role: "Software Engineer",
      roleBengali: "সফটওয়্যার ইঞ্জিনিয়ার",
      image:
        "https://img.rocket.new/generatedImages/rocket_gen_img_18e8b8ea8-1763295802233.png",
      alt: "Young Indian man with short black hair wearing blue shirt smiling at camera",
      quoteBengali:
        "টোকেন সিস্টেম অসাধারণ! এখন আর লাইনে দাঁড়াতে হয় না। চায়ের স্বাদও দুর্দান্ত।",
      quoteEnglish:
        "The token system is amazing! No more waiting in lines. The chai taste is excellent too.",
      rating: 5,
    },
    {
      name: "Priya Das",
      nameBengali: "প্রিয়া দাস",
      role: "Teacher",
      roleBengali: "শিক্ষিকা",
      image: "https://images.unsplash.com/photo-1725271765764-669af9988700",
      alt: "Young woman with long dark hair in white top smiling warmly at camera",
      quoteBengali: "খাঁটি বাংলার চায়ের স্বাদ পাই এখানে। আমার প্রিয় জায়গা!",
      quoteEnglish:
        "I get the authentic Bengali chai taste here. My favorite place!",
      rating: 5,
    },
    {
      name: "Amit Roy",
      nameBengali: "অমিত রায়",
      role: "Business Owner",
      roleBengali: "ব্যবসায়ী",
      image:
        "https://img.rocket.new/generatedImages/rocket_gen_img_17572807e-1763296799754.png",
      alt: "Middle-aged man with beard wearing formal shirt looking confident",
      quoteBengali: "মোবাইল থেকে অর্ডার করা খুবই সহজ। সময় বাঁচে অনেক।",
      quoteEnglish: "Ordering from mobile is very easy. Saves a lot of time.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-bengali text-primary mb-4">
            গ্রাহকদের মতামত
          </h2>
          <p className="text-xl md:text-2xl font-heading text-muted-foreground">
            What Our Customers Say
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-lg shadow-warm hover-lift cultural-transition"
            >
              {/* Rating Stars */}
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Icon
                    key={i}
                    name="StarIcon"
                    size={20}
                    className="text-warning"
                    variant="solid"
                  />
                ))}
              </div>

              {/* Quote - Bengali */}
              <p className="text-base font-bengali text-foreground mb-4 leading-relaxed italic">
                "{testimonial.quoteBengali}"
              </p>

              {/* Quote - English */}
              <p className="text-sm font-body text-muted-foreground mb-6 leading-relaxed italic">
                "{testimonial.quoteEnglish}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <AppImage
                    src={testimonial.image}
                    alt={testimonial.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bengali text-lg font-semibold text-foreground">
                    {testimonial.nameBengali}
                  </p>
                  <p className="font-heading text-sm text-muted-foreground">
                    {testimonial.name}
                  </p>
                  <p className="font-bengali text-sm text-muted-foreground">
                    {testimonial.roleBengali}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-3 px-8 py-4 bg-trust text-trust-foreground rounded-lg shadow-warm">
            <Icon name="ShieldCheckIcon" size={32} />
            <div className="text-left">
              <p className="font-bengali text-xl font-semibold">
                ১০০০+ সন্তুষ্ট গ্রাহক
              </p>
              <p className="font-heading text-sm">1000+ Happy Customers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
