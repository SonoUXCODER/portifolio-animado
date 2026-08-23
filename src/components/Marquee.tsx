import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------
   Faixa corrida.

   Existe pra marcar emenda entre atos, e é usada três vezes na página
   inteira — não uma por seção. A regra que eu sigo aqui: se a faixa fosse
   removida e ninguém sentisse falta, ela não deveria estar ali.

   O que ela carrega também importa. Uma faixa repetindo cargos ("DESIGNER ·
   DEVELOPER · FREELANCER") não diz nada que o resto da página já não diga —
   é enfeite com aparência de conteúdo. As três daqui carregam, cada uma,
   informação que não aparece em outro lugar: o que roda em produção, o que
   está aberto pra trabalho, e o fim do arquivo.

   `aria-hidden` porque o texto é decorativo na leitura linear: quem usa
   leitor de tela receberia a lista duplicada (o trilho tem duas cópias) e
   sem contexto nenhum. A informação real vive nas seções.
   ------------------------------------------------------------------------- */

export default function Marquee({
  itens,
  velocidade = 46,
  reverso = false,
  separador = '—',
  className,
}: {
  itens: string[];
  /** segundos pra dar uma volta inteira; quanto maior, mais lento */
  velocidade?: number;
  reverso?: boolean;
  separador?: string;
  className?: string;
}) {
  /* o trilho precisa do conteúdo duas vezes: o -50% do keyframe cai
     exatamente na emenda, e o laço fica invisível */
  const trilho = [...itens, ...itens];

  return (
    <div
      className={cn('marquee', className)}
      data-dir={reverso ? 'reverso' : 'normal'}
      style={{ ['--speed' as string]: `${velocidade}s` }}
      aria-hidden="true"
      data-pause
    >
      <div className="marquee__track">
        {trilho.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="label flex shrink-0 items-center gap-[var(--space-6)] whitespace-nowrap py-[var(--space-4)] pr-[var(--space-6)]"
          >
            {item}
            <span className="kicker__sep">{separador}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
