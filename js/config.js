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
  siteUrl: 'https://rajverma42.github.io/Festival-Studio',

  /* Contact address shown on the Contact page and used by the mailto form.  */
  contactEmail: 'officefestivalstudio@gmail.com',

  /* ---- Google AdSense ---------------------------------------------------
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
