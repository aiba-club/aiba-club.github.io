"use client";
import { useState } from "react";
import SpotlightCard from "./SpotlightCard";

const BEFORE = [["Member, [Club name]", "[Years]"], ["Volunteer, [Organization]", "[Years]"]];

// Everything in [BRACKETS] is a placeholder you fill with your own real details.
const ACTIVITIES = [
  ["Project Lead, AIBA", "Led a team of 3 to build [PROJECT NAME], an AI app used by [NUMBER] classmates. Shipped the first version in 3 weeks and ran weekly check-ins."],
  ["Competitor, AIBA Cup", "Placed [PLACE] of [NUMBER] teams in the [TRACK] track. Reported revenue, sales and user numbers every week."],
  ["Lesson Instructor, AIBA", "Taught a lesson on [TOPIC] to [NUMBER] members, with a live demo and a tutorial others now reuse."],
  ["Officer, AIBA", "Helped plan [NUMBER] weekly meetings and recruited [NUMBER] new members."],
];
const PROJECTS = [
  ["[PROJECT NAME]", "A [WHAT IT IS] for [WHO IT'S FOR]. [NUMBER] users, $[AMOUNT] in revenue. Built with Lovable, Cursor and Vercel.", "aiba-club.github.io/projects/[project]"],
  ["[SECOND PROJECT]", "A [WHAT IT IS]. Designed the brand in Figma and ran outreach to [NUMBER] people, with a [PERCENT]% reply rate.", ""],
];
const SKILLS = ["Prompt writing", "Building apps with AI", "Web deployment", "Brand design", "Customer outreach", "Spreadsheet analysis", "Workflow automation", "Pitching", "Team leadership"];
const TOOLS = ["ChatGPT", "Claude", "Cursor", "Lovable", "Vercel", "Figma", "Canva", "Notion", "Google Sheets", "Zapier", "n8n"];
const OTHER = [["Awards", "AIBA Cup, [PLACE], [TRACK] track"], ["Certification", "Completed the 7-lesson AI business curriculum, AIBA"], ["Reference", "[ADVISOR NAME], faculty advisor, AIBA"]];

const CALLOUTS = [
  ["A number", "Specifics get remembered. Say how many people used it or how much it made."],
  ["A role", "Leading a team shows more than belonging to one."],
  ["A link", "Every project has a page you can put on an application."],
  ["Named tools", "A list of tools you actually used is easy to check and easy to trust."],
  ["Something finished", "Shipped beats started. A launch date is proof you finish things."],
  ["A person to ask", "A reference who watched you work can back up every line above."],
];

const FITS = [
  ["Activities list", "Three or four lines per entry, with the role, the result and the hours."],
  ["Resume", "Projects and skills sections, with a link to your case study."],
  ["Personal essay", "A real story about building something, including what went wrong."],
  ["Interviews", "You always have a specific thing to talk about and a result to point to."],
  ["Scholarships", "Leadership, community and a finished project are what most committees ask for."],
  ["Recommendation letter", "Your advisor can describe what you did, week by week."],
];

const ROLES: Record<string, string[]> = {
  Builder: ["Built [PRODUCT], an AI-powered [WHAT IT IS], from idea to live site in [NUMBER] weeks.", "Used [TOOL] and [TOOL] to ship [NUMBER] features, and fixed [NUMBER] bugs reported by users.", "Deployed to Vercel and handled [NUMBER] users in the first [TIME]."],
  Designer: ["Designed the brand for [PRODUCT], including logo, colors and a one-page style guide.", "Tested [NUMBER] versions of the landing page and lifted sign-ups by [PERCENT]%.", "Created [NUMBER] social graphics that reached [NUMBER] people."],
  Marketer: ["Ran outreach to [NUMBER] people and turned [NUMBER] into users, a [PERCENT]% conversion.", "Wrote and tested [NUMBER] versions of the offer, and kept the one that worked.", "Grew [PRODUCT] to [NUMBER] users in [TIME] with no ad spend."],
  Analyst: ["Built a tracker for sales and users that updated automatically with [TOOL].", "Found that [FINDING], which changed [DECISION] and improved [RESULT] by [PERCENT]%.", "Reported weekly numbers for [NUMBER] weeks to the AIBA Cup scoreboard."],
};

export default function ResumeCompare() {
  const [after, setAfter] = useState(true);
  const [role, setRole] = useState("Builder");
  const [copied, setCopied] = useState<number | null>(null);
  const copy = (t: string, i: number) => { navigator.clipboard?.writeText(t); setCopied(i); setTimeout(() => setCopied(null), 1400); };
  const H = ({ children }: { children: React.ReactNode }) => <p className="mt-6 border-b border-black/10 pb-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#4a6fa5]">{children}</p>;

  return (
    <div className="mt-12">
      <div className="grid items-start gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <div>
          <div role="tablist" aria-label="Compare" className="mb-6 inline-flex rounded-full border border-white/15 p-1">
            {[[false, "Without AIBA"], [true, "With AIBA"]].map(([v, l]) => <button key={String(l)} role="tab" aria-selected={after === v} onClick={() => setAfter(v as boolean)} className={"rounded-full px-5 py-2.5 text-sm font-medium transition-colors " + (after === v ? "bg-white text-black" : "text-white/65 hover:text-white")}>{l as string}</button>)}
          </div>
          <SpotlightCard spotlightColor="rgba(140,200,255,0.18)" className="!p-0">
            <div className="reinvert rounded-2xl bg-[#faf9f4] p-7 text-[#14161c] md:p-10">
              <div className="flex items-end justify-between border-b border-black/10 pb-4"><div><p className="text-2xl font-semibold">[Your name]</p><p className="text-sm text-[#5a5f6a]">[Grade] · [School] · [Email] · [Phone]</p></div><span className="text-xs text-[#8a8f9a]">Resume</span></div>

              {!after && (
                <>
                  <H>Activities</H>
                  <ul className="mt-4 space-y-5">{BEFORE.map(([t, y]) => <li key={t} className="flex justify-between gap-4"><div><p className="font-medium">{t}</p><div className="mt-2 h-2 w-56 max-w-full rounded bg-black/10" /></div><span className="text-sm text-[#8a8f9a]">{y}</span></li>)}</ul>
                  <p className="mt-10 text-sm text-[#8a8f9a]">Club names, with nothing about what you did or how it went.</p>
                </>
              )}

              {after && (
                <div style={{ animation: "fadeUp .4s both" }}>
                  <H>Activities and leadership</H>
                  <ul className="mt-4 space-y-3">{ACTIVITIES.map(([t, d]) => <li key={t} className="rounded-lg border border-[#8cc8ff] bg-[#8cc8ff]/20 p-4"><p className="font-semibold">{t}</p><p className="mt-1 text-[14px] text-[#2a2f3a]">{d}</p></li>)}</ul>

                  <H>Projects</H>
                  <ul className="mt-4 space-y-3">{PROJECTS.map(([t, d, l]) => <li key={t} className="rounded-lg border border-[#8cc8ff] bg-[#8cc8ff]/20 p-4"><p className="font-semibold">{t}</p><p className="mt-1 text-[14px] text-[#2a2f3a]">{d}</p>{l && <p className="mt-1 font-mono text-[12px] text-[#2f6fcf]">{l}</p>}</li>)}</ul>

                  <H>Skills</H>
                  <p className="mt-3 flex flex-wrap gap-2">{SKILLS.map((s) => <span key={s} className="rounded-full bg-[#8cc8ff]/30 px-3 py-1 text-[13px]">{s}</span>)}</p>
                  <p className="mt-3 text-[13px] text-[#5a5f6a]"><span className="font-semibold text-[#14161c]">Tools:</span> {TOOLS.join(", ")}</p>

                  <H>Awards and references</H>
                  <dl className="mt-3 space-y-2 text-[14px]">{OTHER.map(([k, v]) => <div key={k} className="flex gap-4"><dt className="w-28 shrink-0 font-semibold">{k}</dt><dd className="text-[#2a2f3a]">{v}</dd></div>)}</dl>
                </div>
              )}
            </div>
          </SpotlightCard>
          <p className="mt-3 text-xs text-white/40">Every [BRACKET] is a blank you fill with your own real details.</p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-white/50">What readers notice</p>
          <ul className="mt-5 border-t border-white/15">{CALLOUTS.map(([t, d], k) => <li key={t} className="flex gap-5 border-b border-white/15 py-5"><span className="font-mono text-lb">0{k + 1}</span><span><span className="block text-lg font-bold">{t}</span><span className="mt-1 block text-white/65">{d}</span></span></li>)}</ul>
          <p className="mt-6 max-w-sm text-xs text-white/40">Examples only. AIBA can&rsquo;t promise admission anywhere, but it gives you true, specific things to write.</p>
        </div>
      </div>

      {/* Where it fits */}
      <div className="mt-20">
        <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">Where it fits.</h3>
        <p className="mt-2 max-w-xl text-white/65">The same project can show up in six places.</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{FITS.map(([t, d]) => <li key={t} className="rounded-[28px] border border-white/12 bg-white/[0.03] p-6"><p className="text-lg font-semibold">{t}</p><p className="mt-1.5 text-sm text-white/60">{d}</p></li>)}</ul>
      </div>

      {/* Starter bullets */}
      <div className="mt-20 rounded-[32px] border border-white/12 bg-white/[0.03] p-6 md:p-10">
        <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">Starter bullets by role.</h3>
        <p className="mt-2 max-w-xl text-white/65">Pick your role on the team, copy a line, and fill in your real numbers.</p>
        <div role="tablist" aria-label="Team role" className="mt-6 flex flex-wrap gap-2">{Object.keys(ROLES).map((r) => <button key={r} role="tab" aria-selected={role === r} onClick={() => setRole(r)} className={"rounded-full border px-5 py-2.5 text-sm font-medium transition-colors " + (role === r ? "border-white bg-white text-[#0b1730]" : "border-white/20 text-white/70 hover:border-white/50")}>{r}</button>)}</div>
        <ul key={role} className="mt-6 space-y-3">{ROLES[role].map((b, i) => <li key={b} className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-black/20 p-4" style={{ animation: `fadeUp .3s ${i * 0.06}s both` }}><span className="text-[15px] text-white/85">{b}</span><button onClick={() => copy(b, i)} className="shrink-0 rounded-full border border-white/20 px-4 py-2.5 text-xs text-white/70 hover:border-lb hover:text-lb">{copied === i ? "Copied" : "Copy"}</button></li>)}</ul>
      </div>
    </div>
  );
}
