/** Tokens de movimento. Mesma escala usada no CSS, para não divergirem. */
export const DUR = { fast: 0.16, normal: 0.38, slow: 0.72 } as const;

export const EASE_STANDARD = [0.22, 1, 0.36, 1] as const;
export const EASE_EMPHASIS = [0.76, 0, 0.24, 1] as const;

export const TRANSITION = { duration: DUR.slow, ease: EASE_STANDARD } as const;
export const STAGGER = 0.06;
export const VIEWPORT = { once: true, amount: 0.2 } as const;

/**
 * Mola do cursor.
 *
 * O valor antigo era { stiffness: 1100, damping: 60, mass: 0.35 }. Com essa
 * massa o amortecimento crítico fica em 2*sqrt(k*m) ≈ 39, então damping 60
 * deixava a mola *superamortecida* (razão ≈ 1.5): em vez de acompanhar o
 * ponteiro, ela rastejava até ele. Era essa a lentidão do mouse.
 *
 * Aqui a razão fica em ≈ 0.85 — chega rápido, encosta sem passar do ponto.
 */
export const CURSOR_SPRING = { stiffness: 1400, damping: 45, mass: 0.28 } as const;

/** Suavização do scroll (Lenis). Ver SmoothScroll para o porquê do lerp. */
export const SCROLL = {
  lerp: 0.12,
  wheelMultiplier: 1,
  touchMultiplier: 1.6,
} as const;
