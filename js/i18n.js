/* ============================================================================
   Festival Studio — i18n.js
   A deliberately tiny translation layer. Keys ARE the English strings, so
   English needs no dictionary and nothing breaks if a translation is missing.

     FS.t('Download image')   →  'इमेज डाउनलोड करें'  on a Hindi page
                              →  'Download image'      everywhere else

   The active language comes from <html lang="hi"> (set by the page builder)
   or from the visitor's saved preference.
   ========================================================================== */
(function (global) {
  'use strict';
  var FS = (global.FS = global.FS || {});

  var HI = {
    /* tabs */
    'Design': 'डिज़ाइन', 'Selected': 'चयनित', 'Text': 'टेक्स्ट', 'Photo': 'फ़ोटो',
    'Stickers': 'स्टिकर', 'Shapes': 'आकृतियाँ', 'Background': 'बैकग्राउंड',
    'Layers': 'लेयर', 'Export': 'डाउनलोड',

    /* design panel */
    'Festival': 'त्योहार', 'Canvas size': 'कैनवास साइज़', 'Custom size…': 'कस्टम साइज़…',
    'Your details (fills templates automatically)': 'आपकी जानकारी (टेम्पलेट अपने आप भर जाएँगे)',
    'Your name': 'आपका नाम', 'Business name': 'बिज़नेस का नाम', 'Phone': 'फ़ोन',
    'Website': 'वेबसाइट', 'Address': 'पता', 'Offer text': 'ऑफ़र टेक्स्ट',
    'Custom message': 'अपना संदेश', 'Ready-made wishes — tap to add': 'तैयार शुभकामनाएँ — जोड़ने के लिए टैप करें',
    'Add': 'जोड़ें', 'Wish added': 'शुभकामना जोड़ी गई',

    /* properties */
    'Font': 'फ़ॉन्ट', 'Font size': 'फ़ॉन्ट साइज़', 'Alignment': 'अलाइनमेंट',
    'Left': 'बाएँ', 'Center': 'बीच', 'Right': 'दाएँ',
    'Bold': 'बोल्ड', 'Italic': 'इटैलिक', 'Text colour': 'टेक्स्ट का रंग',
    'Letter spacing': 'अक्षरों की दूरी', 'Line height': 'पंक्ति की ऊँचाई',
    'Text width': 'टेक्स्ट की चौड़ाई', 'Shadow': 'शैडो', 'Shadow colour': 'शैडो का रंग',
    'Shadow blur': 'शैडो ब्लर', 'Shadow Y offset': 'शैडो की दूरी',
    'Outline': 'आउटलाइन', 'Outline colour': 'आउटलाइन का रंग', 'Outline width': 'आउटलाइन मोटाई',
    'Text background': 'टेक्स्ट बैकग्राउंड', 'Background colour': 'बैकग्राउंड रंग',
    'Padding': 'पैडिंग', 'Corner radius': 'कोनों की गोलाई',
    'Rotation': 'घुमाव', 'Opacity': 'पारदर्शिता', 'Layer order': 'लेयर क्रम',
    'Front': 'सबसे ऊपर', 'Up': 'ऊपर', 'Down': 'नीचे', 'Back': 'सबसे नीचे',
    'Fit text to box': 'टेक्स्ट को बॉक्स में फ़िट करें',

    /* images */
    'Image': 'इमेज', 'Replace image': 'इमेज बदलें', 'Fit': 'फ़िट', 'Fill': 'भरें',
    'Stretch': 'खींचें', 'Flip H': 'हॉरिज़ॉन्टल पलटें', 'Flip V': 'वर्टिकल पलटें',
    'Border width': 'बॉर्डर मोटाई', 'Border colour': 'बॉर्डर का रंग',
    'Drop shadow': 'शैडो', 'Crop': 'क्रॉप', 'Crop left': 'बाएँ से क्रॉप',
    'Crop top': 'ऊपर से क्रॉप', 'Crop width': 'क्रॉप चौड़ाई', 'Crop height': 'क्रॉप ऊँचाई',
    'Reset crop': 'क्रॉप रीसेट करें', 'Upload photo': 'फ़ोटो अपलोड करें',
    'Upload logo': 'लोगो अपलोड करें', 'Photo added — drag to position it': 'फ़ोटो जुड़ गई — खिसका कर सेट करें',
    'Logo added': 'लोगो जुड़ गया', 'Photo slots in this template': 'इस टेम्पलेट के फ़ोटो स्लॉट',

    /* shapes / stickers */
    'Shape': 'आकृति', 'Fill colour': 'भरने का रंग', 'Sticker': 'स्टिकर',
    'Primary colour': 'मुख्य रंग', 'Secondary colour': 'दूसरा रंग', 'Accent colour': 'एक्सेंट रंग',

    /* background */
    'Festival backgrounds': 'त्योहार बैकग्राउंड', 'Background type': 'बैकग्राउंड प्रकार',
    'Solid': 'सादा', 'Linear': 'लीनियर', 'Radial': 'रेडियल', 'None': 'कोई नहीं',
    'Colour': 'रंग', 'Gradient angle': 'ग्रेडिएंट कोण', '+ Add colour stop': '+ रंग जोड़ें',
    'Pattern': 'पैटर्न', 'No pattern': 'कोई पैटर्न नहीं', 'Pattern strength': 'पैटर्न की गहराई',
    'Pattern colour': 'पैटर्न का रंग', 'Vignette': 'किनारों का अंधेरा',
    'Animated overlay effect': 'एनिमेटेड इफ़ेक्ट',

    /* layers */
    'Bring to front': 'सबसे आगे लाएँ', 'Send to back': 'सबसे पीछे भेजें',
    'Bring forward': 'आगे लाएँ', 'Send backward': 'पीछे भेजें',
    'Duplicate': 'कॉपी बनाएँ', 'Delete': 'हटाएँ', 'Layer deleted': 'लेयर हटाई गई',
    'Select a layer first': 'पहले कोई लेयर चुनें', 'Select something first': 'पहले कुछ चुनें',

    /* export */
    'Format': 'फ़ॉर्मैट', 'Resolution': 'रिज़ॉल्यूशन', 'Standard': 'सामान्य',
    'High': 'हाई', 'Max': 'मैक्स', 'JPG quality': 'JPG क्वालिटी',
    'Download image': 'इमेज डाउनलोड करें', 'Share': 'शेयर करें', 'WhatsApp': 'व्हाट्सऐप',
    'Copy image': 'इमेज कॉपी करें', 'Share link': 'लिंक शेयर करें',
    'Animate this design as a GIF →': 'इस डिज़ाइन का GIF बनाएँ →',
    'Save draft on this device': 'ड्राफ़्ट इसी डिवाइस में सेव करें',
    'Recent designs on this device': 'इस डिवाइस के हाल के डिज़ाइन',
    'No saved drafts yet.': 'अभी कोई ड्राफ़्ट सेव नहीं है।',
    'Draft saved on this device': 'ड्राफ़्ट इस डिवाइस में सेव हो गया',
    'Draft loaded': 'ड्राफ़्ट खुल गया',
    'Reset design': 'डिज़ाइन रीसेट करें', 'Clear canvas': 'कैनवास खाली करें',
    'Design reset': 'डिज़ाइन रीसेट हो गया', 'Canvas cleared': 'कैनवास खाली कर दिया',
    'Canvas resized': 'कैनवास का साइज़ बदल गया',

    /* gif maker */
    'Animation style': 'एनिमेशन स्टाइल', 'Festive effect': 'त्योहारी इफ़ेक्ट',
    'Frames per second': 'फ़्रेम प्रति सेकंड', 'Duration': 'अवधि', 'GIF size': 'GIF साइज़',
    'Generate GIF': 'GIF बनाएँ', 'Download GIF': 'GIF डाउनलोड करें',
    'Restart': 'फिर से', 'Edit design': 'डिज़ाइन एडिट करें',
    'Preparing frames…': 'फ़्रेम तैयार हो रहे हैं…',

    /* wizard */
    'Photo to festival post': 'फ़ोटो से फेस्टिवल पोस्ट',
    'Choose photo from gallery': 'गैलरी से फ़ोटो चुनें', 'Back': 'पीछे', 'Next': 'आगे',
    'Generate': 'बनाएँ', 'No photo yet': 'अभी कोई फ़ोटो नहीं',
    'Which festival is this for?': 'यह किस त्योहार के लिए है?',
    'Your name (or business name)': 'आपका नाम (या बिज़नेस का नाम)',

    /* misc */
    'Undo': 'वापस', 'Redo': 'दोबारा', 'Download': 'डाउनलोड',
    'Nothing left to undo': 'वापस करने के लिए कुछ नहीं है',
    'Nothing to redo': 'दोबारा करने के लिए कुछ नहीं है',
    'Custom canvas size': 'कस्टम कैनवास साइज़', 'Width (px)': 'चौड़ाई (px)',
    'Height (px)': 'ऊँचाई (px)', 'Apply size': 'साइज़ लागू करें',
    'Install app': 'ऐप इंस्टॉल करें'
  };

  var DICTS = { hi: HI };

  FS.LANG = (function () {
    var l = (document.documentElement.getAttribute('lang') || 'en').slice(0, 2).toLowerCase();
    return DICTS[l] ? l : 'en';
  })();

  FS.t = function (s) {
    var d = DICTS[FS.LANG];
    return (d && d[s]) || s;
  };

  /* Language switcher target for the current page (built pages carry the
     alternate URL in <link rel="alternate" hreflang="…">). */
  FS.altLangHref = function () {
    var want = FS.LANG === 'hi' ? 'en' : 'hi';
    var link = document.querySelector('link[rel="alternate"][hreflang="' + want + '"], link[rel="alternate"][hreflang="' + want + '-IN"]');
    return link ? link.getAttribute('href') : null;
  };
})(window);
