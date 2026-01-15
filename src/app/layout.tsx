import React from "react";
import "./globals.css";
import SmoothScroll from "../components/providers/SmoothScroll";
import AuthProvider from "../components/providers/AuthProvider";
import LayoutContent from "../components/common/LayoutContent";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "চা ওয়ালা - বাংলার চায়ের স্বাদ",
  description: "প্রতিটি কাপে বাংলার ঐতিহ্য এবং আধুনিক সুবিধা। চা ওয়ালা - আপনার প্রিয় চায়ের গন্তব্য।",
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body>
        <AuthProvider>
          <SmoothScroll>
            <LayoutContent>
              {children}
            </LayoutContent>
          </SmoothScroll>
        </AuthProvider>

        {/* <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fchaitoken4593back.builtwithrocket.new&_be=https%3A%2F%2Fapplication.rocket.new&_v=0.1.12" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" /> */}
      </body>
    </html>
  );
}
