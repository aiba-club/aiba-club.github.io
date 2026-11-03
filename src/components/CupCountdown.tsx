"use client";
import { useEffect, useState } from "react";
import { CUP } from "@/data/challenge";

// One tile per digit: rolling column, a split-flap seam across the middle, soft top sheen.
function Roll({ value, size, pad = 2 }: { value: number; size: number | string; pad?: number }) {
  const str = String(value).padStart(pad, "0");
  return (
    <span className="inline-flex gap-[0.08em]" style={{ fontSize: size, lineHeight: 1 }} aria-hidden>
      {str.split("").map((ch, i) => (
        <span key={i} className="relative inline-block overflow-hidden rounded-[0.16em] border border-white/10 bg-[#0a1226] shadow-[inset_0_1px_0_rgba(255,255,255,.12),0_8px_20px_-8px_rgba(0,0,0,.6)]" style={{ width: "0.74em", height: "1.08em" }}>
          <span className="absolute inset-x-0 top-0 flex flex-col transition-transform duration-700 ease-[cubic-bezier(.3,1.3,.5,1)]" style={{ transform: `translateY(${-Number(ch) * 1.08}em)` }}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => <span key={d} className="grid place-items-center font-semibold text-white" style={{ height: "1.08em" }}>{d}</span>)}
          </span>
          <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[.09] to-transparent" />
          <span aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-black/70 shadow-[0_1px_0_rgba(255,255,255,.08)]" />
        </span>
      ))}
    </span>
  );
}

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { d: Math.floor(s / 86400), h: Math.floor(s / 3600) % 24, m: Math.floor(s / 60) % 60, s: s % 60 };
}

export default function CupCountdown({ compact = false }: { compact?: boolean }) {
  const [t, setT] = useState<ReturnType<typeof parts> | null>(null);
  useEffect(() => {
    const tick = () => setT(parts(new Date(CUP.start).getTime() - Date.now()));
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);
  const v = t ?? { d: 0, h: 0, m: 0, s: 0 };
  const units: [string, number][] = compact ? [["days", v.d], ["hours", v.h], ["min", v.m], ["sec", v.s]] : [["days", v.d], ["hours", v.h], ["minutes", v.m], ["seconds", v.s]];
  const size = compact ? 30 : "clamp(26px, 8.2vw, 76px)";
  const total = 1000 * 60 * 60 * 24 * 150;
  const left = Math.max(0, new Date(CUP.start).getTime() - Date.now());
  const pct = Math.min(100, Math.max(0, (1 - left / total) * 100));
  return (
    <div role="timer" aria-label={`Time until the AIBA Cup starts: ${v.d} days, ${v.h} hours, ${v.m} minutes`} className="mx-auto w-fit max-w-full">
      <div className={"flex items-start justify-center " + (compact ? "gap-1.5" : "gap-2 sm:gap-4")}>
        {units.map(([label, n], i) => (
          <div key={label} className={"flex items-start " + (compact ? "gap-1.5" : "gap-2 sm:gap-4")}>
            <div className="text-center">
              <Roll value={n} size={size} pad={label === "days" ? Math.max(2, String(n).length) : 2} />
              <p className={"font-mono uppercase tracking-[0.18em] text-lb " + (compact ? "mt-2 text-[9px]" : "mt-4 text-xs")}>{label}</p>
            </div>
            {i < units.length - 1 && <span aria-hidden className="cd-colon font-semibold text-lb/70" style={{ fontSize: `calc(${typeof size === "number" ? size + "px" : size} * 0.7)`, lineHeight: 1.08 }}>:</span>}
          </div>
        ))}
      </div>
      {!compact && (
        <div className="mt-10" aria-hidden>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-[#2f6fcf] to-[#8cc8ff]" style={{ width: `${pct}%` }} /></div>
          <p className="mt-2 text-left font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">Countdown progress</p>
        </div>
      )}
    </div>
  );
}
