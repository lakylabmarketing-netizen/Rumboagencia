import type React from 'react';
import {AbsoluteFill, Easing, Img, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import cuts from '../public/cuts.json';
import captions from '../public/captions.json';
import {BRAND, FPS, OUTRO_FRAMES, W} from './brand';
import {KEYWORDS, Word, atSeq, toBlocks} from './captions';
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
const CARD_DEFS: {seq: string[]; big: string; small?: string; frames: number; count?: {to: number; suffix: string}}[] = [
  {seq: ['auténtica'], big: 'AUTÉNTICA', frames: 34},
  {seq: ['unimos'], big: 'NORTE + SUR', frames: 40},
  {seq: ['brasa'], big: 'BRASA', small: 'comedor con brasa', frames: 36},
  {seq: ['40'], big: '40', small: 'cubiertos al día', frames: 44, count: {to: 40, suffix: ''}},
  {seq: ['35'], big: '35 €', small: 'ticket medio', frames: 44, count: {to: 35, suffix: ' €'}},
  {seq: ['120.000'], big: '120.000 €', small: 'para abrir', frames: 52, count: {to: 120000, suffix: ' €'}},
  {seq: ['20'], big: '20 %', small: 'de participación', frames: 50, count: {to: 20, suffix: ' %'}},
  {seq: ['hablamos'], big: '¿HABLAMOS?', frames: 60},
];
const cards: Card[] = CARD_DEFS.flatMap((d) => {
  const t = atSeq(words, d.seq);
  return t === null ? [] : [{at: t, big: d.big, small: d.small, frames: d.frames, count: d.count}];
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

// Solo palabras clave: una por bloque, y solo si está en el vocabulario del pitch
const keys = blocks
  .map((b) => b.words[b.keyIndex])
  .filter((w) => KEYWORDS.has(w.w))
  .map((w, i, arr) => ({text: w.w, from: Math.round(w.s * FPS), to: Math.min(Math.round(w.e * FPS) + 14, i + 1 < arr.length ? Math.round(arr[i + 1].s * FPS) : Infinity)}))
  .filter((k) => k.to - k.from >= 6);
const keyFrames = keys.map((k) => k.from);

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

/** Palabra clave a pantalla completa de ancho, con 5 entradas distintas que rotan (pop, letras, máscara, desenfoque, giro). */
const KeyWord = ({text, variant, dur}: {text: string; variant: number; dur: number}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const size = Math.min(230, Math.floor(960 / (text.length * 0.4)));
  const out = interpolate(frame, [dur - 5, dur], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const under = interpolate(frame, [5, 16], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const sp = (d = 0, damping = 11, stiffness = 190) => spring({frame: frame - d, fps, config: {damping, stiffness}, durationInFrames: 18});
  const ring = interpolate(frame, [0, 16], [0, 1], {extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const base = {fontFamily: BRAND.serif, fontStyle: 'italic', fontSize: size, color: BRAND.white, lineHeight: 1.05, letterSpacing: -3, whiteSpace: 'nowrap'} as const;
  let inner: React.ReactNode;
  if (variant === 0) {
    const p = sp();
    inner = <div style={{...base, transform: `scale(${0.6 + 0.4 * p})`, opacity: Math.min(1, p * 1.6)}}>{text}</div>;
  } else if (variant === 1) {
    inner = (
      <div style={base}>
        {text.split('').map((c, i) => {
          const p = sp(i * 1.4, 12, 170);
          return <span key={i} style={{display: 'inline-block', transform: `translateY(${(1 - p) * 90}px) rotate(${(1 - p) * 8}deg)`, opacity: Math.min(1, p * 2)}}>{c}</span>;
        })}
      </div>
    );
  } else if (variant === 2) {
    const t = interpolate(frame, [0, 9], [110, 0], {extrapolateRight: 'clamp', easing: Easing.out(Easing.exp)});
    inner = <div style={{overflow: 'hidden', padding: '0 12px'}}><div style={{...base, transform: `translateY(${t}%)`}}>{text}</div></div>;
  } else if (variant === 3) {
    const t = interpolate(frame, [0, 9], [0, 1], {extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
    inner = <div style={{...base, filter: `blur(${(1 - t) * 22}px)`, transform: `scale(${1.25 - 0.25 * t})`, opacity: t}}>{text}</div>;
  } else {
    const p = sp(0, 10, 150);
    inner = <div style={{...base, transform: `translateX(${(1 - p) * -90}px) rotate(${(1 - p) * -7}deg)`, opacity: Math.min(1, p * 1.8)}}>{text}</div>;
  }
  return (
    <div style={{position: 'absolute', left: 0, width: W, top: 1255, display: 'flex', justifyContent: 'center', opacity: out, transform: `translateY(${(1 - out) * -14}px)`}}>
      <div style={{position: 'absolute', top: 70, width: 160 + ring * 900, height: 160 + ring * 900, marginTop: -(80 + ring * 450), borderRadius: '50%', border: '3px solid rgba(255,255,255,0.35)', opacity: (1 - ring) * 0.9}} />
      <div style={{position: 'relative'}}>
        {inner}
        <div style={{position: 'absolute', left: 0, bottom: 6, height: 5, width: `${under * 100}%`, background: BRAND.white, borderRadius: 3}} />
      </div>
    </div>
  );
};

/** Cinta de texto que se desplaza abajo (identidad de marca en movimiento). */
const Ticker = () => {
  const frame = useCurrentFrame();
  const unit = 'TABERNA VASCA  ·  ALMERÍA  ·  JOSEBA AÑORGA  ·  ';
  return (
    <div style={{position: 'absolute', left: 0, width: W, top: 1740, overflow: 'hidden', opacity: 0.28}}>
      <div style={{whiteSpace: 'nowrap', transform: `translateX(${-(frame * 2.2) % 1180}px)`, fontFamily: BRAND.sans, fontWeight: 700, fontSize: 30, letterSpacing: 9, color: BRAND.white}}>
        {unit.repeat(8)}
      </div>
    </div>
  );
};

/** Esquinas que se dibujan alrededor del vídeo. */
const Corners = () => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [4, 24], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp', easing: Easing.out(Easing.cubic)});
  const L = 54 * t, top = 560, bottom = 560 + VIDEO_H, m = 26;
  const line = {position: 'absolute', background: BRAND.white} as const;
  return (
    <>
      <div style={{...line, left: m, top: top + m, width: L, height: 3}} /><div style={{...line, left: m, top: top + m, width: 3, height: L}} />
      <div style={{...line, right: m, top: top + m, width: L, height: 3}} /><div style={{...line, right: m, top: top + m, width: 3, height: L}} />
      <div style={{...line, left: m, top: bottom - m - 3, width: L, height: 3}} /><div style={{...line, left: m, top: bottom - m - L, width: 3, height: L}} />
      <div style={{...line, right: m, top: bottom - m - 3, width: L, height: 3}} /><div style={{...line, right: m, top: bottom - m - L, width: 3, height: L}} />
    </>
  );
};

/** Barrido blanco entre secciones. */
const Whip = () => {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [0, 10], [-260, W + 60], {extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)});
  return <div style={{position: 'absolute', top: 0, left: x, width: 220, height: 1920, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)', opacity: 0.8}} />;
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
        <AbsoluteFill style={{opacity: 0.45, transform: `scale(${1 + 0.12 * (frame / VIDEO_FRAMES)})`}}>
          <OffthreadVideo src={staticFile('bg.mp4')} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        </AbsoluteFill>
        <div style={{position: 'absolute', top: 560, left: 0, width: W, height: VIDEO_H, overflow: 'hidden'}}>
          <OffthreadVideo src={staticFile('mi-video-cut.mp4')} style={{width: W, height: VIDEO_H, transform: `scale(${zoom})`}} />
        </div>
        <Img src={staticFile('logo.png')} style={{position: 'absolute', top: 170, left: (W - 230) / 2, width: 230, opacity: logoIn, transform: `scale(${1 + 0.025 * Math.sin(frame / 14)})`}} />
        <Progress />
        <Corners />
        <Ticker />
        <Sequence from={6} durationInFrames={96}>
          <Hook />
        </Sequence>
        {sections.map((sc, i) => (
          <Sequence key={`s${i}`} from={Math.max(Math.round(sc.at * FPS), i === 0 ? 108 : 0)} durationInFrames={72}>
            <SectionTag label={sc.label} />
          </Sequence>
        ))}
        {keys.map((k, i) => (
          <Sequence key={`k${i}`} from={k.from} durationInFrames={k.to - k.from}>
            <KeyWord text={k.text} variant={i % 5} dur={k.to - k.from} />
          </Sequence>
        ))}
        {sections.map((sc, i) => (
          <Sequence key={`w${i}`} from={Math.round(sc.at * FPS)} durationInFrames={12}>
            <Whip />
          </Sequence>
        ))}
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
