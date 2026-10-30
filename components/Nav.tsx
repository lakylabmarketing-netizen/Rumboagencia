'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { WhatsIcon } from './Icon';
import { NAV, WA_HOLA } from '@/lib/content';

/** Menú superior: logo a la izquierda y apartados a la derecha. En móvil, menú a pantalla completa. */
export default function Nav() {
  const path = usePathname() || '/';
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open]);

  const isActive = (href: string) => (href === '/' ? path === '/' : !href.startsWith('/#') && path.startsWith(href.replace(/\/$/, '')));

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-white/95 pt-[env(safe-area-inset-top)] backdrop-blur">
        <div className="mx-auto flex h-[76px] max-w-wrap items-center justify-between gap-4 px-4 sm:px-6">
          <a href="/" aria-label="Rumbo, inicio"><Logo className="h-7 w-auto" /></a>
          <nav aria-label="Apartados" className="hidden items-center gap-1 lg:flex">
            {NAV.map(([h, l]) => (
              <a key={h} href={h} aria-current={isActive(h) ? 'page' : undefined}
                className={`rounded-lg px-3.5 py-2 text-[17px] font-medium transition-colors ${isActive(h) ? 'text-ink underline decoration-naranja decoration-2 underline-offset-8' : 'text-gris hover:text-ink'}`}>
                {l}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="/contacto/" className="btn btn-naranja hidden !min-h-[48px] !px-5 !text-[16px] lg:inline-flex">Consultoría gratis</a>
            <button type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="menu"
              className="flex h-12 items-center gap-2 rounded-xl border-2 border-ink px-4 text-[16px] font-semibold lg:hidden">
              Menú
            </button>
          </div>
        </div>
      </header>

      <div id="menu" hidden={!open} className="fixed inset-0 z-[70] overflow-y-auto bg-white px-4 pb-[calc(24px+env(safe-area-inset-bottom))] pt-[calc(14px+env(safe-area-inset-top))] lg:hidden">
        <div className="flex h-[52px] items-center justify-between">
          <Logo className="h-7 w-auto" />
          <button type="button" onClick={() => setOpen(false)} className="h-12 rounded-xl border-2 border-ink px-4 text-[16px] font-semibold">Cerrar</button>
        </div>
        <nav aria-label="Menú" className="mt-6 grid">
          {NAV.map(([h, l]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-line py-4 text-[24px] font-semibold">
              {l}<span aria-hidden className="text-naranja-osc">→</span>
            </a>
          ))}
        </nav>
        <a href="/contacto/" className="btn btn-naranja mt-8 w-full">Consultoría gratis</a>
        <a href={WA_HOLA} target="_blank" rel="noopener" className="btn btn-linea mt-3 w-full"><WhatsIcon className="h-5 w-5" /> Escríbenos por WhatsApp</a>
      </div>
    </>
  );
}

/** Botón flotante de WhatsApp, abajo a la derecha. */
export function WhatsFlotante() {
  return (
    <a href={WA_HOLA} target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-[calc(18px+env(safe-area-inset-bottom))] right-4 z-40 grid h-16 w-16 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(0,0,0,.18)] sm:right-6">
      <WhatsIcon className="h-8 w-8" />
    </a>
  );
}
