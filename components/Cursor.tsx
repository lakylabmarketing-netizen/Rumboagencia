'use client';
import { useEffect, useRef, useState } from 'react';

// El texto se actualiza por referencia: sin renders de React en cada movimiento.

/** Punto + cruceta HUD con coordenadas o etiqueta según el elemento. Solo con ratón. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const hud = useRef<HTMLDivElement>(null);
  const txt = useRef<HTMLSpanElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine) return;
    setOn(true);
    document.documentElement.classList.add('has-cursor');
    let x = innerWidth / 2, y = innerHeight / 2, hx = x, hy = y, raf = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      const t = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor], a, button, video, summary, input, textarea, label');
      const lab = t ? t.dataset.cursor || (t.tagName === 'VIDEO' ? 'PLAY' : t.matches('input,textarea') ? 'TYPE' : 'VIEW') : '';
      if (txt.current) txt.current.textContent = lab || `X ${String(Math.round(x)).padStart(4, '0')} · Y ${String(Math.round(y)).padStart(4, '0')}`;
    };
    const loop = () => {
      const k = reduced ? 1 : 0.18;
      hx += (x - hx) * k; hy += (y - hy) * k;
      if (dot.current) dot.current.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;
      if (hud.current) hud.current.style.transform = `translate3d(${hx - 22}px, ${hy - 22}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    addEventListener('pointermove', move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { removeEventListener('pointermove', move); cancelAnimationFrame(raf); document.documentElement.classList.remove('has-cursor'); };
  }, []);

  if (!on) return null;
  return (
    <>
      <div ref={dot} className="cursor-dot h-1.5 w-1.5 rounded-full bg-naranja" aria-hidden />
      <div ref={hud} className="cursor-hud h-11 w-11 text-cal/70" aria-hidden>
        <span className="plus" style={{ left: -5, top: -5 }} />
        <span className="plus" style={{ right: -5, top: -5 }} />
        <span className="plus" style={{ left: -5, bottom: -5 }} />
        <span className="plus" style={{ right: -5, bottom: -5 }} />
        <span ref={txt} className="tech absolute left-14 top-1 whitespace-nowrap text-[10px] text-cal/80" />
      </div>
    </>
  );
}
