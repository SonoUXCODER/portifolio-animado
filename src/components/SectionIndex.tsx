'use client';

import type { SectionId } from '@/content';
import { useConteudo } from './ContentProvider';
import { Filete } from './Reveal';

/* -------------------------------------------------------------------------
   A linha que abre cada capítulo: `ABOUT ———— one person, two disciplines`.

   Havia um número na frente (`01 /`). Ele saiu, junto com toda a numeração
   da página: numerar cinco seções, seis capacidades e cinco etapas dá à
   leitura o ar de formulário preenchido, e o número não respondia nenhuma
   pergunta que o nome já não respondesse. O que orienta agora é a posição na
   página e o filete.

   O nome sai do dicionário do idioma corrente, então a abertura nunca
   desencontra da navegação. A terceira parte é `note`: uma frase escrita pra
   aquela seção, e é ela que muda o tom de um capítulo pro outro sem que a
   forma mude.

   O filete que atravessa até a margem é o que ancora a linha na grade e faz
   cinco aberturas idênticas parecerem parte do mesmo documento. Ele é
   traçado quando o capítulo entra na tela, e não desenhado de uma vez: o
   capítulo passa a começar em vez de já estar lá. A mecânica está em
   <Filete/>, em Reveal.tsx.
   ------------------------------------------------------------------------- */

export default function SectionIndex({ id, note }: { id: SectionId; note?: string }) {
  const { sections } = useConteudo();
  const section = sections.find((s) => s.id === id);

  return (
    <p className="index-line">
      <span style={{ color: 'var(--text-primary)' }}>{section?.name ?? id}</span>
      <Filete />
      <span className="hidden sm:inline">{note ?? section?.note}</span>
    </p>
  );
}
