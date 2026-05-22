import { ParticleField } from "./ParticleField";
import { Typewriter } from "./Typewriter";

const BADGES = [
  { label: "IEEEXtreme 18.0   World Rank", value: "#605" },
  { label: "Current GPA", value: "..." },
  { label: "Certifications", value: "6+" },
];

export function Hero() {
  return (
    <section id="hero" className="relative flex min-h-[100svh] items-center overflow-hidden pt-24">
      <ParticleField />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--text-dim)" }}>
          <span className="dot-pulse" />
          <span>System online · v.2.0.26</span>
        </div>

        <h1 className="font-display mt-6 text-[clamp(2.8rem,9vw,8rem)] font-black leading-[0.9]">
          <span className="glitch block" data-text="Malanka Tharula">Malanka Tharula</span>
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-sm md:text-base" style={{ color: "var(--text-dim)" }}>
          <span style={{ color: "var(--neon-magenta)" }}>{">"}</span>
          <span>role :=</span>
          <Typewriter
            words={["CS Undergraduate", "Backend Developer", "Deep Learning Enthusiast", "Competitive Programmer", "Open Source Contributor"]}
          />
        </div>

        <p className="mt-6 max-w-2xl font-mono text-sm leading-relaxed md:text-base" style={{ color: "var(--text-dim)" }}>
          Computer Science undergrad at USJ building backend systems, deep learning models,
          and real-time applications — from ASL recognition to custom operating systems.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a href="#projects" className="btn-neon">View Projects →</a>
          <a href="#contact" className="btn-neon is-magenta">Get In Touch</a>
        </div>

        <div className="mt-14 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3">
          {BADGES.map((b) => (
            <div key={b.label} className="neon-edge clip-cut px-4 py-3">
              <div className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                {b.label}
              </div>
              <div className="font-display mt-1 text-2xl font-bold" style={{ color: "var(--neon-cyan)" }}>
                {b.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: "var(--text-muted)" }}>
        ↓ scroll
      </div>
    </section>
  );
}