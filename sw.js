/* Festival Studio — service worker
   Makes the app shell available offline after the first visit.
   Strategy: network-first for HTML (so updates land immediately),
   cache-first for CSS/JS/icons (so the editor opens instantly).      */
'use strict';

var VERSION = 'fs-cbafc72814';
var SHELL = [
  './',
  './index.html',
  './post-maker.html',
  './gif-maker.html',
  './status-maker.html',
  './templates.html',
  './calendar.html',
  './wishes.html',
  './css/style.css',
  './js/config.js',
  './js/storage.js',
  './js/i18n.js',
  './js/wishes.js',
  './js/festivals.js',
  './js/stickers.js',
  './js/engine.js',
  './js/templates.js',
  './js/app.js',
  './js/editor.js',
  './js/gif-encoder.js',
  './js/gif-maker.js',
  './js/gif-worker.js',
  './js/post-maker-page.js',
  './js/status-maker-page.js',
  './js/templates-page.js',
  './assets/icons/logo-96.png',
  './assets/icons/favicon-32.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(VERSION)
      .then(function (c) { return c.addAll(SHELL); })
      .catch(function () { /* a missing file must never block installation */ })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) { return k === VERSION ? null : caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});


self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);

  // Shell assets: cache first
  if (url.origin === location.origin && (url.pathname.endsWith('.css') || url.pathname.endsWith('.js') || url.pathname.endsWith('.png') || url.pathname.endsWith('.jpg') || url.pathname.endsWith('.svg'))) {
    e.respondWith(
      caches.match(req).then(function (res) {
        return res || fetch(req).then(function (netRes) {
          if (netRes && netRes.ok) {
            var copy = netRes.clone();
            caches.open(VERSION).then(function (c) { c.put(req, copy); });
          }
          return netRes;
        });
      })
    );
    return;
  }

  // HTML navigation requests
  if (req.mode === 'navigate' || (req.headers.get('accept') && req.headers.get('accept').includes('text/html'))) {
    e.respondWith(
      fetch(req).catch(function () {
        return caches.match(req).then(function (matched) {
          if (matched) return matched;
          return caches.match('./index.html').then(function(indexRes) {
            if (indexRes) return indexRes;
            return new Response(
              '<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><title>You\'re Offline - Festival Studio</title><style>body{font-family:sans-serif;background:#FBF7F4;color:#1e293b;padding:40px 20px;text-align:center;line-height:1.5;}h2{color:#ff7700;margin-top:10px;}.btn{display:inline-block;padding:12px 24px;border-radius:10px;background:#ff7700;color:#fff;text-decoration:none;font-weight:600;margin-top:16px;}</style></head><body><div style="font-size:48px;">🪔</div><h2>You\'re Offline</h2><p>You can still create and edit your saved designs.</p><a href="./index.html" class="btn">Continue Offline</a></body></html>',
              { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
            );
          });
        });
      })
    );
    return;
  }
});
