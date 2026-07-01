"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { services } from "@/lib/content";

// Homepage cards use the content.ts catalog; map its slug to the SEO detail route.
const detailSlug = (slug: string) =>
  slug === "custom" ? "landscape-construction" : slug;

export function Services() {
  return (
    <section id="services" className="relative bg-ink-950 py-24 sm:py-32">
      <div className="absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_top,rgba(44,150,85,0.08),transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="What we build"
            title={
              <>
                Every detail of your outdoor space,{" "}
                <span className="text-gradient-emerald italic">considered.</span>
              </>
            }
            description="From signature design to ongoing white-glove care — we cover the full lifecycle of your property."
          />
          <a
            href="#quote"
            className="group hidden shrink-0 items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm text-cream-50/85 transition hover:border-white/30 hover:text-cream-50 lg:inline-flex"
          >
            Get matched to services
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.a
              key={s.slug}
              href={`/services/${detailSlug(s.slug)}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group relative isolate overflow-hidden rounded-3xl border border-white/8 bg-ink-800/40 transition-all duration-500 hover:border-white/20 hover:shadow-[0_30px_80px_-30px_rgba(44,150,85,0.5)]"
            >
              <div className="aspect-[4/5] sm:aspect-[5/6]">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.08]"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-moss-500/0 via-moss-500/0 to-moss-400/0 opacity-0 transition-opacity duration-500 group-hover:from-moss-700/30 group-hover:via-moss-500/0 group-hover:opacity-100" />

              <div className="absolute left-5 top-5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-ink-950/50 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-cream-50/90 backdrop-blur">
                  {s.tag}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl font-light tracking-tight text-cream-50 sm:text-[26px]">
                      {s.title}
                    </h3>
                    <p className="mt-2 max-w-[260px] text-sm leading-relaxed text-cream-50/70">
                      {s.blurb}
                    </p>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-cream-50 backdrop-blur transition group-hover:border-moss-400/50 group-hover:bg-moss-500/20">
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
