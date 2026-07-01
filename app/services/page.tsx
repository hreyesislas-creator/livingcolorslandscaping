import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { QuoteCta } from "@/components/seo/quote-cta";

export const metadata: Metadata = buildMetadata({
  title: "Landscaping Services in Los Angeles | Living Colors",
  description:
    "Explore our full range of premium landscaping services across Greater Los Angeles — from landscape design and hardscape to turf, lighting and construction.",
  path: "/services",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

export default function ServicesHubPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <section className="relative isolate overflow-hidden bg-ink-950 pt-32 pb-14 sm:pt-40 sm:pb-16">
        <div className="absolute -left-40 top-24 h-[480px] w-[480px] rounded-full bg-moss-700/15 blur-[160px]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumbs} />
          <p className="mt-8 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-moss-300/90">
            <span className="inline-block h-px w-6 bg-moss-400/60" />
            Our services
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-balance text-4xl font-light leading-[1.02] tracking-[-0.025em] text-cream-50 sm:text-5xl lg:text-6xl">
            Premium landscaping,{" "}
            <span className="text-gradient-emerald italic">
              engineered end to end.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-cream-50/75">
            One accountable team for design, build and care — delivering
            resort-grade outdoor environments to the most discerning homes
            across Greater Los Angeles.
          </p>
        </div>
      </section>

      <section className="relative bg-ink-950 pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group relative isolate overflow-hidden rounded-3xl border border-white/8 bg-ink-800/40 transition-all duration-500 hover:border-white/20 hover:shadow-[0_30px_80px_-30px_rgba(44,150,85,0.5)]"
              >
                <div className="aspect-[4/3]">
                  <Image
                    src={s.image}
                    alt={`${s.name} in Los Angeles`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
                </div>
                <div className="p-6">
                  <h2 className="font-display text-xl font-light text-cream-50">
                    {s.name}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-cream-50/65">
                    {s.heroSubhead}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-moss-300">
                    Explore {s.name.toLowerCase()}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
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
