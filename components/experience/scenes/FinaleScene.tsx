"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE } from "@/lib/site";
import { useChapter } from "../useChapter";
import type { Chapter } from "../chapter";

gsap.registerPlugin(ScrollTrigger);

const CHAPTER: Chapter = { n: "10", name: "Yours" };

/** 10–11 — Finale. WINTER IS YOURS fills the viewport, then compresses into
 *  the wordmark. The page closes on the live site's own invitation. */
export default function FinaleScene({
  onChapter,
}: {
  onChapter: (c: Chapter) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  useChapter(ref, CHAPTER, onChapter);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(ref);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: q("[data-stage]")[0],
          start: "top top",
          end: "+=140%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });
      tl.fromTo(
        q("[data-words]"),
        { scale: 0.94 },
        { scale: 1.07, ease: "none", duration: 0.55 },
        0
      )
        .to(
          q("[data-words]"),
          { scale: 0.14, opacity: 0, ease: "power1.in", duration: 0.3 },
          0.6
        )
        .fromTo(
          q("[data-mark]"),
          { opacity: 0, scale: 0.7 },
          { opacity: 1, scale: 1, ease: "power1.out", duration: 0.2 },
          0.82
        );
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={ref}>
      {/* pinned statement */}
      <div
        data-stage
        className="relative flex h-[100svh] items-center justify-center overflow-hidden bg-ink"
      >
        <h2
          data-words
          className="text-center display-serif text-limestone text-[17vw] sm:text-[14vw]"
        >
          <span className="block">Winter</span>
          <span className="block">is</span>
          <span className="block">
            yours<span className="text-champagne">.</span>
          </span>
        </h2>
        <p
          data-mark
          className="absolute font-display tracking-[0.02em] text-limestone text-2xl opacity-0 sm:text-3xl"
        >
          Calgary Cold Plunge<span className="text-champagne">.</span>
        </p>
      </div>

      {/* 11 — final CTA */}
      <div className="bg-[#0a0a0a] px-6 py-28 text-center md:px-12 lg:px-16 lg:py-36">
        <p className="eyebrow">11 — Begin</p>
        <h2 className="mt-5 display-serif text-limestone text-5xl sm:text-7xl">
          Ready to feel the difference?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-body">
          Tell us a bit about your space and we&apos;ll get you a full quote,
          shipping included.
        </p>
        <div className="mt-11 flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="btn-primary">
            Request a Quote
          </Link>
          <Link href="/specifications" className="btn-ghost text-limestone">
            View Specifications
          </Link>
        </div>

        <a
          href={`tel:+1${SITE.phoneDisplay.replace(/\D/g, "")}`}
          className="mt-14 inline-block font-display text-3xl tracking-tight text-limestone transition-colors hover:text-champagne sm:text-5xl"
        >
          {SITE.phoneDisplay}
        </a>

        <p className="mt-10 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-limestone/50">
          {SITE.city}, {SITE.region} · Ships across Canada · We install locally
        </p>

        <div className="mx-auto mt-16 flex max-w-6xl flex-wrap justify-between gap-2 border-t border-line-soft pt-6 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-faint">
          <span>© 2026 {SITE.brand}</span>
          <span className="hidden sm:inline">{SITE.address}</span>
          <span>{SITE.email}</span>
        </div>
      </div>
    </section>
  );
}
