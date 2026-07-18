import type { Metadata } from "next";
import { FAQS } from "@/lib/site";
import { PageHeader, CtaBand, Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions about our cold plunge — installation, power and plumbing, temperature, winter use, maintenance, shipping and warranty.",
};

export default function FaqPage() {
  return (
    <main className="pt-16 sm:pt-24">
      <Container>
        <PageHeader
          eyebrow="FAQ"
          title="Questions, answered."
          intro="The things people ask most before buying. Don't see yours? Reach out — we're happy to talk it through."
        />
      </Container>

      <Container className="mt-14 sm:mt-16">
        <div className="max-w-3xl divide-y divide-line border-t border-line">
          {FAQS.map((faq) => (
            <details key={faq.q} className="group py-6">
              <summary className="flex items-start justify-between gap-6 cursor-pointer list-none">
                <span className="font-heading text-limestone text-xl sm:text-2xl tracking-tight">
                  {faq.q}
                </span>
                <span
                  aria-hidden
                  className="mt-1 shrink-0 text-champagne font-light transition-transform group-open:rotate-45 text-3xl leading-none"
                >
                  +
                </span>
              </summary>
              <p className="text-body mt-4 leading-relaxed pr-10">{faq.a}</p>
            </details>
          ))}
        </div>
      </Container>

      <CtaBand
        heading="Still have a question?"
        sub="Send it over — a real person in Calgary will get back to you."
      />
    </main>
  );
}
