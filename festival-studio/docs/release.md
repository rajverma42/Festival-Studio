# Release & Signing Guide

## Versioning Policy
Festival Studio uses Semantic Versioning (`MAJOR.MINOR.PATCH`):
- `1.0.0` (Native Android Initial Release)
- Code: `1`

## Release Checklist
1. Verify `versionCode` and `versionName` in `app/build.gradle.kts`.
2. Ensure no debug flags or mock endpoints are active.
3. Generate signed release AAB (Android App Bundle) for Google Play:
   ```bash
   ./gradlew bundleRelease
   ```
4. Verify signature:
   ```bash
   apksigner verify --verbose --print-certs app-release.apk
   ```
5. Keystores must **never** be checked into version control. Set environment variables or CI secrets:
   - `KEYSTORE_BASE64`
   - `KEYSTORE_PASSWORD`
   - `KEY_ALIAS`
   - `KEY_PASSWORD`
