import { useEffect, useState } from "react";

export function ArcadeFab() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const arcade = document.getElementById("arcade");
      if (!arcade) return;
      const rect = arcade.getBoundingClientRect();
      // Hide when arcade section is in view
      const inView = rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.3;
      setVisible(!inView);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#arcade"
      aria-label="Go to Arcade"
      className="group fixed z-50"
      style={{
        bottom: "2rem",
        right: "1.5rem",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.5)",
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
      {/* Tooltip */}
      <span
        className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest"
        style={{
          background: "rgba(10,10,15,0.9)",
          border: "1px solid var(--neon-magenta)",
          color: "var(--neon-magenta)",
          opacity: 0,
          transform: "translateX(6px)",
          transition: "opacity 0.2s ease, transform 0.2s ease",
        }}
      >
        Play Snake
      </span>

      {/* Glow ring */}
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background: "rgba(255, 43, 214, 0.15)",
          animation: "fab-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
        }}
      />

      {/* Button */}
      <span
        className="relative flex h-14 w-14 items-center justify-center rounded-full"
        style={{
          background: "linear-gradient(135deg, rgba(255,43,214,0.2), rgba(168,85,247,0.2))",
          border: "1.5px solid var(--neon-magenta)",
          boxShadow: "0 0 20px rgba(255,43,214,0.4), inset 0 0 12px rgba(255,43,214,0.1)",
          transition: "all 0.25s ease",
        }}
      >
        {/* Gamepad icon */}
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: "var(--neon-magenta)", filter: "drop-shadow(0 0 4px rgba(255,43,214,0.6))" }}
        >
          <rect x="2" y="6" width="20" height="12" rx="3" />
          <line x1="6" y1="10" x2="6" y2="14" />
          <line x1="4" y1="12" x2="8" y2="12" />
          <circle cx="16" cy="10" r="1" fill="currentColor" />
          <circle cx="19" cy="12" r="1" fill="currentColor" />
          <circle cx="16" cy="14" r="1" fill="currentColor" />
        </svg>
      </span>

      {/* Inline styles for hover + ping animation */}
      <style>{`
        .group:hover span[class*="pointer-events-none"] {
          opacity: 1 !important;
          transform: translateX(0) translateY(-50%) !important;
        }
        .group:hover > span:last-of-type {
          box-shadow: 0 0 28px rgba(255,43,214,0.6), inset 0 0 16px rgba(255,43,214,0.15) !important;
          transform: scale(1.08);
        }
        @keyframes fab-ping {
          0% { transform: scale(1); opacity: 0.5; }
          75%, 100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </a>
  );
}
