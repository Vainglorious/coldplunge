import { randomUUID } from "node:crypto";
import { isDbConfigured, saveLead } from "@/lib/db";
import {
  formatAdminMessage,
  formatLeadMessage,
  isSmsConfigured,
  sendSMS,
} from "@/lib/twilio";
import { normalizePhone, validateContact } from "@/lib/validate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  smsConsent?: unknown;
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return Response.json({ ok: false, error: "bad json" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const phoneRaw = (body.phone ?? "").trim();
  const message = (body.message ?? "").trim();
  const smsConsent = body.smsConsent === true;

  const errors = validateContact({ name, email, phone: phoneRaw, message });
  if (Object.keys(errors).length > 0) {
    return Response.json(
      { ok: false, error: "validation", errors },
      { status: 400 }
    );
  }

  if (!isDbConfigured()) {
    return Response.json(
      { ok: false, error: "the site isn't finished wiring up its database yet" },
      { status: 503 }
    );
  }

  // Empty string -> null so the column stays clean; +1XXXXXXXXXX when valid.
  const phone = phoneRaw ? normalizePhone(phoneRaw) : "";

  try {
    await saveLead({
      id: randomUUID(),
      name,
      email,
      phone: phone || null,
      message: message || null,
      sms_consent: smsConsent,
    });
  } catch (e) {
    console.error("save failed", e);
    return Response.json(
      { ok: false, error: "couldn't save your message — try again in a sec" },
      { status: 500 }
    );
  }

  // SMS is best-effort: the lead is already saved, so a Twilio failure must not
  // fail the request.
  if (isSmsConfigured()) {
    const adminPhone = process.env.ADMIN_PHONE;
    const messages: Promise<unknown>[] = [];

    // Always notify Adil.
    if (adminPhone) {
      messages.push(
        sendSMS(
          adminPhone,
          formatAdminMessage({
            name,
            email,
            phone: phone || null,
            message: message || null,
            smsConsent,
          })
        ).catch((e) => console.error("admin sms failed", e))
      );
    }

    // Confirmation to the lead ONLY with a valid phone AND explicit consent.
    if (phone && smsConsent) {
      messages.push(
        sendSMS(phone, formatLeadMessage({ name })).catch((e) =>
          console.error("lead sms failed", e)
        )
      );
    }

    await Promise.allSettled(messages);
  }

  return Response.json({ ok: true });
}
