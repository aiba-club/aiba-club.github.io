// Small line illustrations, one per lesson. Drawn in code so they match the site's colors.
const C = "#8cc8ff", W = "rgba(255,255,255,.75)", D = "rgba(255,255,255,.25)";
const P = { fill: "none", strokeWidth: 2.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
export default function LessonArt({ n }: { n: number }) {
  return (
    <svg viewBox="0 0 140 140" className="h-full w-full" role="img" aria-hidden>
      {n === 1 && <g {...P}><path d="M22 34h62a8 8 0 0 1 8 8v26a8 8 0 0 1-8 8H50l-16 14V76h-12a8 8 0 0 1-8-8V42a8 8 0 0 1 8-8z" stroke={C} /><path d="M52 92h62a8 8 0 0 1 8 8v16a8 8 0 0 1-8 8H98l-12 10v-10H52" stroke={W} transform="translate(0,-18)" /><path d="M34 52h40M34 62h26" stroke={D} /></g>}
      {n === 2 && <g {...P}><circle cx="62" cy="62" r="30" stroke={C} /><path d="M84 84l30 30" stroke={C} /><path d="M46 70l10-12 10 8 12-16" stroke={W} /></g>}
      {n === 3 && <g {...P}><rect x="14" y="26" width="112" height="88" rx="6" stroke={C} /><path d="M14 46h112" stroke={C} /><rect x="26" y="58" width="48" height="20" stroke={W} /><path d="M26 90h86M26 100h60" stroke={D} /><path d="M84 58h30v20H84z" stroke={D} /></g>}
      {n === 4 && <g {...P}><circle cx="52" cy="56" r="28" stroke={C} /><circle cx="88" cy="56" r="28" stroke={W} /><circle cx="70" cy="86" r="28" stroke={D} /></g>}
      {n === 5 && <g {...P}><path d="M26 56l70-28v84L26 84z" stroke={C} /><path d="M26 56v28h-8V56z" stroke={W} /><path d="M104 46q16 24 0 48" stroke={W} /><path d="M40 84l8 26h14l-6-24" stroke={D} /></g>}
      {n === 6 && <g {...P}><path d="M20 112h104" stroke={D} /><rect x="30" y="76" width="18" height="36" stroke={W} /><rect x="62" y="52" width="18" height="60" stroke={C} /><rect x="94" y="28" width="18" height="84" stroke={C} /><path d="M30 60l32-18 32-6" stroke={W} /></g>}
      {n === 7 && <g {...P}><rect x="52" y="48" width="36" height="64" stroke={C} /><rect x="14" y="74" width="36" height="38" stroke={W} /><rect x="90" y="86" width="36" height="26" stroke={D} /><path d="M70 22l5 10 11 2-8 8 2 11-10-5-10 5 2-11-8-8 11-2z" stroke={C} /></g>}
    </svg>
  );
}
