/**
 * Large CITY TALKS logo mark: purple circle with radio-style microphone +
 * CITY TALKS wordmark below.
 *
 * The microphone is modelled after the authentic WP logo
 * (`/wp-content/uploads/2021/06/CityTalks-FirstLogo-01.png`):
 *   - Outer round head with a horizontal ring band near the top
 *   - Inner grille made of tall vertical bars (evocative of a skyline)
 *   - U-shaped yoke / chin rest on the bottom-left
 *   - Vertical stem + small foot stand
 *
 * All shapes are pure SVG — no raster asset — so the logo stays crisp at any
 * size and works across both hero and pre-footer banner contexts.
 */
export default function BigLogoMark({ size = 220 }: { size?: number }) {
  // SVG viewBox is 200x200; the mic itself is centred with generous padding.
  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <span
        aria-hidden="true"
        className="relative flex items-center justify-center rounded-full bg-[color:var(--ct-primary)]"
        style={{
          width: size,
          height: size,
          boxShadow:
            "0 22px 48px rgba(109,15,120,0.32), 0 2px 4px rgba(13,6,14,0.08)",
        }}
      >
        <svg
          viewBox="0 0 200 200"
          role="presentation"
          style={{ width: size * 0.62, height: size * 0.62 }}
        >
          <g fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round">
            {/* Mic head — rounded capsule outline */}
            <path
              d="M65 38 Q65 20 100 20 Q135 20 135 38 L135 94 Q135 124 100 124 Q65 124 65 94 Z"
              strokeWidth="6"
            />

            {/* Ring / band below the top dome */}
            <line x1="65" y1="44" x2="135" y2="44" strokeWidth="5" />
            <line x1="65" y1="55" x2="135" y2="55" strokeWidth="5" />

            {/* Vertical skyline bars inside the grille */}
            <g strokeWidth="6">
              <line x1="78" y1="98" x2="78" y2="72" />
              <line x1="90" y1="98" x2="90" y2="64" />
              <line x1="100" y1="98" x2="100" y2="78" />
              <line x1="110" y1="98" x2="110" y2="58" />
              <line x1="122" y1="98" x2="122" y2="70" />
            </g>

            {/* Small "window" dot on the tallest bar — nod to the live logo */}
            <circle cx="110" cy="68" r="3" fill="#ffffff" stroke="none" />

            {/* U-shaped yoke / chin rest */}
            <path
              d="M48 108 Q48 142 100 142 Q152 142 152 108"
              strokeWidth="6"
            />

            {/* Vertical stem down from the yoke */}
            <line x1="100" y1="142" x2="100" y2="168" strokeWidth="6" />

            {/* Foot / base stand */}
            <line x1="78" y1="170" x2="122" y2="170" strokeWidth="6" />
          </g>
        </svg>
      </span>

      <div className="flex flex-col items-center leading-none">
        <span
          className="font-[family-name:var(--ct-font-display)] tracking-tight text-[color:var(--ct-primary)]"
          style={{ fontSize: `clamp(36px, 6vw, 64px)` }}
        >
          <span className="font-light">CITY</span>
          <span className="font-black">TALKS</span>
        </span>
        <span className="mt-1 text-[13px] font-medium tracking-[0.12em] text-[color:var(--ct-primary)]/80">
          www.city-talks.gr
        </span>
      </div>
    </div>
  );
}
