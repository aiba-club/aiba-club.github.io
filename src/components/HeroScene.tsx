"use client";
import { useEffect, useRef } from "react";

// A blueprint of things being built: wireframe app pieces drift around the headline and lean toward the cursor.
const line = "h-2 rounded-full bg-[#8cc8ff]/25";
function Card({ cls, depth, delay, children }: { cls: string; depth: number; delay: string; children: React.ReactNode }) {
  return (
    <div className={`absolute ${cls}`} style={{ transform: `translate(calc(var(--mx) * ${depth}px), calc(var(--my) * ${depth}px))`, transition: "transform .6s cubic-bezier(.2,.7,.2,1)" }}>
      <div className="hs-float rounded-2xl border border-[#8cc8ff]/25 bg-[#0a1630]/70 p-3.5 shadow-[0_20px_50px_-20px_rgba(47,111,207,.6)] backdrop-blur-sm" style={{ animationDelay: delay }}>{children}</div>
    </div>
  );
}

export default function HeroScene() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const on = (e: PointerEvent) => { const r = el.getBoundingClientRect(); el.style.setProperty("--mx", String(((e.clientX - r.left) / r.width - 0.5) * -2)); el.style.setProperty("--my", String(((e.clientY - r.top) / r.height - 0.5) * -2)); };
    window.addEventListener("pointermove", on, { passive: true }); return () => window.removeEventListener("pointermove", on);
  }, []);
  return (
    <div ref={ref} aria-hidden className="hero-scene pointer-events-none absolute inset-x-0 top-0 hidden h-[760px] overflow-hidden xl:block" style={{ ["--mx" as string]: 0, ["--my" as string]: 0 }}>
      {/* browser window */}
      <Card cls="left-[3%] top-[17%] w-[230px]" depth={18} delay="0s">
        <div className="flex gap-1.5"><i className="h-2 w-2 rounded-full bg-white/30" /><i className="h-2 w-2 rounded-full bg-white/30" /><i className="h-2 w-2 rounded-full bg-white/30" /></div>
        <div className="mt-3 h-14 rounded-lg bg-gradient-to-br from-[#8cc8ff]/30 to-[#2f6fcf]/20" />
        <div className={`${line} mt-3 w-3/4`} /><div className={`${line} mt-2 w-1/2`} />
        <div className="mt-3 h-6 w-20 rounded-full bg-white/80" />
      </Card>
      {/* phone */}
      <Card cls="right-[4%] top-[14%] w-[170px]" depth={28} delay="-3s">
        <div className="mx-auto h-1.5 w-10 rounded-full bg-white/25" />
        {[0, 1, 2].map((i) => <div key={i} className="mt-3 flex items-center gap-2"><span className="h-7 w-7 rounded-lg bg-gradient-to-br from-[#8cc8ff]/50 to-[#2f6fcf]/40" /><div className="flex-1"><div className={`${line} w-full`} /><div className={`${line} mt-1.5 w-2/3`} /></div></div>)}
      </Card>
      {/* chart */}
      <Card cls="left-[6%] top-[58%] w-[200px]" depth={34} delay="-5s">
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#8cc8ff]/70">Signups</p>
        <div className="mt-2 flex h-14 items-end gap-1.5">{[30, 45, 38, 62, 55, 80, 100].map((h, i) => <span key={i} className="hs-bar flex-1 rounded-t bg-[#8cc8ff]/55" style={{ height: `${h}%`, animationDelay: `${i * 0.12}s` }} />)}</div>
      </Card>
      {/* prompt */}
      <Card cls="right-[5%] top-[60%] w-[250px]" depth={22} delay="-8s">
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#8cc8ff]/70">Prompt</p>
        <p className="mt-2 text-sm text-white/85">Make me a study app<span className="hs-caret ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-[#8cc8ff]" /></p>
        <div className="mt-3 flex gap-2"><span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] text-white/70">ChatGPT</span><span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] text-white/70">Cursor</span></div>
      </Card>
      {/* toast */}
      <Card cls="left-[24%] top-[84%] w-[190px]" depth={40} delay="-2s">
        <p className="flex items-center gap-2 text-xs text-white/85"><span className="h-2 w-2 rounded-full bg-emerald-300" />New signup · just now</p>
      </Card>
    </div>
  );
}
