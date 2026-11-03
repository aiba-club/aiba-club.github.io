"use client";
import { useState } from "react";
import { CLUB } from "@/data/club";

const SITE = "https://aiba-club.github.io";
const MESSAGE = `Hey! I joined AIBA (AI Business Applications), a student club where we learn AI tools and build real projects. We meet every Wednesday during lunch in ${CLUB.meeting.place}. It's free and you don't need any experience. Check it out: ${SITE}`;

export default function SpreadTheWord() {
  const [done, setDone] = useState<string | null>(null);
  const flash = (k: string) => { setDone(k); setTimeout(() => setDone(null), 1600); };
  const copy = async (text: string, k: string) => { try { await navigator.clipboard.writeText(text); flash(k); } catch {} };
  const share = async () => {
    if (navigator.share) { try { await navigator.share({ title: "AIBA", text: MESSAGE, url: SITE }); return; } catch {} }
    copy(SITE, "link");
  };
  const print = () => {
    const w = window.open("/gallery/flyer.png", "_blank");
    if (w) w.addEventListener("load", () => w.print());
  };
  const btn = "inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors";
  return (
    <div className="rounded-[32px] border border-white/12 bg-white/[0.03] p-6 md:p-8">
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Help us spread the word.</h2>
      <p className="mt-2 max-w-xl text-white/65">Put up a flyer, or send a friend the link. Everything here is ready to use.</p>
      <div className="mt-8 grid items-start gap-8 md:grid-cols-[230px_1fr]">
        <a href="/gallery/flyer.png" target="_blank" rel="noreferrer" className="group block overflow-hidden rounded-2xl border border-white/15 shadow-[0_20px_40px_-20px_rgba(0,0,0,.6)]" aria-label="Open the flyer full size">
          <img src="/gallery/flyer.png" alt="AIBA flyer: Build something with AI, every Wednesday during lunch in Room 153, with a QR code to the site" className="w-full transition-transform duration-300 group-hover:scale-[1.02]" />
        </a>
        <div>
          <div className="flex flex-wrap gap-2.5">
            <a href="/gallery/flyer.pdf" download="AIBA-flyer.pdf" className={btn + " border-white bg-white text-[#0b1730] hover:bg-lb"}>Download flyer (PDF)</a>
            <a href="/gallery/flyer.png" download="AIBA-flyer.png" className={btn + " border-white/25 text-white hover:border-lb hover:text-lb"}>Download image</a>
            <button onClick={print} className={btn + " border-white/25 text-white hover:border-lb hover:text-lb"}>Print it</button>
            <button onClick={share} className={btn + " border-white/25 text-white hover:border-lb hover:text-lb"}>{done === "link" ? "Link copied" : "Share the link"}</button>
          </div>
          <p className="mt-3 text-xs text-white/45">The PDF is US Letter size and ready to print. The QR code on the flyer opens this site.</p>

          <div className="mt-7 rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-white/45">Message for a group chat</p>
            <p className="mt-2 text-[15px] leading-relaxed text-white/85">{MESSAGE}</p>
            <button onClick={() => copy(MESSAGE, "msg")} className="mt-3 rounded-full border border-white/20 px-4 py-2.5 text-sm text-white/80 hover:border-lb hover:text-lb">{done === "msg" ? "Copied" : "Copy message"}</button>
          </div>

          <div className="mt-4 flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 p-4">
            <img src="/gallery/qr.svg" alt="QR code that opens aiba-club.github.io" className="h-24 w-24 shrink-0 rounded-xl bg-white p-1.5" />
            <div><p className="font-semibold">Scan to open the site</p><p className="mt-0.5 text-sm text-white/60">Show it on your phone or{" "}<a href="/gallery/qr.svg" download="AIBA-qr.svg" className="pill-link group/pl !py-0.5 !px-2.5">download the QR code</a>.</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}
