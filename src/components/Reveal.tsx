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
  type MotionValue,
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

   >>> A VARIANTE DE CINEMA <<<
   `cinema` troca a máscara por outra coisa: palavra por palavra, saindo de
   desfocado e passando do ponto antes de assentar. É reservada ao hero, e
   a razão de não ser o padrão é a mesma que faz ela funcionar lá — só vale
   quando a pessoa acabou de chegar e ainda não está lendo nada. Repetida
   em seis títulos ao longo da página viraria maneirismo.

   Duas diferenças técnicas em relação ao padrão:

   1. **Não há máscara.** Uma mola que passa do ponto sobe além da posição
      final, e sob `overflow: hidden` isso corta o topo das letras no
      instante mais visível da animação. Quem esconde o estado inicial aqui
      é o desfoque com a opacidade, não um recorte.
   2. **O desfoque é caro e é uma vez só.** Animar `filter` obriga o
      navegador a rasterizar o texto a cada quadro, e são seis palavras em
      208px. Custa porque roda uma vez, na entrada, por baixo da cortina de
      carregamento. Não use em nada que a rolagem dispare.
   ------------------------------------------------------------------------- */

export function Lines({
  lines,
  className,
  as: Tag = 'h2',
  delay = 0,
  /** anima assim que monta, em vez de esperar entrar na tela — para o hero */
  immediate = false,
  id,
  cinema = false,
}: {
  lines: string[];
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
  delay?: number;
  immediate?: boolean;
  /** pra quando uma seção precisa apontar o aria-labelledby pra este título */
  id?: string;
  /** entrada palavra a palavra, de desfocado, com mola que passa do ponto */
  cinema?: boolean;
}) {
  const reduced = useReducedMotion();
  const M = motion[Tag] as typeof motion.h2;

  if (reduced) {
    return (
      <M
        id={id}
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

  if (cinema) {
    return (
      <M
        id={id}
        className={className}
        initial="hidden"
        {...(immediate ? { animate: 'shown' } : { whileInView: 'shown', viewport })}
        transition={{ staggerChildren: 0.075, delayChildren: delay }}
      >
        {lines.map((l, i) => (
          <span key={`${l}-${i}`} className="block">
            {l.split(' ').map((palavra, j) => (
              <motion.span
                key={`${palavra}-${j}`}
                className="inline-block"
                variants={{
                  hidden: { opacity: 0, y: '0.34em', filter: 'blur(16px)' },
                  shown: { opacity: 1, y: '0em', filter: 'blur(0px)' },
                }}
                /* damping baixo é o que produz o passar do ponto. Abaixo de
                   ~11 a letra balança duas vezes e vira desenho animado. */
                transition={{ type: 'spring', stiffness: 120, damping: 13, mass: 0.9 }}
              >
                {palavra}
                {j < l.split(' ').length - 1 ? '\u00A0' : ''}
              </motion.span>
            ))}
          </span>
        ))}
      </M>
    );
  }

  return (
    <M
      id={id}
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

    /* Mola, não curva de tempo.

       Uma curva sabe onde termina e chega lá educadamente. Uma mola tem
       massa: acelera, passa do valor, volta e assenta. Num contador isso é
       visível de um jeito que uma curva nunca é — o número sobe rápido
       demais, mostra um valor maior que o final por um instante, e recua.

       `damping: 14` é onde o passar do ponto aparece em um algarismo sem
       virar gangorra. Abaixo de 12 o número oscila duas vezes e a pessoa
       repara no efeito em vez de no dado.

       O desfoque acompanha a velocidade, não o tempo: quanto mais rápido o
       número muda, mais borrado ele fica, e ele entra em foco exatamente
       quando para. É o mesmo princípio de motion blur de câmera, e é o que
       dá peso ao movimento. Só o nó do número é desfocado, que é um
       elemento minúsculo — barato. */
    let anterior = 0;
    const controle = animate(0, to, {
      type: 'spring',
      stiffness: 55,
      damping: 14,
      mass: 1.1,
      restDelta: 0.4,
      onUpdate: (v) => {
        alvo.textContent = formata(v) + suffix;
        const velocidade = Math.abs(v - anterior);
        anterior = v;
        const desfoque = Math.min(5, velocidade * 0.34);
        alvo.style.filter = desfoque > 0.35 ? `blur(${desfoque.toFixed(2)}px)` : 'none';
      },
      onComplete: () => {
        alvo.style.filter = 'none';
        alvo.textContent = formata(to) + suffix;
      },
    });
    return () => {
      controle.stop();
      alvo.style.filter = 'none';
    };
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

/* -------------------------------------------------------------------------
   TEXTO QUE ACENDE

   O parágrafo entra apagado e cada palavra acende conforme a rolagem passa
   por ele. Não é um fade no bloco inteiro: é palavra por palavra, da
   esquerda pra direita, no ritmo do dedo de quem lê.

   O efeito existe porque estes parágrafos têm um problema real: eles ficam
   ao lado de um título em tipografia de display, e ao lado dele nenhum
   texto de 17px consegue ser visto. Acender palavra a palavra dá ao
   parágrafo o único tipo de atenção que ele pode disputar, que é o tempo.

   >>> A JANELA <<<
   `['start 0.85', 'start 0.35']` significa: começa quando o topo do bloco
   chega a 85% da altura da tela, termina quando ele sobe até 35%. Metade da
   tela de curso. Mais que isso e a última palavra só acende quando o
   parágrafo já está saindo por cima; menos, e tudo acende de uma vez e o
   efeito vira um piscar.

   >>> A COR É FIXA, A OPACIDADE É QUE ANDA <<<
   Interpolar `color` obriga o navegador a repintar o texto a cada quadro, e
   repintar texto é das coisas mais caras que existem. Então a cor é
   escrita uma vez em `--text-primary` e quem varia é a opacidade, que
   composita. Detalhes de amplitude e do halo estão em <Palavra/>.
   ------------------------------------------------------------------------- */

function Palavra({
  children,
  progresso,
  faixa,
}: {
  children: string;
  progresso: MotionValue<number>;
  faixa: [number, number];
}) {
  const meio = (faixa[0] + faixa[1]) / 2;

  /* -----------------------------------------------------------------------
     O BRILHO ERA FRACO POR DOIS MOTIVOS, E SÓ UM ERA A OPACIDADE.

     O outro é que a palavra "acesa" terminava em `--text-secondary`, o cinza
     de corpo de texto, porque é o que a classe `.body` define. Ou seja: o
     trabalho todo de acender levava de um cinza apagado até um cinza. A cor
     agora é fixada em `--text-primary` e quem varia é só a opacidade, então
     a mesma animação passa a percorrer de quase invisível até o bone cheio.
     Continua sendo uma propriedade animada por palavra, e a amplitude
     triplicou.

     Em cima disso entra o clarão: um halo em acento que sobe e desce dentro
     da janela de cada palavra, com o pico no meio da passagem. É ele que dá
     a sensação de a palavra estar sendo acesa em vez de revelada.

     O halo é a única coisa cara aqui — `text-shadow` repinta o texto — e por
     isso ele começa e termina em zero: fora da janela de transição a
     propriedade é `none` e não custa nada. A qualquer momento só um punhado
     de palavras está no meio da faixa.
     ----------------------------------------------------------------------- */
  const opacity = useTransform(progresso, faixa, [0.08, 1]);
  const halo = useTransform(
    progresso,
    [faixa[0], meio, faixa[1]],
    [
      '0 0 0px rgba(226,103,63,0)',
      '0 0 24px rgba(226,103,63,0.85)',
      '0 0 0px rgba(226,103,63,0)',
    ],
  );

  return (
    <motion.span
      style={{ opacity, textShadow: halo, color: 'var(--text-primary)' }}
      className="inline-block whitespace-pre"
    >
      {children}
    </motion.span>
  );
}

export function Acende({
  texto,
  className,
  as: Tag = 'p',
}: {
  texto: string;
  className?: string;
  as?: 'p' | 'div';
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduzido = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'start 0.35'] });

  const palavras = texto.split(' ');
  const M = motion[Tag] as typeof motion.p;

  /* com movimento reduzido o parágrafo é só um parágrafo. Acender palavra a
     palavra é movimento contínuo ligado à rolagem, que é exatamente o que
     quem liga essa preferência está pedindo pra não ver. */
  if (reduzido) {
    return <Tag className={className}>{texto}</Tag>;
  }

  return (
    <M ref={ref} className={className}>
      {palavras.map((p, i) => (
        <Palavra
          key={`${p}-${i}`}
          progresso={scrollYProgress}
          /* cada palavra acende num pedaço da janela, e as faixas se
             sobrepõem de propósito: sem a sobreposição a onda vira uma
             sequência de piscadas em vez de um varrer */
          faixa={[i / palavras.length, (i + 1.6) / palavras.length]}
        >
          {i < palavras.length - 1 ? `${p} ` : p}
        </Palavra>
      ))}
    </M>
  );
}
