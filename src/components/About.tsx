'use client';

import Image from 'next/image';
import { site } from '@/data/site';
import { processo } from '@/data/process';
import SectionMark from './SectionMark';
import { Parallax, Reveal, RevealGroup, RevealItem, WordsUp } from './Reveal';

/* -------------------------------------------------------------------------
   SOBRE.

   Composição em duas colunas desiguais: o retrato ancorado à esquerda com
   parallax curto, o texto à direita. Embaixo, o método em seis passos —
   é o que evita a seção "sobre" genérica, porque diz como ele trabalha em
   vez de adjetivos sobre ele.

   Os passos vêm de data/process.ts, que já existia. Não foi reescrito: foi
   reapresentado numa forma que ocupa menos espaço e diz o mesmo.
   ------------------------------------------------------------------------- */

export default function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="shell scroll-mt-[var(--header-h)] py-[var(--space-10)]">
      <SectionMark id="sobre" />

      <div className="grid-12 mt-[var(--space-8)] gap-y-[var(--space-8)]">
        {/* ---- retrato ---- */}
        <div className="col-span-12 sm:col-span-5 lg:col-span-4">
          <Parallax strength={26}>
            <figure className="media aspect-[4/5] w-full max-w-[340px]">
              <Image
                src="/assets/foto-cracha.webp"
                alt={`Retrato de ${site.name}`}
                width={620}
                height={827}
                sizes="(max-width: 640px) 70vw, 340px"
                className="h-full w-full"
              />
            </figure>
          </Parallax>
          <Reveal delay={0.1}>
            <p className="label mt-[var(--space-4)]">{site.handle} · Suíça</p>
          </Reveal>
        </div>

        {/* ---- texto ---- */}
        <div className="col-span-12 sm:col-span-7 lg:col-span-7 lg:col-start-6">
          <WordsUp
            as="h2"
            text="Aprendi as duas metades na mesma época, porque não tinha para quem passar a outra."
            className="display-lg max-w-[20ch]"
          />
          <span id="sobre-titulo" className="sr-only">
            Sobre
          </span>

          <RevealGroup className="mt-[var(--space-6)] flex flex-col gap-[var(--space-4)]" delay={0.15}>
            <RevealItem>
              <p className="body">
                Hoje isso virou vantagem. Decido a interface já sabendo o que ela custa para
                construir, e escrevo o código já sabendo o que ele precisa parecer. Não existe
                handoff, não existe telefone sem fio, e o que foi combinado no começo é o que sai
                no fim.
              </p>
            </RevealItem>
            <RevealItem>
              <p className="body">
                Trabalho da Suíça, em três idiomas, quase sempre sozinho no projeto inteiro — de
                site de cliente pequeno a produto próprio e loja de artista. O que se repete não é
                a stack: é o método.
              </p>
            </RevealItem>
          </RevealGroup>
        </div>
      </div>

      {/* ---- método ---- */}
      <div className="mt-[var(--space-9)]">
        <Reveal>
          <h3 className="label mb-[var(--space-5)]">O método, em seis passos</h3>
        </Reveal>

        <RevealGroup as="ol" className="grid grid-cols-2 gap-x-[var(--space-5)] gap-y-[var(--space-6)] md:grid-cols-3 lg:grid-cols-6">
          {processo.map((etapa) => (
            <RevealItem as="li" key={etapa.n}>
              <div className="border-t pt-[var(--space-3)]" style={{ borderColor: 'var(--border)' }}>
                <span className="figure text-[0.75rem]" style={{ color: 'var(--accent)' }}>
                  {etapa.n}
                </span>
                <h4 className="title-sm mt-[var(--space-2)]">{etapa.titulo}</h4>
                <p className="body-sm mt-[var(--space-2)]">{etapa.texto}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
