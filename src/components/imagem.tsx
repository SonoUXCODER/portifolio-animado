import type { CSSProperties } from "react";
import { asset } from "@/lib/base-path";

/**
 * `<img>` puro, com o basePath aplicado.
 *
 * O export é estático, então `next/image` roda com `unoptimized: true`: ele não
 * gera tamanho nenhum, não serve formato nenhum, e mesmo assim ia junto no
 * bundle. Largura, altura e `loading` nativos dão o mesmo resultado visual (sem
 * pulo de layout, carregando fora da tela) sem o componente.
 */
export default function Imagem({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  style,
  onClick,
  ...resto
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
} & Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "width" | "height" | "style" | "onClick">) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(src)}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={className}
      style={style}
      onClick={onClick}
      {...resto}
    />
  );
}
