/** junta classes ignorando falsy — evita depender de clsx pra três strings */
export function cn(...partes: Array<string | false | null | undefined>) {
  return partes.filter(Boolean).join(' ');
}

/** número pseudo-aleatório estável a partir de uma string (SSR e cliente batem) */
export function semente(texto: string) {
  let h = 2166136261;
  for (let i = 0; i < texto.length; i++) {
    h ^= texto.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 1000) / 1000;
}
