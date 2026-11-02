"use client";
import { useState } from "react";
// Brand marks from simpleicons.org (white). Falls back to the first letter if offline.
// Slugs that simpleicons.org does not serve; these use a letter mark instead.
const MISSING = new Set(["openai", "chatgpt", "midjourney", "capcut", "canva", "youware", "lovable", "grok", "copilot", "bolt", "gamma", "runway", "heygen", "gohighlevel"]);
export default function BrandIcon({ slug, label, size = 28 }: { slug: string; label: string; size?: number }) {
  const [bad, setBad] = useState(MISSING.has(slug));
  if (bad) return <span aria-hidden className="grid place-items-center rounded-md bg-white/15 text-sm font-semibold" style={{ width: size, height: size }}>{label[0]}</span>;
  return <img className="no-reinvert" src={`https://cdn.simpleicons.org/${slug}/ffffff`} alt="" width={size} height={size} style={{ width: size, height: size }} onError={() => setBad(true)} />;
}
