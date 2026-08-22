import type { Metadata, Viewport } from 'next';
import { Archivo, Caveat, IBM_Plex_Mono } from 'next/font/google';
import { site } from '@/data/site';
import { basePath } from '@/lib/base';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import { ProvedorDeTransicao } from '@/components/PageTransition';
import { ProvedorDeTema, scriptAntiPiscada } from '@/components/Tema';
import { BarraDeProgresso } from '@/components/ScrollReveal';
import { FiltrosSVG } from '@/components/Doodles';
import PausaForaDaTela from '@/components/PausaForaDaTela';
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
    default: `${site.name} — arquivo de trabalho`,
    template: `%s · ${site.name}`,
  },
  description:
    'Arquivo de trabalho de um desenvolvedor full-stack e designer de produto: cinco projetos, o processo inteiro e três estampas 3D. Feito à mão, em Next.js e TypeScript.',
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
    title: `${site.name} — arquivo de trabalho`,
    description: 'Cinco projetos, o processo inteiro e três estampas 3D. Feito à mão, mas com javascript.',
    images: [{ url: abs('/assets/og.png'), width: 1200, height: 630, alt: `Arquivo de trabalho de ${site.name}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — arquivo de trabalho`,
    description: 'Cinco projetos, o processo inteiro e três estampas 3D.',
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
  /* uma cor por edição: a barra do navegador acompanha o tema */
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#e3e3e1' },
    { media: '(prefers-color-scheme: dark)', color: '#060606' },
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

/** as quatro marcas de corte da folha */
function MarcasDeCorte() {
  return (
    <>
      {(['no', 'ne', 'so', 'se'] as const).map((canto) => (
        <span key={canto} className="marca-corte" data-canto={canto} aria-hidden="true" />
      ))}
    </>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /* suppressHydrationWarning: o script de anti-piscada mexe no <html>
       antes do React chegar, então servidor e cliente divergem de propósito */
    <html
      lang="pt-BR"
      className={`${archivo.variable} ${plex.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptAntiPiscada }} />
      </head>
      <body>
        <ProvedorDeTema>
          <ProvedorDeTransicao>
            <BarraDeProgresso />
            <Navbar />

            {/* a folha: tudo que é conteúdo mora em cima dela */}
            <div className="folha">
              <MarcasDeCorte />
              <main id="conteudo" className="relative">
                {children}
              </main>
              <Footer />
            </div>
          </ProvedorDeTransicao>

          <CustomCursor />
        </ProvedorDeTema>

        {/* o grão fica por cima da folha inteira, sem capturar clique */}
        <div className="grao" aria-hidden="true" />
        <FiltrosSVG />
        <PausaForaDaTela />

        <script
          type="application/ld+json"
          // JSON-LD é dado nosso, montado aqui do lado — não vem de fora
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
