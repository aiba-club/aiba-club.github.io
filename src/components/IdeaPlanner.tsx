"use client";
import { useState } from "react";
import Link from "next/link";

type Step = { week: string; title: string; text: string; tools: string[] };
const CHIPS = ["A study app", "A food deals page", "A logo service", "A sales dashboard", "A tutoring marketplace"];

const has = (s: string, words: string[]) => words.some((w) => s.includes(w));
function plan(raw: string): { steps: Step[]; roles: string[]; kind: string } {
  const s = raw.toLowerCase();
  const design = has(s, ["logo", "brand", "design", "poster", "merch", "art"]);
  const data = has(s, ["data", "dashboard", "spreadsheet", "analytics", "tracker"]);
  const sell = has(s, ["shop", "store", "sell", "merch", "food", "deal", "market", "tutor", "service"]);
  const build: Step = design
    ? { week: "Week 2", title: "Design version one", text: "Pick colors and type, generate logo or product ideas, and put them in a one-page style sheet.", tools: ["Figma", "Gemini"] }
    : data
    ? { week: "Week 2", title: "Build the tracker", text: "Set up a sheet that updates itself and summarizes the numbers in plain English.", tools: ["Google Sheets", "Zapier", "n8n"] }
    : { week: "Week 2", title: "Build version one", text: "Describe it in plain English and let the AI draft a first version you can click through.", tools: ["YouWare", "Claude", "Vercel"] };
  const steps: Step[] = [
    { week: "Week 1", title: "Test the idea", text: "Talk to five classmates who have the problem. Ask what they do today, and don't pitch yet.", tools: ["ChatGPT", "Notion"] },
    build,
    { week: "Week 3", title: sell ? "Get your first customers" : "Put it in front of people", text: "Send it to ten people, track who replies, and fix what confuses them.", tools: ["CapCut", "Notion"] },
    { week: "Week 4", title: "Pitch it, enter the Cup", text: "Give a two-minute pitch, report your numbers, and compete on revenue, sales or users.", tools: ["Slides", "Figma"] },
  ];
  const roles = design ? ["Designer", "Builder", "Marketer"] : data ? ["Analyst", "Builder", "Marketer"] : ["Builder", "Designer", "Marketer"];
  return { steps, roles, kind: design ? "Design project" : data ? "Data project" : sell ? "Business project" : "Product project" };
}

export default function IdeaPlanner() {
  const [idea, setIdea] = useState("A study app");
  const [draft, setDraft] = useState("");
  const p = plan(idea);
  const submit = (e: React.FormEvent) => { e.preventDefault(); if (draft.trim()) setIdea(draft.trim()); };
  return (
    <div id="plan" className="mx-auto w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/15 bg-[#0a1226] text-left shadow-[0_30px_80px_rgba(0,0,0,.45)]">
      <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[340px_minmax(0,1fr)]">
        <div className="min-w-0 border-b lg:border-b-0 lg:border-r border-white/10 p-5 sm:p-6 md:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-lb">Try it · plan your first project</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">What would you build?</h2>
          <form onSubmit={submit} className="mt-5 flex gap-2">
            <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Type your idea" aria-label="Your idea" className="min-w-0 flex-1 rounded-full border border-white/15 bg-black/25 px-4 py-2.5 text-[15px] outline-none focus:border-lb" />
            <button className="rounded-full bg-white px-5 text-sm font-semibold text-[#0b1730] hover:bg-lb transition-colors">Plan</button>
          </form>
          <p className="mt-5 text-xs text-white/45">Or pick one</p>
          <div className="mt-2 flex flex-wrap gap-2">{CHIPS.map((c) => <button key={c} onClick={() => setIdea(c)} aria-pressed={idea === c} className={"rounded-full border px-4 py-2.5 text-sm transition-colors " + (idea === c ? "border-lb bg-lb/15 text-white" : "border-white/15 text-white/70 hover:border-white/40")}>{c}</button>)}</div>
          <div className="mt-8 border-t border-white/10 pt-5 text-sm text-white/60"><p className="text-white/80">{p.kind}</p><p className="mt-1">Teams of 2–5. Suggested roles: {p.roles.join(", ")}.</p></div>
        </div>
        <div className="p-6 md:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-white/45">Your first four weeks</p>
          <p className="mt-1 text-xl font-semibold tracking-tight">“{idea}”</p>
          <ol key={idea} className="mt-6 space-y-0 border-l border-white/15">
            {p.steps.map((s, i) => (
              <li key={s.week} className="relative pb-6 pl-6 last:pb-0" style={{ animation: `fadeUp .4s ${i * 0.08}s both` }}>
                <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-lb" />
                <div className="flex flex-wrap items-baseline gap-x-3"><span className="font-mono text-xs text-lb">{s.week}</span><span className="font-semibold">{s.title}</span></div>
                <p className="mt-1 text-sm text-white/65 max-w-md">{s.text}</p>
                <p className="mt-2 flex flex-wrap items-center gap-2">{s.tools.map((t) => <span key={t} className="rounded-full border border-white/12 px-2.5 py-0.5 text-xs text-white/65">{t}</span>)}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
