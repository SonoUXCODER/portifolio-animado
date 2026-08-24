'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/* -------------------------------------------------------------------------
   A MARCA SE MONTANDO.

   `sono®` chega embaralhado e assenta letra por letra, da esquerda pra
   direita, em cerca de meio segundo. É a primeira coisa que se mexe na
   página, e ela existe pra uma coisa só: dizer, antes de qualquer texto ser
   lido, que este site foi construído e não montado.

   >>> POR QUE ISTO NÃO INCOMODA <<<
   Efeito de embaralhar texto costuma ser insuportável, e sempre pelo mesmo
   motivo: é aplicado em texto que a pessoa está tentando ler. Aqui é numa
   marca de cinco caracteres, que ninguém lê — reconhece. E acontece uma vez
   por aba, não a cada vez que entra na tela.

   >>> A LARGURA NÃO PODE DANÇAR <<<
   O alfabeto de sorteio é só de caracteres estreitos e de largura parecida.
   Com letras largas no meio, a marca muda de tamanho a cada quadro e
   empurra a navegação inteira de lado. É o detalhe que separa isto de
   parecer defeito.

   Cada letra assenta e não volta a mudar: o embaralhado só vale à frente da
   posição já resolvida. Sem isso, o olho não percebe progresso nenhum e o
   efeito parece só ruído.
   ------------------------------------------------------------------------- */

const ALFABETO = '#$%&*+=<>/\\|[]{}~^';
const CHAVE = 'sono:scrambled';
/** quanto cada caractere leva pra assentar */
const PASSO_MS = 55;

export default function Scramble({ texto, className }: { texto: string; className?: string }) {
  const reduzido = useReducedMotion();
  const [saida, setSaida] = useState(texto);
  const rodou = useRef(false);

  useEffect(() => {
    if (reduzido || rodou.current) return;
    rodou.current = true;

    /* uma vez por aba. Voltar de um estudo de caso não deve remontar a marca
       na cara de quem já viu. */
    try {
      if (sessionStorage.getItem(CHAVE)) return;
      sessionStorage.setItem(CHAVE, '1');
    } catch {
      /* modo anônimo bloqueia sessionStorage; roda e segue */
    }

    let resolvidos = 0;
    let raf = 0;
    let ultimo = 0;

    const desenhar = (agora: number) => {
      if (agora - ultimo > PASSO_MS) {
        ultimo = agora;
        resolvidos += 1;
      }

      if (resolvidos > texto.length) {
        setSaida(texto);
        return;
      }

      const sorteia = () => ALFABETO[Math.floor(Math.random() * ALFABETO.length)];
      setSaida(
        texto
          .split('')
          .map((c, i) => {
            if (i < resolvidos) return c;
            /* espaço continua espaço: embaralhar o vão entre palavras cola
               tudo e a marca vira um bloco */
            return c === ' ' ? c : sorteia();
          })
          .join(''),
      );

      raf = requestAnimationFrame(desenhar);
    };

    raf = requestAnimationFrame(desenhar);
    return () => cancelAnimationFrame(raf);
  }, [texto, reduzido]);

  return (
    <span className={className} style={{ fontFamily: 'var(--font-display)' }}>
      {/* o texto de verdade fica na árvore de acessibilidade; o embaralhado
          é só pintura. Um leitor de tela não deve ouvir "#$%&*". */}
      <span aria-hidden="true">{saida}</span>
      <span className="sr-only">{texto}</span>
    </span>
  );
}
