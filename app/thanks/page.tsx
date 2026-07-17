import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Thanks",
  description: "Thanks for reaching out — we'll be in touch shortly.",
  robots: { index: false },
};

export default function ThanksPage() {
  return (
    <main className="pt-20 sm:pt-28 pb-10">
      <Container>
        <div className="max-w-xl mx-auto text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-card border border-line flex items-center justify-center ice-glow">
            <svg width="30" height="30" viewBox="0 0 20 20" aria-hidden>
              <path
                d="M4 10.5l4 4 8-9"
                fill="none"
                stroke="#6fd3e8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1 className="font-heading font-bold text-frost text-3xl sm:text-4xl mt-7">
            Message sent.
          </h1>
          <p className="text-mist mt-4 leading-relaxed">
            Thanks for reaching out — we&apos;ve got it and we&apos;ll get back to
            you shortly. If you left your number and asked for a text, a
            confirmation is on its way.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-9">
            <Link href="/" className="btn-primary">
              Back Home
            </Link>
            <Link href="/why-cold-plunge" className="btn-ghost">
              Why Cold Plunge?
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
