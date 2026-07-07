export const SIZES = ["S", "M", "L", "XL"] as const;

export type Size = (typeof SIZES)[number];

/** Reemplazar con el mail real cuando esté listo. */
export const orderEmail = "pedidos@mariapuniales.com";

function merchPath(folder: string, file: string) {
  return `/merch/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;
}

export const shirtProduct = {
  id: "remera",
  title: "Remera",
  description: "Remera oficial de María Puñales.",
  collaboration: {
    name: "Fluz Concept",
    href: "https://www.instagram.com/fluz.concept/",
  },
  priceLabel: "Consultar precio",
  photos: [
    merchPath("tshirts", "AA011.jpg"),
    merchPath("tshirts", "AA017.jpg"),
    merchPath("tshirts", "AA008 (2).jpg"),
    merchPath("tshirts", "AA010 (1).jpg"),
  ],
} as const;

export const cdProduct = {
  id: "cd-atraves",
  title: "CD A través",
  description:
    "Edición física con librillo ilustrado. Incluye las letras del álbum.",
  priceLabel: "Consultar precio",
  bookletPhotos: [
    merchPath("album", "Ilustración_sin_título.png"),
    merchPath("album", "Ilustración_sin_título(1).png"),
    merchPath("album", "Ilustración_sin_título(2).png"),
    merchPath("album", "Ilustración_sin_título 3.png"),
  ],
} as const;

export function buildOrderMailto({
  product,
  size,
  quantity = 1,
}: {
  product: string;
  size?: Size;
  quantity?: number;
}) {
  const subject = encodeURIComponent(`Pedido merch — ${product}`);
  const body = encodeURIComponent(
    [
      "Hola,",
      "",
      "Quiero hacer un pedido:",
      "",
      `Producto: ${product}`,
      size ? `Talle: ${size}` : null,
      `Cantidad: ${quantity}`,
      "",
      "Nombre:",
      "Dirección / envío:",
      "",
      "Gracias.",
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return `mailto:${orderEmail}?subject=${subject}&body=${body}`;
}
