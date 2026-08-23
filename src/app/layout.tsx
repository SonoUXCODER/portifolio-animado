import type { Metadata, Viewport } from 'next';
import { Archivo, Instrument_Sans } from 'next/font/google';
import { site } from '@/data/site';
import { basePath } from '@/lib/base';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';
import Loader from '@/components/Loader';
import { ProvedorDeTransicao } from '@/components/PageTransition';
import { ScrollProgress } from '@/components/Reveal';
import PauseOffscreen from '@/components/PauseOffscreen';
import './globals.css';

/* -------------------------------------------------------------------------
   Fontes. Duas, e as duas trabalhando.

   **Archivo** é o display. O que importa aqui não é o desenho da letra —
   é o eixo `wdth` (62..125). Ele deixa o título estreitar conforme cresce,
   que é como uma manchete de jornal sempre foi composta: "I BUILD DIGITAL
   EXPERIENCES." em 13rem só cabe na tela porque a letra fecha pra 84 de
   largura. Sem esse eixo eu precisaria de uma segunda família condensada
   — mais um download, e duas famílias que nunca combinam de verdade.

   **Instrument Sans** é o resto: texto corrido, rótulo técnico, número.
   Neutra o suficiente pra sumir e deixar o display falar.

   Não existe família monoespaçada baixada. O dado técnico usa a sans com
   `tabular-nums`, que resolve o alinhamento de número sem trazer junto a
   estética de terminal que aparece em todo portfólio de dev. O único mono
   é o do sistema, e ele só desenha a onda de ASCII dos estudos.

   Ambas com display:swap — texto na tela antes de a fonte chegar.
   ------------------------------------------------------------------------- */

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
  variable: '--fonte-display',
});

const instrument = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--fonte-texto',
});

/* O site mora numa subpasta no Pages. Um caminho com barra na frente,
   resolvido contra a metadataBase, perde o prefixo ("/assets" vira a raiz
   do domínio) — então tudo que vai pro <head> é montado absoluto a partir
   de site.url. Nada de caminho relativo aqui. */
const abs = (caminho: string) => `${site.url}${caminho}`;

const descricao =
  'Portfolio of a full-stack developer and UX/UI designer based in Bern, Switzerland. Five products with the full case study, the stack running in production, and the studies that run live.';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: descricao,
  applicationName: site.handle,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    'full-stack developer',
    'ux ui designer',
    'product designer',
    'portfolio',
    'next.js',
    'react',
    'typescript',
    'design systems',
    'switzerland',
    site.handle,
  ],
  alternates: { canonical: site.url },
  openGraph: {
    type: 'website',
    locale: 'en',
    url: site.url,
    siteName: site.handle,
    title: `${site.name} · ${site.role}`,
    description: site.tagline,
    images: [
      { url: abs('/assets/og.png'), width: 1200, height: 630, alt: `Portfolio of ${site.name}` },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} · ${site.role}`,
    description: site.tagline,
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
  /* o mesmo --background do CSS: a barra do navegador encosta na página em
     vez de fazer degrau. Um valor só, porque o site tem um tema só. */
  themeColor: '#0a0a0a',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  alternateName: site.handle,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: site.role,
  description: site.tagline,
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.city,
    addressCountry: 'CH',
  },
  knowsAbout: [
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'PostgreSQL',
    'UX/UI Design',
    'Design Systems',
    'Creative Development',
  ],
  sameAs: site.social.filter((s) => s.href.startsWith('http')).map((s) => s.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${instrument.variable}`}>
      <head>
        {/* Sem JavaScript, nada aparece.

            O Framer Motion escreve o estado inicial no HTML do servidor, e o
            estado inicial de tudo que entra por rolagem é `opacity: 0` — são
            dezenas de elementos na home. Com o script bloqueado, a animação
            que os revelaria nunca roda e a página fica com o hero e mais nada.

            O seletor pega o atributo style em vez de uma classe porque é o
            próprio Framer quem escreve esse atributo; não há classe nossa
            onde ancorar. Só entra dentro de <noscript>, então não custa nada
            a quem tem JS ligado. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <ProvedorDeTransicao>
          <ScrollProgress />
          <Nav />

          <main id="content">{children}</main>
          <Footer />
        </ProvedorDeTransicao>

        {/* o grão fica por cima de tudo e não recebe evento nenhum: é a
            textura de sala escura que tira o preto chapado do navegador */}
        <div className="grain" aria-hidden="true" />

        <CustomCursor />
        <SmoothScroll />
        <Loader />
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
