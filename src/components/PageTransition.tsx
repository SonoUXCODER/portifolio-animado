'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { site } from '@/data/site';

/* -------------------------------------------------------------------------
   TRANSIÇÃO ENTRE PÁGINAS.

   Ordem: a cortina sobe -> a rota troca -> a cortina sai por cima e devolve
   o conteúdo. ~840ms no total.

   Não é enfeite gratuito: as páginas de projeto são pesadas de imagem, e a
   cortina esconde o instante feio em que o navegador troca de documento —
   aquele meio segundo de layout meio montado.

   A cortina é da cor do fundo, não branca. Num site claro o corte em preto
   é o gesto óbvio; aqui o inverso (um flash de bone em tela cheia) seria
   uma pancada de luz na cara de quem está lendo no escuro. Como preto sobre
   preto seria invisível, quem marca o movimento é o filete em acento na
   borda de ataque — que é, literalmente, um corte de cinema.
   ------------------------------------------------------------------------- */

type Ctx = { irPara: (href: string) => void };
const TransicaoCtx = createContext<Ctx>({ irPara: () => {} });
export const useTransicao = () => useContext(TransicaoCtx);

const DURACAO_COBRE = 0.42;
const DURACAO_ABRE = 0.56;

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
      /* a rota nova começa do topo. Sem isto, sair de um projeto no meio da
         página abre o próximo na mesma altura de rolagem. */
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
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
            className="pointer-events-none fixed inset-0 z-[95] flex items-end justify-between px-[var(--gutter)] pb-[var(--space-7)]"
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
            style={{ background: 'var(--background)' }}
          >
            {/* o filete na borda de ataque: é ele que torna o movimento
                visível numa cortina da cor do fundo */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: 'var(--accent)' }}
            />

            <motion.span
              className="label"
              style={{ color: 'var(--text-primary)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.14, duration: 0.2 }}
            >
              {site.wordmark}
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
