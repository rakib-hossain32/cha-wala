"use client";

import Icon from "../../../components/ui/AppIcon";
interface Quote {
  id: number;
  quote: string;
  quoteBengali: string;
  author: string;
  authorBengali: string;
}

interface CulturalQuoteProps {
  quote: Quote;
}

const CulturalQuote = ({ quote }: CulturalQuoteProps) => {
  return (
    <div className="relative bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-xl p-8 shadow-warm">
      {/* Decorative Quote Icon */}
      <div className="absolute top-4 left-4 opacity-20">
        <Icon
          name="ChatBubbleBottomCenterTextIcon"
          size={48}
          className="text-primary"
        />
      </div>

      {/* Quote Content */}
      <div className="relative z-10">
        <blockquote className="mb-6 font-bengali">
          <p className="font-bengali text-xl md:text-2xl font-bold text-foreground leading-relaxed mb-4 accent-text">
            "{quote.quoteBengali}"
          </p>
        </blockquote>

        {/* Author Attribution */}
        <div className="flex items-center space-x-3 pt-4 border-t border-border">
          <Icon name="UserCircleIcon" size={32} className="text-primary" />
          <div>
            <p className="font-bengali text-base font-semibold text-foreground">
              — {quote.authorBengali}
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Pattern */}
      <div className="absolute bottom-4 right-4 opacity-10">
        <Icon name="SparklesIcon" size={40} className="text-accent" />
      </div>
    </div>
  );
};

export default CulturalQuote;
