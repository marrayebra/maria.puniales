"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type PhotoLightboxProps = {
  photos: string[];
  startIndex: number;
  alt: string;
  onClose: () => void;
};

export function PhotoLightbox({
  photos,
  startIndex,
  alt,
  onClose,
}: PhotoLightboxProps) {
  const [index, setIndex] = useState(startIndex);

  const showPrevious = useCallback(() => {
    setIndex((current) => (current === 0 ? photos.length - 1 : current - 1));
  }, [photos.length]);

  const showNext = useCallback(() => {
    setIndex((current) => (current === photos.length - 1 ? 0 : current + 1));
  }, [photos.length]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, showNext, showPrevious]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Vista ampliada"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 text-xs uppercase tracking-[0.3em] text-white/70 transition-colors hover:text-white md:right-8 md:top-8"
      >
        Cerrar
      </button>

      {photos.length > 1 ? (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 px-3 py-2 text-2xl text-white/70 transition-colors hover:text-white md:left-6"
            aria-label="Foto anterior"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-2 text-2xl text-white/70 transition-colors hover:text-white md:right-6"
            aria-label="Foto siguiente"
          >
            ›
          </button>
        </>
      ) : null}

      <div
        className="relative h-[min(80vh,900px)] w-[min(92vw,1200px)]"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          src={photos[index]}
          alt={`${alt} ${index + 1}`}
          fill
          className="object-contain"
          sizes="92vw"
          priority
        />
      </div>
    </div>
  );
}
