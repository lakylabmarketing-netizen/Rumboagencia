import type { Metadata } from 'next';
import { Logo } from '@/components/Logo';
import Icon, { WhatsIcon } from '@/components/Icon';
import { WA_HOLA } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Enlaces',
  description: 'Rumbo, marketing para bares de Roquetas de Mar. Contacto, servicios, caso real y WhatsApp.',
  alternates: { canonical: '/enlaces/' },
};

// Enlaces de la bio de Instagram y TikTok: llevan UTM para saber que vienen de aquí
const utm = (href: string, c: string) => `${href}${href.includes('?') ? '&' : '?'}utm_source=bio&utm_medium=social&utm_content=${c}`;

const Row = ({ href, title, sub, icon, accent = false, ext = false }: { href: string; title: string; sub: string; icon: React.ReactNode; accent?: boolean; ext?: boolean }) => (
  <a href={href} {...(ext ? { target: '_blank', rel: 'noopener' } : {})}
    className={`flex items-center gap-4 rounded-2xl border-2 p-4 ${accent ? 'border-naranja bg-naranja text-ink' : 'border-line bg-papel hover:border-naranja'}`}>
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
    <main id="contenido" className="min-h-[100svh] bg-ink px-4 pb-[calc(28px+env(safe-area-inset-bottom))] pt-[calc(36px+env(safe-area-inset-top))]">
      <div className="mx-auto max-w-[460px]">
        <header className="text-center">
          <h1 className="flex justify-center"><Logo className="h-9 w-auto" title="Rumbo" /></h1>
          <p className="mt-3 text-[18px] text-gris">Marketing para bares de Roquetas.<br />Que en invierno tu bar no esté vacío.</p>
        </header>

        <nav aria-label="Enlaces" className="mt-8 grid gap-3">
          <Row href={utm('/contacto/', 'contacto')} title="Quiero llenar mi bar" sub="Cuéntanos cómo va tu invierno" icon={<Icon name="telefono" />} />
          <a href={WA_HOLA} target="_blank" rel="noopener" className="flex items-center gap-4 rounded-2xl bg-naranja p-4 text-ink hover:bg-[#FF6A2B]">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/40"><WhatsIcon className="h-8 w-8" /></span>
            <span className="min-w-0 flex-1"><b className="block text-[20px] font-bold leading-tight">WhatsApp</b><span className="mt-0.5 block text-[16px]">Escríbenos y te contestamos</span></span>
            <Icon name="flecha" className="h-6 w-6 shrink-0" />
          </a>
          <Row href={`${utm('/', 'servicios')}#servicios`} title="Servicios" sub="Vídeos en redes y reseñas en Google" icon={<Icon name="camara" />} />
          <Row href={utm('/caso/', 'caso')} title="Caso real" sub="De 12 a 151 reseñas en Google" icon={<Icon name="estrella" />} />
        </nav>

        <p className="mt-8 text-center text-[14px] text-muted"><a href="/legal/" className="underline underline-offset-2">Aviso legal y privacidad</a></p>
      </div>
    </main>
  );
}
