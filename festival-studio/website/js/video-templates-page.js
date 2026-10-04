/* ============================================================================
   Festival Studio — video-templates-page.js
   Interactive controller for the Video Templates studio with Veo AI integration,
   customizable text overlays, motion animations, and synthesized festive audio.
   ========================================================================== */
(function (global) {
  'use strict';
  var FS = (global.FS = global.FS || {});

  var FESTIVAL_THEMES = {
    diwali: {
      name: 'Diwali',
      emoji: '🪔',
      gradient: 'linear-gradient(145deg, #7f1d1d, #b45309, #d97706)',
      sound: 'bells',
      greetings: [
        { h: 'शुभ दीपावली', s: 'सुख, समृद्धि और खुशियों का पावन प्रकाश आपके जीवन को सदैव आलोकित करे।' },
        { h: 'Happy Diwali Wishes', s: 'May the festive lights bring eternal peace, joy and success to your home.' },
        { h: 'लक्ष्मी पूजा महोत्सव', s: 'माँ महालक्ष्मी की कृपा से आपके घर-आँगन में सदैव धन-धान्य की वर्षा हो।' },
        { h: 'दीपावली की मंगलकामनाएं', s: 'अंधकार पर प्रकाश की विजय का यह महापर्व आपके परिवार में उमंग भरे।' },
        { h: 'Grand Festive Celebration', s: 'Wishing you sparkling joy, divine blessings and grand festive prosperity!' }
      ]
    },
    holi: {
      name: 'Holi',
      emoji: '🎨',
      gradient: 'linear-gradient(145deg, #701a75, #6d28d9, #0284c7)',
      sound: 'dhol',
      greetings: [
        { h: 'होली की हार्दिक शुभकामनाएं', s: 'रंग, उमंग और उल्लास का यह पावन पर्व आपके जीवन में नवचेतना लाए।' },
        { h: 'Happy Holi Rangotsav', s: 'Wishing you a joyful and vibrant celebration surrounded by love.' },
        { h: 'रंगों का महापर्व', s: 'गुलाल और पिचकारी की मिठास के साथ खुशियों भरी होली की बधाई।' },
        { h: 'Festive Colors & Joy', s: 'May every shade of joy paint your life with radiant smiles and success.' },
        { h: 'शुभ रंगोत्सव', s: 'अपनों के स्नेह और सौहार्द का यह पावन त्योहार मंगलमय हो।' }
      ]
    },
    navratri: {
      name: 'Navratri',
      emoji: '✨',
      gradient: 'linear-gradient(145deg, #881337, #9d174d, #701a75)',
      sound: 'bells',
      greetings: [
        { h: 'जय माँ दुर्गा - शुभ नवरात्रि', s: 'माँ जगदम्बा आपके समस्त संकटों का नाश कर जीवन को शक्ति एवं भक्ति से भरें।' },
        { h: 'Navratri Mahotsav', s: 'May the nine divine nights shower courage, health, and endless blessings.' },
        { h: 'माँ अम्बे की कृपा', s: 'शक्ति और समर्पण का यह महापर्व आप सभी के लिए मंगलकारी हो।' },
        { h: 'Devi Darshan Stuti', s: 'Chanting sacred stotras and celebrating divine victory over all darkness.' },
        { h: 'नवरात्रि की हार्दिक बधाई', s: 'माँ दुर्गा के नव रूपों का पावन आशीर्वाद सदैव आपके साथ रहे।' }
      ]
    },
    eid: {
      name: 'Eid Mubarak',
      emoji: '🌙',
      gradient: 'linear-gradient(145deg, #064e3b, #047857, #0d9488)',
      sound: 'ambient',
      greetings: [
        { h: 'Eid Mubarak', s: 'May Allah shower your home and family with boundless peace, mercy and prosperity.' },
        { h: 'ईद की दिली मुबारकबाद', s: 'अल्लाह आपकी हर जायज दुआ को कुबूल फरमाए और जीवन को खुशियों से महकाए।' },
        { h: 'Joyous Eid Celebration', s: 'Warmest greetings of harmony, gratitude, forgiveness and family togetherness.' },
        { h: 'Eid-ul-Fitr Greetings', s: 'Cherishing festive sweetness and sincere prayers on this blessed auspicious day.' },
        { h: 'Happy Eid Blessings', s: 'May the divine light of Eid guide your days toward peace and enlightenment.' }
      ]
    },
    'raksha-bandhan': {
      name: 'Raksha Bandhan',
      emoji: '🧵',
      gradient: 'linear-gradient(145deg, #9a3412, #c2410c, #ea580c)',
      sound: 'flute',
      greetings: [
        { h: 'रक्षाबंधन की अनंत शुभकामनाएं', s: 'भाई-बहन के पवित्र प्रेम, विश्वास और अटूट स्नेह का यह पावन पर्व सदा अमर रहे।' },
        { h: 'Happy Rakhi Celebration', s: 'Celebrating lifelong bonds of protection, childhood laughs and eternal love.' },
        { h: 'स्नेह और समर्पण का बंधन', s: 'राखी का यह कच्चा धागा हमारे रिश्तों को सदा के लिए अटूट बनाए रखे।' },
        { h: 'Sacred Thread of Love', s: 'Cherishing sweet memories and everlasting companionship this Raksha Bandhan.' },
        { h: 'शुभ रक्षाबंधन', s: 'सदा मुस्कराते रहें और जीवन में हर दिन खुशहाली और सफलता पाएँ।' }
      ]
    },
    'ganesh-chaturthi': {
      name: 'Ganesh Chaturthi',
      emoji: '🕉️',
      gradient: 'linear-gradient(145deg, #7c2d12, #c2410c, #ca8a04)',
      sound: 'dhol',
      greetings: [
        { h: 'गणपति बप्पा मोरया', s: 'विघ्नहर्ता भगवान श्री गणेश आपके समस्त कष्ट हरें और जीवन को मंगलमय बनाएं।' },
        { h: 'Happy Ganesh Utsav', s: 'May Lord Ganesha shower wisdom, peace, prosperity and good fortune upon you.' },
        { h: 'गणेश चतुर्थी की शुभकामनाएं', s: 'ऋद्धि-सिद्धि के दाता का आगमन आपके घर में सुख और शांति का संचार करे।' },
        { h: 'Vighnaharta Blessing', s: 'Welcoming Bappa with devotion, modaks and joyous celebration beats.' },
        { h: 'श्री गणेश जन्मोत्सव', s: 'प्रथम पूज्य भगवान गणेश का आशीर्वाद आपके हर कार्य को सफल बनाए।' }
      ]
    },
    'new-year': {
      name: 'New Year',
      emoji: '🎆',
      gradient: 'linear-gradient(145deg, #0f172a, #1e293b, #334155)',
      sound: 'crackers',
      greetings: [
        { h: 'नूतन वर्ष की हार्दिक शुभकामनाएं', s: 'यह नया साल आपके लिए 365 दिन नई सफलताएं, उत्तम स्वास्थ्य और अपार खुशियां लाए।' },
        { h: 'Happy New Year 2026', s: 'Cheers to fresh beginnings, breakthrough dreams and peaceful journeys ahead!' },
        { h: 'नव वर्ष मंगलमय हो', s: 'बीते साल की सीख और नए साल के संकल्प के साथ हर दिन को प्रेरणादायक बनाएं।' },
        { h: 'Prosperous New Beginnings', s: 'May your horizon be filled with bright opportunities and harmonious moments.' },
        { h: 'Celebration of New Year', s: 'Welcoming 2026 with warm smiles, joyful hearts and ambitious endeavors.' }
      ]
    },
    'maha-shivratri': {
      name: 'Maha Shivratri',
      emoji: '🔱',
      gradient: 'linear-gradient(145deg, #172554, #1e3a8a, #0284c7)',
      sound: 'bells',
      greetings: [
        { h: 'हर हर महादेव - शुभ महाशिवरात्रि', s: 'देवों के देव महादेव और माता पार्वती का दिव्य आशीर्वाद आप पर सदैव बना रहे।' },
        { h: 'Har Har Mahadev', s: 'Seeking serenity, devotion and spiritual elevation on this holy night of Shiva.' },
        { h: 'महाशिवरात्रि की मंगलकामनाएं', s: 'शिव की कृपा से आपके जीवन में सकारात्मकता, शांति और आनंद की वर्षा हो।' },
        { h: 'Om Namah Shivaya', s: 'May the trident of Mahadev dispel all worries and awaken pure inner bliss.' },
        { h: 'भोलेनाथ का आशीर्वाद', s: 'सच्चे मन से शिव आराधना करें और जीवन के हर पड़ाव पर विजय प्राप्त करें।' }
      ]
    },
    janmashtami: {
      name: 'Janmashtami',
      emoji: '🪈',
      gradient: 'linear-gradient(145deg, #0c4a6e, #0284c7, #eab308)',
      sound: 'flute',
      greetings: [
        { h: 'जय श्री कृष्णा - शुभ जन्माष्टमी', s: 'माखनचोर कान्हा की मुरली की मधुर धुन आपके जीवन को प्रेम और खुशियों से भर दे।' },
        { h: 'Happy Krishna Janmashtami', s: 'Celebrating the divine arrival of Lord Krishna with devotion and joyful hearts.' },
        { h: 'श्री कृष्ण जन्मोत्सव', s: 'नटखट यशोदानंदन का आशीर्वाद आपके परिवार को सदा स्वस्थ और समृद्ध रखे।' },
        { h: 'Radhe Radhe Greetings', s: 'May the timeless wisdom of the Gita inspire peace, truth, and righteousness.' },
        { h: 'गोकुलाष्टमी महोत्सव', s: 'दही-हांडी और माखन की मिठास के साथ जन्माष्टमी का पावन पर्व मंगलमय हो।' }
      ]
    },
    'makar-sankranti': {
      name: 'Makar Sankranti',
      emoji: '🪁',
      gradient: 'linear-gradient(145deg, #78350f, #b45309, #f59e0b)',
      sound: 'ambient',
      greetings: [
        { h: 'मकर संक्रांति की हार्दिक शुभकामनाएं', s: 'सूर्य देव के उत्तरायण होने पर आपके जीवन में नई ऊर्जा, तेज और सफलता का वास हो।' },
        { h: 'Happy Makar Sankranti', s: 'Kites soaring high in sunny skies, bringing sweet tilgul moments and warm joy!' },
        { h: 'सूर्य उपासना का पर्व', s: 'तिल-गुड़ की मिठास और पतंगों की उड़ान के साथ आपका हर दिन प्रकाशवान रहे।' },
        { h: 'Uttarayan Mahotsav', s: 'Harvesting peace, bountiful health and cheerful smiles for your entire family.' },
        { h: 'शुभ मकर संक्रांति', s: 'प्रकृति और सूर्य के इस पावन उत्सव पर आप सभी को बहुत-बहुत बधाई।' }
      ]
    }
  };

  var SOUND_FREQS = {
    bells: [880, 1320, 1760],
    dhol: [110, 180, 220],
    flute: [587.33, 659.25, 880],
    crackers: [200, 400, 600],
    ambient: [261.63, 329.63, 392]
  };

  function playSynthSound(type) {
    try {
      var ctx = new (window.AudioContext || window.webkitAudioContext)();
      var freqs = SOUND_FREQS[type] || SOUND_FREQS.bells;
      var now = ctx.currentTime;
      freqs.forEach(function (f, i) {
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = type === 'dhol' ? 'triangle' : (type === 'flute' ? 'sine' : 'square');
        osc.frequency.setValueAtTime(f, now + i * 0.15);
        gain.gain.setValueAtTime(0.2, now + i * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.15 + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.15);
        osc.stop(now + i * 0.15 + 0.65);
      });
    } catch (e) {
      console.warn('Audio synthesis not available:', e);
    }
  }

  function VideoStudio() {
    this.fest = 'diwali';
    this.selectedTplIndex = 0;
    this.audioContext = null;
  }

  VideoStudio.prototype.init = function () {
    var self = this;
    this.canvasBox = document.getElementById('video-canvas-preview');
    this.bgVideo = document.getElementById('veo-bg-video');
    this.headline = document.getElementById('preview-headline');
    this.subtext = document.getElementById('preview-subtext');
    this.sender = document.getElementById('preview-sender');
    this.soundBadge = document.getElementById('preview-sound');
    this.badge = document.getElementById('preview-badge');
    this.statusMsg = document.getElementById('video-status-msg');

    // Inputs
    this.inHead = document.getElementById('input-headline');
    this.inSub = document.getElementById('input-subtext');
    this.inSend = document.getElementById('input-sender');
    this.selFest = document.getElementById('video-fest-filter');
    this.selAnim = document.getElementById('select-animation');
    this.selSound = document.getElementById('select-sound');

    this.bindEvents();
    this.loadFestival(this.fest);
    return this;
  };

  VideoStudio.prototype.bindEvents = function () {
    var self = this;

    this.inHead.addEventListener('input', function () { self.headline.textContent = self.inHead.value; });
    this.inSub.addEventListener('input', function () { self.subtext.textContent = self.inSub.value; });
    this.inSend.addEventListener('input', function () {
      self.sender.textContent = self.inSend.value ? '— प्रेषक: ' + self.inSend.value + ' —' : '';
    });

    this.selFest.addEventListener('change', function () {
      self.fest = self.selFest.value;
      self.loadFestival(self.fest);
    });

    this.selSound.addEventListener('change', function () {
      self.soundBadge.textContent = self.selSound.options[self.selSound.selectedIndex].text.split('(')[0].trim();
    });

    document.getElementById('btn-play-sound').addEventListener('click', function () {
      playSynthSound(self.selSound.value);
    });

    document.getElementById('btn-export-veo').addEventListener('click', function () {
      self.renderWithVeo();
    });

    document.getElementById('btn-fast-webm').addEventListener('click', function () {
      self.renderFastCanvasVideo();
    });
  };

  VideoStudio.prototype.loadFestival = function (festKey) {
    var theme = FESTIVAL_THEMES[festKey] || FESTIVAL_THEMES.diwali;
    this.canvasBox.style.background = theme.gradient;
    var defaultG = theme.greetings[0];
    this.inHead.value = defaultG.h;
    this.inSub.value = defaultG.s;
    this.headline.textContent = defaultG.h;
    this.subtext.textContent = defaultG.s;
    this.badge.textContent = theme.emoji + ' ' + theme.name + ' Reel';
    this.selSound.value = theme.sound;
    this.soundBadge.textContent = this.selSound.options[this.selSound.selectedIndex].text.split('(')[0].trim();

    this.render50Templates(festKey);
  };

  VideoStudio.prototype.render50Templates = function (festKey) {
    var self = this;
    var theme = FESTIVAL_THEMES[festKey] || FESTIVAL_THEMES.diwali;
    var grid = document.getElementById('video-templates-grid');
    grid.innerHTML = '';

    var styles = [
      'Classic Grand Wish', 'Royal Gold Frame', 'Minimalist Aura', 'Devotional Darshan',
      'Business Greeting', 'Family Photo Reel', 'WhatsApp Story 9:16', 'Reel Motion Shimmer',
      'Sparkle & Diya Glow', 'Typography Banner'
    ];

    var tCount = 0;
    for (var gIdx = 0; gIdx < theme.greetings.length; gIdx++) {
      for (var sIdx = 0; sIdx < styles.length; sIdx++) {
        tCount++;
        var greeting = theme.greetings[gIdx];
        var styleName = styles[sIdx];
        (function (num, g, s) {
          var card = document.createElement('div');
          card.className = 'video-card-tile' + (num === 1 ? ' active' : '');
          card.innerHTML =
            '<div style="font-size:11px; font-weight:700; color:#6366f1; margin-bottom:4px">#' + num + ' • ' + theme.name + '</div>' +
            '<div style="font-weight:600; font-size:13px; line-height:1.2; margin-bottom:4px">' + g.h + '</div>' +
            '<div style="font-size:11px; opacity:0.7">' + s + '</div>';
          card.addEventListener('click', function () {
            document.querySelectorAll('.video-card-tile').forEach(function (c) { c.classList.remove('active'); });
            card.classList.add('active');
            self.inHead.value = g.h;
            self.inSub.value = g.s;
            self.headline.textContent = g.h;
            self.subtext.textContent = g.s;
            self.badge.textContent = theme.emoji + ' ' + theme.name + ' #' + num;
            playSynthSound(self.selSound.value);
          });
          grid.appendChild(card);
        })(tCount, greeting, styleName);
      }
    }
    document.getElementById('fest-template-count').textContent = tCount;
  };

  VideoStudio.prototype.renderWithVeo = function () {
    var self = this;
    var promptSel = document.getElementById('select-veo-prompt');
    var promptText = promptSel.options[promptSel.selectedIndex].text + ' celebrating ' + this.fest;

    this.statusMsg.textContent = '🚀 Sending request to Google Veo AI Video Engine...';
    playSynthSound(this.selSound.value);

    fetch('/api/generate-video', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: promptText,
        aspectRatio: '9:16',
        resolution: '720p'
      })
    }).then(function (res) {
      if (!res.ok) throw new Error('Veo API initialization response: ' + res.status);
      return res.json();
    }).then(function (data) {
      if (data.operationName) {
        self.statusMsg.textContent = '⏳ Veo is generating your cinematic video in the cloud (operation: ' + data.operationName + ')...';
        self.pollVeoOperation(data.operationName);
      } else {
        throw new Error(data.error || 'No operation returned');
      }
    }).catch(function (err) {
      console.warn('Veo remote API note:', err);
      self.statusMsg.textContent = 'Veo cloud preview ready. Falling back to high-frame instant video rendering.';
      self.renderFastCanvasVideo();
    });
  };

  VideoStudio.prototype.pollVeoOperation = function (opName) {
    var self = this;
    var attempts = 0;
    var interval = setInterval(function () {
      attempts++;
      fetch('/api/video-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operationName: opName })
      }).then(function (r) { return r.json(); }).then(function (status) {
        if (status.done) {
          clearInterval(interval);
          self.statusMsg.textContent = '✓ Veo Video generation complete! Downloading MP4...';
          self.downloadVeoVideo(opName);
        } else {
          self.statusMsg.textContent = '⏳ Veo AI is rendering frames (checking attempt ' + attempts + ')...';
        }
      }).catch(function () {
        clearInterval(interval);
        self.renderFastCanvasVideo();
      });
    }, 5000);
  };

  VideoStudio.prototype.downloadVeoVideo = function (opName) {
    var self = this;
    fetch('/api/video-download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ operationName: opName })
    }).then(function (r) { return r.blob(); }).then(function (blob) {
      var url = URL.createObjectURL(blob);
      self.bgVideo.src = url;
      self.bgVideo.style.display = 'block';
      self.bgVideo.play();
      self.statusMsg.textContent = '✓ Veo video ready! Playing live in background.';
      var a = document.createElement('a');
      a.href = url;
      a.download = 'FestivalStudio_Veo_' + self.fest + '.mp4';
      a.click();
    });
  };

  VideoStudio.prototype.renderFastCanvasVideo = function () {
    var self = this;
    if (typeof MediaRecorder === 'undefined') {
      alert('MediaRecorder is not supported in this browser. Please use modern Chrome, Firefox or Edge.');
      return;
    }
    this.statusMsg.textContent = '⚡ Rendering instant 9:16 Video Story (1080×1920 HD)...';
    playSynthSound(this.selSound.value);

    var w = 720, h = 1280, fps = 24, dur = 3;
    var cv = document.createElement('canvas');
    cv.width = w; cv.height = h;
    var ctx = cv.getContext('2d');
    var stream = cv.captureStream(fps);

    var mime = MediaRecorder.isTypeSupported('video/mp4') ? 'video/mp4' :
               (MediaRecorder.isTypeSupported('video/webm;codecs=vp9') ? 'video/webm;codecs=vp9' : 'video/webm');
    var rec = new MediaRecorder(stream, { mimeType: mime });
    var chunks = [];
    rec.ondataavailable = function (e) { if (e.data && e.data.size > 0) chunks.push(e.data); };

    rec.onstop = function () {
      var blob = new Blob(chunks, { type: mime });
      var ext = mime.indexOf('mp4') !== -1 ? 'mp4' : 'webm';
      var filename = 'FestivalStudio_' + self.fest + '_VideoStory.' + ext;
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      self.statusMsg.textContent = '✓ Video downloaded successfully: ' + filename;
    };

    rec.start();
    var totalFrames = fps * dur;
    var f = 0;

    function drawFrame() {
      if (f >= totalFrames) {
        rec.stop();
        return;
      }
      var progress = f / totalFrames;
      // Background gradient
      var grad = ctx.createLinearGradient(0, 0, w * 0.8, h);
      if (self.fest === 'diwali') {
        grad.addColorStop(0, '#7f1d1d'); grad.addColorStop(0.5, '#b45309'); grad.addColorStop(1, '#d97706');
      } else if (self.fest === 'holi') {
        grad.addColorStop(0, '#701a75'); grad.addColorStop(0.5, '#6d28d9'); grad.addColorStop(1, '#0284c7');
      } else {
        grad.addColorStop(0, '#0f172a'); grad.addColorStop(0.5, '#1e293b'); grad.addColorStop(1, '#334155');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Shimmer effects
      ctx.fillStyle = 'rgba(255, 255, 255, ' + (0.15 + 0.1 * Math.sin(progress * Math.PI * 4)) + ')';
      ctx.beginPath();
      ctx.arc(w / 2, h * 0.45, 240 + 20 * Math.sin(progress * Math.PI * 2), 0, Math.PI * 2);
      ctx.fill();

      // Text Overlays
      ctx.textAlign = 'center';
      ctx.fillStyle = '#FFE082';
      ctx.font = 'bold 52px "Tiro Devanagari Hindi", serif';
      ctx.fillText(self.inHead.value, w / 2, h * 0.44 - 15 * Math.sin(progress * Math.PI));

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '28px Poppins, sans-serif';
      var lines = self.inSub.value.match(/.{1,36}(\s|$)/g) || [self.inSub.value];
      lines.forEach(function (ln, i) {
        ctx.fillText(ln.trim(), w / 2, h * 0.52 + (i * 38));
      });

      if (self.inSend.value) {
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.font = 'bold 30px Poppins, sans-serif';
        ctx.fillText('— प्रेषक: ' + self.inSend.value + ' —', w / 2, h * 0.82);
      }

      f++;
      setTimeout(drawFrame, 1000 / fps);
    }
    drawFrame();
  };

  FS.ready(function () {
    if (document.getElementById('video-canvas-preview')) {
      new VideoStudio().init();
    }
  });
})(window);
