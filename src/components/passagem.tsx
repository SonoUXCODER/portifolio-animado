"use client";

import { m as motion, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";
import { useProgressoDoCorredor } from "@/lib/corredor";
import { useMovimentoReduzido } from "@/lib/hooks";

/** Centro do círculo que abre. Um pouco acima do meio, para caber o cabeçalho. */
const CENTRO = "45svh";

/**
 * A próxima seção nasce dentro de um círculo que abre por cima do painel preso.
 *
 * O corredor é o trilho de rolagem (100svh) e o conteúdo fica pinado nele: o
 * `y` de -100svh a 0 cancela exatamente a rolagem da página, então a seção
 * revelada não se move enquanto o círculo cresce.
 *
 * Esse cancelamento precisa ser exato NO QUADRO. Com `useScroll` ele saía de
 * um evento de `scroll`, que chega um quadro depois de o Lenis mexer na
 * página: o conteúdo preso avançava e voltava a cada quadro, e a rolagem
 * "agarrava" justamente nas transições. Agora o progresso vem da posição que o
 * Lenis acabou de aplicar, no mesmo quadro. Ver lib/corredor.ts.
 *
 * Ver globals.css para a geometria — em resumo, `margin-top: -200svh` faz o
 * corredor cair sobre a parte em que o painel ainda está preso.
 */
export default function Passagem({ children }: { children: ReactNode }) {
  const corredor = useRef<HTMLDivElement>(null);
  const reduzido = useMovimentoReduzido();
  const progresso = useProgressoDoCorredor(corredor);

  const y = useTransform(progresso, [0, 1], ["-100svh", "0svh"]);
  const raio = useTransform(progresso, [0.02, 0.72], [0, 85]);
  const clipPath = useTransform(raio, (r) =>
    r >= 84.5 ? "none" : `circle(${r}vmax at 50% ${CENTRO})`,
  );
  const scale = useTransform(progresso, [0.02, 0.85], [1.06, 1]);

  return (
    <div className="passagem">
      <div ref={corredor} className="passagem__corredor" aria-hidden />
      <motion.div
        className="passagem__conteudo"
        style={reduzido ? undefined : { y, scale, clipPath, transformOrigin: `50% ${CENTRO}` }}
      >
        {children}
      </motion.div>
    </div>
  );
}
