"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * IntersectionObserver-driven fade-up reveal wrapper.
 * Respects prefers-reduced-motion (CSS in globals.css disables the transform).
 */
export default function Reveal({
  children,
  className = "",
  as: Tag = "div",
  delay = 0,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "li";
  delay?: number;
  [key: `data-${string}`]: string | undefined;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If IntersectionObserver is unavailable, just show immediately.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    // Check viewport immediately for elements already on-screen at mount.
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) {
      if (delay > 0) {
        const t = setTimeout(() => setVisible(true), delay);
        return () => clearTimeout(t);
      }
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            if (delay > 0) {
              setTimeout(() => setVisible(true), delay);
            } else {
              setVisible(true);
            }
            obs.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
    );
    obs.observe(el);

    // Safety net: after 2s, force-reveal no matter what (covers edge cases
    // like headless browsers / prefers-reduced-motion issues / disabled JS).
    const safety = setTimeout(() => setVisible(true), 2000);

    return () => {
      obs.disconnect();
      clearTimeout(safety);
    };
  }, [delay]);

  const Element = Tag as "div";
  return (
    <Element
      ref={ref as never}
      className={`ct-reveal ${className}`}
      data-visible={visible ? "true" : "false"}
      {...rest}
    >
      {children}
    </Element>
  );
}
