// Uso: node render.mjs <video 1-4> still <t1,t2,...> <outDir>
//      node render.mjs <video 1-4> frames <outDir> [fps=30] [dur=30]
import { createRequire } from 'module';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
const require = createRequire('/opt/node-tools/node_modules/');
const { chromium } = require('playwright');
const here = path.dirname(fileURLToPath(import.meta.url));
const [v, mode, a, b, c] = process.argv.slice(2);

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
await page.goto(`file://${here}/motion.html?v=${v}`);
await page.evaluate(() => document.fonts.ready);

if (mode === 'still') {
  fs.mkdirSync(b, { recursive: true });
  for (const t of a.split(',').map(Number)) {
    await page.evaluate(t => seek(t), t);
    await page.screenshot({ path: `${b}/v${v}_t${String(t).padStart(5, '0')}.jpg`, type: 'jpeg', quality: 85 });
  }
} else {
  const out = a, fps = +(b || 30), dur = +(c || 30);
  fs.mkdirSync(out, { recursive: true });
  const n = fps * dur;
  for (let i = 0; i < n; i++) {
    await page.evaluate(t => seek(t), i / fps);
    await page.screenshot({ path: `${out}/f${String(i).padStart(4, '0')}.jpg`, type: 'jpeg', quality: 92 });
  }
}
await browser.close();
