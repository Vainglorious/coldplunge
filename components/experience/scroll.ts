"use client";

import type Lenis from "lenis";

/** Shared handle so nav links and hero buttons can glide to scene anchors
 *  through Lenis instead of jumping. */
let lenis: Lenis | null = null;

export function registerLenis(instance: Lenis | null) {
  lenis = instance;
}

export function scrollToScene(target: string) {
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.6 });
    return;
  }
  document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
}
