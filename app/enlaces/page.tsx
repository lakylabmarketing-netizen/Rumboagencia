import type { Metadata } from 'next';
import { Isotipo, Logo } from '@/components/Logo';
import { GOOGLE_FICHA, PROMO_APPS, WA_HOLA, servicePages } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Enlaces',
  description: 'Rumbo, agencia de marketing para todo tipo de negocios en Almería. Consultoría gratis, servicios, caso real y contacto.',
  alternates: { canonical: '/enlaces/' },
};

// Enlaces de la bio de Instagram: los de la propia web llevan UTM para saber que vienen de aquí
const utm = (href: string, c: string) => `${href}${href.includes('?') ? '&' : '?'}utm_source=bio&utm_medium=social&utm_content=${c}`;

const Row = ({ href, title, sub, ext = false, accent = false }: { href: string; title: string; sub?: string; ext?: boolean; accent?: boolean }) => (
  <a href={href} {...(ext ? { target: '_blank', rel: 'noopener' } : {})}
    className={`card flex min-h-[64px] items-center justify-between gap-4 px-5 py-3.5 ${accent ? 'card-naranja' : 'card-oscura'}`}>
    <span><b className="block text-[16.5px] font-semibold tracking-[-.01em]">{title}</b>{sub && <span className={`block text-[13.5px] ${accent ? 'text-ink/75' : 'text-muted'}`}>{sub}</span>}</span>
    <span aria-hidden className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[13px] ${accent ? 'bg-ink text-cal' : 'bg-cal text-ink'}`}>↗</span>
  </a>
);

const GRID = ['/portafolio/assets/pieza-1-poster.jpg', '/img/testimonio-3.webp', '/portafolio/assets/pieza-3-poster.jpg', '/img/testimonio-1.webp', '/portafolio/assets/pieza-4-poster.jpg', '/img/testimonio-5.webp'];

export default function Enlaces() {
  return (
    <main id="contenido" className="relative min-h-[100svh] overflow-hidden px-4 pb-[calc(32px+env(safe-area-inset-bottom))] pt-[calc(40px+env(safe-area-inset-top))]">
      <div aria-hidden className="glow pointer-events-none absolute left-1/2 top-[-120px] h-[520px] w-[520px] -translate-x-1/2" />
      <div className="relative mx-auto max-w-[480px]">
        <header className="sube text-center">
          <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-[#121212] ring-2 ring-naranja ring-offset-4 ring-offset-[#070707]">
            <Isotipo className="h-9 w-auto" />
          </div>
          <h1 className="mt-5 flex justify-center"><Logo className="h-7 w-auto" title="Rumbo" /></h1>
          <p className="mx-auto mt-3 max-w-[34ch] text-[15.5px] leading-snug text-gris">Agencia de marketing para todo tipo de negocios. Esteban y Eneko · Almería y provincia.</p>
        </header>

        <nav aria-label="Enlaces" className="mt-8 grid gap-2.5">
          <div className="sube d1"><Row accent href={utm('/contacto/', 'consultoria')} title="Consultoría gratis" sub="30 minutos: te decimos qué haríamos primero" /></div>
          <a href={utm('/apps/', 'apps-destacado')} className="sube d1 card card-oscura block overflow-hidden">
            <video autoPlay muted loop playsInline preload="metadata" poster={PROMO_APPS.poster} className="aspect-video w-full object-cover" aria-label="Vídeo de apps a medida">
              <source src={PROMO_APPS.src} type="video/mp4" />
            </video>
            <span className="flex items-center justify-between gap-4 px-5 py-4">
              <span><span className="mb-1 inline-block rounded-full bg-naranja px-2 py-0.5 text-[10.5px] font-bold uppercase text-ink">Nuevo</span>
                <b className="block text-[17px] font-semibold">Desarrollo de aplicaciones</b>
                <span className="block text-[13.5px] text-muted">Lo que repites cada día, convertido en una app</span></span>
              <span aria-hidden className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cal text-[13px] text-ink">↗</span>
            </span>
          </a>
          <div className="sube d1"><Row ext href={WA_HOLA} title="Escríbenos por WhatsApp" sub="Te contestamos nosotros" /></div>

          <p className="sube d2 tech mt-4 text-muted">Servicios</p>
          {servicePages.map((s) => (
            <div key={s.slug} className="sube d2"><Row href={utm(`/${s.slug}/`, s.slug)} title={s.name} sub={s.short} /></div>
          ))}

          <p className="sube d3 tech mt-4 text-muted">Rumbo</p>
          <div className="sube d3"><Row href={utm('/caso/', 'caso')} title="Caso real: A Lo Cubano" sub="5,0 ★ · de 12 a 151 reseñas en 11 semanas" /></div>
          <div className="sube d3"><Row href={utm('/precios/', 'precios')} title="Planes y precios" sub="Desde 550 €/mes" /></div>
          <div className="sube d3"><Row href={utm('/nosotros/', 'nosotros')} title="Nosotros" sub="Hablas con quien hace el trabajo" /></div>
          <div className="sube d3"><Row href={utm('/', 'web')} title="Nuestra web" /></div>
          <div className="sube d3"><Row ext href={GOOGLE_FICHA} title="Nuestra ficha de Google" sub="Dónde estamos y opiniones" /></div>
        </nav>

        <section aria-labelledby="t-trabajo" className="sube d4 mt-10">
          <h2 id="t-trabajo" className="tech text-muted">Nuestro trabajo</h2>
          <a href={utm('/caso/', 'cuadricula')} className="mt-3 grid grid-cols-3 gap-1.5" aria-label="Ver el caso real de A Lo Cubano">
            {GRID.map((src) => <img key={src} src={src} alt="" loading="lazy" className="aspect-square w-full rounded-[10px] object-cover" />)}
          </a>
        </section>

        <p className="mt-10 text-center text-[12.5px] text-muted"><a href="/legal/" className="underline underline-offset-2">Aviso legal y privacidad</a> · Sin cookies ni rastreo</p>
      </div>
    </main>
  );
}
