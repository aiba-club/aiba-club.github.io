import Link from "next/link";
import { notFound } from "next/navigation";
import LessonTabs from "@/components/LessonTabs";
import { LESSONS } from "@/data/lessons";
export function generateStaticParams() { return LESSONS.map((l) => ({ slug: l.slug })); }
export default async function Lesson({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = LESSONS.findIndex((l) => l.slug === slug);
  if (i < 0) notFound();
  const l = LESSONS[i], prev = LESSONS[i - 1], next = LESSONS[i + 1];
  return (
    <div className="wrap pt-36">
      <Link href="/lessons" className="text-sm text-mute hover:text-white">← All lessons</Link>
      <p className="eyebrow mt-8">Lesson {l.n}</p>
      <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mt-2">{l.title}</h1>
      <p className="mt-4 text-white/70 max-w-xl">{l.summary}</p>
      <div className="mt-6 flex flex-wrap items-center gap-3 text-sm"><span className="rounded-full bg-lb text-black px-3 py-1 font-medium">You&rsquo;ll make: {l.makes}</span>{l.tools.map((t) => <span key={t} className="rounded-full border border-line px-3 py-1 text-white/75">{t}</span>)}<span className="text-mute">{l.duration}</span></div>
      <LessonTabs lesson={l} />
      <div className="mt-16 grid grid-cols-2 border-t border-line">
        {prev ? <Link href={`/lessons/${prev.slug}`} className="py-8 hover:text-lb"><div className="text-sm text-mute">← Previous</div>{prev.title}</Link> : <span />}
        {next ? <Link href={`/lessons/${next.slug}`} className="py-8 text-right hover:text-lb"><div className="text-sm text-mute">Next →</div>{next.title}</Link> : <span />}
      </div>
    </div>
  );
}
