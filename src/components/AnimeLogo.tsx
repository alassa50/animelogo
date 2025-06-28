"use client";

import { animate } from "animejs";
import { useEffect, useRef, useCallback } from "react";

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

export default function AnimatedLogo({
  text,
  className = "",
}: AnimatedLogoProps) {
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
