import { useEffect, useRef } from "react";

export function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.innerWidth < 720;
    const COUNT = reduce ? 0 : mobile ? 40 : 90;

    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const nodes = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
    }));

    let mouseX = -9999, mouseY = -9999;
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseX = e.clientX - r.left; mouseY = e.clientY - r.top;
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 130 * 130) {
            const alpha = 1 - d2 / (130 * 130);
            ctx.strokeStyle = `rgba(0, 229, 255, ${alpha * 0.25})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      // mouse links
      for (const n of nodes) {
        const dx = n.x - mouseX, dy = n.y - mouseY;
        const d2 = dx * dx + dy * dy;
        if (d2 < 180 * 180) {
          const alpha = 1 - d2 / (180 * 180);
          ctx.strokeStyle = `rgba(255, 43, 214, ${alpha * 0.5})`;
          ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(mouseX, mouseY); ctx.stroke();
        }
      }
      // nodes
      for (const n of nodes) {
        ctx.fillStyle = "rgba(0, 229, 255, 0.9)";
        ctx.beginPath(); ctx.arc(n.x, n.y, 1.4, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    if (!reduce) raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 fx-grid" />
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
    </div>
  );
}