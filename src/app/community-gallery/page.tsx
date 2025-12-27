import type { Metadata } from "next";
import Header from "@/components/common/Header";
import CommunityGalleryInteractive from "./components/CommunityGalleryInteractive";

export const metadata: Metadata = {
  title: "Community Gallery - Chai Token",
  description:
    "Explore authentic moments, testimonials, and cultural stories from our chai-loving community. Share your own chai experiences and connect with fellow tea enthusiasts.",
};

export default function CommunityGalleryPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <CommunityGalleryInteractive />
      </main>
    </>
  );
}
