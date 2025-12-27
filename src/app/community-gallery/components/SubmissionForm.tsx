"use client";

import { useState } from "react";
import Icon from "@/components/ui/AppIcon";

interface SubmissionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SubmissionData) => void;
}

interface SubmissionData {
  name: string;
  email: string;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
}

const SubmissionForm = ({ isOpen, onClose, onSubmit }: SubmissionFormProps) => {
  const [formData, setFormData] = useState<SubmissionData>({
    name: "",
    email: "",
    category: "moments",
    title: "",
    description: "",
    imageUrl: "",
  });

  const [errors, setErrors] = useState<Partial<SubmissionData>>({});

  if (!isOpen) return null;

  const categories = [
    { value: "moments", label: "মুহূর্ত", labelEn: "Moments" },
    { value: "testimonials", label: "প্রশংসাপত্র", labelEn: "Testimonials" },
    { value: "events", label: "ইভেন্ট", labelEn: "Events" },
    { value: "culture", label: "সংস্কৃতি", labelEn: "Culture" },
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<SubmissionData> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.imageUrl.trim()) newErrors.imageUrl = "Image URL is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        name: "",
        email: "",
        category: "moments",
        title: "",
        description: "",
        imageUrl: "",
      });
      onClose();
    }
  };

  const handleChange = (field: keyof SubmissionData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-card rounded-2xl shadow-2xl max-w-2xl w-full p-6 my-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bengali text-2xl font-bold text-foreground">
              আপনার গল্প শেয়ার করুন
            </h3>
            <p className="font-heading text-sm text-muted-foreground">
              Share Your Story with Our Community
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted cultural-transition"
          >
            <Icon name="XMarkIcon" size={24} className="text-foreground" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="font-bengali text-sm font-semibold text-foreground mb-2 block">
              নাম • Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={`
                w-full px-4 py-3 bg-background border rounded-lg font-heading text-foreground
                focus:outline-none focus:ring-2 focus:ring-primary cultural-transition
                ${errors.name ? "border-error" : "border-border"}
              `}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-error font-heading">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="font-bengali text-sm font-semibold text-foreground mb-2 block">
              ইমেইল • Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`
                w-full px-4 py-3 bg-background border rounded-lg font-heading text-foreground
                focus:outline-none focus:ring-2 focus:ring-primary cultural-transition
                ${errors.email ? "border-error" : "border-border"}
              `}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-error font-heading">
                {errors.email}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="font-bengali text-sm font-semibold text-foreground mb-2 block">
              বিভাগ • Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg font-heading text-foreground focus:outline-none focus:ring-2 focus:ring-primary cultural-transition"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label} • {cat.labelEn}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="font-bengali text-sm font-semibold text-foreground mb-2 block">
              শিরোনাম • Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className={`
                w-full px-4 py-3 bg-background border rounded-lg font-heading text-foreground
                focus:outline-none focus:ring-2 focus:ring-primary cultural-transition
                ${errors.title ? "border-error" : "border-border"}
              `}
              placeholder="Give your story a title"
            />
            {errors.title && (
              <p className="mt-1 text-xs text-error font-heading">
                {errors.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="font-bengali text-sm font-semibold text-foreground mb-2 block">
              বর্ণনা • Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={4}
              className={`
                w-full px-4 py-3 bg-background border rounded-lg font-heading text-foreground
                focus:outline-none focus:ring-2 focus:ring-primary cultural-transition resize-none
                ${errors.description ? "border-error" : "border-border"}
              `}
              placeholder="Share your experience with our community..."
            />
            {errors.description && (
              <p className="mt-1 text-xs text-error font-heading">
                {errors.description}
              </p>
            )}
          </div>

          {/* Image URL */}
          <div>
            <label className="font-bengali text-sm font-semibold text-foreground mb-2 block">
              ছবির URL • Image URL *
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => handleChange("imageUrl", e.target.value)}
              className={`
                w-full px-4 py-3 bg-background border rounded-lg font-heading text-foreground
                focus:outline-none focus:ring-2 focus:ring-primary cultural-transition
                ${errors.imageUrl ? "border-error" : "border-border"}
              `}
              placeholder="https://example.com/image.jpg"
            />
            {errors.imageUrl && (
              <p className="mt-1 text-xs text-error font-heading">
                {errors.imageUrl}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex items-center space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-conversion text-conversion-foreground rounded-lg font-heading font-semibold cultural-transition hover:scale-105 shadow-warm-sm"
            >
              <Icon name="PaperAirplaneIcon" size={20} />
              <span className="font-bengali">জমা দিন</span>
              <span>Submit</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-muted text-foreground rounded-lg font-heading font-semibold cultural-transition hover:bg-muted/80"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmissionForm;
