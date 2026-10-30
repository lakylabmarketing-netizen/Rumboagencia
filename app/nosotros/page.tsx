import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PageHead from '@/components/PageHead';
import { commitments, team } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Rumbo somos Esteban y Eneko. Quien edita no atiende clientes: así el trabajo sale a tiempo y sabes siempre con quién hablar.',
  alternates: { canonical: '/nosotros/' },
};

export default function Nosotros() {
  return (
    <>
      <Nav />
      <main id="contenido" className="relative overflow-hidden">
        <PageHead kicker="Nosotros · dos personas, un equipo" title={<>Detrás del <span className="text-brasa">trabajo</span></>}
          lead="Quien edita no atiende clientes: así el trabajo sale a tiempo y sabes siempre con quién hablar." />

        <section aria-label="Esteban y Eneko" className="mx-auto max-w-[1320px] px-4 sm:px-8">
          <div className="relative overflow-hidden rounded-[28px]">
            <img src="/img/equipo.webp" alt="Esteban y Eneko, los dos socios de Rumbo" width={1800} height={1018} className="aspect-[4/3] w-full object-cover object-[50%_25%] md:aspect-[16/8]" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#070707]/80 via-transparent to-transparent" />
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {team.map((m) => (
              <article key={m.name} className="card card-oscura p-6 sm:p-8">
                <div className="flex items-center gap-4">
                  <img src={m.img} width={m.w} height={m.h} alt={`${m.name}, socio de Rumbo`} loading="lazy" className="h-16 w-16 rounded-full object-cover object-top" />
                  <div>
                    <h2 className="text-[1.9rem] font-bold leading-none tracking-[-.04em]">{m.name}</h2>
                    <span className="mt-1 block text-[14px] font-semibold text-brasa">{m.role}</span>
                  </div>
                </div>
                <p className="mt-5 max-w-[48ch] text-[16px] leading-[1.55] text-gris">{m.text}</p>
                <p className="mt-4 text-[13.5px] leading-relaxed text-muted">{m.tasks}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="t-firmamos" className="mx-auto grid max-w-[1320px] gap-8 px-4 pt-20 sm:px-8 md:grid-cols-[.8fr_1.2fr] md:pt-28">
          <div>
            <h2 id="t-firmamos" className="text-[clamp(1.8rem,3.4vw,2.8rem)] font-bold tracking-[-.04em]">Lo que firmamos</h2>
            <p className="mt-3 max-w-[30ch] text-[1.15rem] leading-[1.4] text-gris">En tres meses tendrás un sistema montado y datos para saber si funciona.</p>
          </div>
          <ul className="border-t border-line">
            {commitments.map((c) => (
              <li key={c.title} className="grid gap-2 border-b border-line py-5 md:grid-cols-[200px_1fr]">
                <b className="font-semibold">{c.title}{c.note && <span className="ml-2 rounded-full border border-brasa/50 px-2 py-0.5 text-[11px] font-medium text-brasa">{c.note}</span>}</b>
                <p className="text-[15.5px] leading-[1.55] text-gris">{c.text}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
