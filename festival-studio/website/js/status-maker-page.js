/* Festival Studio — status-maker.html controller */
(function (global) {
  'use strict';
  var FS = (global.FS = global.FS || {});
  var ready = typeof FS.ready === 'function' ? FS.ready : function (fn) {
    if (typeof fn !== 'function') return;
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  };
  FS.ready = FS.ready || ready;

  ready(function () {
    if (!document.getElementById('tabrail')) return;
    if (typeof FS.Editor === 'function') {
      global.fsEditor = new FS.Editor({ mode: 'status', animation: true }).init();
    }
  });
})(window);
