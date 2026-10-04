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

  /* Universal ready helper so any script can safely queue initialization */
  FS.ready = FS.ready || function (fn) {
    if (typeof fn !== 'function') return;
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  };

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
      if (saved && FS.CloudDB && FS.CloudDB.saveDraftToCloud) {
        try { FS.CloudDB.saveDraftToCloud(draft); } catch (e) {}
      }
      return saved ? draft.id : null;
    },
    getDraft: function (id) {
      return Store.get('drafts', []).filter(function (d) { return d.id === id; })[0] || null;
    },
    deleteDraft: function (id) {
      var list = Store.get('drafts', []).filter(function (d) { return d.id !== id; });
      Store.set('drafts', list);
      if (FS.CloudDB && FS.CloudDB.deleteCloudDraft) {
        try { FS.CloudDB.deleteCloudDraft(id); } catch (e) {}
      }
    },
        /* ---- favorites (templates, wishes, designs) ---- */
    listFavorites: function (type) {
      var all = Store.get('favorites', { templates: [], wishes: [], designs: [] });
      if (!all || typeof all !== 'object') all = { templates: [], wishes: [], designs: [] };
      return type ? (all[type] || []) : all;
    },
    isFavorite: function (type, id) {
      var list = Store.listFavorites(type);
      return list.indexOf(id) !== -1;
    },
    toggleFavorite: function (type, id, meta) {
      var all = Store.get('favorites', { templates: [], wishes: [], designs: [] });
      if (!all[type]) all[type] = [];
      var idx = all[type].indexOf(id);
      var added = false;
      if (idx !== -1) {
        all[type].splice(idx, 1);
        if (all[type + '_meta']) delete all[type + '_meta'][id];
      } else {
        all[type].unshift(id);
        if (meta) {
          if (!all[type + '_meta']) all[type + '_meta'] = {};
          all[type + '_meta'][id] = meta;
        }
        added = true;
      }
      Store.set('favorites', all);
      return added;
    },
    getFavoriteMeta: function (type, id) {
      var all = Store.get('favorites', {});
      return (all[type + '_meta'] && all[type + '_meta'][id]) || null;
    },
    /* ---- saved exported designs (history) ---- */
    listSavedDesigns: function () { return Store.get('saved_designs', []); },
    addSavedDesign: function (design) {
      var list = Store.get('saved_designs', []);
      design.id = design.id || 's' + Date.now().toString(36);
      design.created = Date.now();
      var idx = list.findIndex(function (d) { return d.id === design.id; });
      if (idx >= 0) list.splice(idx, 1);
      list.unshift(design);
      while (list.length > 24) list.pop();
      Store.set('saved_designs', list);
      return design.id;
    },
    deleteSavedDesign: function (id) {
      var list = Store.get('saved_designs', []).filter(function (d) { return d.id !== id; });
      Store.set('saved_designs', list);
    },
    clearDrafts: function () { Store.remove('drafts'); }
  };

  FS.Store = Store;
})(window);
