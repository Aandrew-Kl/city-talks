"use client";

import { useState, type FormEvent } from "react";

/**
 * Email-only newsletter signup — posts to `/api/newsletter`.
 *
 * Used on the homepage (below the LetsTalk CTA) and reused on /podcasts.
 * Inline pill-shaped input + button, Greek-first copy, accessible live status,
 * honeypot for basic spam protection.
 */
type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

const initialStatus: Status = { kind: "idle" };

export interface NewsletterProps {
  /** Headline; defaults to the generic Greek invite. */
  heading?: string;
  /** Supporting copy below the heading. */
  description?: string;
  /** Visual variant — `onSurface` swaps bg/text colours for dark sections. */
  variant?: "default" | "onSurface";
  /** Override the submit label; default "Εγγραφή". */
  submitLabel?: string;
}

export default function Newsletter({
  heading = "Μείνετε ενημερωμένοι.",
  description = "Αφήστε μας το email σας και θα σας ειδοποιούμε για νέα δημοσιεύματα και επεισόδια.",
  variant = "default",
  submitLabel = "Εγγραφή",
}: NewsletterProps) {
  const [status, setStatus] = useState<Status>(initialStatus);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.kind === "submitting") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "").trim();
    const website = String(formData.get("website") ?? "");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setStatus({
        kind: "error",
        message: "Μη έγκυρη διεύθυνση email.",
      });
      return;
    }

    setStatus({ kind: "submitting" });

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        setStatus({
          kind: "error",
          message:
            body?.error ??
            "Κάτι πήγε στραβά. Δοκιμάστε ξανά σε λίγο.",
        });
        return;
      }

      form.reset();
      setStatus({ kind: "success" });
    } catch {
      setStatus({
        kind: "error",
        message:
          "Δεν ήταν δυνατή η εγγραφή. Ελέγξτε τη σύνδεσή σας και δοκιμάστε ξανά.",
      });
    }
  }

  const isSubmitting = status.kind === "submitting";
  const onSurface = variant === "onSurface";

  return (
    <section
      className={
        onSurface
          ? "ct-newsletter--on-surface w-full rounded-[var(--ct-radius-md)] bg-[color:var(--ct-primary)] p-8 text-[color:var(--ct-on-primary)] sm:p-10"
          : "ct-newsletter w-full rounded-[var(--ct-radius-md)] bg-[color:var(--ct-bg-alt)] p-8 sm:p-10"
      }
      aria-labelledby="newsletter-heading"
    >
      <div className="mx-auto flex max-w-[640px] flex-col items-center gap-3 text-center">
        <h2
          id="newsletter-heading"
          className={
            onSurface
              ? "text-[clamp(24px,3vw,32px)] font-semibold text-[color:var(--ct-on-primary)]"
              : "text-[clamp(24px,3vw,32px)] font-semibold text-[color:var(--ct-ink)]"
          }
        >
          {heading}
        </h2>
        <p
          className={
            onSurface
              ? "text-[15px] text-[color:var(--ct-on-primary-soft)]"
              : "text-[15px] text-[color:var(--ct-text)]"
          }
        >
          {description}
        </p>
        <form
          onSubmit={onSubmit}
          noValidate
          className="mt-4 flex w-full flex-col gap-3 sm:flex-row"
          aria-describedby="newsletter-status"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            autoComplete="email"
            aria-invalid={status.kind === "error" ? true : undefined}
            className={
              onSurface
                ? "flex-1 rounded-[var(--ct-radius-pill)] border border-[rgba(255,255,255,0.35)] bg-[rgba(255,255,255,0.08)] px-5 py-3 text-[15px] text-[color:var(--ct-on-primary)] placeholder:text-[color:var(--ct-on-primary-soft)] focus:border-[color:var(--ct-on-primary)] focus:outline-none"
                : "flex-1 rounded-[var(--ct-radius-pill)] border border-[color:var(--ct-border)] bg-[color:var(--ct-bg)] px-5 py-3 text-[15px] text-[color:var(--ct-ink)] placeholder:text-[color:var(--ct-text-muted)] focus:border-[color:var(--ct-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--ct-primary)]/25"
            }
          />

          {/* Honeypot */}
          <div aria-hidden="true" className="hidden">
            <label htmlFor="newsletter-website">Website</label>
            <input
              id="newsletter-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={
              onSurface
                ? "inline-flex items-center justify-center rounded-[var(--ct-radius-pill)] bg-[color:var(--ct-on-primary)] px-6 py-3 text-[15px] font-semibold text-[color:var(--ct-primary)] transition-colors hover:bg-[color:var(--ct-bg-alt)] disabled:cursor-not-allowed disabled:opacity-60"
                : "inline-flex items-center justify-center rounded-[var(--ct-radius-pill)] bg-[color:var(--ct-primary)] px-6 py-3 text-[15px] font-semibold text-[color:var(--ct-on-primary)] transition-colors hover:bg-[color:var(--ct-primary-700)] disabled:cursor-not-allowed disabled:opacity-60"
            }
          >
            {isSubmitting ? "…" : submitLabel}
          </button>
        </form>

        <p
          id="newsletter-status"
          aria-live="polite"
          aria-atomic="true"
          className="min-h-[1.2em] text-[13px]"
        >
          {status.kind === "success" && (
            <span
              className={
                onSurface
                  ? "text-[color:var(--ct-accent-warm)]"
                  : "text-[color:var(--ct-secondary)]"
              }
            >
              Ευχαριστούμε για την εγγραφή! Θα ακούσετε σύντομα από εμάς.
            </span>
          )}
          {status.kind === "error" && (
            <span className="text-[color:var(--ct-accent)]">
              {status.message}
            </span>
          )}
        </p>
      </div>
    </section>
  );
}
