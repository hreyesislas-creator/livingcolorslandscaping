"use client";

import { motion } from "framer-motion";
import { Compass, ShieldCheck, Sparkles, Timer } from "lucide-react";
import { QuoteWizard } from "./quote-wizard";

const features = [
  { icon: Sparkles, label: "Guided intake" },
  { icon: Compass, label: "Tailored design plan" },
  { icon: Timer, label: "Reply < 24 hrs" },
  { icon: ShieldCheck, label: "Specialist review" },
];

export function QuoteSection() {
  return (
    <section
      id="quote"
      className="relative isolate overflow-hidden bg-ink-950 py-24 sm:py-32"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-moss-500/40 to-transparent" />
      <div className="absolute -left-40 top-32 h-[480px] w-[480px] rounded-full bg-moss-700/20 blur-[160px]" />
      <div className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-moss-500/15 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-moss-400/30 bg-moss-500/10 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-moss-200"
          >
            <Sparkles className="h-3 w-3" />
            Smart Project Intake · Free · 90 seconds
          </motion.p>
          <h2 className="font-display mt-5 text-balance text-4xl font-light leading-[1.05] tracking-[-0.02em] text-cream-50 sm:text-5xl lg:text-[64px]">
            Plan your project through a
            <br />
            <span className="text-gradient-emerald italic">guided experience.</span>
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-cream-50/70">
            No back-and-forth phone tag. Our smart intake guides you through a
            few key questions, builds your project profile and routes it to a
            senior specialist — instantly.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-cream-50/65">
            {features.map((f) => (
              <span key={f.label} className="inline-flex items-center gap-1.5">
                <f.icon className="h-3.5 w-3.5 text-moss-300" />
                {f.label}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <QuoteWizard />
        </div>
      </div>
    </section>
  );
}
