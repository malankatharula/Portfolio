import { useEffect, useRef, useState } from "react";
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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key;
      const arrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "];
      if (!arrowKeys.includes(k)) return;
      // Only intercept arrows when game is running/visible-focused
      if (k === " ") {
        e.preventDefault();
        if (!running || gameOver) reset();
        return;
      }
      const s = stateRef.current;
      const map: Record<string, Cell> = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
      };
      const nd = map[k];
      if (!nd) return;
      // prevent reversing onto self
      if (nd.x === -s.dir.x && nd.y === -s.dir.y) return;
      e.preventDefault();
      s.nextDir = nd;
    };
    window.addEventListener("keydown", onKey, { passive: false });
    return () => window.removeEventListener("keydown", onKey);
  }, [running, gameOver]);

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
    <section id="arcade" className="relative px-6 py-24 md:px-12">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="// 09" title="ARCADE.exe" kicker="Easter egg / offline mode" />

        <div className="reveal flex flex-col items-center">
          <div
            className="neon-border relative"
            style={{ padding: 2, borderRadius: 8 }}
          >
            <div
              className="relative overflow-hidden"
              style={{
                background: "#07070d",
                borderRadius: 6,
                width: W,
                maxWidth: "100%",
              }}
            >
              {/* Console header */}
              <div
                className="flex items-center justify-between border-b px-3 py-2 font-mono text-[11px] uppercase tracking-widest"
                style={{ borderColor: "rgba(0, 229, 255, 0.15)", color: "var(--text-dim)" }}
              >
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full" style={{ background: "#ff2bd6", boxShadow: "0 0 8px #ff2bd6" }} />
                  <span>cyber_snake.sh</span>
                </div>
                <div style={{ color: "var(--neon-cyan)" }}>
                  SCORE <span style={{ color: "var(--neon-green)" }}>{String(score).padStart(3, "0")}</span>
                  <span className="mx-2 opacity-40">|</span>
                  BEST <span style={{ color: "var(--neon-magenta)" }}>{String(best).padStart(3, "0")}</span>
                </div>
              </div>

              {/* Canvas */}
              <div className="relative" style={{ width: W, height: H, maxWidth: "100%" }}>
                <canvas
                  ref={canvasRef}
                  width={W}
                  height={H}
                  style={{ display: "block", width: "100%", height: "100%", imageRendering: "pixelated" }}
                />

                {/* Overlay: start / gameover */}
                {(!running || gameOver) && (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center"
                    style={{ background: "rgba(7, 7, 13, 0.78)", backdropFilter: "blur(2px)" }}
                  >
                    <div
                      className="font-display text-3xl font-black tracking-widest"
                      style={{ color: gameOver ? "var(--neon-magenta)" : "var(--neon-cyan)", textShadow: "0 0 18px currentColor" }}
                    >
                      {gameOver ? "GAME OVER" : "READY PLAYER ONE"}
                    </div>
                    <div className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--text-dim)" }}>
                      Use <span style={{ color: "var(--neon-cyan)" }}>↑ ↓ ← →</span> to move · eat the magenta cube
                    </div>
                    <button
                      onClick={reset}
                      className="font-mono text-xs uppercase tracking-[0.3em] px-5 py-2 transition"
                      style={{
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
                className="border-t px-3 py-2 font-mono text-[10px] uppercase tracking-[0.3em]"
                style={{ borderColor: "rgba(0, 229, 255, 0.15)", color: "var(--text-dim)" }}
              >
                <span style={{ color: "var(--neon-green)" }}>$</span> ./run --mode=offline --vibe=cyberpunk
              </div>
            </div>
          </div>

          <p className="reveal mt-6 max-w-md text-center font-mono text-xs uppercase tracking-[0.25em]" style={{ color: "var(--text-dim)" }}>
            no wifi? no problem. // arrow keys to play
          </p>
        </div>
      </div>
    </section>
  );
}