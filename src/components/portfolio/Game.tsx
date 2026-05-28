import { useCallback, useEffect, useRef, useState } from "react";
import { SectionHeading } from "./SectionHeading";

type Cell = { x: number; y: number };

const COLS = 20;
const ROWS = 14;
const TILE = 24;
const TICK_MS = 110;

function randCell(exclude: Cell[]): Cell {
  while (true) {
    const c = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
    if (!exclude.some((e) => e.x === c.x && e.y === c.y)) return c;
  }
}

export function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const stateRef = useRef({
    snake: [{ x: 10, y: 7 }] as Cell[],
    dir: { x: 1, y: 0 },
    nextDir: { x: 1, y: 0 },
    food: { x: 5, y: 5 } as Cell,
    alive: true,
    score: 0,
  });

  useEffect(() => {
    const saved = Number(localStorage.getItem("cyber-snake-best") || 0);
    if (saved) setBest(saved);
  }, []);

  const reset = () => {
    stateRef.current = {
      snake: [{ x: 10, y: 7 }],
      dir: { x: 1, y: 0 },
      nextDir: { x: 1, y: 0 },
      food: randCell([{ x: 10, y: 7 }]),
      alive: true,
      score: 0,
    };
    setScore(0);
    setGameOver(false);
    setRunning(true);
  };

  // Shared direction handler - used by both keyboard and touch D-pad
  const handleDirection = useCallback(
    (direction: "up" | "down" | "left" | "right") => {
      const s = stateRef.current;
      const map: Record<string, Cell> = {
        up: { x: 0, y: -1 },
        down: { x: 0, y: 1 },
        left: { x: -1, y: 0 },
        right: { x: 1, y: 0 },
      };
      const nd = map[direction];
      if (!nd) return;
      if (nd.x === -s.dir.x && nd.y === -s.dir.y) return;
      s.nextDir = nd;
    },
    [],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key;
      const arrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "];
      if (!arrowKeys.includes(k)) return;
      if (k === " ") {
        e.preventDefault();
        if (!running || gameOver) reset();
        return;
      }
      e.preventDefault();
      const keyMap: Record<string, "up" | "down" | "left" | "right"> = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
      };
      handleDirection(keyMap[k]);
    };
    window.addEventListener("keydown", onKey, { passive: false });
    return () => window.removeEventListener("keydown", onKey);
  }, [running, gameOver, handleDirection]);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      const s = stateRef.current;
      if (!s.alive) return;
      s.dir = s.nextDir;
      const head = s.snake[0];
      const next = { x: head.x + s.dir.x, y: head.y + s.dir.y };
      // wall collision
      if (next.x < 0 || next.y < 0 || next.x >= COLS || next.y >= ROWS) {
        s.alive = false;
        setGameOver(true);
        setRunning(false);
        setBest((b) => {
          const nb = Math.max(b, s.score);
          localStorage.setItem("cyber-snake-best", String(nb));
          return nb;
        });
        return;
      }
      // self collision
      if (s.snake.some((c) => c.x === next.x && c.y === next.y)) {
        s.alive = false;
        setGameOver(true);
        setRunning(false);
        setBest((b) => {
          const nb = Math.max(b, s.score);
          localStorage.setItem("cyber-snake-best", String(nb));
          return nb;
        });
        return;
      }
      s.snake.unshift(next);
      if (next.x === s.food.x && next.y === s.food.y) {
        s.score += 1;
        setScore(s.score);
        s.food = randCell(s.snake);
      } else {
        s.snake.pop();
      }
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [running]);

  // Draw loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    const draw = () => {
      const s = stateRef.current;
      const W = COLS * TILE;
      const H = ROWS * TILE;
      // bg
      ctx.fillStyle = "#07070d";
      ctx.fillRect(0, 0, W, H);
      // grid
      ctx.strokeStyle = "rgba(0, 229, 255, 0.07)";
      ctx.lineWidth = 1;
      for (let x = 0; x <= COLS; x++) {
        ctx.beginPath();
        ctx.moveTo(x * TILE + 0.5, 0);
        ctx.lineTo(x * TILE + 0.5, H);
        ctx.stroke();
      }
      for (let y = 0; y <= ROWS; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * TILE + 0.5);
        ctx.lineTo(W, y * TILE + 0.5);
        ctx.stroke();
      }

      // helper for a minecraft-style block
      const drawBlock = (cx: number, cy: number, color: string, glow: string) => {
        const px = cx * TILE;
        const py = cy * TILE;
        const pad = 2;
        ctx.shadowColor = glow;
        ctx.shadowBlur = 14;
        ctx.fillStyle = color;
        ctx.fillRect(px + pad, py + pad, TILE - pad * 2, TILE - pad * 2);
        ctx.shadowBlur = 0;
        // top highlight
        ctx.fillStyle = "rgba(255,255,255,0.22)";
        ctx.fillRect(px + pad, py + pad, TILE - pad * 2, 3);
        ctx.fillRect(px + pad, py + pad, 3, TILE - pad * 2);
        // bottom shadow
        ctx.fillStyle = "rgba(0,0,0,0.35)";
        ctx.fillRect(px + pad, py + TILE - pad - 3, TILE - pad * 2, 3);
        ctx.fillRect(px + TILE - pad - 3, py + pad, 3, TILE - pad * 2);
      };

      // food
      drawBlock(s.food.x, s.food.y, "#ff2bd6", "#ff2bd6");

      // snake
      s.snake.forEach((c, i) => {
        const isHead = i === 0;
        drawBlock(c.x, c.y, isHead ? "#22ff88" : "#00e5ff", isHead ? "#22ff88" : "#00e5ff");
      });

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  const W = COLS * TILE;
  const H = ROWS * TILE;

  return (
    <section id="arcade" className="relative px-4 py-24 sm:px-6 md:px-12">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="// 07" title="ARCADE.exe" kicker="Easter egg / offline mode" />

        <div className="reveal flex flex-col items-center">
          <div
            className="neon-border relative w-full"
            style={{ padding: 2, borderRadius: 8, maxWidth: W + 4 }}
          >
            <div
              className="relative w-full overflow-hidden"
              style={{
                background: "#07070d",
                borderRadius: 6,
              }}
            >
              {/* Console header */}
              <div
                className="flex items-center justify-between border-b px-2 py-1.5 font-mono uppercase tracking-widest sm:px-3 sm:py-2"
                style={{
                  borderColor: "rgba(0, 229, 255, 0.15)",
                  color: "var(--text-dim)",
                  fontSize: "clamp(8px, 2.5vw, 11px)",
                }}
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2" style={{ background: "#ff2bd6", boxShadow: "0 0 8px #ff2bd6" }} />
                  <span>cyber_snake.sh</span>
                </div>
                <div style={{ color: "var(--neon-cyan)" }}>
                  SCORE <span style={{ color: "var(--neon-green)" }}>{String(score).padStart(3, "0")}</span>
                  <span className="mx-1 opacity-40 sm:mx-2">|</span>
                  BEST <span style={{ color: "var(--neon-magenta)" }}>{String(best).padStart(3, "0")}</span>
                </div>
              </div>

              {/* Canvas - scales proportionally via aspect-ratio */}
              <div
                className="relative w-full"
                style={{ aspectRatio: `${W} / ${H}` }}
              >
                <canvas
                  ref={canvasRef}
                  width={W}
                  height={H}
                  style={{ display: "block", width: "100%", height: "100%", imageRendering: "pixelated" }}
                />

                {/* Overlay: start / gameover */}
                {(!running || gameOver) && (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center sm:gap-4"
                    style={{ background: "rgba(7, 7, 13, 0.78)", backdropFilter: "blur(2px)" }}
                  >
                    <div
                      className="font-display font-black tracking-widest"
                      style={{
                        fontSize: "clamp(1.1rem, 5vw, 1.875rem)",
                        color: gameOver ? "var(--neon-magenta)" : "var(--neon-cyan)",
                        textShadow: "0 0 18px currentColor",
                      }}
                    >
                      {gameOver ? "GAME OVER" : "READY PLAYER ONE"}
                    </div>
                    <div
                      className="font-mono uppercase"
                      style={{
                        color: "var(--text-dim)",
                        fontSize: "clamp(8px, 2.5vw, 12px)",
                        letterSpacing: "0.15em",
                      }}
                    >
                      Use <span style={{ color: "var(--neon-cyan)" }}>↑ ↓ ← →</span> to move · eat the magenta cube
                    </div>
                    <button
                      onClick={reset}
                      className="font-mono uppercase transition"
                      style={{
                        fontSize: "clamp(9px, 2.5vw, 12px)",
                        letterSpacing: "0.15em",
                        padding: "0.4rem 1rem",
                        border: "1px solid var(--neon-cyan)",
                        color: "var(--neon-cyan)",
                        background: "rgba(0, 229, 255, 0.08)",
                        boxShadow: "0 0 18px rgba(0, 229, 255, 0.35)",
                      }}
                    >
                      {gameOver ? "▶ Retry [space]" : "▶ Boot [space]"}
                    </button>
                  </div>
                )}
              </div>

              {/* Console footer */}
              <div
                className="border-t px-2 py-1.5 font-mono uppercase sm:px-3 sm:py-2"
                style={{
                  borderColor: "rgba(0, 229, 255, 0.15)",
                  color: "var(--text-dim)",
                  fontSize: "clamp(7px, 2.2vw, 10px)",
                  letterSpacing: "0.15em",
                }}
              >
                <span style={{ color: "var(--neon-green)" }}>$</span> ./run --mode=offline --vibe=cyberpunk
              </div>
            </div>
          </div>

          {/* Mobile D-pad - only visible on small screens */}
          <div
            className="mt-6 sm:hidden"
            style={{ touchAction: "manipulation" }}
          >
            <MobileDpad
              onDirection={handleDirection}
              onStart={reset}
              canStart={!running || gameOver}
            />
          </div>

          <p
            className="reveal mt-6 max-w-md text-center font-mono uppercase"
            style={{
              color: "var(--text-dim)",
              fontSize: "clamp(9px, 2.5vw, 12px)",
              letterSpacing: "0.15em",
            }}
          >
            <span className="hidden sm:inline">no wifi? no problem. // arrow keys to play</span>
            <span className="sm:hidden">no wifi? no problem. // tap arrows to play</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Mobile D-pad - cyberpunk themed touch controls
   ───────────────────────────────────────────── */

type DpadProps = {
  onDirection: (dir: "up" | "down" | "left" | "right") => void;
  onStart: () => void;
  canStart: boolean;
};

function MobileDpad({ onDirection, onStart, canStart }: DpadProps) {
  const SIZE = 180;
  const CENTER = SIZE / 2;
  const ARROW_OFFSET = 38; // distance from center to each arrow

  const handleTouch = (dir: "up" | "down" | "left" | "right") => (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    onDirection(dir);
  };

  const arrowBtnStyle: React.CSSProperties = {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    background: "transparent",
    border: "none",
    color: "var(--neon-cyan)",
    borderRadius: "50%",
    WebkitTapHighlightColor: "transparent",
    touchAction: "manipulation",
    userSelect: "none",
    cursor: "pointer",
    transition: "all 0.12s ease",
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Label */}
      <div
        className="font-mono uppercase"
        style={{
          fontSize: "clamp(8px, 2.5vw, 10px)",
          letterSpacing: "0.2em",
          color: "var(--text-muted)",
        }}
      >
        <span style={{ color: "var(--neon-cyan)" }}>▸</span> touch_controls.sh
      </div>

      {/* Circular D-pad */}
      <div
        className="relative"
        style={{
          width: SIZE,
          height: SIZE,
        }}
      >
        {/* Outer circle - dark bg with neon border */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "radial-gradient(circle, #0d0d18 0%, #08080f 100%)",
            border: "1.5px solid rgba(0, 229, 255, 0.2)",
            boxShadow:
              "0 0 24px rgba(0, 229, 255, 0.08), inset 0 0 30px rgba(0, 0, 0, 0.5)",
          }}
        />

        {/* Subtle cross-hair lines */}
        <div
          style={{
            position: "absolute",
            top: CENTER - 0.5,
            left: 24,
            right: 24,
            height: 1,
            background: "rgba(0, 229, 255, 0.06)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: CENTER - 0.5,
            top: 24,
            bottom: 24,
            width: 1,
            background: "rgba(0, 229, 255, 0.06)",
          }}
        />

        {/* UP */}
        <button
          onTouchStart={handleTouch("up")}
          onMouseDown={handleTouch("up")}
          className="dpad-arrow"
          style={{
            ...arrowBtnStyle,
            top: 6,
            left: CENTER - 24,
          }}
          aria-label="Up"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="17 14 12 9 7 14" />
          </svg>
        </button>

        {/* DOWN */}
        <button
          onTouchStart={handleTouch("down")}
          onMouseDown={handleTouch("down")}
          className="dpad-arrow"
          style={{
            ...arrowBtnStyle,
            bottom: 6,
            left: CENTER - 24,
          }}
          aria-label="Down"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="7 10 12 15 17 10" />
          </svg>
        </button>

        {/* LEFT */}
        <button
          onTouchStart={handleTouch("left")}
          onMouseDown={handleTouch("left")}
          className="dpad-arrow"
          style={{
            ...arrowBtnStyle,
            top: CENTER - 24,
            left: 6,
          }}
          aria-label="Left"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="14 17 9 12 14 7" />
          </svg>
        </button>

        {/* RIGHT */}
        <button
          onTouchStart={handleTouch("right")}
          onMouseDown={handleTouch("right")}
          className="dpad-arrow"
          style={{
            ...arrowBtnStyle,
            top: CENTER - 24,
            right: 6,
          }}
          aria-label="Right"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="10 17 15 12 10 7" />
          </svg>
        </button>

        {/* Center circle button */}
        <button
          onTouchStart={(e) => { e.preventDefault(); if (canStart) onStart(); }}
          onMouseDown={(e) => { e.preventDefault(); if (canStart) onStart(); }}
          style={{
            position: "absolute",
            top: CENTER - ARROW_OFFSET / 2 - 4,
            left: CENTER - ARROW_OFFSET / 2 - 4,
            width: ARROW_OFFSET + 8,
            height: ARROW_OFFSET + 8,
            borderRadius: "50%",
            border: canStart
              ? "1.5px solid var(--neon-magenta)"
              : "1.5px solid rgba(0, 229, 255, 0.25)",
            background: canStart
              ? "radial-gradient(circle, rgba(255,43,214,0.2) 0%, rgba(255,43,214,0.05) 100%)"
              : "radial-gradient(circle, rgba(0,229,255,0.12) 0%, rgba(0,229,255,0.03) 100%)",
            color: canStart ? "var(--neon-magenta)" : "var(--neon-cyan)",
            boxShadow: canStart
              ? "0 0 18px rgba(255,43,214,0.35), inset 0 0 10px rgba(255,43,214,0.1)"
              : "0 0 12px rgba(0,229,255,0.15), inset 0 0 8px rgba(0,229,255,0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            transition: "all 0.2s ease",
            WebkitTapHighlightColor: "transparent",
            touchAction: "manipulation",
            cursor: "pointer",
          }}
          aria-label={canStart ? "Start game" : "Playing"}
        >
          {canStart ? "▶" : "●"}
        </button>
      </div>

      {/* Active-state glow styles */}
      <style>{`
        .dpad-arrow:active {
          color: #fff !important;
          filter: drop-shadow(0 0 8px rgba(0, 229, 255, 0.7));
          transform: scale(0.88);
        }
      `}</style>
    </div>
  );
}

