
import Icon from "../../../components/ui/AppIcon";

interface PreparationStepProps {
  stepNumber: number;
  icon: string;
  title: string;
  titleBengali: string;
  description: string;
  descriptionBengali: string;
}

const PreparationStep = ({
  stepNumber,
  icon,
  title,
  titleBengali,
  description,
  descriptionBengali,
}: PreparationStepProps) => {
  return (
    <div className="relative bg-card border-2 border-border rounded-2xl p-6 shadow-warm hover-lift cultural-transition">
      {/* Step Number Badge */}
      <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl shadow-warm-sm">
        {stepNumber}
      </div>

      <div className="flex items-start space-x-4 mt-2">
        <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name={icon as any} size={32} className="text-secondary" />
        </div>
        <div className="flex-1 space-y-2">
          <h4 className="text-xl font-bold font-bengali text-foreground">
            {titleBengali}
          </h4>
          <p className="text-sm font-bengali text-foreground leading-relaxed">
            {descriptionBengali}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PreparationStep;
