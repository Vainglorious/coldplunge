import twilio from "twilio";
import { SITE } from "./site";

// Ported from the odysseymovie project — same client setup and best-effort send.
const sid = process.env.TWILIO_ACCOUNT_SID;
const token = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_FROM_NUMBER;

let client: ReturnType<typeof twilio> | null = null;
function getClient() {
  if (!sid || !token) throw new Error("Twilio credentials missing");
  if (!client) client = twilio(sid, token);
  return client;
}

export function isSmsConfigured(): boolean {
  return Boolean(sid && token && from);
}

export async function sendSMS(to: string, body: string) {
  if (!from) throw new Error("TWILIO_FROM_NUMBER missing");
  return getClient().messages.create({ to, from, body });
}

function firstName(full: string): string {
  const t = full.trim();
  return t ? t.split(/\s+/)[0] : t;
}

/** The text Adil gets each time someone submits the contact form. */
export function formatAdminMessage(input: {
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  smsConsent: boolean;
}) {
  return [
    `🧊 New ${SITE.brandShort} enquiry`,
    `${input.name}`,
    `✉︎ ${input.email}`,
    input.phone ? `☎ ${input.phone}${input.smsConsent ? " (OK to text)" : ""}` : null,
    input.message ? `\n"${input.message}"` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

/**
 * The confirmation text the lead gets — ONLY sent when they gave a phone number
 * and ticked the SMS-consent box. Includes who we are and a STOP notice for
 * Canadian anti-spam (CASL) compliance.
 */
export function formatLeadMessage(input: { name: string }) {
  const first = firstName(input.name);
  return [
    `Hi ${first}, thanks for reaching out to ${SITE.brand}! We got your message and will get back to you shortly.`,
    ``,
    `Reply STOP to opt out of texts.`,
  ].join("\n");
}
