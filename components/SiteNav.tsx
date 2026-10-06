'use client';
import { useEffect, useState } from 'react';
import { Isotipo } from './Logo';

const LINKS: [string, string][] = [
  ['#servicios', 'Qué hacemos'], ['#proyectos', 'Proyectos'], ['#nosotros', 'Nosotros'], ['#precios', 'Precios'],
];
const MORE: [string, string][] = [['#resultados', 'Resultados'], ['#proceso', 'Proceso'], ['#faq', 'Preguntas']];

/**
 * Barra alineada a la rejilla de columnas: cada enlace empieza en una columna.
 * Se funde con el fondo (modo diferencia) para leerse igual sobre secciones claras y oscuras.
 */
export default function SiteNav() {
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ids = [...LINKS, ...MORE].map(([h]) => h.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive('#' + e.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [open]);

  const mark = (h: string) => (active === h
    ? <span aria-hidden className="mr-2 inline-block h-[7px] w-[7px] rounded-full bg-naranja align-middle" />
    : <span aria-hidden className="mr-2 text-cal/60">+</span>);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] mix-blend-difference">
        <div className="grid h-[64px] grid-cols-4 items-center px-4 md:grid-cols-6 md:px-[30px]">
          <span aria-hidden />
          <nav aria-label="Secciones" className="contents">
            {LINKS.map(([h, l]) => (
              <a key={h} href={h} aria-current={active === h ? 'true' : undefined}
                className="tech hidden pl-3 text-[12px] text-cal transition-opacity hover:opacity-70 md:block">
                {mark(h)}{l}
              </a>
            ))}
          </nav>
          <div className="col-start-4 flex items-center justify-end gap-3 md:col-start-6">
            <button type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="menu-movil"
              className="tech px-1 py-2 text-[12px] text-cal md:hidden">Menú</button>
            <a href="#contacto" className="tech flex items-center gap-2 border border-cal/40 px-3 py-2 text-[12px] text-cal transition-colors hover:bg-cal hover:text-ink" data-cursor="HABLAR">
              <span aria-hidden className="h-[6px] w-[6px] rounded-full bg-current" />Contacto
            </a>
          </div>
        </div>
      </header>

      {/* El isotipo va fuera de la barra fundida para conservar su naranja */}
      <a href="#inicio" aria-label="Rumbo, inicio" data-cursor="INICIO"
        className="fixed left-4 top-[calc(22px+env(safe-area-inset-top))] z-50 md:left-[30px]">
        <Isotipo className="h-5 w-auto" />
      </a>

      {/* Menú a pantalla completa en móvil */}
      <div id="menu-movil" hidden={!open} className="fixed inset-0 z-[70] bg-ink px-4 pb-[calc(24px+env(safe-area-inset-bottom))] pt-[calc(16px+env(safe-area-inset-top))] md:hidden">
        <div className="flex h-[48px] items-center justify-between">
          <Isotipo className="h-5 w-auto" />
          <button type="button" onClick={() => setOpen(false)} className="tech px-1 py-2 text-[12px] text-cal">Cerrar</button>
        </div>
        <nav aria-label="Menú" className="mt-10 grid">
          {[...LINKS, ...MORE, ['#contacto', 'Contacto'] as [string, string]].map(([h, l]) => (
            <a key={h} href={h} onClick={() => setOpen(false)}
              className="mega-sub flex items-baseline justify-between border-b border-line py-3 text-[clamp(2.4rem,12vw,3.4rem)] text-cal">
              {l}<span className="text-base text-naranja">↘</span>
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
