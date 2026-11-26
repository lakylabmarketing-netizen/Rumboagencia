import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PageHead from '@/components/PageHead';
import ContactForm from '@/components/ContactForm';
import Icon, { WhatsIcon } from '@/components/Icon';
import { CONTACT_EMAIL, WA_HOLA, WHATSAPP_VISIBLE } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Cuéntanos qué necesita tu local. Te respondemos en menos de 24 horas laborables.',
  alternates: { canonical: '/contacto/' },
};

export default function Contacto() {
  return (
    <>
      <Nav />
      <main id="contenido" className="pagina-clara">
        <PageHead kicker="Contacto" title={<>Cuéntanos qué necesita <span className="text-naranja-osc">tu local</span></>}
          lead="Escríbenos, llámanos o déjanos tus datos. Te respondemos en menos de 24 horas laborables." />
        <section className="px-4 pb-20 sm:px-6">
          <div className="mx-auto grid max-w-wrap gap-8 md:grid-cols-[.8fr_1.2fr]">
            <div className="grid content-start gap-4">
              <a href={WA_HOLA} target="_blank" rel="noopener" className="flex items-center gap-5 rounded-2xl bg-naranja p-7 text-ink transition-colors hover:bg-[#FF6A2B]">
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-white/40"><WhatsIcon className="h-9 w-9" /></span>
                <span><b className="head block text-[24px]">Por WhatsApp</b><span className="text-[19px] font-semibold">{WHATSAPP_VISIBLE}</span><span className="block text-[17px]">Es lo más rápido.</span></span>
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="card flex items-center gap-5 p-7">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-naranja/15 text-naranja-osc"><Icon name="correo" className="h-7 w-7" /></span>
                <span className="min-w-0"><b className="head block text-[22px]">Por correo</b><span className="break-all text-[17px]">{CONTACT_EMAIL}</span></span>
              </a>
              <p className="mt-2 text-[17px] text-gris">Te respondemos en menos de 24 horas laborables.</p>
            </div>
            <div className="card p-7 sm:p-9">
              <h2 className="text-[28px]">O déjanos tus datos</h2>
              <div className="mt-6"><ContactForm /></div>
            </div>
          </div>
        </section>
      </main>
      <Footer cta={false} />
    </>
  );
}
