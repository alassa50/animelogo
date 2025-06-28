"use client";

import { animate } from "animejs";
import { useEffect, useRef } from "react";

function AnimatedLogo({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const letters = ref.current.querySelectorAll(".anime-letter");
      if (!letters.length) return;

      // Masquer toutes les lettres au début
      letters.forEach((el) => {
        (el as HTMLElement).style.opacity = "0";
      });

      // Vérifier que la première lettre existe
      const firstLetter = letters[0];
      if (!firstLetter) return;

      // Animation de la première lettre (tombe du haut)
      animate(firstLetter, {
        translateY: [-window.innerHeight, 0],
        opacity: [0, 1],
        easing: "easeOutBounce",
        duration: 900,
        complete: () => {
          // Vague sur chaque lettre (y compris la première)
          animate(Array.from(letters), {
            translateY: [0, -32, 0],
            opacity: [1, 1, 1],
            delay: (el, i) => i * 120,
            duration: 2000,
            easing: "easeInOutQuad",
            begin: () => {
              // Affiche chaque lettre juste avant sa vague
              letters.forEach((el, i) => {
                setTimeout(() => {
                  (el as HTMLElement).style.opacity = "1";
                }, i * 120);
              });
            },
            loop: false,
            complete: () => {
              if (ref.current) {
                animate(ref.current, {
                  scale: [1, 1.15],
                  duration: 600,
                  easing: "easeOutExpo",
                });
              }
            },
          });
        },
      });
    }
  }, [text]);

  return (
    <div ref={ref} className="flex gap-1 mb-8 select-none">
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 drop-shadow-lg font-extrabold text-transparent text-5xl anime-letter"
          style={{ marginRight: char === " " ? 12 : 0 }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="justify-items-center items-center gap-16 grid grid-rows-[20px_1fr_20px] p-8 sm:p-20 pb-20 min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center sm:items-start gap-[32px] row-start-2">
        <AnimatedLogo text="Anime Logo 2" />
      </main>
    </div>
  );
}
