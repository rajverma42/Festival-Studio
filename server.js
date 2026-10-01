import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

// Dedicated route for ads.txt and app-ads.txt (Google AdMob / AdSense crawler)
app.get(['/ads.txt', '/app-ads.txt'], (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.status(200).send(`google.com, pub-5486620063829815, DIRECT, f08c47fec0942fa0\n`);
});

// Direct APK download routes
app.get(['/download/apk', '/download/app', '/download'], (req, res) => {
  const apkPath = path.join(__dirname, 'downloads', 'FestivalStudio.apk');
  res.download(apkPath, 'FestivalStudio.apk', (err) => {
    if (err) {
      res.status(404).send('APK file not found');
    }
  });
});

// App info & update check API
app.get(['/api/app-info', '/api/app-update', '/api/version'], (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.json({
    name: 'Festival Studio App',
    latestVersion: '2.4.1',
    latestVersionCode: 241,
    currentVersion: '2.4.0',
    packageName: 'net.mikespub.mywebview',
    apkUrl: '/downloads/FestivalStudio.apk?v=20260929_1',
    size: '8.3 MB',
    releaseDate: '2026-09-29',
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
