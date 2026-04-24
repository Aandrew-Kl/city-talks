/**
 * Purely decorative shapes — absolutely positioned accents used on subpage
 * heroes to mirror the shape-1/shape-2 SVG accents on the live WordPress site.
 *
 * Rendered as inline SVG so color can inherit via currentColor / CSS vars.
 */
export interface DecorShapeProps {
  /** Visual variant. */
  variant: "circle" | "ring" | "dots" | "scribble";
  /** Tailwind classes for absolute positioning (e.g. "top-6 right-8"). */
  className?: string;
  /** CSS color value — defaults to primary. */
  color?: string;
  /** Pixel size. */
  size?: number;
}

export default function DecorShape({
  variant,
  className = "",
  color = "var(--ct-accent)",
  size = 80,
}: DecorShapeProps) {
  return (
    <span
      aria-hidden="true"
      className={`ct-decor pointer-events-none absolute z-0 ${className}`}
      style={{ width: size, height: size, color }}
    >
      {variant === "circle" && (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="48" fill="currentColor" opacity="0.18" />
        </svg>
      )}
      {variant === "ring" && (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          <circle
            cx="50"
            cy="50"
            r="46"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="3 5"
            opacity="0.6"
          />
        </svg>
      )}
      {variant === "dots" && (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          {Array.from({ length: 6 }).map((_, r) =>
            Array.from({ length: 6 }).map((__, c) => (
              <circle
                key={`${r}-${c}`}
                cx={8 + c * 17}
                cy={8 + r * 17}
                r="1.6"
                fill="currentColor"
                opacity="0.55"
              />
            )),
          )}
        </svg>
      )}
      {variant === "scribble" && (
        <svg width={size} height={size} viewBox="0 0 100 60" fill="none">
          <path
            d="M2 38 Q 20 10 40 30 T 80 30 T 98 20"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.55"
          />
        </svg>
      )}
    </span>
  );
}
