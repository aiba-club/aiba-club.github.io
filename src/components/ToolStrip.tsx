"use client";
import LogoLoop from "./LogoLoop";
import BrandIcon from "./BrandIcon";
import { TOOL_GROUPS } from "@/data/tools";
export default function ToolStrip() {
  const all = TOOL_GROUPS.flatMap((g) => g.tools);
  const mid = Math.ceil(all.length / 2);
  const row = (tools: typeof all) => tools.map((t) => ({ node: <span className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-xl font-medium text-white/80"><BrandIcon slug={t.icon} label={t.name} size={26} />{t.name}</span>, title: t.name }));
  return (
    <div className="space-y-8">
      <LogoLoop speed={45} gap={36} logoHeight={52} fadeOut fadeOutColor="#050b1a" logos={row(all.slice(0, mid))} />
      <LogoLoop speed={45} gap={36} direction="right" logoHeight={52} fadeOut fadeOutColor="#050b1a" logos={row(all.slice(mid))} />
    </div>
  );
}
