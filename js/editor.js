/* ============================================================================
   Festival Studio — editor.js
   The interactive Canvas editor used by the Post Maker and Status Maker.
   Pointer + touch editing, layers, undo/redo, local drafts and exports.
   ========================================================================== */
(function (global) {
  'use strict';
  var FS = (global.FS = global.FS || {});
  var Store = FS.Store;
  var el = FS.el, $ = FS.$;

  /* ------------------------------------------------------------------ */
  /* Control builders                                                    */
  /* ------------------------------------------------------------------ */
  function field(label, node) {
    var f = el('div', { class: 'field' });
    if (label) f.appendChild(el('label', { class: 'flabel' }, FS.esc(FS.t(label))));
    f.appendChild(node);
    return f;
  }
  function ctlInput(label, value, oninput, type) {
    var i = el('input', { class: 'input', type: type || 'text', value: value == null ? '' : value });
    i.addEventListener('input', function () { oninput(i.value); });
    return field(label, i);
  }
  function ctlArea(label, value, oninput) {
    var t = el('textarea', { class: 'input', rows: 3 });
    t.value = value == null ? '' : value;
    t.addEventListener('input', function () { oninput(t.value); });
    var f = field(label, t);
    f._input = t;
    return f;
  }
  function ctlRange(label, min, max, step, value, oninput, fmt) {
    var wrap = el('div', { class: 'rangerow' });
    var r = el('input', { type: 'range', min: min, max: max, step: step, value: value, 'aria-label': label });
    var out = el('output', {}, fmt ? fmt(value) : String(Math.round(value * 100) / 100));
    r.addEventListener('input', function () {
      var v = parseFloat(r.value);
      out.textContent = fmt ? fmt(v) : String(Math.round(v * 100) / 100);
      oninput(v);
    });
    wrap.appendChild(r); wrap.appendChild(out);
    return field(label, wrap);
  }
  function ctlColor(label, value, oninput) {
    var i = el('input', { type: 'color', value: normHex(value), 'aria-label': label });
    i.addEventListener('input', function () { oninput(i.value); });
    return field(label, i);
  }
  function normHex(c) {
    if (!c) return '#ffffff';
    if (/^#[0-9a-f]{6}$/i.test(c)) return c;
    if (/^#[0-9a-f]{3}$/i.test(c)) return '#' + c[1] + c[1] + c[2] + c[2] + c[3] + c[3];
    var m = String(c).match(/rgba?\(([^)]+)\)/);
    if (m) {
      var p = m[1].split(',').map(function (x) { return parseFloat(x); });
      return '#' + p.slice(0, 3).map(function (n) { return ('0' + Math.round(n).toString(16)).slice(-2); }).join('');
    }
    return '#ffffff';
  }
  function ctlSelect(label, options, value, onchange) {
    var s = el('select', { class: 'input', 'aria-label': label });
    options.forEach(function (o) {
      s.appendChild(el('option', { value: o.value, selected: String(o.value) === String(value) ? 'selected' : null }, FS.esc(o.label)));
    });
    s.addEventListener('change', function () { onchange(s.value); });
    return field(label, s);
  }
  function ctlSeg(label, options, value, onchange) {
    var w = el('div', { class: 'seg', role: 'group', 'aria-label': label });
    options.forEach(function (o) {
      var b = el('button', { type: 'button', 'aria-pressed': String(o.value) === String(value) }, FS.esc(FS.t(o.label)));
      b.addEventListener('click', function () {
        Array.prototype.forEach.call(w.children, function (c) { c.setAttribute('aria-pressed', 'false'); });
        b.setAttribute('aria-pressed', 'true');
        onchange(o.value);
      });
      w.appendChild(b);
    });
    return field(label, w);
  }
  function ctlToggle(label, value, onchange) {
    var b = el('button', { type: 'button', class: 'btn btn-soft btn-block btn-sm', 'aria-pressed': String(!!value) },
      (value ? '✓ ' : '') + FS.esc(FS.t(label)));
    b.addEventListener('click', function () {
      value = !value;
      b.setAttribute('aria-pressed', String(value));
      b.innerHTML = (value ? '✓ ' : '') + FS.esc(FS.t(label));
      onchange(value);
    });
    return b;
  }

  /* ------------------------------------------------------------------ */
  /* Editor                                                              */
  /* ------------------------------------------------------------------ */
  function Editor(opts) {
    this.opts = opts || {};
    this.mode = this.opts.mode || 'post';
    this.scene = FS.newScene(1080, 1080);
    this.sel = null;
    this.history = [];
    this.hix = -1;
    this.fields = Object.assign({
      name: '', business: '', phone: '', website: '', address: '', offer: '', message: ''
    }, Store.pref('fields') || {});
    this.festival = this.opts.festival || Store.pref('lastFestival') || 'diwali';
    this.previewEffect = 'none';
    this.draftId = null;
  }

  Editor.prototype.init = function () {
    var self = this;
    this.stage = document.getElementById('stage');
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.tabrail = document.getElementById('tabrail');
    this.panels = document.getElementById('panels');

    this.buildTabs();
    this.bindBar();
    this.bindPointer();
    this.bindKeys();

    var started = this.startScene();
    started.then(function () {
      self.commit(true);
      self.fit();
      self.refreshPanels();
      self.fit();
      if (new URLSearchParams(location.search).get('quick') === '1') self.quickStart();
      window.addEventListener('resize', function () { self.fit(); });
      if (window.visualViewport) window.visualViewport.addEventListener('resize', function () { self.fit(); });
      /* the tool dock changes height as panels swap — keep the canvas fitted */
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
    });
    return this;
  };

  /* ---- initial scene: template / draft / handoff / blank ------------- */
  Editor.prototype.startScene = function () {
    var self = this;
    var qs = new URLSearchParams(location.search);
    var tpl = qs.get('tpl');
    var fest = qs.get('festival');
    var size = qs.get('size');
    var draft = qs.get('draft');
    var handoff = qs.get('from') === 'handoff';

    if (fest) this.festival = fest;

    if (draft) {
      var d = Store.getDraft(draft);
      if (d) {
        return FS.deserialize(d.data).then(function (r) {
          self.scene = r.scene; self.draftId = d.id;
          if (r.meta && r.meta.festival) self.festival = r.meta.festival;
          return true;
        }).catch(function () { self.scene = self.blank(size); return true; });
      }
    }
    if (handoff) {
      var h = Store.get('handoff', null);
      if (h) {
        return FS.deserialize(h).then(function (r) {
          self.scene = r.scene;
          if (r.meta && r.meta.festival) self.festival = r.meta.festival;
          return true;
        }).catch(function () { self.scene = self.blank(size); return true; });
      }
    }
    if (tpl && FS.getTemplate(tpl)) {
      var t = FS.getTemplate(tpl);
      this.festival = t.festival;
      this.scene = FS.buildScene(t, this.fields);
      Store.pref('lastFestival', this.festival);
      return Promise.resolve(true);
    }
    /* default: first template of the chosen festival, in the chosen size */
    var defTplId = this.festival + '--' + (this.mode === 'status' ? 'status' : 'classic');
    if (FS.getTemplate(defTplId)) {
      this.scene = FS.buildScene(defTplId, this.fields);
      if (size) this.resizeCanvasTo(size, true);
    } else this.scene = this.blank(size);
    return Promise.resolve(true);
  };

  Editor.prototype.blank = function (sizeId) {
    var s = FS.SIZES.filter(function (x) { return x.id === (sizeId || (this.mode === 'status' ? 'wa-status' : 'ig-square')); }.bind(this))[0] || FS.SIZES[0];
    var f = FS.getFestival(this.festival);
    var sc = FS.newScene(s.w, s.h);
    sc.background = { type: 'linear', angle: 145, stops: f.gradients[0].map(function (c, i, a) { return { c: c, p: i / (a.length - 1) }; }), pattern: 'dots', patternAlpha: .08, patternColor: '#fff' };
    return sc;
  };

  /* ---- rendering ---------------------------------------------------- */
  Editor.prototype.fit = function () {
    var wrap = this.stage.parentElement;
    var pad = 34;
    var availW = Math.max(160, wrap.clientWidth - pad);
    var availH = Math.max(180, wrap.clientHeight - pad);
    var ar = this.scene.width / this.scene.height;
    var w = availW, h = w / ar;
    if (h > availH) { h = availH; w = h * ar; }
    this.stage.style.width = Math.round(w) + 'px';
    this.stage.style.height = Math.round(h) + 'px';
    var dpr = Math.min(global.devicePixelRatio || 1, 2);
    var backing = Math.min(this.scene.width, Math.round(w * dpr));
    this.canvas.width = Math.max(64, backing);
    this.canvas.height = Math.round(this.canvas.width / ar);
    this.draw();
  };

  Editor.prototype.draw = function () {
    var c = this.canvas, ctx = this.ctx;
    var k = c.width / this.scene.width;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.save();
    ctx.scale(k, k);
    FS.renderScene(ctx, this.scene, { effect: this.previewEffect, t: this.previewT || 0, effectColors: this.effectColors() });
    this.drawSelection(ctx, k);
    ctx.restore();
  };

  Editor.prototype.effectColors = function () {
    var f = FS.getFestival(this.festival);
    return { a: f.palette.accent, p: f.palette.accent2, s: '#FFFFFF' };
  };

  Editor.prototype.drawSelection = function (ctx, k) {
    if (this.guides) {
      ctx.save();
      ctx.strokeStyle = '#00BCD4';
      ctx.lineWidth = 1.5 / k;
      ctx.setLineDash([10 / k, 8 / k]);
      this.guides.forEach(function (g) {
        ctx.beginPath();
        if (g.axis === 'x') { ctx.moveTo(g.v, 0); ctx.lineTo(g.v, this.scene.height); }
        else { ctx.moveTo(0, g.v); ctx.lineTo(this.scene.width, g.v); }
        ctx.stroke();
      }, this);
      ctx.restore();
    }
    var o = this.selected();
    if (!o) return;
    var b = FS.bounds(o);
    var hs = 11 / k;               /* handle radius in scene units */
    ctx.save();
    ctx.translate(b.cx, b.cy);
    ctx.rotate((o.rot || 0) * Math.PI / 180);
    ctx.lineWidth = 2 / k;
    ctx.strokeStyle = '#E1306C';
    ctx.setLineDash([8 / k, 6 / k]);
    ctx.strokeRect(-b.w / 2, -b.h / 2, b.w, b.h);
    ctx.setLineDash([]);
    if (!o.locked) {
      var pts = [[-b.w / 2, -b.h / 2], [b.w / 2, -b.h / 2], [b.w / 2, b.h / 2], [-b.w / 2, b.h / 2]];
      pts.forEach(function (p) {
        ctx.beginPath(); ctx.arc(p[0], p[1], hs, 0, 6.284);
        ctx.fillStyle = '#FFFFFF'; ctx.fill();
        ctx.strokeStyle = '#E1306C'; ctx.lineWidth = 2.5 / k; ctx.stroke();
      });
      /* rotate handle */
      ctx.beginPath();
      ctx.moveTo(0, -b.h / 2); ctx.lineTo(0, -b.h / 2 - 34 / k);
      ctx.strokeStyle = '#E1306C'; ctx.lineWidth = 2 / k; ctx.stroke();
      ctx.beginPath(); ctx.arc(0, -b.h / 2 - 34 / k, hs, 0, 6.284);
      ctx.fillStyle = '#E1306C'; ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 2 / k; ctx.stroke();
    }
    ctx.restore();
  };

  /* ---- selection ---------------------------------------------------- */
  Editor.prototype.selected = function () {
    var id = this.sel, list = this.scene.objects;
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  };
  Editor.prototype.select = function (id, opts) {
    this.sel = id;
    this.draw();
    this.renderLayers();
    this.renderProps();
    if (id && !(opts && opts.silent)) this.showTab('edit');
  };

  /* ---- pointer interaction ------------------------------------------ */
  Editor.prototype.toScene = function (ev) {
    var r = this.canvas.getBoundingClientRect();
    return {
      x: (ev.clientX - r.left) / r.width * this.scene.width,
      y: (ev.clientY - r.top) / r.height * this.scene.height,
      k: this.scene.width / r.width
    };
  };

  Editor.prototype.bindPointer = function () {
    var self = this, drag = null;

    function handleAt(o, p) {
      if (!o || o.locked) return null;
      var b = FS.bounds(o);
      var tol = 22 * p.k;
      var loc = FS.toLocal(o, p.x, p.y);
      var corners = { nw: [-b.w / 2, -b.h / 2], ne: [b.w / 2, -b.h / 2], se: [b.w / 2, b.h / 2], sw: [-b.w / 2, b.h / 2] };
      for (var key in corners) {
        if (Math.abs(loc.x - corners[key][0]) < tol && Math.abs(loc.y - corners[key][1]) < tol) return key;
      }
      if (Math.abs(loc.x) < tol && Math.abs(loc.y - (-b.h / 2 - 34 * p.k)) < tol * 1.2) return 'rot';
      return null;
    }

    this.canvas.addEventListener('pointerdown', function (ev) {
      ev.preventDefault();
      self.canvas.setPointerCapture(ev.pointerId);
      var p = self.toScene(ev);
      var cur = self.selected();
      var h = handleAt(cur, p);
      if (h && cur) {
        var b = FS.bounds(cur);
        drag = {
          mode: h === 'rot' ? 'rotate' : 'resize', o: cur, start: p,
          ow: cur.w, oh: b.h, ox: cur.x, oy: cur.y, osize: cur.size, orot: cur.rot || 0,
          cx: b.cx, cy: b.cy,
          a0: Math.atan2(p.y - b.cy, p.x - b.cx)
        };
        return;
      }
      var hit = FS.hitTest(self.scene, p.x, p.y, 4 * p.k);
      if (hit) {
        if (hit.id !== self.sel) self.select(hit.id);
        drag = { mode: 'move', o: hit, start: p, ox: hit.x, oy: hit.y };
      } else {
        self.sel = null; self.draw(); self.renderLayers(); self.renderProps();
        drag = null;
      }
    });

    this.canvas.addEventListener('pointermove', function (ev) {
      if (!drag) return;
      var p = self.toScene(ev);
      var o = drag.o;
      if (drag.mode === 'move') {
        o.x = drag.ox + (p.x - drag.start.x);
        o.y = drag.oy + (p.y - drag.start.y);
        self.snap(o, 9 * p.k);
      } else if (drag.mode === 'rotate') {
        var a = Math.atan2(p.y - drag.cy, p.x - drag.cx);
        var deg = drag.orot + (a - drag.a0) * 180 / Math.PI;
        if (ev.shiftKey) deg = Math.round(deg / 15) * 15;
        o.rot = Math.round(deg * 10) / 10;
      } else if (drag.mode === 'resize') {
        var d0 = Math.hypot(drag.start.x - drag.cx, drag.start.y - drag.cy);
        var d1 = Math.hypot(p.x - drag.cx, p.y - drag.cy);
        var f = Math.max(.12, d1 / Math.max(1, d0));
        if (o.type === 'text') {
          o.size = Math.max(10, Math.round(drag.osize * f));
          o.w = Math.max(40, Math.round(drag.ow * f));
        } else {
          o.w = Math.max(20, Math.round(drag.ow * f));
          o.h = Math.max(20, Math.round(drag.oh * f));
        }
        var nb = FS.bounds(o);
        o.x = drag.cx - o.w / 2;
        o.y = drag.cy - nb.h / 2;
      }
      self.draw();
    });

    function end() {
      if (drag) { drag = null; self.guides = null; self.draw(); self.commit(); self.renderProps(); }
    }
    this.canvas.addEventListener('pointerup', end);
    this.canvas.addEventListener('pointercancel', end);

    this.canvas.addEventListener('dblclick', function (ev) {
      var p = self.toScene(ev);
      var hit = FS.hitTest(self.scene, p.x, p.y, 4 * p.k);
      if (hit && hit.type === 'text') {
        self.select(hit.id);
        setTimeout(function () {
          var ta = document.getElementById('prop-text');
          if (ta) { ta.focus(); ta.select(); }
        }, 60);
      }
    });
  };

  /* ---- alignment snapping ------------------------------------------- */
  /* Nudges a dragged object onto the canvas centre/edges and onto the edges
     and centres of the other layers, then records the guide lines to draw. */
  Editor.prototype.snap = function (o, tol) {
    var W = this.scene.width, H = this.scene.height;
    var b = FS.bounds(o);
    var vx = [{ v: W / 2, k: 'c' }, { v: 0, k: 'e' }, { v: W, k: 'e' }];
    var vy = [{ v: H / 2, k: 'c' }, { v: 0, k: 'e' }, { v: H, k: 'e' }];
    this.scene.objects.forEach(function (other) {
      if (other === o || other.hidden) return;
      var ob = FS.bounds(other);
      vx.push({ v: ob.cx, k: 'o' }, { v: ob.x, k: 'o' }, { v: ob.x + ob.w, k: 'o' });
      vy.push({ v: ob.cy, k: 'o' }, { v: ob.y, k: 'o' }, { v: ob.y + ob.h, k: 'o' });
    });
    var guides = [];
    var mine = [
      { get: function () { return b.x; }, set: function (d) { o.x += d; } },
      { get: function () { return b.cx; }, set: function (d) { o.x += d; } },
      { get: function () { return b.x + b.w; }, set: function (d) { o.x += d; } }
    ];
    var mineY = [
      { get: function () { return b.y; }, set: function (d) { o.y += d; } },
      { get: function () { return b.cy; }, set: function (d) { o.y += d; } },
      { get: function () { return b.y + b.h; }, set: function (d) { o.y += d; } }
    ];
    var bestX = null, bestY = null;
    mine.forEach(function (m) {
      vx.forEach(function (t) {
        var d = t.v - m.get();
        if (Math.abs(d) <= tol && (!bestX || Math.abs(d) < Math.abs(bestX.d))) bestX = { d: d, v: t.v, set: m.set };
      });
    });
    mineY.forEach(function (m) {
      vy.forEach(function (t) {
        var d = t.v - m.get();
        if (Math.abs(d) <= tol && (!bestY || Math.abs(d) < Math.abs(bestY.d))) bestY = { d: d, v: t.v, set: m.set };
      });
    });
    if (bestX) { bestX.set(bestX.d); guides.push({ axis: 'x', v: bestX.v }); }
    if (bestY) { bestY.set(bestY.d); guides.push({ axis: 'y', v: bestY.v }); }
    this.guides = guides.length ? guides : null;
  };

  /* ---- fit a text layer neatly inside the canvas --------------------- */
  Editor.prototype.fitText = function (o) {
    if (!o || o.type !== 'text') return;
    var maxH = this.scene.height - o.y - this.scene.height * 0.05;
    if (maxH < 40) maxH = this.scene.height * .3;
    var guard = 0;
    while (FS.objH(o) > maxH && o.size > 12 && guard++ < 120) o.size = Math.max(12, o.size - 2);
    while (FS.objH(o) < maxH * 0.55 && o.size < this.scene.width * .28 && guard++ < 240) o.size += 2;
    while (FS.objH(o) > maxH && o.size > 12 && guard++ < 360) o.size -= 2;
  };

  Editor.prototype.bindKeys = function () {
    var self = this;
    document.addEventListener('keydown', function (e) {
      var tag = (e.target.tagName || '').toLowerCase();
      var typing = tag === 'input' || tag === 'textarea' || tag === 'select' || e.target.isContentEditable;
      var mod = e.ctrlKey || e.metaKey;
      if (mod && e.key.toLowerCase() === 'z' && !e.shiftKey) { e.preventDefault(); self.undo(); return; }
      if (mod && (e.key.toLowerCase() === 'y' || (e.shiftKey && e.key.toLowerCase() === 'z'))) { e.preventDefault(); self.redo(); return; }
      if (mod && e.key.toLowerCase() === 'd') { e.preventDefault(); self.duplicate(); return; }
      if (mod && e.key.toLowerCase() === 's') { e.preventDefault(); self.saveDraft(); return; }
      if (typing) return;
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (self.sel) { e.preventDefault(); self.removeSelected(); }
      }
      if (self.sel && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].indexOf(e.key) >= 0) {
        e.preventDefault();
        var o = self.selected(); if (!o || o.locked) return;
        var step = e.shiftKey ? 20 : 4;
        if (e.key === 'ArrowLeft') o.x -= step;
        if (e.key === 'ArrowRight') o.x += step;
        if (e.key === 'ArrowUp') o.y -= step;
        if (e.key === 'ArrowDown') o.y += step;
        self.draw(); self.commitDebounced();
      }
    });
  };

  /* ---- history ------------------------------------------------------ */
  Editor.prototype.snapshot = function () { return JSON.stringify(this.scene); };
  Editor.prototype.commit = function (reset) {
    var snap = this.snapshot();
    if (reset) { this.history = [snap]; this.hix = 0; }
    else {
      if (this.history[this.hix] === snap) return;
      this.history = this.history.slice(0, this.hix + 1);
      this.history.push(snap);
      if (this.history.length > 60) this.history.shift();
      this.hix = this.history.length - 1;
    }
    this.updateHistoryButtons();
    this.autosave();
  };
  Editor.prototype.commitDebounced = function () {
    var self = this;
    clearTimeout(this._ct);
    this._ct = setTimeout(function () { self.commit(); }, 420);
  };
  Editor.prototype.restore = function (snap) {
    this.scene = JSON.parse(snap);
    if (!this.selected()) this.sel = null;
    this.fit(); this.renderLayers(); this.renderProps();
    this.updateHistoryButtons();
  };
  Editor.prototype.undo = function () {
    if (this.hix <= 0) { FS.toast(FS.t('Nothing left to undo')); return; }
    this.hix--; this.restore(this.history[this.hix]);
  };
  Editor.prototype.redo = function () {
    if (this.hix >= this.history.length - 1) { FS.toast(FS.t('Nothing to redo')); return; }
    this.hix++; this.restore(this.history[this.hix]);
  };
  Editor.prototype.updateHistoryButtons = function () {
    var u = document.getElementById('btn-undo'), r = document.getElementById('btn-redo');
    if (u) u.disabled = this.hix <= 0;
    if (r) r.disabled = this.hix >= this.history.length - 1;
  };

  /* ---- object operations -------------------------------------------- */
  Editor.prototype.add = function (o, opts) {
    this.scene.objects.push(o);
    this.select(o.id, opts);
    this.commit();
    return o;
  };
  Editor.prototype.removeSelected = function () {
    var o = this.selected(); if (!o) return;
    this.scene.objects = this.scene.objects.filter(function (x) { return x.id !== o.id; });
    this.sel = null;
    this.draw(); this.renderLayers(); this.renderProps(); this.commit();
    FS.toast(FS.t('Layer deleted'));
  };
  Editor.prototype.duplicate = function () {
    var o = this.selected(); if (!o) { FS.toast(FS.t('Select something first')); return; }
    var copy = JSON.parse(JSON.stringify(o));
    copy.id = FS.uid(o.type[0]);
    copy.x += 30; copy.y += 30;
    copy.name = o.name + ' copy';
    this.add(copy);
  };
  Editor.prototype.order = function (dir) {
    var o = this.selected(); if (!o) return;
    var list = this.scene.objects, i = list.indexOf(o);
    list.splice(i, 1);
    if (dir === 'front') list.push(o);
    else if (dir === 'back') list.unshift(o);
    else if (dir === 'up') list.splice(Math.min(list.length, i + 1), 0, o);
    else list.splice(Math.max(0, i - 1), 0, o);
    this.draw(); this.renderLayers(); this.commit();
  };

  Editor.prototype.resizeCanvasTo = function (sizeId, silent) {
    var s = FS.SIZES.filter(function (x) { return x.id === sizeId; })[0];
    if (!s) return;
    var ow = this.scene.width, oh = this.scene.height;
    var kx = s.w / ow, ky = s.h / oh, k = Math.min(kx, ky);
    this.scene.width = s.w; this.scene.height = s.h;
    this.scene.objects.forEach(function (o) {
      o.x = o.x * kx;
      o.y = o.y * ky;
      o.w = o.w * k;
      if (o.h) o.h = o.h * k;
      if (o.size) o.size = o.size * k;
      if (o.ls) o.ls = o.ls * k;
    });
    if (!silent) { this.fit(); this.commit(); }
  };

  /* ---- autosave / drafts -------------------------------------------- */
  Editor.prototype.autosave = function () {
    var self = this;
    clearTimeout(this._as);
    this._as = setTimeout(function () {
      try {
        Store.set('autosave', FS.serialize(self.scene, { festival: self.festival, mode: self.mode, at: Date.now() }));
      } catch (e) {}
    }, 900);
  };
  Editor.prototype.saveDraft = function () {
    var data = FS.serialize(this.scene, { festival: this.festival, mode: this.mode });
    var f = FS.getFestival(this.festival);
    var thumb = '';
    try { thumb = FS.renderToCanvas(this.scene, 220).toDataURL('image/jpeg', .7); } catch (e) {}
    var id = Store.saveDraft({ id: this.draftId, title: f.name + ' design', festival: this.festival, thumb: thumb, data: data });
    if (id) { this.draftId = id; FS.toast(FS.t('Draft saved on this device'), 'ok'); this.renderDrafts(); }
    else FS.toast('Could not save the draft — your browser storage is full or blocked.', 'err', 4500);
  };

  /* ---- export -------------------------------------------------------- */
  Editor.prototype.exportCanvas = function (scale) {
    var target = Math.round(this.scene.width * (scale || 1));
    return FS.renderToCanvas(this.scene, target, { flatten: this.exportFlat ? '#FFFFFF' : null });
  };
  Editor.prototype.fileName = function (ext) {
    var f = FS.getFestival(this.festival);
    return FS.slugify(f.name) + '-festival-' + (this.mode === 'status' ? 'status' : 'post') + '.' + ext;
  };
  Editor.prototype.download = function (fmt, quality, scale) {
    var self = this;
    return FS.fontsReady.then(function () {
      var c;
      try { c = self.exportCanvas(scale); }
      catch (e) { FS.toast('Export failed — try reducing the canvas size.', 'err'); return; }
      if (fmt === 'jpg') {
        var flat = document.createElement('canvas');
        flat.width = c.width; flat.height = c.height;
        var fx = flat.getContext('2d');
        fx.fillStyle = '#FFFFFF'; fx.fillRect(0, 0, flat.width, flat.height);
        fx.drawImage(c, 0, 0);
        return FS.downloadCanvas(flat, self.fileName('jpg'), 'image/jpeg', quality);
      }
      return FS.downloadCanvas(c, self.fileName('png'), 'image/png');
    });
  };

  /* ------------------------------------------------------------------ */
  /* UI: tabs                                                            */
  /* ------------------------------------------------------------------ */
  var TABS = [
    { id: 'design', label: 'Design', icon: 'layout' },
    { id: 'edit', label: 'Selected', icon: 'edit' },
    { id: 'text', label: 'Text', icon: 'text' },
    { id: 'photo', label: 'Photo', icon: 'photo' },
    { id: 'sticker', label: 'Stickers', icon: 'sticker' },
    { id: 'shape', label: 'Shapes', icon: 'shape' },
    { id: 'bg', label: 'Background', icon: 'bg' },
    { id: 'layers', label: 'Layers', icon: 'layers' },
    { id: 'export', label: 'Export', icon: 'export' }
  ];

  Editor.prototype.buildTabs = function () {
    var self = this;
    this.tabrail.innerHTML = '';
    this.panels.innerHTML = '';
    TABS.forEach(function (t, i) {
      var b = el('button', {
        class: 'tabbtn', type: 'button', role: 'tab', id: 'tab-' + t.id,
        'aria-selected': String(i === 0), 'aria-controls': 'panel-' + t.id
      }, FS.icon(t.icon) + '<span>' + FS.esc(FS.t(t.label)) + '</span>');
      b.addEventListener('click', function () { self.showTab(t.id); });
      self.tabrail.appendChild(b);
      var p = el('section', { class: 'panel', id: 'panel-' + t.id, role: 'tabpanel', 'aria-labelledby': 'tab-' + t.id, 'data-active': String(i === 0) });
      self.panels.appendChild(p);
    });
    this.tabrail.setAttribute('role', 'tablist');
  };

  Editor.prototype.showTab = function (id) {
    FS.$$('.tabbtn', this.tabrail).forEach(function (b) { b.setAttribute('aria-selected', String(b.id === 'tab-' + id)); });
    FS.$$('.panel', this.panels).forEach(function (p) { p.setAttribute('data-active', String(p.id === 'panel-' + id)); });
    var btn = document.getElementById('tab-' + id);
    if (btn && btn.scrollIntoView) btn.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    this.panels.scrollTop = 0;
  };

  Editor.prototype.refreshPanels = function () {
    this.renderDesign();
    this.renderProps();
    this.renderTextPanel();
    this.renderPhotoPanel();
    this.renderStickerPanel();
    this.renderShapePanel();
    this.renderBgPanel();
    this.renderLayers();
    this.renderExportPanel();
  };

  /* ---- Design panel -------------------------------------------------- */
  Editor.prototype.renderDesign = function () {
    var self = this, p = document.getElementById('panel-design');
    p.innerHTML = '';

    p.appendChild(ctlSelect('Festival', FS.FESTIVALS.map(function (f) { return { value: f.slug, label: f.icon + '  ' + f.name + ' / ' + f.hi }; }),
      this.festival, function (v) {
        self.festival = v; Store.pref('lastFestival', v);
        self.renderDesign(); self.renderStickerPanel(); self.renderBgPanel();
      }));

    p.appendChild(ctlSelect('Canvas size', FS.SIZES.filter(function (s) { return s.id !== 'custom'; })
      .map(function (s) { return { value: s.id, label: s.label + ' (' + s.w + '×' + s.h + ')' }; })
      .concat([{ value: 'custom', label: 'Custom size…' }]),
      currentSizeId(this.scene), function (v) {
        if (v === 'custom') { self.customSize(); return; }
        self.resizeCanvasTo(v);
        FS.toast(FS.t('Canvas resized'));
      }));

    p.appendChild(el('div', { class: 'flabel' }, 'Templates for ' + FS.esc(FS.getFestival(this.festival).name)));
    var grid = el('div', { class: 'tiles', style: 'grid-template-columns:repeat(auto-fill,minmax(84px,1fr))' });
    FS.TEMPLATES.filter(function (t) { return t.festival === self.festival; }).forEach(function (t) {
      var b = el('button', { class: 'tile', type: 'button', title: t.name, 'aria-label': 'Use template ' + t.name });
      b.addEventListener('click', function () {
        self.scene = FS.buildScene(t, self.fields);
        self.sel = null;
        self.fit(); self.commit(); self.renderLayers(); self.renderProps(); self.renderBgPanel();
        FS.toast(t.category + ' template applied');
      });
      grid.appendChild(b);
      FS.fontsReady.then(function () {
        try { b.appendChild(FS.renderToCanvas(FS.buildScene(t, self.fields), 150)); } catch (e) {}
      });
    });
    p.appendChild(grid);

    p.appendChild(el('hr', { class: 'divider' }));
    p.appendChild(el('div', { class: 'flabel' }, 'Your details (fills templates automatically)'));
    var FIELD_DEFS = [
      ['name', 'Your name'], ['business', 'Business name'], ['phone', 'Phone'],
      ['website', 'Website'], ['address', 'Address'], ['offer', 'Offer text'], ['message', 'Custom message']
    ];
    FIELD_DEFS.forEach(function (fd) {
      p.appendChild(ctlInput(fd[1], self.fields[fd[0]], function (v) {
        self.fields[fd[0]] = v;
        Store.pref('fields', self.fields);
        clearTimeout(self._ff);
        self._ff = setTimeout(function () {
          FS.applyFields(self.scene, self.fields);
          self.draw(); self.commitDebounced(); self.renderLayers();
        }, 250);
      }));
    });

    p.appendChild(el('hr', { class: 'divider' }));
    p.appendChild(el('div', { class: 'flabel' }, 'Ready-made wishes — tap to add'));
    var f = FS.getFestival(this.festival);
    var wishBox = el('div', { style: 'display:grid;gap:8px' });
    ['hi', 'en', 'hinglish'].forEach(function (lang) {
      (f.wishes[lang] || []).forEach(function (w) {
        var row = el('div', { class: 'wish-item' }, '<span>' + FS.esc(w) + '</span>');
        var b = el('button', { class: 'btn btn-soft btn-sm', type: 'button' }, FS.t('Add'));
        b.addEventListener('click', function () {
          self.add(FS.defaults.text({
            text: w, x: self.scene.width * .08, y: self.scene.height * .4, w: self.scene.width * .84,
            size: Math.round(self.scene.width * (lang === 'hi' ? .062 : .055)),
            font: lang === 'hi' ? 'Tiro Devanagari Hindi' : 'Poppins', weight: lang === 'hi' ? 400 : 600,
            color: '#FFFFFF', name: 'Wish'
          }));
          FS.toast(FS.t('Wish added'));
        });
        row.appendChild(b);
        wishBox.appendChild(row);
      });
    });
    p.appendChild(wishBox);
  };

  function currentSizeId(scene) {
    var m = FS.SIZES.filter(function (s) { return s.w === scene.width && s.h === scene.height; })[0];
    return m ? m.id : 'custom';
  }

  Editor.prototype.customSize = function () {
    var self = this;
    FS.modal('Custom canvas size', function (body, close) {
      var w = el('input', { class: 'input', type: 'number', min: 200, max: 4000, value: self.scene.width });
      var h = el('input', { class: 'input', type: 'number', min: 200, max: 4000, value: self.scene.height });
      body.appendChild(field('Width (px)', w));
      body.appendChild(field('Height (px)', h));
      body.appendChild(el('p', { class: 'hint' }, 'Between 200 and 4000 pixels. Existing layers are scaled to fit.'));
      var go = el('button', { class: 'btn btn-primary btn-block', type: 'button' }, FS.t('Apply size'));
      go.addEventListener('click', function () {
        var W = Math.max(200, Math.min(4000, parseInt(w.value, 10) || self.scene.width));
        var H = Math.max(200, Math.min(4000, parseInt(h.value, 10) || self.scene.height));
        var kx = W / self.scene.width, ky = H / self.scene.height, k = Math.min(kx, ky);
        self.scene.objects.forEach(function (o) {
          o.x *= kx; o.y *= ky; o.w *= k;
          if (o.h) o.h *= k;
          if (o.size) o.size *= k;
        });
        self.scene.width = W; self.scene.height = H;
        self.fit(); self.commit(); close();
        FS.toast('Canvas is now ' + W + '×' + H);
      });
      body.appendChild(go);
    });
  };

  /* ---- Selected-object properties ------------------------------------ */
  Editor.prototype.renderProps = function () {
    var self = this, p = document.getElementById('panel-edit');
    if (!p) return;
    p.innerHTML = '';
    var o = this.selected();
    if (!o) {
      p.appendChild(el('div', { class: 'empty' }, '<div class="big">👆</div><p>Tap any element on the canvas to edit it. Drag to move, use the corner dots to resize and the top dot to rotate.</p>'));
      return;
    }
    var upd = function () { self.draw(); self.commitDebounced(); };

    var head = el('div', { class: 'row', style: 'margin-bottom:10px' });
    head.appendChild(el('strong', { style: 'flex:1;font-size:.95rem' }, FS.esc(o.name || o.type)));
    var dup = el('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Duplicate layer', title: 'Duplicate' }, FS.icon('layers', 17));
    dup.addEventListener('click', function () { self.duplicate(); });
    var del = el('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Delete layer', title: 'Delete' }, FS.icon('trash', 17));
    del.addEventListener('click', function () { self.removeSelected(); });
    head.appendChild(dup); head.appendChild(del);
    p.appendChild(head);

    if (o.type === 'text') {
      var ta = el('textarea', { class: 'input', id: 'prop-text', rows: 3, 'aria-label': 'Text content' });
      ta.value = o.text;
      ta.addEventListener('input', function () { o.text = ta.value; upd(); });
      p.appendChild(field('Text', ta));

      p.appendChild(ctlSelect('Font', FS.FONTS.map(function (f) { return { value: f.id, label: f.label }; }), o.font, function (v) { o.font = v; upd(); }));
      p.appendChild(ctlRange('Font size', 10, Math.round(self.scene.width * .3), 1, o.size, function (v) { o.size = v; upd(); }, function (v) { return Math.round(v); }));
      p.appendChild(ctlSeg('Alignment', [{ value: 'left', label: 'Left' }, { value: 'center', label: 'Center' }, { value: 'right', label: 'Right' }], o.align, function (v) { o.align = v; upd(); }));
      var styleRow = el('div', { class: 'grid2', style: 'margin-bottom:12px' });
      styleRow.appendChild(ctlToggle('Bold', o.weight >= 700, function (v) { o.weight = v ? 700 : 400; upd(); }));
      styleRow.appendChild(ctlToggle('Italic', o.italic, function (v) { o.italic = v; upd(); }));
      p.appendChild(styleRow);
      p.appendChild(ctlColor('Text colour', o.color, function (v) { o.color = v; upd(); }));
      p.appendChild(swatchRow(FS.getFestival(this.festival), function (c) { o.color = c; upd(); self.renderProps(); }));
      p.appendChild(ctlRange('Letter spacing', -10, 60, 1, o.ls || 0, function (v) { o.ls = v; upd(); }));
      p.appendChild(ctlRange('Line height', .9, 2.4, .05, o.lh || 1.25, function (v) { o.lh = v; upd(); }));
      p.appendChild(ctlRange('Text width', 60, self.scene.width, 10, o.w, function (v) { o.w = v; upd(); }, function (v) { return Math.round(v); }));
      var autofit = el('button', { class: 'btn btn-soft btn-block btn-sm', type: 'button' }, FS.t('Fit text to box'));
      autofit.addEventListener('click', function () {
        self.fitText(o); self.draw(); self.commit(); self.renderProps();
      });
      p.appendChild(autofit);

      p.appendChild(el('hr', { class: 'divider' }));
      p.appendChild(ctlToggle('Shadow', o.shadowOn, function (v) { o.shadowOn = v; upd(); self.renderProps(); }));
      if (o.shadowOn) {
        p.appendChild(ctlColor('Shadow colour', o.shadowColor, function (v) { o.shadowColor = v; upd(); }));
        p.appendChild(ctlRange('Shadow blur', 0, 80, 1, o.shadowBlur, function (v) { o.shadowBlur = v; upd(); }));
        p.appendChild(ctlRange('Shadow Y offset', -40, 40, 1, o.shadowY, function (v) { o.shadowY = v; upd(); }));
      }
      p.appendChild(ctlToggle('Outline', o.strokeOn, function (v) { o.strokeOn = v; upd(); self.renderProps(); }));
      if (o.strokeOn) {
        p.appendChild(ctlColor('Outline colour', o.strokeColor, function (v) { o.strokeColor = v; upd(); }));
        p.appendChild(ctlRange('Outline width', 1, 30, 1, o.strokeW, function (v) { o.strokeW = v; upd(); }));
      }
      p.appendChild(ctlToggle('Text background', o.bgOn, function (v) { o.bgOn = v; upd(); self.renderProps(); }));
      if (o.bgOn) {
        p.appendChild(ctlColor('Background colour', o.bgColor, function (v) { o.bgColor = v; upd(); }));
        p.appendChild(ctlRange('Padding', 0, 80, 2, o.bgPad, function (v) { o.bgPad = v; upd(); }));
        p.appendChild(ctlRange('Corner radius', 0, 80, 2, o.bgRadius, function (v) { o.bgRadius = v; upd(); }));
      }
    }

    if (o.type === 'image') {
      var pick = el('button', { class: 'btn btn-soft btn-block', type: 'button' }, FS.t('Replace image'));
      pick.addEventListener('click', function () { self.pickImage(function (assetId) { o.asset = assetId; self.draw(); self.commit(); }); });
      p.appendChild(field('Image', pick));
      p.appendChild(ctlSeg('Fit', [{ value: 'cover', label: 'Fill' }, { value: 'contain', label: 'Fit' }, { value: 'stretch', label: 'Stretch' }], o.fit || 'cover', function (v) { o.fit = v; upd(); }));
      var flips = el('div', { class: 'grid2', style: 'margin-bottom:12px' });
      flips.appendChild(ctlToggle('Flip H', o.flipH, function (v) { o.flipH = v; upd(); }));
      flips.appendChild(ctlToggle('Flip V', o.flipV, function (v) { o.flipV = v; upd(); }));
      p.appendChild(flips);
      p.appendChild(ctlRange('Corner radius', 0, Math.round(Math.min(o.w, o.h) / 2), 2, o.radius, function (v) { o.radius = v; upd(); }));
      p.appendChild(ctlRange('Border width', 0, 60, 1, o.borderW, function (v) { o.borderW = v; upd(); }));
      if (o.borderW > 0) p.appendChild(ctlColor('Border colour', o.borderColor, function (v) { o.borderColor = v; upd(); }));
      p.appendChild(ctlToggle('Drop shadow', o.shadowOn, function (v) { o.shadowOn = v; upd(); }));
      p.appendChild(el('div', { class: 'flabel', style: 'margin-top:14px' }, 'Crop'));
      var c = o.crop || (o.crop = { x: 0, y: 0, w: 1, h: 1 });
      p.appendChild(ctlRange('Crop left', 0, .8, .01, c.x, function (v) { var r = c.x + c.w; c.x = v; c.w = Math.max(.05, r - v); upd(); }));
      p.appendChild(ctlRange('Crop top', 0, .8, .01, c.y, function (v) { var b = c.y + c.h; c.y = v; c.h = Math.max(.05, b - v); upd(); }));
      p.appendChild(ctlRange('Crop width', .05, 1, .01, c.w, function (v) { c.w = Math.min(v, 1 - c.x); upd(); }));
      p.appendChild(ctlRange('Crop height', .05, 1, .01, c.h, function (v) { c.h = Math.min(v, 1 - c.y); upd(); }));
      var reset = el('button', { class: 'btn btn-soft btn-block btn-sm', type: 'button' }, FS.t('Reset crop'));
      reset.addEventListener('click', function () { o.crop = { x: 0, y: 0, w: 1, h: 1 }; upd(); self.renderProps(); });
      p.appendChild(reset);
    }

    if (o.type === 'shape') {
      p.appendChild(ctlSelect('Shape', ['rect', 'roundrect', 'circle', 'triangle', 'line', 'star', 'heart'].map(function (s) { return { value: s, label: s }; }), o.shape, function (v) { o.shape = v; upd(); }));
      p.appendChild(ctlColor('Fill colour', o.fill, function (v) { o.fill = v; upd(); }));
      p.appendChild(swatchRow(FS.getFestival(this.festival), function (cc) { o.fill = cc; upd(); self.renderProps(); }));
      p.appendChild(ctlRange('Border width', 0, 40, 1, o.strokeW, function (v) { o.strokeW = v; upd(); }));
      if (o.strokeW > 0) p.appendChild(ctlColor('Border colour', o.strokeColor, function (v) { o.strokeColor = v; upd(); }));
      if (o.shape === 'roundrect' || o.shape === 'rect') p.appendChild(ctlRange('Corner radius', 0, 200, 2, o.radius, function (v) { o.radius = v; upd(); }));
      p.appendChild(ctlToggle('Drop shadow', o.shadowOn, function (v) { o.shadowOn = v; upd(); }));
    }

    if (o.type === 'sticker') {
      p.appendChild(ctlSelect('Sticker', FS.STICKERS.map(function (s) { return { value: s.id, label: s.name }; }), o.sid, function (v) { o.sid = v; upd(); }));
      p.appendChild(ctlColor('Primary colour', o.colors.p, function (v) { o.colors.p = v; upd(); }));
      p.appendChild(ctlColor('Secondary colour', o.colors.s, function (v) { o.colors.s = v; upd(); }));
      p.appendChild(ctlColor('Accent colour', o.colors.a, function (v) { o.colors.a = v; upd(); }));
    }

    p.appendChild(el('hr', { class: 'divider' }));
    p.appendChild(ctlRange('Rotation', -180, 180, 1, o.rot || 0, function (v) { o.rot = v; upd(); }, function (v) { return Math.round(v) + '°'; }));
    p.appendChild(ctlRange('Opacity', .05, 1, .01, o.opacity == null ? 1 : o.opacity, function (v) { o.opacity = v; upd(); }, function (v) { return Math.round(v * 100) + '%'; }));

    if (this.mode === 'status' || this.opts.animation) {
      p.appendChild(ctlSelect('Animation (GIF)', [
        { value: 'none', label: 'None' }, { value: 'fade', label: 'Fade in' }, { value: 'slide-up', label: 'Slide up' },
        { value: 'slide-left', label: 'Slide in' }, { value: 'zoom', label: 'Zoom in' }, { value: 'pop', label: 'Pop' },
        { value: 'bounce', label: 'Bounce' }, { value: 'pulse', label: 'Pulse' }, { value: 'glow', label: 'Glow' },
        { value: 'float', label: 'Float' }, { value: 'spin', label: 'Spin' }
      ], (o.anim && o.anim.type) || 'none', function (v) {
        o.anim = v === 'none' ? null : Object.assign({ delay: 0, dur: .5 }, o.anim || {}, { type: v });
        upd();
      }));
    }

    var ord = el('div', { class: 'grid4', style: 'margin-top:10px' });
    [['Front', 'front'], ['Up', 'up'], ['Down', 'down'], ['Back', 'back']].forEach(function (o2) {
      var b = el('button', { class: 'btn btn-soft btn-sm', type: 'button' }, o2[0]);
      b.addEventListener('click', function () { self.order(o2[1]); });
      ord.appendChild(b);
    });
    p.appendChild(field('Layer order', ord));
  };

  function swatchRow(f, pickCb) {
    var wrap = el('div', { class: 'swatches', style: 'margin-bottom:12px' });
    var cols = ['#FFFFFF', '#000000', f.palette.accent, f.palette.accent2, f.palette.mid, f.palette.deep, f.palette.ink, '#FFD54F', '#4FC3F7', '#EC407A'];
    cols.forEach(function (c) {
      var b = el('button', { class: 'swatch', type: 'button', style: 'background:' + c, 'aria-label': 'Use colour ' + c });
      b.addEventListener('click', function () { pickCb(c); });
      wrap.appendChild(b);
    });
    return wrap;
  }

  /* ---- Text panel ---------------------------------------------------- */
  Editor.prototype.renderTextPanel = function () {
    var self = this, p = document.getElementById('panel-text');
    p.innerHTML = '';
    var presets = [
      { label: 'Heading', size: .085, weight: 700, font: 'Poppins' },
      { label: 'Sub heading', size: .05, weight: 600, font: 'Poppins' },
      { label: 'Hindi wish (हिन्दी)', size: .065, weight: 400, font: 'Tiro Devanagari Hindi', text: 'शुभकामनाएँ' },
      { label: 'Body text', size: .034, weight: 400, font: 'Poppins' },
      { label: 'Display / Bold', size: .12, weight: 400, font: 'Anton' },
      { label: 'Elegant', size: .07, weight: 700, font: 'Playfair Display' }
    ];
    presets.forEach(function (pr) {
      var b = el('button', { class: 'btn btn-soft btn-block', type: 'button', style: 'justify-content:flex-start;margin-bottom:8px;font-family:' + FS.fontStack(pr.font) }, FS.esc(pr.label));
      b.addEventListener('click', function () {
        self.add(FS.defaults.text({
          text: pr.text || pr.label, font: pr.font, weight: pr.weight,
          size: Math.round(self.scene.width * pr.size),
          x: self.scene.width * .08, w: self.scene.width * .84,
          y: self.scene.height * .38, name: pr.label
        }));
      });
      p.appendChild(b);
    });
    p.appendChild(el('p', { class: 'hint' }, 'Tip: double-tap any text on the canvas to edit its words.'));
  };

  /* ---- Photo panel --------------------------------------------------- */
  Editor.prototype.pickImage = function (cb) {
    var input = el('input', { type: 'file', accept: 'image/*', style: 'position:fixed;left:-9999px' });
    document.body.appendChild(input);
    input.addEventListener('change', function () {
      var file = input.files && input.files[0];
      input.remove();
      if (!file) return;
      FS.loadImageFile(file).then(function (r) {
        var id = FS.Assets.add(r.src, r.img);
        cb(id, r.img);
      }).catch(function (err) {
        FS.toast(err.message || 'That image could not be used.', 'err', 4500);
      });
    });
    input.click();
  };

  Editor.prototype.renderPhotoPanel = function () {
    var self = this, p = document.getElementById('panel-photo');
    p.innerHTML = '';

    var addPhoto = el('button', { class: 'btn btn-primary btn-block', type: 'button' }, FS.t('Upload photo'));
    addPhoto.addEventListener('click', function () {
      self.pickImage(function (id, img) {
        var maxW = self.scene.width * .7;
        var ar = img.naturalWidth / img.naturalHeight;
        var w = maxW, h = w / ar;
        if (h > self.scene.height * .6) { h = self.scene.height * .6; w = h * ar; }
        self.add(FS.defaults.image({
          asset: id, w: w, h: h,
          x: (self.scene.width - w) / 2, y: (self.scene.height - h) / 2,
          name: 'Photo', radius: 24
        }));
        FS.toast(FS.t('Photo added — drag to position it'));
      });
    });
    p.appendChild(addPhoto);

    var addLogo = el('button', { class: 'btn btn-soft btn-block', type: 'button', style: 'margin-top:8px' }, FS.t('Upload logo'));
    addLogo.addEventListener('click', function () {
      self.pickImage(function (id, img) {
        var w = self.scene.width * .2;
        var ar = img.naturalWidth / img.naturalHeight;
        self.add(FS.defaults.image({
          asset: id, w: w, h: w / ar, x: self.scene.width * .05, y: self.scene.height * .05,
          name: 'Logo', role: 'logo', radius: 12
        }));
        FS.toast(FS.t('Logo added'));
      });
    });
    p.appendChild(addLogo);

    /* replace an existing photo/logo placeholder */
    var holders = this.scene.objects.filter(function (o) { return o.type === 'image'; });
    if (holders.length) {
      p.appendChild(el('div', { class: 'flabel', style: 'margin-top:16px' }, 'Photo slots in this template'));
      holders.forEach(function (o) {
        var b = el('button', { class: 'btn btn-ghost btn-block btn-sm', type: 'button', style: 'margin-bottom:6px' },
          (o.asset ? 'Replace ' : 'Add photo to ') + FS.esc(o.name));
        b.addEventListener('click', function () {
          self.pickImage(function (id) { o.asset = id; self.select(o.id); self.draw(); self.commit(); });
        });
        p.appendChild(b);
      });
    }

    p.appendChild(el('div', { class: 'privacy-note', style: 'margin-top:16px' },
      FS.icon('shield') + '<span>Your photos never leave this device. Everything is processed inside your browser.</span>'));
  };

  /* ---- Sticker panel ------------------------------------------------- */
  Editor.prototype.renderStickerPanel = function () {
    var self = this, p = document.getElementById('panel-sticker');
    p.innerHTML = '';
    var f = FS.getFestival(this.festival);
    var colors = { p: f.palette.accent, s: f.palette.accent2, a: f.palette.accent };
    var order = f.stickers.concat(FS.STICKERS.map(function (s) { return s.id; }));
    var seen = {};
    var grid = el('div', { class: 'tiles' });
    order.forEach(function (sid) {
      if (seen[sid] || !FS.getSticker(sid)) return;
      seen[sid] = true;
      var b = el('button', { class: 'tile', type: 'button', 'aria-label': 'Add ' + FS.getSticker(sid).name + ' sticker', title: FS.getSticker(sid).name });
      var cv = document.createElement('canvas');
      cv.width = cv.height = 120;
      var cx = cv.getContext('2d');
      FS.drawSticker(cx, sid, 120, colors);
      b.appendChild(cv);
      b.addEventListener('click', function () {
        var w = self.scene.width * .26;
        self.add(FS.defaults.sticker({
          sid: sid, w: w, h: w,
          x: (self.scene.width - w) / 2, y: (self.scene.height - w) / 2,
          colors: { p: colors.p, s: colors.s, a: colors.a },
          name: FS.getSticker(sid).name
        }));
      });
      grid.appendChild(b);
    });
    p.appendChild(grid);
    p.appendChild(el('p', { class: 'hint' }, 'All stickers are vector drawings — they stay sharp at any size and add no download weight.'));
  };

  /* ---- Shape panel --------------------------------------------------- */
  Editor.prototype.renderShapePanel = function () {
    var self = this, p = document.getElementById('panel-shape');
    p.innerHTML = '';
    var f = FS.getFestival(this.festival);
    var shapes = [
      { id: 'rect', label: 'Rectangle' }, { id: 'roundrect', label: 'Rounded' }, { id: 'circle', label: 'Circle' },
      { id: 'triangle', label: 'Triangle' }, { id: 'line', label: 'Line' }, { id: 'star', label: 'Star' }, { id: 'heart', label: 'Heart' }
    ];
    var grid = el('div', { class: 'tiles' });
    shapes.forEach(function (s) {
      var b = el('button', { class: 'tile', type: 'button', 'aria-label': 'Add ' + s.label, title: s.label });
      var cv = document.createElement('canvas'); cv.width = cv.height = 110;
      var cx = cv.getContext('2d');
      var o = FS.defaults.shape({
        shape: s.id, w: 78, h: s.id === 'line' ? 8 : 78, x: 16, y: s.id === 'line' ? 51 : 16,
        fill: f.palette.accent, strokeW: s.id === 'line' ? 8 : 0, radius: 18
      });
      FS.drawObject(cx, o, {});
      b.appendChild(cv);
      b.addEventListener('click', function () {
        var w = self.scene.width * .35;
        self.add(FS.defaults.shape({
          shape: s.id, w: w, h: s.id === 'line' ? 10 : w,
          x: (self.scene.width - w) / 2, y: (self.scene.height - w) / 2,
          fill: f.palette.accent, name: s.label
        }));
      });
      grid.appendChild(b);
    });
    p.appendChild(grid);
  };

  /* ---- Background panel ---------------------------------------------- */
  Editor.prototype.renderBgPanel = function () {
    var self = this, p = document.getElementById('panel-bg');
    p.innerHTML = '';
    var bg = this.scene.background;
    var f = FS.getFestival(this.festival);
    var upd = function () { self.draw(); self.commitDebounced(); };

    p.appendChild(el('div', { class: 'flabel' }, 'Festival backgrounds'));
    var grid = el('div', { class: 'tiles', style: 'grid-template-columns:repeat(auto-fill,minmax(76px,1fr))' });
    FS.FESTIVALS.forEach(function (fest) {
      fest.gradients.forEach(function (g, gi) {
        if (fest.slug !== self.festival && gi > 0) return;
        var b = el('button', { class: 'tile', type: 'button', 'aria-label': fest.name + ' background', title: fest.name });
        var cv = document.createElement('canvas'); cv.width = cv.height = 90;
        var cx = cv.getContext('2d');
        var sceneLike = {
          width: 90, height: 90,
          background: { type: 'linear', angle: 145, stops: g.map(function (c, i, a) { return { c: c, p: i / (a.length - 1) }; }), pattern: 'dots', patternAlpha: .12, patternColor: '#fff' }
        };
        FS.drawBackground(cx, sceneLike);
        b.appendChild(cv);
        b.addEventListener('click', function () {
          self.scene.background = {
            type: 'linear', angle: 145,
            stops: g.map(function (c, i, a) { return { c: c, p: i / (a.length - 1) }; }),
            pattern: bg.pattern || 'dots', patternAlpha: bg.patternAlpha == null ? .1 : bg.patternAlpha,
            patternColor: '#FFFFFF', vignette: bg.vignette
          };
          bg = self.scene.background;
          self.draw(); self.commit(); self.renderBgPanel();
        });
        grid.appendChild(b);
      });
    });
    p.appendChild(grid);

    p.appendChild(el('hr', { class: 'divider' }));
    p.appendChild(ctlSeg('Background type', [
      { value: 'solid', label: 'Solid' }, { value: 'linear', label: 'Linear' },
      { value: 'radial', label: 'Radial' }, { value: 'none', label: 'None' }
    ], bg.type, function (v) {
      if (v === 'solid') self.scene.background = { type: 'solid', color: bg.stops ? bg.stops[0].c : '#FFFFFF' };
      else if (v === 'none') self.scene.background = { type: 'none' };
      else self.scene.background = {
        type: v, angle: bg.angle == null ? 145 : bg.angle,
        stops: bg.stops || [{ c: f.gradients[0][0], p: 0 }, { c: f.gradients[0][1], p: 1 }],
        pattern: bg.pattern, patternAlpha: bg.patternAlpha, patternColor: '#FFFFFF', vignette: bg.vignette
      };
      bg = self.scene.background;
      self.draw(); self.commit(); self.renderBgPanel();
    }));

    if (bg.type === 'solid') {
      p.appendChild(ctlColor('Colour', bg.color, function (v) { bg.color = v; upd(); }));
    }
    if (bg.type === 'linear' || bg.type === 'radial') {
      bg.stops = bg.stops || [{ c: '#000000', p: 0 }, { c: '#ffffff', p: 1 }];
      bg.stops.forEach(function (s, i) {
        var row = el('div', { class: 'row', style: 'margin-bottom:8px' });
        var ci = el('input', { type: 'color', value: normHex(s.c), 'aria-label': 'Gradient colour ' + (i + 1), style: 'flex:1' });
        ci.addEventListener('input', function () { s.c = ci.value; upd(); });
        row.appendChild(ci);
        var pos = el('input', { type: 'range', min: 0, max: 1, step: .01, value: s.p, 'aria-label': 'Gradient stop position ' + (i + 1), style: 'flex:2' });
        pos.addEventListener('input', function () { s.p = parseFloat(pos.value); upd(); });
        row.appendChild(pos);
        if (bg.stops.length > 2) {
          var rm = el('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Remove colour stop' }, FS.icon('close', 15));
          rm.addEventListener('click', function () { bg.stops.splice(i, 1); self.draw(); self.commit(); self.renderBgPanel(); });
          row.appendChild(rm);
        }
        p.appendChild(row);
      });
      var addStop = el('button', { class: 'btn btn-soft btn-block btn-sm', type: 'button' }, FS.t('+ Add colour stop'));
      addStop.addEventListener('click', function () {
        if (bg.stops.length >= 5) { FS.toast('Five colour stops is the maximum'); return; }
        bg.stops.push({ c: f.palette.accent, p: 1 });
        bg.stops.sort(function (a, b2) { return a.p - b2.p; });
        self.draw(); self.commit(); self.renderBgPanel();
      });
      p.appendChild(addStop);
      if (bg.type === 'linear') p.appendChild(ctlRange('Gradient angle', 0, 360, 1, bg.angle == null ? 145 : bg.angle, function (v) { bg.angle = v; upd(); }, function (v) { return Math.round(v) + '°'; }));
    }
    if (bg.type !== 'none') {
      p.appendChild(el('hr', { class: 'divider' }));
      p.appendChild(ctlSelect('Pattern', [{ value: '', label: 'No pattern' }].concat(FS.PATTERNS.map(function (x) { return { value: x, label: x }; })),
        bg.pattern || '', function (v) { bg.pattern = v || null; upd(); }));
      if (bg.pattern) {
        p.appendChild(ctlRange('Pattern strength', 0, .5, .01, bg.patternAlpha == null ? .12 : bg.patternAlpha, function (v) { bg.patternAlpha = v; upd(); }));
        p.appendChild(ctlColor('Pattern colour', bg.patternColor || '#FFFFFF', function (v) { bg.patternColor = v; upd(); }));
      }
      p.appendChild(ctlRange('Vignette', 0, .7, .01, bg.vignette === true ? .38 : (bg.vignette || 0), function (v) { bg.vignette = v; upd(); }));
    }

    if (this.mode === 'status' || this.opts.animation) {
      p.appendChild(el('hr', { class: 'divider' }));
      p.appendChild(ctlSelect('Animated overlay effect', FS.EFFECTS.map(function (e) { return { value: e.id, label: e.label }; }),
        this.previewEffect, function (v) { self.previewEffect = v; self.scene.effect = v; self.draw(); self.commit(); }));
    }
  };

  /* ---- Layers panel -------------------------------------------------- */
  Editor.prototype.renderLayers = function () {
    var self = this, p = document.getElementById('panel-layers');
    if (!p) return;
    p.innerHTML = '';
    var list = el('div', { class: 'layer-list' });
    var objs = this.scene.objects.slice().reverse();
    if (!objs.length) {
      p.appendChild(el('div', { class: 'empty' }, '<p>No layers yet. Add text, a photo or a sticker.</p>'));
      return;
    }
    objs.forEach(function (o) {
      var icon = o.type === 'text' ? 'T' : o.type === 'image' ? '🖼' : o.type === 'sticker' ? '✦' : '◼';
      var row = el('div', {
        class: 'layer', 'data-sel': String(o.id === self.sel), 'data-hidden': String(!!o.hidden),
        tabindex: '0', role: 'button', 'aria-label': 'Layer ' + (o.name || o.type)
      });
      row.appendChild(el('span', { class: 'lthumb' }, icon));
      row.appendChild(el('span', { class: 'lname' }, FS.esc(o.name || o.type) + (o.type === 'text' ? ' — ' + FS.esc(String(o.text).slice(0, 18)) : '')));
      var vis = el('button', { class: 'mini', type: 'button', 'aria-label': o.hidden ? 'Show layer' : 'Hide layer' }, o.hidden ? '🙈' : '👁');
      vis.addEventListener('click', function (e) { e.stopPropagation(); o.hidden = !o.hidden; self.draw(); self.renderLayers(); self.commit(); });
      var lock = el('button', { class: 'mini', type: 'button', 'aria-label': o.locked ? 'Unlock layer' : 'Lock layer' }, o.locked ? '🔒' : '🔓');
      lock.addEventListener('click', function (e) { e.stopPropagation(); o.locked = !o.locked; if (o.locked && self.sel === o.id) self.sel = null; self.draw(); self.renderLayers(); self.commit(); });
      row.appendChild(vis); row.appendChild(lock);
      row.addEventListener('click', function () { self.select(o.id, { silent: true }); });
      row.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); self.select(o.id, { silent: true }); } });
      list.appendChild(row);
    });
    p.appendChild(list);

    var acts = el('div', { class: 'grid2', style: 'margin-top:12px' });
    [['Bring to front', 'front'], ['Send to back', 'back'], ['Bring forward', 'up'], ['Send backward', 'down']].forEach(function (a) {
      var b = el('button', { class: 'btn btn-soft btn-sm', type: 'button' }, a[0]);
      b.addEventListener('click', function () { if (!self.sel) { FS.toast(FS.t('Select a layer first')); return; } self.order(a[1]); });
      acts.appendChild(b);
    });
    p.appendChild(acts);

    var acts2 = el('div', { class: 'grid2', style: 'margin-top:8px' });
    var dup = el('button', { class: 'btn btn-soft btn-sm', type: 'button' }, FS.t('Duplicate'));
    dup.addEventListener('click', function () { self.duplicate(); });
    var del = el('button', { class: 'btn btn-soft btn-sm', type: 'button' }, FS.t('Delete'));
    del.addEventListener('click', function () { if (!self.sel) { FS.toast(FS.t('Select a layer first')); return; } self.removeSelected(); });
    acts2.appendChild(dup); acts2.appendChild(del);
    p.appendChild(acts2);
  };

  /* ---- Export panel -------------------------------------------------- */
  Editor.prototype.renderExportPanel = function () {
    var self = this, p = document.getElementById('panel-export');
    p.innerHTML = '';
    var fmt = 'png', quality = .92, scale = 1;

    p.appendChild(ctlSeg('Format', [{ value: 'png', label: 'PNG' }, { value: 'jpg', label: 'JPG' }], fmt, function (v) {
      fmt = v; qWrap.hidden = v !== 'jpg';
    }));
    var qWrap = el('div', { hidden: 'hidden' });
    qWrap.appendChild(ctlRange('JPG quality', .5, 1, .01, quality, function (v) { quality = v; }, function (v) { return Math.round(v * 100) + '%'; }));
    p.appendChild(qWrap);
    p.appendChild(ctlSeg('Resolution', [{ value: '1', label: 'Standard' }, { value: '1.5', label: 'High' }, { value: '2', label: 'Max' }], '1', function (v) { scale = parseFloat(v); }));

    var dl = el('button', { class: 'btn btn-primary btn-block btn-lg', type: 'button' }, FS.t('Download image'));
    dl.addEventListener('click', function () { self.download(fmt, quality, scale); });
    p.appendChild(dl);

    var share = el('div', { class: 'grid2', style: 'margin-top:10px' });
    var sh = el('button', { class: 'btn btn-soft btn-sm', type: 'button' }, FS.t('Share'));
    sh.addEventListener('click', function () {
      FS.fontsReady.then(function () {
        FS.canvasToBlob(self.exportCanvas(1), 'image/png').then(function (b) {
          FS.shareBlob(b, self.fileName('png'), 'Made with Festival Studio');
        }).catch(function () { FS.toast('Could not prepare the image for sharing.', 'err'); });
      });
    });
    var wa = el('button', { class: 'btn btn-soft btn-sm', type: 'button' }, FS.t('WhatsApp'));
    wa.addEventListener('click', function () {
      FS.fontsReady.then(function () {
        FS.canvasToBlob(self.exportCanvas(1), 'image/png').then(function (b) {
          var file = null;
          try { file = new File([b], self.fileName('png'), { type: 'image/png' }); } catch (e) {}
          if (file && FS.canShareFiles(file)) FS.shareBlob(b, self.fileName('png'), 'Happy ' + FS.getFestival(self.festival).name + '!');
          else { FS.saveBlob(b, self.fileName('png')); FS.whatsappShare('Happy ' + FS.getFestival(self.festival).name + '! Made free on Festival Studio'); }
        });
      });
    });
    var cp = el('button', { class: 'btn btn-soft btn-sm', type: 'button' }, FS.t('Copy image'));
    cp.addEventListener('click', function () {
      FS.canvasToBlob(self.exportCanvas(1), 'image/png').then(function (b) { FS.copyImage(b); });
    });
    var lk = el('button', { class: 'btn btn-soft btn-sm', type: 'button' }, FS.t('Share link'));
    lk.addEventListener('click', FS.shareLink);
    share.appendChild(sh); share.appendChild(wa); share.appendChild(cp); share.appendChild(lk);
    p.appendChild(share);

    p.appendChild(el('hr', { class: 'divider' }));
    var gif = el('button', { class: 'btn btn-dark btn-block', type: 'button' }, FS.t('Animate this design as a GIF →'));
    gif.addEventListener('click', function () {
      var okSaved = Store.set('handoff', FS.serialize(self.scene, { festival: self.festival, mode: self.mode }));
      if (!okSaved) { FS.toast('Storage is blocked, so the design cannot be passed to the GIF maker.', 'err', 4500); return; }
      location.href = 'gif-maker.html?from=handoff';
    });
    p.appendChild(gif);

    p.appendChild(el('hr', { class: 'divider' }));
    var save = el('button', { class: 'btn btn-soft btn-block', type: 'button' }, FS.t('Save draft on this device'));
    save.addEventListener('click', function () { self.saveDraft(); });
    p.appendChild(save);
    p.appendChild(el('div', { id: 'drafts-list', style: 'margin-top:12px' }));
    this.renderDrafts();

    p.appendChild(el('hr', { class: 'divider' }));
    var row = el('div', { class: 'grid2' });
    var reset = el('button', { class: 'btn btn-ghost btn-sm', type: 'button' }, FS.t('Reset design'));
    reset.addEventListener('click', function () {
      if (!confirm('Reset this design back to the template?')) return;
      self.scene = FS.buildScene(self.festival + '--' + (self.mode === 'status' ? 'status' : 'classic'), self.fields);
      self.sel = null; self.fit(); self.commit(true); self.refreshPanels();
      FS.toast(FS.t('Design reset'));
    });
    var clear = el('button', { class: 'btn btn-ghost btn-sm', type: 'button' }, FS.t('Clear canvas'));
    clear.addEventListener('click', function () {
      if (!confirm('Remove every layer from the canvas?')) return;
      self.scene.objects = []; self.sel = null;
      self.draw(); self.commit(); self.renderLayers(); self.renderProps();
      FS.toast(FS.t('Canvas cleared'));
    });
    row.appendChild(reset); row.appendChild(clear);
    p.appendChild(row);

    p.appendChild(el('div', { class: 'privacy-note' },
      FS.icon('shield') + '<span>Drafts and preferences are stored only in this browser on this device. Clearing browser data removes them.</span>'));
  };

  Editor.prototype.renderDrafts = function () {
    var self = this;
    var host = document.getElementById('drafts-list');
    if (!host) return;
    host.innerHTML = '';
    var drafts = Store.listDrafts();
    if (!drafts.length) { host.appendChild(el('p', { class: 'hint' }, FS.t('No saved drafts yet.'))); return; }
    host.appendChild(el('div', { class: 'flabel' }, FS.t('Recent designs on this device')));
    drafts.forEach(function (d) {
      var row = el('div', { class: 'layer' });
      row.appendChild(el('span', { class: 'lthumb', style: d.thumb ? 'background-image:url(' + d.thumb + ');background-size:cover' : '' }, d.thumb ? '' : '🎨'));
      row.appendChild(el('span', { class: 'lname' }, FS.esc(d.title) + ' · ' + new Date(d.updated).toLocaleDateString()));
      var open = el('button', { class: 'mini', type: 'button', 'aria-label': 'Open draft' }, '↗');
      open.addEventListener('click', function () {
        FS.deserialize(d.data).then(function (r) {
          self.scene = r.scene; self.draftId = d.id;
          if (r.meta && r.meta.festival) self.festival = r.meta.festival;
          self.sel = null; self.fit(); self.commit(true); self.refreshPanels();
          FS.toast(FS.t('Draft loaded'));
        }).catch(function () { FS.toast('That draft could not be opened.', 'err'); });
      });
      var del = el('button', { class: 'mini', type: 'button', 'aria-label': 'Delete draft' }, '🗑');
      del.addEventListener('click', function () { Store.deleteDraft(d.id); self.renderDrafts(); });
      row.appendChild(open); row.appendChild(del);
      host.appendChild(row);
    });
  };

  /* ------------------------------------------------------------------ */
  /* Quick wizard: Photo → Festival → Template → Name → Generate         */
  /* ------------------------------------------------------------------ */
  Editor.prototype.quickStart = function () {
    var self = this;
    var state = { asset: null, festival: this.festival, tpl: null, name: this.fields.name || '' };

    FS.modal('Photo to festival post', function (body, close) {
      var steps = [];
      var dots = el('div', { class: 'dots' });
      var nav = el('div', { class: 'wizard-nav' });
      var back = el('button', { class: 'btn btn-ghost btn-sm', type: 'button' }, FS.t('Back'));
      var next = el('button', { class: 'btn btn-primary btn-sm', type: 'button' }, FS.t('Next'));
      var cur = 0;

      function show(i) {
        cur = Math.max(0, Math.min(steps.length - 1, i));
        steps.forEach(function (s, k) { s.setAttribute('data-active', String(k === cur)); });
        Array.prototype.forEach.call(dots.children, function (d, k) { d.className = k === cur ? 'on' : ''; });
        back.disabled = cur === 0;
        next.textContent = cur === steps.length - 1 ? 'Generate' : 'Next';
        if (cur === 2) renderTpls();
      }

      /* step 1 — photo */
      var s1 = el('div', { class: 'wizard-step' });
      s1.appendChild(el('p', { class: 'hint' }, 'Add a photo of yourself, your family or your shop. You can skip this and add one later.'));
      var thumb = el('div', { class: 'preview-frame', style: 'min-height:150px' }, '<span class="muted">No photo yet</span>');
      var pickBtn = el('button', { class: 'btn btn-primary btn-block', type: 'button' }, FS.t('Choose photo from gallery'));
      pickBtn.addEventListener('click', function () {
        self.pickImage(function (id) {
          state.asset = id;
          thumb.innerHTML = '';
          var im = new Image(); im.src = FS.Assets.src(id); im.alt = 'Selected photo preview';
          thumb.appendChild(im);
        });
      });
      s1.appendChild(thumb); s1.appendChild(pickBtn);

      /* step 2 — festival */
      var s2 = el('div', { class: 'wizard-step' });
      s2.appendChild(el('p', { class: 'hint' }, 'Which festival is this for?'));
      var fchips = el('div', { class: 'tiles', style: 'grid-template-columns:repeat(auto-fill,minmax(88px,1fr))' });
      FS.FESTIVALS.forEach(function (f) {
        var b = el('button', {
          class: 'tile', type: 'button', style: 'flex-direction:column;font-size:.7rem;font-weight:600;gap:4px',
          'aria-pressed': String(f.slug === state.festival)
        }, '<span style="font-size:1.4rem" aria-hidden="true">' + f.icon + '</span><span>' + FS.esc(f.name) + '</span>');
        b.addEventListener('click', function () {
          state.festival = f.slug; state.tpl = null;
          FS.$$('button', fchips).forEach(function (x) { x.style.borderColor = ''; x.setAttribute('aria-pressed', 'false'); });
          b.style.borderColor = 'var(--brand)'; b.setAttribute('aria-pressed', 'true');
        });
        if (f.slug === state.festival) b.style.borderColor = 'var(--brand)';
        fchips.appendChild(b);
      });
      s2.appendChild(fchips);

      /* step 3 — template */
      var s3 = el('div', { class: 'wizard-step' });
      s3.appendChild(el('p', { class: 'hint' }, 'Pick a layout. Layouts with a photo slot are shown first.'));
      var tgrid = el('div', { class: 'tiles', style: 'grid-template-columns:repeat(auto-fill,minmax(96px,1fr))' });
      s3.appendChild(tgrid);
      function renderTpls() {
        tgrid.innerHTML = '';
        var list = FS.TEMPLATES.filter(function (t) { return t.festival === state.festival; });
        var withPhoto = ['photo', 'igpost', 'igstory'];
        list.sort(function (a, b2) {
          return (withPhoto.indexOf(b2.layout) > -1 ? 1 : 0) - (withPhoto.indexOf(a.layout) > -1 ? 1 : 0);
        });
        if (!state.tpl) state.tpl = list[0].id;
        list.forEach(function (t) {
          var b = el('button', { class: 'tile', type: 'button', title: t.name, 'aria-label': t.name });
          if (t.id === state.tpl) b.style.borderColor = 'var(--brand)';
          b.addEventListener('click', function () {
            state.tpl = t.id;
            FS.$$('button', tgrid).forEach(function (x) { x.style.borderColor = ''; });
            b.style.borderColor = 'var(--brand)';
          });
          tgrid.appendChild(b);
          FS.fontsReady.then(function () {
            try { b.appendChild(FS.renderToCanvas(FS.buildScene(t, self.fields), 160)); } catch (e) {}
          });
        });
      }

      /* step 4 — name */
      var s4 = el('div', { class: 'wizard-step' });
      var nameIn = el('input', { class: 'input', type: 'text', value: state.name, placeholder: 'e.g. Ritesh Kumar', 'aria-label': 'Your name' });
      nameIn.addEventListener('input', function () { state.name = nameIn.value; });
      s4.appendChild(field('Your name (or business name)', nameIn));
      s4.appendChild(el('p', { class: 'hint' }, 'Press Generate and your design opens in the editor, ready to download.'));

      [s1, s2, s3, s4].forEach(function (s) { steps.push(s); body.appendChild(s); dots.appendChild(el('i', {})); });

      back.addEventListener('click', function () { show(cur - 1); });
      next.addEventListener('click', function () {
        if (cur < steps.length - 1) { show(cur + 1); return; }
        /* generate */
        self.festival = state.festival;
        Store.pref('lastFestival', state.festival);
        if (state.name) { self.fields.name = state.name; Store.pref('fields', self.fields); }
        self.scene = FS.buildScene(state.tpl, self.fields);
        if (state.asset) {
          var slot = self.scene.objects.filter(function (o) { return o.type === 'image' && o.role !== 'logo'; })[0];
          if (slot) slot.asset = state.asset;
          else {
            var w = self.scene.width * .5;
            self.scene.objects.unshift(FS.defaults.image({
              asset: state.asset, w: w, h: w, x: (self.scene.width - w) / 2, y: self.scene.height * .08,
              radius: 999, name: 'Your photo'
            }));
          }
        }
        self.sel = null;
        self.fit(); self.commit(true); self.refreshPanels();
        close();
        self.showTab('export');
        FS.toast('Your design is ready — download it from the Export tab', 'ok', 4000);
      });
      nav.appendChild(back); nav.appendChild(next); nav.appendChild(dots);
      body.appendChild(nav);
      show(0);
    });
  };

  /* ---- top bar ------------------------------------------------------- */
  Editor.prototype.bindBar = function () {
    var self = this;
    function on(id, fn) { var b = document.getElementById(id); if (b) b.addEventListener('click', fn); }
    on('btn-quick', function () { self.quickStart(); });
    on('btn-undo', function () { self.undo(); });
    on('btn-redo', function () { self.redo(); });
    on('btn-save', function () { self.saveDraft(); });
    on('btn-download', function () { self.showTab('export'); self.download('png'); });
    on('btn-delete', function () { self.removeSelected(); });
  };

  /* ------------------------------------------------------------------ */
  /* Modal helper                                                        */
  /* ------------------------------------------------------------------ */
  FS.modal = function (title, build) {
    var back = el('div', { class: 'modal-back', role: 'dialog', 'aria-modal': 'true', 'aria-label': title });
    var box = el('div', { class: 'modal' });
    var head = el('div', { class: 'modal-head' }, '<h3>' + FS.esc(title) + '</h3>');
    var x = el('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Close' }, FS.icon('close'));
    head.appendChild(x);
    var body = el('div', { class: 'modal-body' });
    box.appendChild(head); box.appendChild(body); back.appendChild(box);
    function close() { back.remove(); document.removeEventListener('keydown', esc); }
    function esc(e) { if (e.key === 'Escape') close(); }
    x.addEventListener('click', close);
    back.addEventListener('click', function (e) { if (e.target === back) close(); });
    document.addEventListener('keydown', esc);
    document.body.appendChild(back);
    build(body, close);
    return { close: close, body: body };
  };

  FS.Editor = Editor;
})(window);
