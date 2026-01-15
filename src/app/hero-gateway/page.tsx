import type { Metadata } from "next";
import HeroGatewayInteractive from "./components/HeroGatewayInteractive";

export const metadata: Metadata = {
  title: "চা ওয়ালা - বাংলার চায়ের স্বাদ",
  description:
    "বাংলার চা সংস্কৃতির আত্মা অনুভব করুন যেখানে প্রতিটি কাপে রয়েছে গল্প, কথোপকথন এবং সংযোগ। আধুনিক সুবিধার সাথে খাঁটি চায়ের স্বাদ আবিষ্কার করুন।",
};

export default function HeroGatewayPage() {
  return <HeroGatewayInteractive />;
}
