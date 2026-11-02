"use client";
import { useState } from "react";
import SpotlightCard from "./SpotlightCard";

const BEFORE = [["Member, [Club name]", "[Years]"], ["Volunteer, [Organization]", "[Years]"]];
const AFTER = [
  ["Project Lead, AIBA", "Led a team of 3 to build [PROJECT NAME], an AI app now used by [NUMBER] classmates."],
  ["AIBA Cup, [PLACE] place", "Competed against [NUMBER] teams on revenue, sales and users."],
  ["AI tools", "Prompting, building with AI, design, outreach and basic data analysis."],
];
const CALLOUTS = [["A number", "Specifics get remembered. Say how many people used it."], ["A role", "Leading a team shows more than belonging to one."], ["A link", "Every project has a page you can put on an application."]];

export default function ResumeCompare() {
  const [after, setAfter] = useState(true);
  return (
    <div className="mt-12 grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-start">
      <div>
        <div role="tablist" aria-label="Compare" className="inline-flex rounded-full border border-white/15 p-1 mb-6">
          {[[false, "Without AIBA"], [true, "With AIBA"]].map(([v, l]) => <button key={String(l)} role="tab" aria-selected={after === v} onClick={() => setAfter(v as boolean)} className={"rounded-full px-5 py-2 text-sm font-medium transition-colors " + (after === v ? "bg-white text-black" : "text-white/65 hover:text-white")}>{l as string}</button>)}
        </div>
        <SpotlightCard spotlightColor="rgba(140,200,255,0.18)" className="!p-0">
          <div className="reinvert rounded-2xl bg-[#faf9f4] text-[#14161c] p-7 md:p-10 min-h-[420px]">
            <div className="flex items-end justify-between border-b border-black/10 pb-4"><div><p className="text-xl font-semibold">[Your name]</p><p className="text-sm text-[#5a5f6a]">[Grade] · [School]</p></div><span className="text-xs text-[#8a8f9a]">Activities</span></div>
            <ul className="mt-6 space-y-5">
              {BEFORE.map(([t, y]) => <li key={t} className="flex justify-between gap-4"><div><p className="font-medium">{t}</p><div className="mt-2 h-2 w-56 max-w-full rounded bg-black/10" /></div><span className="text-sm text-[#8a8f9a]">{y}</span></li>)}
              {after && AFTER.map(([t, d], i) => (
                <li key={t} className="rounded-lg border border-[#8cc8ff] bg-[#8cc8ff]/20 p-4" style={{ animation: `fadeUp .45s ${i * 0.12}s both` }}>
                  <p className="font-semibold">{t}</p><p className="mt-1 text-[14px] text-[#2a2f3a]">{d}</p>
                </li>
              ))}
            </ul>
            {!after && <p className="mt-8 text-sm text-[#8a8f9a]">Names of clubs, with nothing to say about what you did.</p>}
          </div>
        </SpotlightCard>
      </div>
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-white/50">What readers notice</p>
        <ul className="mt-5 border-t border-white/15">{CALLOUTS.map(([t, d], k) => <li key={t} className="flex gap-5 border-b border-white/15 py-6"><span className="font-mono text-lb">0{k + 1}</span><span><span className="block text-xl font-bold">{t}</span><span className="mt-1 block text-white/65">{d}</span></span></li>)}</ul>
        <p className="mt-6 text-xs text-white/40 max-w-sm">Examples only. AIBA can&rsquo;t promise admission anywhere, but it gives you true, specific things to write.</p>
      </div>
    </div>
  );
}
