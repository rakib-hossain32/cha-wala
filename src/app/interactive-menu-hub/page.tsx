import type { Metadata } from "next";
import Header from "@/components/common/Header";
import MenuInteractive from "./components/MenuInteractive";

export const metadata: Metadata = {
  title: "Interactive Menu Hub - Chai Token",
  description:
    "Explore our authentic collection of traditional Bengali chai, snacks, and sweets. Smart ordering system with real-time cart management and token-based service for seamless tea house experience.",
};

export default function InteractiveMenuHubPage() {
  return (
    <>
      <Header />
      <MenuInteractive />
    </>
  );
}
