'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

/* -------------------------------------------------------------------------
   Transição entre páginas.

   Ordem: tela preta sobe -> textura passa por cima -> rota troca -> a tela
   desce e devolve o conteúdo. ~560ms no total, dentro da janela de 400–700ms.

   Não é enfeite gratuito: as páginas de projeto são pesadas de imagem, e a
   cortina esconde o instante feio em que o navegador troca de documento.
   ------------------------------------------------------------------------- */

type Ctx = { irPara: (href: string) => void };
const TransicaoCtx = createContext<Ctx>({ irPara: () => {} });
export const useTransicao = () => useContext(TransicaoCtx);

const DURACAO_COBRE = 0.34;
const DURACAO_ABRE = 0.5;

export function ProvedorDeTransicao({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduzido = useReducedMotion();
  const [cobrindo, setCobrindo] = useState(false);
  const destino = useRef<string | null>(null);
  const primeiroPath = useRef(pathname);

  /* rota trocou de verdade: pode abrir a cortina */
  useEffect(() => {
    if (pathname !== primeiroPath.current) {
      primeiroPath.current = pathname;
      destino.current = null;
      setCobrindo(false);
    }
  }, [pathname]);

  /* rede de segurança: se a rota não trocar (link morto, navegação abortada),
     a cortina não pode ficar presa em cima do site */
  useEffect(() => {
    if (!cobrindo) return;
    const t = window.setTimeout(() => setCobrindo(false), 1800);
    return () => window.clearTimeout(t);
  }, [cobrindo]);

  const irPara = useCallback(
    (href: string) => {
      /* âncora na mesma página não merece cortina nenhuma */
      const soAncora = href.startsWith('#') || (href.startsWith('/#') && pathname === '/');
      if (soAncora || reduzido) {
        router.push(href);
        return;
      }
      destino.current = href;
      setCobrindo(true);
    },
    [pathname, reduzido, router],
  );

  return (
    <TransicaoCtx.Provider value={{ irPara }}>
      {children}

      <AnimatePresence>
        {cobrindo && (
          <motion.div
            key="cortina"
            className="pointer-events-none fixed inset-0 z-[95]"
            initial={{ y: '100%' }}
            animate={{ y: '0%', transition: { duration: DURACAO_COBRE, ease: [0.76, 0, 0.24, 1] } }}
            exit={{ y: '-100%', transition: { duration: DURACAO_ABRE, ease: [0.76, 0, 0.24, 1] } }}
            onAnimationComplete={() => {
              /* a rota só troca depois que a tela já está coberta */
              if (destino.current) {
                router.push(destino.current);
                destino.current = null;
              }
            }}
            style={{ background: 'var(--tinta-base)' }}
          >
            {/* a textura entra meio passo depois do preto: é ela que dá o
                cheiro de fotocópia no meio da troca */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.12, duration: 0.2 }}
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='t'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23t)' opacity='0.55'/%3E%3C/svg%3E\")",
                mixBlendMode: 'screen',
              }}
            />
            <motion.span
              className="mono absolute bottom-8 right-8 text-[11px] tracking-[0.3em]"
              style={{ color: 'var(--papel-base)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              transition={{ delay: 0.14, duration: 0.18 }}
            >
              VIRANDO A PÁGINA
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </TransicaoCtx.Provider>
  );
}

/* -------------------------------------------------------------------------
   Link que passa pela cortina. Continua sendo um <a> de verdade: abre em
   nova aba com ctrl/cmd, aparece no menu do botão direito, funciona sem JS.
   ------------------------------------------------------------------------- */

export function TransitionLink({
  href,
  children,
  className,
  cursor,
  onClick,
  ...resto
}: {
  href: string;
  children: ReactNode;
  className?: string;
  cursor?: string;
  onClick?: () => void;
} & Omit<React.ComponentProps<typeof Link>, 'href' | 'onClick'>) {
  const { irPara } = useTransicao();

  return (
    <Link
      href={href}
      className={className}
      data-cursor={cursor}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        onClick?.();
        irPara(href);
      }}
      {...resto}
    >
      {children}
    </Link>
  );
}
