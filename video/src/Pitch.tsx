import {AbsoluteFill, Easing, Img, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import cuts from '../public/cuts.json';
import captions from '../public/captions.json';
import {BRAND, FPS, OUTRO_FRAMES, W} from './brand';
import {Block, Word, toBlocks, toCutTime} from './captions';
import {Card, CardView} from './Cards';


const keep = cuts.keep as number[][];
const segments = (() => {
  let acc = 0;
  return keep.map(([a, b]) => {
    const seg = {from: Math.round(acc * FPS), to: Math.round((acc + b - a) * FPS)};
    acc += b - a;
    return seg;
  });
})();
const VIDEO_FRAMES = segments[segments.length - 1].to;
const blocks = toBlocks(captions as Word[]);

const at = (raw: string) => {
  const w = (captions as Word[]).find((x) => x.w.replace(/^[¿¡]+|[?!,.;:]+$/g, '') === raw);
  return w ? toCutTime(w.s) : null;
};
const CARD_DEFS: {word: string; big: string; small?: string; frames: number}[] = [
  {word: '40', big: '40', small: 'cubiertos al día', frames: 40},
  {word: '35', big: '35 €', small: 'ticket medio', frames: 40},
  {word: '120.000', big: '120.000 €', small: 'para abrir', frames: 46},
  {word: '20', big: '20 %', small: 'de participación', frames: 46},
];
const cards: Card[] = CARD_DEFS.flatMap((d) => {
  const t = at(d.word);
  return t === null ? [] : [{at: t, big: d.big, small: d.small, frames: d.frames}];
});

const VIDEO_H = Math.round((W * 9) / 16); // 608: 16:9 a todo el ancho, sin estirar el 720p

/** Punch-in lento que alterna por tramo (como los cambios de plano de la referencia). */
const useZoom = () => {
  const frame = useCurrentFrame();
  const i = segments.findIndex((s) => frame >= s.from && frame < s.to);
  const s = segments[Math.max(0, i)];
  const p = interpolate(frame, [s.from, s.to], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return i % 2 === 0 ? 1 + 0.06 * p : 1.06 - 0.06 * p;
};

const Caption = ({block}: {block: Block}) => {
  const frame = useCurrentFrame();
  const t = frame - 0;
  const enter = interpolate(t, [0, 5], [0, 1], {extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  return (
    <div style={{position: 'absolute', left: 70, right: 70, top: 1290, textAlign: 'center', opacity: enter, transform: `translateY(${(1 - enter) * 16}px)`}}>
      <div style={{fontFamily: BRAND.sans, fontWeight: 600, fontSize: 54, color: BRAND.muted, lineHeight: 1.1, letterSpacing: -0.5, minHeight: 60}}>
        {block.words.slice(0, block.keyIndex).join(' ')}
      </div>
      <div style={{fontFamily: BRAND.serif, fontStyle: 'italic', fontSize: 176, color: BRAND.white, lineHeight: 1, letterSpacing: -2}}>
        {block.key}
      </div>
      <div style={{fontFamily: BRAND.sans, fontWeight: 600, fontSize: 54, color: BRAND.muted, lineHeight: 1.1, letterSpacing: -0.5}}>
        {block.words.slice(block.keyIndex + 1).join(' ')}
      </div>
    </div>
  );
};

/** Gancho: caja blanca redondeada con texto negro en mayúsculas, como el hook de la referencia. */
const Hook = () => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 6, 84, 96], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', top: 430, left: 0, width: W, display: 'flex', justifyContent: 'center', opacity: o, transform: `translateY(${(1 - o) * 14}px)`}}>
      <div style={{background: BRAND.white, color: BRAND.black, borderRadius: 14, padding: '18px 34px', fontFamily: BRAND.sans, fontWeight: 800, fontSize: 50, letterSpacing: -0.5, textTransform: 'uppercase'}}>
        Taberna vasca en Almería
      </div>
    </div>
  );
};

const Outro = () => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 12], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: BRAND.black, alignItems: 'center', justifyContent: 'center', opacity: o}}>
      <Img src={staticFile('logo.png')} style={{width: 640}} />
      <div style={{marginTop: 70, width: 760, textAlign: 'center', fontFamily: BRAND.serif, fontStyle: 'italic', fontSize: 56, color: BRAND.muted, lineHeight: 1.2}}>
        {BRAND.tagline}
      </div>
    </AbsoluteFill>
  );
};

export const Pitch = () => {
  const frame = useCurrentFrame();
  const zoom = useZoom();
  const logoIn = interpolate(frame, [0, 15], [0, 1], {extrapolateRight: 'clamp'});
  useVideoConfig();
  return (
    <AbsoluteFill style={{backgroundColor: BRAND.black}}>
      <style>{`@font-face{font-family:'Instrument Serif';font-style:italic;font-weight:400;src:url(${staticFile('fonts/instrument-serif-latin-400-italic.woff2')}) format('woff2')}`}</style>
      <Sequence durationInFrames={VIDEO_FRAMES}>
        {/* Fondo: el mismo plano ampliado y desenfocado */}
        <AbsoluteFill style={{opacity: 0.45}}>
          <OffthreadVideo src={staticFile('bg.mp4')} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        </AbsoluteFill>
        <div style={{position: 'absolute', top: 560, left: 0, width: W, height: VIDEO_H, overflow: 'hidden'}}>
          <OffthreadVideo src={staticFile('mi-video-cut.mp4')} style={{width: W, height: VIDEO_H, transform: `scale(${zoom})`}} />
        </div>
        <Img src={staticFile('logo.png')} style={{position: 'absolute', top: 170, left: (W - 230) / 2, width: 230, opacity: logoIn}} />
        <Sequence from={6} durationInFrames={96}>
          <Hook />
        </Sequence>
        {blocks.map((b, i) => {
          const from = Math.round(b.start * FPS);
          const dur = Math.max(6, Math.round((b.end - b.start) * FPS) + 3);
          return (
            <Sequence key={i} from={from} durationInFrames={dur}>
              <Caption block={b} />
            </Sequence>
          );
        })}
        {cards.map((c, i) => (
          <Sequence key={`c${i}`} from={Math.round(c.at * FPS)} durationInFrames={c.frames}>
            <CardView card={c} />
          </Sequence>
        ))}
      </Sequence>
      <Sequence from={VIDEO_FRAMES} durationInFrames={OUTRO_FRAMES}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
