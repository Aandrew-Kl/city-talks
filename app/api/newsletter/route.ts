/**
 * POST /api/newsletter — email-only newsletter signup handler.
 *
 * Current behaviour: validates the email with zod, writes a structured
 * `[newsletter]` JSON line to stdout, and returns `{ ok: true }`.
 *
 * ---------------------------------------------------------------------------
 *                    Future backend wiring (DO NOT INSTALL YET)
 * ---------------------------------------------------------------------------
 * Pick ONE provider when a list is created:
 *
 *   - Mailchimp (Marketing API):
 *       env:  MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID, MAILCHIMP_DC (us21…)
 *       POST https://${DC}.api.mailchimp.com/3.0/lists/${LIST_ID}/members
 *         body { email_address, status: "subscribed" }
 *
 *   - Buttondown:
 *       env:  BUTTONDOWN_API_KEY
 *       POST https://api.buttondown.email/v1/subscribers
 *         headers: { Authorization: `Token ${KEY}` }
 *         body { email }
 *
 *   - ConvertKit:
 *       env:  CONVERTKIT_API_KEY, CONVERTKIT_FORM_ID
 *       POST https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe
 *         body { api_key, email }
 *
 * The validation contract stays the same regardless of backend.
 * ---------------------------------------------------------------------------
 */

import { NextResponse } from "next/server";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().trim().email("Μη έγκυρη διεύθυνση email."),
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

  // Honeypot check — pre-schema so bots can't learn the hidden field exists.
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
        channel: "newsletter",
        timestamp: new Date().toISOString(),
        dropped: "honeypot",
      })
    );
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const parsed = newsletterSchema.safeParse(raw);
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
      channel: "newsletter",
      timestamp: new Date().toISOString(),
      payload: { email: data.email },
    })
  );

  // TODO: enrol the subscriber with the selected provider (see header comment).

  return NextResponse.json({ ok: true }, { status: 200 });
}
