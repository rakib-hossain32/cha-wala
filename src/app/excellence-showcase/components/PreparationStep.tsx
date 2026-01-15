interface PreparationStepProps {
  step: number;
  titleEnglish: string;
  titleBengali: string;
  description: string;
  descriptionBengali: string;
  icon: string;
  time: string;
  timeBengali: string;
}

export default function PreparationStep({
  step,
  titleEnglish,
  titleBengali,
  description,
  descriptionBengali,
  icon,
  time,
  timeBengali,
}: PreparationStepProps) {
  return (
    <div className="relative">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-heading font-bold text-lg">
            {step}
          </div>
        </div>
        <div className="flex-1 bg-card rounded-xl p-6 shadow-warm border border-border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{icon}</span>
              <div>
                <h3 className="font-bengali text-lg font-semibold text-foreground">
                  {titleBengali}
                </h3>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bengali text-sm font-semibold text-primary">
                {timeBengali}
              </p>
            </div>
          </div>
          <p className="font-bengali text-sm text-foreground/80 mb-2">
            {descriptionBengali}
          </p>
        </div>
      </div>
    </div>
  );
}
