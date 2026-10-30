import { Logo } from './Logo';
import { CONTACT_EMAIL, WA_HOLA, servicePages } from '@/lib/content';

/** Llamada final + pie con todos los apartados. */
export default function Footer({ cta = true }: { cta?: boolean }) {
  return (
    <footer className="relative overflow-hidden px-4 pb-[calc(28px+env(safe-area-inset-bottom))] pt-20 sm:px-8">
      {cta && (
        <div className="card card-naranja relative mx-auto mb-16 grid max-w-[1320px] gap-6 overflow-hidden p-7 sm:p-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="tech text-ink/70">Consultoría gratis · 30 minutos</p>
            <p className="mt-3 max-w-[22ch] text-[clamp(1.9rem,4vw,3.4rem)] font-bold leading-[1.02] tracking-[-.04em]">Te decimos qué haríamos con tu negocio.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/contacto/" className="btn bg-ink text-cal">Reservar consulta</a>
            <a href={WA_HOLA} target="_blank" rel="noopener" className="btn border border-ink/30 text-ink">WhatsApp</a>
          </div>
        </div>
      )}
      <div className="mx-auto grid max-w-[1320px] gap-10 border-t border-line pt-10 text-[15px] text-gris md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Logo className="h-6 w-auto" />
          <p className="mt-4 max-w-[32ch]">Agencia de marketing para todo tipo de negocios. Almería y provincia.</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="mt-3 inline-block underline underline-offset-4 hover:text-cal">{CONTACT_EMAIL}</a>
        </div>
        <nav aria-label="Servicios" className="grid content-start gap-2">
          <span className="tech mb-1 text-muted">Servicios</span>
          {servicePages.map((s) => <a key={s.slug} href={`/${s.slug}/`} className="w-fit hover:text-cal">{s.name}</a>)}
        </nav>
        <nav aria-label="Rumbo" className="grid content-start gap-2">
          <span className="tech mb-1 text-muted">Rumbo</span>
          {[['/caso/', 'Caso real'], ['/precios/', 'Precios'], ['/precios/#preguntas', 'Preguntas'], ['/nosotros/', 'Nosotros'], ['/contacto/', 'Contacto'], ['/legal/', 'Aviso legal y privacidad']].map(([h, l]) => (
            <a key={h} href={h} className="w-fit hover:text-cal">{l}</a>
          ))}
        </nav>
      </div>
      <div className="tech mx-auto mt-10 flex max-w-[1320px] flex-wrap justify-between gap-3 text-[11px] text-muted">
        <span>© 2026 Rumbo · rumboagencia.info</span>
        <span>Sin cookies ni rastreo</span>
      </div>
    </footer>
  );
}
