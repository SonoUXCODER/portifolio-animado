import type { Metadata, Viewport } from 'next';
import { Archivo, IBM_Plex_Mono } from 'next/font/google';
import { site } from '@/data/site';
import { basePath } from '@/lib/base';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import { ProvedorDeTransicao } from '@/components/PageTransition';
import { ThemeProvider, themeBootScript } from '@/components/Theme';
import { ScrollProgress } from '@/components/Reveal';
import PauseOffscreen from '@/components/PauseOffscreen';
import './globals.css';

/* -------------------------------------------------------------------------
   Fontes. Duas, e nada mais.

   O Archivo entra com o eixo de largura (wdth): é ele que deixa o título
   gigante estreito o bastante pra caber na linha sem virar imagem. O Plex
   Mono carrega todo dado técnico — rótulo, número, ano.

   Havia uma terceira, o Caveat, para as legendas manuscritas do impresso.
   Saiu junto com elas: era uma família inteira baixada para meia dúzia de
   linhas, e nada na direção atual pede letra de mão.

   Ambas com display:swap — texto na tela antes de a fonte chegar.
   ------------------------------------------------------------------------- */

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
  variable: '--fonte-display',
});

const plex = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--fonte-mono',
});

/* O site mora numa subpasta no Pages. Um caminho com barra na frente,
   resolvido contra a metadataBase, perde o prefixo ("/assets" vira a raiz
   do domínio) — então tudo que vai pro <head> é montado absoluto a partir
   de site.url. Nada de caminho relativo aqui. */
const abs = (caminho: string) => `${site.url}${caminho}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  /* O título e as descrições descreviam um impresso — "arquivo de trabalho",
     "estampas", "feito à mão". É o texto que aparece no Google e no preview
     de qualquer link compartilhado, então tinha de acompanhar a direção nova.
     O título repete o que o h1 da home diz, de propósito. */
  title: {
    default: `${site.name} — desenvolvedor full-stack e designer de produto`,
    template: `%s · ${site.name}`,
  },
  description:
    'Portfólio de um desenvolvedor full-stack e designer de produto na Suíça: cinco projetos com o estudo de caso inteiro, a stack em produção e os estudos que rodam ao vivo.',
  applicationName: site.handle,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    'desenvolvedor full-stack',
    'portfólio',
    'next.js',
    'react',
    'typescript',
    'ux ui',
    'design de produto',
    site.handle,
  ],
  alternates: { canonical: site.url },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: site.url,
    siteName: site.handle,
    title: `${site.name} — desenvolvedor full-stack e designer de produto`,
    description:
      'Cinco projetos com o estudo de caso inteiro: o problema que existia antes, a decisão, e o que ficou de pé.',
    images: [{ url: abs('/assets/og.png'), width: 1200, height: 630, alt: `Portfólio de ${site.name}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — desenvolvedor full-stack e designer de produto`,
    description: 'Cinco projetos com o estudo de caso inteiro, a stack em produção e os estudos ao vivo.',
    images: [abs('/assets/og.png')],
  },
  icons: {
    icon: [
      { url: `${basePath}/assets/icon-32.png`, sizes: '32x32' },
      { url: `${basePath}/assets/icon-192.png`, sizes: '192x192' },
    ],
    apple: `${basePath}/assets/icon-180.png`,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  /* os mesmos --background dos dois temas em globals.css: a barra do
     navegador encosta na página em vez de fazer degrau */
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f6f4' },
    { media: '(prefers-color-scheme: dark)', color: '#0d0d0f' },
  ],
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  alternateName: site.handle,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: 'Desenvolvedor full-stack e designer de produto',
  description: site.tagline,
  knowsAbout: ['TypeScript', 'React', 'Next.js', 'Node.js', 'UX/UI', 'Design de produto'],
  sameAs: site.social.filter((s) => s.href.startsWith('http')).map((s) => s.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /* suppressHydrationWarning: o script de tema mexe no <html> antes de o
       React chegar, então servidor e cliente divergem de propósito */
    <html
      lang="pt-BR"
      className={`${archivo.variable} ${plex.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />

        {/* Sem JavaScript, nada aparece.

            O Framer Motion escreve o estado inicial no HTML do servidor, e o
            estado inicial de tudo que entra por rolagem é `opacity: 0` — são
            64 elementos na home. Com o script bloqueado, a animação que os
            revelaria nunca roda e a página fica com o hero e mais nada.

            O seletor pega o atributo style em vez de uma classe porque é o
            próprio Framer quem escreve esse atributo; não há classe nossa
            onde ancorar. Só entra dentro de <noscript>, então não custa nada
            a quem tem JS ligado. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <ThemeProvider>
          <ProvedorDeTransicao>
            <ScrollProgress />
            <Nav />

            <main id="conteudo">{children}</main>
            <Footer />
          </ProvedorDeTransicao>

          <CustomCursor />
        </ThemeProvider>

        <PauseOffscreen />

        <script
          type="application/ld+json"
          // JSON-LD é dado nosso, montado aqui do lado — não vem de fora
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
