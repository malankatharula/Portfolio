import { SectionHeading } from "./SectionHeading";

const CATEGORIES = [
  { name: "Languages", color: "var(--neon-cyan)", items: ["Python", "Java", "C", "PHP", "JavaScript", "x86 Assembly"] },
  { name: "Frameworks", color: "var(--neon-magenta)", items: ["React", "FastAPI", "PyTorch", "Tailwindcss", "Next"] },
  { name: "Infrastructure", color: "var(--neon-violet)", items: ["MySQL", "QEMU", "XAMPP", "Docker"] },
  { name: "Tools", color: "var(--neon-green)", items: ["Git", "MediaPipe", "Figma", "VS Code"] },
];

const MARQUEE = CATEGORIES.flatMap((c) => c.items);

export function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-6 py-32">
      <SectionHeading index="// 02" kicker="loadout" title="Skill Matrix" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((c) => (
          <div key={c.name} className="reveal neon-border clip-cut relative p-6">
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: c.color, boxShadow: `0 0 12px ${c.color}` }}
            />
            <div className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: "var(--text-muted)" }}>
              // category
            </div>
            <h3 className="font-display mt-1 text-xl font-bold" style={{ color: c.color }}>
              {c.name}
            </h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {c.items.map((it) => (
                <span
                  key={it}
                  className="font-mono text-xs"
                  style={{
                    color: c.color,
                    border: `1px solid color-mix(in oklab, ${c.color} 35%, transparent)`,
                    background: "rgba(255,255,255,0.02)",
                    padding: "0.3rem 0.6rem",
                  }}
                >
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        className="reveal mt-16 overflow-hidden border-y py-6"
        style={{ borderColor: "var(--line)" }}
      >
        <div className="marquee-track flex w-max gap-12 whitespace-nowrap">
          {[...MARQUEE, ...MARQUEE].map((s, i) => (
            <span
              key={i}
              className="font-display text-2xl font-bold uppercase tracking-widest"
              style={{
                color: i % 3 === 0 ? "var(--neon-cyan)" : i % 3 === 1 ? "var(--neon-magenta)" : "var(--text-dim)",
              }}
            >
              {s} <span style={{ color: "var(--text-muted)" }}>///</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}