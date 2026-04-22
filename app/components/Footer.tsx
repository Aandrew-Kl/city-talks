import Link from "next/link";

import { footerMenu, siteMeta, socialLinks } from "@/app/data";
import Logo from "@/app/components/Logo";

/**
 * Purple marketing footer.
 *
 * Server component — the rotating-keyword animation is pure CSS keyframes
 * (defined in globals.css → `.ct-rotator`) so no client JS is needed.
 */
export default function Footer() {
  const { rotatingLead, rotatingKeywords, invitation, copyright } = siteMeta.footer;

  return (
    <footer
      className="ct-footer mt-auto bg-[color:var(--ct-primary)] text-[color:var(--ct-on-primary)]"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        City Talks footer
      </h2>

      <div
        className="mx-auto px-5 py-20 sm:px-8 lg:py-24"
        style={{ maxWidth: "var(--ct-container)" }}
      >
        {/* Row 1 — rotating headline + invitation */}
        <div className="hidden items-start justify-between gap-12 md:flex">
          <p className="ct-rotate-heading font-[family-name:var(--ct-font-display)] text-[clamp(44px,7vw,65px)] font-medium leading-[1.02] tracking-tight text-[color:var(--ct-on-primary)]">
            <span>{rotatingLead} </span>
            <span
              className="ct-rotator relative inline-block align-baseline font-[family-name:var(--ct-font-accent)] italic"
              aria-label={rotatingKeywords.join(", ")}
            >
              {rotatingKeywords.map((word, i) => (
                <span
                  key={word}
                  className="ct-rotator-word"
                  style={{ animationDelay: `${i * 3}s` }}
                >
                  {word}
                </span>
              ))}
              {/* Invisible longest-word spacer keeps layout stable */}
              <span aria-hidden="true" className="ct-rotator-spacer">
                {rotatingKeywords.reduce((a, b) => (b.length > a.length ? b : a), "")}
              </span>
            </span>
          </p>
          <p className="max-w-[360px] pt-4 text-[15px] leading-relaxed text-[color:var(--ct-on-primary-soft)]">
            {invitation.split(siteMeta.email).flatMap((chunk, i, arr) =>
              i < arr.length - 1
                ? [
                    chunk,
                    <a
                      key={i}
                      href={`mailto:${siteMeta.email}`}
                      className="underline decoration-[color:var(--ct-on-primary-soft)] underline-offset-2 hover:text-[color:var(--ct-on-primary)]"
                    >
                      {siteMeta.email}
                    </a>,
                  ]
                : [chunk]
            )}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-3">
          {/* Col 1: wordmark */}
          <div>
            <Logo variant="light" width={170} />
            <p className="mt-4 max-w-[260px] text-[14px] leading-relaxed text-[color:var(--ct-on-primary-soft)]">
              {siteMeta.greekTagline}.
            </p>
          </div>

          {/* Col 2: menu */}
          <div>
            <h3 className="mb-4 text-[18px] font-semibold tracking-tight text-[color:var(--ct-on-primary)]">
              Menu
            </h3>
            <ul className="space-y-3">
              {footerMenu.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[15px] text-[color:var(--ct-on-primary-soft)] transition-colors hover:text-[color:var(--ct-on-primary)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: contact */}
          <div>
            <h3 className="mb-4 text-[18px] font-semibold tracking-tight text-[color:var(--ct-on-primary)]">
              Contact us
            </h3>
            <a
              href={`mailto:${siteMeta.email}`}
              className="text-[17px] font-medium text-[color:var(--ct-on-primary)] underline decoration-[color:var(--ct-on-primary-soft)] underline-offset-4 hover:decoration-[color:var(--ct-on-primary)]"
            >
              {siteMeta.email}
            </a>
            <ul className="mt-6 flex items-center gap-3">
              {socialLinks.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--ct-on-primary-soft)] text-[color:var(--ct-on-primary)] transition-colors hover:border-[color:var(--ct-on-primary)] hover:bg-[color:var(--ct-on-primary)] hover:text-[color:var(--ct-primary)]"
                  >
                    <FooterSocialIcon name={s.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[rgba(255,255,255,0.18)] pt-6 text-[13px] text-[color:var(--ct-on-primary-soft)] md:flex-row md:items-center">
          <p>{copyright}</p>
          <p>
            <a
              href={`mailto:${siteMeta.email}`}
              className="text-[color:var(--ct-on-primary-soft)] hover:text-[color:var(--ct-on-primary)]"
            >
              {siteMeta.email}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterSocialIcon({
  name,
}: {
  name: "facebook" | "youtube" | "instagram" | "x";
}) {
  switch (name) {
    case "facebook":
      return (
        <svg
          aria-hidden="true"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="currentColor"
        >
          <path d="M8.4 14V7.5h1.98l.3-2.3H8.4v-1.5c0-.66.18-1.1 1.12-1.1h1.2V.1C10.5.05 9.8 0 9 0 7.3 0 6.1 1.04 6.1 2.95V5.2H4.1v2.3h2V14h2.3z" />
        </svg>
      );
    case "youtube":
      return (
        <svg
          aria-hidden="true"
          width="16"
          height="14"
          viewBox="0 0 16 14"
          fill="currentColor"
        >
          <path d="M15.66 2.18a2 2 0 00-1.4-1.4C13 .5 8 .5 8 .5s-5 0-6.26.28A2 2 0 00.34 2.18 21 21 0 000 6.5a21 21 0 00.34 4.32 2 2 0 001.4 1.4C3 12.5 8 12.5 8 12.5s5 0 6.26-.28a2 2 0 001.4-1.4A21 21 0 0016 6.5a21 21 0 00-.34-4.32zM6.4 9V4l4.4 2.5-4.4 2.5z" />
        </svg>
      );
    case "instagram":
      return (
        <svg
          aria-hidden="true"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
        >
          <rect x="1" y="1" width="12" height="12" rx="3" />
          <circle cx="7" cy="7" r="2.6" />
          <circle cx="10.4" cy="3.6" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      );
    case "x":
      return (
        <svg
          aria-hidden="true"
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="currentColor"
        >
          <path d="M9.9 0h2l-4.4 5 5.2 8H8.6l-3.2-4.8L1.6 13H0l4.7-5.4L0 0h4.1l2.9 4.3L9.9 0z" />
        </svg>
      );
  }
}
