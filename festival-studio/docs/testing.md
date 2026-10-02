# Testing & Verification Report

## Test Plan & Executed Suites

| Component | Test Case | Status | Notes |
| :--- | :--- | :--- | :--- |
| **Website** | HTTP Route 200 checks across all pages | **PASSED** | Verified index, post-maker, gif-maker, status-maker |
| **Website** | Responsive Navigation on Mobile (<600px) | **PASSED** | 3-line hamburger menu stays visible and responsive |
| **Website** | Pure On-device Canvas Export | **PASSED** | PNG rendering & GIF assembly work without server calls |
| **Android** | `FestivalStudioUnitTest` | **PASSED** | Validates template repositories and category mappings |
| **Android** | AnimatedGifEncoder logic | **PASSED** | GIF89a encoding produces valid Netscape looping animation |
| **Android** | MediaSaver Scoped Storage | **PASSED** | Compatible with Android 10+ (Q) MediaStore & legacy storage |
| **Android** | Jetpack Compose Navigation | **PASSED** | Home -> PostMaker -> GifMaker -> StatusMaker -> Settings |
| **Android** | Minimal Permissions Audit | **PASSED** | Only `INTERNET` declared; PhotoPicker handles gallery access |

## Known Limitations & Best Practices:
1. **Large Photo Imports for GIFs:** When selecting high-resolution photos (4K/12MP) for GIF creation, the native encoder scales images down to 400x400 to prevent `OutOfMemoryError` on low-RAM devices.
2. **Offline-First:** All tools function without an internet connection.
