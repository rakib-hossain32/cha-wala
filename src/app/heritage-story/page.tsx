import type { Metadata } from "next";
import Header from "@/components/common/Header";
import HeritageInteractive from "./components/HeritageInteractive";

export const metadata: Metadata = {
  title: "Heritage Story - Chai Token",
  description:
    "Discover the rich cultural heritage of Bengali tea traditions and how Chai Token preserves authentic chai-making methods while embracing modern innovation.",
};

export default function HeritageStoryPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeritageInteractive />
    </main>
  );
}
