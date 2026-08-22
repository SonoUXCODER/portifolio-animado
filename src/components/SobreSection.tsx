'use client';

import { Parallax, ScrollReveal, TextReveal } from './ScrollReveal';
import { Asterisco, Circulo, Doodle, Seta } from './Doodles';

/* -------------------------------------------------------------------------
   Faixa curta entre a abertura e os projetos.
   Três frases, no máximo. O trabalho fala mais alto que a biografia — se
   isso aqui virar currículo, a seção perdeu a razão de existir.
   ------------------------------------------------------------------------- */

export default function SobreSection() {
  return (
    <section id="sobre" className="relative pb-[clamp(24px,3vw,44px)] pt-[clamp(50px,8vw,110px)]">
      <div className="envelope">
        <div className="grid grid-cols-12 items-start gap-y-10">
          {/* coluna 1: o número e um desenho */}
          <div className="col-span-3 lg:col-span-2">
            <span className="zine-sub block opacity-55">00</span>
            <Parallax forca={26} rotacao={6} className="mt-4">
              <Doodle nome="olho" cor="var(--accent-2)" tamanho={54} />
            </Parallax>
          </div>

          {/* coluna 2: a frase, deslocada */}
          <div className="col-span-9 lg:col-span-7">
            <TextReveal
              as="p"
              texto="Design e código não são duas etapas: são a mesma decisão vista de dois lados. Por isso eu faço as duas."
              className="zine-titulo--medio max-w-[19ch] text-[clamp(1.5rem,3.6vw,3rem)]"
            />

            <ScrollReveal atraso={0.25} className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
              <p className="corpo text-[clamp(0.95rem,1.3vw,1.08rem)]">
                Suíça, três idiomas, sites que precisam carregar rápido no celular de alguém.
              </p>
              <span className="hand flex items-center gap-2 text-[26px]" style={{ color: 'var(--accent)' }}>
                <Asterisco cor="var(--accent)" tamanho={16} />
                sem template. nunca.
              </span>
            </ScrollReveal>
          </div>

          {/* coluna 3: só desenho, ancorada na base pra fechar a composição */}
          <div className="col-span-12 lg:col-span-3 lg:self-end lg:pb-1">
            <ScrollReveal direcao="direita" atraso={0.2} className="relative flex flex-col items-start gap-5 lg:items-end">
              <div className="relative inline-block px-6 py-3">
                <Circulo className="absolute inset-0 h-full w-full" cor="var(--accent-2)" />
                <span className="zine-sub relative">FULL-STACK</span>
              </div>
              <Seta className="rotate-[160deg] opacity-55" cor="var(--text)" largura={120} />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
