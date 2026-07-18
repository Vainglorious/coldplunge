"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useChapter } from "../useChapter";
import type { Chapter } from "../chapter";

gsap.registerPlugin(ScrollTrigger);

const CHAPTER: Chapter = { n: "08", name: "Installation" };

const STEPS = [
  {
    n: "01",
    word: "Arrives",
    body: "It arrives ready to go — tub, chiller and lid, fully assembled.",
  },
  {
    n: "02",
    word: "Position",
    body: "Position it on a level surface — roughly 85″ × 36″ of footprint.",
  },
  {
    n: "03",
    word: "Fill",
    body: "Fill it with water. No plumbing — it's self-contained.",
  },
  {
    n: "04",
    word: "Plug in",
    body: "One standard 110V outlet. Set 3°C — it holds it from there.",
  },
  {
    n: "05",
    word: "We install",
    body: "In the Calgary area, we can install it for you — if you'd rather.",
  },
];

/** 08 — Installation. Each milestone takes the screen, left-aligned like a
 *  blueprint page, with a segment line tracking progress along the bottom. */
export default function InstallScene({
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
      const steps = q("[data-step]");

      gsap.set(ref.current, { height: "100svh" });
      gsap.set(steps, {
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      });
      gsap.set(q("[data-progress]"), {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: "2.5rem",
        marginTop: 0,
      });
      gsap.set(steps.slice(1), { opacity: 0, y: 90 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "+=260%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      steps.forEach((_, i) => {
        if (i === 0) {
          tl.to(steps[0], { opacity: 0, y: -90, ease: "none", duration: 0.16 }, 0.14);
          return;
        }
        const at = 0.19 + (i - 1) * 0.19;
        tl.fromTo(
          steps[i],
          { opacity: 0, y: 90 },
          { opacity: 1, y: 0, ease: "none", duration: 0.16 },
          at
        );
        if (i < steps.length - 1) {
          tl.to(steps[i], { opacity: 0, y: -90, ease: "none", duration: 0.16 }, at + 0.19);
        }
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="install" ref={ref} className="relative overflow-hidden bg-ink py-24">
      <p className="eyebrow absolute left-6 top-8 z-20 md:left-12 lg:left-16">
        08 — Installation
      </p>

      <div className="space-y-24 pt-16">
        {STEPS.map((s, i) => (
          <div key={s.n} data-step className="relative">
            <div className="px-6 md:px-12 lg:px-16">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-champagne">
                {s.n} — 05
              </p>
              <h3 className="mt-3 display-grot uppercase leading-[0.95] text-limestone text-[11vw] sm:text-[7.5vw]">
                {s.word}
                <span className="text-champagne">.</span>
              </h3>
              <p className="mt-6 max-w-md leading-relaxed text-body">
                {s.body}
              </p>
            </div>

            {/* segment progress — in flow when static, pinned to the
                viewport bottom by GSAP when the scene is pinned */}
            <div
              data-progress
              aria-hidden
              className="mt-14 flex gap-2 px-6 md:px-12 lg:px-16"
            >
              {STEPS.map((t, ti) => (
                <span
                  key={t.n}
                  className={`h-px flex-1 ${
                    ti === i ? "bg-champagne" : "bg-line"
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
