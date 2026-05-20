"use client";

import { motion } from "framer-motion";
import { brand } from "@/lib/content";

export function StatsBand() {
  return (
    <section className="relative bg-ink-950">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid items-end gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-moss-300/90">
              <span className="inline-block h-px w-6 bg-moss-400/60" />
              Trusted across the Valley
            </p>
            <h2 className="font-display mt-4 text-balance text-4xl font-light leading-[1.05] tracking-[-0.02em] text-cream-50 sm:text-5xl lg:text-[56px]">
              Premium results, <span className="text-gradient-emerald italic">backed by craft.</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream-50/70">
              We&apos;ve been quietly transforming the most beautiful homes in
              Arizona for nearly two decades — with the same obsession for
              detail on every project, residential to estate.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {brand.stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-ink-800/60 to-ink-900/60 p-6 sm:p-7"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-moss-400/60 to-transparent" />
                <p className="font-display text-4xl font-light tracking-tight text-cream-50 sm:text-5xl">
                  {s.value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-cream-50/55">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
