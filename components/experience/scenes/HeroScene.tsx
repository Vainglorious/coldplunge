"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LIFESTYLE } from "@/lib/site";
import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { scrollToScene } from "../scroll";
import { useChapter } from "../useChapter";
import type { Chapter } from "../chapter";

gsap.registerPlugin(ScrollTrigger);

const CHAPTER: Chapter = { n: "01", name: "Arrival" };

/**
 * 01 — Hero. Raw full-viewport winter loop (no overlay, no dimming) with the
 * content anchored to the bottom: character-staggered serif headline, quiet
 * subheading, sharp buttons, and a liquid-glass tag. Scrolling pushes the
 * camera in, dims the content, and hands off to the steam scene.
 */
export default function HeroScene({
  onChapter,
  play,
}: {
  onChapter: (c: Chapter) => void;
  play: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  useChapter(ref, CHAPTER, onChapter);

  /* Reduced motion: the loop becomes a still frame */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      videoRef.current?.pause();
    }
  }, []);

  /* Scroll choreography — camera pushes in, content recedes, steam rises */
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(ref);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "+=130%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });
      tl.to(q("[data-img]"), { scale: 1.12, ease: "none" }, 0)
        .to(
          q("[data-content]"),
          { yPercent: -8, opacity: 0.12, ease: "none" },
          0.25
        )
        .fromTo(
          q("[data-steam]"),
          { opacity: 0, yPercent: 45 },
          { opacity: 1, yPercent: 0, ease: "none" },
          0.62
        );
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={ref} className="relative h-[100svh] overflow-hidden">
      {/* raw full-screen video — no overlay, no dimming whatsoever */}
      <div data-img className="absolute inset-0">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src="/videos/hero-bg.mp4"
          poster={LIFESTYLE.winterSteam.src}
          autoPlay
          muted
          loop
          playsInline
          aria-label={LIFESTYLE.winterSteam.alt}
        />
      </div>

      {/* bottom-anchored editorial content */}
      <div
        data-content
        className="relative z-10 flex h-full flex-col justify-end px-6 pb-12 [text-shadow:0_2px_30px_rgba(0,0,0,0.45)] md:px-12 lg:px-16 lg:pb-16"
      >
        <div className="lg:grid lg:grid-cols-2 lg:items-end lg:gap-12">
          <div>
            <FadeIn play={play} delay={150} duration={700}>
              <p className="eyebrow mb-5">Cold therapy · Calgary</p>
            </FadeIn>

            <AnimatedHeading
              text="Own the cold."
              play={play}
              className="font-display leading-[0.95] tracking-[-0.03em] text-limestone text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
            />

            <FadeIn play={play} delay={800}>
              <p className="mt-4 max-w-md text-base text-limestone/75 md:text-lg">
                A cedar-and-steel plunge with a built-in chiller, sold in
                Calgary.
              </p>
            </FadeIn>

            <FadeIn play={play} delay={1200}>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link href="/contact" className="btn-primary">
                  Book Consultation
                </Link>
                <button
                  type="button"
                  onClick={() => scrollToScene("#lifestyle")}
                  className="btn-ghost text-limestone"
                >
                  View Gallery
                </button>
              </div>
            </FadeIn>
          </div>

          <div className="mt-8 flex items-end justify-start lg:mt-0 lg:justify-end">
            <FadeIn play={play} delay={1400}>
              <div className="liquid-glass rounded-xl border border-white/20 px-6 py-3">
                <p className="font-display text-lg text-limestone md:text-xl lg:text-2xl">
                  Cedar. Steel. 3°C.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* rising steam that carries into scene 02 */}
      <div
        data-steam
        aria-hidden
        className="pointer-events-none absolute -bottom-[15%] left-1/2 z-40 h-[42vh] w-[150vw] -translate-x-1/2 rounded-full bg-[#e9e4da]/85 opacity-0 blur-[90px]"
      />
    </section>
  );
}
