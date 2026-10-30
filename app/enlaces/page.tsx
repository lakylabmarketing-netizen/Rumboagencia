import type { Metadata } from 'next';
import { Logo } from '@/components/Logo';
import Icon, { WhatsIcon } from '@/components/Icon';
import { PROMO_APPS, WA_HOLA } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Enlaces',
  description: 'Rumbo, agencia de marketing: grabamos en tu negocio. Consultoría gratis, apps, servicios, caso real y WhatsApp.',
  alternates: { canonical: '/enlaces/' },
};

// Enlaces de la bio de Instagram y TikTok: llevan UTM para saber que vienen de aquí
const utm = (href: string, c: string) => `${href}${href.includes('?') ? '&' : '?'}utm_source=bio&utm_medium=social&utm_content=${c}`;

const Row = ({ href, title, sub, icon, accent = false, ext = false }: { href: string; title: string; sub: string; icon: React.ReactNode; accent?: boolean; ext?: boolean }) => (
  <a href={href} {...(ext ? { target: '_blank', rel: 'noopener' } : {})}
    className={`flex items-center gap-4 rounded-2xl border-2 p-4 ${accent ? 'border-naranja bg-naranja' : 'border-line bg-white hover:border-ink'}`}>
    <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${accent ? 'bg-white/30' : 'bg-papel'}`}>{icon}</span>
    <span className="min-w-0 flex-1">
      <b className="block text-[19px] font-semibold leading-tight">{title}</b>
      <span className={`mt-0.5 block text-[16px] ${accent ? 'text-ink/80' : 'text-gris'}`}>{sub}</span>
    </span>
    <Icon name="flecha" className="h-6 w-6 shrink-0" />
  </a>
);

export default function Enlaces() {
  return (
    <main id="contenido" className="min-h-[100svh] bg-papel px-4 pb-[calc(28px+env(safe-area-inset-bottom))] pt-[calc(36px+env(safe-area-inset-top))]">
      <div className="mx-auto max-w-[460px]">
        <header className="text-center">
          <h1 className="flex justify-center"><Logo className="h-9 w-auto" title="Rumbo" /></h1>
          <p className="mt-3 text-[18px] text-gris">Agencia de marketing.<br />Grabamos en tu negocio y te traemos clientes.</p>
        </header>

        <nav aria-label="Enlaces" className="mt-8 grid gap-3">
          <Row accent href={utm('/contacto/', 'consultoria')} title="Consultoría gratis" sub="30 minutos, sin compromiso" icon={<Icon name="calendario" />} />
          <a href={utm('/apps/', 'apps-destacado')} className="block overflow-hidden rounded-2xl border-2 border-line bg-white hover:border-ink">
            <video autoPlay muted loop playsInline preload="metadata" poster={PROMO_APPS.poster} className="aspect-video w-full object-cover" aria-label="Vídeo de apps a medida">
              <source src={PROMO_APPS.src} type="video/mp4" />
            </video>
            <span className="flex items-center gap-4 p-4">
              <span className="min-w-0 flex-1">
                <b className="block text-[19px] font-semibold leading-tight">Apps para tu negocio <span className="ml-1 text-[14px] font-semibold uppercase text-naranja-osc">Nuevo</span></b>
                <span className="mt-0.5 block text-[16px] text-gris">Lo que repites cada día, en una app</span>
              </span>
              <Icon name="flecha" className="h-6 w-6 shrink-0" />
            </span>
          </a>
          <Row href={`${utm('/', 'servicios')}#servicios`} title="Servicios" sub="Vídeos, redes, Google y web" icon={<Icon name="camara" />} />
          <Row href={utm('/caso/', 'caso')} title="Caso real" sub="De 12 a 151 reseñas en Google" icon={<Icon name="estrella" />} />
          <Row ext href={WA_HOLA} title="WhatsApp" sub="Escríbenos y te contestamos" icon={<WhatsIcon className="h-6 w-6 text-[#128C4A]" />} />
        </nav>

        <p className="mt-8 text-center text-[14px] text-muted"><a href="/legal/" className="underline underline-offset-2">Aviso legal y privacidad</a></p>
      </div>
    </main>
  );
}
