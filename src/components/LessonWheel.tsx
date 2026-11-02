"use client";
import { useState } from "react";
import Link from "next/link";
import OptionWheel from "./OptionWheel";
import { LESSONS } from "@/data/lessons";

export default function LessonWheel() {
  const start = Math.max(0, LESSONS.findIndex((l) => l.status === "next"));
  const [i, setI] = useState(start);
  const l = LESSONS[i];
  return (
    <div className="grid md:grid-cols-2 gap-10 items-center">
      <div className="h-[380px]"><OptionWheel items={LESSONS.map((x) => `${x.n}  ${x.title}`)} defaultSelected={start} onChange={(idx) => setI(idx)} textColor="rgba(255,255,255,0.45)" activeColor="#8cc8ff" side="left" fontSize={1.8} /></div>
      <div className="card-glass p-8">
        <p className="eyebrow">Lesson {l.n} · {l.duration}</p>
        <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">{l.title}</h2>
        <p className="mt-3 text-white/70">{l.summary}</p>
        <Link href={`/lessons/${l.slug}`} className="btn btn-solid mt-6">Open lesson →</Link>
      </div>
    </div>
  );
}
