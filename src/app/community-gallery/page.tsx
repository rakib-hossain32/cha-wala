import type { Metadata } from "next";

import CommunityGalleryInteractive from "./components/CommunityGalleryInteractive";

export const metadata: Metadata = {
  title: "কমিউনিটি - চা ওয়ালা",
  description:
    "আমাদের চা-প্রেমী কমিউনিটির খাঁটি মুহূর্ত, প্রশংসাপত্র এবং সাংস্কৃতিক গল্প অন্বেষণ করুন। আপনার নিজস্ব চা অভিজ্ঞতা শেয়ার করুন এবং সহকর্মী চা উৎসাহীদের সাথে সংযুক্ত হন।",
};

export default function CommunityGalleryPage() {
  return (
    <>
    
      <main className="pt-16">
        <CommunityGalleryInteractive />
      </main>
    </>
  );
}
