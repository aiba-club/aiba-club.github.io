import Counter from "./Counter";

const SKILLS: [string, string][] = [["Prompting", "92%"], ["Building with AI", "78%"], ["Design", "64%"], ["Sales", "58%"]];
// An example member profile in a browser frame. Purely illustrative; replace the bracketed values.
export default function ProfileWindow() {
  return (
    <div className="relative mx-auto w-full max-w-5xl [perspective:1800px]">
      <div className="rounded-t-2xl border border-white/15 bg-[#0a1226] shadow-[0_-20px_80px_rgba(47,111,207,.25)] [transform:rotateX(8deg)] origin-bottom overflow-hidden">
        {/* browser chrome */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" /><span className="h-3 w-3 rounded-full bg-[#febc2e]" /><span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <div className="mx-auto hidden sm:block rounded-md bg-black/30 px-4 py-1 text-xs text-white/50">aiba.club/members/you</div>
        </div>
        <div className="grid md:grid-cols-[260px_1fr] gap-0">
          {/* profile */}
          <aside className="border-b md:border-b-0 md:border-r border-white/10 p-6">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-lb to-db" aria-hidden />
            <p className="mt-4 text-lg font-semibold">[Your name]</p>
            <p className="text-sm text-lb">Project Lead · [Grade]</p>
            <div className="mt-6 grid grid-cols-3 md:grid-cols-1 gap-4">
              {[["Lessons done", 7], ["Projects shipped", 1], ["Team members led", 3]].map(([k, v]) => (
                <div key={k as string}><div className="text-3xl font-semibold"><Counter value={v as number} fontSize={30} textColor="#ffffff" /></div><p className="text-xs text-white/50">{k}</p></div>
              ))}
            </div>
          </aside>
          {/* resume-style content */}
          <div className="p-6 md:p-8 grid md:grid-cols-[1.3fr_1fr] gap-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-white/45">Project</p>
              <div className="mt-3 rounded-xl border border-lb/40 bg-lb/[0.07] p-4">
                <p className="font-semibold">[Project name]</p>
                <p className="mt-1 text-sm text-white/65">An AI app used by [NUMBER] classmates. Built in 3 weeks with a team of 3.</p>
                <div className="mt-3 flex flex-wrap gap-2">{["YouWare", "Claude", "Vercel"].map((t) => <span key={t} className="rounded-full border border-white/15 px-2.5 py-0.5 text-xs text-white/70">{t}</span>)}</div>
              </div>
              <p className="mt-6 text-xs uppercase tracking-widest text-white/45">Recognition</p>
              <div className="mt-3 flex items-center gap-3 rounded-xl border border-white/10 p-4"><span className="grid h-10 w-10 place-items-center rounded-full bg-db text-lb font-semibold">1st</span><div><p className="text-sm font-medium">AIBA Cup · Most users</p><p className="text-xs text-white/50">[Year]</p></div></div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-white/45">Skills</p>
              <div className="mt-3 space-y-4">{SKILLS.map(([k, w]) => <div key={k}><p className="text-sm">{k}</p><div className="mt-1.5 h-2 rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-[#2f6fcf] to-lb" style={{ width: w }} /></div></div>)}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050b1a] to-transparent" />
      <p className="mt-4 text-center text-xs text-white/40">Example member profile. Yours fills in as you build.</p>
    </div>
  );
}
