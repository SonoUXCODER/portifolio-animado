"use client";

import { AnimatePresence, m as motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePointerFino, useMovimentoReduzido } from "@/lib/hooks";
import { CURSOR_SPRING } from "@/lib/motion";

const ROTULOS: Record<string, string> = {
  case: "CASE",
  view: "VIEW",
  open: "OPEN",
  look: "LOOK",
  close: "CLOSE",
  back: "BACK",
  home: "HOME",
  drag: "DRAG",
};

export default function Cursor() {
  const fino = usePointerFino();
  const reduzido = useMovimentoReduzido();
  const [tipo, setTipo] = useState<string | null>(null);
  const [visivel, setVisivel] = useState(false);
  const [pressionado, setPressionado] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const xSuave = useSpring(x, CURSOR_SPRING);
  const ySuave = useSpring(y, CURSOR_SPRING);

  /* o cursor nativo fica escondido enquanto o desenhado está no ar */
  useEffect(() => {
    if (!fino) return;
    document.body.classList.add("has-cursor");
    return () => document.body.classList.remove("has-cursor");
  }, [fino]);

  const ultimoAlvo = useRef<Element | null>(null);
  const visivelRef = useRef(false);

  useEffect(() => {
    if (!fino) return;

    let pendente: Element | null = null;
    let agendado = 0;

    /**
     * `closest('[data-cursor]')` sobe a árvore inteira — e esta página tem
     * milhares de nós. Rodar isso a cada `pointermove` (centenas por segundo)
     * era trabalho jogado fora no mesmo quadro em que o cursor precisa andar.
     *
     * Agora a posição é escrita na hora (é só um MotionValue, não re-renderiza)
     * e a consulta ao DOM acontece no máximo uma vez por quadro, e só quando o
     * elemento sob o ponteiro mudou de verdade.
     */
    const resolverAlvo = () => {
      agendado = 0;
      const alvo = pendente;
      if (!alvo || alvo === ultimoAlvo.current) return;
      ultimoAlvo.current = alvo;
      const comCursor = alvo.closest<HTMLElement>("[data-cursor]");
      const valor = comCursor?.dataset.cursor ?? null;
      setTipo((atual) => (atual === valor ? atual : valor || null));
    };

    const aoMover = (evento: PointerEvent) => {
      x.set(evento.clientX);
      y.set(evento.clientY);

      /* modais devolvem o cursor do sistema via data-native-cursor */
      const nativo = document.body.dataset.nativeCursor === "1";
      if (visivelRef.current === nativo) {
        visivelRef.current = !nativo;
        setVisivel(!nativo);
      }

      pendente = evento.target as Element | null;
      if (!agendado) agendado = requestAnimationFrame(resolverAlvo);
    };

    const aoSair = () => {
      visivelRef.current = false;
      setVisivel(false);
    };
    const aoApertar = () => setPressionado(true);
    const aoSoltar = () => setPressionado(false);

    window.addEventListener("pointermove", aoMover, { passive: true });
    window.addEventListener("pointerdown", aoApertar, { passive: true });
    window.addEventListener("pointerup", aoSoltar, { passive: true });
    document.addEventListener("pointerleave", aoSair);
    return () => {
      if (agendado) cancelAnimationFrame(agendado);
      window.removeEventListener("pointermove", aoMover);
      window.removeEventListener("pointerdown", aoApertar);
      window.removeEventListener("pointerup", aoSoltar);
      document.removeEventListener("pointerleave", aoSair);
    };
    /* sem `visivel` nas dependências: religar os ouvintes a cada mudança de
       estado era o que fazia o cursor perder eventos no meio do movimento */
  }, [fino, x, y]);

  if (!fino) return null;

  const rotulo = tipo ? (ROTULOS[tipo] ?? tipo.toUpperCase()) : null;
  const aberto = Boolean(rotulo);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden lg:block"
      style={{
        x: reduzido ? x : xSuave,
        y: reduzido ? y : ySuave,
        opacity: visivel ? 1 : 0,
      }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full"
        style={{ translateX: "-50%", translateY: "-50%", borderStyle: "solid" }}
        animate={{
          width: aberto ? 76 : 14,
          height: aberto ? 76 : 14,
          backgroundColor: aberto ? "var(--text-primary)" : "transparent",
          borderColor: "var(--text-primary)",
          borderWidth: aberto ? 0 : 2,
          scale: pressionado ? 0.82 : 1,
          rotate: aberto ? -6 : 0,
        }}
        transition={{ type: "spring", stiffness: 520, damping: 34 }}
      >
        <AnimatePresence>
          {rotulo && (
            <motion.span
              key={rotulo}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.14 }}
              className="mono text-[10px] font-semibold tracking-[0.2em]"
              style={{ color: "var(--background)" }}
            >
              {rotulo}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
