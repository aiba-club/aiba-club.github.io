import PageHeader from "@/components/PageHeader";
import Strands from "@/components/Strands";
import CupCountdown from "@/components/CupCountdown";
import { CUP } from "@/data/challenge";

export const metadata = { title: "AIBA Cup" };

const PRIZES = [["Most revenue", "Awarded to the team that earns the most money from what it built."], ["Most sales", "Awarded to the team that makes the most individual sales."], ["Most users", "Awarded to the team that gets the most people to sign up and use it."]];

export default function Challenge() {
  const lead = CUP.tracks[0].teams;
  return (
    <>
      <PageHeader eyebrow="Competition" title="The AIBA Cup." lede={`Our competition for teams that built something. It starts in ${CUP.startLabel.split(" ")[0]} and runs for ${CUP.weeks} weeks.`} bg={<Strands colors={["#8cc8ff", "#2f6fcf", "#ffffff"]} glass={false} />}>
        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-white/80"><span className="h-2 w-2 rounded-full bg-amber-300" />Not open yet</p>
      </PageHeader>

      {/* Countdown */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(47,111,207,.35),transparent)] blur-2xl" />
        <div className="wrap relative py-20 md:py-28 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-lb">The Cup opens in</p>
          <div className="mt-8"><CupCountdown /></div>
          <p className="mt-8 text-white/60">Starts {CUP.startLabel} · runs {CUP.weeks} weeks</p>
        </div>
      </section>

      {/* Description */}
      <section className="wrap py-20 grid gap-14 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-lg">What it is.</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">The AIBA Cup is where teams put what they built in front of real people and see how far it goes. For five weeks, teams share their numbers and compete for three prizes, and a public scoreboard shows who&rsquo;s ahead.</p>
          <p className="mt-4 max-w-xl text-white/60">The rules, the prizes themselves and the full schedule will be posted here before it opens.</p>
          <div className="mt-8 flex flex-wrap gap-2" aria-label="Five weeks">{Array.from({ length: CUP.weeks }, (_, i) => <span key={i} className="rounded-full border border-white/15 px-4 py-1.5 font-mono text-xs text-white/55">Week {i + 1}</span>)}</div>
        </div>
        <div><p className="font-mono text-xs uppercase tracking-[0.18em] text-lb">The prizes</p><ul className="mt-4 space-y-3">{PRIZES.map(([t, d]) => <li key={t} className="rounded-[28px] border border-white/12 bg-white/[0.03] p-6"><div className="flex items-start justify-between gap-4"><p className="text-xl font-semibold">{t}</p><span className="shrink-0 rounded-full border border-white/20 px-3 py-0.5 text-xs text-white/60">Prize to be announced</span></div><p className="mt-2 text-sm text-white/60">{d}</p></li>)}</ul></div>
      </section>

      {/* Blurred standings */}
      <section className="border-t border-white/10">
        <div className="wrap py-20">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Standings.</h2>
          <div className="relative mt-8 overflow-hidden rounded-[32px] border border-white/12 bg-[#0a1226]">
            <div aria-hidden className="select-none p-6 md:p-8 blur-[10px] opacity-70">
              <div className="flex flex-wrap gap-2">{CUP.tracks.map((t) => <span key={t.key} className="rounded-full border border-white/20 px-4 py-1.5 text-sm">{t.label}</span>)}</div>
              <ol className="mt-6 divide-y divide-white/10">{lead.map((x, k) => <li key={x.name} className="flex items-center gap-4 py-4"><span className="w-8 font-mono text-white/45">0{k + 1}</span><span className="flex-1 text-lg">{x.name}</span><span className="h-1.5 w-40 rounded-full bg-white/10"><span className="block h-full rounded-full bg-lb" style={{ width: `${(x.score / lead[0].score) * 100}%` }} /></span><span className="w-20 text-right text-xl font-semibold">$000</span></li>)}</ol>
            </div>
            <div className="absolute inset-0 grid place-items-center bg-[#050b1a]/40 p-6 text-center">
              <div><span className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-white/25 bg-white/10"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="5" y="11" width="14" height="10" rx="3" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg></span><p className="mt-4 text-xl font-semibold">Standings unlock when the Cup starts</p><p className="mt-1 text-white/60">Check back in {CUP.startLabel.split(" ")[0]}.</p></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
