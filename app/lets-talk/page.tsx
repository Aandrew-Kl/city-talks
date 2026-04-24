import type { Metadata } from "next";

import ContactForm from "@/app/components/ContactForm";
import DecorShape from "@/app/components/DecorShape";
import Intro from "@/app/components/Intro";
import LetsTalk from "@/app/components/LetsTalk";
import { siteMeta, socialLinks } from "@/app/data";

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
 *   1. Compact hero — eyebrow "Contact", giant "Let's Talk." with italic accent.
 *   2. <Intro /> manifesto block explaining why City Talks exists.
 *   3. Contact form section — two-column layout: copy + direct-email pill on
 *      the left, form card on the right.
 *   4. Contact details row — email + social links, mirrors the "contact block"
 *      on the live WP contact page.
 *   5. Partnership outro (<LetsTalk variant="banner" />).
 */
export default function LetsTalkPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="ct-lets-hero relative isolate w-full overflow-hidden bg-[color:var(--ct-bg)] py-20 sm:py-24"
        aria-labelledby="lets-hero-heading"
      >
        <DecorShape
          variant="ring"
          className="left-[6%] top-[14%] hidden md:block"
          color="var(--ct-accent)"
          size={110}
        />
        <DecorShape
          variant="circle"
          className="right-[8%] top-[20%] hidden md:block"
          color="var(--ct-secondary-light)"
          size={70}
        />
        <DecorShape
          variant="dots"
          className="bottom-[10%] left-[10%] hidden lg:block"
          color="var(--ct-primary)"
          size={110}
        />
        <DecorShape
          variant="scribble"
          className="bottom-[16%] right-[6%] hidden md:block"
          color="var(--ct-accent-warm)"
          size={140}
        />

        <div
          className="relative mx-auto flex flex-col items-center gap-5 px-5 text-center sm:px-8"
          style={{ maxWidth: "var(--ct-container)" }}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-[color:var(--ct-border)] bg-[color:var(--ct-bg-alt)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[1.6px] text-[color:var(--ct-text-subtle)]">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--ct-accent)]"
            />
            Contact
          </p>

          <h1
            id="lets-hero-heading"
            className="mx-auto max-w-[860px] font-[family-name:var(--ct-font-display)] text-[clamp(44px,8vw,80px)] font-black leading-[0.95] tracking-[-0.02em] text-[color:var(--ct-ink)]"
          >
            Let&apos;s{" "}
            <span
              className="italic"
              style={{
                fontFamily: "var(--ct-font-accent)",
                fontWeight: 400,
                color: "var(--ct-primary)",
              }}
            >
              Talk.
            </span>
          </h1>

          <p className="max-w-[640px] text-[17px] leading-[1.7] text-[color:var(--ct-text)]">
            {siteMeta.greekTagline}. Αν έχετε μια άποψη, μια εμπειρία ή μια
            ιδέα που αξίζει να ακουστεί — είμαστε εδώ να σας ακούσουμε.
          </p>
        </div>
      </section>

      <Intro
        eyebrow="Η αποστολή μας"
        heading="Γιατί φτιάξαμε το City Talks."
      />

      {/* Contact form */}
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="ct-contact-section relative isolate w-full overflow-hidden bg-[color:var(--ct-bg-alt)] py-16 sm:py-20 lg:py-24"
      >
        <DecorShape
          variant="dots"
          className="right-[4%] top-[8%] hidden lg:block"
          color="var(--ct-primary)"
          size={100}
        />

        <div
          className="relative mx-auto grid grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16"
          style={{ maxWidth: "var(--ct-container)" }}
        >
          <header>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[color:var(--ct-border)] bg-[color:var(--ct-bg)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[1.6px] text-[color:var(--ct-text-subtle)]">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--ct-primary)]"
              />
              Send us a message
            </p>
            <h2
              id="contact-heading"
              className="font-[family-name:var(--ct-font-display)] text-[clamp(36px,5vw,55px)] font-medium leading-[1.02] tracking-tight text-[color:var(--ct-ink)]"
            >
              Send a{" "}
              <span
                className="italic"
                style={{
                  fontFamily: "var(--ct-font-accent)",
                  color: "var(--ct-primary)",
                }}
              >
                message.
              </span>
            </h2>
            <p className="mt-4 max-w-[440px] text-[16px] leading-[1.65] text-[color:var(--ct-text)]">
              We&apos;re here to answer any question you may have. Γράψτε μας
              στα Ελληνικά ή στα Αγγλικά — απαντάμε συνήθως εντός 1-2 εργάσιμων
              ημερών.
            </p>

            <dl className="mt-8 flex flex-col gap-4 text-[14px]">
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--ct-primary)] text-[color:var(--ct-on-primary)]"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="1.5" y="3" width="13" height="10" rx="2" />
                    <path d="M1.5 4l6.5 5 6.5-5" />
                  </svg>
                </span>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[1.1px] text-[color:var(--ct-text-subtle)]">
                    Email
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${siteMeta.email}`}
                      className="font-semibold text-[color:var(--ct-primary)] underline underline-offset-4"
                    >
                      {siteMeta.email}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--ct-secondary)] text-[color:var(--ct-on-primary)]"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="8" cy="8" r="6.5" />
                    <path d="M1.5 8h13M8 1.5c2 2 2 11 0 13M8 1.5c-2 2-2 11 0 13" />
                  </svg>
                </span>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[1.1px] text-[color:var(--ct-text-subtle)]">
                    Social
                  </dt>
                  <dd>
                    <ul className="mt-1 flex items-center gap-2">
                      {socialLinks.map((s) => (
                        <li key={s.href}>
                          <a
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={s.label}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--ct-border)] bg-[color:var(--ct-bg)] text-[color:var(--ct-ink)] transition-colors hover:border-[color:var(--ct-primary)] hover:text-[color:var(--ct-primary)]"
                          >
                            <span className="text-[12px] font-semibold">
                              {s.label.charAt(0)}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </div>
            </dl>
          </header>

          <div className="rounded-[var(--ct-radius-md)] bg-[color:var(--ct-bg)] p-6 shadow-[var(--ct-shadow-md)] sm:p-8 lg:p-10">
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
