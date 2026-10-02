# Festival Studio Monorepo

> **100% Free Indian Festival Post Maker, Animated GIF Maker & WhatsApp Status Maker**  
> Complete Monorepo containing the Production Web Application and the Native Android App (Kotlin & Jetpack Compose).

---

## 📁 Repository Structure

```text
festival-studio/
│
├── website/                     # Production Web Application (HTML5, Canvas, ES6)
│   ├── index.html               # Main Festival Studio Landing Page
│   ├── post-maker.html          # Festival Post & Card Studio
│   ├── gif-maker.html           # Animated Festive GIF Creator
│   ├── status-maker.html        # 9:16 WhatsApp Portrait Status Creator
│   ├── templates.html           # 50+ Ready Festive Greeting Templates
│   ├── wishes.html              # Multi-lingual Wishes & Greetings
│   ├── privacy-policy.html      # Comprehensive Privacy Policy
│   ├── manifest.webmanifest     # Progressive Web App (PWA) Manifest
│   ├── sw.js                    # Offline Service Worker
│   ├── css/ & js/               # Local on-device rendering engine
│   └── assets/                  # High-definition frames, stickers, and icons
│
├── android-app/                 # Genuine Native Android Application
│   ├── app/
│   │   ├── build.gradle.kts     # Jetpack Compose & Material 3 setup
│   │   └── src/main/java/com/festivalstudio/app/
│   │       ├── MainActivity.kt  # Root Compose Navigation Host
│   │       ├── domain/          # Festival templates and business models
│   │       ├── ui/              # Compose screens (Home, Post, GIF, Status)
│   │       └── utils/           # AnimatedGifEncoder & MediaSaver
│   ├── settings.gradle.kts
│   └── gradle/libs.versions.toml
│
├── docs/                        # Complete Engineering Documentation
│   ├── setup.md                 # Local build & dev guide for Web & Android
│   ├── testing.md               # QA test suite and validation results
│   ├── release.md               # Versioning, signing, and Play Store checklist
│   └── privacy-and-permissions.md # Security and zero-telemetry disclosure
│
└── .github/workflows/
    └── android-ci.yml           # Automated GitHub Actions CI workflow
```

---

## 🚀 Key Features

1. **Festival Post Maker (HD):** Choose from Diwali, Holi, Navratri, Eid, Raksha Bandhan, and Ganesh Chaturthi themes. Add custom signatures, logos, or photos.
2. **Animated GIF Maker:** Import festival pictures and create looping GIF animations with customizable frame rates.
3. **9:16 WhatsApp Status Maker:** Clean typography on festive gradients designed for WhatsApp, Instagram Stories, and Facebook.
4. **100% On-Device Privacy:** No user photos or media are ever uploaded to remote servers. All processing happens on the device.
5. **No AI Pill Slop / No Watermarks:** Authentic Indian cultural design without forced AI artifacts.
