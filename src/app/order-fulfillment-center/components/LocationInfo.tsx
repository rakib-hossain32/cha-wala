import Icon from "../../../components/ui/AppIcon";

interface LocationInfoProps {
  address: string;
  addressBengali: string;
  phone: string;
  email: string;
  latitude: number;
  longitude: number;
}

export default function LocationInfo({
  address,
  addressBengali,
  phone,
  email,
  latitude,
  longitude,
}: LocationInfoProps) {
  return (
    <div className="bg-card rounded-lg shadow-warm overflow-hidden border border-border">
      <div className="aspect-video w-full">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="চা ওয়ালা লোকেশন"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
          className="border-0"
        />
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-start space-x-3">
          <Icon
            name="MapPinIcon"
            size={24}
            className="text-primary flex-shrink-0 mt-1"
          />
          <div>
            <p className="font-bengali font-semibold text-foreground">
              {addressBengali}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Icon
            name="PhoneIcon"
            size={24}
            className="text-primary flex-shrink-0"
          />
          <a
            href={`tel:${phone}`}
            className="font-heading text-foreground hover:text-primary cultural-transition"
          >
            {phone}
          </a>
        </div>

        <div className="flex items-center space-x-3">
          <Icon
            name="EnvelopeIcon"
            size={24}
            className="text-primary flex-shrink-0"
          />
          <a
            href={`mailto:${email}`}
            className="font-heading text-foreground hover:text-primary cultural-transition"
          >
            {email}
          </a>
        </div>
      </div>
    </div>
  );
}
