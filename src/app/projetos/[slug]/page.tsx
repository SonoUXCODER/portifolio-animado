import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProject, projects } from '@/data/projects';
import { site } from '@/data/site';
import ProjectPage from '@/components/ProjectPage';

/* uma página por projeto, geradas no build — nada de renderizar sob demanda.
   Sem número escrito no comentário: já dizia "quatro" com cinco projetos. */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

/* cada projeto com metadata própria: título, descrição e imagem dele */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return { title: 'Projeto não encontrado' };

  const titulo = `${p.title} — ${p.year}`;
  return {
    title: titulo,
    description: p.description,
    /* absoluto, e não relativo: o site mora numa subpasta e um caminho
       com barra na frente resolveria pra raiz do domínio */
    alternates: { canonical: `${site.url}/projetos/${p.slug}` },
    openGraph: {
      type: 'article',
      title: `${titulo} · ${site.name}`,
      description: p.description,
      url: `${site.url}/projetos/${p.slug}`,
      images: [{ url: site.url + p.image.src, width: p.image.width, height: p.image.height, alt: p.image.alt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${titulo} · ${site.name}`,
      description: p.description,
      images: [site.url + p.image.src],
    },
  };
}

export default async function Pagina({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const i = projects.findIndex((x) => x.slug === p.slug);
  const proximo = projects[(i + 1) % projects.length];

  return <ProjectPage p={p} proximo={proximo} />;
}
