/** Estrella de cuatro puntas con brillo metálico (decorativa). */
export default function Destello({ className = '', naranja = false, id }: { className?: string; naranja?: boolean; id: string }) {
  const [a, b, c] = naranja ? ['#FFC4A3', '#F04E17', '#7A2405'] : ['#FFFFFF', '#9C9C9C', '#2E2E2E'];
  return (
    <svg aria-hidden viewBox="0 0 100 100" className={className}>
      <defs>
        <linearGradient id={`${id}-f`} x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0" stopColor={a} /><stop offset=".45" stopColor={b} /><stop offset="1" stopColor={c} />
        </linearGradient>
        <linearGradient id={`${id}-b`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".9" /><stop offset=".5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M50 2 C54 34 66 46 98 50 C66 54 54 66 50 98 C46 66 34 54 2 50 C34 46 46 34 50 2Z" fill={`url(#${id}-f)`} stroke={`url(#${id}-b)`} strokeWidth="1.2" />
    </svg>
  );
}
