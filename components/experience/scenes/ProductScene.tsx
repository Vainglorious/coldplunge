"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CHILLER, PHOTOS, PRODUCT, SITE } from "@/lib/site";
import { useChapter } from "../useChapter";
import type { Chapter } from "../chapter";

const CHAPTER: Chapter = { n: "07", name: "The unit" };

const VIEWS = [
  { id: "unit", label: "Full unit", ...PHOTOS.hero },
  { id: "liner", label: "Stainless liner", ...PHOTOS.gallery[0] },
  { id: "interior", label: "Interior", ...PHOTOS.gallery[1] },
  { id: "lid", label: "Insulated lid", ...PHOTOS.gallery[2] },
  { id: "cabinet", label: "Chiller cabinet", ...PHOTOS.gallery[3] },
];

const FACTS: [string, string][] = [
  ["Temperature", `Holds ${CHILLER.coolsTo}, automatically`],
  ["Exterior", PRODUCT.exterior],
  ["Interior", PRODUCT.interior],
  ["Power", "Standard 110V / 60Hz outlet"],
  ["Capacity", PRODUCT.seats],
  ["Dimensions", PRODUCT.dimensions],
  ["Assembly", PRODUCT.assembly],
  ["Warranty", PRODUCT.warranty],
];

/** 07 — The unit. Real photography, swapped like a configurator; a blueprint
 *  of numbers beside it. No sales cards, no fake finishes. */
export default function ProductScene({
  onChapter,
}: {
  onChapter: (c: Chapter) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  useChapter(ref, CHAPTER, onChapter);
  const [view, setView] = useState(VIEWS[0]);

  return (
    <section
      id="product"
      ref={ref}
      className="relative bg-ink px-6 py-28 md:px-12 lg:px-16 lg:py-36"
    >
      <div className="mx-auto max-w-[1500px]">
        <p className="eyebrow">07 — The unit</p>
        <h2 className="mt-5 display-serif text-limestone text-[12vw] sm:text-[6vw]">
          One tub, everything you need.
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-body">
          Roomy enough for one or two, with a seamless stainless liner that
          stays clean, a red-cedar shell that looks the part, and an insulated
          lid that keeps the cold in when you&apos;re done.
        </p>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* viewer */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden bg-graphite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={view.id}
                  className="absolute inset-0"
                  initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  exit={{ clipPath: "inset(0% 0% 0% 100%)" }}
                  transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                >
                  <Image
                    src={view.src}
                    alt={view.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover"
                  />
                  <span className="absolute bottom-4 left-4 font-mono text-[0.66rem] uppercase tracking-[0.2em] text-limestone/85">
                    {view.label}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* view selector — real photographs only */}
            <div
              className="mt-5 flex flex-wrap gap-2.5"
              role="group"
              aria-label="Product views"
            >
              {VIEWS.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  aria-pressed={view.id === v.id}
                  onClick={() => setView(v)}
                  className={`relative h-16 w-24 overflow-hidden transition-all duration-300 ${
                    view.id === v.id
                      ? "ring-1 ring-champagne"
                      : "opacity-50 hover:opacity-90"
                  }`}
                >
                  <Image
                    src={v.src}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* blueprint */}
          <div className="lg:col-span-5">
            <div className="relative border border-line p-6 sm:p-8">
              <span aria-hidden className="absolute -top-2 -left-1 font-mono text-xs text-faint">+</span>
              <span aria-hidden className="absolute -top-2 -right-1 font-mono text-xs text-faint">+</span>
              <span aria-hidden className="absolute -bottom-2 -left-1 font-mono text-xs text-faint">+</span>
              <span aria-hidden className="absolute -bottom-2 -right-1 font-mono text-xs text-faint">+</span>

              <div className="flex items-baseline justify-between gap-4">
                <span className="display-grot text-4xl text-limestone sm:text-5xl">
                  {SITE.price}
                </span>
                <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-muted">
                  {SITE.priceNote}
                </span>
              </div>
              <p className="mt-3 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-champagne">
                Ships across Canada · we install locally
              </p>

              <div className="mt-6">
                {FACTS.map(([label, value], i) => (
                  <div
                    key={label}
                    className={`flex items-baseline justify-between gap-6 py-2.5 font-mono text-[0.7rem] ${
                      i > 0 ? "border-t border-line-soft" : ""
                    }`}
                  >
                    <span className="uppercase tracking-[0.16em] text-muted">
                      {label}
                    </span>
                    <span className="text-right text-limestone">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Request a Quote
              </Link>
              <Link href="/specifications" className="btn-ghost text-limestone">
                Full Specifications
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
