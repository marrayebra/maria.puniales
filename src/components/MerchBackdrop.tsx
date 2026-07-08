import Image from "next/image";

import { site } from "@/lib/site";

export function MerchBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute left-1/2 top-[40%] h-[min(140vw,900px)] w-[min(140vw,900px)] -translate-x-1/2 -translate-y-1/2">
        <div className="merch-backdrop-layer merch-backdrop-layer-a relative h-full w-full">
          <Image
            src={site.logo.shirtBack}
            alt=""
            fill
            className="object-contain"
            sizes="900px"
          />
        </div>
      </div>

      <div className="absolute left-1/2 top-[62%] h-[min(115vw,720px)] w-[min(115vw,720px)] -translate-x-1/2 -translate-y-1/2">
        <div className="merch-backdrop-layer merch-backdrop-layer-b relative h-full w-full">
          <Image
            src={site.logo.shirtBack}
            alt=""
            fill
            className="object-contain"
            sizes="720px"
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/88 to-background" />
    </div>
  );
}
