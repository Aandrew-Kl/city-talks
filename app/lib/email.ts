import { Resend } from "resend";

/**
 * Thin Resend wrapper used by contact & newsletter API routes.
 *
 * Behaviour:
 *  - If RESEND_API_KEY is missing, every helper no-ops and logs to console
 *    (so local dev works without secrets).
 *  - If it's set, we talk to Resend for real.
 *
 * Env vars consumed (all optional except RESEND_API_KEY for real sending):
 *   RESEND_API_KEY            re_xxx  -> enables actual sending
 *   CONTACT_TO_EMAIL          inbox for contact-form messages (default: hello@city-talks.gr)
 *   CONTACT_FROM_EMAIL        verified Resend sender (default: City Talks <no-reply@city-talks.gr>)
 *   NEWSLETTER_AUDIENCE_ID    Resend Audiences id; if absent we fall back to
 *                             content/newsletter-subscribers.json
 */

const API_KEY = process.env.RESEND_API_KEY;
const CONTACT_TO = process.env.CONTACT_TO_EMAIL ?? "hello@city-talks.gr";
const CONTACT_FROM =
  process.env.CONTACT_FROM_EMAIL ?? "City Talks <no-reply@city-talks.gr>";

export const NEWSLETTER_AUDIENCE_ID = process.env.NEWSLETTER_AUDIENCE_ID;
export const RESEND_ENABLED = Boolean(API_KEY);

let client: Resend | null = null;
function getClient(): Resend | null {
  if (!API_KEY) return null;
  if (!client) client = new Resend(API_KEY);
  return client;
}

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Send a contact-form submission to the site inbox via Resend. */
export async function sendContactEmail(
  payload: ContactPayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const r = getClient();
  if (!r) {
    console.log(
      "[email] RESEND_API_KEY missing, skipping send. Payload:",
      JSON.stringify({ ...payload, message: payload.message.slice(0, 80) }),
    );
    return { ok: true };
  }

  const htmlBody = `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px">
      <h2 style="color:#6D0F78;margin:0 0 16px">Νέο μήνυμα από το city-talks.gr</h2>
      <p><strong>Από:</strong> ${escapeHtml(payload.name)} &lt;${escapeHtml(payload.email)}&gt;</p>
      <p><strong>Θέμα:</strong> ${escapeHtml(payload.subject)}</p>
      <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
      <p style="white-space:pre-wrap;line-height:1.55">${escapeHtml(payload.message)}</p>
    </div>
  `.trim();

  try {
    const { error } = await r.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: payload.email,
      subject: `[City Talks] ${payload.subject}`,
      html: htmlBody,
      text: `Από: ${payload.name} <${payload.email}>\nΘέμα: ${payload.subject}\n\n${payload.message}`,
    });
    if (error) {
      console.error("[email] Resend error:", error);
      return { ok: false, error: error.message ?? "Send failed" };
    }
    return { ok: true };
  } catch (err) {
    console.error("[email] send threw:", err);
    return { ok: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

/** Subscribe an email to a Resend Audience. Returns null if no audience configured. */
export async function subscribeNewsletter(
  email: string,
): Promise<{ ok: true; persisted: "resend" | "file" } | { ok: false; error: string }> {
  const r = getClient();
  if (r && NEWSLETTER_AUDIENCE_ID) {
    try {
      const { error } = await r.contacts.create({
        email,
        audienceId: NEWSLETTER_AUDIENCE_ID,
        unsubscribed: false,
      });
      if (error) {
        // Resend returns an error for duplicates — treat as success.
        const msg = error.message ?? "";
        if (/already exist|duplicate/i.test(msg)) {
          return { ok: true, persisted: "resend" };
        }
        console.error("[newsletter] Resend error:", error);
        return { ok: false, error: msg };
      }
      return { ok: true, persisted: "resend" };
    } catch (err) {
      console.error("[newsletter] subscribe threw:", err);
      return {
        ok: false,
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }
  }
  // Caller handles file fallback.
  return { ok: true, persisted: "file" };
}
