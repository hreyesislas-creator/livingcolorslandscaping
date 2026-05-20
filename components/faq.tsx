"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { faqs } from "@/lib/content";
import { cn } from "@/lib/cn";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-ink-950 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              The questions homeowners
              <br />
              <span className="text-gradient-emerald italic">ask us most.</span>
            </>
          }
          align="center"
        />

        <div className="mt-16 divide-y divide-white/5 rounded-3xl border border-white/8 bg-gradient-to-br from-ink-800/40 to-ink-900/40">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left transition hover:bg-white/[0.02] sm:px-8 sm:py-7"
                  aria-expanded={isOpen}
                >
                  <span className="text-pretty text-base font-medium text-cream-50 sm:text-lg">
                    {f.q}
                  </span>
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all",
                      isOpen
                        ? "rotate-45 border-moss-400/60 bg-moss-500/15 text-moss-200"
                        : "border-white/15 text-cream-50/70",
                    )}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-pretty text-base leading-relaxed text-cream-50/70 sm:px-8 sm:pb-8">
                        {f.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-cream-50/55">
          Still have a question?{" "}
          <a href="#quote" className="text-moss-300 underline-offset-4 hover:underline">
            Start a quote
          </a>{" "}
          and a specialist will reach out.
        </p>
      </div>
    </section>
  );
}
