/* ============================================================================
   Festival Studio — config.js
   ★ THIS IS THE ONLY FILE YOU NEED TO EDIT TO GO LIVE COMMERCIALLY. ★

   Nothing here is required for the site to work — every value can stay empty.
   Ads and analytics only ever load AFTER the visitor accepts the cookie
   notice, and the notice itself only appears if you enable something below.
   ========================================================================== */
window.FS_CONFIG = {
  /* Your published site URL. Used for share links and JSON-LD.
     Also set the same value when regenerating pages:
       SITE_URL="https://..." node tools/build.js                            */
  siteUrl: 'https://festival-studio.work.gd',

  /* Contact address shown on the Contact page and used by the mailto form.  */
  contactEmail: 'officelfestivalstudio@gmail.com',

  /* ---- Google AdSense (Website Only) -----------------------------------
     Used strictly for website visitors. Website ads are NEVER shown in the app.
     1. Get approved at https://adsense.google.com
     2. Put your publisher ID here, e.g. 'ca-pub-1234567890123456'
     3. Copy the same ID into /ads.txt
     4. Optionally map each slot name to its AdSense slot ID below.          */
  adsense: {
    enabled: false,
    client: '',
    slots: {
      /* 'home-top': '1234567890', 'home-middle': '...', ... */
    }
  },

  /* ---- Google AdMob (App Only) -------------------------------------------
     Used strictly when running inside the App (Android App, WebView, or PWA).
     Website ads will NOT show in the App; instead AdMob banner & interstitial ads
     will be served in the app.
     Replace with your real AdMob Ad Unit IDs before releasing to Play Store: */
  admob: {
    enabled: true,
    testMode: true, // Set to false when using your real production AdMob IDs
    appId: 'ca-app-pub-3940256099942544~3347511713', // Google AdMob App ID
    bannerSlotId: 'ca-app-pub-3940256099942544/6300978111', // Test Banner ID
    interstitialSlotId: 'ca-app-pub-3940256099942544/1033173712', // Test Interstitial ID
    rewardedSlotId: 'ca-app-pub-3940256099942544/5224354917',
    showOnExport: true // Shows AdMob interstitial after saving/downloading design
  },

  /* ---- App Download & Package Information -------------------------------- */
  app: {
    version: '2.4.0',
    apkDownloadUrl: '/downloads/FestivalStudio.apk',
    directDownloadPath: '/download/apk',
    packageName: 'com.festivalstudio.app',
    name: 'Festival Studio App'
  },

  /* ---- Analytics --------------------------------------------------------
     Either a GA4 measurement ID ('G-XXXXXXX') or leave empty and use a
     cookieless tool such as Cloudflare Web Analytics instead.              */
  analytics: {
    enabled: false,
    ga4: ''
  },

  /* ---- Cookie notice ----------------------------------------------------
     'auto'  — only shown when ads or analytics are enabled (recommended)
     'always'— always shown
     'never' — never shown (only legal if you load nothing that needs it)   */
  consent: 'auto',

  /* ---- Progressive Web App --------------------------------------------- */
  installPrompt: true
};
