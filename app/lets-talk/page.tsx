import type { Metadata } from "next";

import Hero from "@/app/components/Hero";
import Intro from "@/app/components/Intro";
import ContactForm from "@/app/components/ContactForm";
import LetsTalk from "@/app/components/LetsTalk";
import { siteMeta } from "@/app/data";

export const metadata: Metadata = {
  title: `Let's Talk — ${siteMeta.name}`,
  description:
    "Ας μιλήσουμε για τους Δήμους. Στείλτε μας μήνυμα ή προτείνετε συνεργασία.",
  alternates: { canonical: "/lets-talk" },
  openGraph: {
    title: `Let's Talk — ${siteMeta.name}`,
    description:
      "Ας μιλήσουμε για τους Δήμους. Στείλτε μας μήνυμα ή προτείνετε συνεργασία.",
    url: `${siteMeta.url}/lets-talk`,
    type: "website",
  },
};

/**
 * /lets-talk — mission + contact page.
 *
 * Structure (top → bottom):
 *   1. Compact Hero with the Greek tagline H1.
 *   2. <Intro /> manifesto block.
 *   3. Contact form section — "Send a message." with DM Serif Text italic accent.
 *   4. <LetsTalk variant="banner" /> partnership outro.
 */
export default function LetsTalkPage() {
  return (
    <>
      <Hero
        compact
        headline="Ας μιλήσουμε για τους Δήμους"
        intro={[
          "Προκαλούμε και φιλοξενούμε συζητήσεις για τη Τοπική Αυτοδιοίκηση. Αν έχετε μια άποψη, μια εμπειρία ή μια ιδέα που αξίζει να ακουστεί — είμαστε εδώ.",
        ]}
      />

      <Intro />

      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="ct-contact-section relative w-full bg-[color:var(--ct-bg-alt)] py-16 sm:py-20 lg:py-24"
      >
        <div
          className="mx-auto grid grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"
          style={{ maxWidth: "var(--ct-container)" }}
        >
          <header>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[color:var(--ct-border)] bg-[color:var(--ct-bg)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[1.1px] text-[color:var(--ct-text-subtle)]">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--ct-primary)]" />
              Contact
            </p>
            <h2
              id="contact-heading"
              className="font-[family-name:var(--ct-font-display)] text-[clamp(36px,5vw,55px)] font-medium leading-[1.02] tracking-tight text-[color:var(--ct-ink)]"
            >
              Send a{" "}
              <span
                className="italic"
                style={{ fontFamily: "var(--ct-font-accent)" }}
              >
                message.
              </span>
            </h2>
            <p className="mt-4 max-w-[420px] text-[16px] leading-[1.6] text-[color:var(--ct-text)]">
              We&apos;re here to answer any question you may have. Γράψτε μας
              στα Ελληνικά ή στα Αγγλικά — απαντάμε συνήθως εντός 1-2 εργάσιμων
              ημερών.
            </p>
            <p className="mt-6 text-[14px] text-[color:var(--ct-text-muted)]">
              Ή γράψτε μας απευθείας στο{" "}
              <a
                href={`mailto:${siteMeta.email}`}
                className="font-semibold text-[color:var(--ct-primary)] underline underline-offset-4"
              >
                {siteMeta.email}
              </a>
              .
            </p>
          </header>

          <div className="rounded-[var(--ct-radius-md)] bg-[color:var(--ct-bg)] p-6 shadow-[var(--ct-shadow-sm)] sm:p-8 lg:p-10">
            <ContactForm />
          </div>
        </div>
      </section>

      <LetsTalk
        variant="banner"
        heading="We'd love to partner up."
        description="Αναζητάτε συνεργασία ή χορηγία; Έχετε μια ιδέα για επεισόδιο ή άρθρο; Στείλτε μας email και ας ξεκινήσουμε τη συζήτηση."
        ctaLabel="Send message"
        ctaHref="#contact"
      />
    </>
  );
}
