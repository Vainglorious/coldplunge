"use client";

import { useEffect, useState, type ReactNode } from "react";

/** Fades content in once, after `delay` ms measured from `play` going true. */
export function FadeIn({
  play,
  delay = 0,
  duration = 1000,
  className = "",
  children,
}: {
  play: boolean;
  delay?: number;
  duration?: number;
  className?: string;
  children: ReactNode;
}) {
  const [go, setGo] = useState(false);

  useEffect(() => {
    if (!play) return;
    const t = setTimeout(() => setGo(true), delay);
    return () => clearTimeout(t);
  }, [play, delay]);

  return (
    <div
      className={`transition-opacity ${className}`}
      style={{ opacity: go ? 1 : 0, transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
}
