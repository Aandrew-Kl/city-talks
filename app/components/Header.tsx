"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

import { navItems, siteMeta, socialLinks } from "@/app/data";
import Logo from "@/app/components/Logo";

/**
 * Sticky site header.
 * - Desktop (≥1200px): logo left, nav center-right, "Send message" pill + drawer trigger.
 * - Mobile (<1200px): logo + drawer trigger only (nav moves into the drawer).
 * - Past 60px of scroll the header shrinks from 110px to 70px via a data attribute.
 *
 * Uses `"use client"` because we need the scroll listener and drawer open-state.
 */
export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerId = useId();

  // Shrink-on-scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // Lock body scroll while drawer open
  useEffect(() => {
    if (drawerOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
    return;
  }, [drawerOpen]);

  // Close on Escape
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  const isActive = (href: string): boolean => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header
        data-scrolled={scrolled ? "true" : "false"}
        className="ct-header sticky top-0 z-40 w-full bg-[color:var(--ct-bg)] transition-[height,box-shadow] duration-200 ease-out"
      >
        {/* Live layout: hamburger-left · centered-ish logo · 'City Talks' link-right */}
        <div className="relative flex h-full w-full items-center px-5 sm:px-8">
          {/* Left: hamburger (drawer trigger) */}
          <button
            type="button"
            aria-expanded={drawerOpen}
            aria-controls={drawerId}
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
            onClick={() => setDrawerOpen((v) => !v)}
            className="ct-hamburger inline-flex h-10 w-10 items-center justify-center text-[color:var(--ct-ink)] transition-opacity hover:opacity-70"
          >
            <svg
              aria-hidden="true"
              width="22"
              height="12"
              viewBox="0 0 22 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="0" width="22" height="1.6" rx="0.8" fill="currentColor" />
              <rect y="10" width="22" height="1.6" rx="0.8" fill="currentColor" />
            </svg>
          </button>

          {/* Center: big wordmark logo */}
          <Link
            href="/"
            aria-label="City Talks — αρχική"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Logo width={180} />
          </Link>

          {/* Right: simple 'City Talks' text link (mirrors live) */}
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            className="ml-auto text-[15px] font-semibold tracking-tight text-[color:var(--ct-ink-2)] hover:text-[color:var(--ct-primary)]"
          >
            City Talks
          </Link>
        </div>
      </header>

      {/* Drawer overlay — a button so click+keyboard both dismiss */}
      <button
        type="button"
        tabIndex={drawerOpen ? 0 : -1}
        aria-hidden={!drawerOpen}
        aria-label="Close menu"
        onClick={() => setDrawerOpen(false)}
        className="ct-drawer-overlay fixed inset-0 z-50 cursor-pointer bg-[rgba(13,6,14,0.55)] opacity-0 transition-opacity duration-200"
        data-open={drawerOpen ? "true" : "false"}
      />

      {/* Drawer panel */}
      <aside
        id={drawerId}
        aria-label="Site menu"
        aria-hidden={!drawerOpen}
        className="ct-drawer fixed inset-y-0 left-0 z-50 flex w-full max-w-sm -translate-x-full flex-col bg-[color:var(--ct-bg)] shadow-[var(--ct-shadow-md)] transition-transform duration-300 ease-out"
        data-open={drawerOpen ? "true" : "false"}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <Logo href="/" variant="dark" width={130} />
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--ct-border)] text-[color:var(--ct-ink)] transition-colors hover:bg-[color:var(--ct-bg-alt)]"
          >
            <svg
              aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav
          aria-label="Mobile primary"
          className="flex flex-col gap-2 px-6 py-6"
        >
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="block border-b border-[color:var(--ct-border)] py-4 text-[22px] font-semibold tracking-tight text-[color:var(--ct-ink)] transition-colors hover:text-[color:var(--ct-primary)]"
                data-active={active ? "true" : "false"}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-4 px-6 pb-8">
          <a
            href={`mailto:${siteMeta.email}`}
            className="text-[18px] font-medium text-[color:var(--ct-primary)]"
          >
            {siteMeta.email}
          </a>
          <ul className="flex items-center gap-3">
            {socialLinks.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--ct-border)] text-[color:var(--ct-ink)] transition-colors hover:border-[color:var(--ct-primary)] hover:text-[color:var(--ct-primary)]"
                >
                  <SocialIcon name={s.icon} />
                </a>
              </li>
            ))}
          </ul>
          <Link
            href="/lets-talk#contact"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[color:var(--ct-primary)] px-6 text-[15px] font-semibold text-[color:var(--ct-on-primary)] transition-colors hover:bg-[color:var(--ct-primary-700)]"
          >
            Send message
          </Link>
        </div>
      </aside>
    </>
  );
}

function SocialIcon({ name }: { name: "facebook" | "youtube" | "instagram" | "x" }) {
  switch (name) {
    case "facebook":
      return (
        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
          <path d="M8.4 14V7.5h1.98l.3-2.3H8.4v-1.5c0-.66.18-1.1 1.12-1.1h1.2V.1C10.5.05 9.8 0 9 0 7.3 0 6.1 1.04 6.1 2.95V5.2H4.1v2.3h2V14h2.3z" />
        </svg>
      );
    case "youtube":
      return (
        <svg aria-hidden="true" width="16" height="14" viewBox="0 0 16 14" fill="currentColor">
          <path d="M15.66 2.18a2 2 0 00-1.4-1.4C13 .5 8 .5 8 .5s-5 0-6.26.28A2 2 0 00.34 2.18 21 21 0 000 6.5a21 21 0 00.34 4.32 2 2 0 001.4 1.4C3 12.5 8 12.5 8 12.5s5 0 6.26-.28a2 2 0 001.4-1.4A21 21 0 0016 6.5a21 21 0 00-.34-4.32zM6.4 9V4l4.4 2.5-4.4 2.5z" />
        </svg>
      );
    case "instagram":
      return (
        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3">
          <rect x="1" y="1" width="12" height="12" rx="3" />
          <circle cx="7" cy="7" r="2.6" />
          <circle cx="10.4" cy="3.6" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      );
    case "x":
      return (
        <svg aria-hidden="true" width="13" height="13" viewBox="0 0 13 13" fill="currentColor">
          <path d="M9.9 0h2l-4.4 5 5.2 8H8.6l-3.2-4.8L1.6 13H0l4.7-5.4L0 0h4.1l2.9 4.3L9.9 0z" />
        </svg>
      );
  }
}
