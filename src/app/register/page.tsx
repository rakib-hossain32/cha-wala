"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে।");
      } else {
        router.push(`/login?registered=true${callbackUrl ? `&callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`);
      }
    } catch (err) {
      setError("একটি ত্রুটি ঘটেছে। দয়া করে আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-card p-8 rounded-2xl shadow-xl border border-border">
        <div className="text-center">
          <h2 className="text-3xl font-bengali font-bold text-primary">নতুন অ্যাকাউন্ট</h2>
          <p className="mt-2 text-muted-foreground font-heading">চা ওয়ালা পরিবারে আপনাকে স্বাগতম</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-2 rounded-lg text-sm font-medium">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                পুরো নাম
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-input focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                placeholder="আপনার নাম"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                ইমেইল এড্রেস
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-input focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                placeholder="আপনার ইমেইল"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
                পাসওয়ার্ড
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-input focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                placeholder="একটি শক্তিশালী পাসওয়ার্ড দিন"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "রেজিস্ট্রেশন হচ্ছে..." : "রেজিস্টার করুন"}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline transition-all">
              লগইন করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}
