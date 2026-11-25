import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Icon, { WhatsIcon } from '@/components/Icon';
import { WA_HOLA, servicePages, testimonials } from '@/lib/content';

const PASOS = [
  ['Preparamos el plan', 'Estudiamos tu bar y a la competencia de tu zona, y decidimos qué grabar para que los de Roquetas te elijan a ti.'],
  ['Grabamos en tu bar', 'Vamos con nuestro equipo de grabación en el momento más tranquilo del día. Tú no tienes que preparar nada.'],
  ['Publicamos y medimos', 'Editamos los vídeos, los publicamos en tus redes y en Google, y cada mes revisamos qué funciona para mejorarlo.'],
];

const DISTINTO = [
  'Vamos a tu bar', 'Grabamos cuando a ti te viene bien', 'No tienes que salir si no quieres',
  'Montamos los vídeos', 'Escribimos los textos y publicamos', 'Todo lo grabado es tuyo',
];

const PROBLEMA = [
  'Se van los turistas y la terraza se queda vacía.',
  'Entre semana no entra casi nadie.',
  'Los de Roquetas no te conocen o no se acuerdan de ti.',
  'Publicas cuando puedes y no pasa nada.',
];

const CIFRAS = [
  ['12 → 151', 'reseñas de cinco estrellas en Google'],
  ['432.490', 'visualizaciones en TikTok'],
  ['2.457', 'seguidores en TikTok, desde cero'],
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
            <p className="etiqueta">Marketing para bares de Roquetas de Mar</p>
            <h1 id="t-hero" className="mx-auto mt-6 max-w-[16ch] text-[clamp(2.4rem,6.4vw,5rem)] uppercase leading-[1.02]">
              En invierno tu bar no tiene por qué <span className="text-naranja-osc">estar vacío</span>
            </h1>
            <p className="mx-auto mt-6 max-w-[40ch] text-[clamp(1.15rem,1.8vw,1.4rem)] leading-[1.5] text-gris">
              Cuando se van los turistas, las cajas bajan. Vamos a tu bar, lo grabamos y lo movemos en redes y en Google para que la gente de Roquetas venga también en invierno.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="/contacto/" className="btn btn-naranja">Quiero llenar mi bar en invierno <Icon name="flecha" className="h-5 w-5" /></a>
              <a href={WA_HOLA} target="_blank" rel="noopener" className="btn btn-whatsapp"><WhatsIcon className="h-7 w-7" /> Escríbenos por WhatsApp</a>
            </div>
          </div>
        </section>

        {/* ── EL PROBLEMA ── */}
        <section aria-labelledby="t-problema" className="px-4 pb-20 sm:px-6 md:pb-28">
          <div className="mx-auto max-w-[860px] text-center">
            <h2 id="t-problema" className="text-[clamp(2.2rem,5vw,3.8rem)] uppercase">¿Te suena?</h2>
            <ul className="mt-10 grid gap-3 text-left">
              {PROBLEMA.map((p) => (
                <li key={p} className="flex items-center gap-4 rounded-2xl border border-line bg-papel p-6 text-[clamp(1.15rem,2vw,1.4rem)] font-semibold">
                  <span aria-hidden className="head grid h-10 w-10 shrink-0 place-items-center rounded-full bg-naranja/15 text-[22px] text-naranja-osc">✕</span>{p}
                </li>
              ))}
            </ul>
            <p className="mx-auto mt-10 max-w-[30ch] text-[clamp(1.4rem,2.6vw,2rem)] font-semibold leading-snug">No es culpa de tu cocina ni de tu servicio. <span className="text-naranja-osc">Es que en invierno no te ven.</span></p>
          </div>
        </section>

        {/* ── CÓMO TRABAJAMOS ── */}
        <section aria-labelledby="t-pasos" className="bg-papel px-4 py-20 sm:px-6 md:py-24">
          <div className="mx-auto max-w-wrap">
            <p className="text-center"><span className="etiqueta">Nuestro método</span></p>
            <h2 id="t-pasos" className="mx-auto mt-5 max-w-[22ch] text-center text-[clamp(2rem,4.4vw,3.2rem)]">Detrás de cada vídeo hay trabajo. <span className="text-naranja-osc">Tú solo nos abres la puerta.</span></h2>
            <p className="mx-auto mt-4 max-w-[48ch] text-center text-[19px] text-gris">Con nuestro método, llenar tu bar en temporada baja no depende de la suerte. Lo hacemos en tres pasos, cada mes.</p>
            {/* Camino: cada paso lleva al siguiente con una flecha (abajo en móvil, a la derecha en ordenador) */}
            <ol className="mt-12 flex flex-col items-stretch md:flex-row">
              {PASOS.map(([t, d], i) => (
                <li key={t} className="flex flex-col items-center md:flex-1 md:flex-row">
                  <div className="w-full rounded-2xl border-2 border-line bg-white p-8 md:h-full">
                    <span className="head grid h-14 w-14 place-items-center rounded-full bg-ink text-[24px] text-white">{i + 1}</span>
                    <h3 className="mt-5 text-[26px]">{t}</h3>
                    <p className="mt-3 text-[18px] text-gris">{d}</p>
                  </div>
                  {i < PASOS.length - 1 && (
                    <span aria-hidden className="grid h-16 w-16 shrink-0 place-items-center text-naranja md:h-auto md:w-14">
                      <svg viewBox="0 0 24 24" className="h-11 w-11 rotate-90 md:rotate-0" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── LO QUE NOS HACE DISTINTOS ── */}
        <section aria-labelledby="t-distinto" className="px-4 py-20 sm:px-6 md:py-28">
          <div className="mx-auto grid max-w-wrap items-center gap-12 md:grid-cols-2">
            <div className="order-2 grid grid-cols-2 gap-3 md:order-none">
              <figure className="m-0">
                <video autoPlay muted loop playsInline preload="metadata" poster="/img/manuel-poster.jpg"
                  className="aspect-[9/16] w-full rounded-2xl object-cover" aria-label="Manuel, dueño de A Lo Cubano: «Estamos repletos de clientes que vienen por las redes»">
                  <source src="/video/manuel-loop.mp4" type="video/mp4" />
                </video>
                <figcaption className="mt-3 text-[17px] font-semibold">Manuel, dueño de A Lo Cubano</figcaption>
              </figure>
              <figure className="m-0 mt-12">
                <video autoPlay muted loop playsInline preload="metadata" poster="/img/grabando-poster.jpg"
                  className="aspect-[9/16] w-full rounded-2xl object-cover" aria-label="Grabando a Manuel en la terraza de A Lo Cubano">
                  <source src="/video/grabando-loop.mp4" type="video/mp4" />
                </video>
                <figcaption className="mt-3 text-[17px] font-semibold">Así lo grabamos en su local</figcaption>
              </figure>
            </div>
            <div>
              <p className="etiqueta">Lo que nos hace distintos</p>
              <h2 id="t-distinto" className="mt-5 text-[clamp(2.2rem,4.8vw,3.6rem)] uppercase">Grabamos en tu negocio</h2>
              <p className="mt-5 text-[20px] leading-[1.5] text-gris">No tienes que mandarnos fotos ni pensar qué publicar. Vamos nosotros a tu bar, grabamos lo que te hace especial y nos encargamos de todo lo demás.</p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {DISTINTO.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-[18px] font-medium">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-naranja/15 text-naranja-osc"><Icon name="check" className="h-4 w-4" /></span>{d}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a href="/contacto/" className="btn btn-naranja">Quiero que grabéis mi bar <Icon name="flecha" className="h-5 w-5" /></a>
                <a href={WA_HOLA} target="_blank" rel="noopener" className="btn btn-whatsapp"><WhatsIcon className="h-7 w-7" /> WhatsApp</a>
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICIOS ── */}
        <section id="servicios" aria-labelledby="t-servicios" className="bg-papel px-4 py-20 sm:px-6 md:py-28">
          <div className="mx-auto max-w-[920px] text-center">
            <p className="etiqueta">Lo que hacemos</p>
            <h2 id="t-servicios" className="mx-auto mt-5 max-w-[20ch] text-[clamp(2rem,4.4vw,3.2rem)]">Todo lo que tu bar necesita para que<span className="mt-2 block text-[1.35em] uppercase text-naranja-vivo">te elijan</span></h2>
            <div className="mt-12 grid gap-4 text-left md:grid-cols-2">
              {servicePages.map((s) => (
                <a key={s.slug} href={`/${s.slug}/`} className="card flex items-start gap-5 bg-white p-7">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-naranja/15 text-naranja-osc"><Icon name={s.icon} className="h-7 w-7" /></span>
                  <span>
                    <b className="head block text-[22px]">{s.name}</b>
                    <span className="mt-1 block text-[17px] text-gris">{s.short}</span>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[16px] font-semibold">Ver más <Icon name="flecha" className="h-4 w-4" /></span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── CASO REAL ── */}
        <section aria-labelledby="t-caso" className="px-4 py-20 text-center sm:px-6 md:py-28">
          <div className="mx-auto max-w-wrap">
            <p className="etiqueta">Un caso real</p>
            <h2 id="t-caso" className="mx-auto mt-5 max-w-[22ch] text-[clamp(2rem,4.4vw,3.2rem)]">Lo que conseguimos con el restaurante A Lo Cubano</h2>
            <p className="mt-3 text-[18px] text-gris">Recién abierto, desde julio de 2026.</p>
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
