"use client";

import { useEffect, useRef } from "react";

/**
 * Custom purple round cursor that trails the mouse — matches the live
 * city-talks.gr `.lqd-extra-cursor` used by the Liquid Themes "Hub" theme.
 *
 * Fixed 28x28 filled circle, --ct-primary, `mix-blend-mode: multiply`, with
 * a smooth follow animation via requestAnimationFrame (easing toward the
 * real pointer). Hidden on touch / reduced-motion environments.
 */
export default function ExtraCursor() {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      el.style.opacity = "1";
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    const tick = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", () => {
      el.style.opacity = "1";
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 80,
        height: 80,
        marginLeft: -40,
        marginTop: -40,
        borderRadius: "50%",
        background: "var(--ct-primary)",
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: "multiply",
        opacity: 0,
        transition: "opacity 0.25s ease, transform 0.05s linear",
        willChange: "transform",
      }}
    />
  );
}
