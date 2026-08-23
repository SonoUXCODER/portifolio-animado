import { sectionBy, sectionIndex } from '@/data/sections';

/* -------------------------------------------------------------------------
   A linha que abre cada capítulo: `01 / ABOUT — one person, two disciplines`.

   O número e o nome saem de data/sections.ts (nenhum é digitado à mão), e a
   terceira parte é `note`: uma frase escrita pra aquela seção. É ela que
   muda o tom de um capítulo pro outro sem que a forma mude.

   O filete que sobra à direita atravessa até a margem. Ele não é enfeite:
   é o que ancora a linha na grade e faz sete aberturas idênticas parecerem
   parte do mesmo documento em vez de sete cabeçalhos soltos.
   ------------------------------------------------------------------------- */

export default function SectionIndex({ id, note }: { id: string; note?: string }) {
  const section = sectionBy(id);

  return (
    <p className="index-line">
      <span className="index-line__n">{sectionIndex(id)}</span>
      <span className="index-line__sep" aria-hidden="true">
        /
      </span>
      <span style={{ color: 'var(--text-primary)' }}>{section?.name ?? id}</span>
      <span className="index-line__rule" aria-hidden="true" />
      <span className="hidden sm:inline">{note ?? section?.note}</span>
    </p>
  );
}
