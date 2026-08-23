'use client';

import { useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import Lenis from 'lenis';

/* -------------------------------------------------------------------------
   ROLAGEM SUAVE.

   É a única dependência de animação que entrou além do Framer Motion, e ela
   entrou porque faz uma coisa que o Framer não faz: muda a *sensação* da
   página inteira. Numa narrativa que acontece pela rolagem, o peso do
   movimento é metade da direção de arte — o mesmo motivo pelo qual um
   elevador de hotel bom fecha a porta devagar.

   Três cuidados que sustentam a decisão:

   1. `prefers-reduced-motion` desliga tudo. Rolagem com inércia é gatilho
      de enjoo pra quem tem sensibilidade vestibular, e aqui isso não é
      detalhe de acessibilidade: é a diferença entre a pessoa conseguir ler
      a página ou fechar a aba.
   2. No toque o Lenis fica de fora (`syncTouch` desligado). O celular já
      tem inércia nativa, boa, e feita pelo sistema — duplicar aquilo dá a
      sensação de tela escorregando.
   3. Lenis rola a janela de verdade, então `useScroll`, `IntersectionObserver`
      e o espião de seção continuam funcionando sem saber que ele existe.

   O clique em âncora passa a ser trabalho dele: com scroll-behavior nativo
   ligado ao mesmo tempo, os dois disputam a mesma rolagem e o resultado é
   um solavanco. Daí `scroll-behavior: auto` no CSS e o `scrollTo` aqui.
   ------------------------------------------------------------------------- */

export default function SmoothScroll() {
  const reduzido = useReducedMotion();

  useEffect(() => {
    if (reduzido) return;

    const lenis = new Lenis({
      /* 1.05s pra assentar: acima disso a página parece pesada, abaixo o
         efeito some e sobra só o custo */
      duration: 1.05,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      /* o dedo continua com a rolagem nativa do sistema */
      syncTouch: false,
      touchMultiplier: 1.6,
    });

    let raf = 0;
    const tick = (tempo: number) => {
      lenis.raf(tempo);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    /* ---- âncoras ----
       Delegação num listener só, no documento: nenhum link precisa saber
       que o Lenis existe, e links criados depois funcionam do mesmo jeito. */
    const aoClicar = (e: MouseEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

      const alvo = (e.target as HTMLElement | null)?.closest?.('a[href^="#"], a[href^="/#"]');
      if (!alvo) return;

      const href = alvo.getAttribute('href') ?? '';
      const id = href.slice(href.indexOf('#') + 1);
      if (!id) return;

      /* link de "/#algo" vindo de outra rota é navegação de verdade, não
         âncora: deixa o Next resolver */
      if (href.startsWith('/#') && window.location.pathname !== '/') return;

      const destino = document.getElementById(id);
      if (!destino) return;

      e.preventDefault();
      const header = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--header-h') || '68',
        10,
      );
      lenis.scrollTo(destino, { offset: -(header + 16) });
      /* o hash entra no histórico à mão: sem isso o botão "voltar" pula
         a seção e a URL não guarda onde a pessoa estava */
      window.history.pushState(null, '', href);
    };

    document.addEventListener('click', aoClicar);

    return () => {
      document.removeEventListener('click', aoClicar);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reduzido]);

  return null;
}
