import { SectionHeading } from "./SectionHeading";

const FEATURED = [
  { tag: "RANK #1 @ USJ", title: "IEEEXtreme 18.0", desc: "Global Rank #605 · Country Rank #41 · University Rank #1 (CodeDuoPlus One)" },
  { tag: "PUBLISHED", title: "Dual-Phase Financial Strategy Paper", desc: "JEMS Journal · 2024 · Customer Loyalty in Retail", link: "https://jems.sciview.net/index.php/jems/article/view/229" },
  { tag: "CO-FOUNDER", title: "Association of Computing Students (ACS)", desc: "USJ · 2024 · Editorial Lead & Community Builder" },
];

const CERTS = [
  "Introduction to Software Engineering - Udemy · Feb 2024",
  "Java Programming Masterclass - Udemy · Feb 2024",
  "Java Fundamentals Course For Beginners - Udemy · Feb 2024",
  "Introduction to Database Management Systems - Udemy · Feb 2024",
  "Master Course of Rapid Application Development - Udemy · Feb 2024",
  "Introduction to Programming Using Java - Sololearn · Jan 2024",
];

export function Achievements() {
  return (
    <section id="achievements" className="relative mx-auto max-w-7xl px-6 py-32">
      <SectionHeading index="// 05" kicker="trophy_case" title="Achievements" />

      <div className="grid gap-6 md:grid-cols-3">
        {FEATURED.map((a) => (
          <div
            key={a.title}
            className="reveal neon-edge clip-cut relative overflow-hidden p-6"
            style={{ boxShadow: "0 0 0 1px rgba(255,43,214,0.15), 0 20px 60px -20px rgba(255,43,214,0.4)" }}
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: "var(--neon-magenta)" }}>
              ★ {a.tag}
            </div>
            <h3 className="font-display mt-3 text-xl font-bold" style={{ color: "var(--text)" }}>
              {a.title}
            </h3>
            <p className="mt-2 font-mono text-sm" style={{ color: "var(--text-dim)" }}>
              {a.desc}
            </p>
            {"link" in a && a.link && (
              <a
                href={a.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest transition-colors"
                style={{ color: "var(--neon-cyan)" }}
              >
                View Paper <span style={{ fontSize: 14 }}>→</span>
              </a>
            )}
            <div
              className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-30 blur-3xl"
              style={{ background: "var(--neon-magenta)" }}
            />
          </div>
        ))}
      </div>

      <div className="reveal mt-12 neon-edge clip-cut p-6">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: "var(--text-muted)" }}>
          // certifications
        </div>
        <ul className="mt-4 grid gap-3 font-mono text-sm md:grid-cols-2" style={{ color: "var(--text-dim)" }}>
          {CERTS.map((c) => (
            <li key={c} className="flex gap-3 border-l-2 pl-3" style={{ borderColor: "var(--neon-cyan)" }}>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}