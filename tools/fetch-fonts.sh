#!/usr/bin/env bash
# ============================================================================
# Festival Studio — optional: self-host the fonts instead of using Google Fonts
#
# Why: fonts served from your own domain load faster in India, remove a
# third-party request from your privacy policy, and keep the editor working
# on a locked-down network.
#
# Usage:
#   bash tools/fetch-fonts.sh
#   then follow the printed instructions to swap the <link> in tools/build.js
#   and re-run: node tools/build.js
#
# Requires: curl (and an internet connection).
# ============================================================================
set -euo pipefail

DIR="assets/fonts"
mkdir -p "$DIR"

CSS_URL="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,600&family=Noto+Sans+Devanagari:wght@400;600;700&family=Tiro+Devanagari+Hindi&family=Mukta:wght@400;700&family=Rozha+One&family=Baloo+2:wght@600;700&family=Playfair+Display:wght@600;700&family=Anton&display=swap"
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"

echo "→ downloading font CSS…"
curl -sS -A "$UA" "$CSS_URL" -o "$DIR/fonts.css"

echo "→ downloading woff2 files…"
grep -oE 'https://fonts\.gstatic\.com[^)]+\.woff2' "$DIR/fonts.css" | sort -u | while read -r url; do
  name="$(basename "$url")"
  [ -f "$DIR/$name" ] || curl -sS -A "$UA" "$url" -o "$DIR/$name"
done

echo "→ rewriting URLs to local paths…"
sed -i.bak -E 's#https://fonts\.gstatic\.com[^)]*/([^/)]+\.woff2)#./\1#g' "$DIR/fonts.css"
rm -f "$DIR/fonts.css.bak"

cat <<'EOF'

Done. Fonts are in assets/fonts/.

Next:
 1. In tools/build.js, replace the two <link rel="preconnect"> lines and the
    Google Fonts <link rel="stylesheet"> with:

      <link rel="stylesheet" href="${b}assets/fonts/fonts.css">

    and add, just above it, for the two faces used most:

      <link rel="preload" as="font" type="font/woff2" crossorigin
            href="${b}assets/fonts/<poppins-latin-file>.woff2">

 2. Re-run:  node tools/build.js
 3. Remove the Google Fonts paragraph from privacy.html (it no longer applies)
    by editing the "Third-party resources" section in tools/build.js.
EOF
