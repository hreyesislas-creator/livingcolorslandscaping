import { siteConfig } from "./seo";

/* ---------------------------------------------------------------- */
/*  Lead types (shared by the API route + email templates)          */
/* ---------------------------------------------------------------- */

export interface LeadContact {
  name: string;
  email: string;
  phone?: string;
  zip?: string;
  notes?: string;
}

export interface LeadSummary {
  projectType: string[];
  propertyType: string;
  priorities: string[];
  timeline: string;
  budget: string;
}

export interface LeadStep {
  question: string;
  answer: string;
}

export interface Lead {
  contact: LeadContact;
  summary: LeadSummary;
  steps: LeadStep[];
  photoCount: number;
  omittedPhotos: string[];
}

/* ---------------------------------------------------------------- */
/*  Helpers                                                          */
/* ---------------------------------------------------------------- */

/** Escape user-supplied text before interpolating into email HTML. */
export function esc(input: string | undefined | null): string {
  if (!input) return "";
  return String(input)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const INK = "#07100b";
const MOSS = "#2c9655";
const CREAM = "#f7f4ec";

function shell(title: string, inner: string): string {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(
    title,
  )}</title></head>
<body style="margin:0;padding:0;background:#eef1ee;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1a2620;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef1ee;padding:24px 0;">
  <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 40px rgba(7,16,11,0.10);">
      <tr><td style="background:${INK};padding:26px 32px;">
        <table role="presentation" cellpadding="0" cellspacing="0"><tr>
          <td style="width:44px;height:44px;background:linear-gradient(135deg,${MOSS},#195f36);border-radius:12px;color:${CREAM};font-weight:700;font-size:18px;text-align:center;letter-spacing:-1px;vertical-align:middle;">LC</td>
          <td style="padding-left:14px;color:${CREAM};font-size:16px;font-weight:600;letter-spacing:0.5px;">Living Colors Landscape<br><span style="font-size:11px;font-weight:400;color:#7ecf97;letter-spacing:2px;text-transform:uppercase;">Greater Los Angeles</span></td>
        </tr></table>
      </td></tr>
      ${inner}
      <tr><td style="background:#f4f6f4;padding:20px 32px;color:#6a766f;font-size:12px;line-height:1.6;">
        ${esc(siteConfig.name)} · <a href="tel:${siteConfig.phoneHref.replace(
          "tel:",
          "",
        )}" style="color:${MOSS};text-decoration:none;">${esc(
          siteConfig.phone,
        )}</a> · <a href="${siteConfig.url}" style="color:${MOSS};text-decoration:none;">${siteConfig.url.replace(
          "https://",
          "",
        )}</a><br>Licensed &amp; insured · Premium landscape design–build.
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

function row(label: string, value: string): string {
  if (!value) return "";
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #eef1ee;color:#6a766f;font-size:13px;width:150px;vertical-align:top;">${esc(
      label,
    )}</td>
    <td style="padding:10px 0;border-bottom:1px solid #eef1ee;color:#1a2620;font-size:14px;font-weight:500;">${value}</td>
  </tr>`;
}

/* ---------------------------------------------------------------- */
/*  Business notification email                                     */
/* ---------------------------------------------------------------- */

export function businessEmailHtml(lead: Lead): string {
  const c = lead.contact;
  const s = lead.summary;

  const contactRows =
    row("Name", esc(c.name)) +
    row(
      "Email",
      `<a href="mailto:${esc(c.email)}" style="color:${MOSS};text-decoration:none;">${esc(
        c.email,
      )}</a>`,
    ) +
    row(
      "Phone",
      c.phone
        ? `<a href="tel:${esc(c.phone)}" style="color:${MOSS};text-decoration:none;">${esc(
            c.phone,
          )}</a>`
        : "",
    ) +
    row("ZIP / Area", esc(c.zip || ""));

  const projectRows =
    row("Project type", esc(s.projectType.join(", "))) +
    row("Property type", esc(s.propertyType)) +
    row("Timeline", esc(s.timeline)) +
    row("Budget", esc(s.budget)) +
    row("Goals / priorities", esc(s.priorities.join(", ")));

  const stepRows = lead.steps
    .map((st) => row(st.question, esc(st.answer)))
    .join("");

  const notesBlock = c.notes
    ? `<tr><td style="padding:22px 32px 4px;"><p style="margin:0 0 6px;color:#6a766f;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Customer notes</p><p style="margin:0;color:#1a2620;font-size:14px;line-height:1.6;background:#f4f6f4;border-radius:10px;padding:14px 16px;white-space:pre-wrap;">${esc(
        c.notes,
      )}</p></td></tr>`
    : "";

  let photosBlock = "";
  if (lead.photoCount > 0 || lead.omittedPhotos.length > 0) {
    const attached = lead.photoCount;
    const omitted = lead.omittedPhotos.length
      ? `<p style="margin:8px 0 0;color:#a9642b;font-size:13px;">${lead.omittedPhotos.length} additional photo(s) exceeded the email size limit and were not attached: ${esc(
          lead.omittedPhotos.join(", "),
        )}. Follow up with the customer to collect them.</p>`
      : "";
    photosBlock = `<tr><td style="padding:22px 32px 4px;"><p style="margin:0 0 6px;color:#6a766f;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Uploaded photos</p><p style="margin:0;color:#1a2620;font-size:14px;">${attached} photo(s) attached to this email.${omitted ? "" : ""}</p>${omitted}</td></tr>`;
  }

  const inner = `
    <tr><td style="padding:30px 32px 8px;">
      <p style="margin:0;color:${MOSS};font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;">New project request</p>
      <h1 style="margin:8px 0 0;font-size:24px;font-weight:600;color:${INK};">${esc(
        c.name,
      )}</h1>
      <p style="margin:6px 0 0;color:#6a766f;font-size:14px;">wants a quote — reply directly to this email to reach the customer.</p>
    </td></tr>

    <tr><td style="padding:22px 32px 4px;">
      <p style="margin:0 0 4px;color:#6a766f;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Customer information</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${contactRows}</table>
    </td></tr>

    <tr><td style="padding:22px 32px 4px;">
      <p style="margin:0 0 4px;color:#6a766f;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Project information</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${projectRows}</table>
    </td></tr>

    <tr><td style="padding:22px 32px 4px;">
      <p style="margin:0 0 4px;color:#6a766f;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Every answer</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${stepRows}</table>
    </td></tr>

    ${notesBlock}
    ${photosBlock}

    <tr><td style="padding:26px 32px 30px;">
      <a href="mailto:${esc(
        c.email,
      )}" style="display:inline-block;background:${MOSS};color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 24px;border-radius:999px;">Reply to ${esc(
        c.name.split(" ")[0] || "customer",
      )}</a>
    </td></tr>
  `;

  return shell("New project request", inner);
}

/* ---------------------------------------------------------------- */
/*  Customer confirmation email                                     */
/* ---------------------------------------------------------------- */

export function customerEmailHtml(lead: Lead): string {
  const first = lead.contact.name.split(" ")[0] || "there";
  const inner = `
    <tr><td style="padding:34px 32px 8px;">
      <h1 style="margin:0;font-size:24px;font-weight:600;color:${INK};">Thank you, ${esc(
        first,
      )} — we've got your request.</h1>
    </td></tr>
    <tr><td style="padding:8px 32px 4px;color:#3a463f;font-size:15px;line-height:1.7;">
      <p style="margin:0 0 14px;">Your project request has been received successfully. Thank you for considering ${esc(
        siteConfig.name,
      )} for your outdoor transformation.</p>
      <p style="margin:0 0 14px;">Our team is already <strong>reviewing your project details</strong>. A senior specialist will personally review everything you shared and <strong>reach out to you shortly</strong> — typically within one business day.</p>
      <p style="margin:0 0 14px;">If your timeline is urgent, feel free to call us directly at <a href="${siteConfig.phoneHref}" style="color:${MOSS};text-decoration:none;font-weight:600;">${esc(
        siteConfig.phone,
      )}</a>.</p>
    </td></tr>
    <tr><td style="padding:14px 32px 32px;">
      <a href="${siteConfig.url}" style="display:inline-block;background:${INK};color:${CREAM};text-decoration:none;font-size:14px;font-weight:600;padding:12px 26px;border-radius:999px;">Explore our work</a>
    </td></tr>
    <tr><td style="padding:0 32px 30px;color:#8a948d;font-size:13px;line-height:1.6;border-top:1px solid #eef1ee;padding-top:20px;">
      Warm regards,<br><strong style="color:${INK};">The ${esc(
        siteConfig.name,
      )} Team</strong>
    </td></tr>
  `;
  return shell("We Received Your Project Request", inner);
}
