'use client';
import { useEffect, useRef } from 'react';
import { scrollState } from '@/lib/scroll';

/** Marquee infinito gigante que acelera con la velocidad del scroll. */
export default function Marquee({ items }: { items: string[] }) {
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let x = 0, raf = 0, last = performance.now(), visible = true;
    const el = track.current!;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { rootMargin: '200px' });
    io.observe(el);
    const loop = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000); last = t;
      if (visible) {
        const boost = Math.min(14, Math.abs(scrollState.velocity) * 0.9);
        x -= (60 + boost * 60) * dt * (scrollState.velocity < 0 ? -1 : 1);
        const half = el.scrollWidth / 2;
        if (x <= -half) x += half; if (x > 0) x -= half;
        el.style.transform = `translate3d(${x}px,0,0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, []);
  const row = items.map((t, i) => (
    <span key={i} className="flex items-center gap-[.35em] pr-[.35em]">
      <span className={i % 2 ? 'text-transparent [-webkit-text-stroke:1.5px_#F04E17]' : 'text-acero'}>{t}</span>
      <span className="font-thin text-naranja">×</span>
    </span>
  ));
  return (
    <div className="relative overflow-hidden border-y border-line py-6 sm:py-9" aria-hidden>
      <div ref={track} className="marquee-track mega whitespace-nowrap text-[clamp(3.6rem,13vw,12rem)] leading-none">
        {row}{row}
      </div>
    </div>
  );
}
