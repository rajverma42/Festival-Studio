/* ============================================================================
   Festival Studio — wishes.js
   Original festival wishes library. This file powers:
     • the "Ready-made wishes" picker inside the editor
     • the /<festival>-wishes/ content pages
     • the wish text inside every template

   Structure per festival slug:
     hi        — Hindi (Devanagari) wishes
     en        — English wishes
     hinglish  — Roman-Hindi wishes
     status    — short one-liners that fit a WhatsApp status
     business  — shop / clinic / service business greetings

   To add more, just push strings into the arrays. Nothing else to change.
   ========================================================================== */
(function (global) {
  'use strict';
  var FS = (global.FS = global.FS || {});

  FS.WISH_CATEGORIES = [
    { id: 'hi', label: 'Hindi wishes', hi: 'हिन्दी शुभकामनाएँ' },
    { id: 'en', label: 'English wishes', hi: 'अंग्रेज़ी शुभकामनाएँ' },
    { id: 'hinglish', label: 'Hinglish wishes', hi: 'हिंग्लिश शुभकामनाएँ' },
    { id: 'status', label: 'Short status lines', hi: 'छोटे स्टेटस' },
    { id: 'business', label: 'Business greetings', hi: 'बिज़नेस शुभकामनाएँ' }
  ];

  FS.WISHES = {
    /* ---------------------------------------------------------------- */
    diwali: {
      hi: [
        'आपको एवं आपके परिवार को दीपावली की हार्दिक शुभकामनाएँ',
        'दीपों का यह त्योहार आपके जीवन में सुख, समृद्धि और शांति लाए',
        'शुभ दीपावली — रोशनी से भर जाए आपका हर दिन',
        'माँ लक्ष्मी की कृपा सदा आप और आपके परिवार पर बनी रहे',
        'हर दीया एक नई उम्मीद जगाए, यही कामना है — शुभ दीपावली',
        'अंधकार दूर हो, मन में उजाला हो। आपको दीपावली मुबारक',
        'इस दीपावली आपके घर धन, यश और आरोग्य का वास हो',
        'मिठास भरे रिश्ते और रोशनी भरा जीवन — शुभ दीपावली'
      ],
      en: [
        'Wishing you and your family a very Happy Diwali',
        'May this Diwali light up new dreams and fresh hopes',
        'Happy Diwali — may prosperity always find your door',
        'Lights, laughter and lots of sweets. Shubh Deepavali!',
        'May every diya you light bring a year of good fortune',
        'Wishing you a safe, bright and joyful Diwali'
      ],
      hinglish: [
        'Aapko aur aapke parivar ko Diwali ki dher saari shubhkamnayein',
        'Roshni ka tyohar aapke ghar khushiyan laaye — Happy Diwali',
        'Diye jalein, mithai bate, dil khush rahe. Shubh Diwali!',
        'Is Diwali aapki har dua puri ho — Happy Deepavali'
      ],
      status: [
        'शुभ दीपावली ✨',
        'Happy Diwali from our family to yours 🪔',
        'रोशनी वाली दीवाली, खुशियों वाली दीवाली',
        'May your life sparkle like a diya 🪔',
        'दीप जले, मन खिले — Happy Diwali'
      ],
      business: [
        'आपको एवं आपके परिवार को दीपावली की हार्दिक शुभकामनाएँ — {business}',
        '{business} wishes you a bright and prosperous Diwali',
        'This Diwali, thank you for trusting {business}. Wishing you light and prosperity.'
      ]
    },

    /* ---------------------------------------------------------------- */
    holi: {
      hi: [
        'रंगों के इस त्योहार पर आपको होली की हार्दिक शुभकामनाएँ',
        'आपका जीवन खुशियों के रंगों से भरा रहे — शुभ होली',
        'बुरा न मानो होली है! आपको सपरिवार होली मुबारक',
        'गुलाल की तरह महके आपका हर दिन — हैप्पी होली',
        'रंग बरसे, प्रेम बरसे, और रिश्तों में मिठास बढ़े',
        'होली का हर रंग आपके जीवन में नई ऊर्जा लाए',
        'नफ़रत जले, प्यार खिले — यही है होली का संदेश',
        'आपको और आपके परिवार को रंगों भरी होली की बधाई'
      ],
      en: [
        'Wishing you a colourful and joyful Holi',
        'May your life be as bright as the colours of Holi',
        'Happy Holi — play safe, play bright!',
        'May this Holi wash away every worry and leave only joy',
        'Colours, laughter and gujiya — wishing you the best Holi',
        'Let every colour bring you a new reason to smile'
      ],
      hinglish: [
        'Rangon se bhari ho aapki zindagi — Happy Holi',
        'Bura na maano Holi hai! Happy Holi',
        'Gulal, gujiya aur thodi si masti — Happy Holi',
        'Aapki zindagi mein har rang khushi ka ho'
      ],
      status: [
        'शुभ होली 🎨',
        'Happy Holi 🌈',
        'रंगों में डूब जाओ',
        'Play safe, play bright 💛',
        'बुरा न मानो, होली है!'
      ],
      business: [
        '{business} की ओर से आपको होली की हार्दिक शुभकामनाएँ',
        '{business} wishes you a safe and colourful Holi',
        'Add colour to your celebration — Holi offers now at {business}'
      ]
    },

    /* ---------------------------------------------------------------- */
    eid: {
      hi: [
        'ईद मुबारक — आपके जीवन में खुशियाँ और बरकत आए',
        'ईद की दिली मुबारकबाद आपको और आपके पूरे परिवार को',
        'यह ईद आपके घर सुकून, सेहत और खुशहाली लाए',
        'चाँद की रोशनी की तरह आपकी ज़िंदगी रौशन रहे — ईद मुबारक',
        'दुआओं में याद रखिएगा — ईद मुबारक',
        'मीठी सेवइयों जैसी मीठी हो आपकी ईद',
        'अल्लाह आपकी हर दुआ कबूल करे — ईद मुबारक',
        'मोहब्बत और भाईचारे की यही मिसाल कायम रहे'
      ],
      en: [
        'Eid Mubarak to you and your family',
        'May this Eid bring peace, health and happiness',
        'Wishing you a blessed and joyful Eid',
        'May your prayers be answered and your home be filled with light',
        'Warm wishes on this beautiful Eid',
        'May the spirit of Eid stay with you all year'
      ],
      hinglish: [
        'Eid Mubarak! Khushiyon se bhari rahe aapki Eid',
        'Aapko aur aapke parivar ko Eid Mubarak',
        'Sewaiyon si meethi ho aapki Eid',
        'Chand raat mubarak ho aapko'
      ],
      status: [
        'ईद मुबारक 🌙',
        'Eid Mubarak ✨',
        'चाँद रात मुबारक',
        'Blessings to all 🤲',
        'खुशियों वाली ईद'
      ],
      business: [
        '{business} की ओर से आप सभी को ईद मुबारक',
        '{business} wishes you and your family a blessed Eid',
        'Eid special offers now open at {business}'
      ]
    },

    /* ---------------------------------------------------------------- */
    'raksha-bandhan': {
      hi: [
        'रक्षाबंधन की हार्दिक शुभकामनाएँ — भाई-बहन का प्यार यूँ ही बना रहे',
        'इस पावन पर्व पर आपके रिश्तों में मिठास बनी रहे',
        'एक धागा, अनगिनत वादे — शुभ रक्षाबंधन',
        'बहन की दुआ और भाई का साथ हमेशा बना रहे',
        'रक्षा का यह बंधन आपके जीवन में खुशियाँ लाए',
        'मेरे भाई की उम्र लंबी हो — यही मेरी दुआ है',
        'दूरियाँ चाहे जितनी हों, राखी का रिश्ता कभी कम नहीं होता',
        'आपको और आपके परिवार को रक्षाबंधन की ढेर सारी बधाइयाँ'
      ],
      en: [
        'Happy Raksha Bandhan to all brothers and sisters',
        'A thread of love, a promise for life — Happy Rakhi',
        'May this bond of protection grow stronger every year',
        'Distance never weakens the rakhi thread. Happy Raksha Bandhan!',
        'Wishing my sibling health, success and endless happiness',
        'Celebrating the one who has my back always'
      ],
      hinglish: [
        'Bhai-behan ka pyaar hamesha aisa hi rahe — Happy Rakhi',
        'Rakhi ki dher saari shubhkamnayein',
        'Meri behen ke liye sab kuch — Happy Raksha Bandhan',
        'Dooriyan ho par rishta wahi — Happy Rakhi'
      ],
      status: [
        'शुभ रक्षाबंधन 🪢',
        'Happy Rakhi 💛',
        'भाई-बहन का प्यार ❤️',
        'My protector, my best friend',
        'राखी का रिश्ता सबसे प्यारा'
      ],
      business: [
        '{business} की ओर से आपको रक्षाबंधन की शुभकामनाएँ',
        '{business} wishes every brother and sister a happy Raksha Bandhan',
        'Rakhi gifts and special offers at {business}'
      ]
    },

    /* ---------------------------------------------------------------- */
    janmashtami: {
      hi: [
        'जन्माष्टमी की हार्दिक शुभकामनाएँ — कान्हा की कृपा आप पर बनी रहे',
        'नंद के आनंद भयो, जय कन्हैया लाल की!',
        'माखन-मिश्री सी मिठास आपके जीवन में बनी रहे',
        'बांसुरी की मधुर धुन आपके मन को शांति दे',
        'श्री कृष्ण आपके सभी संकट हरें — शुभ जन्माष्टमी',
        'राधे-राधे! आपको कृष्ण जन्माष्टमी की बधाई',
        'जहाँ कृष्ण हैं, वहाँ विजय है — शुभ जन्माष्टमी',
        'आपके घर भी नन्हे कान्हा जैसी खुशियाँ आएँ'
      ],
      en: [
        'Happy Krishna Janmashtami',
        'May Kanha bless your home with joy and peace',
        'Wishing you the sweetness of makhan and the wisdom of the Gita',
        'Where there is Krishna, there is victory. Happy Janmashtami!',
        'May Lord Krishna guide you through every choice',
        'Celebrating the birth of the divine flute player'
      ],
      hinglish: [
        'Radhe Radhe! Happy Janmashtami',
        'Kanha ji ki kripa aap par bani rahe',
        'Nand ke aanand bhayo — Jai Kanhaiya Lal ki',
        'Makhan chor ka aashirwad aapke saath ho'
      ],
      status: [
        'जय श्री कृष्ण 🦚',
        'Happy Janmashtami ✨',
        'राधे राधे',
        'Hare Krishna 🪈',
        'नंद घर आनंद भयो'
      ],
      business: [
        '{business} की ओर से जन्माष्टमी की हार्दिक शुभकामनाएँ',
        '{business} wishes you a blessed Krishna Janmashtami',
        'Janmashtami special at {business} — visit us today'
      ]
    },

    /* ---------------------------------------------------------------- */
    'ganesh-chaturthi': {
      hi: [
        'गणेश चतुर्थी की हार्दिक शुभकामनाएँ — गणपति बप्पा मोरया!',
        'बप्पा आपके सभी विघ्न हरें और सुख-समृद्धि दें',
        'बुद्धि, विवेक और सफलता का आशीर्वाद आपको मिले',
        'मोदक सी मिठास और बप्पा का आशीर्वाद आपके साथ रहे',
        'हर काम में सफलता मिले — यही बप्पा से प्रार्थना है',
        'गणपति बप्पा मोरया, मंगल मूर्ति मोरया!',
        'विघ्नहर्ता आपके जीवन की हर बाधा दूर करें',
        'आपके घर बप्पा का वास हो और खुशियों का निवास हो'
      ],
      en: [
        'Ganpati Bappa Morya! Happy Ganesh Chaturthi',
        'May Lord Ganesha remove every obstacle from your path',
        'Wishing you wisdom, courage and new beginnings',
        'May Bappa bless your home with prosperity and peace',
        'Modaks, dhol and devotion — Happy Ganesh Chaturthi',
        'Start something new today; Bappa is watching over you'
      ],
      hinglish: [
        'Ganpati Bappa Morya, Mangal Murti Morya!',
        'Bappa aapke ghar sukh-samriddhi laaye',
        'Har vighn door ho — Happy Ganesh Chaturthi',
        'Modak khao, Bappa ka aashirwad pao'
      ],
      status: [
        'गणपति बप्पा मोरया 🐘',
        'Ganpati Bappa Morya!',
        'विघ्नहर्ता की जय',
        'Happy Ganesh Chaturthi 🙏',
        'मंगल मूर्ति मोरया'
      ],
      business: [
        '{business} की ओर से गणेश चतुर्थी की हार्दिक शुभकामनाएँ',
        '{business} wishes you a blessed Ganesh Chaturthi',
        'Ganesh Chaturthi offers now live at {business}'
      ]
    },

    /* ---------------------------------------------------------------- */
    navratri: {
      hi: [
        'नवरात्रि की हार्दिक शुभकामनाएँ — माँ दुर्गा की कृपा बनी रहे',
        'जय माता दी! शुभ नवरात्रि',
        'माँ अम्बे आपके जीवन से हर दुख दूर करें',
        'नौ दिन, नौ रूप, अनंत आशीर्वाद — शुभ नवरात्रि',
        'शक्ति, भक्ति और सफलता आपके साथ रहे',
        'माँ दुर्गा आपकी हर मनोकामना पूर्ण करें',
        'गरबा की ताल पर झूमे आपका मन — हैप्पी नवरात्रि',
        'इस नवरात्रि आपके घर सुख-शांति का वास हो'
      ],
      en: [
        'Happy Navratri — may Maa Durga bless you always',
        'Nine nights of devotion, joy and garba. Happy Navratri!',
        'May the Goddess give you strength for every challenge',
        'Wishing you a Navratri full of light and positivity',
        'May Maa Durga fulfil every wish in your heart',
        'Dance, fast, pray and celebrate — Shubh Navratri'
      ],
      hinglish: [
        'Jai Mata Di! Shubh Navratri',
        'Maa Durga aapki har manokamna puri kare',
        'Garba ki raat, khushiyon ki baat — Happy Navratri',
        'Nau din, nau rang — Shubh Navratri'
      ],
      status: [
        'जय माता दी 🪷',
        'Happy Navratri ✨',
        'शुभ नवरात्रि',
        'Garba nights 💃',
        'माँ का आशीर्वाद सदा'
      ],
      business: [
        '{business} की ओर से नवरात्रि की हार्दिक शुभकामनाएँ',
        '{business} wishes you a blessed and joyful Navratri',
        'Navratri collection now available at {business}'
      ]
    },

    /* ---------------------------------------------------------------- */
    dussehra: {
      hi: [
        'दशहरा की हार्दिक शुभकामनाएँ — असत्य पर सत्य की जीत हो',
        'विजयादशमी आपके जीवन में नई विजय लाए',
        'बुराई पर अच्छाई की जीत का यह पर्व मंगलमय हो',
        'अपने भीतर के रावण को जलाएँ — शुभ विजयादशमी',
        'साहस, सत्य और सफलता आपके साथ रहे',
        'भगवान राम का आशीर्वाद आप पर सदा बना रहे',
        'हर बाधा पर विजय पाएँ — शुभ दशहरा',
        'आपको और आपके परिवार को विजयादशमी की शुभकामनाएँ'
      ],
      en: [
        'Happy Dussehra — may good always win',
        'Wishing you victory, courage and happiness this Vijayadashami',
        'Burn the ego, keep the courage. Happy Dussehra!',
        'May Lord Rama bless you with strength and wisdom',
        'A new victory awaits you this Vijayadashami',
        'Wishing you the triumph of truth in everything you do'
      ],
      hinglish: [
        'Buraai par acchai ki jeet ho — Happy Dussehra',
        'Aapko Vijayadashami ki hardik shubhkamnayein',
        'Apne andar ke Ravan ko jalao — Happy Dussehra',
        'Jai Shri Ram! Shubh Dussehra'
      ],
      status: [
        'शुभ दशहरा 🏹',
        'Happy Dussehra 🎯',
        'सत्य की जीत',
        'Jai Shri Ram 🙏',
        'विजयादशमी की शुभकामनाएँ'
      ],
      business: [
        '{business} की ओर से दशहरा की हार्दिक शुभकामनाएँ',
        '{business} wishes you a victorious Dussehra',
        'Dussehra special offers running now at {business}'
      ]
    },

    /* ---------------------------------------------------------------- */
    'durga-puja': {
      hi: [
        'दुर्गा पूजा की हार्दिक शुभकामनाएँ — माँ का आशीर्वाद सदा बना रहे',
        'शुभो बिजोया! माँ दुर्गा आपकी रक्षा करें',
        'ढाक की थाप और माँ की कृपा आपके साथ हो',
        'माँ दुर्गा आपके परिवार को शक्ति और शांति दें',
        'पूजो के इन दिनों में आपका मन आनंद से भर जाए',
        'माँ आईं हैं — खुशियाँ भी साथ लाई हैं',
        'शुभो षष्ठी से शुभो बिजोया तक, ढेरों शुभकामनाएँ',
        'हर संकट से रक्षा करें माँ दुर्गा'
      ],
      en: [
        'Shubho Bijoya! Happy Durga Puja',
        'May Maa Durga bless your family with strength and joy',
        'Wishing you five days of pandals, dhak and pure happiness',
        'May the Goddess protect you from every harm',
        'Shubho Sasthi to Shubho Bijoya — warmest wishes',
        'Celebrating the homecoming of Maa Durga with you'
      ],
      hinglish: [
        'Shubho Mahalaya se Bijoya tak — Happy Durga Puja',
        'Maa Durga ka aashirwad aap par bana rahe',
        'Pujo ki khushiyan aapke ghar aayein',
        'Dhak ki thaap aur maa ki kripa — Shubho Bijoya'
      ],
      status: [
        'शुभो बिजोया 🛕',
        'Happy Durga Puja ✨',
        'जय माँ दुर्गा',
        'Pujo vibes 🥁',
        'माँ आईं हैं'
      ],
      business: [
        '{business} की ओर से दुर्गा पूजा की हार्दिक शुभकामनाएँ',
        '{business} wishes you a joyful Durga Puja',
        'Pujo specials now at {business}'
      ]
    },

    /* ---------------------------------------------------------------- */
    'chhath-puja': {
      hi: [
        'छठ पूजा की हार्दिक शुभकामनाएँ — छठी मैया आपकी मनोकामना पूर्ण करें',
        'सूर्य देव की कृपा आप पर सदा बनी रहे',
        'आस्था के इस महापर्व की आपको ढेर सारी बधाई',
        'उगते और डूबते सूर्य को अर्घ्य — शुभ छठ पूजा',
        'छठी मैया आपके परिवार की रक्षा करें',
        'यह महापर्व आपके घर सुख-समृद्धि लाए',
        'ठेकुआ की मिठास और छठी मैया का आशीर्वाद आपको मिले',
        'नहाय-खाय से पारण तक, आपकी आस्था पूरी हो'
      ],
      en: [
        'Happy Chhath Puja — may Chhathi Maiya bless your family',
        'Wishing you a blessed and peaceful Chhath',
        'May Surya Dev fill your life with light and energy',
        'From Nahay-Khay to Usha Arghya — warmest wishes',
        'May your devotion be rewarded with happiness',
        'Wishing strength to every vrati this Chhath'
      ],
      hinglish: [
        'Chhathi Maiya aapki har manokamna puri kare — Happy Chhath Puja',
        'Surya dev ka aashirwad aap par bana rahe',
        'Aastha ke mahaparv ki hardik shubhkamnayein',
        'Chhath ki dher saari badhai aapko'
      ],
      status: [
        'जय छठी मैया 🌅',
        'Happy Chhath Puja 🙏',
        'सूर्य देव को अर्घ्य',
        'आस्था का महापर्व',
        'छठ पूजा की शुभकामनाएँ'
      ],
      business: [
        '{business} की ओर से छठ पूजा की हार्दिक शुभकामनाएँ',
        '{business} wishes you a blessed Chhath Puja',
        'Chhath Puja essentials available at {business}'
      ]
    },

    /* ---------------------------------------------------------------- */
    'makar-sankranti': {
      hi: [
        'मकर संक्रांति की हार्दिक शुभकामनाएँ — तिल गुड़ घ्या, गोड़ गोड़ बोला',
        'यह पर्व आपके जीवन में नई ऊर्जा और उमंग लाए',
        'पतंग की तरह ऊँची उड़ान भरें आपके सपने',
        'तिल-गुड़ की मिठास आपके रिश्तों में बनी रहे',
        'सूर्य देव की कृपा से आपका जीवन प्रकाशमय हो',
        'नई फसल, नई खुशियाँ — शुभ मकर संक्रांति',
        'आपके जीवन से हर अंधकार दूर हो',
        'सपरिवार आपको मकर संक्रांति की शुभकामनाएँ'
      ],
      en: [
        'Happy Makar Sankranti — may your life soar like a kite',
        'Wishing you warmth, sweetness and prosperity',
        'May the sun bring new energy into your life',
        'Til-gud, kites and good times. Happy Sankranti!',
        'A new harvest, a new beginning — best wishes',
        'May your dreams fly higher than every kite today'
      ],
      hinglish: [
        'Til gud khao, meetha meetha bolo — Happy Makar Sankranti',
        'Patang ki tarah oonchi udaan bhare aapke sapne',
        'Aapko sapariwar Makar Sankranti ki shubhkamnayein',
        'Nayi fasal, nayi khushiyan — Happy Sankranti'
      ],
      status: [
        'शुभ मकर संक्रांति 🪁',
        'Happy Makar Sankranti ☀️',
        'तिल गुड़ घ्या, गोड़ गोड़ बोला',
        'Kite season is here 🪁',
        'उड़ान भरो!'
      ],
      business: [
        '{business} की ओर से मकर संक्रांति की हार्दिक शुभकामनाएँ',
        '{business} wishes you a bright and prosperous Sankranti',
        'Sankranti offers now flying at {business}'
      ]
    },

    /* ---------------------------------------------------------------- */
    pongal: {
      hi: [
        'पोंगल की हार्दिक शुभकामनाएँ — सुख-समृद्धि आपके द्वार आए',
        'नई फसल की खुशियाँ आपके घर आएँ',
        'सूर्य देव आपके जीवन को प्रकाश से भर दें',
        'यह पोंगल आपके परिवार के लिए मंगलमय हो',
        'मेहनत का फल मीठा हो — शुभ पोंगल',
        'आपके घर में सदा अन्न और आनंद बना रहे',
        'तमिल नववर्ष की खुशियाँ आपके साथ हों',
        'पोंगल की ढेर सारी बधाइयाँ आपको और आपके परिवार को'
      ],
      en: [
        'Happy Pongal! May your home overflow with prosperity',
        'Iniya Pongal Nalvazhthukkal',
        'Wishing you a harvest of health, wealth and happiness',
        'May the sun bless your family this Pongal',
        'New rice, new hopes, new beginnings',
        'Warm Pongal wishes to you and your loved ones'
      ],
      hinglish: [
        'Happy Pongal — khushiyon ki fasal aapke ghar aaye',
        'Iniya Pongal Nalvazhthukkal!',
        'Aapko sapariwar Pongal ki shubhkamnayein',
        'Nayi fasal, nayi umeed — Happy Pongal'
      ],
      status: [
        'Happy Pongal 🍚',
        'शुभ पोंगल',
        'Pongal-o-Pongal!',
        'Harvest of happiness 🌾',
        'Iniya Pongal Nalvazhthukkal'
      ],
      business: [
        '{business} की ओर से पोंगल की हार्दिक शुभकामनाएँ',
        '{business} wishes you a joyful and prosperous Pongal',
        'Pongal specials now at {business}'
      ]
    },

    /* ---------------------------------------------------------------- */
    onam: {
      hi: [
        'ओणम की हार्दिक शुभकामनाएँ — खुशियाँ आपके आँगन में खिलें',
        'पूकलम के रंगों की तरह रंगीन हो आपका जीवन',
        'यह ओणम आपके घर समृद्धि लेकर आए',
        'राजा महाबली का आशीर्वाद आप पर बना रहे',
        'सद्या की मिठास आपके रिश्तों में घुल जाए',
        'आपके परिवार को ओणम की ढेर सारी बधाइयाँ',
        'फसल का यह पर्व आपके लिए मंगलमय हो',
        'एकता और प्रेम का संदेश देता है ओणम — शुभकामनाएँ'
      ],
      en: [
        'Happy Onam! Wishing you a season of abundance',
        'Onam Ashamsakal to you and your family',
        'May your life be as colourful as a pookalam',
        'Wishing you a sadya full of flavour and a year full of joy',
        'May King Mahabali bless your home this Onam',
        'Harvest, unity and happiness — Happy Onam'
      ],
      hinglish: [
        'Happy Onam — pookalam jaisi rangeen ho aapki zindagi',
        'Onam Ashamsakal! Aapko sapariwar shubhkamnayein',
        'Sadya ki mithaas aapke rishton mein rahe',
        'Raja Mahabali ka aashirwad aapke saath ho'
      ],
      status: [
        'Happy Onam 🌸',
        'Onam Ashamsakal',
        'शुभ ओणम',
        'Pookalam season 🌺',
        'Sadya time!'
      ],
      business: [
        '{business} की ओर से ओणम की हार्दिक शुभकामनाएँ',
        '{business} wishes you a joyful and prosperous Onam',
        'Onam offers now open at {business}'
      ]
    },

    /* ---------------------------------------------------------------- */
    'maha-shivratri': {
      hi: [
        'महाशिवरात्रि की हार्दिक शुभकामनाएँ — हर हर महादेव!',
        'भोलेनाथ की कृपा आप पर सदा बनी रहे',
        'ॐ नमः शिवाय — आपका जीवन शांति से भर जाए',
        'महादेव आपके सभी कष्ट हर लें',
        'शिव की भक्ति में डूब जाइए — शुभ महाशिवरात्रि',
        'जो शिव के साथ है, उसे किसी का भय नहीं',
        'बम बम भोले! आपको महाशिवरात्रि की बधाई',
        'शिव-पार्वती का आशीर्वाद आपके परिवार पर बना रहे'
      ],
      en: [
        'Har Har Mahadev! Happy Maha Shivratri',
        'May Lord Shiva bless you with peace and strength',
        'Om Namah Shivaya — wishing you a blessed Shivratri',
        'May Mahadev remove all suffering from your life',
        'Wishing you devotion, calm and courage this Shivratri',
        'On this holy night, may your prayers be answered'
      ],
      hinglish: [
        'Om Namah Shivaya — Happy Mahashivratri',
        'Bhole baba ki kripa aap par bani rahe',
        'Har Har Mahadev! Shubh Shivratri',
        'Bam bam bhole! Aapko Mahashivratri ki badhai'
      ],
      status: [
        'हर हर महादेव 🔱',
        'Om Namah Shivaya 🙏',
        'बम बम भोले',
        'Happy Maha Shivratri',
        'शिवमय हो जीवन'
      ],
      business: [
        '{business} की ओर से महाशिवरात्रि की हार्दिक शुभकामनाएँ',
        '{business} wishes you a peaceful Maha Shivratri',
        'Shivratri special at {business} — visit us today'
      ]
    },

    /* ---------------------------------------------------------------- */
    christmas: {
      hi: [
        'क्रिसमस की हार्दिक शुभकामनाएँ — खुशियाँ आपके घर आएँ',
        'प्रभु यीशु का आशीर्वाद आप पर सदा बना रहे',
        'यह क्रिसमस आपके जीवन में प्रेम और शांति लाए',
        'सांता आपकी हर ख्वाहिश पूरी करें — मेरी क्रिसमस',
        'रोशनी, प्यार और तोहफ़ों से भरा हो आपका क्रिसमस',
        'आपको और आपके परिवार को क्रिसमस मुबारक',
        'दिल से दिल तक खुशियाँ पहुँचें — मेरी क्रिसमस',
        'इस क्रिसमस आपकी हर दुआ कबूल हो'
      ],
      en: [
        'Merry Christmas and a joyful season to you',
        'Wishing you peace, love and lots of gifts',
        'May your Christmas sparkle with joy',
        'Warmest wishes to you and your family this Christmas',
        'May the season bring you rest and happiness',
        'Merry Christmas and a wonderful New Year ahead'
      ],
      hinglish: [
        'Merry Christmas! Khushiyon se bhara ho aapka din',
        'Santa aapki har wish puri kare — Merry Christmas',
        'Aapko aur aapke parivar ko Christmas Mubarak',
        'Pyaar aur roshni se bhara ho aapka Christmas'
      ],
      status: [
        'Merry Christmas 🎄',
        'क्रिसमस मुबारक',
        'Ho ho ho! 🎅',
        'Season of joy ✨',
        'Peace and love'
      ],
      business: [
        '{business} की ओर से क्रिसमस की हार्दिक शुभकामनाएँ',
        '{business} wishes you a Merry Christmas and a happy New Year',
        'Christmas offers now live at {business}'
      ]
    },

    /* ---------------------------------------------------------------- */
    'new-year': {
      hi: [
        'नववर्ष की हार्दिक शुभकामनाएँ — नया साल आपके लिए मंगलमय हो',
        'यह वर्ष आपके सभी सपने पूरे करे',
        'नया साल, नई उम्मीद, नई शुरुआत — शुभकामनाएँ',
        'आने वाला हर दिन आपके लिए खास हो',
        'सेहत, सफलता और सुकून से भरा हो आपका नया साल',
        'पुरानी बातें भूलकर नई शुरुआत करें — हैप्पी न्यू ईयर',
        'आपके जीवन में खुशियों की बहार आए',
        'नव वर्ष आपके परिवार के लिए शुभ हो'
      ],
      en: [
        'Happy New Year! Here’s to a brilliant year ahead',
        'Wishing you health, wealth and happiness this new year',
        'New year, new chances, same wonderful you',
        'May this year be your best one yet',
        'Cheers to new beginnings and better days',
        'Wishing you 365 days of good news'
      ],
      hinglish: [
        'Naya saal mubarak ho — Happy New Year!',
        'Naya saal, nayi shuruaat — aapko dher saari shubhkamnayein',
        'Yeh saal aapke sabhi sapne pure kare',
        'Sehat aur khushi se bhara ho aapka naya saal'
      ],
      status: [
        'Happy New Year 🎆',
        'नव वर्ष की शुभकामनाएँ',
        'New year, new me ✨',
        'नया साल मुबारक',
        'Cheers to a fresh start 🥂'
      ],
      business: [
        '{business} की ओर से नववर्ष की हार्दिक शुभकामनाएँ',
        '{business} thanks you for your trust — Happy New Year!',
        'New Year offers now live at {business}'
      ]
    },

    /* ---------------------------------------------------------------- */
    'independence-day': {
      hi: [
        'स्वतंत्रता दिवस की हार्दिक शुभकामनाएँ — जय हिन्द!',
        'वंदे मातरम्! आइए देश को और बेहतर बनाएँ',
        'आज़ादी के इस पर्व पर वीर शहीदों को नमन',
        'तिरंगा हमारी शान है — जय हिन्द, जय भारत',
        'देश के प्रति कर्तव्य ही सच्ची देशभक्ति है',
        'हर घर तिरंगा, हर दिल में भारत',
        'स्वतंत्रता का यह पर्व हमें एकता का संदेश देता है',
        'सारे जहाँ से अच्छा हिंदोस्तां हमारा'
      ],
      en: [
        'Happy Independence Day — Jai Hind!',
        'Saluting the spirit of a free India',
        'Remembering every hero who made this freedom possible',
        'Proud to be Indian, today and every day',
        'May the tricolour always fly high',
        'Freedom is a responsibility. Happy Independence Day!'
      ],
      hinglish: [
        'Jai Hind! Happy Independence Day',
        'Har ghar tiranga, har dil mein Bharat',
        'Aazadi ke is parv par shaheedon ko naman',
        'Proud Indian — Jai Hind, Jai Bharat'
      ],
      status: [
        'जय हिन्द 🇮🇳',
        'Happy Independence Day',
        'वंदे मातरम्',
        'Proud to be Indian 🧡🤍💚',
        'हर घर तिरंगा'
      ],
      business: [
        '{business} की ओर से स्वतंत्रता दिवस की हार्दिक शुभकामनाएँ',
        '{business} salutes the spirit of a free India — Jai Hind',
        'Independence Day offers now at {business}'
      ]
    },

    /* ---------------------------------------------------------------- */
    'republic-day': {
      hi: [
        'गणतंत्र दिवस की हार्दिक शुभकामनाएँ — जय हिन्द!',
        'संविधान की शक्ति को नमन — हैप्पी रिपब्लिक डे',
        'हमारा गणतंत्र, हमारा गर्व',
        'देश के हर नागरिक को गणतंत्र दिवस की बधाई',
        'एकता, समानता और न्याय — यही हमारी पहचान है',
        'तिरंगे की शान बनी रहे — जय भारत',
        'अपने कर्तव्यों को निभाना ही सच्ची देशभक्ति है',
        'संविधान हमें जोड़ता है — गणतंत्र दिवस मुबारक'
      ],
      en: [
        'Happy Republic Day — Jai Hind!',
        'Celebrating the Constitution that unites us',
        'Proud of our republic, proud of our people',
        'Unity, equality and justice — Happy Republic Day',
        'May our tricolour always fly with pride',
        'Honouring the rights and duties we share'
      ],
      hinglish: [
        'Happy Republic Day — Jai Hind, Jai Bharat',
        'Samvidhan ki shakti ko naman',
        'Humara ganatantra, humara garv',
        'Aapko Ganatantra Diwas ki hardik shubhkamnayein'
      ],
      status: [
        'जय हिन्द 🎖️',
        'Happy Republic Day 🇮🇳',
        'गणतंत्र दिवस की शुभकामनाएँ',
        'Unity in diversity',
        'वंदे मातरम्'
      ],
      business: [
        '{business} की ओर से गणतंत्र दिवस की हार्दिक शुभकामनाएँ',
        '{business} wishes every Indian a proud Republic Day',
        'Republic Day offers now at {business}'
      ]
    }
  };

  /* Merge the expanded library into the festival records so existing code
     (templates, editor, landing pages) picks it up with no changes. */
  if (FS.FESTIVALS) {
    FS.FESTIVALS.forEach(function (f) {
      var w = FS.WISHES[f.slug];
      if (!w) return;
      f.wishes = {
        hi: w.hi || [], en: w.en || [], hinglish: w.hinglish || [],
        status: w.status || [], business: w.business || []
      };
    });
  }

  /* Replace {business} / {name} placeholders in a business greeting. */
  FS.fillWish = function (text, fields) {
    return String(text || '')
      .replace(/\{business\}/g, (fields && fields.business) || 'our team')
      .replace(/\{name\}/g, (fields && fields.name) || '');
  };
})(window);
