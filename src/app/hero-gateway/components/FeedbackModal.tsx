"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Icon from "../../../components/ui/AppIcon";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  productId?: string;
}

export default function FeedbackModal({ isOpen, onClose, onSuccess, productId }: FeedbackModalProps) {
  const { data: session, status } = useSession();
  const [rating, setRating] = useState(5);
  const [testimonial, setTestimonial] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;
    
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: session.user?.name,
          email: session.user?.email,
          nameBengali: session.user?.name,
          role: role || "Customer",
          roleBengali: role || "গ্রাহক",
          rating,
          testimonial,
          testimonialBengali: testimonial,
          image: session.user?.image || "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
          productId: productId || null,
        }),
      });

      if (!res.ok) {
        throw new Error("আপনার মতামত জমা দেওয়া সম্ভব হয়নি।");
      }

      onSuccess();
      onClose();
      setTestimonial("");
      setRole("");
      setRating(5);
    } catch (err: any) {
      setError(err.message || "একটি ত্রুটি ঘটেছে।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-card w-full max-w-lg rounded-3xl shadow-2xl border border-border overflow-hidden transform animate-in zoom-in-95 duration-300">
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bengali font-bold text-primary">আপনার মতামত দিন</h3>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
              <Icon name="XMarkIcon" size={24} />
            </button>
          </div>

          {status === "unauthenticated" ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="LockClosedIcon" size={32} className="text-primary" />
              </div>
              <p className="text-muted-foreground font-bengali mb-6">
                মতামত দিতে আপনাকে অবশ্যই লগইন করতে হবে।
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-xl font-bold font-bengali"
              >
                লগইন করুন
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-xl font-bengali">
                  {error}
                </div>
              )}

              <div className="flex flex-col items-center gap-2 mb-4">
                <p className="text-sm font-bengali text-muted-foreground">রেটিং দিন</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <Icon
                        name="StarIcon"
                        size={32}
                        className={star <= rating ? "text-warning" : "text-muted-foreground/30"}
                        variant="solid"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bengali font-semibold text-foreground mb-2">আপনার পেশা (ঐচ্ছিক)</label>
                <div className="space-y-3">
                  <select
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-bengali cursor-pointer"
                    value={role === "" || ["ছাত্র", "শিক্ষক", "ব্যবসায়ী", "চাকরিজীবী", "ফ্রিল্যান্সার", "গৃহিণী"].includes(role) ? role : "Other"}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "Other") {
                        setRole("Other"); // Will trigger showing the custom input
                      } else {
                        setRole(value);
                      }
                    }}
                  >
                    <option value="">নির্বাচন করুন</option>
                    <option value="ছাত্র">ছাত্র / ছাত্রী</option>
                    <option value="শিক্ষক">শিক্ষক</option>
                    <option value="ব্যবসায়ী">ব্যবসায়ী</option>
                    <option value="চাকরিজীবী">চাকরিজীবী</option>
                    <option value="ফ্রিল্যান্সার">ফ্রিল্যান্সার</option>
                    <option value="গৃহিণী">গৃহিণী</option>
                    <option value="Other">অন্যান্য</option>
                  </select>

                  {(role === "Other" || (!["", "ছাত্র", "শিক্ষক", "ব্যবসায়ী", "চাকরিজীবী", "ফ্রিল্যান্সার", "গৃহিণী"].includes(role))) && (
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-bengali animate-in fade-in slide-in-from-top-2 duration-300"
                      placeholder="আপনার পেশা এখানে লিখুন..."
                      value={role === "Other" ? "" : role}
                      onChange={(e) => setRole(e.target.value)}
                      autoFocus
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bengali font-semibold text-foreground mb-2">আপনার মতামত *</label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-bengali resize-none"
                  placeholder="আমাদের চা এবং সার্ভিস সম্পর্কে কিছু লিখুন..."
                  value={testimonial}
                  onChange={(e) => setTestimonial(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading || !testimonial}
                className="w-full py-4 bg-primary text-white rounded-xl font-bold font-bengali shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
                ) : (
                  <>
                    <Icon name="PaperAirplaneIcon" size={20} />
                    মতামত জমা দিন
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
