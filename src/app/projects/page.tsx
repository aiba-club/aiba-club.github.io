import Link from "next/link";
import Safe from "@/components/Safe";
import InfiniteMenu from "@/components/InfiniteMenu";
import PageHeader from "@/components/PageHeader";
import { PROJECTS } from "@/data/projects";
import { APPS } from "@/data/apps";
export const metadata = { title: "Projects — AIBA" };
export default function Projects() {
  // One sphere tile per App Store screenshot, interleaved so neighbours come from different apps.
  const rounds = Math.max(...APPS.map((a) => a.shots));
  const items = Array.from({ length: rounds }, (_, i) => APPS.filter((a) => i < a.shots).map((a) => ({ image: `/apps/${a.slug}-${i + 1}.jpg`, title: a.name, description: `Built with ${a.builtWith}. ${a.what}`, link: a.link }))).flat();
  return (
    <>
      <PageHeader eyebrow="On the market" title="Real apps, made with AI." lede="Apps on the App Store whose makers say they built them with AI tools. Every tile is a real App Store screenshot. Drag the sphere and tap one to open the app. These are not AIBA projects; ours are below." />
      <div className="h-[75vh] min-h-[500px] relative border-b border-line"><Safe><InfiniteMenu items={items} backgroundColor="#050b1a" accentColor="#8cc8ff" /></Safe></div>
      <section className="wrap py-20">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-lb">Student work</p>
        <h2 className="mt-3 text-2xl md:text-4xl font-semibold tracking-tight">Things we built.</h2>
        <p className="mt-3 max-w-2xl text-white/65">Sample projects made by members with AI tools, in a few weeks.</p>
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
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-lb">On the App Store</p>
          <h2 className="mt-3 text-2xl md:text-4xl font-semibold tracking-tight">How they were made.</h2>
          <p className="mt-3 max-w-2xl text-white/65">None of these are AIBA projects. &ldquo;Built with&rdquo; is what each maker has said publicly; Apple doesn&rsquo;t label AI-built apps.</p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {APPS.map((a) => (
              <li key={a.slug} className="flex flex-col overflow-hidden rounded-[32px] border border-white/12 bg-white/[0.03]">
                <div className="relative h-56 overflow-hidden bg-[radial-gradient(circle_at_30%_20%,rgba(140,200,255,.35),rgba(10,42,107,.5))]"><img src={a.image} alt={`${a.name} screenshot`} loading="lazy" className="mx-auto mt-6 h-full w-auto rounded-t-2xl border border-white/20 object-cover object-top shadow-[0_20px_40px_rgba(0,0,0,.45)]" /></div>
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-start justify-between gap-3"><h3 className="text-2xl font-semibold">{a.name}</h3><span className="shrink-0 rounded-full border border-white/20 px-3 py-0.5 text-xs text-white/60">{a.category}</span></div>
                  <p className="mt-3 text-white/75">{a.what}</p>
                  <dl className="mt-5 space-y-3 text-sm">
                    <div><dt className="font-mono text-xs uppercase tracking-widest text-lb">Made by</dt><dd className="mt-0.5 text-white/70">{a.maker}</dd></div>
                    <div><dt className="font-mono text-xs uppercase tracking-widest text-lb">Built with</dt><dd className="mt-0.5 text-white/70">{a.builtWith}</dd></div>
                  </dl>
                  <div className="mt-auto flex flex-wrap gap-x-5 pt-6">
                    <a href={a.link} target="_blank" rel="noopener noreferrer" className="py-2.5 font-semibold text-lb underline decoration-2 underline-offset-4 hover:text-white">App Store ↗</a>
                    {a.source && <a href={a.source.url} target="_blank" rel="noopener noreferrer" className="py-2.5 text-white/60 underline underline-offset-4 hover:text-white">{a.source.label} ↗</a>}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="border-t border-line"><div className="wrap py-20 flex flex-wrap items-center justify-between gap-6"><div><h2 className="text-2xl md:text-4xl font-semibold tracking-tight">Have an idea?</h2><p className="mt-2 text-white/65">Bring it to any Wednesday. We&rsquo;ll help you find a team.</p></div><Link href="/contact" className="btn btn-solid">Pitch it →</Link></div></section>
    </>
  );
}
