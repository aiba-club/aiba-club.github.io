"use client";
import { ArrowUpRight, Check, Copy, RotateCcw } from "lucide-react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import BrandIcon from "@/components/BrandIcon";
import type { Lesson } from "@/data/lessons";
import type { KitTool, Prompt } from "@/data/lesson-guides";
import { loadDone, saveDone } from "@/lib/lesson-progress";

const TABS = ["Presentation", "Video", "Tutorial", "Resources"] as const;
type Tab = (typeof TABS)[number];
const up = <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />;

/* ---------- Fill-in blanks ----------
   Every [BRACKET] in a prompt is a box people type into. Answers are shared by every prompt on the lesson
   (fill in [APP NAME] once and it shows up everywhere) and saved in this browser. */
type Fills = { vals: Record<string, string>; set: (k: string, v: string) => void };
const FillCtx = createContext<Fills>({ vals: {}, set: () => {} });
const BLANK = /\[([^\]]+)\]/g;
const fill = (text: string, vals: Record<string, string>) => text.replace(BLANK, (m, k: string) => vals[k]?.trim() ? vals[k] : m);
const blanksLeft = (text: string, vals: Record<string, string>) => [...text.matchAll(BLANK)].filter((m) => !vals[m[1]]?.trim()).length;
const store = {
  get: (k: string) => { try { return JSON.parse(localStorage.getItem(k) ?? "null"); } catch { return null; } },
  set: (k: string, v: unknown) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage blocked */ } },
};

function PromptText({ text }: { text: string }) {
  const { vals, set } = useContext(FillCtx);
  return <>{text.split(/(\[[^\]]+\])/g).map((part, i) => {
    if (!part.startsWith("[")) return part;
    const k = part.slice(1, -1), v = vals[k] ?? "";
    // Pasted research or reviews can be long and have line breaks, so those get a box of their own.
    if (k.startsWith("PASTE")) return <textarea key={i} aria-label={k} value={v} placeholder={k.toLowerCase().replace(/^paste/, "Paste")} onChange={(e) => set(k, e.target.value)} rows={v ? 4 : 2}
      className="my-1 block w-full resize-y rounded-lg border border-dashed border-lb/40 bg-lb/[0.07] px-3 py-2 font-mono text-[13px] text-white placeholder:text-lb/70 outline-none focus:border-lb" />;
    return <input key={i} aria-label={k} value={v} placeholder={k} onChange={(e) => set(k, e.target.value)} size={Math.min(48, Math.max(3, (v || k).length))}
      className={"mx-0.5 max-w-full rounded-md px-1.5 py-0.5 align-baseline font-mono text-[13px] outline-none transition-colors focus:ring-1 focus:ring-lb " + (v ? "bg-white/10 text-white" : "bg-lb/15 text-lb placeholder:text-lb")} />;
  })}</>;
}

// Prompts open straight into these tools with the text already typed in.
const OPEN_IN: Record<string, (q: string) => string> = {
  Claude: (q) => `https://claude.ai/new?q=${encodeURIComponent(q)}`,
  ChatGPT: (q) => `https://chatgpt.com/?q=${encodeURIComponent(q)}`,
  Perplexity: (q) => `https://www.perplexity.ai/search?q=${encodeURIComponent(q)}`,
};

async function copyText(text: string) {
  try { await navigator.clipboard.writeText(text); return true; } catch {
    // School devices sometimes block the clipboard API; the old way still works there.
    const t = document.createElement("textarea"); t.value = text; t.style.position = "fixed"; t.style.opacity = "0";
    document.body.appendChild(t); t.select(); const ok = document.execCommand("copy"); t.remove(); return ok;
  }
}

function PromptActions({ tool, text }: { tool: string; text: string }) {
  const { vals } = useContext(FillCtx);
  const [copied, setCopied] = useState(false);
  const final = fill(text, vals), left = blanksLeft(text, vals);
  const open = OPEN_IN[tool];
  const copy = async () => { if (await copyText(final)) { setCopied(true); setTimeout(() => setCopied(false), 1600); } };
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button type="button" onClick={copy} className={"inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors " + (copied ? "border-lb bg-lb text-black" : "border-line text-white/85 hover:border-lb hover:text-lb")}>
        {copied ? <Check className="h-4 w-4" strokeWidth={2} /> : <Copy className="h-4 w-4" strokeWidth={1.75} />}{copied ? "Copied" : "Copy prompt"}
      </button>
      {open && final.length < 6000 && <a href={open(final)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-lb">Open in {tool}{up}</a>}
      <span className={"text-xs " + (left ? "text-white/45" : "text-lb")}>{left ? `${left} blank${left > 1 ? "s" : ""} to fill in` : "All filled in"}</span>
    </div>
  );
}

function PromptBox({ tool, text }: { tool: string; text: string }) {
  return (
    <div className="rounded-[20px] border border-line bg-white/[0.03]">
      <p className="border-b border-line px-5 py-3 text-sm text-white/60">Prompt <span className="text-white/35">·</span> use in <span className="text-white">{tool}</span></p>
      <pre className="whitespace-pre-wrap break-words px-5 py-4 font-mono text-[13px] leading-loose text-white/85"><PromptText text={text} /></pre>
      <div className="border-t border-line px-5 py-4"><PromptActions tool={tool} text={text} /></div>
    </div>
  );
}

function Heading({ n, title, sub, children }: { n: string; title: string; sub?: string; children?: React.ReactNode }) {
  return <div className="mb-8 flex flex-wrap items-end justify-between gap-6"><div><p className="eyebrow">{n}</p><h2 className="mt-2 text-2xl md:text-3xl tracking-tight">{title}</h2>{sub && <p className="mt-3 max-w-2xl leading-relaxed text-white/60">{sub}</p>}</div>{children}</div>;
}

function ToolCard({ t }: { t: KitTool }) {
  return (
    <div className="flex flex-col rounded-[24px] border border-line p-6">
      <div className="flex items-center gap-3"><BrandIcon slug={t.icon} label={t.name} size={26} /><span className="text-lg font-medium">{t.name}</span></div>
      <p className="mt-4 leading-relaxed text-white/70">{t.role}</p>
      {t.note && <p className="mt-3 text-sm leading-relaxed text-white/50">{t.note}</p>}
      <div className="mt-auto pt-6"><a href={t.href} target="_blank" rel="noreferrer" className="btn btn-line !px-4 !py-2 text-sm">Open {t.name}{up}</a></div>
    </div>
  );
}

function Soon({ what }: { what: string }) {
  return <div className="grid aspect-video max-w-4xl place-items-center rounded-[28px] border border-white/12 bg-white/[0.03] p-8 text-center"><div><p className="text-2xl font-semibold">{what} coming soon.</p><p className="mt-2 text-white/60">We&rsquo;ll post it here after the lesson.</p></div></div>;
}

export default function LessonTabs({ lesson }: { lesson: Lesson }) {
  const videos = lesson.videos ?? [];
  const steps = lesson.tutorial?.steps ?? [];
  const kit = lesson.kit ?? [];
  const withPrompts = kit.filter((t) => t.prompts?.length);
  const links = lesson.links ?? [];
  const slideLinks = links.filter((l) => l.kind === "Slides");
  const has: Record<Tab, boolean> = { Presentation: !!lesson.slides, Video: videos.length > 0, Tutorial: steps.length > 0, Resources: kit.length + links.length > 0 };
  // A lesson that already happened only shows the tabs it has. Upcoming ones show all four as "coming soon".
  const tabs = lesson.status === "done" ? TABS.filter((t) => has[t]) : [...TABS];

  const [tab, setTabState] = useState<Tab>(tabs[0] ?? "Presentation");
  const [vid, setVid] = useState(0);
  const [done, setDone] = useState<number[]>([]);
  const [vals, setVals] = useState<Record<string, string>>({});
  const [filter, setFilter] = useState<string>("All");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const fillKey = `aiba:fill:${lesson.slug}`;

  // Load saved progress and answers, and open the tab named in the link (#tutorial, #resources...).
  useEffect(() => {
    setDone(loadDone(lesson.slug));
    setVals(store.get(fillKey) ?? {});
    const fromHash = () => { const t = tabs.find((x) => x.toLowerCase() === location.hash.slice(1).toLowerCase()); if (t) setTabState(t); };
    fromHash(); window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson.slug]);

  const setTab = (t: Tab) => { setTabState(t); history.replaceState(null, "", `#${t.toLowerCase()}`); };
  const go = (t: Tab, id: string) => {
    setTab(t); if (t === "Resources") setFilter("All");
    setTimeout(() => { const el = document.getElementById(id); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: "smooth" }); }, 60);
  };
  const toggle = (i: number) => setDone((d) => { const n = d.includes(i) ? d.filter((x) => x !== i) : [...d, i]; saveDone(lesson.slug, n); return n; });
  const fills: Fills = { vals, set: (k, v) => setVals((o) => { const n = { ...o, [k]: v }; store.set(fillKey, n); return n; }) };
  const clearFills = () => { setVals({}); store.set(fillKey, {}); };

  const key = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const n = (i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
    setTab(tabs[n]); refs.current[n]?.focus();
  };
  const finished = done.filter((i) => i < steps.length).length;
  const firstOpen = steps.findIndex((_, i) => !done.includes(i));
  const promptsFor = (n: number) => withPrompts.flatMap((t) => t.prompts!.filter((p) => p.step === n));
  const v = videos[vid];
  const sorted = (ps: Prompt[]) => [...ps].sort((a, b) => (a.step ?? 99) - (b.step ?? 99));
  const filled = Object.values(vals).some((x) => x.trim());

  return (
    <FillCtx.Provider value={fills}>
    <div className="mt-12">
      <div role="tablist" aria-label="Lesson sections" className="no-scrollbar flex gap-1 overflow-x-auto border-b border-line">
        {tabs.map((t, i) => (
          <button key={t} ref={(el) => { refs.current[i] = el; }} role="tab" id={`tab-${t}`} aria-selected={tab === t} aria-controls={`panel-${t}`} tabIndex={tab === t ? 0 : -1} onKeyDown={(e) => key(e, i)} onClick={() => setTab(t)}
            className={"-mb-px whitespace-nowrap border-b-2 px-4 py-3 transition-colors sm:px-5 " + (tab === t ? "border-lb font-medium text-white" : "border-transparent text-white/55 hover:text-white")}>
            {t}{t === "Tutorial" && finished > 0 && <span className="ml-2 rounded-full bg-lb/15 px-2 py-0.5 text-xs text-lb">{finished}/{steps.length}</span>}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="pt-10">
        {/* ---------- Presentation ---------- */}
        {tab === "Presentation" && (lesson.slides
          ? (
            <div className="max-w-4xl">
              <div className="aspect-video overflow-hidden rounded-[28px] border border-line"><iframe src={lesson.slides} className="h-full w-full" allowFullScreen title={`${lesson.title} slides`} /></div>
              <div className="mt-6 rounded-[20px] border border-line px-5 py-5">
                <p className="text-sm leading-relaxed text-white/60">Slides not loading? Open them in Google Slides. On a school Chromebook, use the school account version.</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {slideLinks.length
                    ? slideLinks.map((s) => <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="btn btn-line !px-4 !py-2 text-sm">{s.label.match(/\((.+)\)/)?.[1]?.replace(/^./, (c) => c.toUpperCase()) ?? "Open slides"}{up}</a>)
                    : <a href={lesson.slides.replace(/\/embed.*$/, "/edit?usp=sharing").replace(/\/preview$/, "/view")} target="_blank" rel="noreferrer" className="btn btn-line !px-4 !py-2 text-sm">Open slides in a new tab{up}</a>}
                </div>
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
                  <iframe key={v.id} src={`https://www.youtube.com/embed/${v.id}?rel=0`} className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen title={v.title} />
                </div>
                <div className="mt-6 flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
                  <div className="min-w-0"><h3 className="text-xl md:text-2xl tracking-tight">{v.title}</h3><p className="mt-2 text-sm text-white/50">{v.by} · {v.mins} min</p></div>
                  <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noreferrer" className="btn btn-line shrink-0 !px-4 !py-2 text-sm">Watch on YouTube{up}</a>
                </div>
                <p className="mt-4 max-w-2xl leading-relaxed text-white/70">{v.about}</p>
                {videos.length > 1 && vid < videos.length - 1 && <button type="button" onClick={() => setVid(vid + 1)} className="mt-6 text-sm text-lb hover:underline">Up next: {videos[vid + 1].title}</button>}
              </div>
              {videos.length > 1 && (
                <div>
                  <p className="eyebrow mb-4">{videos.length} short videos · {videos.reduce((a, x) => a + x.mins, 0)} min total</p>
                  <ul className="space-y-3">
                    {videos.map((x, i) => (
                      <li key={x.id}>
                        <button type="button" onClick={() => setVid(i)} aria-current={i === vid}
                          className={"flex w-full gap-4 rounded-[20px] border p-3 text-left transition-colors " + (i === vid ? "border-lb/60 bg-lb/[0.06]" : "border-line hover:border-white/30")}>
                          <span className="relative shrink-0"><img src={`https://i.ytimg.com/vi/${x.id}/mqdefault.jpg`} alt="" className="aspect-video w-28 rounded-xl object-cover" /><span className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 text-[11px] text-white">{x.mins} min</span></span>
                          <span className="min-w-0"><span className="block text-sm font-medium leading-snug">{i + 1}. {x.title}</span><span className="mt-1.5 block text-xs text-white/50">{x.by}</span></span>
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
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="h-1.5 min-w-40 flex-1 rounded-full bg-white/10"><div className="h-full rounded-full bg-lb transition-all" style={{ width: `${(finished / steps.length) * 100}%` }} /></div>
                <span className="shrink-0 text-sm text-white/50">{finished === steps.length ? "All steps done" : `${finished} of ${steps.length} done`}</span>
                {finished > 0 && firstOpen >= 0 && <button type="button" onClick={() => go("Tutorial", `step-${firstOpen + 1}`)} className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-medium text-black hover:bg-lb">Continue at step {firstOpen + 1}</button>}
              </div>
              <p className="mt-3 text-xs text-white/40">Your progress and anything you type into the prompts is saved in this browser.</p>
              <ol className="mt-12 space-y-14">
                {steps.map((s, i) => {
                  const more = promptsFor(i + 1).filter((p) => p.text !== s.prompt?.text);
                  const isDone = done.includes(i);
                  return (
                    <li key={s.title} id={`step-${i + 1}`}>
                      <div className="flex items-start gap-4 sm:gap-5">
                      <button type="button" onClick={() => toggle(i)} aria-label={isDone ? `Mark step ${i + 1} as not done` : `Mark step ${i + 1} as done`}
                        className={"grid h-11 w-11 shrink-0 place-items-center rounded-full border font-mono text-sm transition-colors sm:h-14 sm:w-14 " + (isDone ? "border-lb bg-lb text-black" : "border-line text-white/70 hover:border-lb")}>{isDone ? <Check className="h-5 w-5" strokeWidth={2.25} /> : String(i + 1).padStart(2, "0")}</button>
                        <h3 className={"pt-2 text-xl md:text-2xl tracking-tight sm:pt-3 " + (isDone ? "text-white/60" : "")}>{s.title}</h3>
                      </div>
                      <div className="sm:pl-[76px]">
                        <div className="mt-4 space-y-4 leading-relaxed text-white/70">{s.body.map((p, j) => <p key={j}>{p}</p>)}</div>
                        {s.tip && <p className="mt-6 rounded-[16px] border-l-2 border-lb bg-lb/[0.06] px-5 py-4 text-sm leading-relaxed text-white/75"><span className="font-medium text-lb">Tip. </span>{s.tip}</p>}
                        {s.prompt && <div className="mt-6"><PromptBox tool={s.prompt.tool} text={s.prompt.text} /></div>}
                        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                          <button type="button" onClick={() => { toggle(i); if (!isDone && i + 1 < steps.length) go("Tutorial", `step-${i + 2}`); }}
                            className={"inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors " + (isDone ? "border-lb/50 text-lb" : "border-line text-white/80 hover:border-lb hover:text-lb")}>
                            <Check className="h-4 w-4" strokeWidth={2} />{isDone ? "Done" : "Mark as done"}
                          </button>
                          {more.length > 0 && <button type="button" onClick={() => go("Resources", `p-${i + 1}-0`)} className="text-sm text-white/55 hover:text-lb">{more.length} more prompt{more.length > 1 ? "s" : ""} for this step</button>}
                        </div>
                      </div>
                    </li>
                  );
                })}
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
                  <Heading n="02" title="Prompts" sub="Type your answers into the highlighted boxes. Anything you fill in once, like your app's name, fills in every prompt on this page. Then copy it, or open it straight in the tool.">
                    {filled && <button type="button" onClick={clearFills} className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-white"><RotateCcw className="h-4 w-4" strokeWidth={1.75} />Clear my answers</button>}
                  </Heading>
                  <div className="no-scrollbar -mx-1 mb-10 flex gap-2 overflow-x-auto px-1">
                    {["All", ...withPrompts.map((t) => t.name)].map((n) => (
                      <button key={n} type="button" onClick={() => setFilter(n)} aria-pressed={filter === n}
                        className={"shrink-0 rounded-full border px-4 py-2 text-sm transition-colors " + (filter === n ? "border-white bg-white text-black" : "border-line text-white/70 hover:border-white/40 hover:text-white")}>{n}</button>
                    ))}
                  </div>
                  <div className="space-y-16">
                    {withPrompts.filter((t) => filter === "All" || t.name === filter).map((t) => {
                      const into = t.pasteInto ?? t.name;
                      return (
                        <div key={t.name}>
                          <div className="mb-6 flex flex-wrap items-center gap-3"><BrandIcon slug={t.icon} label={t.name} size={22} /><h3 className="text-xl tracking-tight">{t.pasteInto ? `${t.name} prompts` : `Use in ${t.name}`}</h3><span className="text-sm text-white/40">{t.prompts!.length} prompts{t.pasteInto ? ` · paste into ${t.pasteInto}` : ""}</span></div>
                          <div className="grid gap-5 lg:grid-cols-2">
                            {sorted(t.prompts!).map((p) => {
                              const nth = p.step ? promptsFor(p.step).filter((x) => x.text !== steps[p.step! - 1]?.prompt?.text).indexOf(p) : -1;
                              return (
                                <article key={p.title} id={p.step && nth >= 0 ? `p-${p.step}-${nth}` : undefined} className="flex flex-col rounded-[24px] border border-line p-6">
                                  <div className="flex flex-wrap items-center gap-2 text-xs">
                                    {p.step && steps[p.step - 1] && <button type="button" onClick={() => go("Tutorial", `step-${p.step}`)} title={`Go to step ${p.step}: ${steps[p.step - 1].title}`} className="rounded-full bg-lb px-2.5 py-1 font-medium text-black hover:bg-white">Step {p.step}: {steps[p.step - 1].title}</button>}
                                    <span className="rounded-full border border-line px-2.5 py-1 text-white/70">Use in {into}</span>
                                  </div>
                                  <h4 className="mt-4 text-lg font-medium">{p.title}</h4>
                                  <p className="mt-2 text-sm leading-relaxed text-white/55"><span className="text-white/80">When: </span>{p.when}</p>
                                  <pre className="mt-5 flex-1 whitespace-pre-wrap break-words rounded-[16px] bg-black/30 p-4 font-mono text-[13px] leading-loose text-white/85"><PromptText text={p.text} /></pre>
                                  <div className="mt-5"><PromptActions tool={into} text={p.text} /></div>
                                </article>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}
              {links.length > 0 && (
                <section>
                  <Heading n={withPrompts.length ? "03" : kit.length ? "02" : "01"} title="Slides and links" />
                  <ul className="max-w-3xl divide-y divide-line border-y border-line">
                    {links.map((r) => <li key={r.label}><a href={r.href} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-6 py-5 hover:text-lb"><span>{r.label}</span><span className="inline-flex shrink-0 items-center gap-1.5 text-sm text-white/45 group-hover:text-lb">{r.kind}{up}</span></a></li>)}
                  </ul>
                </section>
              )}
            </div>
          )
          : <Soon what="Resources" />)}
      </div>
    </div>
    </FillCtx.Provider>
  );
}
