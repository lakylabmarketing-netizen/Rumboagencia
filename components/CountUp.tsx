'use client';
import { useEffect, useRef, useState } from 'react';

const fmt = (n: number) => n.toLocaleString('es-ES').replace(/^(\d)(\d{3})$/, '$1.$2');

/** Cifra que cuenta desde 0 (o desde `from`) hasta `to` cuando aparece en pantalla. */
export default function CountUp({ to, from = 0, prefix = '', suffix = '' }: { to: number; from?: number; prefix?: string; suffix?: string }) {
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
        const k = Math.min(1, (t - t0) / dur), ease = 1 - Math.pow(1 - k, 3);
        setN(Math.round(from + (to - from) * ease));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, from]);
  return <span ref={ref}>{prefix}{fmt(n)}{suffix}</span>;
}
