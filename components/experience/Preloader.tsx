"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/** 00 — Preloader. A thin line calibrates, then the screen lifts like a blind. */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const dur = 2100;
    let raf = 0;
    let doneTimer: ReturnType<typeof setTimeout>;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setPct(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else doneTimer = setTimeout(onDone, 300);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] bg-ink flex items-center justify-center"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* the progress line becomes the horizon */}
      <div className="absolute inset-x-0 top-1/2 h-px bg-limestone/10" />
      <div
        className="absolute top-1/2 left-0 h-px w-full origin-left bg-champagne"
        style={{ transform: `scaleX(${pct / 100})` }}
      />
      <div className="relative flex flex-col items-center gap-5">
        <span className="eyebrow">Calibrating winter</span>
        <span className="font-mono text-limestone text-5xl sm:text-6xl tabular-nums">
          {String(pct).padStart(3, "0")}%
        </span>
      </div>
    </motion.div>
  );
}
