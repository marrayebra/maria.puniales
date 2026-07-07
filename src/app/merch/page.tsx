import { MerchBackdrop } from "@/components/MerchBackdrop";
import { MerchGallery } from "@/components/MerchGallery";
import { MerchOrderForm } from "@/components/MerchOrderForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { cdProduct, shirtProduct } from "@/content/merch";

export const metadata = {
  title: "Merch",
};

export default function MerchPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <MerchBackdrop />
      <SiteHeader />

      <main className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-28 md:px-10">
        <div className="mb-16">
          <h1 className="font-display text-3xl uppercase tracking-[0.12em] text-white md:text-4xl">
            Merch
          </h1>
          <p className="mt-3 text-sm tracking-[0.15em] text-muted">
            Remeras y edición física del álbum.
          </p>
        </div>

        <section className="grid gap-10 border-b border-border pb-20 md:grid-cols-2 md:items-start">
          <MerchGallery photos={shirtProduct.photos} alt={shirtProduct.title} />

          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-muted">
              Remeras
            </p>
            <h2 className="font-display mb-3 text-2xl uppercase tracking-[0.1em] text-white">
              {shirtProduct.title}
            </h2>
            <p className="mb-2 text-sm leading-7 text-foreground/80">
              {shirtProduct.description}
            </p>
            <p className="mb-2 text-sm leading-7 text-foreground/80">
              Colaboración con{" "}
              <a
                href={shirtProduct.collaboration.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
              >
                {shirtProduct.collaboration.name}
              </a>
              .
            </p>
            <p className="mb-8 text-xs uppercase tracking-[0.2em] text-muted">
              {shirtProduct.priceLabel}
            </p>

            <MerchOrderForm productTitle={shirtProduct.title} withSizes />
          </div>
        </section>

        <section className="grid gap-10 pt-20 md:grid-cols-2 md:items-start">
          <MerchGallery photos={cdProduct.bookletPhotos} alt={cdProduct.title} />

          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-muted">
              Disco
            </p>
            <h2 className="font-display mb-3 text-2xl uppercase tracking-[0.1em] text-white">
              {cdProduct.title}
            </h2>
            <p className="mb-2 text-sm leading-7 text-foreground/80">
              {cdProduct.description}
            </p>
            <p className="mb-8 text-xs uppercase tracking-[0.2em] text-muted">
              {cdProduct.priceLabel}
            </p>

            <MerchOrderForm productTitle={cdProduct.title} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
