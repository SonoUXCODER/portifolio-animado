import { sectionBy, sectionIndex } from '@/data/sections';

/* -------------------------------------------------------------------------
   A linha que abre cada seção.

   Substituiu um marcador que trazia número, nome e nota em três colunas
   fixas, idêntico nas seis seções. Fazia o trabalho de orientar, mas o
   resultado lia como formulário preenchido — a mesma régua repetida é uma
   das coisas que fazem uma página parecer montada por máquina.

   Aqui o número e o nome continuam saindo de data/sections.ts (nenhum é
   digitado à mão), mas a terceira parte é `kicker`: uma frase escrita pra
   aquela seção específica. É ela que muda o tom entre um capítulo e outro.
   ------------------------------------------------------------------------- */

export default function Kicker({ id, extra }: { id: string; extra?: string }) {
  const section = sectionBy(id);

  return (
    <p className="kicker">
      <span className="kicker__n">{sectionIndex(id)}</span>
      <span>{section?.name ?? id}</span>
      <span className="kicker__sep" aria-hidden="true">
        ·
      </span>
      <span>{extra ?? section?.kicker}</span>
    </p>
  );
}
