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
    <main className="pt-14 sm:pt-20">
      <Container>
        <PageHeader
          eyebrow="Pricing"
          title="One honest price for a serious plunge."
          intro="No configurator, no upsell maze. You get the complete unit — tub, chiller and lid — for one price. Shipping and optional installation are the only extras."
        />
      </Container>

      <Container className="mt-12">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-6 items-start">
          {/* Price card */}
          <div className="card frost-shadow p-8 relative overflow-hidden">
            <div
              aria-hidden
              className="absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(circle at 20% 0%, rgba(94,145,181,0.14), transparent 60%)",
              }}
            />
            <div className="relative">
              <p className="eyebrow">Complete unit</p>
              <div className="flex items-baseline gap-2 mt-3">
                <span className="font-heading font-bold text-frost text-5xl">
                  {SITE.price}
                </span>
                <span className="text-slate">{SITE.priceNote}</span>
              </div>
              <p className="text-slate text-sm mt-3">
                Chiller included — this isn&apos;t an ice-only tub. Comparable
                chillered plunges from the big brands run well beyond this.
              </p>

              <ul className="mt-7 space-y-3">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-mist">
                    <IceTick />
                    <span className="text-[0.95rem]">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link href="/contact" className="btn-primary w-full text-center">
                  Get a Quote
                </Link>
              </div>
            </div>
          </div>

          {/* Add-ons + value note */}
          <div className="space-y-5">
            {ADDONS.map((a) => (
              <div key={a.title} className="card p-6">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-heading font-semibold text-frost text-lg">
                    {a.title}
                  </h3>
                  <span className="text-ice text-sm font-medium shrink-0">
                    {a.price}
                  </span>
                </div>
                <p className="text-slate text-sm mt-2 leading-relaxed">
                  {a.body}
                </p>
              </div>
            ))}

            <div className="card p-6 border-l-2 border-l-ice-dim">
              <h3 className="font-heading font-semibold text-frost">
                Why it&apos;s a deal
              </h3>
              <p className="text-slate text-sm mt-2 leading-relaxed">
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
        <p className="text-slate-dim text-xs">
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
        stroke="#5e91b5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
