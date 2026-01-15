"use client";

import { useState, useEffect } from "react";

import Icon from "../../../components/ui/AppIcon";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemTitle: string;
}

const ShareModal = ({ isOpen, onClose, itemTitle }: ShareModalProps) => {
  const [copied, setCopied] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated || !isOpen) return null;

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const socialPlatforms = [
    {
      name: "Facebook",
      nameBengali: "ফেসবুক",
      icon: "ShareIcon",
      color: "bg-blue-600",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "Twitter",
      nameBengali: "টুইটার",
      icon: "ChatBubbleLeftRightIcon",
      color: "bg-sky-500",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(itemTitle)}`,
    },
    {
      name: "WhatsApp",
      nameBengali: "হোয়াটসঅ্যাপ",
      icon: "ChatBubbleOvalLeftEllipsisIcon",
      color: "bg-green-600",
      url: `https://wa.me/?text=${encodeURIComponent(itemTitle + " " + shareUrl)}`,
    },
    {
      name: "Email",
      nameBengali: "ইমেইল",
      icon: "EnvelopeIcon",
      color: "bg-gray-600",
      url: `mailto:?subject=${encodeURIComponent(itemTitle)}&body=${encodeURIComponent(shareUrl)}`,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm">
      <div className="bg-card rounded-2xl shadow-2xl max-w-md w-full p-6 cultural-transition">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bengali text-xl font-bold text-foreground">
              শেয়ার করুন
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted cultural-transition"
          >
            <Icon name="XMarkIcon" size={24} className="text-foreground" />
          </button>
        </div>

        {/* Social Platforms */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {socialPlatforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                flex items-center space-x-3 p-4 rounded-xl cultural-transition hover:scale-105
                ${platform.color} text-white shadow-warm-sm
              `}
            >
              <Icon name={platform.icon as any} size={24} />
              <span className="font-bengali text-sm font-semibold">
                {platform.nameBengali}
              </span>
            </a>
          ))}
        </div>

        {/* Copy Link */}
        <div className="p-4 bg-muted rounded-xl">
          <label className="font-bengali text-sm font-semibold text-foreground mb-2 block">
            লিংক কপি করুন
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 px-4 py-2 bg-card border border-border rounded-lg font-heading text-sm text-foreground"
            />
            <button
              onClick={handleCopyLink}
              className={`
                px-4 py-2 rounded-lg font-bengali font-semibold cultural-transition
                ${
                  copied
                    ? "bg-success text-success-foreground"
                    : "bg-primary text-primary-foreground hover:scale-105"
                }
              `}
            >
              {copied ? "কপি হয়েছে!" : "কপি করুন"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
