import Link from "next/link";
import Safe from "@/components/Safe";
import DotField from "@/components/DotField";
import WordSwap from "@/components/WordSwap";
import IdeaPlanner from "@/components/IdeaPlanner";
import HowItWorks from "@/components/HowItWorks";
import ResumeCompare from "@/components/ResumeCompare";
import ToolStrip from "@/components/ToolStrip";
import CupTeaser from "@/components/CupTeaser";
import FaqPreview from "@/components/FaqPreview";
import LaserCTA from "@/components/LaserCTA";
import { CLUB } from "@/data/club";

const H2 = "text-3xl md:text-4xl font-semibold tracking-tight max-w-2xl";

export default function Home() {
  return (
    <>
      {/* HERO: one promise, and a tool you can use right now */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="hero-bg"><span className="grid" /><span className="glow g1" /><span className="glow g2" /><span className="beam b1" /><span className="beam b2" /><span className="beam b3" /><span className="floor" /></div>
        <div className="wrap relative pt-32 md:pt-44 pb-20 text-center flex flex-col items-center">
          <h1 className="font-semibold tracking-tight leading-[1.08]  max-w-5xl" style={{ fontSize: "clamp(2.3rem,5.4vw,4.6rem)" }}>
            Bring an idea.<br />Build your next <WordSwap words={["app", "site", "brand", "store", "game", "tool", "bot", "startup", "podcast", "course", "agency", "shop"]} />
          </h1>
          <p className="mt-8 max-w-2xl text-base md:text-xl text-white/75">{CLUB.fullName} is a student club. Every {CLUB.meeting.day.replace(/s$/, "")} you learn one AI tool, then use it with a team to make something real. It&rsquo;s free, and you don&rsquo;t need any experience.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="#plan" className="btn btn-solid">Plan your first project ↓</Link><Link href="/contact" className="btn btn-line bg-black/30 backdrop-blur">Join the club</Link></div>
          <p className="mt-4 text-sm text-white/50">{CLUB.meeting.day}, {CLUB.meeting.time} · {CLUB.meeting.place}</p>
          <div className="mt-14 w-full"><IdeaPlanner /></div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-white/10">
        <div className="wrap py-24">
          <h2 className={H2}>How the club works.</h2>
          <p className="mt-3 text-white/65 max-w-xl">Four stages, from your first lesson to the AIBA Cup. Pick one to see an example.</p>
          <div className="mt-10"><HowItWorks /></div>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section id="resume" className="border-t border-white/10">
        <div className="wrap py-24">
          <h2 className={H2}>Something specific to put on an application.</h2>
          <p className="mt-3 text-white/65 max-w-xl">Readers see hundreds of club names. They remember what you actually did.</p>
          <ResumeCompare />
        </div>
      </section>

      {/* TOOLS */}
      <section className="border-t border-white/10 py-24">
        <div className="wrap mb-16 md:mb-20 flex flex-wrap items-end justify-between gap-6"><div><h2 className={H2}>The tools you&rsquo;ll learn.</h2><p className="mt-4 text-white/65 max-w-xl">Most have a free version.</p></div></div>
        <ToolStrip />
      </section>

      {/* THE CUP */}
      <section className="border-t border-white/10"><div className="wrap py-24"><CupTeaser /></div></section>

      {/* QUESTIONS */}
      <section className="border-t border-white/10"><div className="wrap py-24"><FaqPreview /></div></section>

      {/* CLOSE */}
      <LaserCTA />
    </>
  );
}
