// Small arrow for link pills. `up` points up-right for links that leave the site.
export default function Arr({ up = false }: { up?: boolean }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 transition-transform duration-200 group-hover/pl:translate-x-0.5">
      {up ? <path d="M5 11l6-6M6 5h5v5" /> : <path d="M3 8h10M9 4l4 4-4 4" />}
    </svg>
  );
}
