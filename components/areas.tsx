"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { brand } from "@/lib/content";

export function Areas() {
  return (
    <section id="areas" className="relative bg-ink-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SectionHeading
              eyebrow="Areas served"
              title={
                <>
                  Designing across the
                  <br />
                  <span className="text-gradient-emerald italic">Phoenix Valley.</span>
                </>
              }
              description="From historic Arcadia to estate properties in Paradise Valley — we've earned a reputation in every neighborhood we touch."
            />

            <div className="mt-10 flex flex-wrap gap-2">
              {brand.cities.map((c, i) => (
                <motion.span
                  key={c}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.35, delay: i * 0.03 }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-cream-50/85"
                >
                  <MapPin className="h-3.5 w-3.5 text-moss-300" />
                  {c}
                </motion.span>
              ))}
            </div>

            <p className="mt-8 text-sm text-cream-50/55">
              Not seeing your city? We still might cover it —{" "}
              <a href="#quote" className="text-moss-300 underline-offset-4 hover:underline">
                start your quote
              </a>{" "}
              and we&apos;ll confirm immediately.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/8"
          >
            <Image
              src="https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=1400&q=85"
              alt="Premium landscape project at dusk"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />

            <div className="absolute inset-x-6 bottom-6">
              <div className="glass rounded-2xl p-5">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-moss-300/90">
                  Featured neighborhood
                </p>
                <p className="font-display mt-3 text-2xl font-light text-cream-50">
                  Paradise Valley
                </p>
                <p className="mt-1 text-sm text-cream-50/65">
                  120+ estate transformations completed
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
