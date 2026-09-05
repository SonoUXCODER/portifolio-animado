'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { easeEmphasis } from '@/lib/motion';
import { useT } from './ContentProvider';

/* -------------------------------------------------------------------------
   A IMAGEM EM TELA CHEIA.

   Existe pra fechar uma promessa que estava sendo feita e não cumprida: as
   chapas da galeria do estudo de caso são marcadas com `data-cursor="look"`,
   então o cursor virava uma bolha escrita **LOOK** por cima delas — e clicar
   não fazia absolutamente nada. Um cursor que anuncia uma ação é interface,
   não enfeite; anunciar e não responder é pior do que não anunciar.

   O que ele resolve, além do clique morto: a chapa da galeria é a página
   inteira do site do cliente, 1400 x 4400, e no fluxo ela aparece recortada
   com `object-fit: cover` e teto de 72svh. Ou seja, o visitante via o topo e
   nada mais. Aqui ela abre inteira e **rola**, que é a única forma de olhar
   uma captura de página inteira.

   >>> POR QUE UM PORTAL, DE NOVO <<<
   Mesmo motivo do <LivePreview/>: a galeria vive dentro de contêineres com
   transform, e um elemento transformado vira bloco de contenção pra qualquer
   `position: fixed` dentro dele. Montado no <body>, o painel se posiciona
   contra a janela, que é o que ele precisa.

   >>> O FUNDO FECHA, A IMAGEM NÃO <<<
   Clique fora fecha; clique na imagem não faz nada, porque a pessoa está
   olhando pra ela e vai querer arrastar pra rolar. Fechar no clique da
   própria coisa que se está examinando é o erro clássico de galeria.
   ------------------------------------------------------------------------- */

export default function Lightbox({
  src,
  alt,
  width,
  height,
  legenda,
  aoFechar,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  legenda?: string;
  aoFechar: () => void;
}) {
  const t = useT();
  const reduzido = useReducedMotion();
  const painel = useRef<HTMLDivElement>(null);
  const focoAnterior = useRef<HTMLElement | null>(null);

  useEffect(() => {
    focoAnterior.current = document.activeElement as HTMLElement | null;
    const overflowAntes = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    painel.current?.querySelector<HTMLElement>('button')?.focus();

    const tecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        aoFechar();
        return;
      }
      /* o ciclo de tabulação fica preso no painel: atrás dele há a página
         inteira do estudo de caso, e sair pra lá com o painel aberto deixa
         o foco num lugar que ninguém vê */
      if (e.key !== 'Tab') return;
      const focaveis = painel.current?.querySelectorAll<HTMLElement>('button, a[href]');
      if (!focaveis?.length) return;
      const ini = focaveis[0];
      const fim = focaveis[focaveis.length - 1];
      if (e.shiftKey && document.activeElement === ini) {
        e.preventDefault();
        fim.focus();
      } else if (!e.shiftKey && document.activeElement === fim) {
        e.preventDefault();
        ini.focus();
      }
    };

    window.addEventListener('keydown', tecla);
    return () => {
      window.removeEventListener('keydown', tecla);
      document.body.style.overflow = overflowAntes;
      focoAnterior.current?.focus?.();
    };
  }, [aoFechar]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        ref={painel}
        role="dialog"
        aria-modal="true"
        aria-label={alt}
        className="fixed inset-0 z-[96] flex flex-col"
        style={{ background: 'var(--background)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduzido ? 0.12 : 0.32, ease: easeEmphasis }}
      >
        {/* ================= barra ================= */}
        <div
          className="flex shrink-0 items-center justify-between gap-[var(--space-5)] border-b px-[var(--gutter)] py-[var(--space-4)]"
          style={{ borderColor: 'var(--line)' }}
        >
          <span className="label label--dim truncate">{legenda ?? alt}</span>

          <button
            type="button"
            onClick={aoFechar}
            className="label hit flex shrink-0 items-center gap-[var(--space-3)]"
            style={{ color: 'var(--text-primary)' }}
          >
            {t.livePreview.close}
            <span aria-hidden="true" className="relative block h-[11px] w-[11px]">
              <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rotate-45 bg-current" />
              <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 -rotate-45 bg-current" />
            </span>
          </button>
        </div>

        {/* ================= a chapa, inteira e rolável =================
            `onClick` no contêiner e não na imagem: o vazio ao redor fecha,
            a chapa não. `data-cursor="close"` faz a bolha do cursor dizer
            CLOSE justamente na área que fecha, e nada por cima da imagem. */}
        <div
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-[var(--gutter)] py-[var(--space-6)]"
          onClick={aoFechar}
          data-cursor="close"
        >
          <div className="mx-auto w-full max-w-[1080px]">
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              sizes="(max-width: 1160px) 92vw, 1080px"
              className="h-auto w-full cursor-default"
              onClick={(e) => e.stopPropagation()}
              data-cursor=""
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}
