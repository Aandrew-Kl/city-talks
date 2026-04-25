"use client";

import { useState, type FormEvent } from "react";

import { siteMeta } from "@/app/data";

/**
 * Contact form — opens the user's mail client via `mailto:`.
 *
 * No backend / no email provider — we serialize the fields into a mailto: URL
 * with prefilled subject + body, and let the visitor's mail app handle delivery.
 * Works on a fully static GitHub Pages build (no /api routes needed).
 */
export default function ContactForm() {
  const [opened, setOpened] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const body =
      `Από: ${name}` +
      (email ? ` <${email}>` : "") +
      `\n\n${message}`;

    const href =
      `mailto:${siteMeta.email}` +
      `?subject=${encodeURIComponent(subject || "Επικοινωνία από city-talks.gr")}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = href;
    setOpened(true);
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="ct-contact-form grid grid-cols-1 gap-5 md:grid-cols-2"
      aria-describedby="contact-status"
    >
      <FieldWrap label="Ονοματεπώνυμο" name="name" placeholder="Το όνομά σας" autoComplete="name" required />
      <FieldWrap label="Email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
      <FieldWrap label="Θέμα" name="subject" placeholder="Για ποιο θέμα μας γράφετε;" required wide />
      <FieldWrap label="Μήνυμα" name="message" as="textarea" rows={5} placeholder="Το μήνυμά σας…" required wide />

      <div className="md:col-span-2 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-[color:var(--ct-primary)] px-6 py-3 text-[15px] font-semibold text-[color:var(--ct-on-primary)] shadow-[var(--ct-shadow-sm)] transition-colors hover:bg-[color:var(--ct-primary-700)]"
        >
          Send message
        </button>

        <p id="contact-status" aria-live="polite" aria-atomic="true" className="text-[14px]">
          {opened && (
            <span className="text-[color:var(--ct-secondary)]">
              Άνοιξε το email client σας — πατήστε «Send» για να μας στείλετε το μήνυμα.
            </span>
          )}
        </p>
      </div>
    </form>
  );
}

interface FieldWrapProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  wide?: boolean;
  as?: "input" | "textarea";
  rows?: number;
}

function FieldWrap({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  required,
  wide,
  as = "input",
  rows,
}: FieldWrapProps) {
  const id = `contact-${name}`;
  const inputClasses =
    "w-full rounded-[var(--ct-radius-md)] border border-[color:var(--ct-border)] bg-[color:var(--ct-bg)] px-4 py-3 text-[16px] text-[color:var(--ct-ink)] placeholder:text-[color:var(--ct-text-muted)] transition-colors focus:border-[color:var(--ct-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--ct-primary)]/25";

  return (
    <div className={wide ? "md:col-span-2" : ""}>
      <label htmlFor={id} className="mb-2 block text-[13px] font-semibold uppercase tracking-[1.1px] text-[color:var(--ct-text-subtle)]">
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {as === "textarea" ? (
        <textarea id={id} name={name} placeholder={placeholder} required={required} rows={rows} className={inputClasses} />
      ) : (
        <input id={id} name={name} type={type} placeholder={placeholder} autoComplete={autoComplete} required={required} className={inputClasses} />
      )}
    </div>
  );
}
