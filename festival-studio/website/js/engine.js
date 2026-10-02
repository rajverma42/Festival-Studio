/* ============================================================================
   Festival Studio — engine.js
   The rendering core: scene model, background painter, object painter,
   text layout, hit-testing, animation states and festive overlay effects.
   Shared by the Post Maker, Status Maker, GIF Maker and every template preview.
   ========================================================================== */
(function (global) {
  'use strict';
  var FS = (global.FS = global.FS || {});

  /* ------------------------------------------------------------------ */
  /* Fonts                                                               */
  /* ------------------------------------------------------------------ */
  FS.FONTS = [
    { id: 'Poppins', label: 'Poppins (clean)' },
    { id: 'Noto Sans Devanagari', label: 'Noto Devanagari (हिन्दी)' },
    { id: 'Tiro Devanagari Hindi', label: 'Tiro Hindi (हिन्दी)' },
    { id: 'Mukta', label: 'Mukta (हिन्दी / EN)' },
    { id: 'Rozha One', label: 'Rozha One (display)' },
    { id: 'Baloo 2', label: 'Baloo 2 (rounded)' },
    { id: 'Playfair Display', label: 'Playfair (elegant)' },
    { id: 'Anton', label: 'Anton (bold)' }
  ];
  FS.fontStack = function (family) {
    return '"' + family + '", "Noto Sans Devanagari", "Poppins", system-ui, sans-serif';
  };

  /* ------------------------------------------------------------------ */
  /* Canvas presets                                                      */
  /* ------------------------------------------------------------------ */
  FS.SIZES = [
    { id: 'ig-square', label: 'Instagram Square', w: 1080, h: 1080 },
    { id: 'ig-portrait', label: 'Instagram Portrait', w: 1080, h: 1350 },
    { id: 'ig-story', label: 'Instagram Story', w: 1080, h: 1920 },
    { id: 'wa-status', label: 'WhatsApp Status', w: 1080, h: 1920 },
    { id: 'wa-dp', label: 'WhatsApp DP', w: 800, h: 800 },
    { id: 'fb-post', label: 'Facebook Post', w: 1200, h: 630 },
    { id: 'fb-story', label: 'Facebook Story', w: 1080, h: 1920 },
    { id: 'fb-cover', label: 'Facebook Cover', w: 1640, h: 856 },
    { id: 'yt-community', label: 'YouTube Community', w: 1280, h: 720 },
    { id: 'yt-thumb', label: 'YouTube Thumbnail', w: 1280, h: 720 },
    { id: 'x-post', label: 'X / Twitter Post', w: 1600, h: 900 },
    { id: 'li-post', label: 'LinkedIn Post', w: 1200, h: 627 },
    { id: 'poster-a4', label: 'Poster A4 (150 dpi)', w: 1240, h: 1754 },
    { id: 'flex-banner', label: 'Shop Banner (3:1)', w: 1800, h: 600 },
    { id: 'custom', label: 'Custom Size', w: 1080, h: 1080 }
  ];

  /* ------------------------------------------------------------------ */
  /* Asset registry — image data URLs live here, NOT inside history       */
  /* ------------------------------------------------------------------ */
  var assets = {};
  var assetSeq = 0;
  FS.Assets = {
    add: function (dataURL, img) {
      var id = 'a' + (++assetSeq);
      assets[id] = { src: dataURL, img: img || null };
      return id;
    },
    put: function (id, dataURL, img) { assets[id] = { src: dataURL, img: img || null }; },
    src: function (id) { return assets[id] ? assets[id].src : null; },
    img: function (id) { return assets[id] ? assets[id].img : null; },
    all: function () { return assets; },
    /* Load (or re-load) an asset and return a promise of the HTMLImageElement */
    load: function (id) {
      return new Promise(function (res, rej) {
        var a = assets[id];
        if (!a) return rej(new Error('missing asset'));
        if (a.img && a.img.complete && a.img.naturalWidth) return res(a.img);
        var im = new Image();
        im.onload = function () { a.img = im; res(im); };
        im.onerror = function () { rej(new Error('decode failed')); };
        im.src = a.src;
      });
    },
    serialize: function (scene) {
      var out = {};
      (scene.objects || []).forEach(function (o) {
        if (o.asset && assets[o.asset]) out[o.asset] = assets[o.asset].src;
      });
      return out;
    },
    hydrate: function (map) {
      var jobs = [];
      Object.keys(map || {}).forEach(function (id) {
        assets[id] = assets[id] || { src: map[id], img: null };
        assets[id].src = map[id];
        var n = parseInt(id.replace('a', ''), 10);
        if (!isNaN(n) && n > assetSeq) assetSeq = n;
        jobs.push(FS.Assets.load(id).catch(function () {}));
      });
      return Promise.all(jobs);
    }
  };

  /* ------------------------------------------------------------------ */
  /* Scene helpers                                                       */
  /* ------------------------------------------------------------------ */
  var idSeq = 0;
  FS.uid = function (p) { return (p || 'o') + Date.now().toString(36) + (++idSeq).toString(36); };

  FS.newScene = function (w, h) {
    return {
      width: w || 1080,
      height: h || 1080,
      background: { type: 'linear', angle: 135, stops: [{ c: '#2A0A3D', p: 0 }, { c: '#7B1FA2', p: 1 }] },
      objects: []
    };
  };

  FS.defaults = {
    text: function (o) {
      return Object.assign({
        id: FS.uid('t'), type: 'text', name: 'Text',
        x: 90, y: 400, w: 900, rot: 0, opacity: 1, locked: false, hidden: false,
        text: 'Your text', font: 'Poppins', size: 72, weight: 700, italic: false,
        align: 'center', ls: 0, lh: 1.25, color: '#FFFFFF',
        shadowOn: true, shadowColor: 'rgba(0,0,0,.45)', shadowBlur: 18, shadowX: 0, shadowY: 6,
        bgOn: false, bgColor: '#FFB300', bgPad: 18, bgRadius: 16,
        strokeOn: false, strokeColor: '#000000', strokeW: 6
      }, o || {});
    },
    image: function (o) {
      return Object.assign({
        id: FS.uid('i'), type: 'image', name: 'Photo',
        x: 240, y: 240, w: 600, h: 600, rot: 0, opacity: 1, locked: false, hidden: false,
        asset: null, flipH: false, flipV: false, radius: 0,
        borderW: 0, borderColor: '#FFFFFF',
        shadowOn: false, shadowColor: 'rgba(0,0,0,.45)', shadowBlur: 30,
        crop: { x: 0, y: 0, w: 1, h: 1 }, fit: 'cover'
      }, o || {});
    },
    shape: function (o) {
      return Object.assign({
        id: FS.uid('s'), type: 'shape', name: 'Shape', shape: 'rect',
        x: 340, y: 340, w: 400, h: 400, rot: 0, opacity: 1, locked: false, hidden: false,
        fill: '#FFB300', strokeColor: '#FFFFFF', strokeW: 0, radius: 36
      }, o || {});
    },
    sticker: function (o) {
      return Object.assign({
        id: FS.uid('k'), type: 'sticker', name: 'Sticker', sid: 'diya',
        x: 400, y: 400, w: 260, h: 260, rot: 0, opacity: 1, locked: false, hidden: false,
        colors: { p: '#E65100', s: '#B71C1C', a: '#FFC107' }
      }, o || {});
    }
  };

  /* ------------------------------------------------------------------ */
  /* Background painting                                                 */
  /* ------------------------------------------------------------------ */
  function gradFrom(ctx, bg, w, h) {
    var stops = (bg.stops && bg.stops.length ? bg.stops : [{ c: '#000', p: 0 }, { c: '#fff', p: 1 }]);
    var g;
    if (bg.type === 'radial') {
      g = ctx.createRadialGradient(w * (bg.cx == null ? .5 : bg.cx), h * (bg.cy == null ? .45 : bg.cy), 0,
        w * .5, h * .5, Math.max(w, h) * .78);
    } else {
      var a = ((bg.angle == null ? 135 : bg.angle) * Math.PI) / 180;
      var cx = w / 2, cy = h / 2, len = (Math.abs(w * Math.cos(a)) + Math.abs(h * Math.sin(a))) / 2;
      g = ctx.createLinearGradient(cx - Math.cos(a) * len, cy - Math.sin(a) * len, cx + Math.cos(a) * len, cy + Math.sin(a) * len);
    }
    stops.forEach(function (s, i) {
      var p = s.p == null ? i / Math.max(1, stops.length - 1) : s.p;
      g.addColorStop(Math.max(0, Math.min(1, p)), s.c);
    });
    return g;
  }

  var PATTERNS = {
    dots: function (ctx, w, h, col) {
      ctx.fillStyle = col; var s = Math.max(w, h) / 26;
      for (var y = s / 2; y < h + s; y += s) for (var x = (Math.round(y / s) % 2) * s / 2; x < w + s; x += s) {
        ctx.beginPath(); ctx.arc(x, y, s * .09, 0, 6.284); ctx.fill();
      }
    },
    rangoli: function (ctx, w, h, col) {
      ctx.strokeStyle = col; ctx.lineWidth = Math.max(w, h) / 420;
      var s = Math.max(w, h) / 6;
      for (var y = 0; y < h + s; y += s) for (var x = 0; x < w + s; x += s) {
        for (var i = 0; i < 8; i++) {
          var a = (Math.PI * 2 * i) / 8;
          ctx.beginPath(); ctx.ellipse(x, y, s * .3, s * .1, a, 0, Math.PI * 2); ctx.stroke();
        }
      }
    },
    rays: function (ctx, w, h, col) {
      ctx.fillStyle = col;
      var cx = w / 2, cy = h * .42, R = Math.max(w, h) * 1.3;
      for (var i = 0; i < 24; i += 2) {
        var a1 = (Math.PI * 2 * i) / 24, a2 = (Math.PI * 2 * (i + 1)) / 24;
        ctx.beginPath(); ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a1) * R, cy + Math.sin(a1) * R);
        ctx.lineTo(cx + Math.cos(a2) * R, cy + Math.sin(a2) * R);
        ctx.closePath(); ctx.fill();
      }
    },
    mandala: function (ctx, w, h, col) {
      ctx.strokeStyle = col; ctx.lineWidth = Math.max(w, h) / 500;
      var cx = w / 2, cy = h / 2, R = Math.max(w, h) * .62;
      for (var r = R * .18; r < R; r += R * .07) { ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.284); ctx.stroke(); }
      for (var i = 0; i < 36; i++) {
        var a = (Math.PI * 2 * i) / 36;
        ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * R * .18, cy + Math.sin(a) * R * .18);
        ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R); ctx.stroke();
      }
    },
    stripes: function (ctx, w, h, col) {
      ctx.strokeStyle = col; ctx.lineWidth = Math.max(w, h) / 90;
      var s = Math.max(w, h) / 14;
      for (var x = -h; x < w + h; x += s) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + h, h); ctx.stroke(); }
    },
    islamic: function (ctx, w, h, col) {
      ctx.strokeStyle = col; ctx.lineWidth = Math.max(w, h) / 450;
      var s = Math.max(w, h) / 10;
      for (var y = 0; y < h + s; y += s) for (var x = 0; x < w + s; x += s) {
        ctx.save(); ctx.translate(x, y); ctx.rotate(Math.PI / 4);
        ctx.strokeRect(-s * .28, -s * .28, s * .56, s * .56);
        ctx.rotate(Math.PI / 4);
        ctx.strokeRect(-s * .28, -s * .28, s * .56, s * .56);
        ctx.restore();
      }
    },
    confetti: function (ctx, w, h, col) {
      ctx.fillStyle = col; var seed = 3;
      function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
      for (var i = 0; i < 140; i++) {
        var x = rnd() * w, y = rnd() * h, r = rnd() * 3.14, s = Math.max(w, h) / 90;
        ctx.save(); ctx.translate(x, y); ctx.rotate(r); ctx.fillRect(-s / 2, -s / 5, s, s / 2.5); ctx.restore();
      }
    },
    grid: function (ctx, w, h, col) {
      ctx.strokeStyle = col; ctx.lineWidth = 1; var s = Math.max(w, h) / 22;
      for (var x = 0; x < w; x += s) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (var y = 0; y < h; y += s) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
    }
  };
  FS.PATTERNS = Object.keys(PATTERNS);

  FS.drawBackground = function (ctx, scene) {
    var bg = scene.background || { type: 'solid', color: '#ffffff' };
    var w = scene.width, h = scene.height;
    if (bg.type === 'none') return;
    if (bg.type === 'solid') { ctx.fillStyle = bg.color || '#ffffff'; ctx.fillRect(0, 0, w, h); return; }
    ctx.fillStyle = gradFrom(ctx, bg, w, h);
    ctx.fillRect(0, 0, w, h);
    if (bg.pattern && PATTERNS[bg.pattern]) {
      ctx.save();
      ctx.globalAlpha = bg.patternAlpha == null ? .14 : bg.patternAlpha;
      PATTERNS[bg.pattern](ctx, w, h, bg.patternColor || '#FFFFFF');
      ctx.restore();
    }
    if (bg.vignette) {
      var v = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * .25, w / 2, h / 2, Math.max(w, h) * .72);
      v.addColorStop(0, 'rgba(0,0,0,0)');
      v.addColorStop(1, 'rgba(0,0,0,' + (bg.vignette === true ? .38 : bg.vignette) + ')');
      ctx.fillStyle = v; ctx.fillRect(0, 0, w, h);
    }
  };

  /* ------------------------------------------------------------------ */
  /* Text layout                                                         */
  /* ------------------------------------------------------------------ */
  function setFont(ctx, o) {
    ctx.font = (o.italic ? 'italic ' : '') + (o.weight || 700) + ' ' + o.size + 'px ' + FS.fontStack(o.font);
  }
  function measureRun(ctx, str, ls) {
    if (!ls) return ctx.measureText(str).width;
    var w = 0;
    for (var i = 0; i < str.length; i++) w += ctx.measureText(str[i]).width + ls;
    return w - (str.length ? ls : 0);
  }
  function fillRun(ctx, str, x, y, ls, mode) {
    if (!ls) { mode === 'stroke' ? ctx.strokeText(str, x, y) : ctx.fillText(str, x, y); return; }
    var cx = x;
    for (var i = 0; i < str.length; i++) {
      mode === 'stroke' ? ctx.strokeText(str[i], cx, y) : ctx.fillText(str[i], cx, y);
      cx += ctx.measureText(str[i]).width + ls;
    }
  }

  FS.layoutText = function (ctx, o) {
    setFont(ctx, o);
    var maxW = Math.max(20, o.w);
    var ls = o.ls || 0;
    var out = [];
    String(o.text == null ? '' : o.text).split('\n').forEach(function (para) {
      var words = para.split(/(\s+)/).filter(function (s) { return s !== ''; });
      var line = '';
      words.forEach(function (word) {
        var test = line + word;
        if (measureRun(ctx, test.trim(), ls) > maxW && line.trim()) {
          out.push(line.trim()); line = word.replace(/^\s+/, '');
        } else line = test;
      });
      out.push(line.trim());
    });
    if (!out.length) out = [''];
    var lineH = o.size * (o.lh || 1.25);
    return { lines: out, lineH: lineH, height: lineH * out.length, widest: Math.max.apply(null, out.map(function (l) { return measureRun(ctx, l, ls); }).concat([0])) };
  };

  var _mc = null;
  function measureCtx() {
    if (!_mc) { var c = document.createElement('canvas'); c.width = c.height = 8; _mc = c.getContext('2d'); }
    return _mc;
  }
  /* Rendered height of an object (text height is derived from its content). */
  FS.objH = function (o) {
    if (o.type !== 'text') return o.h;
    var m = FS.layoutText(measureCtx(), o);
    return Math.max(m.height, o.size * .9);
  };

  function roundRectPath(ctx, x, y, w, h, r) {
    r = Math.max(0, Math.min(r, Math.min(Math.abs(w), Math.abs(h)) / 2));
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }
  FS.roundRectPath = roundRectPath;

  /* ------------------------------------------------------------------ */
  /* Object painting                                                     */
  /* ------------------------------------------------------------------ */
  function drawText(ctx, o) {
    var m = FS.layoutText(ctx, o);
    var w = o.w, h = m.height;
    var ls = o.ls || 0;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';

    if (o.bgOn) {
      ctx.save();
      ctx.fillStyle = o.bgColor;
      var pad = o.bgPad || 0;
      roundRectPath(ctx, -w / 2 - pad, -h / 2 - pad, w + pad * 2, h + pad * 2, o.bgRadius || 0);
      ctx.fill();
      ctx.restore();
    }

    m.lines.forEach(function (line, i) {
      var lw = measureRun(ctx, line, ls);
      var x = -w / 2;
      if (o.align === 'center') x = -lw / 2;
      else if (o.align === 'right') x = w / 2 - lw;
      var y = -h / 2 + m.lineH * i + m.lineH / 2;

      if (o.strokeOn && o.strokeW > 0) {
        ctx.save();
        ctx.lineJoin = 'round'; ctx.miterLimit = 2;
        ctx.strokeStyle = o.strokeColor; ctx.lineWidth = o.strokeW;
        fillRun(ctx, line, x, y, ls, 'stroke');
        ctx.restore();
      }
      ctx.save();
      if (o.shadowOn) {
        ctx.shadowColor = o.shadowColor || 'rgba(0,0,0,.45)';
        ctx.shadowBlur = o.shadowBlur || 0;
        ctx.shadowOffsetX = o.shadowX || 0;
        ctx.shadowOffsetY = o.shadowY || 0;
      }
      ctx.fillStyle = o.color;
      fillRun(ctx, line, x, y, ls, 'fill');
      ctx.restore();
    });
  }

  function drawImageObj(ctx, o) {
    var img = FS.Assets.img(o.asset);
    var w = o.w, h = o.h;
    if (!img || !img.naturalWidth) {
      ctx.fillStyle = 'rgba(160,160,160,.35)';
      roundRectPath(ctx, -w / 2, -h / 2, w, h, o.radius || 0); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.8)';
      ctx.font = '600 ' + Math.max(14, w / 14) + 'px ' + FS.fontStack('Poppins');
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('Photo', 0, 0);
      return;
    }
    if (o.shadowOn) {
      ctx.save();
      ctx.shadowColor = o.shadowColor || 'rgba(0,0,0,.45)';
      ctx.shadowBlur = o.shadowBlur || 24;
      ctx.shadowOffsetY = (o.shadowBlur || 24) * .25;
      ctx.fillStyle = o.padColor || '#FFFFFF';
      roundRectPath(ctx, -w / 2, -h / 2, w, h, o.radius || 0);
      ctx.fill();             /* opaque carrier so the drop shadow has a shape */
      ctx.restore();
    }

    ctx.save();
    roundRectPath(ctx, -w / 2, -h / 2, w, h, o.radius || 0);
    ctx.clip();
    ctx.save();
    ctx.scale(o.flipH ? -1 : 1, o.flipV ? -1 : 1);
    var c = o.crop || { x: 0, y: 0, w: 1, h: 1 };
    var sx = c.x * img.naturalWidth, sy = c.y * img.naturalHeight;
    var sw = c.w * img.naturalWidth, sh = c.h * img.naturalHeight;
    /* object-fit: cover inside the crop window */
    var dw = w, dh = h;
    if (o.fit !== 'stretch') {
      var sr = sw / sh, dr = w / h;
      if (o.fit === 'contain' ? sr > dr : sr < dr) { dw = w; dh = w / sr; } else { dh = h; dw = h * sr; }
    }
    ctx.drawImage(img, sx, sy, sw, sh, -dw / 2, -dh / 2, dw, dh);
    ctx.restore();
    ctx.restore();

    if (o.borderW > 0) {
      ctx.save();
      ctx.strokeStyle = o.borderColor; ctx.lineWidth = o.borderW;
      roundRectPath(ctx, -w / 2 + o.borderW / 2, -h / 2 + o.borderW / 2, w - o.borderW, h - o.borderW, Math.max(0, (o.radius || 0) - o.borderW / 2));
      ctx.stroke(); ctx.restore();
    }
  }

  function shapePath(ctx, o) {
    var w = o.w, h = o.h, x = -w / 2, y = -h / 2;
    switch (o.shape) {
      case 'circle':
        ctx.beginPath(); ctx.ellipse(0, 0, w / 2, h / 2, 0, 0, Math.PI * 2); break;
      case 'roundrect':
        roundRectPath(ctx, x, y, w, h, o.radius == null ? 36 : o.radius); break;
      case 'triangle':
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(x + w, y + h); ctx.lineTo(x, y + h); ctx.closePath(); break;
      case 'line':
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + w, 0); break;
      case 'star': {
        var R = Math.min(w, h) / 2, r = R * .42;
        ctx.beginPath();
        for (var i = 0; i < 10; i++) {
          var rad = i % 2 === 0 ? R : r, a = (Math.PI * i) / 5 - Math.PI / 2;
          var px = Math.cos(a) * rad * (w / Math.min(w, h)), py = Math.sin(a) * rad * (h / Math.min(w, h));
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath(); break;
      }
      case 'heart': {
        ctx.beginPath();
        var sx = w / 2, sy = h / 2;
        ctx.moveTo(0, sy * .78);
        ctx.bezierCurveTo(-sx * 1.5, -sy * .1, -sx * .85, -sy * 1.2, 0, -sy * .38);
        ctx.bezierCurveTo(sx * .85, -sy * 1.2, sx * 1.5, -sy * .1, 0, sy * .78);
        ctx.closePath(); break;
      }
      default:
        roundRectPath(ctx, x, y, w, h, o.radius || 0);
    }
  }

  function drawShape(ctx, o) {
    if (o.shape === 'line') {
      ctx.strokeStyle = o.fill; ctx.lineWidth = Math.max(2, o.strokeW || 8); ctx.lineCap = 'round';
      shapePath(ctx, o); ctx.stroke(); return;
    }
    shapePath(ctx, o);
    if (o.fill && o.fill !== 'none') { ctx.fillStyle = o.fill; ctx.fill(); }
    if (o.strokeW > 0) { ctx.strokeStyle = o.strokeColor; ctx.lineWidth = o.strokeW; ctx.stroke(); }
  }

  function drawStickerObj(ctx, o) {
    ctx.save();
    ctx.translate(-o.w / 2, -o.h / 2);
    ctx.scale(1, o.h / o.w);
    FS.drawSticker(ctx, o.sid, o.w, o.colors);
    ctx.restore();
  }

  /* Animation state for GIF/preview: returns {alpha, dx, dy, scale, rot} */
  FS.animState = function (o, t) {
    var a = o.anim;
    if (!a || a.type === 'none' || !a.type) return null;
    var d = a.delay == null ? 0 : a.delay;
    var dur = a.dur == null ? .45 : a.dur;
    var k = (t - d) / dur;
    k = k < 0 ? 0 : k > 1 ? 1 : k;
    var ease = 1 - Math.pow(1 - k, 3);
    switch (a.type) {
      case 'fade': return { alpha: ease };
      case 'slide-up': return { alpha: ease, dy: (1 - ease) * 140 };
      case 'slide-left': return { alpha: ease, dx: (1 - ease) * 180 };
      case 'zoom': return { alpha: ease, scale: .6 + ease * .4 };
      case 'pop': return { alpha: Math.min(1, ease * 1.4), scale: k >= 1 ? 1 : .5 + 0.7 * ease - .2 * Math.sin(ease * Math.PI) };
      case 'bounce': {
        var b = k >= 1 ? 0 : Math.abs(Math.sin((1 - k) * Math.PI * 2.2)) * (1 - k) * 110;
        return { alpha: Math.min(1, k * 3), dy: -b };
      }
      case 'pulse': return { scale: 1 + Math.sin(t * Math.PI * 4) * .045 };
      case 'glow': return { alpha: .78 + Math.sin(t * Math.PI * 4) * .22 };
      case 'float': return { dy: Math.sin(t * Math.PI * 2) * 16 };
      case 'spin': return { rot: t * 360 };
      default: return null;
    }
  };

  FS.drawObject = function (ctx, o, opts) {
    if (o.hidden) return;
    var st = opts && opts.animate ? FS.animState(o, opts.t || 0) : null;
    var h = o.type === 'text' ? FS.objH(o) : o.h;
    var cx = o.x + o.w / 2 + (st && st.dx ? st.dx : 0);
    var cy = o.y + h / 2 + (st && st.dy ? st.dy : 0);
    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, (o.opacity == null ? 1 : o.opacity) * (st && st.alpha != null ? st.alpha : 1)));
    ctx.translate(cx, cy);
    ctx.rotate(((o.rot || 0) + (st && st.rot ? st.rot : 0)) * Math.PI / 180);
    if (st && st.scale) ctx.scale(st.scale, st.scale);
    try {
      if (o.type === 'text') drawText(ctx, o);
      else if (o.type === 'image') drawImageObj(ctx, o);
      else if (o.type === 'shape') drawShape(ctx, o);
      else if (o.type === 'sticker') drawStickerObj(ctx, o);
    } catch (e) { /* one bad object must never kill the canvas */ }
    ctx.restore();
  };

  /* ------------------------------------------------------------------ */
  /* Overlay effects (used by GIF maker & status previews)               */
  /* ------------------------------------------------------------------ */
  function prand(i, s) { var x = Math.sin(i * 127.1 + (s || 0) * 311.7) * 43758.5453; return x - Math.floor(x); }

  FS.EFFECTS = [
    { id: 'none', label: 'None' },
    { id: 'sparkle', label: 'Sparkles' },
    { id: 'confetti', label: 'Confetti' },
    { id: 'fireworks', label: 'Fireworks' },
    { id: 'glow', label: 'Diya Glow' },
    { id: 'petals', label: 'Flower Petals' },
    { id: 'snow', label: 'Snow / Stars' },
    { id: 'shine', label: 'Light Sweep' }
  ];

  FS.drawEffect = function (ctx, name, w, h, t, colors) {
    if (!name || name === 'none') return;
    var c = colors || { a: '#FFD54F', p: '#FF6F00', s: '#FFFFFF' };
    var i, x, y, r, a;
    ctx.save();
    if (name === 'sparkle') {
      for (i = 0; i < 46; i++) {
        x = prand(i, 1) * w; y = prand(i, 2) * h;
        var ph = (t * 2 + prand(i, 3)) % 1;
        r = Math.sin(ph * Math.PI) * (w / 90) * (0.5 + prand(i, 4));
        if (r <= 0) continue;
        ctx.fillStyle = i % 3 ? c.a : c.s;
        ctx.globalAlpha = Math.sin(ph * Math.PI);
        ctx.beginPath();
        ctx.moveTo(x, y - r * 3); ctx.quadraticCurveTo(x, y, x + r * 3, y);
        ctx.quadraticCurveTo(x, y, x, y + r * 3); ctx.quadraticCurveTo(x, y, x - r * 3, y);
        ctx.quadraticCurveTo(x, y, x, y - r * 3); ctx.fill();
      }
    } else if (name === 'confetti') {
      for (i = 0; i < 70; i++) {
        var sp = .4 + prand(i, 5) * .9;
        x = prand(i, 6) * w + Math.sin((t * 2 + prand(i, 7)) * Math.PI * 2) * w * .04;
        y = ((prand(i, 8) + t * sp) % 1) * (h + 60) - 30;
        ctx.save(); ctx.translate(x, y); ctx.rotate((t * 6 + prand(i, 9) * 6));
        ctx.globalAlpha = .95;
        ctx.fillStyle = [c.a, c.p, c.s, '#4FC3F7', '#EC407A'][i % 5];
        var s = w / 70;
        ctx.fillRect(-s / 2, -s / 4, s, s / 2);
        ctx.restore();
      }
    } else if (name === 'fireworks') {
      for (var b = 0; b < 3; b++) {
        var bt = (t + b / 3) % 1;
        var bx = w * (0.2 + 0.3 * b + prand(b, 11) * .12), by = h * (0.18 + prand(b, 12) * .3);
        var R = Math.pow(bt, .55) * Math.min(w, h) * .38;
        ctx.globalAlpha = Math.max(0, 1 - bt) * .95;
        for (i = 0; i < 24; i++) {
          a = (Math.PI * 2 * i) / 24 + b;
          ctx.strokeStyle = [c.a, c.p, '#FF8A65', '#FFF176'][i % 4];
          ctx.lineWidth = Math.max(1.5, w / 300); ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(bx + Math.cos(a) * R * .72, by + Math.sin(a) * R * .72 + bt * bt * 40);
          ctx.lineTo(bx + Math.cos(a) * R, by + Math.sin(a) * R + bt * bt * 40);
          ctx.stroke();
        }
      }
    } else if (name === 'glow') {
      var pulse = .5 + .5 * Math.sin(t * Math.PI * 2);
      var g = ctx.createRadialGradient(w / 2, h * .62, 0, w / 2, h * .62, Math.max(w, h) * (.35 + pulse * .12));
      g.addColorStop(0, 'rgba(255,193,7,' + (.30 + pulse * .18) + ')');
      g.addColorStop(1, 'rgba(255,193,7,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    } else if (name === 'petals') {
      for (i = 0; i < 26; i++) {
        var spd = .3 + prand(i, 13) * .6;
        x = prand(i, 14) * w + Math.sin((t * 1.5 + prand(i, 15)) * Math.PI * 2) * w * .06;
        y = ((prand(i, 16) + t * spd) % 1) * (h + 80) - 40;
        var sz = w / 34 * (.6 + prand(i, 17));
        ctx.save(); ctx.translate(x, y); ctx.rotate(t * 4 + prand(i, 18) * 6);
        ctx.globalAlpha = .9; ctx.fillStyle = [c.a, '#F06292', '#FFB74D', '#FFF'][i % 4];
        ctx.beginPath(); ctx.ellipse(0, 0, sz, sz * .5, 0, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      }
    } else if (name === 'snow') {
      for (i = 0; i < 60; i++) {
        var sp2 = .25 + prand(i, 19) * .45;
        x = prand(i, 20) * w + Math.sin((t + prand(i, 21)) * Math.PI * 2) * w * .03;
        y = ((prand(i, 22) + t * sp2) % 1) * (h + 40) - 20;
        ctx.globalAlpha = .35 + prand(i, 23) * .5;
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath(); ctx.arc(x, y, (w / 300) * (1 + prand(i, 24) * 2), 0, 6.284); ctx.fill();
      }
    } else if (name === 'shine') {
      var pos = (t * 1.6 - .3) * w * 1.6;
      var lg = ctx.createLinearGradient(pos - w * .25, 0, pos + w * .25, h);
      lg.addColorStop(0, 'rgba(255,255,255,0)');
      lg.addColorStop(.5, 'rgba(255,255,255,.30)');
      lg.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = lg; ctx.fillRect(0, 0, w, h);
    }
    ctx.restore();
  };

  /* ------------------------------------------------------------------ */
  /* Scene rendering                                                     */
  /* ------------------------------------------------------------------ */
  FS.renderScene = function (ctx, scene, opts) {
    opts = opts || {};
    ctx.save();
    ctx.clearRect(0, 0, scene.width, scene.height);
    if (opts.flatten) { ctx.fillStyle = opts.flatten; ctx.fillRect(0, 0, scene.width, scene.height); }
    FS.drawBackground(ctx, scene);
    for (var i = 0; i < scene.objects.length; i++) FS.drawObject(ctx, scene.objects[i], opts);
    if (opts.effect) FS.drawEffect(ctx, opts.effect, scene.width, scene.height, opts.t || 0, opts.effectColors);
    ctx.restore();
  };

  FS.renderToCanvas = function (scene, targetW, opts) {
    var scale = targetW ? targetW / scene.width : 1;
    var c = document.createElement('canvas');
    c.width = Math.round(scene.width * scale);
    c.height = Math.round(scene.height * scale);
    var ctx = c.getContext('2d');
    ctx.imageSmoothingQuality = 'high';
    ctx.scale(scale, scale);
    FS.renderScene(ctx, scene, opts);
    return c;
  };

  /* ------------------------------------------------------------------ */
  /* Hit testing                                                         */
  /* ------------------------------------------------------------------ */
  FS.bounds = function (o) {
    var h = o.type === 'text' ? FS.objH(o) : o.h;
    return { x: o.x, y: o.y, w: o.w, h: h, cx: o.x + o.w / 2, cy: o.y + h / 2 };
  };

  FS.toLocal = function (o, px, py) {
    var b = FS.bounds(o);
    var a = -(o.rot || 0) * Math.PI / 180;
    var dx = px - b.cx, dy = py - b.cy;
    return { x: dx * Math.cos(a) - dy * Math.sin(a), y: dx * Math.sin(a) + dy * Math.cos(a), b: b };
  };

  FS.hitTest = function (scene, px, py, pad) {
    pad = pad || 0;
    for (var i = scene.objects.length - 1; i >= 0; i--) {
      var o = scene.objects[i];
      if (o.hidden || o.locked) continue;
      var l = FS.toLocal(o, px, py);
      if (Math.abs(l.x) <= l.b.w / 2 + pad && Math.abs(l.y) <= l.b.h / 2 + pad) return o;
    }
    return null;
  };

  /* ------------------------------------------------------------------ */
  /* Serialisation (drafts)                                              */
  /* ------------------------------------------------------------------ */
  FS.serialize = function (scene, meta) {
    return {
      v: 1,
      meta: meta || {},
      scene: JSON.parse(JSON.stringify(scene)),
      assets: FS.Assets.serialize(scene)
    };
  };
  FS.deserialize = function (data) {
    return FS.Assets.hydrate(data.assets || {}).then(function () {
      return { scene: data.scene, meta: data.meta || {} };
    });
  };
})(window);
