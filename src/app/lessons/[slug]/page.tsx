import Link from "next/link";
import { notFound } from "next/navigation";
import LessonTabs from "@/components/LessonTabs";
import { LESSONS } from "@/data/lessons";

const OPEN = LESSONS.filter((l) => l.status === "done");
export function generateStaticParams() { return OPEN.map((l) => ({ slug: l.slug })); }
export default async function Lesson({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = OPEN.findIndex((l) => l.slug === slug);
  if (i < 0) notFound();
  const l = OPEN[i], prev = OPEN[i - 1], next = OPEN[i + 1];
  return (
    <div className="wrap pt-36 pb-16">
      <Link href="/lessons" className="inline-block py-3 text-sm text-mute hover:text-white">← All lessons</Link>
      <p className="eyebrow mt-8">{l.date}</p>
      <h1 className="mt-2 text-3xl md:text-5xl font-semibold tracking-tight">{l.title}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">{l.summary}</p>
      {l.goal && <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-lb px-4 py-1.5 text-sm font-medium text-black">Goal: {l.goal}</p>}
      <LessonTabs lesson={l} />
      <nav aria-label="More lessons" className="mt-24 grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
        {prev ? (
          <Link href={`/lessons/${prev.slug}`} className="group flex flex-col rounded-[24px] border border-line p-6 transition-colors hover:border-lb/60 hover:bg-white/[0.03]">
            <span className="eyebrow !text-white/50 transition-colors group-hover:!text-lb">← Previous lesson</span>
            <span className="mt-4 font-display text-xl md:text-2xl font-semibold tracking-tight">{prev.title}</span>
            <span className="mt-2 text-sm text-white/45">{prev.date}</span>
          </Link>
        ) : <span className="hidden sm:block" />}
        {next ? (
          <Link href={`/lessons/${next.slug}`} className="group flex flex-col items-end rounded-[24px] border border-line p-6 text-right transition-colors hover:border-lb/60 hover:bg-white/[0.03]">
            <span className="eyebrow !text-white/50 transition-colors group-hover:!text-lb">Next lesson →</span>
            <span className="mt-4 font-display text-xl md:text-2xl font-semibold tracking-tight">{next.title}</span>
            <span className="mt-2 text-sm text-white/45">{next.date}</span>
          </Link>
        ) : (
          <Link href="/lessons" className="group flex flex-col items-end rounded-[24px] border border-line p-6 text-right transition-colors hover:border-lb/60 hover:bg-white/[0.03]">
            <span className="eyebrow !text-white/50 transition-colors group-hover:!text-lb">Up next →</span>
            <span className="mt-4 font-display text-xl md:text-2xl font-semibold tracking-tight">See the full schedule</span>
            <span className="mt-2 text-sm text-white/45">Upcoming lessons</span>
          </Link>
        )}
      </nav>
    </div>
  );
}
