// Phone + form validation, ported from the odysseymovie project and adapted
// for a name / email / phone / message contact form.

export function phoneDigits(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) return digits.slice(1);
  return digits;
}

export function formatPhoneInput(raw: string): string {
  const digits = phoneDigits(raw).slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/** Returns a Twilio-ready +1XXXXXXXXXX string, or "" when not a valid number. */
export function normalizePhone(raw: string): string {
  const digits = phoneDigits(raw);
  if (digits.length === 10) return `+1${digits}`;
  const trimmed = raw.trim();
  if (trimmed.startsWith("+")) {
    const intl = "+" + trimmed.slice(1).replace(/\D/g, "");
    return intl.length > 1 ? intl : "";
  }
  return "";
}

export function validateName(raw: string): string | null {
  const n = raw.trim();
  if (!n) return "please enter your name";
  if (n.length < 2) return "that name looks short";
  if (n.length > 80) return "just first + last is plenty";
  return null;
}

// Deliberately lenient — enough to catch typos, not to reject valid addresses.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(raw: string): string | null {
  const e = raw.trim();
  if (!e) return "please enter your email";
  if (e.length > 120) return "that email looks too long";
  if (!EMAIL_RE.test(e)) return "that doesn't look like an email";
  return null;
}

/** Phone is optional on the contact form — only validate when something's typed. */
export function validatePhone(raw: string, required = false): string | null {
  const digits = phoneDigits(raw);
  if (!digits) return required ? "please enter a phone number" : null;
  if (digits.length < 10) return "need 10 digits";
  if (digits.length > 10) return "too many digits";
  return null;
}

export function validateMessage(raw: string): string | null {
  if (raw.trim().length > 2000) return "that message is a bit long";
  return null;
}

export type ValidationErrors = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

export function validateContact(input: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): ValidationErrors {
  const errors: ValidationErrors = {};
  const n = validateName(input.name);
  if (n) errors.name = n;
  const e = validateEmail(input.email);
  if (e) errors.email = e;
  // Phone is required — everyone who submits gets a confirmation text.
  const p = validatePhone(input.phone, true);
  if (p) errors.phone = p;
  const m = validateMessage(input.message);
  if (m) errors.message = m;
  return errors;
}
