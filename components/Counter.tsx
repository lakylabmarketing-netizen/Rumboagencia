'use client';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, prefersReduced } from '@/lib/gsap';

const fmt = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

/** Cifra que cuenta hasta su valor al entrar en pantalla (monoespaciada). */
export default function Counter({ v, from, suffix = '' }: { v: number; from?: number; suffix?: string }) {
  const el = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (prefersReduced()) return;
    const o = { n: from ?? 0 };
    const node = el.current!;
    node.textContent = fmt(o.n);
    const st = ScrollTrigger.create({ trigger: node, start: 'top 90%', once: true, onEnter: () =>
      gsap.to(o, { n: v, duration: 1.6, ease: 'expo.out', onUpdate: () => { node.textContent = fmt(o.n); } }) });
    return () => st.kill();
  }, [v, from]);
  return (
    <span className="tabular-nums">
      {from !== undefined && <><span className="text-muted">{fmt(from)}</span><span className="px-2 text-naranja">→</span></>}
      <span ref={el}>{fmt(v)}</span>{suffix}
    </span>
  );
}
