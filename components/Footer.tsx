import { Logo } from './Logo';
import Icon, { WhatsIcon } from './Icon';
import { WhatsFlotante } from './Nav';
import { CONTACT_EMAIL, NAV, WA_HOLA, WHATSAPP_VISIBLE } from '@/lib/content';

/** Llamada final con las formas de contacto + pie. */
export default function Footer({ cta = true }: { cta?: boolean }) {
  return (
    <>
      {cta && (
        <section aria-labelledby="t-hablamos" className="bg-papel px-4 py-20 sm:px-6 md:py-28">
          <div className="mx-auto max-w-wrap text-center">
            <h2 id="t-hablamos" className="text-[clamp(2.2rem,5vw,3.8rem)] uppercase">¿Hablamos de tu negocio?</h2>
            <p className="mx-auto mt-4 max-w-[34ch] text-[20px] text-gris">Cuéntanos qué necesitas. Te respondemos en menos de 24 horas.</p>
            <div className="mt-10 grid gap-4 text-left md:grid-cols-3">
              <a href={WA_HOLA} target="_blank" rel="noopener" className="card bg-white p-7 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#25D366]/15 text-[#128C4A]"><WhatsIcon className="h-7 w-7" /></span>
                <b className="head mt-4 block text-[22px]">Escríbenos por WhatsApp</b>
                <span className="mt-1 block text-[18px]">{WHATSAPP_VISIBLE}</span>
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="card bg-white p-7 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-naranja/15 text-naranja-osc"><Icon name="correo" className="h-7 w-7" /></span>
                <b className="head mt-4 block text-[22px]">Envíanos un correo</b>
                <span className="mt-1 block break-all text-[17px]">{CONTACT_EMAIL}</span>
              </a>
              <a href="/contacto/" className="card bg-white p-7 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-naranja/15 text-naranja-osc"><Icon name="calendario" className="h-7 w-7" /></span>
                <b className="head mt-4 block text-[22px]">Consultoría gratis</b>
                <span className="mt-1 block text-[17px]">30 minutos, sin compromiso</span>
              </a>
            </div>
            <a href="/contacto/" className="btn btn-naranja mt-10">Quiero que Rumbo trabaje para mí <Icon name="flecha" className="h-5 w-5" /></a>
          </div>
        </section>
      )}
      <footer className="border-t border-line px-4 pb-[calc(100px+env(safe-area-inset-bottom))] pt-12 sm:px-6">
        <div className="mx-auto flex max-w-wrap flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <Logo className="h-7 w-auto" />
            <p className="mt-3 text-[17px] text-gris">Agencia de marketing. Grabamos en tu negocio.</p>
          </div>
          <nav aria-label="Pie" className="flex flex-wrap gap-x-6 gap-y-3 text-[17px]">
            {[...NAV.slice(1), ['/legal/', 'Aviso legal y privacidad'] as [string, string]].map(([h, l]) => (
              <a key={h} href={h} className="text-gris underline-offset-4 hover:text-ink hover:underline">{l}</a>
            ))}
          </nav>
        </div>
        <p className="mx-auto mt-10 max-w-wrap text-[15px] text-muted">© 2026 Rumbo · rumboagencia.info · Esta web no usa cookies</p>
      </footer>
      <WhatsFlotante />
    </>
  );
}
