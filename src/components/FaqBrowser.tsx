"use client";
import { useState } from "react";
import { FAQ, FAQ_CATEGORIES } from "@/data/faq";
export default function FaqBrowser() {
  const [cat, setCat] = useState(FAQ_CATEGORIES[0]); const [q, setQ] = useState(""); const [open, setOpen] = useState<number | null>(null);
  const s = q.trim().toLowerCase();
  const list = FAQ.filter((f) => (s ? (f.q + f.a + f.keywords).toLowerCase().includes(s) : f.category === cat));
  return (
    <div className="grid md:grid-cols-[220px_1fr] gap-10">
      <div className="md:sticky md:top-28 self-start">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search questions" className="w-full rounded-full bg-white/5 border border-line px-4 py-2.5 text-sm outline-none focus:border-lb mb-6" />
        <ul className="flex md:flex-col gap-1 overflow-x-auto">{FAQ_CATEGORIES.map((c) => <li key={c}><button onClick={() => { setCat(c); setQ(""); setOpen(null); }} className={"w-full text-left px-4 py-2 rounded-full whitespace-nowrap transition-colors " + (!s && c === cat ? "bg-white/10 text-white" : "text-mute hover:text-white")}>{c}</button></li>)}</ul>
      </div>
      <div className="divide-y divide-line border-y border-line">
        {list.length === 0 && <p className="py-8 text-mute">No results.</p>}
        {list.map((f) => (
          <div key={f.id} className="py-5">
            <button onClick={() => setOpen(open === f.id ? null : f.id)} className="w-full flex justify-between gap-6 text-left text-lg"><span>{f.q}</span><span className="text-lb">{open === f.id ? "−" : "+"}</span></button>
            {open === f.id && <p className="mt-3 text-mute max-w-2xl">{f.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
