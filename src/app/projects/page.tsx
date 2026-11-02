import Link from "next/link";
import Safe from "@/components/Safe";
import InfiniteMenu from "@/components/InfiniteMenu";
import PageHeader from "@/components/PageHeader";
import { PROJECTS } from "@/data/projects";
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
      <section className="border-t border-line"><div className="wrap py-20 flex flex-wrap items-center justify-between gap-6"><div><h2 className="text-2xl md:text-4xl font-semibold tracking-tight">Have an idea?</h2><p className="mt-2 text-white/65">Bring it to any Wednesday. We&rsquo;ll help you find a team.</p></div><Link href="/contact" className="btn btn-solid">Pitch it →</Link></div></section>
    </>
  );
}
