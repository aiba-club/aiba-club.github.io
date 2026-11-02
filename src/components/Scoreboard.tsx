"use client";
import { useEffect, useState } from "react";
import Counter from "./Counter";
import SpotlightCard from "./SpotlightCard";
import { CUP } from "@/data/challenge";

function useCountdown(iso: string) {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => { const t = () => setLeft(Math.max(0, new Date(iso).getTime() - Date.now())); t(); const id = setInterval(t, 1000); return () => clearInterval(id); }, [iso]);
  return left;
}
export default function Scoreboard() {
  const left = useCountdown(CUP.deadline);
  const [track, setTrack] = useState(0);
  const t = CUP.tracks[track], lead = t.teams[0];
  const parts = left === null ? ["--", "--", "--", "--"] : [Math.floor(left / 864e5), Math.floor(left / 36e5) % 24, Math.floor(left / 6e4) % 60, Math.floor(left / 1e3) % 60].map((n) => String(n).padStart(2, "0"));
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div><p className="text-sm text-white/55 mb-3">Time left to score</p>
          <div className="grid grid-cols-4 gap-px bg-line rounded-2xl overflow-hidden w-full max-w-md">{["Days", "Hours", "Min", "Sec"].map((u, i) => <div key={u} className="bg-[#050b1a] py-5 text-center"><div className="text-3xl md:text-4xl font-semibold tabular-nums">{parts[i]}</div><div className="text-xs text-mute mt-1 uppercase tracking-widest">{u}</div></div>)}</div></div>
        <p className="text-sm text-white/55">{CUP.updated}</p>
      </div>
      <div role="tablist" className="mt-12 flex gap-2 flex-wrap">{CUP.tracks.map((x, i) => <button role="tab" aria-selected={i === track} key={x.key} onClick={() => setTrack(i)} className={"btn " + (i === track ? "btn-solid" : "btn-line")}>{x.label}</button>)}</div>
      <div className="mt-8 grid lg:grid-cols-[1fr_1.5fr] gap-6">
        <SpotlightCard spotlightColor="rgba(140,200,255,0.25)" className="p-8 md:p-10">
          <div className="eyebrow">Leading · {t.label}</div>
          <div className="mt-4 text-4xl font-semibold">{lead.name}</div>
          <p className="text-white/60 mt-1">{lead.members}</p>
          <div className="mt-8 text-7xl font-semibold tracking-tight"><Counter key={t.key} value={lead.score} prefix={t.unit} fontSize={72} textColor="#ffffff" /></div>
          <p className="mt-4 text-white/65">Building <span className="text-white">{lead.built}</span></p>
        </SpotlightCard>
        <ol className="divide-y divide-line border-y border-line">
          {t.teams.map((x, i) => (
            <li key={x.name} className="flex items-center gap-4 py-5">
              <span className="w-8 text-mute tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="w-6 text-sm" aria-label={x.delta > 0 ? "moved up" : x.delta < 0 ? "moved down" : "no change"}>{x.delta > 0 ? <span className="text-lb">▲{x.delta}</span> : x.delta < 0 ? <span className="text-white/45">▼{-x.delta}</span> : <span className="text-white/25">–</span>}</span>
              <span className="flex-1 min-w-0"><span className="block text-xl truncate">{x.name}</span><span className="block text-sm text-white/50 truncate">{x.built} · {x.members}</span></span>
              <div className="hidden sm:block w-32 h-1 bg-white/10 rounded"><div className="h-full bg-lb rounded" style={{ width: `${(x.score / lead.score) * 100}%` }} /></div>
              <span className="text-2xl font-semibold tabular-nums w-24 text-right"><Counter key={t.key + x.name} value={x.score} prefix={t.unit} fontSize={26} textColor="#ffffff" /></span>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
