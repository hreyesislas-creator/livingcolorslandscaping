"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Sparkles, Star } from "lucide-react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "26%"]);
  const fgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0.35]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);

  return (
    <section
      ref={ref}
      className="relative isolate min-h-[100svh] overflow-hidden bg-ink-950 pt-24 pb-16 sm:pb-24"
    >
      <motion.div
        style={{ y: bgY, scale }}
        className="absolute inset-0"
      >
        <Image
          src="/images/hero/hero.jpg"
          alt="Luxury landscaped estate at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="absolute inset-0 bg-gradient-to-b from-ink-950/85 via-ink-950/55 to-ink-950"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 via-ink-950/30 to-transparent" />
      <div className="absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-moss-500/20 blur-[140px] animate-float-slow" />
      <div className="absolute right-0 bottom-10 h-[420px] w-[420px] rounded-full bg-moss-700/30 blur-[160px]" />
      <div className="grain absolute inset-0 z-[1]" />

      <motion.div
        style={{ y: fgY }}
        className="relative z-10 mx-auto flex min-h-[calc(100svh-6rem)] max-w-7xl flex-col justify-between px-4 sm:px-6 lg:px-8"
      >
        <div className="flex-1 pt-10 lg:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-cream-50/85 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-moss-400 opacity-75 animate-pulse-ring" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-moss-400" />
            </span>
            Now booking 2026 estate projects
          </motion.div>

          <h1 className="font-display mt-7 max-w-5xl text-balance text-[42px] font-light leading-[0.96] tracking-[-0.025em] text-cream-50 sm:text-7xl lg:text-[104px]">
            <RevealLine delay={0}>Transform your outdoor</RevealLine>
            <RevealLine delay={0.12}>space into something</RevealLine>
            <RevealLine delay={0.24}>
              <span className="text-gradient-emerald italic">exceptional.</span>
            </RevealLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-cream-50/75 sm:text-xl"
          >
            Premium landscape design, hardscape and outdoor living — guided by
            a senior specialist through a fast, modern intake experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#quote"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-cream-50 px-7 py-4 text-sm font-medium text-ink-900 shadow-[0_20px_60px_-15px_rgba(255,255,255,0.25)] transition hover:bg-cream-100"
            >
              <Sparkles className="h-4 w-4 text-moss-700" />
              Start your project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#work"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-sm font-medium text-cream-50 backdrop-blur transition hover:border-white/40 hover:bg-white/10"
            >
              View transformations
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-cream-50/70"
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                ))}
              </div>
              <span>
                <span className="text-cream-50">4.9</span> · 240+ Google reviews
              </span>
            </div>
            <span className="hidden h-1 w-1 rounded-full bg-cream-50/30 sm:block" />
            <span>Licensed · Bonded · Insured</span>
            <span className="hidden h-1 w-1 rounded-full bg-cream-50/30 sm:block" />
            <span>18+ years across Los Angeles</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
        >
          {[
            { k: "1,200+", v: "Properties transformed" },
            { k: "98%", v: "On-time completion" },
            { k: "< 24 hrs", v: "Quote turnaround" },
            { k: "10 yrs", v: "Workmanship warranty" },
          ].map((stat) => (
            <div key={stat.v} className="glass rounded-2xl p-4 sm:p-5">
              <p className="font-display text-2xl font-light tracking-tight text-cream-50 sm:text-3xl">
                {stat.k}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-cream-50/55 sm:text-xs">
                {stat.v}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-32 bg-gradient-to-b from-transparent to-ink-950" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="pointer-events-none absolute bottom-6 left-1/2 z-[3] -translate-x-1/2 sm:bottom-10"
      >
        <div className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-cream-50/45">
          <span>Scroll</span>
          <span className="relative block h-8 w-px overflow-hidden bg-white/10">
            <span className="absolute inset-x-0 top-0 block h-3 animate-[scroll-ind_2s_ease-in-out_infinite] bg-cream-50/80" />
          </span>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes scroll-ind {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
}

function RevealLine({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.95,
          delay: 0.15 + delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}
