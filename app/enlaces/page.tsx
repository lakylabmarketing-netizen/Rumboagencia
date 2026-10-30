import type { Metadata } from 'next';
import { PROMO_APPS } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Enlaces',
  description: 'Rumbo, agencia de marketing para todo tipo de negocios. Consultoría gratis, servicios, caso real y contacto.',
  alternates: { canonical: '/enlaces/' },
};

// Enlaces de la bio de Instagram y TikTok: llevan UTM para saber que vienen de aquí
const utm = (href: string, c: string) => `${href}${href.includes('?') ? '&' : '?'}utm_source=bio&utm_medium=social&utm_content=${c}`;

const Row = ({ href, title, sub, accent = false }: { href: string; title: string; sub?: string; accent?: boolean }) => (
  <a href={href}
    className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 transition-colors ${accent ? 'border-naranja bg-naranja text-ink' : 'border-cal/10 bg-[#111] hover:border-cal/25'}`}>
    <span>
      <span className="block text-[15px] font-semibold leading-tight">{title}</span>
      {sub && <span className={`mt-0.5 block text-[13px] ${accent ? 'text-ink/70' : 'text-muted'}`}>{sub}</span>}
    </span>
    <span aria-hidden className={`text-[15px] ${accent ? 'text-ink' : 'text-naranja'}`}>→</span>
  </a>
);

export default function Enlaces() {
  return (
    <main id="contenido" className="f-rumbo min-h-[100svh] px-4 pb-[calc(28px+env(safe-area-inset-bottom))] pt-[calc(36px+env(safe-area-inset-top))]">
      <div className="mx-auto max-w-[440px]">
        <header className="text-center">
          <img src="/img/equipo.webp" alt="Esteban y Eneko, de Rumbo" width={88} height={88}
            className="mx-auto h-[88px] w-[88px] rounded-full object-cover object-[50%_30%]" />
          <h1 className="f-rumbo-head mt-4 text-[22px] tracking-[-.02em]">Rumbo</h1>
          <p className="mt-1 text-[14px] text-gris">Marketing para todo tipo de negocios.<br />Somos Esteban y Eneko.</p>
        </header>

        <nav aria-label="Enlaces" className="mt-7 grid gap-2">
          <Row accent href={utm('/contacto/', 'consultoria')} title="Consultoría gratis" sub="30 minutos para ver qué haríamos primero" />
          <a href={utm('/apps/', 'apps-destacado')} className="block overflow-hidden rounded-2xl border border-cal/10 bg-[#111] hover:border-cal/25">
            <video autoPlay muted loop playsInline preload="metadata" poster={PROMO_APPS.poster} className="aspect-video w-full object-cover" aria-label="Vídeo de apps a medida">
              <source src={PROMO_APPS.src} type="video/mp4" />
            </video>
            <span className="flex items-center justify-between gap-3 px-4 py-3">
              <span>
                <span className="block text-[15px] font-semibold leading-tight">Desarrollo de aplicaciones <span className="ml-1 text-[12px] font-medium text-naranja">Nuevo</span></span>
                <span className="mt-0.5 block text-[13px] text-muted">Lo que repites cada día, convertido en una app</span>
              </span>
              <span aria-hidden className="text-[15px] text-naranja">→</span>
            </span>
          </a>
          <Row href={`${utm('/', 'servicios')}#servicios`} title="Servicios" sub="Redes, Google, web y asesoría" />
          <Row href={utm('/caso/', 'caso')} title="Caso real: A Lo Cubano" sub="De 12 a 151 reseñas en 11 semanas" />
          <Row href={utm('/nosotros/', 'nosotros')} title="Nosotros" sub="Hablas con quien hace el trabajo" />
        </nav>

        <p className="mt-8 text-center text-[12px] text-muted"><a href="/legal/" className="underline underline-offset-2">Aviso legal y privacidad</a></p>
      </div>
    </main>
  );
}
