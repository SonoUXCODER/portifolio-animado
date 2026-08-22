import type { Metadata, Viewport } from 'next';
import { Archivo, Caveat, IBM_Plex_Mono } from 'next/font/google';
import { site } from '@/data/site';
import { basePath } from '@/lib/base';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import { ProvedorDeTransicao } from '@/components/PageTransition';
import { BarraDeProgresso } from '@/components/ScrollReveal';
import { FiltrosSVG } from '@/components/Doodles';
import './globals.css';

/* -------------------------------------------------------------------------
   Fontes.
   O Archivo entra com o eixo de largura (wdth): é ele que deixa o título
   gigante estreito o bastante pra caber na linha sem virar imagem.
   Todas com display:swap — texto na tela antes da fonte chegar.
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

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
  variable: '--fonte-hand',
});

/* O site mora numa subpasta no Pages. Um caminho com barra na frente,
   resolvido contra a metadataBase, perde o prefixo ("/assets" vira a raiz
   do domínio) — então tudo que vai pro <head> é montado absoluto a partir
   de site.url. Nada de caminho relativo aqui. */

const abs = (caminho: string) => `${site.url}${caminho}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — desenvolvedor full-stack e designer`,
    template: `%s · ${site.name}`,
  },
  description:
    'Portfólio de desenvolvedor full-stack e designer de produto. Sites e web apps escritos à mão em React, Next.js e TypeScript, do Figma ao deploy.',
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
    site.handle,
  ],
  alternates: { canonical: site.url },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: site.url,
    siteName: site.handle,
    title: `${site.name} — desenvolvedor full-stack e designer`,
    description: 'Projetos, ferramentas e experimentos. Feito à mão, mas com javascript.',
    images: [{ url: abs('/assets/og.png'), width: 1200, height: 630, alt: `Portfólio de ${site.name}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — desenvolvedor full-stack e designer`,
    description: 'Projetos, ferramentas e experimentos.',
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
  themeColor: '#0b0d10',
  colorScheme: 'dark',
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
    <html lang="pt-BR" className={`${archivo.variable} ${plex.variable} ${caveat.variable}`}>
      <body>
        {/* as duas camadas de textura ficam por cima de tudo, sem capturar clique */}
        <div className="textura-papel" aria-hidden="true" />
        <div className="grao" aria-hidden="true" />

        <ProvedorDeTransicao>
          <BarraDeProgresso />
          <Navbar />
          <main id="conteudo" className="relative z-[2]">
            {children}
          </main>
          <Footer />
        </ProvedorDeTransicao>

        <CustomCursor />
        <FiltrosSVG />

        <script
          type="application/ld+json"
          // JSON-LD é dado nosso, montado aqui do lado — não vem de fora
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
