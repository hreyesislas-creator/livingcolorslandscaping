import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  businessEmailHtml,
  customerEmailHtml,
  type Lead,
} from "@/lib/emails";
import { siteConfig } from "@/lib/seo";

export const runtime = "nodejs";
export const maxDuration = 20;

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "image/gif",
]);
const MAX_FILE_BYTES = 8 * 1024 * 1024; // 8 MB per file
const MAX_TOTAL_ATTACH = 4 * 1024 * 1024; // ~4 MB total (Vercel request-body ceiling)
const MAX_FILES = 8;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function bad(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function POST(request: Request) {
  // 1. Parse multipart form
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return bad("Could not read the submission. Please try again.");
  }

  // 2. Parse + validate the lead payload
  const raw = form.get("lead");
  if (typeof raw !== "string") return bad("Missing submission data.");

  let lead: Lead;
  try {
    lead = JSON.parse(raw) as Lead;
  } catch {
    return bad("Malformed submission data.");
  }

  const name = (lead.contact?.name || "").trim();
  const email = (lead.contact?.email || "").trim();
  if (name.length < 2) return bad("Please enter your name.");
  if (!EMAIL_RE.test(email)) return bad("Please enter a valid email address.");

  // Normalise/guard the shape used by the templates
  lead.contact.name = name;
  lead.contact.email = email;
  lead.summary = lead.summary ?? {
    projectType: [],
    propertyType: "",
    priorities: [],
    timeline: "",
    budget: "",
  };
  lead.steps = Array.isArray(lead.steps) ? lead.steps : [];
  lead.omittedPhotos = Array.isArray(lead.omittedPhotos)
    ? lead.omittedPhotos
    : [];

  // 3. Validate + collect uploaded photos as attachments
  const attachments: { filename: string; content: Buffer }[] = [];
  const omitted: string[] = [...lead.omittedPhotos];
  let total = 0;

  const entries = [...form.entries()].filter(
    ([k, v]) => k.startsWith("photo") && v instanceof File,
  ) as [string, File][];

  for (const [, file] of entries.slice(0, MAX_FILES)) {
    if (!ALLOWED_TYPES.has(file.type)) {
      omitted.push(file.name);
      continue;
    }
    if (file.size > MAX_FILE_BYTES || total + file.size > MAX_TOTAL_ATTACH) {
      omitted.push(file.name);
      continue;
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    attachments.push({ filename: file.name || "photo.jpg", content: buffer });
    total += file.size;
  }
  lead.photoCount = attachments.length;
  lead.omittedPhotos = omitted;

  // 4. Configuration guards (never expose the key)
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[quote] RESEND_API_KEY is not set");
    return bad("Email service is not configured yet. Please try again later.", 503);
  }
  const businessTo = process.env.LEAD_NOTIFICATION_EMAIL;
  if (!businessTo) {
    console.error("[quote] LEAD_NOTIFICATION_EMAIL is not set");
    return bad("Destination inbox is not configured yet. Please try again later.", 503);
  }
  const from =
    process.env.RESEND_FROM_EMAIL ||
    "Living Colors Landscape <onboarding@resend.dev>";

  const resend = new Resend(apiKey);

  // 5. Send the business notification (the lead itself) — this MUST succeed
  try {
    const { error } = await resend.emails.send({
      from,
      to: businessTo,
      replyTo: email,
      subject: `New project request — ${name}`,
      html: businessEmailHtml(lead),
      attachments: attachments.length ? attachments : undefined,
    });
    if (error) {
      console.error("[quote] business email failed:", error);
      return bad(
        "We couldn't send your request just now. Please try again.",
        502,
      );
    }
  } catch (err) {
    console.error("[quote] business email threw:", err);
    return bad("We couldn't send your request just now. Please try again.", 502);
  }

  // 6. Send the customer confirmation — best-effort (lead is already captured)
  let customerEmail: "sent" | "failed" = "sent";
  try {
    const { error } = await resend.emails.send({
      from,
      to: email,
      subject: "We Received Your Project Request",
      html: customerEmailHtml(lead),
    });
    if (error) {
      customerEmail = "failed";
      console.error("[quote] customer email failed:", error);
    }
  } catch (err) {
    customerEmail = "failed";
    console.error("[quote] customer email threw:", err);
  }

  return NextResponse.json({
    ok: true,
    customerEmail,
    photosAttached: attachments.length,
    photosOmitted: omitted.length,
  });
}
