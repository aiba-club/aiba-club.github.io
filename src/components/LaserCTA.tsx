"use client";
import { useRef } from "react";
import Link from "next/link";
import LaserFlow from "./LaserFlow";
import FlyingButton from "./FlyingButton";
import Safe from "./Safe";
import GradientText from "./GradientText";
import SafeGL from "./SafeGL";
import { CLUB } from "@/data/club";

// The beam lands on the card, so the eye follows it to the Join button.
export default function LaserCTA() {
  const card = useRef<HTMLDivElement>(null);
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-[#050b1a]">
      <Safe><LaserFlow color="#8cc8ff" beamPosition={0.5} surfaceRef={card} /></Safe>
      <div className="wrap relative pt-24 pb-20 text-center flex flex-col items-center">
        <p className="eyebrow">Ready when you are</p>
        <h2 className="mt-4 text-3xl md:text-6xl font-semibold tracking-tight max-w-3xl"><GradientText colors={["#ffffff", "#8cc8ff", "#cfe6ff"]} animationSpeed={7}>Start something this year.</GradientText></h2>
        <p className="mt-4 text-white/70 max-w-xl">One meeting is enough to know if it&rsquo;s for you. Bring a laptop if you have one.</p>
        <div ref={card} className="mt-28 md:mt-36 w-full max-w-3xl rounded-2xl border border-white/15 bg-[#07102a]/90 backdrop-blur p-6 md:p-8 text-left">
          <div className="grid sm:grid-cols-3 gap-6">
            {[["When", `${CLUB.meeting.day}, ${CLUB.meeting.time}`], ["Where", CLUB.meeting.place], ["Cost", "Free. No experience needed."]].map(([k, v]) => <div key={k}><p className="text-xs uppercase tracking-widest text-lb">{k}</p><p className="mt-1 font-medium">{v}</p></div>)}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-white/10 pt-6">
            <Link href="/contact" className="block w-56 h-16 relative"><SafeGL fallback={<span className="btn btn-solid">Join the club →</span>}><FlyingButton theme="dark" size="medium">Join the club</FlyingButton></SafeGL></Link>
            <Link href="/faq" className="btn btn-line">Read the FAQ</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
