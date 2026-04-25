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
 * Alternating L/R article block — layered exactly like the live WP design.
 *
 * Stacking order (back → front):
 *   1. Decorative background  : pink dot grid + dashed outline circle
 *                              + faint purple bean accent
 *   2. Rectangular featured photo (always visible, rounded corners)
 *   3. Circular author portrait (always visible, white border, sits on
 *                                the bottom-left/right corner of #2)
 *   4. Green author name pill (anchored to the portrait baseline)
 *
 * Hover lifts the photo + portrait slightly via a translate/scale tween
 * so the row still has interactivity, but nothing is hidden by default.
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
        {/* --- LAYER 1: decorative background --- */}
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
          className="absolute rounded-full"
          style={{
            width: "118%",
            height: "118%",
            top: "-9%",
            left: "-9%",
            border: "1px dashed rgba(234, 117, 197, 0.55)",
            pointerEvents: "none",
          }}
        />
        <span
          aria-hidden="true"
          className="absolute rounded-full"
          style={{
            width: "44%",
            height: "32%",
            top: "-6%",
            right: flip ? "auto" : "-2%",
            left: flip ? "-2%" : "auto",
            background: "var(--ct-primary)",
            opacity: 0.18,
            pointerEvents: "none",
          }}
        />

        {/* --- LAYER 2: rectangular featured photo (always visible) --- */}
        <Link
          href={href}
          aria-label={title}
          className="absolute inset-0 block overflow-hidden rounded-[28px] bg-[color:var(--ct-bg-alt)] shadow-[var(--ct-shadow-md)] transition-transform duration-500 ease-out"
          style={{ transform: hover ? "scale(1.015)" : "scale(1)" }}
        >
          <Image
            src={withBasePath(featuredImage)}
            alt={title}
            fill
            sizes="(min-width: 900px) 45vw, 90vw"
            className="object-cover"
          />
        </Link>

        {/* --- LAYER 3: circular author portrait (always visible) --- */}
        {authorPortrait && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute overflow-hidden rounded-full border-[5px] border-white shadow-[0_14px_32px_rgba(13,6,14,0.28)] transition-transform duration-500 ease-out"
            style={{
              width: "44%",
              aspectRatio: "1",
              bottom: "8%",
              left: flip ? "auto" : "8%",
              right: flip ? "8%" : "auto",
              transform: hover ? "translateY(-4px)" : "translateY(0)",
            }}
          >
            <Image
              src={withBasePath(authorPortrait)}
              alt={author}
              fill
              sizes="(min-width: 900px) 22vw, 46vw"
              className="object-cover object-top"
            />
          </span>
        )}

        {/* --- LAYER 4: green author name pill --- */}
        <span
          className="absolute z-10"
          style={{
            bottom: "-18px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "10px 22px",
            borderRadius: "9999px",
            background: "var(--ct-secondary)",
            color: "var(--ct-on-primary)",
            fontSize: "15px",
            fontWeight: 500,
            letterSpacing: "-0.01em",
            whiteSpace: "nowrap",
            boxShadow: "0 6px 18px rgba(15, 120, 109, 0.25)",
          }}
        >
          {author}
        </span>
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
