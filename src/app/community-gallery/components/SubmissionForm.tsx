// Updated SubmissionForm with Rating and Role support
import { useState } from "react";

import Icon from "../../../components/ui/AppIcon";

interface SubmissionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SubmissionData) => void;
}

export interface SubmissionData {
  name: string;
  email: string;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  role?: string; // New field for testimonials
  rating?: number; // New field for testimonials
}

const SubmissionForm = ({ isOpen, onClose, onSubmit }: SubmissionFormProps) => {
  const [formData, setFormData] = useState<SubmissionData>({
    name: "",
    email: "",
    category: "moments",
    title: "",
    description: "",
    imageUrl: "",
    role: "Customer",
    rating: 5,
  });

  const [errors, setErrors] = useState<Partial<SubmissionData>>({});

  if (!isOpen) return null;

  const categories = [
    { value: "moments", label: "মুহূর্ত" },
    { value: "testimonials", label: "প্রশংসাপত্র" },
    { value: "events", label: "ইভেন্ট" },
    { value: "culture", label: "সংস্কৃতি" },
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<SubmissionData> = {};

    if (!formData.name.trim()) newErrors.name = "নাম আবশ্যক";
    if (!formData.email.trim()) newErrors.email = "ইমেইল আবশ্যক";

    // For testimonials, title functions as summary/headline, but description is the main text
    // We can keep title required or optional depending on design, keeping it required for consistency
    if (!formData.title.trim()) newErrors.title = "শিরোনাম আবশ্যক";

    if (!formData.description.trim()) newErrors.description = "বর্ণনা আবশ্যক";

    // Image URL might be optional for testimonials if we use initials or placeholders
    // But keeping it required for now as per original design
    if (!formData.imageUrl.trim()) newErrors.imageUrl = "ছবির লিংক আবশ্যক";

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
        role: "Customer",
        rating: 5,
      });
      onClose();
    }
  };

  const handleChange = (
    field: keyof SubmissionData,
    value: string | number
  ) => {
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
              আমাদের সম্প্রদায়ের সাথে আপনার গল্প শেয়ার করুন
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
              নাম *
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
              placeholder="আপনার নাম লিখুন"
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
              ইমেইল *
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
              placeholder="আপনার ইমেইল লিখুন"
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
              বিভাগ *
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg font-heading text-foreground focus:outline-none focus:ring-2 focus:ring-primary cultural-transition"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Dynamic Fields for Testimonials */}
          {formData.category === "testimonials" && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-bengali text-sm font-semibold text-foreground mb-2 block">
                  ভূমিকা
                </label>
                <input
                  type="text"
                  value={formData.role || ""}
                  onChange={(e) => handleChange("role", e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg font-heading text-foreground focus:outline-none focus:ring-2 focus:ring-primary cultural-transition"
                  placeholder="উদাহরণ: ছাত্র, খাদ্যপ্রেমী"
                />
              </div>
              <div>
                <label className="font-bengali text-sm font-semibold text-foreground mb-2 block">
                  রেটিং (1-5)
                </label>
                <select
                  value={formData.rating || 5}
                  onChange={(e) =>
                    handleChange("rating", parseInt(e.target.value))
                  }
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg font-heading text-foreground focus:outline-none focus:ring-2 focus:ring-primary cultural-transition"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
                  <option value={4}>⭐⭐⭐⭐ (4)</option>
                  <option value={3}>⭐⭐⭐ (3)</option>
                  <option value={2}>⭐⭐ (2)</option>
                  <option value={1}>⭐ (1)</option>
                </select>
              </div>
            </div>
          )}

          {/* Title - Contextual label */}
          <div>
            <label className="font-bengali text-sm font-semibold text-foreground mb-2 block">
              {formData.category === "testimonials"
                ? "শিরোনাম / সারাংশ *"
                : "শিরোনাম *"}
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
              placeholder={
                formData.category === "testimonials"
                  ? "আপনার মন্তব্যের সারাংশ লিখুন"
                  : "আপনার কাহিনীর শিরোনাম লিখুন"
              }
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
              {formData.category === "testimonials"
                ? "আপনার মতামত *"
                : "বর্ণনা *"}
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
              placeholder={
                formData.category === "testimonials"
                  ? "আপনি কী পছন্দ করেছেন তা বলুন..."
                  : "আপনার অভিজ্ঞতা আমাদের সঙ্গে শেয়ার করুন..."
              }
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
              {formData.category === "testimonials"
                ? "আপনার ছবি (লিংক) *"
                : "ছবির লিংক *"}
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
              placeholder="ছবির লিংক দিন (https://example.com/image.jpg)"
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
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-muted text-foreground rounded-lg font-heading font-semibold cultural-transition hover:bg-muted/80"
            >
              বাতিল
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmissionForm;
