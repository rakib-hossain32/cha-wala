import Icon from "@/components/ui/AppIcon";

interface TokenDisplayProps {
  tokenNumber: string;
  estimatedTime: string;
}

export default function TokenDisplay({
  tokenNumber,
  estimatedTime,
}: TokenDisplayProps) {
  return (
    <div className="bg-gradient-to-br from-primary to-secondary rounded-lg shadow-warm-lg p-8 text-center">
      <div className="mb-4">
        <Icon
          name="TicketIcon"
          size={48}
          className="text-primary-foreground mx-auto"
        />
      </div>

      <h2 className="text-3xl font-bengali font-bold text-primary-foreground mb-2">
        আপনার টোকেন নম্বর
      </h2>
      <p className="text-sm font-heading text-primary-foreground opacity-90 mb-6">
        Your Token Number
      </p>

      <div className="bg-background rounded-lg p-6 mb-6">
        <div className="text-6xl font-bold text-primary mb-2">
          {tokenNumber}
        </div>
        <div className="text-sm text-muted-foreground font-heading">
          Token #{tokenNumber}
        </div>
      </div>

      <div className="flex items-center justify-center space-x-2 text-primary-foreground">
        <Icon name="ClockIcon" size={20} />
        <span className="font-bengali font-semibold">
          আনুমানিক সময়: {estimatedTime}
        </span>
      </div>
      <p className="text-sm font-heading text-primary-foreground opacity-90 mt-1">
        Estimated Time: {estimatedTime}
      </p>
    </div>
  );
}
