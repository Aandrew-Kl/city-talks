/**
 * POST /api/contact — contact form handler.
 *
 * Current behaviour: validates the payload with zod, writes a structured
 * `[contact]` JSON line to stdout, and returns `{ ok: true }`.
 *
 * ---------------------------------------------------------------------------
 *                    Future backend wiring (DO NOT INSTALL YET)
 * ---------------------------------------------------------------------------
 * Pick ONE of the following when a mail provider is selected:
 *
 *   - Resend (recommended):
 *       npm i resend
 *       env:  RESEND_API_KEY, RESEND_FROM, RESEND_TO
 *       replace the `// TODO: send` block with:
 *         const { Resend } = await import("resend");
 *         const resend = new Resend(process.env.RESEND_API_KEY);
 *         await resend.emails.send({
 *           from: process.env.RESEND_FROM!,
 *           to: process.env.RESEND_TO!.split(","),
 *           subject: `[city-talks] ${data.subject}`,
 *           replyTo: data.email,
 *           text: `${data.name} <${data.email}>\n\n${data.message}`,
 *         });
 *
 *   - SMTP via nodemailer:
 *       npm i nodemailer && npm i -D @types/nodemailer
 *       env:  SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO
 *
 *   - Formspree / Formsubmit / Getform:
 *       env:  CONTACT_FORWARD_URL  — POST the same payload and forward status
 *
 * The validation contract stays the same regardless of backend.
 * ---------------------------------------------------------------------------
 */

import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Contact schema. The honeypot (`website`) is optional but MUST be empty —
 * anything else triggers a silent 200 so bots don't learn the trick.
 */
const contactSchema = z.object({
  name: z.string().trim().min(2, "Συμπληρώστε το όνομά σας.").max(120),
  email: z.string().trim().email("Μη έγκυρη διεύθυνση email."),
  subject: z.string().trim().min(2, "Συμπληρώστε το θέμα.").max(200),
  message: z.string().trim().min(5, "Γράψτε το μήνυμά σας.").max(5000),
});

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  // Honeypot check — runs BEFORE schema validation so bots never see the
  // "too big" error that would reveal the hidden field's existence.
  // Humans leave `website` blank; bots autofill it.
  if (
    raw &&
    typeof raw === "object" &&
    "website" in raw &&
    typeof (raw as { website: unknown }).website === "string" &&
    (raw as { website: string }).website.length > 0
  ) {
    // eslint-disable-next-line no-console -- structured API audit log.
    console.log(
      JSON.stringify({
        channel: "contact",
        timestamp: new Date().toISOString(),
        dropped: "honeypot",
      })
    );
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "_");
      (fieldErrors[key] ??= []).push(issue.message);
    }
    return NextResponse.json(
      { ok: false, error: "Validation failed.", fieldErrors },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // eslint-disable-next-line no-console -- structured API audit log.
  console.log(
    JSON.stringify({
      channel: "contact",
      timestamp: new Date().toISOString(),
      payload: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      },
    })
  );

  // TODO: send via selected provider (see header comment).

  return NextResponse.json({ ok: true }, { status: 200 });
}
