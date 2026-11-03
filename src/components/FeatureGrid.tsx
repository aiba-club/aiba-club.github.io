"use client";
import { useEffect, useState } from "react";
import SplitFlapText from "./SplitFlapText";
import Counter from "./Counter";
import GlareHover from "./GlareHover";

const g = { background: "#0a1226", borderColor: "rgba(255,255,255,0.12)", borderRadius: "8px", glareColor: "#8cc8ff", glareOpacity: 0.14 };
const Label = ({ children }: { children: React.ReactNode }) => <p className="font-mono text-xs uppercase tracking-[0.14em] text-white/45">{children}</p>;

function Tile({ title, body, children, className = "" }: { title: string; body: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <GlareHover width="100%" height="100%" {...g}>
        <div className="flex h-full w-full flex-col p-6 md:p-7 text-left">
          <div className="flex-1">{children}</div>
          <h3 className="mt-6 text-xl font-semibold tracking-tight">{title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-white/65">{body}</p>
        </div>
      </GlareHover>
    </div>
  );
}

const FEED = [["New signup", "Maya, 11th grade", "2 min ago"], ["Feedback", "“Can the quiz be shorter?”", "40 min ago"], ["New signup", "Leo, 10th grade", "1 hr ago"], ["First sale", "$5.00", "Today"]];
const ROLES = [["Builder", "Makes the product", "Cursor · Lovable"], ["Designer", "Brand and look", "Figma · Canva"], ["Marketer", "Gets the first users", "CapCut · Notion"], ["Analyst", "Tracks the numbers", "Sheets · Python"]];

function DaysLeft() {
  const [d, setD] = useState<number | null>(null);
  useEffect(() => { setD(Math.max(0, Math.ceil((new Date("2027-05-30").getTime() - Date.now()) / 864e5))); }, []);
  return <span className="tabular-nums">{d ?? "--"}</span>;
}

export default function FeatureGrid() {
  return (
    <div className="grid gap-4 lg:grid-cols-3 lg:auto-rows-fr">
      <Tile className="lg:col-span-2" title="Your first real users" body="Launch to classmates and watch actual signups, feedback and maybe a first sale come in. That's the part that turns a school project into something you can talk about.">
        <div className="grid sm:grid-cols-[auto_1fr] gap-6 items-center">
          <div><Label>Example · week 3</Label><div className="mt-2 text-6xl font-semibold tracking-tight"><Counter value={37} fontSize={60} textColor="#ffffff" /></div><p className="text-sm text-white/50">signups</p></div>
          <ul className="divide-y divide-white/10 border-y border-white/10 text-sm">{FEED.map(([a, b, c]) => <li key={a + b} className="flex items-center justify-between gap-3 py-2.5"><span><span className="font-medium">{a}</span> <span className="text-white/55">{b}</span></span><span className="shrink-0 text-xs text-white/35">{c}</span></li>)}</ul>
        </div>
      </Tile>

      <Tile className="lg:row-span-2" title="A team with real roles" body="Teams of two to five split the work like a startup would: someone builds, someone designs, someone finds users, someone watches the numbers.">
        <Label>Roles on a team</Label>
        <ul className="mt-3 space-y-3">{ROLES.map(([r, d, t]) => <li key={r} className="flex items-center gap-3 border border-white/10 p-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lb/20 text-sm font-semibold text-lb">{r[0]}</span><span className="min-w-0"><span className="block font-medium">{r}</span><span className="block text-xs text-white/50">{d} · {t}</span></span></li>)}</ul>
      </Tile>

      <Tile title="A page with your name on it" body="Every project gets its own case-study page with your role, the tools you used and the results. Link it on an application or resume.">
        <div className="bg-[#faf9f4] p-4 text-[#14161c]"><p className="font-mono text-[10px] uppercase tracking-widest text-[#4a6fa5]">Case study</p><p className="mt-1 font-semibold">[Project name]</p><p className="text-xs text-[#5a5f6a]">Role: Project lead · Team of 3</p><div className="mt-3 flex gap-2">{["[NUMBER] users", "3 weeks"].map((x) => <span key={x} className="bg-[#8cc8ff]/30 px-2 py-0.5 text-xs">{x}</span>)}</div></div>
      </Tile>

      <Tile title="A deadline that isn't pretend" body="The AIBA Cup closes on May 30. Scores are public and teams report every Friday, so there's always a reason to ship this week.">
        <div className="space-y-3"><SplitFlapText words={["MAY 30", "FINALS", "TROPHY"]} tileColor="#0a2a6b" textColor="#ffffff" fontSize={24} cycleDelay={2600} /><p className="text-sm text-white/55"><span className="text-xl font-semibold text-white"><DaysLeft /></span> days left</p></div>
      </Tile>

      <Tile className="lg:col-span-2" title="Older members who've been through it" body="Newer members ask, older members answer. Nobody has to know everything on day one, and the people two grades up were beginners recently.">
        <Label>In the Discord</Label>
        <div className="mt-3 space-y-3 text-sm"><p className="max-w-[80%] bg-white/10 p-3">I have an idea but I don&rsquo;t know how to start building it. Where do I begin?</p><p className="ml-auto max-w-[80%] border border-lb/40 bg-lb/10 p-3">Same here last year. Start with the app dev lessons and describe it to Lovable in plain English. I&rsquo;ll look at it with you Wednesday.</p></div>
      </Tile>

      <Tile title="Skills that carry over" body="You practice prompting, building, design, selling and reading data, the things almost every job now asks about.">
        <div className="space-y-3">{[["Prompting", "92%"], ["Building with AI", "78%"], ["Design", "64%"], ["Selling", "58%"]].map(([k, w]) => <div key={k}><p className="text-sm">{k}</p><div className="mt-1 h-1.5 bg-white/10"><div className="h-full bg-lb" style={{ width: w }} /></div></div>)}</div>
      </Tile>
    </div>
  );
}
