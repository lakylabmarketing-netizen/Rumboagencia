// Tras `next build`: genera out/_headers con las cabeceras de seguridad que Netlify sirve en cada página.
// La política de contenido (CSP) solo deja ejecutar los scripts de la propia web: los archivos de /_next
// y los scripts en línea que Next escribe en el HTML de cada página, identificados por su huella SHA-256.
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUT = 'out';
const htmlFiles = (dir) => readdirSync(dir).flatMap((f) => {
  const p = join(dir, f);
  return statSync(p).isDirectory() ? htmlFiles(p) : p.endsWith('.html') ? [p] : [];
});

// Huellas de los scripts en línea de cada página (cada página lleva su propia política, más corta)
const pageHashes = (file) => {
  const set = new Set();
  for (const [, attrs, body] of readFileSync(file, 'utf8').matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/\ssrc=/.test(attrs) || !body) continue;
    set.add(`'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`);
  }
  return [...set].sort();
};

const csp = (hashes) => [
  "default-src 'self'",
  `script-src 'self' ${hashes.join(' ')}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "media-src 'self'",
  "font-src 'self'",
  "connect-src 'self'",
  "form-action 'self'",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "manifest-src 'self'",
  'upgrade-insecure-requests',
].join('; ');

// Ruta pública de cada HTML: out/caso/index.html → /caso/ (y /caso), out/index.html → /
const routes = (file) => {
  const rel = file.slice(OUT.length).replace(/\\/g, '/');
  if (rel === '/index.html') return ['/'];
  if (rel.endsWith('/index.html')) { const r = rel.slice(0, -'index.html'.length); return [r, r.slice(0, -1)]; }
  return [rel, rel.replace(/\.html$/, '')];
};

let total = 0;
const seen = new Set();
const pageRules = htmlFiles(OUT).flatMap((file) => {
  const h = pageHashes(file); total += h.length;
  return routes(file).filter((r) => !seen.has(r) && seen.add(r)).map((r) => `${r}\n  Content-Security-Policy: ${csp(h)}\n`);
}).join('\n');

const headers = `${pageRules}
/*
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=(), browsing-topics=()
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Resource-Policy: same-origin
  X-Permitted-Cross-Domain-Policies: none
  X-DNS-Prefetch-Control: off

/_next/static/*
  Cache-Control: public, max-age=31536000, immutable

/fonts/*
  Cache-Control: public, max-age=31536000, immutable
`;
writeFileSync(join(OUT, '_headers'), headers);
console.log(`Cabeceras de seguridad escritas: ${htmlFiles(OUT).length} páginas, ${total} scripts en línea autorizados por huella.`);
