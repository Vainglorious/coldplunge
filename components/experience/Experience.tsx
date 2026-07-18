"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { AnimatePresence } from "framer-motion";
import Preloader from "./Preloader";
import ChapterNav from "./ChapterNav";
import type { Chapter } from "./chapter";
import HeroScene from "./scenes/HeroScene";
import SteamScene from "./scenes/SteamScene";
import WinterScene from "./scenes/WinterScene";
import CraftScene from "./scenes/CraftScene";
import RecoverScene from "./scenes/RecoverScene";
import LifeScene from "./scenes/LifeScene";
import ProductScene from "./scenes/ProductScene";
import InstallScene from "./scenes/InstallScene";
import OwnScene from "./scenes/OwnScene";
import FinaleScene from "./scenes/FinaleScene";
import { registerLenis } from "./scroll";

gsap.registerPlugin(ScrollTrigger);

/**
 * The cinematic home experience — one continuous scroll through an Alberta
 * winter. Lenis supplies the glide, GSAP ScrollTrigger pins and scrubs the
 * scenes, Framer Motion handles the preloader and UI-level transitions.
 */
export default function Experience() {
  const [loaded, setLoaded] = useState(false);
  const [chapter, setChapter] = useState<Chapter>({ n: "01", name: "Arrival" });
  const progressRef = useRef<HTMLSpanElement>(null);

  const reduced = useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
  const ready = loaded || reduced;

  const finishLoading = useCallback(() => setLoaded(true), []);

  // Lenis smooth scroll, driven by GSAP's ticker
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    registerLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      registerLenis(null);
      lenis.destroy();
    };
  }, [reduced]);

  // Lock scroll while the preloader is up, then recalculate pins
  useEffect(() => {
    document.documentElement.style.overflow = ready ? "" : "hidden";
    if (ready) ScrollTrigger.refresh();
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [ready]);

  // Scroll progress hairline — direct DOM write, no re-renders
  useEffect(() => {
    const el = progressRef.current;
    if (!el) return;
    const set = gsap.quickSetter(el, "scaleX");
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      set(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Recalculate pins once fonts and images settle
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  return (
    <div className="relative">
      <AnimatePresence>
        {!ready && <Preloader onDone={finishLoading} />}
      </AnimatePresence>

      <ChapterNav chapter={chapter} progressRef={progressRef} />

      <HeroScene onChapter={setChapter} play={ready} />
      <SteamScene onChapter={setChapter} />
      <WinterScene onChapter={setChapter} />
      <CraftScene onChapter={setChapter} />
      <RecoverScene onChapter={setChapter} />
      <LifeScene onChapter={setChapter} />
      <ProductScene onChapter={setChapter} />
      <InstallScene onChapter={setChapter} />
      <OwnScene onChapter={setChapter} />
      <FinaleScene onChapter={setChapter} />
    </div>
  );
}
