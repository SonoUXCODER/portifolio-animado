"use client";

import { useEffect } from "react";

/**
 * Marca o que está fora da tela (e a aba escondida) para o CSS pausar
 * animações. Um `IntersectionObserver` só, sem ouvinte de rolagem.
 */
export default function PausaForaDeTela() {
  useEffect(() => {
    const alvos = document.querySelectorAll<HTMLElement>("[data-pause]");
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          (e.target as HTMLElement).dataset.visible = e.isIntersecting ? "1" : "0";
        }
      },
      { rootMargin: "200px 0px" },
    );
    for (const alvo of alvos) {
      alvo.dataset.visible = "0";
      observador.observe(alvo);
    }

    const aoTrocarAba = () => {
      document.documentElement.dataset.tabHidden = document.hidden ? "1" : "0";
    };
    aoTrocarAba();
    document.addEventListener("visibilitychange", aoTrocarAba);

    return () => {
      observador.disconnect();
      document.removeEventListener("visibilitychange", aoTrocarAba);
    };
  }, []);

  return null;
}
