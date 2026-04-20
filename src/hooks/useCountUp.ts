import { useEffect, useRef, useState } from "react";

export function useCountUp(target: number, duration = 800): number {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [val, setVal] = useState<number>(prefersReduced ? target : 0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReduced) {
      setVal(target);
      return;
    }
    const startTs = performance.now();
    const step = (ts: number) => {
      const t = Math.min(1, (ts - startTs) / duration);
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setVal(Math.round(target * eased));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [target, duration, prefersReduced]);

  return val;
}
