import {AbsoluteFill, Easing, interpolate, random, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {BRAND} from './brand';

export type Card = {at: number; big: string; small?: string; frames: number}; // `at` en segundos del vídeo cortado

/** Remate a pantalla completa en mayúsculas ultra-bold, con entrada en resorte y glitch de 6 fotogramas (como "0€" en la referencia). */
export const CardView = ({card}: {card: Card}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame, fps, config: {damping: 14, stiffness: 180}, durationInFrames: 14});
  const out = interpolate(frame, [card.frames - 5, card.frames], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const glitch = frame < 6;
  const jx = glitch ? (random(`x${frame}`) - 0.5) * 60 : 0;
  const slice = glitch ? Math.round(random(`s${frame}`) * 70) : 0;
  const bigStyle = {
    fontFamily: BRAND.sans, fontWeight: 900, fontSize: card.big.length > 6 ? 168 : 250, letterSpacing: -8, lineHeight: 0.92, color: BRAND.white,
    textTransform: 'uppercase' as const, textAlign: 'center' as const, whiteSpace: 'nowrap' as const,
  };
  return (
    <AbsoluteFill style={{backgroundColor: BRAND.black, alignItems: 'center', justifyContent: 'center', opacity: out}}>
      <div style={{position: 'relative', transform: `scale(${0.82 + 0.18 * pop})`, opacity: Math.min(1, pop * 1.4)}}>
        {glitch && <div style={{...bigStyle, position: 'absolute', inset: 0, opacity: 0.35, transform: `translateX(${-jx}px)`}}>{card.big}</div>}
        <div style={{...bigStyle, transform: `translateX(${jx}px)`, clipPath: glitch ? `inset(${slice}% 0 ${Math.max(0, 40 - slice / 2)}% 0)` : undefined}}>
          {card.big}
        </div>
      </div>
      {card.small && (
        <div style={{marginTop: 56, fontFamily: BRAND.serif, fontStyle: 'italic', fontSize: 76, color: 'rgba(255,255,255,0.75)',
          opacity: interpolate(frame, [8, 18], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp', easing: Easing.out(Easing.cubic)})}}>
          {card.small}
        </div>
      )}
    </AbsoluteFill>
  );
};
