import { SectionHeading } from "./SectionHeading";

const INFO = [
  { icon: "✉", label: "Email", value: "malankawckramasinghe@gmail.com" },
  { icon: "⌖", label: "Location", value: "Colombo, Sri Lanka" },
  { icon: "◐", label: "Status", value: "Open to opportunities" },
];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/malankatharula" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/malanka-tharula-b329432a7/" },
  { label: "Email", href: "mailto:malankawickramasinghe@gmail.com" },
];

export function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-6 py-32">
      <SectionHeading index="// 08" kicker="open_channel" title="Establish Link" />

      <div className="grid gap-10 md:grid-cols-2">
        <div className="reveal space-y-6">
          <p className="font-mono text-sm leading-relaxed md:text-base" style={{ color: "var(--text-dim)" }}>
            <span style={{ color: "var(--neon-magenta)" }}>{">"}</span> Got a project, role, or wild idea?
            Drop a transmission. Reply window: usually under 24h.
          </p>
          <div className="space-y-3">
            {INFO.map((i) => (
              <div
                key={i.label}
                className="neon-edge clip-cut flex items-center gap-4 p-4"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center text-lg"
                  style={{ color: "var(--neon-cyan)", border: "1px solid var(--neon-cyan)" }}
                >
                  {i.icon}
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: "var(--text-muted)" }}>
                    {i.label}
                  </div>
                  <div className="font-mono text-sm" style={{ color: "var(--text)" }}>
                    {i.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="font-mono text-xs uppercase tracking-widest transition-colors hover:[color:var(--neon-cyan)]"
                style={{
                  color: "var(--text-dim)",
                  border: "1px solid var(--line-2)",
                  padding: "0.6rem 0.9rem",
                }}
              >
                ↗ {s.label}
              </a>
            ))}
          </div>
        </div>

        <form
          action="https://formspree.io/f/xkoebwkz"
          method="POST"
          className="reveal neon-edge clip-cut space-y-4 p-6"
        >
          <div>
            <label className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: "var(--text-muted)" }}>
              {">"} name
            </label>
            <input className="input-neon mt-1" name="name" required placeholder="how should we address you" />
          </div>
          <div>
            <label className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: "var(--text-muted)" }}>
              {">"} email
            </label>
            <input className="input-neon mt-1" type="email" name="email" required placeholder="you@domain.com" />
          </div>
          <div>
            <label className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: "var(--text-muted)" }}>
              {">"} message
            </label>
            <textarea
              className="input-neon mt-1"
              name="message"
              required
              rows={5}
              placeholder="what are we building?"
            />
          </div>
          <button type="submit" className="btn-neon w-full justify-center">
            Transmit ↗
          </button>
        </form>
      </div>
    </section>
  );
}