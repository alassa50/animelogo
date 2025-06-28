import React, { useEffect, useRef } from "react";
import { animate } from "animejs";

const AnimeLogo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const letters = containerRef.current.querySelectorAll(".anime-letter");
    if (!letters.length) return;

    // Masquer toutes les lettres au début
    letters.forEach((el) => {
      (el as HTMLElement).style.opacity = "0";
      (el as HTMLElement).style.transform = "translateY(50px)";
    });

    // Animation séquentielle des lettres
    const animateLetters = () => {
      Array.from(letters).forEach((letter, index) => {
        setTimeout(() => {
          animate(letter, {
            translateY: [50, 0],
            opacity: [0, 1],
            scale: [0.8, 1.1, 1],
            duration: 800,
            easing: "easeOutElastic(1, .6)",
            complete: () => {
              // Animation de rebond continu
              animate(letter, {
                translateY: [0, -10, 0],
                duration: 1000,
                easing: "easeInOutQuad",
                loop: true,
                direction: "alternate",
              });
            },
          });
        }, index * 150);
      });
    };

    // Délai initial puis démarrage de l'animation
    setTimeout(animateLetters, 500);

    // Animation de pulsation continue du conteneur
    setTimeout(() => {
      if (containerRef.current) {
        animate(containerRef.current, {
          scale: [1, 1.02, 1],
          duration: 3000,
          easing: "easeInOutSine",
          loop: true,
        });
      }
    }, 2000);
  }, []);

  return (
    <div ref={containerRef} className="anime-logo-container">
      <div className="flex justify-center items-center gap-2 select-none">
        {"ANIME".split("").map((char, i) => (
          <span
            key={i}
            className="inline-block bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 drop-shadow-2xl font-black text-transparent text-6xl md:text-8xl anime-letter"
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              textShadow: "0 0 20px rgba(168, 85, 247, 0.4)",
            }}
          >
            {char}
          </span>
        ))}
        <span className="inline-block ml-2 text-4xl md:text-6xl anime-letter">
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg shadow-purple-500/50 rounded-full w-4 h-4 animate-pulse" />
        </span>
      </div>
    </div>
  );
};

export default AnimeLogo;
