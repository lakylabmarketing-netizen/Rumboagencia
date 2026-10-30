import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PageHead from '@/components/PageHead';
import { conditions, faqs, plans } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Planes y precios',
  description: 'Tres planes con el mismo equipo: Esencial 550 €/mes, Crecimiento 950 €/mes y Marca 1.600 €/mes. Condiciones y preguntas frecuentes.',
  alternates: { canonical: '/precios/' },
};

export default function Precios() {
  return (
    <>
      <Nav />
      <main id="contenido" className="relative overflow-hidden">
        <PageHead kicker="Planes y precios" title={<>Elige el plan que <span className="text-brasa">hace crecer tu negocio</span></>}
          lead="Tres planes con el mismo equipo. Cambian el volumen de contenido y el trabajo de captación." />

        <section aria-label="Planes" className="mx-auto grid max-w-[1320px] gap-3 px-4 sm:px-8 lg:grid-cols-3">
          {plans.map((p) => (
            <article key={p.id} className={`card relative flex flex-col p-7 ${p.rec ? 'card-naranja' : 'card-oscura'}`}>
              <div className="flex items-center justify-between">
                <h2 className="text-[1.1rem] font-semibold">{p.name}</h2>
                {p.rec && <span className="rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-cal">Recomendado</span>}
              </div>
              <div className="num mt-5 text-[3.4rem] font-bold leading-none">{p.price}<span className="text-[.38em] font-semibold"> €/mes</span></div>
              <p className={`mt-4 border-b pb-5 text-[1.05rem] font-semibold leading-snug ${p.rec ? 'border-ink/20' : 'border-line'}`}>{p.claim}</p>
              <p className={`mt-5 text-[13px] ${p.rec ? 'text-ink/70' : 'text-muted'}`}>{p.inc}</p>
              <ul className="mb-8 mt-3 grid gap-2">
                {p.items.map((it) => <li key={it} className="grid grid-cols-[14px_1fr] gap-2.5 text-[15.5px]"><span className={p.rec ? 'text-ink' : 'text-naranja'}>+</span>{it}</li>)}
              </ul>
              <a href={`/contacto/?plan=${p.id}`} className={`btn mt-auto ${p.rec ? 'bg-ink text-cal' : 'btn-linea'}`}>Reservar consulta</a>
            </article>
          ))}
        </section>

        <section aria-labelledby="t-cond" className="mx-auto grid max-w-[1320px] gap-8 px-4 pt-20 sm:px-8 md:grid-cols-[.6fr_1.4fr] md:pt-28">
          <h2 id="t-cond" className="text-[clamp(1.8rem,3.4vw,2.8rem)] font-bold tracking-[-.04em]">Condiciones</h2>
          <ul className="border-t border-line">
            {conditions.map((c) => (
              <li key={c.title} className="grid gap-2 border-b border-line py-5 md:grid-cols-[230px_1fr]">
                <b className="font-semibold">{c.title}</b><p className="text-[15.5px] leading-[1.55] text-gris">{c.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="preguntas" aria-labelledby="t-faq" className="mx-auto grid max-w-[1320px] gap-8 px-4 pt-20 sm:px-8 md:grid-cols-[.6fr_1.4fr] md:pt-28">
          <h2 id="t-faq" className="text-[clamp(1.8rem,3.4vw,2.8rem)] font-bold tracking-[-.04em]">Preguntas <span className="text-brasa">frecuentes</span></h2>
          <div className="border-t border-line">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-line py-5">
                <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 text-[1.1rem] font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}<span className="text-2xl font-light text-naranja transition-transform group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-3 max-w-[62ch] text-[15.5px] leading-[1.55] text-gris">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
