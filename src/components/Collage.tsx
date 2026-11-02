import type { CSSProperties } from "react";

// Notebook-style building blocks. Pure CSS, no animation libraries.
export function Polaroid({ src, alt, caption, rotate = 0, tape = true, className = "" }: { src: string; alt: string; caption?: string; rotate?: number; tape?: boolean; className?: string }) {
  return (
    <figure style={{ "--r": `${rotate}deg` } as CSSProperties} className={`relative bg-white p-3 ${caption ? "pb-12" : "pb-3"} shadow-[0_12px_30px_rgba(11,23,48,.28)] [transform:rotate(var(--r))] hover:[transform:rotate(0deg)_scale(1.02)] transition-transform duration-300 ${className}`}>
      {tape && <span aria-hidden className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-3 bg-[#8cc8ff]/70" />}
      <img src={src} alt={alt} className="block w-full aspect-[4/3] object-cover bg-[#d9d3c5]" />
      {caption && <figcaption className="absolute inset-x-3 bottom-2.5 text-center font-hand text-[22px] leading-none text-[#0b1730]">{caption}</figcaption>}
    </figure>
  );
}

export function Sticker({ children, rotate = 0, tone = "blue", className = "" }: { children: React.ReactNode; rotate?: number; tone?: "blue" | "ink" | "white"; className?: string }) {
  const t = tone === "blue" ? "bg-[#8cc8ff] text-[#0b1730]" : tone === "ink" ? "bg-[#0b1730] text-white" : "bg-white text-[#0b1730]";
  return <span style={{ "--r": `${rotate}deg` } as CSSProperties} className={`inline-flex items-center justify-center rounded-full border-[3px] border-white px-5 py-3 text-center font-bold leading-tight shadow-[0_6px_14px_rgba(11,23,48,.3)] [transform:rotate(var(--r))] ${t} ${className}`}>{children}</span>;
}

export function Ticket({ children, className = "", dark = false }: { children: React.ReactNode; className?: string; dark?: boolean }) {
  const edge = dark ? "border-white/45" : "border-[#0b1730]/60";
  return (
    <div className={`relative inline-flex items-stretch border-2 border-dashed ${edge} ${dark ? "bg-[#0b1730] text-white" : "bg-[#FBF9F4] text-[#0b1730]"} ${className}`}>
      <span aria-hidden className={`absolute -left-[11px] top-1/2 h-5 w-5 -translate-y-1/2 rounded-full ${dark ? "bg-[#050b1a]" : "bg-[#F3EFE6]"} border-2 border-dashed ${edge}`} />
      <span aria-hidden className={`absolute -right-[11px] top-1/2 h-5 w-5 -translate-y-1/2 rounded-full ${dark ? "bg-[#050b1a]" : "bg-[#F3EFE6]"} border-2 border-dashed ${edge}`} />
      {children}
    </div>
  );
}

export function Scribble({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`font-hand text-2xl leading-tight ${className}`}>{children}</span>;
}
