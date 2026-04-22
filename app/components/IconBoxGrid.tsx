import Link from "next/link";

import { iconBoxes, type IconBox } from "@/app/data";

/**
 * 4-column iconbox grid used on the homepage IA row.
 * Matches WP home: left-aligned text, inline SVG icon top, heading 22px, copy 16px.
 *
 * All icons are inline SVGs — no FontAwesome runtime.
 */
export default function IconBoxGrid() {
  return (
    <section
      aria-label="City Talks sections"
      className="ct-iconbox-section relative w-full bg-[color:var(--ct-bg)] py-16 sm:py-20"
    >
      <div
        className="mx-auto grid grid-cols-1 gap-x-10 gap-y-12 px-5 sm:px-8 md:grid-cols-2 lg:grid-cols-4"
        style={{ maxWidth: "var(--ct-container)" }}
      >
        {iconBoxes.map((box) => (
          <IconBoxCard key={box.slug} box={box} />
        ))}
      </div>
    </section>
  );
}

function IconBoxCard({ box }: { box: IconBox }) {
  return (
    <Link
      href={box.href}
      className="group flex flex-col items-start gap-4 text-left"
    >
      <span className="ct-iconbox-icon inline-flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--ct-bg-alt)] text-[color:var(--ct-primary)] transition-colors group-hover:bg-[color:var(--ct-primary)] group-hover:text-[color:var(--ct-on-primary)]">
        <IconGlyph name={box.icon} />
      </span>

      <h3 className="text-[22px] font-black leading-[1.1] tracking-tight text-[color:var(--ct-ink)] transition-colors group-hover:text-[color:var(--ct-primary)]">
        {box.title}
      </h3>

      <p className="text-[16px] leading-[1.55] text-[color:var(--ct-text-muted)]">
        {box.description}
      </p>

      <span
        aria-hidden="true"
        className="mt-1 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[1.1px] text-[color:var(--ct-primary)] opacity-90 transition-all group-hover:gap-3 group-hover:opacity-100"
      >
        Explore
        <svg
          width="14"
          height="10"
          viewBox="0 0 14 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 1l4 4-4 4M13 5H0"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}

function IconGlyph({ name }: { name: IconBox["icon"] }) {
  // 24x24 line icons matching the WP iconbox vibe (FontAwesome-style outlines)
  switch (name) {
    case "opinions":
      return (
        <svg
          aria-hidden="true"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12a8 8 0 01-11.8 7.05L4 20l1-4.2A8 8 0 1121 12z" />
          <path d="M8.5 11h7M8.5 14h4" />
        </svg>
      );
    case "lets-talk":
      return (
        <svg
          aria-hidden="true"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 5h12a3 3 0 013 3v4a3 3 0 01-3 3H9l-4 3v-3H3z" />
          <path d="M21 10v5a3 3 0 01-3 3h-3" />
        </svg>
      );
    case "podcasts":
      return (
        <svg
          aria-hidden="true"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="9" y="3" width="6" height="12" rx="3" />
          <path d="M5 11a7 7 0 0014 0" />
          <path d="M12 18v3M9 21h6" />
        </svg>
      );
    case "smart-cities":
      return (
        <svg
          aria-hidden="true"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 21V10l5-3v14" />
          <path d="M8 21V5l6-3v19" />
          <path d="M14 21V9l7 3v9" />
          <path d="M3 21h18" />
        </svg>
      );
  }
}
