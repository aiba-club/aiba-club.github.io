import Link from "next/link";
import Counter from "./Counter";
import SplitFlapText from "./SplitFlapText";
import { CUP } from "@/data/challenge";

export default function CupTeaser() {
  const t = CUP.tracks[0];
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] items-center">
      <div>
        <SplitFlapText text="THE CUP" tileColor="#0a2a6b" textColor="#ffffff" fontSize={34} />
        <h2 className="mt-6 text-3xl md:text-4xl font-semibold tracking-tight max-w-md">Teams race to May 30.</h2>
        <p className="mt-3 max-w-md text-white/65">The AIBA Cup is our end-of-year competition. Teams report numbers every Friday on three tracks (revenue, sales, users), and the scoreboard is public.</p>
        <Link href="/challenge" className="mt-6 inline-block font-semibold text-lb underline decoration-2 underline-offset-4 hover:text-white">Full standings →</Link>
      </div>
      <div className="rounded-[32px] border border-white/12 bg-[#0a1226] p-7">
        <div className="flex items-baseline justify-between"><p className="font-mono text-[11px] uppercase tracking-[0.14em] text-lb">{t.label}</p><span className="text-xs text-white/40">Example standings</span></div>
        <ol className="mt-4 divide-y divide-white/10">{t.teams.slice(0, 4).map((x, k) => <li key={x.name} className="flex items-center gap-4 py-3"><span className="w-6 font-mono text-sm text-white/40">0{k + 1}</span><span className="flex-1"><span className="block font-medium">{x.name}</span><span className="block text-xs text-white/45">{x.built}</span></span><span className="text-xl font-semibold tabular-nums"><Counter value={x.score} prefix="$" fontSize={20} textColor="#ffffff" /></span></li>)}</ol>
      </div>
    </div>
  );
}
