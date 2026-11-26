import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Icon, { WhatsIcon } from '@/components/Icon';
import Reveal from '@/components/Reveal';
import CountUp from '@/components/CountUp';
import Carrusel from '@/components/Carrusel';
import { WA_HOLA, plans, servicePages, testimonials, wa } from '@/lib/content';


// Fotogramas reales de A Lo Cubano para el collage de la portada (cada columna se repite para el bucle)
const COLUMNAS = [
  ['/portafolio/assets/pieza-4-poster.jpg', '/img/testimonio-1.webp', '/img/grabando-poster.jpg'],
  ['/img/portada-pieza-2.webp', '/img/manuel-poster.jpg', '/portafolio/assets/pieza-3-poster.jpg'],
  ['/img/testimonio-3.webp', '/img/testimonio-5.webp', '/img/testimonio-2.webp'],
];

const PROBLEMA = [
  'Se van los turistas y la terraza se queda vacía.',
  'Entre semana no entra casi nadie.',
  'Los de Roquetas no te conocen o no se acuerdan de ti.',
  'Publicas cuando puedes y no pasa nada.',
];

const PASOS = [
  ['Llamada', 'Te llamamos, conocemos tu local y te decimos qué haríamos para llenarlo en invierno.'],
  ['Plan y guiones', 'Calendario del mes y un guion para cada vídeo, pensado para la gente de Roquetas.'],
  ['Grabamos en tu local', 'Vamos en el momento más tranquilo del día. Tú no tienes que preparar nada.'],
  ['Publicamos y medimos', 'Editamos, publicamos en tus redes y en Google, y cada mes te contamos qué ha funcionado.'],
];

const DUDAS = [
  ['¿Tengo que salir yo en los vídeos?', 'No. Funciona mejor si sales tú o alguien de tu equipo, pero se puede grabar todo centrado en tu local, tus platos y tu espacio. Lo decides antes de grabar.'],
  ['Nunca he grabado un vídeo. ¿Es un problema?', 'No. Nosotros llevamos el guion y la cámara, y te decimos qué hacer en cada toma.'],
  ['¿Cuánto cuesta?', 'Depende del paquete que elijas. Escríbenos por WhatsApp y te pasamos el precio sin compromiso.'],
  ['¿Hay permanencia?', 'Campaña es una campaña única. Presencia y Marca son paquetes de tres meses.'],
  ['¿Cuándo voy a notar algo?', 'El primer mes se nota en la presencia: publicas de forma constante. El movimiento de clientes suele llegar entre el segundo y el tercer mes.'],
];

const CINTA = ['Vídeos', 'Reseñas en Google', 'TikTok', 'Instagram', 'Roquetas de Mar', 'Grabamos en tu local'];

const Tarjeta = ({ src, alt = '' }: { src: string; alt?: string }) => (
  <figure className="relative m-0 overflow-hidden rounded-[22px] border border-white/10">
    <img src={src} alt={alt} loading="lazy" className="aspect-[9/14] w-full object-cover" />
    <span aria-hidden className="historia absolute inset-x-3 top-3 flex gap-1.5"><i /><i /><i /></span>
    <figcaption className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 text-[14px] font-semibold text-white backdrop-blur">
      <span className="grid h-6 w-6 place-items-center rounded-full bg-naranja text-[11px] font-bold text-ink">AL</span>@alocubanofusion
    </figcaption>
  </figure>
);

export default function Home() {
  const quotes = [3, 4, 2].map((n) => testimonials.find((t) => t.n === n)!);
  return (
    <>
      <Nav />
      <Reveal />
      <main id="contenido" className="pagina-clara">
        {/* ── PORTADA ── */}
        <section aria-labelledby="t-hero" className="rejilla relative overflow-hidden px-4 pb-16 pt-10 sm:px-6 md:pb-24 md:pt-16">
          <div className="mx-auto grid max-w-wrap items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
            <div className="relative">
              <p className="etiqueta">Marketing para restauración y ocio en Roquetas de Mar</p>
              <h1 id="t-hero" className="mt-6 text-[clamp(2.6rem,6.6vw,5.4rem)]">
                En invierno tu local no tiene por qué <span className="marca">estar vacío</span>
              </h1>
              <p className="mt-8 max-w-[38ch] text-[clamp(1.15rem,1.8vw,1.35rem)] leading-[1.5] text-gris">
                Cuando se van los turistas, las cajas bajan. Vamos a tu local, lo grabamos y lo movemos en redes y en Google para que la gente de Roquetas venga también en invierno.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href={WA_HOLA} target="_blank" rel="noopener" className="btn btn-whatsapp"><WhatsIcon className="h-7 w-7" /> Escríbenos por WhatsApp</a>
                <a href="#contacto" className="btn btn-linea">Te llamamos</a>
              </div>
            </div>
            {/* Collage que se mueve solo */}
            <div aria-hidden className="relative h-[460px] overflow-hidden [mask-image:linear-gradient(180deg,transparent,#000_12%,#000_88%,transparent)] sm:h-[560px] lg:h-[640px]">
              <div className="absolute inset-0 grid -rotate-6 scale-110 grid-cols-3 gap-3">
                {COLUMNAS.map((col, i) => (
                  <div key={i} className={`flex flex-col gap-3 ${i === 1 ? 'col-baja pt-16' : 'col-sube'}`}>
                    {[...col, ...col].map((src, j) => <Tarjeta key={j} src={src} />)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CIFRAS ── */}
        <section aria-labelledby="t-cifras" className="relative overflow-hidden border-y border-line px-4 py-20 sm:px-6 md:py-24">
          <div className="mx-auto max-w-wrap">
            <p className="etiqueta">Resultados reales</p>
            <h2 id="t-cifras" data-reveal className="mt-6 max-w-[16ch] text-[clamp(2.2rem,5vw,4rem)]">Más gente les encuentra <span className="text-naranja">en Google</span></h2>
            <p data-reveal className="mt-5 max-w-[40ch] text-[20px] text-gris">Resultados reales de A Lo Cubano, restaurante en Roquetas de Mar, de julio a noviembre de 2026.</p>
            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              {/* Google, lo más importante: tarjeta grande */}
              <div data-reveal className="card relative overflow-hidden p-8 ring-1 ring-naranja/50 shadow-[0_0_90px_-30px_rgba(240,78,23,.6)] sm:p-10 lg:col-span-2 lg:row-span-2">
                <p className="flex items-center gap-3 text-[18px] font-semibold text-gris">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-naranja text-ink"><Icon name="estrella" className="h-6 w-6" /></span>En Google
                </p>
                <p className="head mt-8 text-[clamp(4rem,10vw,7.5rem)] leading-none text-naranja"><CountUp to={18107} step={1000} k prefix="+" /></p>
                <p className="mt-3 text-[clamp(1.3rem,2.2vw,1.7rem)] font-semibold">personas vieron su ficha de Google</p>
                <div className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
                  {[
                    [<CountUp key="r" to={151} from={12} step={10} prefix="+" />, 'reseñas de 5 estrellas', 'empezó con 12'],
                    [<CountUp key="ru" to={607} step={100} prefix="+" />, 'pidieron la ruta para ir', 'con Google Maps'],
                    [<CountUp key="ll" to={133} step={10} prefix="+" />, 'llamaron por teléfono', 'desde su ficha'],
                  ].map(([v, l, n], i) => (
                    <div key={i}>
                      <p className="head text-[clamp(2.4rem,4vw,3.2rem)] leading-none">{v}</p>
                      <p className="mt-2 text-[18px] font-semibold leading-snug">{l}</p>
                      <p className="text-[16px] text-gris">{n}</p>
                    </div>
                  ))}
                </div>
              </div>
              {[
                [<CountUp key="v" to={432490} step={10000} k prefix="+" />, 'visualizaciones en TikTok'],
                [<CountUp key="s" to={2457} step={100} prefix="+" />, 'seguidores en TikTok, desde cero'],
              ].map(([v, l], i) => (
                <div key={i} data-reveal className="card flex flex-col justify-between p-8">
                  <p className="text-[17px] font-semibold text-gris">En TikTok</p>
                  <div className="mt-8">
                    <p className="head text-[clamp(2.8rem,4.6vw,3.8rem)] leading-none text-naranja">{v}</p>
                    <p className="mt-3 text-[19px] font-medium leading-snug text-gris">{l}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EL PROBLEMA ── */}
        <section aria-labelledby="t-problema" className="px-4 py-20 sm:px-6 md:py-28">
          <div className="mx-auto max-w-wrap">
            <h2 id="t-problema" data-reveal className="text-[clamp(2.4rem,5.6vw,4.4rem)]">¿Te <span className="marca">suena?</span></h2>
            <ul className="mt-10 grid gap-3 md:grid-cols-2">
              {PROBLEMA.map((p) => (
                <li key={p} data-reveal className="card flex items-center gap-5 p-7 text-[clamp(1.15rem,2vw,1.4rem)] font-semibold">
                  <span aria-hidden className="head grid h-12 w-12 shrink-0 place-items-center rounded-full border border-naranja/40 bg-naranja/10 text-[20px] text-naranja">✕</span>{p}
                </li>
              ))}
            </ul>
            <p data-reveal className="mt-10 max-w-[32ch] text-[clamp(1.5rem,2.8vw,2.2rem)] font-semibold leading-snug">No es culpa de tu cocina ni de tu servicio. <span className="text-naranja-osc">Es que en invierno no te ven.</span></p>
          </div>
        </section>

        {/* ── CINTA ── */}
        <div aria-hidden className="overflow-hidden border-y border-line py-5">
          <div className="cinta flex w-max gap-10 whitespace-nowrap">
            {[...CINTA, ...CINTA, ...CINTA, ...CINTA].map((w, i) => (
              <span key={i} className="head flex items-center gap-10 text-[clamp(1.4rem,2.6vw,2rem)] opacity-35">{w}<span className="h-2.5 w-2.5 rounded-full bg-naranja/70" /></span>
            ))}
          </div>
        </div>

        {/* ── SERVICIOS ── */}
        <section id="servicios" aria-labelledby="t-servicios" className="px-4 py-20 sm:px-6 md:py-28">
          <div className="mx-auto max-w-wrap">
            <h2 id="t-servicios" data-reveal className="text-[clamp(2.2rem,5vw,4rem)]">Todo lo que tu local necesita<br /><span className="text-naranja">en redes y en Google</span></h2>
            <p data-reveal className="mt-6 max-w-[40ch] text-[20px] text-gris">Cada mes preparamos, grabamos, editamos y publicamos. Tú solo tienes que abrirnos la puerta.</p>
            <div className="mt-12 grid gap-4 lg:grid-cols-[1.25fr_1fr]">
              <div data-reveal className="card grid grid-cols-3 gap-3 p-4">
                {[['/video/manuel-loop.mp4', '/img/manuel-poster.jpg'], ['/video/pieza-3-loop.mp4', '/portafolio/assets/pieza-3-poster.jpg'], ['/video/pieza-4-loop.mp4', '/portafolio/assets/pieza-4-poster.jpg']].map(([v, p]) => (
                  <video key={v} autoPlay muted loop playsInline preload="metadata" poster={p} className="aspect-[9/16] w-full rounded-2xl object-cover" aria-label="Vídeo que hicimos para A Lo Cubano">
                    <source src={v} type="video/mp4" />
                  </video>
                ))}
              </div>
              <div className="grid gap-4">
                {servicePages.map((s, i) => (
                  <a key={s.slug} href={`/${s.slug}/`} data-reveal className={`flex flex-col justify-between rounded-[28px] p-8 transition-transform hover:-translate-y-1 card ${i === 1 ? 'ring-1 ring-naranja/50 shadow-[0_0_80px_-30px_rgba(240,78,23,.6)]' : ''}`}>
                    <span className={`grid h-16 w-16 place-items-center rounded-2xl bg-naranja text-ink`}><Icon name={s.icon} className="h-8 w-8" /></span>
                    <span className="mt-8 block">
                      <b className="head block text-[clamp(1.7rem,3vw,2.3rem)]">{s.name}</b>
                      <span className={`mt-2 block text-[19px] text-gris`}>{s.short}</span>
                      <span className="mt-4 inline-flex items-center gap-2 text-[17px] font-bold">Ver qué incluye <Icon name="flecha" className="h-5 w-5" /></span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── ASÍ GRABAMOS ── */}
        <section aria-labelledby="t-grabamos" className="pb-20 md:pb-28">
          <Carrusel titulo={<h2 id="t-grabamos" data-reveal className="text-[clamp(2.2rem,5vw,4rem)]">Así grabamos<br /><span className="text-naranja">en tu local</span></h2>}>
            {[
              ['/video/grabando-loop.mp4', '/img/grabando-poster.jpg', 'Grabando a Manuel en la terraza'],
              ['/video/manuel-loop.mp4', '/img/manuel-poster.jpg', 'Manuel cuenta qué ha cambiado'],
              ['', '/img/portada-pieza-2.webp', 'Antes de abrir'],
              ['/video/pieza-4-loop.mp4', '/portafolio/assets/pieza-4-poster.jpg', 'Cumpleaños en A Lo Cubano'],
              ['', '/img/testimonio-1.webp', 'Entrevista a Manuel'],
              ['/video/pieza-3-loop.mp4', '/portafolio/assets/pieza-3-poster.jpg', 'Con la plantilla en la barra'],
            ].map(([v, p, t]) => (
              <figure key={p} className="relative m-0 w-[72vw] max-w-[340px] shrink-0 snap-start overflow-hidden rounded-[26px]">
                {v ? (
                  <video autoPlay muted loop playsInline preload="none" poster={p} className="aspect-[9/16] w-full object-cover" aria-label={t}><source src={v} type="video/mp4" /></video>
                ) : <img src={p} alt={t} loading="lazy" className="aspect-[9/16] w-full object-cover" />}
                <span aria-hidden className="historia absolute inset-x-4 top-4 flex gap-1.5"><i /><i /><i /></span>
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-5 pt-16 text-[18px] font-semibold text-white">{t}</figcaption>
              </figure>
            ))}
          </Carrusel>
        </section>

        {/* ── MÉTODO ── */}
        <section aria-labelledby="t-pasos" className="rejilla px-4 py-20 sm:px-6 md:py-28">
          <div className="mx-auto max-w-wrap">
            <h2 id="t-pasos" data-reveal className="text-[clamp(2.2rem,5.2vw,4.2rem)]">De la primera llamada<br />al <span className="marca">local lleno</span></h2>
            <p data-reveal className="mt-6 max-w-[40ch] text-[20px] text-gris">Cuatro pasos, cada mes. Lo que funciona se repite y lo que no, se cambia.</p>
            {/* Camino en vertical: las tarjetas van de un lado a otro y una flecha curva lleva de cada paso al siguiente */}
            <ol className="mx-auto mt-12 flex max-w-[920px] flex-col">
              {PASOS.map(([t, d], i) => (
                <li key={t} data-reveal className="flex flex-col">
                  <div className={`card flex w-full items-start gap-6 p-8 md:w-[78%] ${i % 2 ? 'md:self-end' : 'md:self-start'}`}>
                    <span className="head grad-naranja shrink-0 text-[3.6rem] leading-[.95]">0{i + 1}</span>
                    <div>
                      <h3 className="text-[1.6rem]">{t}</h3>
                      <p className="mt-2 text-[18px] text-gris">{d}</p>
                    </div>
                  </div>
                  {i < PASOS.length - 1 && (
                    <svg aria-hidden viewBox="0 0 240 110" fill="none" stroke="currentColor" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round"
                      className={`my-1 h-[90px] w-[200px] text-naranja md:h-[110px] md:w-[240px] ${i % 2 ? 'self-start -scale-x-100 md:ml-[30%]' : 'self-end md:mr-[30%]'}`}>
                      <path d="M30 8 C 10 40, 60 62, 120 52 S 210 40, 206 92" />
                      <path d="M188 80 L206 96 L222 76" />
                    </svg>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── PAQUETES ── */}
        <section id="paquetes" aria-labelledby="t-paquetes" className="px-4 py-20 sm:px-6 md:py-28">
          <div className="mx-auto max-w-wrap">
            <h2 id="t-paquetes" data-reveal className="text-[clamp(2.2rem,5vw,4rem)]">Tres paquetes.<br /><span className="text-naranja">Elige cómo empezar.</span></h2>
            <p data-reveal className="mt-6 max-w-[40ch] text-[20px] text-gris">Empieza con una campaña o quédate con nosotros tres meses. En todos vamos a tu local a grabar. Escríbenos y te pasamos el precio.</p>
            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              {plans.map((p) => (
                <article key={p.id} data-reveal className={`relative flex flex-col rounded-[28px] p-8 card ${p.rec ? 'ring-1 ring-naranja/60 shadow-[0_0_90px_-30px_rgba(240,78,23,.7)]' : ''}`}>
                  {p.rec && <span className="absolute right-6 top-6 rounded-full bg-naranja px-4 py-1.5 text-[14px] font-bold text-ink">Recomendado</span>}
                  <p className={`text-[15px] font-semibold uppercase tracking-[.08em] text-gris`}>{p.kicker}</p>
                  <h3 className="mt-3 text-[2rem]">{p.name}</h3>
                  <ul className={`mb-8 mt-6 grid gap-3 border-t pt-6 border-line`}>
                    {p.items.map((it) => (
                      <li key={it} className="flex gap-3 text-[18px]"><Icon name="check" className={`mt-1 h-5 w-5 shrink-0 text-naranja`} />{it}</li>
                    ))}
                  </ul>
                  <a href={wa(`Hola, tengo un local en Roquetas y me interesa el paquete ${p.name}.`)} target="_blank" rel="noopener"
                    className={`btn mt-auto ${p.rec ? 'btn-whatsapp' : 'btn-linea'}`}><WhatsIcon className="h-6 w-6" /> Quiero este paquete</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIOS ── */}
        <section aria-labelledby="t-opiniones" className="border-t border-line px-4 py-20 sm:px-6 md:py-28">
          <div className="mx-auto max-w-wrap">
            <h2 id="t-opiniones" data-reveal className="text-[clamp(2.2rem,5vw,4rem)]">Lo que dice<br /><span className="text-naranja">Manuel</span></h2>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {quotes.map((t) => (
                <figure key={t.n} data-reveal className="card m-0 flex flex-col justify-between p-8">
                  <blockquote className="m-0 text-[clamp(1.25rem,2vw,1.45rem)] font-medium leading-[1.45]">«{t.a}»</blockquote>
                  <figcaption className="mt-6 text-[17px] font-semibold text-naranja-osc">Manuel, dueño de A Lo Cubano</figcaption>
                </figure>
              ))}
            </div>
            <a href="/caso/" className="btn btn-linea mt-10">Ver el caso completo</a>
          </div>
        </section>

        {/* ── DUDAS ── */}
        <section id="dudas" aria-labelledby="t-dudas" className="border-t border-line px-4 py-20 sm:px-6 md:py-28">
          <div className="mx-auto grid max-w-wrap gap-10 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <h2 id="t-dudas" data-reveal className="text-[clamp(2.2rem,5vw,4rem)]">Lo que nos preguntan los dueños</h2>
              <p data-reveal className="mt-6 max-w-[32ch] text-[20px] text-gris">¿Otra pregunta? Escríbenos por WhatsApp y te contestamos.</p>
            </div>
            <div className="grid content-start gap-3">
              {DUDAS.map(([q, a], i) => (
                <details key={q} open={i === 0} className="card group p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[20px] font-semibold [&::-webkit-details-marker]:hidden">
                    {q}<span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-naranja text-[24px] leading-none text-ink transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 text-[18px] text-gris">{a}</p>
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
