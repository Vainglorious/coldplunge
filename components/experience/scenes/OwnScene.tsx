"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE } from "@/lib/site";
import { useChapter } from "../useChapter";
import type { Chapter } from "../chapter";

gsap.registerPlugin(ScrollTrigger);

const CHAPTER: Chapter = { n: "09", name: "Ownership" };

const FACTS = [
  {
    v: SITE.price,
    l: `${SITE.priceNote} — tub, chiller & lid complete`,
  },
  { v: "Canada-wide", l: "Ships across Canada" },
  { v: SITE.city, l: "We install locally" },
  { v: "1-year", l: "Limited warranty" },
];

/** 09 — Ownership. Deep evergreen, real numbers, no invented praise. */
export default function OwnScene({
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
      gsap.fromTo(
        q("[data-rise]"),
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "power2.out",
          duration: 0.8,
          scrollTrigger: { trigger: ref.current, start: "top 65%" },
        }
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      id="ownership"
      ref={ref}
      className="bg-forest px-6 py-28 md:px-12 lg:px-16 lg:py-36"
    >
      <div className="mx-auto max-w-[1500px]">
        <p data-rise className="eyebrow">
          09 — Ownership
        </p>
        <h2
          data-rise
          className="mt-5 max-w-5xl display-serif text-limestone text-[10vw] sm:text-[5vw]"
        >
          A serious plunge, without the big-name markup.
        </h2>

        <div className="mt-16 grid gap-10 border-t border-limestone/15 pt-12 sm:grid-cols-4">
          {FACTS.map((f) => (
            <div key={f.l} data-rise>
              <p className="display-grot text-3xl text-limestone sm:text-4xl">
                {f.v}
              </p>
              <p className="mt-2.5 font-mono text-[0.66rem] uppercase leading-relaxed tracking-[0.16em] text-limestone/60">
                {f.l}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
