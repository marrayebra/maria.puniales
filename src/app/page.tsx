import Image from "next/image";
import Link from "next/link";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/lib/site";

export default function Home() {
  const { album } = site;

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <SiteHeader />

      <main className="relative flex min-h-screen items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={album.cover}
            alt={`Portada de ${album.title}`}
            fill
            priority
            className="object-cover opacity-35 blur-[1px] scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.55)_100%)]" />
        </div>

        <div className="relative z-10 flex flex-col items-center px-6 py-24 text-center">
          <div className="relative mb-10 w-[min(88vw,24rem)] md:w-[min(70vw,28rem)]">
            <Image
              src={site.logo.fullWordmark}
              alt={site.name}
              width={1200}
              height={600}
              priority
              className="h-auto w-full"
              sizes="(max-width: 768px) 88vw, 28rem"
            />
          </div>

          <div className="relative mb-10 w-[min(72vw,22rem)] shadow-[0_24px_80px_rgba(0,0,0,0.65)]">
            <Image
              src={album.cover}
              alt={`Portada de ${album.title}`}
              width={800}
              height={800}
              priority
              className="h-auto w-full"
              sizes="(max-width: 768px) 72vw, 22rem"
            />
          </div>

          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-white/50">
            {site.tagline}
          </p>

          <h1 className="font-display mb-2 text-3xl uppercase tracking-[0.15em] text-white md:text-4xl">
            {album.title}
          </h1>

          <p className="mb-10 text-sm tracking-[0.3em] text-white/40">
            {album.releaseDate}
          </p>

          <Link
            href={album.listenUrl}
            className="border border-white/30 px-8 py-3 text-xs font-medium uppercase tracking-[0.35em] text-white shadow-[0_0_40px_rgba(255,255,255,0.06)] transition-colors hover:border-white hover:bg-white hover:text-black"
          >
            Escuchar
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
