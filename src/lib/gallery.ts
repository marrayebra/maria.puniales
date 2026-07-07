import fs from "fs";
import path from "path";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const EXCLUDED_GALLERY_FOLDERS = new Set([
  "Institucionales - Gino",
]);

export type GallerySet = {
  id: string;
  folder: string;
  title: string;
  dateLabel?: string;
  venue?: string;
  photographer?: string;
  sortKey: number;
  photos: string[];
};

function encodePublicPath(segments: string[]) {
  return `/gallery/${segments.map((segment) => encodeURIComponent(segment)).join("/")}`;
}

function parseFolderName(folder: string): Omit<GallerySet, "id" | "folder" | "photos" | "sortKey"> {
  const parts = folder.split(" - ");

  if (parts.length === 1) {
    return { title: folder };
  }

  const photographer = parts[parts.length - 1]?.trim();
  const left = parts.slice(0, -1).join(" - ").trim();
  const dateMatch = left.match(/^(\d{1,2}-\d{1,2}-\d{2,4})\s+(.+)$/);

  if (dateMatch) {
    const [, dateLabel, venue] = dateMatch;
    return {
      title: venue.trim(),
      dateLabel,
      venue: venue.trim(),
      photographer,
    };
  }

  return {
    title: left,
    photographer,
  };
}

function parseSortKey(dateLabel?: string) {
  if (!dateLabel) {
    return 0;
  }

  const [day, month, year] = dateLabel.split("-").map(Number);
  const fullYear = year < 100 ? 2000 + year : year;

  return fullYear * 10000 + month * 100 + day;
}

export function getGallerySets(): GallerySet[] {
  const galleryRoot = path.join(process.cwd(), "public", "gallery");

  if (!fs.existsSync(galleryRoot)) {
    return [];
  }

  const folders = fs
    .readdirSync(galleryRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((folder) => !EXCLUDED_GALLERY_FOLDERS.has(folder));

  return folders
    .map((folder) => {
      const folderPath = path.join(galleryRoot, folder);
      const files = fs
        .readdirSync(folderPath)
        .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

      const meta = parseFolderName(folder);

      return {
        id: folder,
        folder,
        ...meta,
        sortKey: parseSortKey(meta.dateLabel),
        photos: files.map((file) => encodePublicPath([folder, file])),
      };
    })
    .filter((set) => set.photos.length > 0)
    .sort((a, b) => b.sortKey - a.sortKey);
}
