'use client';
import { useEffect, useRef } from 'react';
import { gsap, prefersReduced } from '@/lib/gsap';
import { team } from '@/lib/content';

/**
 * «Detrás del trabajo»: retrato en movimiento de Esteban y Eneko (animado con Higgsfield a partir de sus fotos)
 * con el titular gigante detrás. El texto lleva una máscara con la silueta de ambos, así parece pasar por detrás.
 */
export default function BehindWork() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = video.current!;
    if (prefersReduced()) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); });
    io.observe(v);
    const ctx = gsap.context(() => {
      gsap.from('.ln > span', { yPercent: 105, duration: 1.3, ease: 'expo.out', stagger: 0.12, scrollTrigger: { trigger: root.current, start: 'top 70%', once: true } });
      gsap.fromTo('[data-stage]', { scale: 1.08 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'center center', scrub: 0.8 } });
    }, root);
    return () => { io.disconnect(); ctx.revert(); };
  }, []);

  return (
    <section ref={root} id="nosotros" aria-labelledby="t-nosotros" className="relative overflow-hidden bg-[#0d0d0e]">
      <span id="quienes" className="sr-only" /><span id="equipo" className="sr-only" />

      <div className="relative mx-auto aspect-[5/6] w-full max-w-[1600px] overflow-hidden sm:aspect-[16/11] lg:aspect-[16/9]">
        <div data-stage className="absolute inset-0">
          <video ref={video} className="stage-video object-cover" muted loop playsInline preload="metadata" poster="/img/equipo.webp" aria-hidden>
            <source src="/video/equipo.mp4" type="video/mp4" />
          </video>
          {/* Titular detrás de las personas */}
          <div className="stage-mask absolute inset-0">
            <h2 id="t-nosotros" className="mega absolute inset-x-0 top-[9%] px-4 text-center text-[clamp(3.6rem,16vw,17rem)] leading-[.84] md:px-[30px]">
              <span className="ln"><span>Detrás del</span></span>
              <span className="ln"><span>trabajo</span></span>
            </h2>
          </div>
        </div>
        {/* fundidos para que el vídeo se pierda en el fondo */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#0d0d0e_0%,transparent_14%,transparent_86%,#0d0d0e_100%),linear-gradient(0deg,#0d0d0e_0%,transparent_30%)]" />

        <span className="tech absolute left-4 top-4 text-[11px] text-gris md:left-[calc(30px+(100%-60px)/6)] md:top-6 md:pl-3">03 · Sobre nosotros</span>
        <span className="tech absolute right-4 top-4 hidden text-[11px] text-muted md:right-[30px] md:top-6 md:block">Dos personas <span className="text-naranja">×</span> un equipo</span>
      </div>

      <div className="relative z-10 mx-auto -mt-[12%] grid max-w-wrap gap-12 px-4 pb-28 sm:px-8 md:-mt-[8%] md:grid-cols-[minmax(0,.9fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-10 md:pb-40">
        <p className="max-w-[34ch] text-[clamp(1.25rem,1.9vw,1.7rem)] font-semibold leading-[1.15] tracking-[-.02em] text-cal/90">
          Quien edita no atiende clientes: así el trabajo sale a tiempo y sabes siempre con quién hablar.
        </p>
        {team.map((m) => (
          <article key={m.name} data-rise className="border-t border-line pt-6">
            <div className="flex items-center gap-4">
              <img src={m.img} width={m.w} height={m.h} alt={`${m.name}, socio de Rumbo`} loading="lazy" className="h-14 w-14 rounded-full object-cover object-top" />
              <div>
                <h3 className="mega-sub text-[2.2rem] text-cal">{m.name}</h3>
                <span className="tech text-[11px] text-brasa">{m.role}</span>
              </div>
            </div>
            <p className="mt-5 max-w-[46ch] text-[16px] text-gris">{m.text}</p>
            <p className="tech mt-4 text-[10px] leading-relaxed text-muted">{m.tasks}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
