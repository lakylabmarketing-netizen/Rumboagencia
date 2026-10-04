import { Isotipo } from './Logo';

const LINKS: [string, string][] = [
  ['#servicios', 'Qué hacemos'], ['#proyectos', 'Proyectos'], ['#proceso', 'Proceso'],
  ['#nosotros', 'Nosotros'], ['#precios', 'Precios'], ['#faq', 'FAQ'],
];

/** Barra superior técnica, mínima. En móvil, menú desplegable sin JavaScript. */
export default function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-ink/85 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-wrap items-center gap-6 px-5 sm:px-8">
        <a href="#inicio" aria-label="Rumbo, inicio" className="flex items-center gap-3" data-cursor="INICIO">
          <Isotipo className="h-5 w-auto" />
          <span className="tech hidden text-cal sm:inline">Rumbo</span>
        </a>
        <nav aria-label="Secciones" className="ml-auto hidden items-center gap-7 lg:flex">
          {LINKS.map(([h, l]) => <a key={h} href={h} className="tech text-gris transition-colors hover:text-cal">{l}</a>)}
        </nav>
        <a href="#contacto" className="tech ml-auto border border-naranja px-4 py-2.5 text-cal transition-colors hover:bg-naranja hover:text-ink lg:ml-0" data-cursor="HABLAR">Hablemos</a>
        <details className="relative lg:hidden">
          <summary className="tech flex h-10 cursor-pointer list-none items-center px-1 text-cal [&::-webkit-details-marker]:hidden">Menú</summary>
          <nav aria-label="Secciones" className="absolute right-0 top-12 grid w-56 gap-1 border border-line bg-ink p-3">
            {LINKS.map(([h, l]) => <a key={h} href={h} className="tech px-2 py-3 text-gris hover:text-cal">{l}</a>)}
          </nav>
        </details>
      </div>
      <div className="h-px bg-line" aria-hidden />
    </header>
  );
}
