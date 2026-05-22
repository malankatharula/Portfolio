export function SectionHeading({ index, title, kicker }: { index: string; title: string; kicker?: string }) {
  return (
    <div className="reveal mb-12">
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--neon-magenta)" }}>
        <span>{index}</span>
        <span className="h-px w-12" style={{ background: "var(--neon-magenta)" }} />
        <span style={{ color: "var(--text-dim)" }}>{kicker}</span>
      </div>
      <h2 className="font-display mt-3 text-4xl font-black md:text-6xl">
        {title}
      </h2>
    </div>
  );
}