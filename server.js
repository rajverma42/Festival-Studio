import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, GenerateVideosOperation } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

app.use(express.json({ limit: '25mb' }));

const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Veo AI Video generation proxy routes
app.post('/api/generate-video', async (req, res) => {
  try {
    if (!ai) {
      return res.status(503).json({ error: 'Veo Video API key not configured on server.' });
    }
    const { prompt, aspectRatio, resolution, imageBytes, mimeType } = req.body;
    const reqPayload = {
      model: 'veo-3.1-lite-generate-preview',
      prompt: prompt || 'Festive Indian celebration with glowing diyas and sparkles in cinematic 4k aesthetic',
      config: {
        numberOfVideos: 1,
        resolution: resolution === '1080p' ? '1080p' : '720p',
        aspectRatio: aspectRatio === '16:9' ? '16:9' : '9:16'
      }
    };
    if (imageBytes) {
      reqPayload.image = {
        imageBytes: imageBytes.replace(/^data:image\/[a-z]+;base64,/, ''),
        mimeType: mimeType || 'image/png'
      };
    }
    const operation = await ai.models.generateVideos(reqPayload);
    res.json({ operationName: operation.name });
  } catch (err) {
    console.error('Error starting Veo video generation:', err);
    res.status(500).json({ error: err.message || 'Failed to start video generation' });
  }
});

app.post('/api/video-status', async (req, res) => {
  try {
    if (!ai) return res.status(503).json({ error: 'Veo Video API key not configured.' });
    const { operationName } = req.body;
    if (!operationName) return res.status(400).json({ error: 'operationName required' });
    const op = new GenerateVideosOperation();
    op.name = operationName;
    const updated = await ai.operations.getVideosOperation({ operation: op });
    res.json({ done: !!updated.done, error: updated.error || null });
  } catch (err) {
    console.error('Error checking video status:', err);
    res.status(500).json({ error: err.message || 'Failed to check status' });
  }
});

app.post('/api/video-download', async (req, res) => {
  try {
    if (!ai) return res.status(503).json({ error: 'Veo Video API key not configured.' });
    const { operationName } = req.body;
    if (!operationName) return res.status(400).json({ error: 'operationName required' });
    const op = new GenerateVideosOperation();
    op.name = operationName;
    const updated = await ai.operations.getVideosOperation({ operation: op });
    const uri = updated.response?.generatedVideos?.[0]?.video?.uri;
    if (!uri) {
      return res.status(404).json({ error: 'Video URI not available yet.' });
    }
    const videoRes = await fetch(uri, {
      headers: { 'x-goog-api-key': apiKey }
    });
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Disposition', 'attachment; filename="festival-veo-video.mp4"');
    const arrayBuffer = await videoRes.arrayBuffer();
    res.send(Buffer.from(arrayBuffer));
  } catch (err) {
    console.error('Error downloading video:', err);
    res.status(500).json({ error: err.message || 'Failed to download video' });
  }
});

// Dedicated route for ads.txt and app-ads.txt (Google AdMob / AdSense crawler)
app.get(['/ads.txt', '/app-ads.txt'], (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.status(200).send(`google.com, pub-5486620063829815, DIRECT, f08c47fec0942fa0\n`);
});

// Direct APK download routes
app.get(['/download/apk', '/download/app', '/download', '/downloads/FestivalStudio.apk'], (req, res) => {
  const apkPath = path.join(__dirname, 'downloads', 'FestivalStudio.apk');
  res.setHeader('Content-Type', 'application/vnd.android.package-archive');
  res.setHeader('Content-Disposition', 'attachment; filename="FestivalStudio.apk"');
  res.download(apkPath, 'FestivalStudio.apk', (err) => {
    if (err && !res.headersSent) {
      res.status(404).send('APK file not found');
    }
  });
});

// App info & update check API
app.get(['/api/app-info', '/api/app-update', '/api/version'], (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.json({
    name: 'Festival Studio App',
    latestVersion: '2.4.0',
    latestVersionCode: 240,
    currentVersion: '2.4.0',
    packageName: 'net.mikespub.mywebview',
    apkUrl: '/downloads/FestivalStudio.apk',
    size: '8.2 MB',
    releaseDate: '2026-10-01',
    minAndroid: 'Android 5.0 (Lollipop)+',
    whatsNew: [
      '⚡ Direct fast update from official website',
      '💎 Full Google AdMob integration with real Ad Units',
      '🎨 50+ New Indian festival templates & HD frames',
      '🔒 100% On-device private processing'
    ],
    whatsNewHi: [
      '⚡ आधिकारिक वेबसाइट से डायरेक्ट तेज़ अपडेट',
      '💎 असली Ad Units के साथ पूर्ण Google AdMob इंटीग्रेशन',
      '🎨 50+ नए भारतीय त्यौहार टेम्पलेट्स और HD फ्रेम्स',
      '🔒 100% डिवाइस पर सुरक्षित और प्राइवेट'
    ]
  });
});

// Expose provisioned Firebase configuration to clients
app.get('/api/firebase-config', (req, res) => {
  res.sendFile(path.join(__dirname, 'firebase-applet-config.json'));
});

// Serve static assets from project root
app.use(express.static(__dirname, {
  extensions: ['html'],
  index: 'index.html',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.webmanifest')) {
      res.setHeader('Content-Type', 'application/manifest+json');
    } else if (filePath.endsWith('.apk')) {
      res.setHeader('Content-Type', 'application/vnd.android.package-archive');
      res.setHeader('Content-Disposition', 'attachment; filename="FestivalStudio.apk"');
    }
  }
}));

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Festival Studio running on http://${HOST}:${PORT}`);
});
