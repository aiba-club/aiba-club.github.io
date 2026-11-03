"use client";
import { useEffect, useState } from "react";

// Words share one grid cell, so the slot is always as wide as the longest word and the headline never shifts.
export default function WordSwap({ words, interval = 2400 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => { const id = setInterval(() => setI((n) => (n + 1) % words.length), interval); return () => clearInterval(id); }, [words.length, interval]);
  return (
    <span className="inline-grid text-left align-bottom border-b-[3px] border-[#8cc8ff]/70 leading-[1.02]" aria-label={words[i]}>
      {words.map((w, k) => (
        <span key={w} aria-hidden className="col-start-1 row-start-1 text-[#cfe6ff] transition-all duration-700 ease-out"
          style={{ opacity: k === i ? 1 : 0, transform: k === i ? "translateY(0)" : k === (i + words.length - 1) % words.length ? "translateY(-0.45em)" : "translateY(0.45em)", filter: k === i ? "blur(0)" : "blur(5px)" }}>{w}</span>
      ))}
    </span>
  );
}
