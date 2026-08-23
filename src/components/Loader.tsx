'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { site } from '@/data/site';
import { easeEmphasis, easeStandard } from '@/lib/motion';

/* -------------------------------------------------------------------------
   TELA DE CARREGAMENTO.

   Existe por um motivo estrutural, não estético: o hero abre com um título
   que sobe de trás de uma máscara, e esse gesto só funciona se a fonte de
   display já estiver na tela. Sem a cortina, o visitante vê a fallback
   subir, a Archivo chegar depois e o título trocar de largura na cara dele.

   Regras que eu me impus, pra que ela não vire pedágio:

   1. Tempo máximo de 1.4s. A cortina sai quando as fontes ficam prontas ou
      quando o relógio estoura — o que vier primeiro. Nunca espera imagem.
   2. Aparece uma vez por aba (sessionStorage). Voltar da página de um
      projeto não pode custar outra espera.
   3. Some inteira em prefers-reduced-motion: quem pediu menos movimento não
      quer uma cortina como primeira coisa.
   4. O conteúdo já está montado e legível por baixo — a cortina cobre, não
      substitui. Leitor de tela ignora tudo isto (`aria-hidden`).

   O contador de porcentagem é falso? Não: ele mede o que realmente importa
   aqui, que é a fonte. `document.fonts.ready` resolve quando o display está
   pronto, e é esse evento que fecha a cortina.
   ------------------------------------------------------------------------- */

const CHAVE = 'sono:loaded';
const TETO_MS = 1400;

/** devolve a rolagem e marca a sessão; seguro de chamar mais de uma vez */
function liberar() {
  delete document.body.dataset.locked;
  try {
    sessionStorage.setItem(CHAVE, '1');
  } catch {
    /* sem sessionStorage a cortina volta na próxima navegação, e tudo bem */
  }
}

export default function Loader() {
  const reduzido = useReducedMotion();
  const [visivel, setVisivel] = useState(false);
  const [pct, setPct] = useState(0);

  /* a decisão de mostrar acontece só no cliente: no servidor não existe
     sessionStorage, e renderizar a cortina no HTML faria ela piscar pra
     quem já a viu */
  useEffect(() => {
    if (reduzido) return;
    try {
      if (sessionStorage.getItem(CHAVE)) return;
    } catch {
      /* modo anônimo bloqueia sessionStorage; mostra a cortina e segue */
    }
    setVisivel(true);
  }, [reduzido]);

  useEffect(() => {
    if (!visivel) return;

    document.body.dataset.locked = '1';
    const inicio = performance.now();

    /* a barra sobe pelo tempo decorrido, com teto em 92% — os 8% que faltam
       entram no fim, junto com a cortina saindo. Uma barra que trava em
       100% e fica parada é pior do que uma que nunca chega lá. */
    let raf = 0;
    const passo = () => {
      const t = Math.min(1, (performance.now() - inicio) / TETO_MS);
      setPct(Math.round(t * 92));
      if (t < 1) raf = requestAnimationFrame(passo);
    };
    raf = requestAnimationFrame(passo);

    let vivo = true;
    const fechar = () => {
      if (!vivo) return;
      vivo = false;
      setPct(100);
      /* meio quadro pra barra chegar em 100 antes de a cortina subir */
      window.setTimeout(() => {
        /* A página é destravada aqui, e não quando a cortina termina de
           sair. A diferença importa: a animação de saída roda em
           requestAnimationFrame, e o rAF não roda em aba de fundo — então
           amarrar o destravamento ao fim dela deixava a página presa, sem
           rolagem, pra quem abre o site numa aba que ainda não olhou.
           Destravar antes é invisível (a cortina está subindo e a página
           por baixo já está pronta) e não tem esse modo de falha. */
        liberar();
        setVisivel(false);
      }, 120);
    };

    const teto = window.setTimeout(fechar, TETO_MS);
    document.fonts?.ready.then(() => {
      /* piso de 600ms: fechar em 80ms parece defeito, não velocidade */
      const decorrido = performance.now() - inicio;
      window.setTimeout(fechar, Math.max(0, 600 - decorrido));
    });

    return () => {
      vivo = false;
      cancelAnimationFrame(raf);
      window.clearTimeout(teto);
    };
  }, [visivel]);

  return (
    <AnimatePresence>
      {visivel && (
        <motion.div
          key="loader"
          aria-hidden="true"
          className="fixed inset-0 z-[100] flex flex-col justify-between px-[var(--gutter)] py-[var(--space-7)]"
          style={{ background: 'var(--background)' }}
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.9, ease: easeEmphasis } }}
        >
          <motion.p
            className="label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.4 } }}
          >
            {site.wordmark}
          </motion.p>

          <div className="flex items-end justify-between gap-[var(--space-5)]">
            <motion.p
              className="display-lg"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: easeStandard, delay: 0.1 } }}
            >
              {site.name}
            </motion.p>
            <p className="figure text-[clamp(2rem,6vw,4rem)]" style={{ color: 'var(--text-secondary)' }}>
              {String(pct).padStart(3, '0')}
            </p>
          </div>

          {/* a régua que enche — o único indicador de progresso real */}
          <div className="mt-[var(--space-5)] h-px w-full" style={{ background: 'var(--line)' }}>
            <motion.div
              className="h-full origin-left"
              style={{ background: 'var(--accent)' }}
              animate={{ scaleX: pct / 100 }}
              transition={{ duration: 0.2, ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
