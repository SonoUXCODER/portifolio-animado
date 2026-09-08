"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);
  return matches;
}

/** Ponteiro fino com hover de verdade: mouse/trackpad, não dedo. */
export const usePointerFino = () => useMediaQuery("(hover: hover) and (pointer: fine)");

/**
 * `useReducedMotion` do framer-motion devolve `null` no primeiro render.
 * Aqui `false` até saber, para o servidor e o cliente combinarem.
 */
export function useMovimentoReduzido() {
  const [reduzido, setReduzido] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduzido(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);
  return reduzido;
}

/** Só vira `true` depois da hidratação — para o que não pode existir no SSR. */
export function useMontado() {
  const [montado, setMontado] = useState(false);
  useEffect(() => setMontado(true), []);
  return montado;
}
