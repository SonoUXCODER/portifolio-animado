'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { melhorIdioma } from '@/lib/lang';

/* -------------------------------------------------------------------------
   Manda quem chegou em `/` pro idioma que o navegador dele pede.

   `router.replace`, nunca `push`: se entrasse no histórico, o botão
   "voltar" traria a pessoa de volta pra esta página, que imediatamente a
   mandaria de novo pra frente. É a armadilha clássica de página de
   redirecionamento, e ela prende o usuário.

   `navigator.languages` vem em ordem de preferência e pode estar vazio em
   navegador antigo; o `??` cobre isso, e `melhorIdioma()` cai no inglês
   quando nada bate.
   ------------------------------------------------------------------------- */

export default function RootRedirect() {
  const router = useRouter();

  useEffect(() => {
    const preferidos = navigator.languages ?? [navigator.language];
    router.replace(`/${melhorIdioma(preferidos)}`);
  }, [router]);

  return null;
}
