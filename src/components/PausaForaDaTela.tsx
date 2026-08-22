'use client';

import { useEffect } from 'react';

/* -------------------------------------------------------------------------
   Um observador só, pra toda animação infinita da página.

   A auditoria encontrou sete animações em loop rodando o tempo inteiro —
   as três faixas de marquee, os quatro giros da gaveta, a estrela que
   flutua no colofão e o ponto que pisca na régua. Todas continuavam
   queimando ciclo (e bateria) muito depois de sair da tela, porque o
   navegador não pausa animação CSS por conta própria.

   A alternativa seria um observer por componente. Um só, escutando todo
   mundo que se marca com `data-pausa`, custa quase nada e não obriga cada
   peça a saber de performance.

   O trabalho pesado é do CSS: este componente só escreve um atributo.
   ------------------------------------------------------------------------- */

export default function PausaForaDaTela() {
  useEffect(() => {
    const alvos = document.querySelectorAll<HTMLElement>('[data-pausa]');
    if (!alvos.length) return;

    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          (e.target as HTMLElement).dataset.visivel = e.isIntersecting ? '1' : '0';
        }
      },
      /* uma folga generosa: a animação já está rodando quando a peça
         aparece, sem o solavanco de começar exatamente na borda */
      { rootMargin: '200px 0px' },
    );

    for (const el of alvos) {
      el.dataset.visivel = '0';
      obs.observe(el);
    }

    /* aba escondida: o navegador congela o rAF mas não a animação CSS */
    const aoTrocarDeAba = () => {
      document.documentElement.dataset.abaOculta = document.hidden ? '1' : '0';
    };
    aoTrocarDeAba();
    document.addEventListener('visibilitychange', aoTrocarDeAba);

    return () => {
      obs.disconnect();
      document.removeEventListener('visibilitychange', aoTrocarDeAba);
    };
  }, []);

  return null;
}
