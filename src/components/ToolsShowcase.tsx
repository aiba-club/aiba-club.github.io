"use client";
import { useState } from "react";
import Link from "next/link";
import GridMotion from "./GridMotion";
import BrandIcon from "./BrandIcon";
import { TOOL_GROUPS } from "@/data/tools";
import { LESSONS } from "@/data/lessons";

const ALL = TOOL_GROUPS.flatMap((g) => g.tools.map((t) => ({ ...t, group: g.group })));
export default function ToolsShowcase() {
  const [group, setGroup] = useState("All");
  const shown = group === "All" ? ALL : ALL.filter((t) => t.group === group);
  const tiles = Array.from({ length: 28 }, (_, i) => { const t = ALL[i % ALL.length]; return <div key={i} className="flex h-full w-full items-center justify-center gap-3 text-2xl font-semibold text-white"><BrandIcon slug={t.icon} label={t.name} size={26} />{t.name}</div>; });
  return (
    <>
      <div className="relative h-[42vh] min-h-[320px] overflow-hidden border-b border-line"><GridMotion items={tiles} rows={4} tileColor="#0a2a6b" textColor="#ffffff" /></div>
      <section className="wrap py-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><h2 className="text-2xl md:text-4xl font-semibold tracking-tight">Pick a tool.</h2><p className="mt-2 text-white/65">{ALL.length} tools in {TOOL_GROUPS.length} groups. Each one shows the lessons that use it.</p></div>
          <div role="tablist" className="flex flex-wrap gap-2">{["All", ...TOOL_GROUPS.map((g) => g.group)].map((g) => <button key={g} role="tab" aria-selected={g === group} onClick={() => setGroup(g)} className={"btn !py-2 !px-4 text-sm " + (g === group ? "btn-solid" : "btn-line")}>{g}</button>)}</div>
        </div>
        <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {shown.map((t) => {
            const used = LESSONS.filter((l) => l.tools.some((x) => x.toLowerCase().includes(t.name.toLowerCase())));
            return (
              <li key={t.name} className="card-glass !rounded-2xl p-6 flex flex-col hover:border-lb/50 transition-colors">
                <div className="flex items-center gap-4"><span className="grid h-12 w-12 place-items-center rounded-xl bg-white/10"><BrandIcon slug={t.icon} label={t.name} size={26} /></span><div><p className="text-lg font-semibold">{t.name}</p><p className="text-xs text-lb">{t.group}</p></div></div>
                <p className="mt-4 text-white/75 flex-1">{t.use}</p>
                <p className="mt-4 pt-4 border-t border-line text-sm text-white/55">{used.length ? <>Used in {used.map((l, i) => <span key={l.slug}>{i > 0 && ", "}<Link href={`/lessons/${l.slug}`} className="text-lb hover:underline">Lesson {l.n}</Link></span>)}</> : "Used in team projects"}</p>
              </li>
            );
          })}
        </ul>
      </section>
      <section className="border-t border-line"><div className="wrap py-14 flex flex-wrap items-center justify-between gap-6"><div><h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Not sure where to start?</h2><p className="mt-2 text-white/65">Start with ChatGPT or Claude. Every other tool builds on knowing how to ask well.</p></div><Link href="/lessons/intro-to-ai-tools" className="btn btn-solid">Open Lesson 01 →</Link></div></section>
    </>
  );
}
