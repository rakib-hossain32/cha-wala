import type { Metadata } from "next";

import OrderFulfillmentInteractive from "./components/OrderFulfillmentInteractive";

export const metadata: Metadata = {
  title: "অর্ডার করুন - চা ওয়ালা",
  description:
    "আপনার চায়ের অর্ডার সম্পূর্ণ করুন, আপনার টোকেন নম্বর পান এবং আমাদের সাথে সংযুক্ত হন। টোকেন জেনারেশন, যোগাযোগ ফর্ম, অবস্থান বিবরণ এবং নিরবচ্ছিন্ন সেবার জন্য একাধিক গ্রাহক সহায়তা চ্যানেল।",
};

export default function OrderFulfillmentCenterPage() {
  return (
    <>
    
      <OrderFulfillmentInteractive />
    </>
  );
}
