/* ============================================================================
   Festival Studio — templates.js
   A template = a layout function + a festival. Layouts are written once and
   reused across every festival, so the library grows automatically whenever a
   festival is added to festivals.js.

   Every text/image object carries a `role` so the customisation panel can
   inject the user's name, business name, phone, website, message, photo, logo.
   ========================================================================== */
(function (global) {
  'use strict';
  var FS = (global.FS = global.FS || {});

  FS.TEMPLATE_CATEGORIES = [
    'Festival Wishes', 'Navratri Special', 'Temple & Darshan', 'Business Greetings', 'Personal Greetings', 'Festival Offers',
    'Social Media Posts', 'WhatsApp Status', 'Instagram Posts', 'Instagram Stories', 'Facebook Posts'
  ];

  var PATTERN_MAP = {
    rangoli: 'rangoli', splash: 'confetti', islamic: 'islamic', feather: 'dots', mandala: 'mandala',
    rays: 'rays', sun: 'rays', kites: 'dots', kolam: 'grid', pookalam: 'mandala', trishul: 'dots',
    snow: 'dots', confetti: 'confetti', chakra: 'stripes', dots: 'dots'
  };
  function pat(f) { return PATTERN_MAP[f.pattern] || 'dots'; }

  function grad(f, i, angle) {
    var g = f.gradients[i % f.gradients.length];
    return {
      type: 'linear', angle: angle == null ? 145 : angle,
      stops: g.map(function (c, k) { return { c: c, p: k / (g.length - 1) }; }),
      pattern: pat(f), patternColor: '#FFFFFF', patternAlpha: .10, vignette: .3
    };
  }

  function T(o) { return FS.defaults.text(o); }
  function S(o) { return FS.defaults.shape(o); }
  function K(o) { return FS.defaults.sticker(o); }
  function I(o) { return FS.defaults.image(o); }

  function stickerColors(f) { return { p: f.palette.accent, s: f.palette.accent2, a: f.palette.accent }; }

  function pick(arr, i) { return arr && arr.length ? arr[i % arr.length] : ''; }

  function defaults(fields) {
    return Object.assign({
      name: 'Your Name',
      business: 'Your Business Name',
      phone: '+91 90000 00000',
      website: 'www.yoursite.com',
      address: 'Your City, India',
      offer: 'FLAT 25% OFF',
      message: ''
    }, fields || {});
  }

  /* ------------------------------------------------------------------ */
  /* LAYOUTS                                                             */
  /* ------------------------------------------------------------------ */
  var LAYOUTS = [
    /* 1 — Classic festival wish -------------------------------------- */
    {
      id: 'classic', label: 'Classic Wish', category: 'Festival Wishes', size: 'ig-square', lang: 'hi',
      build: function (f, d, W, H) {
        var wish = pick(f.wishes.hi, d.vi || 0) || pick(f.wishes.en, 0);
        var st = f.stickers;
        return {
          background: grad(f, 0, 150),
          objects: [
            S({ shape: 'circle', x: -W * .18, y: -H * .18, w: W * .55, h: W * .55, fill: f.palette.accent, opacity: .13, name: 'Glow' }),
            S({ shape: 'circle', x: W * .68, y: H * .74, w: W * .5, h: W * .5, fill: f.palette.accent2, opacity: .13, name: 'Glow 2' }),
            K({ sid: st[0], x: W * .04, y: H * .035, w: W * .17, h: W * .17, colors: stickerColors(f), name: 'Sticker' }),
            K({ sid: st[1] || st[0], x: W * .79, y: H * .035, w: W * .17, h: W * .17, colors: stickerColors(f), name: 'Sticker' }),
            T({
              role: 'title', text: f.name.toUpperCase(), font: 'Poppins', size: W * .045, weight: 600, ls: W * .012,
              color: f.palette.accent, x: W * .08, y: H * .215, w: W * .84, align: 'center', name: 'Festival name'
            }),
            S({ shape: 'line', x: W * .38, y: H * .28, w: W * .24, h: 6, fill: f.palette.accent, strokeW: 5, name: 'Divider' }),
            T({
              role: 'wish', text: wish, font: 'Tiro Devanagari Hindi', size: W * .072, weight: 400, lh: 1.5,
              color: '#FFFFFF', x: W * .09, y: H * .33, w: W * .82, align: 'center', name: 'Wish'
            }),
            T({
              role: 'name', text: d.name, font: 'Poppins', size: W * .046, weight: 600,
              color: f.palette.accent, x: W * .1, y: H * .74, w: W * .8, align: 'center', name: 'Your name'
            }),
            K({ sid: st[2] || st[0], x: W * .38, y: H * .83, w: W * .24, h: W * .24, colors: stickerColors(f), name: 'Bottom sticker' })
          ]
        };
      }
    },

    /* 2 — Business greeting ------------------------------------------ */
    {
      id: 'business', label: 'Business Greeting', category: 'Business Greetings', size: 'ig-square', lang: 'hi',
      build: function (f, d, W, H) {
        var wish = pick(f.wishes.hi, 0) || pick(f.wishes.en, 0);
        return {
          background: grad(f, 1, 120),
          objects: [
            S({ shape: 'roundrect', x: W * .06, y: H * .06, w: W * .88, h: H * .74, fill: 'rgba(255,255,255,.07)', strokeColor: f.palette.accent, strokeW: 4, radius: 34, name: 'Frame' }),
            I({ role: 'logo', x: W * .42, y: H * .095, w: W * .16, h: W * .16, radius: 999, name: 'Logo', fit: 'cover' }),
            T({
              role: 'business', text: d.business, font: 'Poppins', size: W * .054, weight: 700, ls: W * .002,
              color: '#FFFFFF', x: W * .1, y: H * .275, w: W * .8, align: 'center', name: 'Business name'
            }),
            T({
              role: 'title', text: 'wishes you a very happy ' + f.name, font: 'Poppins', size: W * .03, weight: 500,
              color: f.palette.accent, x: W * .12, y: H * .335, w: W * .76, align: 'center', name: 'Sub line'
            }),
            T({
              role: 'wish', text: wish, font: 'Tiro Devanagari Hindi', size: W * .056, weight: 400, lh: 1.55,
              color: '#FFFFFF', x: W * .1, y: H * .42, w: W * .8, align: 'center', name: 'Wish'
            }),
            K({ sid: f.stickers[0], x: W * .09, y: H * .62, w: W * .15, h: W * .15, colors: stickerColors(f), name: 'Sticker' }),
            K({ sid: f.stickers[1] || f.stickers[0], x: W * .76, y: H * .62, w: W * .15, h: W * .15, colors: stickerColors(f), name: 'Sticker' }),
            S({ shape: 'roundrect', x: W * .06, y: H * .845, w: W * .88, h: H * .1, fill: f.palette.accent, radius: 26, name: 'Contact bar' }),
            T({
              role: 'phone', text: '📞 ' + d.phone + '   •   ' + d.website, font: 'Poppins', size: W * .028, weight: 600,
              color: '#1A1008', x: W * .08, y: H * .875, w: W * .84, align: 'center', shadowOn: false, name: 'Contact'
            })
          ]
        };
      }
    },

    /* 3 — Personal photo greeting ------------------------------------ */
    {
      id: 'photo', label: 'Photo Greeting', category: 'Personal Greetings', size: 'ig-square', lang: 'hi',
      build: function (f, d, W, H) {
        var wish = pick(f.wishes.hi, 1) || pick(f.wishes.en, 0);
        return {
          background: grad(f, 2, 160),
          objects: [
            S({ shape: 'circle', x: W * .27, y: H * .07, w: W * .46, h: W * .46, fill: f.palette.accent, opacity: 1, name: 'Photo ring' }),
            I({ role: 'photo', x: W * .29, y: H * .085, w: W * .42, h: W * .42, radius: 999, name: 'Your photo', fit: 'cover' }),
            T({
              role: 'name', text: d.name, font: 'Poppins', size: W * .052, weight: 700,
              color: '#FFFFFF', x: W * .1, y: H * .55, w: W * .8, align: 'center', name: 'Your name'
            }),
            T({
              role: 'title', text: 'wishes you Happy ' + f.name, font: 'Poppins', size: W * .028, weight: 500,
              color: f.palette.accent, x: W * .12, y: H * .605, w: W * .76, align: 'center', name: 'Sub line'
            }),
            T({
              role: 'wish', text: wish, font: 'Tiro Devanagari Hindi', size: W * .05, weight: 400, lh: 1.5,
              color: 'rgba(255,255,255,.94)', x: W * .1, y: H * .67, w: W * .8, align: 'center', name: 'Wish'
            }),
            K({ sid: f.stickers[0], x: W * .05, y: H * .8, w: W * .18, h: W * .18, colors: stickerColors(f), name: 'Sticker' }),
            K({ sid: f.stickers[2] || f.stickers[0], x: W * .77, y: H * .8, w: W * .18, h: W * .18, colors: stickerColors(f), name: 'Sticker' })
          ]
        };
      }
    },

    /* 4 — Festival offer poster -------------------------------------- */
    {
      id: 'offer', label: 'Festival Offer', category: 'Festival Offers', size: 'ig-square', lang: 'en',
      build: function (f, d, W, H) {
        return {
          background: grad(f, 1, 135),
          objects: [
            S({ shape: 'roundrect', x: 0, y: 0, w: W, h: H * .17, fill: 'rgba(0,0,0,.28)', radius: 0, name: 'Top bar' }),
            I({ role: 'logo', x: W * .05, y: H * .035, w: W * .1, h: W * .1, radius: 18, name: 'Logo' }),
            T({
              role: 'business', text: d.business, font: 'Poppins', size: W * .038, weight: 700,
              color: '#FFFFFF', x: W * .17, y: H * .055, w: W * .78, align: 'left', name: 'Business name'
            }),
            T({
              role: 'title', text: f.name + ' Special', font: 'Poppins', size: W * .045, weight: 600, ls: W * .006,
              color: f.palette.accent, x: W * .08, y: H * .24, w: W * .84, align: 'center', name: 'Festival line'
            }),
            T({
              role: 'offer', text: d.offer, font: 'Anton', size: W * .155, weight: 400, lh: 1.05,
              color: '#FFFFFF', strokeOn: true, strokeColor: 'rgba(0,0,0,.35)', strokeW: W * .012,
              x: W * .06, y: H * .32, w: W * .88, align: 'center', name: 'Offer'
            }),
            S({ shape: 'roundrect', x: W * .24, y: H * .53, w: W * .52, h: H * .085, fill: f.palette.accent, radius: 999, name: 'CTA pill' }),
            T({
              role: 'message', text: d.message || 'Limited period offer', font: 'Poppins', size: W * .032, weight: 700,
              color: '#1A1008', x: W * .24, y: H * .552, w: W * .52, align: 'center', shadowOn: false, name: 'CTA text'
            }),
            K({ sid: f.stickers[0], x: W * .04, y: H * .66, w: W * .2, h: W * .2, colors: stickerColors(f), name: 'Sticker' }),
            K({ sid: f.stickers[1] || f.stickers[0], x: W * .76, y: H * .66, w: W * .2, h: W * .2, colors: stickerColors(f), name: 'Sticker' }),
            S({ shape: 'roundrect', x: 0, y: H * .86, w: W, h: H * .14, fill: 'rgba(0,0,0,.35)', radius: 0, name: 'Footer bar' }),
            T({
              role: 'phone', text: d.phone + '  |  ' + d.website, font: 'Poppins', size: W * .03, weight: 600,
              color: '#FFFFFF', x: W * .06, y: H * .885, w: W * .88, align: 'center', name: 'Contact'
            }),
            T({
              role: 'address', text: d.address, font: 'Poppins', size: W * .024, weight: 400,
              color: 'rgba(255,255,255,.75)', x: W * .06, y: H * .93, w: W * .88, align: 'center', name: 'Address'
            })
          ]
        };
      }
    },

    /* 5 — Bold typographic social post ------------------------------- */
    {
      id: 'typo', label: 'Bold Typography', category: 'Social Media Posts', size: 'ig-square', lang: 'en',
      build: function (f, d, W, H) {
        return {
          background: { type: 'solid', color: f.palette.deep },
          objects: [
            S({ shape: 'circle', x: W * .55, y: -H * .15, w: W * .8, h: W * .8, fill: f.palette.mid, opacity: .55, name: 'Blob' }),
            S({ shape: 'circle', x: -W * .25, y: H * .6, w: W * .7, h: W * .7, fill: f.palette.accent, opacity: .22, name: 'Blob 2' }),
            T({
              role: 'title', text: 'HAPPY', font: 'Anton', size: W * .13, weight: 400, ls: W * .008,
              color: 'rgba(255,255,255,.28)', x: W * .08, y: H * .24, w: W * .84, align: 'left', shadowOn: false, name: 'Happy'
            }),
            T({
              role: 'wish', text: f.name.toUpperCase(), font: 'Anton', size: W * .155, weight: 400, lh: 1, ls: W * .002,
              color: f.palette.accent, x: W * .08, y: H * .34, w: W * .84, align: 'left', name: 'Festival'
            }),
            S({ shape: 'line', x: W * .08, y: H * .58, w: W * .3, h: 8, fill: '#FFFFFF', strokeW: 8, name: 'Rule' }),
            T({
              role: 'message', text: d.message || f.desc, font: 'Poppins', size: W * .032, weight: 400, lh: 1.5,
              color: 'rgba(255,255,255,.86)', x: W * .08, y: H * .63, w: W * .7, align: 'left', name: 'Message'
            }),
            T({
              role: 'name', text: d.name, font: 'Poppins', size: W * .034, weight: 700,
              color: '#FFFFFF', x: W * .08, y: H * .86, w: W * .6, align: 'left', name: 'Your name'
            }),
            K({ sid: f.stickers[0], x: W * .74, y: H * .78, w: W * .2, h: W * .2, colors: stickerColors(f), name: 'Sticker' })
          ]
        };
      }
    },

    /* 6 — WhatsApp status (tall) ------------------------------------- */
    {
      id: 'status', label: 'WhatsApp Status', category: 'WhatsApp Status', size: 'wa-status', lang: 'hi',
      build: function (f, d, W, H) {
        var wish = pick(f.wishes.hi, 0) || pick(f.wishes.en, 0);
        return {
          background: grad(f, 0, 165),
          objects: [
            S({ shape: 'circle', x: -W * .3, y: H * .06, w: W * .9, h: W * .9, fill: f.palette.accent, opacity: .12, name: 'Glow' }),
            K({ sid: f.stickers[0], x: W * .34, y: H * .13, w: W * .32, h: W * .32, colors: stickerColors(f), anim: { type: 'pop', delay: 0, dur: .28 }, name: 'Top sticker' }),
            T({
              role: 'title', text: 'HAPPY ' + f.name.toUpperCase(), font: 'Poppins', size: W * .052, weight: 700, ls: W * .01,
              color: f.palette.accent, x: W * .08, y: H * .3, w: W * .84, align: 'center',
              anim: { type: 'slide-up', delay: .10, dur: .25 }, name: 'Title'
            }),
            T({
              role: 'wish', text: wish, font: 'Tiro Devanagari Hindi', size: W * .07, weight: 400, lh: 1.55,
              color: '#FFFFFF', x: W * .08, y: H * .38, w: W * .84, align: 'center',
              anim: { type: 'fade', delay: .20, dur: .28 }, name: 'Wish'
            }),
            S({ shape: 'line', x: W * .35, y: H * .58, w: W * .3, h: 6, fill: f.palette.accent, strokeW: 5, name: 'Rule' }),
            T({
              role: 'name', text: d.name, font: 'Poppins', size: W * .05, weight: 600,
              color: '#FFFFFF', x: W * .1, y: H * .62, w: W * .8, align: 'center',
              anim: { type: 'fade', delay: .32, dur: .25 }, name: 'Your name'
            }),
            K({ sid: f.stickers[1] || f.stickers[0], x: W * .1, y: H * .74, w: W * .22, h: W * .22, colors: stickerColors(f), anim: { type: 'float' }, name: 'Sticker' }),
            K({ sid: f.stickers[2] || f.stickers[0], x: W * .68, y: H * .74, w: W * .22, h: W * .22, colors: stickerColors(f), anim: { type: 'float' }, name: 'Sticker' })
          ]
        };
      }
    },

    /* 7 — Instagram post with photo strip ---------------------------- */
    {
      id: 'igpost', label: 'Photo Frame Post', category: 'Instagram Posts', size: 'ig-square', lang: 'en',
      build: function (f, d, W, H) {
        return {
          background: { type: 'solid', color: f.palette.deep },
          objects: [
            I({ role: 'photo', x: 0, y: 0, w: W, h: H * .62, radius: 0, name: 'Your photo', fit: 'cover' }),
            S({ shape: 'rect', x: 0, y: H * .44, w: W, h: H * .2, fill: 'rgba(0,0,0,.0)', opacity: 0, name: 'Spacer' }),
            S({ shape: 'roundrect', x: W * .07, y: H * .5, w: W * .86, h: H * .42, fill: f.palette.mid, radius: 30, shadowOn: true, name: 'Card' }),
            T({
              role: 'title', text: 'Happy ' + f.name, font: 'Playfair Display', size: W * .078, weight: 700,
              color: '#FFFFFF', x: W * .1, y: H * .55, w: W * .8, align: 'center', name: 'Title'
            }),
            T({
              role: 'wish', text: pick(f.wishes.en, 0), font: 'Poppins', size: W * .032, weight: 400, lh: 1.5,
              color: 'rgba(255,255,255,.9)', x: W * .12, y: H * .655, w: W * .76, align: 'center', name: 'Wish'
            }),
            S({ shape: 'line', x: W * .4, y: H * .79, w: W * .2, h: 5, fill: f.palette.accent, strokeW: 5, name: 'Rule' }),
            T({
              role: 'name', text: d.name, font: 'Poppins', size: W * .034, weight: 700, ls: W * .004,
              color: f.palette.accent, x: W * .1, y: H * .815, w: W * .8, align: 'center', name: 'Your name'
            }),
            K({ sid: f.stickers[0], x: W * .04, y: H * .03, w: W * .16, h: W * .16, colors: stickerColors(f), name: 'Sticker' })
          ]
        };
      }
    },

    /* 8 — Instagram story -------------------------------------------- */
    {
      id: 'igstory', label: 'Story Greeting', category: 'Instagram Stories', size: 'ig-story', lang: 'en',
      build: function (f, d, W, H) {
        return {
          background: grad(f, 2, 200),
          objects: [
            S({ shape: 'roundrect', x: W * .07, y: H * .1, w: W * .86, h: H * .8, fill: 'rgba(255,255,255,.06)', strokeColor: 'rgba(255,255,255,.35)', strokeW: 3, radius: 42, name: 'Frame' }),
            I({ role: 'photo', x: W * .17, y: H * .16, w: W * .66, h: W * .66, radius: 999, name: 'Your photo', fit: 'cover' }),
            T({
              role: 'title', text: 'HAPPY', font: 'Poppins', size: W * .045, weight: 600, ls: W * .022,
              color: 'rgba(255,255,255,.75)', x: W * .1, y: H * .53, w: W * .8, align: 'center', name: 'Happy'
            }),
            T({
              role: 'wish', text: f.name.toUpperCase(), font: 'Anton', size: W * .12, weight: 400, lh: 1.05,
              color: f.palette.accent, x: W * .07, y: H * .565, w: W * .86, align: 'center',
              anim: { type: 'zoom', delay: .10, dur: .28 }, name: 'Festival'
            }),
            T({
              role: 'message', text: d.message || pick(f.wishes.en, 1), font: 'Poppins', size: W * .034, weight: 400, lh: 1.5,
              color: 'rgba(255,255,255,.88)', x: W * .12, y: H * .68, w: W * .76, align: 'center', name: 'Message'
            }),
            T({
              role: 'name', text: d.name, font: 'Poppins', size: W * .04, weight: 700,
              color: '#FFFFFF', x: W * .1, y: H * .8, w: W * .8, align: 'center', name: 'Your name'
            }),
            K({ sid: f.stickers[0], x: W * .38, y: H * .855, w: W * .24, h: W * .24, colors: stickerColors(f), anim: { type: 'float' }, name: 'Sticker' })
          ]
        };
      }
    },

    /* 9 — Facebook post (landscape) ---------------------------------- */
    {
      id: 'fbpost', label: 'Facebook Post', category: 'Facebook Posts', size: 'fb-post', lang: 'hi',
      build: function (f, d, W, H) {
        var wish = pick(f.wishes.hi, 2) || pick(f.wishes.hi, 0) || pick(f.wishes.en, 0);
        return {
          background: grad(f, 0, 110),
          objects: [
            S({ shape: 'circle', x: W * .72, y: -H * .25, w: W * .4, h: W * .4, fill: f.palette.accent, opacity: .16, name: 'Glow' }),
            K({ sid: f.stickers[0], x: W * .04, y: H * .16, w: W * .17, h: W * .17, colors: stickerColors(f), name: 'Sticker' }),
            T({
              role: 'title', text: 'HAPPY ' + f.name.toUpperCase(), font: 'Poppins', size: W * .034, weight: 700, ls: W * .006,
              color: f.palette.accent, x: W * .24, y: H * .16, w: W * .7, align: 'left', name: 'Title'
            }),
            T({
              role: 'wish', text: wish, font: 'Tiro Devanagari Hindi', size: W * .044, weight: 400, lh: 1.5,
              color: '#FFFFFF', x: W * .24, y: H * .3, w: W * .7, align: 'left', name: 'Wish'
            }),
            S({ shape: 'line', x: W * .24, y: H * .72, w: W * .12, h: 5, fill: '#FFFFFF', strokeW: 5, name: 'Rule' }),
            T({
              role: 'name', text: d.name, font: 'Poppins', size: W * .028, weight: 600,
              color: '#FFFFFF', x: W * .24, y: H * .77, w: W * .5, align: 'left', name: 'Your name'
            }),
            T({
              role: 'website', text: d.website, font: 'Poppins', size: W * .022, weight: 400,
              color: 'rgba(255,255,255,.7)', x: W * .24, y: H * .87, w: W * .5, align: 'left', name: 'Website'
            })
          ]
        };
      }
    },
    /* 10 — Temple & Devotional Darshan ------------------------------- */
    {
      id: 'temple-darshan', label: 'Temple & Darshan', category: 'Temple & Darshan', size: 'ig-square', lang: 'hi',
      build: function (f, d, W, H) {
        var wish = pick(f.wishes.hi, 0) || pick(f.wishes.en, 0);
        return {
          background: {
            type: 'linear', angle: 160,
            stops: [{ c: '#1A002C', p: 0 }, { c: '#4A0E4E', p: 0.5 }, { c: '#880E4F', p: 1 }],
            pattern: 'mandala', patternColor: '#FFD700', patternAlpha: 0.12, vignette: 0.35
          },
          objects: [
            S({ shape: 'circle', x: W * .22, y: H * .08, w: W * .56, h: W * .56, fill: '#FFD700', opacity: .14, name: 'Divine Glow' }),
            S({ shape: 'roundrect', x: W * .05, y: H * .05, w: W * .9, h: H * .9, fill: 'transparent', strokeColor: '#FFD700', strokeW: 3, radius: 24, name: 'Mandir Frame' }),
            S({ shape: 'roundrect', x: W * .07, y: H * .07, w: W * .86, h: H * .86, fill: 'transparent', strokeColor: 'rgba(255,215,0,.35)', strokeW: 1.5, radius: 18, name: 'Inner Border' }),
            K({ sid: 'bell', x: W * .1, y: H * .08, w: W * .14, h: W * .14, colors: { p: '#FFD700', s: '#FFA000', a: '#FFF8E1' }, name: 'Temple Bell L' }),
            K({ sid: 'bell', x: W * .76, y: H * .08, w: W * .14, h: W * .14, colors: { p: '#FFD700', s: '#FFA000', a: '#FFF8E1' }, name: 'Temple Bell R' }),
            K({ sid: 'temple', x: W * .35, y: H * .14, w: W * .3, h: W * .3, colors: { p: '#FFD700', s: '#FF6F00', a: '#FFF9C4' }, name: 'Grand Mandir' }),
            T({
              role: 'title', text: '॥ ॐ ' + (f.hi || f.name) + ' नमः ॥', font: 'Tiro Devanagari Hindi', size: W * .044, weight: 700,
              color: '#FFD700', x: W * .08, y: H * .47, w: W * .84, align: 'center', name: 'Mantra Title'
            }),
            S({ shape: 'line', x: W * .3, y: H * .53, w: W * .4, h: 5, fill: '#FFD700', strokeW: 4, name: 'Golden Rule' }),
            T({
              role: 'wish', text: 'मंदिर दर्शन एवं पावन आशीर्वाद\n' + wish, font: 'Tiro Devanagari Hindi', size: W * .06, weight: 400, lh: 1.45,
              color: '#FFFFFF', x: W * .08, y: H * .56, w: W * .84, align: 'center', name: 'Blessing Wish'
            }),
            K({ sid: 'diya', x: W * .12, y: H * .77, w: W * .18, h: W * .18, colors: { p: '#FF9800', s: '#FFD700', a: '#D84315' }, name: 'Diya Left' }),
            K({ sid: 'diya', x: W * .7, y: H * .77, w: W * .18, h: W * .18, colors: { p: '#FF9800', s: '#FFD700', a: '#D84315' }, name: 'Diya Right' }),
            T({
              role: 'name', text: 'सप्रेम भेंट: ' + d.name, font: 'Tiro Devanagari Hindi', size: W * .048, weight: 600,
              color: '#FFD700', x: W * .2, y: H * .81, w: W * .6, align: 'center', name: 'Devotee Name'
            }),
            T({
              role: 'phone', text: d.phone ? '📞 ' + d.phone : '', font: 'Poppins', size: W * .028, weight: 500,
              color: 'rgba(255,255,255,.8)', x: W * .1, y: H * .88, w: W * .8, align: 'center', name: 'Contact'
            })
          ]
        };
      }
    },
    /* 11 — Temple Maha Aarti Status ---------------------------------- */
    {
      id: 'temple-aarti', label: 'Temple Maha Aarti', category: 'Temple & Darshan', size: 'wa-status', lang: 'hi',
      build: function (f, d, W, H) {
        var wish = pick(f.wishes.hi, 0) || pick(f.wishes.en, 0);
        return {
          background: {
            type: 'linear', angle: 180,
            stops: [{ c: '#210002', p: 0 }, { c: '#5A0C08', p: 0.35 }, { c: '#8D1508', p: 0.75 }, { c: '#B71C1C', p: 1 }],
            pattern: 'mandala', patternColor: '#FFD700', patternAlpha: 0.1, vignette: 0.4
          },
          objects: [
            S({ shape: 'circle', x: W * .15, y: H * .08, w: W * .7, h: W * .7, fill: '#FFD700', opacity: .15, name: 'Sun Glow' }),
            K({ sid: 'temple', x: W * .32, y: H * .09, w: W * .36, h: W * .36, colors: { p: '#FFD700', s: '#FF9800', a: '#FFF9C4' }, name: 'Mandir Top' }),
            K({ sid: 'bell', x: W * .08, y: H * .05, w: W * .18, h: W * .18, colors: { p: '#FFD700', s: '#FFA000', a: '#FFF8E1' }, name: 'Bell Left' }),
            K({ sid: 'bell', x: W * .74, y: H * .05, w: W * .18, h: W * .18, colors: { p: '#FFD700', s: '#FFA000', a: '#FFF8E1' }, name: 'Bell Right' }),
            T({
              role: 'title', text: '॥ दिव्य आरती एवं दर्शन ॥', font: 'Tiro Devanagari Hindi', size: W * .058, weight: 700,
              color: '#FFD700', x: W * .06, y: H * .3, w: W * .88, align: 'center', name: 'Header Title'
            }),
            T({
              role: 'subtitle', text: (f.hi || f.name) + ' महापर्व', font: 'Tiro Devanagari Hindi', size: W * .076, weight: 700,
              color: '#FFFFFF', x: W * .06, y: H * .355, w: W * .88, align: 'center', name: 'Festival High'
            }),
            S({ shape: 'line', x: W * .25, y: H * .42, w: W * .5, h: 6, fill: '#FFD700', strokeW: 5, name: 'Divider Line' }),
            T({
              role: 'wish', text: 'प्रभु का पावन आशीर्वाद आपके और आपके परिवार पर सदा बना रहे।\n\n' + wish,
              font: 'Tiro Devanagari Hindi', size: W * .052, weight: 400, lh: 1.5,
              color: '#FFF8E7', x: W * .08, y: H * .45, w: W * .84, align: 'center', name: 'Status Blessing'
            }),
            K({ sid: 'thali', x: W * .36, y: H * .65, w: W * .28, h: W * .28, colors: { p: '#FFD700', s: '#D84315', a: '#FFF8E1' }, name: 'Puja Thali' }),
            K({ sid: 'diya', x: W * .1, y: H * .72, w: W * .22, h: W * .22, colors: { p: '#FF9800', s: '#FFD700', a: '#D84315' }, name: 'Diya L' }),
            K({ sid: 'diya', x: W * .68, y: H * .72, w: W * .22, h: W * .22, colors: { p: '#FF9800', s: '#FFD700', a: '#D84315' }, name: 'Diya R' }),
            S({ shape: 'roundrect', x: W * .08, y: H * .84, w: W * .84, h: H * .09, fill: 'rgba(0,0,0,.45)', strokeColor: '#FFD700', strokeW: 2, radius: 18, name: 'Name Pill' }),
            T({
              role: 'name', text: 'शुभकामनाएँ: ' + d.name, font: 'Tiro Devanagari Hindi', size: W * .048, weight: 600,
              color: '#FFD700', x: W * .1, y: H * .865, w: W * .8, align: 'center', name: 'Your Name'
            })
          ]
        };
      }
    }
  ];

  FS.LAYOUTS = LAYOUTS;

  /* ------------------------------------------------------------------ */

  /* ------------------------------------------------------------------ */
  /* Navratri 9 Days Special Templates Data                            */
  /* ------------------------------------------------------------------ */
  var NAVRATRI_DAYS = [
    {
      day: 1, slug: 'shailputri', name: 'Day 1 — Maa Shailputri', hiName: 'प्रथम दिवस — माँ शैलपुत्री',
      devi: 'Maa Shailputri', deviHi: 'माँ शैलपुत्री', colorName: 'Yellow (पीला)',
      mantra: 'वन्दे वाञ्छितलाभाय चन्द्रार्धकृतशेखराम्। वृषारूढां शूलधरां शैलपुत्रीं यशस्विनीम्॥',
      wish: 'शारदीय नवरात्रि के प्रथम दिन माँ शैलपुत्री आपके जीवन में सुख, शांति और समृद्धि का संचार करें।',
      bgGrad: [['#4A2E00', '#F57F17', '#FFD600']], accent: '#FFD600', accent2: '#FF6F00'
    },
    {
      day: 2, slug: 'brahmacharini', name: 'Day 2 — Maa Brahmacharini', hiName: 'द्वितीय दिवस — माँ ब्रह्मचारिणी',
      devi: 'Maa Brahmacharini', deviHi: 'माँ ब्रह्मचारिणी', colorName: 'Green (हरा)',
      mantra: 'दधाना करपद्माभ्यामक्षमालाकमण्डलू। देवी प्रसीदतु मयि ब्रह्मचारिण्यनुत्तमा॥',
      wish: 'नवरात्रि के द्वितीय दिन माँ ब्रह्मचारिणी आपको तप, त्याग, सदाचार और संयम की शक्ति प्रदान करें।',
      bgGrad: [['#0B3D2E', '#1B5E20', '#4CAF50']], accent: '#69F0AE', accent2: '#FFD700'
    },
    {
      day: 3, slug: 'chandraghanta', name: 'Day 3 — Maa Chandraghanta', hiName: 'तृतीय दिवस — माँ चंद्रघंटा',
      devi: 'Maa Chandraghanta', deviHi: 'माँ चंद्रघंटा', colorName: 'Grey (धूसर)',
      mantra: 'पिण्डजप्रवरारूढा चण्डकोपास्त्रकैर्युता। प्रसादम तनुते मह्यं चंद्रघण्टेति विश्रुता॥',
      wish: 'माँ चंद्रघंटा के दिव्य आशीर्वाद से आपके सभी भय और कष्ट दूर हों तथा आत्मबल बढ़े।',
      bgGrad: [['#263238', '#455A64', '#78909C']], accent: '#ECEFF1', accent2: '#FFB300'
    },
    {
      day: 4, slug: 'kushmanda', name: 'Day 4 — Maa Kushmanda', hiName: 'चतुर्थ दिवस — माँ कूष्मांडा',
      devi: 'Maa Kushmanda', deviHi: 'माँ कूष्मांडा', colorName: 'Orange (नारंगी)',
      mantra: 'सुरासम्पूर्णकलशं रुधिराप्लुतमेव च। दधाना हस्तपद्माभ्यां कूष्माण्डा शुभदास्तु मे॥',
      wish: 'नवरात्रि के चौथे दिन ब्रह्मांड की रचयिता माँ कूष्मांडा आपके जीवन में नई ऊर्जा व यश भर दें।',
      bgGrad: [['#4E1D00', '#E65100', '#FF9800']], accent: '#FFE082', accent2: '#D84315'
    },
    {
      day: 5, slug: 'skandamata', name: 'Day 5 — Maa Skandamata', hiName: 'पंचम दिवस — माँ स्कंदमाता',
      devi: 'Maa Skandamata', deviHi: 'माँ स्कंदमाता', colorName: 'White (श्वेत)',
      mantra: 'सिंहासनगता नित्यं पद्माश्रितकरद्वया। शुभदास्तु सदा देवी स्कन्दमाता यशस्विनी॥',
      wish: 'भगवान कार्तिकेय की माता माँ स्कंदमाता आपके परिवार पर वात्सल्य और ममता की वर्षा करें।',
      bgGrad: [['#1A237E', '#3949AB', '#9FA8DA']], accent: '#FFFFFF', accent2: '#FFD54F'
    },
    {
      day: 6, slug: 'katyayani', name: 'Day 6 — Maa Katyayani', hiName: 'षष्ठम दिवस — माँ कात्यायनी',
      devi: 'Maa Katyayani', deviHi: 'माँ कात्यायनी', colorName: 'Red (लाल)',
      mantra: 'चन्द्रहासोज्ज्वलकरा शार्दूलवरवाहना। कात्यायनी शुभं दद्याद्देवी दानवघातिनी॥',
      wish: 'महिषासुर मर्दिनी माँ कात्यायनी आपके समस्त शत्रुओं और विघ्नों का नाश कर सफलता प्रदान करें।',
      bgGrad: [['#4A0007', '#B71C1C', '#E53935']], accent: '#FFD700', accent2: '#FF8A80'
    },
    {
      day: 7, slug: 'kaalratri', name: 'Day 7 — Maa Kaalratri', hiName: 'सप्तम दिवस — माँ कालरात्रि',
      devi: 'Maa Kaalratri', deviHi: 'माँ कालरात्रि', colorName: 'Royal Blue (नीला)',
      mantra: 'एकवेणी जपाकर्णपूरा नग्ना खरास्थिता। लम्बोष्ठी कर्णिकाकर्णी तैलाभ्यक्तशरीरिणी॥',
      wish: 'महाकालरात्रि आपके सभी भय, अंधकार और कष्टों को हर कर निर्भयता व विजय का वरदान दें।',
      bgGrad: [['#05081A', '#0D2040', '#1565C0']], accent: '#80D8FF', accent2: '#FFD600'
    },
    {
      day: 8, slug: 'mahagauri', name: 'Day 8 — Maa Mahagauri', hiName: 'अष्टम दिवस — माँ महागौरी (दुर्गाष्टमी)',
      devi: 'Maa Mahagauri', deviHi: 'माँ महागौरी', colorName: 'Pink (गुलाबी)',
      mantra: 'श्वेते वृषेसमारूढा श्वेताम्बरधरा शुचिः। महागौरी शुभं दद्यान्महादेवप्रमोददा॥',
      wish: 'महाअष्टमी के पावन अवसर पर माँ महागौरी आपके सभी पापों का शमन कर परम शांति व पवित्रता दें।',
      bgGrad: [['#4A0033', '#880E4F', '#D81B60']], accent: '#F8BBD0', accent2: '#FFD700'
    },
    {
      day: 9, slug: 'siddhidatri', name: 'Day 9 — Maa Siddhidatri', hiName: 'नवम दिवस — माँ सिद्धिदात्री (महानवमी)',
      devi: 'Maa Siddhidatri', deviHi: 'माँ सिद्धिदात्री', colorName: 'Purple (बैंगनी)',
      mantra: 'सिद्धगन्धर्वयक्षाद्यैरसुरैरमरैरपि। सेव्यमाना सदा भूयात् सिद्धिदा सिद्धिदायिनी॥',
      wish: 'महानवमी पर सर्वसिद्धियों की दात्री माँ सिद्धिदात्री आपकी सभी मनोकामनाएं व कार्य सिद्ध करें।',
      bgGrad: [['#2A0845', '#4A148C', '#7B1FA2']], accent: '#E1BEE7', accent2: '#FFD54F'
    }
  ];
  FS.NAVRATRI_DAYS = NAVRATRI_DAYS;

  function buildNavratriDayScene(dayConfig, d, W, H) {
    return {
      background: {
        type: 'linear', angle: 155,
        stops: dayConfig.bgGrad[0].map(function (c, i, a) { return { c: c, p: i / (a.length - 1) }; }),
        pattern: 'mandala', patternColor: '#FFFFFF', patternAlpha: 0.12, vignette: 0.35
      },
      objects: [
        S({ shape: 'circle', x: W * .15, y: -H * .1, w: W * .7, h: W * .7, fill: dayConfig.accent, opacity: .16, name: 'Sun Halo' }),
        S({ shape: 'roundrect', x: W * .05, y: H * .05, w: W * .9, h: H * .9, fill: 'transparent', strokeColor: dayConfig.accent, strokeW: 3.5, radius: 26, name: 'Outer Frame' }),
        S({ shape: 'roundrect', x: W * .07, y: H * .07, w: W * .86, h: H * .86, fill: 'rgba(0,0,0,.22)', strokeColor: 'rgba(255,255,255,.25)', strokeW: 1.5, radius: 20, name: 'Pooja Plate' }),
        K({ sid: 'kalash', x: W * .1, y: H * .09, w: W * .15, h: W * .15, colors: { p: dayConfig.accent, s: dayConfig.accent2, a: '#FFFFFF' }, name: 'Kalash Left' }),
        K({ sid: 'diya', x: W * .75, y: H * .09, w: W * .15, h: W * .15, colors: { p: dayConfig.accent, s: dayConfig.accent2, a: '#FFFFFF' }, name: 'Diya Right' }),
        T({
          role: 'title', text: '॥ शुभ नवरात्रि ' + dayConfig.hiName + ' ॥', font: 'Tiro Devanagari Hindi', size: W * .042, weight: 700,
          color: dayConfig.accent, x: W * .08, y: H * .22, w: W * .84, align: 'center', name: 'Day Header'
        }),
        T({
          role: 'subtitle', text: 'आज का पावन रंग: ' + dayConfig.colorName, font: 'Tiro Devanagari Hindi', size: W * .036, weight: 600,
          color: '#FFFFFF', x: W * .08, y: H * .275, w: W * .84, align: 'center', name: 'Color of the Day'
        }),
        S({ shape: 'line', x: W * .35, y: H * .325, w: W * .3, h: 4, fill: dayConfig.accent, strokeW: 4, name: 'Rule' }),
        T({
          role: 'devi', text: dayConfig.deviHi, font: 'Tiro Devanagari Hindi', size: W * .078, weight: 700,
          color: dayConfig.accent, x: W * .08, y: H * .345, w: W * .84, align: 'center', name: 'Devi Name'
        }),
        T({
          role: 'mantra', text: '“ ' + dayConfig.mantra + ' ”', font: 'Tiro Devanagari Hindi', size: W * .038, weight: 400, lh: 1.45,
          color: '#FFE082', x: W * .09, y: H * .45, w: W * .82, align: 'center', name: 'Devi Stuti Mantra'
        }),
        T({
          role: 'wish', text: dayConfig.wish, font: 'Tiro Devanagari Hindi', size: W * .052, weight: 400, lh: 1.45,
          color: '#FFFFFF', x: W * .08, y: H * .59, w: W * .84, align: 'center', name: 'Navratri Wish'
        }),
        K({ sid: 'temple', x: W * .4, y: H * .72, w: W * .2, h: W * .2, colors: { p: dayConfig.accent, s: dayConfig.accent2, a: '#FFFFFF' }, name: 'Temple' }),
        K({ sid: 'flower', x: W * .15, y: H * .75, w: W * .14, h: W * .14, colors: { p: dayConfig.accent, s: dayConfig.accent2, a: '#FFFFFF' }, name: 'Flower L' }),
        K({ sid: 'flower', x: W * .71, y: H * .75, w: W * .14, h: W * .14, colors: { p: dayConfig.accent, s: dayConfig.accent2, a: '#FFFFFF' }, name: 'Flower R' }),
        T({
          role: 'name', text: 'हार्दिक शुभकामनाएँ: ' + d.name, font: 'Tiro Devanagari Hindi', size: W * .046, weight: 600,
          color: dayConfig.accent, x: W * .08, y: H * .865, w: W * .84, align: 'center', name: 'Your Name'
        })
      ]
    };
  }

  function buildNavratriStatusScene(dayConfig, d, W, H) {
    return {
      background: {
        type: 'linear', angle: 180,
        stops: dayConfig.bgGrad[0].map(function (c, i, a) { return { c: c, p: i / (a.length - 1) }; }),
        pattern: 'mandala', patternColor: '#FFFFFF', patternAlpha: 0.12, vignette: 0.4
      },
      objects: [
        S({ shape: 'circle', x: W * .15, y: H * .08, w: W * .7, h: W * .7, fill: dayConfig.accent, opacity: .18, name: 'Sun Halo' }),
        K({ sid: 'temple', x: W * .35, y: H * .08, w: W * .3, h: W * .3, colors: { p: dayConfig.accent, s: dayConfig.accent2, a: '#FFFFFF' }, name: 'Temple' }),
        K({ sid: 'bell', x: W * .1, y: H * .06, w: W * .16, h: W * .16, colors: { p: dayConfig.accent, s: dayConfig.accent2, a: '#FFFFFF' }, name: 'Bell Left' }),
        K({ sid: 'bell', x: W * .74, y: H * .06, w: W * .16, h: W * .16, colors: { p: dayConfig.accent, s: dayConfig.accent2, a: '#FFFFFF' }, name: 'Bell Right' }),
        T({
          role: 'title', text: '॥ जय माता दी ॥\nनवरात्रि ' + dayConfig.hiName, font: 'Tiro Devanagari Hindi', size: W * .052, weight: 700, lh: 1.35,
          color: dayConfig.accent, x: W * .06, y: H * .26, w: W * .88, align: 'center', name: 'Header Title'
        }),
        T({
          role: 'devi', text: dayConfig.deviHi, font: 'Tiro Devanagari Hindi', size: W * .084, weight: 700,
          color: '#FFFFFF', x: W * .06, y: H * .35, w: W * .88, align: 'center', name: 'Devi Name'
        }),
        T({
          role: 'color', text: '✨ आज का शुभ रंग: ' + dayConfig.colorName, font: 'Tiro Devanagari Hindi', size: W * .044, weight: 600,
          color: dayConfig.accent, x: W * .06, y: H * .42, w: W * .88, align: 'center', name: 'Color Subtitle'
        }),
        S({ shape: 'line', x: W * .25, y: H * .47, w: W * .5, h: 5, fill: dayConfig.accent, strokeW: 4, name: 'Divider' }),
        T({
          role: 'mantra', text: '“ ' + dayConfig.mantra + ' ”', font: 'Tiro Devanagari Hindi', size: W * .042, weight: 400, lh: 1.45,
          color: '#FFE082', x: W * .08, y: H * .5, w: W * .84, align: 'center', name: 'Mantra Stuti'
        }),
        T({
          role: 'wish', text: dayConfig.wish, font: 'Tiro Devanagari Hindi', size: W * .054, weight: 400, lh: 1.5,
          color: '#FFFFFF', x: W * .08, y: H * .63, w: W * .84, align: 'center', name: 'Navratri Blessing'
        }),
        K({ sid: 'thali', x: W * .38, y: H * .77, w: W * .24, h: W * .24, colors: { p: dayConfig.accent, s: dayConfig.accent2, a: '#FFFFFF' }, name: 'Puja Thali' }),
        K({ sid: 'diya', x: W * .12, y: H * .8, w: W * .18, h: W * .18, colors: { p: dayConfig.accent, s: dayConfig.accent2, a: '#FFFFFF' }, name: 'Diya L' }),
        K({ sid: 'diya', x: W * .7, y: H * .8, w: W * .18, h: W * .18, colors: { p: dayConfig.accent, s: dayConfig.accent2, a: '#FFFFFF' }, name: 'Diya R' }),
        T({
          role: 'name', text: 'प्रेषक: ' + d.name, font: 'Tiro Devanagari Hindi', size: W * .046, weight: 600,
          color: dayConfig.accent, x: W * .08, y: H * .92, w: W * .84, align: 'center', name: 'Your Name'
        })
      ]
    };
  }

  /* Template catalogue                                                  */
  /* ------------------------------------------------------------------ */
  function sizeOf(id) {
    for (var i = 0; i < FS.SIZES.length; i++) if (FS.SIZES[i].id === id) return FS.SIZES[i];
    return FS.SIZES[0];
  }

  var VARIANT_THEMES = [
    { suffix: '', label: '', cat: null, gradIdx: 0 },
    { suffix: '-gold', label: ' (Royal Gold)', cat: 'Festival Wishes', gradIdx: 1 },
    { suffix: '-modern', label: ' (Minimalist Aura)', cat: 'Social Media Posts', gradIdx: 2 },
    { suffix: '-bhakti', label: ' (Darshan Special)', cat: 'Temple & Darshan', gradIdx: 0 },
    { suffix: '-corporate', label: ' (Business Edition)', cat: 'Business Greetings', gradIdx: 1 }
  ];

  FS.TEMPLATES = [];
  FS.FESTIVALS.forEach(function (f) {
    var count = 0;
    VARIANT_THEMES.forEach(function (theme, ti) {
      LAYOUTS.forEach(function (L, li) {
        if (count >= 50) return;
        count++;
        var sz = sizeOf(L.size);
        var tId = count === 1 ? (f.slug + '--' + L.id) : (f.slug + '--' + L.id + (theme.suffix || ('-v' + count)));
        FS.TEMPLATES.push({
          id: tId,
          festival: f.slug,
          festivalName: f.name,
          layout: L.id,
          variantIndex: ti,
          name: f.name + ' — ' + L.label + (theme.label || (' #' + count)),
          category: theme.cat || L.category,
          sizeId: L.size,
          w: sz.w,
          h: sz.h,
          previewH: sz.h / sz.w,
          lang: L.lang,
          order: count - 1
        });
      });
    });
  });

  /* Navratri 9 Days Dedicated Special Templates */
  var sqSz = sizeOf('ig-square');
  var waSz = sizeOf('wa-status');
  NAVRATRI_DAYS.forEach(function (nd, ndi) {
    /* Day Square Post */
    FS.TEMPLATES.push({
      id: 'navratri--day-' + nd.day + '-' + nd.slug,
      festival: 'navratri',
      festivalName: 'Navratri',
      layout: 'navratri-day-square',
      navratriDay: nd.day,
      name: 'Navratri ' + nd.name + ' (Post)',
      category: 'Navratri Special',
      sizeId: 'ig-square',
      w: sqSz.w,
      h: sqSz.h,
      previewH: sqSz.h / sqSz.w,
      lang: 'hi',
      order: 100 + ndi * 2
    });
    /* Day WhatsApp Status */
    FS.TEMPLATES.push({
      id: 'navratri--day-' + nd.day + '-' + nd.slug + '-status',
      festival: 'navratri',
      festivalName: 'Navratri',
      layout: 'navratri-day-status',
      navratriDay: nd.day,
      name: 'Navratri ' + nd.name + ' (Status)',
      category: 'Navratri Special',
      sizeId: 'wa-status',
      w: waSz.w,
      h: waSz.h,
      previewH: waSz.h / waSz.w,
      lang: 'hi',
      order: 101 + ndi * 2
    });
  });

  FS.getTemplate = function (id) {
    for (var i = 0; i < FS.TEMPLATES.length; i++) if (FS.TEMPLATES[i].id === id) return FS.TEMPLATES[i];
    return null;
  };

  /* Build a live scene from a template descriptor. */
  FS.buildScene = function (tplId, fields) {
    var tpl = typeof tplId === 'string' ? FS.getTemplate(tplId) : tplId;
    if (!tpl) return FS.newScene(1080, 1080);
    var f = FS.getFestival(tpl.festival);
    var sz = sizeOf(tpl.sizeId);
    var d = defaults(fields);
    var built;

    if (tpl.layout === 'navratri-day-square' || tpl.layout === 'navratri-day-status') {
      var nDay = NAVRATRI_DAYS.filter(function (x) { return x.day === tpl.navratriDay; })[0] || NAVRATRI_DAYS[0];
      if (tpl.layout === 'navratri-day-status') {
        built = buildNavratriStatusScene(nDay, d, sz.w, sz.h);
      } else {
        built = buildNavratriDayScene(nDay, d, sz.w, sz.h);
      }
    } else {
      var L = LAYOUTS.filter(function (l) { return l.id === tpl.layout; })[0] || LAYOUTS[0];
      built = L.build(f, d, sz.w, sz.h);
    }
    var scene = { width: sz.w, height: sz.h, background: built.background, objects: built.objects };
    /* strip empty optional roles so the canvas never shows blank boxes */
    scene.objects = scene.objects.filter(function (o) {
      if (o.type === 'text' && (o.text == null || String(o.text).trim() === '')) return false;
      return true;
    });
    return scene;
  };

  /* Apply user field values onto an existing scene (roles drive the update). */
  FS.applyFields = function (scene, fields) {
    var map = {
      name: 'name', business: 'business', phone: 'phone',
      website: 'website', address: 'address', offer: 'offer', message: 'message'
    };
    scene.objects.forEach(function (o) {
      if (o.type !== 'text' || !o.role) return;
      var key = map[o.role];
      if (!key || fields[key] == null || fields[key] === '') return;
      if (o.role === 'phone' && /\|/.test(o.text)) { o.text = fields.phone + '  |  ' + (fields.website || ''); return; }
      if (o.role === 'phone' && /•/.test(o.text)) { o.text = '📞 ' + fields.phone + '   •   ' + (fields.website || ''); return; }
      o.text = fields[key];
    });
    return scene;
  };

  FS.filterTemplates = function (q, festival, category) {
    q = (q || '').trim().toLowerCase();
    return FS.TEMPLATES.filter(function (t) {
      if (festival && festival !== 'all' && t.festival !== festival) return false;
      if (category && category !== 'all' && t.category !== category) return false;
      if (!q) return true;
      var f = FS.getFestival(t.festival);
      var hay = (t.name + ' ' + t.category + ' ' + f.hi + ' ' + (f.keywords || []).join(' ')).toLowerCase();
      return hay.indexOf(q) !== -1;
    });
  };
})(window);
