#!/bin/bash
set -euo pipefail

cd "$(dirname "$0")/.."

GALLERY_FOLDER="6-6-25 Ducon - a traves del espejo"
GALLERY_FILES=(
  "DSC03246-Mejorado-NR.jpg"
  "DSC03242-Mejorado-NR.jpg"
  "DSC03267-Mejorado-NR.jpg"
  "DSC03005-Mejorado-NR.jpg"
  "DSC03258-Mejorado-NR.jpg"
  "DSC03291-Mejorado-NR.jpg"
  "DSC03305-Mejorado-NR.jpg"
  "DSC03245-Mejorado-NR.jpg"
)

MERCH_ALBUM_FILES=(
  "Ilustración_sin_título.png"
  "Ilustración_sin_título(1).png"
  "Ilustración_sin_título(2).png"
  "Ilustración_sin_título 3.png"
)

push_cmd='git -c http.version=HTTP/1.1 -c http.postBuffer=524288000 push origin main'

echo "→ Commit 1/6: código y config"
git add \
  .gitignore .env.example \
  AGENTS.md CLAUDE.md README.md \
  eslint.config.mjs next.config.ts postcss.config.mjs tsconfig.json next-env.d.ts \
  package.json package-lock.json \
  public/file.svg public/globe.svg public/next.svg public/vercel.svg public/window.svg public/album-cover.svg \
  public/fonts/.gitkeep \
  scripts/push-in-parts.sh \
  src/
git commit -m "Add site code and configuration"

echo "→ Commit 2/6: portadas de álbum"
git add public/album/
git commit -m "Add album artwork"

echo "→ Commit 3/6: logos"
git add public/logo/
git commit -m "Add band logos"

echo "→ Commit 4/6: fotos de remeras (merch)"
git add public/merch/tshirts/
git commit -m "Add merch t-shirt photos"

echo "→ Commit 5/6: ilustraciones del CD (solo las usadas)"
for file in "${MERCH_ALBUM_FILES[@]}"; do
  git add -f "public/merch/album/$file"
done
git commit -m "Add CD booklet illustrations"

echo "→ Commit 6/6: galería piloto (8 fotos Ducon)"
for file in "${GALLERY_FILES[@]}"; do
  git add -f "public/gallery/$GALLERY_FOLDER/$file"
done
git commit -m "Add pilot gallery photos (Ducon)"

echo ""
echo "✓ 6 commits listos. Pusheá todo junto:"
echo "  $push_cmd"
echo ""
echo "O de a uno (del más viejo al más nuevo):"
git log --oneline --reverse origin/main..HEAD | while read -r hash msg; do
  echo "  git push origin ${hash}:main"
done
