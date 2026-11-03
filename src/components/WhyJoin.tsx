"use client";
import { useState } from "react";
import { BENEFITS as ALL } from "@/data/benefits";
const OFFSET = 2;
const BENEFITS = ALL.slice(OFFSET);

const Bar = ({ w, c = "bg-white/15" }: { w: string; c?: string }) => <div className={`h-2 rounded ${c}`} style={{ width: w }} />;

function Visual({ i: j }: { i: number }) {
  const i = j + OFFSET;
  if (i === 0) return (
    <div className="rounded-xl bg-[#faf9f4] text-[#14161c] p-6 md:p-8 w-full max-w-md shadow-2xl">
      <p className="text-xs uppercase tracking-widest text-[#4a6fa5]">Activities · Entry 1</p>
      
      <p className="mt-5 text-xs text-[#8a8f9a]">Example only. AIBA can&rsquo;t promise admission anywhere.</p>
    </div>
  );
  if (i === 1) return (
    <div className="rounded-xl bg-[#faf9f4] p-6 md:p-8 w-full max-w-md shadow-2xl space-y-5">
      <div className="space-y-2"><div className="h-3 w-40 rounded bg-[#14161c]" /><Bar w="55%" c="bg-black/15" /></div>
      <div><p className="text-xs uppercase tracking-widest text-[#8a8f9a]">Experience</p><div className="mt-2 space-y-2"><Bar w="90%" c="bg-black/10" /><Bar w="75%" c="bg-black/10" /></div></div>
      <div><p className="text-xs uppercase tracking-widest text-[#4a6fa5]">Projects</p>
        <div className="mt-2 rounded-md bg-[#8cc8ff]/30 border border-[#8cc8ff] p-3 text-[13px] text-[#14161c]">Built and launched [PROJECT], used by [NUMBER] students. Led a team of 3.</div>
        <div className="mt-2 space-y-2"><Bar w="80%" c="bg-black/10" /></div></div>
      <div><p className="text-xs uppercase tracking-widest text-[#8a8f9a]">Skills</p><div className="mt-2 flex gap-2 flex-wrap">{["Prompting", "Web", "Design", "Sales"].map((s) => <span key={s} className="rounded bg-black/10 px-2 py-0.5 text-[12px] text-[#14161c]">{s}</span>)}</div></div>
    </div>
  );
  if (i === 2) return (
    <div className="w-full max-w-md space-y-5">
      {[["Prompting", "90%"], ["Building with AI", "75%"], ["Design and branding", "60%"], ["Marketing and sales", "55%"], ["Reading data", "50%"]].map(([k, w]) => (
        <div key={k}><div className="flex justify-between text-sm"><span>{k}</span></div><div className="mt-2 h-2.5 rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-[#2f6fcf] to-[#8cc8ff]" style={{ width: w }} /></div></div>
      ))}
      <p className="text-xs text-white/45">Skills covered across our lessons.</p>
    </div>
  );
  if (i === 3) return (
    <svg viewBox="0 0 400 300" className="w-full max-w-md" role="img" aria-label="Network of members connected to each other">
      {[[200,150,90,40],[200,150,310,50],[200,150,70,230],[200,150,330,240],[200,150,200,270],[90,40,310,50],[70,230,200,270],[330,240,200,270]].map(([a,b,c,d],k)=><line key={k} x1={a} y1={b} x2={c} y2={d} stroke="#2f6fcf" strokeOpacity=".5" strokeWidth="1.5"/>)}
      {[[200,150,"You",34],[90,40,"Dev",22],[310,50,"Maya",24],[70,230,"Sam",22],[330,240,"Priya",24],[200,270,"Leo",20]].map(([x,y,t,r],k)=><g key={k}><circle cx={x as number} cy={y as number} r={r as number} fill={k===0?"#8cc8ff":"#0a2a6b"} stroke="#8cc8ff" strokeOpacity=".6"/><text x={x as number} y={(y as number)+4} textAnchor="middle" fontSize={k===0?13:11} fill={k===0?"#000":"#fff"} fontWeight="600">{t as string}</text></g>)}
    </svg>
  );
  if (i === 4) return (
    <div className="w-full max-w-md">
      <div className="flex items-center gap-3">{["Idea", "First customers", "Lessons"].map((s, k) => <div key={s} className="flex-1"><div className={"h-2 rounded-full " + (k < 2 ? "bg-lb" : "bg-lb/40")} /><p className="mt-3 text-sm font-medium">{s}</p></div>)}</div>
      <div className="mt-8 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/15 p-4"><p className="text-xs text-white/50">If it works</p><p className="mt-1 font-medium">You have a head start.</p></div>
        <div className="rounded-xl border border-white/15 p-4"><p className="text-xs text-white/50">If it doesn&rsquo;t</p><p className="mt-1 font-medium">You know exactly why.</p></div>
      </div>
      <p className="mt-4 text-xs text-white/45">Low stakes: you&rsquo;re testing with classmates, not a bank loan.</p>
    </div>
  );
  return (
    <div className="w-full max-w-md">
      <div className="grid grid-cols-3 gap-3 items-end">
        {[["2nd", "h-32", "bg-white/10"], ["1st", "h-44", "bg-db"], ["3rd", "h-24", "bg-white/10"]].map(([p, h, b]) => <div key={p} className={`rounded-t-xl border border-white/15 ${h} ${b} flex items-start justify-center pt-3 text-2xl font-semibold text-lb`}>{p}</div>)}
      </div>
      <p className="mt-4 text-sm text-white/60">Three tracks: most revenue, most sales, most users.</p>
    </div>
  );
}

export default function WhyJoin() {
  const [i, setI] = useState(0);
  return (
    <div className="mt-12 grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-stretch">
      <ul role="tablist" aria-label="Reasons to join" className="divide-y divide-white/10 border-y border-white/10">
        {BENEFITS.map((b, k) => (
          <li key={b.t}>
            <button role="tab" aria-selected={i === k} onClick={() => setI(k)} onMouseEnter={() => setI(k)} className="w-full text-left py-5 group">
              <div className="flex items-center gap-4"><span className={"h-2 w-2 rounded-full transition-colors " + (i === k ? "bg-lb" : "bg-white/25")} /><span className={"text-lg md:text-xl font-semibold transition-colors " + (i === k ? "text-white" : "text-white/55 group-hover:text-white/80")}>{b.t}</span></div>
              {i === k && <p className="mt-3 pl-6 text-white/70 max-w-lg">{b.d}</p>}
            </button>
          </li>
        ))}
      </ul>
      <div className="relative rounded-xl border border-white/12 bg-white/[0.04] rotate-[0.6deg] min-h-[380px] p-6 md:p-10 flex items-center justify-center">
        <span aria-hidden className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-2 bg-[#8cc8ff]/70" /><span className="absolute left-6 top-5 eyebrow">{BENEFITS[i].tag}</span>
        <Visual i={i} />
      </div>
    </div>
  );
}
