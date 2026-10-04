// Efecto "decode": los caracteres se resuelven de izquierda a derecha.
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+×/#<>_';

export function scramble(el: HTMLElement, opts: { duration?: number; text?: string } = {}) {
  const final = opts.text ?? el.dataset.text ?? el.textContent ?? '';
  el.dataset.text = final;
  const dur = opts.duration ?? 650;
  const start = performance.now();
  let raf = 0;
  const tick = (t: number) => {
    const p = Math.min(1, (t - start) / dur);
    const solved = Math.floor(final.length * p);
    let out = '';
    for (let i = 0; i < final.length; i++) {
      const c = final[i];
      out += i < solved || c === ' ' ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0];
    }
    el.textContent = out;
    if (p < 1) raf = requestAnimationFrame(tick);
  };
  cancelAnimationFrame(Number(el.dataset.raf || 0));
  raf = requestAnimationFrame(tick);
  el.dataset.raf = String(raf);
}
