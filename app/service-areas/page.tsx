import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { cities } from "@/lib/cities";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { QuoteCta } from "@/components/seo/quote-cta";

export const metadata: Metadata = buildMetadata({
  title: "Service Areas | Los Angeles Landscaping | Living Colors",
  description:
    "Living Colors Landscape serves the most sought-after communities across Greater Los Angeles — from Beverly Hills and Malibu to Pasadena and Palos Verdes.",
  path: "/service-areas",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Service Areas", path: "/service-areas" },
];

export default function ServiceAreasHubPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <section className="relative isolate overflow-hidden bg-ink-950 pt-32 pb-14 sm:pt-40 sm:pb-16">
        <div className="absolute -right-40 top-24 h-[480px] w-[480px] rounded-full bg-moss-700/15 blur-[160px]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumbs} />
          <p className="mt-8 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-moss-300/90">
            <span className="inline-block h-px w-6 bg-moss-400/60" />
            Areas served
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-balance text-4xl font-light leading-[1.02] tracking-[-0.025em] text-cream-50 sm:text-5xl lg:text-6xl">
            Landscaping across{" "}
            <span className="text-gradient-emerald italic">
              Greater Los Angeles.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-cream-50/75">
            We focus on the neighborhoods where design, privacy and craft matter
            most — bringing local knowledge of terrain, climate and architectural
            review to every project.
          </p>
        </div>
      </section>

      <section className="relative bg-ink-950 pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((c) => (
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
                  <h2 className="font-display mt-3 text-2xl font-light text-cream-50">
                    {c.name}
                  </h2>
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
      </section>

      <section className="relative bg-ink-950 pb-24 pt-6 sm:pb-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <QuoteCta />
        </div>
      </section>
    </>
  );
}
