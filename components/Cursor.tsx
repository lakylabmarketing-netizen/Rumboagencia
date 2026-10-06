'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * Cursor sencillo: un punto naranja que sigue al ratón con un poco de inercia.
 * Sobre enlaces, botones y vídeos se abre en un aro; en los campos de texto se oculta y vuelve el cursor normal.
 * Solo con ratón; en pantallas táctiles no existe.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine) return;
    setOn(true);
    document.documentElement.classList.add('has-cursor');
    let x = -100, y = -100, cx = x, cy = y, raf = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      const el = dot.current;
      if (!el) return;
      const t = e.target as HTMLElement;
      el.classList.toggle('is-hover', !!t.closest('a, button, summary, label, video, [data-cursor]'));
      el.classList.toggle('is-hidden', !!t.closest('input, textarea, select'));
    };
    const leave = () => dot.current?.classList.add('is-hidden');
    const enter = () => dot.current?.classList.remove('is-hidden');
    const loop = () => {
      const k = reduced ? 1 : 0.22;
      cx += (x - cx) * k; cy += (y - cy) * k;
      if (dot.current) dot.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    document.addEventListener('pointerenter', enter);
    raf = requestAnimationFrame(loop);
    return () => {
      removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
      document.removeEventListener('pointerenter', enter);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);

  if (!on) return null;
  return <div ref={dot} className="cursor-dot" aria-hidden><span /></div>;
}
