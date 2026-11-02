"use client";
import { useEffect, useRef, useState } from "react";
// Renders a WebGL effect; if the GPU context is lost or unavailable, shows `fallback`.
export default function SafeGL({ children, fallback, className = "" }: { children: React.ReactNode; fallback: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [bad, setBad] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const lost = () => setBad(true);
    el.addEventListener("webglcontextlost", lost, true);
    const t = setTimeout(() => { const c = el.querySelector("canvas"); const g = c && (c.getContext("webgl2") || c.getContext("webgl")); if (g && g.isContextLost()) setBad(true); }, 2500);
    return () => { el.removeEventListener("webglcontextlost", lost, true); clearTimeout(t); };
  }, []);
  return <div ref={ref} className={className}>{bad ? fallback : children}</div>;
}
