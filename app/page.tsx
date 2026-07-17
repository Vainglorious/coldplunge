import Image from "next/image";
import Link from "next/link";
import { SITE, PRODUCT, PHOTOS, CHILLER } from "@/lib/site";
import { CtaBand, Container } from "@/components/ui";

const HIGHLIGHTS = [
  {
    title: "Built-in chiller",
    body: "Set it and forget it. The integrated chiller holds your temperature year-round — no hauling bags of ice.",
  },
  {
    title: "Cedar & stainless",
    body: "Western red cedar outside, a seamless stainless-steel liner inside. Made to live outdoors through a Calgary winter.",
  },
  {
    title: "Ships assembled",
    body: "It arrives ready to go. Position it, fill it, plug it in. We can install it for you too, if you'd rather.",
  },
  {
    title: "Calgary-based",
    body: "Sourced direct and sold local, so you get a serious plunge for far less than the big-name brands charge.",
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-12 sm:pt-20 pb-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <p className="eyebrow">Cold therapy · {SITE.city}</p>
            <h1 className="font-heading font-bold text-frost text-4xl sm:text-6xl mt-4 leading-[1.02]">
              The cold plunge that holds its own cold.
            </h1>
            <p className="text-mist text-lg mt-6 max-w-xl leading-relaxed">
              A cedar-and-steel plunge with a built-in chiller, sold in{" "}
              {SITE.city}. Step in at a perfect {CHILLER.coolsTo} any day of the
              year — no ice, no fuss. Recovery, on tap.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-9">
              <Link href="/contact" className="btn-primary">
                Get a Quote
              </Link>
              <Link href="/why-cold-plunge" className="btn-ghost">
                Why Cold Plunge?
              </Link>
            </div>

            <p className="text-slate mt-6 text-sm">
              <span className="text-frost font-semibold text-base">
                {SITE.price}
              </span>{" "}
              {SITE.priceNote} · ships across Canada · we install locally
            </p>
          </div>

          <div className="relative">
            <div className="card frost-shadow overflow-hidden">
              <Image
                src={PHOTOS.hero.src}
                alt={PHOTOS.hero.alt}
                width={1600}
                height={1067}
                priority
                sizes="(max-width: 1024px) 100vw, 600px"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <Container className="mt-16 sm:mt-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {HIGHLIGHTS.map((h) => (
            <div key={h.title} className="card p-6">
              <h3 className="font-heading font-semibold text-frost text-lg">
                {h.title}
              </h3>
              <p className="text-slate text-sm mt-2 leading-relaxed">{h.body}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* Product strip */}
      <Container className="mt-20 sm:mt-28">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="card frost-shadow overflow-hidden order-2 lg:order-1">
            <Image
              src={PHOTOS.gallery[0].src}
              alt={PHOTOS.gallery[0].alt}
              width={1600}
              height={1067}
              sizes="(max-width: 1024px) 100vw, 600px"
              className="w-full h-auto"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="eyebrow">The unit</p>
            <h2 className="font-heading font-bold text-frost text-3xl sm:text-4xl mt-3">
              {PRODUCT.name}
            </h2>
            <p className="text-mist mt-5 leading-relaxed">
              One tub, everything you need. Roomy enough for one or two, with a
              seamless stainless liner that stays clean, a red-cedar shell that
              looks the part, and an insulated lid that keeps the cold in when
              you&apos;re done.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                `Holds ${CHILLER.coolsTo}, automatically`,
                `${PRODUCT.exterior} exterior, ${PRODUCT.interior.toLowerCase()}`,
                `Runs on a ${CHILLER.power.split(" — ")[0]} outlet`,
                PRODUCT.assembly,
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-mist">
                  <IceTick />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/specifications" className="btn-ghost">
                Full Specifications
              </Link>
            </div>
          </div>
        </div>
      </Container>

      <CtaBand />
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
