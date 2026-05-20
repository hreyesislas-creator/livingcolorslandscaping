"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Leaf, Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { brand } from "@/lib/content";

const links = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#areas", label: "Areas" },
  { href: "#faq", label: "FAQ" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-5",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl border border-white/5 px-4 py-3 transition-all duration-500 lg:px-6",
            scrolled
              ? "glass-strong shadow-2xl shadow-black/40"
              : "bg-transparent",
          )}
        >
          <Link
            href="/"
            className="group flex items-center gap-2.5"
            aria-label={brand.name}
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-moss-500 to-moss-700 shadow-glow">
              <Leaf className="h-4.5 w-4.5 text-cream-50" strokeWidth={2.4} />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-[15px] font-medium tracking-tight text-cream-50">
                Living Colors
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-moss-300/80">
                Landscape
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-sm text-cream-50/80 transition hover:bg-white/5 hover:text-cream-50"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${brand.phone.replace(/[^0-9+]/g, "")}`}
              className="hidden items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-cream-50/85 transition hover:border-white/25 hover:text-cream-50 lg:flex"
            >
              <Phone className="h-3.5 w-3.5" />
              {brand.phone}
            </a>
            <a
              href="#quote"
              className="hidden rounded-full bg-cream-50 px-5 py-2.5 text-sm font-medium text-ink-900 shadow-lg shadow-cream-50/10 transition hover:bg-cream-100 sm:inline-flex"
            >
              Start your quote
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center justify-center rounded-full border border-white/10 p-2.5 text-cream-50 transition hover:border-white/25 lg:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-2 max-w-7xl px-4 lg:hidden"
          >
            <div className="glass-strong rounded-2xl p-4">
              <nav className="flex flex-col gap-1">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-base text-cream-50/90 transition hover:bg-white/5"
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="#quote"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-xl bg-cream-50 px-5 py-3 text-center text-sm font-medium text-ink-900"
                >
                  Start your quote
                </a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
