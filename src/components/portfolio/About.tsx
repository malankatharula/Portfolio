import { SectionHeading } from "./SectionHeading";
import { SystemCard } from "./SystemCard";

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-32">
      <SectionHeading index="// 01" kicker="origin_story" title="About the Operator" />
      <div className="grid items-start gap-12 md:grid-cols-2">
        <div className="reveal space-y-5 font-mono text-sm leading-relaxed md:text-base" style={{ color: "var(--text-dim)" }}>
          <p>
            <span style={{ color: "var(--neon-magenta)" }}>{"$"}</span> whoami —{" "}
            <span style={{ color: "var(--text)" }}>Malanka Tharula</span>. A 4th-year Computer Science
            undergraduate at the Faculty of Computing, University of Sri Jayewardenepura. I operate at the
            intersection of backend engineering, deep learning, and systems programming — driven by the
            challenge of turning complex problems into elegant, working software.
          </p>
          <p>
            Currently building real-time ASL gesture recognition systems with PyTorch and MediaPipe,
            while exploring competitive programming and low-level systems. I thrive in collaborative teams
            that ship fast and learn faster — from hackathons to research publications.
          </p>
          <p>
            <span style={{ color: "var(--neon-cyan)" }}>{">"}</span> When I'm not at the keyboard:
            competitive coding, editorial writing, Hit the gym, and do calesthenics.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {["Backend Dev", "ML / DL /CV", "Workflow Automating", "Competitive Programming"].map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
        </div>
        <div className="reveal">
          <SystemCard />
        </div>
      </div>
    </section>
  );
}