import {AbsoluteFill, Easing, Img, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import cuts from '../public/cuts.json';
import captions from '../public/captions.json';
import {BRAND, FPS, OUTRO_FRAMES, W} from './brand';
import {Block, Word, atSeq, toBlocks} from './captions';
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
const words = captions as Word[];
const blocks = toBlocks(words);

// ── Tarjetas a pantalla completa, disparadas por palabras del guion ─────────────────────────────
const CARD_DEFS: {seq: string[]; big: string; small?: string; frames: number}[] = [
  {seq: ['auténtica'], big: 'AUTÉNTICA', frames: 34},
  {seq: ['unimos'], big: 'NORTE + SUR', frames: 40},
  {seq: ['brasa'], big: 'BRASA', small: 'comedor con brasa', frames: 36},
  {seq: ['40'], big: '40', small: 'cubiertos al día', frames: 40},
  {seq: ['35'], big: '35 €', small: 'ticket medio', frames: 40},
  {seq: ['120.000'], big: '120.000 €', small: 'para abrir', frames: 46},
  {seq: ['20'], big: '20 %', small: 'de participación', frames: 46},
  {seq: ['hablamos'], big: '¿HABLAMOS?', frames: 60},
];
const cards: Card[] = CARD_DEFS.flatMap((d) => {
  const t = atSeq(words, d.seq);
  return t === null ? [] : [{at: t, big: d.big, small: d.small, frames: d.frames}];
});

// ── Títulos de sección ─────────────────────────────────────────────────────────────────────────
const SECTION_DEFS: {seq: string[]; label: string}[] = [
  {seq: ['epicteto'], label: '01 — La idea'},
  {seq: ['la', 'cocina'], label: '02 — La oportunidad'},
  {seq: ['soy', 'joseba'], label: '03 — La solución'},
  {seq: ['no', 'somos'], label: '04 — La diferencia'},
  {seq: ['nos', 'dirigimos'], label: '05 — El mercado'},
  {seq: ['buscamos'], label: '06 — La inversión'},
  {seq: ['le', 'invito'], label: '07 — El cierre'},
];
const sections = SECTION_DEFS.flatMap((d) => {
  const t = atSeq(words, d.seq);
  return t === null ? [] : [{at: t, label: d.label}];
});

// Golpe de zoom en cada palabra clave
const keyFrames = blocks.map((b) => Math.round(b.words[b.keyIndex].s * FPS));

const VIDEO_H = Math.round((W * 9) / 16); // 608: 16:9 a todo el ancho, sin estirar el 720p

/** Punch-in lento que alterna por tramo + golpe rápido en cada palabra clave. */
const useZoom = () => {
  const frame = useCurrentFrame();
  const i = segments.findIndex((s) => frame >= s.from && frame < s.to);
  const s = segments[Math.max(0, i)];
  const p = interpolate(frame, [s.from, s.to], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const base = i % 2 === 0 ? 1 + 0.06 * p : 1.06 - 0.06 * p;
  let pulse = 0;
  for (const kf of keyFrames) {
    const d = frame - kf;
    if (d >= 0 && d < 10) pulse = Math.max(pulse, 0.05 * (1 - d / 10) ** 2);
  }
  return base + pulse;
};

/** Subtítulo palabra a palabra: cada palabra entra cuando se dice; la clave va en serif cursiva y se subraya. */
const Caption = ({block}: {block: Block}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const reveal = (w: {s: number}, d = 6) => {
    const f = Math.round((w.s - block.start) * FPS);
    const t = interpolate(frame - f, [0, d], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
    return {opacity: t, transform: `translateY(${(1 - t) * 22}px)`};
  };
  const small = {fontFamily: BRAND.sans, fontWeight: 800, fontSize: 66, letterSpacing: -1, color: BRAND.white, display: 'inline-block', margin: '0 12px'} as const;
  const key = block.words[block.keyIndex];
  const kf = Math.round((key.s - block.start) * FPS);
  const pop = spring({frame: frame - kf, fps, config: {damping: 11, stiffness: 190}, durationInFrames: 16});
  const under = interpolate(frame - kf, [2, 14], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  return (
    <div style={{position: 'absolute', left: 50, right: 50, top: 1262, textAlign: 'center'}}>
      <div style={{minHeight: 78}}>
        {block.words.slice(0, block.keyIndex).map((w, i) => (
          <span key={i} style={{...small, ...reveal(w)}}>{w.w}</span>
        ))}
      </div>
      <div style={{position: 'relative', display: 'inline-block', opacity: Math.min(1, pop * 1.5), transform: `scale(${0.7 + 0.3 * pop})`}}>
        <div style={{fontFamily: BRAND.serif, fontStyle: 'italic', fontSize: 190, color: BRAND.white, lineHeight: 1.02, letterSpacing: -3}}>{key.w}</div>
        <div style={{position: 'absolute', left: 0, bottom: 4, height: 5, width: `${under * 100}%`, background: BRAND.white, borderRadius: 3}} />
      </div>
      <div style={{minHeight: 78}}>
        {block.words.slice(block.keyIndex + 1).map((w, i) => (
          <span key={i} style={{...small, ...reveal(w)}}>{w.w}</span>
        ))}
      </div>
    </div>
  );
};

const SectionTag = ({label}: {label: string}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 8, 62, 72], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const line = interpolate(frame, [0, 14], [0, 90], {extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  return (
    <div style={{position: 'absolute', top: 514, left: 70, opacity: o, display: 'flex', alignItems: 'center', gap: 18}}>
      <div style={{height: 3, width: line, background: BRAND.white}} />
      <div style={{fontFamily: BRAND.sans, fontWeight: 600, fontSize: 28, letterSpacing: 7, textTransform: 'uppercase', color: BRAND.white}}>{label}</div>
    </div>
  );
};

/** Gancho: caja blanca redondeada con texto negro en mayúsculas, como el hook de la referencia. */
const Hook = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame, fps, config: {damping: 12, stiffness: 160}, durationInFrames: 14});
  const o = interpolate(frame, [0, 4, 84, 96], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', top: 405, left: 0, width: W, display: 'flex', justifyContent: 'center', opacity: o, transform: `scale(${0.85 + 0.15 * pop})`}}>
      <div style={{background: BRAND.white, color: BRAND.black, borderRadius: 14, padding: '18px 34px', fontFamily: BRAND.sans, fontWeight: 800, fontSize: 50, letterSpacing: -0.5, textTransform: 'uppercase'}}>
        Taberna vasca en Almería
      </div>
    </div>
  );
};

const Progress = () => {
  const frame = useCurrentFrame();
  const p = Math.min(1, frame / VIDEO_FRAMES);
  return (
    <div style={{position: 'absolute', left: 70, top: 1192, width: W - 140, height: 4, background: 'rgba(255,255,255,0.16)', borderRadius: 2}}>
      <div style={{width: `${p * 100}%`, height: '100%', background: BRAND.white, borderRadius: 2}} />
    </div>
  );
};

const Outro = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const o = interpolate(frame, [0, 12], [0, 1], {extrapolateRight: 'clamp'});
  const pop = spring({frame, fps, config: {damping: 14, stiffness: 120}, durationInFrames: 20});
  return (
    <AbsoluteFill style={{backgroundColor: BRAND.black, alignItems: 'center', justifyContent: 'center', opacity: o}}>
      <Img src={staticFile('logo.png')} style={{width: 640, transform: `scale(${0.9 + 0.1 * pop})`}} />
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
  return (
    <AbsoluteFill style={{backgroundColor: BRAND.black}}>
      <style>{`@font-face{font-family:'Instrument Serif';font-style:italic;font-weight:400;src:url(${staticFile('fonts/instrument-serif-latin-400-italic.woff2')}) format('woff2')}`}</style>
      <Sequence durationInFrames={VIDEO_FRAMES}>
        {/* Fondo: el mismo plano ampliado y desenfocado (pre-renderizado en bg.mp4) */}
        <AbsoluteFill style={{opacity: 0.45}}>
          <OffthreadVideo src={staticFile('bg.mp4')} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        </AbsoluteFill>
        <div style={{position: 'absolute', top: 560, left: 0, width: W, height: VIDEO_H, overflow: 'hidden'}}>
          <OffthreadVideo src={staticFile('mi-video-cut.mp4')} style={{width: W, height: VIDEO_H, transform: `scale(${zoom})`}} />
        </div>
        <Img src={staticFile('logo.png')} style={{position: 'absolute', top: 170, left: (W - 230) / 2, width: 230, opacity: logoIn}} />
        <Progress />
        <Sequence from={6} durationInFrames={96}>
          <Hook />
        </Sequence>
        {sections.map((sc, i) => (
          <Sequence key={`s${i}`} from={Math.max(Math.round(sc.at * FPS), i === 0 ? 108 : 0)} durationInFrames={72}>
            <SectionTag label={sc.label} />
          </Sequence>
        ))}
        {blocks.map((b, i) => {
          const from = Math.round(b.start * FPS);
          const next = blocks[i + 1] ? Math.round(blocks[i + 1].start * FPS) : Infinity;
          const dur = Math.max(4, Math.min(Math.round((b.end - b.start) * FPS) + 4, next - from)); // sin solapar con el siguiente
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
