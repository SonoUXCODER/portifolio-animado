import { sectionBy } from '@/data/sections';

/* -------------------------------------------------------------------------
   A linha que abre cada capítulo: `ABOUT ———— one person, two disciplines`.

   Havia um número na frente (`01 /`). Ele saiu, junto com toda a numeração
   da página: numerar cinco seções, seis capacidades e cinco etapas dá à
   leitura o ar de formulário preenchido, e o número não estava respondendo
   nenhuma pergunta que o nome já não respondesse. O que orienta agora é a
   posição na página e o filete.

   O nome sai de data/sections.ts, então a abertura nunca desencontra da
   navegação. A terceira parte é `note`: uma frase escrita pra aquela seção,
   e é ela que muda o tom de um capítulo pro outro sem que a forma mude.

   O filete que atravessa até a margem é o que ancora a linha na grade e faz
   cinco aberturas idênticas parecerem parte do mesmo documento.
   ------------------------------------------------------------------------- */

export default function SectionIndex({ id, note }: { id: string; note?: string }) {
  const section = sectionBy(id);

  return (
    <p className="index-line">
      <span style={{ color: 'var(--text-primary)' }}>{section?.name ?? id}</span>
      <span className="index-line__rule" aria-hidden="true" />
      <span className="hidden sm:inline">{note ?? section?.note}</span>
    </p>
  );
}
