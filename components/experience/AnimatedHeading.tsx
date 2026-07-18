"use client";

import { useEffect, useState } from "react";

const CHAR_DELAY = 30; // ms between characters
const INITIAL_DELAY = 200; // ms after `play` before the first character moves

/**
 * Character-by-character entrance: each character slides in from the left
 * (translateX(-18px), opacity 0) with a 30ms stagger. Splits on \n into
 * lines; the stagger accumulates across lines like the reference.
 */
export function AnimatedHeading({
  text,
  play,
  className = "",
}: {
  text: string;
  play: boolean;
  className?: string;
}) {
  const [go, setGo] = useState(false);

  useEffect(() => {
    if (!play) return;
    const t = setTimeout(() => setGo(true), INITIAL_DELAY);
    return () => clearTimeout(t);
  }, [play]);

  const lines = text.split("\n");

  return (
    <h1 className={className} aria-label={text}>
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden>
          {line.split("").map((ch, ci) => (
            <span
              key={ci}
              className="inline-block transition-all duration-500 ease-out"
              style={{
                opacity: go ? 1 : 0,
                transform: go ? "translateX(0)" : "translateX(-18px)",
                transitionDelay: `${li * line.length * CHAR_DELAY + ci * CHAR_DELAY}ms`,
              }}
            >
              {ch === " " ? " " : ch}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}
