import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Dedicated route for ads.txt and app-ads.txt (Google AdMob / AdSense crawler)
app.get(['/ads.txt', '/app-ads.txt'], (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.status(200).send('google.com, pub-5486620063829815, DIRECT, f08c47fec0942fa0
');
});

// Direct APK download routes
// Direct APK download routes
app.get(['/download/apk', '/download/app', '/download'], (req, res) => {
  const apkPath = path.join(__dirname, 'downloads', 'FestivalStudio.apk');
  res.download(apkPath, 'FestivalStudio.apk', (err) => {
    if (err) {
      res.status(404).send('APK file not found');
    }
  });
});

// App info API
app.get('/api/app-info', (req, res) => {
  res.json({
    name: 'Festival Studio App',
    version: '2.4.0',
    packageName: 'com.festivalstudio.app',
    apkUrl: '/downloads/FestivalStudio.apk',
    size: '6.8 MB',
    minAndroid: 'Android 5.0 (Lollipop)+',
    adsType: 'Google AdMob (App)'
  });
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
