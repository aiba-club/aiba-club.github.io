"use client";
import { useState } from "react";

// Logos we ship ourselves in /public/logos. "color" ones are shown as-is; the rest are single-color shapes
// painted with the current text color so they work in light and dark mode.
const LOCAL: Record<string, "mono" | "color"> = {
  openai: "mono", midjourney: "mono", capcut: "mono", grok: "mono", copilot: "mono", bolt: "mono", runway: "mono", lovable: "mono",
  gamma: "mono", heygen: "mono", gohighlevel: "mono", youware: "mono", canva: "color",
  higgsfield: "mono", googlevids: "mono", aistudio: "mono",
};

// Brand marks from simpleicons.org (white) for everything else; falls back to a letter tile if offline.
export default function BrandIcon({ slug, label, size = 28 }: { slug: string; label: string; size?: number }) {
  const [bad, setBad] = useState(false);
  const kind = LOCAL[slug];
  if (kind === "mono") {
    const url = `url(/logos/${slug}.svg)`;
    return <span aria-hidden className="no-reinvert inline-block bg-white" style={{ width: size, height: size, WebkitMaskImage: url, maskImage: url, WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "center", maskPosition: "center", WebkitMaskSize: "contain", maskSize: "contain" }} />;
  }
  if (kind === "color") return <img src={`/logos/${slug}.svg`} alt="" width={size} height={size} style={{ width: size, height: size }} />;
  if (bad) return <span aria-hidden className="grid place-items-center rounded-md bg-white/15 text-sm font-semibold" style={{ width: size, height: size }}>{label[0]}</span>;
  return <img className="no-reinvert" src={`https://cdn.simpleicons.org/${slug}/ffffff`} alt="" width={size} height={size} style={{ width: size, height: size }} onError={() => setBad(true)} />;
}
