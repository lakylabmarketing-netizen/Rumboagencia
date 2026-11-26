'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { WhatsIcon } from './Icon';
import { NAV, WA_HOLA } from '@/lib/content';

/** Menú flotante en forma de píldora: logo, apartados y WhatsApp. En móvil, menú a pantalla completa. */
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
      <header className="sticky top-0 z-50 px-3 pt-[calc(10px+env(safe-area-inset-top))] sm:px-6">
        <div className="mx-auto flex h-[68px] max-w-wrap items-center justify-between gap-4 rounded-full border border-white/10 bg-[#141414]/90 pl-6 pr-2 backdrop-blur">
          <a href="/" aria-label="Rumbo, inicio"><Logo className="h-6 w-auto" /></a>
          <nav aria-label="Apartados" className="hidden items-center gap-1 lg:flex">
            {NAV.map(([h, l]) => (
              <a key={h} href={h} aria-current={isActive(h) ? 'page' : undefined}
                className={`rounded-full px-4 py-2 text-[17px] font-semibold transition-colors ${isActive(h) ? 'text-white' : 'text-white/70 hover:text-white'}`}>
                {l}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href={WA_HOLA} target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp"
              className="flex h-[52px] items-center gap-2 rounded-full bg-naranja px-3.5 text-[16px] font-bold text-ink hover:bg-[#FF6A2B] sm:px-5">
              <WhatsIcon className="h-7 w-7" /><span className="hidden sm:inline">WhatsApp</span>
            </a>
            <button type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="menu"
              className="h-[52px] rounded-full border-2 border-white/25 px-5 text-[16px] font-semibold lg:hidden">
              Menú
            </button>
          </div>
        </div>
      </header>

      <div id="menu" hidden={!open} className="fixed inset-0 z-[70] overflow-y-auto bg-ink px-4 pb-[calc(24px+env(safe-area-inset-bottom))] pt-[calc(18px+env(safe-area-inset-top))] lg:hidden">
        <div className="flex h-[52px] items-center justify-between">
          <Logo className="h-6 w-auto" />
          <button type="button" onClick={() => setOpen(false)} className="h-12 rounded-full border-2 border-white/25 px-5 text-[16px] font-semibold">Cerrar</button>
        </div>
        <nav aria-label="Menú" className="mt-8 grid">
          {NAV.map(([h, l]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="head flex items-center justify-between border-b border-line py-4 text-[2rem]">
              {l}<span aria-hidden className="text-naranja">→</span>
            </a>
          ))}
        </nav>
        <a href={WA_HOLA} target="_blank" rel="noopener" className="btn btn-whatsapp mt-8 w-full"><WhatsIcon className="h-7 w-7" /> Escríbenos por WhatsApp</a>
      </div>
    </>
  );
}
