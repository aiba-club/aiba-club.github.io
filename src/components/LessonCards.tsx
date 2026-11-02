"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LESSONS } from "@/data/lessons";


export default function LessonCards() {
  const [sel, setSel] = useState<number | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const l = sel === null ? null : LESSONS[sel];

  useEffect(() => {
    const d = dlg.current; if (!d) return;
    if (sel !== null && !d.open) d.showModal();
    if (sel === null && d.open) d.close();
  }, [sel]);

  return (
    <>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {LESSONS.map((x, i) => (
          <li key={x.slug}>
            <button onClick={() => setSel(i)} aria-haspopup="dialog" className="group flex h-full w-full flex-col overflow-hidden rounded-[32px] border border-white/12 bg-white/[0.03] text-left transition-all duration-200 hover:-translate-y-1 hover:border-lb/60">
              <div className="flex flex-1 flex-col p-7">
                <p className="font-mono text-xs text-lb">Lesson {x.n}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">{x.title}</h3>
                <p className="mt-2 text-sm text-white/65">{x.summary}</p>
                <div className="mt-5 border-t border-white/10 pt-4"><p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">Project</p><p className="mt-1 text-sm font-medium">{x.makes}</p></div>
                <span className="mt-auto pt-5 text-sm font-semibold text-lb group-hover:text-white">Open +</span>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <dialog ref={dlg} onClose={() => setSel(null)} onClick={(e) => { if (e.target === dlg.current) setSel(null); }} className="m-auto w-[min(92vw,560px)] max-h-[88vh] overflow-y-auto rounded-[32px] border border-white/15 bg-[#0a1226] p-0 text-white backdrop:bg-black/60 backdrop:backdrop-blur-sm">
        {l && (
          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div><p className="font-mono text-xs text-lb">Lesson {l.n} · {l.duration}</p><h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">{l.title}</h2></div>
              <button onClick={() => setSel(null)} aria-label="Close" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/20 text-lg hover:border-lb hover:text-lb">×</button>
            </div>
            <p className="mt-3 text-white/70">{l.summary}</p>
            <ul className="mt-5 space-y-2">{l.bullets.map((b) => <li key={b} className="flex gap-3 text-[15px] text-white/85"><span className="mt-2.5 h-px w-4 shrink-0 bg-lb" />{b}</li>)}</ul>
            <div className="mt-6 rounded-2xl border border-white/12 bg-white/[0.03] p-4"><p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">You&rsquo;ll make</p><p className="mt-1 font-medium">{l.makes}</p></div>
            <p className="mt-5 flex flex-wrap gap-2">{l.tools.map((t) => <span key={t} className="rounded-full border border-white/15 px-3 py-0.5 text-xs text-white/65">{t}</span>)}</p>
            <div className="mt-7 flex flex-wrap items-center gap-4"><Link href={`/lessons/${l.slug}`} className="btn btn-solid">Open lesson →</Link><button onClick={() => setSel(null)} className="text-sm text-white/60 underline underline-offset-4 hover:text-white">Close</button></div>
          </div>
        )}
      </dialog>
    </>
  );
}
