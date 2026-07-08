import { album } from "@/content/album";

export const site = {
  name: "María Puñales",
  wordmark: "MPÑS",
  tagline: "Nuevo álbum",
  logo: {
    mark: "/logo/mpns.png",
    fullWordmark: "/logo/mariapunales-wordmark.png",
    shirtBack: "/logo/espalda-mpns.png",
    favicon: "/logo/mpns.png",
  },
  social: {
    instagram: "https://www.instagram.com/maria.puniales/",
    youtube: "https://www.youtube.com/@MariaPu%C3%B1alesBanda",
  },
  album: {
    title: album.title,
    year: String(album.year),
    releaseDate: album.releaseDate,
    cover: album.cover,
    listenUrl: "/music",
  },
  nav: [
    { label: "Música", href: "/music" },
    { label: "Galería", href: "/gallery" },
    { label: "Merch", href: "/merch" },
  ],
} as const;
