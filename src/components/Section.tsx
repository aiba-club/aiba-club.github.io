// Editorial section: hairline on top, index + label in the margin, content on the right.
export default function Section({ index, label, children, id, className = "" }: { index?: string; label: string; children: React.ReactNode; id?: string; className?: string }) {
  return (
    <section id={id} className={`border-t border-white/15 ${className}`}>
      <div className="wrap py-20 md:py-28 grid lg:grid-cols-[180px_1fr] gap-6 lg:gap-12">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-white/50 lg:sticky lg:top-28 self-start">{index && <span className="text-lb">{index} / </span>}{label}</p>
        <div>{children}</div>
      </div>
    </section>
  );
}
