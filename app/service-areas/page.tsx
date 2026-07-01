import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { cities, cityRegions, getCitiesBySlugs } from "@/lib/cities";
import { buildMetadata, breadcrumbSchema, faqPageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PageFaq } from "@/components/seo/page-faq";
import { QuoteCta } from "@/components/seo/quote-cta";

export const metadata: Metadata = buildMetadata({
  title: "Areas We Serve | Los Angeles Landscaping | Living Colors",
  description:
    "Premium landscape design-build across Greater Los Angeles — the Westside, beach cities, Palos Verdes, the Conejo Valley hills and the San Gabriel Valley.",
  path: "/service-areas",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Areas We Serve", path: "/service-areas" },
];

const faqs = [
  {
    q: "Which Los Angeles communities do you serve?",
    a: "We focus on premium residential communities across Greater Los Angeles — the Westside, the beach cities, the Palos Verdes Peninsula, the Conejo Valley and the San Gabriel Valley. You can browse every city we serve below and open a dedicated page for local details.",
  },
  {
    q: "My city isn't listed — can you still help?",
    a: "Often, yes. Our Phase 1 city pages cover the communities we're asked about most, but we regularly take on projects in neighboring areas. Start a Smart Quote and we'll confirm coverage for your exact address right away.",
  },
  {
    q: "Do you work within gated and HOA communities?",
    a: "Yes. We're experienced with architectural review boards, HOA design guidelines and gated-community access and staging requirements, and we prepare the documentation these communities expect before work begins.",
  },
  {
    q: "Are you licensed and insured throughout the region?",
    a: "We are fully licensed, bonded and insured, and we carry the coverage required for high-value residential work across Los Angeles County and neighboring jurisdictions. Documentation is shared before any project starts.",
  },
];

export default function ServiceAreasHubPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), faqPageSchema(faqs)]} />

      <section className="relative isolate overflow-hidden bg-ink-950 pt-32 pb-14 sm:pt-40 sm:pb-16">
        <div className="absolute -right-40 top-24 h-[480px] w-[480px] rounded-full bg-moss-700/15 blur-[160px]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumbs} />
          <p className="mt-8 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-moss-300/90">
            <span className="inline-block h-px w-6 bg-moss-400/60" />
            Areas we serve
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-balance text-4xl font-light leading-[1.02] tracking-[-0.025em] text-cream-50 sm:text-5xl lg:text-6xl">
            Local knowledge across{" "}
            <span className="text-gradient-emerald italic">
              Greater Los Angeles.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-cream-50/75">
            Every region of LA has its own terrain, microclimate and design
            language. We bring local fluency — from coastal salt air and fire-wise
            hillsides to HOA review and heritage-tree stewardship — to every
            community we serve.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream-50/60">
            <span>{cities.length} communities</span>
            <span className="text-cream-50/25">•</span>
            <span>{cityRegions.length} regions</span>
            <span className="text-cream-50/25">•</span>
            <span>Licensed &amp; insured</span>
          </div>
        </div>
      </section>

      {/* Grouped regions */}
      <section className="relative bg-ink-950 pb-8">
        <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
          {cityRegions.map((region) => {
            const regionCities = getCitiesBySlugs(region.citySlugs);
            return (
              <div key={region.name}>
                <div className="flex flex-col gap-2 border-b border-white/8 pb-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="font-display text-2xl font-light tracking-[-0.02em] text-cream-50 sm:text-3xl">
                      {region.name}
                    </h2>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-cream-50/60">
                      {region.blurb}
                    </p>
                  </div>
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-moss-300/80">
                    {regionCities.length}{" "}
                    {regionCities.length === 1 ? "community" : "communities"}
                  </span>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {regionCities.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/service-areas/${c.slug}`}
                      className="group flex flex-col justify-between rounded-2xl border border-white/8 bg-gradient-to-br from-ink-800/40 to-ink-900/40 p-6 transition hover:border-moss-400/40 hover:from-ink-800/60"
                    >
                      <div>
                        <div className="flex items-center gap-2 text-moss-300">
                          <MapPin className="h-4 w-4" />
                          <span className="text-[11px] font-medium uppercase tracking-[0.18em]">
                            {c.county}
                          </span>
                        </div>
                        <h3 className="font-display mt-3 text-2xl font-light text-cream-50">
                          {c.name}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-cream-50/60">
                          {c.heroSubhead}
                        </p>
                      </div>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-moss-300">
                        View {c.name}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="relative bg-ink-950 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <PageFaq items={faqs} heading="Serving Greater Los Angeles" />
        </div>
      </section>

      <section className="relative bg-ink-950 pb-24 sm:pb-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <QuoteCta />
        </div>
      </section>
    </>
  );
}
