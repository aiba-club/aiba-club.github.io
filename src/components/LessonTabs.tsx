"use client";
import { useState, useRef } from "react";
import type { Lesson } from "@/data/lessons";

const TABS = ["Video", "Presentation", "Tutorial", "Resources"] as const;
export default function LessonTabs({ lesson }: { lesson: Lesson }) {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Video");
  const [done, setDone] = useState<Record<number, boolean>>({});
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const key = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const n = (i + (e.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length;
    setTab(TABS[n]); refs.current[n]?.focus();
  };
  const finished = Object.values(done).filter(Boolean).length;
  return (
    <div className="mt-10">
      <div role="tablist" aria-label="Lesson sections" className="flex gap-1 border-b border-line overflow-x-auto">
        {TABS.map((t, i) => (
          <button key={t} ref={(el) => { refs.current[i] = el; }} role="tab" id={`tab-${t}`} aria-selected={tab === t} aria-controls={`panel-${t}`} tabIndex={tab === t ? 0 : -1} onKeyDown={(e) => key(e, i)} onClick={() => setTab(t)}
            className={"px-5 py-3 whitespace-nowrap border-b-2 -mb-px transition-colors " + (tab === t ? "border-lb text-white font-medium" : "border-transparent text-white/55 hover:text-white")}>{t}</button>
        ))}
      </div>
      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="pt-8">
        {tab === "Video" && <div className="aspect-video rounded-xl overflow-hidden border border-line max-w-4xl"><iframe src={lesson.video} className="w-full h-full" allowFullScreen title={`${lesson.title} video`} /></div>}
        {tab === "Presentation" && <div><div className="aspect-video rounded-xl overflow-hidden border border-line max-w-4xl"><iframe src={lesson.slides} className="w-full h-full" allowFullScreen title={`${lesson.title} slides`} /></div><p className="mt-3 text-sm text-white/50">Slides not loading? Open them in a new tab from the Resources tab.</p></div>}
        {tab === "Tutorial" && (
          <div className="max-w-2xl">
            <p className="text-lg text-white/80">{lesson.tutorial.intro}</p>
            <p className="mt-2 text-sm text-white/50">{finished} of {lesson.tutorial.steps.length} steps done</p>
            <div className="mt-3 h-1 bg-white/10 rounded"><div className="h-full bg-lb rounded transition-all" style={{ width: `${(finished / lesson.tutorial.steps.length) * 100}%` }} /></div>
            <ol className="mt-8 space-y-4">
              {lesson.tutorial.steps.map((s, i) => (
                <li key={s.title} className={"flex gap-4 rounded-xl border p-5 transition-colors " + (done[i] ? "border-lb/50 bg-lb/5" : "border-line")}>
                  <input type="checkbox" id={`step-${i}`} checked={!!done[i]} onChange={() => setDone((d) => ({ ...d, [i]: !d[i] }))} className="mt-1.5 h-5 w-5 accent-[#8cc8ff]" />
                  <label htmlFor={`step-${i}`} className="cursor-pointer"><span className="block text-sm text-lb">Step {i + 1}</span><span className="block text-lg font-medium">{s.title}</span><span className="block mt-1 text-white/65">{s.body}</span></label>
                </li>
              ))}
            </ol>
          </div>
        )}
        {tab === "Resources" && (
          <ul className="max-w-2xl divide-y divide-line border-y border-line">
            <li><a href={lesson.slides} target="_blank" rel="noreferrer" className="flex items-center justify-between py-4 hover:text-lb"><span>Slides (open in new tab)</span><span className="text-sm text-white/45">Presentation ↗</span></a></li>
            {lesson.resources.map((r) => <li key={r.label}><a href={r.href} target="_blank" rel="noreferrer" className="flex items-center justify-between py-4 hover:text-lb"><span>{r.label}</span><span className="text-sm text-white/45">{r.kind} ↗</span></a></li>)}
          </ul>
        )}
      </div>
    </div>
  );
}
