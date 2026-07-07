import { album } from "@/content/album";

function publicPath(...segments: string[]) {
  return `/${segments.map((segment) => encodeURIComponent(segment)).join("/")}`;
}

const espaldaLogo = publicPath("logo", "Espalda MPÑS .png");

export const site = {
  name: "María Puñales",
  wordmark: "MPÑS",
  tagline: "Nuevo álbum",
  logo: {
    mark: espaldaLogo,
    fullWordmark: publicPath("logo", "mariapuñales.png"),
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
