"use client";

import { useState } from "react";

import {
  SIZES,
  buildOrderMailto,
  type Size,
} from "@/content/merch";

type MerchOrderFormProps = {
  productTitle: string;
  withSizes?: boolean;
};

export function MerchOrderForm({
  productTitle,
  withSizes = false,
}: MerchOrderFormProps) {
  const [size, setSize] = useState<Size>("M");
  const [quantity, setQuantity] = useState(1);

  const mailto = buildOrderMailto({
    product: productTitle,
    size: withSizes ? size : undefined,
    quantity,
  });

  return (
    <div className="space-y-6">
      {withSizes ? (
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted">
            Talle
          </p>
          <div className="flex flex-wrap gap-2">
            {SIZES.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSize(option)}
                className={`min-w-12 border px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors ${
                  size === option
                    ? "border-white bg-white text-black"
                    : "border-border text-foreground/80 hover:border-white hover:text-white"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div>
        <label
          htmlFor={`quantity-${productTitle}`}
          className="mb-3 block text-xs uppercase tracking-[0.3em] text-muted"
        >
          Cantidad
        </label>
        <input
          id={`quantity-${productTitle}`}
          type="number"
          min={1}
          max={10}
          value={quantity}
          onChange={(event) =>
            setQuantity(Math.max(1, Number(event.target.value) || 1))
          }
          className="w-24 border border-border bg-transparent px-3 py-2 text-sm text-white outline-none focus:border-white"
        />
      </div>

      <a
        href={mailto}
        className="inline-block border border-white/30 px-8 py-3 text-xs font-medium uppercase tracking-[0.35em] text-white transition-colors hover:border-white hover:bg-white hover:text-black"
      >
        Pedir por mail
      </a>

      <p className="text-xs leading-6 text-muted">
        Por ahora los pedidos se coordinan por correo. Pronto sumaremos pago
        online.
      </p>
    </div>
  );
}
