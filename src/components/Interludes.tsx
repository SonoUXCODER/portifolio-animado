'use client';

import { useConteudo } from './ContentProvider';
import Interlude from './Interlude';

/* -------------------------------------------------------------------------
   Um invólucro de uma linha, e ele existe por um motivo só: <Interlude/> é
   pesado (three.js, WebGL, ciclo de vida próprio) e não deveria também
   saber de onde vem o texto dele.

   A página pede a peça pelo índice; este componente busca a peça daquele
   idioma e entrega. Trocar a ordem das esculturas mexe em content/shared.ts
   e em mais lugar nenhum.
   ------------------------------------------------------------------------- */

export default function Interludes({ indice }: { indice: number }) {
  const { interludes } = useConteudo();
  const peca = interludes[indice];
  if (!peca) return null;
  return <Interlude peca={peca} />;
}
