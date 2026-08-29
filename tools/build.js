#!/usr/bin/env node
/* ============================================================================
   Festival Studio — static page generator (development tool only).

   One page body per template, rendered once per language from tools/strings.js,
   so English and हिन्दी can never drift apart. Produces every .html page,
   robots.txt, sitemap.xml, ads.txt, humans.txt and security.txt.

   Run:  node tools/build.js
         SITE_URL="https://you.github.io/festival-studio" node tools/build.js
   ========================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const STR = require('./strings');

/* ---- EDIT ME (or pass SITE_URL=… on the command line) ------------------- */
const SITE = (process.env.SITE_URL || 'https://example.github.io/festival-studio').replace(/\/$/, '');
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'hello@festivalstudio.example';
/* Paste the token from Google Search Console → HTML tag verification.       */
const GOOGLE_VERIFY = process.env.GOOGLE_VERIFY || '';
const BING_VERIFY = process.env.BING_VERIFY || '';

/* ---- load the festival + wishes data ------------------------------------ */
const sandbox = { window: {} };
sandbox.window.window = sandbox.window;
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'js/festivals.js'), 'utf8'), sandbox);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'js/wishes.js'), 'utf8'), sandbox);
const FS = sandbox.window.FS;
const FESTIVALS = FS.FESTIVALS;

const GIF_FESTIVALS = ['diwali', 'holi', 'eid', 'raksha-bandhan', 'ganesh-chaturthi', 'navratri', 'janmashtami', 'chhath-puja'];
const LANGS = ['en', 'hi'];

/* ---- helpers ------------------------------------------------------------ */
const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const fmt = (tpl, vars) => String(tpl).replace(/\{(\w+)\}/g, (m, k) => (vars && vars[k] != null ? vars[k] : m));

function write(rel, html) {
  const out = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
}

const pages = [];          /* { path, lang, alt } — collected for the sitemap */

/* depth-aware paths */
function ctx(pagePath, lang) {
  const depth = pagePath.split('/').filter(Boolean).length - (pagePath.endsWith('.html') ? 1 : 0);
  const base = '../'.repeat(Math.max(0, depth));
  const navBase = '../'.repeat(Math.max(0, depth - (lang === 'hi' ? 1 : 0)));
  return { base, navBase, lang, S: STR[lang] };
}

/* ------------------------------------------------------------------------ */
/* Shared chrome                                                             */
/* ------------------------------------------------------------------------ */
const LOGO = (c) => `
<a class="logo" href="${c.navBase}index.html" aria-label="Festival Studio">
  <img class="logo-mark" src="${c.base}assets/icons/logo-96.png" width="48" height="48" alt="Festival Studio logo" decoding="async">
  <span>Festival <b>Studio</b><small>${esc(c.lang === 'hi' ? 'मुफ़्त त्योहार पोस्ट मेकर' : 'Free festival post maker')}</small></span>
</a>`;

function navItems(c) {
  const n = c.S.nav;
  return [
    ['index.html', n.home],
    ['templates.html', n.templates],
    ['post-maker.html', n.postMaker],
    ['gif-maker.html', n.gifMaker],
    ['status-maker.html', n.statusMaker],
    ['wishes.html', n.wishes],
    ['how-it-works.html', n.howItWorks]
  ];
}

const HEADER = (c, altHref) => `
<a class="skip-link" href="#main">${esc(c.S.common.skip)}</a>
<header class="site-header">
  <div class="wrap header-inner">
    ${LOGO(c)}
    <nav class="nav" aria-label="Primary">
      ${navItems(c).map(([h, l]) => `<a href="${c.navBase}${h}">${esc(l)}</a>`).join('\n      ')}
    </nav>
    <div class="header-actions">
      ${altHref ? `<a class="lang-pill" data-lang-switch href="${altHref}" hreflang="${c.lang === 'hi' ? 'en' : 'hi'}" lang="${c.lang === 'hi' ? 'en' : 'hi'}">${esc(c.S.otherLangName)}</a>` : ''}
      <button class="icon-btn" type="button" data-theme-toggle aria-label="${esc(c.S.common.theme)}">
        <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/></svg>
      </button>
      <button class="icon-btn" type="button" id="menu-btn" aria-label="${esc(c.S.common.menu)}" aria-expanded="false" aria-controls="drawer">
        <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
      </button>
    </div>
  </div>
</header>
<nav class="drawer" id="drawer" data-open="false" aria-label="Mobile">
  ${navItems(c).concat([['calendar.html', c.S.nav.calendar], ['about.html', c.S.nav.about], ['contact.html', c.S.nav.contact]])
    .map(([h, l]) => `<a href="${c.navBase}${h}">${esc(l)}</a>`).join('\n  ')}
  ${c.lang === 'en' ? `<a href="${c.base}faq.html">${esc(c.S.nav.faq)}</a>` : ''}
</nav>`;

const FOOTER = (c) => `
<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div class="footer-about">
        ${LOGO(c)}
        <p style="margin-top:12px">${esc(c.S.footer.blurb)}</p>
        <button class="btn btn-soft btn-sm" type="button" data-install hidden style="margin-top:10px">${esc(c.S.footer.install)}</button>
      </div>
      <div>
        <h4>${esc(c.S.footer.studio)}</h4>
        <ul>
          <li><a href="${c.navBase}about.html">${esc(c.S.nav.about)}</a></li>
          <li><a href="${c.navBase}contact.html">${esc(c.S.nav.contact)}</a></li>
          <li><a href="${c.navBase}how-it-works.html">${esc(c.S.nav.howItWorks)}</a></li>
          <li><a href="${c.base}faq.html">${esc(c.S.nav.faq)}</a></li>
          <li><a href="${c.base}advertise.html">${esc(c.S.legalNav.advertise)}</a></li>
        </ul>
      </div>
      <div>
        <h4>${esc(c.S.footer.tools)}</h4>
        <ul>
          <li><a href="${c.navBase}post-maker.html">${esc(c.S.nav.postMaker)}</a></li>
          <li><a href="${c.navBase}gif-maker.html">${esc(c.S.nav.gifMaker)}</a></li>
          <li><a href="${c.navBase}status-maker.html">${esc(c.S.nav.statusMaker)}</a></li>
          <li><a href="${c.navBase}templates.html">${esc(c.S.nav.templates)}</a></li>
          <li><a href="${c.navBase}wishes.html">${esc(c.S.nav.wishes)}</a></li>
          <li><a href="${c.navBase}calendar.html">${esc(c.S.nav.calendar)}</a></li>
        </ul>
      </div>
      <div>
        <h4>${esc(c.S.footer.legal)}</h4>
        <ul>
          <li><a href="${c.base}privacy.html">${esc(c.S.legalNav.privacy)}</a></li>
          <li><a href="${c.base}cookies.html">${esc(c.S.legalNav.cookies)}</a></li>
          <li><a href="${c.base}terms.html">${esc(c.S.legalNav.terms)}</a></li>
          <li><a href="${c.base}disclaimer.html">${esc(c.S.legalNav.disclaimer)}</a></li>
          <li><a href="${c.base}dmca.html">${esc(c.S.legalNav.dmca)}</a></li>
          <li><a href="${c.base}accessibility.html">${esc(c.S.legalNav.accessibility)}</a></li>
          <li><a href="${c.base}licences.html">${esc(c.S.legalNav.licences)}</a></li>
          <li><a href="${c.base}sitemap.html">${esc(c.S.legalNav.sitemap)}</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>${fmt(esc(c.S.footer.rights), { year: '<span id="year">2026</span>' })}</span>
      <span>${esc(c.S.footer.made)}</span>
    </div>
  </div>
</footer>`;

const AD = (slot, size = 'leaderboard', S) => `
<!-- Ad placeholder: your ad network snippet is injected here by js/app.js
     once the visitor accepts the cookie notice (see js/config.js). -->
<div class="ad-slot" data-size="${size}" data-ad-slot="${slot}" aria-label="Advertisement area">
  ${esc((S && S.common.ad) || 'AD SLOT')}<small>${slot}</small>
</div>`;

const EDITOR_SHELL = (title, panelsId, extra) => `
<div class="editor-shell">
  <div class="editor-bar">
    <span class="title">${esc(title)}</span>
    ${extra || ''}
  </div>
  <div class="editor-main">
    <div class="stage-wrap">
      <div class="stage" id="stage"><canvas id="canvas" role="img" aria-label="Design canvas"></canvas></div>
    </div>
    <aside class="dock" aria-label="Design tools">
      ${panelsId === 'gif-panel'
    ? '<div class="panels" id="gif-panel"></div>'
    : '<div class="tabrail" id="tabrail"></div><div class="panels" id="panels"></div>'}
    </aside>
  </div>
</div>`;

const BAR_BUTTONS = (S) => `
<button class="btn btn-soft btn-sm" id="btn-quick" type="button">${esc(S.common.quick)}</button>
<button class="icon-btn" id="btn-undo" type="button" aria-label="Undo (Ctrl+Z)">
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 7L4 12l5 5"/><path d="M4 12h11a5 5 0 0 1 0 10h-3"/></svg>
</button>
<button class="icon-btn" id="btn-redo" type="button" aria-label="Redo (Ctrl+Y)">
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 7l5 5-5 5"/><path d="M20 12H9a5 5 0 0 0 0 10h3"/></svg>
</button>
<button class="btn btn-primary btn-sm" id="btn-download" type="button">${esc(S.common.createPost === 'Create Festival Post' ? 'Download' : 'डाउनलोड')}</button>`;

/* ------------------------------------------------------------------------ */
/* Page shell                                                                */
/* ------------------------------------------------------------------------ */
function page(opts) {
  const c = ctx(opts.path, opts.lang || 'en');
  const b = c.base;
  const canonical = SITE + '/' + opts.path;
  const scripts = (opts.scripts || []).map((s) => `<script src="${b}js/${s}" defer></script>`).join('\n  ');
  const jsonld = (opts.jsonld || []).map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n  ');
  const ogImage = SITE + '/' + (opts.ogImage || 'assets/icons/og-image.png');
  const alts = opts.alternates || [];
  const altHref = opts.altHref || null;

  if (!opts.noindex) pages.push({ path: opts.path, lang: c.lang, alternates: alts });

  return `<!DOCTYPE html>
<html lang="${c.S.htmlLang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(opts.title)}</title>
  <meta name="description" content="${esc(opts.description)}">
  <meta name="theme-color" content="#FBF7F4">
  <link rel="canonical" href="${canonical}">
  <meta name="robots" content="${opts.noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large,max-snippet:-1'}">
${alts.map((a) => `  <link rel="alternate" hreflang="${a.lang}" href="${SITE}/${a.path}">`).join('\n')}
${alts.length ? `  <link rel="alternate" hreflang="x-default" href="${SITE}/${alts.find((a) => a.lang === 'en').path}">` : ''}
${GOOGLE_VERIFY ? `  <meta name="google-site-verification" content="${esc(GOOGLE_VERIFY)}">` : ''}
${BING_VERIFY ? `  <meta name="msvalidate.01" content="${esc(BING_VERIFY)}">` : ''}
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Festival Studio">
  <meta property="og:title" content="${esc(opts.title)}">
  <meta property="og:description" content="${esc(opts.description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale" content="${c.lang === 'hi' ? 'hi_IN' : 'en_IN'}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(opts.title)}">
  <meta name="twitter:description" content="${esc(opts.description)}">
  <meta name="twitter:image" content="${ogImage}">
  <link rel="icon" href="${b}assets/icons/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="32x32" href="${b}assets/icons/favicon-32.png">
  <link rel="icon" type="image/png" sizes="192x192" href="${b}assets/icons/icon-192.png">
  <link rel="apple-touch-icon" sizes="180x180" href="${b}assets/icons/apple-touch-icon.png">
  <meta name="apple-mobile-web-app-title" content="Festival Studio">
  <meta name="application-name" content="Festival Studio">
  <link rel="manifest" href="${b}manifest.webmanifest">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,600&family=Noto+Sans+Devanagari:wght@400;600;700&family=Tiro+Devanagari+Hindi&family=Mukta:wght@400;700&family=Rozha+One&family=Baloo+2:wght@600;700&family=Playfair+Display:wght@600;700&family=Anton&display=swap">
  <link rel="stylesheet" href="${b}css/style.css">
  <script>
    (function(){try{var p=JSON.parse(localStorage.getItem('fs:prefs')||'{}');var t=p.theme||(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();
  </script>
  ${jsonld}
</head>
<body>
${HEADER(c, altHref)}
<main id="main">
${opts.body}
</main>
${FOOTER(c)}
  <script src="${b}js/config.js" defer></script>
  <script src="${b}js/storage.js" defer></script>
  <script src="${b}js/i18n.js" defer></script>
  <script src="${b}js/festivals.js" defer></script>
  <script src="${b}js/wishes.js" defer></script>
  <script src="${b}js/stickers.js" defer></script>
  <script src="${b}js/engine.js" defer></script>
  <script src="${b}js/templates.js" defer></script>
  <script src="${b}js/app.js" defer></script>
  ${scripts}
</body>
</html>
`;
}

/* Build the same page in both languages. `make(c)` returns the page options. */
function bilingual(enPath, hiPath, make, opts) {
  const alternates = [{ lang: 'en', path: enPath }, { lang: 'hi', path: hiPath }];
  LANGS.forEach((lang) => {
    const p = lang === 'en' ? enPath : hiPath;
    const other = lang === 'en' ? hiPath : enPath;
    const c = ctx(p, lang);
    const cfg = make(c);
    const otherHref = c.base + other.replace(/index\.html$/, '');
    const file = p === '' ? 'index.html' : (p.endsWith('/') ? p + 'index.html' : p);
    write(file, page(Object.assign({
      path: p, lang: lang, alternates: alternates,
      altHref: otherHref || './'
    }, cfg, opts || {})));
  });
}

/* ------------------------------------------------------------------------ */
/* HOME                                                                      */
/* ------------------------------------------------------------------------ */
bilingual('', 'hi/', (c) => {
  const S = c.S;
  return {
    title: S.home.title,
    description: S.home.desc,
    jsonld: [
      {
        '@context': 'https://schema.org', '@type': 'WebApplication',
        name: 'Festival Studio', url: SITE + '/', inLanguage: c.lang,
        applicationCategory: 'DesignApplication', operatingSystem: 'Any (web browser)',
        description: S.home.desc, image: SITE + '/assets/icons/og-image.png',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        featureList: ['Festival post maker', 'Animated GIF maker', 'WhatsApp status maker', 'Hindi and English templates', 'No signup required']
      },
      {
        '@context': 'https://schema.org', '@type': 'Organization',
        name: 'Festival Studio', url: SITE + '/',
        logo: { '@type': 'ImageObject', url: SITE + '/assets/icons/icon-512.png', width: 512, height: 512 }
      },
      {
        '@context': 'https://schema.org', '@type': 'WebSite',
        name: 'Festival Studio', url: SITE + '/',
        potentialAction: {
          '@type': 'SearchAction',
          target: { '@type': 'EntryPoint', urlTemplate: SITE + '/templates.html?festival={search_term_string}' },
          'query-input': 'required name=search_term_string'
        }
      }
    ],
    body: `
<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <div class="badge-row">${S.home.badges.map((b) => `<span class="badge">${b}</span>`).join('')}</div>
      <h1>${esc(S.home.h1a)}<span class="grad">${esc(S.home.h1grad)}</span>${esc(S.home.h1b)}</h1>
      <p class="hero-sub">${esc(S.home.sub)}</p>
      <div class="btn-row">
        <a class="btn btn-primary btn-lg" href="${c.navBase}post-maker.html">${esc(S.common.createPost)}</a>
        <a class="btn btn-dark btn-lg" href="${c.navBase}gif-maker.html">${esc(S.common.createGif)}</a>
        <a class="btn btn-ghost btn-lg" href="${c.navBase}status-maker.html">${esc(S.common.createStatus)}</a>
      </div>
      <div class="privacy-note" style="max-width:540px">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/></svg>
        <span>${esc(S.home.privacy)}</span>
      </div>
    </div>
    <div class="hero-art">
      <div class="frame" id="hero-art"></div>
      <span class="float-chip a">🪔 18 ${c.lang === 'hi' ? 'त्योहार' : 'festivals'}</span>
      <span class="float-chip b">🎞️ ${c.lang === 'hi' ? 'एनिमेटेड GIF' : 'Animated GIFs'}</span>
    </div>
  </div>
</section>

<div class="wrap">${AD('home-top', 'leaderboard', S)}</div>

<section class="section" id="festivals">
  <div class="wrap">
    <div class="section-head">
      <div>
        <p class="eyebrow">${esc(S.home.festEyebrow)}</p>
        <h2>${esc(S.home.festHead)}</h2>
        <p>${esc(S.home.festSub)}</p>
      </div>
    </div>
    <form class="toolbar" role="search" onsubmit="return false">
      <label class="search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>
        <input type="search" id="festival-search" placeholder="${esc(S.common.search)}" aria-label="${esc(S.common.search)}">
      </label>
      <a class="btn btn-ghost" href="${c.navBase}templates.html">${esc(S.common.browseAll)}</a>
    </form>
    <div class="grid festivals" id="festival-grid"></div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head"><div><p class="eyebrow">${esc(S.home.upcomingEyebrow)}</p><h2>${esc(S.home.upcomingHead)}</h2></div>
      <a class="btn btn-ghost btn-sm" href="${c.navBase}calendar.html">${esc(S.home.fullCalendar)}</a></div>
    <div class="grid cols-2" id="upcoming-list"></div>
  </div>
</section>

<div class="wrap">${AD('home-middle', 'rect', S)}</div>

<section class="section">
  <div class="wrap">
    <div class="section-head"><div><p class="eyebrow">${esc(S.home.featEyebrow)}</p><h2>${esc(S.home.featHead)}</h2></div></div>
    <div class="grid features">
      ${S.home.features.map(([i, h, p]) => `<div class="feature"><div class="ic">${i}</div><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head"><div><p class="eyebrow">${esc(S.home.wishesEyebrow)}</p><h2>${esc(S.home.wishesHead)}</h2><p>${esc(S.home.wishesSub)}</p></div>
      <a class="btn btn-ghost btn-sm" href="${c.navBase}wishes.html">${esc(S.home.wishesCta)}</a></div>
    <div class="link-cols">
      ${FESTIVALS.map((f) => `<a href="${c.base}${f.slug}-wishes/">${esc(c.lang === 'hi' ? f.hi : f.name)} ${c.lang === 'hi' ? 'शुभकामनाएँ' : 'wishes'}</a>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head"><div><p class="eyebrow">${esc(S.home.stepsEyebrow)}</p><h2>${esc(S.home.stepsHead)}</h2></div></div>
    <div class="steps">
      ${S.home.steps.map(([h, p]) => `<div class="step"><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join('\n      ')}
    </div>
    <div class="btn-row" style="margin-top:20px">
      <a class="btn btn-primary" href="${c.navBase}post-maker.html">${esc(S.home.ctaStart)}</a>
      <a class="btn btn-soft" href="${c.navBase}post-maker.html?quick=1">${esc(S.home.ctaQuick)}</a>
      <a class="btn btn-ghost" href="${c.navBase}how-it-works.html">${esc(S.home.ctaGuide)}</a>
    </div>
  </div>
</section>

<div class="wrap">${AD('home-bottom', 'leaderboard', S)}</div>
`
  };
});

/* ------------------------------------------------------------------------ */
/* TEMPLATES                                                                 */
/* ------------------------------------------------------------------------ */
bilingual('templates.html', 'hi/templates.html', (c) => {
  const S = c.S;
  return {
    title: S.templates.title, description: S.templates.desc,
    scripts: ['templates-page.js'],
    body: `
<section class="section">
  <div class="wrap">
    <p class="breadcrumb"><a href="${c.navBase}index.html">${esc(S.common.home)}</a> / ${esc(S.nav.templates)}</p>
    <h1>${esc(S.templates.h1)}</h1>
    <p class="muted" style="max-width:64ch">${esc(S.templates.intro)}</p>

    <form class="toolbar" role="search" onsubmit="return false" style="margin-top:18px">
      <label class="search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>
        <input type="search" id="tpl-search" placeholder="${esc(S.common.searchTemplates)}" aria-label="${esc(S.common.searchTemplates)}">
      </label>
      <select class="input" id="tpl-festival" style="max-width:230px" aria-label="${esc(S.common.allFestivals)}"
        data-all="${esc(S.common.allFestivals)}"></select>
    </form>
    <div class="chips" id="tpl-categories" role="group" aria-label="Template categories" data-all="${esc(S.common.allCategories)}"></div>

    ${AD('templates-mid', 'leaderboard', S)}

    <div class="grid templates" id="tpl-grid" style="margin-top:18px"></div>
    <div class="center" style="margin-top:20px"><button class="btn btn-ghost" id="tpl-more" type="button" data-label="${esc(S.common.loadMore)}">${esc(S.common.loadMore)}</button></div>

    ${AD('templates-bottom', 'leaderboard', S)}
  </div>
</section>`
  };
});

/* ------------------------------------------------------------------------ */
/* EDITORS                                                                   */
/* ------------------------------------------------------------------------ */
bilingual('post-maker.html', 'hi/post-maker.html', (c) => {
  const S = c.S;
  return {
    title: S.post.title, description: S.post.desc,
    scripts: ['editor.js', 'post-maker-page.js'],
    body: `
${EDITOR_SHELL(S.post.barTitle, 'panels', BAR_BUTTONS(S))}
<div class="wrap">
  ${AD('editor-below', 'leaderboard', S)}
  <section class="section" style="padding-top:0">
    <h1 style="font-size:1.5rem">${esc(S.post.h1)}</h1>
    <p class="muted" style="max-width:70ch">${esc(S.post.intro)}</p>
    <p class="muted" style="max-width:70ch">${S.post.shortcuts}</p>
    <p class="hint" data-storage-warning hidden></p>
  </section>
  ${AD('editor-bottom', 'leaderboard', S)}
</div>`
  };
});

bilingual('status-maker.html', 'hi/status-maker.html', (c) => {
  const S = c.S;
  return {
    title: S.status.title, description: S.status.desc,
    scripts: ['editor.js', 'status-maker-page.js'],
    body: `
${EDITOR_SHELL(S.status.barTitle, 'panels', BAR_BUTTONS(S))}
<div class="wrap">
  ${AD('status-below', 'leaderboard', S)}
  <section class="section" style="padding-top:0">
    <h1 style="font-size:1.5rem">${esc(S.status.h1)}</h1>
    <p class="muted" style="max-width:70ch">${esc(S.status.intro)}</p>
    <p class="hint" data-storage-warning hidden></p>
  </section>
  ${AD('editor-bottom', 'leaderboard', S)}
</div>`
  };
});

bilingual('gif-maker.html', 'hi/gif-maker.html', (c) => {
  const S = c.S;
  return {
    title: S.gif.title, description: S.gif.desc,
    scripts: ['gif-encoder.js', 'gif-maker.js'],
    body: `
${EDITOR_SHELL(S.gif.barTitle, 'gif-panel', '')}
<div class="wrap">
  ${AD('gif-below', 'leaderboard', S)}
  <section class="section" style="padding-top:0">
    <h1 style="font-size:1.5rem">${esc(S.gif.h1)}</h1>
    <p class="muted" style="max-width:70ch">${esc(S.gif.intro)}</p>
    <p class="hint" data-storage-warning hidden></p>
  </section>
  ${AD('editor-bottom', 'leaderboard', S)}
</div>`
  };
});

/* ------------------------------------------------------------------------ */
/* CALENDAR                                                                  */
/* ------------------------------------------------------------------------ */
const YEARS = Object.keys(FS.FESTIVAL_DATES).join(' & ');
bilingual('calendar.html', 'hi/calendar.html', (c) => {
  const S = c.S;
  return {
    title: fmt(S.calendar.title, { years: YEARS }), description: S.calendar.desc,
    body: `
<section class="section">
  <div class="wrap">
    <p class="breadcrumb"><a href="${c.navBase}index.html">${esc(S.common.home)}</a> / ${esc(S.nav.calendar)}</p>
    <h1>${esc(S.calendar.h1)}</h1>
    <p class="muted" style="max-width:64ch">${esc(S.calendar.intro)}</p>
    <div class="toolbar" style="margin-top:16px">
      <label class="flabel" for="calendar-year" style="margin:0">${esc(S.calendar.year)}</label>
      <select class="input" id="calendar-year" style="max-width:140px" aria-label="${esc(S.calendar.year)}"></select>
    </div>
    ${AD('calendar-top', 'leaderboard', S)}
    <div class="cal-list" id="calendar-list"></div>
    <div class="note" style="margin-top:22px">${S.calendar.note}</div>
    ${AD('calendar-bottom', 'leaderboard', S)}
  </div>
</section>`
  };
});

/* ------------------------------------------------------------------------ */
/* HOW IT WORKS                                                              */
/* ------------------------------------------------------------------------ */
bilingual('how-it-works.html', 'hi/how-it-works.html', (c) => {
  const S = c.S;
  return {
    title: S.how.title, description: S.how.desc,
    jsonld: [{
      '@context': 'https://schema.org', '@type': 'HowTo',
      name: S.how.h1, inLanguage: c.lang,
      step: S.how.postSteps.map(([n, t]) => ({ '@type': 'HowToStep', name: n, text: t.replace(/<[^>]+>/g, '') }))
    }],
    body: `
<section class="section">
  <div class="wrap prose">
    <p class="breadcrumb"><a href="${c.navBase}index.html">${esc(S.common.home)}</a> / ${esc(S.nav.howItWorks)}</p>
    <h1>${esc(S.how.h1)}</h1>
    <p>${esc(S.how.lead)}</p>
    ${AD('how-top', 'leaderboard', S)}
    <h2>${esc(S.how.h2post)}</h2>
    <div class="steps">
      ${S.how.postSteps.map(([h, p]) => `<div class="step"><h3>${esc(h)}</h3><p>${p}</p></div>`).join('\n      ')}
    </div>
    <h2>${esc(S.how.h2gif)}</h2>
    <p>${S.how.gifText}</p>
    <div class="note">${esc(S.how.gifNote)}</div>
    <h2>${esc(S.how.h2status)}</h2>
    <p>${S.how.statusText}</p>
    <h2>${esc(S.how.h2photo)}</h2>
    <p>${S.how.photoText}</p>
    <h2>${esc(S.how.h2save)}</h2>
    <p>${esc(S.how.saveText)}</p>
    ${AD('how-bottom', 'leaderboard', S)}
  </div>
</section>`
  };
});

/* ------------------------------------------------------------------------ */
/* ABOUT / CONTACT                                                           */
/* ------------------------------------------------------------------------ */
bilingual('about.html', 'hi/about.html', (c) => {
  const S = c.S;
  return {
    title: S.about.title, description: S.about.desc,
    body: `
<section class="section">
  <div class="wrap prose">
    <p class="breadcrumb"><a href="${c.navBase}index.html">${esc(S.common.home)}</a> / ${esc(S.nav.about)}</p>
    <h1>${esc(S.about.h1)}</h1>
    <p>${esc(S.about.lead)}</p>
    <h2>${esc(S.about.h2what)}</h2><p>${esc(S.about.what)}</p>
    <h2>${esc(S.about.h2never)}</h2><ul>${S.about.never.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
    <h2>${esc(S.about.h2free)}</h2><p>${esc(S.about.free)}</p>
    <h2>${esc(S.about.h2lang)}</h2><p>${esc(S.about.lang)}</p>
    <h2>${esc(S.about.h2open)}</h2><p>${esc(S.about.open)} <a href="${c.navBase}contact.html">${esc(S.nav.contact)}</a></p>
    ${AD('about-bottom', 'leaderboard', S)}
  </div>
</section>`
  };
});

bilingual('contact.html', 'hi/contact.html', (c) => {
  const S = c.S;
  return {
    title: S.contact.title, description: S.contact.desc,
    scripts: ['contact-page.js'],
    body: `
<section class="section">
  <div class="wrap prose">
    <p class="breadcrumb"><a href="${c.navBase}index.html">${esc(S.common.home)}</a> / ${esc(S.nav.contact)}</p>
    <h1>${esc(S.contact.h1)}</h1>
    <p>${esc(S.contact.lead)}</p>
    <form id="contact-form" novalidate>
      <div class="field"><label class="flabel" for="c-name">${esc(S.contact.name)}</label><input class="input" id="c-name" name="name" autocomplete="name" required></div>
      <div class="field"><label class="flabel" for="c-email">${esc(S.contact.email)}</label><input class="input" id="c-email" name="email" type="email" autocomplete="email" required></div>
      <div class="field"><label class="flabel" for="c-subject">${esc(S.contact.subject)}</label>
        <select class="input" id="c-subject">${S.contact.subjects.map((x) => `<option>${esc(x)}</option>`).join('')}</select>
      </div>
      <div class="field"><label class="flabel" for="c-message">${esc(S.contact.message)}</label><textarea class="input" id="c-message" rows="5" required></textarea></div>
      <p class="hint" id="c-error" role="alert" hidden data-msg="${esc(S.contact.error)}"></p>
      <button class="btn btn-primary" type="submit">${esc(S.contact.submit)}</button>
    </form>
    <div class="note" style="margin-top:20px">${fmt(S.contact.direct, { email: esc(CONTACT_EMAIL) })}</div>
    ${AD('contact-bottom', 'leaderboard', S)}
  </div>
</section>`
  };
});

/* ------------------------------------------------------------------------ */
/* WISHES HUB                                                                */
/* ------------------------------------------------------------------------ */
bilingual('wishes.html', 'hi/wishes.html', (c) => {
  const S = c.S;
  return {
    title: S.wishesHub.title, description: S.wishesHub.desc,
    body: `
<section class="section">
  <div class="wrap">
    <p class="breadcrumb"><a href="${c.navBase}index.html">${esc(S.common.home)}</a> / ${esc(S.nav.wishes)}</p>
    <h1>${esc(S.wishesHub.h1)}</h1>
    <p class="muted" style="max-width:66ch">${esc(S.wishesHub.intro)}</p>
    ${AD('wishes-top', 'leaderboard', S)}
    <div class="grid festivals" style="margin-top:18px">
      ${FESTIVALS.map((f) => {
      const w = FS.WISHES[f.slug] || {};
      const n = ['hi', 'en', 'hinglish', 'status', 'business'].reduce((a, k) => a + ((w[k] || []).length), 0);
      return `<a class="card fest-card" href="${c.base}${f.slug}-wishes/">
        <div class="thumb" style="background:linear-gradient(140deg,${f.gradients[0].join(',')})">
          <span class="emoji" aria-hidden="true">${f.icon}</span>
          <span class="when">${n}</span>
        </div>
        <div class="meta"><strong>${esc(c.lang === 'hi' ? f.hi : f.name)}</strong><span>${esc(c.lang === 'hi' ? f.name : f.hi)}</span></div>
      </a>`;
    }).join('\n      ')}
    </div>
    ${AD('wishes-bottom', 'leaderboard', S)}
  </div>
</section>`
  };
});

/* ------------------------------------------------------------------------ */
/* FESTIVAL LANDING PAGES (both languages)                                   */
/* ------------------------------------------------------------------------ */
function wishBlock(f, lang) {
  const w = FS.WISHES[f.slug] || {};
  const cats = lang === 'hi'
    ? [['हिन्दी शुभकामनाएँ', 'hi', true], ['English wishes', 'en', false], ['Hinglish', 'hinglish', false]]
    : [['Hindi wishes (हिन्दी)', 'hi', true], ['English wishes', 'en', false], ['Hinglish wishes', 'hinglish', false]];
  return cats.filter(([, k]) => (w[k] || []).length).map(([title, k, dev]) => `
    <h3>${esc(title)}</h3>
    <ul class="wish-list">${(w[k] || []).slice(0, 5).map((x) => `<li${dev ? ' class="dev"' : ''}><span>${esc(x)}</span><button class="copy" type="button" data-copy="${esc(x)}">Copy</button></li>`).join('')}</ul>`).join('\n');
}

function dateLine(f, S) {
  const years = Object.keys(FS.FESTIVAL_DATES).sort();
  const parts = years.map((y) => {
    const iso = FS.FESTIVAL_DATES[y][f.slug];
    if (!iso) return null;
    return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-IN', { timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric' });
  }).filter(Boolean);
  if (!parts.length) return '';
  const approx = FS.APPROX_DATES.indexOf(f.slug) !== -1;
  return `<p><strong>${esc(fmt(S.festival.dateLabel, { name: f.name }))}</strong> ${parts.join(' · ')}${approx ? esc(S.festival.approxNote) : ''}.</p>`;
}

FESTIVALS.forEach((f) => {
  const enPath = `${f.slug}-post-maker/`;
  const hiPath = `hi/${f.slug}-post-maker/`;
  const alternates = [{ lang: 'en', path: enPath }, { lang: 'hi', path: hiPath }];

  LANGS.forEach((lang) => {
    const p = lang === 'en' ? enPath : hiPath;
    const c = ctx(p, lang);
    const S = c.S;
    /* On a Hindi page the festival's own Hindi name is the primary name
       (people search "दीपावली पोस्ट मेकर", not "Diwali पोस्ट मेकर"). */
    const v = lang === 'hi'
      ? { name: f.hi, en: f.name, hi: f.name, desc: f.hiDesc || f.desc }
      : { name: f.name, en: f.name, hi: f.hi, desc: f.desc };
    const faqs = S.festival.faqs.map(([q, a]) => [fmt(q, v), fmt(a, v)]);

    write(p + 'index.html', page({
      path: p, lang: lang, alternates: alternates,
      altHref: c.base + (lang === 'en' ? hiPath : enPath),
      title: fmt(S.festival.title, v),
      description: fmt(S.festival.desc, v),
      ogImage: `assets/og/${f.slug}.jpg`,
      scripts: ['festival-page.js'],
      jsonld: [
        {
          '@context': 'https://schema.org', '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: S.common.home, item: SITE + '/' },
            { '@type': 'ListItem', position: 2, name: fmt(S.festival.h1, v), item: `${SITE}/${p}` }
          ]
        },
        {
          '@context': 'https://schema.org', '@type': 'FAQPage', inLanguage: lang,
          mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
        }
      ],
      body: `
<section class="section" data-festival="${f.slug}">
  <div class="wrap">
    <p class="breadcrumb"><a href="${c.navBase}index.html">${esc(S.common.home)}</a> / ${esc(fmt(S.festival.h1, v))}</p>
    <h1>${esc(fmt(S.festival.h1, v))} <span aria-hidden="true">${f.icon}</span></h1>
    <p class="muted" style="max-width:66ch">${esc(fmt(S.festival.intro, v))}</p>
    <div class="btn-row" style="margin-top:14px">
      <a class="btn btn-primary btn-lg" href="${c.navBase}post-maker.html?festival=${f.slug}">${esc(fmt(S.festival.ctaPost, v))}</a>
      <a class="btn btn-dark" href="${c.navBase}gif-maker.html?festival=${f.slug}">${esc(S.festival.ctaGif)}</a>
      <a class="btn btn-ghost" href="${c.navBase}status-maker.html?festival=${f.slug}">${esc(S.festival.ctaStatus)}</a>
    </div>
    <p class="hint" id="fest-countdown" style="margin-top:12px"></p>

    ${AD('festival-top', 'leaderboard', S)}

    <h2>${esc(fmt(S.festival.tplHead, v))}</h2>
    <p class="muted">${esc(S.festival.tplSub)}</p>
    <div class="grid templates" id="fest-templates" style="margin-top:14px"></div>

    <div class="prose" style="margin-top:34px">
      <h2>${esc(fmt(S.festival.wishHead, v))}</h2>
      <p>${esc(S.festival.wishSub)}</p>
      ${wishBlock(f, lang)}
      <p><a class="btn btn-soft btn-sm" href="${c.base}${f.slug}-wishes/">${esc(fmt(S.festival.allWishes, v))}</a></p>
      ${dateLine(f, S)}

      <h2>${esc(fmt(S.festival.howHead, v))}</h2>
      <div class="steps">
        ${S.festival.steps.map(([h, t]) => `<div class="step"><h3>${esc(fmt(h, v))}</h3><p>${esc(fmt(t, v))}</p></div>`).join('\n        ')}
      </div>

      <h2>${esc(S.festival.faqHead)}</h2>
      ${faqs.map(([q, a]) => `<details class="faq"><summary>${esc(q)}</summary><div class="faq-body">${esc(a)}</div></details>`).join('\n      ')}

      <h2>${esc(S.festival.moreHead)}</h2>
      <div class="link-cols">${FESTIVALS.filter((x) => x.slug !== f.slug)
          .map((x) => `<a href="${c.base}${lang === 'hi' ? 'hi/' : ''}${x.slug}-post-maker/">${esc(lang === 'hi' ? x.hi : x.name)}</a>`).join('')}</div>
    </div>

    ${AD('festival-bottom', 'leaderboard', S)}
  </div>
</section>`
    }));
  });
});

/* ------------------------------------------------------------------------ */
/* FESTIVAL WISHES PAGES (English shell, bilingual content)                  */
/* ------------------------------------------------------------------------ */
FESTIVALS.forEach((f) => {
  const p = `${f.slug}-wishes/`;
  const c = ctx(p, 'en');
  const S = c.S;
  const w = FS.WISHES[f.slug] || {};
  const count = ['hi', 'en', 'hinglish', 'status', 'business'].reduce((a, k) => a + ((w[k] || []).length), 0);
  const v = { name: f.name, hi: f.hi, count: count };

  const groups = [
    ['Hindi wishes — हिन्दी शुभकामनाएँ', w.hi, true],
    ['English wishes', w.en, false],
    ['Hinglish wishes', w.hinglish, false],
    ['Short status lines', w.status, true],
    ['Business greetings', (w.business || []).map((x) => x.replace(/\{business\}/g, 'Your Business')), true]
  ].filter(([, list]) => list && list.length);

  write(p + 'index.html', page({
    path: p, lang: 'en',
    title: fmt(S.wishesPage.title, v),
    description: fmt(S.wishesPage.desc, v),
    ogImage: `assets/og/${f.slug}.jpg`,
    jsonld: [{
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' },
        { '@type': 'ListItem', position: 2, name: `${f.name} Wishes`, item: `${SITE}/${p}` }
      ]
    }],
    body: `
<section class="section">
  <div class="wrap">
    <p class="breadcrumb"><a href="${c.base}index.html">Home</a> / <a href="${c.base}wishes.html">Wishes</a> / ${esc(f.name)}</p>
    <h1>${esc(fmt(S.wishesPage.h1, v))} <span aria-hidden="true">${f.icon}</span></h1>
    <p class="muted" style="max-width:70ch">${esc(fmt(S.wishesPage.intro, v))}</p>
    <div class="btn-row" style="margin-top:12px">
      <a class="btn btn-primary" href="${c.base}${f.slug}-post-maker/">${esc(S.wishesPage.makeCta)}</a>
      <a class="btn btn-ghost" href="${c.base}gif-maker.html?festival=${f.slug}">${esc(fmt(S.wishesPage.gifCta, v))}</a>
    </div>
    <p class="hint">${S.wishesPage.tip}</p>

    ${AD('wishes-page-top', 'leaderboard', S)}

    <div class="prose" style="max-width:820px">
      ${groups.map(([title, list, dev]) => `
      <h2>${esc(title)}</h2>
      <ul class="wish-list">
        ${list.map((x) => `<li${dev ? ' class="dev"' : ''}><span>${esc(x)}</span><button class="copy" type="button" data-copy="${esc(x)}" aria-label="Copy this wish">Copy</button></li>`).join('\n        ')}
      </ul>`).join('\n')}

      ${dateLine(f, S)}

      <h2>${esc(S.wishesPage.relatedHead)}</h2>
      <div class="link-cols">${FESTIVALS.filter((x) => x.slug !== f.slug)
        .map((x) => `<a href="${c.base}${x.slug}-wishes/">${esc(x.name)} wishes</a>`).join('')}</div>
    </div>

    ${AD('wishes-page-bottom', 'leaderboard', S)}
  </div>
</section>`
  }));
});

/* ------------------------------------------------------------------------ */
/* FESTIVAL GIF MAKER PAGES (top festivals, English)                         */
/* ------------------------------------------------------------------------ */
GIF_FESTIVALS.forEach((slug) => {
  const f = FESTIVALS.filter((x) => x.slug === slug)[0];
  if (!f) return;
  const p = `${slug}-gif-maker/`;
  const c = ctx(p, 'en');
  const S = c.S;
  write(p + 'index.html', page({
    path: p, lang: 'en',
    title: `${f.name} GIF Maker — Free Animated ${f.name} Greeting | Festival Studio`,
    description: `Make a free animated ${f.name} GIF in your browser. Sparkles, fireworks and confetti effects, Hindi and English text, instant download. No signup, no watermark.`,
    ogImage: `assets/og/${slug}.jpg`,
    scripts: ['gif-encoder.js', 'gif-maker.js'],
    jsonld: [{
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' },
        { '@type': 'ListItem', position: 2, name: `${f.name} GIF Maker`, item: `${SITE}/${p}` }
      ]
    }],
    body: `
${EDITOR_SHELL(`${f.name} GIF Maker`, 'gif-panel', '')}
<div class="wrap">
  ${AD('festival-gif-below', 'leaderboard', S)}
  <section class="section prose" style="padding-top:0">
    <p class="breadcrumb"><a href="${c.base}index.html">Home</a> / ${esc(f.name)} GIF Maker</p>
    <h1 style="font-size:1.6rem">Free ${esc(f.name)} GIF maker</h1>
    <p>${esc(f.desc)} Animate a ${esc(f.name)} greeting with sparkles, fireworks, confetti or a diya glow, then download a real <code>.gif</code> file — encoded by your own device, with no upload and no watermark.</p>
    <h2>Tips for a good ${esc(f.name)} GIF</h2>
    <ul>
      <li>Keep the message short — a GIF loops, so two lines read better than five.</li>
      <li>10–12 frames per second looks smooth and keeps the file small enough for WhatsApp.</li>
      <li>Use the 260 px size on older phones; use 540 px for Instagram.</li>
      <li>Need a still image instead? Use the <a href="${c.base}${slug}-post-maker/">${esc(f.name)} post maker</a>, or copy a line from <a href="${c.base}${slug}-wishes/">${esc(f.name)} wishes</a>.</li>
    </ul>
    <p class="hint" data-storage-warning hidden></p>
  </section>
  ${AD('editor-bottom', 'leaderboard', S)}
</div>`
  }));
});

/* ------------------------------------------------------------------------ */
/* INFO + LEGAL PAGES (English)                                              */
/* ------------------------------------------------------------------------ */
function simplePage(pathName, title, description, bodyHtml, extra) {
  const c = ctx(pathName, 'en');
  write(pathName, page(Object.assign({
    path: pathName, lang: 'en', title: title, description: description, body: bodyHtml
  }, extra || {})));
  return c;
}

const E = STR.en;

/* FAQ */
simplePage('faq.html', E.faqPage.title, E.faqPage.desc, `
<section class="section">
  <div class="wrap prose">
    <p class="breadcrumb"><a href="index.html">Home</a> / FAQ</p>
    <h1>${esc(E.faqPage.h1)}</h1>
    ${AD('faq-top', 'leaderboard', E)}
    ${E.faqPage.items.map(([q, a]) => `<details class="faq"><summary>${esc(q)}</summary><div class="faq-body">${esc(a)}</div></details>`).join('\n    ')}
    ${AD('faq-bottom', 'leaderboard', E)}
  </div>
</section>`, {
  jsonld: [{
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: E.faqPage.items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
  }]
});

/* Advertise */
simplePage('advertise.html', E.advertise.title, E.advertise.desc, `
<section class="section">
  <div class="wrap prose">
    <p class="breadcrumb"><a href="index.html">Home</a> / Advertise</p>
    <h1>${esc(E.advertise.h1)}</h1>
    <p>${esc(E.advertise.lead)}</p>
    <h2>${esc(E.advertise.h2where)}</h2><p>${esc(E.advertise.where)}</p>
    <h2>${esc(E.advertise.h2policy)}</h2><ul>${E.advertise.policy.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
    <h2>${esc(E.advertise.h2contact)}</h2><p>${fmt(E.advertise.contact, { email: esc(CONTACT_EMAIL) })}</p>
  </div>
</section>`);

/* Privacy */
simplePage('privacy.html', 'Privacy Policy — Festival Studio',
  'Festival Studio privacy policy: photos are processed in your browser, no accounts, no design uploads, and clear information about advertising cookies.', `
<section class="section">
  <div class="wrap prose">
    <p class="breadcrumb"><a href="index.html">Home</a> / Privacy Policy</p>
    <h1>Privacy Policy</h1>
    <p class="muted">Last updated: <span id="year">2026</span></p>
    <div class="note">Your uploaded photos are processed in your browser and are not uploaded to our server.</div>

    <h2>1. The short version</h2>
    <ul>
      <li>There is no account system, so we do not hold your name, email or password.</li>
      <li>Photos, logos and designs stay on your device. They are read by your browser and drawn onto a canvas locally.</li>
      <li>Drafts and preferences are saved in your browser's local storage, on your device only.</li>
      <li>We do not sell data, because we do not collect it.</li>
    </ul>

    <h2>2. Information we do not collect</h2>
    <p>Festival Studio is a static website. It has no server-side code, no database and no file storage. We cannot see your images, your text, your drafts or your downloads.</p>

    <h2>3. Local storage on your device</h2>
    <p>With your browser's permission, the site stores a small amount of data locally: your theme choice, your language, your last selected festival, the name and business details you type into templates, your cookie choice, and any drafts you explicitly save. This never leaves your device and can be removed at any time by clearing site data in your browser settings, or by deleting individual drafts inside the editor.</p>

    <h2>4. Advertising</h2>
    <p>The site is free and is funded by advertising. Ad slots are marked and placed outside the editing area. Advertising scripts load only after you accept the cookie notice. If an advertising network is enabled, that network may set cookies or use device identifiers to serve and measure ads, subject to its own privacy policy. We do not share your designs, photos or typed content with advertisers — we never receive them ourselves. See the <a href="cookies.html">Cookie Policy</a> for details.</p>

    <h2>5. Analytics</h2>
    <p>If a privacy-respecting analytics tool is enabled, it records aggregate page views only, and also only after consent. No design content is recorded.</p>

    <h2>6. Third-party resources</h2>
    <p>Fonts are loaded from Google Fonts. When your browser requests a font, Google receives the request as part of normal web delivery, including your IP address, under Google's own privacy policy. Everything else — the editor, the templates, the stickers and the GIF encoder — is served from this site.</p>

    <h2>7. Children</h2>
    <p>The site is suitable for general audiences and does not knowingly collect any personal information from anyone, including children.</p>

    <h2>8. Your choices</h2>
    <p>Decline the cookie notice, block cookies, use private browsing, or clear site data at any time — the editor keeps working. Only saved drafts and preferences are affected.</p>

    <h2>9. Changes</h2>
    <p>If this policy changes, the updated version will appear on this page with a new date.</p>

    <h2>10. Contact</h2>
    <p>Questions about privacy? Use the <a href="contact.html">contact page</a>.</p>
    ${AD('privacy-bottom', 'leaderboard', E)}
  </div>
</section>`);

/* Cookies */
simplePage('cookies.html', E.cookies.title, E.cookies.desc, `
<section class="section">
  <div class="wrap prose">
    <p class="breadcrumb"><a href="index.html">Home</a> / Cookie Policy</p>
    <h1>${esc(E.cookies.h1)}</h1>
    <p class="muted">Last updated: <span id="year">2026</span></p>
    <h2>${esc(E.cookies.h2what)}</h2><p>${esc(E.cookies.what)}</p>
    <h2>${esc(E.cookies.h2ads)}</h2><p>${esc(E.cookies.ads)}</p>
    <h2>${esc(E.cookies.h2control)}</h2><p>${esc(E.cookies.control)}</p>
    <h2>${esc(E.cookies.h2changes)}</h2><p>${esc(E.cookies.changes)}</p>
    <p><a href="privacy.html">Privacy Policy</a> · <a href="terms.html">Terms</a></p>
  </div>
</section>`);

/* Terms */
simplePage('terms.html', 'Terms & Conditions — Festival Studio',
  'Terms and conditions for using Festival Studio, the free Indian festival post, GIF and status maker.', `
<section class="section">
  <div class="wrap prose">
    <p class="breadcrumb"><a href="index.html">Home</a> / Terms &amp; Conditions</p>
    <h1>Terms &amp; Conditions</h1>
    <p class="muted">Last updated: <span id="year">2026</span></p>

    <h2>1. Acceptance</h2>
    <p>By using Festival Studio you agree to these terms. If you do not agree, please do not use the site.</p>

    <h2>2. The service</h2>
    <p>Festival Studio provides free, browser-based design tools for creating festival posts, animated GIFs and status images. The service is provided "as is", without any warranty of availability, fitness for a particular purpose or uninterrupted operation.</p>

    <h2>3. Your content</h2>
    <p>You keep all rights to the photos, logos and text you use. Because your content never reaches our servers, we claim no licence over it and take no responsibility for it. You are responsible for having the right to use any image, logo, trademark or text you place in a design.</p>

    <h2>4. Acceptable use</h2>
    <ul>
      <li>Do not use the tools to create content that is unlawful, hateful, obscene, defamatory or that infringes someone else's rights.</li>
      <li>Do not impersonate a person, business or organisation, or misuse a brand's logo.</li>
      <li>Do not attempt to disrupt the site or use it to distribute malware.</li>
    </ul>

    <h2>5. Templates, stickers and fonts</h2>
    <p>Templates, layouts, written wishes and vector stickers on this site may be used freely for personal and commercial designs you create here. They may not be redistributed or resold as a standalone template, sticker or asset pack. Fonts are open-source families delivered by Google Fonts and remain subject to their own licences — see <a href="licences.html">Licences &amp; Credits</a>.</p>

    <h2>6. Advertising</h2>
    <p>The site displays advertising. Advertisements are not endorsements, and any dealings with an advertiser are strictly between you and that advertiser.</p>

    <h2>7. Limitation of liability</h2>
    <p>To the maximum extent permitted by law, Festival Studio is not liable for any loss of data, loss of designs, device issues, or any indirect or consequential damages arising from your use of the site. Save your work and keep your own copies of important files.</p>

    <h2>8. Changes and availability</h2>
    <p>Features may change or be withdrawn at any time and the site may be unavailable without notice.</p>

    <h2>9. Governing law</h2>
    <p>These terms are governed by the laws of India, without regard to conflict-of-law principles.</p>

    <h2>10. Contact</h2>
    <p>Questions about these terms? Use the <a href="contact.html">contact page</a>.</p>
    ${AD('terms-bottom', 'leaderboard', E)}
  </div>
</section>`);

/* Disclaimer */
simplePage('disclaimer.html', 'Disclaimer — Festival Studio',
  'Disclaimer for Festival Studio, including festival date accuracy, trademark use and third-party advertising.', `
<section class="section">
  <div class="wrap prose">
    <p class="breadcrumb"><a href="index.html">Home</a> / Disclaimer</p>
    <h1>Disclaimer</h1>
    <p class="muted">Last updated: <span id="year">2026</span></p>

    <h2>General information</h2>
    <p>Everything on Festival Studio is provided for general information and creative use only. While we try to keep the site accurate and working, we make no warranty of any kind about completeness, accuracy or reliability.</p>

    <h2>Festival dates</h2>
    <p>Indian festival dates are largely lunar and vary by region, community and panchang. The dates in our calendar are compiled for convenience and some are marked as approximate. Always confirm important dates with a local panchang, community calendar or religious authority before relying on them.</p>

    <h2>Religious and cultural content</h2>
    <p>Greetings, symbols and iconography are provided respectfully and generically. They are not affiliated with, endorsed by or representative of any particular religious institution or organisation.</p>

    <h2>Trademarks</h2>
    <p>Names such as WhatsApp, Instagram, Facebook, YouTube, X and LinkedIn are trademarks of their respective owners and are used here only to describe common image sizes. Festival Studio is not affiliated with, endorsed by or sponsored by any of these companies.</p>

    <h2>Your designs</h2>
    <p>You are responsible for the content you create, including any photo, logo or trademark you add, and for how you use or publish it.</p>

    <h2>External links and advertising</h2>
    <p>The site may link to third-party sites and displays third-party advertising. We do not control that content and are not responsible for it.</p>

    <h2>Technical limits</h2>
    <p>Exports and GIF encoding depend on your browser and device. Very large canvases or long animations may fail on low-memory devices. If an export fails, try a smaller size — the site will tell you when something did not work.</p>
    ${AD('disclaimer-bottom', 'leaderboard', E)}
  </div>
</section>`);

/* DMCA */
simplePage('dmca.html', E.dmca.title, E.dmca.desc, `
<section class="section">
  <div class="wrap prose">
    <p class="breadcrumb"><a href="index.html">Home</a> / Copyright</p>
    <h1>${esc(E.dmca.h1)}</h1>
    <p>${esc(E.dmca.lead)}</p>
    <h2>${esc(E.dmca.h2ours)}</h2><p>${esc(E.dmca.ours)}</p>
    <h2>${esc(E.dmca.h2claim)}</h2><p>${esc(E.dmca.claim)} Email: <strong>${esc(CONTACT_EMAIL)}</strong></p>
    <h2>${esc(E.dmca.h2user)}</h2><p>${esc(E.dmca.user)}</p>
  </div>
</section>`);

/* Accessibility */
simplePage('accessibility.html', E.accessibility.title, E.accessibility.desc, `
<section class="section">
  <div class="wrap prose">
    <p class="breadcrumb"><a href="index.html">Home</a> / Accessibility</p>
    <h1>${esc(E.accessibility.h1)}</h1>
    <p>${esc(E.accessibility.lead)}</p>
    <h2>${esc(E.accessibility.h2doing)}</h2><ul>${E.accessibility.doing.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
    <h2>${esc(E.accessibility.h2limits)}</h2><p>${esc(E.accessibility.limits)}</p>
    <h2>${esc(E.accessibility.h2feedback)}</h2><p>${esc(E.accessibility.feedback)}</p>
  </div>
</section>`);

/* Licences */
simplePage('licences.html', E.licences.title, E.licences.desc, `
<section class="section">
  <div class="wrap prose">
    <p class="breadcrumb"><a href="index.html">Home</a> / Licences</p>
    <h1>${esc(E.licences.h1)}</h1>
    <h2>${esc(E.licences.h2fonts)}</h2><p>${esc(E.licences.fonts)}</p>
    <h2>${esc(E.licences.h2code)}</h2><p>${esc(E.licences.code)}</p>
    <h2>${esc(E.licences.h2assets)}</h2><p>${esc(E.licences.assets)}</p>
    <h2>${esc(E.licences.h2trademarks)}</h2><p>${esc(E.licences.trademarks)}</p>
  </div>
</section>`);

/* HTML sitemap */
const linkList = (items) => `<div class="link-cols">${items.map(([h, l]) => `<a href="${h}">${esc(l)}</a>`).join('')}</div>`;
simplePage('sitemap.html', E.sitemapPage.title, E.sitemapPage.desc, `
<section class="section">
  <div class="wrap prose">
    <p class="breadcrumb"><a href="index.html">Home</a> / Sitemap</p>
    <h1>${esc(E.sitemapPage.h1)}</h1>
    <p>${esc(E.sitemapPage.intro)}</p>
    <h2>${esc(E.sitemapPage.h2main)}</h2>
    ${linkList([['index.html', 'Home'], ['templates.html', 'Festival Templates'], ['post-maker.html', 'Post Maker'],
      ['gif-maker.html', 'GIF Maker'], ['status-maker.html', 'Status Maker'], ['wishes.html', 'Festival Wishes'],
      ['calendar.html', 'Festival Calendar'], ['how-it-works.html', 'How It Works'], ['about.html', 'About'],
      ['contact.html', 'Contact'], ['faq.html', 'FAQ']])}
    <h2>${esc(E.sitemapPage.h2post)}</h2>
    ${linkList(FESTIVALS.map((f) => [`${f.slug}-post-maker/`, `${f.name} post maker`]))}
    <h2>${esc(E.sitemapPage.h2gif)}</h2>
    ${linkList(GIF_FESTIVALS.map((s) => [`${s}-gif-maker/`, `${FESTIVALS.filter((x) => x.slug === s)[0].name} GIF maker`]))}
    <h2>${esc(E.sitemapPage.h2wishes)}</h2>
    ${linkList(FESTIVALS.map((f) => [`${f.slug}-wishes/`, `${f.name} wishes`]))}
    <h2>${esc(E.sitemapPage.h2hi)}</h2>
    ${linkList([['hi/index.html', 'होम'], ['hi/templates.html', 'टेम्पलेट'], ['hi/post-maker.html', 'पोस्ट मेकर'],
      ['hi/gif-maker.html', 'GIF मेकर'], ['hi/status-maker.html', 'स्टेटस मेकर'], ['hi/wishes.html', 'शुभकामनाएँ'],
      ['hi/calendar.html', 'त्योहार कैलेंडर'], ['hi/how-it-works.html', 'कैसे काम करता है'],
      ['hi/about.html', 'हमारे बारे में'], ['hi/contact.html', 'संपर्क']]
      .concat(FESTIVALS.map((f) => [`hi/${f.slug}-post-maker/`, `${f.hi} पोस्ट मेकर`])))}
    <h2>${esc(E.sitemapPage.h2legal)}</h2>
    ${linkList([['privacy.html', 'Privacy Policy'], ['cookies.html', 'Cookie Policy'], ['terms.html', 'Terms & Conditions'],
      ['disclaimer.html', 'Disclaimer'], ['dmca.html', 'Copyright / DMCA'], ['accessibility.html', 'Accessibility'],
      ['licences.html', 'Licences & Credits'], ['advertise.html', 'Advertise']])}
  </div>
</section>`);

/* 404 */
write('404.html', page({
  path: '404.html', lang: 'en', noindex: true,
  title: E.notFound.title, description: E.notFound.desc,
  body: `
<section class="section">
  <div class="wrap center" style="padding:60px 0">
    <div style="font-size:3rem">🪔</div>
    <h1>${esc(E.notFound.h1)}</h1>
    <p class="muted">${esc(E.notFound.lead)}</p>
    <div class="btn-row" style="justify-content:center;margin-top:16px">
      <a class="btn btn-primary" href="index.html">Home</a>
      <a class="btn btn-ghost" href="templates.html">Templates</a>
      <a class="btn btn-ghost" href="post-maker.html">Post Maker</a>
      <a class="btn btn-ghost" href="sitemap.html">Sitemap</a>
    </div>
  </div>
</section>`
}));

/* ------------------------------------------------------------------------ */
/* sitemap.xml / robots.txt / ads.txt / humans.txt / security.txt / manifest  */
/* ------------------------------------------------------------------------ */
const today = new Date().toISOString().slice(0, 10);
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map((u) => {
  const alt = (u.alternates || []).map((a) =>
    `\n    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${SITE}/${a.path}"/>`).join('');
  const prio = u.path === '' ? '1.0' : /-post-maker|-wishes/.test(u.path) ? '0.8' : '0.6';
  return `  <url>
    <loc>${SITE}/${u.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.path === '' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${prio}</priority>${alt}
  </url>`;
}).join('\n')}
</urlset>
`);

write('robots.txt', `User-agent: *
Allow: /
Disallow: /tools/

Sitemap: ${SITE}/sitemap.xml
`);

write('ads.txt', `# Festival Studio — ads.txt
# Replace the line below with the one your ad network gives you.
# Google AdSense example (swap in your own publisher ID):
# google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0
`);

write('humans.txt', `/* TEAM */
Festival Studio — free Indian festival post, GIF and status maker.
Contact: ${CONTACT_EMAIL}
Location: India

/* SITE */
Standards: HTML5, CSS3, ES5-compatible JavaScript, Canvas 2D, Service Worker
Components: none — no runtime framework, no third-party JS library
Software: written by hand
Last update: ${today}
`);

write('.well-known/security.txt', `Contact: mailto:${CONTACT_EMAIL}
Preferred-Languages: en, hi
Canonical: ${SITE}/.well-known/security.txt
Policy: ${SITE}/terms.html
`);

write('manifest.webmanifest', JSON.stringify({
  name: 'Festival Studio',
  short_name: 'Festival Studio',
  description: 'Free Indian festival post, GIF and status maker.',
  start_url: './index.html',
  scope: './',
  display: 'standalone',
  orientation: 'any',
  lang: 'en-IN',
  background_color: '#FBF7F4',
  theme_color: '#E1306C',
  categories: ['graphics', 'photo', 'utilities'],
  icons: [
    { src: './assets/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
    { src: './assets/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' }
  ],
  shortcuts: [
    { name: 'Post Maker', url: './post-maker.html' },
    { name: 'GIF Maker', url: './gif-maker.html' },
    { name: 'Status Maker', url: './status-maker.html' }
  ]
}, null, 2));

/* ---- service worker cache version --------------------------------------
   sw.js serves CSS and JS cache-first, keyed on VERSION, and its activate
   handler only drops caches whose key differs. A forgotten bump therefore
   pins returning visitors to the scripts they first downloaded.

   Deriving the key from the contents of css/ and js/ removes that failure
   mode: edit a script and the key changes on the next build, leave the code
   alone and returning visitors keep their cache instead of re-downloading
   the shell. Images live outside the hash deliberately — new artwork arrives
   under a new filename, which was never in the cache to begin with.        */
function hashCode() {
  const files = [];
  (function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const name of fs.readdirSync(dir).sort()) {
      const abs = path.join(dir, name);
      if (fs.statSync(abs).isDirectory()) walk(abs);
      else files.push(abs);
    }
  })(path.join(ROOT, 'css'));
  (function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const name of fs.readdirSync(dir).sort()) {
      const abs = path.join(dir, name);
      if (fs.statSync(abs).isDirectory()) walk(abs);
      else files.push(abs);
    }
  })(path.join(ROOT, 'js'));

  const sum = crypto.createHash('sha1');
  for (const abs of files.sort()) {
    sum.update(path.relative(ROOT, abs).split(path.sep).join('/'));
    sum.update(fs.readFileSync(abs));
  }
  return 'fs-' + sum.digest('hex').slice(0, 10);
}

const swPath = path.join(ROOT, 'sw.js');
let swNote = 'sw.js not found — cache version unchanged';
if (fs.existsSync(swPath)) {
  const version = hashCode();
  const before = fs.readFileSync(swPath, 'utf8');
  const after = before.replace(/var VERSION = '[^']*';/, `var VERSION = '${version}';`);
  if (!/var VERSION = '[^']*';/.test(before)) {
    swNote = 'sw.js has no VERSION line — left untouched';
  } else {
    if (after !== before) fs.writeFileSync(swPath, after);
    swNote = `service worker cache version ${version}`;
  }
}

console.log(`Built ${pages.length} indexable pages (+404), sitemap, robots, ads.txt, humans.txt, security.txt and manifest.\nStamped ${swNote}.`);
