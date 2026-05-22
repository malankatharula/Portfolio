import { SectionHeading } from "./SectionHeading";

const ITEMS = [
  {
    role: "Chief Editor",
    org: "Association of Computing Students (ACS)",
    dates: "Apr 2024 — Jun 2025",
    bullets: [
      "Co-founded ACS and shaped editorial direction — built brand identity, publications, and community content from scratch.",
      "Led CodeFuse hackathon, TechXplore industry bridge program, and EDUACS seminar series inspiring 100+ school students.",
      "Produced ACS eMagazine and 'Did You Know' collaborative learning platform — scaled engagement across FOC.",
    ],
  },
  {
    role: "Member",
    org: "IEEE Student Branch",
    dates: "Oct 2023 — Present",
    bullets: [
      "Competed in IEEEXtreme 18.0 — global 24-hour coding competition ranking #605 globally, #41 nationally, #1 at USJ.",
      "Invited to IFS Champions Day 2025 as sole representative from USJ for top coders.",
    ],
  },
  {
    role: "Design & Marketing Head",
    org: "IEEE CS Student Branch - USJ",
    dates: "2025",
    bullets: [
      "Led design and marketing strategy for J'PURAXTREME 2.0 technical event.",
      "Coordinated branding, promotional materials, and community outreach.",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-7xl px-6 py-32">
      <SectionHeading index="// 04" kicker="run_history" title="Experience" />

      <div className="relative ml-2 md:ml-6">
        <div
          className="absolute left-0 top-0 h-full w-px"
          style={{
            background:
              "linear-gradient(180deg, transparent, var(--neon-cyan) 10%, var(--neon-magenta) 90%, transparent)",
            boxShadow: "0 0 8px rgba(0,229,255,0.5)",
          }}
        />
        <div className="space-y-12">
          {ITEMS.map((it, i) => (
            <div key={i} className="reveal relative pl-8 md:pl-12">
              <div
                className="absolute left-0 top-2 -translate-x-1/2"
                style={{
                  width: 14, height: 14, borderRadius: 999,
                  background: "var(--bg)",
                  border: "2px solid var(--neon-cyan)",
                  boxShadow: "0 0 12px var(--neon-cyan)",
                }}
              />
              <div className="flex flex-wrap items-baseline gap-x-4">
                <h3 className="font-display text-xl font-bold" style={{ color: "var(--text)" }}>
                  {it.role}
                </h3>
                <span className="font-mono text-sm" style={{ color: "var(--neon-cyan)" }}>
                  @ {it.org}
                </span>
              </div>
              <div className="mt-1 font-mono text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                {it.dates}
              </div>
              <ul className="mt-4 space-y-2 font-mono text-sm" style={{ color: "var(--text-dim)" }}>
                {it.bullets.map((b, j) => (
                  <li key={j} className="flex gap-3">
                    <span style={{ color: "var(--neon-magenta)" }}>▹</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}