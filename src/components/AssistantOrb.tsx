"use client";
import Orb from "./Orb";
import SafeGL from "./SafeGL";

// The assistant's face: the reactbits Orb. If the GPU can't draw it, a CSS voice-meter disc takes over.
function Fallback({ size, thinking }: { size: number; thinking: boolean }) {
  return (
    <span className="vbot" data-thinking={thinking ? "true" : "false"} style={{ width: size, height: size }}>
      {[0, 1, 2, 3, 4].map((i) => <i key={i} style={{ animationDelay: `${i * 0.13}s` }} />)}
    </span>
  );
}
export default function AssistantOrb({ size = 64, thinking = false, className = "" }: { size?: number; thinking?: boolean; className?: string }) {
  return (
    <span aria-hidden className={`reinvert pointer-events-none block flex-none overflow-hidden rounded-full ${className}`} style={{ width: size, height: size }}>
      <SafeGL className="h-full w-full" fallback={<Fallback size={size} thinking={thinking} />}>
        <Orb colors={["#8cc8ff", "#2f6fcf", "#ffffff"]} backgroundColor="#050b1a" forceHoverState={thinking} speed={thinking ? 1.8 : 1} />
      </SafeGL>
    </span>
  );
}
