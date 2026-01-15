interface QualityMetricProps {
  icon: string;
  titleEnglish: string;
  titleBengali: string;
  value: string;
  description: string;
  descriptionBengali: string;
}

export default function QualityMetric({
  icon,
  titleEnglish,
  titleBengali,
  value,
  description,
  descriptionBengali,
}: QualityMetricProps) {
  return (
    <div className="bg-card rounded-xl p-6 shadow-warm hover-lift cultural-transition border border-border">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <span className="text-3xl">{icon}</span>
        </div>
        <div className="flex-1">
          <h3 className="font-bengali text-lg font-semibold text-foreground mb-1">
            {titleBengali}
          </h3>
          <div className="text-2xl font-bold text-primary mb-2">{value}</div>
          <p className="font-bengali text-sm text-foreground/80 mb-1">
            {descriptionBengali}
          </p>
        </div>
      </div>
    </div>
  );
}
