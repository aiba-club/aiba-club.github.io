"use client";
import { useEffect, useState } from "react";
import { loadDone } from "@/lib/lesson-progress";

// "4 of 10 steps done" on a lesson card, once someone has started that lesson's tutorial.
export default function LessonProgress({ slug, total }: { slug: string; total: number }) {
  const [n, setN] = useState(0);
  useEffect(() => { setN(loadDone(slug).filter((i) => i < total).length); }, [slug, total]);
  if (!total || !n) return null;
  return (
    <div className="mt-5">
      <div className="flex items-center justify-between text-xs"><span className="text-white/55">Your progress</span><span className="text-lb">{n === total ? "Done" : `${n} of ${total} steps`}</span></div>
      <div className="mt-2 h-1 rounded-full bg-white/10"><div className="h-full rounded-full bg-lb" style={{ width: `${(n / total) * 100}%` }} /></div>
    </div>
  );
}
