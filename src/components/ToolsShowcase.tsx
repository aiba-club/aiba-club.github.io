"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import GridMotion from "./GridMotion";
import BrandIcon from "./BrandIcon";
import { TOOL_GROUPS, costOf } from "@/data/tools";
import { LESSONS } from "@/data/lessons";

const ALL = TOOL_GROUPS.flatMap((g) => g.tools.map((t) => ({ ...t, group: g.group })));
const SUB = {
  yes: ["Yes", "Our team needs a paid plan", "border-amber-300/70 text-amber-200"],
  optional: ["Not required", "Paid plans add more", "border-white/30 text-white/80"],
  no: ["No", "Free to use", "border-lb text-lb"],
} as const;

export default function ToolsShowcase() {
  const [group, setGroup] = useState("All");
  const [sel, setSel] = useState<string | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const shown = group === "All" ? ALL : ALL.filter((t) => t.group === group);
  const tool = ALL.find((t) => t.name === sel) ?? null;
  const cost = tool ? costOf(tool.name) : null;
  const lessons = tool ? LESSONS.filter((l) => l.tools.some((x) => x.toLowerCase().includes(tool.name.toLowerCase()))) : [];

  useEffect(() => {
    const d = dlg.current; if (!d) return;
    if (sel && !d.open) d.showModal();
    if (!sel && d.open) d.close();
  }, [sel]);

  const tiles = Array.from({ length: 28 }, (_, i) => { const t = ALL[i % ALL.length]; return <div key={i} className="flex h-full w-full items-center justify-center gap-3 text-2xl font-semibold text-white"><BrandIcon slug={t.icon} label={t.name} size={26} />{t.name}</div>; });

  return (
    <>
      <div className="relative h-[42vh] min-h-[320px] overflow-hidden border-b border-line"><GridMotion items={tiles} rows={4} tileColor="#0a2a6b" textColor="#ffffff" /></div>
      <section className="wrap py-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><h2 className="text-2xl md:text-4xl font-semibold tracking-tight">Pick a tool.</h2><p className="mt-2 text-white/65">{ALL.length} tools in {TOOL_GROUPS.length} groups. Tap one to see what we use it for and what it costs.</p></div>
          <div role="tablist" className="flex flex-wrap gap-2">{["All", ...TOOL_GROUPS.map((g) => g.group)].map((g) => <button key={g} role="tab" aria-selected={g === group} onClick={() => setGroup(g)} className={"btn !py-2 !px-4 text-sm " + (g === group ? "btn-solid" : "btn-line")}>{g}</button>)}</div>
        </div>
        <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {shown.map((t) => {
            const c = costOf(t.name);
            return (
              <li key={t.name}>
                <button onClick={() => setSel(t.name)} aria-haspopup="dialog" className="group flex h-full w-full flex-col rounded-[28px] border border-white/12 bg-white/[0.03] p-6 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-lb/60">
                  <div className="flex items-center gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10"><BrandIcon slug={t.icon} label={t.name} size={26} /></span>
                    <div className="min-w-0 flex-1"><p className="text-lg font-semibold">{t.name}</p><p className="text-xs text-lb">{t.group}</p></div>
                    {c.sub === "yes" && <span className="shrink-0 rounded-full border border-amber-300/70 px-2.5 py-0.5 text-[11px] text-amber-200">Paid plan</span>}
                  </div>
                  <p className="mt-4 flex-1 text-white/75">{t.use}</p>
                  <span className="mt-5 border-t border-line pt-4 text-sm font-semibold text-lb group-hover:text-white">Cost and details +</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>
      <section className="border-t border-line"><div className="wrap py-14 flex flex-wrap items-center justify-between gap-6"><div><h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Not sure where to start?</h2><p className="mt-2 text-white/65">Start with ChatGPT or Claude. Every other tool builds on knowing how to ask well.</p></div><Link href="/lessons/intro-to-ai-tools" className="btn btn-solid">Open Lesson 01 →</Link></div></section>

      <dialog ref={dlg} onClose={() => setSel(null)} onClick={(e) => { if (e.target === dlg.current) setSel(null); }} className="m-auto w-[min(92vw,420px)] max-h-[88vh] overflow-y-auto rounded-[28px] border border-white/15 bg-[#0a1226] p-0 text-white backdrop:bg-black/60 backdrop:backdrop-blur-sm">
        {tool && cost && (
          <div className="p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10"><BrandIcon slug={tool.icon} label={tool.name} size={26} /></span><div><p className="text-xl font-semibold">{tool.name}</p><p className="text-xs text-lb">{tool.group}</p></div></div>
              <button onClick={() => setSel(null)} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-lg hover:border-lb hover:text-lb">×</button>
            </div>
            <dl className="mt-5 space-y-4 text-[15px]">
              <div><dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">What we use it for</dt><dd className="mt-1 text-white/85">{tool.use}</dd></div>
              <div><dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">Subscription needed?</dt><dd className="mt-1.5 flex items-center gap-3"><span className={"rounded-full border px-3 py-0.5 text-sm font-medium " + SUB[cost.sub][2]}>{SUB[cost.sub][0]}</span><span className="text-white/60 text-sm">{SUB[cost.sub][1]}</span></dd></div>
              <div><dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">Cost</dt><dd className="mt-1 font-medium">{cost.price}</dd><dd className="mt-1 text-sm text-white/60">{cost.note}</dd></div>
              {lessons.length > 0 && <div><dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">Used in</dt><dd className="mt-1 flex flex-wrap gap-2">{lessons.map((l) => <Link key={l.slug} href={`/lessons/${l.slug}`} className="rounded-full border border-white/20 px-3 py-0.5 text-sm text-lb hover:border-lb">Lesson {l.n}</Link>)}</dd></div>}
            </dl>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
              {tool.url ? <a href={tool.url} target="_blank" rel="noreferrer" className="text-sm font-semibold text-lb underline decoration-2 underline-offset-4 hover:text-white">Official pricing and details ↗</a> : <span className="text-xs text-white/40">Prices change. Check their site before paying.</span>}
              <button onClick={() => setSel(null)} className="text-sm text-white/60 underline underline-offset-4 hover:text-white">Close</button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
