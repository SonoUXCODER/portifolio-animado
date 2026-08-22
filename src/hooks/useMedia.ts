'use client';

import { useEffect, useState } from 'react';

/**
 * Media query como estado. Começa em `false` no servidor e no primeiro
 * render do cliente, então nada que depende dela pode ser essencial pra
 * leitura da página — só enfeite (cursor, parallax pesado).
 */
export function useMedia(query: string) {
  const [bate, setBate] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const ouvir = () => setBate(mq.matches);
    ouvir();
    mq.addEventListener('change', ouvir);
    return () => mq.removeEventListener('change', ouvir);
  }, [query]);

  return bate;
}

/** ponteiro fino de verdade: mouse, trackpad, caneta. exclui o dedo. */
export const usePonteiroFino = () => useMedia('(hover: hover) and (pointer: fine)');

/** desktop grande — libera as composições mais experimentais */
export const useDesktop = () => useMedia('(min-width: 1024px)');
