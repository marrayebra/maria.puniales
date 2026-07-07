import Image from "next/image";

import { LyricsAccordion } from "@/components/LyricsAccordion";
import { PlatformLinks } from "@/components/PlatformLinks";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { album, singles, videos } from "@/content/album";

export const metadata = {
  title: "Música",
};

export default function MusicPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-6 pb-24 pt-28 md:px-10">
        <section className="grid gap-10 md:grid-cols-[minmax(0,18rem)_1fr] md:items-start">
          <div className="mx-auto w-full max-w-xs md:mx-0">
            <Image
              src={album.cover}
              alt={`${album.title} portada`}
              width={800}
              height={800}
              className="h-auto w-full"
              priority
              sizes="(max-width: 768px) 72vw, 18rem"
            />
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-muted">
              Álbum · {album.year}
            </p>
            <h1 className="font-display mb-3 text-3xl uppercase tracking-[0.12em] text-white md:text-4xl">
              {album.title}
            </h1>
            <p className="mb-8 text-sm tracking-[0.15em] text-muted">
              Lanzamiento: {album.releaseDate}
            </p>

            <div className="mb-10 overflow-hidden rounded-sm border border-border">
              <iframe
                title="Reproductor de Spotify"
                src={`https://open.spotify.com/embed/album/${album.spotifyAlbumId}?utm_source=generator&theme=0`}
                width="100%"
                height="352"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="border-0 bg-black"
              />
            </div>

            <PlatformLinks links={album.links} />
          </div>
        </section>

        <section className="mt-20 border-t border-border pt-12">
          <h2 className="mb-6 text-xs uppercase tracking-[0.35em] text-muted">
            Créditos
          </h2>
          <ul className="space-y-2 text-sm leading-7 text-foreground/80">
            {album.credits.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        <section className="mt-20 border-t border-border pt-12">
          <h2 className="mb-6 text-xs uppercase tracking-[0.35em] text-muted">
            Canciones
          </h2>
          <LyricsAccordion tracks={album.tracks} />
        </section>

        <section className="mt-20 border-t border-border pt-12">
          <h2 className="mb-8 text-xs uppercase tracking-[0.35em] text-muted">
            Singles
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {singles.map((single) => (
              <div key={single.title} className="flex items-center gap-4">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden">
                  <Image
                    src={single.cover}
                    alt={`${single.title} portada`}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm uppercase tracking-[0.12em] text-white">
                    {single.title}
                  </p>
                  <p className="mt-1 text-xs tracking-[0.15em] text-muted">
                    {single.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 border-t border-border pt-12">
          <h2 className="mb-8 text-xs uppercase tracking-[0.35em] text-muted">
            Videos
          </h2>
          <div className="space-y-8">
            {videos.map((video) => (
              <div key={video.youtubeVideoId}>
                <p className="mb-4 text-sm uppercase tracking-[0.12em] text-white">
                  {video.title}
                </p>
                <div className="overflow-hidden rounded-sm border border-border">
                  <div className="relative aspect-video w-full">
                    <iframe
                      title={`Videoclip de ${video.title}`}
                      src={`https://www.youtube.com/embed/${video.youtubeVideoId}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full border-0"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
