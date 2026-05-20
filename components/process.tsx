"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "./section-heading";
import { process } from "@/lib/content";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="process"
      className="relative overflow-hidden bg-ink-900/40 py-24 sm:py-32"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-moss-700/15 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The Process"
          title={
            <>
              From first click to{" "}
              <span className="text-gradient-emerald italic">final reveal.</span>
            </>
          }
          description="Four phases. One specialist. Total clarity from day zero to handover."
          align="center"
        />

        <div ref={ref} className="relative mt-20">
          <div className="pointer-events-none absolute left-[27px] top-2 hidden h-[calc(100%-1rem)] w-px bg-white/8 lg:block" />
          <motion.div
            style={{ height: lineHeight }}
            className="pointer-events-none absolute left-[27px] top-2 hidden w-px bg-gradient-to-b from-moss-300 via-moss-400 to-moss-700 lg:block"
          />

          <ol className="space-y-12 lg:space-y-20">
            {process.map((p, i) => (
              <ProcessRow key={p.step} item={p} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function ProcessRow({
  item,
  index,
}: {
  item: (typeof process)[number];
  index: number;
}) {
  const flip = index % 2 === 1;
  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative grid items-center gap-8 lg:grid-cols-[56px_1fr_1.1fr] lg:gap-10"
    >
      <div className="hidden items-start pt-2 lg:flex">
        <div className="relative">
          <span className="absolute -inset-3 rounded-full bg-moss-500/15 blur-md" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-moss-400/40 bg-ink-900 text-cream-50">
            <span className="font-display text-lg font-light text-gradient-emerald">
              {item.step}
            </span>
          </div>
        </div>
      </div>

      <div className={flip ? "lg:order-3" : ""}>
        <div className="lg:hidden">
          <span className="font-display text-3xl font-light text-gradient-emerald">
            {item.step}
          </span>
        </div>
        <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.22em] text-moss-300/90 lg:mt-0">
          {item.duration}
        </p>
        <h3 className="font-display mt-3 text-balance text-3xl font-light leading-[1.1] tracking-[-0.01em] text-cream-50 sm:text-4xl lg:text-[44px]">
          {item.title}
        </h3>
        <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-cream-50/70 sm:text-lg">
          {item.body}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`relative aspect-[5/4] overflow-hidden rounded-3xl border border-white/8 ${flip ? "lg:order-2" : ""}`}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-[1200ms] ease-out hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />

        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-ink-950/60 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-cream-50/90 backdrop-blur">
          Phase {item.step}
        </div>
      </motion.div>
    </motion.li>
  );
}
