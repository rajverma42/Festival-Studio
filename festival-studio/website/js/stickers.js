/* ============================================================================
   Festival Studio — stickers.js
   Vector festival stickers. Every sticker is drawn with the Canvas 2D API
   inside a 100 x 100 design box, so it scales to any size with no image
   assets and no network requests.

   Add a sticker: push an object with { id, name, tags, draw(ctx, c) } where
   `c` is { p: primary, s: secondary, a: accent } colours.
   ========================================================================== */
(function (global) {
  'use strict';
  var FS = (global.FS = global.FS || {});

  /* --- small drawing helpers ------------------------------------------- */
  function path(ctx, d, fill, stroke, lw) {
    var p = new Path2D(d);
    if (fill) { ctx.fillStyle = fill; ctx.fill(p); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw || 3; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke(p); }
  }
  function circle(ctx, x, y, r, fill) {
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = fill; ctx.fill();
  }
  function starPath(ctx, cx, cy, points, outer, inner, rot) {
    ctx.beginPath();
    for (var i = 0; i < points * 2; i++) {
      var r = i % 2 === 0 ? outer : inner;
      var a = (Math.PI * i) / points - Math.PI / 2 + (rot || 0);
      var x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath();
  }
  function petal(ctx, cx, cy, angle, len, wid) {
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(wid, -len * 0.5, 0, -len);
    ctx.quadraticCurveTo(-wid, -len * 0.5, 0, 0);
    ctx.closePath();
    ctx.restore();
  }
  function glyph(ctx, ch, color, size, font) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '700 ' + (size || 84) + 'px ' + (font || '"Noto Sans Devanagari", "Noto Sans", system-ui, sans-serif');
    ctx.fillText(ch, 50, 54);
    ctx.restore();
  }

  /* --- sticker definitions ---------------------------------------------- */
  FS.STICKERS = [
    {
      id: 'diya', name: 'Diya', tags: ['diwali', 'light'],
      draw: function (ctx, c) {
        // glow
        var g = ctx.createRadialGradient(50, 40, 2, 50, 40, 40);
        g.addColorStop(0, 'rgba(255,214,102,.75)');
        g.addColorStop(1, 'rgba(255,214,102,0)');
        ctx.fillStyle = g; ctx.fillRect(0, 0, 100, 100);
        // flame
        path(ctx, 'M50,14 C60,30 66,38 66,48 C66,58 59,66 50,66 C41,66 34,58 34,48 C34,38 40,30 50,14 Z', c.a);
        path(ctx, 'M50,30 C56,40 58,44 58,50 C58,56 55,60 50,60 C45,60 42,56 42,50 C42,44 44,40 50,30 Z', '#FFF3C4');
        // bowl
        path(ctx, 'M6,64 C24,60 76,60 94,64 C90,84 72,94 50,94 C28,94 10,84 6,64 Z', c.p);
        path(ctx, 'M6,64 C24,60 76,60 94,64 C92,70 80,74 50,74 C20,74 8,70 6,64 Z', c.s);
      }
    },
    {
      id: 'fireworks', name: 'Fireworks', tags: ['diwali', 'new-year'],
      draw: function (ctx, c) {
        var cols = [c.a, c.p, c.s];
        for (var i = 0; i < 16; i++) {
          var a = (Math.PI * 2 * i) / 16;
          ctx.strokeStyle = cols[i % 3];
          ctx.lineWidth = 3; ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(50 + Math.cos(a) * 14, 50 + Math.sin(a) * 14);
          ctx.lineTo(50 + Math.cos(a) * 40, 50 + Math.sin(a) * 40);
          ctx.stroke();
          circle(ctx, 50 + Math.cos(a) * 46, 50 + Math.sin(a) * 46, 3.2, cols[(i + 1) % 3]);
        }
        circle(ctx, 50, 50, 8, c.a);
      }
    },
    {
      id: 'rangoli', name: 'Rangoli', tags: ['diwali', 'pattern'],
      draw: function (ctx, c) {
        var cols = [c.p, c.s, c.a];
        for (var ring = 0; ring < 3; ring++) {
          var n = 8 + ring * 4, len = 46 - ring * 13, wid = 12 - ring * 3;
          ctx.fillStyle = cols[ring % 3];
          for (var i = 0; i < n; i++) {
            petal(ctx, 50, 50, (Math.PI * 2 * i) / n, len, wid);
            ctx.fill();
          }
        }
        circle(ctx, 50, 50, 8, c.a);
        circle(ctx, 50, 50, 4, '#FFFFFF');
      }
    },
    {
      id: 'flower', name: 'Flower', tags: ['all'],
      draw: function (ctx, c) {
        ctx.fillStyle = c.p;
        for (var i = 0; i < 8; i++) { petal(ctx, 50, 50, (Math.PI * 2 * i) / 8, 42, 16); ctx.fill(); }
        ctx.fillStyle = c.s;
        for (var j = 0; j < 8; j++) { petal(ctx, 50, 50, (Math.PI * 2 * j) / 8 + Math.PI / 8, 26, 10); ctx.fill(); }
        circle(ctx, 50, 50, 11, c.a);
      }
    },
    {
      id: 'gift', name: 'Gift', tags: ['all'],
      draw: function (ctx, c) {
        path(ctx, 'M14,40 h72 a6,6 0 0 1 6,6 v40 a6,6 0 0 1 -6,6 h-72 a6,6 0 0 1 -6,-6 v-40 a6,6 0 0 1 6,-6 Z', c.p);
        path(ctx, 'M8,34 h84 a4,4 0 0 1 4,4 v10 a4,4 0 0 1 -4,4 h-84 a4,4 0 0 1 -4,-4 v-10 a4,4 0 0 1 4,-4 Z', c.s);
        ctx.fillStyle = c.a; ctx.fillRect(43, 34, 14, 58);
        path(ctx, 'M50,34 C36,34 26,26 30,18 C34,10 46,16 50,34 Z', c.a);
        path(ctx, 'M50,34 C64,34 74,26 70,18 C66,10 54,16 50,34 Z', c.a);
      }
    },
    {
      id: 'sparkles', name: 'Sparkles', tags: ['all'],
      draw: function (ctx, c) {
        function spark(x, y, r, col) {
          ctx.fillStyle = col;
          ctx.beginPath();
          ctx.moveTo(x, y - r);
          ctx.quadraticCurveTo(x + r * 0.18, y - r * 0.18, x + r, y);
          ctx.quadraticCurveTo(x + r * 0.18, y + r * 0.18, x, y + r);
          ctx.quadraticCurveTo(x - r * 0.18, y + r * 0.18, x - r, y);
          ctx.quadraticCurveTo(x - r * 0.18, y - r * 0.18, x, y - r);
          ctx.closePath(); ctx.fill();
        }
        spark(46, 42, 34, c.a); spark(80, 22, 15, c.p); spark(22, 78, 18, c.s);
      }
    },
    {
      id: 'lantern', name: 'Lantern', tags: ['eid', 'diwali'],
      draw: function (ctx, c) {
        ctx.strokeStyle = c.s; ctx.lineWidth = 4; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(50, 2); ctx.lineTo(50, 14); ctx.stroke();
        path(ctx, 'M30,14 h40 a4,4 0 0 1 0,8 h-40 a4,4 0 0 1 0,-8 Z', c.s);
        path(ctx, 'M50,22 C74,22 84,40 84,56 C84,74 70,84 50,84 C30,84 16,74 16,56 C16,40 26,22 50,22 Z', c.p);
        path(ctx, 'M50,32 C66,32 72,44 72,56 C72,68 63,74 50,74 C37,74 28,68 28,56 C28,44 34,32 50,32 Z', c.a);
        path(ctx, 'M32,84 h36 a4,4 0 0 1 0,8 h-36 a4,4 0 0 1 0,-8 Z', c.s);
        ctx.strokeStyle = c.s; ctx.lineWidth = 3;
        [40, 50, 60].forEach(function (x) { ctx.beginPath(); ctx.moveTo(x, 92); ctx.lineTo(x, 99); ctx.stroke(); });
      }
    },
    {
      id: 'om', name: 'Om', tags: ['hindu'],
      draw: function (ctx, c) { glyph(ctx, 'ॐ', c.p, 86); }
    },
    {
      id: 'swastik', name: 'Swastik', tags: ['hindu'],
      draw: function (ctx, c) {
        ctx.strokeStyle = c.p; ctx.lineWidth = 11; ctx.lineCap = 'square'; ctx.lineJoin = 'miter';
        ctx.beginPath();
        ctx.moveTo(50, 14); ctx.lineTo(50, 86);
        ctx.moveTo(14, 50); ctx.lineTo(86, 50);
        ctx.moveTo(50, 14); ctx.lineTo(78, 14);
        ctx.moveTo(50, 86); ctx.lineTo(22, 86);
        ctx.moveTo(14, 50); ctx.lineTo(14, 22);
        ctx.moveTo(86, 50); ctx.lineTo(86, 78);
        ctx.stroke();
      }
    },
    {
      id: 'kalash', name: 'Kalash', tags: ['puja'],
      draw: function (ctx, c) {
        path(ctx, 'M26,44 C26,74 34,92 50,92 C66,92 74,74 74,44 Z', c.p);
        path(ctx, 'M20,38 h60 a5,5 0 0 1 0,10 h-60 a5,5 0 0 1 0,-10 Z', c.s);
        path(ctx, 'M50,10 C56,18 60,24 60,30 C60,37 55,42 50,42 C45,42 40,37 40,30 C40,24 44,18 50,10 Z', '#8D6E63');
        // mango leaves
        ctx.fillStyle = '#2E7D32';
        [[-1, -26], [1, -26], [-1, -14], [1, -14]].forEach(function (o) {
          ctx.save(); ctx.translate(50, 40); ctx.rotate(o[0] * 0.7);
          ctx.beginPath(); ctx.ellipse(o[0] * 12, o[1] * 0.3, 7, 14, o[0] * 0.4, 0, Math.PI * 2); ctx.fill();
          ctx.restore();
        });
        ctx.strokeStyle = c.a; ctx.lineWidth = 4;
        ctx.beginPath(); ctx.moveTo(30, 62); ctx.quadraticCurveTo(50, 70, 70, 62); ctx.stroke();
      }
    },
    {
      id: 'coconut', name: 'Coconut', tags: ['puja', 'pongal'],
      draw: function (ctx, c) {
        ctx.fillStyle = '#2E7D32';
        for (var i = 0; i < 5; i++) {
          ctx.save(); ctx.translate(50, 34); ctx.rotate(-1.2 + i * 0.6);
          ctx.beginPath(); ctx.ellipse(0, -18, 6, 20, 0, 0, Math.PI * 2); ctx.fill();
          ctx.restore();
        }
        circle(ctx, 50, 62, 28, c.p);
        ctx.fillStyle = c.s;
        circle(ctx, 42, 54, 4, c.s); circle(ctx, 56, 52, 4, c.s); circle(ctx, 50, 62, 4, c.s);
      }
    },
    {
      id: 'mandala', name: 'Mandala', tags: ['pattern'],
      draw: function (ctx, c) {
        ctx.strokeStyle = c.p; ctx.lineWidth = 2.5;
        [44, 34, 24, 14].forEach(function (r, i) {
          ctx.strokeStyle = i % 2 ? c.s : c.p;
          ctx.beginPath(); ctx.arc(50, 50, r, 0, Math.PI * 2); ctx.stroke();
        });
        for (var i = 0; i < 16; i++) {
          var a = (Math.PI * 2 * i) / 16;
          ctx.strokeStyle = c.a; ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(50 + Math.cos(a) * 24, 50 + Math.sin(a) * 24);
          ctx.lineTo(50 + Math.cos(a) * 44, 50 + Math.sin(a) * 44);
          ctx.stroke();
          circle(ctx, 50 + Math.cos(a) * 48, 50 + Math.sin(a) * 48, 2.4, c.p);
        }
        circle(ctx, 50, 50, 7, c.a);
      }
    },
    {
      id: 'confetti', name: 'Confetti', tags: ['party'],
      draw: function (ctx, c) {
        var cols = [c.p, c.s, c.a, '#FFFFFF'];
        var seed = 7;
        function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
        for (var i = 0; i < 26; i++) {
          var x = rnd() * 92 + 4, y = rnd() * 92 + 4, r = rnd() * Math.PI;
          ctx.save(); ctx.translate(x, y); ctx.rotate(r);
          ctx.fillStyle = cols[i % 4];
          if (i % 3 === 0) ctx.fillRect(-5, -2.5, 10, 5);
          else if (i % 3 === 1) { ctx.beginPath(); ctx.arc(0, 0, 3.4, 0, Math.PI * 2); ctx.fill(); }
          else { starPath(ctx, 0, 0, 5, 6, 2.6, 0); ctx.fill(); }
          ctx.restore();
        }
      }
    },
    {
      id: 'hearts', name: 'Hearts', tags: ['love'],
      draw: function (ctx, c) {
        function heart(x, y, s, col) {
          ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = col;
          ctx.beginPath();
          ctx.moveTo(0, 12);
          ctx.bezierCurveTo(-18, -2, -12, -20, 0, -10);
          ctx.bezierCurveTo(12, -20, 18, -2, 0, 12);
          ctx.closePath(); ctx.fill(); ctx.restore();
        }
        heart(46, 48, 2.4, c.p); heart(80, 26, 1.1, c.a); heart(22, 78, 1.3, c.s);
      }
    },
    {
      id: 'star', name: 'Star', tags: ['all'],
      draw: function (ctx, c) {
        starPath(ctx, 50, 50, 5, 46, 19, 0); ctx.fillStyle = c.a; ctx.fill();
        starPath(ctx, 50, 50, 5, 26, 11, 0); ctx.fillStyle = c.p; ctx.fill();
      }
    },
    {
      id: 'sun', name: 'Sun', tags: ['chhath', 'sankranti'],
      draw: function (ctx, c) {
        ctx.strokeStyle = c.a; ctx.lineWidth = 4; ctx.lineCap = 'round';
        for (var i = 0; i < 12; i++) {
          var a = (Math.PI * 2 * i) / 12;
          ctx.beginPath();
          ctx.moveTo(50 + Math.cos(a) * 32, 50 + Math.sin(a) * 32);
          ctx.lineTo(50 + Math.cos(a) * 46, 50 + Math.sin(a) * 46);
          ctx.stroke();
        }
        circle(ctx, 50, 50, 26, c.p);
        circle(ctx, 50, 50, 18, c.a);
      }
    },
    {
      id: 'crescent', name: 'Crescent', tags: ['eid'],
      draw: function (ctx, c) {
        ctx.save();
        ctx.fillStyle = c.a;
        ctx.beginPath(); ctx.arc(48, 50, 36, 0, Math.PI * 2); ctx.fill();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath(); ctx.arc(64, 42, 32, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
        starPath(ctx, 78, 74, 5, 12, 5, 0); ctx.fillStyle = c.a; ctx.fill();
      }
    },
    {
      id: 'kite', name: 'Kite', tags: ['sankranti'],
      draw: function (ctx, c) {
        ctx.fillStyle = c.p;
        ctx.beginPath(); ctx.moveTo(50, 6); ctx.lineTo(84, 40); ctx.lineTo(50, 74); ctx.lineTo(16, 40); ctx.closePath(); ctx.fill();
        ctx.fillStyle = c.a;
        ctx.beginPath(); ctx.moveTo(50, 6); ctx.lineTo(84, 40); ctx.lineTo(50, 40); ctx.closePath(); ctx.fill();
        ctx.fillStyle = c.s;
        ctx.beginPath(); ctx.moveTo(50, 74); ctx.lineTo(16, 40); ctx.lineTo(50, 40); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = c.s; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.moveTo(50, 74); ctx.quadraticCurveTo(40, 86, 52, 94); ctx.stroke();
      }
    },
    {
      id: 'tricolour', name: 'Tiranga', tags: ['patriotic'],
      draw: function (ctx, c) {
        ctx.fillStyle = '#FF9933'; ctx.fillRect(8, 24, 84, 17);
        ctx.fillStyle = '#FFFFFF'; ctx.fillRect(8, 41, 84, 17);
        ctx.fillStyle = '#138808'; ctx.fillRect(8, 58, 84, 17);
        ctx.strokeStyle = '#0B2545'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(50, 49.5, 7, 0, Math.PI * 2); ctx.stroke();
        for (var i = 0; i < 12; i++) {
          var a = (Math.PI * 2 * i) / 12;
          ctx.beginPath(); ctx.moveTo(50, 49.5); ctx.lineTo(50 + Math.cos(a) * 7, 49.5 + Math.sin(a) * 7); ctx.lineWidth = 1; ctx.stroke();
        }
      }
    },
    {
      id: 'ribbon', name: 'Ribbon Banner', tags: ['all'],
      draw: function (ctx, c) {
        path(ctx, 'M4,34 h92 v32 h-92 Z', c.p);
        path(ctx, 'M4,34 l-0,32 l-4,-16 Z', c.s);
        path(ctx, 'M96,34 l0,32 l4,-16 Z', c.s);
        ctx.fillStyle = c.a; ctx.fillRect(4, 62, 92, 4);
      }
    }
  ];

  /* --- extended sticker pack -------------------------------------------- */
  FS.STICKERS = FS.STICKERS.concat([
    {
      id: 'ladoo', name: 'Ladoo', tags: ['sweets'],
      draw: function (ctx, c) {
        path(ctx, 'M10,62 h80 a6,6 0 0 1 -3,10 H13 a6,6 0 0 1 -3,-10 Z', c.s);
        [[32, 50], [68, 50], [50, 40]].forEach(function (p2, i) {
          circle(ctx, p2[0], p2[1] + 12, 19, i === 2 ? c.a : c.p);
          for (var k = 0; k < 7; k++) {
            var a = (Math.PI * 2 * k) / 7;
            circle(ctx, p2[0] + Math.cos(a) * 11, p2[1] + 12 + Math.sin(a) * 11, 2, 'rgba(255,255,255,.45)');
          }
        });
      }
    },
    {
      id: 'mithai-box', name: 'Sweet Box', tags: ['sweets', 'gift'],
      draw: function (ctx, c) {
        path(ctx, 'M12,40 h76 v46 a4,4 0 0 1 -4,4 H16 a4,4 0 0 1 -4,-4 Z', c.p);
        path(ctx, 'M8,28 h84 a4,4 0 0 1 4,4 v10 H4 V32 a4,4 0 0 1 4,-4 Z', c.s);
        [[30, 58], [50, 58], [70, 58], [40, 76], [60, 76]].forEach(function (p2) {
          circle(ctx, p2[0], p2[1], 8, c.a);
        });
      }
    },
    {
      id: 'dhol', name: 'Dhol', tags: ['music', 'garba'],
      draw: function (ctx, c) {
        path(ctx, 'M22,26 h56 c6,0 10,10 10,24 s-4,24 -10,24 H22 c-6,0 -10,-10 -10,-24 s4,-24 10,-24 Z', c.p);
        ctx.strokeStyle = c.a; ctx.lineWidth = 3;
        for (var i = 0; i < 6; i++) {
          ctx.beginPath();
          ctx.moveTo(20, 32 + i * 7); ctx.lineTo(80, 40 + i * 7); ctx.stroke();
        }
        path(ctx, 'M12,26 a10,24 0 0 0 0,48 a10,24 0 0 0 0,-48 Z', c.s);
        path(ctx, 'M88,26 a10,24 0 0 1 0,48 a10,24 0 0 1 0,-48 Z', c.s);
        ctx.strokeStyle = '#5D4037'; ctx.lineWidth = 4; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(70, 82); ctx.lineTo(92, 92); ctx.stroke();
      }
    },
    {
      id: 'flute', name: 'Flute', tags: ['krishna'],
      draw: function (ctx, c) {
        ctx.save(); ctx.translate(50, 50); ctx.rotate(-0.42); ctx.translate(-50, -50);
        path(ctx, 'M6,44 h88 a6,6 0 0 1 0,12 H6 a6,6 0 0 1 0,-12 Z', c.p);
        ctx.fillStyle = c.s;
        [26, 38, 50, 62, 74].forEach(function (x) { circle(ctx, x, 50, 3, c.s); });
        ctx.restore();
        ctx.fillStyle = c.a;
        starPath(ctx, 84, 24, 5, 9, 4, 0); ctx.fill();
      }
    },
    {
      id: 'peacock', name: 'Peacock Feather', tags: ['krishna'],
      draw: function (ctx, c) {
        ctx.strokeStyle = '#2E7D32'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(50, 96); ctx.quadraticCurveTo(52, 60, 50, 44); ctx.stroke();
        ctx.fillStyle = '#1B5E20';
        for (var i = 0; i < 14; i++) {
          var t = i / 13, y = 44 + t * 48;
          ctx.save(); ctx.translate(50, y);
          [-1, 1].forEach(function (s) {
            ctx.beginPath(); ctx.ellipse(s * 8, 0, 9, 2, s * 0.5, 0, Math.PI * 2); ctx.fill();
          });
          ctx.restore();
        }
        ctx.fillStyle = '#00897B';
        ctx.beginPath(); ctx.ellipse(50, 30, 22, 26, 0, 0, Math.PI * 2); ctx.fill();
        circle(ctx, 50, 32, 15, '#1565C0');
        circle(ctx, 50, 33, 9, c.a);
        circle(ctx, 50, 34, 4, '#4A148C');
      }
    },
    {
      id: 'temple', name: 'Temple', tags: ['puja'],
      draw: function (ctx, c) {
        path(ctx, 'M50,4 L74,40 H26 Z', c.a);
        path(ctx, 'M20,40 h60 v6 H20 Z', c.s);
        path(ctx, 'M24,46 h52 v42 H24 Z', c.p);
        path(ctx, 'M40,60 h20 v28 H40 Z', c.s);
        path(ctx, 'M14,88 h72 v8 H14 Z', c.s);
        circle(ctx, 50, 6, 4, c.a);
      }
    },
    {
      id: 'bell', name: 'Temple Bell', tags: ['puja'],
      draw: function (ctx, c) {
        ctx.strokeStyle = c.s; ctx.lineWidth = 4;
        ctx.beginPath(); ctx.moveTo(50, 4); ctx.lineTo(50, 16); ctx.stroke();
        circle(ctx, 50, 18, 6, c.s);
        path(ctx, 'M50,24 C70,24 78,44 80,72 H20 C22,44 30,24 50,24 Z', c.p);
        path(ctx, 'M16,72 h68 a4,4 0 0 1 0,8 H16 a4,4 0 0 1 0,-8 Z', c.a);
        circle(ctx, 50, 88, 7, c.s);
      }
    },
    {
      id: 'incense', name: 'Incense', tags: ['puja'],
      draw: function (ctx, c) {
        ctx.strokeStyle = c.s; ctx.lineWidth = 3;
        [40, 50, 60].forEach(function (x, i) {
          ctx.beginPath(); ctx.moveTo(x, 84); ctx.lineTo(x + (i - 1) * 6, 34); ctx.stroke();
        });
        ctx.fillStyle = c.a;
        [34, 50, 66].forEach(function (x) { circle(ctx, x, 32, 3, c.a); });
        ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(50, 30); ctx.bezierCurveTo(62, 22, 38, 16, 50, 6); ctx.stroke();
        path(ctx, 'M24,84 h52 a6,6 0 0 1 -4,10 H28 a6,6 0 0 1 -4,-10 Z', c.p);
      }
    },
    {
      id: 'torana', name: 'Toran', tags: ['door', 'diwali'],
      draw: function (ctx, c) {
        ctx.strokeStyle = c.p; ctx.lineWidth = 5;
        ctx.beginPath(); ctx.moveTo(2, 18); ctx.quadraticCurveTo(50, 34, 98, 18); ctx.stroke();
        for (var i = 0; i <= 8; i++) {
          var t = i / 8;
          var x = 2 + t * 96;
          var y = 18 + 16 * (1 - Math.pow(2 * t - 1, 2));
          var len = 20 + (i % 2) * 14;
          ctx.strokeStyle = i % 2 ? c.s : c.a; ctx.lineWidth = 3;
          ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + len); ctx.stroke();
          ctx.fillStyle = i % 2 ? c.a : c.s;
          ctx.beginPath(); ctx.ellipse(x, y + len + 5, 5, 8, 0, 0, Math.PI * 2); ctx.fill();
        }
      }
    },
    {
      id: 'garland', name: 'Marigold Garland', tags: ['puja'],
      draw: function (ctx, c) {
        for (var i = 0; i <= 16; i++) {
          var t = i / 16;
          var x = 4 + t * 92;
          var y = 20 + 46 * Math.sin(Math.PI * t);
          circle(ctx, x, y, 7, i % 2 ? c.a : c.p);
          circle(ctx, x, y, 3, 'rgba(255,255,255,.35)');
        }
      }
    },
    {
      id: 'balloon', name: 'Balloons', tags: ['party'],
      draw: function (ctx, c) {
        [[30, 34, c.p], [56, 26, c.a], [72, 44, c.s]].forEach(function (b) {
          ctx.fillStyle = b[2];
          ctx.beginPath(); ctx.ellipse(b[0], b[1], 15, 19, 0, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.moveTo(b[0], b[1] + 19); ctx.quadraticCurveTo(b[0] + 6, 72, 50, 94); ctx.stroke();
        });
      }
    },
    {
      id: 'crown', name: 'Crown', tags: ['royal'],
      draw: function (ctx, c) {
        path(ctx, 'M12,72 L18,26 L34,46 L50,18 L66,46 L82,26 L88,72 Z', c.a);
        path(ctx, 'M12,72 h76 v12 H12 Z', c.p);
        circle(ctx, 18, 24, 5, c.s); circle(ctx, 50, 16, 5, c.s); circle(ctx, 82, 24, 5, c.s);
      }
    },
    {
      id: 'bow', name: 'Ribbon Bow', tags: ['gift'],
      draw: function (ctx, c) {
        path(ctx, 'M50,50 C30,26 6,30 10,48 C14,66 36,64 50,50 Z', c.p);
        path(ctx, 'M50,50 C70,26 94,30 90,48 C86,66 64,64 50,50 Z', c.p);
        path(ctx, 'M44,54 L28,92 L46,80 Z', c.s);
        path(ctx, 'M56,54 L72,92 L54,80 Z', c.s);
        circle(ctx, 50, 50, 9, c.a);
      }
    },
    {
      id: 'medal', name: 'Medal', tags: ['award'],
      draw: function (ctx, c) {
        path(ctx, 'M30,4 L46,44 H36 L22,8 Z', c.p);
        path(ctx, 'M70,4 L54,44 H64 L78,8 Z', c.s);
        circle(ctx, 50, 66, 26, c.a);
        circle(ctx, 50, 66, 19, 'rgba(255,255,255,.35)');
        starPath(ctx, 50, 66, 5, 14, 6, 0); ctx.fillStyle = c.p; ctx.fill();
      }
    },
    {
      id: 'rocket', name: 'Cracker Rocket', tags: ['diwali'],
      draw: function (ctx, c) {
        path(ctx, 'M50,4 C60,18 64,30 64,42 H36 C36,30 40,18 50,4 Z', c.p);
        path(ctx, 'M36,42 h28 v10 H36 Z', c.s);
        ctx.strokeStyle = c.s; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(50, 52); ctx.lineTo(50, 84); ctx.stroke();
        ctx.fillStyle = c.a;
        for (var i = 0; i < 7; i++) {
          var a = Math.PI + (Math.PI * i) / 6;
          ctx.beginPath();
          ctx.moveTo(50, 86);
          ctx.lineTo(50 + Math.cos(a) * 16, 86 - Math.sin(a) * 14);
          ctx.lineTo(50 + Math.cos(a + .3) * 16, 86 - Math.sin(a + .3) * 14);
          ctx.closePath(); ctx.fill();
        }
      }
    },
    {
      id: 'phuljhadi', name: 'Sparkler', tags: ['diwali'],
      draw: function (ctx, c) {
        ctx.strokeStyle = c.s; ctx.lineWidth = 4; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(28, 92); ctx.lineTo(58, 46); ctx.stroke();
        ctx.strokeStyle = c.a; ctx.lineWidth = 2.5;
        for (var i = 0; i < 14; i++) {
          var a = (Math.PI * 2 * i) / 14;
          var r1 = 8 + (i % 3) * 4, r2 = 20 + (i % 4) * 6;
          ctx.beginPath();
          ctx.moveTo(62 + Math.cos(a) * r1, 40 + Math.sin(a) * r1);
          ctx.lineTo(62 + Math.cos(a) * r2, 40 + Math.sin(a) * r2);
          ctx.stroke();
        }
        circle(ctx, 62, 40, 6, '#FFF8E1');
      }
    },
    {
      id: 'moon-stars', name: 'Moon & Stars', tags: ['eid', 'night'],
      draw: function (ctx, c) {
        ctx.save();
        ctx.fillStyle = c.a;
        ctx.beginPath(); ctx.arc(42, 44, 28, 0, Math.PI * 2); ctx.fill();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath(); ctx.arc(54, 36, 25, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
        [[78, 24, 9], [86, 56, 6], [66, 84, 7], [24, 84, 5]].forEach(function (s) {
          starPath(ctx, s[0], s[1], 5, s[2], s[2] * .45, 0);
          ctx.fillStyle = c.p; ctx.fill();
        });
      }
    },
    {
      id: 'mosque', name: 'Mosque', tags: ['eid'],
      draw: function (ctx, c) {
        path(ctx, 'M50,20 C64,30 70,40 70,50 H30 C30,40 36,30 50,20 Z', c.a);
        path(ctx, 'M26,50 h48 v38 H26 Z', c.p);
        path(ctx, 'M38,66 C38,58 44,54 50,54 C56,54 62,58 62,66 v22 H38 Z', c.s);
        path(ctx, 'M12,44 h10 v44 H12 Z', c.p);
        path(ctx, 'M88,44 h-10 v44 h10 Z', c.p);
        path(ctx, 'M17,30 C22,36 24,40 24,44 H10 C10,40 12,36 17,30 Z', c.a);
        path(ctx, 'M83,30 C88,36 90,40 90,44 H76 C76,40 78,36 83,30 Z', c.a);
        path(ctx, 'M6,88 h88 v8 H6 Z', c.s);
        circle(ctx, 50, 14, 4, c.a);
      }
    },
    {
      id: 'tree', name: 'Christmas Tree', tags: ['christmas'],
      draw: function (ctx, c) {
        path(ctx, 'M50,6 L70,34 H30 Z', '#2E7D32');
        path(ctx, 'M50,24 L76,56 H24 Z', '#388E3C');
        path(ctx, 'M50,44 L84,80 H16 Z', '#43A047');
        path(ctx, 'M42,80 h16 v14 H42 Z', '#5D4037');
        starPath(ctx, 50, 8, 5, 9, 4, 0); ctx.fillStyle = c.a; ctx.fill();
        [[40, 44], [60, 50], [36, 68], [64, 70], [50, 60]].forEach(function (p2, i) {
          circle(ctx, p2[0], p2[1], 4, i % 2 ? c.p : c.a);
        });
      }
    },
    {
      id: 'snowflake', name: 'Snowflake', tags: ['christmas'],
      draw: function (ctx, c) {
        ctx.strokeStyle = c.s || '#FFFFFF'; ctx.lineWidth = 4; ctx.lineCap = 'round';
        for (var i = 0; i < 6; i++) {
          var a = (Math.PI * i) / 3;
          ctx.save(); ctx.translate(50, 50); ctx.rotate(a);
          ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -42); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(0, -22); ctx.lineTo(-9, -32); ctx.moveTo(0, -22); ctx.lineTo(9, -32); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(0, -34); ctx.lineTo(-6, -41); ctx.moveTo(0, -34); ctx.lineTo(6, -41); ctx.stroke();
          ctx.restore();
        }
        circle(ctx, 50, 50, 6, c.a);
      }
    },
    {
      id: 'santa-hat', name: 'Santa Hat', tags: ['christmas'],
      draw: function (ctx, c) {
        path(ctx, 'M14,66 C14,36 34,16 56,16 C76,16 88,28 88,40 C88,52 76,58 62,60 L20,70 Z', '#D32F2F');
        path(ctx, 'M8,66 h64 a10,10 0 0 1 0,20 H8 a10,10 0 0 1 0,-20 Z', '#FFFFFF');
        circle(ctx, 90, 40, 11, '#FFFFFF');
      }
    },
    {
      id: 'cake', name: 'Cake', tags: ['party'],
      draw: function (ctx, c) {
        path(ctx, 'M16,54 h68 v32 a4,4 0 0 1 -4,4 H20 a4,4 0 0 1 -4,-4 Z', c.p);
        path(ctx, 'M16,54 c8,-8 16,4 24,-2 c8,-6 16,6 24,0 c8,-6 12,4 20,2 v10 H16 Z', c.a);
        ctx.strokeStyle = c.s; ctx.lineWidth = 4;
        [36, 50, 64].forEach(function (x) {
          ctx.beginPath(); ctx.moveTo(x, 46); ctx.lineTo(x, 30); ctx.stroke();
          ctx.fillStyle = '#FFD54F';
          ctx.beginPath(); ctx.ellipse(x, 24, 4, 7, 0, 0, Math.PI * 2); ctx.fill();
        });
      }
    },
    {
      id: 'trophy', name: 'Trophy', tags: ['award'],
      draw: function (ctx, c) {
        path(ctx, 'M28,12 h44 v22 c0,14 -10,22 -22,22 S28,48 28,34 Z', c.a);
        ctx.strokeStyle = c.a; ctx.lineWidth = 5;
        ctx.beginPath(); ctx.moveTo(28, 18); ctx.quadraticCurveTo(10, 20, 20, 36); ctx.quadraticCurveTo(24, 42, 30, 42); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(72, 18); ctx.quadraticCurveTo(90, 20, 80, 36); ctx.quadraticCurveTo(76, 42, 70, 42); ctx.stroke();
        path(ctx, 'M44,56 h12 v14 H44 Z', c.p);
        path(ctx, 'M30,70 h40 v8 H30 Z', c.p);
        path(ctx, 'M24,78 h52 v10 H24 Z', c.s);
      }
    },
    {
      id: 'bow-arrow', name: 'Bow & Arrow', tags: ['dussehra'],
      draw: function (ctx, c) {
        ctx.strokeStyle = c.p; ctx.lineWidth = 6; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.arc(30, 50, 38, -1.15, 1.15); ctx.stroke();
        ctx.strokeStyle = c.s; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.moveTo(45, 15); ctx.lineTo(45, 85); ctx.stroke();
        ctx.strokeStyle = c.a; ctx.lineWidth = 5;
        ctx.beginPath(); ctx.moveTo(28, 50); ctx.lineTo(92, 50); ctx.stroke();
        ctx.fillStyle = c.a;
        ctx.beginPath(); ctx.moveTo(98, 50); ctx.lineTo(84, 43); ctx.lineTo(84, 57); ctx.closePath(); ctx.fill();
        ctx.beginPath(); ctx.moveTo(28, 50); ctx.lineTo(38, 42); ctx.lineTo(38, 58); ctx.closePath(); ctx.fill();
      }
    },
    {
      id: 'trishul', name: 'Trishul', tags: ['shiva'],
      draw: function (ctx, c) {
        ctx.strokeStyle = c.p; ctx.lineWidth = 6; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(50, 30); ctx.lineTo(50, 96); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(24, 34); ctx.lineTo(76, 34); ctx.stroke();
        [24, 50, 76].forEach(function (x, i) {
          ctx.fillStyle = c.a;
          ctx.beginPath();
          ctx.moveTo(x, i === 1 ? 2 : 12);
          ctx.lineTo(x - 6, 34); ctx.lineTo(x + 6, 34);
          ctx.closePath(); ctx.fill();
        });
        ctx.strokeStyle = c.s; ctx.lineWidth = 4;
        ctx.beginPath(); ctx.moveTo(40, 48); ctx.lineTo(60, 48); ctx.stroke();
      }
    },
    {
      id: 'elephant', name: 'Elephant', tags: ['ganesh'],
      draw: function (ctx, c) {
        path(ctx, 'M30,40 C30,24 44,16 56,16 C70,16 82,26 82,42 C82,56 72,64 60,64 H40 C34,64 30,54 30,40 Z', c.p);
        path(ctx, 'M30,34 C18,30 10,38 14,48 C18,58 28,56 32,50 Z', c.s);
        path(ctx, 'M40,60 C36,70 34,82 40,92 C44,98 52,94 50,86 C48,78 48,68 50,62 Z', c.p);
        circle(ctx, 58, 36, 4, '#3E2723');
        path(ctx, 'M64,62 l6,16 M56,64 l2,16', null, c.s, 4);
        ctx.fillStyle = c.a;
        circle(ctx, 68, 22, 6, c.a);
      }
    },
    {
      id: 'matki', name: 'Matki', tags: ['janmashtami'],
      draw: function (ctx, c) {
        path(ctx, 'M28,36 C16,46 14,62 22,74 C30,88 70,88 78,74 C86,62 84,46 72,36 Z', c.p);
        path(ctx, 'M24,32 h52 a6,6 0 0 1 0,10 H24 a6,6 0 0 1 0,-10 Z', c.s);
        ctx.strokeStyle = c.a; ctx.lineWidth = 4;
        ctx.beginPath(); ctx.moveTo(20, 58); ctx.quadraticCurveTo(50, 68, 80, 58); ctx.stroke();
        ctx.strokeStyle = c.s; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(50, 6); ctx.lineTo(50, 30); ctx.stroke();
        circle(ctx, 50, 6, 5, c.a);
      }
    },
    {
      id: 'dandiya', name: 'Dandiya', tags: ['navratri'],
      draw: function (ctx, c) {
        [[-0.35, -8], [0.35, 8]].forEach(function (o, i) {
          ctx.save(); ctx.translate(50 + o[1], 50); ctx.rotate(o[0]);
          ctx.fillStyle = i ? c.s : c.p;
          roundRect(ctx, -5, -40, 10, 80, 5); ctx.fill();
          ctx.fillStyle = c.a;
          roundRect(ctx, -6, -40, 12, 10, 4); ctx.fill();
          roundRect(ctx, -6, 30, 12, 10, 4); ctx.fill();
          ctx.restore();
        });
      }
    },
    {
      id: 'thali', name: 'Puja Thali', tags: ['puja'],
      draw: function (ctx, c) {
        circle(ctx, 50, 56, 40, c.s);
        circle(ctx, 50, 56, 33, c.p);
        circle(ctx, 34, 50, 8, c.a);
        circle(ctx, 66, 50, 8, '#D32F2F');
        path(ctx, 'M50,64 C56,70 58,74 58,78 C58,83 54,86 50,86 C46,86 42,83 42,78 C42,74 44,70 50,64 Z', c.a);
        ctx.strokeStyle = 'rgba(255,255,255,.45)'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(50, 56, 37, 0, Math.PI * 2); ctx.stroke();
      }
    },
    {
      id: 'sugarcane', name: 'Sugarcane', tags: ['pongal', 'chhath'],
      draw: function (ctx, c) {
        ctx.save(); ctx.translate(50, 50); ctx.rotate(0.18); ctx.translate(-50, -50);
        ctx.fillStyle = '#7CB342';
        roundRect(ctx, 42, 22, 16, 74, 6); ctx.fill();
        ctx.strokeStyle = '#33691E'; ctx.lineWidth = 3;
        [38, 52, 66, 80].forEach(function (y) { ctx.beginPath(); ctx.moveTo(42, y); ctx.lineTo(58, y); ctx.stroke(); });
        ctx.fillStyle = '#2E7D32';
        [[-1, -0.6], [1, -0.6], [-1, -0.1], [1, -0.1]].forEach(function (o) {
          ctx.save(); ctx.translate(50, 24); ctx.rotate(o[0] * (0.7 + o[1]));
          ctx.beginPath(); ctx.ellipse(0, -18, 5, 20, 0, 0, Math.PI * 2); ctx.fill();
          ctx.restore();
        });
        ctx.restore();
      }
    },
    {
      id: 'lotus', name: 'Lotus', tags: ['puja'],
      draw: function (ctx, c) {
        for (var i = 0; i < 5; i++) {
          var a = -Math.PI / 2 + (i - 2) * 0.5;
          ctx.save(); ctx.translate(50, 74); ctx.rotate(a);
          ctx.fillStyle = i % 2 ? c.s : c.p;
          ctx.beginPath(); ctx.ellipse(0, -24, 11, 26, 0, 0, Math.PI * 2); ctx.fill();
          ctx.restore();
        }
        ctx.fillStyle = c.a;
        ctx.beginPath(); ctx.ellipse(50, 74, 34, 9, 0, 0, Math.PI * 2); ctx.fill();
      }
    },
    {
      id: 'lights', name: 'String Lights', tags: ['diwali', 'christmas'],
      draw: function (ctx, c) {
        ctx.strokeStyle = '#4E342E'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(2, 20); ctx.quadraticCurveTo(50, 52, 98, 20); ctx.stroke();
        var cols = [c.p, c.a, c.s, '#4FC3F7', '#EC407A'];
        for (var i = 0; i <= 8; i++) {
          var t = i / 8;
          var x = 2 + t * 96;
          var y = 20 + 32 * (1 - Math.pow(2 * t - 1, 2)) * 0.5 + 16 * (1 - Math.pow(2 * t - 1, 2)) * 0.5;
          ctx.fillStyle = cols[i % 5];
          ctx.beginPath(); ctx.ellipse(x, y + 12, 6, 9, 0, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = 'rgba(255,255,255,.5)';
          circle(ctx, x - 2, y + 9, 2, 'rgba(255,255,255,.5)');
        }
      }
    },
    {
      id: 'corner', name: 'Corner Ornament', tags: ['frame'],
      draw: function (ctx, c) {
        ctx.strokeStyle = c.a; ctx.lineWidth = 4; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(6, 46); ctx.lineTo(6, 10); ctx.lineTo(46, 10); ctx.stroke();
        ctx.strokeStyle = c.p; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.moveTo(14, 40); ctx.lineTo(14, 18); ctx.lineTo(40, 18); ctx.stroke();
        for (var i = 0; i < 4; i++) {
          petal(ctx, 24, 28, (Math.PI * 2 * i) / 4 + 0.8, 16, 6); ctx.fillStyle = c.a; ctx.fill();
        }
        circle(ctx, 24, 28, 4, c.s);
      }
    },
    {
      id: 'quote', name: 'Quote Mark', tags: ['text'],
      draw: function (ctx, c) {
        ctx.fillStyle = c.a;
        [0, 40].forEach(function (dx) {
          path(ctx, 'M' + (14 + dx) + ',26 h22 v22 h-11 c0,10 4,14 11,15 v11 c-16,-1 -22,-11 -22,-26 Z', c.a);
        });
      }
    }
  ]);

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  FS.getSticker = function (id) {
    for (var i = 0; i < FS.STICKERS.length; i++) if (FS.STICKERS[i].id === id) return FS.STICKERS[i];
    return null;
  };

  /* Draw a sticker into ctx at (0,0) with given pixel size. */
  FS.drawSticker = function (ctx, id, size, colors) {
    var s = FS.getSticker(id);
    if (!s) return;
    var c = colors || {};
    c = { p: c.p || '#E65100', s: c.s || '#B71C1C', a: c.a || '#FFC107' };
    ctx.save();
    ctx.scale(size / 100, size / 100);
    try { s.draw(ctx, c); } catch (e) { /* never break the canvas */ }
    ctx.restore();
  };
})(window);
