import type { Metadata } from "next";
import Cabecalho from "@/components/cabecalho";
import { ProvedorDeConteudo } from "@/components/conteudo";
import Rodape from "@/components/rodape";
import { ProvedorDeTransicao } from "@/components/transicao";
import { comoLang, getDictionary, getSections, LANG_LOCALE, LANGS, SITE } from "@/content";

export const generateStaticParams = () => LANGS.map((lang) => ({ lang }));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = comoLang((await params).lang);
  const t = getDictionary(lang);
  const titulo = `${SITE.name} · ${t.meta.role}`;

  return {
    title: titulo,
    description: t.meta.description,
    applicationName: SITE.name,
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.name,
    alternates: {
      canonical: `/${lang}/`,
      languages: {
        en: "/en/",
        "pt-BR": "/pt/",
        "de-CH": "/de/",
        "x-default": "/en/",
      },
    },
    openGraph: {
      type: "website",
      locale: LANG_LOCALE[lang],
      siteName: SITE.name,
      title: titulo,
      description: t.meta.description,
      url: `/${lang}/`,
      images: [{ url: "/assets/og.png", width: 1200, height: 630, alt: titulo }],
    },
    twitter: {
      card: "summary_large_image",
      title: titulo,
      description: t.meta.description,
      images: ["/assets/og.png"],
    },
  };
}

export default async function LayoutDoIdioma({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const lang = comoLang((await params).lang);
  const t = getDictionary(lang);

  /* só a moldura vai para o cliente; a copy de cada seção desce por props */
  const moldura = {
    ui: t.ui,
    meta: t.meta,
    footer: t.footer,
    livePreview: t.livePreview,
  };

  return (
    <ProvedorDeConteudo lang={lang} moldura={moldura} sections={getSections(lang)}>
      <ProvedorDeTransicao>
        <Cabecalho />
        {children}
        <Rodape />
      </ProvedorDeTransicao>
    </ProvedorDeConteudo>
  );
}
