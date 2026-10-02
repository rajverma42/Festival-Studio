# Privacy & Permissions Disclosure

## Zero-Telemetry & Zero-Tracking Architecture

Festival Studio is built with an absolute privacy-first philosophy.

### Permissions Declared:
1. `android.permission.INTERNET`: Used only to fetch dynamic online greeting updates and cultural templates when requested.

### Storage & Media Access:
- **No `READ_EXTERNAL_STORAGE` or `WRITE_EXTERNAL_STORAGE` broad permissions required on Android 13+ (API 33+)**:
  - The native app utilizes the standard **Android Photo Picker** (`PickVisualMediaRequest`).
  - The app only accesses the specific images the user explicitly selects.
- **Exported Media**:
  - Rendered posters, GIFs, and status images are written to the standard `Pictures/FestivalStudio` folder using Android MediaStore APIs.

### Local Processing Guarantee:
- All image manipulation, text rendering, and GIF encoding occur on the user's device CPU/GPU.
- No personal photos, signatures, or business contact information are ever sent to remote cloud servers.
