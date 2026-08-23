import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getContent, identity } from '@/content';
import { basePath } from '@/lib/base';
import { isLang, langTag, langs, type Lang } from '@/lib/lang';
import { ContentProvider } from '@/components/ContentProvider';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { ProvedorDeTransicao } from '@/components/PageTransition';
import { ScrollProgress } from '@/components/Reveal';

/* -------------------------------------------------------------------------
   O CASCO DE CADA IDIOMA.

   Tudo que muda com a língua entra aqui: o dicionário, a navegação, o
   rodapé, a metadata e o JSON-LD. O layout de cima é o documento; este é o
   site.

   >>> hreflang <<<
   O `languages` em `alternates` é o que faz um buscador entender que /en,
   /pt e /de são a mesma página em três línguas, e não três páginas
   competindo entre si pelo mesmo conteúdo. Sem isso, publicar três
   traduções piora o ranking em vez de melhorar: o buscador escolhe uma e
   trata as outras como cópia.

   `x-default` aponta pro inglês, que é quem atende quem chega sem
   preferência reconhecida.
   ------------------------------------------------------------------------- */

export function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

const abs = (caminho: string) => `${identity.url}${caminho}`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = getContent(lang);

  const titulo = `${identity.name} · ${t.meta.role}`;
  const url = `${identity.url}/${lang}`;

  return {
    metadataBase: new URL(identity.url),
    title: { default: titulo, template: `%s · ${identity.name}` },
    description: t.meta.description,
    applicationName: identity.handle,
    authors: [{ name: identity.name, url: identity.url }],
    creator: identity.name,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(langs.map((l) => [langTag[l], `${identity.url}/${l}`])),
        'x-default': `${identity.url}/en`,
      },
    },
    openGraph: {
      type: 'website',
      locale: langTag[lang],
      url,
      siteName: identity.handle,
      title: titulo,
      description: t.meta.tagline,
      images: [
        { url: abs('/assets/og.png'), width: 1200, height: 630, alt: `${identity.name} portfolio` },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: titulo,
      description: t.meta.tagline,
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
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getContent(lang as Lang);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: identity.name,
    alternateName: identity.handle,
    url: `${identity.url}/${lang}`,
    email: `mailto:${identity.email}`,
    jobTitle: t.meta.role,
    description: t.meta.tagline,
    address: {
      '@type': 'PostalAddress',
      addressLocality: identity.city,
      addressCountry: 'CH',
    },
    knowsLanguage: ['en', 'pt-BR', 'de-CH'],
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
    sameAs: identity.social.filter((s) => s.href.startsWith('http')).map((s) => s.href),
  };

  return (
    <ContentProvider lang={lang as Lang}>
      <ProvedorDeTransicao>
        <ScrollProgress />
        <Nav />

        <main id="content">{children}</main>
        <Footer />
      </ProvedorDeTransicao>

      <script
        type="application/ld+json"
        // JSON-LD é dado nosso, montado aqui do lado — não vem de fora
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </ContentProvider>
  );
}
