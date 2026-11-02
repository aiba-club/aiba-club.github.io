import Link from "next/link";
import SplitFlapText from "./SplitFlapText";
import CupCountdown from "./CupCountdown";
import { CUP } from "@/data/challenge";

export default function CupTeaser() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] items-center">
      <div>
        <SplitFlapText text="THE CUP" tileColor="#0a2a6b" textColor="#ffffff" fontSize={34} />
        <h2 className="mt-6 text-3xl md:text-4xl font-semibold tracking-tight max-w-md">Starts in {CUP.startLabel.split(" ")[0]}.</h2>
        <p className="mt-3 max-w-md text-white/65">The AIBA Cup is our {CUP.weeks}-week competition. Teams compete for three prizes: most revenue, most sales and most users. A public scoreboard shows who&rsquo;s ahead.</p>
        <Link href="/challenge" className="mt-6 inline-block font-semibold text-lb underline decoration-2 underline-offset-4 hover:text-white">About the Cup →</Link>
      </div>
      <div className="rounded-[32px] border border-white/12 bg-[#0a1226] p-6 md:p-8 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-lb">Opens in</p>
        <div className="mt-5"><CupCountdown compact /></div>
        <p className="mt-5 text-sm text-white/50">Not open yet · {CUP.weeks} weeks · {CUP.startLabel}</p>
      </div>
    </div>
  );
}
