import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PageHead from '@/components/PageHead';
import { metricGroups, pieces, testimonials, topVideos } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Caso real: A Lo Cubano',
  description: 'Once semanas con A Lo Cubano, en Roquetas de Mar: 172.900 vistas en TikTok, 18.107 personas vieron su ficha de Google y de 12 a 151 reseñas.',
  alternates: { canonical: '/caso/' },
};

const fmt = (n: number) => n.toLocaleString('es-ES').replace(/^(\d)(\d{3})$/, '$1.$2');
const LOOPS = [1, 3, 4];

export default function Caso() {
  return (
    <>
      <Nav />
      <main id="contenido" className="relative overflow-hidden">
        <PageHead kicker="Caso real · 8 jul – 24 sep 2026" title={<>A Lo <span className="text-brasa">Cubano</span></>}
          lead="Cocina cubana de fusión en Roquetas de Mar. Abrió a finales de junio de 2026 y empezamos el 8 de julio: vídeo, ficha de Google y captación de reseñas.">
          <p className="sube d4 relative mt-6 flex flex-wrap gap-x-6 gap-y-1 text-[14px] text-muted"><span>Antes: 12 reseñas en Google</span><span>45 seguidores en Instagram</span><span>Sin cuenta de TikTok</span></p>
        </PageHead>

        {/* Cifras */}
        <section aria-label="Cifras" className="mx-auto grid max-w-[1320px] gap-3 px-4 sm:px-8 md:grid-cols-2">
          {metricGroups.map((g, gi) => (
            <div key={g.q} className={`card ${gi === 0 ? 'card-clara' : 'card-oscura'} p-6 sm:p-8`}>
              <h2 className="text-[1.4rem] font-bold tracking-[-.03em]">{g.q}</h2>
              <p className={`mt-1 text-[13px] ${gi === 0 ? 'text-[#6b625a]' : 'text-muted'}`}>{g.src}</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {g.items.map((m) => (
                  <div key={m.label} className={`border-t pt-3 ${gi === 0 ? 'border-black/15' : 'border-line'}`}>
                    <div className="num text-[2rem] font-bold leading-none">{m.from !== undefined && <span className="text-[.6em] opacity-60">{fmt(m.from)} → </span>}{fmt(m.v)}{m.suffix}</div>
                    <p className={`mt-1.5 text-[14.5px] ${gi === 0 ? 'text-[#4a4744]' : 'text-gris'}`}>{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Testimonios */}
        <section aria-labelledby="t-manuel" className="mx-auto max-w-[1320px] px-4 pt-20 sm:px-8 md:pt-28">
          <h2 id="t-manuel" className="text-[clamp(1.8rem,3.4vw,2.8rem)] font-bold tracking-[-.04em]">Lo cuenta Manuel</h2>
          <p className="mt-2 text-gris">Cinco preguntas al dueño de A Lo Cubano. Dale al play.</p>
          <div className="mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4 [scrollbar-width:none] md:grid md:grid-cols-5 md:overflow-visible">
            {testimonials.map((t) => (
              <figure key={t.n} className="m-0 w-[72vw] max-w-[300px] shrink-0 snap-start md:w-auto md:max-w-none">
                <div className="relative aspect-[9/16] overflow-hidden rounded-[20px] bg-[#121212]">
                  <video controls preload="none" playsInline poster={`/img/testimonio-${t.n}.webp`} className="h-full w-full object-cover" aria-label={`Vídeo: ${t.q}`}>
                    <source src={`/video/testimonio-${t.n}.mp4`} type="video/mp4" />
                  </video>
                </div>
                <figcaption className="mt-3">
                  <span className="block text-[13.5px] leading-snug text-muted">{t.q}</span>
                  <blockquote className="m-0 mt-1.5 text-[15.5px] font-semibold leading-snug">«{t.a}»</blockquote>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Piezas */}
        <section aria-labelledby="t-piezas" className="mx-auto max-w-[1320px] px-4 pt-16 sm:px-8 md:pt-24">
          <h2 id="t-piezas" className="text-[clamp(1.8rem,3.4vw,2.8rem)] font-bold tracking-[-.04em]">Piezas que hicimos</h2>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {pieces.map((p) => (
              <figure key={p.n} className="m-0">
                <div className="relative aspect-[9/16] overflow-hidden rounded-[20px] bg-[#121212]">
                  {LOOPS.includes(p.n) ? (
                    <video muted loop playsInline autoPlay preload="metadata" poster={`/portafolio/assets/pieza-${p.n}-poster.jpg`} className="h-full w-full object-cover" aria-label={`Vídeo «${p.title}»`}>
                      <source src={`/video/pieza-${p.n}-loop.mp4`} type="video/mp4" />
                    </video>
                  ) : <img src={`/img/portada-pieza-${p.n}.webp`} alt={`Portada del vídeo «${p.title}»`} loading="lazy" className="h-full w-full object-cover" />}
                </div>
                <figcaption className="mt-2.5"><span className="tech text-brasa">{p.tag}</span><span className="mt-0.5 block text-[15px] font-semibold leading-snug">{p.title}</span></figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Lo más visto y lo que falta */}
        <section className="mx-auto grid max-w-[1320px] gap-3 px-4 pt-16 sm:px-8 md:grid-cols-2 md:pt-24">
          <div className="card card-oscura p-6 sm:p-8">
            <h2 className="text-[1.4rem] font-bold tracking-[-.03em]">Los tres vídeos que más funcionaron</h2>
            <ol className="mt-5">
              {topVideos.map((t) => (
                <li key={t.v} className="grid grid-cols-[96px_1fr] gap-4 border-t border-line py-4">
                  <b className="num text-[1.4rem]">{t.v}</b>
                  <span className="text-[15px]">{t.title}<small className="mt-1 block text-[13px] text-muted">{t.meta}</small></span>
                </li>
              ))}
            </ol>
          </div>
          <div className="card card-oscura p-6 sm:p-8">
            <h2 className="text-[1.4rem] font-bold tracking-[-.03em]">Lo que todavía no medimos</h2>
            <p className="mt-4 text-[15.5px] leading-[1.55] text-gris">Las reservas se hacen por su web y no sabemos cuántas llegan desde las redes o desde Google, así que no las atribuimos a nuestro trabajo. Este trimestre empezamos a medirlo preguntando en sala: «¿cómo nos has conocido?».</p>
            <p className="mt-4 text-[14px] leading-[1.5] text-muted">Qué hicimos: 10 sesiones de grabación · 30 vídeos · 13 posts · 108 stories · ficha de Google optimizada · carta con QR para reseñas · web alocubanofusion.com</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a className="btn btn-linea" href="https://www.google.com/maps/search/?api=1&query=36.7228772,-2.6287304" target="_blank" rel="noopener">Leer las 151 reseñas ↗</a>
              <a className="btn btn-linea" href="https://www.instagram.com/alocubanofusion/" target="_blank" rel="noopener">@alocubanofusion ↗</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
