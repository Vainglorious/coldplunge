import type { Metadata } from "next";
import Link from "next/link";
import { SITE, PRODUCT, CHILLER } from "@/lib/site";
import { PageHeader, CtaBand, Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Pricing",
  description: `The ${SITE.brand} cold plunge is ${SITE.price} ${SITE.priceNote}. See what's included and how shipping and installation work.`,
};

const INCLUDED = [
  `${PRODUCT.name} — ${PRODUCT.seats}`,
  `${PRODUCT.exterior} exterior with a ${PRODUCT.interior.toLowerCase()}`,
  "Built-in chiller + circulation pump",
  "Insulated cedar lid",
  PRODUCT.assembly,
  PRODUCT.warranty,
];

const ADDONS = [
  {
    title: "Shipping",
    price: "Quoted by location",
    body: "We ship across Canada. Calgary-area delivery is quick and inexpensive; farther out we'll quote you an exact number before you commit.",
  },
  {
    title: "Local installation",
    price: "Optional add-on",
    body: "Prefer to skip the setup? For an extra charge we'll position it, get it running, and walk you through it — in the Calgary area.",
  },
];

export default function PricingPage() {
  return (
    <main className="pt-16 sm:pt-24">
      <Container>
        <PageHeader
          eyebrow="Pricing"
          title="One honest price for a serious plunge."
          intro="No configurator, no upsell maze. You get the complete unit — tub, chiller and lid — for one price. Shipping and optional installation are the only extras."
        />
      </Container>

      <Container className="mt-14 sm:mt-16">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-6 items-start">
          {/* Price card — the warm light plate */}
          <div className="card-light lift-warm p-9 sm:p-11">
            <p className="eyebrow eyebrow-warm">Complete unit</p>
            <div className="flex items-baseline gap-3 mt-4">
              <span className="font-heading text-ink text-6xl tracking-tight">
                {SITE.price}
              </span>
              <span className="text-muted-light">{SITE.priceNote}</span>
            </div>
            <p className="text-body-light text-sm mt-4 leading-relaxed">
              Chiller included — this isn&apos;t an ice-only tub. Comparable
              chillered plunges from the big brands run well beyond this.
            </p>

            <ul className="mt-8 space-y-3.5">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-3 text-body-light">
                  <BronzeTick />
                  <span className="text-[0.95rem]">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <Link href="/contact" className="btn-dark w-full text-center">
                Get a Quote
              </Link>
            </div>
          </div>

          {/* Add-ons + value note */}
          <div className="space-y-5">
            {ADDONS.map((a) => (
              <div key={a.title} className="card p-7">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-heading text-limestone text-xl tracking-tight">
                    {a.title}
                  </h3>
                  <span className="text-champagne text-sm shrink-0">
                    {a.price}
                  </span>
                </div>
                <p className="text-body text-sm mt-2.5 leading-relaxed">
                  {a.body}
                </p>
              </div>
            ))}

            <div className="card p-7 border-l-2 border-l-bronze">
              <h3 className="font-heading text-limestone text-xl tracking-tight">
                Why it&apos;s a deal
              </h3>
              <p className="text-body text-sm mt-2.5 leading-relaxed">
                We source the unit directly and sell it locally in {SITE.city},
                so you&apos;re not paying a premium brand markup. You get a
                cedar-and-steel plunge that holds {CHILLER.coolsTo} on its own —
                the kind of unit that usually costs a lot more.
              </p>
            </div>
          </div>
        </div>
      </Container>

      <Container className="mt-14">
        <p className="text-faint text-xs">
          Pricing shown in CAD and subject to change. Contact us for a written
          quote including shipping to your address.
        </p>
      </Container>

      <CtaBand
        heading="Get your exact, all-in number."
        sub="Tell us where you are and we'll quote the unit plus shipping — and installation if you want it."
      />
    </main>
  );
}

function BronzeTick() {
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
        stroke="#a57a45"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
