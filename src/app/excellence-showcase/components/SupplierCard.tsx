import AppImage from "../../../components/ui/AppImage";


interface SupplierCardProps {
  name: string;
  nameBengali: string;
  location: string;
  locationBengali: string;
  specialty: string;
  specialtyBengali: string;
  image: string;
  alt: string;
  partnership: string;
  partnershipBengali: string;
}

export default function SupplierCard({
  name,
  nameBengali,
  location,
  locationBengali,
  specialty,
  specialtyBengali,
  image,
  alt,
  partnership,
  partnershipBengali,
}: SupplierCardProps) {
  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-warm hover-lift cultural-transition border border-border">
      <div className="relative h-48 overflow-hidden">
        <AppImage
          src={image}
          alt={alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-heading font-semibold">
          {partnership}
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-bengali text-xl font-semibold text-foreground mb-1">
          {nameBengali}
        </h3>
        <div className="flex items-start space-x-2 mb-3">
          <span className="text-lg">📍</span>
          <div>
            <p className="font-bengali text-sm text-foreground">
              {locationBengali}
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <span className="text-lg">🌿</span>
          <div>
            <p className="font-bengali text-sm text-foreground">
              {specialtyBengali}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
