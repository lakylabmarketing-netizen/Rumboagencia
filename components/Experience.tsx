'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReduced } from '@/lib/gsap';
import { scramble } from '@/lib/scramble';
import { scrollState } from '@/lib/scroll';

/** Efectos globales: scroll suave, decode de titulares y glitch + línea de escaneo entre secciones. */
export default function Experience() {
  useEffect(() => {
    const reduced = prefersReduced();
    let lenis: Lenis | null = null;
    const tick = (time: number) => lenis?.raf(time * 1000);

    if (!reduced) {
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      lenis.on('scroll', (e: Lenis) => { scrollState.velocity = e.velocity; ScrollTrigger.update(); });
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      // Los enlaces internos también se desplazan con suavidad
      document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) =>
        a.addEventListener('click', (ev) => {
          const id = a.getAttribute('href')!;
          const target = id.length > 1 ? document.querySelector(id) : null;
          if (target) { ev.preventDefault(); lenis!.scrollTo(target as HTMLElement, { offset: -64 }); history.replaceState(null, '', id); }
        }));
    }

    const ctx = gsap.context(() => {
      if (reduced) return;
      // Titulares que se "descifran" al entrar
      gsap.utils.toArray<HTMLElement>('[data-scramble]').forEach((el) =>
        ScrollTrigger.create({ trigger: el, start: 'top 85%', once: true, onEnter: () => scramble(el, { duration: 700 }) }));

      // Transición entre secciones: línea de escaneo + glitch breve en el título
      const scan = document.querySelector<HTMLElement>('.scan');
      gsap.utils.toArray<HTMLElement>('[data-fx]').forEach((sec) =>
        ScrollTrigger.create({
          trigger: sec, start: 'top 70%', once: true,
          onEnter: () => {
            if (scan) gsap.fromTo(scan, { yPercent: 0, y: 0, opacity: 1 }, { y: window.innerHeight, opacity: 0, duration: 0.55, ease: 'power2.in' });
            const h = sec.querySelector<HTMLElement>('h2');
            if (h) { h.classList.remove('glitch'); void h.offsetWidth; h.classList.add('glitch'); }
          },
        }));

      // Aparición suave de bloques
      gsap.utils.toArray<HTMLElement>('[data-rise]').forEach((el) =>
        gsap.from(el, { y: 40, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }));
    });

    return () => { ctx.revert(); if (lenis) { gsap.ticker.remove(tick); lenis.destroy(); } };
  }, []);
  return null;
}
