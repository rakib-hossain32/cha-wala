import type { Metadata } from "next";
import Header from "@/components/common/Header";
import OrderFulfillmentInteractive from "./components/OrderFulfillmentInteractive";

export const metadata: Metadata = {
  title: "Order Fulfillment Center - Chai Token",
  description:
    "Complete your tea order, receive your token number, and connect with us. Token generation, contact forms, location details, and multiple customer support channels for seamless service.",
};

export default function OrderFulfillmentCenterPage() {
  return (
    <>
      <Header />
      <OrderFulfillmentInteractive />
    </>
  );
}
