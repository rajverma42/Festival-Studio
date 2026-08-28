#!/usr/bin/env node
/* ============================================================================
   Festival Studio — asset renderer (development tool only)

   Rasterises every template preview and every per-festival social card using
   the real canvas engine, so the shipped site serves plain <img> files that
   Google can index and phones can lazy-load.

   Usage:
     python3 -m http.server 8123      # from the project root
     node tools/render-assets.js

   Run this on a machine WITH internet access the first time: the renderer
   loads Google Fonts, so the previews then match the live editor exactly.
   ========================================================================== */
'use strict';
const { chromium } = require('/home/claude/.npm-global/lib/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const BASE = process.env.BASE || 'http://localhost:8123';
const ROOT = path.resolve(__dirname, '..');
const OUT_TPL = path.join(ROOT, 'assets/templates');
const OUT_OG = path.join(ROOT, 'assets/og');
const WIDTH = Number(process.env.PREVIEW_WIDTH || 400);
const QUALITY = Number(process.env.PREVIEW_QUALITY || 0.72);

function save(dataUrl, file) {
  const b64 = dataUrl.split(',')[1];
  fs.writeFileSync(file, Buffer.from(b64, 'base64'));
  return fs.statSync(file).size;
}

(async () => {
  fs.mkdirSync(OUT_TPL, { recursive: true });
  fs.mkdirSync(OUT_OG, { recursive: true });

  const browser = await chromium.launch({
    executablePath: process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  page.on('pageerror', (e) => console.error('renderer error:', e.message));
  await page.goto(BASE + '/tools/_render.html', { waitUntil: 'load' });
  await page.waitForFunction(() => window.rendererReady === true);
  try { await page.evaluate(() => document.fonts.ready); } catch (e) { /* offline: fallback fonts */ }
  await page.waitForTimeout(600);

  const ids = await page.evaluate(() => window.allTemplateIds());
  let total = 0;
  for (const id of ids) {
    const url = await page.evaluate(
      ([i, w, q]) => window.renderTemplate(i, w, q), [id, WIDTH, QUALITY]);
    total += save(url, path.join(OUT_TPL, id + '.jpg'));
  }
  console.log(`templates: ${ids.length} previews, ${(total / 1048576).toFixed(2)} MB`);

  const slugs = await page.evaluate(() => window.allFestivalSlugs());
  let ogTotal = 0;
  for (const s of slugs) {
    const url = await page.evaluate((x) => window.renderOG(x, 0.82), s);
    ogTotal += save(url, path.join(OUT_OG, s + '.jpg'));
  }
  console.log(`social cards: ${slugs.length} images, ${(ogTotal / 1048576).toFixed(2)} MB`);

  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
