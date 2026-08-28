/* ============================================================================
   Festival Studio — gif-encoder.js
   A small, dependency-free animated GIF89a encoder that runs entirely in the
   browser: median-cut colour quantisation (per frame local palettes) plus a
   standard LZW compressor. No library, no worker file, no network request,
   no API key.

   Usage:
     var enc = new FS.GIFEncoder(width, height, { loop: 0 });
     enc.addFrame(ctxOrCanvas, delayMs);      // repeat
     var blob = enc.finish();                 // -> Blob('image/gif')

   FS.encodeGIF(frames, opts) does the same asynchronously with progress
   callbacks so the interface never freezes on a phone.
   ========================================================================== */
(function (global) {
  'use strict';
  var FS = (global.FS = global.FS || {});

  /* Remember where this script lives so the worker can be found from any
     page depth (root pages, /hi/ pages, /diwali-post-maker/ ...). */
  try {
    if (typeof document !== 'undefined' && document.currentScript) {
      FS.GIF_WORKER_URL = document.currentScript.src.replace(/gif-encoder\.js.*$/, 'gif-worker.js');
    }
  } catch (e) { /* ignore */ }

  /* ---------------- byte sink ---------------- */
  function Bytes() { this.a = []; }
  Bytes.prototype.b = function (v) { this.a.push(v & 255); };
  Bytes.prototype.w = function (v) { this.a.push(v & 255, (v >> 8) & 255); };
  Bytes.prototype.s = function (str) { for (var i = 0; i < str.length; i++) this.a.push(str.charCodeAt(i) & 255); };
  Bytes.prototype.arr = function (list) { for (var i = 0; i < list.length; i++) this.a.push(list[i] & 255); };
  Bytes.prototype.toUint8 = function () { return new Uint8Array(this.a); };

  /* ---------------- median-cut quantiser ---------------- */
  /* Works on a 5:5:5 histogram, so it is fast enough for phones. */
  function quantize(rgba, maxColors, sampleStep) {
    var hist = new Int32Array(32768);
    var step = (sampleStep || 1) * 4;
    var i, idx;
    for (i = 0; i < rgba.length; i += step) {
      idx = ((rgba[i] >> 3) << 10) | ((rgba[i + 1] >> 3) << 5) | (rgba[i + 2] >> 3);
      hist[idx]++;
    }
    var bins = [];
    for (i = 0; i < 32768; i++) if (hist[i]) bins.push(i);
    if (!bins.length) return [[0, 0, 0]];

    function boxOf(list) {
      var rmin = 255, rmax = 0, gmin = 255, gmax = 0, bmin = 255, bmax = 0, n = 0;
      for (var j = 0; j < list.length; j++) {
        var v = list[j], c = hist[v];
        var r = ((v >> 10) & 31) << 3, g = ((v >> 5) & 31) << 3, b = (v & 31) << 3;
        if (r < rmin) rmin = r; if (r > rmax) rmax = r;
        if (g < gmin) gmin = g; if (g > gmax) gmax = g;
        if (b < bmin) bmin = b; if (b > bmax) bmax = b;
        n += c;
      }
      return { list: list, n: n, dr: rmax - rmin, dg: gmax - gmin, db: bmax - bmin };
    }

    var boxes = [boxOf(bins)];
    while (boxes.length < maxColors) {
      /* split the box with the largest (population × extent) */
      var best = -1, bestScore = 0;
      for (i = 0; i < boxes.length; i++) {
        var bx = boxes[i];
        if (bx.list.length < 2) continue;
        var score = bx.n * Math.max(bx.dr, bx.dg, bx.db);
        if (score > bestScore) { bestScore = score; best = i; }
      }
      if (best < 0) break;
      var box = boxes[best];
      var ch = box.dr >= box.dg && box.dr >= box.db ? 10 : (box.dg >= box.db ? 5 : 0);
      var sorted = box.list.slice().sort(function (a, b) { return ((a >> ch) & 31) - ((b >> ch) & 31); });
      var half = box.n / 2, acc = 0, cut = 0;
      for (i = 0; i < sorted.length; i++) {
        acc += hist[sorted[i]];
        if (acc >= half) { cut = i + 1; break; }
      }
      if (cut <= 0) cut = 1;
      if (cut >= sorted.length) cut = sorted.length - 1;
      boxes.splice(best, 1, boxOf(sorted.slice(0, cut)), boxOf(sorted.slice(cut)));
    }

    var palette = boxes.map(function (bx) {
      var r = 0, g = 0, b = 0, n = 0;
      for (var j = 0; j < bx.list.length; j++) {
        var v = bx.list[j], c = hist[v];
        r += (((v >> 10) & 31) << 3 | 4) * c;
        g += (((v >> 5) & 31) << 3 | 4) * c;
        b += ((v & 31) << 3 | 4) * c;
        n += c;
      }
      n = n || 1;
      return [Math.min(255, Math.round(r / n)), Math.min(255, Math.round(g / n)), Math.min(255, Math.round(b / n))];
    });
    return palette;
  }

  /* map pixels -> palette indices, with a 15-bit colour cache */
  function mapPixels(rgba, palette) {
    var n = rgba.length / 4;
    var out = new Uint8Array(n);
    var cache = new Int16Array(32768).fill(-1);
    var pl = palette.length;
    var pr = new Int32Array(pl), pg = new Int32Array(pl), pb = new Int32Array(pl);
    for (var k = 0; k < pl; k++) { pr[k] = palette[k][0]; pg[k] = palette[k][1]; pb[k] = palette[k][2]; }
    for (var i = 0, p = 0; i < n; i++, p += 4) {
      var r = rgba[p], g = rgba[p + 1], b = rgba[p + 2];
      var key = ((r >> 3) << 10) | ((g >> 3) << 5) | (b >> 3);
      var idx = cache[key];
      if (idx < 0) {
        var bestD = 1 << 30, bestI = 0;
        for (var j = 0; j < pl; j++) {
          var dr = r - pr[j], dg = g - pg[j], db = b - pb[j];
          var d = dr * dr * 3 + dg * dg * 6 + db * db;   /* luma-weighted */
          if (d < bestD) { bestD = d; bestI = j; if (!d) break; }
        }
        idx = bestI; cache[key] = idx;
      }
      out[i] = idx;
    }
    return out;
  }

  /* ---------------- LZW ---------------- */
  function lzwEncode(pixels, minCodeSize) {
    var clearCode = 1 << minCodeSize;
    var eoiCode = clearCode + 1;
    var codeSize = minCodeSize + 1;
    var dict = new Map();
    var next = eoiCode + 1;
    var out = [];
    var cur = 0, curBits = 0;

    function emit(code) {
      cur |= code << curBits;
      curBits += codeSize;
      while (curBits >= 8) { out.push(cur & 255); cur >>>= 8; curBits -= 8; }
    }

    emit(clearCode);
    if (!pixels.length) { emit(eoiCode); if (curBits) out.push(cur & 255); return out; }

    var prefix = pixels[0];
    for (var i = 1; i < pixels.length; i++) {
      var k = pixels[i];
      var key = prefix * 256 + k;
      var code = dict.get(key);
      if (code !== undefined) { prefix = code; continue; }
      emit(prefix);
      if (next <= 4095) {
        dict.set(key, next);
        next++;
        if (next > (1 << codeSize) && codeSize < 12) codeSize++;
      } else {
        emit(clearCode);
        dict.clear();
        next = eoiCode + 1;
        codeSize = minCodeSize + 1;
      }
      prefix = k;
    }
    emit(prefix);
    emit(eoiCode);
    if (curBits > 0) out.push(cur & 255);
    return out;
  }

  function writeSubBlocks(bytes, data) {
    var i = 0;
    while (i < data.length) {
      var n = Math.min(255, data.length - i);
      bytes.b(n);
      for (var j = 0; j < n; j++) bytes.b(data[i + j]);
      i += n;
    }
    bytes.b(0);
  }

  /* ---------------- encoder ---------------- */
  function GIFEncoder(width, height, opts) {
    opts = opts || {};
    this.w = Math.max(1, Math.round(width));
    this.h = Math.max(1, Math.round(height));
    this.maxColors = Math.max(4, Math.min(256, opts.colors || 256));
    this.sample = opts.sample || 2;
    this.out = new Bytes();
    this.started = false;
    this.loop = opts.loop == null ? 0 : opts.loop;
  }

  GIFEncoder.prototype._header = function () {
    var o = this.out;
    o.s('GIF89a');
    o.w(this.w); o.w(this.h);
    o.b(0x70);      /* no global colour table, colour resolution 8 */
    o.b(0); o.b(0);
    /* Netscape looping extension */
    o.b(0x21); o.b(0xFF); o.b(0x0B);
    o.s('NETSCAPE2.0');
    o.b(0x03); o.b(0x01); o.w(this.loop); o.b(0x00);
    this.started = true;
  };

  GIFEncoder.prototype.addFrame = function (source, delayMs) {
    if (!this.started) this._header();
    var data;
    if (source instanceof Uint8ClampedArray || source instanceof Uint8Array) data = source;
    else if (source && source.data) data = source.data;                 /* ImageData */
    else {
      var ctx = source.getContext ? source.getContext('2d') : source;
      data = ctx.getImageData(0, 0, this.w, this.h).data;
    }

    var palette = quantize(data, this.maxColors, this.sample);
    var indices = mapPixels(data, palette);

    /* palette must be a power of two, minimum 4 entries */
    var bits = 1;
    while ((1 << bits) < palette.length) bits++;
    if (bits < 2) bits = 2;
    var tableSize = 1 << bits;

    var o = this.out;
    /* Graphic control extension */
    o.b(0x21); o.b(0xF9); o.b(0x04);
    o.b(0x04);                                   /* disposal = 1 (leave), no transparency */
    o.w(Math.max(2, Math.round((delayMs || 100) / 10)));
    o.b(0); o.b(0);
    /* Image descriptor */
    o.b(0x2C); o.w(0); o.w(0); o.w(this.w); o.w(this.h);
    o.b(0x80 | (bits - 1));                      /* local colour table, size */
    for (var i = 0; i < tableSize; i++) {
      var c = palette[i] || [0, 0, 0];
      o.b(c[0]); o.b(c[1]); o.b(c[2]);
    }
    o.b(bits);                                   /* LZW minimum code size */
    writeSubBlocks(o, lzwEncode(indices, bits));
    return this;
  };

  GIFEncoder.prototype.finish = function () {
    if (!this.started) this._header();
    this.out.b(0x3B);
    return new Blob([this.out.toUint8()], { type: 'image/gif' });
  };

  GIFEncoder.prototype.bytes = function () { return this.out.toUint8(); };

  FS.GIFEncoder = GIFEncoder;

  /* ------------------------------------------------------------------ */
  /* Async helper: draws frames one at a time so the UI keeps breathing  */
  /* ------------------------------------------------------------------ */
  /* drawFrame(ctx, i, total) must paint frame i onto the given context. */
  FS.encodeGIF = function (opts) {
    /* Prefer the Web Worker: the phone stays smooth while it encodes. */
    if (typeof Worker !== 'undefined' && FS.GIF_WORKER_URL && opts.worker !== false) {
      return FS.encodeGIFInWorker(opts).catch(function () {
        return FS.encodeGIFOnMainThread(opts);   /* worker blocked? carry on */
      });
    }
    return FS.encodeGIFOnMainThread(opts);
  };

  FS.encodeGIFInWorker = function (opts) {
    return new Promise(function (resolve, reject) {
      var width = opts.width, height = opts.height, frames = opts.frames;
      var onProgress = opts.onProgress || function () {};
      var cv, ctx, worker;
      try {
        cv = document.createElement('canvas');
        cv.width = width; cv.height = height;
        ctx = cv.getContext('2d', { willReadFrequently: true });
        worker = new Worker(FS.GIF_WORKER_URL);
      } catch (e) { return reject(new Error('worker unavailable')); }

      var i = 0, settled = false;
      function fail(msg) {
        if (settled) return;
        settled = true;
        try { worker.terminate(); } catch (e) {}
        reject(new Error(msg));
      }
      function sendFrame() {
        try {
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.clearRect(0, 0, width, height);
          ctx.fillStyle = '#000000';
          ctx.fillRect(0, 0, width, height);
          opts.drawFrame(ctx, i, frames);
          var img = ctx.getImageData(0, 0, width, height);
          var buf = img.data.buffer;
          worker.postMessage({ type: 'frame', buffer: buf, delay: opts.delay }, [buf]);
        } catch (e) { fail('GIF frame ' + (i + 1) + ' could not be drawn.'); }
      }
      worker.onerror = function () { fail('worker error'); };
      worker.onmessage = function (e) {
        var m = e.data || {};
        if (m.type === 'ready') { sendFrame(); return; }
        if (m.type === 'frame-done') {
          i++;
          onProgress(i / frames);
          if (i < frames) sendFrame();
          else worker.postMessage({ type: 'finish' });
          return;
        }
        if (m.type === 'done') {
          settled = true;
          try { worker.terminate(); } catch (e2) {}
          resolve(new Blob([new Uint8Array(m.buffer)], { type: 'image/gif' }));
          return;
        }
        if (m.type === 'error') fail(m.message);
      };
      worker.postMessage({
        type: 'init', width: width, height: height,
        colors: opts.colors || 200, sample: opts.sample || 2
      });
    });
  };

  FS.encodeGIFOnMainThread = function (opts) {
    var width = opts.width, height = opts.height;
    var frames = opts.frames, delay = opts.delay;
    var drawFrame = opts.drawFrame;
    var onProgress = opts.onProgress || function () {};

    return new Promise(function (resolve, reject) {
      var cv, ctx, enc;
      try {
        cv = document.createElement('canvas');
        cv.width = width; cv.height = height;
        ctx = cv.getContext('2d', { willReadFrequently: true });
        if (!ctx) throw new Error('no 2d context');
        enc = new FS.GIFEncoder(width, height, { colors: opts.colors || 200, sample: opts.sample || 2, loop: 0 });
      } catch (e) { return reject(new Error('This browser could not start GIF encoding.')); }

      var i = 0;
      var schedule = function (fn) {
        if (global.requestAnimationFrame) global.requestAnimationFrame(function () { fn(); });
        else setTimeout(fn, 0);
      };

      function step() {
        try {
          /* one frame per tick keeps phones responsive */
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.clearRect(0, 0, width, height);
          ctx.fillStyle = '#000000';
          ctx.fillRect(0, 0, width, height);
          drawFrame(ctx, i, frames);
          enc.addFrame(ctx, delay);
          i++;
          onProgress(i / frames);
        } catch (e) {
          return reject(new Error('GIF frame ' + (i + 1) + ' could not be drawn.'));
        }
        if (i < frames) schedule(step);
        else {
          try { resolve(enc.finish()); }
          catch (e) { reject(new Error('The GIF could not be assembled. Try fewer frames or a smaller size.')); }
        }
      }
      schedule(step);
    });
  };
})(typeof window !== 'undefined' ? window : self);
