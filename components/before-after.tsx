"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { SectionHeading } from "./section-heading";
import { beforeAfter, type TransformationProject } from "@/lib/content";
import { cn } from "@/lib/cn";

function CompareSlider({ project }: { project: TransformationProject }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const id = useId();

  const [pos, setPos] = useState(94);
  const [dragging, setDragging] = useState(false);
  const [hinted, setHinted] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1500;
    const from = 94;
    const to = 50;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setPos(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setHinted(true);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    setPos((x / rect.width) * 100);
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const move = (e: PointerEvent) => update(e.clientX);
    const stop = () => setDragging(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
    };
  }, [dragging, update]);

  const startDrag = (e: React.PointerEvent) => {
    setDragging(true);
    update(e.clientX);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPos((p) => Math.max(0, p - 4));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPos((p) => Math.min(100, p + 4));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPos(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPos(100);
    }
  };

  return (
    <div
      ref={ref}
      className="relative aspect-[16/10] w-full select-none touch-none overflow-hidden rounded-3xl border border-white/8 bg-ink-900 shadow-[0_50px_140px_-40px_rgba(0,0,0,0.7)]"
      onPointerDown={startDrag}
      aria-describedby={`${id}-desc`}
    >
      <span id={`${id}-desc`} className="sr-only">
        Drag to compare before and after for {project.title}
      </span>

      <Image
        src={project.after}
        alt={`${project.title} — after transformation`}
        fill
        sizes="(max-width: 1024px) 100vw, 60vw"
        className="object-cover"
      />

      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: `inset(0 ${100 - pos}% 0 0)`,
          willChange: "clip-path",
        }}
      >
        <Image
          src={project.before}
          alt={`${project.title} — before transformation`}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
        />
      </div>

      <div className="pointer-events-none absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-ink-950/75 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-cream-50/90 backdrop-blur">
        Before
      </div>
      <div className="pointer-events-none absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-moss-500/85 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-cream-50 shadow-glow backdrop-blur">
        After
      </div>

      <div
        className="absolute inset-y-0 z-10 w-px bg-cream-50 shadow-[0_0_50px_rgba(255,255,255,0.55)]"
        style={{ left: `${pos}%`, willChange: "left" }}
      >
        <span className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-cream-50 shadow-[0_0_24px_rgba(255,255,255,0.7)]" />
        <span className="absolute -bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-cream-50 shadow-[0_0_24px_rgba(255,255,255,0.7)]" />

        <button
          type="button"
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-label="Drag to compare before and after"
          onPointerDown={(e) => {
            e.stopPropagation();
            startDrag(e);
          }}
          onKeyDown={onKeyDown}
          className="group/handle absolute top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-grab focus:outline-none active:cursor-grabbing"
        >
          <span className="pointer-events-none absolute inset-0 -m-2 rounded-full bg-cream-50/25 blur-lg" />
          <span
            className={cn(
              "pointer-events-none absolute inset-0 -m-3 rounded-full border border-cream-50/40 transition-opacity duration-500",
              !hinted || dragging
                ? "animate-ping opacity-60"
                : "opacity-0 group-hover/handle:opacity-100",
            )}
          />
          <div className="relative flex h-14 w-14 items-center justify-center gap-0.5 rounded-full border border-white/30 bg-cream-50/95 text-ink-900 shadow-[0_14px_50px_rgba(0,0,0,0.55)] transition-transform group-active/handle:scale-95">
            <ChevronLeft className="h-4 w-4" strokeWidth={2.8} />
            <ChevronRight className="h-4 w-4" strokeWidth={2.8} />
          </div>
        </button>
      </div>

      {!dragging && hinted && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2"
        >
          <div className="rounded-full bg-ink-950/75 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-cream-50/85 backdrop-blur">
            Drag to compare
          </div>
        </motion.div>
      )}

      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
    </div>
  );
}

export function BeforeAfter() {
  const [idx, setIdx] = useState(0);
  const current = beforeAfter[idx];

  return (
    <section
      id="work"
      className="relative isolate overflow-hidden bg-ink-950 py-24 sm:py-32"
    >
      <div className="absolute -left-32 top-1/4 h-[420px] w-[420px] rounded-full bg-moss-700/15 blur-[160px]" />
      <div className="absolute -right-20 bottom-0 h-[360px] w-[360px] rounded-full bg-moss-500/10 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Transformations"
            title={
              <>
                Real properties.{" "}
                <span className="text-gradient-emerald italic">Real transformations.</span>
              </>
            }
            description="Drag any slider to reveal the change."
          />
          <div className="hidden gap-2 lg:flex">
            <button
              type="button"
              onClick={() =>
                setIdx((i) => (i - 1 + beforeAfter.length) % beforeAfter.length)
              }
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-cream-50/80 transition hover:border-white/35 hover:text-cream-50"
              aria-label="Previous transformation"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setIdx((i) => (i + 1) % beforeAfter.length)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-cream-50/80 transition hover:border-white/35 hover:text-cream-50"
              aria-label="Next transformation"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <motion.div
          key={current.slug}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 grid gap-6 lg:grid-cols-[1.7fr_1fr]"
        >
          <CompareSlider project={current} />

          <div className="flex flex-col justify-between gap-8 rounded-3xl border border-white/8 bg-gradient-to-br from-ink-800/60 to-ink-900/40 p-8 lg:p-10">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-moss-300/90">
                <MapPin className="h-3 w-3" />
                {current.location}
              </span>

              <h3 className="font-display mt-5 text-balance text-3xl font-light leading-[1.05] tracking-[-0.01em] text-cream-50 sm:text-4xl lg:text-[44px]">
                {current.title}
              </h3>

              <ul className="mt-7 flex flex-wrap gap-2">
                {current.services.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-cream-50/85"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex gap-2">
                {beforeAfter.map((p, i) => (
                  <button
                    key={p.slug}
                    onClick={() => setIdx(i)}
                    className={cn(
                      "h-1 flex-1 rounded-full transition-all",
                      i === idx ? "bg-moss-400" : "bg-white/10 hover:bg-white/20",
                    )}
                    aria-label={`Show ${p.title}`}
                  />
                ))}
              </div>
              <a
                href="#quote"
                className="group mt-6 inline-flex items-center gap-2 rounded-full bg-cream-50 px-5 py-3 text-sm font-medium text-ink-900 transition hover:bg-cream-100"
              >
                Get a project like this
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-2 sm:grid-cols-3">
          {beforeAfter.map((p, i) => (
            <button
              key={p.slug}
              onClick={() => setIdx(i)}
              className={cn(
                "group relative aspect-[16/10] overflow-hidden rounded-2xl border transition-all",
                i === idx
                  ? "border-moss-400/60 shadow-glow"
                  : "border-white/8 hover:border-white/20",
              )}
            >
              <Image
                src={p.after}
                alt={p.title}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className={cn(
                  "object-cover transition-transform duration-700 group-hover:scale-105",
                  i !== idx && "opacity-70",
                )}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                <p className="text-sm font-medium text-cream-50">
                  {p.title}
                </p>
                <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-cream-50/55">
                  {p.location}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
