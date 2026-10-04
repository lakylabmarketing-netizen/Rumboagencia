import { R_PATH, R_W, WM_PATH, WM_W } from '@/lib/logo';

export function Isotipo({ className = '', fill = '#F04E17' }: { className?: string; fill?: string }) {
  return (
    <svg viewBox={`0 0 ${R_W} 56`} className={className} aria-hidden focusable="false">
      <path fill={fill} fillRule="evenodd" d={R_PATH} />
    </svg>
  );
}

export function Logo({ className = '', title = 'Rumbo' }: { className?: string; title?: string }) {
  const gap = 18, tw = R_W + gap + WM_W;
  return (
    <svg viewBox={`0 -3 ${tw} 62`} className={className} role="img" aria-label={title}>
      <path fill="#F04E17" fillRule="evenodd" d={R_PATH} />
      <path fill="#F2EFEA" transform={`translate(${R_W + gap} 0)`} d={WM_PATH} />
    </svg>
  );
}
