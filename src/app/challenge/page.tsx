import Link from "next/link";
import Scoreboard from "@/components/Scoreboard";
import PageHeader from "@/components/PageHeader";
import DriftWall from "@/components/DriftWall";
import Strands from "@/components/Strands";
import SplitFlapText from "@/components/SplitFlapText";
import { CUP } from "@/data/challenge";
export const metadata = { title: "AIBA Cup" };
export default function Challenge() {
  return (
    <>
      <PageHeader eyebrow="End-of-year contest" title="The AIBA Cup." lede="Teams build a product, put it in front of people, and report their numbers. Three tracks, one scoreboard, one trophy." bg={<Strands colors={["#8cc8ff", "#2f6fcf", "#ffffff"]} glass={false} />}>
        <div className="mt-8"><SplitFlapText words={["REVENUE", "SALES", "USERS"]} tileColor="#0a2a6b" textColor="#ffffff" fontSize={34} cycleDelay={2600} /></div>
      </PageHeader>
      <div className="wrap py-16"><Scoreboard /></div>

      <section className="border-y border-line"><div className="wrap py-20">
        <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">How it works.</h2>
        <ol className="mt-10 grid md:grid-cols-4 gap-8">{CUP.how.map((h, i) => <li key={h.t} className="border-t border-lb pt-5"><p className="text-lb text-sm">Step {i + 1}</p><p className="mt-2 text-xl font-semibold">{h.t}</p><p className="mt-2 text-white/65">{h.d}</p></li>)}</ol>
      </div></section>

      <section className="wrap py-20">
        <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">Prizes.</h2>
        <div className="mt-10 grid grid-cols-3 gap-4 items-end max-w-3xl">
          {[CUP.prizes[1], CUP.prizes[0], CUP.prizes[2]].map((p, i) => (
            <div key={p.place} className={"rounded-t-2xl border border-line p-5 flex flex-col justify-between " + (i === 1 ? "h-64 bg-db" : i === 0 ? "h-52 bg-white/5" : "h-44 bg-white/5")}>
              <span className="text-5xl font-semibold text-lb">{p.place}</span>
              <div><p className="font-medium">{p.title}</p><p className="text-white/70">{p.prize}</p></div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-white/65">{CUP.trackPrize}</p>
      </section>

      <section className="border-y border-line"><div className="wrap py-20 grid md:grid-cols-2 gap-14">
        <div><h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Dates.</h2><ul className="mt-6 divide-y divide-line border-y border-line">{CUP.timeline.map((x) => <li key={x.date} className="flex gap-6 py-4"><span className="w-20 text-lb">{x.date}</span><span>{x.label}</span></li>)}</ul></div>
        <div><h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Rules.</h2><ul className="mt-6 divide-y divide-line border-y border-line">{CUP.rules.map((r) => <li key={r} className="py-4 text-white/80">{r}</li>)}</ul></div>
      </div></section>

      <section className="wrap pt-20"><div className="flex flex-wrap items-end justify-between gap-6"><div><h2 className="text-2xl md:text-4xl font-semibold tracking-tight">Past entries.</h2><p className="text-mute mt-2">Everything teams have submitted so far.</p></div><Link href="/contact" className="btn btn-solid">Enter a team →</Link></div></section>
      <div className="mt-8 h-[60vh] min-h-[420px] relative overflow-hidden"><DriftWall items={Array.from({ length: 12 }, (_, i) => ({ image: `/gallery/g${String(i + 1).padStart(2, "0")}.svg`, title: `Entry ${i + 1}` }))} overlayColor="#050b1a" /></div>
    </>
  );
}
