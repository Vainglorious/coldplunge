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
    <main className="pt-14 sm:pt-20">
      <Container>
        <PageHeader
          eyebrow="FAQ"
          title="Questions, answered."
          intro="The things people ask most before buying. Don't see yours? Reach out — we're happy to talk it through."
        />
      </Container>

      <Container className="mt-12">
        <div className="max-w-3xl divide-y divide-line">
          {FAQS.map((faq) => (
            <details key={faq.q} className="group py-5">
              <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                <span className="font-heading font-semibold text-frost text-lg">
                  {faq.q}
                </span>
                <span
                  aria-hidden
                  className="mt-1 shrink-0 text-ice-dim transition-transform group-open:rotate-45 text-2xl leading-none"
                >
                  +
                </span>
              </summary>
              <p className="text-slate mt-3 leading-relaxed pr-8">{faq.a}</p>
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
