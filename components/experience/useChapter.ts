"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Chapter } from "./chapter";

gsap.registerPlugin(ScrollTrigger);

/** Reports this scene as the current chapter while it occupies the viewport. */
export function useChapter(
  ref: RefObject<HTMLElement | null>,
  chapter: Chapter,
  onChapter: (c: Chapter) => void
) {
  useEffect(() => {
    if (!ref.current) return;
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 50%",
      end: "bottom 50%",
      onToggle: (self) => self.isActive && onChapter(chapter),
    });
    return () => st.kill();
  }, [ref, chapter, onChapter]);
}
