"use client";
import { useRef, useState } from "react";
import BrandIcon from "@/components/BrandIcon";
import type { Lesson } from "@/data/lessons";
import type { KitTool } from "@/data/lesson-guides";

const TABS = ["Presentation", "Video", "Tutorial", "Resources"] as const;
type Tab = (typeof TABS)[number];

function Soon({ what }: { what: string }) {
  return <div className="grid aspect-video max-w-4xl place-items-center rounded-[28px] border border-white/12 bg-white/[0.03] p-8 text-center"><div><p className="text-2xl font-semibold">{what} coming soon.</p><p className="mt-2 text-white/60">We&rsquo;ll post it here after the lesson.</p></div></div>;
}

// Shows [BRACKETS] in a prompt highlighted, so people see what to fill in.
function PromptText({ text }: { text: string }) {
  return <>{text.split(/(\[[^\]]+\])/g).map((part, i) => part.startsWith("[") ? <mark key={i} className="rounded bg-lb/15 px-1 text-lb">{part}</mark> : part)}</>;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => { try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch { /* clipboard blocked */ } };
  return <button type="button" onClick={copy} className="shrink-0 rounded-full border border-line px-3.5 py-1.5 text-xs font-medium text-white/80 transition-colors hover:border-lb hover:text-lb">{copied ? "Copied" : "Copy prompt"}</button>;
}

function PromptBox({ tool, text }: { tool: string; text: string }) {
  return (
    <div className="rounded-[20px] border border-line bg-white/[0.03]">
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3">
        <span className="text-sm text-white/60">Prompt <span className="text-white/35">·</span> paste into <span className="text-white">{tool}</span></span>
        <CopyButton text={text} />
      </div>
      <pre className="whitespace-pre-wrap break-words px-5 py-4 font-mono text-[13px] leading-relaxed text-white/85"><PromptText text={text} /></pre>
    </div>
  );
}

function Heading({ n, title, sub }: { n: string; title: string; sub?: string }) {
  return <div className="mb-8"><p className="eyebrow">{n}</p><h2 className="mt-2 text-2xl md:text-3xl tracking-tight">{title}</h2>{sub && <p className="mt-3 max-w-2xl leading-relaxed text-white/60">{sub}</p>}</div>;
}

function ToolCard({ t }: { t: KitTool }) {
  return (
    <div className="flex flex-col rounded-[24px] border border-line p-6">
      <div className="flex items-center gap-3"><BrandIcon slug={t.icon} label={t.name} size={26} /><span className="text-lg font-medium">{t.name}</span></div>
      <p className="mt-4 leading-relaxed text-white/70">{t.role}</p>
      {t.note && <p className="mt-3 text-sm leading-relaxed text-white/50">{t.note}</p>}
      <div className="mt-auto pt-6"><a href={t.href} target="_blank" rel="noreferrer" className="btn btn-line !px-4 !py-2 text-sm">Open {t.name} ↗</a></div>
    </div>
  );
}

export default function LessonTabs({ lesson }: { lesson: Lesson }) {
  const [tab, setTab] = useState<Tab>("Presentation");
  const [vid, setVid] = useState(0);
  const [done, setDone] = useState<Record<number, boolean>>({});
  const [filter, setFilter] = useState<string>("All");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const key = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const n = (i + (e.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length;
    setTab(TABS[n]); refs.current[n]?.focus();
  };
  const videos = lesson.videos ?? [];
  const steps = lesson.tutorial?.steps ?? [];
  const finished = Object.values(done).filter(Boolean).length;
  const kit = lesson.kit ?? [];
  const withPrompts = kit.filter((t) => t.prompts?.length);
  const links = lesson.links ?? [];
  const v = videos[vid];

  return (
    <div className="mt-12">
      <div role="tablist" aria-label="Lesson sections" className="no-scrollbar flex gap-1 overflow-x-auto border-b border-line">
        {TABS.map((t, i) => (
          <button key={t} ref={(el) => { refs.current[i] = el; }} role="tab" id={`tab-${t}`} aria-selected={tab === t} aria-controls={`panel-${t}`} tabIndex={tab === t ? 0 : -1} onKeyDown={(e) => key(e, i)} onClick={() => setTab(t)}
            className={"-mb-px whitespace-nowrap border-b-2 px-4 py-3 transition-colors sm:px-5 " + (tab === t ? "border-lb font-medium text-white" : "border-transparent text-white/55 hover:text-white")}>{t}</button>
        ))}
      </div>

      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="pt-10">
        {/* ---------- Presentation ---------- */}
        {tab === "Presentation" && (lesson.slides
          ? (
            <div className="max-w-4xl">
              <div className="aspect-video overflow-hidden rounded-[28px] border border-line"><iframe src={lesson.slides} className="h-full w-full" allowFullScreen title={`${lesson.title} slides`} /></div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-[20px] border border-line px-5 py-4">
                <p className="text-sm text-white/60">Slides not loading, or want them full screen?</p>
                <a href={lesson.slides.replace(/\/embed.*$/, "/edit?usp=sharing").replace(/\/preview$/, "/view")} target="_blank" rel="noreferrer" className="btn btn-line !px-4 !py-2 text-sm">Open slides in a new tab ↗</a>
              </div>
            </div>
          )
          : <Soon what="Presentation" />)}

        {/* ---------- Video ---------- */}
        {tab === "Video" && (v
          ? (
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
              <div>
                <div className="aspect-video overflow-hidden rounded-[28px] border border-line">
                  <iframe key={v.id} src={`https://www.youtube.com/embed/${v.id}`} className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen title={v.title} />
                </div>
                <h3 className="mt-6 text-xl md:text-2xl tracking-tight">{v.title}</h3>
                <p className="mt-2 text-sm text-white/50">{v.by} · {v.mins} min</p>
                <p className="mt-4 max-w-2xl leading-relaxed text-white/70">{v.about}</p>
              </div>
              {videos.length > 1 && (
                <div>
                  <p className="eyebrow mb-4">{videos.length} short videos</p>
                  <ul className="space-y-3">
                    {videos.map((x, i) => (
                      <li key={x.id}>
                        <button type="button" onClick={() => setVid(i)} aria-current={i === vid}
                          className={"flex w-full gap-4 rounded-[20px] border p-3 text-left transition-colors " + (i === vid ? "border-lb/60 bg-lb/[0.06]" : "border-line hover:border-white/30")}>
                          <img src={`https://i.ytimg.com/vi/${x.id}/mqdefault.jpg`} alt="" className="aspect-video w-28 shrink-0 rounded-xl object-cover" />
                          <span className="min-w-0"><span className="block text-sm font-medium leading-snug">{x.title}</span><span className="mt-1.5 block text-xs text-white/50">{x.by} · {x.mins} min</span></span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )
          : <Soon what="Video" />)}

        {/* ---------- Tutorial ---------- */}
        {tab === "Tutorial" && (steps.length
          ? (
            <div className="max-w-3xl">
              {lesson.tutorial?.intro && <p className="text-lg leading-relaxed text-white/80">{lesson.tutorial.intro}</p>}
              <div className="mt-8 flex items-center gap-4">
                <div className="h-1.5 flex-1 rounded-full bg-white/10"><div className="h-full rounded-full bg-lb transition-all" style={{ width: `${(finished / steps.length) * 100}%` }} /></div>
                <span className="shrink-0 text-sm text-white/50">{finished} of {steps.length} done</span>
              </div>
              <ol className="mt-12 space-y-14">
                {steps.map((s, i) => (
                  <li key={s.title} className="grid grid-cols-[44px_minmax(0,1fr)] gap-x-5 sm:grid-cols-[56px_minmax(0,1fr)]">
                    <span className={"grid h-11 w-11 place-items-center rounded-full border font-mono text-sm sm:h-14 sm:w-14 " + (done[i] ? "border-lb bg-lb text-black" : "border-line text-white/70")}>{done[i] ? "✓" : String(i + 1).padStart(2, "0")}</span>
                    <div className="pt-1.5 sm:pt-3">
                      <h3 className="text-xl md:text-2xl tracking-tight">{s.title}</h3>
                      <div className="mt-4 space-y-4 leading-relaxed text-white/70">{s.body.map((p, j) => <p key={j}>{p}</p>)}</div>
                      {s.tip && <p className="mt-6 rounded-[16px] border-l-2 border-lb bg-lb/[0.06] px-5 py-4 text-sm leading-relaxed text-white/75"><span className="font-medium text-lb">Tip. </span>{s.tip}</p>}
                      {s.prompt && <div className="mt-6"><PromptBox tool={s.prompt.tool} text={s.prompt.text} /></div>}
                      <label className="mt-6 inline-flex cursor-pointer select-none items-center gap-2.5 text-sm text-white/55 hover:text-white">
                        <input type="checkbox" checked={!!done[i]} onChange={() => setDone((d) => ({ ...d, [i]: !d[i] }))} className="h-4 w-4 accent-[#8cc8ff]" />
                        Mark step {i + 1} as done
                      </label>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )
          : <Soon what="Tutorial" />)}

        {/* ---------- Resources ---------- */}
        {tab === "Resources" && (kit.length || links.length
          ? (
            <div className="space-y-20">
              {kit.length > 0 && (
                <section>
                  <Heading n="01" title="Tools used in this lesson" sub="What each one is for, and a link to open it." />
                  <div className={"grid gap-4 sm:grid-cols-2 " + (kit.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3")}>{kit.map((t) => <ToolCard key={t.name} t={t} />)}</div>
                </section>
              )}
              {withPrompts.length > 0 && (
                <section>
                  <Heading n="02" title="Prompts" sub="Copy one, fill in the highlighted [BRACKETS], and paste it into the tool shown. Each one says which tutorial step it belongs to and when to use it." />
                  <div className="no-scrollbar -mx-1 mb-10 flex gap-2 overflow-x-auto px-1">
                    {["All", ...withPrompts.map((t) => t.name)].map((n) => (
                      <button key={n} type="button" onClick={() => setFilter(n)} aria-pressed={filter === n}
                        className={"shrink-0 rounded-full border px-4 py-2 text-sm transition-colors " + (filter === n ? "border-white bg-white text-black" : "border-line text-white/70 hover:border-white/40 hover:text-white")}>{n}</button>
                    ))}
                  </div>
                  <div className="space-y-16">
                    {withPrompts.filter((t) => filter === "All" || t.name === filter).map((t) => (
                      <div key={t.name}>
                        <div className="mb-6 flex flex-wrap items-center gap-3"><BrandIcon slug={t.icon} label={t.name} size={22} /><h3 className="text-xl tracking-tight">Use in {t.name}</h3><span className="text-sm text-white/40">{t.prompts!.length} prompts</span></div>
                        <div className="grid gap-5 lg:grid-cols-2">
                          {[...t.prompts!].sort((a, b) => (a.step ?? 99) - (b.step ?? 99)).map((p) => (
                            <article key={p.title} className="flex flex-col rounded-[24px] border border-line p-6">
                              <div className="flex flex-wrap items-center gap-2 text-xs">
                                {p.step && <span className="rounded-full bg-lb px-2.5 py-1 font-medium text-black">Step {p.step}</span>}
                                <span className="rounded-full border border-line px-2.5 py-1 text-white/70">{t.name}</span>
                              </div>
                              <h4 className="mt-4 text-lg font-medium">{p.title}</h4>
                              <p className="mt-2 text-sm leading-relaxed text-white/55"><span className="text-white/80">When: </span>{p.when}</p>
                              <pre className="mt-5 flex-1 whitespace-pre-wrap break-words rounded-[16px] bg-black/30 p-4 font-mono text-[13px] leading-relaxed text-white/85"><PromptText text={p.text} /></pre>
                              <div className="mt-5"><CopyButton text={p.text} /></div>
                            </article>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
              {links.length > 0 && (
                <section>
                  <Heading n={withPrompts.length ? "03" : "01"} title="Slides and links" />
                  <ul className="max-w-3xl divide-y divide-line border-y border-line">
                    {links.map((r) => <li key={r.label}><a href={r.href} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-6 py-5 hover:text-lb"><span>{r.label}</span><span className="shrink-0 text-sm text-white/45">{r.kind} ↗</span></a></li>)}
                  </ul>
                </section>
              )}
            </div>
          )
          : <Soon what="Resources" />)}
      </div>
    </div>
  );
}
