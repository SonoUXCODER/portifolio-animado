"use client";

import { m as motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";
import { usePointerFino, useMovimentoReduzido } from "@/lib/hooks";

const MOLA = { stiffness: 260, damping: 22, mass: 0.5 } as const;

/** Botão que é puxado de leve na direção do ponteiro. */
export default function Magnetico({
  children,
  strength = 10,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const fino = usePointerFino();
  const reduzido = useMovimentoReduzido();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSuave = useSpring(x, MOLA);
  const ySuave = useSpring(y, MOLA);
  const ativo = fino && !reduzido;

  return (
    <motion.span
      ref={ref}
      className={className}
      style={ativo ? { x: xSuave, y: ySuave, display: "inline-flex" } : { display: "inline-flex" }}
      onPointerMove={(evento) => {
        if (!ativo) return;
        const caixa = ref.current?.getBoundingClientRect();
        if (!caixa) return;
        x.set(((evento.clientX - (caixa.left + caixa.width / 2)) / (caixa.width / 2)) * strength);
        y.set(((evento.clientY - (caixa.top + caixa.height / 2)) / (caixa.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}
