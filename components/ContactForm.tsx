"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  formatPhoneInput,
  normalizePhone,
  validateContact,
  type ValidationErrors,
} from "@/lib/validate";

type Status = "idle" | "submitting" | "error";

export function ContactForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<ValidationErrors>({});

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);

  function clearError(field: keyof ValidationErrors) {
    setFieldErrors((e) => ({ ...e, [field]: undefined }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    const errs = validateContact({ name, email, phone, message });
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone ? normalizePhone(phone) : "",
          message: message.trim(),
          smsConsent,
        }),
      });
      const data = (await res.json()) as {
        ok: boolean;
        error?: string;
        errors?: ValidationErrors;
      };
      if (!res.ok || !data.ok) {
        if (data.errors) setFieldErrors(data.errors);
        throw new Error(data.error ?? "something broke");
      }
      router.push("/thanks");
    } catch (err) {
      setStatus("error");
      setFormError(
        err instanceof Error ? err.message : "something went wrong"
      );
    }
  }

  // Consent is only meaningful once a phone number is entered.
  const phoneEntered = phone.trim().length > 0;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <Field
        label="Your name"
        value={name}
        onChange={(v) => {
          setName(v);
          clearError("name");
        }}
        error={fieldErrors.name}
        autoComplete="name"
      />
      <Field
        label="Email"
        type="email"
        value={email}
        onChange={(v) => {
          setEmail(v);
          clearError("email");
        }}
        error={fieldErrors.email}
        autoComplete="email"
        inputMode="email"
        placeholder="you@example.com"
      />
      <Field
        label="Phone (optional)"
        type="tel"
        value={phone}
        onChange={(v) => {
          setPhone(formatPhoneInput(v));
          clearError("phone");
        }}
        error={fieldErrors.phone}
        autoComplete="tel"
        inputMode="tel"
        placeholder="403-555-5555"
        maxLength={12}
      />

      <label className="block">
        <span className="font-heading text-sm font-medium text-slate">
          Message <span className="text-slate-dim">(optional)</span>
        </span>
        <textarea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            clearError("message");
          }}
          rows={4}
          placeholder="Tell us about your space, timeline, or any questions…"
          className="mt-1.5 block w-full bg-bg-soft border border-line rounded-lg px-3.5 py-3 text-frost focus:outline-none focus:border-ice-dim transition-colors resize-y"
        />
        {fieldErrors.message && (
          <span className="block mt-1 text-cedar text-sm" role="alert">
            {fieldErrors.message}
          </span>
        )}
      </label>

      {/* SMS consent — the lead only gets texted if this is ticked AND a phone
          number was given. Unchecked by default for CASL compliance. */}
      <label
        className={[
          "flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors",
          smsConsent
            ? "border-ice-dim bg-card-hover"
            : "border-line bg-bg-soft hover:border-line",
          phoneEntered ? "" : "opacity-60",
        ].join(" ")}
      >
        <input
          type="checkbox"
          checked={smsConsent}
          onChange={(e) => setSmsConsent(e.target.checked)}
          className="mt-1 h-4 w-4 accent-[color:var(--color-ice)]"
        />
        <span className="text-sm text-mist">
          I want to receive a text message.
          <span className="block text-slate-dim mt-0.5">
            We&apos;ll send a confirmation to your phone. Standard rates may
            apply; reply STOP anytime.
          </span>
        </span>
      </label>

      {formError && (
        <p className="text-cedar font-medium" role="alert">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric";
  maxLength?: number;
};

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  autoComplete,
  inputMode,
  maxLength,
}: FieldProps) {
  return (
    <label className="block">
      <span className="font-heading text-sm font-medium text-slate">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        aria-invalid={error ? true : undefined}
        className={[
          "mt-1.5 block w-full bg-bg-soft border rounded-lg px-3.5 py-3 text-frost focus:outline-none transition-colors",
          error ? "border-cedar" : "border-line focus:border-ice-dim",
        ].join(" ")}
      />
      {error && (
        <span className="block mt-1 text-cedar text-sm" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}
