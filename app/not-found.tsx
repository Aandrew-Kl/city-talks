import Link from "next/link";
import type { Metadata } from "next";
import Logo from "./components/Logo";

export const metadata: Metadata = {
  title: "404 — Η σελίδα δεν βρέθηκε | City Talks",
  description:
    "Η σελίδα που ψάχνεις δεν υπάρχει ή έχει μεταφερθεί. Επιστροφή στο City Talks.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex-1 bg-gradient-to-br from-white via-neutral-50 to-[color:var(--ct-primary)]/5">
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center gap-8 px-6 py-24 text-center">
        <Logo />

          <p className="text-sm font-bold uppercase tracking-[0.3em] text-brand-purple">
            Error 404
          </p>

          <h1 className="text-6xl font-extrabold tracking-tight text-neutral-900 md:text-8xl">
            <span className="text-brand-purple">Ουπς.</span>
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-neutral-700">
            Η σελίδα που ψάχνεις δεν βρέθηκε. Μπορεί να μετακινήθηκε ή να μην
            υπάρχει πια. Ας επιστρέψουμε στην αρχική και ας συνεχίσουμε τη
            συζήτηση.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="rounded-full bg-brand-purple px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-pink"
            >
              Αρχική
            </Link>
            <Link
              href="/opinions"
              className="rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-bold text-neutral-900 transition hover:border-brand-purple hover:text-brand-purple"
            >
              Απόψεις
            </Link>
            <Link
              href="/lets-talk"
              className="rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-bold text-neutral-900 transition hover:border-brand-pink hover:text-brand-pink"
            >
              Let&apos;s Talk
            </Link>
          </div>
      </div>
    </main>
  );
}
