import { SectionHeading } from "./SectionHeading";

type Project = {
  num: string;
  title: string;
  desc: string;
  stack: string[];
  live?: string;
  github?: string;
  featured?: boolean;
};

const PROJECTS: Project[] = [
  {


num: "01",
    title: "MultiAgentDev",
    desc: "AI-powered multi-agent system where specialized agents collaborate on developer tasks. An LangGraph orchestrator classifies each task and routes it to the right specialist - Code, Debug, Doc, or Test agent - each with a single focused job.",
    stack: ["LangGraph", "Groq API", "FastAPI", "LangChain", "Python", "HTML/CSS/JS"],
    github: "https://github.com/malankatharula/MultiAgentDev",
    live: "https://huggingface.co/spaces/malankabuilder/MultiAgentDev",
    featured: true,
  },
  {
    num: "02",
    title: "CodeRAG",
    desc: "Online RAG system for codebase Q&A - fully private, no cloud. Clone any GitHub repo, chunk it with code-aware splitting, embed with nomic-embed-text, store in ChromaDB, and query with Llama 3.2 3B running on Ollama.",
    stack: ["FastAPI", "LangChain", "ChromaDB", "Ollama", "Python", "HTML/CSS/JS"],
    github: "https://github.com/malankatharula/CodeRAG",
    live: "https://huggingface.co/spaces/malankabuilder/CodeRAG",
    featured: true,
  },
  {
    num: "03",
    title: "FinDataPipeline",
    desc: "Automated financial data ETL pipeline with a live dashboard. Fetches market data for AAPL, MSFT, GOOGL, JPM, TSLA via Alpha Vantage, transforms with moving averages and % change, loads into PostgreSQL, and orchestrates daily runs with Apache Airflow.",
    stack: ["Apache Airflow", "PostgreSQL", "FastAPI", "SQLAlchemy", "Chart.js", "Docker"],
    github: "https://github.com/malankatharula/FinDataPipeline",
    featured: true,
  },
  {
    num: "04",
    title: "EmployeeAPI",
    desc: "Production-grade Employee Management REST API with full CRUD, JWT Bearer token auth, and role-based access control (admin vs user). Includes Alembic migrations, a self-referential manager relationship, and 10 passing Pytest tests.",
    stack: ["FastAPI", "PostgreSQL", "SQLAlchemy", "Alembic", "JWT", "Docker", "Pytest"],
    github: "https://github.com/malankatharula/EmployeeAPI",
  },
  {
  num: "05",
  title: "PromptForge",
  desc: "AI-powered prompt optimizer that scores any prompt across 5 dimensions - clarity, specificity, context, instruction quality, and output format. Generates 3 rewrite variants (minimal, structured, expert) and runs live side-by-side comparisons to show the real difference a better prompt makes.",
  stack: ["FastAPI", "Groq API", "Llama 3.3 70B", "Docker", "HTML/CSS/JS"],
  github: "https://github.com/malankatharula/PromptForge",
  live: "https://malankatharula.github.io/PromptForge",
  featured: true,
  },
  {
    num: "06",
    title: "HR Onboarding Agent",
    desc: "AI-powered HR automation - one form submission triggers a full onboarding workflow. n8n orchestrates Groq AI to generate a welcome email and task checklist, Gmail sends it, and Google Sheets logs the record automatically.",
    stack: ["n8n", "Groq API", "FastAPI", "Gmail API", "Google Sheets", "HTML/CSS/JS"],
    github: "https://github.com/malankatharula/HROnboardingAgent",
    live: "https://malankatharula.github.io/HROnboardingAgent",
  },
   {
    num: "07",
    title: "DocuAgent",
    desc: "Full-stack AI document extraction web app. Upload any PDF, PNG, or JPG - Llama 4 Scout extracts a summary, key fields, and anomalies, then exports the results to a formatted Excel file and PDF report.",
    stack: ["FastAPI", "Groq API", "pdf2image", "ReportLab", "Docker", "HTML/CSS/JS"],
    github: "https://github.com/malankatharula/DocuAgent",
    live: "https://malankatharula.github.io/DocuAgent",
  },
  {
    num: "08",
    title: "Library Management System (LMS)",
    desc: "Fully functional 2nd-year group project with MVC architecture, Role-Based Access Control, and member/staff/admin features including approval systems with email notifications.",
    stack: ["PHP", "MySQL", "Bootstrap", "AJAX", "RBAC"],
    github: "https://github.com/Dulakshi-dev/LMS.git",
    live: "https://drive.google.com/file/d/1rEXXjObN79GJ0wBBVMxAMHHWXSayUxVu/view",
    featured: true,
  },
  {
    num: "09",
    title: "Custom Operating System",
    desc: "3rd-year group project: a simple OS built from scratch with custom bootloader in Assembly, C kernel, basic GUI, graphics rendering, keyboard/mouse input, and task system running on QEMU.",
    stack: ["C", "x86 Assembly", "QEMU"],
    featured: true,
  },
  {
    num: "10",
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
                {p.featured && (
                  <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--neon-magenta)" }}>
                    ★ featured
                  </span>
                )}
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