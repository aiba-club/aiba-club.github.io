import Link from "next/link";
import Strands from "@/components/Strands";
import CupCountdown from "@/components/CupCountdown";
import { CUP } from "@/data/challenge";

export const metadata = { title: "AIBA Cup" };

const PRIZES = [["Most revenue", "Awarded to the team that earns the most money from what it built."], ["Most sales", "Awarded to the team that makes the most individual sales."], ["Most users", "Awarded to the team that gets the most people to sign up and use it."]];

export default function Challenge() {
  const lead = CUP.tracks[0].teams;
  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 opacity-80 [mask-image:linear-gradient(black_55%,transparent)]"><Strands colors={["#8cc8ff", "#2f6fcf", "#ffffff"]} glass={false} /></div>
        <div aria-hidden className="pointer-events-none absolute -right-24 top-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(140,200,255,.35),transparent)] blur-2xl" />
        <div className="wrap relative grid items-center gap-12 pt-36 pb-16 lg:grid-cols-[1.15fr_1fr] lg:pb-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-white/80 backdrop-blur"><span className="h-2 w-2 rounded-full bg-amber-300" />Not open yet · opens {CUP.startLabel}</p>
            <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight leading-[1.02]">The AIBA <span className="text-[#cfe6ff]">Cup.</span></h1>
            <p className="mt-6 max-w-xl text-lg md:text-xl leading-relaxed text-white/70">Five weeks. Real people using what you built. Three prizes for the teams that earn, sell and grow the most.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="rounded-full bg-white px-6 py-3 font-semibold text-[#0b1730] transition-colors hover:bg-[#cfe6ff]">Join the club</Link>
              <a href="#how" className="rounded-full border border-white/25 px-6 py-3 font-medium text-white/85 transition-colors hover:bg-white/10">How it works ↓</a>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-3">
              {[[String(CUP.weeks), "weeks"], ["3", "prizes"], ["Wed", "lunch, Rm 153"]].map(([n, l]) => <div key={l} className="rounded-[24px] border border-white/12 bg-white/[0.04] px-4 py-4 backdrop-blur"><dt className="text-3xl font-semibold">{n}</dt><dd className="mt-1 text-xs uppercase tracking-[0.14em] text-white/55">{l}</dd></div>)}
            </dl>
          </div>
          <div className="relative mx-auto w-full max-w-md" aria-hidden>
            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8cc8ff]/30 blur-3xl" />
            <svg viewBox="0 0 200 220" className="relative mx-auto h-64 w-auto drop-shadow-[0_20px_40px_rgba(140,200,255,.35)]">
              <defs><linearGradient id="tg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset=".55" stopColor="#8cc8ff" /><stop offset="1" stopColor="#2f6fcf" /></linearGradient></defs>
              <path d="M55 30h90v48c0 28-20 50-45 50S55 106 55 78V30Z" fill="url(#tg)" />
              <path d="M55 42H28c0 30 14 46 36 50M145 42h27c0 30-14 46-36 50" fill="none" stroke="url(#tg)" strokeWidth="9" strokeLinecap="round" />
              <rect x="90" y="126" width="20" height="38" rx="4" fill="url(#tg)" />
              <rect x="62" y="164" width="76" height="16" rx="8" fill="url(#tg)" />
              <rect x="50" y="184" width="100" height="14" rx="7" fill="#0b1730" stroke="#8cc8ff" strokeOpacity=".5" />
              <path d="M100 48l7 15 16 2-12 11 3 16-14-8-14 8 3-16-12-11 16-2Z" fill="#0b1730" fillOpacity=".55" />
            </svg>
            <div className="relative -mt-6 space-y-2.5">
              {PRIZES.map(([t], i) => <div key={t} style={{ marginLeft: i * 18 }} className="flex items-center gap-3 rounded-full border border-white/15 bg-[#0a1226]/70 px-5 py-3 backdrop-blur-xl"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#8cc8ff] font-mono text-sm font-bold text-[#0b1730]">{i + 1}</span><span className="font-medium">{t}</span></div>)}
            </div>
          </div>
        </div>
      </header>

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
      <section id="how" className="wrap scroll-mt-24 py-20 grid gap-14 lg:grid-cols-[1.1fr_1fr]">
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
