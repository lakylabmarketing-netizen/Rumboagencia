'use client';
import { useEffect } from 'react';

/** Hace aparecer con un pequeño deslizamiento los bloques marcados con data-reveal al llegar a ellos. */
export default function Reveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('visto'));
      return;
    }
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('visto'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -10% 0px' });
    document.documentElement.classList.add('con-reveal');
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
