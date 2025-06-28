"use client";

import { animate } from "animejs";
import { useEffect, useRef, useCallback } from "react";
import AnimeLogoSimple from "../components/AnimeLogoSimple";
import AnimeLogo2 from "../components/AnimeLogo2";

// Types pour les propriétés du composant
interface AnimatedLogoProps {
  text: string;
  className?: string;
}

// Configuration des animations centralisée
const ANIMATION_CONFIG = {
  DROP_DURATION: 900,
  WAVE_DURATION: 2000,
  WAVE_DELAY: 120,
  SCALE_DURATION: 600,
  DROP_HEIGHT: -800, // Valeur fixe pour éviter l'erreur window côté serveur
} as const;

function AnimatedLogo({ text, className = "" }: AnimatedLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Fonction pour masquer les lettres initialement
  const hideLetters = useCallback((letters: NodeListOf<Element>) => {
    letters.forEach((el) => {
      const element = el as HTMLElement;
      element.style.opacity = "0";
      element.style.transform = "translateY(0px)";
    });
  }, []);

  // Animation de la première lettre
  const animateFirstLetter = useCallback(
    (letter: Element, onComplete: () => void) => {
      animate(letter, {
        translateY: [ANIMATION_CONFIG.DROP_HEIGHT, 0],
        opacity: [0, 1],
        easing: "easeOutBounce",
        duration: ANIMATION_CONFIG.DROP_DURATION,
        complete: onComplete,
      });
    },
    []
  );

  // Animation de vague pour toutes les lettres
  const animateWave = useCallback(
    (letters: Element[], container: HTMLElement) => {
      animate(Array.from(letters), {
        translateY: [0, -32, 0],
        opacity: [1, 1, 1],
        delay: (_, i) => i * ANIMATION_CONFIG.WAVE_DELAY,
        duration: ANIMATION_CONFIG.WAVE_DURATION,
        easing: "easeInOutQuad",
        begin: () => {
          // Révéler progressivement chaque lettre
          letters.forEach((el, i) => {
            setTimeout(() => {
              (el as HTMLElement).style.opacity = "1";
            }, i * ANIMATION_CONFIG.WAVE_DELAY);
          });
        },
        loop: false,
        complete: () => {
          // Animation finale du conteneur
          animate(container, {
            scale: [1, 1.15, 1],
            duration: ANIMATION_CONFIG.SCALE_DURATION,
            easing: "easeOutExpo",
          });
        },
      });
    },
    []
  );

  // Effet principal d'animation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const letters = container.querySelectorAll(".anime-letter");
    if (!letters.length) return;

    // Nettoyer les animations précédentes si nécessaire
    const cleanup = () => {
      letters.forEach((el) => {
        const element = el as HTMLElement;
        element.style.transform = "";
        element.style.opacity = "";
      });
    };

    // Initialiser
    hideLetters(letters);

    const firstLetter = letters[0];
    if (!firstLetter) return cleanup;

    // Séquence d'animations
    animateFirstLetter(firstLetter, () => {
      animateWave(Array.from(letters), container);
    });

    // Cleanup au démontage
    return cleanup;
  }, [text, hideLetters, animateFirstLetter, animateWave]);

  return (
    <div
      ref={containerRef}
      className={`flex gap-1 mb-8 select-none ${className}`}
      role="banner"
      aria-label={`Animated logo displaying: ${text}`}
    >
      {text.split("").map((char, i) => (
        <span
          key={`${char}-${i}`} // Clé plus unique pour éviter les collisions
          className="inline-block bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 drop-shadow-lg font-extrabold text-transparent text-5xl transition-all duration-300 anime-letter"
          style={{
            marginRight: char === " " ? 12 : 0,
            willChange: "transform, opacity", // Optimisation GPU
          }}
          aria-hidden="true" // Les lettres individuelles ne sont pas importantes pour l'accessibilité
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}

// Composant Home optimisé avec une meilleure structure sémantique
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] p-8 sm:p-20 pb-20 min-h-screen font-[family-name:var(--font-geist-sans)]">
      <header className="row-start-1" />

      <main className="flex flex-col justify-center items-center gap-12 row-start-2">
        {/* Composant principal avec animation sophistiquée */}
        <section aria-label="Main anime logo animation">
          <AnimeLogoSimple />
        </section>
        <section aria-label="Main anime logo animation">
          <AnimeLogo2 />
        </section>
        {/* Composant secondaire avec animation de vague */}
        <section aria-label="Secondary anime logo animation">
          <AnimatedLogo
            text="Anime Logo 2"
            className="hover:scale-105 transition-transform duration-300 transform"
          />
        </section>
      </main>

      <footer className="row-start-3" />
    </div>
  );
}
