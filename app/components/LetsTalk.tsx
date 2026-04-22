import Link from "next/link";

import { siteMeta } from "@/app/data";

export interface LetsTalkProps {
  /**
   * Visual variant.
   *   - `card` — rounded purple card, used on the homepage below the articles grid.
   *   - `banner` — full-bleed section for /lets-talk, reused as a "partner up" outro.
   *   - `cta` — compact primary button row, used inline on listing pages.
   */
  variant?: "card" | "banner" | "cta";
  /** Override the headline. */
  heading?: string;
  /** Override the body copy. Supports a single paragraph of plain text. */
  description?: string;
  /** Override the primary button label. */
  ctaLabel?: string;
  /** Override the primary button href. Defaults to `/lets-talk`. */
  ctaHref?: string;
}

/**
 * Partnership CTA block.
 *
 * Default usage on the homepage is the rounded purple `card` variant — sits
 * directly below the featured articles grid and invites readers to reach out.
 * The `banner` variant is used at the bottom of /lets-talk itself (hence why
 * this component is safe to mount on both places with different variant props).
 */
export default function LetsTalk({
  variant = "card",
  heading = "Θέλετε να μιλήσουμε;",
  description = "Ψάχνετε για συνεργασία, έχετε μια ιστορία να μοιραστείτε ή μια ιδέα που θα ωφελήσει τους Δήμους; Στείλτε μας μήνυμα — θα χαρούμε να σας ακούσουμε.",
  ctaLabel = "Send a message",
  ctaHref = "/lets-talk",
}: LetsTalkProps) {
  if (variant === "cta") {
    return (
      <div className="flex flex-wrap items-center gap-3 text-[15px] text-[color:var(--ct-text)]">
        <span>{heading}</span>
        <Link
          href={ctaHref}
          className="inline-flex items-center justify-center rounded-[var(--ct-radius-pill)] bg-[color:var(--ct-primary)] px-5 py-2 text-[14px] font-semibold text-[color:var(--ct-on-primary)] transition-colors hover:bg-[color:var(--ct-primary-700)]"
        >
          {ctaLabel}
        </Link>
      </div>
    );
  }

  const surfaceClasses =
    variant === "banner"
      ? "bg-[color:var(--ct-primary)] text-[color:var(--ct-on-primary)]"
      : "bg-gradient-to-br from-[color:var(--ct-primary)] to-[color:var(--ct-primary-300)] text-[color:var(--ct-on-primary)]";

  return (
    <section
      aria-labelledby="letstalk-heading"
      className={`ct-letstalk w-full ${variant === "banner" ? "" : "px-5 py-20 sm:px-8 lg:py-24"}`}
    >
      <div
        className={
          variant === "banner"
            ? `${surfaceClasses} relative isolate w-full overflow-hidden`
            : `${surfaceClasses} relative isolate mx-auto overflow-hidden rounded-[clamp(24px,4vw,40px)] shadow-[var(--ct-shadow-md)]`
        }
        style={
          variant === "banner"
            ? undefined
            : { maxWidth: "var(--ct-container)" }
        }
      >
        <div
          className={
            variant === "banner"
              ? "mx-auto flex flex-col gap-8 px-5 py-20 sm:px-8 md:flex-row md:items-center md:gap-12 md:py-28"
              : "flex flex-col gap-8 p-8 sm:p-12 md:flex-row md:items-center md:gap-12 md:p-16"
          }
          style={
            variant === "banner"
              ? { maxWidth: "var(--ct-container)" }
              : undefined
          }
        >
          <div className="flex-1">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[color:var(--ct-on-primary-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[1.1px] text-[color:var(--ct-on-primary-soft)]">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--ct-accent-warm)]" />
              Let&apos;s Talk
            </p>
            <h2
              id="letstalk-heading"
              className="font-[family-name:var(--ct-font-display)] text-[clamp(32px,4.5vw,50px)] font-medium leading-[1.05] tracking-tight text-[color:var(--ct-on-primary)]"
            >
              {heading}
            </h2>
            <p className="mt-4 max-w-[560px] text-[16px] leading-[1.6] text-[color:var(--ct-on-primary-soft)]">
              {description}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-start">
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center rounded-[var(--ct-radius-pill)] bg-[color:var(--ct-on-primary)] px-7 py-3.5 text-[15px] font-semibold text-[color:var(--ct-primary)] transition-colors hover:bg-[color:var(--ct-bg-alt)]"
            >
              {ctaLabel}
            </Link>
            <a
              href={`mailto:${siteMeta.email}`}
              className="inline-flex items-center justify-center rounded-[var(--ct-radius-pill)] border border-[color:var(--ct-on-primary-soft)] px-7 py-3.5 text-[15px] font-semibold text-[color:var(--ct-on-primary)] transition-colors hover:border-[color:var(--ct-on-primary)] hover:bg-[rgba(255,255,255,0.08)]"
            >
              {siteMeta.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
