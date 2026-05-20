import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { brand } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

export const metadata: Metadata = {
  title: `${brand.name} — Premium Outdoor Transformations`,
  description:
    "Luxury landscape design, hardscape, turf, irrigation and outdoor living projects with a fast, modern quote experience.",
  openGraph: {
    title: `${brand.name} — Premium Outdoor Transformations`,
    description:
      "Luxury landscape design, hardscape, turf, irrigation and outdoor living projects.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#07100b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen bg-ink-950 text-cream-50 antialiased">
        <Navigation />
        <main className="relative overflow-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
