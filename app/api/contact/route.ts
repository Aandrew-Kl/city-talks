import { NextResponse } from "next/server";
import { sendContactEmail } from "../../lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
      // Honeypot — a real browser should leave this empty.
      website?: string;
    };
    const { name, email, subject, message, website } = body;

    // Silently drop bot submissions that fill the honeypot.
    if (website && website.trim().length > 0) {
      return NextResponse.json({
        ok: true,
        message: "Ευχαριστούμε! Θα σου απαντήσουμε σύντομα.",
      });
    }

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Συμπλήρωσε όλα τα πεδία." },
        { status: 400 },
      );
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Μη έγκυρο email." }, { status: 400 });
    }
    if (message.length < 10) {
      return NextResponse.json(
        { error: "Γράψε λίγα παραπάνω στο μήνυμά σου." },
        { status: 400 },
      );
    }
    if (message.length > 5000) {
      return NextResponse.json(
        { error: "Το μήνυμά σου είναι πολύ μεγάλο." },
        { status: 400 },
      );
    }

    const result = await sendContactEmail({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    if (!result.ok) {
      return NextResponse.json(
        { error: "Κάτι πήγε στραβά με την αποστολή. Δοκίμασε ξανά σε λίγο." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Ευχαριστούμε! Θα σου απαντήσουμε σύντομα.",
    });
  } catch {
    return NextResponse.json(
      { error: "Σφάλμα επεξεργασίας." },
      { status: 500 },
    );
  }
}
