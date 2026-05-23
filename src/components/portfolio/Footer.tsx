"use client";

const LINKS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function Footer() {
  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = `${import.meta.env.BASE_URL}cv/Malanka_Tharula_CV.pdf`;
    link.download = "Malanka_Tharula_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <footer
      className="relative mt-20 border-t"
      style={{ borderColor: "var(--line)", background: "rgba(10,10,15,0.6)" }}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-12 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-3">
            <span className="dot-pulse" />
            <span className="font-display text-lg font-bold tracking-[0.2em]">Malanka Tharula</span>
          </div>
          <p className="mt-2 font-mono text-xs" style={{ color: "var(--text-muted)" }}>
            Backend developer & deep learning enthusiast — built with caffeine & cathode rays.
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-6">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="font-mono text-xs uppercase tracking-widest transition-colors hover:[color:var(--neon-cyan)]"
              style={{ color: "var(--text-dim)" }}
            >
              {l.label}
            </a>
          ))}
          <button onClick={handleDownloadCV} className="btn-neon">↓ Get CV</button>
        </nav>
      </div>
      <div
        className="border-t px-6 py-4 text-center font-mono text-[10px] uppercase tracking-[0.3em]"
        style={{ borderColor: "var(--line)", color: "var(--text-muted)" }}
      >
        © {new Date().getFullYear()} Malanka Tharula · all systems nominal
      </div>
    </footer>
  );
}