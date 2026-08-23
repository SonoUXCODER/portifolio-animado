import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProject, projects } from '@/data/projects';
import { site } from '@/data/site';
import ProjectPage from '@/components/ProjectPage';

/* uma página por projeto, geradas no build — nada de renderizar sob demanda */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

/* cada projeto com metadata própria: título, descrição e imagem dele */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return { title: 'Project not found' };

  const titulo = `${p.title} — ${p.year}`;
  return {
    title: titulo,
    description: p.summary,
    /* absoluto, e não relativo: o site mora numa subpasta e um caminho
       com barra na frente resolveria pra raiz do domínio */
    alternates: { canonical: `${site.url}/work/${p.slug}` },
    openGraph: {
      type: 'article',
      title: `${titulo} · ${site.name}`,
      description: p.summary,
      url: `${site.url}/work/${p.slug}`,
      images: [
        { url: site.url + p.cover.src, width: p.cover.width, height: p.cover.height, alt: p.cover.alt },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${titulo} · ${site.name}`,
      description: p.summary,
      images: [site.url + p.cover.src],
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
