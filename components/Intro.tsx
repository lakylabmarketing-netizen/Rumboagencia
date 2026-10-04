'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';

const KEY = 'rumbo-intro-2026';

const LINES = [
  'RUMBO.SYS v1.0 · ALMERÍA · 1996',
  '> Detectando local ............ OK',
  '> Cargando carta .............. OK',
  '> Clientes nuevos ............. 0',
  '> Buscando actualización ...... RUMBO 2026',
  '> Installing update…',
];

// Contadores: el año viaja de 1996 a 2026; el resto son cifras reales de A Lo Cubano.
const COUNTERS = [
  { label: 'AÑO', from: 1996, to: 2026, plain: true },
  { label: 'VISUALIZACIONES', from: 0, to: 172900 },
  { label: 'RESEÑAS', from: 12, to: 151 },
  { label: 'RUTAS AL LOCAL', from: 0, to: 607 },
];

const fmt = (n: number, plain?: boolean) => (plain ? String(Math.round(n)) : Math.round(n).toLocaleString('es-ES').replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

const FRAG = `precision mediump float;
uniform vec2 r; uniform float t; uniform float k;
void main(){
  vec2 p=(gl_FragCoord.xy-.5*r)/r.y;
  float a=atan(p.y,p.x); float d=length(p)+1e-3;
  float z=.32/d+t*(2.+k*6.);
  float streak=pow(.5+.5*sin(a*18.+z*3.),14.);
  float ring=pow(.5+.5*sin(z*9.),22.);
  vec3 c=mix(vec3(.94,.31,.09),vec3(1.,.88,.74),streak);
  float glow=(streak*.9+ring*.6)*smoothstep(0.,.45,d)*k;
  gl_FragColor=vec4(c*glow+vec3(1.,.55,.24)*k*k*.12/d*.06,1.);
}`;

function startVortex(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
  if (!gl) return { set: () => {}, stop: () => {} };
  const dpr = Math.min(devicePixelRatio, 1.5);
  canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr;
  const sh = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s; };
  const pr = gl.createProgram()!;
  gl.attachShader(pr, sh(gl.VERTEX_SHADER, 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}'));
  gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(pr); gl.useProgram(pr);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const uR = gl.getUniformLocation(pr, 'r'), uT = gl.getUniformLocation(pr, 't'), uK = gl.getUniformLocation(pr, 'k');
  let k = 0, raf = 0; const t0 = performance.now();
  const draw = (t: number) => {
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uR, canvas.width, canvas.height); gl.uniform1f(uT, (t - t0) / 1000); gl.uniform1f(uK, k);
    gl.drawArrays(gl.TRIANGLES, 0, 3); raf = requestAnimationFrame(draw);
  };
  raf = requestAnimationFrame(draw);
  return { set: (v: number) => { k = v; }, stop: () => cancelAnimationFrame(raf) };
}

export default function Intro() {
  const [active, setActive] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const done = useRef(false);

  useEffect(() => {
    if (document.documentElement.classList.contains('intro-pending')) setActive(true);
  }, []);

  const finish = () => {
    if (done.current) return; done.current = true;
    try { localStorage.setItem(KEY, '1'); } catch { /* sin almacenamiento: no pasa nada */ }
    const el = root.current;
    const end = () => { document.documentElement.classList.remove('intro-pending'); setActive(false); window.dispatchEvent(new Event('rumbo:intro-done')); };
    if (el) gsap.to(el, { opacity: 0, duration: 0.5, ease: 'power2.out', onComplete: end }); else end();
  };

  useEffect(() => {
    if (!active) return;
    const el = root.current!;
    const vortex = startVortex(canvas.current!);
    const tl = gsap.timeline({ onComplete: finish });
    const lines = el.querySelectorAll<HTMLElement>('[data-line]');
    lines.forEach((ln, i) => {
      const text = LINES[i];
      tl.to({}, { duration: 0.02 + text.length * 0.012, onStart: () => { ln.style.visibility = 'visible'; },
        onUpdate: function () { ln.textContent = text.slice(0, Math.ceil(text.length * this.progress())); } });
    });
    const bar = el.querySelector<HTMLElement>('[data-bar]')!;
    const pct = el.querySelector<HTMLElement>('[data-pct]')!;
    tl.to({ p: 0 }, { p: 100, duration: 1.1, ease: 'power2.in', onUpdate: function () {
      const p = (this.targets()[0] as { p: number }).p; bar.style.transform = `scaleX(${p / 100})`; pct.textContent = `${Math.round(p)}%`;
    } }, '<');
    const counters = el.querySelectorAll<HTMLElement>('[data-count]');
    tl.addLabel('warp');
    tl.to(el.querySelector('[data-counters]'), { opacity: 1, duration: 0.2 }, 'warp');
    counters.forEach((c, i) => {
      const def = COUNTERS[i];
      tl.to({ v: def.from }, { v: def.to, duration: 1.4, ease: 'expo.in', onUpdate: function () {
        c.textContent = fmt((this.targets()[0] as { v: number }).v, def.plain);
      } }, 'warp');
    });
    tl.to({ k: 0 }, { k: 1, duration: 1.4, ease: 'power3.in', onUpdate: function () { vortex.set((this.targets()[0] as { k: number }).k); } }, 'warp');
    tl.to(el.querySelector('[data-term]'), { opacity: 0, scale: 0.96, duration: 0.5 }, 'warp+=0.9');
    tl.to(el.querySelector('[data-flash]'), { opacity: 1, duration: 0.12 }, 'warp+=1.4');
    tl.to(el.querySelector('[data-flash]'), { opacity: 0, duration: 0.5 });
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { tl.kill(); finish(); } };
    addEventListener('keydown', onKey);
    return () => { tl.kill(); vortex.stop(); removeEventListener('keydown', onKey); };
  }, [active]);

  if (!active) return null;
  return (
    <div ref={root} className="fixed inset-0 z-[100] bg-ink" role="dialog" aria-label="Introducción" aria-live="off">
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" aria-hidden />
      <div data-term className="relative mx-auto flex h-full max-w-3xl flex-col justify-center px-6 font-mono text-[13px] leading-7 text-cal/90 sm:text-sm">
        {LINES.map((l) => <div key={l} data-line style={{ visibility: 'hidden' }} />)}
        <div className="mt-3 flex items-center gap-3">
          <div className="h-[3px] flex-1 bg-cal/10"><div data-bar className="h-full origin-left bg-naranja" style={{ transform: 'scaleX(0)' }} /></div>
          <span data-pct className="w-12 text-right text-cal">0%</span>
        </div>
        <div data-counters className="mt-8 grid grid-cols-2 gap-x-8 gap-y-3 opacity-0 sm:grid-cols-4">
          {COUNTERS.map((c) => (
            <div key={c.label}>
              <div className="text-[10px] tracking-[.18em] text-muted">{c.label}</div>
              <div data-count className="text-xl font-bold text-cal sm:text-2xl">{fmt(c.from, c.plain)}</div>
            </div>
          ))}
        </div>
      </div>
      <div data-flash className="pointer-events-none absolute inset-0 bg-[#FFE7D6] opacity-0" />
      <button onClick={finish} className="tech absolute bottom-[calc(24px+env(safe-area-inset-bottom))] right-6 border border-cal/30 px-4 py-2 text-cal hover:border-naranja hover:text-brasa">
        Saltar intro ↵
      </button>
    </div>
  );
}
