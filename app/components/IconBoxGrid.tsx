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

    </Link>
  );
}

/**
 * Category icons — exactly the FontAwesome 5 solid glyphs the live WP
 * Elementor theme uses: microphone-alt, comments, podcast, city. Paths
 * were captured from city-talks.gr's rendered SVG and are filled (not
 * stroked) so they look like the live buttons. Licensed under CC BY 4.0
 * (Font Awesome Free).
 */
function IconGlyph({ name }: { name: IconBox["icon"] }) {
  switch (name) {
    case "opinions": // fa-microphone-alt
      return (
        <svg
          aria-hidden="true"
          width="26"
          height="26"
          viewBox="0 0 352 512"
          fill="currentColor"
        >
          <path d="M336 192h-16c-8.84 0-16 7.16-16 16v48c0 74.8-64.49 134.82-140.79 127.38C96.71 376.89 48 317.11 48 250.3V208c0-8.84-7.16-16-16-16H16c-8.84 0-16 7.16-16 16v40.16c0 89.64 63.97 169.55 152 181.69V464H96c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-33.77C285.71 418.47 352 344.9 352 256v-48c0-8.84-7.16-16-16-16zM176 352c53.02 0 96-42.98 96-96h-85.33c-5.89 0-10.67-3.58-10.67-8v-16c0-4.42 4.78-8 10.67-8H272v-32h-85.33c-5.89 0-10.67-3.58-10.67-8v-16c0-4.42 4.78-8 10.67-8H272v-32h-85.33c-5.89 0-10.67-3.58-10.67-8v-16c0-4.42 4.78-8 10.67-8H272c0-53.02-42.98-96-96-96S80 42.98 80 96v160c0 53.02 42.98 96 96 96z" />
        </svg>
      );
    case "lets-talk": // fa-comments
      return (
        <svg
          aria-hidden="true"
          width="26"
          height="26"
          viewBox="0 0 576 512"
          fill="currentColor"
        >
          <path d="M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92-13.4 30.2-35.5 54.2-35.8 54.5-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25 32.2 15.7 70.3 25 111.3 25 114.9 0 208-71.6 208-160zm122 220c23.9-26 38-57.7 38-92 0-66.9-53.5-124.2-129.3-148.1.9 6.6 1.3 13.3 1.3 20.1 0 105.9-107.7 192-240 192-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25 21.8 12.7 52.1 25 88.7 25 3.2 0 6.1-1.9 7.3-4.8 1.3-2.9.7-6.3-1.5-8.7-.3-.3-22.4-24.2-35.8-54.5z" />
        </svg>
      );
    case "podcasts": // fa-podcast
      return (
        <svg
          aria-hidden="true"
          width="26"
          height="26"
          viewBox="0 0 448 512"
          fill="currentColor"
        >
          <path d="M267.429 488.563C262.286 507.573 242.858 512 224 512c-18.857 0-38.286-4.427-43.428-23.437C172.927 460.134 160 388.898 160 355.75c0-35.156 31.142-43.75 64-43.75s64 8.594 64 43.75c0 32.949-12.871 104.179-20.571 132.813zM156.867 288.554c-18.693-18.308-29.958-44.173-28.784-72.599 2.054-49.724 42.395-89.956 92.124-91.881C274.862 121.958 320 165.807 320 220c0 26.827-11.064 51.116-28.866 68.552-2.675 2.62-2.401 6.986.628 9.187 9.312 6.765 16.46 15.343 21.234 25.363 1.741 3.654 6.497 4.66 9.449 1.891 28.826-27.043 46.553-65.783 45.511-108.565-1.855-76.206-63.595-138.208-139.793-140.369C146.869 73.753 80 139.215 80 220c0 41.361 17.532 78.7 45.55 104.989 2.953 2.771 7.711 1.77 9.453-1.887 4.774-10.021 11.923-18.598 21.235-25.363 3.029-2.2 3.304-6.566.629-9.185zM224 0C100.204 0 0 100.185 0 224c0 89.992 52.602 165.647 125.739 201.408 4.333 2.118 9.267-1.544 8.535-6.31-2.382-15.512-4.342-30.946-5.406-44.339-.146-1.836-1.149-3.486-2.678-4.512-47.4-31.806-78.564-86.016-78.187-147.347.592-96.237 79.29-174.648 175.529-174.899C320.793 47.747 400 126.797 400 224c0 61.932-32.158 116.49-80.65 147.867-.999 14.037-3.069 30.588-5.624 47.23-.732 4.767 4.203 8.429 8.535 6.31C395.227 389.727 448 314.187 448 224 448 100.205 347.815 0 224 0zm0 160c-35.346 0-64 28.654-64 64s28.654 64 64 64 64-28.654 64-64-28.654-64-64-64z" />
        </svg>
      );
    case "smart-cities": // fa-city
      return (
        <svg
          aria-hidden="true"
          width="26"
          height="26"
          viewBox="0 0 640 512"
          fill="currentColor"
        >
          <path d="M616 192H480V24c0-13.26-10.74-24-24-24H312c-13.26 0-24 10.74-24 24v72h-64V16c0-8.84-7.16-16-16-16h-16c-8.84 0-16 7.16-16 16v80h-64V16c0-8.84-7.16-16-16-16H80c-8.84 0-16 7.16-16 16v80H24c-13.26 0-24 10.74-24 24v360c0 17.67 14.33 32 32 32h576c17.67 0 32-14.33 32-32V216c0-13.26-10.75-24-24-24zM128 404c0 6.63-5.37 12-12 12H76c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12H76c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12H76c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm128 192c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm160 96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12V76c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm160 288c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40z" />
        </svg>
      );
  }
}
