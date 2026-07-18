"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PHOTOS } from "@/lib/site";
import { useChapter } from "../useChapter";
import type { Chapter } from "../chapter";

gsap.registerPlugin(ScrollTrigger);

const CHAPTER: Chapter = { n: "04", name: "Craft" };

const ROWS = [
  {
    photo: PHOTOS.gallery[0],
    index: "01",
    title: "The seamless liner",
    body: "A seamless stainless-steel liner inside — it stays clean, season after season.",
  },
  {
    photo: PHOTOS.gallery[3],
    index: "02",
    title: "The red-cedar shell",
    body: "Western red cedar outside — made to live outdoors through a Calgary winter, and to look the part.",
  },
  {
    photo: PHOTOS.gallery[2],
    index: "03",
    title: "The insulated lid",
    body: "An insulated lid that keeps the cold in when you're done.",
  },
];

/** 04 — Craftsmanship. Editorial macro storytelling: planks wipe the title in,
 *  photographs rise out of their frames as you reach them. */
export default function CraftScene({
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

      // title wipes in like cedar planks
      gsap.fromTo(
        q("[data-plank]"),
        { clipPath: "inset(0% 100% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          stagger: 0.15,
          ease: "power2.out",
          duration: 0.9,
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
        }
      );

      // photographs rise out of their frames
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
              start: "top 88%",
              end: "top 38%",
              scrub: 0.5,
            },
          }
        );
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.18 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                end: "top 38%",
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
      id="craft"
      ref={ref}
      className="relative bg-ink px-6 py-28 md:px-12 lg:px-16 lg:py-40"
    >
      <div className="mx-auto max-w-[1500px]">
        <p className="eyebrow">04 — Craftsmanship</p>
        <h2 className="mt-5 display-serif text-limestone text-[12vw] sm:text-[6.5vw]">
          <span className="block overflow-hidden">
            <span data-plank className="block">
              Cedar &amp; stainless.
            </span>
          </span>
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-body">
          Western red cedar outside, a seamless stainless-steel liner inside.
          Made to live outdoors through a Calgary winter.
        </p>

        <div className="mt-20 space-y-24 sm:mt-28 sm:space-y-36">
          {ROWS.map((row, i) => (
            <div key={row.index} className="grid grid-cols-12 items-end gap-6">
              <figure
                className={`col-span-12 sm:col-span-7 ${
                  i % 2 ? "sm:col-start-6" : ""
                }`}
              >
                <div data-reveal className="overflow-hidden">
                  <Image
                    src={row.photo.src}
                    alt={row.photo.alt}
                    width={1600}
                    height={1067}
                    sizes="(max-width: 640px) 100vw, 58vw"
                    className="h-auto w-full"
                  />
                </div>
                <figcaption className="mt-4 flex items-baseline gap-4">
                  <span className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-champagne">
                    {row.index}
                  </span>
                  <span className="display-grot text-xl text-limestone sm:text-2xl">
                    {row.title}
                  </span>
                </figcaption>
              </figure>
              <p
                className={`col-span-12 sm:col-span-4 ${
                  i % 2 ? "sm:col-start-1 sm:row-start-1" : "sm:col-start-9"
                } leading-relaxed text-body`}
              >
                {row.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
