"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Check, Phone, Sparkles } from "lucide-react";
import { brand } from "@/lib/content";

const promises = [
  "Personal senior designer",
  "Tailored project plan",
  "Transparent itemized pricing",
  "10-year workmanship warranty",
];

export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="relative isolate overflow-hidden rounded-[32px] border border-white/8"
        >
          <Image
            src="/images/final-cta/final-cta.jpg"
            alt="Luxury landscaped backyard at dusk in Los Angeles"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/75 to-ink-950/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-transparent to-ink-950/80" />
          <div className="absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-moss-700/30 blur-[140px]" />
          <div className="absolute -right-20 bottom-0 h-[360px] w-[360px] rounded-full bg-moss-500/20 blur-[140px]" />

          <div className="relative px-6 py-20 text-center sm:px-12 sm:py-28 lg:px-20 lg:py-32">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-cream-50/85 backdrop-blur"
            >
              <Sparkles className="h-3 w-3 text-moss-300" />
              Now booking 2026 estate projects
            </motion.p>

            <h2 className="font-display mx-auto mt-8 max-w-4xl text-balance text-5xl font-light leading-[0.95] tracking-[-0.02em] text-cream-50 sm:text-7xl lg:text-[112px]">
              Let&apos;s build
              <br />
              <span className="text-gradient-emerald italic">something exceptional.</span>
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-cream-50/75 sm:text-xl">
              Start your outdoor transformation today. Our smart intake takes
              90 seconds — a senior specialist responds within one business day.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#quote"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-cream-50 px-7 py-4 text-sm font-medium text-ink-900 shadow-[0_20px_60px_-15px_rgba(255,255,255,0.3)] transition hover:bg-cream-100"
              >
                Start your transformation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={`tel:${brand.phone.replace(/[^0-9+]/g, "")}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-sm font-medium text-cream-50 backdrop-blur transition hover:border-white/40 hover:bg-white/10"
              >
                <Phone className="h-4 w-4" />
                {brand.phone}
              </a>
            </div>

            <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-cream-50/70">
              {promises.map((p) => (
                <span key={p} className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4 text-moss-300" />
                  {p}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
