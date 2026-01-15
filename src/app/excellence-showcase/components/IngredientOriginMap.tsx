"use client";

import { useState, useEffect } from "react";

interface MapLocation {
  name: string;
  nameBengali: string;
  lat: number;
  lng: number;
  ingredient: string;
  ingredientBengali: string;
}

interface IngredientOriginMapProps {
  locations: MapLocation[];
}

export default function IngredientOriginMap({
  locations,
}: IngredientOriginMapProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(
    null
  );

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-xl p-6 shadow-warm border border-border">
        <div className="h-96 bg-muted rounded-lg animate-pulse" />
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-warm border border-border">
      <div className="p-6 bg-primary/5 border-b border-border">
        <h3 className="font-bengali text-xl font-semibold text-foreground mb-1">
          উপাদানের উৎস মানচিত্র
        </h3>
      </div>
      <div className="grid lg:grid-cols-3 gap-6 p-6">
        <div className="lg:col-span-2">
          <div className="relative h-96 bg-muted rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Ingredient Origins"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=23.8103,90.4125&z=8&output=embed"
              className="border-0"
            />
          </div>
        </div>
        <div className="space-y-3">
          {locations.map((location, index) => (
            <button
              key={index}
              onClick={() => setSelectedLocation(location)}
              className={`w-full text-left p-4 rounded-lg cultural-transition ${
                selectedLocation?.name === location.name
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl">📍</span>
                <div className="flex-1">
                  <h4 className="font-bengali text-sm font-semibold mb-1">
                    {location.nameBengali}
                  </h4>
                  <p className="font-bengali text-xs opacity-90">
                    {location.ingredientBengali}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}