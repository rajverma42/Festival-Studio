/* ============================================================================
   Festival Studio — festivals.js
   ----------------------------------------------------------------------------
   SINGLE SOURCE OF TRUTH for every festival in the app.

   To add a new festival: copy any block below, change the fields and save.
   Nothing else needs to change — the homepage grid, template library, SEO
   landing pages, calendar, sticker suggestions and colour palettes all read
   from this file.

   DATE MAINTENANCE
   ----------------
   Most Indian festivals follow lunar calendars, so their Gregorian dates move
   every year. Dates live in FS.FESTIVAL_DATES keyed by year. Add a new year
   block once a year (about 15 minutes of work) and the Festival Calendar page
   keeps working. Entries flagged `approx` depend on local moon sighting or
   regional panchang and should be confirmed locally.
   ========================================================================== */
(function (global) {
  'use strict';

  var FS = (global.FS = global.FS || {});

  /* ---------------------------------------------------------------------- */
  /* 1. ANNUAL DATE CONFIGURATION — edit once per year                       */
  /* ---------------------------------------------------------------------- */
  FS.FESTIVAL_DATES = {
    2026: {
      'new-year': '2026-01-01',
      'makar-sankranti': '2026-01-14',
      pongal: '2026-01-14',
      'republic-day': '2026-01-26',
      'maha-shivratri': '2026-02-15',
      holi: '2026-03-04',
      eid: '2026-03-20',
      'independence-day': '2026-08-15',
      onam: '2026-08-26',
      'raksha-bandhan': '2026-08-28',
      janmashtami: '2026-09-04',
      'ganesh-chaturthi': '2026-09-14',
      navratri: '2026-10-11',
      'durga-puja': '2026-10-17',
      dussehra: '2026-10-20',
      diwali: '2026-11-08',
      'chhath-puja': '2026-11-15',
      christmas: '2026-12-25'
    },
    2027: {
      'new-year': '2027-01-01',
      'makar-sankranti': '2027-01-15',
      pongal: '2027-01-15',
      'republic-day': '2027-01-26',
      'maha-shivratri': '2027-03-06',
      holi: '2027-03-21',
      eid: '2027-03-10',
      'independence-day': '2027-08-15',
      onam: '2027-09-03',
      'raksha-bandhan': '2027-08-17',
      janmashtami: '2027-08-25',
      'ganesh-chaturthi': '2027-09-04',
      navratri: '2027-09-30',
      'durga-puja': '2027-10-06',
      dussehra: '2027-10-09',
      diwali: '2027-10-29',
      'chhath-puja': '2027-11-04',
      christmas: '2027-12-25'
    }
  };

  /* Festivals whose date depends on moon sighting / regional panchang. */
  FS.APPROX_DATES = ['eid', 'onam', 'durga-puja', 'pongal'];

  /* ---------------------------------------------------------------------- */
  /* 2. FESTIVAL DATABASE                                                    */
  /* ---------------------------------------------------------------------- */
  FS.FESTIVALS = [
    {
      slug: 'diwali',
      name: 'Diwali',
      hi: 'दीपावली',
      icon: '🪔',
      month: 'October / November',
      keywords: ['deepavali', 'lights', 'दिवाली', 'deepawali'],
      desc:
        'The festival of lights. Diyas, rangoli, fireworks and sweets — the biggest greeting-card moment of the Indian year.',
      hiDesc: 'रोशनी का त्योहार — दीये, रंगोली, आतिशबाज़ी और मिठाइयाँ। साल का सबसे बड़ा शुभकामना पर्व।',
      palette: { deep: '#2A0A3D', mid: '#7B1FA2', accent: '#FFB300', accent2: '#FF6F00', ink: '#FFF8E1' },
      gradients: [
        ['#2A0A3D', '#7B1FA2'],
        ['#3E1F00', '#FF8F00'],
        ['#12002E', '#4A148C', '#B8860B']
      ],
      stickers: ['diya', 'fireworks', 'rangoli', 'sparkles', 'lantern', 'mandala'],
      pattern: 'rangoli',
      wishes: {
        hi: [
          'आपको एवं आपके परिवार को दीपावली की हार्दिक शुभकामनाएँ',
          'दीपों का यह त्योहार आपके जीवन में सुख, समृद्धि और शांति लाए',
          'शुभ दीपावली — रोशनी से भर जाए आपका हर दिन',
          'लक्ष्मी जी की कृपा सदा आप पर बनी रहे। हैप्पी दिवाली!'
        ],
        en: [
          'Wishing you and your family a very Happy Diwali',
          'May this Diwali light up new dreams and fresh hopes',
          'Happy Diwali — may prosperity always find your door',
          'Lights, laughter and lots of sweets. Shubh Deepavali!'
        ],
        hinglish: [
          'Aapko aur aapke parivar ko Diwali ki dher saari shubhkamnayein',
          'Roshni ka tyohar aapke ghar khushiyan laaye — Happy Diwali',
          'Diye jalein, mithai bate, dil khush rahe. Shubh Diwali!'
        ]
      }
    },
    {
      slug: 'holi',
      name: 'Holi',
      hi: 'होली',
      icon: '🎨',
      month: 'March',
      keywords: ['colors', 'colours', 'होली', 'rangwali'],
      desc: 'The festival of colours — gulal, water balloons, gujiya and the loudest music of the year.',
      hiDesc: 'रंगों का त्योहार — गुलाल, पिचकारी, गुजिया और सबसे ऊँची आवाज़ वाला संगीत।',
      palette: { deep: '#1B1035', mid: '#E91E63', accent: '#FFEB3B', accent2: '#00BCD4', ink: '#FFFFFF' },
      gradients: [
        ['#FF4081', '#FFC107'],
        ['#7C4DFF', '#00BCD4'],
        ['#1B1035', '#E91E63', '#FF9800']
      ],
      stickers: ['confetti', 'flower', 'sparkles', 'hearts', 'gift'],
      pattern: 'splash',
      wishes: {
        hi: [
          'रंगों के इस त्योहार पर आपको होली की हार्दिक शुभकामनाएँ',
          'आपका जीवन खुशियों के रंगों से भरा रहे — शुभ होली',
          'बुरा न मानो होली है! आपको सपरिवार होली मुबारक'
        ],
        en: [
          'Wishing you a colourful and joyful Holi',
          'May your life be as bright as the colours of Holi',
          'Happy Holi — play safe, play bright!'
        ],
        hinglish: ['Rangon se bhari ho aapki zindagi — Happy Holi', 'Bura na maano Holi hai! Happy Holi 2026']
      }
    },
    {
      slug: 'eid',
      name: 'Eid',
      hi: 'ईद',
      icon: '🌙',
      month: 'Varies',
      keywords: ['eid mubarak', 'ramadan', 'ramzan', 'ईद', 'eid-ul-fitr'],
      desc: 'Eid Mubarak — crescent moons, sewaiyan, new clothes and warm greetings for family and customers.',
      hiDesc: 'ईद मुबारक — चाँद, सेवइयाँ, नए कपड़े और अपनों के लिए गर्मजोशी भरी दुआएँ।',
      palette: { deep: '#052E28', mid: '#0F766E', accent: '#E8C572', accent2: '#F5EAD0', ink: '#FFFDF5' },
      gradients: [
        ['#052E28', '#0F766E'],
        ['#0B1B3A', '#1E3A8A'],
        ['#1A1005', '#7A5C1E', '#E8C572']
      ],
      stickers: ['lantern', 'sparkles', 'flower', 'gift', 'mandala'],
      pattern: 'islamic',
      wishes: {
        hi: ['ईद मुबारक — आपके जीवन में खुशियाँ और बरकत आए', 'ईद की दिली मुबारकबाद आपको और आपके परिवार को'],
        en: ['Eid Mubarak to you and your family', 'May this Eid bring peace, health and happiness', 'Wishing you a blessed Eid'],
        hinglish: ['Eid Mubarak! Khushiyon se bhari rahe aapki Eid', 'Aapko aur aapke parivar ko Eid Mubarak']
      }
    },
    {
      slug: 'raksha-bandhan',
      name: 'Raksha Bandhan',
      hi: 'रक्षाबंधन',
      icon: '🪢',
      month: 'August',
      keywords: ['rakhi', 'रक्षा बंधन', 'brother sister'],
      desc: 'The thread of protection — rakhi, sweets and the sibling bond.',
      hiDesc: 'रक्षा का धागा — राखी, मिठाई और भाई-बहन का अटूट रिश्ता।',
      palette: { deep: '#4A0E2E', mid: '#C2185B', accent: '#FFC107', accent2: '#FF7043', ink: '#FFF6E9' },
      gradients: [
        ['#4A0E2E', '#C2185B'],
        ['#B71C1C', '#FF8F00'],
        ['#6A1B4D', '#F06292']
      ],
      stickers: ['flower', 'gift', 'hearts', 'sparkles', 'mandala'],
      pattern: 'dots',
      wishes: {
        hi: ['रक्षाबंधन की हार्दिक शुभकामनाएँ — भाई-बहन का प्यार यूँ ही बना रहे', 'इस पावन पर्व पर आपके रिश्तों में मिठास बनी रहे'],
        en: ['Happy Raksha Bandhan to all brothers and sisters', 'A thread of love, a promise for life — Happy Rakhi'],
        hinglish: ['Bhai-behan ka pyaar hamesha aisa hi rahe — Happy Rakhi', 'Rakhi ki dher saari shubhkamnayein']
      }
    },
    {
      slug: 'janmashtami',
      name: 'Janmashtami',
      hi: 'जन्माष्टमी',
      icon: '🦚',
      month: 'August / September',
      keywords: ['krishna', 'gokulashtami', 'dahi handi', 'जन्माष्टमी'],
      desc: 'Krishna Janmashtami — flute, peacock feather, makhan and midnight celebrations.',
      hiDesc: 'कृष्ण जन्माष्टमी — बांसुरी, मोरपंख, माखन और आधी रात का उत्सव।',
      palette: { deep: '#06283D', mid: '#1363DF', accent: '#FFD54F', accent2: '#47B5FF', ink: '#F7FBFF' },
      gradients: [
        ['#06283D', '#1363DF'],
        ['#0B3D2E', '#2E7D32'],
        ['#101F4B', '#47B5FF']
      ],
      stickers: ['flower', 'sparkles', 'om', 'mandala', 'kalash'],
      pattern: 'feather',
      wishes: {
        hi: ['जन्माष्टमी की हार्दिक शुभकामनाएँ — कान्हा की कृपा आप पर बनी रहे', 'नंद के आनंद भयो, जय कन्हैया लाल की!'],
        en: ['Happy Krishna Janmashtami', 'May Kanha bless your home with joy and peace'],
        hinglish: ['Radhe Radhe! Happy Janmashtami', 'Kanha ji ki kripa aap par bani rahe']
      }
    },
    {
      slug: 'ganesh-chaturthi',
      name: 'Ganesh Chaturthi',
      hi: 'गणेश चतुर्थी',
      icon: '🐘',
      month: 'August / September',
      keywords: ['ganpati', 'vinayaka', 'bappa', 'गणपति'],
      desc: 'Ganpati Bappa Morya — ten days of modak, dhol and devotion.',
      hiDesc: 'गणपति बप्पा मोरया — दस दिन मोदक, ढोल और भक्ति के।',
      palette: { deep: '#4A1400', mid: '#E65100', accent: '#FFCA28', accent2: '#D84315', ink: '#FFF8E7' },
      gradients: [
        ['#4A1400', '#E65100'],
        ['#7B1E00', '#FFA000'],
        ['#31006A', '#E65100']
      ],
      stickers: ['om', 'flower', 'kalash', 'coconut', 'mandala', 'diya'],
      pattern: 'mandala',
      wishes: {
        hi: ['गणेश चतुर्थी की हार्दिक शुभकामनाएँ — गणपति बप्पा मोरया!', 'बप्पा आपके सभी विघ्न हरें और सुख-समृद्धि दें'],
        en: ['Ganpati Bappa Morya! Happy Ganesh Chaturthi', 'May Lord Ganesha remove every obstacle from your path'],
        hinglish: ['Ganpati Bappa Morya, Mangal Murti Morya!', 'Bappa aapke ghar sukh-samriddhi laaye']
      }
    },
    {
      slug: 'navratri',
      name: 'Navratri',
      hi: 'नवरात्रि',
      icon: '🪷',
      month: 'September / October',
      keywords: ['garba', 'dandiya', 'durga', 'नवरात्री'],
      desc: 'Nine nights of Shakti — garba, dandiya, fasting and colour-of-the-day posts.',
      hiDesc: 'शक्ति की नौ रातें — गरबा, डांडिया, व्रत और हर दिन का अलग रंग।',
      palette: { deep: '#3B0A45', mid: '#C2185B', accent: '#FFD600', accent2: '#FF6D00', ink: '#FFF7FB' },
      gradients: [
        ['#3B0A45', '#C2185B'],
        ['#B71C1C', '#FFB300'],
        ['#4A148C', '#EC407A', '#FFD600']
      ],
      stickers: ['kalash', 'flower', 'mandala', 'diya', 'sparkles', 'om'],
      pattern: 'mandala',
      wishes: {
        hi: ['नवरात्रि की हार्दिक शुभकामनाएँ — माँ दुर्गा की कृपा बनी रहे', 'जय माता दी! शुभ नवरात्रि'],
        en: ['Happy Navratri — may Maa Durga bless you always', 'Nine nights of devotion, joy and garba. Happy Navratri!'],
        hinglish: ['Jai Mata Di! Shubh Navratri', 'Maa Durga aapki har manokamna puri kare']
      }
    },
    {
      slug: 'dussehra',
      name: 'Dussehra',
      hi: 'दशहरा',
      icon: '🏹',
      month: 'October',
      keywords: ['vijayadashami', 'ravan dahan', 'दशहरा'],
      desc: 'Vijayadashami — the victory of good over evil.',
      hiDesc: 'विजयादशमी — बुराई पर अच्छाई की जीत का पर्व।',
      palette: { deep: '#3E1000', mid: '#C62828', accent: '#FFB300', accent2: '#FF7043', ink: '#FFF6E6' },
      gradients: [
        ['#3E1000', '#C62828'],
        ['#1A237E', '#D84315'],
        ['#5D1049', '#FF6F00']
      ],
      stickers: ['fireworks', 'sparkles', 'om', 'flower', 'mandala'],
      pattern: 'rays',
      wishes: {
        hi: ['दशहरा की हार्दिक शुभकामनाएँ — असत्य पर सत्य की जीत हो', 'विजयादशमी आपके जीवन में नई विजय लाए'],
        en: ['Happy Dussehra — may good always win', 'Wishing you victory, courage and happiness this Vijayadashami'],
        hinglish: ['Buraai par acchai ki jeet ho — Happy Dussehra']
      }
    },
    {
      slug: 'durga-puja',
      name: 'Durga Puja',
      hi: 'दुर्गा पूजा',
      icon: '🛕',
      month: 'October',
      keywords: ['pujo', 'bengal', 'दुर्गापूजा', 'shubho'],
      desc: 'Pujo days — pandal hopping, dhunuchi and Shubho Bijoya greetings.',
      hiDesc: 'पूजो के दिन — पंडाल, ढाक, धुनुची और शुभो बिजोया की शुभकामनाएँ।',
      palette: { deep: '#4E0A1E', mid: '#B71C1C', accent: '#FFCA28', accent2: '#F44336', ink: '#FFF7EA' },
      gradients: [
        ['#4E0A1E', '#B71C1C'],
        ['#7F0000', '#FFA000'],
        ['#2E0A3A', '#C2185B']
      ],
      stickers: ['om', 'kalash', 'flower', 'mandala', 'diya'],
      pattern: 'mandala',
      wishes: {
        hi: ['दुर्गा पूजा की हार्दिक शुभकामनाएँ — माँ का आशीर्वाद सदा बना रहे', 'शुभो बिजोया! माँ दुर्गा आपकी रक्षा करें'],
        en: ['Shubho Bijoya! Happy Durga Puja', 'May Maa Durga bless your family with strength and joy'],
        hinglish: ['Shubho Mahalaya se Bijoya tak — Happy Durga Puja']
      }
    },
    {
      slug: 'chhath-puja',
      name: 'Chhath Puja',
      hi: 'छठ पूजा',
      icon: '🌅',
      month: 'October / November',
      keywords: ['chhathi maiya', 'surya', 'छठ', 'bihar'],
      desc: 'Chhath — arghya to the rising and setting sun, thekua and river ghats.',
      hiDesc: 'छठ — उगते और डूबते सूर्य को अर्घ्य, ठेकुआ और नदी के घाट।',
      palette: { deep: '#3A1B00', mid: '#EF6C00', accent: '#FFD54F', accent2: '#FF8A65', ink: '#FFF6E5' },
      gradients: [
        ['#3A1B00', '#EF6C00'],
        ['#8E2DE2', '#F7971E'],
        ['#1A237E', '#FF8F00']
      ],
      stickers: ['kalash', 'coconut', 'flower', 'diya', 'sparkles'],
      pattern: 'sun',
      wishes: {
        hi: ['छठ पूजा की हार्दिक शुभकामनाएँ — छठी मैया आपकी मनोकामना पूर्ण करें', 'सूर्य देव की कृपा आप पर सदा बनी रहे'],
        en: ['Happy Chhath Puja — may Chhathi Maiya bless your family', 'Wishing you a blessed and peaceful Chhath'],
        hinglish: ['Chhathi Maiya aapki har manokamna puri kare — Happy Chhath Puja']
      }
    },
    {
      slug: 'makar-sankranti',
      name: 'Makar Sankranti',
      hi: 'मकर संक्रांति',
      icon: '🪁',
      month: 'January',
      keywords: ['kite', 'uttarayan', 'til gud', 'संक्रांति'],
      desc: 'Kites, til-gud and the sun moving north.',
      hiDesc: 'पतंग, तिल-गुड़ और सूर्य का उत्तरायण होना।',
      palette: { deep: '#0B3C5D', mid: '#1E88E5', accent: '#FFC107', accent2: '#26C6DA', ink: '#FFFFFF' },
      gradients: [
        ['#0B3C5D', '#1E88E5'],
        ['#FF6F00', '#FFD54F'],
        ['#004D40', '#26C6DA']
      ],
      stickers: ['sparkles', 'flower', 'confetti', 'sun', 'gift'],
      pattern: 'kites',
      wishes: {
        hi: ['मकर संक्रांति की हार्दिक शुभकामनाएँ — तिल गुड़ घ्या, गोड़ गोड़ बोला', 'यह पर्व आपके जीवन में नई ऊर्जा लाए'],
        en: ['Happy Makar Sankranti — may your life soar like a kite', 'Wishing you warmth, sweetness and prosperity'],
        hinglish: ['Til gud khao, meetha meetha bolo — Happy Makar Sankranti']
      }
    },
    {
      slug: 'pongal',
      name: 'Pongal',
      hi: 'पोंगल',
      icon: '🍚',
      month: 'January',
      keywords: ['thai pongal', 'tamil', 'harvest'],
      desc: 'The Tamil harvest festival — pongal pot, sugarcane and kolam.',
      hiDesc: 'तमिल फ़सल पर्व — पोंगल का बर्तन, गन्ना और कोलम।',
      palette: { deep: '#1B3A0E', mid: '#558B2F', accent: '#FFC107', accent2: '#F4511E', ink: '#FFFDF3' },
      gradients: [
        ['#1B3A0E', '#558B2F'],
        ['#BF360C', '#FFB300'],
        ['#004D40', '#9CCC65']
      ],
      stickers: ['kalash', 'coconut', 'flower', 'sun', 'mandala'],
      pattern: 'kolam',
      wishes: {
        hi: ['पोंगल की हार्दिक शुभकामनाएँ — सुख-समृद्धि आपके द्वार आए'],
        en: ['Happy Pongal! May your home overflow with prosperity', 'Iniya Pongal Nalvazhthukkal'],
        hinglish: ['Happy Pongal — khushiyon ki fasal aapke ghar aaye']
      }
    },
    {
      slug: 'onam',
      name: 'Onam',
      hi: 'ओणम',
      icon: '🌸',
      month: 'August / September',
      keywords: ['pookalam', 'kerala', 'sadya', 'thiruvonam'],
      desc: 'Kerala’s harvest festival — pookalam, sadya and vallam kali.',
      hiDesc: 'केरल का फ़सल पर्व — पूकलम, सद्या और वल्लम कली।',
      palette: { deep: '#0E3B2E', mid: '#2E7D32', accent: '#FFC107', accent2: '#FF7043', ink: '#FFFDF3' },
      gradients: [
        ['#0E3B2E', '#2E7D32'],
        ['#F4511E', '#FFD54F'],
        ['#00695C', '#AED581']
      ],
      stickers: ['flower', 'mandala', 'coconut', 'kalash', 'sparkles'],
      pattern: 'pookalam',
      wishes: {
        hi: ['ओणम की हार्दिक शुभकामनाएँ — खुशियाँ आपके आँगन में खिलें'],
        en: ['Happy Onam! Wishing you a season of abundance', 'Onam Ashamsakal to you and your family'],
        hinglish: ['Happy Onam — pookalam jaisi rangeen ho aapki zindagi']
      }
    },
    {
      slug: 'maha-shivratri',
      name: 'Maha Shivratri',
      hi: 'महाशिवरात्रि',
      icon: '🔱',
      month: 'February / March',
      keywords: ['shiv', 'bholenath', 'har har mahadev', 'शिवरात्रि'],
      desc: 'The great night of Shiva — jal abhishek, bel patra and Har Har Mahadev.',
      hiDesc: 'शिव की महान रात — जल अभिषेक, बेलपत्र और हर हर महादेव।',
      palette: { deep: '#0A1A2F', mid: '#1E3A5F', accent: '#F4D35E', accent2: '#5AC8FA', ink: '#F4F9FF' },
      gradients: [
        ['#0A1A2F', '#1E3A5F'],
        ['#12100E', '#2B4162'],
        ['#001F3F', '#5AC8FA']
      ],
      stickers: ['om', 'kalash', 'flower', 'diya', 'sparkles'],
      pattern: 'trishul',
      wishes: {
        hi: ['महाशिवरात्रि की हार्दिक शुभकामनाएँ — हर हर महादेव!', 'भोलेनाथ की कृपा आप पर सदा बनी रहे'],
        en: ['Har Har Mahadev! Happy Maha Shivratri', 'May Lord Shiva bless you with peace and strength'],
        hinglish: ['Om Namah Shivaya — Happy Mahashivratri']
      }
    },
    {
      slug: 'christmas',
      name: 'Christmas',
      hi: 'क्रिसमस',
      icon: '🎄',
      month: 'December',
      keywords: ['xmas', 'santa', 'merry christmas'],
      desc: 'Merry Christmas — trees, lights, gifts and warm wishes.',
      hiDesc: 'मेरी क्रिसमस — पेड़, रोशनी, तोहफ़े और गर्मजोशी भरी शुभकामनाएँ।',
      palette: { deep: '#0B3D2E', mid: '#1B5E20', accent: '#FFC107', accent2: '#E53935', ink: '#FFFFFF' },
      gradients: [
        ['#0B3D2E', '#1B5E20'],
        ['#7F0000', '#C62828'],
        ['#0D1B2A', '#1B5E20', '#C62828']
      ],
      stickers: ['gift', 'sparkles', 'star', 'hearts', 'confetti'],
      pattern: 'snow',
      wishes: {
        hi: ['क्रिसमस की हार्दिक शुभकामनाएँ — खुशियाँ आपके घर आएँ'],
        en: ['Merry Christmas and a joyful season to you', 'Wishing you peace, love and lots of gifts'],
        hinglish: ['Merry Christmas! Khushiyon se bhara ho aapka din']
      }
    },
    {
      slug: 'new-year',
      name: 'New Year',
      hi: 'नव वर्ष',
      icon: '🎆',
      month: 'January',
      keywords: ['happy new year', 'नया साल', '2027'],
      desc: 'New year, new plans — the most shared greeting of the year.',
      hiDesc: 'नया साल, नई योजनाएँ — साल की सबसे ज़्यादा शेयर होने वाली शुभकामना।',
      palette: { deep: '#0B0F2B', mid: '#3F51B5', accent: '#FFD54F', accent2: '#FF4081', ink: '#FFFFFF' },
      gradients: [
        ['#0B0F2B', '#3F51B5'],
        ['#000000', '#FFB300'],
        ['#1A0033', '#FF4081', '#FFD54F']
      ],
      stickers: ['fireworks', 'confetti', 'sparkles', 'star', 'gift'],
      pattern: 'confetti',
      wishes: {
        hi: ['नववर्ष की हार्दिक शुभकामनाएँ — नया साल आपके लिए मंगलमय हो', 'यह वर्ष आपके सभी सपने पूरे करे'],
        en: ['Happy New Year! Here’s to a brilliant year ahead', 'Wishing you health, wealth and happiness this new year'],
        hinglish: ['Naya saal mubarak ho — Happy New Year!']
      }
    },
    {
      slug: 'independence-day',
      name: 'Independence Day',
      hi: 'स्वतंत्रता दिवस',
      icon: '🇮🇳',
      month: 'August',
      keywords: ['15 august', 'tiranga', 'azadi', 'स्वतंत्रता'],
      desc: '15 August — tiranga, pride and patriotic posts.',
      hiDesc: '15 अगस्त — तिरंगा, गर्व और देशभक्ति से भरी पोस्ट।',
      palette: { deep: '#0B2545', mid: '#FF9933', accent: '#138808', accent2: '#FFFFFF', ink: '#FFFFFF' },
      gradients: [
        ['#FF9933', '#FFFFFF', '#138808'],
        ['#0B2545', '#1B5E20'],
        ['#101010', '#FF9933']
      ],
      stickers: ['star', 'sparkles', 'confetti', 'flower'],
      pattern: 'chakra',
      wishes: {
        hi: ['स्वतंत्रता दिवस की हार्दिक शुभकामनाएँ — जय हिन्द!', 'वंदे मातरम्! आइए देश को और बेहतर बनाएँ'],
        en: ['Happy Independence Day — Jai Hind!', 'Saluting the spirit of a free India'],
        hinglish: ['Jai Hind! Happy Independence Day']
      }
    },
    {
      slug: 'republic-day',
      name: 'Republic Day',
      hi: 'गणतंत्र दिवस',
      icon: '🎖️',
      month: 'January',
      keywords: ['26 january', 'constitution', 'गणतंत्र'],
      desc: '26 January — the Constitution, the parade and the tricolour.',
      hiDesc: '26 जनवरी — संविधान, परेड और तिरंगे की शान।',
      palette: { deep: '#0B2545', mid: '#FF9933', accent: '#138808', accent2: '#1565C0', ink: '#FFFFFF' },
      gradients: [
        ['#FF9933', '#FFFFFF', '#138808'],
        ['#0B2545', '#1565C0'],
        ['#1A1A1A', '#138808']
      ],
      stickers: ['star', 'sparkles', 'confetti', 'mandala'],
      pattern: 'chakra',
      wishes: {
        hi: ['गणतंत्र दिवस की हार्दिक शुभकामनाएँ — जय हिन्द!', 'संविधान की शक्ति को नमन। हैप्पी रिपब्लिक डे'],
        en: ['Happy Republic Day — Jai Hind!', 'Celebrating the Constitution that unites us'],
        hinglish: ['Happy Republic Day — Jai Hind, Jai Bharat']
      }
    }
  ];

  /* ---------------------------------------------------------------------- */
  /* 3. HELPERS                                                              */
  /* ---------------------------------------------------------------------- */
  FS.getFestival = function (slug) {
    for (var i = 0; i < FS.FESTIVALS.length; i++) {
      if (FS.FESTIVALS[i].slug === slug) return FS.FESTIVALS[i];
    }
    return FS.FESTIVALS[0];
  };

  FS.searchFestivals = function (q) {
    q = (q || '').trim().toLowerCase();
    if (!q) return FS.FESTIVALS.slice();
    return FS.FESTIVALS.filter(function (f) {
      var hay = [f.name, f.hi, f.slug, f.month, f.desc].concat(f.keywords || []).join(' ').toLowerCase();
      return hay.indexOf(q) !== -1;
    });
  };

  /* Next upcoming occurrence of a festival from `from` (Date). */
  FS.nextDate = function (slug, from) {
    from = from || new Date();
    var years = Object.keys(FS.FESTIVAL_DATES).map(Number).sort(function (a, b) { return a - b; });
    var best = null;
    for (var i = 0; i < years.length; i++) {
      var iso = FS.FESTIVAL_DATES[years[i]][slug];
      if (!iso) continue;
      var d = new Date(iso + 'T00:00:00');
      if (d >= new Date(from.getFullYear(), from.getMonth(), from.getDate())) { best = d; break; }
    }
    return best;
  };

  FS.daysUntil = function (date, from) {
    if (!date) return null;
    from = from || new Date();
    var a = new Date(from.getFullYear(), from.getMonth(), from.getDate());
    return Math.round((date - a) / 86400000);
  };

  /* Calendar rows for a given year, sorted by date. */
  FS.calendarFor = function (year) {
    var map = FS.FESTIVAL_DATES[year];
    if (!map) return [];
    var rows = [];
    FS.FESTIVALS.forEach(function (f) {
      if (!map[f.slug]) return;
      var d = new Date(map[f.slug] + 'T00:00:00');
      rows.push({ festival: f, date: d, approx: FS.APPROX_DATES.indexOf(f.slug) !== -1 });
    });
    rows.sort(function (a, b) { return a.date - b.date; });
    return rows;
  };

  FS.availableYears = function () {
    return Object.keys(FS.FESTIVAL_DATES).map(Number).sort(function (a, b) { return a - b; });
  };
})(window);
