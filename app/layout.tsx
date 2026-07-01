import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/seo/json-ld";
import {
  siteConfig,
  buildMetadata,
  organizationSchema,
  localBusinessSchema,
} from "@/lib/seo";

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
  metadataBase: new URL(siteConfig.url),
  ...buildMetadata({
    title: `${siteConfig.name} — Premium Los Angeles Landscaping`,
    description:
      "Luxury landscape design, hardscape, turf, irrigation and outdoor living across Greater Los Angeles — planned through a fast, guided Smart Quote.",
    path: "/",
  }),
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
        <JsonLd data={[organizationSchema(), localBusinessSchema()]} />
        <Navigation />
        <main className="relative overflow-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
