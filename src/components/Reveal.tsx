'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { duration, easeStandard, enter, stagger, viewport } from '@/lib/motion';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------
   As peças de rolagem. Seis, e nada mais:

     Reveal         — um elemento entra
     RevealGroup    — vários entram em cascata
     Parallax       — desloca conforme a rolagem
     ScrollLine     — traço que se desenha com o progresso
     Lines          — título que sobe linha por linha, atrás de máscara
     Counter        — número que conta ao entrar na tela

   Todas checam prefers-reduced-motion e, quando ele está ligado, entregam
   no máximo um fade curto: nada de deslocamento, nada de parallax, nada de
   contagem.

   O deslocamento padrão é 24px. Acima de ~30px o movimento deixa de parecer
   que o conteúdo assentou e passa a parecer que ele voou de algum lugar.
   ------------------------------------------------------------------------- */

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const offset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: -28, y: 0 },
  right: { x: 28, y: 0 },
  none: { x: 0, y: 0 },
};

export function Reveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  style,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  style?: CSSProperties;
  as?: 'div' | 'li' | 'span' | 'section' | 'article' | 'header';
}) {
  const reduced = useReducedMotion();
  const d = offset[direction];
  const M = motion[as] as typeof motion.div;

  return (
    <M
      className={className}
      style={style}
      initial={reduced ? { opacity: 0 } : { opacity: 0, x: d.x, y: d.y }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 }}
      viewport={viewport}
      transition={{ ...enter, delay, duration: reduced ? duration.fast : enter.duration }}
    >
      {children}
    </M>
  );
}

/* ---------- cascata ----------
   O pai orquestra e os filhos herdam via variants: um observer só pro grupo
   inteiro, em vez de um por item. */

export function RevealGroup({
  children,
  className,
  step = stagger,
  delay = 0,
  as = 'div',
  style,
}: {
  children: ReactNode;
  className?: string;
  step?: number;
  delay?: number;
  as?: 'div' | 'ul' | 'ol' | 'dl';
  style?: CSSProperties;
}) {
  const M = motion[as] as typeof motion.div;
  return (
    <M
      className={className}
      style={style}
      initial="hidden"
      whileInView="shown"
      viewport={viewport}
      transition={{ staggerChildren: step, delayChildren: delay }}
    >
      {children}
    </M>
  );
}

export function RevealItem({
  children,
  className,
  direction = 'up',
  as = 'div',
  style,
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  as?: 'div' | 'li' | 'span';
  style?: CSSProperties;
}) {
  const reduced = useReducedMotion();
  const d = offset[direction];
  const M = motion[as] as typeof motion.div;

  return (
    <M
      className={className}
      style={style}
      variants={{
        hidden: reduced ? { opacity: 0 } : { opacity: 0, x: d.x, y: d.y },
        shown: reduced ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 },
      }}
      transition={{ ...enter, duration: reduced ? duration.fast : enter.duration }}
    >
      {children}
    </M>
  );
}

/* ---------- parallax ---------- */

export function Parallax({
  children,
  className,
  /** deslocamento total em px, do topo ao fim da passagem pela tela */
  strength = 40,
  style,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  /* a mola tira o degrau da rolagem sem atrasar a ponto de parecer solta */
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.4 });
  const y = useTransform(smooth, [0, 1], [strength, -strength]);

  return (
    <div ref={ref} className={className} style={style}>
      <motion.div style={reduced ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}

/* ---------- traço que se desenha com a rolagem ----------
   Usado na linha do tempo. `scaleY` num elemento de 1px é barato e
   composita na GPU. */

export function ScrollLine({
  className,
  targetRef,
}: {
  className?: string;
  targetRef: React.RefObject<HTMLElement | null>;
}) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ['start 70%', 'end 60%'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <span aria-hidden="true" className={cn('block origin-top', className)} style={{ background: 'var(--line)' }}>
      <motion.span
        className="block h-full w-full origin-top"
        style={{ background: 'var(--accent)', scaleY: reduced ? 1 : smooth }}
      />
    </span>
  );
}

/* ---------- barra de progresso da página ---------- */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.3 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[75] h-[2px] w-full origin-left"
      style={{ scaleX: width, background: 'var(--accent)' }}
    />
  );
}

/* -------------------------------------------------------------------------
   TÍTULO QUE SOBE LINHA POR LINHA

   A entrada assinatura do site. Cada linha do display sobe de trás de uma
   máscara, com 80ms entre uma e outra — é o gesto que dá o tempo de cinema
   ao título em vez de fazê-lo aparecer inteiro.

   Recebe um array de linhas, e não uma string: nesta tipografia a quebra é
   composição, não acidente de largura. "I BUILD / DIGITAL / EXPERIENCES."
   quebra ali porque o bloco tem de virar retângulo, e deixar o navegador
   decidir isso daria três formas diferentes em três telas.

   A máscara precisa de folga no topo: com line-height abaixo de 1, o
   overflow corta a parte de cima das maiúsculas.
   ------------------------------------------------------------------------- */

export function Lines({
  lines,
  className,
  as: Tag = 'h2',
  delay = 0,
  /** anima assim que monta, em vez de esperar entrar na tela — para o hero */
  immediate = false,
}: {
  lines: string[];
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
  delay?: number;
  immediate?: boolean;
}) {
  const reduced = useReducedMotion();
  const M = motion[Tag] as typeof motion.h2;

  if (reduced) {
    return (
      <M
        className={className}
        initial={{ opacity: 0 }}
        {...(immediate ? { animate: { opacity: 1 } } : { whileInView: { opacity: 1 }, viewport })}
        transition={{ duration: duration.fast, delay }}
      >
        {lines.map((l, i) => (
          <span key={`${l}-${i}`} className="block">
            {l}
          </span>
        ))}
      </M>
    );
  }

  return (
    <M
      className={className}
      initial="hidden"
      {...(immediate ? { animate: 'shown' } : { whileInView: 'shown', viewport })}
      transition={{ staggerChildren: 0.08, delayChildren: delay }}
    >
      {lines.map((l, i) => (
        <span key={`${l}-${i}`} className="block overflow-hidden pt-[0.12em] [margin-top:-0.12em]">
          <motion.span
            className="block"
            variants={{ hidden: { y: '106%' }, shown: { y: '0%' } }}
            transition={{ duration: 1, ease: easeStandard }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </M>
  );
}

/* -------------------------------------------------------------------------
   CONTADOR

   O número conta de zero até o valor quando a estatística entra na tela.

   `animate()` do Framer escreve direto no nó via callback — não passa por
   setState, então não são 60 renders do React por segundo por contador.
   Em prefers-reduced-motion o valor final aparece direto: contar é
   literalmente movimento, e desacelerar não resolveria.
   ------------------------------------------------------------------------- */

export function Counter({
  to,
  className,
  /** o que vem colado no número: `+`, `%`, `k` */
  suffix = '',
  /** zeros à esquerda: 2 transforma 5 em "05" */
  pad = 0,
}: {
  to: number;
  className?: string;
  suffix?: string;
  pad?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  /* `once` importa aqui por dois motivos: o número não deve recontar toda
     vez que a estatística reentra na tela, e é ele que garante que o efeito
     abaixo rode uma vez só — sem precisar de um estado de "já contei", que
     é justamente o que quebrava a contagem antes: guardar `pronto` no
     estado e ainda mantê-lo nas dependências fazia o efeito reexecutar no
     mesmo instante, e a limpeza parava a animação no primeiro quadro. */
  const dentro = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();

  const formata = (v: number) => String(Math.round(v)).padStart(pad, '0');

  /* O HTML do servidor já traz o valor final — é o que mantém a estatística
     legível sem JS. Assim que o JS assume, o número volta pra zero, senão a
     contagem começaria depois de a pessoa já ter lido o resultado. */
  useEffect(() => {
    const alvo = ref.current;
    if (!alvo || reduced) return;
    alvo.textContent = formata(0) + suffix;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!dentro) return;

    const alvo = ref.current;
    if (!alvo) return;

    if (reduced) {
      alvo.textContent = formata(to) + suffix;
      return;
    }

    const controle = animate(0, to, {
      duration: 1.6,
      ease: easeStandard,
      onUpdate: (v) => {
        alvo.textContent = formata(v) + suffix;
      },
    });
    return () => controle.stop();
    /* formata depende só de props estáveis; incluí-la faria o efeito
       reiniciar a contagem a cada render */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dentro, to, suffix, reduced]);

  return (
    <span ref={ref} className={className}>
      {/* o valor final já no HTML: sem JS a estatística continua legível,
          e leitor de tela nunca lê a contagem correndo */}
      {formata(to)}
      {suffix}
    </span>
  );
}
