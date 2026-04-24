import Link from "next/link";

import { siteMeta } from "@/app/data";
import Logo from "@/app/components/Logo";

/**
 * Purple marketing footer — intentionally minimal to mirror the live site:
 * wordmark · Menu (single link) · Contact us (email).
 */
export default function Footer() {
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
        {/* Minimal 3-column row — matches live: logo · Menu · Contact us */}
        <div className="mt-8 grid grid-cols-1 gap-10 md:mt-10 md:grid-cols-3">
          {/* Col 1: wordmark */}
          <div>
            <Logo variant="light" width={200} />
          </div>

          {/* Col 2: Menu — matches live: single "City Talks" link */}
          <div>
            <h3 className="mb-4 text-[18px] font-semibold tracking-tight" style={{ color: "var(--ct-on-primary)" }}>
              Menu
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-[15px] text-[color:var(--ct-on-primary-soft)] transition-colors hover:text-[color:var(--ct-on-primary)]"
                >
                  City Talks
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact us */}
          <div>
            <h3 className="mb-4 text-[18px] font-semibold tracking-tight" style={{ color: "var(--ct-on-primary)" }}>
              Contact us
            </h3>
            <a
              href={`mailto:${siteMeta.email}`}
              className="text-[15px] text-[color:var(--ct-on-primary-soft)] transition-colors hover:text-[color:var(--ct-on-primary)]"
            >
              {siteMeta.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

