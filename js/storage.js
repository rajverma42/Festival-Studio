/* ============================================================================
   Festival Studio — storage.js
   Everything is stored in the visitor's own browser (localStorage).
   Nothing is ever uploaded. Every call is wrapped so a blocked/full storage
   never breaks the app (private mode, quota exceeded, disabled cookies...).
   ========================================================================== */
(function (global) {
  'use strict';
  var FS = (global.FS = global.FS || {});
  var K = 'fs:';
  /* safety net: i18n.js replaces this with the real translator */
  FS.t = FS.t || function (x) { return x; };

  function available() {
    try {
      var t = K + 'test';
      localStorage.setItem(t, '1');
      localStorage.removeItem(t);
      return true;
    } catch (e) { return false; }
  }

  var ok = available();

  var Store = {
    ok: ok,
    get: function (key, fallback) {
      if (!ok) return fallback;
      try {
        var raw = localStorage.getItem(K + key);
        return raw == null ? fallback : JSON.parse(raw);
      } catch (e) { return fallback; }
    },
    set: function (key, value) {
      if (!ok) return false;
      try { localStorage.setItem(K + key, JSON.stringify(value)); return true; }
      catch (e) {
        // Most likely quota exceeded — drop the oldest drafts and retry once.
        try {
          var d = Store.get('drafts', []);
          if (d.length) { d.pop(); localStorage.setItem(K + 'drafts', JSON.stringify(d)); localStorage.setItem(K + key, JSON.stringify(value)); return true; }
        } catch (e2) { /* ignore */ }
        return false;
      }
    },
    remove: function (key) { if (!ok) return; try { localStorage.removeItem(K + key); } catch (e) {} },

    /* ---- preferences ---- */
    pref: function (name, value) {
      var p = Store.get('prefs', {});
      if (arguments.length === 1) return p[name];
      p[name] = value; Store.set('prefs', p); return value;
    },

    /* ---- drafts (max 12, newest first) ---- */
    listDrafts: function () { return Store.get('drafts', []); },
    saveDraft: function (draft) {
      var list = Store.get('drafts', []);
      draft.id = draft.id || 'd' + Date.now().toString(36);
      draft.updated = Date.now();
      var i = list.findIndex(function (d) { return d.id === draft.id; });
      if (i >= 0) list.splice(i, 1);
      list.unshift(draft);
      while (list.length > 12) list.pop();
      var saved = Store.set('drafts', list);
      return saved ? draft.id : null;
    },
    getDraft: function (id) {
      return Store.get('drafts', []).filter(function (d) { return d.id === id; })[0] || null;
    },
    deleteDraft: function (id) {
      var list = Store.get('drafts', []).filter(function (d) { return d.id !== id; });
      Store.set('drafts', list);
    },
    clearDrafts: function () { Store.remove('drafts'); }
  };

  FS.Store = Store;
})(window);
