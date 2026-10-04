/* Festival Studio — templates.html controller */
(function (global) {
  'use strict';
  var FS = (global.FS = global.FS || {});
  var ready = typeof FS.ready === 'function' ? FS.ready : function (fn) {
    if (typeof fn !== 'function') return;
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  };
  FS.ready = FS.ready || ready;
  var PAGE = 24;

  ready(function () {
    var grid = document.getElementById('tpl-grid');
    if (!grid) return;
    var search = document.getElementById('tpl-search');
    var festSel = document.getElementById('tpl-festival');
    var chips = document.getElementById('tpl-categories');
    var more = document.getElementById('tpl-more');

    var state = { q: '', festival: 'all', category: 'all', shown: PAGE };

    var qs = new URLSearchParams(location.search);
    if (qs.get('festival')) state.festival = qs.get('festival');
    if (qs.get('category')) state.category = qs.get('category');

    festSel.appendChild(FS.el('option', { value: 'all' }, festSel.getAttribute('data-all') || 'All festivals'));
    FS.FESTIVALS.forEach(function (f) {
      festSel.appendChild(FS.el('option', { value: f.slug, selected: f.slug === state.festival ? 'selected' : null }, f.icon + '  ' + f.name));
    });

    var CAT_LABELS = {
      'Navratri Special': (FS.LANG === 'hi' ? '🌸 नवरात्रि स्पेशल (9 दिन)' : '🌸 Navratri Special (9 Days)'),
      'Temple & Darshan': (FS.LANG === 'hi' ? '🛕 मंदिर दर्शन व आरती' : '🛕 Temple & Darshan'),
      'Festival Wishes': (FS.LANG === 'hi' ? 'शुभकामनाएँ' : 'Festival Wishes'),
      'Business Greetings': (FS.LANG === 'hi' ? 'बिज़नेस ग्रीटिंग' : 'Business Greetings'),
      'Personal Greetings': (FS.LANG === 'hi' ? 'पर्सनल ग्रीटिंग' : 'Personal Greetings'),
      'Festival Offers': (FS.LANG === 'hi' ? 'फ़ेस्टिवल ऑफ़र' : 'Festival Offers'),
      'WhatsApp Status': (FS.LANG === 'hi' ? 'व्हाट्सऐप स्टेटस' : 'WhatsApp Status')
    };

    ['all'].concat(FS.TEMPLATE_CATEGORIES).forEach(function (c) {
      var label = c === 'all' ? (chips.getAttribute('data-all') || 'All categories') : (CAT_LABELS[c] || c);
      var b = FS.el('button', { class: 'chip', type: 'button', 'aria-pressed': String(c === state.category) }, label);
      b.addEventListener('click', function () {
        state.category = c; state.shown = PAGE;
        FS.$$('.chip', chips).forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
        b.setAttribute('aria-pressed', 'true');
        render();
      });
      chips.appendChild(b);
    });

    function render() {
      var list = FS.filterTemplates(state.q, state.festival, state.category);
      var slice = list.slice(0, state.shown);
      FS.renderTemplateGrid(grid, slice, { fields: FS.Store.pref('fields') || {} });
      more.hidden = slice.length >= list.length;
      more.textContent = (more.getAttribute('data-label') || 'Load more') + ' (' + (list.length - slice.length) + ')';
    }

    var tid;
    search.addEventListener('input', function () {
      clearTimeout(tid);
      tid = setTimeout(function () { state.q = search.value; state.shown = PAGE; render(); }, 140);
    });
    festSel.addEventListener('change', function () { state.festival = festSel.value; state.shown = PAGE; render(); });
    more.addEventListener('click', function () { state.shown += PAGE; render(); });

    render();
  });
})(window);
