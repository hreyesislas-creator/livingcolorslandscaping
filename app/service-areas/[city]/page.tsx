import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import {
  getCity,
  getCitiesBySlugs,
  cities,
} from "@/lib/cities";
import { getServicesBySlugs } from "@/lib/services";
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
import { ExploreBand } from "@/components/seo/explore-band";

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) return {};
  return buildMetadata({
    title: city.seoTitle,
    description: city.metaDescription,
    path: `/service-areas/${slug}`,
  });
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const topServices = getServicesBySlugs(city.topServiceSlugs);
  const nearby = getCitiesBySlugs(city.nearbySlugs);
  const path = `/service-areas/${slug}`;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Service Areas", path: "/service-areas" },
    { name: city.name, path },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          serviceSchema({
            name: `Landscaping in ${city.name}`,
            description: city.metaDescription,
            path,
          }),
          faqPageSchema(city.faqs),
        ]}
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink-950 pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="absolute -right-40 top-24 h-[480px] w-[480px] rounded-full bg-moss-700/15 blur-[160px]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumbs} />
          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <p className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-moss-300/90">
                <MapPin className="h-3.5 w-3.5" />
                {city.eyebrow}
              </p>
              <h1 className="font-display mt-4 text-balance text-4xl font-light leading-[1.02] tracking-[-0.025em] text-cream-50 sm:text-5xl lg:text-6xl">
                {city.h1}
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-cream-50/75">
                {city.heroSubhead}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/quote"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-cream-50 px-7 py-4 text-sm font-medium text-ink-900 transition hover:bg-cream-100"
                >
                  <Sparkles className="h-4 w-4 text-moss-700" />
                  Start your Smart Quote
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/service-areas"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-sm font-medium text-cream-50 backdrop-blur transition hover:border-white/40"
                >
                  All areas
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="relative aspect-[5/6] overflow-hidden rounded-3xl border border-white/8">
              <Image
                src="/images/areas/areas.jpg"
                alt={`Premium landscaping in ${city.name}, ${city.county}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
              <div className="absolute inset-x-5 bottom-5">
                <div className="glass rounded-2xl p-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-moss-300/90">
                    Serving
                  </p>
                  <p className="font-display mt-1 text-xl font-light text-cream-50">
                    {city.name}, {city.county}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="relative bg-ink-950 py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 text-pretty text-lg leading-relaxed text-cream-50/75">
            {city.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Local context */}
      <section className="relative bg-ink-950 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display max-w-2xl text-3xl font-light leading-[1.1] tracking-[-0.02em] text-cream-50 sm:text-4xl">
            Built for how {city.name} landscapes actually live
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {city.localContext.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/8 bg-gradient-to-br from-ink-800/40 to-ink-900/40 p-6"
              >
                <h3 className="text-base font-medium text-moss-200">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream-50/65">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          {city.neighborhoods.length > 0 && (
            <div className="mt-10 rounded-2xl border border-white/8 bg-white/[0.02] px-6 py-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-moss-300/90">
                Neighborhoods we serve in {city.name}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {city.neighborhoods.map((n) => (
                  <span
                    key={n}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-sm text-cream-50/80"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Top services in this city (internal linking) */}
      <section className="relative bg-ink-950 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-light tracking-[-0.02em] text-cream-50 sm:text-4xl">
            Most requested in {city.name}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {topServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group relative isolate overflow-hidden rounded-2xl border border-white/8"
              >
                <div className="aspect-[4/3]">
                  <Image
                    src={s.image}
                    alt={`${s.name} in ${city.name}`}
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
          <Link
            href="/services"
            className="mt-8 inline-flex items-center gap-2 text-sm text-moss-300 underline-offset-4 hover:underline"
          >
            Explore all services
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Explore more (cross-linking) */}
      <section className="relative bg-ink-950 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-8 text-2xl font-light tracking-[-0.02em] text-cream-50 sm:text-3xl">
            Explore more in {city.name}
          </h2>
          <ExploreBand />
        </div>
      </section>

      {/* FAQ */}
      <section className="relative bg-ink-950 py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <PageFaq
            items={city.faqs}
            heading={`${city.name} landscaping questions`}
          />
        </div>
      </section>

      {/* Nearby areas + CTA */}
      <section className="relative bg-ink-950 pb-24 pt-6 sm:pb-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {nearby.length > 0 && (
            <div className="mb-14">
              <h2 className="font-display text-2xl font-light tracking-[-0.02em] text-cream-50 sm:text-3xl">
                Nearby communities
              </h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {nearby.map((n) => (
                  <Link
                    key={n.slug}
                    href={`/service-areas/${n.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-cream-50/85 transition hover:border-moss-400/40 hover:text-cream-50"
                  >
                    <MapPin className="h-3.5 w-3.5 text-moss-300" />
                    {n.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
          <QuoteCta
            title={`Transform your ${city.name} property`}
            subtitle={`Tell us about your space and a senior specialist will build a tailored plan for your ${city.name} home — free and in about 90 seconds.`}
          />
        </div>
      </section>
    </>
  );
}
