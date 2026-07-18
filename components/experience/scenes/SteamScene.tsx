"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LIFESTYLE, SITE } from "@/lib/site";
import { useChapter } from "../useChapter";
import type { Chapter } from "../chapter";

gsap.registerPlugin(ScrollTrigger);

const CHAPTER: Chapter = { n: "02", name: "Recovery" };

/** 02 — Enter the steam. The statement sits in rising steam over the dusk
 *  photograph; on scroll the steam lifts and the backyard clears. Dark room,
 *  no panels — the steam itself is the transition. */
export default function SteamScene({
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
          end: "+=190%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });
      tl.fromTo(
        q("[data-line]"),
        { clipPath: "inset(100% 0% 0% 0%)", yPercent: 40 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          yPercent: 0,
          stagger: 0.1,
          ease: "power2.out",
          duration: 0.35,
        },
        0.05
      )
        .fromTo(
          q("[data-sub]"),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, ease: "power2.out", duration: 0.25 },
          0.4
        )
        // the statement dissolves into the steam
        .to(
          q("[data-copy]"),
          { opacity: 0, y: -40, ease: "none", duration: 0.2 },
          0.52
        )
        // the steam lifts
        .to(
          q("[data-blob]"),
          {
            yPercent: -55,
            opacity: 0,
            stagger: 0.05,
            ease: "none",
            duration: 0.42,
          },
          0.54
        )
        .to(q("[data-veil]"), { opacity: 0, ease: "none", duration: 0.4 }, 0.56)
        // and the camera settles on the backyard
        .fromTo(
          q("[data-img]"),
          { scale: 1.14 },
          { scale: 1, ease: "none", duration: 0.46 },
          0.54
        );

      // ambient rise so the steam feels alive while it's on screen
      gsap.to(q("[data-blob]"), {
        y: -30,
        duration: 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 1.8,
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={ref} className="relative h-[100svh] overflow-hidden bg-ink">
      {/* the backyard the steam clears to reveal */}
      <div data-img className="absolute inset-0">
        <Image
          src={LIFESTYLE.heroDusk.src}
          alt={LIFESTYLE.heroDusk.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* the steam — soft warm haze over the photograph */}
      <div data-veil className="absolute inset-0 z-10">
        <div aria-hidden className="absolute inset-0 bg-ink/45" />
        <div
          data-blob
          aria-hidden
          className="absolute left-[6%] top-[48%] h-[48vh] w-[62vw] rounded-full bg-[#e9e4da]/25 blur-[100px]"
        />
        <div
          data-blob
          aria-hidden
          className="absolute right-[4%] top-[16%] h-[52vh] w-[54vw] rounded-full bg-[#e9e4da]/20 blur-[110px]"
        />
        <div
          data-blob
          aria-hidden
          className="absolute bottom-[-12%] left-[28%] h-[42vh] w-[70vw] rounded-full bg-[#f4f1ea]/15 blur-[90px]"
        />
      </div>

      {/* the statement held inside the steam */}
      <div
        data-copy
        className="absolute inset-0 z-20 flex flex-col justify-end px-6 pb-24 md:px-12 lg:px-16 lg:pb-28"
      >
        <p className="eyebrow mb-6">02 — Cold therapy · {SITE.city}</p>
        <h2 className="display-serif text-limestone text-[12vw] sm:text-[7.5vw]">
          <span className="block overflow-hidden">
            <span data-line className="block">
              The cold plunge
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-line className="block">
              that holds
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-line className="block">its own cold.</span>
          </span>
        </h2>
        <p
          data-sub
          className="mt-7 max-w-md text-base leading-relaxed text-limestone/75 sm:text-lg"
        >
          A cedar-and-steel plunge with a built-in chiller, sold in {SITE.city}.
        </p>
      </div>

      <p className="absolute bottom-8 right-6 z-20 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-limestone/60 md:right-12 lg:right-16">
        Steam off 3° water — {SITE.city}, {SITE.region}
      </p>
    </section>
  );
}
