// Documentary-style photo: blue-tinted (luminosity over navy), one repeated frame shape.
export default function Photo({ src, alt, shape = "rect", ratio = "4/5", className = "", tint = true }: { src: string; alt: string; shape?: "rect" | "arch"; ratio?: string; className?: string; tint?: boolean }) {
  return (
    <div className={`relative overflow-hidden bg-[#0a2a6b] ${shape === "arch" ? "rounded-t-[999px]" : ""} ${className}`} style={{ aspectRatio: ratio }}>
      <img src={src} alt={alt} loading="lazy" className={`absolute inset-0 h-full w-full object-cover ${tint ? "mix-blend-luminosity opacity-90" : ""}`} />
    </div>
  );
}
