import Icon from "../../../components/ui/AppIcon";

interface Instruction {
  step: number;
  title: string;
  titleBengali: string;
  description: string;
  descriptionBengali: string;
  icon: string;
}

interface OrderInstructionsProps {
  instructions: Instruction[];
}

export default function OrderInstructions({
  instructions,
}: OrderInstructionsProps) {
  return (
    <div className="bg-card rounded-lg shadow-warm p-6 border border-border">
      <h3 className="text-xl font-bengali font-bold text-primary mb-2">
        কীভাবে অর্ডার করবেন
      </h3>
      <p className="text-sm font-heading text-muted-foreground mb-6">
        অর্ডার করার ধাপসমূহ
      </p>

      <div className="space-y-6">
        {instructions.map((instruction) => (
          <div key={instruction.step} className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Icon
                name={instruction.icon as any}
                size={24}
                className="text-primary-foreground"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm font-bold text-primary">
                  ধাপ {instruction.step}
                </span>
              </div>
              <h4 className="font-bengali font-semibold text-foreground mb-1">
                {instruction.titleBengali}
              </h4>
              <p className="text-sm font-heading text-muted-foreground mb-2">
                {instruction.titleBengali}
              </p>
              <p className="text-sm text-foreground">
                {instruction.descriptionBengali}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
