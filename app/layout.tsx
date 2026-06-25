import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Header } from "@/components/header";
import { MobileCtaBar } from "@/components/travel/mobile-cta-bar";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? "http://localhost:3000"),
  title: {
    default: "MyVibeMyTrip.com | Compatibility-Based Group Travel",
    template: "%s | MyVibeMyTrip.com"
  },
  description:
    "A smart group travel platform that matches travelers by vibe, personality, budget, and travel style for Sikkim, Darjeeling, and beyond.",
  openGraph: {
    title: "MyVibeMyTrip.com",
    description: "Travel with people who match your vibe.",
    url: "/",
    siteName: "MyVibeMyTrip.com",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white font-sans text-navy antialiased">
        <Header />
        {children}
        <MobileCtaBar />
      </body>
    </html>
  );
}
