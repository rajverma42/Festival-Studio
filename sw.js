/* Festival Studio — service worker
   Makes the app shell available offline after the first visit.
   Strategy: network-first for HTML (so updates land immediately),
   cache-first for CSS/JS/icons (so the editor opens instantly).      */
'use strict';

var VERSION = 'fs-v2';
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
  if (url.origin !== self.location.origin) return;   /* never touch fonts/ads */

  var isDoc = req.mode === 'navigate' || (req.headers.get('accept') || '').indexOf('text/html') > -1;

  if (isDoc) {
    e.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(VERSION).then(function (c) { c.put(req, copy); });
        return res;
      }).catch(function () {
        return caches.match(req).then(function (r) { return r || caches.match('./index.html'); });
      })
    );
    return;
  }

  e.respondWith(
    caches.match(req).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (res) {
        if (res && res.status === 200 && res.type === 'basic') {
          var copy = res.clone();
          caches.open(VERSION).then(function (c) { c.put(req, copy); });
        }
        return res;
      });
    }).catch(function () { return caches.match('./index.html'); })
  );
});
