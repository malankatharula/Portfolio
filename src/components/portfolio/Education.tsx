import { SectionHeading } from "./SectionHeading";

const ITEMS = [
  { degree: "Bachelor of Computing Honours in Computer Science", school: "University of Sri Jayewardenepura, Sri Lanka", dates: "2023 - 2027", notes: "GPA: ... | 4th Year Undergrad at Faculty of Computing" },
  { degree: "Advanced Level - Physical Sciences", school: "Ananda College, Colombo, Sri Lanka", dates: "2007 - 2020", notes: "Combined Maths, Physics, Chemistry (BBB) · Ordinary Level: 8As 1C" },
];

export function Education() {
  return (
    <section id="education" className="relative mx-auto max-w-7xl px-6 py-32">
      <SectionHeading index="// 06" kicker="training_arc" title="Education" />
      <div className="grid gap-6 md:grid-cols-2">
        {ITEMS.map((it) => (
          <div
            key={it.degree}
            className="reveal relative p-6"
            style={{
              background: "var(--surface)",
              borderLeft: "3px solid var(--neon-cyan)",
              boxShadow: "-12px 0 32px -16px rgba(0,229,255,0.4)",
            }}
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: "var(--text-muted)" }}>
              {it.dates}
            </div>
            <h3 className="font-display mt-2 text-xl font-bold" style={{ color: "var(--text)" }}>
              {it.degree}
            </h3>
            <div className="mt-1 font-mono text-sm" style={{ color: "var(--neon-cyan)" }}>
              {it.school}
            </div>
            <p className="mt-3 font-mono text-sm" style={{ color: "var(--text-dim)" }}>
              {it.notes}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}