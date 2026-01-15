"use client";

import Icon from "../../../components/ui/AppIcon";
interface GalleryFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const GalleryFilters = ({
  activeFilter,
  onFilterChange,
}: GalleryFiltersProps) => {
  const filters = [
    { id: "all", label: "সব", labelEn: "All", icon: "Squares2X2Icon" },
    { id: "moments", label: "মুহূর্ত", labelEn: "Moments", icon: "CameraIcon" },
    {
      id: "testimonials",
      label: "প্রশংসাপত্র",
      labelEn: "Testimonials",
      icon: "ChatBubbleLeftRightIcon",
    },
    { id: "events", label: "ইভেন্ট", labelEn: "Events", icon: "CalendarIcon" },
    {
      id: "culture",
      label: "সংস্কৃতি",
      labelEn: "Culture",
      icon: "SparklesIcon",
    },
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`
            flex items-center space-x-2 px-4 py-2.5 rounded-lg cultural-transition
            ${
              activeFilter === filter.id
                ? "bg-primary text-primary-foreground shadow-warm-sm"
                : "bg-card text-foreground hover:bg-muted border border-border"
            }
          `}
        >
          <Icon name={filter.icon as any} size={20} />
          <span className="font-bengali font-semibold text-sm">
            {filter.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default GalleryFilters;
