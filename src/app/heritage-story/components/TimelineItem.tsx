import AppImage from "../../../components/ui/AppImage";
import Icon from "../../../components/ui/AppIcon";

interface TimelineItemProps {
  year: string;
  yearBengali: string;
  title: string;
  titleBengali: string;
  description: string;
  descriptionBengali: string;
  image: string;
  imageAlt: string;
  isLeft: boolean;
}

const TimelineItem = ({
  year,
  yearBengali,
  title,
  titleBengali,
  description,
  descriptionBengali,
  image,
  imageAlt,
  isLeft,
}: TimelineItemProps) => {
  return (
    <div
      className={`flex flex-col md:flex-row items-center gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      {/* Image Side */}
      <div className="w-full md:w-1/2">
        <div className="relative overflow-hidden rounded-2xl shadow-warm hover-lift">
          <AppImage
            src={image}
            alt={imageAlt}
            className="w-full h-80 object-cover"
          />
          <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-warm-sm">
            <p className="text-2xl font-bold font-bengali">{yearBengali}</p>
          </div>
        </div>
      </div>

      {/* Content Side */}
      <div className="w-full md:w-1/2 space-y-4">
        <div className="flex items-center space-x-3">
          <Icon name="ClockIcon" size={32} className="text-secondary" />
          <div>
            <h3 className="text-3xl font-bold font-bengali text-foreground">
              {titleBengali}
            </h3>
          </div>
        </div>
        <p className="text-lg font-bengali text-foreground leading-relaxed">
          {descriptionBengali}
        </p>
      </div>
    </div>
  );
};

export default TimelineItem;
