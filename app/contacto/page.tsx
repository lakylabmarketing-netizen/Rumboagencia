import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PageHead from '@/components/PageHead';
import ContactForm from '@/components/ContactForm';
import { CONTACT_EMAIL, WA_CONSULTA } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Contacto y consultoría gratis',
  description: 'Treinta minutos, sin compromiso. Miramos tu perfil y tu ficha de Google antes de la llamada y te decimos qué haríamos primero.',
  alternates: { canonical: '/contacto/' },
};

export default function Contacto() {
  return (
    <>
      <Nav />
      <main id="contenido" className="relative overflow-hidden">
        <PageHead kicker="Consultoría gratis · 30 minutos" title={<>Cuéntanos qué necesita <span className="text-brasa">tu negocio</span></>}
          lead="Treinta minutos, sin compromiso. Miramos tu perfil y tu ficha de Google antes de la llamada y te decimos qué haríamos primero." />
        <section className="mx-auto grid max-w-[1320px] gap-10 px-4 sm:px-8 md:grid-cols-[.8fr_1.2fr]">
          <div className="grid content-start gap-3">
            <a href={WA_CONSULTA} target="_blank" rel="noopener" className="card card-naranja flex items-center justify-between gap-4 p-6">
              <span><b className="block text-[1.4rem] font-bold tracking-[-.03em]">Por WhatsApp</b><span className="text-[15px] text-ink/80">La forma más rápida: te contestamos nosotros.</span></span>
              <span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-cal">↗</span>
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="card card-oscura flex items-center justify-between gap-4 p-6">
              <span><b className="block text-[1.4rem] font-bold tracking-[-.03em]">Por email</b><span className="break-all text-[15px] text-gris">{CONTACT_EMAIL}</span></span>
              <span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cal text-ink">↗</span>
            </a>
            <ul className="mt-4 grid gap-2 text-[15px] text-gris">
              <li><span className="text-naranja">+</span> Respondemos en menos de 24 horas laborables</li>
              <li><span className="text-naranja">+</span> Crecimiento o Marca: si tu sector ya está cogido en tu zona, te lo decimos en la primera llamada</li>
              <li><span className="text-naranja">+</span> Almería y provincia</li>
            </ul>
          </div>
          <div className="card card-oscura p-6 sm:p-8"><ContactForm /></div>
        </section>
      </main>
      <Footer cta={false} />
    </>
  );
}
