import { GalleryGrid } from "@/components/GalleryGrid";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getGallerySets } from "@/lib/gallery";

export const metadata = {
  title: "Galería",
};

export default function GalleryPage() {
  const sets = getGallerySets();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-28 md:px-10">
        <div className="mb-12">
          <h1 className="font-display text-3xl uppercase tracking-[0.12em] text-white md:text-4xl">
            Galería
          </h1>
          <p className="mt-3 text-sm tracking-[0.15em] text-muted">
            Fotos de shows, ensayos y sesiones.
          </p>
        </div>

        {sets.length > 0 ? (
          <GalleryGrid sets={sets} />
        ) : (
          <p className="text-sm uppercase tracking-[0.3em] text-muted">
            No hay fotos todavía.
          </p>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
