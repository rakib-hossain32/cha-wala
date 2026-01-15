import AppImage from "../../../components/ui/AppImage";
import Icon from "../../../components/ui/AppIcon";

interface TestimonialCardProps {
  name: string;
  nameBengali: string;
  role: string;
  roleBengali: string;
  testimonial: string;
  testimonialBengali: string;
  image: string;
  imageAlt: string;
  rating: number;
}

const TestimonialCard = ({
  name,
  nameBengali,
  role,
  roleBengali,
  testimonial,
  testimonialBengali,
  image,
  imageAlt,
  rating,
}: TestimonialCardProps) => {
  return (
    <div className="bg-card border-2 border-border rounded-2xl p-8 shadow-warm hover-lift cultural-transition">
      <div className="flex items-start space-x-4 mb-6">
        <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
          <AppImage
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h4 className="text-xl font-bold font-bengali text-foreground">
            {nameBengali}
          </h4>
          <p className="text-sm font-bengali text-muted-foreground mt-1">
            {roleBengali}
          </p>
        </div>
      </div>

      {/* Rating Stars */}
      <div className="flex space-x-1 mb-4">
        {[...Array(5)].map((_, index) => (
          <Icon
            key={index}
            name="StarIcon"
            variant={index < rating ? "solid" : "outline"}
            size={20}
            className={
              index < rating ? "text-warning" : "text-muted-foreground"
            }
          />
        ))}
      </div>

      {/* Quote Icon */}
      <div className="mb-4">
        <Icon
          name="ChatBubbleLeftRightIcon"
          size={32}
          className="text-secondary/30"
        />
      </div>

      {/* Testimonial Text */}
      <blockquote className="space-y-3">
        <p className="text-base font-bengali text-foreground leading-relaxed italic">
          "{testimonialBengali}"
        </p>
      </blockquote>
    </div>
  );
};

export default TestimonialCard;
