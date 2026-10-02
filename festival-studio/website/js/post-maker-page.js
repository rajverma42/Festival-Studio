/* Festival Studio — post-maker.html controller */
(function (global) {
  'use strict';
  var FS = global.FS;
  FS.ready(function () {
    if (!document.getElementById('tabrail')) return;
    global.fsEditor = new FS.Editor({ mode: 'post' }).init();
  });
})(window);
