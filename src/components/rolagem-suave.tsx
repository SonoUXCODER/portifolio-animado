"use client";

import Lenis from "lenis";
import { cancelFrame, frame } from "framer-motion";
import { useEffect } from "react";
import { useMovimentoReduzido } from "@/lib/hooks";
import { SCROLL } from "@/lib/motion";

let instancia: Lenis | null = null;

/** Para modais e menus, que precisam travar a página enquanto estão abertos. */
export const travarRolagem = () => instancia?.stop();
export const destravarRolagem = () => instancia?.start();

/** Rolagem programática que respeita a suavização (ou pula direto, se reduzida). */
export function rolarPara(alvo: string | HTMLElement, offset = 0) {
  if (instancia) instancia.scrollTo(alvo, { offset });
  else if (typeof alvo !== "string") window.scrollTo({ top: alvo.offsetTop + offset });
}

export default function RolagemSuave() {
  const reduzido = useMovimentoReduzido();

  useEffect(() => {
    if (reduzido) return;

    /**
     * `lerp` em vez de `duration`.
     *
     * No modo duração (era `duration: 1.05` com ease cúbica), cada evento de
     * roda REINICIA a animação do zero rumo a um alvo novo. Uma roda de mouse
     * dispara um evento a cada ~50 ms, então a curva era reiniciada no seu
     * trecho mais rápido dezenas de vezes seguidas: a velocidade oscilava e a
     * rolagem "travava" a cada clique da roda. Era isso.
     *
     * `lerp` é suavização exponencial: um alvo novo só puxa mais forte, nunca
     * reinicia nada. Fica contínuo com roda, trackpad e barra de rolagem, e
     * não depende da taxa de quadros do monitor.
     */
    const lenis = new Lenis({
      lerp: SCROLL.lerp,
      wheelMultiplier: SCROLL.wheelMultiplier,
      touchMultiplier: SCROLL.touchMultiplier,
      syncTouch: false,
      autoRaf: false,
      anchors: false,
    });
    instancia = lenis;

    /**
     * Lenis roda DENTRO do loop de quadro do framer-motion, e antes dele
     * (`true`). Assim a posição de rolagem já está atualizada quando os
     * `useScroll` leem o valor no mesmo quadro. Com dois loops separados as
     * animações presas à rolagem chegavam um quadro atrasadas — aquele
     * arrasto de "gelatina" entre o conteúdo e os elementos animados.
     */
    const passo = ({ timestamp }: { timestamp: number }) => lenis.raf(timestamp);
    frame.update(passo, true);

    /* Âncoras (#about, #work…) sem o pulo de uma tela que existia antes. */
    const aoClicar = (evento: MouseEvent) => {
      if (evento.defaultPrevented || evento.metaKey || evento.ctrlKey || evento.shiftKey) return;
      if (evento.button !== 0) return;
      const alvo = (evento.target as Element | null)?.closest?.<HTMLAnchorElement>(
        'a[href^="#"], a[href*="/#"]',
      );
      if (!alvo) return;

      const href = alvo.getAttribute("href") ?? "";
      const id = href.slice(href.indexOf("#") + 1);
      if (!id) return;

      const destino = document.getElementById(id);
      if (!destino) return;

      evento.preventDefault();
      const header = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue("--header-h") || "68",
        10,
      );
      /**
       * Sem correção especial para seções dentro de `.passagem`: com a
       * geometria nova, o fim do corredor coincide com o topo natural do
       * conteúdo, então `offsetTop` já é o lugar certo. A versão antiga somava
       * uma tela inteira aqui e a navegação passava direto da seção.
       */
      lenis.scrollTo(destino, { offset: -(header + 16) });
      window.history.pushState(null, "", href);
    };

    document.addEventListener("click", aoClicar);
    return () => {
      document.removeEventListener("click", aoClicar);
      cancelFrame(passo);
      lenis.destroy();
      instancia = null;
    };
  }, [reduzido]);

  return null;
}
