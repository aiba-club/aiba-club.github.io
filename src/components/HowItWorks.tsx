"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Arr from "@/components/Arr";

const STEPS = [
  { k: "Learn", title: "Every Wednesday starts with one tool.", text: "A short lesson, then a live demo. You see it work, see where it breaks, and try it yourself.", points: ["Seven lessons, from prompting to pitching", "A video, slides and tutorial for each"], href: "/lessons", cta: "See the lessons" },
  { k: "Build", title: "Then you make something with it.", text: "Pick an idea, join a team and build a first version in a few meetings. Nobody expects it to be perfect.", points: ["Teams of 2 to 5, each with a role", "No coding experience needed"], href: "/projects", cta: "See what teams build" },
  { k: "Launch", title: "Then you put it in front of people.", text: "Send it to classmates, ask for feedback, and get your first users or your first sale.", points: ["Real users and real feedback", "A case-study page you can link"], href: "/projects", cta: "See case studies" },
  { k: "Compete", title: "And you keep score.", text: "In March, teams race for five weeks in the AIBA Cup for the most revenue, the most sales and the most users. The scoreboard is public.", points: ["Three prizes: most revenue, sales and users", "A five-week competition"], href: "/challenge", cta: "See the Cup" },
];

function Chat() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 font-mono text-xs uppercase tracking-widest text-white/50"><span>Lesson 01 · Prompting</span><span>Example</span></div>
      <div className="flex-1 space-y-3 p-5 text-[15px]">
        <p className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-white/10 p-3">I&rsquo;m in 10th grade. Give me 3 business ideas that use AI and cost nothing to start.</p>
        <div className="max-w-[90%] rounded-2xl rounded-bl-md border border-white/12 p-3 text-white/85"><p>1. A study-notes app that makes flashcards.</p><p className="mt-1">2. A deals page for cheap food near school.</p><p className="mt-1">3. A logo service for school clubs.</p></div>
        <p className="max-w-[85%] rounded-2xl rounded-br-md bg-white/10 p-3 ml-auto">Which one could I actually finish in three weeks?</p>
      </div>
    </div>
  );
}
function Build() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3"><span className="h-2.5 w-2.5 rounded-full bg-white/25" /><span className="h-2.5 w-2.5 rounded-full bg-white/25" /><span className="h-2.5 w-2.5 rounded-full bg-white/25" /><span className="ml-3 flex-1 rounded-full bg-black/30 px-3 py-1 font-mono text-xs text-white/50">study-buddy.vercel.app</span></div>
      <div className="flex-1 p-6 md:p-8">
        <p className="font-mono text-xs uppercase tracking-widest text-lb">Study Buddy</p>
        <p className="mt-3 text-3xl font-semibold leading-tight tracking-tight">Turn your notes into flashcards.</p>
        <p className="mt-3 max-w-xs text-white/60">Paste a page of notes. Get a quiz in seconds.</p>
        <span className="mt-6 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0b1730]">Try it free</span>
        <p className="mt-8 font-mono text-xs text-white/45">Built in 40 minutes with Lovable and Vercel. Example.</p>
      </div>
    </div>
  );
}
function Launch() {
  const rows = [["New signup", "Maya, 11th grade", "2 min ago"], ["New signup", "Leo, 10th grade", "9 min ago"], ["Feedback", "“Make the quiz shorter”", "1 hr ago"], ["First sale", "$5.00", "Today"]];
  return (
    <div className="flex h-full flex-col p-6 md:p-8">
      <p className="font-mono text-xs uppercase tracking-widest text-white/50">Week 3 · Example</p>
      <p className="mt-2 text-5xl font-semibold tracking-tight">37 <span className="text-xl font-medium text-white/50">users</span></p>
      <svg viewBox="0 0 300 50" className="mt-3 w-full" aria-hidden><polyline points="0,44 40,40 80,37 120,33 160,25 200,21 240,11 300,4" fill="none" stroke="#8cc8ff" strokeWidth="2.5" strokeLinecap="round" /></svg>
      <ul className="mt-4 flex-1 divide-y divide-white/10 text-sm">{rows.map(([a, b, c]) => <li key={a + b} className="flex items-center justify-between gap-3 py-2.5"><span><span className="block font-medium">{a}</span><span className="block text-white/55">{b}</span></span><span className="text-xs text-white/40">{c}</span></li>)}</ul>
    </div>
  );
}
function Compete() {
  const rows: [string, number][] = [["Team Alpha", 92], ["Team Bravo", 74], ["Team Charlie", 51]];
  return (
    <div className="flex h-full flex-col p-6 md:p-8">
      <div className="flex justify-between font-mono text-xs uppercase tracking-widest text-white/50"><span>AIBA Cup · Most users</span><span>Example</span></div>
      <ol className="mt-6 flex-1 space-y-5">{rows.map(([n, w], i) => <li key={n}><div className="flex items-baseline justify-between"><span className="text-lg font-semibold"><span className="mr-3 font-mono text-sm text-lb">0{i + 1}</span>{n}</span><span className="font-mono text-sm text-white/55">{w}%</span></div><div className="mt-2 h-2 rounded-full bg-white/10"><div className="h-full rounded-full bg-lb" style={{ width: `${w}%` }} /></div></li>)}</ol>
      <p className="font-mono text-xs text-white/40">Updated every Friday</p>
    </div>
  );
}
const VIEWS = [Chat, Build, Launch, Compete];

export default function HowItWorks() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const hover = useRef(false);
  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => { if (!hover.current) setI((x) => (x + 1) % STEPS.length); }, 6000);
    return () => clearInterval(t);
  }, [auto]);
  const pick = (n: number) => { setAuto(false); setI(n); };
  const s = STEPS[i];
  const View = VIEWS[i];
  return (
    <div onMouseEnter={() => (hover.current = true)} onMouseLeave={() => (hover.current = false)}>
      <div role="tablist" aria-label="How the club works" className="flex flex-wrap gap-2">
        {STEPS.map((x, n) => (
          <button key={x.k} role="tab" aria-selected={i === n} onClick={() => pick(n)} className={"flex items-center gap-2 rounded-full border px-5 py-2.5 text-[15px] font-medium transition-colors " + (i === n ? "border-white bg-white text-[#0b1730]" : "border-white/20 text-white/70 hover:border-white/50 hover:text-white")}>
            <span className={"font-mono text-xs " + (i === n ? "text-[#0b1730]/60" : "text-lb")}>0{n + 1}</span>{x.k}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="mt-6 grid overflow-hidden rounded-[32px] border border-white/12 bg-white/[0.03] lg:grid-cols-[1fr_1.1fr]">
        <div key={i} className="flex flex-col justify-center p-7 md:p-10" style={{ animation: "fadeUp .35s both" }}>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-lb">Step {i + 1} of {STEPS.length}</p>
          <h3 className="mt-3 text-2xl md:text-3xl font-semibold leading-[1.1] tracking-tight">{s.title}</h3>
          <p className="mt-4 max-w-md text-white/70">{s.text}</p>
          <ul className="mt-5 space-y-2">{s.points.map((p) => <li key={p} className="flex items-center gap-3 text-[15px] text-white/85"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-lb" />{p}</li>)}</ul>
          <Link href={s.href} className="pill-link group/pl">{s.cta} <Arr /></Link>
        </div>
        <div className="border-t border-white/10 bg-[#0a1226] lg:border-l lg:border-t-0">
          <div key={`v${i}`} className="h-[340px] md:h-[400px]" style={{ animation: "fadeUp .35s both" }} aria-hidden><View /></div>
        </div>
      </div>
      <div className="mt-4 flex gap-2" aria-hidden>{STEPS.map((x, n) => <span key={x.k} className={"h-1 flex-1 rounded-full transition-colors " + (n <= i ? "bg-lb" : "bg-white/15")} />)}</div>
    </div>
  );
}
