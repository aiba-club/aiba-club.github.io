"use client";
import { useEffect, useRef } from "react";
// 2D-canvas ASCII gradient (no WebGL fallback for GradientASCII).
const STOPS: [number, number, number][] = [[255, 255, 255], [140, 200, 255], [47, 111, 207], [10, 42, 107], [5, 11, 26]];
const RAMP = " .:+=xX08S#@";
function color(t: number) { const x = Math.min(0.999, Math.max(0, t)) * (STOPS.length - 1), i = Math.floor(x), f = x - i; return STOPS[i].map((c, k) => Math.round(c + (STOPS[i + 1][k] - c) * f)); }
export default function AsciiCanvas({ cell = 16, className = "", rise = false }: { cell?: number; className?: string; rise?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!, ctx = c.getContext("2d")!; let raf = 0, w = 0, h = 0;
    const size = () => { const r = c.getBoundingClientRect(); w = c.width = r.width; h = c.height = r.height; };
    size(); addEventListener("resize", size);
    const draw = (ms: number) => {
      const t = ms / 1000; ctx.clearRect(0, 0, w, h); ctx.font = `${cell}px ui-monospace, Menlo, monospace`; ctx.textBaseline = "top";
      const cols = Math.ceil(w / (cell * 0.62)), rows = Math.ceil(h / cell);
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
        let v = y / rows; if (rise) v = 1 - v;
        const bulge = Math.exp(-Math.pow((x / cols - 0.5) * 2.2, 2)) * 0.28;
        v = v + 0.06 * Math.sin(x * 0.11 + t * 0.8) + 0.05 * Math.sin(y * 0.2 - t * 0.6) - bulge * (1 - v);
        const g = Math.min(1, Math.max(0, v)); const [r, gr, b] = color(g);
        const n = Math.sin(x * 12.9898 + y * 78.233 + Math.floor(t * 2 + (x + y) % 5) * 3.7) * 43758.5453; const rnd = n - Math.floor(n);
        const ch = RAMP[Math.min(RAMP.length - 1, Math.max(0, Math.floor((1 - g * 0.85) * (RAMP.length - 1) * (0.55 + rnd * 0.6))))];
        if (ch === " ") continue;
        ctx.fillStyle = `rgba(${r},${gr},${b},${0.1 + 0.5 * (1 - g)})`; ctx.fillText(ch, x * cell * 0.62, y * cell);
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", size); };
  }, [cell, rise]);
  return <canvas ref={ref} className={"absolute inset-0 w-full h-full " + className} />;
}
