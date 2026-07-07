"use client";

import Image from "next/image";
import { useState } from "react";

type MerchGalleryProps = {
  photos: readonly string[];
  alt: string;
};

export function MerchGallery({ photos, alt }: MerchGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <div className="relative aspect-square overflow-hidden bg-zinc-900">
        <Image
          src={photos[activeIndex]}
          alt={`${alt} ${activeIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {photos.length > 1 ? (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {photos.map((photo, index) => (
            <button
              key={photo}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative aspect-square overflow-hidden border ${
                activeIndex === index ? "border-white" : "border-border"
              }`}
            >
              <Image
                src={photo}
                alt={`${alt} miniatura ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
