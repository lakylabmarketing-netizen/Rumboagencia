'use client';
import { useRef } from 'react';

/** Fila horizontal que se desliza con el dedo o con las flechas. */
export default function Carrusel({ titulo, children }: { titulo: React.ReactNode; children: React.ReactNode }) {
  const fila = useRef<HTMLDivElement>(null);
  const mover = (dir: number) => fila.current?.scrollBy({ left: dir * fila.current.clientWidth * 0.8, behavior: 'smooth' });
  const flecha = 'grid h-14 w-14 place-items-center rounded-full border-2 border-line text-[22px] hover:border-naranja hover:text-naranja';
  return (
    <>
      <div className="mx-auto flex max-w-wrap items-end justify-between gap-6 px-4 sm:px-6">
        {titulo}
        <div className="hidden shrink-0 gap-3 md:flex">
          <button type="button" onClick={() => mover(-1)} aria-label="Anterior" className={flecha}>←</button>
          <button type="button" onClick={() => mover(1)} aria-label="Siguiente" className={flecha}>→</button>
        </div>
      </div>
      <div ref={fila} className="carrusel mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:px-6 lg:px-[max(1.5rem,calc((100vw-1240px)/2+1.5rem))]">
        {children}
      </div>
    </>
  );
}
