"use client";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Arr from "@/components/Arr";

const WHO = [
  { w: "I've never coded", a: "Perfect. Most of what we use needs no code, and when it does the AI writes it and we learn to read it. Our first lessons assume you know nothing.", cta: ["See the lessons", "/lessons"] },
  { w: "I already build things", a: "Good. Lead a team, teach a lesson, or take on a harder project. The Cup is a real test of whether what you make can earn money or users.", cta: ["See the Cup", "/challenge"] },
  { w: "I'm not sure yet", a: "Come to one meeting. There is nothing to sign and nothing to prepare. If it isn't for you, you've lost one lunch.", cta: ["When and where", "/contact"] },
  { w: "I'm a parent or teacher", a: "AIBA is student-run with a faculty advisor. It's free, meets at lunch on Wednesdays in Room 153, and every project is built in the open. Email us with any questions.", cta: ["Contact us", "/contact"] },
];
export default function ForYou() {
  const [i, setI] = useState(0);
  return (
    <div className="grid md:grid-cols-[1fr_1.3fr] gap-10">
      <ul role="tablist" aria-label="Who is this for" className="border-t border-white/15">
        {WHO.map((x, k) => (
          <li key={x.w} className="border-b border-white/15"><button role="tab" aria-selected={i === k} onClick={() => setI(k)} className={"flex w-full items-center justify-between py-5 text-left text-xl md:text-2xl font-semibold tracking-tight transition-colors " + (i === k ? "text-white" : "text-white/45 hover:text-white/80")}>{x.w}<ArrowRight className={"h-6 w-6 shrink-0 " + (i === k ? "text-lb" : "text-white/25")} strokeWidth={1.75} /></button></li>
        ))}
      </ul>
      <div role="tabpanel" className="md:pt-5"><p className="text-xl md:text-2xl leading-relaxed text-white/85 max-w-xl">{WHO[i].a}</p><Link href={WHO[i].cta[1]} className="pill-link group/pl">{WHO[i].cta[0]} <Arr /></Link></div>
    </div>
  );
}
