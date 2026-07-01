import Link from "next/link";
import { Leaf, Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";
import { brand } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-ink-950">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-moss-500/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
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
              Designing and building luxury outdoor environments across Greater
              Los Angeles. Licensed, bonded and insured.
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
              <li><Link href="/services/landscape-design" className="hover:text-cream-50">Landscape Design</Link></li>
              <li><Link href="/services/artificial-turf" className="hover:text-cream-50">Artificial Turf</Link></li>
              <li><Link href="/services/pavers" className="hover:text-cream-50">Pavers</Link></li>
              <li><Link href="/services/outdoor-lighting" className="hover:text-cream-50">Outdoor Lighting</Link></li>
              <li><Link href="/services" className="hover:text-cream-50">All services →</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-moss-300/80">
              Areas served
            </p>
            <ul className="mt-5 space-y-3 text-sm text-cream-50/70">
              <li><Link href="/service-areas/beverly-hills" className="hover:text-cream-50">Beverly Hills</Link></li>
              <li><Link href="/service-areas/pacific-palisades" className="hover:text-cream-50">Pacific Palisades</Link></li>
              <li><Link href="/service-areas/malibu" className="hover:text-cream-50">Malibu</Link></li>
              <li><Link href="/service-areas/pasadena" className="hover:text-cream-50">Pasadena</Link></li>
              <li><Link href="/service-areas" className="hover:text-cream-50">All areas →</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-moss-300/80">
              Explore
            </p>
            <ul className="mt-5 space-y-3 text-sm text-cream-50/70">
              <li><Link href="/project-types" className="hover:text-cream-50">Project Types</Link></li>
              <li><Link href="/inspiration-gallery" className="hover:text-cream-50">Inspiration Gallery</Link></li>
              <li><Link href="/luxury-landscaping-los-angeles" className="hover:text-cream-50">Luxury Landscaping LA</Link></li>
              <li><Link href="/why-living-colors" className="hover:text-cream-50">Why Living Colors</Link></li>
              <li><Link href="/quote" className="hover:text-cream-50">Smart Quote</Link></li>
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
                <span>Serving Greater Los Angeles</span>
              </li>
              <li>
                <Link href="/quote" className="text-moss-300 underline-offset-4 hover:underline">
                  Start your Smart Quote →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-cream-50/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {brand.name}. All rights reserved. Licensed &amp; insured.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-cream-50/80">Privacy</a>
            <a href="#" className="hover:text-cream-50/80">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
