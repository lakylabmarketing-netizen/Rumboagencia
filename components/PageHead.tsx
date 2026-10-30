/** Cabecera común de las páginas interiores: centrada, grande y sencilla. */
export default function PageHead({ kicker, title, lead, children }:
  { kicker: string; title: React.ReactNode; lead?: string; children?: React.ReactNode }) {
  return (
    <section className="px-4 pb-14 pt-14 text-center sm:px-6 md:pb-20 md:pt-20">
      <div className="mx-auto max-w-wrap">
        <p className="etiqueta">{kicker}</p>
        <h1 className="mx-auto mt-6 max-w-[18ch] text-[clamp(2.3rem,5.6vw,4.4rem)] uppercase leading-[1.03]">{title}</h1>
        {lead && <p className="mx-auto mt-6 max-w-[44ch] text-[clamp(1.15rem,1.8vw,1.35rem)] leading-[1.5] text-gris">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
