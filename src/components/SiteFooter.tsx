import Image from "next/image";
import Link from "next/link";

import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black px-4 py-10 sm:px-6 md:px-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <Link
          href="/"
          className="relative block h-9 w-20 transition-opacity hover:opacity-80"
          aria-label={site.name}
        >
          <Image
            src={site.logo.mark}
            alt=""
            fill
            className="object-contain object-left"
            sizes="80px"
          />
        </Link>

        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 sm:justify-end">
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white"
          >
            Instagram
          </a>
          <a
            href={site.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white"
          >
            YouTube
          </a>
        </div>
      </div>
    </footer>
  );
}
