/* ============================================================================
   Festival Studio — tools/strings.js  (development tool only)
   Every word of page copy, in English and Hindi. build.js renders the SAME
   page bodies twice from this table, so the two languages can never drift.
   {name} / {hi} / {year} are replaced at build time.
   ========================================================================== */
'use strict';

const en = {
  code: 'en', htmlLang: 'en-IN', dir: 'ltr', dev: false,
  langName: 'English', otherLangName: 'हिन्दी', switchTo: 'हिन्दी में देखें',

  nav: {
    home: 'Home', templates: 'Festival Templates', postMaker: 'Post Maker',
    gifMaker: 'GIF Maker', statusMaker: 'Status Maker', wishes: 'Wishes',
    howItWorks: 'How It Works', about: 'About', calendar: 'Festival Calendar',
    contact: 'Contact', faq: 'FAQ'
  },

  footer: {
    blurb: 'Free Indian festival post, GIF and status maker. No signup, no watermark, no AI — everything is created right inside your browser.',
    studio: 'Festival Studio', tools: 'Tools', legal: 'Legal', explore: 'Explore',
    rights: '© {year} Festival Studio. All rights reserved.',
    made: 'Made in India · Works offline after first load',
    install: 'Install app'
  },

  legalNav: {
    privacy: 'Privacy Policy', cookies: 'Cookie Policy', terms: 'Terms & Conditions',
    disclaimer: 'Disclaimer', dmca: 'Copyright / DMCA', accessibility: 'Accessibility',
    licences: 'Licences & Credits', sitemap: 'Sitemap', advertise: 'Advertise'
  },

  common: {
    skip: 'Skip to content', menu: 'Open menu', theme: 'Switch colour theme',
    search: 'Search festivals…', searchTemplates: 'Search templates…',
    browseAll: 'Browse all templates', allFestivals: 'All festivals', allCategories: 'All categories',
    loadMore: 'Load more templates', copy: 'Copy', copied: 'Copied',
    createPost: 'Create Festival Post', createGif: 'Create GIF', createStatus: 'Create Status',
    home: 'Home', ad: 'AD SLOT', quick: '⚡ Quick'
  },

  home: {
    title: 'Festival Studio — Free Indian Festival Post, GIF & Status Maker',
    desc: 'Create beautiful Indian festival posts, animated GIFs and WhatsApp statuses free. Diwali, Holi, Eid, Raksha Bandhan and more. No signup, no watermark, works on mobile.',
    h1a: 'Create Stunning ', h1grad: 'Festival Posts', h1b: ' in Seconds',
    sub: 'Free Indian Festival Post, GIF and Status Maker. No Signup. No AI. No Watermark. Your photos never leave your phone.',
    badges: ['✨ <b>100% Free</b>', '🚫 No Signup', '💧 No Watermark', '📱 Works on mobile'],
    privacy: 'Your uploaded photos are processed in your browser and are not uploaded to our server.',
    festEyebrow: 'Pick a festival', festHead: 'Popular Indian festivals',
    festSub: 'Ready-made designs for every major festival — in Hindi, English and Hinglish.',
    upcomingEyebrow: 'Coming up', upcomingHead: 'Next festivals', fullCalendar: 'Full calendar →',
    featEyebrow: 'Everything you need', featHead: 'A real editor, right in your browser',
    features: [
      ['🖼️', 'Canvas editor', 'Drag, resize, rotate and layer text, photos, shapes and stickers on a true canvas — not a fake preview.'],
      ['🎞️', 'Real GIF export', 'Animated greetings encoded on your own device with a built-in GIF encoder. No API, no upload, no waiting queue.'],
      ['🇮🇳', 'Hindi & English', 'Proper Unicode Devanagari support with हिन्दी, English and Hinglish wishes for every festival.'],
      ['🏪', 'Business posts', 'Add your business name, logo, phone, website and offer — perfect for shops, clinics and service businesses.'],
      ['🔒', 'Private by design', 'No account, no tracking of your designs, no photo uploads. Drafts stay in your own browser storage.'],
      ['⚡', 'Built for phones', 'Touch-friendly controls, lazy-loaded previews and a fast first load even on a 4G connection.']
    ],
    stepsEyebrow: 'Three steps', stepsHead: 'How Festival Studio works',
    steps: [
      ['Choose a festival or template', 'Start from any of the ready-made designs, or open a blank canvas in the size you need.'],
      ['Add your name, photo and message', 'Type your details once — templates fill themselves in. Upload a photo or logo straight from your gallery.'],
      ['Download or share', 'Export a clean PNG, JPG or animated GIF with no watermark, then share it on WhatsApp, Instagram or Facebook.']
    ],
    ctaStart: 'Start designing free', ctaQuick: '⚡ Photo → Post in 4 taps', ctaGuide: 'Read the full guide',
    wishesEyebrow: 'Words for the day', wishesHead: 'Festival wishes in Hindi & English',
    wishesSub: 'Hundreds of ready wishes, status lines and business greetings — copy one, or drop it straight onto a design.',
    wishesCta: 'Browse all wishes →'
  },

  templates: {
    title: 'Festival Templates — Free Indian Festival Post Templates | Festival Studio',
    desc: 'Browse free festival templates for Diwali, Holi, Eid, Raksha Bandhan and more. Wishes, business greetings, offers, Instagram posts, stories and WhatsApp status sizes.',
    h1: 'Festival templates',
    intro: 'Every template is fully editable — change the words, colours, photo and size. Nothing is locked behind a subscription and nothing carries a watermark.'
  },

  post: {
    title: 'Festival Post Maker — Free Online Canvas Editor | Festival Studio',
    desc: 'Free festival post maker with a real canvas editor: text, photos, stickers, shapes, layers, undo/redo and PNG or JPG export. No signup, no watermark.',
    barTitle: 'Post Maker', h1: 'Free festival post maker',
    intro: 'Design Diwali, Holi, Eid, Raksha Bandhan and every other Indian festival post in your browser. Add your name, business details, photo and logo, then download a clean PNG or JPG at full social-media resolution.',
    shortcuts: '<strong>Keyboard shortcuts:</strong> Ctrl + Z undo · Ctrl + Y redo · Ctrl + D duplicate · Delete removes the selected layer · arrow keys nudge.'
  },

  status: {
    title: 'WhatsApp Status Maker — Festival Status & Story Maker | Festival Studio',
    desc: 'Make WhatsApp status, Instagram story and Facebook story festival greetings free. Add your photo, name, stickers and animated effects, then download instantly.',
    barTitle: 'Status Maker', h1: 'Festival status maker',
    intro: 'Built for the 1080 × 1920 vertical formats used by WhatsApp Status, Instagram Stories and Facebook Stories. Add an animated effect and send it to the GIF maker to export a moving status.'
  },

  gif: {
    title: 'Festival GIF Maker — Free Animated Greeting Maker | Festival Studio',
    desc: 'Create animated festival GIFs free in your browser. Sparkles, fireworks, confetti and diya glow effects, adjustable FPS and duration, instant GIF download.',
    barTitle: 'GIF Maker', h1: 'Free festival GIF maker',
    intro: 'The GIF is encoded by your own device using a built-in encoder — there is no upload, no queue and no paid API. Smaller sizes and shorter durations encode faster on older phones.'
  },

  calendar: {
    title: 'Indian Festival Calendar {years} with Countdown | Festival Studio',
    desc: 'Indian festival calendar with dates and countdowns for Diwali, Holi, Eid, Raksha Bandhan, Ganesh Chaturthi, Navratri, Chhath Puja and more.',
    h1: 'Indian festival calendar',
    intro: 'Dates with a live countdown, so you can prepare your posts before the rush. Tap any festival to open its post maker.',
    year: 'Year',
    note: 'Most Indian festivals follow lunar calendars, so their dates change every year. Dates marked <span class="tag">approx</span> depend on moon sighting or regional panchang — please confirm locally. Dates are configured in <code>js/festivals.js</code> under <code>FS.FESTIVAL_DATES</code>; add a new year block there once a year to keep this calendar accurate.'
  },

  how: {
    title: 'How It Works — Making Festival Posts, GIFs & Status | Festival Studio',
    desc: 'A step-by-step guide to making festival posts, animated GIFs and WhatsApp statuses with Festival Studio — free, without signing up.',
    h1: 'How Festival Studio works',
    lead: 'Festival Studio is a static web app. Once the page has loaded, every design you make is rendered by your own device using the HTML5 Canvas API. Nothing is sent to a server, which is why there is no account, no queue and no watermark.',
    h2post: 'Making a festival post',
    postSteps: [
      ['Open the Post Maker', 'Choose a festival from the Design tab. Each festival ships with nine layouts — wishes, business greetings, offers, Instagram posts and stories, WhatsApp status and Facebook posts.'],
      ['Fill in your details once', 'Type your name, business name, phone, website, address, offer and custom message in the Design tab. Templates that use those fields update automatically.'],
      ['Edit anything on the canvas', 'Tap an element to select it. Drag to move, pull a corner dot to resize, use the top dot to rotate. Layers snap to the centre and to each other, and the Selected tab exposes fonts, colours, spacing, shadow, outline, opacity and rotation.'],
      ['Add photos, stickers and shapes', 'Upload a photo or logo from your gallery, add vector festival stickers such as diya, rangoli, fireworks, dhol and kalash, or drop in shapes for badges and banners.'],
      ['Download', 'Open the Export tab and pick PNG or JPG, with an optional quality slider for JPG and a higher resolution option. The file is named after the festival, for example <code>diwali-festival-post.png</code>.']
    ],
    h2gif: 'Making an animated GIF',
    gifText: 'The GIF Maker animates your design and encodes a real <code>.gif</code> file on your device — in a background Web Worker, so the preview keeps running. Choose an animation style (reveal, zoom, pop, bounce, slide or float), a festive overlay effect (sparkles, confetti, fireworks, diya glow, petals, snow or a light sweep), then set frames per second, duration and output size. Press <strong>Generate GIF</strong> and a progress bar shows the encoding frame by frame.',
    gifNote: 'Larger and longer GIFs take more time and produce bigger files. On an older phone, start with 260 px, 10 fps and 2 seconds.',
    h2status: 'Making a WhatsApp status',
    statusText: 'The Status Maker opens directly in the 1080 × 1920 vertical format used by WhatsApp Status, Instagram Stories and Facebook Stories. Add an animated overlay effect in the Background tab and use <em>Animate this design as a GIF</em> in the Export tab to hand it to the GIF Maker.',
    h2photo: 'Photo to festival post',
    photoText: 'In a hurry? Press <strong>⚡ Quick</strong> at the top of the editor: upload a photo, choose the festival, pick a layout, type your name and press Generate. Four taps, no signup.',
    h2save: 'Saving your work',
    saveText: 'Drafts are stored in your browser’s local storage on the device you are using. They are never uploaded. Clearing your browser data, or using private browsing, removes them.'
  },

  about: {
    title: 'About Festival Studio — Free Festival Post Maker',
    desc: 'Festival Studio is a free, privacy-first Indian festival post, GIF and status maker that runs entirely in your browser. No signup, no AI, no watermark.',
    h1: 'About Festival Studio',
    lead: 'Festival Studio exists because making a simple Diwali or Eid greeting should not require an account, a subscription, or a watermark across the middle of your family photo.',
    h2what: 'What it is',
    what: 'A free Indian festival post, GIF and status maker built with plain HTML, CSS and JavaScript. It runs as a static site — there is no backend, no database and no user accounts. Every design is drawn by your own browser with the Canvas API.',
    h2never: 'What it will never do',
    never: [
      'Ask you to sign up, log in or verify an email.',
      'Upload your photos to a server.',
      'Put a watermark on your download.',
      'Charge for a template, a font, a sticker or an export.'
    ],
    h2free: 'How it stays free',
    free: 'The site is funded by clearly-marked advertising slots placed outside the editing area, so they never cover a control you are using. Advertising is the only monetisation — your designs are not a product.',
    h2lang: 'Languages',
    lang: 'Every festival ships with wishes in Hindi (Devanagari), English and Hinglish, and the whole interface is available in both English and हिन्दी. Devanagari rendering uses open-source Google Fonts, so Hindi text stays crisp at any export size.',
    h2open: 'Open to suggestions',
    open: 'Missing a festival, a template style or a sticker? Send a suggestion — festivals and templates are defined in a single configuration file and are quick to add.'
  },

  contact: {
    title: 'Contact — Festival Studio',
    desc: 'Get in touch with Festival Studio for feedback, festival requests, template ideas or advertising enquiries.',
    h1: 'Contact us',
    lead: 'Feedback, a missing festival, a template idea or an advertising enquiry — all welcome. Because Festival Studio has no backend, this form prepares an email in your own mail app; nothing is sent to us until you press send there.',
    name: 'Your name', email: 'Your email', subject: 'Subject', message: 'Message',
    subjects: ['Feedback', 'Request a festival', 'Template idea', 'Report a problem', 'Advertising', 'Other'],
    submit: 'Open in my email app',
    error: 'Please add your name, a valid email address and a message.',
    direct: 'Prefer to write directly? Email <strong>{email}</strong>.'
  },

  wishesHub: {
    title: 'Festival Wishes in Hindi & English — Copy & Share Free | Festival Studio',
    desc: 'Hundreds of festival wishes, WhatsApp status lines and business greetings in Hindi, English and Hinglish. Copy free, or turn any wish into a poster in one tap.',
    h1: 'Festival wishes, status lines and greetings',
    intro: 'Every wish here is original, free to copy, and one tap away from becoming a poster or animated GIF. Pick a festival to see its Hindi, English and Hinglish collection.'
  },

  festival: {
    title: '{name} Post Maker — Free {name} Poster, Banner & Wishes | Festival Studio',
    desc: 'Create free {name} posts, posters and greetings online. {name} templates in Hindi and English with your name, photo, business logo and offer. No signup, no watermark.',
    h1: '{name} Post Maker',
    intro: '{desc} Make a free {name} post, poster or WhatsApp status in Hindi ({hi}), English or Hinglish — with your own name, photo, business details and logo.',
    ctaPost: 'Create {name} post', ctaGif: 'Animated GIF', ctaStatus: 'WhatsApp status',
    tplHead: '{name} templates',
    tplSub: 'Nine ready layouts — wishes, business greeting, personal photo greeting, festival offer, bold typography, WhatsApp status, Instagram post, Instagram story and Facebook post.',
    wishHead: '{name} wishes you can use',
    wishSub: 'Tap any wish inside the editor’s Design tab to drop it straight onto your canvas, or copy one from here.',
    allWishes: 'See all {name} wishes →',
    howHead: 'How to make a {name} post',
    steps: [
      ['Pick a {name} template', 'Choose from the grid above, or open the Post Maker and select {name} in the Design tab.'],
      ['Add your details', 'Type your name — or your business name, phone, website and offer — and the template fills itself in.'],
      ['Add a photo or logo', 'Upload from your gallery in the Photo tab. Round it off, add a border or a drop shadow.'],
      ['Download and share', 'Export a PNG or JPG with no watermark, or send it to the GIF maker for an animated greeting.']
    ],
    faqHead: 'Frequently asked questions',
    faqs: [
      ['Is the {name} post maker really free?', 'Yes. Every template, sticker, font and export is free with no signup, no watermark and no paid plan. Festival Studio is funded by the advertising slots you see around the editor.'],
      ['Can I add my business name and logo to a {name} post?', 'Yes. Open the Design tab, type your business name, phone, website and offer once, then pick the Business Greeting or Festival Offer layout. Use the Photo tab to upload your logo.'],
      ['Do you upload my photo anywhere?', 'No. Your photo is read by your browser and drawn onto a canvas on your own device. It never reaches a server, which is also why the editor keeps working if your connection drops.'],
      ['Can I write {name} wishes in Hindi?', 'Yes. Devanagari is fully supported with open-source Hindi fonts, and every {name} template ships with ready-made हिन्दी, English and Hinglish wishes you can insert with one tap.'],
      ['What size should a {name} post be?', 'Use 1080 × 1080 for Instagram and Facebook feeds, 1080 × 1920 for WhatsApp Status and Stories, and 1200 × 630 for a Facebook link post. All of these are one tap away in the Canvas size menu.']
    ],
    moreHead: 'More festivals',
    dateLabel: '{name} dates:',
    approxNote: ' (approximate — depends on moon sighting or regional panchang)'
  },

  wishesPage: {
    title: '{name} Wishes in Hindi & English — {count}+ Free Messages | Festival Studio',
    desc: 'Free {name} wishes, status lines and business greetings in Hindi, English and Hinglish. Copy any message, or turn it into a {name} poster or GIF in one tap.',
    h1: '{name} Wishes — Hindi, English & Hinglish',
    intro: 'A hand-written collection of {count} {name} messages you can copy for free. Nothing here is auto-generated, and every line is short enough for WhatsApp. Want it as a picture? Open the {name} post maker and the same wishes are one tap away.',
    makeCta: 'Turn a wish into a poster →',
    gifCta: 'Make an animated {name} GIF →',
    tip: 'Tip: tap <strong>Copy</strong> next to any line, then paste it into WhatsApp, Instagram or a status.',
    relatedHead: 'Wishes for other festivals'
  },

  faqPage: {
    title: 'FAQ — Festival Studio',
    desc: 'Answers about making free festival posts, GIFs and WhatsApp statuses with Festival Studio: privacy, watermarks, image sizes, Hindi fonts and offline use.',
    h1: 'Frequently asked questions',
    items: [
      ['Is Festival Studio really free?', 'Yes, completely. There is no paid plan, no credit limit and no premium template. The site is funded by the clearly-marked advertising slots placed outside the editor.'],
      ['Do I need to create an account?', 'No. There is no signup, no login and no email verification anywhere on the site — and there never will be.'],
      ['Will my download have a watermark?', 'No. PNG, JPG and GIF exports are clean.'],
      ['Where do my photos go?', 'Nowhere. Your browser reads the file from your device and draws it onto a canvas locally. There is no server that could receive it.'],
      ['Can I use the designs commercially?', 'Yes — you can use designs you create for your shop, clinic or business page. You may not redistribute our templates or stickers as a standalone asset pack.'],
      ['Does it work on a slow phone?', 'Yes. Previews are pre-rendered images, GIF encoding runs in a background worker, and the whole site is under a megabyte of code. On an older phone, use the 260 px GIF size.'],
      ['Does it work offline?', 'After your first visit, yes — the editor, templates and stickers are cached by a service worker.'],
      ['Why is a festival date marked “approx”?', 'Festivals like Eid, Onam, Durga Puja and Pongal depend on moon sighting or regional panchang, so the exact date can differ by a day or by region. Always confirm locally.'],
      ['Can I get a size that is not listed?', 'Yes — choose “Custom size…” in the Design tab and enter any width and height between 200 and 4000 pixels.'],
      ['How do I report a problem or request a festival?', 'Use the contact page. Adding a festival takes only a few minutes because everything lives in one configuration file.']
    ]
  },

  advertise: {
    title: 'Advertise — Festival Studio',
    desc: 'Advertising information for Festival Studio: audience, ad placements and contact details.',
    h1: 'Advertise on Festival Studio',
    lead: 'Festival Studio is a free tool used by people creating festival greetings for their families and small businesses across India. Advertising keeps it free.',
    h2where: 'Where ads appear',
    where: 'Ad slots sit above and below page content, and outside the editing surface. No advertisement is ever placed over a canvas control, and there are no pop-ups, interstitials or auto-playing video ads.',
    h2policy: 'What we will not accept',
    policy: [
      'Deceptive creatives, fake system warnings or fake download buttons.',
      'Adult content, gambling targeted at minors, or anything unlawful in India.',
      'Ads that imitate the Festival Studio interface.',
      'Anything that collects personal data without a clear disclosure.'
    ],
    h2contact: 'Get in touch',
    contact: 'Email <strong>{email}</strong> with your campaign, dates and target regions.'
  },

  cookies: {
    title: 'Cookie Policy — Festival Studio',
    desc: 'How Festival Studio uses browser storage and advertising cookies, and how to control them.',
    h1: 'Cookie Policy',
    h2what: 'What we store ourselves',
    what: 'Festival Studio has no backend, so we set no cookies of our own. We do use your browser’s local storage — on your device only — to remember your theme, your language, your last selected festival, the details you type into templates, and any drafts you save. You can clear all of it at any time from your browser settings.',
    h2ads: 'Advertising and analytics cookies',
    ads: 'If advertising or analytics is enabled on this site, those third-party services may set cookies or use device identifiers to serve and measure ads. They load only after you accept the cookie notice. Declining keeps the site fully usable — every editor feature works either way.',
    h2control: 'How to control cookies',
    control: 'Use the cookie notice to accept or decline, clear site data in your browser, use private browsing, or install a content blocker. None of this breaks the editor.',
    h2changes: 'Changes',
    changes: 'If we add or remove a service that uses cookies, this page is updated.'
  },

  dmca: {
    title: 'Copyright & DMCA Policy — Festival Studio',
    desc: 'How to report copyright concerns about Festival Studio templates, stickers or content.',
    h1: 'Copyright & DMCA policy',
    lead: 'Festival Studio does not host user content. Designs are created and stored on the visitor’s own device, so there is nothing on our servers to take down. This page covers the material we publish ourselves.',
    h2ours: 'Our own material',
    ours: 'Templates, layouts, vector stickers and written wishes on this site are created for Festival Studio. You may use them freely inside designs you make here, including for your business. You may not resell or redistribute them as a standalone template, sticker or asset pack.',
    h2claim: 'If you believe something infringes your rights',
    claim: 'Email us with: (1) a description of the work, (2) the exact URL on this site, (3) your contact details, (4) a statement that you believe the use is unauthorised, and (5) a statement that the information is accurate. We review every report and remove genuinely infringing material promptly.',
    h2user: 'Content you create',
    user: 'You are responsible for the photos, logos and text you place in your designs, and for holding the rights to use them.'
  },

  accessibility: {
    title: 'Accessibility Statement — Festival Studio',
    desc: 'How Festival Studio supports keyboard navigation, screen readers, contrast and touch accessibility.',
    h1: 'Accessibility statement',
    lead: 'We want Festival Studio to be usable by as many people as possible, including on assistive technology.',
    h2doing: 'What we do',
    doing: [
      'Semantic HTML with a single H1, landmark regions and a skip link on every page.',
      'Every control is a real button or link, reachable and operable by keyboard.',
      'Visible focus outlines that meet contrast requirements in both light and dark themes.',
      'ARIA labels on icon-only buttons, canvas previews and tool panels; live regions for toasts and progress.',
      'Touch targets of at least 44 px in the editor.',
      'A dark theme, and full respect for the “reduce motion” system setting.'
    ],
    h2limits: 'Known limitations',
    limits: 'The drag-and-drop canvas is inherently visual. Keyboard users can still select layers from the Layers panel and move them with the arrow keys, resize and rotate from the Selected panel, and export normally — but fine positioning by ear alone is difficult. We are looking at a numeric position control to improve this.',
    h2feedback: 'Feedback',
    feedback: 'If something blocks you, please tell us through the contact page and describe the assistive technology you use. Accessibility reports go to the top of the list.'
  },

  licences: {
    title: 'Licences & Credits — Festival Studio',
    desc: 'Open-source fonts and technologies used by Festival Studio, and the licence for its templates and stickers.',
    h1: 'Licences & credits',
    h2fonts: 'Fonts',
    fonts: 'Typography uses open-source families served by Google Fonts under the SIL Open Font License: Poppins, Noto Sans Devanagari, Tiro Devanagari Hindi, Mukta, Rozha One, Baloo 2, Playfair Display and Anton. Each remains under its own licence.',
    h2code: 'Code',
    code: 'Festival Studio is written in plain HTML, CSS and JavaScript with no runtime framework and no third-party JavaScript library. The animated GIF encoder, the canvas engine and every vector sticker were written for this project.',
    h2assets: 'Templates and stickers',
    assets: 'Templates, layouts and stickers may be used freely in designs you create here, for personal or commercial purposes. They may not be redistributed or sold as a standalone asset pack.',
    h2trademarks: 'Trademarks',
    trademarks: 'WhatsApp, Instagram, Facebook, YouTube, X and LinkedIn are trademarks of their respective owners, referenced only to describe common image sizes. Festival Studio is not affiliated with any of them.'
  },

  sitemapPage: {
    title: 'Sitemap — Festival Studio',
    desc: 'Every page on Festival Studio in one list: tools, festival post makers, wishes and legal pages.',
    h1: 'Sitemap',
    intro: 'Every page on this site, in one place.',
    h2main: 'Main pages', h2post: 'Festival post makers', h2gif: 'Festival GIF makers',
    h2wishes: 'Festival wishes', h2legal: 'Legal & info', h2hi: 'हिन्दी pages'
  },

  notFound: {
    title: 'Page not found — Festival Studio',
    desc: 'That page does not exist. Head back to the festival post maker.',
    h1: 'That page has wandered off',
    lead: 'The link may be old or mistyped. Everything still works from here:'
  }
};

/* ------------------------------------------------------------------------ */
const hi = {
  code: 'hi', htmlLang: 'hi', dir: 'ltr', dev: true,
  langName: 'हिन्दी', otherLangName: 'English', switchTo: 'View in English',

  nav: {
    home: 'होम', templates: 'टेम्पलेट', postMaker: 'पोस्ट मेकर',
    gifMaker: 'GIF मेकर', statusMaker: 'स्टेटस मेकर', wishes: 'शुभकामनाएँ',
    howItWorks: 'कैसे काम करता है', about: 'हमारे बारे में', calendar: 'त्योहार कैलेंडर',
    contact: 'संपर्क', faq: 'सवाल-जवाब'
  },

  footer: {
    blurb: 'मुफ़्त भारतीय त्योहार पोस्ट, GIF और स्टेटस मेकर। न साइनअप, न वॉटरमार्क, न AI — सब कुछ आपके ब्राउज़र में ही बनता है।',
    studio: 'फेस्टिवल स्टूडियो', tools: 'टूल्स', legal: 'कानूनी', explore: 'और देखें',
    rights: '© {year} Festival Studio. सर्वाधिकार सुरक्षित।',
    made: 'भारत में बना · पहली बार खुलने के बाद ऑफ़लाइन भी चलता है',
    install: 'ऐप इंस्टॉल करें'
  },

  legalNav: {
    privacy: 'प्राइवेसी पॉलिसी', cookies: 'कुकी पॉलिसी', terms: 'नियम व शर्तें',
    disclaimer: 'अस्वीकरण', dmca: 'कॉपीराइट / DMCA', accessibility: 'सुगम्यता',
    licences: 'लाइसेंस व क्रेडिट', sitemap: 'साइटमैप', advertise: 'विज्ञापन दें'
  },

  common: {
    skip: 'सीधे कंटेंट पर जाएँ', menu: 'मेन्यू खोलें', theme: 'थीम बदलें',
    search: 'त्योहार खोजें…', searchTemplates: 'टेम्पलेट खोजें…',
    browseAll: 'सभी टेम्पलेट देखें', allFestivals: 'सभी त्योहार', allCategories: 'सभी श्रेणियाँ',
    loadMore: 'और टेम्पलेट देखें', copy: 'कॉपी', copied: 'कॉपी हो गया',
    createPost: 'फेस्टिवल पोस्ट बनाएँ', createGif: 'GIF बनाएँ', createStatus: 'स्टेटस बनाएँ',
    home: 'होम', ad: 'विज्ञापन स्थान', quick: '⚡ झटपट'
  },

  home: {
    title: 'फेस्टिवल स्टूडियो — मुफ़्त त्योहार पोस्ट, GIF और स्टेटस मेकर',
    desc: 'दिवाली, होली, ईद, रक्षाबंधन और हर भारतीय त्योहार के लिए मुफ़्त पोस्ट, GIF और व्हाट्सऐप स्टेटस बनाएँ। न साइनअप, न वॉटरमार्क — मोबाइल पर भी आसान।',
    h1a: 'सेकंडों में बनाएँ ', h1grad: 'शानदार फेस्टिवल पोस्ट', h1b: '',
    sub: 'मुफ़्त भारतीय त्योहार पोस्ट, GIF और स्टेटस मेकर। न साइनअप, न AI, न वॉटरमार्क। आपकी फ़ोटो कभी आपके फ़ोन से बाहर नहीं जाती।',
    badges: ['✨ <b>100% मुफ़्त</b>', '🚫 साइनअप नहीं', '💧 वॉटरमार्क नहीं', '📱 मोबाइल पर आसान'],
    privacy: 'आपकी अपलोड की गई फ़ोटो आपके ब्राउज़र में ही प्रोसेस होती है, हमारे सर्वर पर नहीं जाती।',
    festEyebrow: 'त्योहार चुनें', festHead: 'लोकप्रिय भारतीय त्योहार',
    festSub: 'हर बड़े त्योहार के लिए तैयार डिज़ाइन — हिन्दी, अंग्रेज़ी और हिंग्लिश में।',
    upcomingEyebrow: 'आने वाले', upcomingHead: 'अगले त्योहार', fullCalendar: 'पूरा कैलेंडर →',
    featEyebrow: 'सब कुछ एक जगह', featHead: 'असली एडिटर, आपके ब्राउज़र में',
    features: [
      ['🖼️', 'कैनवास एडिटर', 'टेक्स्ट, फ़ोटो, आकृतियाँ और स्टिकर — खिसकाएँ, बड़ा-छोटा करें, घुमाएँ। असली कैनवास, नकली प्रीव्यू नहीं।'],
      ['🎞️', 'असली GIF एक्सपोर्ट', 'एनिमेटेड ग्रीटिंग आपके ही डिवाइस पर बनती है। न API, न अपलोड, न इंतज़ार।'],
      ['🇮🇳', 'हिन्दी और अंग्रेज़ी', 'पूरा यूनिकोड देवनागरी सपोर्ट — हर त्योहार के लिए हिन्दी, English और Hinglish शुभकामनाएँ।'],
      ['🏪', 'बिज़नेस पोस्ट', 'दुकान, क्लिनिक या सर्विस बिज़नेस के लिए — नाम, लोगो, फ़ोन, वेबसाइट और ऑफ़र जोड़ें।'],
      ['🔒', 'प्राइवेसी पहले', 'न अकाउंट, न ट्रैकिंग, न फ़ोटो अपलोड। ड्राफ़्ट आपके ब्राउज़र में ही रहते हैं।'],
      ['⚡', 'फ़ोन के लिए बना', 'टच-फ्रेंडली कंट्रोल, हल्के प्रीव्यू और 4G पर भी तेज़ लोडिंग।']
    ],
    stepsEyebrow: 'तीन कदम', stepsHead: 'फेस्टिवल स्टूडियो कैसे काम करता है',
    steps: [
      ['त्योहार या टेम्पलेट चुनें', 'तैयार डिज़ाइन में से कोई चुनें, या अपनी पसंद के साइज़ में खाली कैनवास खोलें।'],
      ['नाम, फ़ोटो और संदेश जोड़ें', 'अपनी जानकारी एक बार लिखें — टेम्पलेट अपने आप भर जाते हैं। गैलरी से फ़ोटो या लोगो अपलोड करें।'],
      ['डाउनलोड या शेयर करें', 'बिना वॉटरमार्क PNG, JPG या एनिमेटेड GIF डाउनलोड करें और व्हाट्सऐप, इंस्टाग्राम या फ़ेसबुक पर भेजें।']
    ],
    ctaStart: 'मुफ़्त डिज़ाइन शुरू करें', ctaQuick: '⚡ फ़ोटो से पोस्ट — 4 टैप में', ctaGuide: 'पूरी गाइड पढ़ें',
    wishesEyebrow: 'दिन के शब्द', wishesHead: 'हिन्दी और अंग्रेज़ी में त्योहार शुभकामनाएँ',
    wishesSub: 'सैकड़ों तैयार शुभकामनाएँ, स्टेटस लाइनें और बिज़नेस ग्रीटिंग — कॉपी करें या सीधे डिज़ाइन पर लगाएँ।',
    wishesCta: 'सभी शुभकामनाएँ देखें →'
  },

  templates: {
    title: 'त्योहार टेम्पलेट — मुफ़्त फेस्टिवल पोस्ट टेम्पलेट | फेस्टिवल स्टूडियो',
    desc: 'दिवाली, होली, ईद, रक्षाबंधन और अन्य त्योहारों के मुफ़्त टेम्पलेट। शुभकामनाएँ, बिज़नेस ग्रीटिंग, ऑफ़र, इंस्टाग्राम पोस्ट, स्टोरी और व्हाट्सऐप स्टेटस साइज़।',
    h1: 'त्योहार टेम्पलेट',
    intro: 'हर टेम्पलेट पूरी तरह बदला जा सकता है — शब्द, रंग, फ़ोटो और साइज़। न कोई सब्सक्रिप्शन, न वॉटरमार्क।'
  },

  post: {
    title: 'फेस्टिवल पोस्ट मेकर — मुफ़्त ऑनलाइन कैनवास एडिटर | फेस्टिवल स्टूडियो',
    desc: 'मुफ़्त फेस्टिवल पोस्ट मेकर — टेक्स्ट, फ़ोटो, स्टिकर, आकृतियाँ, लेयर, अनडू/रिडू और PNG या JPG डाउनलोड। न साइनअप, न वॉटरमार्क।',
    barTitle: 'पोस्ट मेकर', h1: 'मुफ़्त फेस्टिवल पोस्ट मेकर',
    intro: 'दिवाली, होली, ईद, रक्षाबंधन और हर भारतीय त्योहार की पोस्ट अपने ब्राउज़र में बनाएँ। अपना नाम, बिज़नेस जानकारी, फ़ोटो और लोगो जोड़ें और पूरे सोशल मीडिया रिज़ॉल्यूशन में PNG या JPG डाउनलोड करें।',
    shortcuts: '<strong>कीबोर्ड शॉर्टकट:</strong> Ctrl + Z वापस · Ctrl + Y दोबारा · Ctrl + D कॉपी · Delete चयनित लेयर हटाएँ · ऐरो की से खिसकाएँ।'
  },

  status: {
    title: 'व्हाट्सऐप स्टेटस मेकर — फेस्टिवल स्टेटस और स्टोरी मेकर | फेस्टिवल स्टूडियो',
    desc: 'व्हाट्सऐप स्टेटस, इंस्टाग्राम स्टोरी और फ़ेसबुक स्टोरी के लिए मुफ़्त त्योहार ग्रीटिंग बनाएँ। फ़ोटो, नाम, स्टिकर और एनिमेशन जोड़ें और तुरंत डाउनलोड करें।',
    barTitle: 'स्टेटस मेकर', h1: 'फेस्टिवल स्टेटस मेकर',
    intro: 'व्हाट्सऐप स्टेटस, इंस्टाग्राम स्टोरी और फ़ेसबुक स्टोरी के 1080 × 1920 वर्टिकल फ़ॉर्मैट के लिए बना है। एनिमेटेड इफ़ेक्ट लगाइए और GIF मेकर में भेजकर चलता-फिरता स्टेटस बनाइए।'
  },

  gif: {
    title: 'फेस्टिवल GIF मेकर — मुफ़्त एनिमेटेड ग्रीटिंग मेकर | फेस्टिवल स्टूडियो',
    desc: 'ब्राउज़र में ही मुफ़्त एनिमेटेड त्योहार GIF बनाएँ। स्पार्कल, आतिशबाज़ी, कन्फ़ेटी और दीये की चमक, FPS और अवधि सेट करें, तुरंत डाउनलोड करें।',
    barTitle: 'GIF मेकर', h1: 'मुफ़्त फेस्टिवल GIF मेकर',
    intro: 'GIF आपके अपने डिवाइस पर बनता है — न अपलोड, न लाइन में इंतज़ार, न कोई पेड API। पुराने फ़ोन पर छोटा साइज़ और कम अवधि तेज़ी से बनती है।'
  },

  calendar: {
    title: 'भारतीय त्योहार कैलेंडर {years} — तारीख़ और काउंटडाउन | फेस्टिवल स्टूडियो',
    desc: 'दिवाली, होली, ईद, रक्षाबंधन, गणेश चतुर्थी, नवरात्रि, छठ पूजा और अन्य त्योहारों की तारीख़ें और काउंटडाउन।',
    h1: 'भारतीय त्योहार कैलेंडर',
    intro: 'हर त्योहार की तारीख़ और लाइव काउंटडाउन, ताकि आप भीड़ से पहले अपनी पोस्ट तैयार कर सकें। किसी भी त्योहार पर टैप करके उसका पोस्ट मेकर खोलें।',
    year: 'वर्ष',
    note: 'ज़्यादातर भारतीय त्योहार चंद्र कैलेंडर पर चलते हैं, इसलिए तारीख़ें हर साल बदलती हैं। <span class="tag">approx</span> लिखी तारीख़ें चाँद दिखने या क्षेत्रीय पंचांग पर निर्भर हैं — कृपया स्थानीय पंचांग से पुष्टि करें। तारीख़ें <code>js/festivals.js</code> की <code>FS.FESTIVAL_DATES</code> में हैं; साल में एक बार नया ब्लॉक जोड़ दीजिए।'
  },

  how: {
    title: 'कैसे काम करता है — फेस्टिवल पोस्ट, GIF और स्टेटस बनाना | फेस्टिवल स्टूडियो',
    desc: 'फेस्टिवल स्टूडियो से मुफ़्त में त्योहार पोस्ट, एनिमेटेड GIF और व्हाट्सऐप स्टेटस बनाने की पूरी गाइड — बिना साइनअप।',
    h1: 'फेस्टिवल स्टूडियो कैसे काम करता है',
    lead: 'फेस्टिवल स्टूडियो एक स्टैटिक वेब ऐप है। पेज खुलने के बाद हर डिज़ाइन आपका अपना डिवाइस HTML5 Canvas से बनाता है। कुछ भी सर्वर पर नहीं जाता — इसीलिए न अकाउंट चाहिए, न इंतज़ार, न वॉटरमार्क।',
    h2post: 'फेस्टिवल पोस्ट बनाना',
    postSteps: [
      ['पोस्ट मेकर खोलें', 'डिज़ाइन टैब से त्योहार चुनें। हर त्योहार के साथ नौ लेआउट आते हैं — शुभकामनाएँ, बिज़नेस ग्रीटिंग, ऑफ़र, इंस्टाग्राम पोस्ट व स्टोरी, व्हाट्सऐप स्टेटस और फ़ेसबुक पोस्ट।'],
      ['अपनी जानकारी एक बार भरें', 'डिज़ाइन टैब में नाम, बिज़नेस नाम, फ़ोन, वेबसाइट, पता, ऑफ़र और संदेश लिखें। इन फ़ील्ड वाले टेम्पलेट अपने आप अपडेट हो जाते हैं।'],
      ['कैनवास पर कुछ भी बदलें', 'किसी भी चीज़ पर टैप करके चुनें। खिसकाकर जगह बदलें, कोने के गोले से साइज़ और ऊपर वाले गोले से घुमाव। लेयर बीच में और एक-दूसरे से अपने आप अलाइन हो जाती हैं। "चयनित" टैब में फ़ॉन्ट, रंग, स्पेसिंग, शैडो, आउटलाइन, पारदर्शिता और घुमाव मिलेंगे।'],
      ['फ़ोटो, स्टिकर और आकृतियाँ जोड़ें', 'गैलरी से फ़ोटो या लोगो अपलोड करें, दीया, रंगोली, आतिशबाज़ी, ढोल और कलश जैसे वेक्टर स्टिकर लगाएँ, या बैज और बैनर के लिए आकृतियाँ जोड़ें।'],
      ['डाउनलोड करें', 'डाउनलोड टैब में PNG या JPG चुनें, JPG के लिए क्वालिटी और ज़्यादा रिज़ॉल्यूशन का विकल्प भी है। फ़ाइल का नाम त्योहार के हिसाब से बनता है, जैसे <code>diwali-festival-post.png</code>।']
    ],
    h2gif: 'एनिमेटेड GIF बनाना',
    gifText: 'GIF मेकर आपके डिज़ाइन को एनिमेट करके असली <code>.gif</code> फ़ाइल आपके डिवाइस पर बनाता है — बैकग्राउंड वर्कर में, इसलिए प्रीव्यू चलता रहता है। एनिमेशन स्टाइल (रिवील, ज़ूम, पॉप, बाउंस, स्लाइड, फ़्लोट), त्योहारी इफ़ेक्ट (स्पार्कल, कन्फ़ेटी, आतिशबाज़ी, दीये की चमक, फूल, बर्फ़, लाइट स्वीप) चुनें, फिर FPS, अवधि और साइज़ सेट करके <strong>GIF बनाएँ</strong> दबाएँ।',
    gifNote: 'बड़ा और लंबा GIF ज़्यादा समय लेता है और फ़ाइल भी बड़ी बनती है। पुराने फ़ोन पर 260 px, 10 fps और 2 सेकंड से शुरू करें।',
    h2status: 'व्हाट्सऐप स्टेटस बनाना',
    statusText: 'स्टेटस मेकर सीधे 1080 × 1920 वर्टिकल फ़ॉर्मैट में खुलता है। बैकग्राउंड टैब में एनिमेटेड इफ़ेक्ट लगाएँ और डाउनलोड टैब में <em>इस डिज़ाइन का GIF बनाएँ</em> दबाकर GIF मेकर में भेजें।',
    h2photo: 'फ़ोटो से फेस्टिवल पोस्ट',
    photoText: 'जल्दी में हैं? एडिटर के ऊपर <strong>⚡ झटपट</strong> दबाइए: फ़ोटो अपलोड करें, त्योहार चुनें, लेआउट चुनें, नाम लिखें और बनाएँ दबाएँ। चार टैप, कोई साइनअप नहीं।',
    h2save: 'अपना काम सेव करना',
    saveText: 'ड्राफ़्ट आपके ब्राउज़र की लोकल स्टोरेज में, इसी डिवाइस पर सेव होते हैं। वे कभी अपलोड नहीं होते। ब्राउज़र डेटा साफ़ करने या प्राइवेट मोड में वे मिट जाते हैं।'
  },

  about: {
    title: 'हमारे बारे में — मुफ़्त फेस्टिवल पोस्ट मेकर',
    desc: 'फेस्टिवल स्टूडियो एक मुफ़्त, प्राइवेसी-फ़र्स्ट भारतीय त्योहार पोस्ट, GIF और स्टेटस मेकर है जो पूरी तरह आपके ब्राउज़र में चलता है।',
    h1: 'फेस्टिवल स्टूडियो के बारे में',
    lead: 'एक साधारण दिवाली या ईद की शुभकामना बनाने के लिए न अकाउंट चाहिए, न सब्सक्रिप्शन, और न ही आपकी फ़ैमिली फ़ोटो के बीचोंबीच किसी वॉटरमार्क की ज़रूरत है। इसीलिए फेस्टिवल स्टूडियो बना।',
    h2what: 'यह है क्या',
    what: 'सादे HTML, CSS और JavaScript से बना मुफ़्त भारतीय त्योहार पोस्ट, GIF और स्टेटस मेकर। यह एक स्टैटिक साइट है — न बैकएंड, न डेटाबेस, न यूज़र अकाउंट। हर डिज़ाइन आपका अपना ब्राउज़र Canvas API से बनाता है।',
    h2never: 'यह कभी नहीं करेगा',
    never: [
      'साइनअप, लॉगिन या ईमेल वेरिफ़िकेशन नहीं माँगेगा।',
      'आपकी फ़ोटो किसी सर्वर पर अपलोड नहीं करेगा।',
      'डाउनलोड पर वॉटरमार्क नहीं लगाएगा।',
      'टेम्पलेट, फ़ॉन्ट, स्टिकर या एक्सपोर्ट के पैसे नहीं लेगा।'
    ],
    h2free: 'यह मुफ़्त कैसे रहता है',
    free: 'साइट साफ़-साफ़ चिह्नित विज्ञापन स्थानों से चलती है, जो एडिटिंग एरिया से बाहर रहते हैं और किसी कंट्रोल को नहीं ढकते। विज्ञापन ही एकमात्र कमाई है — आपके डिज़ाइन कोई प्रोडक्ट नहीं हैं।',
    h2lang: 'भाषाएँ',
    lang: 'हर त्योहार के साथ हिन्दी (देवनागरी), अंग्रेज़ी और हिंग्लिश शुभकामनाएँ आती हैं, और पूरा इंटरफ़ेस हिन्दी व English दोनों में उपलब्ध है। देवनागरी के लिए ओपन-सोर्स गूगल फ़ॉन्ट इस्तेमाल होते हैं, इसलिए हिन्दी टेक्स्ट हर साइज़ पर साफ़ दिखता है।',
    h2open: 'सुझाव भेजिए',
    open: 'कोई त्योहार, टेम्पलेट स्टाइल या स्टिकर छूट गया? सुझाव भेजिए — त्योहार और टेम्पलेट एक ही कॉन्फ़िगरेशन फ़ाइल में हैं और जल्दी जुड़ जाते हैं।'
  },

  contact: {
    title: 'संपर्क करें — फेस्टिवल स्टूडियो',
    desc: 'फ़ीडबैक, नए त्योहार की माँग, टेम्पलेट सुझाव या विज्ञापन के लिए फेस्टिवल स्टूडियो से संपर्क करें।',
    h1: 'संपर्क करें',
    lead: 'फ़ीडबैक, कोई छूटा त्योहार, टेम्पलेट का सुझाव या विज्ञापन — सब स्वागत है। फेस्टिवल स्टूडियो का कोई बैकएंड नहीं है, इसलिए यह फ़ॉर्म आपके अपने ईमेल ऐप में संदेश तैयार करता है; जब तक आप वहाँ भेजें नहीं, हमें कुछ नहीं जाता।',
    name: 'आपका नाम', email: 'आपका ईमेल', subject: 'विषय', message: 'संदेश',
    subjects: ['फ़ीडबैक', 'नया त्योहार जोड़ें', 'टेम्पलेट का सुझाव', 'समस्या बताएँ', 'विज्ञापन', 'अन्य'],
    submit: 'मेरे ईमेल ऐप में खोलें',
    error: 'कृपया अपना नाम, सही ईमेल और संदेश भरें।',
    direct: 'सीधे लिखना चाहते हैं? ईमेल करें <strong>{email}</strong>।'
  },

  wishesHub: {
    title: 'त्योहार शुभकामनाएँ — हिन्दी और अंग्रेज़ी में मुफ़्त संदेश | फेस्टिवल स्टूडियो',
    desc: 'हिन्दी, अंग्रेज़ी और हिंग्लिश में सैकड़ों त्योहार शुभकामनाएँ, व्हाट्सऐप स्टेटस और बिज़नेस ग्रीटिंग। मुफ़्त कॉपी करें या एक टैप में पोस्टर बनाएँ।',
    h1: 'त्योहार शुभकामनाएँ, स्टेटस और ग्रीटिंग',
    intro: 'यहाँ की हर शुभकामना मौलिक है, मुफ़्त कॉपी की जा सकती है, और एक टैप में पोस्टर या एनिमेटेड GIF बन जाती है। त्योहार चुनिए और उसका हिन्दी, English व Hinglish संग्रह देखिए।'
  },

  festival: {
    title: '{name} पोस्ट मेकर — मुफ़्त {name} पोस्टर, बैनर और शुभकामनाएँ | फेस्टिवल स्टूडियो',
    desc: 'मुफ़्त {name} पोस्ट, पोस्टर और ग्रीटिंग ऑनलाइन बनाएँ। हिन्दी और अंग्रेज़ी {name} टेम्पलेट — अपने नाम, फ़ोटो, बिज़नेस लोगो और ऑफ़र के साथ। न साइनअप, न वॉटरमार्क।',
    h1: '{name} पोस्ट मेकर',
    intro: '{desc} अपना नाम, फ़ोटो, बिज़नेस जानकारी और लोगो जोड़कर हिन्दी ({hi}), अंग्रेज़ी या हिंग्लिश में मुफ़्त {name} पोस्ट, पोस्टर या व्हाट्सऐप स्टेटस बनाइए।',
    ctaPost: '{name} पोस्ट बनाएँ', ctaGif: 'एनिमेटेड GIF', ctaStatus: 'व्हाट्सऐप स्टेटस',
    tplHead: '{name} टेम्पलेट',
    tplSub: 'नौ तैयार लेआउट — शुभकामनाएँ, बिज़नेस ग्रीटिंग, फ़ोटो ग्रीटिंग, त्योहारी ऑफ़र, बोल्ड टाइपोग्राफ़ी, व्हाट्सऐप स्टेटस, इंस्टाग्राम पोस्ट, इंस्टाग्राम स्टोरी और फ़ेसबुक पोस्ट।',
    wishHead: '{name} की शुभकामनाएँ',
    wishSub: 'एडिटर के डिज़ाइन टैब में किसी भी शुभकामना पर टैप करके उसे सीधे कैनवास पर लगाइए, या यहाँ से कॉपी कीजिए।',
    allWishes: 'सभी {name} शुभकामनाएँ देखें →',
    howHead: '{name} पोस्ट कैसे बनाएँ',
    steps: [
      ['{name} टेम्पलेट चुनें', 'ऊपर दिए गए ग्रिड में से चुनें, या पोस्ट मेकर खोलकर डिज़ाइन टैब में {name} चुनें।'],
      ['अपनी जानकारी भरें', 'अपना नाम — या बिज़नेस का नाम, फ़ोन, वेबसाइट और ऑफ़र — लिखिए, टेम्पलेट अपने आप भर जाएगा।'],
      ['फ़ोटो या लोगो जोड़ें', 'फ़ोटो टैब से गैलरी से अपलोड करें। कोने गोल करें, बॉर्डर या शैडो लगाएँ।'],
      ['डाउनलोड और शेयर करें', 'बिना वॉटरमार्क PNG या JPG डाउनलोड करें, या GIF मेकर में भेजकर एनिमेटेड ग्रीटिंग बनाएँ।']
    ],
    faqHead: 'अक्सर पूछे जाने वाले सवाल',
    faqs: [
      ['क्या {name} पोस्ट मेकर सच में मुफ़्त है?', 'हाँ। हर टेम्पलेट, स्टिकर, फ़ॉन्ट और डाउनलोड मुफ़्त है — न साइनअप, न वॉटरमार्क, न कोई पेड प्लान। साइट एडिटर के आसपास दिखने वाले विज्ञापनों से चलती है।'],
      ['क्या {name} पोस्ट में अपना बिज़नेस नाम और लोगो जोड़ सकते हैं?', 'हाँ। डिज़ाइन टैब में एक बार बिज़नेस नाम, फ़ोन, वेबसाइट और ऑफ़र लिखिए, फिर बिज़नेस ग्रीटिंग या फेस्टिवल ऑफ़र लेआउट चुनिए। लोगो फ़ोटो टैब से अपलोड कीजिए।'],
      ['क्या मेरी फ़ोटो कहीं अपलोड होती है?', 'नहीं। आपकी फ़ोटो आपका ब्राउज़र पढ़कर आपके ही डिवाइस पर कैनवास पर बनाता है। वह किसी सर्वर तक नहीं पहुँचती — इसीलिए इंटरनेट टूटने पर भी एडिटर चलता रहता है।'],
      ['क्या {name} की शुभकामनाएँ हिन्दी में लिख सकते हैं?', 'हाँ। देवनागरी पूरी तरह सपोर्टेड है और हर {name} टेम्पलेट के साथ तैयार हिन्दी, English और Hinglish शुभकामनाएँ आती हैं, जिन्हें एक टैप में जोड़ा जा सकता है।'],
      ['{name} पोस्ट का साइज़ क्या रखें?', 'इंस्टाग्राम और फ़ेसबुक फ़ीड के लिए 1080 × 1080, व्हाट्सऐप स्टेटस और स्टोरी के लिए 1080 × 1920, और फ़ेसबुक लिंक पोस्ट के लिए 1200 × 630। ये सभी कैनवास साइज़ मेन्यू में एक टैप दूर हैं।']
    ],
    moreHead: 'और त्योहार',
    dateLabel: '{name} की तारीख़ें:',
    approxNote: ' (अनुमानित — चाँद दिखने या क्षेत्रीय पंचांग पर निर्भर)'
  },

  wishesPage: {
    title: '{name} शुभकामनाएँ — हिन्दी और अंग्रेज़ी में {count}+ मुफ़्त संदेश',
    desc: 'हिन्दी, अंग्रेज़ी और हिंग्लिश में मुफ़्त {name} शुभकामनाएँ, स्टेटस लाइनें और बिज़नेस ग्रीटिंग। कॉपी करें या एक टैप में {name} पोस्टर या GIF बनाएँ।',
    h1: '{name} शुभकामनाएँ — हिन्दी, English और Hinglish',
    intro: '{count} मौलिक {name} संदेशों का संग्रह, मुफ़्त कॉपी के लिए। कुछ भी ऑटो-जनरेट नहीं है और हर लाइन व्हाट्सऐप के लिए छोटी रखी गई है। तस्वीर चाहिए? {name} पोस्ट मेकर खोलिए — वही शुभकामनाएँ वहाँ एक टैप दूर हैं।',
    makeCta: 'शुभकामना से पोस्टर बनाएँ →',
    gifCta: 'एनिमेटेड {name} GIF बनाएँ →',
    tip: 'सुझाव: किसी भी लाइन के आगे <strong>कॉपी</strong> दबाइए और व्हाट्सऐप, इंस्टाग्राम या स्टेटस में पेस्ट कीजिए।',
    relatedHead: 'दूसरे त्योहारों की शुभकामनाएँ'
  },

  notFound: {
    title: 'पेज नहीं मिला — फेस्टिवल स्टूडियो',
    desc: 'यह पेज मौजूद नहीं है। फेस्टिवल पोस्ट मेकर पर वापस जाइए।',
    h1: 'यह पेज कहीं खो गया',
    lead: 'लिंक पुराना या ग़लत हो सकता है। यहाँ से सब कुछ चलता है:'
  }
};

/* Hindi pages reuse the English legal/info bodies (linked from the footer),
   so those keys fall back automatically. */
hi.faqPage = en.faqPage;
hi.advertise = en.advertise;
hi.cookies = en.cookies;
hi.dmca = en.dmca;
hi.accessibility = en.accessibility;
hi.licences = en.licences;
hi.sitemapPage = en.sitemapPage;

module.exports = { en, hi };
