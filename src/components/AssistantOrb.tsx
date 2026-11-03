// The assistant's face: a glass orb made with CSS only, so it works on every device.
export default function AssistantOrb({ size = 64, thinking = false, className = "" }: { size?: number; thinking?: boolean; className?: string }) {
  return <span aria-hidden className={`orb reinvert pointer-events-none ${className}`} data-thinking={thinking ? "true" : "false"} style={{ width: size, height: size }} />;
}
