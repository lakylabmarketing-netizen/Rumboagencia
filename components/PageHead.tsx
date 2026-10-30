/** Cabecera común de las páginas interiores. */
export default function PageHead({ back = ['/', 'Inicio'], kicker, title, lead, children }:
  { back?: [string, string]; kicker: string; title: React.ReactNode; lead?: string; children?: React.ReactNode }) {
  return (
    <section className="relative mx-auto max-w-[1320px] px-4 pb-12 pt-[calc(104px+env(safe-area-inset-top))] sm:px-8 md:pb-16 md:pt-36">
      <div aria-hidden className="glow pointer-events-none absolute -right-40 -top-20 h-[560px] w-[560px] opacity-70" />
      <a href={back[0]} className="sube tech relative inline-flex items-center gap-2 text-muted hover:text-cal">← {back[1]}</a>
      <p className="sube d1 tech relative mt-8 text-brasa">{kicker}</p>
      <h1 className="sube d2 relative mt-3 max-w-[16ch] text-[clamp(2.6rem,7vw,6.2rem)] font-bold leading-[.95] tracking-[-.05em]">{title}</h1>
      {lead && <p className="sube d3 relative mt-6 max-w-[52ch] text-[clamp(1.1rem,1.5vw,1.3rem)] leading-[1.45] text-gris">{lead}</p>}
      {children}
    </section>
  );
}
