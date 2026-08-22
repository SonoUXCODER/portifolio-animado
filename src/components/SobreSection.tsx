'use client';

import Pagina from './Pagina';
import { Parallax, ScrollReveal, TextReveal } from './ScrollReveal';
import { Asterisco, Circulo, Doodle } from './Doodles';

/* -------------------------------------------------------------------------
   CADERNO 01 — QUEM ASSINA.

   A abertura do arquivo. Três parágrafos curtos e uma margem com anotação,
   como página de abertura de revista: o texto no meio, a nota manuscrita
   fora da mancha. Se isso aqui virar currículo, a página perdeu a razão.
   ------------------------------------------------------------------------- */

export default function SobreSection() {
  return (
    <Pagina id="quem-assina" className="py-[clamp(44px,7vw,96px)]">
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        {/* ---------- margem esquerda: fólio manuscrito e desenho ---------- */}
        <div className="col-span-3 lg:col-span-2">
          <Parallax forca={22} rotacao={5}>
            <Doodle nome="olho" cor="var(--tinta)" tamanho={48} />
          </Parallax>
          <p className="hand mt-4 text-[clamp(17px,2vw,21px)] leading-tight" style={{ color: 'var(--tinta-2)' }}>
            começa
            <br />
            aqui
          </p>
        </div>

        {/* ---------- mancha de texto ---------- */}
        <div className="col-span-9 lg:col-span-7">
          <TextReveal
            as="h2"
            texto="Design e código não são duas etapas. São a mesma decisão vista de dois lados."
            className="zine-titulo--medio max-w-[18ch] text-[clamp(1.5rem,3.6vw,3rem)]"
          />
          <p id="quem-assina-titulo" className="sr-only">
            Quem assina
          </p>

          <ScrollReveal atraso={0.2} className="mt-8 grid gap-6 sm:grid-cols-2">
            <p className="corpo text-[clamp(0.95rem,1.25vw,1.05rem)]">
              Aprendi as duas na marra, na mesma época, porque não tinha para quem passar a outra metade
              do trabalho. Hoje é vantagem: eu decido a interface sabendo o que ela custa pra construir, e
              escrevo o código sabendo o que ele precisa parecer.
            </p>
            <p className="corpo text-[clamp(0.95rem,1.25vw,1.05rem)]">
              Trabalho da Suíça, em três idiomas, quase sempre sozinho. Site de cliente pequeno, produto
              próprio, loja de artista. O que se repete é o jeito:{' '}
              <span className="sublinha" style={{ color: 'var(--tinta)' }}>
                nada de template, nada de tema pronto.
              </span>
            </p>
          </ScrollReveal>
        </div>

        {/* ---------- margem direita: anotação ---------- */}
        <div className="col-span-12 lg:col-span-3 lg:self-end lg:pb-1">
          <ScrollReveal direcao="direita" atraso={0.25} className="flex flex-col items-start gap-5 lg:items-end">
            <div className="relative inline-block px-5 py-3">
              <Circulo className="absolute inset-0 h-full w-full" cor="var(--tinta)" />
              <span className="zine-sub relative">DO FIGMA AO DEPLOY</span>
            </div>
            <p className="hand flex items-center gap-2 text-[clamp(20px,2.2vw,26px)]" style={{ color: 'var(--tinta-2)' }}>
              <Asterisco cor="var(--tinta-2)" tamanho={15} />
              uma pessoa, o projeto inteiro
            </p>
          </ScrollReveal>
        </div>
      </div>
    </Pagina>
  );
}
