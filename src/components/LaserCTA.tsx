"use client";
import { useRef } from "react";
import Link from "next/link";
import LaserFlow from "./LaserFlow";
import Safe from "./Safe";
import GradientText from "./GradientText";
import { CLUB } from "@/data/club";

// The beam lands on the card, so the eye follows it to the Join button.
export default function LaserCTA() {
  const card = useRef<HTMLDivElement>(null);
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-[#050b1a]">
      <Safe><LaserFlow color="#8cc8ff" beamPosition={0.5} surfaceRef={card} /></Safe>
      <div className="wrap relative pt-24 pb-20 text-center flex flex-col items-center">
        <div className="relative">
          <span aria-hidden className="pointer-events-none absolute -inset-x-16 -inset-y-8 -z-10 bg-[radial-gradient(closest-side,rgba(5,11,26,.92),rgba(5,11,26,.75)_60%,transparent)]" />
          <p className="eyebrow">Ready when you are</p>
          <h2 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight max-w-3xl [text-shadow:0_2px_24px_rgba(5,11,26,.9)]"><GradientText colors={["#ffffff", "#8cc8ff", "#cfe6ff"]} animationSpeed={7}>Start something this year.</GradientText></h2>
          <p className="mt-4 text-white/85 max-w-xl mx-auto [text-shadow:0_1px_12px_rgba(5,11,26,.95)]">One meeting is enough to know if it&rsquo;s for you. Bring a PC with a VPN.</p>
        </div>
        <div ref={card} className="mt-28 md:mt-36 w-full max-w-3xl rounded-[32px] border border-white/20 bg-[#07102a]/95 backdrop-blur p-6 md:p-8 text-left shadow-[0_30px_80px_-30px_rgba(140,200,255,.5)]">
          <div className="grid gap-3 sm:grid-cols-3">
            {[["When", `${CLUB.meeting.day}, ${CLUB.meeting.time}`], ["Where", CLUB.meeting.place], ["Cost", "Free. No experience needed."]].map(([k, v]) => <div key={k} className="rounded-[22px] border border-white/10 bg-white/[0.04] px-5 py-4"><p className="font-mono text-xs uppercase tracking-[0.16em] text-lb">{k}</p><p className="mt-1.5 text-lg font-medium leading-snug">{v}</p></div>)}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-[#0b1730] shadow-[0_10px_30px_-8px_rgba(140,200,255,.6)] transition-colors hover:bg-[#cfe6ff]">Join the club</Link>
            <Link href="/faq" className="inline-flex items-center rounded-full border border-white/25 px-7 py-3.5 text-base font-medium text-white/90 transition-colors hover:bg-white/10">Read the FAQ</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
