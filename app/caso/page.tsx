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
      <main id="contenido">
        <PageHead kicker="Caso real · julio a septiembre de 2026" title={<>Restaurante <span className="text-naranja-osc">A Lo Cubano</span></>}
          lead="Cocina cubana en Roquetas de Mar. Abrió a finales de junio de 2026 y empezamos el 8 de julio: vídeos, ficha de Google y reseñas.">
          <p className="mt-6 text-[17px] text-gris">Antes de empezar: 12 reseñas en Google · 45 seguidores en Instagram · sin cuenta de TikTok</p>
        </PageHead>

        {/* Cifras */}
        <section aria-label="Cifras" className="bg-papel px-4 py-20 sm:px-6 md:py-24">
          <div className="mx-auto grid max-w-wrap gap-4 md:grid-cols-2">
            {metricGroups.map((g) => (
              <div key={g.q} className="rounded-2xl border border-line bg-white p-7 sm:p-9">
                <h2 className="text-[26px]">{g.q}</h2>
                <p className="mt-1 text-[15px] text-muted">{g.src}</p>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {g.items.map((m) => (
                    <p key={m.label} className="border-t border-line pt-4">
                      <b className="head block text-[2.4rem] leading-none">{m.from !== undefined && <span className="text-[.55em] text-muted">{fmt(m.from)} → </span>}{fmt(m.v)}{m.suffix}</b>
                      <span className="mt-2 block text-[17px] text-gris">{m.label}</span>
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonios */}
        <section aria-labelledby="t-manuel" className="px-4 py-20 sm:px-6 md:py-24">
          <div className="mx-auto max-w-wrap">
            <h2 id="t-manuel" className="text-center text-[clamp(2rem,4.4vw,3.2rem)]">Lo cuenta Manuel, el dueño</h2>
            <p className="mt-3 text-center text-[19px] text-gris">Cinco preguntas. Dale al play.</p>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <figure key={t.n} className="m-0">
                  <video controls preload="none" playsInline poster={`/img/testimonio-${t.n}.webp`} className="aspect-[9/16] w-full rounded-2xl bg-papel object-cover" aria-label={`Vídeo: ${t.q}`}>
                    <source src={`/video/testimonio-${t.n}.mp4`} type="video/mp4" />
                  </video>
                  <figcaption className="mt-4">
                    <span className="block text-[17px] text-gris">{t.q}</span>
                    <blockquote className="m-0 mt-2 text-[20px] font-semibold leading-snug">«{t.a}»</blockquote>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Piezas */}
        <section aria-labelledby="t-piezas" className="bg-papel px-4 py-20 sm:px-6 md:py-24">
          <div className="mx-auto max-w-wrap">
            <h2 id="t-piezas" className="text-center text-[clamp(2rem,4.4vw,3.2rem)]">Vídeos que grabamos en su local</h2>
            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
              {pieces.map((p) => (
                <figure key={p.n} className="m-0">
                  {LOOPS.includes(p.n) ? (
                    <video muted loop playsInline autoPlay preload="metadata" poster={`/portafolio/assets/pieza-${p.n}-poster.jpg`} className="aspect-[9/16] w-full rounded-2xl object-cover" aria-label={`Vídeo «${p.title}»`}>
                      <source src={`/video/pieza-${p.n}-loop.mp4`} type="video/mp4" />
                    </video>
                  ) : <img src={`/img/portada-pieza-${p.n}.webp`} alt={`Portada del vídeo «${p.title}»`} loading="lazy" className="aspect-[9/16] w-full rounded-2xl object-cover" />}
                  <figcaption className="mt-3"><span className="text-[14px] font-semibold uppercase tracking-[.06em] text-naranja-osc">{p.tag}</span><span className="mt-1 block text-[17px] font-semibold leading-snug">{p.title}</span></figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Lo más visto y lo que falta */}
        <section className="px-4 py-20 sm:px-6 md:py-24">
          <div className="mx-auto grid max-w-wrap gap-4 md:grid-cols-2">
            <div className="card p-7 sm:p-9">
              <h2 className="text-[26px]">Los tres vídeos más vistos</h2>
              <ol className="mt-5">
                {topVideos.map((t) => (
                  <li key={t.v} className="grid grid-cols-[100px_1fr] gap-4 border-t border-line py-4">
                    <b className="head text-[1.6rem]">{t.v}</b>
                    <span className="text-[17px]">{t.title}<small className="mt-1 block text-[15px] text-muted">{t.meta}</small></span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="card p-7 sm:p-9">
              <h2 className="text-[26px]">Lo que todavía no medimos</h2>
              <p className="mt-4 text-[18px] text-gris">Las reservas se hacen por su web y no sabemos cuántas llegan desde las redes o desde Google, así que no las atribuimos a nuestro trabajo. Este trimestre empezamos a medirlo preguntando en sala: «¿cómo nos has conocido?».</p>
              <p className="mt-4 text-[16px] text-muted">Qué hicimos: 10 sesiones de grabación · 30 vídeos · 13 posts · 108 stories · ficha de Google optimizada · carta con QR para reseñas · web alocubanofusion.com</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a className="btn btn-linea" href="https://www.google.com/maps/search/?api=1&query=36.7228772,-2.6287304" target="_blank" rel="noopener">Leer las 151 reseñas</a>
                <a className="btn btn-linea" href="https://www.instagram.com/alocubanofusion/" target="_blank" rel="noopener">Su Instagram</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
