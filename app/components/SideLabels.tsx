import { siteMeta } from "@/app/data";

/**
 * Fixed vertical side labels — matches live WP design.
 * "info@city-talks.gr" on the top-left, "scroll" indicator on the bottom-left.
 * Hidden on mobile.
 */
export default function SideLabels() {
  return (
    <aside
      aria-hidden="true"
      className="pointer-events-none fixed inset-y-0 left-0 z-30 hidden w-12 flex-col items-center justify-between py-24 lg:flex"
    >
      <a
        href={`mailto:${siteMeta.email}`}
        className="ct-side-label pointer-events-auto transition-colors hover:text-[color:var(--ct-primary)]"
      >
        {siteMeta.email}
      </a>
      <div className="ct-scroll-indicator">
        <span className="ct-side-label" style={{ transform: "rotate(180deg)" }}>scroll</span>
        <span className="ct-scroll-dot" />
      </div>
    </aside>
  );
}
