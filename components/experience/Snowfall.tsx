"use client";

import { useEffect, useRef } from "react";

/** Lightweight canvas snowfall — narrative weather, not decoration. */
export default function Snowfall({
  className = "",
  density = 110,
}: {
  className?: string;
  density?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const flakes = Array.from({ length: density }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 1.8,
      s: 0.12 + Math.random() * 0.4, // fall speed
      d: Math.random() * Math.PI * 2, // drift phase
      o: 0.25 + Math.random() * 0.55,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let t = 0;
    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#f7f5f2";
      for (const f of flakes) {
        f.y += f.s / 100;
        if (f.y > 1.05) {
          f.y = -0.05;
          f.x = Math.random();
        }
        const x = (f.x + Math.sin(t + f.d) * 0.012) * w;
        ctx.globalAlpha = f.o;
        ctx.beginPath();
        ctx.arc(x, f.y * h, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [density]);

  return (
    <canvas ref={ref} aria-hidden className={`pointer-events-none ${className}`} />
  );
}
