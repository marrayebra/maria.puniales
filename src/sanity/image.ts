import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import { client } from "./client";

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/** Gallery thumb / grid — wide enough for 2–4 col layouts */
export function galleryThumbUrl(source: SanityImageSource) {
  return urlFor(source).width(1200).quality(80).auto("format").url();
}

/** Lightbox full view */
export function galleryFullUrl(source: SanityImageSource) {
  return urlFor(source).width(2400).quality(85).auto("format").url();
}
