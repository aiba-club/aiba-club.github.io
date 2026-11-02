import Safe from "./Safe";
export default function PageHeader({ eyebrow, title, lede, bg, children }: { eyebrow: string; title: string; lede?: string; bg?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <header className="relative overflow-hidden border-b border-line">
      {bg && <div className="absolute inset-0 opacity-60 [mask-image:linear-gradient(black_30%,transparent)]"><Safe>{bg}</Safe></div>}
      <div className="wrap relative pt-36 pb-12">
        <p className="eyebrow mb-4">{eyebrow}</p>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">{title}</h1>
        {lede && <p className="mt-5 text-base md:text-lg text-white/70 max-w-2xl">{lede}</p>}
        {children}
      </div>
    </header>
  );
}
