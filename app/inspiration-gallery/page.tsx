import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { getServicesBySlugs } from "@/lib/services";
import { getCitiesBySlugs } from "@/lib/cities";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { QuoteCta } from "@/components/seo/quote-cta";

export const metadata: Metadata = buildMetadata({
  title: "Inspiration Gallery | LA Landscaping | Living Colors",
  description:
    "Explore ideas for backyards, front yards, outdoor living, turf, pavers and landscape lighting — with premium projects from across Greater Los Angeles.",
  path: "/inspiration-gallery",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Inspiration Gallery", path: "/inspiration-gallery" },
];

interface GallerySection {
  id: string;
  title: string;
  blurb: string;
  images: { src: string; alt: string }[];
  serviceSlugs: string[];
  citySlugs: string[];
}

const sections: GallerySection[] = [
  {
    id: "backyard",
    title: "Backyard Renovations",
    blurb:
      "Resort-grade backyards built for entertaining, family life and effortless evenings outdoors.",
    images: [
      { src: "/images/final-cta/final-cta.jpg", alt: "Luxury landscaped backyard at dusk in Los Angeles" },
      { src: "/images/before-after/project-03/after.jpg", alt: "Malibu resort-style backyard with travertine pavers and turf lounge" },
      { src: "/images/before-after/project-01/after.jpg", alt: "Beverly Hills backyard pool surround with premium turf and lighting" },
    ],
    serviceSlugs: ["outdoor-living", "hardscape", "landscape-construction"],
    citySlugs: ["beverly-hills", "malibu"],
  },
  {
    id: "front-yard",
    title: "Front Yard Transformations",
    blurb:
      "Architectural curb appeal — clean lines, layered planting and entrances that set the tone for the whole home.",
    images: [
      { src: "/images/before-after/project-02/after.jpg", alt: "Modern Pacific Palisades front yard with desert planting and pavers" },
      { src: "/images/services/landscape-design.jpg", alt: "Bespoke front-yard landscape design in Los Angeles" },
      { src: "/images/areas/areas.jpg", alt: "Premium Los Angeles estate front landscape at dusk" },
    ],
    serviceSlugs: ["landscape-design", "pavers", "irrigation"],
    citySlugs: ["pacific-palisades", "san-marino"],
  },
  {
    id: "outdoor-living",
    title: "Outdoor Living Spaces",
    blurb:
      "Pergolas, kitchens, fire features and lounges — rooms without walls, tailored to the California climate.",
    images: [
      { src: "/images/services/outdoor-living.jpg", alt: "Outdoor living space with pergola and lounge in Los Angeles" },
      { src: "/images/before-after/project-03/after.jpg", alt: "Malibu outdoor lounge with fire feature and putting green" },
      { src: "/images/hero/hero.jpg", alt: "Luxury Los Angeles estate with outdoor living at golden hour" },
    ],
    serviceSlugs: ["outdoor-living", "hardscape", "outdoor-lighting"],
    citySlugs: ["beverly-hills", "brentwood"],
  },
  {
    id: "turf",
    title: "Artificial Turf",
    blurb:
      "Photo-real, showroom-grade turf that stays perfect year-round — ideal for play areas, pet runs and water-savvy lawns.",
    images: [
      { src: "/images/services/artificial-turf.jpg", alt: "Flawless artificial turf lawn installation in Los Angeles" },
      { src: "/images/before-after/project-01/after.jpg", alt: "Beverly Hills yard with premium artificial turf and pool surround" },
    ],
    serviceSlugs: ["artificial-turf", "landscape-construction", "maintenance"],
    citySlugs: ["hidden-hills", "calabasas"],
  },
  {
    id: "pavers",
    title: "Pavers & Hardscape",
    blurb:
      "Designer driveways, patios and walkways laid on engineered bases — structural craft that lasts decades.",
    images: [
      { src: "/images/services/pavers.jpg", alt: "Designer paver driveway with precise install lines in Los Angeles" },
      { src: "/images/before-after/project-02/after.jpg", alt: "Modern entry pavers and CorTen edging in Pacific Palisades" },
      { src: "/images/services/hardscape.jpg", alt: "Structural hardscape walls and fire feature in Los Angeles" },
    ],
    serviceSlugs: ["pavers", "hardscape", "landscape-construction"],
    citySlugs: ["pasadena", "palos-verdes-estates"],
  },
  {
    id: "lighting",
    title: "Landscape Lighting",
    blurb:
      "Architectural lighting that makes a home glow after sunset — safe, cinematic and precisely aimed.",
    images: [
      { src: "/images/services/outdoor-lighting.jpg", alt: "Architectural landscape lighting glowing after sunset in Los Angeles" },
      { src: "/images/hero/hero.jpg", alt: "Los Angeles estate with accent landscape lighting at dusk" },
      { src: "/images/final-cta/final-cta.jpg", alt: "Illuminated luxury backyard at night in Los Angeles" },
    ],
    serviceSlugs: ["outdoor-lighting", "outdoor-living", "landscape-design"],
    citySlugs: ["bel-air", "manhattan-beach"],
  },
];

export default function InspirationGalleryPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <section className="relative isolate overflow-hidden bg-ink-950 pt-32 pb-12 sm:pt-40 sm:pb-14">
        <div className="absolute -left-40 top-24 h-[480px] w-[480px] rounded-full bg-moss-700/15 blur-[160px]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumbs} />
          <p className="mt-8 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-moss-300/90">
            <span className="inline-block h-px w-6 bg-moss-400/60" />
            Inspiration Gallery
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-balance text-4xl font-light leading-[1.02] tracking-[-0.025em] text-cream-50 sm:text-5xl lg:text-6xl">
            Ideas for every part of your{" "}
            <span className="text-gradient-emerald italic">outdoor space.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-cream-50/75">
            Browse by area of the property — then jump straight to the service or
            your city to start planning your own transformation.
          </p>
          <nav aria-label="Gallery categories" className="mt-8 flex flex-wrap gap-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-cream-50/80 transition hover:border-moss-400/40 hover:text-cream-50"
              >
                {s.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {sections.map((section, idx) => {
        const services = getServicesBySlugs(section.serviceSlugs);
        const cities = getCitiesBySlugs(section.citySlugs);
        return (
          <section
            key={section.id}
            id={section.id}
            className="relative scroll-mt-28 bg-ink-950 py-12 sm:py-16"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-2 border-b border-white/8 pb-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="font-display text-2xl font-light tracking-[-0.02em] text-cream-50 sm:text-3xl">
                    {section.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-cream-50/60">
                    {section.blurb}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {section.images.map((img, i) => (
                  <div
                    key={img.src + i}
                    className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/8"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      loading={idx === 0 ? "eager" : "lazy"}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/50 to-transparent" />
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-moss-400/30 bg-moss-500/10 px-4 py-2 text-sm text-moss-200 transition hover:bg-moss-500/20"
                  >
                    {s.name}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ))}
                {cities.map((c) => (
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
                  href="/quote"
                  className="inline-flex items-center gap-1.5 rounded-full bg-cream-50 px-4 py-2 text-sm font-medium text-ink-900 transition hover:bg-cream-100"
                >
                  Start a quote
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </section>
        );
      })}

      <section className="relative bg-ink-950 pb-24 pt-8 sm:pb-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <QuoteCta
            title="See something you love?"
            subtitle="Start your Smart Quote and we'll help you bring these ideas to life on your own property — free and in about 90 seconds."
          />
        </div>
      </section>
    </>
  );
}
