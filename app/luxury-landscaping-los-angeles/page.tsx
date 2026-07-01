import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import data from "@/lib/data/luxury-la.json";
import { getServicesBySlugs } from "@/lib/services";
import { cities } from "@/lib/cities";
import {
  buildMetadata,
  breadcrumbSchema,
  faqPageSchema,
  serviceSchema,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PageFaq } from "@/components/seo/page-faq";
import { QuoteCta } from "@/components/seo/quote-cta";

interface LuxuryContent {
  seoTitle: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  heroSubhead: string;
  intro: string[];
  sections: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
}

const content = data as LuxuryContent;
const path = "/luxury-landscaping-los-angeles";

export const metadata: Metadata = buildMetadata({
  title: content.seoTitle,
  description: content.metaDescription,
  path,
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Luxury Landscaping Los Angeles", path },
];

const featuredServices = getServicesBySlugs([
  "landscape-design",
  "hardscape",
  "outdoor-living",
  "landscape-construction",
]);

const featuredCities = cities.slice(0, 10);

export default function LuxuryLandscapingPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          serviceSchema({
            name: "Luxury Landscaping in Los Angeles",
            description: content.metaDescription,
            path,
            image: "/images/hero/hero.jpg",
          }),
          faqPageSchema(content.faqs),
        ]}
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink-950 pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero.jpg"
            alt="Luxury landscaped estate in Los Angeles at golden hour"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/85 to-ink-950" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumbs} />
          <p className="mt-8 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-moss-300/90">
            <span className="inline-block h-px w-6 bg-moss-400/60" />
            {content.eyebrow}
          </p>
          <h1 className="font-display mt-4 text-balance text-4xl font-light leading-[1.02] tracking-[-0.025em] text-cream-50 sm:text-5xl lg:text-[64px]">
            {content.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-cream-50/80">
            {content.heroSubhead}
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="relative bg-ink-950 py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 text-pretty text-lg leading-relaxed text-cream-50/75">
            {content.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="relative bg-ink-950 py-10 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {content.sections.map((s, i) => (
              <div
                key={s.title}
                className="grid gap-3 border-t border-white/8 pt-8 lg:grid-cols-[0.5fr_1fr]"
              >
                <div className="flex items-start gap-3">
                  <span className="font-display text-2xl font-light text-moss-300/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display text-2xl font-light leading-tight tracking-[-0.02em] text-cream-50">
                    {s.title}
                  </h2>
                </div>
                <p className="text-pretty leading-relaxed text-cream-50/70">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature services */}
      <section className="relative bg-ink-950 py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-light tracking-[-0.02em] text-cream-50 sm:text-4xl">
            Signature capabilities
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group relative isolate overflow-hidden rounded-2xl border border-white/8"
              >
                <div className="aspect-[4/3]">
                  <Image
                    src={s.image}
                    alt={`${s.name} for luxury Los Angeles homes`}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-cream-50">
                    {s.name}
                  </span>
                  <ArrowRight className="h-4 w-4 text-moss-300 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Communities */}
      <section className="relative bg-ink-950 py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-light tracking-[-0.02em] text-cream-50 sm:text-3xl">
            Where we build
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {featuredCities.map((c) => (
              <Link
                key={c.slug}
                href={`/service-areas/${c.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-cream-50/85 transition hover:border-moss-400/40 hover:text-cream-50"
              >
                <MapPin className="h-3.5 w-3.5 text-moss-300" />
                {c.name}
              </Link>
            ))}
            <Link
              href="/service-areas"
              className="inline-flex items-center gap-1.5 rounded-full border border-moss-400/30 bg-moss-500/10 px-4 py-2 text-sm text-moss-200 transition hover:bg-moss-500/20"
            >
              All areas
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/project-types/luxury-estates"
              className="inline-flex items-center gap-1.5 rounded-full border border-moss-400/30 bg-moss-500/10 px-4 py-2 text-sm text-moss-200 transition hover:bg-moss-500/20"
            >
              Luxury estates
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative bg-ink-950 py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <PageFaq items={content.faqs} heading="Luxury landscaping in Los Angeles" />
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-ink-950 pb-24 pt-6 sm:pb-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <QuoteCta />
        </div>
      </section>
    </>
  );
}
