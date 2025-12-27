import type { Metadata } from "next";
import Header from "@/components/common/Header";
import ExcellenceShowcaseInteractive from "./components/ExcellenceShowcaseInteractive";

export const metadata: Metadata = {
  title: "Excellence Showcase - Chai Token",
  description:
    "Discover our commitment to quality through organic ingredients, traditional preparation methods, and certified excellence. Learn about our trusted suppliers and authentic Bengali tea culture.",
};

export default function ExcellenceShowcasePage() {
  return (
    <>
      <Header />
      <ExcellenceShowcaseInteractive />
    </>
  );
}
