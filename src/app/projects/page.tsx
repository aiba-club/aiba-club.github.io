import Link from "next/link";
import Safe from "@/components/Safe";
import InfiniteMenu from "@/components/InfiniteMenu";
import PageHeader from "@/components/PageHeader";
import { IDEA_GROUPS, BIG_PROJECTS } from "@/data/projectIdeas";
import { APPS } from "@/data/apps";
import Arr from "@/components/Arr";
export const metadata = { title: "Projects — AIBA" };
export default function Projects() {
  // One sphere tile per App Store screenshot, interleaved so neighbours come from different apps.
  const rounds = Math.max(...APPS.map((a) => a.shots));
  const items = Array.from({ length: rounds }, (_, i) => APPS.filter((a) => i < a.shots).map((a) => ({ image: `/apps/${a.slug}-${i + 1}.jpg`, title: a.name, description: `Built with ${a.builtWith}. ${a.what}`, link: a.link }))).flat();
  return (
    <>
      <PageHeader eyebrow="On the market" title="Real apps, made with AI." lede="Apps on the App Store whose makers say they built them with AI tools. Every tile is a real App Store screenshot. Drag the sphere and tap one to open the app. These are not AIBA projects. The projects you can do are below." />
      <div className="h-[75vh] min-h-[500px] relative border-b border-line"><Safe><InfiniteMenu items={items} backgroundColor="#050b1a" accentColor="#8cc8ff" /></Safe></div>
      <section className="wrap py-20">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-lb">What you can build</p>
        <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight">Projects we&rsquo;ll do.</h2>
        <p className="mt-3 max-w-2xl text-white/65">Pick one from any category, or bring your own idea. Every project ends with something real you can show people.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {IDEA_GROUPS.map((g) => (
            <div key={g.title} className="rounded-[28px] border border-white/12 bg-white/[0.03] p-7">
              <h3 className="text-xl font-semibold">{g.title}</h3>
              <ul className="mt-4 space-y-2.5">{g.items.map((x) => <li key={x} className="flex gap-3 text-white/70"><span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lb" />{x}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>
      <section className="border-t border-line">
        <div className="wrap py-20 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-lb">Big goals</p><h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight">Finish something real.</h2><p className="mt-4 text-white/65">The larger projects members can take on from start to finish.</p>
            <dl className="mt-8 grid max-w-sm grid-cols-2 gap-3">{[[String(BIG_PROJECTS.length), "big goals"], [String(IDEA_GROUPS.length), "categories"]].map(([n, l]) => <div key={l} className="rounded-[24px] border border-white/12 bg-white/[0.04] px-5 py-4"><dt className="text-3xl font-semibold">{n}</dt><dd className="mt-1 text-xs uppercase tracking-[0.14em] text-white/55">{l}</dd></div>)}</dl>
            <div className="mt-4 max-w-sm rounded-[28px] border border-white/12 bg-white/[0.03] p-6"><p className="text-lg font-semibold">Not sure where to start?</p><p className="mt-2 text-white/65">Pick the one that sounds fun, or bring your own idea to any Wednesday. We&rsquo;ll help you find a team and a first step.</p><Link href="/contact" className="pill-link group/pl">Join the club <Arr /></Link></div>
          </div>
          <ol className="grid gap-2.5 sm:grid-cols-2">{BIG_PROJECTS.map((x, i) => <li key={x} className="flex gap-4 rounded-[24px] border border-white/12 bg-white/[0.03] px-5 py-4"><span className="font-mono text-sm text-lb">{String(i + 1).padStart(2, "0")}</span><span className="text-white/80">{x}</span></li>)}</ol>
        </div>
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
                    <a href={a.link} target="_blank" rel="noopener noreferrer" className="pill-link group/pl">App Store <Arr up /></a>
                    {a.source && <a href={a.source.url} target="_blank" rel="noopener noreferrer" className="pill-link pill-quiet group/pl">{a.source.label} <Arr up /></a>}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
