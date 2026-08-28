# Festival Studio

**Create Beautiful Festival Posts, GIFs & Statuses for Free**

A 100% free, no-signup, no-login, no-AI, no-paid-API **static** web app for making Indian festival
posts, animated GIFs and WhatsApp statuses. Everything — the canvas editor, the templates, the
stickers, the wishes and even the GIF encoder — runs inside the visitor's browser. Drop the folder
on GitHub Pages and it works.

| | |
|---|---|
| Pages | **93** (English + हिन्दी) |
| Festivals | 18, each with 9 templates = **162 templates** |
| Wishes | **468** original lines across 5 categories |
| Stickers | **50+** hand-drawn vectors |
| Canvas sizes | 14 presets + custom |
| Runtime dependencies | **none** |

---

## 1. Quick start

```bash
python3 -m http.server 8123     # from the project root
# open http://localhost:8123
```

There is **no build step required to run the site.** Every `.html` file is already generated.

---

## 2. Go live — the checklist

### a) Deploy

1. Push this folder to a GitHub repository.
2. Repo → **Settings → Pages** → Source: *Deploy from a branch* → `main`, folder `/ (root)`.
3. Open `https://<user>.github.io/<repo>/`. The included `.nojekyll` makes Pages serve every file as-is.

### b) Set your real URL (do this before submitting to Google)

Canonical URLs, `hreflang`, Open Graph tags and `sitemap.xml` are baked in at build time:

```bash
SITE_URL="https://yourname.github.io/festival-studio" \
CONTACT_EMAIL="you@yourdomain.com" \
node tools/build.js
```

Also set `siteUrl` and `contactEmail` in **`js/config.js`**.

### c) Search engines

```bash
GOOGLE_VERIFY="<token from Search Console>" \
BING_VERIFY="<token from Bing Webmaster>" \
SITE_URL="https://…" node tools/build.js
```

Then submit `https://yoursite/sitemap.xml` in both consoles.

### d) Advertising

1. Get approved at [adsense.google.com](https://adsense.google.com) — apply **after** you have real
   content and some traffic, not on day one.
2. In `js/config.js` set `adsense.enabled = true`, add your `client` ID, and map slot names to slot IDs.
3. Put the same publisher line into **`ads.txt`** (a template is already there).

Ads and analytics **only load after the visitor accepts the cookie notice**, which appears
automatically once either is enabled. Nothing loads while both are off.

### e) Analytics

Set `analytics.enabled` and `analytics.ga4` in `js/config.js`, or use a cookieless tool such as
Cloudflare Web Analytics and leave both off.

---

## 3. Project structure

```
festival-studio/
├── index.html  templates.html  post-maker.html  gif-maker.html  status-maker.html
├── wishes.html  calendar.html  how-it-works.html  about.html  contact.html  faq.html
├── advertise.html  privacy.html  cookies.html  terms.html  disclaimer.html
├── dmca.html  accessibility.html  licences.html  sitemap.html  404.html
├── hi/…                              28 Hindi pages (UI + content)
├── <festival>-post-maker/            18 SEO landing pages
├── <festival>-wishes/                18 wishes pages (468 original messages)
├── <festival>-gif-maker/              8 SEO landing pages
│
├── css/style.css                     whole design system (light + dark)
├── js/
│   ├── config.js       ★ ads, analytics, contact email, consent  ← EDIT THIS
│   ├── festivals.js    ★ festival database + annual dates        ← EDIT THIS
│   ├── wishes.js       ★ 468 wishes                              ← EDIT THIS
│   ├── i18n.js         English ⇄ हिन्दी UI strings
│   ├── stickers.js     50+ vector festival stickers
│   ├── engine.js       canvas scene model, renderer, effects
│   ├── templates.js    9 layouts × every festival
│   ├── editor.js       editor: layers, snapping, undo, export, quick wizard
│   ├── gif-encoder.js  dependency-free GIF89a encoder
│   ├── gif-worker.js   the same encoder, off the main thread
│   ├── gif-maker.js    GIF maker page
│   ├── app.js          theme, nav, grids, sharing, consent, install prompt
│   ├── storage.js      safe localStorage wrapper
│   └── *-page.js       small per-page controllers
├── assets/
│   ├── icons/          logo, favicons (ico + png), app icons, default OG card
│   ├── templates/      162 pre-rendered preview JPEGs (indexable by Google)
│   └── og/             18 per-festival social share cards
├── sw.js               offline support
├── tools/              ★ development only — safe to delete before publishing
│   ├── build.js        generates every page + sitemap + robots + manifest
│   ├── strings.js      all page copy, English and Hindi
│   ├── render-assets.js re-renders the preview and OG images
│   ├── fetch-fonts.sh  optional: self-host the fonts
│   ├── test.js         125-check headless browser test suite
│   └── _render.html    renderer harness
├── robots.txt  sitemap.xml  ads.txt  humans.txt  .well-known/security.txt
├── manifest.webmanifest  .nojekyll
```

---

## 4. Everyday maintenance

### Add a festival

Copy any block in `FS.FESTIVALS` (`js/festivals.js`), add its dates to `FS.FESTIVAL_DATES`, add its
wishes to `js/wishes.js`, then:

```bash
node tools/build.js && node tools/render-assets.js
```

You automatically get 9 new templates, a homepage card, a calendar row, a post-maker landing page in
both languages, and a wishes page.

### Update the dates each year

```js
FS.FESTIVAL_DATES = {
  2026: { diwali: '2026-11-08', … },
  2027: { diwali: '2027-10-29', … },
  2028: { …add one new block per year… }
};
```

Festivals listed in `FS.APPROX_DATES` are shown with an "approx" tag because they depend on moon
sighting or regional panchang.

### Regenerate the preview images

`assets/templates/*.jpg` and `assets/og/*.jpg` are rendered by the real canvas engine. Run this on a
machine **with internet access** so the previews use the real Google Fonts:

```bash
python3 -m http.server 8123
node tools/render-assets.js
```

### Add a language

`tools/strings.js` holds every word of page copy for `en` and `hi`. Copy the `hi` object, translate,
add the code to `LANGS` in `tools/build.js`, and add a dictionary to `js/i18n.js` for the editor UI.

---

## 5. Where the traffic comes from

The tool pages rank slowly; the **wishes pages are the engine**. Each `/<festival>-wishes/` page
carries 26 original messages in Hindi, English, Hinglish, short status lines and business greetings,
with copy buttons and internal links into the editor. Add more lines to `js/wishes.js` over time —
that is the single highest-return edit in this project.

Timing matters: Google takes 2–3 months to rank a new page. Publish festival content **two to three
months before** the festival.

---

## 6. Privacy, ads and legal

* No accounts, no backend, no database, no image uploads.
* Drafts, preferences, language and cookie choice live in the visitor's `localStorage` only.
* Advertising and analytics scripts load **only after consent**.
* Legal pages included: Privacy, Cookies, Terms, Disclaimer, Copyright/DMCA, Accessibility, Licences.
* Update the email address in `js/config.js` (and re-run the build with `CONTACT_EMAIL=…`).
* If you enable an ad network, re-read `privacy.html` and `cookies.html` so the disclosure matches reality.

---

## 7. Development tools

```bash
node tools/build.js          # regenerate all HTML + sitemap + robots + manifest
node tools/render-assets.js  # regenerate preview + social images
node tools/test.js           # 125-check headless Chromium suite (needs a server on :8123)
bash tools/fetch-fonts.sh    # optional: self-host the fonts
```

The test suite checks that all 39 sampled pages load without console errors, that the editor
adds/drags/snaps/exports, that the GIF encoder runs in a Web Worker and emits a structurally valid
`GIF89a`, that the Hindi UI and language switch work, that drafts save, that keyboard shortcuts fire,
and that every page has correct SEO metadata.

---

## 8. Browser support

Modern Chrome, Edge, Firefox, Safari and Android WebView. Graceful fallbacks are built in for a
missing Web Share API, missing clipboard image support, a blocked Web Worker, blocked localStorage
and failed exports — no button is ever left broken.

© Festival Studio. Templates, layouts, wishes and stickers may be used freely in designs you create;
they may not be redistributed as a standalone asset pack.
