import type { SanityImageSource } from "@sanity/image-url";

import { sanityFetch } from "@/sanity/live";
import { galleryFullUrl, galleryThumbUrl } from "@/sanity/image";
import { GALLERY_SHOWS_QUERY } from "@/sanity/queries";

export type GallerySet = {
  id: string;
  title: string;
  dateLabel?: string;
  venue?: string;
  photographer?: string;
  photos: string[];
  thumbs: string[];
};

type GalleryPhoto = {
  _key: string;
  alt?: string | null;
  asset?: { _ref: string; _type: "reference" } | null;
};

type GalleryShowDoc = {
  _id: string;
  title: string | null;
  date: string | null;
  venue: string | null;
  photographer: string | null;
  photos: GalleryPhoto[] | null;
};

function formatDateLabel(isoDate: string) {
  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) return isoDate;
  return `${Number(day)}-${Number(month)}-${year.slice(-2)}`;
}

export async function getGallerySets(): Promise<GallerySet[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return [];
  }

  const { data } = await sanityFetch({
    query: GALLERY_SHOWS_QUERY,
  });

  const shows = (data ?? []) as GalleryShowDoc[];

  return shows
    .map((show) => {
      const photosWithAsset = (show.photos ?? []).filter((photo) =>
        Boolean(photo?.asset?._ref),
      );

      return {
        id: show._id,
        title: show.venue?.trim() || show.title?.trim() || "Show",
        dateLabel: show.date ? formatDateLabel(show.date) : undefined,
        venue: show.venue ?? undefined,
        photographer: show.photographer ?? undefined,
        thumbs: photosWithAsset.map((photo) =>
          galleryThumbUrl(photo as SanityImageSource),
        ),
        photos: photosWithAsset.map((photo) =>
          galleryFullUrl(photo as SanityImageSource),
        ),
      };
    })
    .filter((set) => set.photos.length > 0);
}
