import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  ClipboardList,
  Compass,
  Gem,
  Hammer,
  MessageSquare,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import data from "@/lib/data/why-living-colors.json";
import { buildMetadata, breadcrumbSchema, faqPageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PageFaq } from "@/components/seo/page-faq";
import { QuoteCta } from "@/components/seo/quote-cta";

interface TrustContent {
  seoTitle: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  heroSubhead: string;
  intro: string[];
  pillars: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
}

const content = data as TrustContent;

export const metadata: Metadata = buildMetadata({
  title: content.seoTitle,
  description: content.metaDescription,
  path: "/why-living-colors",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Why Living Colors", path: "/why-living-colors" },
];

const pillarIcons = [
  Compass,
  Hammer,
  Gem,
  MessageSquare,
  ClipboardList,
  ShieldCheck,
  BadgeCheck,
  Sparkles,
];

const trustSignals = [
  { k: "18+", v: "Years of experience" },
  { k: "Licensed", v: "Bonded & insured" },
  { k: "10-yr", v: "Workmanship warranty" },
  { k: "Senior", v: "Specialist on every project" },
];

export default function WhyLivingColorsPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), faqPageSchema(content.faqs)]} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink-950 pt-32 pb-14 sm:pt-40 sm:pb-16">
        <div className="absolute -right-40 top-24 h-[480px] w-[480px] rounded-full bg-moss-700/15 blur-[160px]" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumbs} />
          <p className="mt-8 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-moss-300/90">
            <span className="inline-block h-px w-6 bg-moss-400/60" />
            {content.eyebrow}
          </p>
          <h1 className="font-display mt-4 text-balance text-4xl font-light leading-[1.02] tracking-[-0.025em] text-cream-50 sm:text-5xl lg:text-6xl">
            {content.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-cream-50/75">
            {content.heroSubhead}
          </p>
        </div>
      </section>

      {/* Trust signals */}
      <section className="relative bg-ink-950 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {trustSignals.map((s) => (
              <div key={s.v} className="glass rounded-2xl p-5">
                <p className="font-display text-2xl font-light tracking-tight text-cream-50 sm:text-3xl">
                  {s.k}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-cream-50/55 sm:text-xs">
                  {s.v}
                </p>
              </div>
            ))}
          </div>
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

      {/* Pillars */}
      <section className="relative bg-ink-950 py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {content.pillars.map((p, i) => {
              const Icon = pillarIcons[i % pillarIcons.length];
              return (
                <div
                  key={p.title}
                  className="rounded-2xl border border-white/8 bg-gradient-to-br from-ink-800/40 to-ink-900/40 p-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-moss-400/40 bg-moss-500/15 text-moss-200">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <h2 className="mt-4 text-base font-medium text-cream-50">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-cream-50/65">
                    {p.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="relative bg-ink-950 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/services"
              className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-cream-50/85 transition hover:border-moss-400/40 hover:text-cream-50"
            >
              Our services
            </Link>
            <Link
              href="/project-types"
              className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-cream-50/85 transition hover:border-moss-400/40 hover:text-cream-50"
            >
              Project types
            </Link>
            <Link
              href="/service-areas"
              className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-cream-50/85 transition hover:border-moss-400/40 hover:text-cream-50"
            >
              Areas we serve
            </Link>
            <Link
              href="/inspiration-gallery"
              className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-cream-50/85 transition hover:border-moss-400/40 hover:text-cream-50"
            >
              Inspiration gallery
            </Link>
            <Link
              href="/luxury-landscaping-los-angeles"
              className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-cream-50/85 transition hover:border-moss-400/40 hover:text-cream-50"
            >
              Luxury landscaping in LA
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative bg-ink-950 py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <PageFaq items={content.faqs} heading="What clients ask before starting" />
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
