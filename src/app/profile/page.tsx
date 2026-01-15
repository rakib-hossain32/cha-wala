"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProfileClient from "./components/ProfileClient";
import Icon from "../../components/ui/AppIcon";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/profile");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Icon name="ArrowPathIcon" size={48} className="animate-spin text-primary" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bengali font-black text-foreground mb-4">আমার প্রোফাইল</h1>
            <p className="text-muted-foreground font-bengali text-lg">আপনার অর্ডারের ইতিহাস এবং রিভিউ ম্যানেজ করুন</p>
        </div>
        
        <ProfileClient user={session.user} />
      </div>
    </div>
  );
}
