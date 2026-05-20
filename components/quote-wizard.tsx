"use client";

import {
  ChangeEvent,
  DragEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  CloudUpload,
  Compass,
  Cpu,
  Droplets,
  Hammer,
  Home,
  Image as ImageIcon,
  Leaf,
  Mail,
  MapPin,
  Phone,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Square,
  Sun,
  Trees,
  Trophy,
  User,
  Wallet,
  Wrench,
  X,
} from "lucide-react";
import { cn } from "@/lib/cn";

type OptionId = string;

interface OptionDef {
  id: OptionId;
  label: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
}

type Step =
  | {
      type: "choice";
      key: string;
      multi?: boolean;
      eyebrow: string;
      question: string;
      helper?: string;
      options: OptionDef[];
    }
  | {
      type: "upload";
      key: string;
      eyebrow: string;
      question: string;
      helper?: string;
    }
  | {
      type: "qualification";
      key: "qualification";
      eyebrow: string;
      question: string;
      helper?: string;
    }
  | {
      type: "contact";
      key: "contact";
      eyebrow: string;
      question: string;
      helper?: string;
    };

const steps: Step[] = [
  {
    type: "choice",
    key: "projectType",
    multi: true,
    eyebrow: "Step 01 · Your project",
    question: "What type of outdoor project are you planning?",
    helper: "Pick one or as many as apply.",
    options: [
      { id: "design", label: "Landscape Design", icon: Compass },
      { id: "turf", label: "Artificial Turf", icon: Leaf },
      { id: "pavers", label: "Pavers", icon: Square },
      { id: "hardscape", label: "Hardscape", icon: Hammer },
      { id: "irrigation", label: "Irrigation", icon: Droplets },
      { id: "lighting", label: "Outdoor Lighting", icon: Sun },
      { id: "living", label: "Outdoor Living", icon: Home },
      { id: "other", label: "Other / Custom", icon: Sparkles },
    ],
  },
  {
    type: "choice",
    key: "propertyType",
    eyebrow: "Step 02 · Property",
    question: "Tell us about your property.",
    helper: "We tailor the experience to your property type.",
    options: [
      { id: "residential", label: "Residential", description: "Single family home", icon: Home },
      { id: "estate", label: "Estate / Luxury", description: "1+ acre property", icon: Trees },
      { id: "commercial", label: "Commercial", description: "Office, retail, hospitality", icon: Hammer },
      { id: "hoa", label: "HOA / Community", description: "Multi-family or shared spaces", icon: Compass },
    ],
  },
  {
    type: "choice",
    key: "priorities",
    multi: true,
    eyebrow: "Step 03 · Priorities",
    question: "What matters most to you?",
    helper: "Choose as many as fit.",
    options: [
      { id: "curb", label: "Curb appeal", icon: Sparkles },
      { id: "low", label: "Low maintenance", icon: Leaf },
      { id: "luxury", label: "Luxury look", icon: Trophy },
      { id: "family", label: "Family space", icon: Home },
      { id: "water", label: "Water savings", icon: Droplets },
      { id: "fast", label: "Fast turnaround", icon: Clock },
    ],
  },
  {
    type: "upload",
    key: "photos",
    eyebrow: "Step 04 · Inspiration",
    question: "Upload inspiration or project photos.",
    helper: "Drag & drop or browse. Totally optional — but it helps us design faster.",
  },
  {
    type: "choice",
    key: "timeline",
    eyebrow: "Step 05 · Timeline",
    question: "When are you planning to start?",
    options: [
      { id: "asap", label: "ASAP", description: "Within 30 days", icon: Sparkles },
      { id: "soon", label: "1–3 months", description: "Planning to start soon", icon: Clock },
      { id: "planning", label: "Planning phase", description: "3–6 months out", icon: Calendar },
      { id: "exploring", label: "Just exploring", description: "Gathering ideas", icon: Compass },
    ],
  },
  {
    type: "choice",
    key: "budget",
    eyebrow: "Step 06 · Investment",
    question: "What investment range are you considering?",
    helper: "Helps us match the right team — final pricing is always custom.",
    options: [
      { id: "b1", label: "Under $10k", icon: Wallet },
      { id: "b2", label: "$10k – $25k", icon: Wallet },
      { id: "b3", label: "$25k – $75k", icon: Wallet },
      { id: "b4", label: "$75k – $200k", icon: Wallet },
      { id: "b5", label: "$200k+", icon: Trophy },
      { id: "b6", label: "Not sure yet", icon: Sparkles },
    ],
  },
  {
    type: "qualification",
    key: "qualification",
    eyebrow: "Project profile · Ready",
    question: "You may qualify for our priority track.",
    helper: "Based on your project details, our system has matched you with the following:",
  },
  {
    type: "contact",
    key: "contact",
    eyebrow: "Step 07 · Reserve your slot",
    question: "Where should we send your proposal?",
    helper: "A specialist will personally review your project and reach out within one business day.",
  },
];

const transitions: Record<number, string[]> = {
  3: ["Analyzing project requirements", "Matching design priorities", "Loading recommendations"],
  6: ["Preparing your project profile", "Matching project priorities", "Reserving your specialist slot"],
};

interface Answers {
  projectType: string[];
  propertyType: string[];
  priorities: string[];
  photos: File[];
  timeline: string[];
  budget: string[];
  contact: {
    name: string;
    email: string;
    phone: string;
    zip: string;
    notes: string;
  };
}

const initialAnswers: Answers = {
  projectType: [],
  propertyType: [],
  priorities: [],
  photos: [],
  timeline: [],
  budget: [],
  contact: { name: "", email: "", phone: "", zip: "", notes: "" },
};

const realStepIndices = steps
  .map((s, i) => (s.type === "qualification" ? -1 : i))
  .filter((i) => i >= 0);

export function QuoteWizard() {
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [direction, setDirection] = useState(1);
  const [transition, setTransition] = useState<string[] | null>(null);

  const step = steps[stepIdx];

  const realIndex = realStepIndices.indexOf(stepIdx);
  const totalReal = realStepIndices.length;
  const progress =
    realIndex >= 0
      ? ((realIndex + 1) / totalReal) * 100
      : ((stepIdx + 1) / steps.length) * 100;

  const goNext = () => {
    setDirection(1);
    const target = stepIdx + 1;
    if (target >= steps.length) return;

    const t = transitions[target];
    if (t) {
      setTransition(t);
    } else {
      setStepIdx(target);
    }
  };

  const goBack = () => {
    setDirection(-1);
    if (stepIdx > 0) setStepIdx((i) => i - 1);
  };

  const submit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1400));
    setSubmitting(false);
    setSubmitted(true);
  };

  const reset = () => {
    setAnswers(initialAnswers);
    setStepIdx(0);
    setSubmitted(false);
  };

  const canAdvance = useMemo(() => {
    if (step.type === "choice") {
      const v = (answers[step.key as keyof Answers] as string[]) ?? [];
      return v.length > 0;
    }
    if (step.type === "upload") return true;
    if (step.type === "qualification") return true;
    if (step.type === "contact") {
      const c = answers.contact;
      return c.name.trim().length > 1 && /\S+@\S+\.\S+/.test(c.email);
    }
    return false;
  }, [step, answers]);

  if (submitted) {
    return <SuccessScreen answers={answers} onReset={reset} />;
  }

  return (
    <div className="relative isolate grid overflow-hidden rounded-[28px] border border-white/8 bg-gradient-to-br from-ink-800/70 via-ink-900/80 to-ink-950 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)] lg:grid-cols-[1fr_1.4fr]">
      <SidePanel stepIdx={stepIdx} answers={answers} />

      <div className="relative flex min-h-[640px] flex-col p-6 sm:p-10 lg:p-12">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-moss-300/90">
            {step.eyebrow}
          </p>
          <p className="text-xs text-cream-50/55">
            {realIndex >= 0
              ? `${realIndex + 1} / ${totalReal}`
              : `${stepIdx + 1} / ${steps.length}`}
          </p>
        </div>

        <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/5">
          <motion.div
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-full rounded-full bg-gradient-to-r from-moss-400 to-moss-600"
          />
        </div>

        <div className="relative mt-10 flex-1">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={stepIdx}
              custom={direction}
              initial={{ opacity: 0, x: direction * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -24 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="font-display text-balance text-3xl font-light leading-[1.1] tracking-[-0.01em] text-cream-50 sm:text-[40px]">
                {step.question}
              </h3>
              {step.helper && (
                <p className="mt-3 text-sm text-cream-50/60 sm:text-base">
                  {step.helper}
                </p>
              )}

              <div className="mt-8">
                {step.type === "choice" && (
                  <ChoiceGrid
                    step={step}
                    selected={
                      (answers[step.key as keyof Answers] as string[]) ?? []
                    }
                    onChange={(v) =>
                      setAnswers((a) => ({ ...a, [step.key]: v }))
                    }
                  />
                )}
                {step.type === "upload" && (
                  <UploadZone
                    files={answers.photos}
                    onChange={(files) =>
                      setAnswers((a) => ({ ...a, photos: files }))
                    }
                  />
                )}
                {step.type === "qualification" && (
                  <QualificationCard answers={answers} />
                )}
                {step.type === "contact" && (
                  <ContactForm
                    value={answers.contact}
                    onChange={(c) =>
                      setAnswers((a) => ({ ...a, contact: c }))
                    }
                  />
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-between gap-3 border-t border-white/5 pt-6">
          <button
            type="button"
            onClick={goBack}
            disabled={stepIdx === 0}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-cream-50/80 transition hover:border-white/25 hover:text-cream-50 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          {stepIdx < steps.length - 1 ? (
            <button
              type="button"
              onClick={goNext}
              disabled={!canAdvance}
              className={cn(
                "group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition",
                canAdvance
                  ? "bg-cream-50 text-ink-900 hover:bg-cream-100"
                  : "cursor-not-allowed bg-white/5 text-cream-50/30",
              )}
            >
              {step.type === "qualification" ? "Reserve my slot" : "Continue"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={!canAdvance || submitting}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition",
                canAdvance && !submitting
                  ? "bg-gradient-to-r from-moss-500 to-moss-700 text-cream-50 shadow-glow hover:from-moss-400 hover:to-moss-600"
                  : "cursor-not-allowed bg-white/5 text-cream-50/30",
              )}
            >
              {submitting ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-cream-50/40 border-t-cream-50" />
                  Sending
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Submit project request
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {transition && (
          <ProcessingOverlay
            messages={transition}
            onDone={() => {
              setTransition(null);
              setStepIdx((i) => i + 1);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ChoiceGrid({
  step,
  selected,
  onChange,
}: {
  step: Extract<Step, { type: "choice" }>;
  selected: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (id: string) => {
    if (step.multi) {
      onChange(
        selected.includes(id)
          ? selected.filter((x) => x !== id)
          : [...selected, id],
      );
    } else {
      onChange([id]);
    }
  };

  const cols = step.options.length > 4 ? "sm:grid-cols-3" : "sm:grid-cols-2";

  return (
    <div className={cn("grid grid-cols-1 gap-3", cols)}>
      {step.options.map((opt) => {
        const active = selected.includes(opt.id);
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => toggle(opt.id)}
            className={cn(
              "group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300",
              active
                ? "border-moss-400/60 bg-gradient-to-br from-moss-500/15 to-moss-700/10 shadow-glow"
                : "border-white/8 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition",
                  active
                    ? "bg-moss-500/25 text-moss-200"
                    : "bg-white/5 text-cream-50/70 group-hover:bg-white/10",
                )}
              >
                <opt.icon className="h-5 w-5" />
              </div>
              <div
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full border transition",
                  active
                    ? "border-moss-400 bg-moss-500 text-ink-900"
                    : "border-white/15 bg-transparent text-transparent",
                )}
              >
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </div>
            </div>
            <div className="mt-5">
              <p className="text-base font-medium text-cream-50">{opt.label}</p>
              {opt.description && (
                <p className="mt-1 text-xs text-cream-50/55">{opt.description}</p>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function UploadZone({
  files,
  onChange,
}: {
  files: File[];
  onChange: (f: File[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  const addFiles = useCallback(
    (incoming: FileList | File[]) => {
      const list = Array.from(incoming).filter((f) =>
        f.type.startsWith("image/"),
      );
      onChange([...files, ...list].slice(0, 8));
    },
    [files, onChange],
  );

  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
  };

  const remove = (i: number) => {
    onChange(files.filter((_, idx) => idx !== i));
  };

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={onDrop}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center transition-all",
          drag
            ? "border-moss-400/60 bg-moss-500/5"
            : "border-white/10 bg-white/[0.02] hover:border-white/20",
        )}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-moss-500/15 text-moss-200">
          <CloudUpload className="h-6 w-6" />
        </div>
        <p className="mt-4 text-base font-medium text-cream-50">
          Drag &amp; drop photos here
        </p>
        <p className="mt-1 text-sm text-cream-50/55">
          or click to browse from your device
        </p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-cream-50 transition hover:border-white/30 hover:bg-white/10"
        >
          <ImageIcon className="h-4 w-4" />
          Choose photos
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={onFile}
          className="hidden"
        />
      </div>

      {files.length > 0 && (
        <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {files.map((f, i) => (
            <div
              key={i}
              className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-ink-900"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={URL.createObjectURL(f)}
                alt={f.name}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-ink-950/80 text-cream-50 opacity-0 transition group-hover:opacity-100"
                aria-label="Remove"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="mt-4 text-xs text-cream-50/45">
        Optional — you can skip this step.
      </p>
    </div>
  );
}

function QualificationCard({ answers }: { answers: Answers }) {
  const perks = [
    {
      icon: Sparkles,
      title: "Priority scheduling",
      body: "Bypass standard queue with same-week specialist contact.",
    },
    {
      icon: ShieldCheck,
      title: "Complimentary consultation",
      body: "60-minute on-site walkthrough with a senior designer.",
    },
    {
      icon: Compass,
      title: "Custom project planning",
      body: "Tailored design plan with material & layout recommendations.",
    },
    {
      icon: Trophy,
      title: "Premium design recommendations",
      body: "Hand-picked finishes from our luxury material library.",
    },
  ];

  const matched = [
    answers.projectType[0],
    answers.priorities[0],
    answers.timeline[0],
  ].filter(Boolean).length;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-moss-400/30 bg-gradient-to-br from-moss-700/15 via-ink-900/40 to-ink-950 p-6 sm:p-8">
      <div className="absolute -left-20 -top-16 h-56 w-56 rounded-full bg-moss-500/20 blur-3xl" />
      <div className="absolute -right-16 -bottom-20 h-56 w-56 rounded-full bg-moss-700/30 blur-3xl" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-moss-400/40 bg-moss-500/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-moss-200">
          <ShieldCheck className="h-3 w-3" />
          Qualified · {matched}/3 matched
        </div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-cream-50/45">
          Profile #{Math.random().toString(36).slice(2, 7).toUpperCase()}
        </div>
      </div>

      <div className="relative mt-6 grid gap-3 sm:grid-cols-2">
        {perks.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            className="flex gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-moss-500/20 text-moss-200">
              <p.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-cream-50">{p.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-cream-50/60">
                {p.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="relative mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/5 pt-5 text-xs text-cream-50/60"
      >
        <span className="inline-flex items-center gap-1.5">
          <Check className="h-3.5 w-3.5 text-moss-300" />
          Specialist reply &lt; 24 hrs
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Check className="h-3.5 w-3.5 text-moss-300" />
          Transparent itemized pricing
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Check className="h-3.5 w-3.5 text-moss-300" />
          10-year workmanship warranty
        </span>
      </motion.div>
    </div>
  );
}

function ContactForm({
  value,
  onChange,
}: {
  value: Answers["contact"];
  onChange: (c: Answers["contact"]) => void;
}) {
  const set = (k: keyof Answers["contact"], v: string) =>
    onChange({ ...value, [k]: v });

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Field
        icon={User}
        label="Full name"
        value={value.name}
        onChange={(v) => set("name", v)}
        placeholder="Your name"
        required
      />
      <Field
        icon={Mail}
        label="Email"
        type="email"
        value={value.email}
        onChange={(v) => set("email", v)}
        placeholder="you@email.com"
        required
      />
      <Field
        icon={Phone}
        label="Phone"
        type="tel"
        value={value.phone}
        onChange={(v) => set("phone", v)}
        placeholder="(602) 555-0188"
      />
      <Field
        icon={MapPin}
        label="ZIP code"
        value={value.zip}
        onChange={(v) => set("zip", v)}
        placeholder="85254"
      />
      <div className="sm:col-span-2">
        <label className="block text-xs font-medium uppercase tracking-[0.16em] text-cream-50/55">
          Anything else? <span className="lowercase tracking-normal">(optional)</span>
        </label>
        <textarea
          value={value.notes}
          onChange={(e) => set("notes", e.target.value)}
          rows={3}
          placeholder="Tell us a bit more about the vision, the property, the area you want transformed…"
          className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-cream-50 placeholder:text-cream-50/35 focus:border-moss-400/60 focus:bg-white/[0.05] focus:outline-none"
        />
      </div>
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium uppercase tracking-[0.16em] text-cream-50/55">
        {label}
        {required && <span className="ml-1 text-moss-300">*</span>}
      </span>
      <div className="relative mt-2">
        <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cream-50/40" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] py-3.5 pl-11 pr-4 text-sm text-cream-50 placeholder:text-cream-50/35 transition focus:border-moss-400/60 focus:bg-white/[0.05] focus:outline-none"
        />
      </div>
    </label>
  );
}

function SidePanel({
  stepIdx,
  answers,
}: {
  stepIdx: number;
  answers: Answers;
}) {
  const items = [
    { title: "Project", note: "What you're building" },
    { title: "Property", note: "Where it's happening" },
    { title: "Priorities", note: "What matters most" },
    { title: "Inspiration", note: "Photos & ideas" },
    { title: "Timeline", note: "When you want it" },
    { title: "Investment", note: "Budget range" },
    { title: "Match", note: "Your project profile" },
    { title: "Reserve", note: "Specialist contact" },
  ];

  const summary = useMemo(() => {
    const out: string[] = [];
    if (answers.projectType.length)
      out.push(`${answers.projectType.length} service${answers.projectType.length > 1 ? "s" : ""}`);
    if (answers.propertyType.length) out.push(`${answers.propertyType[0]} property`);
    if (answers.priorities.length)
      out.push(`${answers.priorities.length} priorit${answers.priorities.length > 1 ? "ies" : "y"}`);
    if (answers.photos.length)
      out.push(`${answers.photos.length} photo${answers.photos.length > 1 ? "s" : ""}`);
    return out;
  }, [answers]);

  return (
    <div className="relative hidden overflow-hidden border-r border-white/5 bg-gradient-to-br from-moss-900/40 via-ink-900 to-ink-950 p-10 lg:flex lg:flex-col">
      <div className="absolute -left-32 -top-20 h-80 w-80 rounded-full bg-moss-500/20 blur-3xl" />
      <div className="absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-moss-700/30 blur-3xl" />

      <div className="relative">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-cream-50/85 backdrop-blur">
          <Sparkles className="h-3 w-3" />
          Smart Project Intake
        </div>
        <h3 className="font-display mt-6 text-3xl font-light leading-tight tracking-tight text-cream-50">
          A modern way to plan your outdoor project.
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-cream-50/65">
          Answer a few quick questions. A senior designer reviews your project
          personally and gets back to you with a tailored plan.
        </p>
      </div>

      <ol className="relative mt-10 space-y-5">
        {items.map((item, i) => {
          const done = i < stepIdx;
          const active = i === stepIdx;
          return (
            <li key={item.title} className="flex items-start gap-4">
              <div
                className={cn(
                  "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[11px] font-medium transition-all",
                  active &&
                    "border-moss-400 bg-moss-500/20 text-cream-50 shadow-glow",
                  done && "border-moss-400/60 bg-moss-500 text-ink-900",
                  !active && !done && "border-white/15 text-cream-50/45",
                )}
              >
                {done ? (
                  <Check className="h-4 w-4" strokeWidth={3} />
                ) : (
                  String(i + 1).padStart(2, "0")
                )}
                {i < items.length - 1 && (
                  <span
                    className={cn(
                      "absolute left-1/2 top-full h-5 w-px -translate-x-1/2",
                      done ? "bg-moss-400/60" : "bg-white/10",
                    )}
                  />
                )}
              </div>
              <div className="pt-1">
                <p
                  className={cn(
                    "text-sm font-medium transition-colors",
                    active || done ? "text-cream-50" : "text-cream-50/45",
                  )}
                >
                  {item.title}
                </p>
                <p
                  className={cn(
                    "text-xs transition-colors",
                    active ? "text-cream-50/70" : "text-cream-50/35",
                  )}
                >
                  {item.note}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="relative mt-auto pt-8">
        {summary.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {summary.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-cream-50/65"
              >
                {s}
              </span>
            ))}
          </div>
        )}
        <div className="glass rounded-2xl p-5">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-moss-300/80">
            Reply guarantee
          </p>
          <p className="mt-2 text-sm leading-relaxed text-cream-50/80">
            A real specialist will personally review your project and respond
            within <span className="text-cream-50">one business day</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

function ProcessingOverlay({
  messages,
  onDone,
}: {
  messages: string[];
  onDone: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const totalMs = 1800;
  const perMs = totalMs / messages.length;

  useEffect(() => {
    if (idx >= messages.length - 1) {
      const t = setTimeout(onDone, perMs);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setIdx((i) => i + 1), perMs);
    return () => clearTimeout(t);
  }, [idx, messages.length, onDone, perMs]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="absolute inset-0 z-20 flex items-center justify-center rounded-[28px] bg-ink-950/80 backdrop-blur-xl"
    >
      <div className="relative w-full max-w-sm px-6 text-center">
        <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
          <span className="absolute inset-0 rounded-full border border-moss-400/30" />
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-moss-400" />
          <span className="absolute inset-2 rounded-full border border-moss-400/20" />
          <Cpu className="relative h-7 w-7 text-moss-300" />
        </div>

        <div className="mt-8 h-1 w-full overflow-hidden rounded-full bg-white/5">
          <motion.div
            key={idx}
            initial={{ width: `${(idx / messages.length) * 100}%` }}
            animate={{ width: `${((idx + 1) / messages.length) * 100}%` }}
            transition={{ duration: perMs / 1000, ease: "linear" }}
            className="h-full rounded-full bg-gradient-to-r from-moss-400 to-moss-600"
          />
        </div>

        <div className="relative mt-6 h-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="text-sm text-cream-50/85"
            >
              <span className="inline-flex items-center gap-2">
                <ScanLine className="h-3.5 w-3.5 text-moss-300" />
                {messages[idx]}
                <span className="inline-flex gap-0.5">
                  <Dot delay={0} />
                  <Dot delay={0.15} />
                  <Dot delay={0.3} />
                </span>
              </span>
            </motion.p>
          </AnimatePresence>
        </div>

        <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-cream-50/40">
          Securely processing your request
        </p>
      </div>
    </motion.div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <motion.span
      className="inline-block h-1 w-1 rounded-full bg-moss-300"
      animate={{ opacity: [0.2, 1, 0.2] }}
      transition={{ duration: 1, repeat: Infinity, delay }}
    />
  );
}

function SuccessScreen({
  answers,
  onReset,
}: {
  answers: Answers;
  onReset: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-[28px] border border-moss-400/30 bg-gradient-to-br from-moss-700/30 via-ink-900 to-ink-950 p-10 text-center sm:p-16"
    >
      <div className="absolute -left-20 top-10 h-60 w-60 rounded-full bg-moss-500/25 blur-3xl" />
      <div className="absolute -right-20 bottom-10 h-60 w-60 rounded-full bg-moss-700/30 blur-3xl" />

      <div className="relative mx-auto max-w-xl">
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-moss-400 to-moss-700 shadow-glow"
        >
          <CheckCircle2 className="h-10 w-10 text-cream-50" strokeWidth={2.2} />
        </motion.div>

        <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.22em] text-moss-300/90">
          Project request received
        </p>
        <h3 className="font-display mt-4 text-balance text-4xl font-light leading-[1.1] tracking-[-0.01em] text-cream-50 sm:text-5xl">
          Thank you,{" "}
          <span className="text-gradient-emerald italic">
            {answers.contact.name.split(" ")[0] || "friend"}
          </span>
          .
        </h3>
        <p className="mt-5 text-pretty text-base leading-relaxed text-cream-50/75 sm:text-lg">
          Your project details are now with a senior specialist. We&apos;ll
          review everything personally and reach out within{" "}
          <span className="text-cream-50">one business day</span> with next
          steps.
        </p>

        <div className="mt-10 grid gap-3 text-left sm:grid-cols-3">
          {[
            { t: "Now", b: "Specialist reviewing your project" },
            { t: "Today", b: "Quote turnaround prep" },
            { t: "Within 24h", b: "Personal response" },
          ].map((s) => (
            <div
              key={s.t}
              className="rounded-2xl border border-white/8 bg-white/[0.03] p-4"
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-moss-300/80">
                {s.t}
              </p>
              <p className="mt-2 text-sm text-cream-50/85">{s.b}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onReset}
            className="rounded-full border border-white/15 px-5 py-3 text-sm text-cream-50/85 transition hover:border-white/30 hover:text-cream-50"
          >
            Submit another project
          </button>
          <a
            href="#work"
            className="rounded-full bg-cream-50 px-5 py-3 text-sm font-medium text-ink-900 transition hover:bg-cream-100"
          >
            Explore our work
          </a>
        </div>
      </div>
    </motion.div>
  );
}
