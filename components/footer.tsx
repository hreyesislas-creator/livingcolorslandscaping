import Link from "next/link";
import { Leaf, Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";
import { brand } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-ink-950">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-moss-500/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-moss-500 to-moss-700">
                <Leaf className="h-4.5 w-4.5 text-cream-50" strokeWidth={2.4} />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-[15px] font-medium tracking-tight">
                  Living Colors
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-moss-300/80">
                  Landscape
                </span>
              </span>
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-cream-50/60">
              Designing and building luxury outdoor environments across the
              Valley. Licensed, bonded and insured.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="rounded-full border border-white/10 p-2.5 text-cream-50/70 transition hover:border-moss-400/40 hover:text-moss-300"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="rounded-full border border-white/10 p-2.5 text-cream-50/70 transition hover:border-moss-400/40 hover:text-moss-300"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-moss-300/80">
              Services
            </p>
            <ul className="mt-5 space-y-3 text-sm text-cream-50/70">
              <li><a href="#services" className="hover:text-cream-50">Landscape Design</a></li>
              <li><a href="#services" className="hover:text-cream-50">Artificial Turf</a></li>
              <li><a href="#services" className="hover:text-cream-50">Pavers & Hardscape</a></li>
              <li><a href="#services" className="hover:text-cream-50">Outdoor Lighting</a></li>
              <li><a href="#services" className="hover:text-cream-50">Maintenance</a></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-moss-300/80">
              Company
            </p>
            <ul className="mt-5 space-y-3 text-sm text-cream-50/70">
              <li><a href="#work" className="hover:text-cream-50">Portfolio</a></li>
              <li><a href="#process" className="hover:text-cream-50">Process</a></li>
              <li><a href="#areas" className="hover:text-cream-50">Areas served</a></li>
              <li><a href="#faq" className="hover:text-cream-50">FAQ</a></li>
              <li><a href="#quote" className="hover:text-cream-50">Get a quote</a></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-moss-300/80">
              Contact
            </p>
            <ul className="mt-5 space-y-3 text-sm text-cream-50/70">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 text-moss-300" />
                <a href={`tel:${brand.phone.replace(/[^0-9+]/g, "")}`} className="hover:text-cream-50">{brand.phone}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 text-moss-300" />
                <a href={`mailto:${brand.email}`} className="hover:text-cream-50">{brand.email}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 text-moss-300" />
                <span>Serving the Phoenix Valley</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-cream-50/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {brand.name}. All rights reserved. ROC# 000000</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-cream-50/80">Privacy</a>
            <a href="#" className="hover:text-cream-50/80">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
