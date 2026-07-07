import type { ReleaseLink } from "@/content/album";

type PlatformLinksProps = {
  links: readonly ReleaseLink[];
};

export function PlatformLinks({ links }: PlatformLinksProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-border px-4 py-2 text-xs uppercase tracking-[0.25em] text-foreground/80 transition-colors hover:border-white hover:text-white"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
