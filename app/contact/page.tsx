import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { ContactForm } from "@/components/ContactForm";
import { PageHeader, Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get a quote on a ${SITE.brand} cold plunge, ask about shipping or installation, or just say hello.`,
};

const REASONS = [
  "A full quote with shipping to your address",
  "Whether it'll fit your space",
  "Installation in the Calgary area",
  "Anything else about the unit",
];

export default function ContactPage() {
  return (
    <main className="pt-14 sm:pt-20">
      <Container>
        <PageHeader
          eyebrow="Contact"
          title="Let's get you plunging."
          intro="Fill this out and it comes straight to us — we'll get back to you quickly. Leave a phone number and tick the box if you'd like a text confirmation."
        />
      </Container>

      <Container className="mt-12 pb-4">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start">
          <div>
            <p className="eyebrow">We can help with</p>
            <ul className="mt-4 space-y-3">
              {REASONS.map((r) => (
                <li key={r} className="flex items-start gap-3 text-mist">
                  <IceTick />
                  <span>{r}</span>
                </li>
              ))}
            </ul>

            <div className="divider my-8" />

            <p className="text-slate text-sm">Prefer to reach out directly?</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-ice hover:text-ice-bright transition-colors"
                >
                  {SITE.email}
                </a>
              </li>
              <li className="text-mist">{SITE.phoneDisplay}</li>
              <li className="text-slate-dim">
                {SITE.city}, {SITE.region}
              </li>
            </ul>
          </div>

          <div className="card frost-shadow p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Container>
    </main>
  );
}

function IceTick() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      aria-hidden
      className="mt-1 shrink-0"
    >
      <path
        d="M4 10.5l4 4 8-9"
        fill="none"
        stroke="#6fd3e8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
