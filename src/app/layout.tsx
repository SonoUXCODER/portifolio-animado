import type { Viewport } from 'next';
import { Archivo, Instrument_Sans } from 'next/font/google';
import CustomCursor from '@/components/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';
import Loader from '@/components/Loader';
import PauseOffscreen from '@/components/PauseOffscreen';
import './globals.css';

/* -------------------------------------------------------------------------
   O CASCO.

   Este layout é só o que precisa existir uma vez por documento: as fontes,
   o CSS, e as quatro peças que vivem fora do fluxo da página (cursor,
   rolagem suave, cortina de carregamento, pausa de animação). Tudo que
   depende de idioma mora em app/[lang]/layout.tsx.

   >>> O SCRIPT DO `lang` <<<
   O atributo `lang` do <html> tem de bater com o idioma do texto: é ele que
   decide como um leitor de tela pronuncia a página, e ler alemão com voz
   inglesa é ininteligível, não só desagradável.

   O problema é que este layout é a raiz e não recebe `params`, então ele não
   tem como saber se a rota é /en, /pt ou /de. As saídas seriam mover o
   <html> pra dentro de [lang] (e aí a home e o 404 na raiz ficam sem casco)
   ou corrigir depois da hidratação (e aí a primeira leitura sai errada).

   Este script resolve pelo caminho, antes da primeira pintura, em cinco
   linhas: lê o primeiro segmento da URL e escreve o atributo. É síncrono e
   inline de propósito — esperar bundle nenhum é o ponto.
   ------------------------------------------------------------------------- */

const langBootScript = `(function(){try{
var m=location.pathname.split('/').filter(Boolean);
var i=m.indexOf('pt')>-1?'pt-BR':m.indexOf('de')>-1?'de-CH':'en';
for(var k=0;k<m.length;k++){if(m[k]==='pt'){i='pt-BR';break;}if(m[k]==='de'){i='de-CH';break;}if(m[k]==='en'){i='en';break;}}
document.documentElement.lang=i;
}catch(e){}})();`;

/* -------------------------------------------------------------------------
   Fontes. Duas, e as duas trabalhando.

   **Archivo** é o display. O que importa aqui não é o desenho da letra: é o
   eixo `wdth` (62..125). Ele deixa o título estreitar conforme cresce, que é
   como uma manchete de jornal sempre foi composta. "I BUILD DIGITAL
   EXPERIENCES." em 13rem só cabe na tela porque a letra fecha pra 84 de
   largura. Sem esse eixo eu precisaria de uma segunda família condensada,
   mais um download, e duas famílias que nunca combinam de verdade.

   **Instrument Sans** é o resto: texto corrido, rótulo técnico, número.
   Neutra o suficiente pra sumir e deixar o display falar.

   Não existe família monoespaçada baixada. O dado técnico usa a sans com
   `tabular-nums`, que resolve o alinhamento de número sem trazer junto a
   estética de terminal que aparece em todo portfólio de dev. O único mono é
   o do sistema, e ele só desenha a onda de ASCII dos estudos.

   `latin-ext` entra por causa do alemão e do português: sem ele, ü, ä, ã e
   ç caem numa fonte de sistema e a linha muda de desenho no meio.
   ------------------------------------------------------------------------- */

const archivo = Archivo({
  subsets: ['latin', 'latin-ext'],
  axes: ['wdth'],
  display: 'swap',
  variable: '--fonte-display',
});

const instrument = Instrument_Sans({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--fonte-texto',
});

export const viewport: Viewport = {
  /* o mesmo --background do CSS: a barra do navegador encosta na página em
     vez de fazer degrau. Um valor só, porque o site tem um tema só. */
  themeColor: '#0a0a0a',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /* suppressHydrationWarning: o script acima mexe no atributo `lang` antes
       de o React chegar, então servidor e cliente divergem de propósito */
    <html lang="en" className={`${archivo.variable} ${instrument.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: langBootScript }} />

        {/* Sem JavaScript, nada aparece.

            O Framer Motion escreve o estado inicial no HTML do servidor, e o
            estado inicial de tudo que entra por rolagem é `opacity: 0` — são
            dezenas de elementos na home. Com o script bloqueado, a animação
            que os revelaria nunca roda e a página fica com o hero e mais nada.

            O seletor pega o atributo style em vez de uma classe porque é o
            próprio Framer quem escreve esse atributo; não há classe nossa
            onde ancorar. Só entra dentro de <noscript>, então não custa nada
            a quem tem JS ligado.

            `filter` está na regra por causa da entrada do hero, que começa
            em `blur(16px)`. Sem essa linha o título da primeira tela ficava
            desfocado pra sempre em quem tem script bloqueado, e esse é o
            tipo de defeito que ninguém reporta porque quem vê acha que o
            site é assim mesmo. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
      </head>
      <body>
        {children}

        {/* o grão fica por cima de tudo e não recebe evento nenhum: é a
            textura de sala escura que tira o preto chapado do navegador */}
        <div className="grain" aria-hidden="true" />

        <CustomCursor />
        <SmoothScroll />
        <Loader />
        <PauseOffscreen />
      </body>
    </html>
  );
}
