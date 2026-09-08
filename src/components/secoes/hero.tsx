"use client";

import { m as motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { LinhasQueSobem } from "@/components/animacoes";
import { SITE } from "@/content/site";
import type { Dictionary } from "@/content/types";
import { asset } from "@/lib/base-path";
import { useMediaQuery, useMontado, usePointerFino, useMovimentoReduzido } from "@/lib/hooks";
import { DUR, EASE_STANDARD, TRANSITION } from "@/lib/motion";

const MOLA = { stiffness: 80, damping: 20, mass: 0.6 } as const;

function useHoraLocal() {
  const [hora, setHora] = useState<string | null>(null);
  useEffect(() => {
    const formato = new Intl.DateTimeFormat("en-GB", {
      timeZone: SITE.timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const atualizar = () => setHora(formato.format(new Date()));
    atualizar();
    const id = window.setInterval(atualizar, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return hora;
}

export default function Hero({ t, country }: { t: Dictionary["hero"]; country: string }) {
  const secao = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reduzido = useMovimentoReduzido();
  const fino = usePointerFino();
  const largo = useMediaQuery("(min-width: 768px)");
  const montado = useMontado();
  const hora = useHoraLocal();
  const comVideo = montado && !reduzido;

  const mascara = largo
    ? "radial-gradient(ellipse 80% 70% at 55% 45%, #000 15%, transparent 78%)"
    : "radial-gradient(ellipse 130% 55% at 50% 38%, #000 10%, transparent 82%)";

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const inclinaX = useSpring(useTransform(px, [-0.5, 0.5], [10, -10]), MOLA);
  const inclinaY = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), MOLA);

  const { scrollYProgress } = useScroll({ target: secao, offset: ["start start", "end start"] });
  const yVideo = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacidadeVideo = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  const escalaTitulo = useTransform(scrollYProgress, [0, 1], [1, 1.34]);
  const yTitulo = useTransform(scrollYProgress, [0, 1], [0, -190]);
  const opacidadeTitulo = useTransform(scrollYProgress, [0, 0.52, 1], [1, 1, 0]);
  const yLead = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const xLead = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const opacidadeLead = useTransform(scrollYProgress, [0, 0.55, 1], [1, 1, 0]);
  const yBase = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacidadeBase = useTransform(scrollYProgress, [0, 0.45, 1], [1, 1, 0]);

  /* autoplay que alguns navegadores só liberam depois de um toque */
  useEffect(() => {
    if (!comVideo || !video.current) return;
    let pronto = false;
    const desistir = () => {
      if (pronto) return;
      pronto = true;
      window.removeEventListener("pointerdown", tentar);
      window.removeEventListener("touchstart", tentar);
    };
    function tentar() {
      video.current?.play().then(desistir, () => {});
    }
    tentar();
    window.addEventListener("pointerdown", tentar, { passive: true });
    window.addEventListener("touchstart", tentar, { passive: true });
    return desistir;
  }, [comVideo]);

  useEffect(() => {
    if (!fino || reduzido) return;
    const alvo = secao.current;
    if (!alvo) return;
    const aoMover = (evento: PointerEvent) => {
      const caixa = alvo.getBoundingClientRect();
      px.set((evento.clientX - caixa.left) / caixa.width - 0.5);
      py.set((evento.clientY - caixa.top) / caixa.height - 0.5);
    };
    alvo.addEventListener("pointermove", aoMover, { passive: true });
    return () => alvo.removeEventListener("pointermove", aoMover);
  }, [fino, reduzido, px, py]);

  const linhas: [string, string][] = [
    [t.productsLabel, String(SITE.shipped)],
    [t.basedIn, `${SITE.city}, ${country}`],
    [t.languages, t.languagesValue],
    [t.localTime, hora ?? "--:--"],
  ];

  return (
    <section
      ref={secao}
      id="hero"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-clip pb-[var(--space-7)] pt-[calc(var(--header-h)+var(--space-7))]"
    >
      {comVideo && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={reduzido ? undefined : { y: yVideo, opacity: opacidadeVideo }}
        >
          <video
            ref={video}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: largo ? 0.14 : 0.18, maskImage: mascara, WebkitMaskImage: mascara }}
            src={asset("/video/hero.mp4")}
            autoPlay
            muted
            loop
            playsInline
            disableRemotePlayback
            preload="metadata"
          />
        </motion.div>
      )}

      <div className="shell relative w-full py-[var(--space-8)]">
        <motion.div
          style={
            reduzido
              ? undefined
              : {
                  y: yTitulo,
                  scale: escalaTitulo,
                  opacity: opacidadeTitulo,
                  transformOrigin: "left top",
                  ...(fino ? { rotateX: inclinaX, rotateY: inclinaY } : {}),
                }
          }
        >
          <LinhasQueSobem
            id="hero-title"
            lines={t.lines}
            as="h1"
            className="display-hero"
            immediate
            cinema
            delay={0.25}
          />
        </motion.div>

        <div className="grid-12 mt-[var(--space-8)] gap-y-[var(--space-6)]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...TRANSITION, delay: 0.55 }}
            className="col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-7"
            {...(reduzido ? {} : { style: { y: yLead, x: xLead, opacity: opacidadeLead } })}
          >
            <p className="lead">{t.lead}</p>
            <p className="body-sm mt-[var(--space-4)] flex gap-[var(--space-3)]">
              <span aria-hidden style={{ color: "var(--accent)" }}>
                ↳
              </span>
              {t.proof}
            </p>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DUR.slow, delay: 0.7 }}
        className="shell relative w-full"
        {...(reduzido ? {} : { style: { y: yBase, opacity: opacidadeBase } })}
      >
        <dl
          className="grid grid-cols-2 gap-x-[var(--space-5)] gap-y-[var(--space-5)] border-t pt-[var(--space-4)] sm:grid-cols-4"
          style={{ borderColor: "var(--line)" }}
        >
          {linhas.map(([rotulo, valor]) => (
            <div key={rotulo}>
              <dt className="label label--dim">{rotulo}</dt>
              <dd className="mt-[var(--space-2)] text-[clamp(0.9rem,1.1vw,1.05rem)]">{valor}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-[var(--space-5)] flex items-baseline justify-between gap-[var(--space-4)]">
          <span className="label label--dim">{t.scroll}</span>
          <motion.span
            aria-hidden
            className="label"
            animate={reduzido ? undefined : { y: [0, 9, 0, 0], opacity: [1, 1, 1, 0.45] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: EASE_STANDARD, times: [0, 0.35, 0.6, 1] }}
          >
            ↓
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}
