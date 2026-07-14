/**
 * One-time (or re-runnable) import of public/gallery/* into Sanity galleryShow docs.
 *
 * Usage:
 *   node --env-file=.env.local scripts/import-gallery-to-sanity.mjs
 *
 * Skips folders already imported (matched by sourceFolder field stored on the doc).
 * Requires SANITY_API_WRITE_TOKEN.
 */
import { createClient } from "@sanity/client";
import { createReadStream, existsSync, readdirSync, statSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const galleryRoot = path.join(root, "public", "gallery");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const EXCLUDED = new Set(["Institucionales - Gino"]);

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

if (!existsSync(galleryRoot)) {
  console.error("No public/gallery folder found");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-05-15",
  token,
  useCdn: false,
});

function parseFolderName(folder) {
  const parts = folder.split(" - ");
  if (parts.length === 1) {
    return { title: folder };
  }

  const photographer = parts[parts.length - 1]?.trim();
  const left = parts.slice(0, -1).join(" - ").trim();
  const dateMatch = left.match(/^(\d{1,2})-(\d{1,2})-(\d{2,4})\s+(.+)$/);

  if (dateMatch) {
    const [, day, month, year, venue] = dateMatch;
    const fullYear = Number(year) < 100 ? 2000 + Number(year) : Number(year);
    const isoDate = `${fullYear}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return {
      title: venue.trim(),
      venue: venue.trim(),
      photographer,
      date: isoDate,
    };
  }

  return { title: left, photographer };
}

async function uploadFolder(folder) {
  const meta = parseFolderName(folder);
  const existing = await client.fetch(
    `*[_type == "galleryShow" && sourceFolder == $folder][0]._id`,
    { folder },
  );

  if (existing) {
    console.log(`skip (already imported): ${folder}`);
    return;
  }

  const folderPath = path.join(galleryRoot, folder);
  const files = readdirSync(folderPath)
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  if (files.length === 0) {
    console.log(`skip (no images): ${folder}`);
    return;
  }

  console.log(`importing ${folder} (${files.length} photos)...`);

  const photos = [];
  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const sizeMb = statSync(filePath).size / (1024 * 1024);
    process.stdout.write(`  ↑ ${file} (${sizeMb.toFixed(1)} MB)...`);
    const asset = await client.assets.upload("image", createReadStream(filePath), {
      filename: file,
    });
    photos.push({
      _type: "image",
      _key: asset._id.replace(/[^a-zA-Z0-9]/g, "").slice(-12),
      asset: { _type: "reference", _ref: asset._id },
      alt: `${meta.title} — ${file}`,
    });
    console.log(" ok");
  }

  await client.create({
    _type: "galleryShow",
    title: meta.title,
    venue: meta.venue,
    photographer: meta.photographer,
    date: meta.date,
    sourceFolder: folder,
    photos,
  });

  console.log(`✓ created: ${meta.title}`);
}

const folders = readdirSync(galleryRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((folder) => !EXCLUDED.has(folder));

for (const folder of folders) {
  await uploadFolder(folder);
}

console.log("Done.");
