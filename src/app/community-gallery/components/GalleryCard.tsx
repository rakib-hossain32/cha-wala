"use client";

import { useState } from "react";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

interface GalleryItem {
  id: number;
  image: string;
  alt: string;
  category: string;
  title: string;
  titleBengali: string;
  description: string;
  descriptionBengali: string;
  author: string;
  authorBengali: string;
  date: string;
  likes: number;
  shares: number;
}

interface GalleryCardProps {
  item: GalleryItem;
  onShare: (id: number) => void;
  onLike: (id: number) => void;
}

const GalleryCard = ({ item, onShare, onLike }: GalleryCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(item.id);
  };

  return (
    <div className="group relative bg-card rounded-xl overflow-hidden shadow-warm hover-lift">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <AppImage
          src={item.image}
          alt={item.alt}
          className="w-full h-full object-cover cultural-transition group-hover:scale-110"
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 px-3 py-1.5 bg-primary/90 backdrop-blur-sm rounded-full">
          <span className="font-bengali text-xs text-primary-foreground font-semibold">
            {item.category}
          </span>
        </div>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent opacity-0 group-hover:opacity-100 cultural-transition flex items-end justify-between p-4">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center space-x-2 px-4 py-2 bg-card/90 backdrop-blur-sm rounded-lg cultural-transition hover:bg-card"
          >
            <Icon
              name="InformationCircleIcon"
              size={20}
              className="text-primary"
            />
            <span className="font-heading text-sm font-semibold text-foreground">
              Details
            </span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleLike}
              className={`
                p-2.5 rounded-lg backdrop-blur-sm cultural-transition
                ${isLiked ? "bg-error/90 text-error-foreground" : "bg-card/90 text-foreground hover:bg-card"}
              `}
            >
              <Icon
                name="HeartIcon"
                size={20}
                variant={isLiked ? "solid" : "outline"}
              />
            </button>

            <button
              onClick={() => onShare(item.id)}
              className="p-2.5 bg-card/90 backdrop-blur-sm rounded-lg cultural-transition hover:bg-card text-foreground"
            >
              <Icon name="ShareIcon" size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <div className="mb-3">
          <h3 className="font-bengali text-lg font-bold text-foreground mb-1">
            {item.titleBengali}
          </h3>
          <p className="font-heading text-sm text-muted-foreground">
            {item.title}
          </p>
        </div>

        {showDetails && (
          <div className="mb-4 p-4 bg-muted rounded-lg cultural-transition">
            <p className="font-bengali text-sm text-foreground mb-2 leading-relaxed">
              {item.descriptionBengali}
            </p>
            <p className="font-heading text-xs text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </div>
        )}

        {/* Author & Stats */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex flex-col">
            <span className="font-bengali text-sm font-semibold text-foreground">
              {item.authorBengali}
            </span>
            <span className="font-heading text-xs text-muted-foreground">
              {item.author}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Icon
                name="HeartIcon"
                size={16}
                variant={isLiked ? "solid" : "outline"}
              />
              <span className="font-heading text-xs">
                {item.likes + (isLiked ? 1 : 0)}
              </span>
            </div>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Icon name="ShareIcon" size={16} />
              <span className="font-heading text-xs">{item.shares}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
