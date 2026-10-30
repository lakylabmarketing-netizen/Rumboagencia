import Nav from './Nav';
import Footer from './Footer';
import Icon from './Icon';
import { PROMO_APPS, servicePages, type ServicePage } from '@/lib/content';

export default function ServiceView({ s }: { s: ServicePage }) {
  const others = servicePages.filter((o) => o.slug !== s.slug);
  return (
    <>
      <Nav />
      <main id="contenido">
        {/* Cabecera */}
        <section className="px-4 pb-16 pt-12 sm:px-6 md:pb-24 md:pt-20">
          <div className="mx-auto grid max-w-wrap items-center gap-10 md:grid-cols-2">
            <div>
              <a href="/#servicios" className="text-[17px] font-medium text-gris underline-offset-4 hover:underline">← Todos los servicios</a>
              <h1 className="mt-6 text-[clamp(2.4rem,5.6vw,4.2rem)] uppercase leading-[1.03]">{s.title}</h1>
              <p className="mt-5 max-w-[42ch] text-[clamp(1.15rem,1.8vw,1.35rem)] leading-[1.5] text-gris">{s.lead}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href="/contacto/" className="btn btn-naranja">Pedir consultoría gratis <Icon name="flecha" className="h-5 w-5" /></a>
                <span className="text-[17px] font-medium text-gris">{s.plan}</span>
              </div>
            </div>
            {s.slug === 'apps' ? (
              <video autoPlay muted loop playsInline preload="metadata" poster={PROMO_APPS.poster} className="aspect-video w-full rounded-2xl object-cover"
                aria-label="Vídeo: convertimos en una app las tareas que repites cada día">
                <source src={PROMO_APPS.src} type="video/mp4" />
              </video>
            ) : (
              <img src={s.img} alt={s.imgAlt} className="mx-auto aspect-[4/5] w-full max-w-[420px] rounded-2xl object-cover" />
            )}
          </div>
        </section>

        {/* Qué incluye */}
        <section aria-labelledby="t-incluye" className="bg-papel px-4 py-20 sm:px-6 md:py-24">
          <div className="mx-auto max-w-wrap">
            <h2 id="t-incluye" className="text-center text-[clamp(2rem,4.4vw,3.2rem)]">Qué incluye</h2>
            <ul className="mt-12 grid gap-4 md:grid-cols-2">
              {s.items.map(([t, d]) => (
                <li key={t} className="flex gap-4 rounded-2xl border border-line bg-white p-7">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-naranja/15 text-naranja-osc"><Icon name="check" className="h-5 w-5" /></span>
                  <span><b className="head block text-[22px]">{t}</b><span className="mt-1 block text-[18px] text-gris">{d}</span></span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Prueba real */}
        {s.proof && (
          <section aria-labelledby="t-prueba" className="px-4 py-20 text-center sm:px-6 md:py-24">
            <div className="mx-auto max-w-wrap">
              <h2 id="t-prueba" className="text-[clamp(1.8rem,3.6vw,2.6rem)]">{s.proof.title}</h2>
              <div className={`mt-10 grid gap-10 ${s.proof.stats.length > 2 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
                {s.proof.stats.map(([v, l]) => (
                  <p key={l}>
                    <b className="head block break-words text-[clamp(2.2rem,5vw,3.6rem)] leading-none">{v}</b>
                    <span className="mx-auto mt-3 block max-w-[24ch] text-[18px] text-gris">{l}</span>
                  </p>
                ))}
              </div>
              {s.slug !== 'apps' && s.slug !== 'asesoria' && <a href="/caso/" className="btn btn-linea mt-10">Ver el caso completo</a>}
            </div>
          </section>
        )}

        {/* Otros servicios */}
        <section aria-labelledby="t-otros" className="px-4 pb-20 sm:px-6">
          <div className="mx-auto max-w-wrap">
            <h2 id="t-otros" className="text-[26px]">Otros servicios</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {others.map((o) => (
                <a key={o.slug} href={`/${o.slug}/`} className="card flex items-center gap-4 p-5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-naranja/15 text-naranja-osc"><Icon name={o.icon} className="h-6 w-6" /></span>
                  <b className="text-[18px] font-semibold">{o.name}</b>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
