import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Icon from '@/components/Icon';
import { PROMO_APPS, WA_HOLA, servicePages, testimonials } from '@/lib/content';

const PASOS = [
  ['local', 'Vamos a tu negocio', 'Vamos a tu local con la cámara y grabamos, en el momento más tranquilo del día.'],
  ['video', 'Montamos y publicamos', 'Editamos los vídeos, escribimos los textos y los publicamos en tus redes y en Google.'],
  ['estrella', 'Te llegan más clientes', 'Más gente te ve, te encuentra en Google y te deja buenas reseñas.'],
];

const DISTINTO = [
  'Vamos a tu local', 'Grabamos cuando a ti te viene bien', 'No tienes que salir si no quieres',
  'Montamos los vídeos', 'Escribimos los textos y publicamos', 'Todo lo grabado es tuyo',
];

const CIFRAS = [
  ['12 → 151', 'reseñas de cinco estrellas en Google'],
  ['172.900', 'visualizaciones en TikTok'],
  ['607', 'personas pidieron la ruta para llegar'],
];

export default function Home() {
  const quotes = [3, 4, 2].map((n) => testimonials.find((t) => t.n === n)!);
  return (
    <>
      <Nav />
      <main id="contenido">
        {/* ── PORTADA ── */}
        <section aria-labelledby="t-hero" className="px-4 pb-16 pt-14 text-center sm:px-6 md:pb-24 md:pt-20">
          <div className="mx-auto max-w-wrap">
            <p className="etiqueta">Agencia de marketing · Grabamos en tu negocio</p>
            <h1 id="t-hero" className="mx-auto mt-6 max-w-[17ch] text-[clamp(2.4rem,6.4vw,5rem)] uppercase leading-[1.02]">
              Vamos a tu negocio, lo grabamos <span className="text-naranja-osc">y te traemos clientes</span>
            </h1>
            <p className="mx-auto mt-6 max-w-[40ch] text-[clamp(1.15rem,1.8vw,1.4rem)] leading-[1.5] text-gris">
              Grabamos tu negocio, publicamos los vídeos en tus redes y cuidamos tu ficha de Google. Tú sigues trabajando; nosotros nos encargamos.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="/contacto/" className="btn btn-naranja">Quiero la consultoría gratis <Icon name="flecha" className="h-5 w-5" /></a>
              <a href={WA_HOLA} target="_blank" rel="noopener" className="btn btn-linea">Escríbenos por WhatsApp</a>
            </div>
            <div className="mx-auto mt-12 grid max-w-[760px] grid-cols-3 gap-3 border-t border-line pt-8">
              {[['151', 'reseñas de 5 estrellas'], ['172.900', 'visualizaciones en TikTok'], ['607', 'personas pidieron la ruta']].map(([v, l]) => (
                <p key={l}><b className="head block text-[clamp(1.5rem,3.4vw,2.2rem)]">{v}</b><span className="mt-1 block text-[15px] leading-snug text-gris">{l}</span></p>
              ))}
            </div>
            <p className="mt-3 text-[15px] text-muted">Resultados reales de nuestro cliente A Lo Cubano, de julio a septiembre de 2026.</p>
          </div>
        </section>

        {/* ── CÓMO TRABAJAMOS ── */}
        <section aria-labelledby="t-pasos" className="bg-papel px-4 py-20 sm:px-6 md:py-24">
          <div className="mx-auto max-w-wrap">
            <h2 id="t-pasos" className="text-center text-[clamp(2rem,4.4vw,3.2rem)]">Así de fácil</h2>
            <ol className="mt-12 grid gap-4 md:grid-cols-3">
              {PASOS.map(([icon, t, d], i) => (
                <li key={t} className="rounded-2xl border border-line bg-white p-8">
                  <div className="flex items-center gap-4">
                    <span className="head grid h-14 w-14 shrink-0 place-items-center rounded-full bg-ink text-[24px] text-white">{i + 1}</span>
                    <Icon name={icon} className="h-8 w-8 text-naranja-osc" />
                  </div>
                  <h3 className="mt-6 text-[26px]">{t}</h3>
                  <p className="mt-2 text-[18px] text-gris">{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── LO QUE NOS HACE DISTINTOS ── */}
        <section aria-labelledby="t-distinto" className="px-4 py-20 sm:px-6 md:py-28">
          <div className="mx-auto grid max-w-wrap items-center gap-12 md:grid-cols-2">
            <div className="order-2 grid grid-cols-2 gap-3 md:order-none">
              <video autoPlay muted loop playsInline preload="metadata" poster="/portafolio/assets/pieza-3-poster.jpg"
                className="aspect-[9/16] w-full rounded-2xl object-cover" aria-label="Vídeo que grabamos en A Lo Cubano">
                <source src="/video/pieza-3-loop.mp4" type="video/mp4" />
              </video>
              <img src="/img/portada-pieza-2.webp" alt="Grabación en la cocina de A Lo Cubano antes de abrir" loading="lazy" className="mt-12 aspect-[9/16] w-full rounded-2xl object-cover" />
            </div>
            <div>
              <p className="etiqueta">Lo que nos hace distintos</p>
              <h2 id="t-distinto" className="mt-5 text-[clamp(2.2rem,4.8vw,3.6rem)] uppercase">Grabamos en tu negocio</h2>
              <p className="mt-5 text-[20px] leading-[1.5] text-gris">No tienes que mandarnos fotos ni pensar qué publicar. Vamos nosotros a tu local, grabamos lo que te hace especial y nos encargamos de todo lo demás.</p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {DISTINTO.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-[18px] font-medium">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-naranja/15 text-naranja-osc"><Icon name="check" className="h-4 w-4" /></span>{d}
                  </li>
                ))}
              </ul>
              <a href="/contacto/" className="btn btn-naranja mt-10">Quiero que grabéis mi negocio <Icon name="flecha" className="h-5 w-5" /></a>
            </div>
          </div>
        </section>

        {/* ── SERVICIOS ── */}
        <section id="servicios" aria-labelledby="t-servicios" className="bg-papel px-4 py-20 sm:px-6 md:py-28">
          <div className="mx-auto max-w-[920px] text-center">
            <p className="etiqueta">Lo que hacemos</p>
            <h2 id="t-servicios" className="mx-auto mt-5 max-w-[20ch] text-[clamp(2rem,4.4vw,3.2rem)]">Todo lo que tu negocio necesita para que <span className="text-naranja-osc">te elijan</span></h2>
            <div className="mt-12 grid gap-4 text-left sm:grid-cols-2">
              {servicePages.map((s) => (
                <a key={s.slug} href={`/${s.slug}/`} className="card flex items-start gap-5 bg-white p-7">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-naranja/15 text-naranja-osc"><Icon name={s.icon} className="h-7 w-7" /></span>
                  <span>
                    <b className="head block text-[22px]">{s.name}{s.slug === 'apps' && <span className="ml-2 align-middle text-[13px] font-semibold uppercase tracking-[.06em] text-naranja-osc">Nuevo</span>}</b>
                    <span className="mt-1 block text-[17px] text-gris">{s.short}</span>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[16px] font-semibold">Ver más <Icon name="flecha" className="h-4 w-4" /></span>
                  </span>
                </a>
              ))}
              <a href="/precios/" className="card flex items-start gap-5 bg-white p-7">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-naranja/15 text-naranja-osc"><Icon name="calendario" className="h-7 w-7" /></span>
                <span>
                  <b className="head block text-[22px]">Planes y precios</b>
                  <span className="mt-1 block text-[17px] text-gris">Desde 550 € al mes. Sin letra pequeña.</span>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[16px] font-semibold">Ver precios <Icon name="flecha" className="h-4 w-4" /></span>
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* ── CASO REAL ── */}
        <section aria-labelledby="t-caso" className="px-4 py-20 text-center sm:px-6 md:py-28">
          <div className="mx-auto max-w-wrap">
            <p className="etiqueta">Un caso real</p>
            <h2 id="t-caso" className="mx-auto mt-5 max-w-[22ch] text-[clamp(2rem,4.4vw,3.2rem)]">Lo que conseguimos con el restaurante A Lo Cubano</h2>
            <p className="mt-3 text-[18px] text-gris">De julio a septiembre de 2026, recién abierto.</p>
            <div className="mt-12 grid gap-10 md:grid-cols-3">
              {CIFRAS.map(([v, l]) => (
                <p key={l}>
                  <b className="head block text-[clamp(3rem,7vw,5rem)] leading-none">{v}</b>
                  <span className="mx-auto mt-3 block max-w-[18ch] text-[19px] font-medium uppercase tracking-[.04em] text-gris">{l}</span>
                </p>
              ))}
            </div>
            <a href="/caso/" className="btn btn-linea mt-12">Ver el caso completo <Icon name="flecha" className="h-5 w-5" /></a>
          </div>
        </section>

        {/* ── APPS ── */}
        <section id="apps" aria-labelledby="t-apps" className="bg-ink px-4 py-20 text-white sm:px-6 md:py-24">
          <div className="mx-auto grid max-w-wrap items-center gap-10 md:grid-cols-2">
            <video autoPlay muted loop playsInline preload="metadata" poster={PROMO_APPS.poster} className="aspect-video w-full rounded-2xl object-cover"
              aria-label="Vídeo: convertimos en una app las tareas que repites cada día">
              <source src={PROMO_APPS.src} type="video/mp4" />
            </video>
            <div>
              <p className="inline-block rounded-full bg-white/10 px-3.5 py-1.5 text-[13px] font-semibold uppercase tracking-[.08em]">Nuevo servicio</p>
              <h2 id="t-apps" className="mt-5 text-[clamp(2rem,4.4vw,3.2rem)]">Apps a medida para tu negocio</h2>
              <p className="mt-4 text-[20px] leading-[1.5] text-white/80">Si hay una tarea que repites cada día, como teclear albaranes, hacer los turnos o la carta, la convertimos en una app. Te la instalamos y la mantenemos nosotros.</p>
              <a href="/apps/" className="btn btn-naranja mt-8">Ver qué apps hacemos <Icon name="flecha" className="h-5 w-5" /></a>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIOS ── */}
        <section aria-labelledby="t-opiniones" className="px-4 py-20 sm:px-6 md:py-28">
          <div className="mx-auto max-w-[860px]">
            <h2 id="t-opiniones" className="text-center text-[clamp(2rem,4.4vw,3.2rem)]">Lo que dicen nuestros clientes</h2>
            <div className="mt-12 grid gap-4">
              {quotes.map((t) => (
                <figure key={t.n} className="card m-0 p-8">
                  <blockquote className="m-0 text-[clamp(1.25rem,2.2vw,1.5rem)] font-medium leading-[1.45]">«{t.a}»</blockquote>
                  <figcaption className="mt-4 text-[17px] font-semibold text-naranja-osc">Manuel, dueño de A Lo Cubano</figcaption>
                </figure>
              ))}
            </div>
            <p className="mt-8 text-center"><a href="/caso/" className="text-[18px] font-semibold underline underline-offset-4">Ver los vídeos de Manuel</a></p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
