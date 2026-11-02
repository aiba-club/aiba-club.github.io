import Link from "next/link";
import Safe from "@/components/Safe";
import DotField from "@/components/DotField";
import GradientText from "@/components/GradientText";
import IdeaPlanner from "@/components/IdeaPlanner";
import ProjectStory from "@/components/ProjectStory";
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
        <Safe><DotField gradientFrom="#2f6fcf" gradientTo="#0a2a6b" glowColor="#8cc8ff" dotSpacing={22} baseOpacity={0.24} /></Safe>
        <div className="wrap relative pt-32 md:pt-40 pb-20 text-center flex flex-col items-center">
          <h1 className="font-semibold tracking-tight leading-[1.05] text-[clamp(2.5rem,5.8vw,4.8rem)] max-w-4xl">
            Bring an idea.<br /><GradientText colors={["#ffffff", "#8cc8ff", "#cfe6ff"]} animationSpeed={7}>Build it with AI.</GradientText>
          </h1>
          <p className="mt-6 max-w-2xl text-base md:text-lg text-white/75">{CLUB.fullName} is a student club. Every {CLUB.meeting.day.replace(/s$/, "")} you learn one AI tool, then use it with a team to make something real. It&rsquo;s free, and you don&rsquo;t need any experience.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="#plan" className="btn btn-solid">Plan your first project ↓</Link><Link href="/contact" className="btn btn-line bg-black/30 backdrop-blur">Join the club</Link></div>
          <p className="mt-4 text-sm text-white/50">{CLUB.meeting.day}, {CLUB.meeting.time} · {CLUB.meeting.place}</p>
          <div className="mt-14 w-full"><IdeaPlanner /></div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-white/10">
        <div className="wrap py-24">
          <h2 className={H2}>From first lesson to final scoreboard.</h2>
          <p className="mt-3 text-white/65 max-w-xl">Here&rsquo;s how an example project moves through the club. Scroll to follow it.</p>
          <div className="mt-12"><ProjectStory /></div>
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
        <div className="wrap mb-16 md:mb-20 flex flex-wrap items-end justify-between gap-6"><div><h2 className={H2}>The tools you&rsquo;ll learn.</h2><p className="mt-4 text-white/65 max-w-xl">Most have a free version.</p></div><Link href="/tools" className="font-semibold text-lb underline decoration-2 underline-offset-4 hover:text-white">All tools →</Link></div>
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
