// The assistant's face: a dark glass disc with a live voice meter, pure CSS so it works on every device.
export default function AssistantOrb({ size = 64, thinking = false, className = "" }: { size?: number; thinking?: boolean; className?: string }) {
  return (
    <span aria-hidden className={`vbot reinvert pointer-events-none ${className}`} data-thinking={thinking ? "true" : "false"} style={{ width: size, height: size }}>
      {[0, 1, 2, 3, 4].map((i) => <i key={i} style={{ animationDelay: `${i * 0.13}s` }} />)}
    </span>
  );
}
