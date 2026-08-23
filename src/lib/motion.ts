/* -------------------------------------------------------------------------
   A linguagem de movimento, em JS.

   Espelha exatamente os tokens de globals.css. Existe porque o Framer Motion
   precisa dos números, e sem isto voltam os 17 easings copiados à mão que a
   auditoria encontrou. Mudou aqui, muda lá — e vice-versa.
   ------------------------------------------------------------------------- */

export const duration = {
  fast: 0.16,
  normal: 0.38,
  slow: 0.72,
} as const;

/** entra rápido, assenta devagar. o padrão de tudo que aparece */
export const easeStandard = [0.22, 1, 0.36, 1] as const;
/** simétrica e firme: cortina, máscara, coisa que cobre */
export const easeEmphasis = [0.76, 0, 0.24, 1] as const;
/** quase linear: resposta de hover */
export const easeMicro = [0.4, 0, 0.2, 1] as const;

/** a transição padrão de entrada */
export const enter = { duration: duration.slow, ease: easeStandard };

/** quanto cada item de uma lista espera pelo anterior */
export const stagger = 0.06;

/**
 * Quando o elemento conta como "na tela".
 * `amount: 0.2` é o ponto em que a peça já foi percebida mas ainda não
 * passou — animar antes disso parece aleatório, depois parece atrasado.
 */
export const viewport = { once: true, amount: 0.2 } as const;
