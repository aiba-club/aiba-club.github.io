import Link from "next/link";
import Safe from "@/components/Safe";
import InfiniteMenu from "@/components/InfiniteMenu";
import PageHeader from "@/components/PageHeader";
import { PROJECTS } from "@/data/projects";
import { INSPIRATION } from "@/data/inspiration";
export const metadata = { title: "Projects — AIBA" };
export default function Projects() {
  const items = PROJECTS.map((p) => ({ image: p.image, title: p.title, description: p.description, link: `/projects/${p.slug}` }));
  return (
    <>
      <PageHeader eyebrow="Student work" title="Things we built." lede="Every project here was made by members, with AI tools, in a few weeks. Drag the sphere to explore, or pick one below." />
      <div className="h-[75vh] min-h-[500px] relative border-b border-line"><Safe><InfiniteMenu items={items} backgroundColor="#050b1a" accentColor="#8cc8ff" /></Safe></div>
      <section className="wrap py-20">
        <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">All projects.</h2>
        <ul className="mt-10 grid sm:grid-cols-2 gap-6">
          {PROJECTS.map((p) => (
            <li key={p.slug}><Link href={`/projects/${p.slug}`} className="group block">
              <div className="overflow-hidden rounded-2xl border border-line"><img src={p.image} alt={p.title} className="w-full aspect-[3/2] object-cover group-hover:scale-105 transition-transform duration-500" /></div>
              <div className="mt-4 flex items-center justify-between gap-4"><h3 className="text-2xl font-semibold group-hover:text-lb transition-colors">{p.title}</h3><span className={"rounded-full border px-3 py-0.5 text-xs " + (p.status === "Live" ? "border-lb text-lb" : "border-line text-white/60")}>{p.status}</span></div>
              <p className="mt-1 text-white/65">{p.description}</p>
              <p className="mt-2 text-sm text-white/45">{p.tools.join(" · ")}</p>
            </Link></li>
          ))}
        </ul>
      </section>
      <section className="border-t border-line">
        <div className="wrap py-20">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-lb">Inspiration</p>
          <h2 className="mt-3 text-2xl md:text-4xl font-semibold tracking-tight">Real apps, built with AI.</h2>
          <p className="mt-3 max-w-2xl text-white/65">These are not AIBA projects. They are apps on the market today, made by people with AI tools, to show what&rsquo;s possible.</p>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {INSPIRATION.map((a) => (
              <li key={a.name} className="flex flex-col rounded-[32px] border border-white/12 bg-white/[0.03] p-7">
                <div className="flex items-start justify-between gap-3"><h3 className="text-2xl font-semibold">{a.name}</h3><span className="shrink-0 rounded-full border border-white/20 px-3 py-0.5 text-xs text-white/60">{a.kind}</span></div>
                <p className="mt-3 text-white/75">{a.what}</p>
                <dl className="mt-5 space-y-3 text-sm">
                  <div><dt className="font-mono text-[11px] uppercase tracking-widest text-lb">Made by</dt><dd className="mt-0.5 text-white/70">{a.who}</dd></div>
                  <div><dt className="font-mono text-[11px] uppercase tracking-widest text-lb">Built with</dt><dd className="mt-0.5 text-white/70">{a.builtWith}</dd></div>
                  <div><dt className="font-mono text-[11px] uppercase tracking-widest text-lb">Why it matters</dt><dd className="mt-0.5 text-white/70">{a.fact}</dd></div>
                </dl>
                <a href={a.link} target="_blank" rel="noopener noreferrer" className="mt-auto pt-6 py-2.5 font-semibold text-lb underline decoration-2 underline-offset-4 hover:text-white">{a.linkLabel} ↗</a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="border-t border-line"><div className="wrap py-20 flex flex-wrap items-center justify-between gap-6"><div><h2 className="text-2xl md:text-4xl font-semibold tracking-tight">Have an idea?</h2><p className="mt-2 text-white/65">Bring it to any Wednesday. We&rsquo;ll help you find a team.</p></div><Link href="/contact" className="btn btn-solid">Pitch it →</Link></div></section>
    </>
  );
}
