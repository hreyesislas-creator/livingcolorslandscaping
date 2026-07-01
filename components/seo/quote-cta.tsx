import Link from "next/link";
import { ArrowRight, Sparkles, Phone } from "lucide-react";
import { siteConfig } from "@/lib/seo";

/**
 * Primary conversion band. Every service & city page ends here, routing
 * visitors into the Smart Quote Wizard (/quote) — the main conversion asset.
 */
export function QuoteCta({
  title = "Start your project the smart way.",
  subtitle = "Answer a few quick questions and a senior specialist builds your tailored plan — no phone tag, no pressure.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden rounded-[32px] border border-white/8 bg-gradient-to-br from-ink-800/70 to-ink-900/60 px-6 py-14 sm:px-12 sm:py-16">
      <div className="absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-moss-700/25 blur-[140px]" />
      <div className="absolute -right-20 bottom-0 h-[360px] w-[360px] rounded-full bg-moss-500/15 blur-[140px]" />
      <div className="relative mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-moss-400/30 bg-moss-500/10 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-moss-200">
          <Sparkles className="h-3 w-3" />
          Smart Quote · Free · 90 seconds
        </span>
        <h2 className="font-display mt-5 text-balance text-3xl font-light leading-[1.05] tracking-[-0.02em] text-cream-50 sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-cream-50/70 sm:text-lg">
          {subtitle}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/quote"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-cream-50 px-7 py-4 text-sm font-medium text-ink-900 shadow-[0_20px_60px_-15px_rgba(255,255,255,0.3)] transition hover:bg-cream-100"
          >
            <Sparkles className="h-4 w-4 text-moss-700" />
            Start your Smart Quote
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href={siteConfig.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-sm font-medium text-cream-50 backdrop-blur transition hover:border-white/40 hover:bg-white/10"
          >
            <Phone className="h-4 w-4" />
            {siteConfig.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
