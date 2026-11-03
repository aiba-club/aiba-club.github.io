"use client";
import { useState } from "react";
import Link from "next/link";
import { FAQ } from "@/data/faq";
import Arr from "@/components/Arr";
export default function FaqPreview() {
  const [open, setOpen] = useState<number | null>(0);
  const items = [0, 1, 2, 10, 14, 24].map((i) => FAQ[i]).filter(Boolean);
  return (
    <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10">
      <div><h2 className="text-3xl md:text-4xl font-bold tracking-tight">Questions people ask first.</h2><p className="mt-3 text-white/65 max-w-sm">Short answers. There are {FAQ.length} more on the FAQ page, and the assistant in the corner can answer them too.</p><Link href="/faq" className="pill-link group/pl">See all {FAQ.length} <Arr /></Link></div>
      <div className="divide-y divide-white/12 border-y border-white/12">{items.map((f, k) => <div key={f.id}><button onClick={() => setOpen(open === k ? null : k)} aria-expanded={open === k} className="flex w-full justify-between gap-6 py-5 text-left text-lg font-medium"><span>{f.q}</span><span className="text-lb">{open === k ? "−" : "+"}</span></button>{open === k && <p className="pb-5 text-white/65 max-w-xl">{f.a}</p>}</div>)}</div>
    </div>
  );
}
