/* ============================================================================
   Festival Studio — app.js
   Site-wide behaviour: theme, navigation, toasts, downloads, sharing,
   festival grids, template galleries, calendar and the homepage hero.
   ========================================================================== */
(function (global) {
  'use strict';
  var FS = (global.FS = global.FS || {});
  var Store = FS.Store;

  /* ------------------------------------------------------------------ */
  /* Utilities                                                           */
  /* ------------------------------------------------------------------ */
  FS.ready = function (fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  };
  FS.$ = function (s, r) { return (r || document).querySelector(s); };
  FS.$$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  FS.el = function (tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === 'class') e.className = attrs[k];
      else if (k === 'style') e.setAttribute('style', attrs[k]);
      else if (k.slice(0, 2) === 'on') e.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    });
    if (html != null) e.innerHTML = html;
    return e;
  };
  FS.esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  /* ------------------------------------------------------------------ */
  /* Tiny inline icon set (shared by every page)                         */
  /* ------------------------------------------------------------------ */
  var ICONS = {
    layout: '<path d="M3 4h18v6H3zM3 12h8v8H3zM13 12h8v8h-8z"/>',
    text: '<path d="M4 6V4h16v2M12 4v16M9 20h6"/>',
    photo: '<path d="M3 5h18v14H3zM3 15l5-5 4 4 3-3 6 6"/><circle cx="8.5" cy="8.5" r="1.5"/>',
    sticker: '<path d="M12 3a9 9 0 1 1-9 9c0-1 .2-2 .5-3"/><circle cx="9" cy="10" r="1"/><circle cx="15" cy="10" r="1"/><path d="M9 15c1 1 5 1 6 0"/>',
    shape: '<rect x="3" y="3" width="8" height="8" rx="1"/><circle cx="17" cy="7" r="4"/><path d="M7 13l5 8H2z"/>',
    bg: '<path d="M3 3h18v18H3z"/><path d="M3 15l6-6 5 5 3-3 4 4"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
    edit: '<path d="M4 20h4l10-10-4-4L4 16z"/><path d="M14 6l4 4"/>',
    export: '<path d="M12 3v12"/><path d="M8 11l4 4 4-4"/><path d="M4 19h16"/>',
    undo: '<path d="M9 7L4 12l5 5"/><path d="M4 12h11a5 5 0 0 1 0 10h-3"/>',
    redo: '<path d="M15 7l5 5-5 5"/><path d="M20 12H9a5 5 0 0 0 0 10h3"/>',
    trash: '<path d="M4 7h16"/><path d="M9 7V5h6v2"/><path d="M6 7l1 13h10l1-13"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>'
  };
  FS.icon = function (name, size) {
    return '<svg viewBox="0 0 24 24" width="' + (size || 20) + '" height="' + (size || 20) + '" fill="none" stroke="currentColor" ' +
      'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || '') + '</svg>';
  };

  /* Path back to the site root from the current page ('' or '../').
     Derived from the manifest link so it works at any folder depth. */
  FS.BASE = (function () {
    try {
      var m = document.querySelector('link[rel="manifest"]');
      if (m) return m.getAttribute('href').replace('manifest.webmanifest', '');
    } catch (e) {}
    return '';
  })();

  /* Wait for webfonts so canvas text is never drawn in a fallback face. */
  FS.fontsReady = (function () {
    if (document.fonts && document.fonts.ready) {
      return document.fonts.ready.catch(function () { return null; });
    }
    return Promise.resolve(null);
  })();

  /* ------------------------------------------------------------------ */
  /* Toasts                                                              */
  /* ------------------------------------------------------------------ */
  var toastWrap;
  FS.toast = function (msg, kind, ms) {
    if (!toastWrap) {
      toastWrap = FS.el('div', { class: 'toast-wrap', role: 'status', 'aria-live': 'polite' });
      document.body.appendChild(toastWrap);
    }
    var t = FS.el('div', { class: 'toast' + (kind ? ' ' + kind : '') }, FS.esc(FS.t ? FS.t(msg) : msg));
    toastWrap.appendChild(t);
    setTimeout(function () {
      t.style.transition = 'opacity .25s, transform .25s';
      t.style.opacity = '0'; t.style.transform = 'translateY(10px)';
      setTimeout(function () { t.remove(); }, 260);
    }, ms || 2800);
  };

  /* ------------------------------------------------------------------ */
  /* Theme                                                               */
  /* ------------------------------------------------------------------ */
  function systemDark() {
    return global.matchMedia && global.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  FS.applyTheme = function (mode) {
    var m = mode || Store.pref('theme') || (systemDark() ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', m);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', m === 'dark' ? '#14100F' : '#FBF7F4');
    FS.$$('[data-theme-toggle]').forEach(function (b) {
      b.setAttribute('aria-label', m === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      b.setAttribute('aria-pressed', String(m === 'dark'));
    });
    return m;
  };
  FS.toggleTheme = function () {
    var cur = document.documentElement.getAttribute('data-theme');
    var next = cur === 'dark' ? 'light' : 'dark';
    Store.pref('theme', next);
    FS.applyTheme(next);
  };
  /* apply as early as possible to avoid a flash */
  try { FS.applyTheme(); } catch (e) {}

  /* ------------------------------------------------------------------ */
  /* Header behaviour                                                    */
  /* ------------------------------------------------------------------ */
  function initHeader() {
    var btn = document.getElementById('menu-btn');
    var drawer = document.getElementById('drawer');
    if (btn && drawer) {
      btn.addEventListener('click', function () {
        var open = drawer.getAttribute('data-open') === 'true';
        drawer.setAttribute('data-open', String(!open));
        btn.setAttribute('aria-expanded', String(!open));
      });
      document.addEventListener('click', function (e) {
        if (!drawer.contains(e.target) && !btn.contains(e.target)) {
          drawer.setAttribute('data-open', 'false'); btn.setAttribute('aria-expanded', 'false');
        }
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { drawer.setAttribute('data-open', 'false'); btn.setAttribute('aria-expanded', 'false'); }
      });
    }
    FS.$$('[data-theme-toggle]').forEach(function (b) {
      b.addEventListener('click', FS.toggleTheme);
    });
    /* mark current page in nav */
    var here = location.pathname.replace(/index\.html$/, '').replace(/\/$/, '');
    FS.$$('.nav a, .drawer a').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      var p = new URL(href, location.href).pathname.replace(/index\.html$/, '').replace(/\/$/, '');
      if (p === here) a.setAttribute('aria-current', 'page');
    });
  }

  /* ------------------------------------------------------------------ */
  /* Download / share                                                    */
  /* ------------------------------------------------------------------ */
  FS.slugify = function (s) {
    return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'design';
  };

  FS.saveBlob = function (blob, filename) {
    try {
      if (global.navigator && global.navigator.msSaveOrOpenBlob) {
        global.navigator.msSaveOrOpenBlob(blob, filename); return true;
      }
      var url = URL.createObjectURL(blob);
      var a = FS.el('a', { href: url, download: filename, rel: 'noopener' });
      document.body.appendChild(a);
      a.click();
      setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 1500);
      return true;
    } catch (e) {
      FS.toast('Download failed. Long-press the preview image to save it instead.', 'err', 5000);
      return false;
    }
  };

  FS.canvasToBlob = function (canvas, type, quality) {
    return new Promise(function (resolve, reject) {
      try {
        if (canvas.toBlob) {
          canvas.toBlob(function (b) { b ? resolve(b) : reject(new Error('encode failed')); }, type, quality);
        } else {
          var d = canvas.toDataURL(type, quality);
          var bin = atob(d.split(',')[1]), arr = new Uint8Array(bin.length);
          for (var i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
          resolve(new Blob([arr], { type: type }));
        }
      } catch (e) { reject(e); }
    });
  };

  FS.downloadCanvas = function (canvas, filename, type, quality) {
    return FS.canvasToBlob(canvas, type || 'image/png', quality)
      .then(function (blob) {
        FS.saveBlob(blob, filename);
        FS.toast('Saved ' + filename, 'ok');
        return blob;
      })
      .catch(function () {
        FS.toast('Could not export this image. Try a smaller size.', 'err');
      });
  };

  FS.canShareFiles = function (file) {
    return !!(navigator.canShare && navigator.share && navigator.canShare({ files: [file] }));
  };

  FS.shareBlob = function (blob, filename, text) {
    var file = null;
    try { file = new File([blob], filename, { type: blob.type }); } catch (e) { file = null; }
    if (file && FS.canShareFiles(file)) {
      return navigator.share({ files: [file], title: 'Festival Studio', text: text || '' })
        .then(function () { return 'shared'; })
        .catch(function (err) {
          if (err && err.name === 'AbortError') return 'cancelled';
          FS.saveBlob(blob, filename);
          FS.toast('Sharing not available — the image was downloaded instead.');
          return 'downloaded';
        });
    }
    FS.saveBlob(blob, filename);
    FS.toast('Your browser cannot share files directly. The image was downloaded — attach it in WhatsApp.', null, 4500);
    return Promise.resolve('downloaded');
  };

  FS.copyImage = function (blob) {
    if (!global.ClipboardItem || !navigator.clipboard || !navigator.clipboard.write) {
      FS.toast('Copying images is not supported in this browser. Use Download instead.', 'err', 4000);
      return Promise.resolve(false);
    }
    var item = {}; item[blob.type] = blob;
    return navigator.clipboard.write([new global.ClipboardItem(item)])
      .then(function () { FS.toast('Image copied to clipboard', 'ok'); return true; })
      .catch(function () { FS.toast('Could not copy the image. Use Download instead.', 'err'); return false; });
  };

  FS.whatsappShare = function (text) {
    var url = 'https://wa.me/?text=' + encodeURIComponent(text + ' ' + location.origin + (location.pathname || '/'));
    global.open(url, '_blank', 'noopener');
  };

  FS.shareLink = function () {
    var url = location.href;
    if (navigator.share) {
      navigator.share({ title: document.title, url: url }).catch(function () {});
      return;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function () { FS.toast('Link copied', 'ok'); })
        .catch(function () { FS.toast('Copy this link: ' + url, null, 5000); });
    } else FS.toast('Copy this link: ' + url, null, 5000);
  };

  /* ------------------------------------------------------------------ */
  /* Image loading with friendly errors                                  */
  /* ------------------------------------------------------------------ */
  var MAX_DIM = 2600;
  var ALLOWED = ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/bmp', 'image/svg+xml'];

  FS.loadImageFile = function (file) {
    return new Promise(function (resolve, reject) {
      if (!file) return reject(new Error('No file selected.'));
      if (ALLOWED.indexOf(file.type) === -1 && !/\.(png|jpe?g|webp|gif|bmp|svg)$/i.test(file.name)) {
        return reject(new Error('That file type is not supported. Please use JPG, PNG or WebP.'));
      }
      if (file.size > 22 * 1024 * 1024) {
        return reject(new Error('That image is very large (over 22 MB). Please pick a smaller photo.'));
      }
      var reader = new FileReader();
      reader.onerror = function () { reject(new Error('The image could not be read. Try another file.')); };
      reader.onload = function () {
        var img = new Image();
        img.onload = function () {
          try {
            var w = img.naturalWidth, h = img.naturalHeight;
            if (!w || !h) return reject(new Error('That image appears to be empty or corrupted.'));
            if (w > MAX_DIM || h > MAX_DIM) {
              var s = MAX_DIM / Math.max(w, h);
              var c = document.createElement('canvas');
              c.width = Math.round(w * s); c.height = Math.round(h * s);
              c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
              var small = new Image();
              small.onload = function () { resolve({ img: small, src: small.src }); };
              small.onerror = function () { resolve({ img: img, src: reader.result }); };
              small.src = c.toDataURL('image/jpeg', 0.9);
              return;
            }
            resolve({ img: img, src: reader.result });
          } catch (e) { reject(new Error('This image could not be processed in your browser.')); }
        };
        img.onerror = function () { reject(new Error('That image could not be decoded. Try a JPG or PNG.')); };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  };

  /* ------------------------------------------------------------------ */
  /* Grids                                                               */
  /* ------------------------------------------------------------------ */
  function festivalThumbStyle(f) {
    var g = f.gradients[0];
    return 'background:linear-gradient(140deg,' + g.join(',') + ')';
  }

  FS.renderFestivalGrid = function (container, list, opts) {
    opts = opts || {};
    container.innerHTML = '';
    if (!list.length) {
      container.appendChild(FS.el('div', { class: 'empty' },
        '<div class="big">🔍</div><p>No festival matched your search. Try “Diwali”, “Eid” or “Holi”.</p>'));
      return;
    }
    var frag = document.createDocumentFragment();
    list.forEach(function (f) {
      var next = FS.nextDate(f.slug);
      var days = FS.daysUntil(next);
      var when = days == null ? '' : (days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : days + 'd');
      var href = (opts.base || '') + f.slug + '-post-maker/';
      var a = FS.el('a', { class: 'card fest-card', href: href, 'aria-label': f.name + ' post maker' },
        '<div class="thumb" style="' + festivalThumbStyle(f) + '">' +
        '<span class="emoji" aria-hidden="true">' + f.icon + '</span>' +
        (when ? '<span class="when">' + when + '</span>' : '') +
        '</div>' +
        '<div class="meta"><strong>' + FS.esc(f.name) + '</strong><span>' + FS.esc(f.hi) + '</span></div>');
      frag.appendChild(a);
    });
    container.appendChild(frag);
  };

  FS.renderTemplateGrid = function (container, list, opts) {
    opts = opts || {};
    container.innerHTML = '';
    if (!list.length) {
      container.appendChild(FS.el('div', { class: 'empty' },
        '<div class="big">🎨</div><p>No template matched. Clear the filters and try again.</p>'));
      return;
    }
    var frag = document.createDocumentFragment();
    list.forEach(function (t) {
      var card = FS.el('div', { class: 'card tpl-card' });
      var prev = FS.el('div', { class: 'prev' });
      var holder = FS.el('div', { style: 'width:100%' });
      prev.appendChild(holder);
      card.appendChild(prev);
      card.appendChild(FS.el('div', { class: 'info' },
        '<strong>' + FS.esc(t.festivalName) + '</strong>' +
        '<span>' + FS.esc(t.category) + '</span>'));
      var acts = FS.el('div', { class: 'acts' });
      var open = (opts.editorBase || 'post-maker.html') + '?tpl=' + encodeURIComponent(t.id);
      acts.appendChild(FS.el('a', { class: 'btn btn-primary btn-sm', href: open }, 'Create'));
      acts.appendChild(FS.el('a', { class: 'btn btn-ghost btn-sm', href: open + '&edit=1' }, 'Edit'));
      card.appendChild(acts);
      /* Pre-rendered JPEG previews are shipped with the site so search
         engines can index them and the grid stays fast. If one is missing
         (e.g. a brand-new template) we fall back to live canvas rendering. */
      /* Native lazy-loading handles deferral, so the <img> elements are all
         present in the DOM immediately — better for crawlers and for
         "load more" pagination. */
      holder._render = function () {
        var img = FS.el('img', {
          src: FS.BASE + 'assets/templates/' + t.id + '.jpg',
          alt: t.festivalName + ' ' + t.category.toLowerCase() + ' template',
          loading: 'lazy', decoding: 'async', width: 320,
          height: Math.round(320 * (t.previewH || 1))
        });
        img.addEventListener('error', function () {
          /* An aborted request (grid re-rendered, page navigated away) is not
             a real failure — only fall back while the element is still live. */
          if (!img.isConnected) return;
          FS.fontsReady.then(function () {
            try {
              var c = FS.renderToCanvas(FS.buildScene(t, opts.fields), 320);
              c.setAttribute('role', 'img');
              c.setAttribute('aria-label', t.name + ' template preview');
              holder.innerHTML = '';
              holder.appendChild(c);
            } catch (e) { holder.innerHTML = '<div class="empty">Preview unavailable</div>'; }
          });
        });
        holder.innerHTML = '';
        holder.appendChild(img);
      };
      holder._render();
      frag.appendChild(card);
    });
    container.appendChild(frag);
  };

  /* ------------------------------------------------------------------ */
  /* Calendar                                                            */
  /* ------------------------------------------------------------------ */
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  FS.renderCalendar = function (container, year) {
    var rows = FS.calendarFor(year);
    container.innerHTML = '';
    if (!rows.length) {
      container.appendChild(FS.el('div', { class: 'empty' }, '<p>No dates configured for ' + year + ' yet. Add them in <code>js/festivals.js</code>.</p>'));
      return;
    }
    var today = new Date();
    var lastMonth = -1;
    rows.forEach(function (r) {
      if (r.date.getMonth() !== lastMonth) {
        lastMonth = r.date.getMonth();
        container.appendChild(FS.el('div', { class: 'month-head' }, MONTHS[lastMonth] + ' ' + year));
      }
      var days = FS.daysUntil(r.date, today);
      var label = days < 0 ? 'Passed' : days === 0 ? 'Today 🎉' : days === 1 ? 'Tomorrow' : 'in ' + days + ' days';
      var row = FS.el('div', { class: 'cal-row' + (days < 0 ? ' past' : '') },
        '<div class="cal-date"><b>' + r.date.getDate() + '</b><span>' + MONTHS[r.date.getMonth()].slice(0, 3) + '</span></div>' +
        '<div><div class="nm">' + r.festival.icon + ' ' + FS.esc(r.festival.name) +
        (r.approx ? ' <span class="tag">approx</span>' : '') + '</div>' +
        '<div class="hi">' + FS.esc(r.festival.hi) + ' · ' + r.date.toLocaleDateString(undefined, { weekday: 'long' }) + '</div></div>' +
        '<a class="countdown' + (days >= 0 && days <= 14 ? ' soon' : '') + '" href="' + r.festival.slug + '-post-maker/">' + label + '</a>');
      container.appendChild(row);
    });
  };

  /* ------------------------------------------------------------------ */
  /* Homepage hero artwork                                               */
  /* ------------------------------------------------------------------ */
  FS.renderHero = function (holder) {
    var slug = Store.pref('lastFestival') || 'diwali';
    var f = FS.getFestival(slug);
    var upcoming = FS.FESTIVALS.map(function (x) {
      return { f: x, d: FS.daysUntil(FS.nextDate(x.slug)) };
    }).filter(function (x) { return x.d != null && x.d >= 0; }).sort(function (a, b) { return a.d - b.d; })[0];
    if (upcoming && !Store.pref('lastFestival')) f = upcoming.f;
    FS.fontsReady.then(function () {
      var scene = FS.buildScene(f.slug + '--classic', { name: 'From your family' });
      var c = FS.renderToCanvas(scene, 680);
      c.setAttribute('role', 'img');
      c.setAttribute('aria-label', 'Example ' + f.name + ' greeting made with Festival Studio');
      holder.innerHTML = '';
      holder.appendChild(c);
    });
    return f;
  };

  /* ------------------------------------------------------------------ */
  /* Consent, ads and analytics                                          */
  /* ------------------------------------------------------------------ */
  var CFG = global.FS_CONFIG || {};

  function loadScript(src, attrs) {
    var s = document.createElement('script');
    s.src = src; s.async = true;
    Object.keys(attrs || {}).forEach(function (k) { s.setAttribute(k, attrs[k]); });
    s.onerror = function () { /* a blocked ad script must never break the page */ };
    document.head.appendChild(s);
    return s;
  }

  FS.loadMonetisation = function () {
    var ads = CFG.adsense || {};
    if (ads.enabled && ads.client) {
      loadScript('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + encodeURIComponent(ads.client),
        { crossorigin: 'anonymous' });
      FS.$$('.ad-slot').forEach(function (box) {
        var name = box.getAttribute('data-ad-slot');
        var slotId = (ads.slots || {})[name];
        if (!slotId) return;                 /* leave the placeholder visible */
        box.innerHTML = '';
        box.classList.add('ad-live');
        var ins = FS.el('ins', {
          class: 'adsbygoogle', style: 'display:block',
          'data-ad-client': ads.client, 'data-ad-slot': slotId,
          'data-ad-format': 'auto', 'data-full-width-responsive': 'true'
        });
        box.appendChild(ins);
        try { (global.adsbygoogle = global.adsbygoogle || []).push({}); } catch (e) {}
      });
    }
    var an = CFG.analytics || {};
    if (an.enabled && an.ga4) {
      loadScript('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(an.ga4));
      global.dataLayer = global.dataLayer || [];
      global.gtag = function () { global.dataLayer.push(arguments); };
      global.gtag('js', new Date());
      global.gtag('config', an.ga4, { anonymize_ip: true });
    }
  };

  function consentNeeded() {
    var mode = CFG.consent || 'auto';
    if (mode === 'never') return false;
    if (mode === 'always') return true;
    return !!((CFG.adsense && CFG.adsense.enabled) || (CFG.analytics && CFG.analytics.enabled));
  }

  function initConsent() {
    if (!consentNeeded()) {
      /* nothing that needs consent is configured — load whatever is on */
      FS.loadMonetisation();
      return;
    }
    var saved = Store.pref('consent');
    if (saved === 'accepted') { FS.loadMonetisation(); return; }
    if (saved === 'declined') return;

    var bar = FS.el('div', { class: 'consent', role: 'dialog', 'aria-live': 'polite', 'aria-label': 'Cookie notice' });
    bar.innerHTML =
      '<p>We use cookies for advertising and basic traffic measurement. Your designs and photos are never uploaded or shared. ' +
      '<a href="' + (document.querySelector('a[href$="privacy.html"]') ? document.querySelector('a[href$="privacy.html"]').getAttribute('href') : 'privacy.html') + '">Privacy Policy</a></p>';
    var row = FS.el('div', { class: 'consent-actions' });
    var no = FS.el('button', { class: 'btn btn-ghost btn-sm', type: 'button' }, 'Decline');
    var yes = FS.el('button', { class: 'btn btn-primary btn-sm', type: 'button' }, 'Accept');
    no.addEventListener('click', function () { Store.pref('consent', 'declined'); bar.remove(); });
    yes.addEventListener('click', function () { Store.pref('consent', 'accepted'); bar.remove(); FS.loadMonetisation(); });
    row.appendChild(no); row.appendChild(yes);
    bar.appendChild(row);
    document.body.appendChild(bar);
  }

  /* ------------------------------------------------------------------ */
  /* Add-to-home-screen                                                  */
  /* ------------------------------------------------------------------ */
  var deferredPrompt = null;
  global.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    FS.$$('[data-install]').forEach(function (b) { b.hidden = false; });
  });
  function initInstall() {
    if (CFG.installPrompt === false) return;
    FS.$$('[data-install]').forEach(function (b) {
      b.addEventListener('click', function () {
        if (!deferredPrompt) { FS.toast('Use your browser menu → “Add to Home screen”.'); return; }
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(function () {
          deferredPrompt = null;
          FS.$$('[data-install]').forEach(function (x) { x.hidden = true; });
        });
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Copy-to-clipboard buttons (wishes pages)                            */
  /* ------------------------------------------------------------------ */
  function initCopyButtons() {
    FS.$$('[data-copy]').forEach(function (b) {
      b.addEventListener('click', function () {
        var text = b.getAttribute('data-copy');
        var done = function () {
          var old = b.textContent;
          b.textContent = '✓';
          FS.toast('Copied', 'ok', 1400);
          setTimeout(function () { b.textContent = old; }, 1400);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done).catch(function () {
            FS.toast('Could not copy — select the text and copy manually.', 'err');
          });
        } else {
          try {
            var ta = FS.el('textarea', { style: 'position:fixed;opacity:0' });
            ta.value = text; document.body.appendChild(ta); ta.select();
            document.execCommand('copy'); ta.remove(); done();
          } catch (e) { FS.toast('Could not copy — select the text and copy manually.', 'err'); }
        }
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Language switch (English ⇄ हिन्दी)                                   */
  /* ------------------------------------------------------------------ */
  function initLangSwitch() {
    FS.$$('[data-lang-switch]').forEach(function (a) {
      /* the page builder already wrote a relative href; only fall back to the
         absolute hreflang link if it is missing, and hide the pill if neither
         is available. */
      if (a.getAttribute('href')) return;
      var href = FS.altLangHref && FS.altLangHref();
      if (href) a.setAttribute('href', href);
      else a.hidden = true;
    });
  }

  /* ------------------------------------------------------------------ */
  /* Boot                                                                */
  /* ------------------------------------------------------------------ */
  FS.ready(function () {
    initHeader();
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();

    /* Homepage bits ---------------------------------------------------- */
    var fgrid = document.getElementById('festival-grid');
    if (fgrid) {
      var render = function (q) { FS.renderFestivalGrid(fgrid, FS.searchFestivals(q)); };
      render('');
      var input = document.getElementById('festival-search');
      if (input) {
        var tid;
        input.addEventListener('input', function () {
          clearTimeout(tid);
          tid = setTimeout(function () { render(input.value); }, 120);
        });
        var form = input.closest('form');
        if (form) form.addEventListener('submit', function (e) { e.preventDefault(); render(input.value); });
      }
    }

    var hero = document.getElementById('hero-art');
    if (hero) FS.renderHero(hero);

    var cal = document.getElementById('calendar-list');
    if (cal) {
      var sel = document.getElementById('calendar-year');
      var years = FS.availableYears();
      var nowY = new Date().getFullYear();
      var startY = years.indexOf(nowY) >= 0 ? nowY : years[0];
      if (sel) {
        years.forEach(function (yy) {
          sel.appendChild(FS.el('option', { value: yy, selected: yy === startY ? 'selected' : null }, String(yy)));
        });
        sel.addEventListener('change', function () { FS.renderCalendar(cal, Number(sel.value)); });
      }
      FS.renderCalendar(cal, startY);
    }

    /* Upcoming strip on the homepage ----------------------------------- */
    var up = document.getElementById('upcoming-list');
    if (up) {
      var soon = FS.FESTIVALS.map(function (x) { return { f: x, d: FS.daysUntil(FS.nextDate(x.slug)) }; })
        .filter(function (x) { return x.d != null && x.d >= 0; })
        .sort(function (a, b) { return a.d - b.d; }).slice(0, 4);
      soon.forEach(function (s) {
        up.appendChild(FS.el('a', { class: 'card card-pad', href: s.f.slug + '-post-maker/', style: 'display:flex;gap:12px;align-items:center' },
          '<span style="font-size:1.8rem" aria-hidden="true">' + s.f.icon + '</span>' +
          '<span><strong style="display:block">' + FS.esc(s.f.name) + '</strong>' +
          '<small class="muted">' + (s.d === 0 ? 'Today' : s.d === 1 ? 'Tomorrow' : 'in ' + s.d + ' days') + '</small></span>'));
      });
    }

    /* Share buttons on any page ---------------------------------------- */
    FS.$$('[data-share-link]').forEach(function (b) { b.addEventListener('click', FS.shareLink); });

    initConsent();
    initInstall();
    initCopyButtons();
    initLangSwitch();

    /* Offline support (progressive enhancement, never required) --------- */
    if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
      var swPath = (document.querySelector('link[rel="manifest"]') || {}).getAttribute
        ? document.querySelector('link[rel="manifest"]').getAttribute('href').replace('manifest.webmanifest', 'sw.js')
        : 'sw.js';
      navigator.serviceWorker.register(swPath).catch(function () { /* offline mode simply stays off */ });
    }

    /* Storage notice --------------------------------------------------- */
    if (!Store.ok) {
      FS.$$('[data-storage-warning]').forEach(function (n) {
        n.textContent = 'Your browser is blocking local storage, so drafts and preferences cannot be saved on this device. Everything else works normally.';
        n.hidden = false;
      });
    }
  });
})(window);
