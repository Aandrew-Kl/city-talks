import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import {
  NEWSLETTER_AUDIENCE_ID,
  RESEND_ENABLED,
  subscribeNewsletter,
} from "../../lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUBSCRIBERS_FILE = path.join(
  process.cwd(),
  "content",
  "newsletter-subscribers.json",
);

type SubscriberRecord = {
  email: string;
  subscribedAt: string;
};

async function appendToFile(email: string): Promise<void> {
  const dir = path.dirname(SUBSCRIBERS_FILE);
  await fs.mkdir(dir, { recursive: true });

  let list: SubscriberRecord[] = [];
  try {
    const raw = await fs.readFile(SUBSCRIBERS_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) list = parsed as SubscriberRecord[];
  } catch {
    // File does not exist yet or is empty; start fresh.
  }

  const normalized = email.toLowerCase();
  if (list.some((r) => r.email.toLowerCase() === normalized)) return;

  list.push({ email, subscribedAt: new Date().toISOString() });
  await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(list, null, 2), "utf8");
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { email?: string; website?: string };
    const { email, website } = body;

    // Honeypot — silently pretend success.
    if (website && website.trim().length > 0) {
      return NextResponse.json({
        ok: true,
        message: "Ευχαριστούμε! Θα σε ενημερώνουμε για νέα άρθρα και podcasts.",
      });
    }

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Μη έγκυρο email." },
        { status: 400 },
      );
    }

    const trimmed = email.trim();

    // Try Resend Audiences first (if configured), otherwise JSON file.
    if (RESEND_ENABLED && NEWSLETTER_AUDIENCE_ID) {
      const res = await subscribeNewsletter(trimmed);
      if (!res.ok) {
        return NextResponse.json(
          { error: "Δεν μπορέσαμε να σε εγγράψουμε. Δοκίμασε ξανά." },
          { status: 502 },
        );
      }
    } else {
      try {
        await appendToFile(trimmed);
      } catch (err) {
        console.error("[newsletter] file write failed:", err);
        return NextResponse.json(
          { error: "Δεν μπορέσαμε να σε εγγράψουμε. Δοκίμασε ξανά." },
          { status: 500 },
        );
      }
      console.log("[newsletter] new subscriber appended to file:", trimmed);
    }

    return NextResponse.json({
      ok: true,
      message: "Ευχαριστούμε! Θα σε ενημερώνουμε για νέα άρθρα και podcasts.",
    });
  } catch {
    return NextResponse.json(
      { error: "Σφάλμα επεξεργασίας." },
      { status: 500 },
    );
  }
}
