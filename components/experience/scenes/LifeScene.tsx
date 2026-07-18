"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LIFESTYLE } from "@/lib/site";
import { useChapter } from "../useChapter";
import type { Chapter } from "../chapter";

gsap.registerPlugin(ScrollTrigger);

const CHAPTER: Chapter = { n: "06", name: "Calgary" };

/** 06 — Calgary-based. A magazine spread: two frames, generous air,
 *  asymmetric placement, captions set in tiny mono. */
export default function LifeScene({
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
      gsap.utils.toArray<HTMLElement>(q("[data-reveal]")).forEach((el) => {
        const img = el.querySelector("img");
        gsap.fromTo(
          el,
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 40%",
              scrub: 0.5,
            },
          }
        );
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.16 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                end: "top 40%",
                scrub: 0.5,
              },
            }
          );
        }
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      id="lifestyle"
      ref={ref}
      className="relative bg-ink px-6 py-28 md:px-12 lg:px-16 lg:py-40"
    >
      <div className="mx-auto max-w-[1500px]">
        <p className="eyebrow">06 — Calgary-based</p>
        <h2 className="mt-5 display-serif text-limestone text-[12vw] sm:text-[6.5vw]">
          Sourced direct, sold local.
        </h2>

        <div className="mt-16 grid grid-cols-12 gap-6 sm:mt-24">
          <figure className="col-span-12 sm:col-span-8">
            <div data-reveal className="overflow-hidden">
              <div className="relative aspect-[16/10]">
                <Image
                  src={LIFESTYLE.heroDusk.src}
                  alt={LIFESTYLE.heroDusk.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 66vw"
                  className="object-cover"
                />
              </div>
            </div>
            <figcaption className="mt-4 font-mono text-[0.66rem] uppercase tracking-[0.2em] text-muted">
              A Calgary backyard, blue hour
            </figcaption>
          </figure>

          <div className="col-span-12 flex items-end sm:col-span-4">
            <p className="max-w-xs text-lg leading-relaxed text-body sm:pb-4">
              So you get a serious plunge for far less than the big-name brands
              charge.
            </p>
          </div>

          <figure className="col-span-12 sm:col-span-5 sm:col-start-8 sm:-mt-24">
            <div data-reveal className="overflow-hidden">
              <div className="relative aspect-[4/5]">
                <Image
                  src={LIFESTYLE.winterSteam.src}
                  alt={LIFESTYLE.winterSteam.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 42vw"
                  className="object-cover object-left"
                />
              </div>
            </div>
            <figcaption className="mt-4 font-mono text-[0.66rem] uppercase tracking-[0.2em] text-muted">
              Steam off 3° water, first snow
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
