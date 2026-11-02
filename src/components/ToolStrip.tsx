"use client";
import LogoLoop from "./LogoLoop";
import BrandIcon from "./BrandIcon";
import { TOOL_GROUPS } from "@/data/tools";

// Scrolling rows of tool pills. `rows` splits the tools evenly, alternating direction.
export default function ToolStrip({ rows = 2 }: { rows?: number }) {
  const all = TOOL_GROUPS.flatMap((g) => g.tools);
  const per = Math.ceil(all.length / rows);
  const pill = (t: (typeof all)[number]) => ({ node: <span className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-xl font-medium text-white/80"><BrandIcon slug={t.icon} label={t.name} size={26} />{t.name}</span>, title: t.name });
  return (
    <div className="space-y-6">
      {Array.from({ length: rows }, (_, r) => (
        <LogoLoop key={r} speed={40 + r * 6} gap={32} direction={r % 2 ? "right" : "left"} logoHeight={52} fadeOut fadeOutColor="#050b1a" logos={all.slice(r * per, (r + 1) * per).map(pill)} />
      ))}
    </div>
  );
}
