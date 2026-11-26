'use client';
import { useEffect, useRef, useState } from 'react';

const fmt = (n: number) => n.toLocaleString('es-ES').replace(/^(\d)(\d{3})$/, '$1.$2');

/**
 * Cifra que cuenta desde 0 (o desde `from`) hasta `to` cuando aparece en pantalla.
 * `step` redondea siempre hacia abajo (así «+430K» sigue siendo cierto con 432.490) y `k` lo muestra en miles.
 */
export default function CountUp({ to, from = 0, prefix = '', suffix = '', step = 1, k = false }:
  { to: number; from?: number; prefix?: string; suffix?: string; step?: number; k?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setN(from);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now(), dur = 1600;
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / dur), ease = 1 - Math.pow(1 - p, 3);
        setN(Math.round(from + (to - from) * ease));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, from]);
  const v = Math.floor(n / step) * step;
  return <span ref={ref}>{prefix}{k ? `${fmt(Math.floor(v / 1000))}K` : fmt(v)}{suffix}</span>;
}
