import { defineQuery } from "next-sanity";

export const GALLERY_SHOWS_QUERY = defineQuery(`
  *[_type == "galleryShow" && count(photos) > 0] | order(date desc) {
    _id,
    title,
    date,
    venue,
    photographer,
    photos[] {
      _key,
      alt,
      asset
    }
  }
`);
