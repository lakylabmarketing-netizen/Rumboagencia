import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PageHead from '@/components/PageHead';
import Icon from '@/components/Icon';
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
      <main id="contenido">
        <PageHead kicker="Planes y precios" title={<>Elige tu <span className="text-naranja-osc">plan</span></>}
          lead="Tres planes con el mismo equipo. En todos vamos a tu negocio a grabar. Cambia cuánto contenido hacemos y cuánto trabajo de captación." />

        <section aria-label="Planes" className="px-4 pb-20 sm:px-6">
          <div className="mx-auto grid max-w-wrap gap-4 lg:grid-cols-3">
            {plans.map((p) => (
              <article key={p.id} className={`relative flex flex-col rounded-2xl p-8 ${p.rec ? 'border-[3px] border-naranja bg-white' : 'border border-line bg-papel'}`}>
                {p.rec && <span className="absolute -top-4 left-8 rounded-full bg-naranja px-4 py-1 text-[14px] font-semibold">Recomendado</span>}
                <h2 className="text-[28px]">{p.name}</h2>
                <p className="head mt-4 text-[3.4rem] leading-none">{p.price} €<span className="text-[.4em] font-semibold text-gris"> al mes</span></p>
                <p className="mt-4 border-b border-line pb-5 text-[19px] font-medium">{p.claim}</p>
                <p className="mt-5 text-[16px] text-muted">{p.inc}</p>
                <ul className="mb-8 mt-3 grid gap-3">
                  {p.items.map((it) => (
                    <li key={it} className="flex gap-3 text-[18px]"><Icon name="check" className="mt-1 h-5 w-5 shrink-0 text-naranja-osc" />{it}</li>
                  ))}
                </ul>
                <a href={`/contacto/?plan=${p.id}`} className={`btn mt-auto ${p.rec ? 'btn-naranja' : 'btn-linea'}`}>Quiero este plan</a>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="t-cond" className="bg-papel px-4 py-20 sm:px-6 md:py-24">
          <div className="mx-auto max-w-[860px]">
            <h2 id="t-cond" className="text-center text-[clamp(2rem,4.4vw,3.2rem)]">Condiciones</h2>
            <ul className="mt-10 grid gap-4">
              {conditions.map((c) => (
                <li key={c.title} className="rounded-2xl border border-line bg-white p-7">
                  <b className="head block text-[22px]">{c.title}</b><p className="mt-2 text-[18px] text-gris">{c.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="preguntas" aria-labelledby="t-faq" className="px-4 py-20 sm:px-6 md:py-24">
          <div className="mx-auto max-w-[860px]">
            <h2 id="t-faq" className="text-center text-[clamp(2rem,4.4vw,3.2rem)]">Preguntas frecuentes</h2>
            <div className="mt-10 grid gap-3">
              {faqs.map((f) => (
                <details key={f.q} className="group rounded-2xl border border-line bg-papel p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[20px] font-semibold [&::-webkit-details-marker]:hidden">
                    {f.q}<span className="text-[28px] font-light text-naranja-osc transition-transform group-open:rotate-45" aria-hidden>+</span>
                  </summary>
                  <p className="mt-3 text-[18px] text-gris">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
