import Icon from "@/components/ui/AppIcon";

interface DaySchedule {
  day: string;
  dayBengali: string;
  hours: string;
  isToday: boolean;
}

interface OpeningHoursProps {
  schedule: DaySchedule[];
}

export default function OpeningHours({ schedule }: OpeningHoursProps) {
  return (
    <div className="bg-card rounded-lg shadow-warm p-6 border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="ClockIcon" size={28} className="text-primary" />
        <div>
          <h3 className="text-xl font-bengali font-bold text-primary">
            খোলার সময়
          </h3>
          <p className="text-sm font-heading text-muted-foreground">
            Opening Hours
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {schedule.map((day, index) => (
          <div
            key={index}
            className={`flex justify-between items-center py-3 px-4 rounded-lg cultural-transition ${
              day.isToday ? "bg-primary text-primary-foreground" : "bg-muted"
            }`}
          >
            <div>
              <p
                className={`font-bengali font-semibold ${
                  day.isToday ? "text-primary-foreground" : "text-foreground"
                }`}
              >
                {day.dayBengali}
              </p>
              <p
                className={`text-sm font-heading ${
                  day.isToday
                    ? "text-primary-foreground opacity-90"
                    : "text-muted-foreground"
                }`}
              >
                {day.day}
              </p>
            </div>
            <span
              className={`font-heading font-semibold ${
                day.isToday ? "text-primary-foreground" : "text-foreground"
              }`}
            >
              {day.hours}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
