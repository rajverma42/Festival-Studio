/* ============================================================================
   Festival Studio — gif-maker.js
   Builds an animated festival greeting and encodes it to a real .gif entirely
   in the browser using FS.GIFEncoder. No uploads, no API, no watermark.
   ========================================================================== */
(function (global) {
  'use strict';
  var FS = (global.FS = global.FS || {});
  var Store = FS.Store;
  var el = FS.el;

  var ANIM_STYLES = [
    { id: 'reveal', label: 'Reveal (staggered)' },
    { id: 'zoom', label: 'Zoom in' },
    { id: 'pop', label: 'Pop' },
    { id: 'bounce', label: 'Bounce' },
    { id: 'slide', label: 'Slide in' },
    { id: 'float', label: 'Gentle float' },
    { id: 'none', label: 'Static (effects only)' }
  ];

  /* Animations are packed into the first ~55% of the loop so the finished
     design is fully visible (and readable) for the rest of every cycle. */
  function applyStyle(scene, style) {
    var visible = scene.objects.filter(function (o) { return !o.hidden; });
    var n = Math.max(1, visible.length);
    var spread = 0.30, dur = 0.25;
    visible.forEach(function (o, i) {
      if (style === 'none') { o.anim = null; return; }
      var delay = n === 1 ? 0 : (i / (n - 1)) * spread;
      switch (style) {
        case 'reveal': o.anim = { type: o.type === 'text' ? 'slide-up' : 'fade', delay: delay, dur: dur }; break;
        case 'zoom': o.anim = { type: 'zoom', delay: delay, dur: dur }; break;
        case 'pop': o.anim = { type: 'pop', delay: delay, dur: dur }; break;
        case 'bounce': o.anim = { type: 'bounce', delay: delay, dur: dur + .05 }; break;
        case 'slide': o.anim = { type: 'slide-left', delay: delay, dur: dur }; break;
        case 'float': o.anim = { type: o.type === 'sticker' ? 'float' : 'fade', delay: delay, dur: dur }; break;
      }
    });
    scene.objects.forEach(function (o) { if (o.hidden) o.anim = null; });
    return scene;
  }
  FS.applyAnimationStyle = applyStyle;

  function GifMaker() {
    this.festival = Store.pref('lastFestival') || 'diwali';
    this.style = 'reveal';
    this.effect = 'sparkle';
    this.fps = 12;
    this.duration = 2.5;
    this.outWidth = 400;
    this.fields = Object.assign({ name: '', message: '' }, Store.pref('fields') || {});
    this.scene = null;
    this.playing = true;
    this.t0 = performance.now();
    this.blob = null;
  }

  GifMaker.prototype.init = function () {
    var self = this;
    this.stage = document.getElementById('stage');
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.panel = document.getElementById('gif-panel');

    var qs = new URLSearchParams(location.search);
    if (qs.get('festival')) this.festival = qs.get('festival');

    var boot;
    if (qs.get('from') === 'handoff' && Store.get('handoff', null)) {
      boot = FS.deserialize(Store.get('handoff')).then(function (r) {
        self.scene = r.scene;
        if (r.meta && r.meta.festival) self.festival = r.meta.festival;
        applyStyle(self.scene, self.style);
      }).catch(function () { self.loadTemplate(); });
    } else {
      this.loadTemplate();
      boot = Promise.resolve();
    }

    boot.then(function () {
      self.buildPanel();
      self.fit();
      window.addEventListener('resize', function () { self.fit(); });
      if (window.ResizeObserver) {
        var last = '';
        new ResizeObserver(function (entries) {
          var r = entries[0].contentRect;
          var key = Math.round(r.width) + 'x' + Math.round(r.height);
          if (key === last) return;
          last = key;
          self.fit();
        }).observe(self.stage.parentElement);
      }
      self.loop();
    });
    return this;
  };

  GifMaker.prototype.loadTemplate = function (tplId) {
    var id = tplId || (this.festival + '--status');
    if (!FS.getTemplate(id)) id = this.festival + '--classic';
    this.scene = FS.buildScene(id, this.fields);
    applyStyle(this.scene, this.style);
  };

  GifMaker.prototype.fit = function () {
    var wrap = this.stage.parentElement;
    var availW = Math.max(160, wrap.clientWidth - 34);
    var availH = Math.max(180, wrap.clientHeight - 34);
    var ar = this.scene.width / this.scene.height;
    var w = availW, h = w / ar;
    if (h > availH) { h = availH; w = h * ar; }
    this.stage.style.width = Math.round(w) + 'px';
    this.stage.style.height = Math.round(h) + 'px';
    var dpr = Math.min(global.devicePixelRatio || 1, 2);
    this.canvas.width = Math.max(64, Math.min(720, Math.round(w * dpr)));
    this.canvas.height = Math.round(this.canvas.width / ar);
  };

  GifMaker.prototype.frameColors = function () {
    var f = FS.getFestival(this.festival);
    return { a: f.palette.accent, p: f.palette.accent2, s: '#FFFFFF' };
  };

  GifMaker.prototype.drawAt = function (ctx, t, w) {
    var k = w / this.scene.width;
    ctx.save();
    ctx.scale(k, k);
    FS.renderScene(ctx, this.scene, {
      animate: true, t: t, effect: this.effect, effectColors: this.frameColors()
    });
    ctx.restore();
  };

  GifMaker.prototype.loop = function () {
    var self = this;
    function frame() {
      if (self.playing && self.scene) {
        var t = ((performance.now() - self.t0) / (self.duration * 1000)) % 1;
        var ctx = self.ctx;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
        self.drawAt(ctx, t, self.canvas.width);
      }
      global.requestAnimationFrame(frame);
    }
    global.requestAnimationFrame(frame);
  };

  /* ------------------------------------------------------------------ */
  GifMaker.prototype.buildPanel = function () {
    var self = this, p = this.panel;
    p.innerHTML = '';

    function fieldWrap(label, node) {
      var f = el('div', { class: 'field' });
      f.appendChild(el('label', { class: 'flabel' }, FS.esc(FS.t(label))));
      f.appendChild(node);
      return f;
    }
    function select(label, options, value, onchange) {
      var s = el('select', { class: 'input', 'aria-label': label });
      options.forEach(function (o) {
        s.appendChild(el('option', { value: o.value, selected: String(o.value) === String(value) ? 'selected' : null }, o.label));
      });
      s.addEventListener('change', function () { onchange(s.value); });
      return fieldWrap(label, s);
    }
    function textInput(label, value, oninput) {
      var i = el('input', { class: 'input', type: 'text', value: value || '', 'aria-label': label });
      i.addEventListener('input', function () { oninput(i.value); });
      return fieldWrap(label, i);
    }

    p.appendChild(select('Festival', FS.FESTIVALS.map(function (f) { return { value: f.slug, label: f.icon + '  ' + f.name }; }),
      this.festival, function (v) {
        self.festival = v; Store.pref('lastFestival', v);
        self.loadTemplate(); self.fit(); self.buildPanel();
      }));

    p.appendChild(select('Design', FS.TEMPLATES.filter(function (t) { return t.festival === self.festival; })
      .map(function (t) { return { value: t.id, label: t.category }; }),
      this.festival + '--status', function (v) { self.loadTemplate(v); self.fit(); }));

    p.appendChild(textInput('Your name', this.fields.name, function (v) {
      self.fields.name = v; Store.pref('fields', Object.assign(Store.pref('fields') || {}, { name: v }));
      FS.applyFields(self.scene, self.fields);
    }));
    p.appendChild(textInput('Custom message', this.fields.message, function (v) {
      self.fields.message = v;
      FS.applyFields(self.scene, self.fields);
    }));

    p.appendChild(select('Animation style', ANIM_STYLES.map(function (a) { return { value: a.id, label: a.label }; }),
      this.style, function (v) { self.style = v; applyStyle(self.scene, v); self.t0 = performance.now(); }));

    p.appendChild(select('Festive effect', FS.EFFECTS.map(function (e) { return { value: e.id, label: e.label }; }),
      this.effect, function (v) { self.effect = v; }));

    p.appendChild(select('Frames per second', [8, 10, 12, 15].map(function (n) { return { value: n, label: n + ' fps' }; }),
      this.fps, function (v) { self.fps = parseInt(v, 10); self.updateEstimate(); }));

    p.appendChild(select('Duration', [1.5, 2, 2.5, 3, 4].map(function (n) { return { value: n, label: n + ' seconds' }; }),
      this.duration, function (v) { self.duration = parseFloat(v); self.t0 = performance.now(); self.updateEstimate(); }));

    p.appendChild(select('GIF size', [
      { value: 260, label: 'Small — 260 px (fast)' },
      { value: 400, label: 'Medium — 400 px' },
      { value: 540, label: 'Large — 540 px' }
    ], this.outWidth, function (v) { self.outWidth = parseInt(v, 10); self.updateEstimate(); }));

    this.estimate = el('p', { class: 'hint', id: 'gif-estimate' });
    p.appendChild(this.estimate);
    this.updateEstimate();

    var gen = el('button', { class: 'btn btn-primary btn-block btn-lg', id: 'btn-generate', type: 'button' }, FS.t('Generate GIF'));
    gen.addEventListener('click', function () { self.generate(); });
    p.appendChild(gen);

    this.progressWrap = el('div', { style: 'margin-top:12px', hidden: 'hidden' });
    this.progressWrap.appendChild(el('div', { class: 'progress' }, '<i></i>'));
    this.progressLabel = el('p', { class: 'hint', role: 'status', 'aria-live': 'polite' }, '');
    this.progressWrap.appendChild(this.progressLabel);
    p.appendChild(this.progressWrap);

    this.result = el('div', { style: 'margin-top:14px' });
    p.appendChild(this.result);

    p.appendChild(el('div', { class: 'privacy-note', style: 'margin-top:16px' },
      FS.icon('shield') + '<span>The GIF is created by your own device. Nothing is uploaded anywhere.</span>'));
  };

  GifMaker.prototype.updateEstimate = function () {
    if (!this.estimate) return;
    var frames = Math.round(this.fps * this.duration);
    this.estimate.textContent = frames + ' frames at ' + this.outWidth + ' px wide. Bigger and longer GIFs take longer and produce larger files.';
  };

  GifMaker.prototype.generate = function () {
    var self = this;
    var frames = Math.min(80, Math.max(4, Math.round(this.fps * this.duration)));
    var delay = Math.round(1000 / this.fps);
    var w = this.outWidth;
    var h = Math.round(w * this.scene.height / this.scene.width);
    var btn = document.getElementById('btn-generate');

    this.result.innerHTML = '';
    this.progressWrap.hidden = false;
    var bar = this.progressWrap.querySelector('.progress > i');
    bar.style.width = '0%';
    this.progressLabel.textContent = 'Preparing frames…';
    btn.disabled = true;
    this.playing = false;

    FS.fontsReady.then(function () {
      return FS.encodeGIF({
        width: w, height: h, frames: frames, delay: delay, colors: 180, sample: 2,
        drawFrame: function (ctx, i) { self.drawAt(ctx, i / frames, w); },
        onProgress: function (p) {
          bar.style.width = Math.round(p * 100) + '%';
          self.progressLabel.textContent = 'Encoding frame ' + Math.round(p * frames) + ' of ' + frames + '…';
        }
      });
    }).then(function (blob) {
      self.blob = blob;
      self.playing = true;
      self.t0 = performance.now();
      btn.disabled = false;
      self.progressLabel.textContent = 'Done — ' + (blob.size / 1024 < 1024
        ? Math.round(blob.size / 1024) + ' KB'
        : (blob.size / 1048576).toFixed(1) + ' MB');
      self.showResult(blob);
    }).catch(function (err) {
      self.playing = true;
      btn.disabled = false;
      self.progressWrap.hidden = true;
      FS.toast((err && err.message) || 'GIF generation failed. Try a smaller size or fewer frames.', 'err', 5000);
    });
  };

  GifMaker.prototype.showResult = function (blob) {
    var self = this;
    var url = URL.createObjectURL(blob);
    var name = FS.slugify(FS.getFestival(this.festival).name) + '-festival-greeting.gif';
    this.result.innerHTML = '';
    var frame = el('div', { class: 'preview-frame' });
    var img = el('img', { src: url, alt: 'Animated ' + FS.getFestival(this.festival).name + ' greeting preview' });
    frame.appendChild(img);
    this.result.appendChild(frame);

    var row = el('div', { class: 'grid2', style: 'margin-top:10px' });
    var dl = el('button', { class: 'btn btn-primary btn-sm', type: 'button' }, FS.t('Download GIF'));
    dl.addEventListener('click', function () { FS.saveBlob(blob, name); FS.toast('Saved ' + name, 'ok'); });
    var sh = el('button', { class: 'btn btn-soft btn-sm', type: 'button' }, FS.t('Share'));
    sh.addEventListener('click', function () { FS.shareBlob(blob, name, 'Happy ' + FS.getFestival(self.festival).name + '!'); });
    var again = el('button', { class: 'btn btn-soft btn-sm', type: 'button' }, FS.t('Restart'));
    again.addEventListener('click', function () {
      URL.revokeObjectURL(url);
      self.result.innerHTML = '';
      self.progressWrap.hidden = true;
      self.t0 = performance.now();
    });
    var edit = el('a', { class: 'btn btn-soft btn-sm', href: 'post-maker.html?festival=' + self.festival }, FS.t('Edit design'));
    row.appendChild(dl); row.appendChild(sh); row.appendChild(again); row.appendChild(edit);
    this.result.appendChild(row);
    this.result.appendChild(el('p', { class: 'hint' }, 'On Android, tap Share to send it straight to WhatsApp. On desktop, download and attach it.'));
  };

  FS.GifMaker = GifMaker;

  FS.ready(function () {
    if (document.getElementById('gif-panel')) new GifMaker().init();
  });
})(window);
