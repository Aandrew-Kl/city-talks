import Link from "next/link";

export interface LogoProps {
  /** "dark" = ink on light backgrounds (header). "light" = white on purple (footer). */
  variant?: "dark" | "light";
  /** Rendered width in px. Height auto-scales to preserve aspect ratio. */
  width?: number;
  /** Optional wrapping Link href. If omitted the logo is rendered as a plain element. */
  href?: string;
  className?: string;
}

const WIDTH = 170;
const HEIGHT = 38;

/**
 * City Talks wordmark. Inline SVG so color inherits via currentColor and swaps
 * via variant without extra requests. Shape: bold "City" in display weight,
 * "Talks." in accent serif, a tiny circle mark between the two words.
 */
export default function Logo({
  variant = "dark",
  width = WIDTH,
  href,
  className,
}: LogoProps) {
  const color =
    variant === "light" ? "var(--ct-on-primary)" : "var(--ct-ink)";
  const accent =
    variant === "light" ? "var(--ct-secondary-light)" : "var(--ct-primary)";

  const height = Math.round((HEIGHT * width) / WIDTH);

  const svg = (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="City Talks"
      className={className}
    >
      <text
        x="0"
        y="27"
        fontFamily="var(--ct-font-display), Inter, sans-serif"
        fontWeight={900}
        fontSize="26"
        letterSpacing="-0.5"
        fill={color}
      >
        City
      </text>
      <circle cx="66" cy="20" r="3.2" fill={accent} />
      <text
        x="76"
        y="27"
        fontFamily="var(--ct-font-accent), Georgia, serif"
        fontStyle="italic"
        fontWeight={400}
        fontSize="26"
        fill={color}
      >
        Talks.
      </text>
    </svg>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label="City Talks — αρχική"
        className="inline-flex items-center leading-none"
      >
        {svg}
      </Link>
    );
  }

  return svg;
}
