'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { easeEmphasis, easeStandard } from '@/lib/motion';
import { fill } from '@/content';
import { useT } from './ContentProvider';

/* -------------------------------------------------------------------------
   VISUALIZADOR AO VIVO.

   O site do cliente rodando dentro do portfólio, em vez de uma aba nova.
   A diferença não é conveniência: quem abre uma aba nova sai daqui e quase
   nunca volta. Aqui a pessoa vê o trabalho funcionando, fecha, e continua
   de onde parou.

   >>> O TRUQUE DA ESCALA <<<
   Um iframe de 900px de largura faz o site responder como tablet, e o
   trabalho de desktop nunca aparece. Então o iframe é montado sempre na
   largura do dispositivo escolhido (1440 ou 390) e **escalado por CSS** pra
   caber no espaço disponível. O site lá dentro acredita que está numa tela
   de 1440px — porque, pra ele, está.

   >>> POR QUE UM PORTAL <<<
   O visualizador é montado direto no <body>, e não onde foi chamado. Não é
   preferência de organização: os capítulos da seção de trabalho têm
   `transform` 3D, e um elemento transformado vira bloco de contenção pra
   qualquer `position: fixed` dentro dele. Sem o portal, este painel se
   posicionaria em relação ao capítulo — inclinado 12° junto com ele, e do
   tamanho dele.

   >>> QUANDO O SITE RECUSA <<<
   Nem todo domínio aceita ser embutido: `X-Frame-Options` e o
   `frame-ancestors` do CSP existem justamente pra impedir isso, e um deles
   é meu próprio produto. Não dá pra detectar o bloqueio pelo JS (o `load`
   dispara mesmo quando o navegador recusou o documento), então o dado vem
   do arquivo de projeto, conferido na mão com um HEAD na URL. Quando é
   `false`, nem monta o iframe: mostra o motivo e o botão que abre fora.
   ------------------------------------------------------------------------- */

const LARGURAS = {
  desktop: 1440,
  mobile: 390,
} as const;

type Dispositivo = keyof typeof LARGURAS;

export default function LivePreview({
  url,
  title,
  embeddable,
  aoFechar,
}: {
  url: string;
  title: string;
  embeddable: boolean;
  aoFechar: () => void;
}) {
  const t = useT();
  const reduzido = useReducedMotion();
  const painel = useRef<HTMLDivElement>(null);
  const palco = useRef<HTMLDivElement>(null);
  const focoAnterior = useRef<HTMLElement | null>(null);

  const [dispositivo, setDispositivo] = useState<Dispositivo>('desktop');
  const [carregando, setCarregando] = useState(true);
  /* escala do palco: 1 até a medição acontecer, pra não piscar em zero */
  const [escala, setEscala] = useState(1);
  const [altura, setAltura] = useState(900);

  /* ---------- diálogo de verdade ---------- */
  useEffect(() => {
    focoAnterior.current = document.activeElement as HTMLElement | null;
    const overflowAntes = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    painel.current?.querySelector<HTMLElement>('button, a')?.focus();

    const tecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return aoFechar();
      if (e.key !== 'Tab') return;

      /* O foco não pode entrar no iframe pela tabulação e ficar preso lá:
         de dentro dele o nosso keydown não chega, e o Esc pararia de
         funcionar. Por isso o ciclo é fechado só entre os controles. */
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

  /* ---------- mede o palco e calcula a escala ---------- */
  useEffect(() => {
    const el = palco.current;
    if (!el) return;

    const medir = () => {
      const larguraAlvo = LARGURAS[dispositivo];
      const disponivel = el.clientWidth;
      /* nunca amplia: um site de 390px esticado pra 1200 fica ridículo */
      const s = Math.min(1, disponivel / larguraAlvo);
      setEscala(s);
      /* o iframe é montado com a altura real que, depois de escalado, ocupa
         exatamente o palco — senão sobra faixa vazia embaixo */
      setAltura(el.clientHeight / s);
    };

    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, [dispositivo]);

  const larguraAlvo = LARGURAS[dispositivo];

  /* o <body> só existe no cliente; no servidor este componente nunca chega
     a ser pedido, mas o guarda evita explodir num render fora do navegador */
  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        ref={painel}
        role="dialog"
        aria-modal="true"
        aria-label={fill(t.livePreview.label, title)}
        className="fixed inset-0 z-[96] flex flex-col"
        style={{ background: 'var(--background)' }}
        initial={reduzido ? { opacity: 0 } : { y: '100%' }}
        animate={reduzido ? { opacity: 1 } : { y: '0%' }}
        exit={reduzido ? { opacity: 0 } : { y: '100%' }}
        transition={{ duration: reduzido ? 0.15 : 0.6, ease: easeEmphasis }}
      >
        {/* ================= barra ================= */}
        <div
          className="flex shrink-0 flex-wrap items-center justify-between gap-x-[var(--space-5)] gap-y-[var(--space-3)] border-b px-[var(--gutter)] py-[var(--space-4)]"
          style={{ borderColor: 'var(--line)' }}
        >
          <div className="flex min-w-0 items-baseline gap-[var(--space-4)]">
            <span className="title-sm shrink-0">{title}</span>
            <span className="label label--dim truncate">{url.replace(/^https?:\/\//, '')}</span>
          </div>

          <div className="flex items-center gap-[var(--space-5)]">
            {/* alternador de dispositivo: dois botões, sem ícone de celular
                genérico. O rótulo diz a largura real, que é a informação. */}
            {embeddable && (
              <div
                className="hidden items-center gap-[var(--space-1)] sm:flex"
                role="group"
                aria-label={t.livePreview.viewport}
              >
                {(Object.keys(LARGURAS) as Dispositivo[]).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDispositivo(d)}
                    aria-pressed={dispositivo === d}
                    className="label px-[var(--space-3)] py-[var(--space-2)] transition-colors duration-[var(--duration-fast)]"
                    style={{
                      color: dispositivo === d ? 'var(--accent)' : 'var(--text-tertiary)',
                    }}
                  >
                    {d} {LARGURAS[d]}
                  </button>
                ))}
              </div>
            )}

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="label hit link"
              style={{ color: 'var(--text-primary)' }}
            >
              {t.livePreview.openInNewTab} <span aria-hidden="true">↗</span>
            </a>

            <button
              type="button"
              onClick={aoFechar}
              className="label hit flex items-center gap-[var(--space-3)]"
              style={{ color: 'var(--text-primary)' }}
            >
              {t.livePreview.close}
              <span aria-hidden="true" className="relative block h-[11px] w-[11px]">
                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rotate-45 bg-current" />
                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 -rotate-45 bg-current" />
              </span>
            </button>
          </div>
        </div>

        {/* ================= palco ================= */}
        <div ref={palco} className="relative min-h-0 flex-1 overflow-hidden">
          {embeddable ? (
            <>
              <motion.div
                className="absolute left-1/2 top-0 origin-top"
                style={{
                  width: larguraAlvo,
                  height: altura,
                  x: '-50%',
                  scale: escala,
                  /* a origem fica no topo-centro pra o site crescer pra baixo
                     a partir da barra, e não a partir do meio da tela */
                  transformOrigin: 'top center',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: carregando ? 0 : 1 }}
                transition={{ duration: 0.4, ease: easeStandard }}
              >
                <iframe
                  src={url}
                  title={fill(t.livePreview.liveSite, title)}
                  className="h-full w-full border-0"
                  loading="eager"
                  onLoad={() => setCarregando(false)}
                  /* allow-same-origin devolve ao site a própria origem dele,
                     não a nossa — é o que faz storage e fetch funcionarem lá
                     dentro sem dar acesso nenhum a esta página */
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>

              {carregando && (
                <p
                  className="label absolute inset-0 flex items-center justify-center"
                  role="status"
                >
                  {t.livePreview.loading}
                </p>
              )}
            </>
          ) : (
            /* ---- o site recusa ser embutido ---- */
            <div className="flex h-full items-center justify-center px-[var(--gutter)]">
              <div className="max-w-[52ch] text-center">
                <p className="display-md">{t.livePreview.blockedTitle}</p>
                <p className="body mt-[var(--space-5)] mx-auto">
                  {t.livePreview.blockedText}
                </p>
                <p className="mt-[var(--space-7)]">
                  <a href={url} target="_blank" rel="noopener noreferrer" className="btn">
                    {t.livePreview.blockedCta} <span aria-hidden="true">↗</span>
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}
