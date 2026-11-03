import Link from "next/link";
import Topography from "@/components/Topography";
import PageHeader from "@/components/PageHeader";
import Arr from "@/components/Arr";
import { LESSONS } from "@/data/lessons";

export const metadata = { title: "Lessons — AIBA" };

export default function Lessons() {
  return (
    <>
      <PageHeader eyebrow="Curriculum" title="Lessons, from idea to launch." lede="One tool at a time. Each lesson ends with something you built and a goal to prove it works." bg={<Topography color="#8cc8ff" />} />
      <div className="wrap py-12 md:py-16">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LESSONS.map((l) => {
            const open = l.status === "done";
            const body = (
              <>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-lb">{l.date}</p>
                <h2 className="mt-2 text-xl font-semibold tracking-tight">{l.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{l.summary}</p>
                {open ? (
                  <>
                    {l.goal && <div className="mt-5 rounded-[22px] border border-white/10 px-4 py-3"><p className="font-mono text-xs uppercase tracking-[0.14em] text-white/45">Goal</p><p className="mt-1 text-sm font-medium">{l.goal}</p></div>}
                    <span className="mt-auto pt-6 self-start"><span className="pill-link group/pl group-hover:bg-[#8cc8ff] group-hover:text-[#050b1a]">Open lesson <Arr /></span></span>
                  </>
                ) : (
                  <div className="relative mt-5 overflow-hidden rounded-[22px] border border-white/10">
                    <div aria-hidden className="select-none px-4 py-4 blur-[7px]">
                      <p className="font-mono text-xs uppercase tracking-[0.14em] text-white/45">Goal</p>
                      <p className="mt-1 text-sm font-medium">{l.goal ?? "Lesson details"}</p>
                    </div>
                    <span className="absolute inset-0 grid place-items-center"><span className="rounded-full border border-white/25 bg-[#050b1a]/80 px-3.5 py-1.5 text-xs font-semibold text-white/85 backdrop-blur">Lesson not available yet</span></span>
                  </div>
                )}
              </>
            );
            const cls = "group flex h-full flex-col rounded-[32px] border p-7 transition-all duration-200 ";
            return (
              <li key={l.slug}>
                {open
                  ? <Link href={`/lessons/${l.slug}`} className={cls + "border-white/15 bg-white/[0.04] hover:-translate-y-1 hover:border-lb/60"}>{body}</Link>
                  : <div className={cls + "border-white/10 bg-white/[0.02]"}>{body}</div>}
              </li>
            );
          })}
        </ul>
        <p className="mt-8 text-sm text-white/50">More lessons will be added through the year. Slides are posted on each lesson page after we teach it.</p>
      </div>
    </>
  );
}
