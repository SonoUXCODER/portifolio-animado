"use client";

import { m as motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LinhasQueSobem, ReguaAnimada, TextoQueAcende } from "@/components/animacoes";
import type { Dictionary } from "@/content/types";
import { useMovimentoReduzido } from "@/lib/hooks";

/** A seção clara que nasce de dentro do círculo, depois da primeira escultura. */
export default function Filosofia({ t }: { t: Dictionary["philosophy"] }) {
  const secao = useRef<HTMLElement>(null);
  const reduzido = useMovimentoReduzido();
  const { scrollYProgress } = useScroll({ target: secao, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <section
      ref={secao}
      aria-labelledby="philosophy-title"
      className="w-full overflow-clip py-[var(--space-10)]"
      style={
        {
          background: "#f2f0eb",
          "--text-primary": "#0a0a0a",
          "--text-secondary": "#575450",
          "--text-tertiary": "#6f6b66",
          "--line": "rgba(10, 10, 10, 0.14)",
          "--line-strong": "rgba(10, 10, 10, 0.3)",
          color: "#0a0a0a",
        } as React.CSSProperties
      }
    >
      <motion.div className="shell" style={reduzido ? undefined : { y }}>
        <p className="index-line">
          <span style={{ color: "var(--text-primary)" }}>{t.label}</span>
          <ReguaAnimada />
        </p>

        <div className="grid-12 mt-[var(--space-8)] gap-y-[var(--space-7)]">
          <div className="col-span-12 lg:col-span-8">
            <LinhasQueSobem lines={t.lines} as="h2" className="display-xl" />
            <span id="philosophy-title" className="sr-only">
              {t.label}
            </span>
          </div>
          <div className="col-span-12 md:col-span-8 lg:col-span-3 lg:col-start-10 lg:self-end">
            <TextoQueAcende texto={t.text} className="body" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
