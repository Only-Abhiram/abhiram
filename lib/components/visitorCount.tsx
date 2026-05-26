"use client";

import { useEffect, useRef, useState } from "react";

interface VisitorResponse {
  count: number;
}

// Animate a number from `from` to `to`
function useCountUp(target: number, duration = 1200) {
  const [display, setDisplay] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (target === 0) return;
    const start = performance.now();
    const from = 0;

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(from + (target - from) * eased));
      if (progress < 1) raf.current = requestAnimationFrame(step);
      else setDisplay(target);
    };

    raf.current = requestAnimationFrame(step);
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [target, duration]);

  return display;
}

export default function VisitorCounter() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const animated = useCountUp(count);
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    const track = async () => {
      try {
        const res = await fetch("/api/visitors", { method: "POST" });
        if (!res.ok) throw new Error();
        const data: VisitorResponse = await res.json();
        setCount(data.count);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    track();
  }, []);

  // Format number with thin-space thousands separator
  const format = (n: number) =>
    n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u2009");

  return (
    <div className="group relative w-full max-w-sm">
      <div className="border border-black/10 bg-white px-5 py-4 transition-all duration-500 hover:border-black/30">
        {/* Top label */}
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/30">
          Visitors
        </p>

        {/* Counter */}
        <div className="mt-3 flex items-end justify-between gap-2">
          {loading ? (
            <div className="h-10 w-24 animate-pulse rounded-none bg-black/5" />
          ) : error ? (
            <span className="text-sm text-black/30">—</span>
          ) : (
            <span className="font-[family-name:var(--font-counter)] text-[2.75rem] font-thin leading-none tracking-tight text-black tabular-nums">
              {format(animated)}
            </span>
          )}

          {/* Ordinal badge */}
          {!loading && !error && (
            <span className="mb-1 text-[10px] text-black/30">
              {ordinal(count)}
            </span>
          )}
        </div>

        {/* Subline */}
        {!loading && !error && (
          <p className="mt-2 text-[11px] text-black/35">
            You are the{" "}
            <span className="font-semibold text-black/60">
              {format(count)}
              {ordinalSuffix(count)}
            </span>{" "}
            visitor to this site.
          </p>
        )}

        {/* Decorative rule */}
        <div className="mt-4 flex items-center gap-2">
          <div className="h-px flex-1 bg-black/8 transition-all duration-500 group-hover:bg-black/15" />
          <div className="h-1 w-1 rounded-full bg-black/10 transition-all duration-500 group-hover:bg-black/30" />
        </div>
      </div>
    </div>
  );
}

function ordinalSuffix(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] ?? s[v] ?? s[0];
}

function ordinal(n: number): string {
  return `#${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u2009")}`;
}