'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { site } from '@/data/site';
import { Asterisco, Rabisco, Seta, Traquinhos } from './Doodles';
import { Parallax } from './ScrollReveal';

/* -------------------------------------------------------------------------
   Abertura.
   Composição torta de propósito: o título ocupa a esquerda e estoura a
   margem, a foto entra alta e pequena na direita, e o texto curto fica
   embaixo, deslocado. Nada centralizado.
   ------------------------------------------------------------------------- */

const linhas = ['EU FAÇO', 'COISAS', 'PRA'];

export default function Hero() {
  const reduzido = useReducedMotion();

  const sobe = (i: number) => ({
    initial: reduzido ? { opacity: 0 } : { y: '110%', rotate: 2 },
    animate: reduzido ? { opacity: 1 } : { y: '0%', rotate: 0 },
    transition: { duration: 0.9, delay: 0.12 + i * 0.09, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <header className="relative overflow-hidden pb-6 pt-[104px] lg:pb-10 lg:pt-[132px]">
      {/* palavra fantasma no fundo, quase apagada */}
      <span
        aria-hidden="true"
        className="zine-titulo vazado pointer-events-none absolute right-[clamp(16px,4vw,64px)] top-[48%] hidden select-none text-[15vw] leading-none lg:block"
      >
        ZINE
      </span>

      <div className="envelope relative">
        <div className="grid grid-cols-12 items-start gap-y-6">
          {/* ------- coluna do título ------- */}
          <div className="col-span-12 lg:col-span-8">
            <motion.p
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05, duration: 0.5 }}
              className="zine-sub mb-4 flex flex-wrap items-center gap-3"
            >
              <span className="inline-block h-2 w-2 rounded-full" style={{ background: 'var(--accent)' }} />
              DISPONÍVEL PRA PROJETO NOVO
              <span className="opacity-40">/</span>
              <span style={{ color: 'var(--text-2)' }}>SUÍÇA · 2026</span>
            </motion.p>

            <h1 className="zine-titulo relative -ml-[0.06em]">
              {linhas.map((linha, i) => (
                <span key={linha} className="block overflow-hidden">
                  <motion.span className="block" {...sobe(i)}>
                    {linha}
                  </motion.span>
                </span>
              ))}
              {/* a última palavra sai da linha e vira desenho */}
              <span className="block overflow-visible">
                <motion.span
                  className="relative inline-block"
                  {...sobe(3)}
                  style={{ color: 'var(--accent)' }}
                >
                  INTERNET
                  <motion.span
                    aria-hidden="true"
                    className="absolute -bottom-[0.06em] left-0 h-[6px] w-full origin-left"
                    style={{ background: 'var(--accent-2)' }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.95, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                </motion.span>
              </span>
            </h1>
          </div>

          {/* ------- coluna da foto ------- */}
          <div className="relative col-span-12 lg:col-span-4 lg:-mt-6">
            <Parallax forca={reduzido ? 0 : 34} rotacao={reduzido ? 0 : 1.6} className="relative mx-auto w-[min(230px,58vw)] lg:ml-auto lg:mr-0">
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: -6 }}
                animate={{ opacity: 1, y: 0, rotate: -3.4 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
                data-cursor="olhar"
              >
                <span className="fita -left-4 -top-3 rotate-[-8deg]" />
                <span className="fita -bottom-3 -right-4 rotate-[6deg]" />
                <div className="border-[1.5px] border-[var(--border-forte)] bg-[var(--surface)] p-2 shadow-[7px_7px_0_var(--surface-2)]">
                  <Image
                    src="/assets/foto-cracha.webp"
                    alt={`Retrato de ${site.name}`}
                    width={620}
                    height={827}
                    priority
                    sizes="(max-width: 1024px) 58vw, 230px"
                    className="w-full grayscale contrast-[1.35]"
                  />
                  <p className="mono mt-2 flex items-center justify-between text-[9px] tracking-[0.18em]">
                    <span>{site.handle}</span>
                    <span style={{ color: 'var(--accent)' }}>ID·01</span>
                  </p>
                </div>
              </motion.div>
            </Parallax>

            <Traquinhos className="absolute -left-2 top-2 hidden lg:block" cor="var(--accent)" />
          </div>
        </div>

        {/* ------- rodapé da abertura: texto curto + setas ------- */}
        <div className="relative mt-8 grid grid-cols-12 items-end gap-y-8 lg:mt-4">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="col-span-12 sm:col-span-8 lg:col-span-4 lg:col-start-2"
          >
            <p className="corpo text-[clamp(1rem,1.5vw,1.18rem)]">
              Sou o {site.name}. Desenho a interface e escrevo o código dela.
              <span className="sublinha"> Sem template, sem tema pronto.</span>
            </p>
            <p className="hand mt-3 flex items-center gap-2 text-[26px]" style={{ color: 'var(--accent-2)' }}>
              <Asterisco cor="var(--accent-2)" tamanho={18} />
              do figma até o deploy
            </p>
          </motion.div>

          <div className="col-span-12 hidden lg:col-span-3 lg:block">
            <Seta className="translate-y-2 rotate-[8deg] opacity-70" cor="var(--text)" largura={190} />
          </div>

          <motion.a
            href="#projetos"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="col-span-12 flex items-center gap-3 lg:col-span-4 lg:justify-end"
            data-cursor="ver"
          >
            <span className="zine-sub">ROLA PRA VER O QUE EU FIZ</span>
            <motion.span
              aria-hidden="true"
              className="inline-block text-2xl leading-none"
              animate={reduzido ? undefined : { y: [0, 7, 0] }}
              transition={{ repeat: Infinity, duration: 1.9, ease: 'easeInOut' }}
            >
              ↓
            </motion.span>
          </motion.a>
        </div>

        <Rabisco className="pointer-events-none absolute -bottom-2 right-[18%] hidden opacity-45 lg:block" cor="var(--accent-2)" largura={150} />
      </div>
    </header>
  );
}
