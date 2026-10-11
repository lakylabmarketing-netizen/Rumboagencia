import cuts from '../public/cuts.json';

export type Word = {w: string; s: number; e: number}; // segundos en el vídeo ORIGINAL
export type CWord = {w: string; s: number; e: number}; // segundos en el vídeo CORTADO
export type Block = {words: CWord[]; keyIndex: number; start: number; end: number};

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

export const clean = (w: string) => w.replace(/^[¿¡]+|[?!,.;:]+$/g, '').toLowerCase();

const STOP = new Set(['de', 'la', 'el', 'en', 'y', 'a', 'que', 'un', 'una', 'los', 'las', 'es', 'se', 'lo', 'con', 'por', 'para', 'del', 'al', 'mi', 'su', 'o', 'pero', 'como', 'si', 'no', 'me', 'te', 'le', 'les', 'más', 'muy', 'solo', 'aun', 'así', 'son', 'somos', 'soy', 'hacemos', 'quiero', 'tiene', 'nos', 'también', 'seguro', 'cómo', 'sino', 'decía', 'quien', 'casi', 'desde', 'dentro']);
// Palabras que cargan el significado del pitch: tienen prioridad sobre "la más larga".
const KEYWORDS = new Set(['importante', 'come', 'almería', 'vasca', 'vasco', 'experiencia', 'prestigiosas', 'pintxos', 'txuleta', 'imitaciones', 'norte', 'sur', 'auténtica', 'tradicionales', 'vanguardia', 'completa', 'brasa', 'equipo', 'distinto', 'turistas', 'empresas', 'cubiertos', 'ticket', 'rentabilidad', '120.000', 'euros', 'participación', 'probarlo', 'convence', 'negocio', 'hablamos', 'joseba', 'añorga', 'taberna', 'producto', 'almeriense', 'epicteto', 'reformar', 'cocina']);

/** Bloques de 2–4 palabras que respetan pausas y puntuación; la palabra clave se elige a mano (KEYWORDS) o por longitud. */
export const toBlocks = (words: Word[]): Block[] => {
  const mapped = words
    .map((x) => ({w: clean(x.w), s: toCutTime(x.s), e: toCutTime(x.e), hard: /[.?!:;]$/.test(x.w), soft: /,$/.test(x.w)}))
    .filter((x) => x.s !== null && x.e !== null && x.w) as {w: string; s: number; e: number; hard: boolean; soft: boolean}[];
  const blocks: Block[] = [];
  let cur: typeof mapped = [];
  const flush = () => {
    if (!cur.length) return;
    const pick = (f: (x: {w: string}) => boolean) => {
      const c = cur.filter(f);
      return c.length ? cur.indexOf(c.reduce((m, x) => (x.w.length > m.w.length ? x : m))) : -1;
    };
    let ki = pick((x) => KEYWORDS.has(x.w));
    if (ki < 0) ki = pick((x) => !STOP.has(x.w));
    if (ki < 0) ki = pick(() => true);
    blocks.push({words: cur.map((x) => ({w: x.w, s: x.s, e: x.e})), keyIndex: ki, start: cur[0].s, end: cur[cur.length - 1].e});
    cur = [];
  };
  mapped.forEach((x, i) => {
    const gap = cur.length ? x.s - cur[cur.length - 1].e : 0;
    if (cur.length && (gap > 0.3 || cur.length >= 3)) flush();
    cur.push(x);
    if (x.hard || x.soft) flush();
    if (i === mapped.length - 1) flush();
  });
  return blocks;
};

/** Primer instante (vídeo cortado) en que aparece la secuencia de palabras; null si no existe. */
export const atSeq = (words: Word[], seq: string[], from = 0): number | null => {
  for (let i = from; i <= words.length - seq.length; i++) {
    if (seq.every((q, j) => clean(words[i + j].w) === q)) return toCutTime(words[i].s);
  }
  return null;
};
