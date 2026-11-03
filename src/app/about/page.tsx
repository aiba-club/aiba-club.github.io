import Link from "next/link";
import Safe from "@/components/Safe";
import SwarmCursor from "@/components/SwarmCursor";
import GlareHover from "@/components/GlareHover";
import PageHeader from "@/components/PageHeader";
import { ABOUT } from "@/data/about";
import { CLUB } from "@/data/club";
export const metadata = { title: "About — AIBA" };
export default function About() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 opacity-60 [mask-image:linear-gradient(black_40%,transparent)]"><Safe><SwarmCursor count={36} color="#8cc8ff" accentColor="#ffffff" /></Safe></div>
        <div className="wrap relative pt-36 pb-16 lg:pb-24">
          <p className="eyebrow mb-5">About AIBA</p>
          <h1 className="max-w-4xl text-balance text-5xl md:text-7xl font-semibold tracking-tight leading-[1.03]">We learn AI by <span className="text-[#cfe6ff]">building real things.</span></h1>
          <p className="mt-7 max-w-2xl text-lg md:text-xl leading-relaxed text-white/75">{ABOUT.mission}</p>
        </div>
      </header>

      <section className="wrap py-20 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div><p className="eyebrow mb-4">How it works</p><h2 className="text-3xl md:text-5xl font-semibold tracking-tight">Four steps, no experience needed.</h2></div>
        <ol className="space-y-3">
          {ABOUT.steps.map((x, i) => <li key={x.t} className="flex gap-5 rounded-[28px] border border-white/12 bg-white/[0.03] p-6"><span className="font-mono text-2xl text-lb">0{i + 1}</span><div><h3 className="text-xl font-semibold">{x.t}</h3><p className="mt-1 text-white/65">{x.d}</p></div></li>)}
        </ol>
      </section>

      <section className="border-t border-line"><div className="wrap py-20">
        <p className="eyebrow mb-4">What we believe</p>
        <div className="grid md:grid-cols-3 gap-5">
          {ABOUT.principles.map((p) => <div key={p.t} className="rounded-[28px] border border-white/12 bg-white/[0.03] p-7"><h2 className="text-2xl font-semibold tracking-tight">{p.t}</h2><p className="mt-3 text-white/65 leading-relaxed">{p.d}</p></div>)}
        </div>
      </div></section>

      <section className="border-t border-line"><div className="wrap py-20 grid gap-8 md:grid-cols-2">
        <div><p className="eyebrow mb-4">Who it&rsquo;s for</p><h2 className="text-3xl md:text-5xl font-semibold tracking-tight">Anyone who&rsquo;s curious.</h2></div>
        <p className="text-lg leading-relaxed text-white/70">You don&rsquo;t need to code, and you don&rsquo;t need a business idea yet. If you&rsquo;re a beginner you&rsquo;ll learn the tools from scratch. If you already build things, you&rsquo;ll find a team and a reason to ship. We meet {CLUB.meeting.day.toLowerCase()}, {CLUB.meeting.time}, in {CLUB.meeting.place}, and it&rsquo;s free.</p>
      </div></section>

      <section className="border-y border-line"><div className="wrap py-16">
        <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">Who runs it.</h2>
        <p className="mt-2 text-white/65">AIBA is student-led, with a faculty sponsor.</p>
        <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 max-w-5xl gap-5">
          {[...ABOUT.officers, ABOUT.advisor].map((o, i) => (
            <li key={i}><GlareHover width="100%" height="auto" background="#0a1226" borderColor="rgba(255,255,255,0.12)" borderRadius="16px" glareColor="#8cc8ff" glareOpacity={0.2}>
              <div className="w-full p-6 text-left"><div className="grid h-14 w-14 place-items-center rounded-full border border-white/20 bg-white/10 text-lg font-semibold" aria-hidden>{o.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}</div><p className="mt-4 text-lg font-semibold">{o.name}</p><p className="text-lb text-sm">{o.role}</p></div>
            </GlareHover></li>
          ))}
        </ul>
      </div></section>
    </>
  );
}
