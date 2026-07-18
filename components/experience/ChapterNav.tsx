"use client";

import Link from "next/link";
import { useEffect, useState, type RefObject } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { scrollToScene } from "./scroll";
import type { Chapter } from "./chapter";

const SCENES = [
  { id: "#product", label: "The Unit" },
  { id: "#craft", label: "Craft" },
  { id: "#lifestyle", label: "Gallery" },
  { id: "#install", label: "Installation" },
  { id: "#ownership", label: "Ownership" },
];

const PAGES = [
  { href: "/why-cold-plunge", label: "Why Cold Plunge" },
  { href: "/specifications", label: "Specifications" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

/**
 * Floating navigation — transparent over the hero, liquid-glass once the
 * journey begins. Scene anchors glide through Lenis; the consultation CTA
 * stays one click away at all times.
 */
export default function ChapterNav({
  progressRef,
}: {
  chapter: Chapter;
  progressRef: RefObject<HTMLSpanElement | null>;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <span
        ref={progressRef}
        aria-hidden
        className="fixed top-0 left-0 z-[70] h-[2px] w-full origin-left scale-x-0 bg-champagne"
      />
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[60] px-4 pt-4 md:px-12 lg:px-16">
        <div
          className={`flex items-center justify-between rounded-xl px-4 py-2 transition-all duration-500 ${
            scrolled ? "liquid-glass" : ""
          }`}
        >
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="pointer-events-auto font-mono text-[0.7rem] uppercase tracking-[0.22em] text-white"
          >
            Calgary Cold Plunge<span className="opacity-60">.</span>
          </Link>

          <nav className="pointer-events-auto hidden items-center gap-8 md:flex">
            {SCENES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollToScene(s.id)}
                className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-white"
              >
                {s.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="btn-primary pointer-events-auto hidden !px-5 !py-2 text-sm sm:inline-flex"
            >
              Book Consultation
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="liquid-glass pointer-events-auto flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full md:hidden"
            >
              <span className="h-[1.5px] w-5 bg-white" />
              <span className="h-[1.5px] w-3.5 bg-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] flex flex-col bg-[#0a0a0a]"
          >
            <div className="flex h-16 items-center justify-end px-4">
              <motion.button
                initial={{ rotate: -90, scale: 0.8, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: [0.77, 0, 0.18, 1] }}
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="liquid-glass relative flex h-11 w-11 items-center justify-center rounded-full"
              >
                <span className="absolute h-[1.5px] w-5 rotate-45 bg-white" />
                <span className="absolute h-[1.5px] w-5 -rotate-45 bg-white" />
              </motion.button>
            </div>

            <nav className="flex flex-1 flex-col items-center justify-center gap-7">
              {PAGES.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + i * 0.06,
                    ease: [0.77, 0, 0.18, 1],
                  }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-3xl text-white/90 transition-colors hover:text-champagne"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.1 + PAGES.length * 0.06,
                ease: [0.77, 0, 0.18, 1],
              }}
              className="pb-14 text-center"
            >
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="btn-primary"
              >
                Book Consultation
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
