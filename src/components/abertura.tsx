"use client";

import { AnimatePresence, m as motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SITE } from "@/content/site";
import { useMovimentoReduzido } from "@/lib/hooks";
import { EASE_EMPHASIS, EASE_STANDARD } from "@/lib/motion";

const CHAVE = "sono:loaded";

/**
 * Cortina de abertura, uma vez por sessão.
 *
 * Antes ela segurava a página por 1,1 s cravado, mesmo com tudo já pronto —
 * era o primeiro segundo de "site pesado" que ninguém precisava esperar.
 * Agora o piso é de 420 ms (o suficiente para a cortina não piscar) e ela sai
 * assim que as fontes carregam.
 */
const PISO_MS = 420;
const TETO_MS = 1400;

export default function Abertura() {
  const reduzido = useMovimentoReduzido();
  const [ativa, setAtiva] = useState(false);
  const [progresso, setProgresso] = useState(0);

  useEffect(() => {
    if (reduzido) return;
    try {
      if (sessionStorage.getItem(CHAVE)) return;
    } catch {
      /* modo privado sem storage: mostra a cortina, sem drama */
    }
    setAtiva(true);
  }, [reduzido]);

  useEffect(() => {
    if (!ativa) return;
    document.body.dataset.locked = "1";

    const inicio = performance.now();
    let quadro = requestAnimationFrame(function conta() {
      const t = Math.min(1, (performance.now() - inicio) / TETO_MS);
      setProgresso(Math.round(92 * t));
      if (t < 1) quadro = requestAnimationFrame(conta);
    });

    let vivo = true;
    const encerrar = () => {
      if (!vivo) return;
      vivo = false;
      setProgresso(100);
      window.setTimeout(() => {
        delete document.body.dataset.locked;
        try {
          sessionStorage.setItem(CHAVE, "1");
        } catch {
          /* idem */
        }
        setAtiva(false);
      }, 120);
    };

    const limite = window.setTimeout(encerrar, TETO_MS);
    document.fonts?.ready.then(() => {
      const passou = performance.now() - inicio;
      window.setTimeout(encerrar, Math.max(0, PISO_MS - passou));
    });

    return () => {
      vivo = false;
      cancelAnimationFrame(quadro);
      window.clearTimeout(limite);
    };
  }, [ativa]);

  return (
    <AnimatePresence>
      {ativa && (
        <motion.div
          key="abertura"
          aria-hidden
          className="fixed inset-0 z-[100] flex flex-col justify-between px-[var(--gutter)] py-[var(--space-7)]"
          style={{ background: "var(--background)" }}
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.72, ease: EASE_EMPHASIS } }}
        >
          <motion.p
            className="label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
          >
            {SITE.wordmark}
          </motion.p>

          <div className="flex items-end justify-between gap-[var(--space-5)]">
            <motion.p
              className="display-lg"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_STANDARD } }}
            >
              {SITE.name}
            </motion.p>
            <p className="figure text-[clamp(2rem,6vw,4rem)]" style={{ color: "var(--text-secondary)" }}>
              {String(progresso).padStart(3, "0")}
            </p>
          </div>

          <div className="mt-[var(--space-5)] h-px w-full" style={{ background: "var(--line)" }}>
            <motion.div
              className="h-full origin-left"
              style={{ background: "var(--accent)" }}
              animate={{ scaleX: progresso / 100 }}
              transition={{ duration: 0.2, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
