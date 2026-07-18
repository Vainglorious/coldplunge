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
    <main className="pt-24 sm:pt-32 pb-10">
      <Container>
        <div className="max-w-xl mx-auto text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-forest border border-line flex items-center justify-center">
            <svg width="30" height="30" viewBox="0 0 20 20" aria-hidden>
              <path
                d="M4 10.5l4 4 8-9"
                fill="none"
                stroke="#c9a86a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1 className="font-display text-limestone text-4xl sm:text-5xl mt-8">
            Message sent.
          </h1>
          <p className="text-body mt-5 leading-relaxed">
            Thanks for reaching out — we&apos;ve got it and we&apos;ll get back
            to you shortly. If you left your number and asked for a text, a
            confirmation is on its way.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-10">
            <Link href="/" className="btn-primary">
              Back Home
            </Link>
            <Link href="/why-cold-plunge" className="btn-ghost text-limestone">
              Why Cold Plunge?
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
