'use client';

import { useEffect, useState } from 'react';

/**
 * Qual seção está sendo lida agora.
 *
 * Um IntersectionObserver só, com uma faixa estreita no meio da tela como
 * raiz: a seção "ativa" é a que cruza essa faixa, não a que ocupa mais
 * pixels. A diferença aparece nas seções altas — com a regra de área, uma
 * seção de 3000px continuaria marcada como ativa muito depois de a próxima
 * já estar sendo lida.
 *
 * Sem listener de scroll: o observer não custa nada em rolagem contínua.
 */
export function useSectionSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    const alvos = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!alvos.length) return;

    /* a faixa fica a 45% do topo: perto do ponto onde o olho descansa */
    const obs = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas.filter((e) => e.isIntersecting);
        if (!visivel.length) return;
        /* se mais de uma cruza a faixa, ganha a que está mais no topo */
        const topo = visivel.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
        )[0];
        setActive(topo.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );

    for (const el of alvos) obs.observe(el);
    return () => obs.disconnect();
  }, [ids]);

  return active;
}
