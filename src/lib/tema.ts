import type { CSSProperties } from "react";

/**
 * Tema claro das seções que nascem de dentro de uma passagem.
 *
 * É só uma troca de variáveis num escopo: tudo que está dentro passa a ler
 * texto escuro sobre creme, sem nenhum componente precisar saber disso.
 * `--background` entra junto porque `.btn` usa ele como cor de texto.
 */
export const TEMA_CLARO = {
  background: "#f2f0eb",
  color: "#0a0a0a",
  "--background": "#f2f0eb",
  "--text-primary": "#0a0a0a",
  "--text-secondary": "#575450",
  "--text-tertiary": "#6f6b66",
  "--line": "rgba(10, 10, 10, 0.14)",
  "--line-strong": "rgba(10, 10, 10, 0.3)",
} as CSSProperties;
