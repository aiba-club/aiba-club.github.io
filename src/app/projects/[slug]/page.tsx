import Link from "next/link";
import { notFound } from "next/navigation";
import Counter from "@/components/Counter";
import { PROJECTS } from "@/data/projects";
export function generateStaticParams() { return PROJECTS.map((p) => ({ slug: p.slug })); }
export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  if (i < 0) notFound();
  const p = PROJECTS[i], nx = PROJECTS[(i + 1) % PROJECTS.length];
  return (
    <div className="pt-36">
      <div className="wrap">
        <Link href="/projects" className="inline-block py-3 text-sm text-mute hover:text-white">← All projects</Link>
        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm"><span className="eyebrow">{p.kind} · {p.year}</span><span className={"rounded-full border px-3 py-0.5 " + (p.status === "Live" ? "border-lb text-lb" : "border-line text-white/60")}>{p.status}</span></div>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mt-3">{p.title}</h1>
        <p className="mt-5 text-lg md:text-xl text-white/75 max-w-3xl">{p.description}</p>
        <img src={p.image} alt={p.title} className="mt-12 w-full rounded-2xl border border-line aspect-[2/1] object-cover" />
      </div>
      <section className="border-y border-line mt-14"><div className="wrap grid grid-cols-3 py-10 text-center">{p.metrics.map((m) => <div key={m.label}><div className="text-3xl md:text-5xl font-semibold"><Counter value={m.value} prefix={m.prefix} suffix={m.suffix} fontSize={48} textColor="#ffffff" /></div><div className="mt-1 text-sm text-white/60">{m.label}</div></div>)}</div></section>
      <div className="wrap py-16 grid md:grid-cols-2 gap-14">
        <div><h2 className="text-3xl font-semibold tracking-tight">The problem.</h2><p className="mt-3 text-lg text-white/75">{p.problem}</p>
          <h2 className="mt-12 text-3xl font-semibold tracking-tight">Results.</h2><ul className="mt-3 space-y-2 text-lg text-white/75">{p.results.map((r) => <li key={r}>{r}</li>)}</ul>
          <h2 className="mt-12 text-3xl font-semibold tracking-tight">Team.</h2><p className="mt-3 text-lg text-white/75">{p.team.join(", ")}</p>
          <h2 className="mt-12 text-3xl font-semibold tracking-tight">Tools used.</h2><div className="mt-4 flex flex-wrap gap-2">{p.tools.map((t) => <span key={t} className="rounded-full border border-line px-4 py-1.5">{t}</span>)}</div></div>
        <div><h2 className="text-3xl font-semibold tracking-tight">How it got built.</h2><ol className="mt-6 border-l border-line">{p.built.map((b) => <li key={b.when} className="relative pl-8 pb-8"><span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-lb" /><p className="text-lb text-sm">{b.when}</p><p className="text-white/80">{b.what}</p></li>)}</ol></div>
      </div>
      <Link href={`/projects/${nx.slug}`} className="block border-t border-line py-12 hover:text-lb"><div className="wrap"><div className="text-sm text-mute">Next project →</div><div className="text-3xl md:text-5xl font-semibold tracking-tight">{nx.title}</div></div></Link>
    </div>
  );
}
