'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap, prefersReduced } from '@/lib/gsap';
import CtaCross from './CtaCross';

/** Hora local de Almería, como en una consola. */
function Clock() {
  const [t, setT] = useState('');
  useEffect(() => {
    const f = new Intl.DateTimeFormat('es-ES', { timeZone: 'Europe/Madrid', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' });
    const tick = () => setT(f.format(new Date()).replace(/\s?(CEST|CET|GMT\+\d)/, ' $1'));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{t || '--:--'}</span>;
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const phone = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  // El vídeo del móvil solo suena (sin audio) mientras se ve la portada
  useEffect(() => {
    const v = video.current!;
    if (prefersReduced()) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = root.current!;
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      const play = () => {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
        tl.from('.ln > span', { yPercent: 105, duration: 1.4, stagger: 0.1 })
          .from('[data-phone="intro"]', { yPercent: 40, rotateX: 40, opacity: 0, duration: 1.6 }, '-=1.1')
          .from('[data-hero="cap"]', { y: 16, opacity: 0, duration: 1, stagger: 0.08 }, '-=1.2');
      };
      if (document.documentElement.classList.contains('intro-pending')) addEventListener('rumbo:intro-done', play, { once: true });
      else play();

      // Al bajar, el móvil se endereza y sube; las líneas se separan un poco
      const st = { trigger: el, start: 'top top', end: 'bottom top', scrub: 0.8 };
      gsap.set('[data-phone="base"]', { rotateX: 16, rotateY: -14, rotateZ: -7 });
      gsap.to('[data-phone="base"]', { rotateX: 0, rotateY: 0, rotateZ: 0, ease: 'none', scrollTrigger: st });
      gsap.to(phone.current, { yPercent: -12, scale: 1.06, ease: 'none', scrollTrigger: { ...st } });
      gsap.utils.toArray<HTMLElement>('.ln', el).forEach((l, i) => gsap.to(l, {
        yPercent: -18 * (i + 1), ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 0.8 },
      }));
    }, el);

    // Inclinación con el ratón (solo con puntero fino)
    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
    const inner = phone.current!.querySelector<HTMLElement>('[data-phone="tilt"]')!;
    const qx = gsap.quickTo(inner, 'rotateY', { duration: 0.9, ease: 'power3.out' });
    const qy = gsap.quickTo(inner, 'rotateX', { duration: 0.9, ease: 'power3.out' });
    const move = (e: PointerEvent) => { qx((e.clientX / innerWidth - 0.5) * 14); qy(-(e.clientY / innerHeight - 0.5) * 10); };
    if (fine) addEventListener('pointermove', move);
    return () => { ctx.revert(); removeEventListener('pointermove', move); };
  }, []);

  return (
    <section ref={root} id="inicio" aria-labelledby="t-hero"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#0B0B0B_0%,#121214_40%,#2a1912_78%,#4a2414_100%)] pb-10 pt-[calc(96px+env(safe-area-inset-top))] md:flex md:min-h-[100svh] md:flex-col md:pb-0 md:pt-[88px]">
      {/* resplandor naranja de marca detrás del móvil */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(45%_60%_at_50%_100%,rgba(240,78,23,.55),rgba(255,138,61,.12)_55%,transparent_75%)]" />
      <p data-hero="cap" className="tech relative z-10 px-4 text-[11px] text-gris/80 md:hidden">Marketing para hostelería <span className="text-naranja">×</span> Almería</p>

      <h1 id="t-hero" className="mega relative [word-spacing:.06em] z-0 mt-3 px-4 text-center text-mega md:mt-0 md:px-[30px]">
        <span className="ln"><span>Que tu local</span></span>
        <span className="ln"><span>sea <span aria-hidden className="font-light text-naranja [-webkit-text-fill-color:#F04E17]">×</span> el que</span></span>
        <span className="ln deep"><span className="italic">todos guardan</span></span>
      </h1>

      {/* Móvil con una pieza real de Rumbo. Capas: posición/scroll › inclinación base › entrada › ratón */}
      <div ref={phone} className="relative z-10 mx-auto -mt-[5vw] w-[min(50vw,230px)] [perspective:1200px] md:absolute md:inset-x-0 md:bottom-[-14vh] md:mt-0 md:w-[clamp(220px,19vw,310px)]">
        <div data-phone="base" className="[transform-style:preserve-3d] [transform:rotateX(16deg)_rotateY(-14deg)_rotateZ(-7deg)]">
          <div data-phone="intro" className="[transform-style:preserve-3d]">
            <div data-phone="tilt" className="rounded-[2.4rem] border-[9px] border-[#111] bg-[#111] shadow-[0_40px_80px_-20px_rgba(0,0,0,.7)] md:rounded-[2.8rem] md:border-[11px]">
              <div className="relative aspect-[9/19] overflow-hidden rounded-[1.8rem] bg-ink md:rounded-[2.1rem]">
                <video ref={video} className="h-full w-full object-cover" muted loop playsInline preload="metadata"
                  poster="/portafolio/assets/pieza-1-poster.jpg" aria-label="Pieza de vídeo de Rumbo para A Lo Cubano: «POV: buscas buena comida en Almería»">
                  <source src="/video/pieza-1-loop.mp4" type="video/mp4" />
                </video>
                <span aria-hidden className="absolute left-1/2 top-2 h-[18px] w-[70px] -translate-x-1/2 rounded-full bg-[#111]" />
                <span className="tech absolute bottom-3 left-3 bg-ink/70 px-2 py-1 text-[9px] text-brasa">A Lo Cubano · Captación</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Esquina inferior izquierda: quiénes y dónde */}
      <div data-hero="cap" className="tech relative z-10 mt-10 grid gap-1 px-4 text-[11px] leading-snug text-gris md:absolute md:bottom-8 md:left-[30px] md:mt-0 md:w-[calc((100%-60px)/6*2)] md:px-3">
        <span className="hidden md:block">Marketing para hostelería <span className="text-naranja">×</span> Almería</span>
        <span>Rumbo · Almería &nbsp; <Clock /></span>
        <span className="text-muted">Esteban y Eneko: hablas con quien hace el trabajo</span>
      </div>

      {/* Esquina inferior derecha: propuesta y llamada a la acción */}
      <div data-hero="cap" className="relative z-10 mt-8 grid gap-6 px-4 md:absolute md:bottom-8 md:left-[calc(30px+(100%-60px)/6*4)] md:mt-0 md:w-[calc((100%-60px)/6*2)] md:px-3">
        <p className="text-[clamp(1.25rem,1.9vw,1.75rem)] font-semibold leading-[1.12] tracking-[-.02em] text-cal/90">
          Vídeo, redes y ficha de Google para que te descubran y te elijan.
          <span className="text-gris/70"> En treinta minutos te contamos qué haríamos con tu local.</span>
        </p>
        <div className="flex flex-wrap items-center gap-5">
          <CtaCross href="#contacto">Reservar consulta</CtaCross>
          <a href="#proyectos" className="tech text-[11px] text-gris underline-offset-4 hover:text-cal hover:underline" data-cursor="CASO">Ver un caso real ↓</a>
        </div>
      </div>
    </section>
  );
}
