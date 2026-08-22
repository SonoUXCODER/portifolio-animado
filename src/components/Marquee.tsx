import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------
   Faixa que atravessa a tela.
   Anima em CSS puro (translate de -50% num trilho duplicado): não custa
   JS nenhum, não trava com a rolagem e para sozinha no prefers-reduced-motion.
   ------------------------------------------------------------------------- */

export default function Marquee({
  itens,
  velocidade = 34,
  reverso = false,
  separador = '✳',
  className,
  compacto = false,
}: {
  itens: string[];
  /** segundos pra dar uma volta inteira — quanto maior, mais lento */
  velocidade?: number;
  reverso?: boolean;
  separador?: string;
  className?: string;
  compacto?: boolean;
}) {
  /* o trilho precisa do conteúdo duas vezes: o -50% cai exatamente na emenda */
  const trilho = [...itens, ...itens];

  return (
    <div
      className={cn('marquee relative w-full overflow-hidden border-y border-current select-none', className)}
      aria-hidden="true"
      data-pausa
    >
      <div className="marquee-trilho" data-dir={reverso ? 'reverso' : 'normal'} style={{ ['--vel' as string]: `${velocidade}s` }}>
        {trilho.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={cn(
              'zine-sub flex shrink-0 items-center gap-[clamp(14px,2vw,30px)] whitespace-nowrap',
              compacto ? 'py-[7px] pr-[clamp(14px,2vw,30px)]' : 'py-[clamp(9px,1.3vw,15px)] pr-[clamp(14px,2vw,30px)]',
            )}
          >
            {item}
            <span className="opacity-45">{separador}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
