import { sectionBy, sectionIndex, sectionTotal } from '@/data/sections';
import { Reveal } from './Reveal';

/* -------------------------------------------------------------------------
   O marcador que abre cada seção: número em acento, nome, e a nota alinhada
   à direita. É a única forma que se repete entre as cenas — é ela que faz
   composições diferentes ainda parecerem do mesmo sistema.

   Tudo vem de data/sections.ts pelo id: nenhum número digitado à mão.
   ------------------------------------------------------------------------- */

export default function SectionMark({ id, note }: { id: string; note?: string }) {
  const section = sectionBy(id);
  const index = sectionIndex(id);

  return (
    <Reveal direction="none">
      <div className="section-mark">
        <span className="section-mark__index">
          {index}
          <span style={{ color: 'var(--text-tertiary)' }}>/{sectionTotal}</span>
        </span>
        <span className="section-mark__name">{section?.name ?? id}</span>
        <span className="section-mark__note hidden sm:block">{note ?? section?.note}</span>
      </div>
    </Reveal>
  );
}
