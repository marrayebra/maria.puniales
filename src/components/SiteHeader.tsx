import Image from "next/image";
import Link from "next/link";

import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 bg-black/40 px-4 py-3 backdrop-blur-sm sm:px-6 md:px-10 md:py-4">
      <Link
        href="/"
        className="relative flex h-10 shrink-0 items-center transition-opacity hover:opacity-80 sm:h-11"
        aria-label={site.name}
      >
        <Image
          src={site.logo.mark}
          alt={site.name}
          width={900}
          height={900}
          className="h-full w-auto object-contain object-left"
          sizes="(max-width: 640px) 120px, 140px"
          priority
        />
      </Link>

      <nav className="flex flex-wrap items-center justify-end gap-x-3 gap-y-2 sm:gap-x-6 md:gap-8">
        {site.nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white sm:text-xs sm:tracking-[0.25em]"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
