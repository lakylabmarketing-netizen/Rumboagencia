'use client';
import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import { gsap, SplitText, prefersReduced } from '@/lib/gsap';
import { Logo } from './Logo';
import CtaCross from './CtaCross';

const Ring = dynamic(() => import('./Ring'), { ssr: false });

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    if (prefersReduced()) { el.classList.add('no-anim'); return; }
    let split: SplitText | null = null;
    const play = () => {
      const h1 = el.querySelector<HTMLElement>('h1')!;
      split = SplitText.create(h1, { type: 'lines', mask: 'lines', linesClass: 'line-mask' });
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.from('[data-hero="logo"]', { y: 14, opacity: 0, duration: 1 })
        .from(split.lines, { yPercent: 110, duration: 1.3, stagger: 0.12 }, '-=0.6')
        .to(el.querySelectorAll('.kw'), { fontWeight: 800, duration: 1.4, ease: 'power3.inOut', stagger: 0.08,
          onComplete: () => el.querySelectorAll('.kw').forEach((k) => k.classList.add('is-bold')) }, '-=0.9')
        .from('[data-hero="sub"]', { y: 18, opacity: 0, duration: 1 }, '-=1.1')
        .from('[data-hero="cta"]', { y: 18, opacity: 0, duration: 1 }, '-=0.85')
        .from('[data-hero="hud"]', { opacity: 0, duration: 1.2, stagger: 0.08 }, '-=0.9');
    };
    const pending = document.documentElement.classList.contains('intro-pending');
    if (pending) addEventListener('rumbo:intro-done', play, { once: true }); else play();
    return () => { removeEventListener('rumbo:intro-done', play); split?.revert(); };
  }, []);

  return (
    <section ref={root} id="inicio" className="relative flex min-h-[100svh] flex-col overflow-hidden" aria-labelledby="t-hero">
      <Ring />
      {/* marco de interfaz: línea superior y crucetas en las esquinas */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[72px] h-px bg-line" data-hero="hud" />
      {['left-4 top-[66px]', 'right-4 top-[66px]', 'left-4 bottom-4', 'right-4 bottom-4'].map((p) => (
        <span key={p} data-hero="hud" aria-hidden className={`plus text-cal/50 ${p}`} />
      ))}

      <div className="relative z-10 mx-auto flex w-full max-w-wrap flex-1 flex-col items-center justify-center px-5 pb-28 pt-28 text-center sm:px-8">
        <div data-hero="logo" className="mb-8 flex flex-col items-center gap-4">
          <Logo className="h-7 w-auto sm:h-8" />
          <span className="tech text-gris/80">Marketing para hostelería <span className="text-naranja">×</span> Almería</span>
        </div>
        <h1 id="t-hero" className="caps max-w-[16ch] text-display font-light">
          Que tu <span className="kw">local</span> sea <span className="font-thin text-naranja">×</span> el que <span className="kw">todos guardan</span>
        </h1>
        <p data-hero="sub" className="mt-7 max-w-[46ch] text-body text-gris">
          Vídeo, redes y ficha de Google para que te descubran y te elijan.<br className="hidden sm:block" /> En treinta minutos te contamos qué haríamos con tu local.
        </p>
        <div data-hero="cta" className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <CtaCross href="#contacto">Reservar consulta</CtaCross>
          <a href="#proyectos" className="tech text-gris underline-offset-4 hover:text-cal hover:underline" data-cursor="CASO">Ver un caso real ↓</a>
        </div>
      </div>

      {/* avatar + frase, abajo a la izquierda */}
      <div data-hero="hud" className="absolute bottom-[calc(20px+env(safe-area-inset-bottom))] left-5 z-10 flex items-center gap-3 sm:left-8">
        <div className="flex">
          <img src="/portafolio/assets/esteban.jpg" alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover object-top ring-2 ring-ink" />
          <img src="/portafolio/assets/eneko.jpg" alt="" width={40} height={40} className="-ml-3 h-10 w-10 rounded-full object-cover object-top ring-2 ring-ink" />
        </div>
        <p className="max-w-[24ch] text-left text-[13px] leading-tight text-gris">Esteban y Eneko.<br />Hablas con quien hace el trabajo.</p>
      </div>
      <div data-hero="hud" className="tech absolute bottom-[calc(24px+env(safe-area-inset-bottom))] right-5 z-10 hidden text-muted sm:block sm:right-8">Desliza ↓</div>
    </section>
  );
}
