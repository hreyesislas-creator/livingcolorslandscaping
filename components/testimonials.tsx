"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  return (
    <section className="relative bg-ink-900/40 py-24 sm:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Clients"
          title={
            <>
              Loved by homeowners who
              <br />
              <span className="text-gradient-emerald italic">don&apos;t settle.</span>
            </>
          }
          align="center"
        />

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative flex h-full flex-col justify-between rounded-2xl border border-white/8 bg-gradient-to-br from-ink-800/60 to-ink-900/40 p-6 lg:p-7"
            >
              <Quote className="h-7 w-7 text-moss-400/40" strokeWidth={1.5} />
              <blockquote className="mt-5 flex-1 text-pretty text-[15px] leading-relaxed text-cream-50/85">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-white/5 pt-5">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-gold-400 text-gold-400"
                    />
                  ))}
                </div>
                <p className="mt-3 text-sm font-medium text-cream-50">
                  {t.name}
                </p>
                <p className="text-xs text-cream-50/55">{t.location}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
