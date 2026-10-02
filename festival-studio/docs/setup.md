# Engineering Setup Guide

## 1. Web Application Setup (`website/`)

The website is a pure HTML5, CSS3, and JavaScript offline-first application.

### Running Locally:
```bash
# Using Python built-in HTTP server:
cd festival-studio/website
python3 -m http.server 3000

# Or with Node.js Express server:
npm install
node server.js
```
Open `http://localhost:3000` in any web browser.

---

## 2. Native Android Application Setup (`android-app/`)

### Prerequisites:
- Android Studio Hedgehog (2023.1.1) or newer
- JDK 17 (Eclipse Temurin or OpenJDK recommended)
- Android SDK 34 (Android 14)

### Opening in Android Studio:
1. Open Android Studio.
2. Select **Open an existing project**.
3. Choose the `festival-studio/android-app/` folder.
4. Allow Gradle to sync the version catalog (`gradle/libs.versions.toml`).

### Building via Command Line:
```bash
cd festival-studio/android-app

# Run Unit Tests:
./gradlew test

# Build Debug APK:
./gradlew assembleDebug
```
The output APK will be generated at:
`festival-studio/android-app/app/build/outputs/apk/debug/app-debug.apk`
