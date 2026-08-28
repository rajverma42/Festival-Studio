/* Festival Studio — templates.html controller */
(function (global) {
  'use strict';
  var FS = global.FS;
  var PAGE = 24;

  FS.ready(function () {
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

    ['all'].concat(FS.TEMPLATE_CATEGORIES).forEach(function (c) {
      var b = FS.el('button', { class: 'chip', type: 'button', 'aria-pressed': String(c === state.category) }, c === 'all' ? (chips.getAttribute('data-all') || 'All categories') : c);
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
