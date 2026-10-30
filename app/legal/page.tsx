import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PageHead from '@/components/PageHead';
import { CONTACT_EMAIL } from '@/lib/content';

export const metadata: Metadata = { title: 'Aviso legal y privacidad', alternates: { canonical: '/legal/' } };

export default function Legal() {
  return (
    <>
      <Nav />
      <main id="contenido" className="relative overflow-hidden">
        <PageHead kicker="Aviso legal y privacidad" title="Lo legal, claro y corto" />
        <section className="mx-auto grid max-w-[760px] gap-8 px-4 pb-20 text-[18px] leading-[1.6] text-gris sm:px-6">
          <div id="aviso-legal"><h2 className="mb-2 text-[24px] text-ink">Quién está detrás</h2>
            <p>Esta web es de Rumbo, agencia de marketing formada por Esteban y Eneko. Contacto: <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p></div>
          <div id="privacidad"><h2 className="mb-2 text-[24px] text-ink">Tus datos</h2>
            <p>Solo los que escribes en el formulario de consulta, para responderte; no los cedemos a nadie. El formulario se procesa en Netlify, el servicio que aloja esta web. Base legal: tu consentimiento. Puedes pedir acceder, corregir o borrar tus datos en el correo de arriba y reclamar ante la AEPD (aepd.es).</p></div>
          <div id="cookies"><h2 className="mb-2 text-[24px] text-ink">Cookies</h2>
            <p>Esta web no usa cookies ni herramientas de seguimiento.</p></div>
        </section>
      </main>
      <Footer cta={false} />
    </>
  );
}
