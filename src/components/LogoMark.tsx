"use client";
import { useState } from "react";
// Club seal. Save the logo file as /public/aiba-logo.png; until it exists a simple "AI" mark is shown.
export default function LogoMark({ size = 36, className = "" }: { size?: number; className?: string }) {
  const [missing, setMissing] = useState(false);
  if (missing) return <span aria-hidden className={`grid place-items-center rounded-full bg-[#8cc8ff] text-[13px] font-bold text-[#0b1730] ${className}`} style={{ width: size, height: size }}>AI</span>;
  return <img src="/aiba-logo.png" alt="AIBA seal" width={size} height={size} onError={() => setMissing(true)} className={`rounded-full object-contain ${className}`} style={{ width: size, height: size }} />;
}
