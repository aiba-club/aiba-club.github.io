import Link from "next/link";
import { notFound } from "next/navigation";
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
      <p className="mt-4 max-w-xl text-lg text-white/70">{l.summary}</p>
      {l.goal && <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-lb px-4 py-1.5 text-sm font-medium text-black">Goal: {l.goal}</p>}
      <section className="mt-10 max-w-4xl">
        <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-lb">Presentation</h2>
        {l.slides ? (
          <div className="mt-4 aspect-video overflow-hidden rounded-[28px] border border-line"><iframe src={l.slides} className="h-full w-full" allowFullScreen title={`${l.title} slides`} /></div>
        ) : (
          <div className="mt-4 grid aspect-video place-items-center rounded-[28px] border border-white/12 bg-white/[0.03] p-8 text-center"><div><p className="text-2xl font-semibold">Slides coming soon.</p><p className="mt-2 text-white/60">We&rsquo;ll post the presentation for this lesson here.</p></div></div>
        )}
      </section>
      <div className="mt-16 grid grid-cols-2 border-t border-line">
        {prev ? <Link href={`/lessons/${prev.slug}`} className="py-8 hover:text-lb"><div className="text-sm text-mute">← Previous</div>{prev.title}</Link> : <span />}
        {next ? <Link href={`/lessons/${next.slug}`} className="py-8 text-right hover:text-lb"><div className="text-sm text-mute">Next →</div>{next.title}</Link> : <span />}
      </div>
    </div>
  );
}
