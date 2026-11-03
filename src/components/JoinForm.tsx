"use client";
import { useState } from "react";
import { CLUB } from "@/data/club";
import { sendToClub } from "@/lib/submit";
export default function JoinForm() {
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); const data = Object.fromEntries(new FormData(e.currentTarget));
    if (data.botcheck) return;
    setBusy(true); setErr(false);
    const ok = await sendToClub(data, `New AIBA interest form: ${data.name}`);
    setBusy(false);
    if (ok) setDone(true); else setErr(true);
  }
  const f = "w-full rounded-xl bg-white/5 border border-line px-4 py-3 outline-none focus:border-lb transition-colors";
  if (done) return <div className="card-glass p-8"><p className="eyebrow">Got it</p><p className="mt-3 text-2xl font-semibold">Thanks, we&rsquo;ll be in touch.</p><p className="mt-2 text-white/65">Or just come by {CLUB.meeting.place} on {CLUB.meeting.day}.</p></div>;
  return (
    <form onSubmit={submit} className="card-glass p-6 md:p-8 space-y-4">
      <p className="text-2xl font-semibold">Join the club</p>
      <div className="grid sm:grid-cols-2 gap-4"><label className="block text-sm text-white/65">Name<input name="name" required className={f + " mt-1"} /></label><label className="block text-sm text-white/65">Grade<input name="grade" required className={f + " mt-1"} /></label></div>
      <label className="block text-sm text-white/65">Email<input name="email" type="email" required className={f + " mt-1"} /></label>
      <label className="block text-sm text-white/65">What are you interested in?<select name="interest" className={f + " mt-1 bg-[#050b1a]"}><option>Building apps and websites</option><option>Design and branding</option><option>Marketing and sales</option><option>Data and automation</option><option>Not sure yet</option></select></label>
      <label className="block text-sm text-white/65">Experience<select name="experience" className={f + " mt-1 bg-[#050b1a]"}><option>Total beginner</option><option>Some experience</option><option>Advanced</option></select></label>
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      {err && <p role="alert" className="text-sm text-red-300">That didn&rsquo;t send. Check your connection and try again, or email {CLUB.links.email}.</p>}
      <button disabled={busy} className="btn btn-solid w-full justify-center disabled:opacity-60">{busy ? "Sending…" : "Send"}</button>
    </form>
  );
}
