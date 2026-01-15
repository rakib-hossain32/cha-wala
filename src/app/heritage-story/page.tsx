import type { Metadata } from "next";

import HeritageInteractive from "./components/HeritageInteractive";

export const metadata: Metadata = {
  title: "ঐতিহ্য - চা ওয়ালা",
  description:
    "বাংলার চা ঐতিহ্যের সমৃদ্ধ সাংস্কৃতিক ইতিহাস আবিষ্কার করুন এবং কীভাবে চা ওয়ালা আধুনিক উদ্ভাবনের সাথে খাঁটি চা তৈরির পদ্ধতি সংরক্ষণ করে।",
};

export default function HeritageStoryPage() {
  return (
    <main className="min-h-screen">
    
      <HeritageInteractive />
    </main>
  );
}
