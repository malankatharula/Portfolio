const STATS = [
  { label: "FOCUS", value: 92 },
  { label: "VELOCITY", value: 88 },
  { label: "CREATIVITY", value: 95 },
  { label: "CAFFEINE", value: 99 },
];

export function SystemCard() {
  return (
    <div className="neon-edge clip-cut relative p-6 font-mono text-sm">
      <div className="absolute right-4 top-4 flex items-center gap-2 text-[10px] uppercase tracking-widest" style={{ color: "var(--neon-green)" }}>
        <span className="dot-pulse" /> ONLINE
      </div>
      <div className="text-[10px] uppercase tracking-[0.3em]" style={{ color: "var(--text-muted)" }}>
        // character.sheet
      </div>

      <div className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-xs">
        <span style={{ color: "var(--text-muted)" }}>name</span>
        <span style={{ color: "var(--neon-cyan)" }}>"Malanka Tharula"</span>
        <span style={{ color: "var(--text-muted)" }}>class</span>
        <span style={{ color: "var(--neon-cyan)" }}>"Backend Developer"</span>
        <span style={{ color: "var(--text-muted)" }}>guild</span>
        <span style={{ color: "var(--neon-cyan)" }}>"University of Sri Jayewardenepura"</span>
        <span style={{ color: "var(--text-muted)" }}>loc</span>
        <span style={{ color: "var(--neon-cyan)" }}>"Colombo, Sri Lanka"</span>
        <span style={{ color: "var(--text-muted)" }}>status</span>
        <span style={{ color: "var(--neon-green)" }}>"available_for_hire"</span>
      </div>

      <div className="mt-6 space-y-3">
        {STATS.map((s) => (
          <div key={s.label}>
            <div className="flex justify-between text-[11px] uppercase tracking-widest" style={{ color: "var(--text-dim)" }}>
              <span>{s.label}</span>
              <span style={{ color: "var(--neon-cyan)" }}>{s.value}</span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden" style={{ background: "var(--surface-2)" }}>
              <div
                className="h-full"
                style={{
                  width: `${s.value}%`,
                  background: "linear-gradient(90deg, var(--neon-cyan), var(--neon-magenta))",
                  boxShadow: "0 0 12px rgba(0,229,255,0.6)",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t pt-4 text-[11px]" style={{ borderColor: "var(--line)", color: "var(--text-muted)" }}>
        last_seen: <span style={{ color: "var(--neon-cyan)" }}>now</span> · uptime:{" "}
        <span style={{ color: "var(--neon-cyan)" }}>∞</span>
      </div>
    </div>
  );
}