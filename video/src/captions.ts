import cuts from '../public/cuts.json';

export type Word = {w: string; s: number; e: number}; // segundos en el vídeo ORIGINAL
export type Block = {words: string[]; key: string; start: number; end: number}; // segundos en el vídeo CORTADO

const keep = cuts.keep as number[][];

/** Pasa un instante del vídeo original al vídeo con silencios recortados (null si cae en un corte). */
export const toCutTime = (t: number): number | null => {
  let acc = 0;
  for (const [a, b] of keep) {
    if (t >= a && t <= b) return acc + (t - a);
    acc += b - a;
  }
  return null;
};

const STOP = new Set(['de', 'la', 'el', 'en', 'y', 'a', 'que', 'un', 'una', 'los', 'las', 'es', 'se', 'lo', 'con', 'por', 'para', 'del', 'al', 'mi', 'su', 'o', 'pero', 'como', 'si', 'no', 'me', 'te']);

/** Bloques de 2–4 palabras; la palabra clave es la más larga que no sea de relleno. */
export const toBlocks = (words: Word[]): Block[] => {
  const mapped = words
    .map((x) => ({w: x.w.replace(/[¿?¡!,.;:]/g, '').toLowerCase(), s: toCutTime(x.s), e: toCutTime(x.e), hard: /[.?!]$/.test(x.w)}))
    .filter((x) => x.s !== null && x.e !== null && x.w) as {w: string; s: number; e: number; hard: boolean}[];
  const blocks: Block[] = [];
  let cur: typeof mapped = [];
  const flush = () => {
    if (!cur.length) return;
    const cand = cur.filter((x) => !STOP.has(x.w));
    const key = (cand.length ? cand : cur).reduce((m, x) => (x.w.length > m.w.length ? x : m)).w;
    blocks.push({words: cur.map((x) => x.w), key, start: cur[0].s, end: cur[cur.length - 1].e});
    cur = [];
  };
  mapped.forEach((x, i) => {
    const gap = cur.length ? x.s - cur[cur.length - 1].e : 0;
    if (cur.length && (gap > 0.35 || cur.length >= 4)) flush();
    cur.push(x);
    if (x.hard) flush();
    if (i === mapped.length - 1) flush();
  });
  return blocks;
};
