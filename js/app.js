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
      var backdrop = document.getElementById('drawer-backdrop');
      if (!backdrop) {
        backdrop = FS.el('div', { id: 'drawer-backdrop', class: 'drawer-backdrop', 'aria-hidden': 'true' });
        drawer.parentNode.insertBefore(backdrop, drawer);
      }

      function setDrawer(open) {
        var isOpen = Boolean(open);
        drawer.setAttribute('data-open', String(isOpen));
        backdrop.setAttribute('data-open', String(isOpen));
        btn.setAttribute('aria-expanded', String(isOpen));
        btn.setAttribute('aria-label', isOpen
          ? (FS.LANG === 'hi' ? 'मेनू बंद करें' : 'Close menu')
          : (FS.LANG === 'hi' ? 'मेनू खोलें' : 'Open menu'));
        btn.innerHTML = isOpen ? FS.icon('close', 19) : FS.icon('menu', 19);
        document.body.classList.toggle('drawer-open', isOpen);
      }

      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = drawer.getAttribute('data-open') === 'true';
        setDrawer(!open);
      });

      backdrop.addEventListener('click', function () {
        setDrawer(false);
      });

      drawer.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          setDrawer(false);
        });
      });

      document.addEventListener('click', function (e) {
        if (!drawer.contains(e.target) && !btn.contains(e.target)) {
          setDrawer(false);
        }
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { setDrawer(false); }
      });
    }
    FS.$$('[data-theme-toggle]').forEach(function (b) {
      b.addEventListener('click', FS.toggleTheme);
    });

    var isHi = FS.LANG === 'hi';
    var isApp = FS.isApp();
    var actions = document.querySelector('.header-actions');

    // In App mode: keep header clean, native, and app-like
    if (isApp) {
      var logoSpan = document.querySelector('.logo span');
      if (logoSpan && !logoSpan.querySelector('.app-mode-badge')) {
        var badge = FS.el('span', { class: 'app-mode-badge' }, 'PRO');
        logoSpan.appendChild(badge);
      }
      // Remove any website mode switch in app mode
      var existingModeBtn = actions && actions.querySelector('[data-mode-toggle]');
      if (existingModeBtn) existingModeBtn.remove();
    } else {
      // In Website mode: add prominent "Download App" button in header
      if (actions && !actions.querySelector('.btn-download-app')) {
        var appPath = (FS.BASE || '') + (isHi ? 'hi/app.html' : 'app.html');
        var dlLink = FS.el('a', {
          class: 'btn-download-app',
          href: appPath,
          'data-download-app': '1',
          'aria-label': isHi ? 'ऐप डाउनलोड करें' : 'Download Festival Studio App'
        });
        dlLink.innerHTML =
          '<svg viewBox="0 0 24 24"><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993 0 .5511-.4483.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.996-3.4572c.1054-.1824.043-.4154-.1394-.5208-.1827-.1054-.4154-.043-.5208.1394l-2.022 3.5022C15.688 8.4878 13.9048 8.01 12 8.01s-3.688.4878-5.1953 1.4851L4.7827 5.993c-.1054-.1824-.3381-.2448-.5208-.1394-.1824.1054-.2448.3384-.1394.5208l1.996 3.4572C2.6887 11.7588 0 16.0357 0 20.999h24c0-4.9633-2.6887-9.2402-6.1185-11.6776"/></svg>' +
          '<span>' + (isHi ? 'ऐप डाउनलोड' : 'Download App') + '</span>';
        actions.insertBefore(dlLink, actions.firstChild);
      }
    }

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
  /* On a Hindi page the Devanagari name leads and the English name sits
     underneath; on an English page it is the other way round. */
  FS.festName = function (f) { return FS.LANG === 'hi' ? f.hi : f.name; };
  FS.festSubName = function (f) { return FS.LANG === 'hi' ? f.name : f.hi; };

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
        '<div class="meta"><strong>' + FS.esc(FS.festName(f)) + '</strong><span>' + FS.esc(FS.festSubName(f)) + '</span></div>');
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
          alt: FS.festName(FS.getFestival(t.festival)) + ' ' + t.category.toLowerCase() + ' template',
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
      var label = days < 0 ? FS.t('Passed') : days === 0 ? FS.t('Today') + ' 🎉'
        : days === 1 ? FS.t('Tomorrow') : FS.t('in') + ' ' + days + ' ' + FS.t('days');
      var row = FS.el('div', { class: 'cal-row' + (days < 0 ? ' past' : '') },
        '<div class="cal-date"><b>' + r.date.getDate() + '</b><span>' + MONTHS[r.date.getMonth()].slice(0, 3) + '</span></div>' +
        '<div><div class="nm">' + r.festival.icon + ' ' + FS.esc(FS.festName(r.festival)) +
        (r.approx ? ' <span class="tag">approx</span>' : '') + '</div>' +
        '<div class="hi">' + FS.esc(FS.festSubName(r.festival)) + ' · ' + r.date.toLocaleDateString(undefined, { weekday: 'long' }) + '</div></div>' +
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
  /* Website vs App Separation                                           */
  /* ------------------------------------------------------------------ */
  FS.isApp = function () {
    if (typeof window === 'undefined') return false;
    // 0. Android WebView AssetLoader origin
    if (window.location && window.location.hostname === 'appassets.androidplatform.net') return true;

    // 1. Explicit query parameter (?app=1 or ?mode=app or ?source=app)
    var search = window.location.search || '';
    if (/[?&](app=1|app=true|mode=app|source=app)(&|$)/i.test(search)) return true;
    if (/[?&]mode=web(&|$)/i.test(search)) return false;

    // 2. Saved preference for testing or explicit choice
    var savedMode = Store.pref('env_mode');
    if (savedMode === 'app') return true;
    if (savedMode === 'web') return false;

    // 3. Android WebView / Hybrid wrapper / Native interface
    if (window.AndroidBridge || window.AndroidAdMob || window.AdMob || window.isFestivalStudioApp) return true;
    if (/FestivalStudioApp|wv|WebView/i.test(navigator.userAgent) && !/Chrome\/[.0-9]+ Mobile/i.test(navigator.userAgent.replace(/Version\/[.0-9]+/i, ''))) {
      return true;
    }

    // 4. Standalone display-mode (PWA installed app)
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) return true;
    if (window.navigator.standalone === true) return true;
    return false;
  };

  FS.setAppMode = function (isApp) {
    Store.pref('env_mode', isApp ? 'app' : 'web');
    var url = new URL(window.location.href);
    url.searchParams.set('mode', isApp ? 'app' : 'web');
    window.location.href = url.toString();
  };

  /* ------------------------------------------------------------------ */
  /* Google AdMob Engine (Strictly for App Mode)                         */
  /* ------------------------------------------------------------------ */
  FS.AdMob = {
    initialized: false,
    cfg: function () {
      return (CFG && CFG.admob) || { enabled: true, testMode: true };
    },
    init: function () {
      if (!FS.isApp()) return; // AdMob only runs in App!
      var c = this.cfg();
      if (!c.enabled) return;
      if (this.initialized) return;
      this.initialized = true;

      // 1. Native Android / Capacitor / Cordova bridge check
      if (window.AndroidAdMob && typeof window.AndroidAdMob.init === 'function') {
        try { window.AndroidAdMob.init(c.appId || '', c.testMode !== false); } catch (e) {}
      }
      if (window.AndroidAdMob && typeof window.AndroidAdMob.showBanner === 'function') {
        try { window.AndroidAdMob.showBanner(c.bannerSlotId || ''); } catch (e) {}
        return;
      }
      if (window.AdMob && typeof window.AdMob.showBanner === 'function') {
        try { window.AdMob.showBanner(c.bannerSlotId || ''); } catch (e) {}
        return;
      }

      // 2. Render In-App AdMob Units
      this.renderAppBanners();
    },

    createBannerElement: function () {
      var c = this.cfg();
      var isTest = c.testMode !== false;
      var banner = FS.el('div', { class: 'admob-banner-wrap' });
      banner.innerHTML =
        '<div class="admob-banner-top">' +
          '<span>Google AdMob · In-App Unit</span>' +
          '<span class="admob-badge' + (isTest ? ' test' : '') + '">' + (isTest ? 'TEST AD' : 'AD') + '</span>' +
        '</div>' +
        '<div class="admob-banner-content">' +
          '<div class="admob-app-icon">🎨</div>' +
          '<div class="admob-app-details">' +
            '<strong>Festival Studio Mobile App</strong>' +
            '<span>Create Diwali, Holi & festival posts with your photo & business logo.</span>' +
          '</div>' +
          '<a class="admob-cta-btn" href="' + (c.appDownloadUrl || 'post-maker.html') + '">Create Post</a>' +
        '</div>';
      return banner;
    },

    renderAppBanners: function () {
      if (!FS.isApp()) return;
      var banners = FS.$$('[data-admob-slot], .admob-placeholder');
      if (banners.length) {
        banners.forEach(function (slot) {
          slot.innerHTML = '';
          slot.appendChild(FS.AdMob.createBannerElement());
        });
      } else {
        var wrap = document.querySelector('.wrap');
        if (wrap && !document.querySelector('.admob-banner-wrap')) {
          wrap.appendChild(this.createBannerElement());
        }
      }
    },

    showInterstitial: function (onClose) {
      if (!FS.isApp()) {
        if (typeof onClose === 'function') onClose();
        return;
      }
      var c = this.cfg();
      if (!c.enabled) {
        if (typeof onClose === 'function') onClose();
        return;
      }

      // Check native bridge
      if (window.AndroidAdMob && typeof window.AndroidAdMob.showInterstitial === 'function') {
        try {
          window.AndroidAdMob.showInterstitial(c.interstitialSlotId || '');
          if (typeof onClose === 'function') onClose();
          return;
        } catch (e) {}
      }
      if (window.AdMob && typeof window.AdMob.showInterstitial === 'function') {
        try {
          window.AdMob.showInterstitial(c.interstitialSlotId || '');
          if (typeof onClose === 'function') onClose();
          return;
        } catch (e) {}
      }

      // Display AdMob Interstitial Modal
      var overlay = FS.el('div', { class: 'admob-interstitial-back', role: 'dialog', 'aria-modal': 'true' });
      var box = FS.el('div', { class: 'admob-interstitial-box' });
      var bar = FS.el('div', { class: 'admob-interstitial-bar' });
      bar.innerHTML = '<span class="admob-badge' + (c.testMode !== false ? ' test' : '') + '">AdMob Interstitial Ad</span>';

      var closeBtn = FS.el('button', { class: 'admob-close-btn', type: 'button', disabled: 'disabled' }, 'Close in 3s');
      bar.appendChild(closeBtn);
      box.appendChild(bar);

      var body = FS.el('div', { class: 'admob-interstitial-body' });
      body.innerHTML =
        '<div class="admob-interstitial-media">🪔</div>' +
        '<h3 style="margin:0 0 6px">Festival Studio App</h3>' +
        '<p style="color:var(--muted);font-size:.9rem;margin:0 0 10px">Download unlimited HD festival posters and animated GIFs with no watermark.</p>' +
        '<div class="admob-rating">★★★★★ 4.9 · 100K+ creators in India</div>' +
        '<div style="margin-top:18px"><button class="btn btn-primary btn-block" type="button" id="admob-action-btn">Continue to Design</button></div>';
      box.appendChild(body);
      overlay.appendChild(box);
      document.body.appendChild(overlay);

      var count = 3;
      var timer = setInterval(function () {
        count--;
        if (count > 0) {
          closeBtn.textContent = 'Close in ' + count + 's';
        } else {
          clearInterval(timer);
          closeBtn.textContent = '✕ Close Ad';
          closeBtn.removeAttribute('disabled');
        }
      }, 1000);

      function dismiss() {
        clearInterval(timer);
        overlay.remove();
        if (typeof onClose === 'function') onClose();
      }

      closeBtn.addEventListener('click', function () {
        if (!closeBtn.hasAttribute('disabled')) dismiss();
      });
      var actionBtn = body.querySelector('#admob-action-btn');
      if (actionBtn) actionBtn.addEventListener('click', dismiss);
    }
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
    // CRITICAL: Website ads must NEVER run in the app!
    if (FS.isApp()) {
      return;
    }

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
    // Suppress cookie consent for website ads when in app mode
    if (FS.isApp()) return false;
    var mode = CFG.consent || 'auto';
    if (mode === 'never') return false;
    if (mode === 'always') return true;
    return !!((CFG.adsense && CFG.adsense.enabled) || (CFG.analytics && CFG.analytics.enabled));
  }

  function initConsent() {
    if (FS.isApp()) return; // App mode does not show website cookie/ad dialog
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
  /* Direct App Download / Remove legacy browser install prompts         */
  /* ------------------------------------------------------------------ */
  function initInstall() {
    // Permanently remove any legacy browser install buttons
    FS.$$('[data-install]').forEach(function (b) { b.remove(); });
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
  /* Mobile App Bottom Navigation (App Mode)                            */
  /* ------------------------------------------------------------------ */
  function initAppBottomNav() {
    if (!FS.isApp()) return;
    if (document.querySelector('.app-bottom-nav')) return;

    var nav = FS.el('nav', { class: 'app-bottom-nav', 'aria-label': 'App Navigation' });
    var isHi = FS.LANG === 'hi';
    var base = FS.BASE || '';
    var path = location.pathname;

    var items = [
      { href: base + (isHi ? 'hi/index.html' : 'index.html') + '?mode=app', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>', label: isHi ? 'होम' : 'Home', match: /index\.html$|^(\/hi)?\/$/ },
      { href: base + (isHi ? 'hi/post-maker.html' : 'post-maker.html') + '?mode=app', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>', label: isHi ? 'पोस्ट' : 'Post', match: /post-maker/ },
      { href: base + (isHi ? 'hi/gif-maker.html' : 'gif-maker.html') + '?mode=app', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>', label: isHi ? 'GIF' : 'GIF', match: /gif-maker/ },
      { href: base + (isHi ? 'hi/status-maker.html' : 'status-maker.html') + '?mode=app', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>', label: isHi ? 'स्टेटस' : 'Status', match: /status-maker/ },
      { href: base + (isHi ? 'hi/templates.html' : 'templates.html') + '?mode=app', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>', label: isHi ? 'टेम्पलेट' : 'Templates', match: /templates/ }
    ];

    items.forEach(function (it) {
      var a = FS.el('a', { class: 'app-nav-item' + (it.match.test(path) ? ' active' : ''), href: it.href });
      a.innerHTML = it.icon + '<span>' + FS.esc(it.label) + '</span>';
      nav.appendChild(a);
    });

    document.body.appendChild(nav);
  }

  /* ------------------------------------------------------------------ */
  /* Download App handlers (Website Mode)                                */
  /* ------------------------------------------------------------------ */
  function initDownloadButtons() {
    FS.$$('[data-download-apk], [data-download-app]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var isDirectApk = btn.hasAttribute('data-download-apk') || btn.getAttribute('data-download-app') === 'apk';
        if (isDirectApk) {
          e.preventDefault();
          var apkUrl = (CFG.app && CFG.app.apkDownloadUrl) || '/downloads/FestivalStudio.apk';
          FS.toast(FS.t('Downloading Festival Studio Android APK...'), 'ok', 3500);
          var a = document.createElement('a');
          a.href = apkUrl;
          a.download = 'FestivalStudio.apk';
          document.body.appendChild(a);
          a.click();
          a.remove();
        }
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Boot                                                                */
  /* ------------------------------------------------------------------ */
  FS.ready(function () {
    // Setup Environment Mode: Website vs App
    if (FS.isApp()) {
      Store.pref('env_mode', 'app');
      document.documentElement.setAttribute('data-env', 'app');
      document.body.classList.add('is-app-mode');

      // CRITICAL: Remove all website-only elements in App mode
      FS.$$('.site-footer, .breadcrumb, .skip-link, .ad-slot, .consent, .web-only, .footer-app-cta, .btn-download-app, [data-download-apk], [data-download-app], .download-app-banner, .download-app-actions').forEach(function (box) {
        box.remove();
      });

      // Customize Drawer for App Mode
      var drawer = document.getElementById('drawer');
      if (drawer) {
        // Remove website-only links from drawer
        drawer.querySelectorAll('a').forEach(function (a) {
          var h = a.getAttribute('href') || '';
          if (/about|contact|faq|how-it-works|app\.html|cookies|terms|privacy|licences|dmca|sitemap/i.test(h)) {
            a.remove();
          }
        });
        if (!drawer.querySelector('.app-info-card')) {
          var isHi = FS.LANG === 'hi';
          var card = FS.el('div', { class: 'app-info-card' });
          card.innerHTML =
            '<strong>✨ ' + (isHi ? 'फेस्टिवल स्टूडियो प्रो' : 'Festival Studio Pro') + '</strong>' +
            '<div style="color:var(--muted);font-size:.78rem">v2.4.0 · Official Mobile Build</div>' +
            '<div class="app-status-badge">⚡ ' + (isHi ? 'ऑफ़लाइन रेडी' : 'Offline Ready') + '</div>' +
            '<div style="margin-top:14px;display:flex;flex-direction:column;gap:8px">' +
              '<button type="button" class="btn btn-ghost btn-sm" id="btn-clear-cache" style="width:100%;font-size:.75rem">' +
                '🧹 ' + (isHi ? 'कैश / ड्राफ्ट साफ़ करें' : 'Clear Cache & Drafts') +
              '</button>' +
            '</div>';
          drawer.appendChild(card);
          var clrBtn = card.querySelector('#btn-clear-cache');
          if (clrBtn) {
            clrBtn.addEventListener('click', function () {
              try {
                localStorage.removeItem('fs:scene');
                localStorage.removeItem('fs:history');
                FS.toast(isHi ? 'ड्राफ्ट साफ़ कर दिया गया' : 'Drafts cache cleared', 'ok');
              } catch (e) {}
            });
          }
        }
      }

      // Seamless in-app navigation
      document.addEventListener('click', function (e) {
        var a = e.target.closest('a');
        if (!a || !a.href) return;
        try {
          var u = new URL(a.href, window.location.href);
          if (u.origin === window.location.origin) {
            if (!u.searchParams.has('mode') && !u.pathname.endsWith('.apk') && !u.pathname.endsWith('.zip')) {
              u.searchParams.set('mode', 'app');
              a.href = u.toString();
            }
          }
        } catch (err) {}
      }, true);

      // Initialize AdMob in app
      FS.AdMob.init();
      initAppBottomNav();
    } else {
      initConsent();
      initDownloadButtons();
    }

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
          '<span><strong style="display:block">' + FS.esc(FS.festName(s.f)) + '</strong>' +
          '<small class="muted">' + (s.d === 0 ? FS.t('Today') : s.d === 1 ? FS.t('Tomorrow') : FS.t('in') + ' ' + s.d + ' ' + FS.t('days')) + '</small></span>'));
      });
    }

    /* Share buttons on any page ---------------------------------------- */
    FS.$$('[data-share-link]').forEach(function (b) { b.addEventListener('click', FS.shareLink); });

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
