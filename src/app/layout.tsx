import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Sans } from "next/font/google";
import Abertura from "@/components/abertura";
import Cursor from "@/components/cursor";
import Movimento from "@/components/movimento";
import PausaForaDeTela from "@/components/pausa-fora-de-tela";
import RolagemSuave from "@/components/rolagem-suave";
import { SITE } from "@/content/site";
import "./globals.css";

/* Variáveis: um arquivo por família cobre todos os pesos, e o eixo `wdth` é o
   que a tipografia display usa (font-variation-settings no globals.css). */
const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--fonte-display",
  display: "swap",
});

const texto = Instrument_Sans({
  subsets: ["latin"],
  variable: "--fonte-texto",
  display: "swap",
});

export const metadata: Metadata = {
  title: SITE.name,
  applicationName: SITE.name,
  metadataBase: new URL(SITE.url),
  icons: {
    icon: [
      { url: "/assets/icon-32.png", sizes: "32x32" },
      { url: "/assets/icon-192.png", sizes: "192x192" },
    ],
    apple: "/assets/icon-180.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

/**
 * Export estático: o `lang` do <html> é fixado no build. Este script corrige
 * o atributo a partir do caminho antes da primeira pintura, para /pt e /de
 * não serem entregues marcados como inglês.
 */
const CORRIGE_LANG = `(function(){try{
var p=location.pathname.split('/').filter(Boolean);
for(var i=0;i<p.length;i++){
if(p[i]==='pt'){document.documentElement.lang='pt-BR';return}
if(p[i]==='de'){document.documentElement.lang='de-CH';return}
if(p[i]==='en'){document.documentElement.lang='en';return}}
}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${texto.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: CORRIGE_LANG }} />
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important;filter:none!important}
[style*="scaleX(0)"]{transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <span aria-hidden className="grain" />
        <Movimento>
          <RolagemSuave />
          <Cursor />
          <PausaForaDeTela />
          <Abertura />
          {children}
        </Movimento>
      </body>
    </html>
  );
}
