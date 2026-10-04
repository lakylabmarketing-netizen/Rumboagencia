'use client';
import { useEffect, useRef } from 'react';
import { scramble } from '@/lib/scramble';

type Props = { href: string; children: string; className?: string; solid?: boolean; onClick?: () => void; cursor?: string };

/** Botón HUD: crucetas en las esquinas que se separan, borde que se dibuja, texto que se descifra y atracción magnética. */
export default function CtaCross({ href, children, className = '', solid = false, onClick, cursor = 'GO' }: Props) {
  const a = useRef<HTMLAnchorElement>(null);
  const txt = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = a.current!;
    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate3d(${dx * 0.22}px, ${dy * 0.3}px, 0)`;
    };
    const leave = () => { el.style.transform = ''; };
    const enter = () => { if (txt.current) scramble(txt.current, { duration: 420 }); };
    el.addEventListener('pointermove', move); el.addEventListener('pointerleave', leave); el.addEventListener('pointerenter', enter);
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); el.removeEventListener('pointerenter', enter); };
  }, []);

  return (
    <a ref={a} href={href} onClick={onClick} data-cursor={cursor}
      className={`group relative inline-flex min-h-[52px] items-center justify-center px-7 py-4 font-mono text-[13px] font-bold uppercase tracking-[.16em] transition-[transform,color,background-color] duration-300 ease-out ${solid ? 'bg-naranja text-ink hover:bg-brasa' : 'text-cal hover:text-brasa'} ${className}`}>
      {/* borde fino que se "dibuja" al pasar por encima */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        <rect x="0.5" y="0.5" width="100%" height="100%" fill="none" stroke="currentColor" strokeOpacity={solid ? 0 : 0.28} strokeDasharray="3 4" style={{ width: 'calc(100% - 1px)', height: 'calc(100% - 1px)' }} />
        <rect x="0.5" y="0.5" pathLength={1} fill="none" stroke={solid ? '#0B0B0B' : '#FF8A3D'} strokeWidth="1"
          className="[stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] duration-700 ease-out group-hover:[stroke-dashoffset:0] group-focus-visible:[stroke-dashoffset:0]"
          style={{ width: 'calc(100% - 1px)', height: 'calc(100% - 1px)' }} />
      </svg>
      {(['-left-[6px] -top-[6px] group-hover:-translate-x-1.5 group-hover:-translate-y-1.5', '-right-[6px] -top-[6px] group-hover:translate-x-1.5 group-hover:-translate-y-1.5',
        '-left-[6px] -bottom-[6px] group-hover:-translate-x-1.5 group-hover:translate-y-1.5', '-right-[6px] -bottom-[6px] group-hover:translate-x-1.5 group-hover:translate-y-1.5'] as const).map((p) => (
        <span key={p} className={`plus text-brasa transition-transform duration-300 ease-out ${p}`} aria-hidden />
      ))}
      <span ref={txt} className="relative">{children}</span>
    </a>
  );
}
