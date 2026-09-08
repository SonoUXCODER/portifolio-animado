import type { SiteConfig } from "./types";

/**
 * Identidade do site num lugar so.
 *
 * A troca para "sonostudios" e uma linha: mude `name` e `wordmark` aqui
 * (ou defina NEXT_PUBLIC_SITE_NAME / NEXT_PUBLIC_SITE_WORDMARK no build) e o
 * nome muda no header, no rodape gigante, na tela de carregamento, nos
 * metadados e no sitemap de uma vez.
 */
export const SITE: SiteConfig = {
  ...{
    "name": "SONO",
    "wordmark": "sono®",
    "handle": "sonouxcoder",
    "email": "alissonvpt1@gmail.com",
    "city": "Bern",
    "coordinates": "46.9480° N / 7.4474° E",
    "timezone": "Europe/Zurich",
    "shipped": 21,
    "startYear": 2021,
    "social": [
      {
        "label": "GitHub",
        "href": "https://github.com/SonoUXCODER"
      },
      {
        "label": "Instagram",
        "href": "https://instagram.com/somnifobias"
      },
      {
        "label": "Email",
        "href": "mailto:alissonvpt1@gmail.com"
      }
    ]
  },
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "SONO",
  wordmark: process.env.NEXT_PUBLIC_SITE_WORDMARK ?? "sono®",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sonouxcoder.github.io/portifolio-animado",
};
