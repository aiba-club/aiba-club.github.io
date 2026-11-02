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
      <PageHeader eyebrow="About" title="A club for people who like building." lede={ABOUT.mission} bg={<SwarmCursor count={36} color="#8cc8ff" accentColor="#ffffff" />} />
      <section className="wrap py-16 grid md:grid-cols-3 gap-8">
        {ABOUT.principles.map((p) => <div key={p.t} className="border-t border-lb pt-5"><h2 className="text-xl font-semibold">{p.t}</h2><p className="mt-2 text-white/65">{p.d}</p></div>)}
      </section>
      <section className="border-y border-line"><div className="wrap py-16">
        <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">Who runs it.</h2>
        <p className="mt-2 text-white/65">Student officers plan the lessons and projects. {ABOUT.advisor.name} is our {ABOUT.advisor.role.toLowerCase()}.</p>
        <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ABOUT.officers.map((o, i) => (
            <li key={i}><GlareHover width="100%" height="auto" background="#0a1226" borderColor="rgba(255,255,255,0.12)" borderRadius="16px" glareColor="#8cc8ff" glareOpacity={0.2}>
              <div className="p-6"><div className="h-14 w-14 rounded-full bg-gradient-to-br from-lb to-db" aria-hidden /><p className="mt-4 text-lg font-semibold">{o.name}</p><p className="text-lb text-sm">{o.role} · {o.grade}</p><p className="mt-2 text-white/60 text-sm">{o.bio}</p></div>
            </GlareHover></li>
          ))}
        </ul>
      </div></section>
      <section className="wrap py-16 grid md:grid-cols-[1fr_1.2fr] gap-12">
        <div><h2 className="text-2xl md:text-4xl font-semibold tracking-tight">Our story.</h2><p className="mt-3 text-white/65">Where we started and where we are.</p></div>
        <ol className="border-l border-line">{ABOUT.history.map((h, i) => <li key={i} className="relative pl-8 pb-8"><span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-lb" /><p className="text-lb text-sm">{h.when}</p><p className="text-white/80">{h.what}</p></li>)}</ol>
      </section>
      <section className="border-t border-line"><div className="wrap py-16 flex flex-wrap items-center justify-between gap-6"><div><h2 className="text-2xl md:text-4xl font-semibold tracking-tight">Come to a meeting.</h2><p className="mt-2 text-white/65">{CLUB.meeting.day}, {CLUB.meeting.time}, {CLUB.meeting.place}.</p></div><Link href="/contact" className="btn btn-solid">Join the club →</Link></div></section>
    </>
  );
}
