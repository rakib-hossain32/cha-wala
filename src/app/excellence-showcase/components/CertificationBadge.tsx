interface CertificationBadgeProps {
  name: string;
  nameBengali: string;
  issuer: string;
  issuerBengali: string;
  icon: string;
  year: string;
}

export default function CertificationBadge({
  name,
  nameBengali,
  issuer,
  issuerBengali,
  icon,
  year,
}: CertificationBadgeProps) {
  return (
    <div className="bg-card rounded-xl p-6 shadow-warm hover-lift cultural-transition border-2 border-primary/20 text-center">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-4xl">{icon}</span>
      </div>
      <h3 className="font-bengali text-base font-semibold text-foreground mb-1">
        {nameBengali}
      </h3>
      <p className="font-heading text-sm text-muted-foreground mb-3">{name}</p>
      <p className="font-bengali text-xs text-foreground/70 mb-1">
        {issuerBengali}
      </p>
      <p className="font-body text-xs text-muted-foreground mb-2">{issuer}</p>
      <div className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-heading font-semibold">
        {year}
      </div>
    </div>
  );
}
