import type { Metadata } from "next";
import { QuoteSection } from "@/components/quote-section";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Start Your Smart Quote | Living Colors Landscape",
  description:
    "Get a tailored landscaping plan in about 90 seconds. Answer a few guided questions and a senior specialist reviews your Los Angeles project — free, no pressure.",
  path: "/quote",
});

export default function QuotePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Smart Quote", path: "/quote" },
        ])}
      />
      <div className="pt-16">
        <QuoteSection />
      </div>
    </>
  );
}
