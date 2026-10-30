import Nav from './Nav';
import Footer from './Footer';
import { servicePages, type ServicePage } from '@/lib/content';

/** Móvil dibujado con una app esquemática (para el servicio de aplicaciones). */
export function AppMock() {
  const rows = [['Albaranes', 'Hoy · 3 nuevos'], ['Turnos', 'Semana lista'], ['Carta', 'Actualizada'], ['Clientes', '+12 tarjetas']];
  return (
    <div aria-hidden className="relative mx-auto w-[min(72%,300px)] rounded-[2.4rem] border-[10px] border-[#151515] bg-[#0d0d0d] p-4 shadow-[0_40px_80px_-30px_rgba(240,78,23,.6)]">
      <div className="mx-auto mb-5 h-[18px] w-[80px] rounded-full bg-[#151515]" />
      <div className="mb-4 flex items-end justify-between">
        <div><div className="h-2 w-14 rounded bg-cal/30" /><div className="mt-2 h-3.5 w-24 rounded bg-cal/80" /></div>
        <div className="h-9 w-9 rounded-full bg-gradient-to-b from-brasa to-naranja" />
      </div>
      <div className="mb-4 flex h-20 items-end gap-1.5 rounded-2xl bg-[#171717] p-3">
        {[40, 65, 50, 80, 60, 95, 75].map((h, i) => <i key={i} className={`block flex-1 rounded-sm ${i === 5 ? 'bg-naranja' : 'bg-cal/25'}`} style={{ height: `${h}%` }} />)}
      </div>
      <div className="grid gap-2">
        {rows.map(([a, b], i) => (
          <div key={a} className="flex items-center justify-between rounded-2xl bg-[#171717] px-3 py-3">
            <div className="flex items-center gap-2.5"><i className={`block h-2 w-2 rounded-full ${i === 0 ? 'bg-naranja' : 'bg-cal/40'}`} /><span className="text-[13px] font-semibold">{a}</span></div>
            <span className="text-[11px] text-muted">{b}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ServiceView({ s }: { s: ServicePage }) {
  const others = servicePages.filter((o) => o.slug !== s.slug);
  const idx = servicePages.findIndex((o) => o.slug === s.slug) + 1;
  return (
    <>
      <Nav />
      <main id="contenido" className="relative overflow-hidden">
        <div aria-hidden className="glow pointer-events-none absolute -right-40 top-10 h-[620px] w-[620px] opacity-70" />

        {/* Cabecera */}
        <section className="relative mx-auto grid max-w-[1320px] gap-10 px-4 pb-16 pt-[calc(104px+env(safe-area-inset-top))] sm:px-8 md:grid-cols-[1.1fr_.9fr] md:items-center md:pb-24 md:pt-36">
          <div>
            <a href="/#servicios" className="sube tech inline-flex items-center gap-2 text-muted hover:text-cal">← Servicios</a>
            <p className="sube d1 tech mt-8 text-brasa">0{idx} / Servicio</p>
            <h1 className="sube d2 mt-3 text-[clamp(2.8rem,7.4vw,6.6rem)] font-bold leading-[.95] tracking-[-.05em]">{s.title}</h1>
            <p className="sube d3 mt-6 max-w-[46ch] text-[clamp(1.1rem,1.5vw,1.3rem)] leading-[1.45] text-gris">{s.lead}</p>
            <div className="sube d4 mt-8 flex flex-wrap items-center gap-3">
              <a href="/contacto/" className="btn btn-naranja">Pedir consultoría gratis</a>
              <span className="rounded-full border border-cal/15 px-4 py-2 text-[14px] text-gris">{s.plan}</span>
            </div>
          </div>
          <div className="sube d3 relative">
            {s.img ? (
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[460px] overflow-hidden rounded-[28px]">
                <img src={s.img} alt={s.imgAlt} className="h-full w-full object-cover" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#070707]/70 via-transparent to-transparent" />
              </div>
            ) : <AppMock />}
          </div>
        </section>

        {/* Qué incluye */}
        <section aria-labelledby="t-incluye" className="relative mx-auto max-w-[1320px] px-4 pb-20 sm:px-8 md:pb-28">
          <h2 id="t-incluye" className="text-[clamp(1.8rem,3.4vw,2.8rem)] font-bold tracking-[-.04em]">Qué incluye</h2>
          <ol className="mt-8 grid gap-3 md:grid-cols-2">
            {s.items.map(([t, d], i) => (
              <li key={t} className="card card-oscura grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 p-6">
                <span className="num row-span-2 text-[1.6rem] font-bold text-naranja">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-[1.15rem] font-semibold tracking-[-.02em]">{t}</h3>
                <p className="text-[15.5px] leading-[1.5] text-gris">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Prueba real */}
        {s.proof && (
          <section aria-label={s.proof.title} className="relative mx-auto max-w-[1320px] px-4 pb-20 sm:px-8 md:pb-28">
            <div className="card card-clara grid gap-8 p-7 sm:p-10 md:grid-cols-[.8fr_2fr] md:items-end">
              <div>
                <p className="tech text-[#8a5a3c]">{s.proof.title}</p>
                {s.proof.note && <p className="mt-3 text-[15px] text-[#4a4744]">{s.proof.note}</p>}
              </div>
              <div className={`grid gap-6 ${s.proof.stats.length > 2 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
                {s.proof.stats.map(([v, l]) => (
                  <div key={l} className="border-t border-black/15 pt-4">
                    <div className="num break-words text-[clamp(1.6rem,3vw,2.6rem)] font-bold leading-none">{v}</div>
                    <p className="mt-2 text-[15px] leading-snug text-[#4a4744]">{l}</p>
                  </div>
                ))}
              </div>
            </div>
            {s.slug !== 'apps' && s.slug !== 'asesoria' && <a href="/caso/" className="tech mt-5 inline-block text-gris underline underline-offset-4 hover:text-cal">Ver el caso completo ↗</a>}
          </section>
        )}

        {/* Otros servicios */}
        <section aria-labelledby="t-otros" className="relative mx-auto max-w-[1320px] px-4 sm:px-8">
          <h2 id="t-otros" className="tech text-muted">Otros servicios</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <a key={o.slug} href={`/${o.slug}/`} className="card card-oscura flex items-center justify-between gap-4 p-5">
                <span><b className="block text-[1.05rem] tracking-[-.02em]">{o.name}</b><span className="text-[14px] text-muted">{o.short}</span></span>
                <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cal text-ink">↗</span>
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
