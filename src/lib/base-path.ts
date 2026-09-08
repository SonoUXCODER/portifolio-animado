/** Prefixo do deploy (GitHub Pages serve o site dentro de um subcaminho). */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "/portifolio-animado";

/** Prefixa caminhos absolutos de `public/`; deixa URLs externas em paz. */
export const asset = (src: string) => (src.startsWith("/") ? `${BASE_PATH}${src}` : src);
