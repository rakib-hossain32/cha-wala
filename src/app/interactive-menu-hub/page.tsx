import type { Metadata } from "next";

import MenuInteractive from "./components/MenuInteractive";

export const metadata: Metadata = {
  title: "মেনু - চা ওয়ালা",
  description:
    "ঐতিহ্যবাহী বাংলার চা, নাস্তা এবং মিষ্টির খাঁটি সংগ্রহ অন্বেষণ করুন। স্মার্ট অর্ডারিং সিস্টেম এবং রিয়েল-টাইম কার্ট ম্যানেজমেন্ট সহ নিরবচ্ছিন্ন চা ঘরের অভিজ্ঞতা।",
};

export default function InteractiveMenuHubPage() {
  return (
    <>
   
      <MenuInteractive />
    </>
  );
}
