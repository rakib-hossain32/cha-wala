
import Icon from "../../../components/ui/AppIcon";

interface CulturalValueCardProps {
  icon: string;
  title: string;
  titleBengali: string;
  description: string;
  descriptionBengali: string;
}

const CulturalValueCard = ({
  icon,
  title,
  titleBengali,
  description,
  descriptionBengali,
}: CulturalValueCardProps) => {
  return (
    <div className="bg-card border-2 border-border rounded-2xl p-8 shadow-warm hover-lift cultural-transition">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon name={icon as any} size={40} className="text-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold font-bengali text-foreground">
            {titleBengali}
          </h3>
        </div>
        <p className="text-base font-bengali text-foreground leading-relaxed">
          {descriptionBengali}
        </p>
      </div>
    </div>
  );
};

export default CulturalValueCard;
