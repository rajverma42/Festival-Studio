/* Festival Studio — per-festival SEO landing page controller */
(function (global) {
  'use strict';
  var FS = global.FS;
  FS.ready(function () {
    var host = document.querySelector('[data-festival]');
    var grid = document.getElementById('fest-templates');
    if (!host || !grid) return;
    var slug = host.getAttribute('data-festival');

    FS.renderTemplateGrid(grid, FS.filterTemplates('', slug, 'all'), {
      fields: FS.Store.pref('fields') || {},
      editorBase: '../post-maker.html'
    });

    var cd = document.getElementById('fest-countdown');
    if (cd) {
      var next = FS.nextDate(slug);
      var days = FS.daysUntil(next);
      if (next && days != null) {
        var when = next.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
        cd.textContent = days === 0 ? '🎉 Today is ' + when + ' — the festival is here!'
          : days === 1 ? '⏳ Tomorrow, ' + when
            : '⏳ ' + days + ' days to go — ' + when;
      }
    }
    FS.Store.pref('lastFestival', slug);
  });
})(window);
