"use client";

import { useState, type FormEvent } from "react";

/**
 * Contact form — posts to `/api/contact`.
 *
 * Fields: name, email, subject, message + hidden `website` honeypot.
 * Greek-first copy. Uses native constraint validation (`required`, `type=email`)
 * for the pre-flight check plus server-side zod validation for defense-in-depth.
 *
 * Status is announced via `aria-live="polite"`. The submit button disables
 * while the request is in flight. On success the form resets.
 */
type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | {
      kind: "error";
      message: string;
      fieldErrors?: Record<string, string[]>;
    };

const initialStatus: Status = { kind: "idle" };

export default function ContactForm() {
  const [status, setStatus] = useState<Status>(initialStatus);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.kind === "submitting") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      subject: String(formData.get("subject") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      website: String(formData.get("website") ?? ""),
    };

    // Client-side email sanity check — short-circuit before firing the request.
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(payload.email)) {
      setStatus({
        kind: "error",
        message: "Μη έγκυρη διεύθυνση email.",
        fieldErrors: { email: ["Μη έγκυρη διεύθυνση email."] },
      });
      return;
    }

    setStatus({ kind: "submitting" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as
          | { error?: string; fieldErrors?: Record<string, string[]> }
          | null;
        setStatus({
          kind: "error",
          message:
            body?.error ??
            "Κάτι πήγε στραβά. Δοκιμάστε ξανά σε λίγο.",
          fieldErrors: body?.fieldErrors,
        });
        return;
      }

      form.reset();
      setStatus({ kind: "success" });
    } catch {
      setStatus({
        kind: "error",
        message:
          "Δεν ήταν δυνατή η αποστολή. Ελέγξτε τη σύνδεσή σας και δοκιμάστε ξανά.",
      });
    }
  }

  const isSubmitting = status.kind === "submitting";
  const fieldErrors = status.kind === "error" ? status.fieldErrors : undefined;

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="ct-contact-form grid grid-cols-1 gap-5 md:grid-cols-2"
      aria-describedby="contact-status"
    >
      <FieldWrap
        label="Ονοματεπώνυμο"
        name="name"
        placeholder="Το όνομά σας"
        autoComplete="name"
        required
        errors={fieldErrors?.name}
      />

      <FieldWrap
        label="Email"
        name="email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        required
        errors={fieldErrors?.email}
      />

      <FieldWrap
        label="Θέμα"
        name="subject"
        placeholder="Για ποιο θέμα μας γράφετε;"
        required
        errors={fieldErrors?.subject}
        wide
      />

      <FieldWrap
        label="Μήνυμα"
        name="message"
        as="textarea"
        rows={5}
        placeholder="Το μήνυμά σας…"
        required
        errors={fieldErrors?.message}
        wide
      />

      {/* Honeypot — hidden from users; bots fill it and get dropped. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <div className="md:col-span-2 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-[color:var(--ct-primary)] px-6 py-3 text-[15px] font-semibold text-[color:var(--ct-on-primary)] shadow-[var(--ct-shadow-sm)] transition-colors hover:bg-[color:var(--ct-primary-700)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Γίνεται αποστολή…" : "Send message"}
        </button>

        <p
          id="contact-status"
          aria-live="polite"
          aria-atomic="true"
          className="text-[14px]"
        >
          {status.kind === "success" && (
            <span className="text-[color:var(--ct-secondary)]">
              Ευχαριστούμε! Το μήνυμά σας στάλθηκε — θα επικοινωνήσουμε
              σύντομα.
            </span>
          )}
          {status.kind === "error" && (
            <span className="text-[color:var(--ct-accent)]">{status.message}</span>
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
  errors?: string[];
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
  errors,
  wide,
  as = "input",
  rows,
}: FieldWrapProps) {
  const id = `contact-${name}`;
  const describedBy = errors && errors.length > 0 ? `${id}-error` : undefined;

  const inputClasses =
    "w-full rounded-[var(--ct-radius-md)] border border-[color:var(--ct-border)] bg-[color:var(--ct-bg)] px-4 py-3 text-[16px] text-[color:var(--ct-ink)] placeholder:text-[color:var(--ct-text-muted)] transition-colors focus:border-[color:var(--ct-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--ct-primary)]/25";

  return (
    <div className={wide ? "md:col-span-2" : ""}>
      <label
        htmlFor={id}
        className="mb-2 block text-[13px] font-semibold uppercase tracking-[1.1px] text-[color:var(--ct-text-subtle)]"
      >
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {as === "textarea" ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          rows={rows}
          aria-invalid={errors && errors.length > 0 ? true : undefined}
          aria-describedby={describedBy}
          className={inputClasses}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          aria-invalid={errors && errors.length > 0 ? true : undefined}
          aria-describedby={describedBy}
          className={inputClasses}
        />
      )}
      {errors && errors.length > 0 ? (
        <p
          id={`${id}-error`}
          className="mt-2 text-[13px] text-[color:var(--ct-accent)]"
        >
          {errors.join(" ")}
        </p>
      ) : null}
    </div>
  );
}
