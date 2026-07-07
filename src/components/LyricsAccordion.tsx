"use client";

import { useState } from "react";

import type { Track } from "@/content/album";

type LyricsAccordionProps = {
  tracks: readonly Track[];
};

export function LyricsAccordion({ tracks }: LyricsAccordionProps) {
  const [openTrack, setOpenTrack] = useState<number | null>(null);

  return (
    <div className="divide-y divide-border">
      {tracks.map((track) => {
        const isOpen = openTrack === track.number;

        return (
          <div key={track.number}>
            <button
              type="button"
              onClick={() => setOpenTrack(isOpen ? null : track.number)}
              className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:text-white"
              aria-expanded={isOpen}
            >
              <span className="flex items-baseline gap-4">
                <span className="text-xs tracking-[0.3em] text-muted">
                  {String(track.number).padStart(2, "0")}
                </span>
                <span className="text-sm uppercase tracking-[0.15em]">
                  {track.title}
                </span>
              </span>
              <span className="text-xs uppercase tracking-[0.25em] text-muted">
                {isOpen ? "Cerrar" : "Letra"}
              </span>
            </button>

            {isOpen ? (
              <div className="pb-6 pl-10">
                <div className="space-y-1 text-sm leading-7 text-muted">
                  {track.lyrics.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
