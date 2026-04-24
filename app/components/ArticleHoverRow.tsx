"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { withBasePath } from "@/lib/basePath";

export interface ArticleHoverRowProps {
  flip: boolean;
  href: string;
  categoryLabel: string;
  accentColor: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  author: string;
  featuredImage: string;
  authorPortrait?: string;
}

/**
 * One L/R alternating article block with the live-site hover reveal:
 *   • default: decorative purple blob + dashed outline circle + dot grid
 *   • on hover: featured photo fades in as a rounded rectangle, circular
 *     author portrait fades in on top, green author pill stays anchored.
 */
export default function ArticleHoverRow({
  flip,
  href,
  categoryLabel,
  accentColor,
  title,
  subtitle,
  excerpt,
  author,
  featuredImage,
  authorPortrait,
}: ArticleHoverRowProps) {
  const [hover, setHover] = useState(false);

  return (
    <article
      className="ct-article-row"
      data-flip={flip ? "true" : "false"}
      onMouseEnter={() => setHover(true)}
      onFocus={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onBlur={() => setHover(false)}
    >
      <div className="ct-article-row-media">
        {/* Decorative background stack (always visible) */}
        <span
          aria-hidden="true"
          className="ct-decor-dots"
          style={{
            top: flip ? "auto" : "-36px",
            bottom: flip ? "-36px" : "auto",
            left: flip ? "auto" : "-44px",
            right: flip ? "-44px" : "auto",
          }}
        />
        <span
          aria-hidden="true"
          className="ct-decor-circle"
          style={{
            width: "108%",
            height: "108%",
            top: "-4%",
            left: "-4%",
            opacity: 0.35,
          }}
        />
        {/* Purple filled blob — present before hover, mutes on hover */}
        <span
          aria-hidden="true"
          className="absolute rounded-full"
          style={{
            width: "62%",
            height: "46%",
            top: "-6%",
            right: flip ? "auto" : "-8%",
            left: flip ? "-8%" : "auto",
            background: "var(--ct-primary)",
            transition: "opacity 0.45s ease",
            opacity: hover ? 0 : 1,
          }}
        />

        {/* Featured image — hidden by default, fades in on hover */}
        <Link
          href={href}
          aria-label={title}
          className="relative block h-full w-full overflow-hidden rounded-[24px] bg-[color:var(--ct-bg-alt)] shadow-[var(--ct-shadow-md)] transition-opacity duration-500 ease-out"
          style={{ opacity: hover ? 1 : 0 }}
        >
          <Image
            src={withBasePath(featuredImage)}
            alt={title}
            fill
            sizes="(min-width: 900px) 45vw, 90vw"
            className="object-cover"
          />
        </Link>

        {/* Circular author portrait — only if provided, fades in on hover */}
        {authorPortrait && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute rounded-full overflow-hidden border-[4px] border-white shadow-[0_12px_28px_rgba(13,6,14,0.25)] transition-opacity duration-500 ease-out"
            style={{
              width: "40%",
              height: "48%",
              bottom: "10%",
              left: flip ? "auto" : "6%",
              right: flip ? "6%" : "auto",
              opacity: hover ? 1 : 0,
            }}
          >
            <Image
              src={withBasePath(authorPortrait)}
              alt={author}
              fill
              sizes="(min-width: 900px) 18vw, 40vw"
              className="object-cover object-top"
            />
          </span>
        )}

        {/* Green author pill — always visible */}
        <span className="ct-author-pill">{author}</span>
      </div>

      <div className="ct-article-row-body flex flex-col gap-5">
        <p
          className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[1.4px]"
          style={{ color: accentColor }}
        >
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: accentColor }}
          />
          {categoryLabel}
        </p>
        <h3
          className="font-[family-name:var(--ct-font-display)] text-[color:var(--ct-ink)]"
          style={{
            fontSize: "clamp(32px, 5vw, 64px)",
            lineHeight: 1.05,
            fontWeight: 500,
            letterSpacing: "-0.01em",
          }}
        >
          <Link href={href} className="hover:text-[color:var(--ct-primary)]">
            {title}
          </Link>
        </h3>
        {subtitle && (
          <p className="text-[18px] font-semibold italic text-[color:var(--ct-ink-2)]">
            {subtitle}
          </p>
        )}
        <p className="max-w-[500px] text-[15px] leading-[1.7] text-[color:var(--ct-text)]">
          {excerpt}
        </p>
        <Link
          href={href}
          className="group mt-2 inline-flex items-center gap-3 text-[15px] font-semibold text-[color:var(--ct-primary)]"
        >
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--ct-primary)]/30 text-[color:var(--ct-primary)] transition-colors group-hover:bg-[color:var(--ct-primary)] group-hover:text-white">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="2" width="6" height="12" rx="3" />
              <path d="M5 10a7 7 0 0 0 14 0" />
              <path d="M12 17v4" />
              <path d="M8 21h8" />
            </svg>
          </span>
          <span className="border-b border-[color:var(--ct-primary)]/30 pb-0.5 transition-colors group-hover:border-[color:var(--ct-primary)]">
            Διαβάστε Περισσότερα
          </span>
        </Link>
      </div>
    </article>
  );
}
