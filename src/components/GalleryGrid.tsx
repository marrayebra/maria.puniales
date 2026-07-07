"use client";

import Image from "next/image";
import { useState } from "react";

import { PhotoLightbox } from "@/components/PhotoLightbox";
import type { GallerySet } from "@/lib/gallery";

type GalleryGridProps = {
  sets: GallerySet[];
};

function GalleryPhotos({
  set,
  expanded,
  onOpenLightbox,
}: {
  set: GallerySet;
  expanded: boolean;
  onOpenLightbox: (index: number) => void;
}) {
  if (expanded) {
    return (
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-3">
        {set.photos.map((photo, index) => (
          <button
            key={photo}
            type="button"
            onClick={() => onOpenLightbox(index)}
            className="group relative aspect-[4/3] overflow-hidden bg-zinc-900"
          >
            <Image
              src={photo}
              alt={`${set.title} ${index + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="-mx-6 overflow-x-auto px-6 md:-mx-10 md:px-10">
      <div className="flex snap-x snap-mandatory gap-2 sm:gap-3">
        {set.photos.map((photo, index) => (
          <button
            key={photo}
            type="button"
            onClick={() => onOpenLightbox(index)}
            className="group relative aspect-[4/3] w-[72vw] shrink-0 snap-start overflow-hidden bg-zinc-900 sm:w-[42vw] md:w-[28vw] lg:w-[22vw]"
          >
            <Image
              src={photo}
              alt={`${set.title} ${index + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 72vw, (max-width: 768px) 42vw, 28vw"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export function GalleryGrid({ sets }: GalleryGridProps) {
  const [expandedSets, setExpandedSets] = useState<Record<string, boolean>>({});
  const [lightbox, setLightbox] = useState<{
    photos: string[];
    index: number;
    alt: string;
  } | null>(null);

  return (
    <>
      <div className="space-y-16 md:space-y-20">
        {sets.map((set) => {
          const expanded = expandedSets[set.id] ?? false;

          return (
            <section key={set.id}>
              <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
                <div className="min-w-0 border-b border-border pb-4 sm:border-0 sm:pb-0">
                  <h2 className="font-display text-sm uppercase tracking-[0.2em] text-white sm:text-base">
                    {set.title}
                  </h2>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs uppercase tracking-[0.2em] text-muted">
                    {set.dateLabel ? <span>{set.dateLabel}</span> : null}
                    {set.photographer ? (
                      <span>Fotos: {set.photographer}</span>
                    ) : null}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setExpandedSets((current) => ({
                      ...current,
                      [set.id]: !expanded,
                    }))
                  }
                  className="shrink-0 self-start border border-border px-4 py-2 text-xs uppercase tracking-[0.25em] text-foreground/80 transition-colors hover:border-white hover:text-white sm:self-auto"
                >
                  {expanded ? "Contraer" : `Expandir (${set.photos.length})`}
                </button>
              </div>

              <GalleryPhotos
                set={set}
                expanded={expanded}
                onOpenLightbox={(index) =>
                  setLightbox({
                    photos: set.photos,
                    index,
                    alt: set.title,
                  })
                }
              />
            </section>
          );
        })}
      </div>

      {lightbox ? (
        <PhotoLightbox
          photos={lightbox.photos}
          startIndex={lightbox.index}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      ) : null}
    </>
  );
}
