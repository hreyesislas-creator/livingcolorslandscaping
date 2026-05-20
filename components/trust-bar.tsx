"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Award, BadgeCheck, MapPin, Star } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "Licensed & insured" },
  { icon: Award, label: "ROC certified" },
  { icon: BadgeCheck, label: "10-yr workmanship" },
  { icon: Star, label: "4.9★ on Google" },
  { icon: MapPin, label: "Valley-wide service" },
];

export function TrustBar() {
  return (
    <section className="relative border-y border-white/5 bg-ink-900/50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex items-center gap-2.5 text-sm text-cream-50/70"
            >
              <item.icon className="h-4 w-4 text-moss-300" />
              <span>{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
