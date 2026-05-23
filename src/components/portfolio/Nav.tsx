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
  { id: "arcade", label: "07 / Arcade" },
  { id: "contact", label: "08 / Contact" },
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Backdrop overlay when mobile menu is open */}
      {open && (
        <div
          className="fixed inset-0 lg:hidden"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 89 }}
          onClick={() => setOpen(false)}
        />
      )}

      <header
        className={`fixed inset-x-0 top-0 transition-all duration-300 ${
          scrolled || open ? "backdrop-blur-xl" : ""
        }`}
        style={{
          zIndex: 90,
          background: scrolled || open ? "rgba(10,10,15,0.85)" : "transparent",
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

          {/* Mobile hamburger / X toggle */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="relative flex h-10 w-10 items-center justify-center rounded border lg:hidden"
            style={{
              borderColor: open ? "var(--neon-magenta)" : "var(--neon-cyan)",
              color: open ? "var(--neon-magenta)" : "var(--neon-cyan)",
              background: open ? "rgba(255,43,214,0.08)" : "transparent",
              boxShadow: open ? "0 0 12px rgba(255,43,214,0.3)" : "none",
              transition: "all 0.3s ease",
            }}
          >
            <div className="flex flex-col items-center justify-center gap-[5px]">
              <span
                className="block h-[2px] w-5 rounded-full bg-current"
                style={{
                  transition: "all 0.3s ease",
                  transform: open ? "rotate(45deg) translate(2.5px, 2.5px)" : "none",
                }}
              />
              <span
                className="block h-[2px] w-5 rounded-full bg-current"
                style={{
                  transition: "all 0.3s ease",
                  opacity: open ? 0 : 1,
                  transform: open ? "scaleX(0)" : "scaleX(1)",
                }}
              />
              <span
                className="block h-[2px] w-5 rounded-full bg-current"
                style={{
                  transition: "all 0.3s ease",
                  transform: open ? "rotate(-45deg) translate(2.5px, -2.5px)" : "none",
                }}
              />
            </div>
          </button>
        </div>

        {/* Mobile slide-down menu */}
        <div
          className="lg:hidden overflow-hidden border-t"
          style={{
            borderColor: open ? "var(--line)" : "transparent",
            background: "rgba(10,10,15,0.95)",
            maxHeight: open ? `${LINKS.length * 52 + 32}px` : "0px",
            opacity: open ? 1 : 0,
            transition: "max-height 0.35s ease, opacity 0.25s ease",
          }}
        >
          <div className="flex flex-col p-4">
            {LINKS.map((l, i) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="border-b py-3 font-mono text-xs uppercase tracking-widest"
                style={{
                  borderColor: "var(--line)",
                  color: active === l.id ? "var(--neon-cyan)" : "var(--text-dim)",
                  transition: "color 0.2s ease, transform 0.3s ease, opacity 0.3s ease",
                  transitionDelay: open ? `${i * 30}ms` : "0ms",
                  transform: open ? "translateX(0)" : "translateX(-12px)",
                  opacity: open ? 1 : 0,
                }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}