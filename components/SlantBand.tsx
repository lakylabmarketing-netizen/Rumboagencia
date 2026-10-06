/** Banda de paralelogramos que se desliza sin fin: lo que hacemos, en grande. Sin JS: CSS puro. */
export default function SlantBand({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-2" aria-label={items.join(', ')} role="img">
      <div className="slant-track flex w-max">
        {row.map((t, i) => (
          <div key={i} aria-hidden
            className={`slant -mr-[2.4vw] flex h-[clamp(96px,14vw,230px)] w-[clamp(220px,26vw,420px)] shrink-0 items-center justify-center ${i % 3 === 1 ? 'bg-naranja' : 'bg-[#FAFAFA]'}`}>
            <span className={`mega-sub text-[clamp(1.6rem,3vw,3rem)] ${i % 3 === 1 ? 'text-ink' : 'text-[#56565c]'}`}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
