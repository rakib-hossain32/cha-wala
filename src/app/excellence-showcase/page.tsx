import type { Metadata } from "next";

import ExcellenceShowcaseInteractive from "./components/ExcellenceShowcaseInteractive";

export const metadata: Metadata = {
  title: "উৎকর্ষতা - চা ওয়ালা",
  description:
    "জৈব উপাদান, ঐতিহ্যবাহী প্রস্তুতি পদ্ধতি এবং প্রত্যয়িত উৎকর্ষতার মাধ্যমে আমাদের মান প্রতিশ্রুতি আবিষ্কার করুন। আমাদের বিশ্বস্ত সরবরাহকারী এবং খাঁটি বাংলার চা সংস্কৃতি সম্পর্কে জানুন।",
};

export default function ExcellenceShowcasePage() {
  return (
    <>
    
      <ExcellenceShowcaseInteractive />
    </>
  );
}
