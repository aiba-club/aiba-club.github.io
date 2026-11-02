"use client";
import { useEffect, useRef, useState } from "react";

const STEPS = [
  { k: "Learn", t: "Every Wednesday starts with one tool.", d: "A 20-minute lesson on a single AI tool, then a live demo. You see how it works and where it breaks, and you try it straight away.", tag: "Lessons" },
  { k: "Build", t: "Then you make something with it.", d: "Pick an idea, join a team, and build a first version in a few meetings. An app, a brand, a service. Nobody expects it to be perfect.", tag: "Projects" },
  { k: "Launch", t: "Then you put it in front of people.", d: "Send it to classmates, ask for feedback, get your first users or first sale. This is the part that makes it worth writing about.", tag: "Launch" },
  { k: "Compete", t: "And you keep score.", d: "In the spring, teams compete in the AIBA Cup on revenue, sales and users. The scoreboard is public and the trophy is real.", tag: "The Cup" },
];

const frame = "absolute inset-0 transition-opacity duration-500";
function Chat() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 font-mono text-[11px] uppercase tracking-widest text-white/50"><span>Lesson 01 · Prompting</span><span>Example</span></div>
      <div className="flex-1 space-y-4 p-5 text-[15px]">
        <p className="ml-auto max-w-[85%] bg-white/10 p-3">I&rsquo;m in 10th grade. Give me 3 business ideas that use AI and cost nothing to start.</p>
        <div className="max-w-[92%] border border-white/12 p-3 text-white/85"><p>1. A study-notes app that makes flashcards.</p><p className="mt-1">2. A deals page for cheap food near school.</p><p className="mt-1">3. A logo service for school clubs.</p></div>
        <p className="font-hand text-2xl text-lb">now ask it which one you&rsquo;d actually finish &rarr;</p>
      </div>
    </div>
  );
}
function Build() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3"><span className="h-2.5 w-2.5 rounded-full bg-white/25" /><span className="h-2.5 w-2.5 rounded-full bg-white/25" /><span className="h-2.5 w-2.5 rounded-full bg-white/25" /><span className="ml-3 flex-1 bg-black/30 px-3 py-1 font-mono text-[11px] text-white/50">study-buddy.vercel.app</span></div>
      <div className="flex-1 p-6 md:p-8">
        <p className="font-mono text-[11px] uppercase tracking-widest text-lb">Study Buddy</p>
        <p className="mt-3 text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">Turn your notes into flashcards.</p>
        <p className="mt-3 text-white/60 max-w-xs">Paste a page of notes. Get a quiz in seconds.</p>
        <span className="mt-6 inline-block bg-white px-5 py-2.5 text-sm font-semibold text-[#0b1730]">Try it free</span>
        <p className="mt-8 font-mono text-[11px] text-white/45">Built in 40 minutes with v0 + Vercel. Example.</p>
      </div>
    </div>
  );
}
function Launch() {
  const rows = [["New signup", "Maya, 11th grade", "2 min ago"], ["New signup", "Leo, 10th grade", "9 min ago"], ["Feedback", "“Make the quiz shorter”", "1 hr ago"], ["First sale", "$5.00", "Today"]];
  return (
    <div className="h-full flex flex-col p-6 md:p-8">
      <p className="font-mono text-[11px] uppercase tracking-widest text-white/50">Week 3 · Example</p>
      <p className="mt-2 text-6xl font-extrabold tracking-tight">37 <span className="text-2xl font-medium text-white/50">users</span></p>
      <svg viewBox="0 0 300 60" className="mt-3 w-full" aria-hidden><polyline points="0,52 40,48 80,44 120,40 160,30 200,26 240,14 300,6" fill="none" stroke="#8cc8ff" strokeWidth="2.5" /></svg>
      <ul className="mt-5 flex-1 divide-y divide-white/10 text-sm">{rows.map(([a, b, c]) => <li key={a + b} className="flex items-center justify-between gap-3 py-3"><span><span className="block font-medium">{a}</span><span className="block text-white/55">{b}</span></span><span className="text-white/40 text-xs">{c}</span></li>)}</ul>
    </div>
  );
}
function Compete() {
  const rows = [["Team Alpha", 92], ["Team Bravo", 74], ["Team Charlie", 51]];
  return (
    <div className="h-full flex flex-col p-6 md:p-8">
      <div className="flex justify-between font-mono text-[11px] uppercase tracking-widest text-white/50"><span>AIBA Cup · Most users</span><span>Example</span></div>
      <ol className="mt-6 flex-1 space-y-6">{rows.map(([n, w], i) => <li key={n as string}><div className="flex items-baseline justify-between"><span className="text-lg font-semibold"><span className="mr-3 font-mono text-sm text-lb">0{i + 1}</span>{n}</span><span className="font-mono text-sm text-white/55">{w}%</span></div><div className="mt-2 h-1.5 bg-white/10"><div className="h-full bg-lb" style={{ width: `${w}%` }} /></div></li>)}</ol>
      <p className="font-hand text-2xl text-lb">updated every Friday</p>
    </div>
  );
}

export default function ProjectStory() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i)); }), { rootMargin: "-45% 0px -45% 0px" });
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);
  const views = [<Chat key="c" />, <Build key="b" />, <Launch key="l" />, <Compete key="p" />];
  return (
    <div className="grid lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-16">
      <div className="lg:order-2 lg:sticky lg:top-28 self-start z-10 sticky top-16">
        <div className="relative h-[330px] sm:h-[400px] lg:h-[520px] rounded-[32px] border border-white/15 bg-[#0a1226] overflow-hidden" role="img" aria-label={`Example: ${STEPS[active].k}`}>
          {views.map((v, i) => <div key={i} className={frame} style={{ opacity: active === i ? 1 : 0, pointerEvents: active === i ? "auto" : "none" }} aria-hidden={active !== i}>{v}</div>)}
        </div>
        <div className="mt-3 flex gap-2">{STEPS.map((s, i) => <span key={s.k} className={"h-1 flex-1 rounded-full transition-colors " + (i <= active ? "bg-lb" : "bg-white/15")} />)}</div>
      </div>
      <ol className="lg:order-1">
        {STEPS.map((s, i) => (
          <li key={s.k} ref={(el) => { refs.current[i] = el; }} data-i={i} className={"min-h-[46vh] lg:min-h-[78vh] flex flex-col justify-center transition-opacity duration-300 " + (active === i ? "opacity-100" : "opacity-40")}>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-lb">Step {i + 1} · {s.tag}</p>
            <h3 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.05]">{s.t}</h3>
            <p className="mt-5 text-lg text-white/70 max-w-md">{s.d}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
