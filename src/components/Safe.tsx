"use client";
import SafeGL from "./SafeGL";
// Convenience: WebGL effect that simply disappears if the GPU context fails.
export default function Safe({ children, className = "absolute inset-0" }: { children: React.ReactNode; className?: string }) {
  return <SafeGL className={className} fallback={null}>{children}</SafeGL>;
}
