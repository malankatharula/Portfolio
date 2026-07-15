import { SectionHeading } from "./SectionHeading";

type Project = {
  num: string;
  title: string;
  desc: string;
  stack: string[];
  live?: string;
  github?: string;
  featured?: boolean;
  status?: "ongoing" | "completed";
};

const PROJECTS: Project[] = [
  {
    num: "01",
    title: "FacialPrivacyShield",
    desc: "Final-year research thesis building an adversarial facial privacy protection system. Uses ensemble PGD optimization across FaceNet, VGG-Face, and ArcFace proxy models to craft imperceptible perturbations that evade unauthorized face recognition - including architectures never seen during optimization (AdaFace, ElasticFace, SphereFace). Outperforms PyTorch re-implementations of Fawkes and LowKey in head-to-head benchmarks, and ships as a full-stack web app.",
    stack: ["PyTorch", "FastAPI", "React/Vite", "facenet-pytorch", "facexlib", "LFW Dataset"],
    github: "https://github.com/malankatharula/FacialPrivacyShield",
    featured: true,
    status: "ongoing",
  },
  {
    num: "02",
    title: "USJ Marketplace",
    desc: "Delivered as a client engagement: a closed, university-only mobile marketplace enabling verified students to trade, rent, and donate textbooks, electronics, stationery, and lab tools. Led the build end-to-end for the client - 50-respondent user research, Figma hi-fi prototyping across 24 screens, and a full React Native + Firebase implementation - then validated through usability testing with a 94.64/100 SUS score (Excellent), 100% task success, and full adoption intent.",
    stack: ["React Native", "Expo", "Firebase", "Firestore", "Realtime Database", "Figma"],
    live: "https://www.figma.com/design/VuOZW1bbo28JoeEISLh869/USJ-mobile-app?node-id=0-1&t=yEOdAs5JCIw4qM3z-1",
    featured: true,
    status: "completed",
  },
  {
    num: "03",
    title: "MultiAgentDev",
    desc: "AI-powered multi-agent system where specialized agents collaborate on developer tasks. An LangGraph orchestrator classifies each task and routes it to the right specialist - Code, Debug, Doc, or Test agent - each with a single focused job.",
    stack: ["LangGraph", "Groq API", "FastAPI", "LangChain", "Python", "HTML/CSS/JS"],
    github: "https://github.com/malankatharula/MultiAgentDev",
    live: "https://huggingface.co/spaces/malankabuilder/MultiAgentDev",
    featured: true,
  },
  {
    num: "04",
    title: "CodeRAG",
    desc: "Online RAG system for codebase Q&A - fully private, no cloud. Clone any GitHub repo, chunk it with code-aware splitting, embed with nomic-embed-text, store in ChromaDB, and query with Llama 3.2 3B running on Ollama.",
    stack: ["FastAPI", "LangChain", "ChromaDB", "Ollama", "Python", "HTML/CSS/JS"],
    github: "https://github.com/malankatharula/CodeRAG",
    live: "https://huggingface.co/spaces/malankabuilder/CodeRAG",
    featured: true,
  },
  {
    num: "05",
    title: "FinDataPipeline",
    desc: "Automated financial data ETL pipeline with a live dashboard. Fetches market data for AAPL, MSFT, GOOGL, JPM, TSLA via Alpha Vantage, transforms with moving averages and % change, loads into PostgreSQL, and orchestrates daily runs with Apache Airflow.",
    stack: ["Apache Airflow", "PostgreSQL", "FastAPI", "SQLAlchemy", "Chart.js", "Docker"],
    github: "https://github.com/malankatharula/FinDataPipeline",
    featured: true,
  },
  {
    num: "06",
    title: "EmployeeAPI",
    desc: "Production-grade Employee Management REST API with full CRUD, JWT Bearer token auth, and role-based access control (admin vs user). Includes Alembic migrations, a self-referential manager relationship, and 10 passing Pytest tests.",
    stack: ["FastAPI", "PostgreSQL", "SQLAlchemy", "Alembic", "JWT", "Docker", "Pytest"],
    github: "https://github.com/malankatharula/EmployeeAPI",
  },
  {
    num: "07",
    title: "PromptForge",
    desc: "AI-powered prompt optimizer that scores any prompt across 5 dimensions - clarity, specificity, context, instruction quality, and output format. Generates 3 rewrite variants (minimal, structured, expert) and runs live side-by-side comparisons to show the real difference a better prompt makes.",
    stack: ["FastAPI", "Groq API", "Llama 3.3 70B", "Docker", "HTML/CSS/JS"],
    github: "https://github.com/malankatharula/PromptForge",
    live: "https://malankatharula.github.io/PromptForge",
    featured: true,
  },
  {
    num: "08",
    title: "HR Onboarding Agent",
    desc: "AI-powered HR automation - one form submission triggers a full onboarding workflow. n8n orchestrates Groq AI to generate a welcome email and task checklist, Gmail sends it, and Google Sheets logs the record automatically.",
    stack: ["n8n", "Groq API", "FastAPI", "Gmail API", "Google Sheets", "HTML/CSS/JS"],
    github: "https://github.com/malankatharula/HROnboardingAgent",
    live: "https://malankatharula.github.io/HROnboardingAgent",
  },
  {
    num: "09",
    title: "DocuAgent",
    desc: "Full-stack AI document extraction web app. Upload any PDF, PNG, or JPG - Llama 4 Scout extracts a summary, key fields, and anomalies, then exports the results to a formatted Excel file and PDF report.",
    stack: ["FastAPI", "Groq API", "pdf2image", "ReportLab", "Docker", "HTML/CSS/JS"],
    github: "https://github.com/malankatharula/DocuAgent",
    live: "https://malankatharula.github.io/DocuAgent",
  },
  {
    num: "10",
    title: "Library Management System (LMS)",
    desc: "Fully functional 2nd-year group project with MVC architecture, Role-Based Access Control, and member/staff/admin features including approval systems with email notifications.",
    stack: ["PHP", "MySQL", "Bootstrap", "AJAX", "RBAC"],
    github: "https://github.com/Dulakshi-dev/LMS.git",
    live: "https://drive.google.com/file/d/1rEXXjObN79GJ0wBBVMxAMHHWXSayUxVu/view",
    featured: true,
  },
  {
    num: "11",
    title: "Custom Operating System",
    desc: "3rd-year group project: a simple OS built from scratch with custom bootloader in Assembly, C kernel, basic GUI, graphics rendering, keyboard/mouse input, and task system running on QEMU.",
    stack: ["C", "x86 Assembly", "QEMU"],
    featured: true,
  },
  {
    num: "12",
    title: "American Sign Language Recognition",
    desc: "Real-time deep learning model for ASL to text conversion using computer vision. Detects and translates hand gestures into text with PyTorch and MediaPipe.",
    stack: ["PyTorch", "MediaPipe", "Python", "OpenCV"],
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-6 py-32">
      <SectionHeading index="// 03" kicker="selected_work" title="Projects" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p) => {
          const accent = p.featured ? "var(--neon-magenta)" : "var(--neon-cyan)";
          return (
            <article
              key={p.num}
              className="trace-card neon-edge clip-cut group relative flex flex-col p-6"
            >
              <div className="flex items-center justify-between">
                <span
                  className="font-display text-xs font-bold tracking-widest"
                  style={{ color: accent }}
                >
                  /{p.num}
                </span>
                <div className="flex items-center gap-2">
                  {p.status === "ongoing" && (
                    <span
                      className="font-mono text-[10px] uppercase tracking-widest"
                      style={{ color: "#fbbf24" }}
                    >
                      ● ongoing
                    </span>
                  )}
                  {p.featured && (
                    <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--neon-magenta)" }}>
                      ★ featured
                    </span>
                  )}
                </div>
              </div>
              <h3 className="font-display mt-3 text-2xl font-bold transition-colors group-hover:[color:var(--neon-cyan)]">
                {p.title}
              </h3>
              <p className="mt-3 flex-1 font-mono text-sm leading-relaxed" style={{ color: "var(--text-dim)" }}>
                {p.desc}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[11px]"
                    style={{
                      color: "var(--text-dim)",
                      border: "1px solid var(--line-2)",
                      padding: "0.2rem 0.5rem",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex gap-4 border-t pt-4 font-mono text-xs uppercase tracking-widest" style={{ borderColor: "var(--line)" }}>
                {p.live && (
                  <a href={p.live} className="transition-colors hover:[color:var(--neon-cyan)]" style={{ color: "var(--text-dim)" }}>
                    ↗ live
                  </a>
                )}
                {p.github && (
                  <a href={p.github} className="transition-colors hover:[color:var(--neon-magenta)]" style={{ color: "var(--text-dim)" }}>
                    ⟨/⟩ source
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}