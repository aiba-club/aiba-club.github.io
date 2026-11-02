"use client";
import { useEffect, useState } from "react";
import { CUP } from "@/data/challenge";

function Roll({ value, size }: { value: number; size: number }) {
  const str = String(value).padStart(2, "0");
  return (
    <span className="inline-flex" style={{ fontSize: size, lineHeight: 1, height: "1em" }} aria-hidden>
      {str.split("").map((ch, i) => (
        <span key={i} className="relative inline-block overflow-hidden" style={{ width: "0.62em", height: "1em" }}>
          <span className="absolute inset-x-0 top-0 flex flex-col transition-transform duration-700 ease-out" style={{ transform: `translateY(${-Number(ch)}em)` }}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => <span key={d} style={{ height: "1em", lineHeight: 1 }}>{d}</span>)}
          </span>
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
  const size = compact ? 34 : 76;
  return (
    <div role="timer" aria-label={`Time until the AIBA Cup starts: ${v.d} days, ${v.h} hours, ${v.m} minutes`} className={"flex items-stretch justify-center " + (compact ? "gap-2" : "gap-3 sm:gap-5")}>
      {units.map(([label, n], i) => (
        <div key={label} className="flex items-center gap-2 sm:gap-5">
          <div className={"relative overflow-hidden rounded-[28px] border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,.10),rgba(255,255,255,.02))] text-center shadow-[0_20px_50px_-20px_rgba(140,200,255,.45)] " + (compact ? "px-2 py-4 min-w-[58px] sm:px-4 sm:min-w-[76px]" : "px-5 py-6 sm:px-8 sm:py-9 min-w-[84px] sm:min-w-[150px]")}>
            <span aria-hidden className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-lb to-transparent" />
            <div className="font-semibold tabular-nums leading-none"><Roll value={n} size={size} /></div>
            <p className={"font-mono uppercase tracking-[0.18em] text-lb " + (compact ? "mt-2 text-[10px]" : "mt-4 text-xs")}>{label}</p>
          </div>
          {!compact && i < units.length - 1 && <span aria-hidden className="hidden sm:block h-10 w-px bg-white/15" />}
        </div>
      ))}
    </div>
  );
}
