import { Logo } from './Logo';
import Icon, { WhatsIcon } from './Icon';
import ContactForm from './ContactForm';
import { CONTACT_EMAIL, NAV, WA_HOLA, WHATSAPP_VISIBLE } from '@/lib/content';

/** Cierre con formulario y formas de contacto + pie con el nombre en grande. */
export default function Footer({ cta = true }: { cta?: boolean }) {
  return (
    <>
      {cta && (
        <section id="contacto" aria-labelledby="t-hablamos" className="px-4 py-20 sm:px-6 md:py-28">
          <div className="mx-auto grid max-w-wrap gap-10 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <p className="etiqueta">Respuesta en menos de 24 h laborables</p>
              <h2 id="t-hablamos" className="mt-6 text-[clamp(2.6rem,6vw,4.8rem)]">¿Llenamos<br /><span className="marca">tu local?</span></h2>
              <p className="mt-6 max-w-[34ch] text-[20px] text-gris">Déjanos tus datos y te llamamos para conocer tu local y decirte qué haríamos este invierno.</p>
              <div className="mt-8 grid gap-3">
                <a href={WA_HOLA} target="_blank" rel="noopener" className="flex items-center gap-4 rounded-[22px] bg-naranja p-5 text-ink hover:bg-[#FF6A2B]">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white/40"><WhatsIcon className="h-8 w-8" /></span>
                  <span><span className="block text-[15px] font-semibold">WhatsApp</span><b className="block text-[21px]">{WHATSAPP_VISIBLE}</b></span>
                </a>
                <a href={`mailto:${CONTACT_EMAIL}`} className="card flex items-center gap-4 p-5">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-naranja text-ink"><Icon name="correo" className="h-7 w-7" /></span>
                  <span className="min-w-0"><span className="block text-[15px] text-gris">Correo</span><b className="block break-all text-[19px]">{CONTACT_EMAIL}</b></span>
                </a>
              </div>
            </div>
            <div className="card p-7 sm:p-9">
              <h3 className="text-[1.9rem]">Hablemos de tu local</h3>
              <div className="mt-6"><ContactForm /></div>
            </div>
          </div>
        </section>
      )}
      <footer className="px-4 pb-[calc(32px+env(safe-area-inset-bottom))] pt-14 sm:px-6">
        <div className="mx-auto max-w-wrap">
          <Logo className="desvanece h-auto w-full" />
          <div className="mt-8 flex flex-col gap-5 text-[17px] md:flex-row md:items-center md:justify-between">
            <p className="text-gris">Marketing para restauración y ocio · Almería · © 2026</p>
            <nav aria-label="Pie" className="flex flex-wrap gap-x-6 gap-y-3">
              {[...NAV.slice(1), ['/legal/', 'Aviso legal y privacidad'] as [string, string]].map(([h, l]) => (
                <a key={h} href={h} className="text-gris underline-offset-4 hover:text-white hover:underline">{l}</a>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}
