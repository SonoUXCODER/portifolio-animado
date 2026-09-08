"use client";

import { domAnimation, LazyMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Carrega só o conjunto de recursos de animação que o site usa.
 *
 * `motion.div` importa o pacote inteiro do framer-motion (animação, layout,
 * drag, gestos). Aqui todo componente usa `m` (o mesmo JSX, sem os recursos
 * embutidos) e o `domAnimation` traz apenas animação e variantes — o que este
 * site de fato faz. Dá cerca de 30% a menos de framer-motion no bundle.
 *
 * Nada de `layoutId` ou `drag` daqui pra frente sem trocar para `domMax`.
 */
export default function Movimento({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
