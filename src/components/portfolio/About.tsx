import { SectionHeading } from "./SectionHeading";
import { SystemCard } from "./SystemCard";

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-32">
      <SectionHeading index="// 01" kicker="origin_story" title="About the Operator" />
      <div className="grid items-start gap-12 md:grid-cols-2">
        <div className="reveal space-y-5 font-mono text-sm leading-relaxed md:text-base" style={{ color: "var(--text-dim)" }}>
          <p>
            <span style={{ color: "var(--neon-magenta)" }}>{"$"}</span> whoami -{" "}
            <span style={{ color: "var(--text)" }}>Malanka Tharula</span>. I'm a Computer Science undergrad
            at the Faculty of Computing, University of Sri Jayewardenepura, and I like being part of every
            step of building a product. I design the screens in Figma, then build the web and mobile apps
            myself with React, Next.js, and React Native.
          </p>
          <p>
            Lately most of my side projects have been AI agents and RAG systems built with LangChain,
            LangGraph, and FastAPI, and my final-year research is on protecting faces from unauthorized
            recognition. Along the way I've published a research paper, ranked 1st in my university at
            IEEEXtreme 18.0, and co-founded the Association of Computing Students.
          </p>
          <p>
            <span style={{ color: "var(--neon-cyan)" }}>{">"}</span> When I'm not at the keyboard:
            competitive coding, writing, hitting the gym, and calisthenics.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {["AI Agents & RAG", "Full-Stack Dev", "UI/UX Design", "Mobile Apps", "Deep Learning"].map((t) => (
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