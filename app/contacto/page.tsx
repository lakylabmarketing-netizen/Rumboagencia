import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PageHead from '@/components/PageHead';
import ContactForm from '@/components/ContactForm';
import Icon, { WhatsIcon } from '@/components/Icon';
import { CONTACT_EMAIL, WA_CONSULTA, WHATSAPP_VISIBLE } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Contacto y consultoría gratis',
  description: 'Treinta minutos, sin compromiso. Miramos tu perfil y tu ficha de Google antes de la llamada y te decimos qué haríamos primero.',
  alternates: { canonical: '/contacto/' },
};

export default function Contacto() {
  return (
    <>
      <Nav />
      <main id="contenido">
        <PageHead kicker="Consultoría gratis · 30 minutos" title={<>Cuéntanos qué necesita <span className="text-naranja-osc">tu negocio</span></>}
          lead="Sin compromiso. Miramos tus redes y tu ficha de Google antes de la llamada y te decimos qué haríamos primero." />
        <section className="px-4 pb-20 sm:px-6">
          <div className="mx-auto grid max-w-wrap gap-8 md:grid-cols-[.8fr_1.2fr]">
            <div className="grid content-start gap-4">
              <a href={WA_CONSULTA} target="_blank" rel="noopener" className="card flex items-center gap-5 p-7">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#25D366]/15 text-[#128C4A]"><WhatsIcon className="h-7 w-7" /></span>
                <span><b className="head block text-[22px]">Por WhatsApp</b><span className="text-[18px]">{WHATSAPP_VISIBLE}</span><span className="block text-[16px] text-gris">Es lo más rápido.</span></span>
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="card flex items-center gap-5 p-7">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-naranja/15 text-naranja-osc"><Icon name="correo" className="h-7 w-7" /></span>
                <span className="min-w-0"><b className="head block text-[22px]">Por correo</b><span className="break-all text-[17px]">{CONTACT_EMAIL}</span></span>
              </a>
              <p className="mt-2 text-[17px] text-gris">Te respondemos en menos de 24 horas laborables.</p>
            </div>
            <div className="rounded-2xl border border-line bg-white p-7 shadow-[0_10px_40px_-20px_rgba(0,0,0,.15)] sm:p-9">
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
