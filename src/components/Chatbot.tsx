"use client";
import { useState, useRef, useEffect } from "react";
import AssistantOrb from "./AssistantOrb";
import { FAQ } from "@/data/faq";
import { CLUB } from "@/data/club";

type Msg = { from: "bot" | "me"; text: string };
const STOP = new Set("the a an is are do i we you to of for in on and or how what when where can does my it me".split(" "));
const toks = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter((w) => w && !STOP.has(w));
function answer(q: string) {
  const t = toks(q); let best = 0, hit = null as null | (typeof FAQ)[number];
  for (const f of FAQ) { const pool = new Set(toks(f.q + " " + f.keywords)); const s = t.reduce((n, w) => n + (pool.has(w) ? 1 : 0), 0) / Math.sqrt(pool.size || 1); if (s > best) { best = s; hit = f; } }
  return hit && best > 0.25 ? hit.a : `I'm not sure about that one. Try the FAQ page or email ${CLUB.links.email}.`;
}
export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "bot", text: `Hi! I'm the ${CLUB.name} assistant. Ask me anything about the club.` }]);
  const [input, setInput] = useState(""); const [form, setForm] = useState(false); const [sent, setSent] = useState(false); const [thinking, setThinking] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { end.current?.scrollIntoView({ block: "end" }); }, [msgs, form, open]);
  const ask = (q: string) => { if (!q.trim()) return; setForm(false); setMsgs((m) => [...m, { from: "me", text: q }]); setInput(""); setThinking(true); setTimeout(() => { setMsgs((m) => [...m, { from: "bot", text: answer(q) }]); setThinking(false); }, 800); };
  const quick = (label: string) => { if (label === "Fill out interest form") { setForm(true); setMsgs((m) => [...m, { from: "me", text: label }]); } else ask(label); };
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); const data = Object.fromEntries(new FormData(e.currentTarget));
    if (CLUB.formEndpoint) await fetch(CLUB.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
    else window.location.href = `mailto:${CLUB.links.email}?subject=AIBA interest&body=${encodeURIComponent(Object.entries(data).map(([k, v]) => `${k}: ${v}`).join("\n"))}`;
    setSent(true); setForm(false); setMsgs((m) => [...m, { from: "bot", text: "Thanks! We'll be in touch soon." }]);
  }
  const field = "w-full rounded-lg bg-white/5 border border-line px-3 py-2 text-sm outline-none focus:border-lb";
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col items-end gap-3">
      {open && (
        <div className="w-[min(92vw,360px)] h-[min(78vh,600px)] flex flex-col rounded-2xl border border-line bg-black/90 backdrop-blur-xl overflow-hidden">
          <div className="relative border-b border-line">
            <button onClick={() => setOpen(false)} className="absolute right-3 top-3 z-10 text-mute hover:text-white" aria-label="Close">✕</button>
            <div className="mx-auto my-4 w-fit"><AssistantOrb size={104} thinking={thinking} /></div>
            <p className="pb-3 text-center text-sm font-medium">{thinking ? "Thinking…" : `${CLUB.name} assistant`}</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
            {msgs.map((m, i) => <div key={i} className={m.from === "me" ? "text-right" : ""}><span className={"inline-block max-w-[85%] rounded-2xl px-3 py-2 " + (m.from === "me" ? "bg-db text-white" : "bg-white/10")}>{m.text}</span></div>)}
            {form && (<form onSubmit={submit} className="space-y-2">
              <input name="name" required placeholder="Name" className={field} /><input name="email" type="email" required placeholder="Email" className={field} /><input name="grade" required placeholder="Grade" className={field} /><input name="interests" placeholder="Interests" className={field} />
              <select name="experience" className={field + " bg-black"}><option>Beginner</option><option>Some experience</option><option>Advanced</option></select>
              <button className="btn btn-solid w-full justify-center">Submit</button></form>)}
            <div ref={end} />
          </div>
          <div className="px-3 pt-2 flex flex-wrap gap-2">{["Fill out interest form", "What projects can I join?", "When do we meet?"].map((q) => <button key={q} onClick={() => quick(q)} disabled={sent && q.startsWith("Fill")} className="text-xs rounded-full border border-line px-3 py-1 text-white/75 hover:border-lb hover:text-lb">{q}</button>)}</div>
          <form onSubmit={(e) => { e.preventDefault(); ask(input); }} className="p-3 flex gap-2"><input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask a question…" className={field} /><button className="btn btn-solid !py-2">Send</button></form>
        </div>
      )}
      <button onClick={() => setOpen((o) => !o)} aria-label="Open assistant" className="rounded-full transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lb"><AssistantOrb size={64} thinking={thinking} /></button>
    </div>
  );
}
