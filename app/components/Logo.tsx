import Image from "next/image";
import Link from "next/link";

import { withBasePath } from "@/lib/basePath";

export interface LogoProps {
  /** "dark" = ink on light backgrounds (header). "light" = white on purple (footer). */
  variant?: "dark" | "light";
  /** Rendered width in px. Height auto-scales to preserve aspect ratio. */
  width?: number;
  /** Optional wrapping Link href. If omitted the logo is rendered as a plain element. */
  href?: string;
  className?: string;
}

// Intrinsic aspect ratios of the authentic WP assets we copied into /public/logo/.
const DARK_W = 600;
const DARK_H = 150; // 4:1 wordmark-with-mic
const LIGHT_W = 400;
const LIGHT_H = 375; // ~16:15 square mark, white fill

/**
 * City Talks wordmark — authentic brand art from the live WP site:
 *   - `dark`  → purple mic + "CITYTALKS www.city-talks.gr" wordmark on light bg
 *   - `light` → all-white version for the purple footer
 */
export default function Logo({
  variant = "dark",
  width = DARK_W / 4, // default ≈ 150px
  href,
  className,
}: LogoProps) {
  const src =
    variant === "light" ? "/logo/city-talks-mark-white.png" : "/logo/city-talks-logo.png";
  const intrinsicW = variant === "light" ? LIGHT_W : DARK_W;
  const intrinsicH = variant === "light" ? LIGHT_H : DARK_H;
  const height = Math.round((intrinsicH * width) / intrinsicW);

  const img = (
    <Image
      src={withBasePath(src)}
      alt="City Talks"
      width={width}
      height={height}
      priority
      className={className}
    />
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label="City Talks — αρχική"
        className="inline-flex items-center leading-none"
      >
        {img}
      </Link>
    );
  }
  return img;
}
