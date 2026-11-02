"use client";
import { useState } from "react";
import Link from "next/link";
import Counter from "./Counter";
import { LESSONS } from "@/data/lessons";
import { PROJECTS } from "@/data/projects";
import { CUP } from "@/data/challenge";

const TABS = ["Lessons", "Projects", "Cup", "Profile"] as const;
const dot = { done: "bg-lb", next: "bg-white", upcoming: "bg-white/25" };

function LessonsTab() {
  const [i, setI] = useState(Math.max(0, LESSONS.findIndex((l) => l.status === "next")));
  const l = LESSONS[i];
  return (
    <div className="grid md:grid-cols-[270px_1fr] h-full">
      <ul className="border-b md:border-b-0 md:border-r border-white/10 overflow-y-auto max-h-[190px] md:max-h-none">
        {LESSONS.map((x, k) => <li key={x.slug}><button onClick={() => setI(k)} className={"flex w-full items-center gap-3 px-5 py-3 text-left text-sm transition-colors " + (i === k ? "bg-white/[0.07]" : "hover:bg-white/[0.04]")}><span className={"h-2 w-2 rounded-full " + dot[x.status]} /><span className="font-mono text-xs text-white/45">{x.n}</span><span className="truncate">{x.title}</span></button></li>)}
      </ul>
      <div className="p-6 md:p-8">
        <p className="font-mono text-xs uppercase tracking-widest text-lb">Lesson {l.n} · {l.duration}</p>
        <h3 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight">{l.title}</h3>
        <p className="mt-3 text-white/70 max-w-md">{l.summary}</p>
        <p className="mt-5 text-sm text-white/50">You&rsquo;ll make</p><p className="font-medium">{l.makes}</p>
        <p className="mt-4 flex flex-wrap gap-2">{l.tools.map((t) => <span key={t} className="border border-white/15 px-2.5 py-0.5 text-xs text-white/70">{t}</span>)}</p>
        <Link href={`/lessons/${l.slug}`} className="mt-6 inline-block bg-white px-5 py-2.5 text-sm font-semibold text-[#0b1730] hover:bg-lb transition-colors">Open lesson →</Link>
      </div>
    </div>
  );
}
function ProjectsTab() {
  return (
    <ul className="grid sm:grid-cols-2 gap-px bg-white/10 h-full overflow-y-auto">
      {PROJECTS.map((p) => <li key={p.slug} className="bg-[#0a1226]"><Link href={`/projects/${p.slug}`} className="flex gap-4 p-5 hover:bg-white/[0.04] transition-colors"><img src={p.image} alt="" className="h-16 w-24 object-cover shrink-0" /><span><span className="block font-semibold">{p.title}</span><span className="block text-xs text-white/50">{p.kind} · {p.status}</span><span className="mt-1 block text-sm text-white/65">{p.description}</span></span></Link></li>)}
    </ul>
  );
}
function CupTab() {
  const t = CUP.tracks[0];
  return (
    <div className="p-6 md:p-8 h-full">
      <div className="flex items-baseline justify-between"><p className="font-mono text-xs uppercase tracking-widest text-lb">{t.label} · standings</p><span className="text-xs text-white/45">{CUP.updated}</span></div>
      <ol className="mt-5 divide-y divide-white/10">{t.teams.map((x, k) => <li key={x.name} className="flex items-center gap-4 py-3.5"><span className="w-6 font-mono text-sm text-white/45">0{k + 1}</span><span className="flex-1"><span className="block font-medium">{x.name}</span><span className="block text-xs text-white/45">{x.built}</span></span><span className="hidden sm:block h-1 w-32 bg-white/10"><span className="block h-full bg-lb" style={{ width: `${(x.score / t.teams[0].score) * 100}%` }} /></span><span className="w-24 text-right text-xl font-bold tabular-nums"><Counter value={x.score} prefix="$" fontSize={20} textColor="#ffffff" /></span></li>)}</ol>
      <p className="mt-4 text-xs text-white/40">Example standings.</p>
    </div>
  );
}
function ProfileTab() {
  return (
    <div className="grid md:grid-cols-[240px_1fr] h-full">
      <div className="p-6 md:border-r border-white/10"><div className="h-14 w-14 rounded-full bg-gradient-to-br from-lb to-db" /><p className="mt-3 font-semibold">[Your name]</p><p className="text-sm text-lb">Project Lead · [Grade]</p><div className="mt-5 grid grid-cols-3 md:grid-cols-1 gap-3">{[["Lessons", 7], ["Projects", 1], ["Team size", 3]].map(([k, v]) => <div key={k as string}><div className="text-2xl font-bold"><Counter value={v as number} fontSize={24} textColor="#ffffff" /></div><p className="text-xs text-white/45">{k}</p></div>)}</div></div>
      <div className="p-6 md:p-8 grid sm:grid-cols-2 gap-6"><div><p className="font-mono text-xs uppercase tracking-widest text-white/45">Project</p><div className="mt-3 border border-lb/40 bg-lb/[0.07] p-4"><p className="font-semibold">[Project name]</p><p className="mt-1 text-sm text-white/65">An AI app used by [NUMBER] classmates. Built with a team of 3.</p></div></div><div><p className="font-mono text-xs uppercase tracking-widest text-white/45">Skills</p><div className="mt-3 space-y-3">{[["Prompting", "92%"], ["Building", "78%"], ["Design", "64%"], ["Sales", "58%"]].map(([k, w]) => <div key={k}><p className="text-sm">{k}</p><div className="mt-1 h-1.5 bg-white/10"><div className="h-full bg-lb" style={{ width: w }} /></div></div>)}</div></div></div>
    </div>
  );
}

export default function ClubWindow() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Lessons");
  return (
    <div className="mx-auto w-full max-w-5xl border border-white/15 bg-[#0a1226] shadow-[0_30px_80px_rgba(0,0,0,.5)]">
      <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.04] px-4 py-2.5">
        <span className="flex gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" /></span>
        <div role="tablist" aria-label="Inside the club" className="mx-auto flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{TABS.map((t) => <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={"px-3 sm:px-4 py-1.5 text-sm whitespace-nowrap transition-colors " + (tab === t ? "bg-white text-[#0b1730] font-semibold" : "text-white/60 hover:text-white")}>{t}</button>)}</div>
        <span className="hidden sm:block w-14" aria-hidden />
      </div>
      <div className="h-[520px] md:h-[400px] text-left">{tab === "Lessons" ? <LessonsTab /> : tab === "Projects" ? <ProjectsTab /> : tab === "Cup" ? <CupTab /> : <ProfileTab />}</div>
    </div>
  );
}
