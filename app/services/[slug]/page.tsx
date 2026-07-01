import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, MapPin, Sparkles } from "lucide-react";
import {
  getService,
  getServicesBySlugs,
  services,
} from "@/lib/services";
import { cities } from "@/lib/cities";
import {
  buildMetadata,
  breadcrumbSchema,
  serviceSchema,
  faqPageSchema,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PageFaq } from "@/components/seo/page-faq";
import { QuoteCta } from "@/components/seo/quote-cta";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.seoTitle,
    description: service.metaDescription,
    path: `/services/${slug}`,
    image: service.image,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = getServicesBySlugs(service.relatedSlugs);
  const path = `/services/${slug}`;
  const featuredCities = cities.slice(0, 8);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.name, path },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          serviceSchema({
            name: service.name,
            description: service.metaDescription,
            path,
            image: service.image,
          }),
          faqPageSchema(service.faqs),
        ]}
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink-950 pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="absolute -left-40 top-24 h-[480px] w-[480px] rounded-full bg-moss-700/15 blur-[160px]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumbs} />
          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <p className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-moss-300/90">
                <span className="inline-block h-px w-6 bg-moss-400/60" />
                {service.eyebrow}
              </p>
              <h1 className="font-display mt-4 text-balance text-4xl font-light leading-[1.02] tracking-[-0.025em] text-cream-50 sm:text-5xl lg:text-6xl">
                {service.h1}
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-cream-50/75">
                {service.heroSubhead}
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
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-sm font-medium text-cream-50 backdrop-blur transition hover:border-white/40"
                >
                  All services
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="relative aspect-[5/6] overflow-hidden rounded-3xl border border-white/8">
              <Image
                src={service.image}
                alt={`${service.name} by Living Colors Landscape in Los Angeles`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="relative bg-ink-950 py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 text-pretty text-lg leading-relaxed text-cream-50/75">
            {service.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section className="relative bg-ink-950 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-light tracking-[-0.02em] text-cream-50 sm:text-4xl">
            What&apos;s included
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.offerings.map((o) => (
              <div
                key={o.title}
                className="rounded-2xl border border-white/8 bg-gradient-to-br from-ink-800/40 to-ink-900/40 p-6"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-moss-400/40 bg-moss-500/15 text-moss-200">
                  <Check className="h-4 w-4" />
                </div>
                <h3 className="mt-4 text-base font-medium text-cream-50">
                  {o.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cream-50/65">
                  {o.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative bg-ink-950 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <h2 className="font-display text-3xl font-light leading-[1.1] tracking-[-0.02em] text-cream-50 sm:text-4xl">
              Why homeowners choose{" "}
              <span className="text-gradient-emerald italic">Living Colors</span>
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {service.benefits.map((b) => (
                <div key={b.title}>
                  <h3 className="text-base font-medium text-cream-50">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream-50/65">
                    {b.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related services + cities (internal linking) */}
      <section className="relative bg-ink-950 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-light tracking-[-0.02em] text-cream-50 sm:text-3xl">
                Related services
              </h2>
              <ul className="mt-6 space-y-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/services/${r.slug}`}
                      className="group flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.02] px-5 py-4 transition hover:border-moss-400/40 hover:bg-white/[0.04]"
                    >
                      <span className="text-cream-50/90">{r.name}</span>
                      <ArrowRight className="h-4 w-4 text-moss-300 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-2xl font-light tracking-[-0.02em] text-cream-50 sm:text-3xl">
                {service.name} across Los Angeles
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative bg-ink-950 py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <PageFaq items={service.faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-ink-950 pb-24 pt-6 sm:pb-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <QuoteCta
            title={`Ready to start your ${service.name.toLowerCase()} project?`}
          />
        </div>
      </section>
    </>
  );
}
