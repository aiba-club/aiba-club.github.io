"use client";
import { useState } from "react";
export default function CopyButton({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  return <button onClick={() => { navigator.clipboard?.writeText(text); setOk(true); setTimeout(() => setOk(false), 1500); }} className="btn btn-line !py-2.5 !px-4 text-sm">{ok ? "Copied" : "Copy email"}</button>;
}
