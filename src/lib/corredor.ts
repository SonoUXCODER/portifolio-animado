"use client";

import { useMotionValue, type MotionValue } from "framer-motion";
import { useEffect, type RefObject } from "react";
import { posicaoDaRolagem } from "@/components/rolagem-suave";

/**
 * Progresso 0→1 de um elemento passando pelo topo da tela.
 *
 * Serve para os dois lugares que precisam cancelar a rolagem com precisão de
 * pixel: a passagem circular (que segura o conteúdo revelado parado) e o
 * intervalo 3D (cuja coreografia tem que casar com ela).
 *
 * Por que não `useScroll` do framer-motion: ele se atualiza a partir do evento
 * `scroll`, que chega DEPOIS do quadro em que o Lenis mexeu na página. Um
 * quadro de atraso num contra-movimento é o conteúdo preso andando para um
 * lado e voltando, toda vez — o "agarramento" nas transições. Aqui a
 * geometria é medida uma vez (e de novo quando a página muda de tamanho) e o
 * progresso sai da posição exata que o Lenis acabou de aplicar.
 *
 * `curso` escolhe o denominador:
 *   "altura"  — a altura do próprio elemento (trilho da passagem)
 *   "folga"   — altura menos uma tela (container com painel preso dentro)
 */
export function useProgressoDoCorredor(
  ref: RefObject<HTMLElement | null>,
  curso: "altura" | "folga" = "altura",
): MotionValue<number> {
  const progresso = useMotionValue(0);

  useEffect(() => {
    const alvo = ref.current;
    if (!alvo) return;

    let topo = 0;
    let percurso = 1;

    const calcular = (y: number) => {
      const v = (y - topo) / percurso;
      progresso.set(v < 0 ? 0 : v > 1 ? 1 : v);
    };

    const medir = () => {
      const caixa = alvo.getBoundingClientRect();
      topo = caixa.top + window.scrollY;
      const bruto = curso === "folga" ? caixa.height - window.innerHeight : caixa.height;
      percurso = Math.max(1, bruto);
      calcular(window.scrollY);
    };

    medir();

    /* imagens preguiçosas, fontes e o canvas 3D mudam a altura da página
       depois do primeiro render; sem remedir, o progresso fica deslocado */
    const observador = new ResizeObserver(medir);
    observador.observe(document.documentElement);
    observador.observe(alvo);
    window.addEventListener("resize", medir);

    const parar = posicaoDaRolagem.on("change", calcular);

    return () => {
      observador.disconnect();
      window.removeEventListener("resize", medir);
      parar();
    };
  }, [ref, curso, progresso]);

  return progresso;
}
