import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { WA_HOLA, servicePages, testimonials } from '@/lib/content';

const Arrow = ({ dark = false }: { dark?: boolean }) => (
  <span aria-hidden className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-[14px] ${dark ? 'bg-ink text-cal' : 'bg-cal text-ink'}`}>↗</span>
);

export default function Home() {
  const quote = testimonials.find((t) => t.n === 3)!;
  return (
    <>
      <Nav />
      <main id="contenido">
        {/* ── PORTADA ── */}
        <section aria-labelledby="t-hero" className="relative overflow-hidden">
          <div aria-hidden className="glow pointer-events-none absolute left-1/2 top-[18%] h-[min(90vw,900px)] w-[min(90vw,900px)] -translate-x-1/2" />
          <div className="relative mx-auto flex max-w-[1320px] flex-col px-4 md:min-h-[100svh] pt-[calc(96px+env(safe-area-inset-top))] sm:px-8 md:block md:pt-[120px]">
            <h1 id="t-hero" className="sube relative z-10 max-w-[12ch] text-[clamp(2.3rem,4.6vw,4.2rem)] font-light leading-[1.02] tracking-[-.035em] md:max-w-[13ch]">
              Que tu negocio sea el que <span className="font-normal text-brasa">todos guardan</span>
            </h1>

            {/* Retrato de Esteban y Eneko */}
            <div className="sube d2 relative -mx-4 mt-4 aspect-[4/3] sm:-mx-8 md:absolute md:inset-x-0 md:bottom-0 md:mx-auto md:mt-0 md:aspect-auto md:h-[82%] md:w-[min(1000px,74%)]">
              <img src="/img/equipo.webp" alt="Esteban y Eneko, los dos socios de Rumbo" width={1800} height={1018}
                className="fundido h-full w-full object-cover object-[50%_20%]" />
            </div>

            {/* Tarjeta arriba a la derecha: consultoría */}
            <a href="/asesoria/" className="sube d3 card card-clara absolute right-8 top-[120px] z-10 hidden w-[310px] grid-cols-[1fr_96px] gap-3 p-3 pl-4 md:grid">
              <span className="py-1">
                <b className="block text-[15px] font-bold uppercase tracking-[.02em]">Consultoría gratis</b>
                <span className="mt-1 block text-[12.5px] leading-snug text-[#4a4744]">30 minutos para decirte qué haríamos primero.</span>
                <span className="mt-3 inline-block rounded-full bg-ink px-3 py-1.5 text-[12px] font-semibold text-cal">Reservar</span>
              </span>
              <img src="/img/testimonio-3.webp" alt="" className="h-full w-full rounded-[14px] object-cover" />
            </a>

            {/* Tarjetas abajo a la izquierda: redes y Google */}
            <div className="sube d4 absolute bottom-10 left-8 z-10 hidden gap-3 md:flex">
              <a href="/redes/" className="card card-naranja flex w-[150px] flex-col justify-between p-4">
                <span aria-hidden className="flex gap-1"><i className="block h-1.5 w-6 rounded-full bg-ink" /><i className="block h-1.5 w-1.5 rounded-full bg-ink/50" /><i className="block h-1.5 w-1.5 rounded-full bg-ink/50" /></span>
                <b className="mt-10 block text-[14px] font-bold uppercase leading-tight">Redes<br />sociales</b>
              </a>
              <a href="/google/" className="card card-clara grid w-[290px] grid-cols-[1fr_92px] gap-3 p-3 pl-4">
                <span className="py-1">
                  <b className="block text-[14px] font-bold uppercase">Google y reseñas</b>
                  <span className="mt-1 block text-[12.5px] leading-snug text-[#4a4744]">De 12 a 151 reseñas de cinco estrellas en un caso real.</span>
                  <span className="mt-2 block text-[12px] font-semibold underline underline-offset-2">Ver servicio</span>
                </span>
                <span className="relative">
                  <img src="/portafolio/assets/pieza-1-poster.jpg" alt="" className="h-full w-full rounded-[14px] object-cover" />
                  <span aria-hidden className="absolute bottom-1.5 right-1.5 grid h-7 w-7 place-items-center rounded-full bg-ink text-[12px] text-cal">↘</span>
                </span>
              </a>
            </div>

            {/* «agencia de marketing» + llamada a la acción */}
            <div className="relative z-10 -mt-[22vw] pb-14 sm:-mt-24 md:absolute md:bottom-10 md:right-8 md:mt-0 md:pb-0 md:text-right">
              <p className="sube d3 text-[clamp(3.2rem,8.4vw,8.4rem)] font-bold leading-[.84] tracking-[-.065em]">agencia de<br />marketing</p>
              <div className="sube d4 mt-6 flex flex-wrap gap-3 md:absolute md:-top-16 md:right-0 md:mt-0">
                <a href="/contacto/" className="btn btn-naranja w-full sm:w-auto">Reservar consulta gratis</a>
              </div>
              <p className="mt-4 text-[14px] text-muted md:hidden">Esteban y Eneko · Almería y provincia</p>
            </div>
          </div>
        </section>

        {/* ── 01 / SERVICIOS ── */}
        <section id="servicios" aria-labelledby="t-servicios" className="mx-auto max-w-[1320px] px-4 py-20 sm:px-8 md:py-28">
          <div className="grid gap-6 md:grid-cols-[220px_1fr]">
            <p className="text-[15px]"><span className="text-naranja">01/</span> servicios</p>
            <h2 id="t-servicios" className="max-w-[24ch] text-[clamp(1.8rem,3.6vw,3.2rem)] font-normal leading-[1.1] tracking-[-.035em]">
              No hacemos publicaciones sueltas. <span className="text-brasa">Montamos el sistema</span> para que te encuentren, te elijan y vuelvan.
            </h2>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {servicePages.map((s, i) => {
              const orange = s.slug === 'asesoria';
              return (
                <a key={s.slug} href={`/${s.slug}/`} className={`card ${orange ? 'card-naranja' : 'card-clara'} relative flex min-h-[230px] flex-col justify-between overflow-hidden p-6`}>
                  <span className="flex items-start justify-between gap-3">
                    <span className={`num text-[13px] font-semibold ${orange ? 'text-ink/70' : 'text-[#8a5a3c]'}`}>0{i + 1}</span>
                    <Arrow dark />
                  </span>
                  <span>
                    {orange && <span className="mb-2 inline-block rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-cal">Consultoría gratis</span>}
                    <b className="block text-[1.7rem] font-bold leading-[1.05] tracking-[-.04em]">{s.name}</b>
                    <span className={`mt-1 block text-[15px] ${orange ? 'text-ink/80' : 'text-[#4a4744]'}`}>{s.short}</span>
                  </span>
                </a>
              );
            })}
            <a href="/precios/" className="card card-oscura flex min-h-[230px] flex-col justify-between p-6">
              <span className="flex items-start justify-between"><span className="num text-[13px] text-muted">€</span><Arrow /></span>
              <span><b className="block text-[1.7rem] font-bold leading-[1.05] tracking-[-.04em]">Planes y precios</b><span className="mt-1 block text-[15px] text-gris">Desde 550 €/mes, con el mismo equipo.</span></span>
            </a>
          </div>
        </section>

        {/* ── 02 / CASO REAL ── */}
        <section aria-labelledby="t-caso" className="mx-auto max-w-[1320px] px-4 pb-20 sm:px-8 md:pb-28">
          <div className="grid gap-6 md:grid-cols-[220px_1fr]">
            <p className="text-[15px]"><span className="text-naranja">02/</span> caso real</p>
            <div className="grid gap-3 lg:grid-cols-[.9fr_1.1fr]">
              <figure className="card card-oscura relative m-0 min-h-[340px] overflow-hidden">
                <img src="/img/testimonio-3.webp" alt="Manuel, dueño de A Lo Cubano" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-6">
                  <blockquote className="m-0 text-[1.35rem] font-semibold leading-[1.2] tracking-[-.02em]">«{quote.a}»</blockquote>
                  <span className="mt-2 block text-[14px] text-gris">Manuel · A Lo Cubano, Roquetas de Mar</span>
                </figcaption>
              </figure>
              <div className="card card-clara flex flex-col justify-between gap-8 p-7">
                <div>
                  <h2 id="t-caso" className="text-[clamp(1.8rem,3vw,2.6rem)] font-bold leading-[1.02] tracking-[-.045em]">Once semanas con A Lo Cubano</h2>
                  <p className="mt-2 text-[15px] text-[#4a4744]">Abrió a finales de junio de 2026. Empezamos el 8 de julio.</p>
                </div>
                <div className="grid gap-5 sm:grid-cols-3">
                  {[['172.900', 'vistas en TikTok'], ['18.107', 'vieron su ficha de Google'], ['12 → 151', 'reseñas de cinco estrellas']].map(([v, l]) => (
                    <div key={l} className="border-t border-black/15 pt-3"><div className="num text-[1.9rem] font-bold leading-none">{v}</div><p className="mt-1.5 text-[14px] text-[#4a4744]">{l}</p></div>
                  ))}
                </div>
                <a href="/caso/" className="btn w-fit bg-ink text-cal">Ver el caso completo ↗</a>
              </div>
            </div>
          </div>
        </section>

        {/* ── 03 / MÁS ── */}
        <section aria-label="Más de Rumbo" className="mx-auto max-w-[1320px] px-4 sm:px-8">
          <div className="grid gap-6 md:grid-cols-[220px_1fr]">
            <p className="text-[15px]"><span className="text-naranja">03/</span> más</p>
            <div className="grid gap-3 md:grid-cols-[1fr_.8fr]">
              <ul className="grid">
                {[['/nosotros/', 'Nosotros', 'Esteban y Eneko: hablas con quien hace el trabajo'], ['/precios/#preguntas', 'Preguntas frecuentes', 'Permanencia, propiedad, grabaciones…'], ['/contacto/', 'Contacto', 'Te respondemos en menos de 24 horas laborables']].map(([h, t, d]) => (
                  <li key={h}>
                    <a href={h} className="group flex items-center justify-between gap-4 border-b border-line py-5">
                      <span><b className="block text-[1.4rem] font-semibold tracking-[-.03em] group-hover:text-brasa">{t}</b><span className="text-[14.5px] text-muted">{d}</span></span>
                      <Arrow />
                    </a>
                  </li>
                ))}
              </ul>
              <a href={WA_HOLA} target="_blank" rel="noopener" className="card card-oscura relative flex min-h-[220px] flex-col justify-between overflow-hidden p-6">
                <div aria-hidden className="glow absolute -bottom-24 -right-24 h-72 w-72" />
                <span className="tech relative text-brasa">WhatsApp</span>
                <span className="relative"><b className="block text-[1.7rem] font-bold leading-[1.05] tracking-[-.04em]">¿Lo hablamos ahora?</b><span className="mt-1 block text-[15px] text-gris">Escríbenos y te contestamos nosotros.</span></span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
