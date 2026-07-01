import Link from "next/link";
import { ArrowUpRight, Layers, Images, ShieldCheck } from "lucide-react";

const cards = [
  {
    href: "/project-types",
    icon: Layers,
    title: "Browse by project type",
    body: "Estates, pools, hillside, fire-wise, drought-tolerant and more.",
  },
  {
    href: "/inspiration-gallery",
    icon: Images,
    title: "Inspiration Gallery",
    body: "Backyards, front yards, outdoor living, turf, pavers and lighting.",
  },
  {
    href: "/why-living-colors",
    icon: ShieldCheck,
    title: "Why Living Colors",
    body: "Our craft, materials, warranty and white-glove process.",
  },
];

/** Cross-linking band placed on service & city pages to spread topical authority. */
export function ExploreBand() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map((c) => (
        <Link
          key={c.href}
          href={c.href}
          className="group flex flex-col rounded-2xl border border-white/8 bg-white/[0.02] p-6 transition hover:border-moss-400/40 hover:bg-white/[0.04]"
        >
          <div className="flex items-center justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-moss-400/40 bg-moss-500/15 text-moss-200">
              <c.icon className="h-4.5 w-4.5" />
            </span>
            <ArrowUpRight className="h-4 w-4 text-cream-50/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-moss-300" />
          </div>
          <h3 className="mt-4 text-base font-medium text-cream-50">{c.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-cream-50/60">
            {c.body}
          </p>
        </Link>
      ))}
    </div>
  );
}
