'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { identity } from '@/content';
import { useT } from './ContentProvider';
import { basePath } from '@/lib/base';
import { duration, easeStandard, enter } from '@/lib/motion';
import { Lines } from './Reveal';
import { useMedia, usePonteiroFino } from '@/hooks/useMedia';

/* -------------------------------------------------------------------------
   HERO.

   Uma tela, quatro respostas: o que a pessoa faz, como ela trabalha, onde
   está, e se dá pra contratar agora. Nada mais entra — o hero é a única
   parte da página em que cada elemento a mais custa impacto, porque o
   impacto aqui *é* o vazio ao redor do título.

   >>> NÃO HÁ BOTÃO AQUI, E ISSO É A DECISÃO <<<
   Havia dois: "ver o trabalho" e "começar uma conversa". Os dois saíram.
   Um botão no hero é um atalho, e atalho é o contrário do que esta página
   é: ela foi feita pra ser atravessada, e quem pula direto pro contato
   chega lá sem ter visto nada que justifique escrever. O convite agora é
   rolar, e a única coisa que pede ação na primeira tela é a seta.

   Os pontos de contato continuam existindo, três deles, mas depois de o
   trabalho ter sido mostrado. Ver <InlineCta/>.

   A composição é de duas faixas: a declaração ocupando quase a largura
   inteira, e a régua técnica embaixo. Havia uma terceira no topo, com
   disponibilidade e coordenada; ela saiu porque repetia o que a navegação
   e o contato já dizem, e porque o vazio acima do título é metade do
   impacto dele.

   Movimento, em ordem de entrada:
     1. as três linhas do título sobem de trás da máscara, 80ms entre si;
     2. o parágrafo e o CTA assentam depois;
     3. a régua de baixo aparece por último.
   Nada disso espera rolagem: é a primeira tela, e ela tem de estar inteira
   antes de a pessoa tocar no mouse.

   O único movimento ligado ao cursor é um deslocamento de 10px no bloco de
   texto — acima disso o hero vira brinquedo e o conteúdo vira desculpa. Só
   existe em ponteiro fino, porque no dedo não há cursor pra reagir.
   ------------------------------------------------------------------------- */

function useHoraLocal() {
  /* null no servidor e no primeiro render: a hora não pode divergir entre
     servidor e cliente, senão a hidratação reclama */
  const [hora, setHora] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: identity.timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const tick = () => setHora(fmt.format(new Date()));
    tick();
    /* de meio em meio minuto: um timer por segundo não mudaria nada na tela */
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return hora;
}

export default function Hero() {
  const t = useT();
  const reduzido = useReducedMotion();
  const fino = usePonteiroFino();
  const largo = useMedia('(min-width: 768px)');
  const hora = useHoraLocal();
  const ref = useRef<HTMLElement>(null);

  /* O vídeo é textura, não conteúdo: entra a 12% de opacidade, já em cinza,
     atrás da grade. Ele não é baixado em tela estreita nem com movimento
     reduzido — e como `useMedia` só responde no cliente, ele nunca sai no
     HTML do servidor, o que mantém o LCP sendo o título. */
  const comVideo = largo && !reduzido;

  /* o cursor move o bloco de texto por motion values — nada de setState a
     60fps, então o React não re-renderiza durante o movimento */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const mola = { stiffness: 80, damping: 20, mass: 0.6 };
  const x = useSpring(useTransform(px, [-0.5, 0.5], [10, -10]), mola);
  const y = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), mola);

  /* a grade técnica desce mais devagar que o conteúdo enquanto o hero sai
     de cena: é o que dá profundidade sem colocar imagem nenhuma no fundo */
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const fundoY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const fundoOpacidade = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  useEffect(() => {
    if (!fino || reduzido) return;
    const el = ref.current;
    if (!el) return;
    const mover = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      px.set((e.clientX - r.left) / r.width - 0.5);
      py.set((e.clientY - r.top) / r.height - 0.5);
    };
    el.addEventListener('pointermove', mover, { passive: true });
    return () => el.removeEventListener('pointermove', mover);
  }, [fino, reduzido, px, py]);

  return (
    <section
      ref={ref}
      id="hero"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pb-[var(--space-7)] pt-[calc(var(--header-h)+var(--space-7))]"
    >
      {/* ---- fundo ----
           Uma camada só: o vídeo, em cinza e a 14%. Nessa opacidade ninguém
           lê "pessoa digitando num laptop", que seria a imagem de banco mais
           batida que existe. O que fica é luz que se move.

           Havia uma grade técnica de 1px por cima. Saiu: com o vídeo atrás,
           as duas texturas disputavam a mesma área e o hero ficava ocupado
           justamente onde ele precisa de vazio. Sem a grade o vídeo pode
           subir de opacidade e virar o único evento do fundo.

           Ele desliza mais devagar que o conteúdo enquanto o hero sai de
           cena, e é isso que dá profundidade sem imagem em primeiro plano. */}
      {comVideo && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={reduzido ? undefined : { y: fundoY, opacity: fundoOpacidade }}
        >
          <video
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              opacity: 0.14,
              maskImage: 'radial-gradient(ellipse 80% 70% at 55% 45%, #000 15%, transparent 78%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 80% 70% at 55% 45%, #000 15%, transparent 78%)',
            }}
            src={`${basePath}/video/hero.mp4`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            /* `data-pause` não serve pra <video>: quem congela o loop fora
               da tela é o próprio navegador, que pausa mídia invisível. */
          />
        </motion.div>
      )}

      {/* ================= a declaração ================= */}
      <div className="shell relative w-full py-[var(--space-8)]">
        <motion.div style={fino && !reduzido ? { x, y } : undefined}>
          {/* O título visível é o h1. Ele já foi um <p>, com um h1 em
              sr-only por cima: dava a hierarquia certa pro leitor de tela e
              a errada pra todo o resto, porque a manchete de 13rem não
              contava como cabeçalho. */}
          {/* A quebra é composição, não acidente de largura: as três linhas
              formam um retângulo, e é o retângulo que se compõe contra a
              grade. Deixar o navegador quebrar daria três formas diferentes
              em três telas. */}
          <Lines
            id="hero-title"
            lines={t.hero.lines}
            as="h1"
            className="display-hero"
            immediate
            delay={0.25}
          />
        </motion.div>

        <div className="grid-12 mt-[var(--space-8)] gap-y-[var(--space-6)]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...enter, delay: 0.75 }}
            className="col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-7"
          >
            <p className="lead">{t.hero.lead}</p>

            {/* a prova mais forte do site estava atrás de um botão na tela
                oito: os cinco projetos abrem rodando aqui dentro */}
            <p className="body-sm mt-[var(--space-4)] flex gap-[var(--space-3)]">
              <span aria-hidden="true" style={{ color: 'var(--accent)' }}>
                ↳
              </span>
              {t.hero.proof}
            </p>

          </motion.div>
        </div>
      </div>

      {/* ================= a régua técnica ================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: duration.slow, delay: 0.95 }}
        className="shell relative w-full"
      >
        <dl
          className="grid grid-cols-2 gap-x-[var(--space-5)] gap-y-[var(--space-5)] border-t pt-[var(--space-4)] sm:grid-cols-4"
          style={{ borderColor: 'var(--line)' }}
        >
          {[
            [t.hero.productsLabel, String(identity.shipped)],
            [t.hero.basedIn, `${identity.city}, ${t.meta.country}`],
            [t.hero.languages, t.hero.languagesValue],
            [t.hero.localTime, hora ?? '--:--'],
          ].map(([rotulo, valor]) => (
            <div key={rotulo}>
              <dt className="label label--dim">{rotulo}</dt>
              <dd className="mt-[var(--space-2)] text-[clamp(0.9rem,1.1vw,1.05rem)]">{valor}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-[var(--space-5)] flex items-baseline justify-between gap-[var(--space-4)]">
          <span className="label label--dim">{t.hero.scroll}</span>
          <motion.span
            aria-hidden="true"
            className="label"
            animate={reduzido ? undefined : { y: [0, 5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: easeStandard }}
          >
            ↓
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}
