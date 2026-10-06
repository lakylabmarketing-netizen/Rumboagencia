'use client';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, prefersReduced } from '@/lib/gsap';
import { pieces, testimonials } from '@/lib/content';

// Piezas con vídeo real disponible (bucles cortos y sin sonido)
const LOOPS = [1, 3, 4];

/** Proyectos: scroll horizontal fijado en escritorio; carrusel con snap en móvil. */
export default function ProjectsRail() {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const tr = track.current!;
      const dist = () => tr.scrollWidth - window.innerWidth + 64;
      const tween = gsap.to(tr, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: section.current, start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true, anticipatePin: 1 },
      });
      // Revelado de cada tarjeta por clip-path a medida que entra en horizontal
      gsap.utils.toArray<HTMLElement>('[data-card]', tr).forEach((c) => {
        gsap.fromTo(c, { clipPath: 'inset(0 0 0 100%)' }, {
          clipPath: 'inset(0 0 0 0%)', ease: 'power2.out',
          scrollTrigger: { trigger: c, containerAnimation: tween, start: 'left 95%', end: 'left 55%', scrub: true },
        });
      });
    });
    mm.add('(max-width: 899px)', () => {
      if (prefersReduced()) return;
      gsap.utils.toArray<HTMLElement>('[data-card]', track.current!).forEach((c) =>
        gsap.fromTo(c, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: c, start: 'top 90%', once: true } }));
    });
    return () => mm.revert();
  }, []);

  // Los bucles de las piezas se reproducen solos cuando se ven
  useEffect(() => {
    if (prefersReduced()) return;
    const vids = section.current!.querySelectorAll<HTMLVideoElement>('video[data-loop]');
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      const v = e.target as HTMLVideoElement;
      if (e.isIntersecting) v.play().catch(() => {}); else v.pause();
    }), { threshold: 0.3 });
    vids.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);

  // Solo suena un vídeo a la vez
  useEffect(() => {
    const onPlay = (e: Event) => (e.target as HTMLVideoElement).controls && document.querySelectorAll<HTMLVideoElement>('video[controls]').forEach((v) => { if (v !== e.target && !v.paused) v.pause(); });
    document.addEventListener('play', onPlay, true);
    return () => document.removeEventListener('play', onPlay, true);
  }, []);

  return (
    <div ref={section} className="relative overflow-hidden min-[900px]:h-[100svh]">
      <div ref={track} className="flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-6 pt-24 [scrollbar-width:none] min-[900px]:h-full min-[900px]:snap-none min-[900px]:items-center min-[900px]:overflow-visible min-[900px]:px-8 min-[900px]:pt-16">
        <div className="flex w-[78vw] max-w-[420px] shrink-0 snap-start flex-col justify-center pr-6 min-[900px]:w-[30vw]">
          <span className="tech text-muted"><span className="text-naranja">+</span> 02 · Proyectos</span>
          <h2 className="mega mt-5 text-[clamp(2.4rem,5.2vw,5.4rem)] leading-[.98]"><span className="ln"><span>A Lo</span></span><span className="ln deep"><span>Cubano</span></span></h2>
          <p className="mt-4 text-body text-gris">Cocina cubana de fusión en Roquetas de Mar. Abrió a finales de junio de 2026 y empezamos el 8 de julio: vídeo, ficha de Google y captación de reseñas.</p>
          <p className="tech mt-6 text-cal">5,0 <span className="text-brasa">★</span> · 151 reseñas en Google</p>
          <p className="tech mt-8 hidden text-muted min-[900px]:block">Sigue bajando →</p>
        </div>

        {testimonials.map((t) => (
          <figure key={t.n} data-card className="m-0 flex w-[74vw] max-w-[360px] shrink-0 snap-start flex-col min-[900px]:w-[26vw] min-[900px]:max-w-[400px]">
            <div className="rgb relative aspect-[9/16] max-h-[64svh] overflow-hidden rounded-md bg-surface min-[900px]:max-h-[62svh]">
              <video controls preload="none" playsInline poster={`/img/testimonio-${t.n}.webp`} className="h-full w-full object-cover" aria-label={`Vídeo: ${t.q}`}>
                <source src={`/video/testimonio-${t.n}.mp4`} type="video/mp4" />
              </video>
              <span className="tech pointer-events-none absolute left-3 top-3 bg-ink/70 px-2 py-1 text-brasa">0{t.n} / 05 · Manuel</span>
            </div>
            <figcaption className="mt-4">
              <span className="block text-[14px] leading-snug text-muted">{t.q}</span>
              <blockquote className="m-0 mt-2 text-[1.15rem] font-semibold leading-snug">«{t.a}»</blockquote>
            </figcaption>
          </figure>
        ))}

        {pieces.map((p) => (
          <figure key={p.n} data-card className="m-0 flex w-[66vw] max-w-[320px] shrink-0 snap-start flex-col min-[900px]:w-[22vw]">
            <div className="rgb relative aspect-[9/16] max-h-[64svh] overflow-hidden rounded-md bg-surface min-[900px]:max-h-[62svh]" data-cursor="PIEZA">
              {LOOPS.includes(p.n) ? (
                <video data-loop muted loop playsInline preload="none" poster={`/portafolio/assets/pieza-${p.n}-poster.jpg`} className="h-full w-full object-cover" aria-label={`Vídeo «${p.title}»`}>
                  <source src={`/video/pieza-${p.n}-loop.mp4`} type="video/mp4" />
                </video>
              ) : (
                <>
                  <img src={`/img/portada-pieza-${p.n}.webp`} alt={`Portada del vídeo «${p.title}»`} loading="lazy" className="h-full w-full object-cover" />
                  <span className="tech absolute bottom-3 left-3 bg-brasa px-2 py-1 text-ink">[PENDIENTE: vídeo]</span>
                </>
              )}
            </div>
            <figcaption className="mt-4">
              <span className="tech text-brasa">#0{p.n} · {p.tag}</span>
              <span className="mt-1 block font-semibold">{p.title}</span>
            </figcaption>
          </figure>
        ))}
        <div className="w-4 shrink-0 min-[900px]:w-[10vw]" aria-hidden />
      </div>
    </div>
  );
}
