"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import LessonArt from "./LessonArt";
import { LESSONS } from "@/data/lessons";

const STATUS = { done: ["Taught", "border-lb text-lb"], next: ["This week", "border-white text-white"], upcoming: ["Coming up", "border-white/25 text-white/55"] } as const;

export default function LessonsTrack() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i)); }), { rootMargin: "-35% 0px -55% 0px" });
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);
  const go = (i: number) => refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <div className="grid lg:grid-cols-[230px_1fr] gap-10 lg:gap-16">
      {/* track */}
      <aside className="lg:sticky lg:top-28 self-start hidden lg:block">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-white/45">The track</p>
        <ol className="mt-5 relative">
          <span aria-hidden className="absolute left-[11px] top-3 bottom-3 w-px bg-white/15" />
          <span aria-hidden className="absolute left-[11px] top-3 w-px bg-lb transition-all duration-500" style={{ height: `calc(${(active / (LESSONS.length - 1)) * 100}% - ${active === 0 ? 0 : 6}px)` }} />
          {LESSONS.map((l, i) => (
            <li key={l.slug}><button onClick={() => go(i)} aria-current={active === i} className="relative flex w-full items-center gap-4 py-2.5 text-left">
              <span className={"relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[10px] font-mono transition-colors " + (i <= active ? "border-lb bg-[#050b1a] text-lb" : "border-white/25 bg-[#050b1a] text-white/40")}>{l.n}</span>
              <span className={"text-sm transition-colors " + (active === i ? "text-white font-medium" : "text-white/50 hover:text-white/80")}>{l.title}</span>
            </button></li>
          ))}
        </ol>
      </aside>

      {/* lessons */}
      <ol className="divide-y divide-white/12 border-y border-white/12">
        {LESSONS.map((l, i) => (
          <li key={l.slug} ref={(el) => { refs.current[i] = el; }} data-i={i} id={`lesson-${l.n}`} className="scroll-mt-28 py-12 md:py-16 grid gap-8 md:grid-cols-[1fr_190px] items-start">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-sm text-lb">Lesson {l.n}</span>
                <span className={"border px-2.5 py-0.5 text-xs " + STATUS[l.status][1]}>{STATUS[l.status][0]}</span>
                <span className="text-xs text-white/40">{l.duration}</span>
              </div>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight leading-[1.08]">{l.title}</h2>
              <p className="mt-3 max-w-xl text-white/70">{l.summary}</p>
              <ul className="mt-6 space-y-2.5">{l.bullets.map((b) => <li key={b} className="flex gap-3 text-[15px] text-white/85"><span className="mt-2 h-px w-4 shrink-0 bg-lb" />{b}</li>)}</ul>
              <div className="mt-7 border border-white/12 bg-white/[0.03] p-4 max-w-xl"><p className="font-mono text-xs uppercase tracking-[0.14em] text-white/45">You&rsquo;ll make</p><p className="mt-1 font-medium">{l.makes}</p></div>
              <p className="mt-5 flex flex-wrap gap-2">{l.tools.map((t) => <span key={t} className="border border-white/15 px-2.5 py-0.5 text-xs text-white/65">{t}</span>)}</p>
              <div className="mt-7 flex flex-wrap items-center gap-5"><Link href={`/lessons/${l.slug}`} className="btn btn-solid">Open lesson →</Link><span className="text-sm text-white/45">Slides · video · tutorial · resources</span></div>
            </div>
            <div className="hidden md:block aspect-square border border-white/12 bg-[#0a1226] p-6"><LessonArt n={i + 1} /></div>
          </li>
        ))}
      </ol>
    </div>
  );
}
