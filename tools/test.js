#!/usr/bin/env node
/* Festival Studio — headless smoke test (development tool only).
   node tools/test.js   (expects a static server on http://localhost:8123)  */
'use strict';
const { chromium, devices } = require('/home/claude/.npm-global/lib/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const BASE = process.env.BASE || 'http://localhost:8123';
const SHOTS = path.resolve(__dirname, '../.shots');
fs.mkdirSync(SHOTS, { recursive: true });

const PAGES = [
  '/', '/templates.html', '/post-maker.html', '/status-maker.html', '/gif-maker.html',
  '/calendar.html', '/how-it-works.html', '/about.html', '/contact.html', '/wishes.html',
  '/faq.html', '/advertise.html', '/privacy.html', '/cookies.html', '/terms.html',
  '/disclaimer.html', '/dmca.html', '/accessibility.html', '/licences.html',
  '/sitemap.html', '/404.html',
  '/diwali-post-maker/', '/holi-post-maker/', '/eid-post-maker/', '/diwali-gif-maker/',
  '/diwali-wishes/', '/holi-wishes/', '/raksha-bandhan-wishes/',
  '/hi/', '/hi/templates.html', '/hi/post-maker.html', '/hi/gif-maker.html',
  '/hi/status-maker.html', '/hi/calendar.html', '/hi/how-it-works.html',
  '/hi/about.html', '/hi/contact.html', '/hi/wishes.html', '/hi/diwali-post-maker/'
];

let failures = 0;
function ok(name, cond, extra) {
  console.log((cond ? '  PASS  ' : '  FAIL  ') + name + (extra ? ' — ' + extra : ''));
  if (!cond) failures++;
}

/* The sandbox has no outbound network, so Google Fonts requests fail here.
   Those are ignored; anything served by the site itself is not. */
function watch(page, bucket) {
  page.on('console', (m) => {
    if (m.type() !== 'error') return;
    const t = m.text();
    if (/Failed to load resource/.test(t)) return;   /* covered by the response hook below */
    bucket.push('console: ' + t);
  });
  page.on('pageerror', (e) => bucket.push('pageerror: ' + e.message));
  page.on('response', (r) => {
    const u = r.url();
    if (u.indexOf(BASE) === 0 && r.status() >= 400) bucket.push('HTTP ' + r.status() + ' ' + u);
  });
  page.on('requestfailed', (r) => {
    const u = r.url();
    const err = (r.failure() && r.failure().errorText) || '';
    /* lazy <img> requests are aborted when the grid re-renders — expected */
    if (err === 'net::ERR_ABORTED' && /\.(jpg|jpeg|png|webp|gif)(\?|$)/i.test(u)) return;
    if (u.indexOf(BASE) === 0) bucket.push('request failed: ' + u + ' ' + err);
  });
}

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });

  /* ---------- 1. every page loads clean on a phone ---------- */
  const phone = await browser.newContext(Object.assign({}, devices['Pixel 7'], { permissions: [] }));
  for (const p of PAGES) {
    const errs = [];
    const page = await phone.newPage();
    watch(page, errs);
    await page.goto(BASE + p, { waitUntil: 'load' });
    await page.waitForTimeout(1200);
    const title = await page.title();
    ok('load ' + p, errs.length === 0 && title.length > 10, errs.slice(0, 3).join(' | ') || title);
    await page.close();
  }

  /* ---------- 2. homepage interactions ---------- */
  {
    const errs = [];
    const page = await phone.newPage();
    watch(page, errs);
    await page.goto(BASE + '/', { waitUntil: 'load' });
    await page.waitForTimeout(1500);
    const cards = await page.locator('#festival-grid .fest-card').count();
    ok('home festival cards', cards === 18, cards + ' cards');
    const heroCanvas = await page.locator('#hero-art canvas').count();
    ok('home hero canvas rendered', heroCanvas === 1);
    await page.fill('#festival-search', 'holi');
    await page.waitForTimeout(350);
    const filtered = await page.locator('#festival-grid .fest-card').count();
    ok('home search filters', filtered >= 1 && filtered < 18, filtered + ' results');
    await page.fill('#festival-search', 'दीपावली');
    await page.waitForTimeout(350);
    ok('home search works in Hindi', (await page.locator('#festival-grid .fest-card').count()) === 1);
    /* theme toggle */
    await page.click('[data-theme-toggle]');
    await page.waitForTimeout(200);
    const theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    ok('theme toggles', theme === 'dark' || theme === 'light', theme);
    /* mobile menu */
    await page.click('#menu-btn');
    await page.waitForTimeout(350);
    ok('mobile drawer opens', await page.locator('#drawer[data-open="true"]').isVisible());
    await page.screenshot({ path: path.join(SHOTS, 'home-mobile.png'), fullPage: false });
    ok('home no console errors', errs.length === 0, errs.slice(0, 3).join(' | '));
    await page.close();
  }

  /* ---------- 3. templates page ---------- */
  {
    const errs = [];
    const page = await phone.newPage();
    watch(page, errs);
    await page.goto(BASE + '/templates.html', { waitUntil: 'load' });
    await page.waitForTimeout(1800);
    const n = await page.locator('#tpl-grid .tpl-card').count();
    ok('templates rendered', n === 24, n + ' cards');
    const previews = await page.locator('#tpl-grid .prev img').count();
    ok('template previews are static images', previews === 24, previews + ' images');
    /* Off-screen images are still lazy-loading, so check the files exist. */
    const missing = await page.evaluate(async () => {
      const urls = Array.from(document.querySelectorAll('#tpl-grid .prev img')).map(i => i.src);
      const bad = [];
      for (const u of urls) { const r = await fetch(u, { method: 'HEAD' }); if (!r.ok) bad.push(u); }
      return bad;
    });
    ok('every preview image file exists', missing.length === 0, missing.slice(0, 2).join(', '));
    const lazies = await page.evaluate(() =>
      Array.from(document.querySelectorAll('#tpl-grid .prev img')).filter(i => i.loading === 'lazy').length);
    ok('previews use native lazy loading', lazies === 24, lazies + ' lazy');
    await page.click('#tpl-more');
    await page.waitForTimeout(900);
    ok('load more works', (await page.locator('#tpl-grid .tpl-card').count()) === 48);
    await page.selectOption('#tpl-festival', 'holi');
    await page.waitForTimeout(700);
    ok('festival filter works', (await page.locator('#tpl-grid .tpl-card').count()) === 9);
    await page.screenshot({ path: path.join(SHOTS, 'templates-mobile.png') });
    ok('templates no console errors', errs.length === 0, errs.slice(0, 3).join(' | '));
    await page.close();
  }

  /* ---------- 4. editor: full workflow ---------- */
  {
    const errs = [];
    const page = await phone.newPage();
    watch(page, errs);
    await page.goto(BASE + '/post-maker.html?tpl=diwali--classic', { waitUntil: 'load' });
    await page.waitForTimeout(1800);

    const objCount = await page.evaluate(() => window.fsEditor.scene.objects.length);
    ok('template loaded into editor', objCount > 4, objCount + ' layers');

    /* add text */
    await page.click('#tab-text');
    await page.waitForTimeout(200);
    await page.locator('#panel-text button').first().click();
    await page.waitForTimeout(300);
    ok('add text layer', (await page.evaluate(() => window.fsEditor.scene.objects.length)) === objCount + 1);
    ok('new layer auto-selected', await page.evaluate(() => !!window.fsEditor.sel));

    /* edit text content */
    await page.fill('#prop-text', 'शुभ दीपावली Test');
    await page.waitForTimeout(300);
    ok('text edit applies', await page.evaluate(() => window.fsEditor.selected().text === 'शुभ दीपावली Test'));

    /* drag on canvas */
    const box = await page.locator('#canvas').boundingBox();
    const before = await page.evaluate(() => ({ x: window.fsEditor.selected().x, y: window.fsEditor.selected().y }));
    await page.mouse.move(box.x + box.width / 2, box.y + box.height * 0.45);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2 + 40, box.y + box.height * 0.45 + 30, { steps: 8 });
    await page.mouse.up();
    await page.waitForTimeout(300);
    const after = await page.evaluate(() => ({ x: window.fsEditor.selected().x, y: window.fsEditor.selected().y }));
    ok('drag moves a layer', Math.abs(after.x - before.x) > 5 || Math.abs(after.y - before.y) > 5,
      JSON.stringify(before) + ' -> ' + JSON.stringify(after));

    /* undo / redo */
    const n1 = await page.evaluate(() => window.fsEditor.scene.objects.length);
    await page.evaluate(() => window.fsEditor.undo());
    await page.evaluate(() => window.fsEditor.undo());
    await page.evaluate(() => window.fsEditor.undo());
    const n2 = await page.evaluate(() => window.fsEditor.scene.objects.length);
    ok('undo works', n2 <= n1, n1 + ' -> ' + n2);
    await page.evaluate(() => { window.fsEditor.redo(); window.fsEditor.redo(); window.fsEditor.redo(); });
    ok('redo works', (await page.evaluate(() => window.fsEditor.scene.objects.length)) === n1);

    /* stickers */
    await page.click('#tab-sticker');
    await page.waitForTimeout(300);
    const stickerTiles = await page.locator('#panel-sticker .tile').count();
    ok('sticker palette drawn', stickerTiles >= 45, stickerTiles + ' stickers');
    await page.locator('#panel-sticker .tile').first().click();
    await page.waitForTimeout(300);
    ok('sticker added', (await page.evaluate(() => window.fsEditor.scene.objects.filter(o => o.type === 'sticker').length)) >= 1);

    /* shapes */
    await page.click('#tab-shape');
    await page.waitForTimeout(200);
    await page.locator('#panel-shape .tile').nth(2).click();
    await page.waitForTimeout(250);
    ok('shape added', (await page.evaluate(() => window.fsEditor.scene.objects.filter(o => o.type === 'shape').length)) >= 1);

    /* image upload via synthetic file */
    await page.evaluate(async () => {
      const c = document.createElement('canvas'); c.width = c.height = 240;
      const x = c.getContext('2d');
      x.fillStyle = '#2196F3'; x.fillRect(0, 0, 240, 240);
      x.fillStyle = '#fff'; x.font = 'bold 40px sans-serif'; x.fillText('PIC', 70, 130);
      const blob = await new Promise(r => c.toBlob(r, 'image/png'));
      const src = await new Promise(r => { const fr = new FileReader(); fr.onload = () => r(fr.result); fr.readAsDataURL(blob); });
      const img = new Image();
      await new Promise(r => { img.onload = r; img.src = src; });
      const id = window.FS.Assets.add(src, img);
      window.fsEditor.add(window.FS.defaults.image({ asset: id, w: 400, h: 400, x: 100, y: 100, name: 'Test photo' }));
    });
    await page.waitForTimeout(300);
    ok('image layer added', (await page.evaluate(() => window.fsEditor.scene.objects.filter(o => o.type === 'image' && o.asset).length)) >= 1);

    /* layers panel */
    await page.click('#tab-layers');
    await page.waitForTimeout(300);
    const layerRows = await page.locator('#panel-layers .layer').count();
    ok('layer list populated', layerRows >= 5, layerRows + ' rows');
    await page.locator('#panel-layers .layer .mini').first().click();  /* hide */
    await page.waitForTimeout(200);
    ok('layer hide toggles', (await page.evaluate(() => window.fsEditor.scene.objects.some(o => o.hidden))));

    /* background */
    await page.click('#tab-bg');
    await page.waitForTimeout(400);
    const bgTiles = await page.locator('#panel-bg .tile').count();
    ok('background presets drawn', bgTiles >= 18, bgTiles + ' presets');
    await page.locator('#panel-bg .tile').nth(3).click();
    await page.waitForTimeout(300);

    /* export PNG */
    await page.click('#tab-export');
    await page.waitForTimeout(300);
    const dl = page.waitForEvent('download', { timeout: 15000 });
    await page.locator('#panel-export button:has-text("Download image")').click();
    const d = await dl;
    const fname = d.suggestedFilename();
    ok('PNG export downloads', /^diwali-festival-post\.png$/.test(fname), fname);
    const p2 = path.join(SHOTS, 'export.png');
    await d.saveAs(p2);
    const size = fs.statSync(p2).size;
    ok('exported PNG has content', size > 40000, size + ' bytes');

    /* draft save + list */
    await page.evaluate(() => window.fsEditor.saveDraft());
    await page.waitForTimeout(400);
    ok('draft saved to localStorage', (await page.evaluate(() => (JSON.parse(localStorage.getItem('fs:drafts') || '[]')).length)) === 1);

    await page.screenshot({ path: path.join(SHOTS, 'editor-mobile.png') });
    ok('editor no console errors', errs.length === 0, errs.slice(0, 4).join(' | '));
    await page.close();
  }

  /* ---------- 5. GIF maker ---------- */
  {
    const errs = [];
    const page = await phone.newPage();
    watch(page, errs);
    await page.goto(BASE + '/gif-maker.html?festival=diwali', { waitUntil: 'load' });
    await page.waitForTimeout(1500);
    await page.selectOption('select[aria-label="Frames per second"]', '8');
    await page.selectOption('select[aria-label="Duration"]', '1.5');
    await page.selectOption('select[aria-label="GIF size"]', '260');
    await page.waitForTimeout(200);
    await page.click('#btn-generate');
    await page.waitForSelector('#gif-panel img', { timeout: 90000 });
    const src = await page.locator('#gif-panel img').getAttribute('src');
    ok('GIF generated', !!src && src.indexOf('blob:') === 0);
    const gifInfo = await page.evaluate(async () => {
      const img = document.querySelector('#gif-panel img');
      const r = await fetch(img.src);
      const buf = new Uint8Array(await r.arrayBuffer());
      const head = String.fromCharCode.apply(null, buf.slice(0, 6));
      /* count image descriptor blocks as a rough frame count */
      let frames = 0;
      for (let i = 0; i < buf.length - 1; i++) if (buf[i] === 0x21 && buf[i + 1] === 0xF9) frames++;
      return { head, size: buf.length, frames, w: img.naturalWidth, h: img.naturalHeight };
    });
    ok('GIF header valid', gifInfo.head === 'GIF89a', gifInfo.head);
    ok('GIF has frames', gifInfo.frames >= 10, gifInfo.frames + ' frames');
    ok('GIF renders in <img>', gifInfo.w === 260 && gifInfo.h > 0, gifInfo.w + 'x' + gifInfo.h);
    ok('GIF size sane', gifInfo.size > 5000 && gifInfo.size < 12 * 1024 * 1024, Math.round(gifInfo.size / 1024) + ' KB');
    fs.writeFileSync(path.join(SHOTS, 'gif-info.json'), JSON.stringify(gifInfo, null, 2));
    await page.screenshot({ path: path.join(SHOTS, 'gif-mobile.png') });
    ok('gif maker no console errors', errs.length === 0, errs.slice(0, 3).join(' | '));
    await page.close();
  }

  /* ---------- 6. status maker + handoff ---------- */
  {
    const errs = [];
    const page = await phone.newPage();
    watch(page, errs);
    await page.goto(BASE + '/status-maker.html', { waitUntil: 'load' });
    await page.waitForTimeout(1500);
    const dims = await page.evaluate(() => [window.fsEditor.scene.width, window.fsEditor.scene.height]);
    ok('status canvas is 1080x1920', dims[0] === 1080 && dims[1] === 1920, dims.join('x'));
    await page.click('#tab-export');
    await page.waitForTimeout(300);
    await page.locator('#panel-export button:has-text("Animate this design")').click();
    await page.waitForTimeout(2500);
    ok('handoff to GIF maker', page.url().indexOf('gif-maker.html?from=handoff') > -1, page.url());
    await page.waitForTimeout(1200);
    ok('handoff scene loaded tall', (await page.evaluate(() => window.FS && document.getElementById('canvas').height > document.getElementById('canvas').width)));
    ok('status/handoff no console errors', errs.length === 0, errs.slice(0, 3).join(' | '));
    await page.close();
  }

  /* ---------- 7. desktop layout + keyboard ---------- */
  {
    const errs = [];
    const desk = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await desk.newPage();
    watch(page, errs);
    await page.goto(BASE + '/post-maker.html?festival=holi', { waitUntil: 'load' });
    await page.waitForTimeout(1600);
    ok('desktop nav visible', await page.locator('.nav').first().isVisible());
    const n0 = await page.evaluate(() => window.fsEditor.scene.objects.length);
    await page.evaluate(() => window.fsEditor.select(window.fsEditor.scene.objects[2].id));
    await page.keyboard.press('Control+d');
    await page.waitForTimeout(300);
    ok('Ctrl+D duplicates', (await page.evaluate(() => window.fsEditor.scene.objects.length)) === n0 + 1);
    await page.keyboard.press('Delete');
    await page.waitForTimeout(300);
    ok('Delete removes layer', (await page.evaluate(() => window.fsEditor.scene.objects.length)) === n0);
    await page.keyboard.press('Control+z');
    await page.waitForTimeout(300);
    ok('Ctrl+Z undoes', (await page.evaluate(() => window.fsEditor.scene.objects.length)) === n0 + 1);
    await page.screenshot({ path: path.join(SHOTS, 'editor-desktop.png') });

    await page.goto(BASE + '/', { waitUntil: 'load' });
    await page.waitForTimeout(1600);
    await page.screenshot({ path: path.join(SHOTS, 'home-desktop.png'), fullPage: false });
    ok('desktop no console errors', errs.length === 0, errs.slice(0, 3).join(' | '));
    await page.close();
    await desk.close();
  }

  /* ---------- 7b. quick wizard (photo → festival → template → name) ---------- */
  {
    const errs = [];
    const page = await phone.newPage();
    watch(page, errs);
    await page.goto(BASE + '/post-maker.html?quick=1', { waitUntil: 'load' });
    await page.waitForTimeout(1800);
    ok('quick wizard opens', await page.locator('.modal-back').isVisible());
    await page.locator('.wizard-nav button:has-text("Next")').click();       /* skip photo */
    await page.waitForTimeout(200);
    await page.locator('.wizard-step[data-active="true"] .tile').nth(1).click();  /* festival */
    await page.locator('.wizard-nav button:has-text("Next")').click();
    await page.waitForTimeout(900);
    ok('wizard shows template previews', (await page.locator('.wizard-step[data-active="true"] canvas').count()) > 0);
    await page.locator('.wizard-step[data-active="true"] .tile').first().click();
    await page.locator('.wizard-nav button:has-text("Next")').click();
    await page.waitForTimeout(200);
    await page.fill('.wizard-step[data-active="true"] input', 'Ritesh Kumar');
    await page.locator('.wizard-nav button:has-text("Generate")').click();
    await page.waitForTimeout(800);
    ok('wizard closes on generate', (await page.locator('.modal-back').count()) === 0);
    ok('wizard applied the name',
      await page.evaluate(() => window.fsEditor.scene.objects.some(o => o.type === 'text' && /Ritesh Kumar/.test(o.text))));
    ok('quick wizard no console errors', errs.length === 0, errs.slice(0, 3).join(' | '));
    await page.close();
  }

  /* ---------- 7c. festival landing page + offline support ---------- */
  {
    const errs = [];
    const page = await phone.newPage();
    watch(page, errs);
    await page.goto(BASE + '/diwali-post-maker/', { waitUntil: 'load' });
    await page.waitForTimeout(2200);
    ok('festival page templates', (await page.locator('#fest-templates .tpl-card').count()) === 9);
    const fMissing = await page.evaluate(async () => {
      const urls = Array.from(document.querySelectorAll('#fest-templates img')).map(i => i.src);
      const bad = [];
      for (const u of urls) { const r = await fetch(u, { method: 'HEAD' }); if (!r.ok) bad.push(u); }
      return bad;
    });
    ok('festival preview files exist', fMissing.length === 0, fMissing.join(', '));
    ok('festival countdown shown', ((await page.locator('#fest-countdown').textContent()) || '').length > 5);
    ok('festival wishes indexed in HTML', (await page.locator('.prose ul li').count()) >= 6);
    ok('festival FAQ present', (await page.locator('details.faq').count()) === 5);
    const sw = await page.evaluate(() => navigator.serviceWorker.getRegistrations().then(r => r.length));
    ok('service worker registered', sw >= 1, sw + ' registration(s)');
    await page.screenshot({ path: path.join(SHOTS, 'festival-mobile.png') });
    ok('festival page no console errors', errs.length === 0, errs.slice(0, 3).join(' | '));
    await page.close();
  }

  /* ---------- 7d. Hindi pages, wishes pages, snapping, worker GIF ---------- */
  {
    const errs = [];
    const page = await phone.newPage();
    watch(page, errs);

    /* Hindi home */
    await page.goto(BASE + '/hi/', { waitUntil: 'load' });
    await page.waitForTimeout(1400);
    ok('hindi home lang attr', (await page.getAttribute('html', 'lang')) === 'hi');
    ok('hindi nav is translated', (await page.locator('.nav a').first().textContent()).trim() === 'होम');
    ok('hindi hreflang present', (await page.locator('link[rel=alternate][hreflang=en]').count()) === 1);
    ok('hindi festival cards', (await page.locator('#festival-grid .fest-card').count()) === 18);
    const firstCard = (await page.locator('#festival-grid .fest-card .meta strong').first().textContent()).trim();
    ok('festival names shown in Hindi', /[\u0900-\u097F]/.test(firstCard), firstCard);
    const enHref = await page.locator('[data-lang-switch]').getAttribute('href');
    ok('language switcher is relative', /^\.\.\/?$/.test(enHref || ''), enHref);
    await page.locator('[data-lang-switch]').click();
    await page.waitForTimeout(900);
    ok('language switch reaches English home', (await page.getAttribute('html', 'lang')) === 'en-IN', page.url());
    await page.goBack();
    await page.waitForTimeout(600);

    /* Hindi editor UI */
    await page.goto(BASE + '/hi/post-maker.html', { waitUntil: 'load' });
    await page.waitForTimeout(1600);
    const tabText = (await page.locator('#tab-design span').textContent()).trim();
    ok('editor tabs translated', tabText === 'डिज़ाइन', tabText);
    await page.click('#tab-export');
    await page.waitForTimeout(300);
    const dlLabel = (await page.locator('#panel-export .btn-primary').first().textContent()).trim();
    ok('export button translated', dlLabel.indexOf('डाउनलोड') > -1, dlLabel);

    /* wishes page */
    await page.goto(BASE + '/diwali-wishes/', { waitUntil: 'load' });
    await page.waitForTimeout(900);
    const wishCount = await page.locator('.wish-list li').count();
    ok('wishes page lists messages', wishCount >= 25, wishCount + ' wishes');
    ok('wishes page has copy buttons', (await page.locator('.wish-list .copy').count()) === wishCount);
    await page.locator('.wish-list .copy').first().click();
    await page.waitForTimeout(400);
    ok('copy button responds', (await page.locator('.toast').count()) >= 1);

    /* Hindi festival landing page must use the Devanagari festival name */
    await page.goto(BASE + '/hi/diwali-post-maker/', { waitUntil: 'load' });
    await page.waitForTimeout(900);
    const hiTitle = await page.title();
    const hiH1 = (await page.locator('h1').first().textContent()).trim();
    ok('hindi festival title uses Devanagari name', hiTitle.indexOf('दीपावली') === 0, hiTitle);
    ok('hindi festival H1 uses Devanagari name', hiH1.indexOf('दीपावली') === 0, hiH1);
    ok('hindi festival page has no English intro', !/The festival of lights/.test(await page.content()));

    ok('hindi/wishes no console errors', errs.length === 0, errs.slice(0, 3).join(' | '));
    await page.close();
  }

  /* ---------- 7e. snapping + text autofit ---------- */
  {
    const errs = [];
    const page = await phone.newPage();
    watch(page, errs);
    await page.goto(BASE + '/post-maker.html?festival=diwali', { waitUntil: 'load' });
    await page.waitForTimeout(1600);
    const snapped = await page.evaluate(() => {
      const ed = window.fsEditor;
      const o = ed.scene.objects.find(x => x.type === 'text');
      o.x = ed.scene.width / 2 - o.w / 2 + 5;          /* 5px off centre */
      ed.snap(o, 12);
      return { x: o.x, want: ed.scene.width / 2 - o.w / 2, guides: (ed.guides || []).length };
    });
    ok('layers snap to canvas centre', Math.abs(snapped.x - snapped.want) < 0.5 && snapped.guides >= 1,
      JSON.stringify(snapped));
    const fitted = await page.evaluate(() => {
      const ed = window.fsEditor;
      const o = ed.scene.objects.find(x => x.type === 'text');
      o.text = 'बहुत लंबा टेक्स्ट '.repeat(30);
      o.y = ed.scene.height * 0.72;
      const before = window.FS.objH(o);
      ed.fitText(o);
      return { before, after: window.FS.objH(o), limit: ed.scene.height - o.y };
    });
    ok('text auto-fit shrinks to fit', fitted.after < fitted.before && fitted.after <= fitted.limit, JSON.stringify(fitted));
    ok('snap/autofit no console errors', errs.length === 0, errs.slice(0, 3).join(' | '));
    await page.close();
  }

  /* ---------- 7f. GIF encoding really uses the Web Worker ---------- */
  {
    const errs = [];
    const page = await phone.newPage();
    watch(page, errs);
    await page.goto(BASE + '/gif-maker.html?festival=holi', { waitUntil: 'load' });
    await page.waitForTimeout(1500);
    const workers = [];
    page.on('worker', (w) => workers.push(w.url()));
    await page.selectOption('select[aria-label="Frames per second"]', '8');
    await page.selectOption('select[aria-label="Duration"]', '1.5');
    await page.selectOption('select[aria-label="GIF size"]', '260');
    await page.click('#btn-generate');
    await page.waitForSelector('#gif-panel img', { timeout: 90000 });
    ok('GIF encoded in a Web Worker', workers.some((u) => /gif-worker\.js/.test(u)), workers.join(','));
    /* Walk the real GIF block structure — counting raw 0x21F9 byte pairs
       gives false positives inside the LZW stream. */
    const info = await page.evaluate(async () => {
      const r = await fetch(document.querySelector('#gif-panel img').src);
      const b = new Uint8Array(await r.arrayBuffer());
      const head = String.fromCharCode.apply(null, b.slice(0, 6));
      let i = 6;
      const flags = b[i + 4];
      i += 7;                                        /* logical screen descriptor */
      if (flags & 0x80) i += 3 * (1 << ((flags & 7) + 1));
      const skipSub = () => { while (b[i]) i += b[i] + 1; i++; };
      let frames = 0, guard = 0;
      while (i < b.length && b[i] !== 0x3B && guard++ < 5000) {
        if (b[i] === 0x21) { i += 2; skipSub(); }
        else if (b[i] === 0x2C) {
          frames++;
          const f2 = b[i + 9];
          i += 10;
          if (f2 & 0x80) i += 3 * (1 << ((f2 & 7) + 1));
          i += 1;                                    /* LZW min code size */
          skipSub();
        } else break;
      }
      return { head, frames, size: b.length, tail: b[b.length - 1], parsedTo: i, len: b.length };
    });
    ok('worker GIF header valid', info.head === 'GIF89a', info.head);
    ok('worker GIF has trailer', info.tail === 0x3B, '0x' + info.tail.toString(16));
    ok('worker GIF frame count', info.frames === 12, info.frames + ' frames');
    ok('worker GIF structure parses cleanly', info.parsedTo === info.len - 1, info.parsedTo + '/' + info.len);
    ok('worker gif no console errors', errs.length === 0, errs.slice(0, 3).join(' | '));
    await page.close();
  }

  /* ---------- 8. SEO metadata ---------- */
  {
    const page = await phone.newPage();
    for (const p of ['/', '/diwali-post-maker/', '/templates.html', '/diwali-wishes/', '/hi/', '/faq.html']) {
      await page.goto(BASE + p, { waitUntil: 'load' });
      const meta = await page.evaluate(() => ({
        desc: (document.querySelector('meta[name=description]') || {}).content,
        og: (document.querySelector('meta[property="og:title"]') || {}).content,
        tw: (document.querySelector('meta[name="twitter:card"]') || {}).content,
        canon: (document.querySelector('link[rel=canonical]') || {}).href,
        h1: document.querySelectorAll('h1').length,
        ld: document.querySelectorAll('script[type="application/ld+json"]').length
      }));
      ok('SEO meta ' + p, !!meta.desc && !!meta.og && !!meta.tw && !!meta.canon && meta.h1 === 1,
        JSON.stringify(meta));
    }
    await page.close();
  }

  await phone.close();
  await browser.close();
  console.log(failures ? '\n' + failures + ' CHECK(S) FAILED' : '\nALL CHECKS PASSED');
  process.exit(failures ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
