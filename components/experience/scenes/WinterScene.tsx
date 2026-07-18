"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CHILLER, LIFESTYLE } from "@/lib/site";
import Snowfall from "../Snowfall";
import { useChapter } from "../useChapter";
import type { Chapter } from "../chapter";

gsap.registerPlugin(ScrollTrigger);

const CHAPTER: Chapter = { n: "03", name: "Winter" };

/** 03 — Winter is the feature. A solid grotesque -30° sits on the winter
 *  photograph — type on image, never image inside type — with the chiller
 *  argument below and snow overhead. */
export default function WinterScene({
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
          trigger: ref.current,
          start: "top top",
          end: "+=150%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });
      tl.fromTo(
        q("[data-img]"),
        { scale: 1.12 },
        { scale: 1, ease: "none", duration: 1 },
        0
      )
        .fromTo(
          q("[data-big]"),
          { yPercent: 9 },
          { yPercent: -9, ease: "none", duration: 1 },
          0
        )
        .fromTo(
          q("[data-wline]"),
          { yPercent: 110 },
          { yPercent: 0, stagger: 0.08, ease: "power2.out", duration: 0.4 },
          0.2
        );
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={ref} className="relative h-[100svh] overflow-hidden bg-ink">
      {/* the winter photograph */}
      <div data-img className="absolute inset-0">
        <Image
          src={LIFESTYLE.winterSteam.src}
          alt={LIFESTYLE.winterSteam.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-ink/40" />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-ink/30"
        />
      </div>

      {/* giant solid numeral — parallax against the photo */}
      <div
        data-big
        aria-hidden
        className="absolute inset-0 z-10 flex items-center justify-center"
      >
        <span className="display-grot select-none leading-[0.8] tracking-[-0.02em] text-limestone/95 text-[42vw] sm:text-[30vw]">
          -30°
        </span>
      </div>
      <span className="sr-only">Minus thirty degrees</span>

      <Snowfall className="absolute inset-0 z-20 h-full w-full" density={130} />

      <div className="absolute inset-x-6 bottom-[8vh] z-30 md:inset-x-12 lg:inset-x-16">
        <p className="eyebrow">03 — Built-in chiller</p>
        <h2 className="mt-4 display-serif text-limestone text-[11vw] sm:text-[5.5vw]">
          <span className="block overflow-hidden">
            <span data-wline className="block">
              Set it and forget it.
            </span>
          </span>
        </h2>
        <p className="mt-4 max-w-md overflow-hidden text-lg leading-relaxed text-limestone/75">
          <span data-wline className="block">
            The integrated chiller holds your temperature year-round — no
            hauling bags of ice.
          </span>
        </p>
        <p className="mt-5 overflow-hidden font-mono text-[0.68rem] uppercase tracking-[0.2em] text-champagne">
          <span data-wline className="block">
            Holds {CHILLER.coolsTo} — automatically
          </span>
        </p>
      </div>
    </section>
  );
}
