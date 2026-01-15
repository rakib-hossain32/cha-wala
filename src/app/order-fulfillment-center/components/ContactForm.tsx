"use client";

import { useState, useEffect } from "react";

import Icon from "../../../components/ui/AppIcon";

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
}

export default function ContactForm() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-lg shadow-warm p-6 border border-border">
        <h3 className="text-xl font-bengali font-bold text-primary mb-4">
          যোগাযোগ করুন
        </h3>
        <div className="space-y-4">
          <div className="h-12 bg-muted rounded animate-pulse"></div>
          <div className="h-12 bg-muted rounded animate-pulse"></div>
          <div className="h-12 bg-muted rounded animate-pulse"></div>
          <div className="h-32 bg-muted rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "নাম প্রয়োজন";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "ফোন নম্বর প্রয়োজন";
    } else if (!/^[0-9]{11}$/.test(formData.phone)) {
      newErrors.phone = "সঠিক ১১ ডিজিটের ফোন নম্বর দিন";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "সঠিক ইমেইল দিন";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", phone: "", email: "", message: "" });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-warm p-6 border border-border">
      <h3 className="text-xl font-bengali font-bold text-primary mb-2">
        যোগাযোগ করুন
      </h3>
      <p className="text-sm font-heading text-muted-foreground mb-6">
        আমাদের সাথে যোগাযোগ করুন
      </p>

      {submitSuccess && (
        <div className="mb-4 p-4 bg-success/10 border border-success rounded-lg flex items-center space-x-2">
          <Icon name="CheckCircleIcon" size={20} className="text-success" />
          <span className="text-success font-bengali">
            আপনার বার্তা পাঠানো হয়েছে!
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bengali font-semibold text-foreground mb-2">
            নাম <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            placeholder="আপনার নাম লিখুন"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-destructive">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-bengali font-semibold text-foreground mb-2">
            ফোন নম্বর <span className="text-destructive">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            placeholder="01XXXXXXXXX"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-destructive">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-bengali font-semibold text-foreground mb-2">
            ইমেইল (ঐচ্ছিক)
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            placeholder="আপনার ইমেইল@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-destructive">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-bengali font-semibold text-foreground mb-2">
            বার্তা (ঐচ্ছিক)
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none"
            placeholder="আপনার বার্তা লিখুন"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-bengali font-semibold cultural-transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
              <span>পাঠানো হচ্ছে...</span>
            </>
          ) : (
            <>
              <Icon name="PaperAirplaneIcon" size={20} />
              <span>বার্তা পাঠান</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
