import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import BehindWork from '@/components/BehindWork';
import SlantBand from '@/components/SlantBand';
import ProjectsRail from '@/components/ProjectsRail';
import Counter from '@/components/Counter';
import ContactForm from '@/components/ContactForm';
import FooterBig from '@/components/FooterBig';
import CtaCross from '@/components/CtaCross';
import { Logo } from '@/components/Logo';
import { CONTACT_EMAIL, commitments, conditions, faqs, metricGroups, plans, process, services, topVideos } from '@/lib/content';

function SectionHead({ index, title, kw, lead, light = false }: { index: string; title: string; kw: string; lead?: string; light?: boolean }) {
  return (
    <header className="mb-14 grid gap-6 md:mb-20 md:grid-cols-[minmax(0,1.3fr)_minmax(0,.7fr)] md:items-end">
      <div>
        <span className={`tech ${light ? 'text-[#6b6b70]' : 'text-muted'}`}><span className="text-naranja">+</span> {index}</span>
        <h2 className={`mega mt-5 text-[clamp(2.4rem,6.2vw,6.6rem)] leading-[.98] ${light ? 'on-light' : ''}`}>
          <span className="ln"><span>{title.replace(/\s*×\s*$/, '')}</span></span>
          <span className="ln deep"><span>{kw}</span></span>
        </h2>
      </div>
      {lead && <p className={`max-w-[40ch] text-[clamp(1.15rem,1.6vw,1.45rem)] font-semibold leading-[1.2] tracking-[-.015em] md:justify-self-end ${light ? 'text-[#3d3d42]' : 'text-cal/85'}`}>{lead}</p>}
    </header>
  );
}

function PlanNote({ children, light = false }: { children: string; light?: boolean }) {
  return <span className={`tech ml-0 mt-2 inline-block border px-2 py-0.5 align-middle text-[10px] md:ml-3 md:mt-0 ${light ? 'border-[#C2410C]/50 text-[#C2410C]' : 'border-brasa/50 text-brasa'}`}>{children}</span>;
}

const corners = (cls = 'text-cal/40') => (
  <>
    <span aria-hidden className={`plus -left-[6px] -top-[6px] ${cls}`} />
    <span aria-hidden className={`plus -right-[6px] -top-[6px] ${cls}`} />
    <span aria-hidden className={`plus -bottom-[6px] -left-[6px] ${cls}`} />
    <span aria-hidden className={`plus -bottom-[6px] -right-[6px] ${cls}`} />
  </>
);

export default function Page() {
  return (
    <>
      <main id="contenido">
        <Hero />
        {/* QUÉ HACEMOS (sección clara) */}
        <section id="servicios" data-fx className="relative bg-niebla text-ink" aria-label="Qué hacemos">
          <div className="pt-20 md:pt-28"><SlantBand items={['Vídeo', 'Redes', 'Ficha de Google', 'Reseñas', 'Hostelería', 'Almería']} /></div>
          <div className="mx-auto max-w-wrap px-5 pb-28 pt-20 sm:px-8 md:pb-40 md:pt-28">
            <SectionHead light index="01 · Qué hacemos" title="Qué" kw="hacemos" lead="Rumbo es una agencia de Almería que trabaja solo con hostelería: restaurantes, hoteles, cafeterías y locales de ocio de la provincia." />
            <ul className="border-t border-black/15">
              {services.map((s) => (
                <li key={s.k} data-rise className="grid gap-3 border-b border-black/15 py-8 md:grid-cols-[120px_minmax(0,.9fr)_minmax(0,1.2fr)] md:items-baseline md:py-10">
                  <span className="tech text-[#C2410C]">{s.k}</span>
                  <h3 className="mega-sub text-[clamp(1.8rem,3vw,2.6rem)]">{s.title}{s.note && <PlanNote light>{s.note}</PlanNote>}</h3>
                  <p className="max-w-[56ch] text-body text-[#3d3d42]">{s.text}</p>
                </li>
              ))}
            </ul>
            <div className="mt-16 grid grid-cols-2 gap-px bg-black/15 md:grid-cols-4">
              {[['Desde 550 €/mes', 'Tres planes con el mismo equipo.'], ['3 meses', 'Permanencia mínima; después, mes a mes.'], ['100 % tuyo', 'Cuentas y material grabado, también si te vas.'], ['1 informe al mes', 'Con las métricas, en todos los planes.']].map(([v, l]) => (
                <div key={v} data-rise className="relative bg-niebla p-5 md:p-7">
                  <div className="num text-lg font-bold md:text-xl">{v}</div>
                  <p className="mt-2 text-[15px] text-[#3d3d42]">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROYECTOS */}
        <section id="proyectos" data-fx aria-label="Proyectos" className="border-t border-line">
          <span id="caso" className="sr-only" /><span id="clientes" className="sr-only" />
          <ProjectsRail />
        </section>

        {/* RESULTADOS */}
        <section id="resultados" data-fx className="mx-auto max-w-wrap px-5 py-28 sm:px-8 md:py-40" aria-label="Resultados">
          <SectionHead index="Informe · 8 jul – 24 sep 2026" title="Once semanas ×" kw="resultados" lead="Las cifras de A Lo Cubano, ordenadas por la pregunta que responde cada una." />
          <p className="tech mb-10 flex flex-wrap gap-x-8 gap-y-2 text-gris"><span className="text-muted">Antes:</span><span>12 reseñas en Google</span><span>45 seguidores en Instagram</span><span>Sin cuenta de TikTok</span></p>
          <div className="grid gap-px bg-line">
            {metricGroups.map((g, gi) => (
              <div key={g.q} id={gi === 0 ? 'seo-local' : undefined} className="relative grid gap-8 bg-ink py-10 md:grid-cols-[minmax(240px,.35fr)_minmax(0,1fr)] md:py-14">
                <div>
                  <h3 className="text-h3 font-bold" data-scramble>{g.q}</h3>
                  <p className="tech mt-3 text-[10px] text-muted">{g.src}</p>
                </div>
                <div className="grid grid-cols-1 gap-x-10 gap-y-8 min-[480px]:grid-cols-2 lg:grid-cols-3">
                  {g.items.map((m) => (
                    <div key={m.label} className="relative border-l border-line pl-5">
                      <span aria-hidden className="plus -left-[6px] -top-[6px] text-naranja" />
                      <div className="num text-[clamp(1.9rem,3.4vw,2.8rem)] font-bold leading-none"><Counter v={m.v} from={m.from} suffix={m.suffix} /></div>
                      <p className="mt-3 text-[15px] text-gris">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 grid gap-12 md:grid-cols-2">
            <div>
              <h3 className="tech text-gris">Los tres vídeos que más funcionaron</h3>
              <ol className="mt-5 border-t border-line">
                {topVideos.map((t) => (
                  <li key={t.v} className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 border-b border-line py-4">
                    <b className="num text-xl">{t.v}</b>
                    <span>{t.title}<small className="tech mt-1 block text-[10px] text-muted">{t.meta}</small></span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h3 className="tech text-gris">Lo que todavía no medimos</h3>
              <p className="mt-5 text-body text-gris">Las reservas se hacen por su web y no sabemos cuántas llegan desde las redes o desde Google, así que no las atribuimos a nuestro trabajo. Este trimestre empezamos a medirlo preguntando en sala: «¿cómo nos has conocido?».</p>
              <p className="tech mt-6 text-[11px] text-muted">Qué hicimos: 10 sesiones de grabación · 30 vídeos · 13 posts · 108 stories · ficha de Google optimizada · carta con QR para reseñas · web alocubanofusion.com</p>
              <div className="mt-6 flex flex-wrap gap-5">
                <a className="tech text-cal underline underline-offset-4 hover:text-brasa" href="https://www.google.com/maps/search/?api=1&query=36.7228772,-2.6287304" target="_blank" rel="noopener">Leer las 151 reseñas ↗</a>
                <a className="tech text-cal underline underline-offset-4 hover:text-brasa" href="https://www.instagram.com/alocubanofusion/" target="_blank" rel="noopener">@alocubanofusion ↗</a>
              </div>
            </div>
          </div>
        </section>

        <Marquee items={['Grabamos', 'Editamos', 'Publicamos', 'Medimos']} />

        {/* PROCESO */}
        <section id="proceso" data-fx className="mx-auto max-w-wrap px-5 py-28 sm:px-8 md:py-40" aria-label="Proceso">
          <SectionHead index="02 · Proceso" title="Cómo trabajamos" kw="el mes" lead="Un ritmo semanal fijo, para que sepas siempre qué está pasando." />
          <ol className="grid gap-px bg-line md:grid-cols-4">
            {process.map((p, i) => (
              <li key={p.k} data-rise className="relative bg-ink p-6 md:min-h-[300px] md:p-8">
                {corners('text-cal/25')}
                <span className="tech text-naranja">0{i + 1} · {p.k}</span>
                <h3 className="caps mt-6 text-h3 font-bold">{p.title}</h3>
                <p className="mt-4 text-[16px] text-gris">{p.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-24 grid gap-10 md:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
            <div>
              <span className="tech text-muted">Lo que firmamos</span>
              <p className="caps mt-4 text-[clamp(1.6rem,3vw,2.6rem)] font-normal leading-[1.1]">En tres meses tendrás un <b className="font-extrabold">sistema montado</b> y <b className="font-extrabold">datos</b> para saber si funciona.</p>
            </div>
            <ul className="border-t border-line">
              {commitments.map((c) => (
                <li key={c.title} className="grid gap-2 border-b border-line py-6 md:grid-cols-[200px_minmax(0,1fr)]">
                  <h3 className="font-bold">{c.title}{c.note && <PlanNote>{c.note}</PlanNote>}</h3>
                  <p className="text-[16px] text-gris">{c.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SOBRE NOSOTROS: detrás del trabajo */}
        <BehindWork />

        {/* PRECIOS */}
        <section id="precios" data-fx className="border-t border-line" aria-label="Precios">
          <div className="mx-auto max-w-wrap px-5 py-28 sm:px-8 md:py-40">
            <SectionHead index="04 · Precios" title="Elige el plan que" kw="te llena el local" lead="Tres planes con el mismo equipo. Cambian el volumen de contenido y el trabajo de captación." />
            <div className="grid gap-6 lg:grid-cols-3">
              {plans.map((p) => (
                <article key={p.id} data-rise className={`relative flex flex-col p-7 md:p-9 ${p.rec ? 'bg-[#1a1210] outline outline-1 outline-naranja/70' : 'bg-surface'}`}>
                  {corners(p.rec ? 'text-naranja' : 'text-cal/30')}
                  <div className="flex items-center justify-between">
                    <h3 className="tech text-gris">{p.name}</h3>
                    {p.rec && <span className="tech bg-naranja px-2 py-1 text-[10px] text-ink">Recomendado</span>}
                  </div>
                  <div className="num mt-6 text-[clamp(2.8rem,4.6vw,4rem)] font-bold leading-none">{p.price}<span className="text-[.4em]"> €/mes</span></div>
                  <p className="caps mt-6 border-b border-line pb-6 text-[1.05rem] font-bold leading-snug">{p.claim}</p>
                  <p className="tech mt-6 text-[10px] text-muted">{p.inc}</p>
                  <ul className="mb-8 mt-4 grid gap-2.5">
                    {p.items.map((it) => <li key={it} className="grid grid-cols-[14px_minmax(0,1fr)] gap-2.5 text-[16px] text-gris"><span className="text-naranja">+</span>{it}</li>)}
                  </ul>
                  <a href="#contacto" data-plan={p.value} data-cursor="ELEGIR" className={`mt-auto flex min-h-[52px] items-center justify-center text-[15px] font-semibold transition-colors ${p.rec ? 'bg-naranja text-ink hover:bg-brasa' : 'border border-cal/30 text-cal hover:border-brasa hover:text-brasa'}`}>Reservar consulta</a>
                </article>
              ))}
            </div>
            <div className="mt-20 grid gap-10 md:grid-cols-[minmax(0,.6fr)_minmax(0,1.4fr)]">
              <h3 className="tech text-gris">Condiciones</h3>
              <ul className="border-t border-line">
                {conditions.map((c) => (
                  <li key={c.title} className="grid gap-2 border-b border-line py-5 md:grid-cols-[230px_minmax(0,1fr)]">
                    <b className="font-semibold">{c.title}</b><p className="text-[16px] text-gris">{c.text}</p>
                  </li>
                ))}
              </ul>
            </div>
            <p className="tech mt-6 text-[11px] text-muted">¿Tu caso no encaja del todo? Lo adaptamos contigo.</p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" data-fx className="border-t border-line" aria-label="Preguntas frecuentes">
          <div className="mx-auto grid max-w-wrap gap-12 px-5 py-28 sm:px-8 md:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] md:py-40">
            <div>
              <span className="tech text-muted"><span className="text-naranja">+</span> 05 · Preguntas</span>
              <h2 className="mega mt-5 text-[clamp(2.4rem,6.2vw,6.6rem)] leading-[.98]"><span className="ln"><span>Antes de</span></span><span className="ln deep"><span>firmar</span></span></h2>
            </div>
            <div className="border-t border-line">
              {faqs.map((f) => (
                <details key={f.q} className="group border-b border-line py-5">
                  <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 text-[1.1rem] font-semibold [&::-webkit-details-marker]:hidden">
                    {f.q}<span className="text-2xl font-light text-naranja transition-transform group-open:rotate-45" aria-hidden>+</span>
                  </summary>
                  <p className="mt-3 max-w-[62ch] text-[16px] text-gris">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACTO */}
        <section id="contacto" data-fx className="border-t border-line" aria-label="Contacto">
          <span id="consulta" className="sr-only" />
          <div className="mx-auto grid max-w-wrap gap-14 px-5 py-28 sm:px-8 md:grid-cols-2 md:py-40">
            <div>
              <span className="tech text-muted"><span className="text-naranja">+</span> 06 · Contacto</span>
              <h2 className="mega mt-5 text-[clamp(2.3rem,5.4vw,5.6rem)] leading-[.98]"><span className="ln"><span>Cuéntanos qué mesa</span></span><span className="ln deep"><span>hay que llenar</span></span></h2>
              <p className="mt-6 max-w-[44ch] text-body text-gris">Treinta minutos, sin compromiso. Miramos tu perfil y tu ficha de Google antes de la llamada y te decimos qué haríamos primero.</p>
              <ul className="tech mt-8 grid gap-3 text-[11px] text-gris">
                <li><span className="text-naranja">+</span> Respondemos en menos de 24 horas laborables</li>
                <li><span className="text-naranja">+</span> Crecimiento o Marca: si tu zona está ocupada, te lo decimos en la primera llamada</li>
                <li><span className="text-naranja">+</span> Almería y provincia</li>
              </ul>
              <div className="mt-10"><CtaCross href={`mailto:${CONTACT_EMAIL}`} cursor="MAIL">Escríbenos por email</CtaCross></div>
              <p className="tech mt-4 text-[11px] text-muted">{CONTACT_EMAIL}</p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-line px-5 pb-[calc(32px+env(safe-area-inset-bottom))] pt-16 sm:px-8">
        <FooterBig />
        <div className="mx-auto mt-20 grid max-w-wrap gap-10 border-t border-line pt-10 text-[15px] text-gris md:grid-cols-3">
          <div>
            <Logo className="h-6 w-auto" />
            <p className="mt-4 max-w-[30ch]">Agencia de marketing para hostelería. Almería y provincia.</p>
          </div>
          <nav aria-label="Secciones del pie" className="tech grid gap-2 text-[11px]">
            {[['#servicios', 'Qué hacemos'], ['#proyectos', 'Proyectos'], ['#proceso', 'Proceso'], ['#nosotros', 'Sobre nosotros'], ['#precios', 'Precios'], ['#faq', 'Preguntas'], ['#contacto', 'Contacto']].map(([h, l]) => (
              <a key={h} href={h} className="w-fit hover:text-cal">{l}</a>
            ))}
          </nav>
          <div id="aviso-legal" className="text-[14px] leading-relaxed text-muted">
            <span id="privacidad" className="sr-only" />
            <h2 className="tech mb-3 text-gris">Aviso legal y privacidad</h2>
            <p><b className="text-gris">Quién está detrás.</b> Esta web es de Rumbo, agencia de marketing para hostelería en Almería formada por Esteban y Eneko. Contacto: <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
            <p className="mt-2"><b className="text-gris">Datos.</b> Solo los que escribes en el formulario de consulta, para responderte; no los cedemos a nadie. El formulario se procesa en Netlify, el servicio que aloja esta web. Base legal: tu consentimiento. Puedes pedir acceder, corregir o borrar tus datos en el correo de arriba y reclamar ante la AEPD (aepd.es).</p>
            <p className="mt-2"><b className="text-gris">Cookies.</b> Esta web no usa cookies ni herramientas de seguimiento.</p>
          </div>
        </div>
        <div className="tech mx-auto mt-10 flex max-w-wrap flex-wrap justify-between gap-3 text-[10px] text-muted">
          <span>© 2026 Rumbo · rumboagencia.info</span><span>Almería · Hostelería</span>
        </div>
      </footer>
    </>
  );
}
