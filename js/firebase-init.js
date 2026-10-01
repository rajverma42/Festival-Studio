/* ============================================================================
   Festival Studio — firebase-init.js
   Initializes Firebase App, Auth and Firestore Database
   Provides robust offline-first fallback and cloud sync capabilities.
   ========================================================================== */
(function (global) {
  'use strict';
  var FS = (global.FS = global.FS || {});

  // Firebase configuration loaded from provisioned firebase-applet-config.json
  var firebaseConfig = {
    projectId: "citric-shade-s3skh",
    appId: "1:686984618369:web:f848fc3baaa1adea67c880",
    apiKey: "AIzaSyCCCeWN9B6YgGUakReK0TUqF4oPIl0YYdA",
    authDomain: "citric-shade-s3skh.firebaseapp.com",
    firestoreDatabaseId: "ai-studio-festivalstudio-a7db02fb-bb09-4096-91bb-de735d5a9f38",
    storageBucket: "citric-shade-s3skh.firebasestorage.app",
    messagingSenderId: "686984618369",
    measurementId: "",
    oAuthClientId: "686984618369-2mhpre139jv9sq77ugfca9vt0ph98vjm.apps.googleusercontent.com"
  };

  FS.firebaseConfig = firebaseConfig;

  // Error logging conforming to standard FirestoreErrorInfo
  FS.handleFirestoreError = function (error, operationType, path) {
    var errInfo = {
      error: error instanceof Error ? error.message : String(error),
      operationType: operationType,
      path: path,
      authInfo: {
        userId: FS.currentUser ? FS.currentUser.uid : null,
        email: FS.currentUser ? FS.currentUser.email : null
      }
    };
    console.error('Firestore Error: ', JSON.stringify(errInfo));
    return errInfo;
  };

  // Safe Cloud Database Controller
  var CloudDB = {
    initialized: false,
    app: null,
    db: null,
    auth: null,
    currentUser: null,

    init: function () {
      if (this.initialized) return;
      if (typeof window.firebase === 'undefined') {
        // Firebase CDN loaded or async
        return;
      }
      try {
        if (!firebase.apps || !firebase.apps.length) {
          this.app = firebase.initializeApp(firebaseConfig);
        } else {
          this.app = firebase.app();
        }
        this.db = firebase.firestore();
        this.auth = firebase.auth ? firebase.auth() : null;
        this.initialized = true;

        if (this.auth) {
          var self = this;
          this.auth.onAuthStateChanged(function (user) {
            self.currentUser = user;
            FS.currentUser = user;
            if (FS.onAuthStateChanged) FS.onAuthStateChanged(user);
          });
        }
        console.log('Firebase Firestore Database initialized successfully.');
      } catch (e) {
        console.warn('Firebase initialization note (offline mode active):', e);
      }
    },

    // Save a draft to Cloud Firestore
    saveDraftToCloud: async function (draft) {
      if (!this.initialized || !this.db || !this.currentUser) return null;
      var path = 'users/' + this.currentUser.uid + '/drafts/' + draft.id;
      try {
        var ref = this.db.collection('users').doc(this.currentUser.uid).collection('drafts').doc(draft.id);
        var payload = {
          id: String(draft.id),
          userId: this.currentUser.uid,
          title: String(draft.title || draft.festival || 'Untitled Draft'),
          data: JSON.stringify(draft),
          format: String(draft.format || 'post'),
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        await ref.set(payload, { merge: true });
        return draft.id;
      } catch (err) {
        FS.handleFirestoreError(err, 'write', path);
        return null;
      }
    },

    // Fetch user drafts from Cloud Firestore
    fetchCloudDrafts: async function () {
      if (!this.initialized || !this.db || !this.currentUser) return [];
      var path = 'users/' + this.currentUser.uid + '/drafts';
      try {
        var snap = await this.db.collection('users').doc(this.currentUser.uid).collection('drafts').get();
        var drafts = [];
        snap.forEach(function (doc) {
          var d = doc.data();
          if (d && d.data) {
            try {
              drafts.push(JSON.parse(d.data));
            } catch (e) {
              drafts.push(d);
            }
          }
        });
        return drafts;
      } catch (err) {
        FS.handleFirestoreError(err, 'list', path);
        return [];
      }
    },

    // Delete a draft from Cloud Firestore
    deleteCloudDraft: async function (draftId) {
      if (!this.initialized || !this.db || !this.currentUser) return false;
      var path = 'users/' + this.currentUser.uid + '/drafts/' + draftId;
      try {
        await this.db.collection('users').doc(this.currentUser.uid).collection('drafts').doc(draftId).delete();
        return true;
      } catch (err) {
        FS.handleFirestoreError(err, 'delete', path);
        return false;
      }
    }
  };

  FS.CloudDB = CloudDB;

  // Attempt init on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { CloudDB.init(); });
  } else {
    CloudDB.init();
  }
})(window);
