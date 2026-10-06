'use client';
import { useEffect, useRef } from 'react';
import { gsap, prefersReduced } from '@/lib/gsap';

/** "RUMBO" a pantalla completa, letra a letra, y la frase final. */
export default function FooterBig() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-letter]', { yPercent: 110, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: 'top 80%', once: true } });
      gsap.from('[data-final]', { opacity: 0, y: 12, duration: 1, delay: 0.7, scrollTrigger: { trigger: root.current, start: 'top 80%', once: true } });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={root} className="overflow-hidden">
      <p className="mega flex justify-between text-[25vw] leading-[.82] text-cal" aria-label="Rumbo">
        {'RUMBO'.split('').map((l, i) => <span key={i} data-letter aria-hidden className={i === 0 ? 'text-naranja' : ''}>{l}</span>)}
      </p>
      <p data-final className="tech mt-6 text-center text-gris">Ya puedes apagar el móvil y abrir la cocina<span className="animate-pulse text-naranja">_</span></p>
    </div>
  );
}
