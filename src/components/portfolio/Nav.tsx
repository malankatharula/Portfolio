import { useEffect, useState } from "react";
import { useActiveSection } from "@/hooks/use-active-section";

const LINKS = [
  { id: "hero", label: "00 / Home" },
  { id: "about", label: "01 / About" },
  { id: "skills", label: "02 / Skills" },
  { id: "projects", label: "03 / Projects" },
  { id: "experience", label: "04 / XP" },
  { id: "achievements", label: "05 / Wins" },
  { id: "education", label: "06 / EDU" },
  { id: "contact", label: "07 / Contact" },
];

export function Nav() {
  const active = useActiveSection(LINKS.map((l) => l.id));
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl" : ""
      }`}
      style={{
        background: scrolled ? "rgba(10,10,15,0.7)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#hero" className="flex items-center gap-2">
          <span className="dot-pulse" />
          <span className="font-display text-sm font-bold tracking-[0.3em]" style={{ color: "var(--text)" }}>
            Malanka Tharula
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => {
            const isActive = active === l.id;
            return (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="group relative px-3 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors"
                style={{ color: isActive ? "var(--neon-cyan)" : "var(--text-dim)" }}
              >
                {l.label}
                <span
                  className="absolute inset-x-3 -bottom-0.5 h-px transition-all"
                  style={{
                    background: "var(--neon-cyan)",
                    boxShadow: "var(--glow-cyan)",
                    transform: isActive ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                  }}
                />
              </a>
            );
          })}
        </nav>

        <a href="#contact" className="btn-neon hidden lg:inline-flex">Hire Me</a>

        <button
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden flex h-10 w-10 items-center justify-center border"
          style={{ borderColor: "var(--neon-cyan)", color: "var(--neon-cyan)" }}
        >
          <div className="flex flex-col gap-1">
            <span className="block h-px w-5 bg-current" />
            <span className="block h-px w-5 bg-current" />
            <span className="block h-px w-5 bg-current" />
          </div>
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t" style={{ borderColor: "var(--line)", background: "rgba(10,10,15,0.95)" }}>
          <div className="flex flex-col p-4">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="border-b py-3 font-mono text-xs uppercase tracking-widest"
                style={{ borderColor: "var(--line)", color: active === l.id ? "var(--neon-cyan)" : "var(--text-dim)" }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}