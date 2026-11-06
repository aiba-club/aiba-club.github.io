"use client";
import { useRef, useState } from "react";
import type { Lesson } from "@/data/lessons";

const TABS = ["Presentation", "Video", "Tutorial", "Resources"] as const;
type Tab = (typeof TABS)[number];

function Soon({ what }: { what: string }) {
  return <div className="grid aspect-video max-w-4xl place-items-center rounded-[28px] border border-white/12 bg-white/[0.03] p-8 text-center"><div><p className="text-2xl font-semibold">{what} coming soon.</p><p className="mt-2 text-white/60">We&rsquo;ll post it here after the lesson.</p></div></div>;
}

export default function LessonTabs({ lesson }: { lesson: Lesson }) {
  const [tab, setTab] = useState<Tab>("Presentation");
  const [done, setDone] = useState<Record<number, boolean>>({});
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const key = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const n = (i + (e.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length;
    setTab(TABS[n]); refs.current[n]?.focus();
  };
  const steps = lesson.tutorial?.steps ?? [];
  const finished = Object.values(done).filter(Boolean).length;
  const resources = lesson.resources ?? [];
  return (
    <div className="mt-10">
      <div role="tablist" aria-label="Lesson sections" className="no-scrollbar flex gap-1 overflow-x-auto border-b border-line">
        {TABS.map((t, i) => (
          <button key={t} ref={(el) => { refs.current[i] = el; }} role="tab" id={`tab-${t}`} aria-selected={tab === t} aria-controls={`panel-${t}`} tabIndex={tab === t ? 0 : -1} onKeyDown={(e) => key(e, i)} onClick={() => setTab(t)}
            className={"-mb-px whitespace-nowrap border-b-2 px-4 py-3 transition-colors sm:px-5 " + (tab === t ? "border-lb font-medium text-white" : "border-transparent text-white/55 hover:text-white")}>{t}</button>
        ))}
      </div>
      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="pt-8">
        {tab === "Presentation" && (lesson.slides
          ? <div><div className="aspect-video max-w-4xl overflow-hidden rounded-[28px] border border-line"><iframe src={lesson.slides} className="h-full w-full" allowFullScreen title={`${lesson.title} slides`} /></div><p className="mt-3 text-sm text-white/50">Slides not loading? <a href={lesson.slides.replace(/\/embed.*$/, "/edit?usp=sharing").replace(/\/preview$/, "/view")} target="_blank" rel="noreferrer" className="pill-link group/pl !py-0.5 !px-2.5 !text-xs">Open in a new tab</a></p></div>
          : <Soon what="Presentation" />)}
        {tab === "Video" && (lesson.video
          ? <div className="aspect-video max-w-4xl overflow-hidden rounded-[28px] border border-line"><iframe src={lesson.video} className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen title={`${lesson.title} video`} /></div>
          : <Soon what="Video" />)}
        {tab === "Tutorial" && (steps.length
          ? (
            <div className="max-w-2xl">
              {lesson.tutorial?.intro && <p className="text-lg text-white/80">{lesson.tutorial.intro}</p>}
              <p className="mt-2 text-sm text-white/50">{finished} of {steps.length} steps done</p>
              <div className="mt-3 h-1 rounded bg-white/10"><div className="h-full rounded bg-lb transition-all" style={{ width: `${(finished / steps.length) * 100}%` }} /></div>
              <ol className="mt-8 space-y-4">
                {steps.map((s, i) => (
                  <li key={s.title} className={"flex gap-4 rounded-[24px] border p-5 transition-colors " + (done[i] ? "border-lb/50 bg-lb/5" : "border-line")}>
                    <input type="checkbox" id={`step-${i}`} checked={!!done[i]} onChange={() => setDone((d) => ({ ...d, [i]: !d[i] }))} className="mt-1.5 h-5 w-5 accent-[#8cc8ff]" />
                    <label htmlFor={`step-${i}`} className="cursor-pointer"><span className="block text-sm text-lb">Step {i + 1}</span><span className="block text-lg font-medium">{s.title}</span><span className="mt-1 block text-white/65">{s.body}</span></label>
                  </li>
                ))}
              </ol>
            </div>
          )
          : <Soon what="Tutorial" />)}
        {tab === "Resources" && (resources.length
          ? (
            <ul className="max-w-2xl divide-y divide-line border-y border-line">
              {resources.map((r) => <li key={r.label}><a href={r.href} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-4 py-4 hover:text-lb"><span>{r.label}</span><span className="shrink-0 text-sm text-white/45">{r.kind} ↗</span></a></li>)}
            </ul>
          )
          : <Soon what="Resources" />)}
      </div>
    </div>
  );
}
