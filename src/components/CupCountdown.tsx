"use client";
import { useEffect, useState } from "react";
import Counter from "./Counter";
import { CUP } from "@/data/challenge";

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
  const units: [string, number][] = compact ? [["days", v.d], ["hours", v.h], ["min", v.m]] : [["days", v.d], ["hours", v.h], ["minutes", v.m], ["seconds", v.s]];
  const size = compact ? 40 : 76;
  return (
    <div role="timer" aria-label={`Time until the AIBA Cup starts: ${v.d} days, ${v.h} hours, ${v.m} minutes`} className={"flex items-stretch justify-center " + (compact ? "gap-2" : "gap-3 sm:gap-5")}>
      {units.map(([label, n], i) => (
        <div key={label} className="flex items-center gap-2 sm:gap-5">
          <div className={"relative overflow-hidden rounded-[28px] border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,.10),rgba(255,255,255,.02))] text-center shadow-[0_20px_50px_-20px_rgba(140,200,255,.45)] " + (compact ? "px-4 py-4 min-w-[76px]" : "px-5 py-6 sm:px-8 sm:py-9 min-w-[84px] sm:min-w-[150px]")}>
            <span aria-hidden className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-lb to-transparent" />
            <div className="font-semibold tabular-nums leading-none"><Counter value={n} minDigits={2} fontSize={size} textColor="#ffffff" /></div>
            <p className={"font-mono uppercase tracking-[0.18em] text-lb " + (compact ? "mt-2 text-[10px]" : "mt-4 text-xs")}>{label}</p>
          </div>
          {!compact && i < units.length - 1 && <span aria-hidden className="hidden sm:block h-10 w-px bg-white/15" />}
        </div>
      ))}
    </div>
  );
}
