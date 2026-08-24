'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { usePonteiroFino } from '@/hooks/useMedia';

/* -------------------------------------------------------------------------
   CARD 3D.

   O mesmo gesto do knifes.me: o cartão nasce torto (`rotateZ` de -3°) e
   inclina em direção ao cursor enquanto ele passa por cima. A base torta é
   o que faz a peça parecer um objeto pousado na página em vez de uma div,
   e é ela que sustenta o efeito mesmo parado — sem cursor nenhum, o cartão
   já está inclinado.

   Três decisões que separam isto de um tilt de biblioteca:

   1. **A inclinação é pequena.** 9° no máximo. Acima de ~12° o cartão deixa
      de parecer que reagiu e passa a parecer que caiu — e uma foto de rosto
      deformada por perspectiva forte fica esquisita, não sofisticada.
   2. **Mola, não transição.** A volta ao repouso passa do ponto e assenta,
      que é como um objeto com massa se comporta. Uma transition linear
      denuncia que é CSS.
   3. **`translateZ` no conteúdo.** A imagem flutua 22px à frente do plano do
      cartão, então ela se desloca um pouco mais que a borda quando o cartão
      gira. É esse descolamento que o olho lê como profundidade real; sem
      ele, o cartão inteiro parece um adesivo girando.

   O brilho que atravessa a superfície acompanha o cursor e é o único
   elemento que não gira junto: ele é a luz da sala, não parte do objeto.

   Nada disso existe no toque (não há hover) nem em prefers-reduced-motion.
   ------------------------------------------------------------------------- */

export default function TiltCard({
  children,
  /** inclinação máxima em graus */
  strength = 9,
  /** rotação de repouso, em graus */
  rest = -3,
  className,
}: {
  children: ReactNode;
  strength?: number;
  rest?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fino = usePonteiroFino();
  const reduzido = useReducedMotion();
  const ativo = fino && !reduzido;

  /* posição do cursor dentro do cartão, de -0.5 a 0.5 */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  /* 0 parado, 1 com o cursor em cima — controla brilho, elevação e o
     endireitar do rotateZ */
  const perto = useMotionValue(0);

  const mola = { stiffness: 180, damping: 18, mass: 0.5 };
  const rotX = useSpring(useTransform(py, [-0.5, 0.5], [strength, -strength]), mola);
  const rotY = useSpring(useTransform(px, [-0.5, 0.5], [-strength, strength]), mola);
  const rotZ = useSpring(useTransform(perto, [0, 1], [rest, 0]), mola);
  const eleva = useSpring(useTransform(perto, [0, 1], [0, -6]), mola);
  const brilho = useSpring(perto, { stiffness: 120, damping: 20 });

  /* O brilho segue o cursor. O gradiente inteiro é montado num motion value
     só, aqui em cima: montá-lo dentro do JSX condicional colocaria um hook
     atrás de um `if`, que é exatamente o que as regras de hooks proíbem. */
  const luz = useTransform([px, py], ([x, y]: number[]) => {
    const cx = ((x ?? 0) + 0.5) * 100;
    const cy = ((y ?? 0) + 0.5) * 100;
    return `radial-gradient(circle 40% at ${cx}% ${cy}%, rgba(242,240,235,0.16), transparent 70%)`;
  });

  const mover = (e: React.PointerEvent) => {
    if (!ativo) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
    perto.set(1);
  };

  const sair = () => {
    px.set(0);
    py.set(0);
    perto.set(0);
  };

  return (
    /* a perspectiva mora no pai: se estivesse no próprio cartão, o ponto de
       fuga andaria junto com ele e a rotação ficaria chapada */
    <div
      ref={ref}
      className={className}
      style={{ perspective: 1000 }}
      onPointerMove={mover}
      onPointerLeave={sair}
    >
      <motion.div
        className="relative"
        style={
          ativo
            ? {
                rotateX: rotX,
                rotateY: rotY,
                rotateZ: rotZ,
                y: eleva,
                transformStyle: 'preserve-3d',
              }
            : { rotate: rest }
        }
      >
        {/* a borda fina pedida: fica no plano do cartão, atrás do conteúdo
            que flutua, então ela é a "moldura" que revela a espessura */}
        <div
          className="relative"
          style={{
            border: '1px solid var(--line-strong)',
            background: 'var(--surface)',
            padding: 6,
          }}
        >
          <motion.div style={ativo ? { translateZ: 22, transformStyle: 'preserve-3d' } : undefined}>
            {children}
          </motion.div>

          {/* o brilho: um clarão suave que segue o cursor. `screen` pra ele
              clarear sem lavar a cor da foto. */}
          {ativo && (
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{ opacity: brilho, mixBlendMode: 'screen', backgroundImage: luz }}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}
