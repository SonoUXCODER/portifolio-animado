'use client';

import { useRef, type CSSProperties, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionStyle } from 'framer-motion';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------
   As peças de rolagem do site. Todas checam prefers-reduced-motion e, quando
   ele está ligado, entregam no máximo um fade curto — nada de deslocamento,
   nada de rotação, nada de parallax.
   ------------------------------------------------------------------------- */

type Direcao = 'baixo' | 'cima' | 'esquerda' | 'direita';

const deslocamento: Record<Direcao, { x: number; y: number }> = {
  baixo: { x: 0, y: 56 },
  cima: { x: 0, y: -56 },
  esquerda: { x: -90, y: 0 },
  direita: { x: 90, y: 0 },
};

export function ScrollReveal({
  children,
  className,
  direcao = 'baixo',
  atraso = 0,
  giro = 0,
  duracao = 0.72,
  once = true,
  style,
}: {
  children: ReactNode;
  className?: string;
  direcao?: Direcao;
  atraso?: number;
  /** rotação inicial, em graus — o elemento endireita ao entrar */
  giro?: number;
  duracao?: number;
  once?: boolean;
  style?: CSSProperties;
}) {
  const reduzido = useReducedMotion();
  const d = deslocamento[direcao];

  return (
    <motion.div
      className={className}
      style={style}
      initial={reduzido ? { opacity: 0 } : { opacity: 0, x: d.x, y: d.y, rotate: giro }}
      whileInView={reduzido ? { opacity: 1 } : { opacity: 1, x: 0, y: 0, rotate: 0 }}
      viewport={{ once, amount: 0.18, margin: '0px 0px -8% 0px' }}
      transition={{ duration: reduzido ? 0.25 : duracao, delay: atraso, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- texto que sobe palavra por palavra ---------- */

export function TextReveal({
  texto,
  className,
  atraso = 0,
  passo = 0.045,
  as: Tag = 'p',
}: {
  texto: string;
  className?: string;
  atraso?: number;
  passo?: number;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'span' | 'div';
}) {
  const reduzido = useReducedMotion();
  const palavras = texto.split(' ');
  const Motion = motion[Tag] as typeof motion.p;

  if (reduzido) {
    return (
      <Motion
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.25 }}
      >
        {texto}
      </Motion>
    );
  }

  return (
    <Motion
      className={className}
      initial="oculto"
      whileInView="visivel"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ staggerChildren: passo, delayChildren: atraso }}
    >
      {palavras.map((palavra, i) => (
        /* a máscara é o span de fora: a palavra sobe de dentro dele */
        <span key={`${palavra}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              oculto: { y: '108%', rotate: 4 },
              visivel: { y: '0%', rotate: 0 },
            }}
            transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          >
            {palavra}
            {i < palavras.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Motion>
  );
}

/* ---------- parallax ---------- */

export function Parallax({
  children,
  className,
  /** quanto o elemento anda, em px, do começo ao fim da tela */
  forca = 90,
  rotacao = 0,
  style,
}: {
  children: ReactNode;
  className?: string;
  forca?: number;
  rotacao?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduzido = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const suave = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.4 });
  const y = useTransform(suave, [0, 1], [forca, -forca]);
  const rotate = useTransform(suave, [0, 1], [rotacao, -rotacao]);

  return (
    <div ref={ref} className={className} style={style}>
      <motion.div style={reduzido ? undefined : ({ y, rotate } as MotionStyle)}>{children}</motion.div>
    </div>
  );
}

/* ---------- escala + opacidade conforme a rolagem ---------- */

export function ScaleOnScroll({
  children,
  className,
  de = 0.86,
  para = 1,
}: {
  children: ReactNode;
  className?: string;
  de?: number;
  para?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduzido = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 92%', 'end 55%'] });
  const scale = useTransform(scrollYProgress, [0, 1], [de, para]);
  const opacity = useTransform(scrollYProgress, [0, 0.45], [0.25, 1]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduzido ? undefined : ({ scale, opacity, transformOrigin: 'center bottom' } as MotionStyle)}>
        {children}
      </motion.div>
    </div>
  );
}

/* ---------- imagem que aparece por baixo de uma máscara ---------- */

/**
 * Cuidado ao mexer aqui: a versão óbvia disto é animar `clip-path` no próprio
 * elemento observado. Não funciona. O IntersectionObserver leva o recorte em
 * conta, então um elemento que se esconde com clip-path aparece como
 * intersectionRatio 0 — ele nunca "entra na tela", a animação nunca dispara e
 * a imagem fica invisível pra sempre.
 *
 * A saída é separar os papéis: quem é observado é a moldura (que nunca se
 * esconde) e quem se move é o filho, com transform dentro do overflow-hidden.
 * De quebra, transform roda no compositor e clip-path não.
 */
export function MaskReveal({
  children,
  className,
  atraso = 0,
  direcao = 'baixo',
}: {
  children: ReactNode;
  className?: string;
  atraso?: number;
  direcao?: 'baixo' | 'esquerda';
}) {
  const reduzido = useReducedMotion();
  const fechado = direcao === 'baixo' ? { y: '101%' } : { x: '-101%' };

  return (
    <motion.div
      className={cn('overflow-hidden', className)}
      initial="oculto"
      whileInView="visivel"
      viewport={{ once: true, amount: 0.15 }}
    >
      <motion.div
        variants={{
          oculto: reduzido ? { opacity: 0 } : fechado,
          visivel: reduzido ? { opacity: 1 } : { x: '0%', y: '0%' },
        }}
        transition={{ duration: reduzido ? 0.25 : 0.9, delay: atraso, ease: [0.76, 0, 0.24, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ---------- barrinha de progresso da página ---------- */

export function BarraDeProgresso() {
  const { scrollYProgress } = useScroll();
  const largura = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.3 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[70] h-[3px] w-full origin-left"
      style={{ scaleX: largura, background: 'var(--accent)' }}
    />
  );
}
