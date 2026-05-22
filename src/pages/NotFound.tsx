import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 fx-scanlines">
      <div className="max-w-lg text-center">
        <div
          className="font-mono text-xs uppercase tracking-[0.4em]"
          style={{ color: "var(--neon-magenta)" }}
        >
          // SIGNAL_LOST
        </div>
        <h1
          className="font-display mt-4 text-[8rem] leading-none font-black glitch"
          data-text="404"
        >
          404
        </h1>
        <p className="mt-4 font-mono text-sm" style={{ color: "var(--text-dim)" }}>
          {">"} requested coordinate not found in the grid.
        </p>
        <div className="mt-8">
          <Link to="/" className="btn-neon">
            &lt;&lt; Return to base
          </Link>
        </div>
      </div>
    </div>
  );
}
