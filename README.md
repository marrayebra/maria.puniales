# maria.puniales

Sitio oficial de María Puñales — Next.js + Sanity (galería).

## Stack

- [Next.js](https://nextjs.org) (App Router)
- [Sanity](https://www.sanity.io) — fotos de shows en vivo
- [Tailwind CSS](https://tailwindcss.com)
- Deploy: [Vercel](https://vercel.com)

## Getting started

```bash
cp .env.example .env.local   # rellenar tokens si hace falta
npm install
npm run dev                  # sitio → http://localhost:3000
```

Studio (CMS) en otra terminal:

```bash
npm run studio               # → http://localhost:3333
```

## Contenido

| Qué | Dónde |
| --- | --- |
| Album, lyrics, links | `src/content/album.ts` (hardcoded) |
| Merch (remeras / CD) | `src/content/merch.ts` + `public/merch/` |
| Fotos de shows | Sanity → tipo **Show (Galería)** |

### Importar shows desde `public/gallery/`

```bash
npm run import:gallery
```

Sube cada carpeta de show a Sanity (idempotente por `sourceFolder`). Después podés borrar las fotos del repo.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Landing — album hero |
| `/music` | Créditos, letras, streaming |
| `/gallery` | Shows (Sanity) |
| `/merch` | Remeras y CD |
