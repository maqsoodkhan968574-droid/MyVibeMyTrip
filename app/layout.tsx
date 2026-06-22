import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? "http://localhost:3000"),
  title: {
    default: "Rivanta Realty | Building Trust, Creating Homes",
    template: "%s | Rivanta Realty"
  },
  description:
    "Rivanta Realty helps you buy, rent, and sell verified premium homes with trusted agents and personal executive guidance.",
  openGraph: {
    title: "Rivanta Realty",
    description: "Building Trust, Creating Homes.",
    url: "/",
    siteName: "Rivanta Realty",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-white text-navy antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
