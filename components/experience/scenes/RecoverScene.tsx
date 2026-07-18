"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CHILLER, LIFESTYLE } from "@/lib/site";
import { useChapter } from "../useChapter";
import type { Chapter } from "../chapter";

gsap.registerPlugin(ScrollTrigger);

const CHAPTER: Chapter = { n: "05", name: "Ritual" };

const WORDS = ["No ice", "No fuss", "On tap"];

/** 05 — Recovery. Three quiet words cycle across the horizon — solid serif
 *  over the dusk photograph, no masks, no boxes. Just cadence. */
export default function RecoverScene({
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
      const words = q("[data-word]");

      gsap.set(words, {
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      });
      gsap.set(words.slice(1), { opacity: 0.05 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "+=230%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });
      tl.to(
        words[0],
        { opacity: 0.05, yPercent: -22, ease: "none", duration: 0.2 },
        0.26
      )
        .fromTo(
          words[1],
          { opacity: 0.05, yPercent: 22 },
          { opacity: 1, yPercent: 0, ease: "none", duration: 0.2 },
          0.3
        )
        .to(
          words[1],
          { opacity: 0.05, yPercent: -22, ease: "none", duration: 0.2 },
          0.6
        )
        .fromTo(
          words[2],
          { opacity: 0.05, yPercent: 22 },
          { opacity: 1, yPercent: 0, ease: "none", duration: 0.2 },
          0.64
        );
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={ref} className="relative h-[100svh] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={LIFESTYLE.heroDusk.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top brightness-[0.4]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink/70"
        />
      </div>

      {/* the horizon the words align to */}
      <div aria-hidden className="absolute inset-x-0 top-1/2 h-px bg-limestone/20" />

      <p className="eyebrow absolute left-6 top-20 z-20 md:left-12 md:top-24 lg:left-16">
        05 — Recovery
      </p>

      <div className="relative z-10 flex h-full items-center justify-center">
        {WORDS.map((word) => (
          <div key={word} data-word className="py-8 text-center">
            <h3 className="display-serif text-limestone text-[15vw] sm:text-[11vw]">
              {word}
              <span className="text-champagne">.</span>
            </h3>
          </div>
        ))}
      </div>

      <p className="absolute inset-x-6 bottom-8 z-20 font-mono text-[0.66rem] uppercase leading-relaxed tracking-[0.18em] text-limestone/70 md:inset-x-12 lg:inset-x-16">
        Step in at a perfect {CHILLER.coolsTo} any day of the year — no ice, no
        fuss. Recovery, on tap.
      </p>
    </section>
  );
}
