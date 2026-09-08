"use client";

import { AnimatePresence, m as motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentProps, ReactNode } from "react";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { SITE } from "@/content/site";
import { useMovimentoReduzido } from "@/lib/hooks";
import { EASE_EMPHASIS } from "@/lib/motion";

const Ctx = createContext<{ irPara: (href: string) => void }>({ irPara: () => {} });

/** Cortina entre páginas. Só entra em navegações de rota, não em âncoras. */
export function ProvedorDeTransicao({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduzido = useMovimentoReduzido();
  const [ativa, setAtiva] = useState(false);
  const destino = useRef<string | null>(null);
  const anterior = useRef(pathname);

  useEffect(() => {
    if (pathname === anterior.current) return;
    anterior.current = pathname;
    destino.current = null;
    setAtiva(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  /* rede de segurança: se a navegação falhar, a cortina não fica presa */
  useEffect(() => {
    if (!ativa) return;
    const t = window.setTimeout(() => setAtiva(false), 1800);
    return () => window.clearTimeout(t);
  }, [ativa]);

  const irPara = useCallback(
    (href: string) => {
      if (href.startsWith("#") || reduzido) {
        router.push(href);
        return;
      }
      destino.current = href;
      setAtiva(true);
    },
    [reduzido, router],
  );

  return (
    <Ctx.Provider value={{ irPara }}>
      {children}
      <AnimatePresence>
        {ativa && (
          <motion.div
            key="cortina"
            className="pointer-events-none fixed inset-0 z-[95] flex items-end justify-between px-[var(--gutter)] pb-[var(--space-7)]"
            initial={{ y: "100%" }}
            animate={{ y: "0%", transition: { duration: 0.42, ease: EASE_EMPHASIS } }}
            exit={{ y: "-100%", transition: { duration: 0.56, ease: EASE_EMPHASIS } }}
            onAnimationComplete={() => {
              if (destino.current) {
                router.push(destino.current);
                destino.current = null;
              }
            }}
            style={{ background: "var(--background)" }}
          >
            <span aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: "var(--accent)" }} />
            <motion.span
              className="label"
              style={{ color: "var(--text-primary)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.14, duration: 0.2 }}
            >
              {SITE.wordmark}
            </motion.span>
            <motion.span
              className="label label--dim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.18, duration: 0.2 }}
            >
              Loading
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}

type PropsLink = ComponentProps<typeof Link> & { cursor?: string };

/** `<Link>` que passa pela cortina e marca o rótulo do cursor. */
export function LinkDeTransicao({ href, children, className, cursor, onClick, ...resto }: PropsLink) {
  const { irPara } = useContext(Ctx);
  return (
    <Link
      href={href}
      className={className}
      data-cursor={cursor}
      onClick={(evento) => {
        if (evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.button !== 0) return;
        evento.preventDefault();
        onClick?.(evento);
        irPara(typeof href === "string" ? href : href.toString());
      }}
      {...resto}
    >
      {children}
    </Link>
  );
}
