import AppImage from "../../../components/ui/AppImage";


interface HeroSectionProps {
  title: string;
  titleBengali: string;
  subtitle: string;
  subtitleBengali: string;
  heroImage: string;
  heroImageAlt: string;
}

const HeroSection = ({
  title,
  titleBengali,
  subtitle,
  subtitleBengali,
  heroImage,
  heroImageAlt,
}: HeroSectionProps) => {
  return (
    <section className="relative w-full h-[60vh] min-h-[500px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <AppImage
          src={heroImage}
          alt={heroImageAlt}
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-background"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-4xl space-y-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-bengali text-primary-foreground leading-tight">
            {titleBengali}
          </h1>
          <p className="text-xl md:text-2xl font-bengali text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
            {subtitleBengali}
          </p>
        </div>

        {/* Decorative Steam Animation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
          <div
            className="w-2 h-8 bg-secondary/30 rounded-full animate-steam"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="w-2 h-8 bg-secondary/30 rounded-full animate-steam"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="w-2 h-8 bg-secondary/30 rounded-full animate-steam"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
