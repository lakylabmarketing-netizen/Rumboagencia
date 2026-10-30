'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { NAV, WA_HOLA, servicePages } from '@/lib/content';

function WhatsIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden focusable="false">
      <path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3a.5.5 0 0 0 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  );
}

/** Menú superior: logo, apartados en píldoras y contacto. En móvil, menú a pantalla completa. */
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

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return path === '/' || servicePages.some((s) => path.startsWith(`/${s.slug}`));
    return path.startsWith(href.replace(/\/$/, ''));
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-[#070707] via-[#070707]/85 to-transparent pt-[env(safe-area-inset-top)]">
        <div className="mx-auto grid h-[72px] max-w-[1320px] grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-8">
          <button type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="menu" aria-label="Abrir menú"
            className="grid h-10 w-10 place-items-center rounded-full border border-cal/20 md:hidden">
            <span aria-hidden className="grid gap-[5px]"><i className="block h-[1.5px] w-4 bg-cal" /><i className="block h-[1.5px] w-4 bg-cal" /></span>
          </button>
          <a href="/" aria-label="Rumbo, inicio" className="justify-self-center md:justify-self-start" data-cursor="INICIO">
            <Logo className="h-6 w-auto" />
          </a>
          <nav aria-label="Apartados" className="hidden items-center justify-center gap-1 md:flex">
            {NAV.map(([h, l]) => (
              <a key={h} href={h} aria-current={isActive(h) ? 'page' : undefined}
                className={`rounded-full px-4 py-2 text-[14px] transition-colors ${isActive(h) ? 'bg-gradient-to-b from-brasa to-naranja font-semibold text-ink' : 'text-cal/80 hover:text-cal'}`}>
                {l}
              </a>
            ))}
          </nav>
          <div className="flex items-center justify-end gap-2">
            <a href={WA_HOLA} target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp"
              className="grid h-10 w-10 place-items-center rounded-full border border-cal/20 text-cal transition-colors hover:border-brasa hover:text-brasa">
              <WhatsIcon className="h-[18px] w-[18px]" />
            </a>
            <a href="/contacto/" className="btn btn-claro hidden !min-h-[40px] !px-4 text-[14px] md:inline-flex">
              Contacto <span aria-hidden className="grid h-6 w-6 place-items-center rounded-full bg-ink text-[12px] text-cal">↗</span>
            </a>
          </div>
        </div>
      </header>

      <div id="menu" hidden={!open} className="fixed inset-0 z-[70] overflow-y-auto bg-[#070707] px-4 pb-[calc(24px+env(safe-area-inset-bottom))] pt-[calc(16px+env(safe-area-inset-top))] md:hidden">
        <div aria-hidden className="glow pointer-events-none absolute -bottom-40 left-1/2 h-[420px] w-[420px] -translate-x-1/2" />
        <div className="relative flex h-[56px] items-center justify-between">
          <Logo className="h-6 w-auto" />
          <button type="button" onClick={() => setOpen(false)} className="rounded-full border border-cal/20 px-4 py-2 text-[14px]">Cerrar</button>
        </div>
        <nav aria-label="Menú" className="relative mt-8 grid gap-2">
          {[['/', 'Inicio'] as [string, string], ...servicePages.map((s) => [`/${s.slug}/`, s.name] as [string, string]), ['/caso/', 'Caso real'] as [string, string], ['/precios/', 'Precios'] as [string, string], ['/nosotros/', 'Nosotros'] as [string, string], ['/contacto/', 'Contacto'] as [string, string]].map(([h, l]) => (
            <a key={h} href={h} onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-line py-3 text-[1.7rem] font-semibold tracking-[-.03em]">
              {l}<span aria-hidden className="text-base text-naranja">↗</span>
            </a>
          ))}
        </nav>
        <a href={WA_HOLA} target="_blank" rel="noopener" className="btn btn-naranja relative mt-8 w-full">Escríbenos por WhatsApp</a>
      </div>
    </>
  );
}
