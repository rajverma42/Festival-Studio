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
  FS.ready = FS.ready || function (fn) {
    if (typeof fn !== 'function') return;
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
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
    tips: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>'
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
  
  /* ------------------------------------------------------------------ */
  /* Quick Settings & Options Panel (3-line Menu / Settings Modal)      */
  /* ------------------------------------------------------------------ */
  FS.openSettingsModal = function () {
    var existing = document.getElementById('fs-settings-modal');
    if (existing) { existing.remove(); return; }

    var isHi = FS.LANG === 'hi';
    var isApp = FS.isApp && FS.isApp();
    var currentTheme = document.documentElement.getAttribute('data-theme') || 'light';

    var modal = FS.el('div', {
      id: 'fs-settings-modal',
      class: 'app-update-modal-backdrop fs-settings-backdrop',
      role: 'dialog',
      'aria-modal': 'true',
      'aria-label': isHi ? 'सेटिंग्स और विकल्प' : 'Settings & Options'
    });

    modal.innerHTML =
      '<div class="app-update-card fs-settings-card" style="max-width:440px;width:92%;max-height:86vh;display:flex;flex-direction:column;border-radius:20px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,0.22);">' +
        '<div class="app-update-header" style="padding:16px 20px;border-bottom:1px solid var(--border,#e2e8f0);background:var(--surface,#fff);">' +
          '<div style="display:flex;align-items:center;gap:12px;flex:1;">' +
            '<div style="width:40px;height:40px;border-radius:12px;background:linear-gradient(135deg,#ff7700,#e11d48);color:#fff;display:flex;align-items:center;justify-content:center;font-size:20px;">' +
              '⚙️' +
            '</div>' +
            '<div>' +
              '<h3 style="margin:0;font-size:17px;font-weight:700;color:var(--text,#111);">' + (isHi ? 'सेटिंग्स और विकल्प' : 'Settings & Options') + '</h3>' +
              '<p style="margin:2px 0 0;font-size:12px;color:var(--muted,#666);">' + (isHi ? 'ऐप वरीयताएँ, भाषा व इंस्टॉल' : 'Preferences, display & app install') + '</p>' +
            '</div>' +
          '</div>' +
          '<button type="button" class="app-update-close" aria-label="Close" style="font-size:24px;border:none;background:none;cursor:pointer;color:var(--muted,#666);">&times;</button>' +
        '</div>' +

        '<div class="fs-settings-body" style="padding:18px 20px;overflow-y:auto;flex:1;display:flex;flex-direction:column;gap:18px;background:var(--bg,#fbf7f4);">' +

          /* Section 1: Appearance & Display */
          '<div>' +
            '<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--muted,#64748b);margin-bottom:8px;">' +
              (isHi ? 'दिखावट (Appearance)' : 'Appearance & Theme') +
            '</div>' +
            '<div class="card" style="padding:12px 14px;border-radius:14px;background:var(--surface,#fff);border:1px solid var(--border,#e2e8f0);display:flex;flex-direction:column;gap:12px;">' +
              '<div style="display:flex;align-items:center;justify-content:space-between;">' +
                '<div style="display:flex;align-items:center;gap:10px;">' +
                  '<span style="font-size:20px;">🌓</span>' +
                  '<div><strong style="font-size:13px;color:var(--text,#111);">' + (isHi ? 'कलर थीम' : 'Color Theme') + '</strong><span style="display:block;font-size:11px;color:var(--muted,#777);">' + (currentTheme === 'dark' ? (isHi ? 'डार्क मोड सक्रिय' : 'Dark mode active') : (isHi ? 'लाइट मोड सक्रिय' : 'Light mode active')) + '</span></div>' +
                '</div>' +
                '<button type="button" class="btn btn-soft btn-sm btn-settings-theme" style="padding:5px 12px;font-size:12px;font-weight:600;border-radius:20px;">' +
                  (currentTheme === 'dark' ? '🌙 Dark' : '☀️ Light') +
                '</button>' +
              '</div>' +
              '<div style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid var(--border,#f1f5f9);padding-top:10px;">' +
                '<div style="display:flex;align-items:center;gap:10px;">' +
                  '<span style="font-size:20px;">🌐</span>' +
                  '<div><strong style="font-size:13px;color:var(--text,#111);">' + (isHi ? 'भाषा (Language)' : 'Language') + '</strong><span style="display:block;font-size:11px;color:var(--muted,#777);">' + (isHi ? 'हिन्दी चुनी गई है' : 'English selected') + '</span></div>' +
                '</div>' +
                '<div style="display:flex;gap:4px;">' +
                  '<button type="button" class="btn btn-sm ' + (!isHi ? 'btn-primary' : 'btn-ghost') + ' btn-set-en" style="padding:4px 10px;font-size:11px;border-radius:20px;">EN</button>' +
                  '<button type="button" class="btn btn-sm ' + (isHi ? 'btn-primary' : 'btn-ghost') + ' btn-set-hi" style="padding:4px 10px;font-size:11px;border-radius:20px;">हिन्दी</button>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +

          /* Section 2: In App Mode -> App Update Check | In Website Mode -> App Install Option */
          '<div>' +
            '<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--muted,#64748b);margin-bottom:8px;">' +
              (isApp ? (isHi ? 'ऐप अपडेट और वर्शन' : 'App Updates & Version') : (isHi ? 'मोबाइल ऐप (Install Festival Studio)' : 'Festival Studio Mobile App')) +
            '</div>' +
            '<div class="card" style="padding:14px;border-radius:14px;background:var(--surface,#fff);border:1px solid var(--border,#e2e8f0);display:flex;flex-direction:column;gap:10px;">' +
              (isApp ? (
                /* APP MODE ONLY: Check for Updates */
                '<div style="display:flex;align-items:center;justify-content:space-between;">' +
                  '<div style="display:flex;align-items:center;gap:10px;">' +
                    '<span style="font-size:22px;">🔄</span>' +
                    '<div>' +
                      '<strong style="font-size:13px;color:var(--text,#111);">' + (isHi ? 'ऐप अपडेट चेक करें' : 'Check for Updates') + '</strong>' +
                      '<span style="display:block;font-size:11px;color:var(--muted,#777);">' + (isHi ? 'वर्तमान वर्शन: v2.4.0 (लेटेस्ट)' : 'Current Version: v2.4.0 (Latest)') + '</span>' +
                    '</div>' +
                  '</div>' +
                  '<button type="button" class="btn btn-primary btn-sm btn-check-app-update" style="font-size:12px;padding:6px 14px;border-radius:12px;font-weight:600;">' +
                    '🔄 ' + (isHi ? 'अपडेट चेक करें' : 'Check Now') +
                  '</button>' +
                '</div>'
              ) : (
                /* WEBSITE MODE ONLY: Install App Option */
                '<div style="display:flex;align-items:center;gap:10px;">' +
                  '<span style="font-size:22px;">📲</span>' +
                  '<div style="flex:1;">' +
                    '<strong style="font-size:13px;color:var(--text,#111);">' + (isHi ? 'Festival Studio ऐप इंस्टॉल करें' : 'Install Festival Studio App') + '</strong>' +
                    '<span style="display:block;font-size:11px;color:var(--muted,#777);">' + (isHi ? 'बिना इंटरनेट ऑफलाइन भी चलेगा · 100% फ्री' : 'Works 100% offline · No signup') + '</span>' +
                  '</div>' +
                '</div>' +
                '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:6px;">' +
                  '<button type="button" class="btn btn-primary btn-sm btn-trigger-install" style="font-size:12px;padding:8px 10px;border-radius:10px;justify-content:center;font-weight:600;">' +
                    '⚡ ' + (isHi ? 'ऐप इंस्टॉल करें' : 'Install App') +
                  '</button>' +
                  '<a href="/downloads/FestivalStudio.apk" download="FestivalStudio.apk" class="btn btn-ghost btn-sm" style="font-size:12px;padding:8px 10px;border-radius:10px;justify-content:center;text-decoration:none;">' +
                    '📥 ' + (isHi ? 'APK डाउनलोड' : 'Download APK') +
                  '</a>' +
                '</div>'
              )) +
            '</div>' +
          '</div>' +

          /* Section 3: Data & Offline Cache */
          '<div>' +
            '<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--muted,#64748b);margin-bottom:8px;">' +
              (isHi ? 'डेटा व स्टोरेज' : 'Data & Local Storage') +
            '</div>' +
            '<div class="card" style="padding:12px 14px;border-radius:14px;background:var(--surface,#fff);border:1px solid var(--border,#e2e8f0);display:flex;align-items:center;justify-content:space-between;">' +
              '<div style="display:flex;align-items:center;gap:10px;">' +
                '<span style="font-size:18px;">🧹</span>' +
                '<div><strong style="font-size:13px;color:var(--text,#111);">' + (isHi ? 'लोकल ड्राफ्ट्स व कैश' : 'Local Drafts & Storage') + '</strong><span style="display:block;font-size:11px;color:var(--muted,#777);">' + (isHi ? 'स्थानीय डिवाइस पर सुरक्षित' : 'Safe on-device storage') + '</span></div>' +
              '</div>' +
              '<button type="button" class="btn btn-ghost btn-sm btn-clear-cache" style="padding:4px 10px;font-size:11px;border-radius:8px;">' +
                (isHi ? 'खाली करें' : 'Clear Drafts') +
              '</button>' +
            '</div>' +
          '</div>' +

          /* Section 4: Links & Privacy */
          '<div style="display:flex;justify-content:center;gap:14px;font-size:12px;padding:4px 0;">' +
            '<a href="/privacy.html" style="color:var(--muted,#666);text-decoration:underline;">' + (isHi ? 'गोपनीयता नीति' : 'Privacy Policy') + '</a>' +
            '<span style="color:var(--muted,#ccc);">•</span>' +
            '<a href="/terms.html" style="color:var(--muted,#666);text-decoration:underline;">' + (isHi ? 'नियम व शर्तें' : 'Terms') + '</a>' +
            '<span style="color:var(--muted,#ccc);">•</span>' +
            '<a href="/about.html" style="color:var(--muted,#666);text-decoration:underline;">' + (isHi ? 'हमारे बारे में' : 'About') + '</a>' +
          '</div>' +

        '</div>' +
      '</div>';

    document.body.appendChild(modal);

    function closeModal() {
      modal.classList.add('closing');
      setTimeout(function () { modal.remove(); }, 200);
    }

    var closeBtn = modal.querySelector('.app-update-close');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });

    // Theme toggle
    var themeBtn = modal.querySelector('.btn-settings-theme');
    if (themeBtn) {
      themeBtn.addEventListener('click', function () {
        var now = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', now);
        try {
          var p = JSON.parse(localStorage.getItem('fs:prefs') || '{}');
          p.theme = now;
          localStorage.setItem('fs:prefs', JSON.stringify(p));
        } catch (e) {}
        themeBtn.textContent = now === 'dark' ? '🌙 Dark' : '☀️ Light';
        FS.toast(now === 'dark' ? 'डार्क मोड सक्रिय' : 'लाइट मोड सक्रिय', 'info', 1400);
      });
    }

    // Language buttons
    var enBtn = modal.querySelector('.btn-set-en');
    var hiBtn = modal.querySelector('.btn-set-hi');
    if (enBtn) {
      enBtn.addEventListener('click', function () {
        var target = location.pathname.replace(/\/hi\//, '/').replace(/^\/hi$/, '/');
        location.href = target + location.search;
      });
    }
    if (hiBtn) {
      hiBtn.addEventListener('click', function () {
        var p = location.pathname;
        if (!p.includes('/hi/')) {
          var target = p === '/' ? '/hi/' : '/hi' + p;
          location.href = target + location.search;
        }
      });
    }

    // Check for App Updates trigger
    var updateBtn = modal.querySelector('.btn-check-app-update');
    if (updateBtn) {
      updateBtn.addEventListener('click', function () {
        if (typeof AppUpdater !== 'undefined' && AppUpdater.checkUpdate) {
          AppUpdater.checkUpdate(true);
        } else {
          FS.toast(isHi ? 'आपका ऐप पहले से ही नवीनतम वर्शन (v2.4.0) पर है!' : 'Your app is already on the latest version (v2.4.0)!', 'ok', 3000);
        }
      });
    }

    // Install App button trigger
    var installBtn = modal.querySelector('.btn-trigger-install');
    if (installBtn) {
      installBtn.addEventListener('click', function () {
        if (FS.promptInstall) {
          FS.promptInstall();
          closeModal();
        } else {
          // Direct fallback to APK download
          var a = document.createElement('a');
          a.href = '/downloads/FestivalStudio.apk';
          a.download = 'FestivalStudio.apk';
          document.body.appendChild(a);
          a.click();
          a.remove();
          FS.toast(isHi ? 'APK डाउनलोड शुरू हो गया है!' : 'Downloading Festival Studio APK...', 'ok', 3500);
          closeModal();
        }
      });
    }

    // Clear Drafts
    var clearBtn = modal.querySelector('.btn-clear-cache');
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        if (confirm(isHi ? 'क्या आप सभी लोकल ड्राफ्ट्स हटाना चाहते हैं?' : 'Clear all local drafts?')) {
          if (FS.Store && FS.Store.clearDrafts) FS.Store.clearDrafts();
          FS.toast(isHi ? 'ड्राफ्ट्स साफ़ कर दिए गए' : 'Drafts cleared', 'ok', 1500);
        }
      });
    }
  };


  /* ------------------------------------------------------------------ */
  /* Robust PWA & APK Installation Engine                                */
  /* ------------------------------------------------------------------ */
  var deferredInstallPrompt = null;

  window.addEventListener('beforeinstallprompt', function (e) {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    deferredInstallPrompt = e;
    FS.canInstallPWA = true;

    // Show install buttons if any exist
    FS.$$('[data-install-btn], .btn-install-app').forEach(function (btn) {
      btn.hidden = false;
      btn.style.display = 'inline-flex';
    });
  });

  window.addEventListener('appinstalled', function () {
    deferredInstallPrompt = null;
    FS.canInstallPWA = false;
    FS.toast(FS.LANG === 'hi' ? 'Festival Studio सफलतापूर्वक इंस्टॉल हो गया!' : 'Festival Studio installed successfully!', 'ok', 3500);
  });

  FS.promptInstall = function () {
    var isHi = FS.LANG === 'hi';
    // 1. If native PWA install prompt is ready, trigger it (never causes package parse errors)
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      deferredInstallPrompt.userChoice.then(function (choice) {
        if (choice.outcome === 'accepted') {
          FS.toast(isHi ? 'ऐप इंस्टॉल हो रहा है...' : 'Installing app to Home Screen...', 'ok', 2500);
        }
        deferredInstallPrompt = null;
      });
      return;
    }

    // 2. Open the comprehensive, friendly Install Modal
    FS.openInstallModal();
  };

  FS.openInstallModal = function () {
    var existing = document.getElementById('fs-install-modal');
    if (existing) { existing.remove(); return; }

    var isHi = FS.LANG === 'hi';
    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    var modal = FS.el('div', {
      id: 'fs-install-modal',
      class: 'app-update-modal-backdrop fs-install-backdrop',
      role: 'dialog',
      'aria-modal': 'true'
    });

    modal.innerHTML =
      '<div class="app-update-card fs-install-card" style="max-width:440px;width:92%;display:flex;flex-direction:column;border-radius:20px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,0.25);">' +
        '<div class="app-update-header" style="padding:16px 20px;border-bottom:1px solid var(--border,#e2e8f0);background:var(--surface,#fff);">' +
          '<div style="display:flex;align-items:center;gap:12px;flex:1;">' +
            '<div style="width:40px;height:40px;border-radius:12px;background:linear-gradient(135deg,#ff7700,#e11d48);color:#fff;display:flex;align-items:center;justify-content:center;font-size:22px;">' +
              '📱' +
            '</div>' +
            '<div>' +
              '<h3 style="margin:0;font-size:17px;font-weight:700;color:var(--text,#111);">' + (isHi ? 'ऐप इंस्टॉल करें' : 'Install Festival Studio') + '</h3>' +
              '<p style="margin:2px 0 0;font-size:12px;color:var(--muted,#666);">' + (isHi ? 'होम स्क्रीन पर जोड़ें या APK डाउनलोड करें' : 'Add to home screen or download APK') + '</p>' +
            '</div>' +
          '</div>' +
          '<button type="button" class="app-update-close" aria-label="Close" style="font-size:24px;border:none;background:none;cursor:pointer;color:var(--muted,#666);">&times;</button>' +
        '</div>' +
        '<div style="padding:20px;background:var(--bg,#fbf7f4);display:flex;flex-direction:column;gap:16px;">' +
          (isIOS
            ? '<div class="card" style="padding:14px;border-radius:14px;background:#fff;border:1px solid var(--border,#e2e8f0);">' +
                '<strong style="display:block;font-size:14px;margin-bottom:6px;">' + (isHi ? 'iOS / iPhone पर इंस्टॉल करने का तरीका:' : 'To install on iOS / iPhone:') + '</strong>' +
                '<ol style="margin:0;padding-left:20px;font-size:13px;line-height:1.6;color:var(--text,#333);">' +
                  '<li>' + (isHi ? 'सफ़ारी (Safari) में नीचे दिए गए <b>शेयर (Share) बटन</b> ⎋ पर टैप करें।' : 'Tap the <b>Share</b> button ⎋ in Safari.') + '</li>' +
                  '<li>' + (isHi ? 'सूची में स्क्रॉल करके <b>"Add to Home Screen" ⊞</b> चुनें।' : 'Scroll down and tap <b>"Add to Home Screen" ⊞</b>.') + '</li>' +
                  '<li>' + (isHi ? 'ऊपर दाईं ओर <b>Add</b> पर टैप करें।' : 'Tap <b>Add</b> at top right.') + '</li>' +
                '</ol>' +
              '</div>'
            : '<div class="card" style="padding:14px;border-radius:14px;background:#fff;border:1px solid var(--border,#e2e8f0);display:flex;flex-direction:column;gap:10px;">' +
                '<strong style="font-size:14px;color:var(--text,#111);">' + (isHi ? 'ऑफ़िशियल Android APK (100% ऑफ़लाइन)' : 'Official Android APK (100% Offline)') + '</strong>' +
                '<p style="margin:0;font-size:12px;color:var(--muted,#666);">' + (isHi ? 'सीधे अपने फोन में APK डाउनलोड करके इंस्टॉल करें। बिना इंटरनेट सब फीचर्स काम करेंगे।' : 'Direct installation file with offline festival templates and canvas tools.') + '</p>' +
                '<a href="/downloads/FestivalStudio.apk" download="FestivalStudio.apk" class="btn btn-primary" style="padding:12px;border-radius:12px;font-size:14px;font-weight:700;justify-content:center;text-decoration:none;">' +
                  '📥 ' + (isHi ? 'डाउनलोड Android APK (8.5 MB)' : 'Download Android APK (8.5 MB)') + '</a>' +
              '</div>' +
              '<div class="card" style="padding:14px;border-radius:14px;background:#fff;border:1px solid var(--border,#e2e8f0);">' +
                '<strong style="display:block;font-size:13px;margin-bottom:4px;">' + (isHi ? 'ब्राउज़र मेनू से होम स्क्रीन पर जोड़ें:' : 'Or Add via Browser Menu:') + '</strong>' +
                '<p style="margin:0;font-size:12px;color:var(--muted,#666);line-height:1.5;">' +
                  (isHi ? 'Chrome ब्राउज़र में ऊपर दाईं ओर <b>3 डॉट्स (⋮)</b> पर टैप करें और <b>"Install app"</b> या <b>"Add to Home screen"</b> चुनें।' : 'In Chrome, tap the <b>3 dots menu (⋮)</b> at top right, then select <b>"Install app"</b> or <b>"Add to Home screen"</b>.') +
                '</p>' +
              '</div>') +
        '</div>' +
      '</div>';

    document.body.appendChild(modal);

    function closeModal() {
      modal.classList.add('closing');
      setTimeout(function () { modal.remove(); }, 200);
    }

    var closeBtn = modal.querySelector('.app-update-close');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
  };

    FS.setDrawer = function(open) {
    var drawer = document.getElementById('drawer');
    var backdrop = document.getElementById('drawer-backdrop');
    var btn = document.getElementById('menu-btn');
    if (!drawer) return;
    var isOpen = Boolean(open);
    drawer.setAttribute('data-open', String(isOpen));
    if (backdrop) backdrop.setAttribute('data-open', String(isOpen));
    if (btn) btn.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('drawer-open', isOpen);
  };

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
      FS.setDrawer = setDrawer;

      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        // If on desktop (>=1000px), 3-line button opens Settings & Options modal directly
        if (window.innerWidth >= 1000) {
          if (FS.openSettingsModal) FS.openSettingsModal();
          return;
        }
        var open = drawer.getAttribute('data-open') === 'true';
        setDrawer(!open);
      });

      backdrop.addEventListener('click', function () {
        setDrawer(false);
      });

      // Add Settings & Install item to mobile drawer if not already present
    if (!drawer.querySelector('.drawer-settings-btn')) {
      var setRow = FS.el('button', {
        type: 'button',
        class: 'drawer-settings-btn',
        style: 'display:flex;align-items:center;justify-content:space-between;width:100%;padding:12px 14px;background:linear-gradient(135deg,rgba(255,119,0,0.12),rgba(225,29,72,0.12));border:1px solid rgba(255,119,0,0.25);border-radius:12px;font-size:14px;font-weight:600;color:var(--brand,#ff7700);cursor:pointer;margin-bottom:6px;'
      }, '<span style="display:flex;align-items:center;gap:8px;">⚙️ ' + (FS.isApp() ? (FS.LANG === 'hi' ? 'सेटिंग्स व अपडेट चेक' : 'Settings & Check Updates') : (FS.LANG === 'hi' ? 'सेटिंग्स व ऐप इंस्टॉल' : 'Settings & Install App')) + '</span><span>›</span>');

      setRow.addEventListener('click', function() {
        if (FS.setDrawer) FS.setDrawer(false);
        if (FS.openSettingsModal) FS.openSettingsModal();
      });
      drawer.insertBefore(setRow, drawer.firstChild);
    }

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
      var logoLink = document.querySelector('.logo');
      var logoSpan = logoLink && logoLink.querySelector('span');
      if (logoSpan && !logoLink.querySelector('.app-mode-badge')) {
        var badge = FS.el('span', { class: 'app-mode-badge' }, 'PRO');
        var small = logoSpan.querySelector('small');
        if (small) {
          logoSpan.insertBefore(badge, small);
        } else {
          logoSpan.appendChild(badge);
        }
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
      var isFav = FS.Store.isFavorite('templates', t.id);
      var infoEl = FS.el('div', { class: 'info', style: 'display:flex;align-items:center;justify-content:space-between;' },
        '<div><strong>' + FS.esc(t.festivalName) + '</strong><span>' + FS.esc(t.category) + '</span></div>' +
        '<button type="button" class="btn-fav-toggle" aria-label="Favorite template" data-tpl-id="' + t.id + '" style="background:none;border:none;cursor:pointer;font-size:18px;color:' + (isFav ? '#e11d48' : '#94a3b8') + ';padding:4px 6px;">' + (isFav ? '♥' : '♡') + '</button>');
      
      var favBtn = infoEl.querySelector('.btn-fav-toggle');
      if (favBtn) {
        favBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          e.preventDefault();
          var added = FS.Store.toggleFavorite('templates', t.id, { name: t.name, festival: t.festival, category: t.category });
          favBtn.textContent = added ? '♥' : '♡';
          favBtn.style.color = added ? '#e11d48' : '#94a3b8';
          FS.toast(added ? (FS.LANG === 'hi' ? 'फेवरेट्स में जोड़ा गया ♥' : 'Saved to Favorites ♥') : (FS.LANG === 'hi' ? 'फेवरेट्स से हटाया गया' : 'Removed from Favorites'), 'info', 1800);
        });
      }
      card.appendChild(infoEl);
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
  /* Website vs App Mode Engine                                          */
  /* ------------------------------------------------------------------ */
  FS.isApp = function () {
    if (typeof window === 'undefined') return false;

    var search = window.location.search || '';
    if (/[?&]mode=web(&|$)/i.test(search)) return false;

    // 1. Dedicated App entry page (/app.html or /hi/app.html)
    var pathname = (window.location && window.location.pathname) || '';
    if (pathname.indexOf('app.html') !== -1 || pathname.endsWith('/app')) {
      return true;
    }

    // 2. Android WebView AssetLoader origin or Native Android wrapper
    if (window.location && window.location.hostname === 'appassets.androidplatform.net') return true;
    if (window.AndroidBridge || window.AndroidAdMob || window.isFestivalStudioApp) return true;
    if (/FestivalStudioApp|net\.mikespub\.mywebview/i.test(navigator.userAgent)) return true;

    // 3. Standalone display-mode (PWA installed on phone or desktop)
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) return true;
    if (window.navigator.standalone === true) return true;

    // 4. Explicit query parameter (?mode=app or ?app=1)
    if (/[?&](app=1|app=true|mode=app|source=app)(&|$)/i.test(search)) return true;

    // Standard website browsing is always website mode
    return false;
  };

  FS.setAppMode = function (isApp) {
    Store.pref('env_mode', isApp ? 'app' : 'web');
    if (isApp) {
      window.location.href = (FS.LANG === 'hi' ? 'hi/app.html' : 'app.html');
    } else {
      window.location.href = (FS.LANG === 'hi' ? 'hi/index.html' : 'index.html');
    }
  };

  // Sync app mode flags to DOM
  try {
    if (FS.isApp()) {
      document.documentElement.setAttribute('data-env', 'app');
      document.documentElement.classList.add('is-app-mode');
      if (document.body) document.body.classList.add('is-app-mode');
    } else {
      document.documentElement.removeAttribute('data-env');
      document.documentElement.classList.remove('is-app-mode');
      if (document.body) document.body.classList.remove('is-app-mode');
      if (Store && Store.pref && Store.pref('env_mode') === 'app') {
        Store.pref('env_mode', 'web');
      }
    }
  } catch (e) {}

  /* ------------------------------------------------------------------ */
  /* Google AdMob Engine (Native bridge only, zero mock HTML DOM boxes)  */
  /* ------------------------------------------------------------------ */
  FS.AdMob = {
    initialized: false,
    cfg: function () {
      return (CFG && CFG.admob) || { enabled: true, testMode: true };
    },
    init: function () {
      if (!FS.isApp()) return;
      var c = this.cfg();
      if (!c.enabled) return;
      if (this.initialized) return;
      this.initialized = true;

      // Clean up any rogue banner elements if present
      FS.$$('.admob-banner-wrap, .admob-fixed-banner').forEach(function (el) { el.remove(); });

      // Delegate to native Android WebView / Java bridge if available
      if (window.AndroidAdMob && typeof window.AndroidAdMob.init === 'function') {
        try { window.AndroidAdMob.init(c.appId || '', c.testMode !== false); } catch (e) {}
      }
      if (window.AndroidAdMob && typeof window.AndroidAdMob.showBanner === 'function') {
        try { window.AndroidAdMob.showBanner(c.bannerSlotId || ''); } catch (e) {}
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
      // Delegate to native bridge if present
      if (window.AndroidAdMob && typeof window.AndroidAdMob.showInterstitial === 'function') {
        try { window.AndroidAdMob.showInterstitial(c.interstitialSlotId || ''); } catch (e) {}
      }
      if (typeof onClose === 'function') onClose();
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
    // Keep install buttons active
    FS.$$('[data-install]').forEach(function (b) { b.removeAttribute('hidden'); b.style.display = 'inline-flex'; });
  }

  /* ------------------------------------------------------------------ */
  /* Copy-to-clipboard buttons (wishes pages)                            */
  /* ------------------------------------------------------------------ */
  function initCopyButtons() {
    // 1. Copy Buttons
    FS.$$('[data-copy]').forEach(function (b) {
      b.addEventListener('click', function () {
        var text = b.getAttribute('data-copy');
        var done = function () {
          var old = b.textContent;
          b.textContent = '✓';
          FS.toast(FS.LANG === 'hi' ? 'कॉपी हो गया ✓' : 'Copied to clipboard ✓', 'ok', 1600);
          setTimeout(function () { b.textContent = old; }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done).catch(function () {
            FS.toast(FS.LANG === 'hi' ? 'कॉपी नहीं हो सका' : 'Could not copy', 'err');
          });
        } else {
          try {
            var ta = FS.el('textarea', { style: 'position:fixed;opacity:0' });
            ta.value = text; document.body.appendChild(ta); ta.select();
            document.execCommand('copy'); ta.remove(); done();
          } catch (e) { FS.toast(FS.LANG === 'hi' ? 'कॉपी नहीं हो सका' : 'Could not copy', 'err'); }
        }
      });
    });

    // 2. Native Share Buttons for Wishes
    FS.$$('[data-share-wish]').forEach(function (b) {
      b.addEventListener('click', function () {
        var text = b.getAttribute('data-share-wish') || '';
        if (navigator.share) {
          navigator.share({
            title: 'Festival Studio Wish',
            text: text + '\n\n— Created with Festival Studio\nhttps://festival-studio.work.gd/'
          }).catch(function () {});
        } else {
          // Fallback to WhatsApp share
          var waUrl = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(text + '\n\n— Created with Festival Studio\nhttps://festival-studio.work.gd/');
          window.open(waUrl, '_blank');
        }
      });
    });

    // 3. Use in Design (Auto-opens editor with this wish)
    FS.$$('[data-use-wish]').forEach(function (b) {
      b.addEventListener('click', function () {
        var text = b.getAttribute('data-use-wish') || '';
        var fest = b.getAttribute('data-festival') || '';
        var base = (FS.BASE || '');
        var targetUrl = base + 'post-maker.html?msg=' + encodeURIComponent(text) + (fest ? '&festival=' + encodeURIComponent(fest) : '');
        if (FS.isApp()) targetUrl += (targetUrl.indexOf('?') !== -1 ? '&' : '?') + 'mode=app';
        window.location.href = targetUrl;
      });
    });

    // 4. Favorite Wish Toggle
    FS.$$('[data-fav-wish]').forEach(function (b) {
      var wishId = b.getAttribute('data-fav-wish');
      if (FS.Store.isFavorite('wishes', wishId)) {
        b.textContent = '♥';
        b.style.color = '#e11d48';
      }
      b.addEventListener('click', function () {
        var text = b.getAttribute('data-wish-text') || '';
        var added = FS.Store.toggleFavorite('wishes', wishId, { text: text });
        b.textContent = added ? '♥' : '♡';
        b.style.color = added ? '#e11d48' : '#94a3b8';
        FS.toast(added ? (FS.LANG === 'hi' ? 'विश सेव हो गई ♥' : 'Wish saved to Favorites ♥') : (FS.LANG === 'hi' ? 'फेवरेट्स से हटाया गया' : 'Removed from Favorites'), 'info', 1600);
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
      { href: base + (isHi ? 'hi/index.html' : 'index.html'), icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>', label: isHi ? 'होम' : 'Home', match: /index\.html$|^(\/hi)?\/?$/ },
      { href: base + (isHi ? 'hi/templates.html' : 'templates.html'), icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>', label: isHi ? 'टेम्पलेट्स' : 'Templates', match: /templates\.html/ },
      { href: base + (isHi ? 'hi/post-maker.html' : 'post-maker.html'), icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>', label: isHi ? 'नया पोस्ट' : 'Create', match: /post-maker/, special: true },
      { href: base + 'video-templates.html', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>', label: isHi ? 'वीडियो' : 'Videos', match: /video-templates/ },
      { href: base + (isHi ? 'hi/wishes.html' : 'wishes.html'), icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>', label: isHi ? 'शुभकामनाएं' : 'Wishes', match: /wishes/ }
    ];

    items.forEach(function (it) {
      var isAct = it.match && it.match.test(path);
      var a = FS.el('a', { class: 'app-nav-item' + (isAct ? ' active' : '') + (it.special ? ' app-nav-create' : ''), href: it.href });
      a.innerHTML = it.icon + '<span>' + FS.esc(it.label) + '</span>';
      if (it.action === 'my-designs') {
        a.addEventListener('click', function(e) {
          e.preventDefault();
          if (FS.openMyDesignsModal) FS.openMyDesignsModal();
        });
      } else if (it.action === 'more') {
        a.addEventListener('click', function(e) {
          e.preventDefault();
          if (FS.openMoreModal) FS.openMoreModal();
        });
      }
      nav.appendChild(a);
    });

    document.body.appendChild(nav);
  }

  /* ------------------------------------------------------------------ */
  /* Download App handlers (Website Mode)                                */
  /* ------------------------------------------------------------------ */
  function initDownloadButtons() {
    // 1. Download APK buttons
    FS.$$('[data-download-apk]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var apkUrl = (CFG.app && CFG.app.apkDownloadUrl) || '/downloads/FestivalStudio.apk';
        FS.toast(FS.LANG === 'hi' ? 'Festival Studio Android APK डाउनलोड हो रहा है...' : 'Downloading Festival Studio Android APK...', 'ok', 3500);
      });
    });

    // 2. Download / Install App buttons (e.g. in header or action cards)
    FS.$$('[data-download-app]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        // If native PWA install prompt is ready, offer it directly
        if (FS.promptInstall) {
          FS.promptInstall();
        } else {
          // Fallback to downloading direct APK
          var apkUrl = (CFG.app && CFG.app.apkDownloadUrl) || '/downloads/FestivalStudio.apk';
          FS.toast(FS.LANG === 'hi' ? 'Festival Studio Android APK डाउनलोड हो रहा है...' : 'Downloading Festival Studio Android APK...', 'ok', 3500);
          var a = document.createElement('a');
          a.href = apkUrl;
          a.download = 'FestivalStudio.apk';
          document.body.appendChild(a);
          a.click();
          a.remove();
        }
      });
    });

    // 3. Any element with [data-install] or [data-install-btn]
    FS.$$('[data-install], [data-install-btn]').forEach(function (btn) {
      btn.removeAttribute('hidden');
      btn.style.display = 'inline-flex';
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        if (FS.promptInstall) FS.promptInstall();
      });
    });
  }

  /* ------------------------------------------------------------------ */
  
  /* ------------------------------------------------------------------ */
  /* In-App Update Manager (Updates APK directly from the website)       */
  /* ------------------------------------------------------------------ */
  var AppUpdater = {
    currentVersion: '2.4.0',
    currentVersionCode: 240,
    apiUrl: '/api/app-update',

    checkUpdate: function (isManual) {
      if (isManual) {
        FS.toast(FS.LANG === 'hi' ? 'अपडेट चेक किया जा रहा है...' : 'Checking for updates...', 'info', 2500);
      }

      fetch(this.apiUrl + '?t=' + Date.now(), { cache: 'no-cache' })
        .then(function (res) {
          if (!res.ok) throw new Error('Network error');
          return res.json();
        })
        .then(function (data) {
          if (!data || !data.latestVersion) return;
          var hasUpdate = (data.latestVersionCode > AppUpdater.currentVersionCode) ||
                          (data.latestVersion !== AppUpdater.currentVersion);

          if (hasUpdate) {
            AppUpdater.showUpdateModal(data);
          } else if (isManual) {
            FS.toast(
              (FS.LANG === 'hi' ? 'आपका ऐप पहले से ही नवीनतम वर्शन पर है (v' : 'Your app is already up to date (v') +
              AppUpdater.currentVersion + ')',
              'ok',
              3500
            );
          }
        })
        .catch(function () {
          if (isManual) {
            // Fallback: offer direct download link if offline or API blocked
            AppUpdater.showUpdateModal({
              latestVersion: '2.4.1',
              apkUrl: '/downloads/FestivalStudio.apk?v=20260929_1',
              size: '8.3 MB',
              whatsNew: ['Direct fast update from official website', 'Includes latest AdMob & templates'],
              whatsNewHi: ['आधिकारिक वेबसाइट से डायरेक्ट तेज़ अपडेट', 'नवीनतम AdMob व टेम्पलेट्स शामिल']
            });
          }
        });
    },

    showUpdateModal: function (info) {
      if (document.getElementById('app-update-modal')) return;

      var isHi = FS.LANG === 'hi';
      var modal = FS.el('div', {
        id: 'app-update-modal',
        class: 'app-update-modal-backdrop',
        role: 'dialog',
        'aria-modal': 'true',
        'aria-labelledby': 'app-update-title'
      });

      var notes = (isHi ? info.whatsNewHi : info.whatsNew) || [
        isHi ? 'आधिकारिक वेबसाइट से डायरेक्ट तेज़ अपडेट' : 'Direct fast update from official website',
        isHi ? 'Google AdMob और नए फ्रेम्स' : 'Google AdMob & fresh festival frames'
      ];

      var notesHtml = notes.map(function (n) {
        return '<li style="display:flex;align-items:flex-start;gap:8px;margin-bottom:6px;"><span style="color:#22c55e;">✓</span><span>' + FS.esc(n) + '</span></li>';
      }).join('');

      var apkUrl = info.apkUrl || '/downloads/FestivalStudio.apk?v=20260929_1';

      modal.innerHTML =
        '<div class="app-update-card">' +
          '<div class="app-update-header">' +
            '<div class="app-update-icon">' +
              '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
                '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>' +
                '<polyline points="7 10 12 15 17 10"/>' +
                '<line x1="12" y1="15" x2="12" y2="3"/>' +
              '</svg>' +
            '</div>' +
            '<div style="flex:1;">' +
              '<div class="app-update-badge">' + (isHi ? 'नया वर्शन उपलब्ध' : 'UPDATE AVAILABLE') + '</div>' +
              '<h3 id="app-update-title" style="margin:4px 0 2px;font-size:18px;font-weight:700;color:var(--text, #111);">' +
                (isHi ? 'नया अपडेट v' : 'New Update v') + FS.esc(info.latestVersion || '2.4.1') +
              '</h3>' +
              '<p style="margin:0;font-size:12px;color:var(--muted, #666);">' +
                (isHi ? 'वर्तमान: v' : 'Current: v') + AppUpdater.currentVersion + ' · ' + (info.size || '8.3 MB') +
              '</p>' +
            '</div>' +
            '<button type="button" class="app-update-close" aria-label="Close">&times;</button>' +
          '</div>' +
          '<div class="app-update-body">' +
            '<p style="font-size:13px;font-weight:600;margin:0 0 8px;color:var(--text, #222);">' +
              (isHi ? 'नया क्या है:' : "What's new:") +
            '</p>' +
            '<ul style="margin:0 0 16px;padding:0;list-style:none;font-size:13px;color:var(--text-soft, #444);">' +
              notesHtml +
            '</ul>' +
            '<div style="background:rgba(234,179,8,0.12);border:1px solid rgba(234,179,8,0.35);border-radius:8px;padding:10px 12px;font-size:12px;color:#a16207;margin-bottom:16px;line-height:1.4;">' +
              'ℹ️ ' + (isHi ? 'यह अपडेट सीधे हमारी आधिकारिक वेबसाइट से डाउनलोड होगा। डाउनलोड होने पर "Install" दबाएं।' : 'This update downloads directly from our official website. Tap Install after download completes.') +
            '</div>' +
          '</div>' +
          '<div class="app-update-actions">' +
            '<button type="button" class="btn btn-ghost btn-sm app-update-later" style="flex:1;">' + (isHi ? 'बाद में' : 'Later') + '</button>' +
            '<a href="' + apkUrl + '" class="btn btn-primary app-update-start" download="FestivalStudio.apk" style="flex:2;justify-content:center;gap:6px;font-weight:600;">' +
              '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>' +
              '<span>' + (isHi ? 'वेबसाइट से अपडेट करें' : 'Update from Website') + '</span>' +
            '</a>' +
          '</div>' +
        '</div>';

      document.body.appendChild(modal);

      // Event listeners
      function closeModal() {
        modal.classList.add('closing');
        setTimeout(function () { modal.remove(); }, 200);
      }

      var closeBtn = modal.querySelector('.app-update-close');
      if (closeBtn) closeBtn.addEventListener('click', closeModal);

      var laterBtn = modal.querySelector('.app-update-later');
      if (laterBtn) laterBtn.addEventListener('click', closeModal);

      modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModal();
      });

      var startBtn = modal.querySelector('.app-update-start');
      if (startBtn) {
        startBtn.addEventListener('click', function () {
          FS.toast(isHi ? 'नया APK डाउनलोड हो रहा है... कृपया इंतज़ार करें' : 'Downloading update APK from website...', 'ok', 4000);
          setTimeout(function () {
            closeModal();
          }, 1200);
        });
      }
    },

    setupInAppButton: function () {
      if (!FS.isApp()) return;
      var actions = document.querySelector('.header-actions');
      if (!actions) return;
      if (actions.querySelector('.btn-check-update')) return;

      var isHi = FS.LANG === 'hi';
      var updateBtn = FS.el('button', {
        type: 'button',
        class: 'btn btn-soft btn-sm btn-check-update',
        style: 'display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:600;padding:6px 11px;border-radius:20px;background:linear-gradient(135deg,#ff7700,#e11d48);color:#fff;border:none;box-shadow:0 2px 8px rgba(225,29,72,0.3);cursor:pointer;',
        'aria-label': isHi ? 'ऐप अपडेट करें' : 'Update App'
      });

      updateBtn.innerHTML =
        '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
          '<polyline points="23 4 23 10 17 10"/>' +
          '<path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>' +
        '</svg>' +
        '<span>' + (isHi ? 'अपडेट' : 'Update') + '</span>';

      updateBtn.addEventListener('click', function () {
        AppUpdater.checkUpdate(true);
      });

      actions.insertBefore(updateBtn, actions.firstChild);

      // Auto check after 3 seconds on app launch
      setTimeout(function () {
        AppUpdater.checkUpdate(false);
      }, 3000);
    }
  };

  FS.AppUpdater = AppUpdater;

  /* ------------------------------------------------------------------ */
  /* My Designs Manager (Recent, Drafts, Saved, Favorites)               */
  /* ------------------------------------------------------------------ */
  
  /* ------------------------------------------------------------------ */
  /* More Screen Modal (Festival Calendar, Wishes, GIF Maker, Status,   */
  /* My Designs, Favorites, Language, Theme, Privacy, Terms, Feedback)  */
  /* ------------------------------------------------------------------ */
  FS.openMoreModal = function () {
    var existing = document.getElementById('more-screen-modal');
    if (existing) existing.remove();

    var isHi = FS.LANG === 'hi';
    var base = FS.BASE || '';
    var modal = FS.el('div', {
      id: 'more-screen-modal',
      class: 'app-update-modal-backdrop more-screen-backdrop',
      role: 'dialog',
      'aria-modal': 'true'
    });

    var currentTheme = document.documentElement.getAttribute('data-theme') || 'light';

    modal.innerHTML =
      '<div class="app-update-card more-screen-card" style="max-width:500px;max-height:88vh;display:flex;flex-direction:column;">' +
        '<div class="app-update-header" style="padding:14px 18px;border-bottom:1px solid var(--border,#e2e8f0);">' +
          '<div style="display:flex;align-items:center;gap:10px;flex:1;">' +
            '<div style="width:38px;height:38px;border-radius:12px;background:linear-gradient(135deg,#ff7700,#e11d48);color:#fff;display:flex;align-items:center;justify-content:center;font-size:20px;">' +
              '🪔' +
            '</div>' +
            '<div>' +
              '<h3 style="margin:0;font-size:17px;font-weight:700;">Festival Studio</h3>' +
              '<p style="margin:0;font-size:12px;color:var(--muted,#666);">' + (isHi ? 'क्रिएट • सेलिब्रेट • शेयर' : 'Create • Celebrate • Share') + '</p>' +
            '</div>' +
          '</div>' +
          '<button type="button" class="app-update-close" aria-label="Close" style="font-size:24px;">&times;</button>' +
        '</div>' +
        '<div class="more-screen-body" style="padding:16px 18px;overflow-y:auto;flex:1;display:flex;flex-direction:column;gap:16px;">' +

          /* Section 1: Creative Studios & Tools */
          '<div>' +
            '<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--muted,#64748b);margin-bottom:8px;">' +
              (isHi ? 'क्रिएटिव स्टूडियो व टूल्स' : 'Creative Studio & Tools') +
            '</div>' +
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">' +
              '<a href="' + base + (isHi ? 'hi/calendar.html' : 'calendar.html') + '?mode=app" class="card more-menu-item" style="padding:12px;display:flex;align-items:center;gap:10px;text-decoration:none;border-radius:12px;">' +
                '<span style="font-size:22px;">📅</span>' +
                '<div><strong style="display:block;font-size:13px;color:var(--text,#111);">' + (isHi ? 'त्यौहार कैलेंडर' : 'Festival Calendar') + '</strong><span style="font-size:11px;color:var(--muted,#777);">' + (isHi ? 'काउंटडाउन व तिथियां' : 'Dates & Countdown') + '</span></div>' +
              '</a>' +
              '<a href="' + base + (isHi ? 'hi/wishes.html' : 'wishes.html') + '?mode=app" class="card more-menu-item" style="padding:12px;display:flex;align-items:center;gap:10px;text-decoration:none;border-radius:12px;">' +
                '<span style="font-size:22px;">💬</span>' +
                '<div><strong style="display:block;font-size:13px;color:var(--text,#111);">' + (isHi ? 'शुभकामना संदेश' : 'Wishes Library') + '</strong><span style="font-size:11px;color:var(--muted,#777);">' + (isHi ? 'हिंदी व अंग्रेजी' : 'Hindi & English') + '</span></div>' +
              '</a>' +
              '<a href="' + base + (isHi ? 'hi/status-maker.html' : 'status-maker.html') + '?mode=app" class="card more-menu-item" style="padding:12px;display:flex;align-items:center;gap:10px;text-decoration:none;border-radius:12px;">' +
                '<span style="font-size:22px;">📱</span>' +
                '<div><strong style="display:block;font-size:13px;color:var(--text,#111);">' + (isHi ? 'स्टेटस मेकर' : 'Status Maker') + '</strong><span style="font-size:11px;color:var(--muted,#777);">9:16 WhatsApp</span></div>' +
              '</a>' +
              '<a href="' + base + (isHi ? 'hi/gif-maker.html' : 'gif-maker.html') + '?mode=app" class="card more-menu-item" style="padding:12px;display:flex;align-items:center;gap:10px;text-decoration:none;border-radius:12px;">' +
                '<span style="font-size:22px;">🎞️</span>' +
                '<div><strong style="display:block;font-size:13px;color:var(--text,#111);">' + (isHi ? 'GIF मेकर' : 'GIF Maker') + '</strong><span style="font-size:11px;color:var(--muted,#777);">' + (isHi ? 'एनिमेटेड लूप' : 'Animation loop') + '</span></div>' +
              '</a>' +
            '</div>' +
          '</div>' +

          /* Section 2: Preferences (Language & Theme) */
          '<div>' +
            '<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--muted,#64748b);margin-bottom:8px;">' +
              (isHi ? 'प्राथमिकताएं (Settings)' : 'Preferences') +
            '</div>' +
            '<div class="card" style="padding:10px 14px;border-radius:12px;display:flex;flex-direction:column;gap:12px;">' +
              '<div style="display:flex;align-items:center;justify-content:space-between;">' +
                '<div style="display:flex;align-items:center;gap:10px;">' +
                  '<span style="font-size:18px;">🌐</span>' +
                  '<div><strong style="font-size:13px;">' + (isHi ? 'भाषा (Language)' : 'Language') + '</strong></div>' +
                '</div>' +
                '<div style="display:flex;gap:6px;">' +
                  '<a href="' + (location.pathname.replace(/\/hi\//, '/')) + '?mode=app" class="btn btn-sm ' + (!isHi ? 'btn-primary' : 'btn-ghost') + '" style="padding:3px 9px;font-size:11px;">English</a>' +
                  '<a href="' + (location.pathname.includes('/hi/') ? location.pathname : base + 'hi/' + location.pathname.replace(/^\//, '')) + '?mode=app" class="btn btn-sm ' + (isHi ? 'btn-primary' : 'btn-ghost') + '" style="padding:3px 9px;font-size:11px;">हिन्दी</a>' +
                '</div>' +
              '</div>' +
              '<div style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid var(--border,#f1f5f9);padding-top:10px;">' +
                '<div style="display:flex;align-items:center;gap:10px;">' +
                  '<span style="font-size:18px;">🌓</span>' +
                  '<div><strong style="font-size:13px;">' + (isHi ? 'थीम (Dark / Light)' : 'Appearance Theme') + '</strong></div>' +
                '</div>' +
                '<button type="button" class="btn btn-soft btn-sm btn-toggle-theme" style="padding:4px 10px;font-size:12px;">' +
                  (currentTheme === 'dark' ? '🌙 Dark' : '☀️ Light') +
                '</button>' +
              '</div>' +
            '</div>' +
          '</div>' +

          /* Section 3: Legal, Privacy & Sharing */
          '<div>' +
            '<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--muted,#64748b);margin-bottom:8px;">' +
              (isHi ? 'सहायता एवं सुरक्षा' : 'Support & Privacy') +
            '</div>' +
            '<div class="card" style="border-radius:12px;overflow:hidden;">' +
              '<a href="' + base + (isHi ? 'hi/privacy.html' : 'privacy.html') + '?mode=app" class="more-row" style="padding:11px 14px;display:flex;align-items:center;justify-content:space-between;text-decoration:none;border-bottom:1px solid var(--border,#f1f5f9);">' +
                '<span style="font-size:13px;color:var(--text,#111);">' + (isHi ? 'गोपनीयता नीति (Privacy Policy)' : 'Privacy Policy') + '</span>' +
                '<span style="color:var(--muted,#999);">&rsaquo;</span>' +
              '</a>' +
              '<a href="' + base + (isHi ? 'hi/terms.html' : 'terms.html') + '?mode=app" class="more-row" style="padding:11px 14px;display:flex;align-items:center;justify-content:space-between;text-decoration:none;border-bottom:1px solid var(--border,#f1f5f9);">' +
                '<span style="font-size:13px;color:var(--text,#111);">' + (isHi ? 'नियम व शर्तें (Terms & Conditions)' : 'Terms & Conditions') + '</span>' +
                '<span style="color:var(--muted,#999);">&rsaquo;</span>' +
              '</a>' +
              '<a href="' + base + (isHi ? 'hi/about.html' : 'about.html') + '?mode=app" class="more-row" style="padding:11px 14px;display:flex;align-items:center;justify-content:space-between;text-decoration:none;border-bottom:1px solid var(--border,#f1f5f9);">' +
                '<span style="font-size:13px;color:var(--text,#111);">' + (isHi ? 'हमारे बारे में (About App)' : 'About Festival Studio') + '</span>' +
                '<span style="color:var(--muted,#999);">&rsaquo;</span>' +
              '</a>' +
              '<button type="button" class="more-row btn-more-check-update" style="width:100%;text-align:left;background:none;border:none;border-bottom:1px solid var(--border,#f1f5f9);cursor:pointer;padding:11px 14px;display:flex;align-items:center;justify-content:space-between;">' +
                '<span style="font-size:13px;color:var(--text,#111);font-weight:600;">🔄 ' + (isHi ? 'ऐप अपडेट चेक करें (Check for Updates)' : 'Check for Updates') + '</span>' +
                '<span style="font-size:11px;color:var(--brand,#ff7700);font-weight:700;">v2.4.0</span>' +
              '</button>' +
              '<button type="button" class="more-row btn-share-app" style="width:100%;text-align:left;background:none;border:none;cursor:pointer;padding:11px 14px;display:flex;align-items:center;justify-content:space-between;">' +
                '<span style="font-size:13px;color:var(--text,#111);">' + (isHi ? 'ऐप शेयर करें (Share App)' : 'Share Festival Studio App') + '</span>' +
                '<span style="font-size:14px;">↗</span>' +
              '</button>' +
            '</div>' +
          '</div>' +

          /* Section 4: App Version & Offline-First Badge */
          '<div style="text-align:center;padding:10px 0 4px;">' +
            '<div style="display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:20px;background:rgba(34,197,94,0.12);color:#16a34a;font-size:11px;font-weight:600;">' +
              '<span>✓</span> 100% On-Device &amp; Offline-Ready' +
            '</div>' +
            '<p style="margin:6px 0 0;font-size:11px;color:var(--muted,#888);">' +
              'Festival Studio v2.4.1 (Official Production Release)' +
            '</p>' +
          '</div>' +

        '</div>' +
      '</div>';

    document.body.appendChild(modal);

    function closeModal() {
      modal.classList.add('closing');
      setTimeout(function () { modal.remove(); }, 200);
    }

    var closeBtn = modal.querySelector('.app-update-close');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeModal();
    });

    // Theme toggle button inside more screen
    var themeBtn = modal.querySelector('.btn-toggle-theme');
    if (themeBtn) {
      themeBtn.addEventListener('click', function() {
        var now = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', now);
        try {
          var p = JSON.parse(localStorage.getItem('fs:prefs') || '{}');
          p.theme = now;
          localStorage.setItem('fs:prefs', JSON.stringify(p));
        } catch(e) {}
        themeBtn.textContent = now === 'dark' ? '🌙 Dark' : '☀️ Light';
        FS.toast(now === 'dark' ? 'Dark theme enabled' : 'Light theme enabled', 'info', 1400);
      });
    }

    // Check for updates button
    var moreUpdateBtn = modal.querySelector('.btn-more-check-update');
    if (moreUpdateBtn) {
      moreUpdateBtn.addEventListener('click', function() {
        if (typeof AppUpdater !== 'undefined' && AppUpdater.checkUpdate) {
          AppUpdater.checkUpdate(true);
        } else {
          FS.toast(isHi ? 'आपका ऐप पहले से ही नवीनतम वर्शन (v2.4.0) पर है!' : 'Your app is already on the latest version (v2.4.0)!', 'ok', 3000);
        }
      });
    }

    // Share app button
    var shareBtn = modal.querySelector('.btn-share-app');
    if (shareBtn) {
      shareBtn.addEventListener('click', function() {
        if (navigator.share) {
          navigator.share({
            title: 'Festival Studio',
            text: 'Create beautiful festival posts, WhatsApp statuses and animated GIFs free! Download Festival Studio:\\nhttps://festival-studio.work.gd/'
          }).catch(function() {});
        } else {
          var url = 'https://api.whatsapp.com/send?text=' + encodeURIComponent('Create beautiful festival posts, WhatsApp statuses and animated GIFs free! Download Festival Studio:\\nhttps://festival-studio.work.gd/');
          window.open(url, '_blank');
        }
      });
    }
  };


  FS.openMyDesignsModal = function (initialTab) {
    var existing = document.getElementById('my-designs-modal');
    if (existing) { existing.remove(); }

    var isHi = FS.LANG === 'hi';
    var activeTab = initialTab || 'drafts';

    var modal = FS.el('div', {
      id: 'my-designs-modal',
      class: 'app-update-modal-backdrop my-designs-backdrop',
      role: 'dialog',
      'aria-modal': 'true'
    });

    modal.innerHTML =
      '<div class="app-update-card my-designs-card" style="max-width:560px;max-height:85vh;display:flex;flex-direction:column;">' +
        '<div class="app-update-header" style="padding:14px 18px;">' +
          '<div style="display:flex;align-items:center;gap:10px;flex:1;">' +
            '<div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#ff7700,#e11d48);color:#fff;display:flex;align-items:center;justify-content:center;">' +
              '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>' +
            '</div>' +
            '<div>' +
              '<h3 style="margin:0;font-size:17px;font-weight:700;">' + (isHi ? 'माई डिज़ाइन्स' : 'My Designs') + '</h3>' +
              '<p style="margin:0;font-size:12px;color:var(--muted,#666);">' + (isHi ? 'आपके द्वारा बनाए गए ड्राफ्ट्स व सेव किए गए डिज़ाइन्स' : 'Locally saved drafts, designs & favorites') + '</p>' +
            '</div>' +
          '</div>' +
          '<button type="button" class="app-update-close" aria-label="Close" style="font-size:24px;">&times;</button>' +
        '</div>' +
        '<div class="my-designs-tabs" style="display:flex;border-bottom:1px solid var(--border,#e2e8f0);padding:0 18px;background:var(--surface-soft,#f8fafc);gap:8px;">' +
          '<button type="button" class="tab-btn' + (activeTab === 'drafts' ? ' active' : '') + '" data-tab="drafts">' + (isHi ? 'ड्राफ्ट्स' : 'Drafts') + '</button>' +
          '<button type="button" class="tab-btn' + (activeTab === 'saved' ? ' active' : '') + '" data-tab="saved">' + (isHi ? 'सेव किए गए' : 'Saved') + '</button>' +
          '<button type="button" class="tab-btn' + (activeTab === 'favorites' ? ' active' : '') + '" data-tab="favorites">' + (isHi ? 'फेवरेट्स' : 'Favorites') + '</button>' +
        '</div>' +
        '<div class="my-designs-content" style="padding:16px;overflow-y:auto;flex:1;">' +
        '</div>' +
      '</div>';

    document.body.appendChild(modal);

    var content = modal.querySelector('.my-designs-content');
    var closeBtn = modal.querySelector('.app-update-close');

    function closeModal() {
      modal.classList.add('closing');
      setTimeout(function () { modal.remove(); }, 200);
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeModal();
    });

    function renderTab(tab) {
      activeTab = tab;
      modal.querySelectorAll('.tab-btn').forEach(function(b) {
        b.classList.toggle('active', b.getAttribute('data-tab') === tab);
      });

      content.innerHTML = '';

      if (tab === 'drafts') {
        var drafts = FS.Store.listDrafts();
        if (!drafts.length) {
          content.innerHTML =
            '<div class="empty" style="padding:30px 10px;text-align:center;">' +
              '<div style="font-size:40px;margin-bottom:8px;">📝</div>' +
              '<h4 style="margin:0 0 6px;font-size:16px;">' + (isHi ? 'कोई ड्राफ्ट नहीं मिला' : 'No Drafts Yet') + '</h4>' +
              '<p style="font-size:13px;color:var(--muted,#666);margin:0 0 16px;">' + (isHi ? 'एडिटर में किया गया कोई भी काम यहाँ स्वतः सुरक्षित रहता है।' : 'Any unfinished work in the editor is automatically saved here.') + '</p>' +
              '<a href="post-maker.html?mode=app" class="btn btn-primary btn-sm">' + (isHi ? 'नई डिज़ाइन बनाएं' : 'Create New Design') + '</a>' +
            '</div>';
          return;
        }

        var grid = FS.el('div', { class: 'grid', style: 'grid-template-columns:repeat(auto-fill, minmax(140px, 1fr));gap:12px;' });
        drafts.forEach(function(d) {
          var item = FS.el('div', { class: 'card', style: 'padding:8px;display:flex;flex-direction:column;position:relative;' });
          var preview = '<div style="height:120px;background:#f1f5f9;border-radius:8px;display:flex;align-items:center;justify-content:center;overflow:hidden;margin-bottom:8px;font-size:24px;">🎨</div>';
          if (d.preview) {
            preview = '<img src="' + d.preview + '" style="width:100%;height:120px;object-fit:cover;border-radius:8px;margin-bottom:8px;" alt="Draft preview" />';
          }
          item.innerHTML = preview +
            '<div style="flex:1;"><strong style="display:block;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + FS.esc(d.name || (isHi ? 'अनाम ड्राफ्ट' : 'Untitled Draft')) + '</strong>' +
            '<span style="font-size:10px;color:var(--muted,#777);">' + new Date(d.updated || Date.now()).toLocaleDateString() + '</span></div>' +
            '<div style="display:flex;gap:4px;margin-top:8px;">' +
              '<a href="post-maker.html?draft=' + d.id + '&mode=app" class="btn btn-primary btn-sm" style="flex:1;padding:4px 6px;font-size:11px;justify-content:center;">' + (isHi ? 'एडिट' : 'Edit') + '</a>' +
              '<button type="button" class="btn btn-ghost btn-sm btn-del-draft" data-id="' + d.id + '" style="padding:4px 6px;color:#e11d48;" aria-label="Delete draft">&times;</button>' +
            '</div>';

          var delBtn = item.querySelector('.btn-del-draft');
          delBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (confirm(isHi ? 'क्या आप इस ड्राफ्ट को हटाना चाहते हैं?' : 'Delete this draft?')) {
              FS.Store.deleteDraft(d.id);
              renderTab('drafts');
            }
          });

          grid.appendChild(item);
        });
        content.appendChild(grid);

      } else if (tab === 'saved') {
        var saved = FS.Store.listSavedDesigns();
        if (!saved.length) {
          content.innerHTML =
            '<div class="empty" style="padding:30px 10px;text-align:center;">' +
              '<div style="font-size:40px;margin-bottom:8px;">🖼️</div>' +
              '<h4 style="margin:0 0 6px;font-size:16px;">' + (isHi ? 'कोई सेव्ड डिज़ाइन नहीं' : 'No Saved Designs Yet') + '</h4>' +
              '<p style="font-size:13px;color:var(--muted,#666);margin:0 0 16px;">' + (isHi ? 'जब आप कोई पोस्टर एक्सपोर्ट करेंगे, तो वह यहाँ दिखेगा।' : 'When you export posters, your creations will appear here.') + '</p>' +
              '<a href="post-maker.html?mode=app" class="btn btn-primary btn-sm">' + (isHi ? 'पहला डिज़ाइन बनाएं' : 'Create First Design') + '</a>' +
            '</div>';
          return;
        }

        var sGrid = FS.el('div', { class: 'grid', style: 'grid-template-columns:repeat(auto-fill, minmax(140px, 1fr));gap:12px;' });
        saved.forEach(function(s) {
          var sItem = FS.el('div', { class: 'card', style: 'padding:8px;display:flex;flex-direction:column;' });
          var sPrev = s.thumbnail ? '<img src="' + s.thumbnail + '" style="width:100%;height:120px;object-fit:cover;border-radius:8px;margin-bottom:8px;" />' : '<div style="height:120px;background:#f1f5f9;border-radius:8px;margin-bottom:8px;"></div>';
          sItem.innerHTML = sPrev +
            '<div style="flex:1;"><strong style="display:block;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + FS.esc(s.name || 'Poster') + '</strong>' +
            '<span style="font-size:10px;color:var(--muted,#777);">' + (s.format || 'PNG') + ' · ' + (s.size || '') + '</span></div>' +
            '<div style="display:flex;gap:4px;margin-top:8px;">' +
              '<a href="' + (s.url || '#') + '" download="' + (s.filename || 'FestivalStudio_Design.png') + '" class="btn btn-primary btn-sm" style="flex:1;padding:4px 6px;font-size:11px;justify-content:center;">' + (isHi ? 'डाउनलोड' : 'Save') + '</a>' +
              '<button type="button" class="btn btn-ghost btn-sm btn-del-saved" data-id="' + s.id + '" style="padding:4px 6px;color:#e11d48;" aria-label="Delete">&times;</button>' +
            '</div>';

          sItem.querySelector('.btn-del-saved').addEventListener('click', function(e) {
            e.stopPropagation();
            if (confirm(isHi ? 'क्या आप इसे हटाना चाहते हैं?' : 'Delete this item?')) {
              FS.Store.deleteSavedDesign(s.id);
              renderTab('saved');
            }
          });
          sGrid.appendChild(sItem);
        });
        content.appendChild(sGrid);

      } else if (tab === 'favorites') {
        var favTpls = FS.Store.listFavorites('templates');
        var favWishes = FS.Store.listFavorites('wishes');

        if (!favTpls.length && !favWishes.length) {
          content.innerHTML =
            '<div class="empty" style="padding:30px 10px;text-align:center;">' +
              '<div style="font-size:40px;margin-bottom:8px;">♥</div>' +
              '<h4 style="margin:0 0 6px;font-size:16px;">' + (isHi ? 'कोई पसंदीदा आइटम नहीं' : 'No Favorites Yet') + '</h4>' +
              '<p style="font-size:13px;color:var(--muted,#666);margin:0 0 16px;">' + (isHi ? 'किसी भी टेम्पलेट या विश पर दिल (♥) दबाकर उसे यहाँ जोड़ें।' : 'Tap the heart icon on any template or wish to save it here.') + '</p>' +
              '<a href="templates.html?mode=app" class="btn btn-primary btn-sm">' + (isHi ? 'टेम्पलेट्स देखें' : 'Explore Templates') + '</a>' +
            '</div>';
          return;
        }

        var favWrap = FS.el('div', { style: 'display:flex;flex-direction:column;gap:16px;' });

        if (favTpls.length) {
          favWrap.appendChild(FS.el('h5', { style: 'margin:0;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;color:var(--muted,#777);' }, (isHi ? 'फेवरेट टेम्पलेट्स (' : 'Favorite Templates (') + favTpls.length + ')'));
          var tGrid = FS.el('div', { class: 'grid', style: 'grid-template-columns:repeat(auto-fill, minmax(130px, 1fr));gap:10px;' });
          favTpls.forEach(function(tid) {
            var meta = FS.Store.getFavoriteMeta('templates', tid) || {};
            var tCard = FS.el('div', { class: 'card', style: 'padding:8px;' });
            tCard.innerHTML =
              '<div style="height:90px;background:#fdf2f8;border-radius:6px;display:flex;align-items:center;justify-content:center;margin-bottom:6px;font-size:22px;">🪔</div>' +
              '<strong style="display:block;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + FS.esc(meta.name || tid) + '</strong>' +
              '<a href="post-maker.html?tpl=' + encodeURIComponent(tid) + '&mode=app" class="btn btn-primary btn-sm" style="display:block;text-align:center;padding:3px 6px;font-size:11px;margin-top:6px;">' + (isHi ? 'ओपन करें' : 'Open') + '</a>';
            tGrid.appendChild(tCard);
          });
          favWrap.appendChild(tGrid);
        }

        if (favWishes.length) {
          favWrap.appendChild(FS.el('h5', { style: 'margin:12px 0 0;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;color:var(--muted,#777);' }, (isHi ? 'फेवरेट विशेस (' : 'Favorite Wishes (') + favWishes.length + ')'));
          favWishes.forEach(function(wid) {
            var wMeta = FS.Store.getFavoriteMeta('wishes', wid) || {};
            var wBox = FS.el('div', { class: 'card', style: 'padding:10px;margin-top:6px;display:flex;align-items:center;gap:10px;' });
            wBox.innerHTML =
              '<p style="margin:0;flex:1;font-size:13px;line-height:1.4;">' + FS.esc(wMeta.text || wid) + '</p>' +
              '<button type="button" class="btn btn-ghost btn-sm" data-use-wish="' + FS.esc(wMeta.text || wid) + '" style="font-size:11px;padding:4px 8px;">' + (isHi ? 'डिज़ाइन बनाएं' : 'Design') + '</button>';
            favWrap.appendChild(wBox);
          });
        }

        content.appendChild(favWrap);
      }
    }

    modal.querySelectorAll('.tab-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        renderTab(btn.getAttribute('data-tab'));
      });
    });

    renderTab(activeTab);
  };



/* Boot                                                                */
  /* ------------------------------------------------------------------ */
  FS.ready(function () {
    // Setup Environment Mode: Website vs App
    if (FS.isApp()) {
      document.documentElement.setAttribute('data-env', 'app');
      document.body.classList.add('is-app-mode');

      // CRITICAL: Remove all website-only elements and unwanted floating boxes in App mode
      FS.$$('.site-footer, .breadcrumb, .skip-link, .ad-slot, .consent, .web-only, .footer-app-cta, .btn-download-app, [data-download-apk], [data-download-app], .download-app-banner, .download-app-actions, .admob-banner-wrap, .admob-fixed-banner, .admob-interstitial-back').forEach(function (box) {
        box.remove();
      });

      // Update in-app copy from browser to native app
      var isHi = FS.LANG === 'hi';
      var privNote = document.querySelector('.privacy-note span');
      if (privNote) {
        privNote.textContent = isHi ?
          'आपकी फोटो 100% आपके डिवाइस में सुरक्षित प्रोसेस होती है (कोई सर्वर अपलोड नहीं)।' :
          'Your photos are processed 100% privately on your device. Zero cloud uploads.';
      }
      FS.$$('.badge, .badge-row span, .hero-chips span').forEach(function (el) {
        if (/works on mobile|मोबाइल पर/i.test(el.textContent)) {
          el.innerHTML = '⚡ ' + (isHi ? 'ऑफ़लाइन रेडी' : '100% Offline');
        }
      });

      // Customize Drawer for App Mode
      var drawer = document.getElementById('drawer');
      if (drawer) {
        // Remove website-only links from drawer
        // Add Settings & Install item to mobile drawer if not already present
    if (!drawer.querySelector('.drawer-settings-btn')) {
      var setRow = FS.el('button', {
        type: 'button',
        class: 'drawer-settings-btn',
        style: 'display:flex;align-items:center;justify-content:space-between;width:100%;padding:12px 14px;background:linear-gradient(135deg,rgba(255,119,0,0.12),rgba(225,29,72,0.12));border:1px solid rgba(255,119,0,0.25);border-radius:12px;font-size:14px;font-weight:600;color:var(--brand,#ff7700);cursor:pointer;margin-bottom:6px;'
      }, '<span style="display:flex;align-items:center;gap:8px;">⚙️ ' + (FS.isApp() ? (FS.LANG === 'hi' ? 'सेटिंग्स व अपडेट चेक' : 'Settings & Check Updates') : (FS.LANG === 'hi' ? 'सेटिंग्स व ऐप इंस्टॉल' : 'Settings & Install App')) + '</span><span>›</span>');

      setRow.addEventListener('click', function() {
        if (FS.setDrawer) FS.setDrawer(false);
        if (FS.openSettingsModal) FS.openSettingsModal();
      });
      drawer.insertBefore(setRow, drawer.firstChild);
    }

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
    // Initialize In-App Website Updater
    if (FS.AppUpdater && FS.AppUpdater.setupInAppButton) {
      FS.AppUpdater.setupInAppButton();
    }
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
