"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

export interface FaqItem {
  q: string;
  a: string;
}

/** Reusable accordion FAQ for service & city pages. FAQ schema is injected separately. */
export function PageFaq({
  items,
  heading = "Frequently asked questions",
}: {
  items: FaqItem[];
  heading?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      <h2 className="font-display text-3xl font-light tracking-[-0.02em] text-cream-50 sm:text-4xl">
        {heading}
      </h2>
      <div className="mt-8 divide-y divide-white/5 rounded-3xl border border-white/8 bg-gradient-to-br from-ink-800/40 to-ink-900/40">
        {items.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition hover:bg-white/[0.02] sm:px-8 sm:py-6"
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
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-pretty text-base leading-relaxed text-cream-50/70 sm:px-8 sm:pb-7">
                      {f.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
