import { useEffect, useState } from "react";

export function Typewriter({ words, className }: { words: string[]; className?: string }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const full = words[i % words.length];
    const timeout = setTimeout(() => {
      if (!del) {
        const next = full.slice(0, text.length + 1);
        setText(next);
        if (next === full) setTimeout(() => setDel(true), 1400);
      } else {
        const next = full.slice(0, Math.max(0, text.length - 1));
        setText(next);
        if (next === "") { setDel(false); setI((p) => p + 1); }
      }
    }, del ? 35 : 70);
    return () => clearTimeout(timeout);
  }, [text, del, i, words]);

  return (
    <span className={className}>
      <span style={{ color: "var(--neon-cyan)" }}>{text}</span>
      <span className="ml-1 inline-block w-[10px] animate-pulse" style={{ color: "var(--neon-cyan)" }}>▍</span>
    </span>
  );
}