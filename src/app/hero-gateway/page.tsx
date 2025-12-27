import type { Metadata } from "next";
import HeroGatewayInteractive from "./components/HeroGatewayInteractive";

export const metadata: Metadata = {
  title: "Hero Gateway - Chai Token",
  description:
    "Experience the soul of Bengali tea culture where every cup carries stories, conversations, and connections. Discover authentic chai with modern convenience through our innovative token-based ordering system.",
};

export default function HeroGatewayPage() {
  return <HeroGatewayInteractive />;
}
