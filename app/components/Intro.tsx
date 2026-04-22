import { siteMeta } from "@/app/data";

export interface IntroProps {
  /** Small eyebrow above the heading. */
  eyebrow?: string;
  /** Override the heading. */
  heading?: string;
  /** Override the paragraph array. */
  paragraphs?: readonly string[];
  /** Optional trailing signature/byline. */
  signature?: string;
}

/**
 * Mission/manifesto block pulled from the WP `/city-talks-intro/` page.
 *
 * Default copy explains the why behind City Talks — most citizens don't know
 * what their municipality actually does, so this platform gives a voice to
 * experts in local-government administration, uncensored. Used on /lets-talk
 * and reusable anywhere a short "about" slot is needed.
 */
const DEFAULT_PARAGRAPHS: readonly string[] = [
  "Οι περισσότεροι πολίτες αγνοούν τι ακριβώς κάνει ο Δήμος τους. Κι όμως, ο Δήμος είναι το κύτταρο της καθημερινότητας — εκεί παίρνονται αποφάσεις που επηρεάζουν τον τρόπο που ζούμε, κινούμαστε, μαθαίνουμε και επιχειρούμε.",
  "Στο City Talks ανοίγουμε βήμα σε ανθρώπους με αποδεδειγμένη γνώση και εμπειρία στη διοίκηση δήμων — αιρετούς, στελέχη, ερευνητές, επαγγελματίες. Φιλοξενούμε απόψεις χωρίς λογοκρισία και προκαλούμε διάλογο γύρω από τη Τοπική Αυτοδιοίκηση, τις έξυπνες πόλεις και τις πολιτικές που διαμορφώνουν το μέλλον τους.",
  "Δεν είμαστε δημοσιογραφικό μέσο. Είμαστε πλατφόρμα συζήτησης: ό,τι γράφεται εδώ, γράφεται από ανθρώπους που έχουν κάτι να πουν — και εμείς τους ακούμε.",
];

export default function Intro({
  eyebrow = "Γιατί υπάρχουμε",
  heading = "Ένας χώρος για να μιλήσουμε για τους Δήμους.",
  paragraphs = DEFAULT_PARAGRAPHS,
  signature = siteMeta.name,
}: IntroProps) {
  return (
    <section
      aria-labelledby="intro-heading"
      className="ct-intro relative w-full bg-[color:var(--ct-bg)] py-16 sm:py-20 lg:py-24"
    >
      <div
        className="mx-auto grid grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
        style={{ maxWidth: "var(--ct-container)" }}
      >
        <header className="lg:sticky lg:top-[calc(var(--ct-header-h)+24px)] lg:self-start">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[color:var(--ct-border)] bg-[color:var(--ct-bg-alt)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[1.1px] text-[color:var(--ct-text-subtle)]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--ct-primary)]" />
            {eyebrow}
          </p>
          <h2
            id="intro-heading"
            className="font-[family-name:var(--ct-font-display)] text-[clamp(30px,4vw,50px)] font-medium leading-[1.05] tracking-tight text-[color:var(--ct-ink)]"
          >
            {heading}
          </h2>
          <p className="mt-6 max-w-[420px] text-[15px] leading-[1.6] text-[color:var(--ct-text-muted)]">
            {siteMeta.greekTagline}.
          </p>
        </header>

        <div className="ct-prose max-w-[680px] text-[17px] leading-[1.75] text-[color:var(--ct-text)]">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {signature ? (
            <p className="mt-8 font-[family-name:var(--ct-font-accent)] text-[22px] italic text-[color:var(--ct-primary)]">
              — {signature}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
