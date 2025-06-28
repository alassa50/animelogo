import React, { useEffect, useRef, useCallback } from "react";
import { animate } from "animejs";
import "./AnimeLogo.css";

/**
 * INTÉGRATION ANIME.JS V4 - VERSION SIMPLIFIÉE
 *
 * Cette implémentation utilise uniquement l'import moderne d'animejs v4 :
 * - `import { animate }` pour toutes les animations
 * - Implémentation personnalisée pour remplacer timeline et stagger
 *
 * Changements par rapport à l'ancienne API :
 * - anime.set() → animate() avec duration: 0
 * - anime.timeline() → séquence d'animations avec setTimeout
 * - anime.stagger() → calcul manuel des délais
 *
 * Compatibilité : ✅ TypeScript, ✅ Next.js 15, ✅ SSR
 */

// Helper pour créer un effet stagger personnalisé
const createStagger = (delay: number, options?: { from?: string | number }) => {
  return (index: number, total: number) => {
    if (options?.from === "center") {
      const center = Math.floor(total / 2);
      return Math.abs(index - center) * delay;
    }
    if (typeof options?.from === "number") {
      return Math.abs(index - options.from) * delay;
    }
    return index * delay;
  };
};

// Interface pour le composant
interface AnimeLogoProps {
  className?: string;
}

// Configuration des animations
const ANIME_CONFIG = {
  TIMELINE_EASING: "easeOutSine",
  BOUNCE_DURATION: 190,
  ELASTIC_DURATION: 600,
  STAGGER_DELAY: 80,
  LOGO_SCALE_DELAY: 10,
} as const;

const AnimeLogo: React.FC<AnimeLogoProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout[]>([]);

  // Animation principale optimisée avec seulement animate()
  const createAnimeSequence = useCallback(() => {
    if (!containerRef.current) return;

    // Nettoyer les timeouts précédents
    animationTimeoutRef.current.forEach((timeout) => clearTimeout(timeout));
    animationTimeoutRef.current = [];

    // Configuration initiale des éléments avec animate
    animate(".letter-a", { translateX: 70, duration: 0 });
    animate(".letter-n", { translateX: 70, duration: 0 });
    animate(".letter-i", { translateX: 70, duration: 0 });
    animate(".letter-e", { translateX: -70, duration: 0 });
    animate(".dot", { translateX: 630, translateY: -200, duration: 0 });

    // Séquence d'animations remplaçant la timeline
    let currentTime = 0;

    // Animation 1: Préparation ligne i (0ms)
    const timeout1 = setTimeout(() => {
      const lineEl = document.querySelector(".letter-i .line") as HTMLElement;
      if (lineEl?.removeAttribute) {
        lineEl.removeAttribute("stroke-dasharray");
      }
    }, currentTime);
    animationTimeoutRef.current.push(timeout1);

    // Animation 2: Rebond des lettres (1000ms)
    currentTime = 1000;
    const timeout2 = setTimeout(() => {
      const bouncedElements = document.querySelectorAll(".bounced");
      bouncedElements.forEach((el, index) => {
        const staggerDelay = createStagger(ANIME_CONFIG.STAGGER_DELAY)(
          index,
          bouncedElements.length
        );

        animate(el, {
          transformOrigin: "50% 100% 0px",
          translateY: [
            {
              value: [150, -160],
              duration: ANIME_CONFIG.BOUNCE_DURATION,
              endDelay: 20,
              easing: "cubicBezier(0.225, 1, 0.915, 0.980)",
            },
            { value: 4, duration: 120, easing: "easeInQuad" },
            { value: 0, duration: 120, easing: "easeOutQuad" },
          ],
          scaleX: [
            {
              value: [0.25, 0.85],
              duration: ANIME_CONFIG.BOUNCE_DURATION,
              easing: "easeOutQuad",
            },
            { value: 1.08, duration: 120, delay: 85, easing: "easeInOutSine" },
            { value: 1, duration: 260, delay: 25, easing: "easeOutQuad" },
          ],
          scaleY: [
            { value: [0.3, 0.8], duration: 120, easing: "easeOutSine" },
            { value: 0.35, duration: 120, delay: 180, easing: "easeInOutSine" },
            { value: 0.57, duration: 180, delay: 25, easing: "easeOutQuad" },
            { value: 0.5, duration: 190, delay: 15, easing: "easeOutQuad" },
          ],
          delay: staggerDelay,
        });
      });
    }, currentTime);
    animationTimeoutRef.current.push(timeout2);

    // Animation 3: Point qui apparaît (710ms)
    currentTime = 1000 - 290;
    const timeout3 = setTimeout(() => {
      animate(".dot", {
        opacity: { value: 1, duration: 100 },
        translateY: 250,
        scaleY: [4, 0.7],
        scaleX: { value: 1.3, delay: 100, duration: 200 },
        duration: 280,
        easing: "cubicBezier(0.350, 0.560, 0.305, 1)",
      });
    }, currentTime);
    animationTimeoutRef.current.push(timeout3);

    // Animation 4: Transformation lettre M (860ms)
    currentTime = 1000 - 140;
    const timeout4 = setTimeout(() => {
      animate(".letter-m .line", {
        easing: "easeOutElastic(1, .8)",
        duration: ANIME_CONFIG.ELASTIC_DURATION,
        d(el: HTMLElement) {
          return (
            (el as HTMLElement & { dataset: { d2?: string } }).dataset.d2 || ""
          );
        },
        begin() {
          const target = document.querySelector(
            ".letter-m .line"
          ) as HTMLElement;
          if (target?.removeAttribute) {
            target.removeAttribute("stroke-dasharray");
          }
        },
      });
    }, currentTime);
    animationTimeoutRef.current.push(timeout4);

    // Animation 5: Glissement des lettres (400ms)
    currentTime = 1000 - 600;
    const timeout5 = setTimeout(() => {
      const letters = document.querySelectorAll(
        ".letter-a, .letter-n, .letter-i, .letter-e"
      );
      letters.forEach((el, index) => {
        const staggerDelay = createStagger(40, { from: 2.5 })(
          index,
          letters.length
        );

        animate(el, {
          translateX: 0,
          easing: "easeOutElastic(1, .6)",
          duration: 800,
          delay: staggerDelay,
          change() {
            if (index === 2) {
              // letter-i
              const target = document.querySelector(
                ".letter-i .line"
              ) as HTMLElement;
              if (target?.removeAttribute) {
                target.removeAttribute("stroke-dasharray");
              }
            }
          },
        });
      });
    }, currentTime);
    animationTimeoutRef.current.push(timeout5);

    // Animation 6: Finalisation lettre M (320ms)
    currentTime = 1000 - 680;
    const timeout6 = setTimeout(() => {
      animate(".letter-m .line", {
        d(el: HTMLElement) {
          return (
            (el as HTMLElement & { dataset: { d3?: string } }).dataset.d3 || ""
          );
        },
        easing: "spring(.2, 200, 3, 60)",
      });
    }, currentTime);
    animationTimeoutRef.current.push(timeout6);

    // Animation 7: Point qui rebondit (-273ms, donc immédiatement)
    currentTime = 1000 - 1273;
    if (currentTime < 0) currentTime = 0;
    const timeout7 = setTimeout(() => {
      animate(".dot", {
        translateX: 430,
        translateY: [
          { value: 244, duration: 100 },
          { value: 40, duration: 200, delay: 130 },
          { value: 210, duration: 225, easing: "easeOutQuad", delay: 25 },
        ],
        rotate: { value: "1turn", duration: 790 },
        scaleX: { value: 1, duration: 50, easing: "easeOutSine" },
        scaleY: [
          { value: [1, 1.5], duration: 50, easing: "easeInSine" },
          { value: 1, duration: 50, easing: "easeOutExpo" },
        ],
        easing: "cubicBezier(0, .74, 1, .255)",
        duration: 800,
      });
    }, currentTime);
    animationTimeoutRef.current.push(timeout7);

    // Animation 8: Stabilisation du point (526ms)
    currentTime = 1000 - 474;
    const timeout8 = setTimeout(() => {
      animate(".dot", {
        scale: 1,
        rotate: "1turn",
        scaleY: { value: 0.5, duration: 150, delay: 230 },
        translateX: 430,
        translateY: [
          { value: 244, duration: 100 },
          { value: 204, duration: 200, delay: 130 },
          { value: 224, duration: 225, easing: "easeOutQuad", delay: 25 },
        ],
        duration: 200,
        easing: "easeOutSine",
      });
    }, currentTime);
    animationTimeoutRef.current.push(timeout8);

    // Animation 9: Transformation finale lettre I (330ms)
    currentTime = 1000 - 670;
    const timeout9 = setTimeout(() => {
      animate(".letter-i .line", {
        transformOrigin: "50% 100% 0",
        d(el: HTMLElement) {
          return (
            (el as HTMLElement & { dataset: { d2?: string } }).dataset.d2 || ""
          );
        },
        easing: "cubicBezier(0.400, 0.530, 0.070, 1)",
        duration: 80,
      });
    }, currentTime);
    animationTimeoutRef.current.push(timeout9);

    // Animation 10: Animation des lettres (330ms)
    const timeout10 = setTimeout(() => {
      const logoLetters = document.querySelectorAll(".logo-letter");
      logoLetters.forEach((el, index) => {
        const staggerDelay = createStagger(60, { from: "center" })(
          index,
          logoLetters.length
        );
        const pathElement = el.querySelector("path") as SVGPathElement;

        animate(el, {
          translateY: [
            { value: 40, duration: 150, easing: "easeOutQuart" },
            { value: 0, duration: 800, easing: "easeOutElastic(1, .5)" },
          ],
          strokeDashoffset: [pathElement?.getTotalLength?.() || 0, 0],
          delay: staggerDelay,
        });
      });
    }, currentTime);
    animationTimeoutRef.current.push(timeout10);

    // Animation 11: Finalisation rebonds (-90ms, donc immédiatement)
    currentTime = 1000 - 1090;
    if (currentTime < 0) currentTime = 0;
    const timeout11 = setTimeout(() => {
      const bouncedElements = document.querySelectorAll(".bounced");
      bouncedElements.forEach((el, index) => {
        const staggerDelay = createStagger(60, { from: "center" })(
          index,
          bouncedElements.length
        );

        animate(el, {
          scaleY: [
            { value: 0.4, duration: 150, easing: "easeOutQuart" },
            { value: 0.5, duration: 800, easing: "easeOutElastic(1, .5)" },
          ],
          delay: staggerDelay,
        });
      });
    }, currentTime);
    animationTimeoutRef.current.push(timeout11);

    // Redémarrer l'animation après un délai
    const restartTimeout = setTimeout(() => {
      createAnimeSequence();
    }, 5000);
    animationTimeoutRef.current.push(restartTimeout);
  }, []);

  // Fonction pour ajuster la taille
  const fitElementToParent = useCallback(
    (el: HTMLElement, padding: number = 0, exception?: string) => {
      let timeout: NodeJS.Timeout | null = null;

      const resize = () => {
        if (timeout) clearTimeout(timeout);

        animate(el, { scale: 1, duration: 0 });
        if (exception) animate(exception, { scale: 1, duration: 0 });

        const parentEl = el.parentNode as HTMLElement;
        if (!parentEl) return;

        const elOffsetWidth = el.offsetWidth - padding;
        const parentOffsetWidth = parentEl.offsetWidth;
        const ratio = parentOffsetWidth / elOffsetWidth;
        const invertedRatio = elOffsetWidth / parentOffsetWidth;

        if (exception) {
          const exceptionEl = document.querySelector(exception) as HTMLElement;
          if (exceptionEl) {
            exceptionEl.setAttribute("width", String(el.offsetWidth * ratio));
          }
        }

        timeout = setTimeout(() => {
          animate(el, { scale: ratio, duration: 0 });
          if (exception)
            animate(exception, { scale: invertedRatio, duration: 0 });
        }, ANIME_CONFIG.LOGO_SCALE_DELAY);
      };

      // Attendre un peu avant de faire le premier resize
      setTimeout(() => resize(), 100);

      const resizeHandler = () => resize();
      window.addEventListener("resize", resizeHandler);

      return () => {
        if (timeout) clearTimeout(timeout);
        window.removeEventListener("resize", resizeHandler);
      };
    },
    []
  );

  // Effet principal
  useEffect(() => {
    const initAnimation = () => {
      try {
        const logoAnimationEl = containerRef.current?.querySelector(
          ".logo-animation__wrapper"
        ) as HTMLElement;

        if (!logoAnimationEl) {
          console.warn("Logo animation element not found");
          return;
        }

        // Initialiser les animations
        const cleanupResize = fitElementToParent(
          logoAnimationEl,
          0,
          ".bounce svg"
        );
        createAnimeSequence();

        return cleanupResize;
      } catch (error) {
        console.error("Error initializing animation:", error);
        return undefined;
      }
    };

    const cleanup = initAnimation();

    return () => {
      // Nettoyage
      animationTimeoutRef.current.forEach((timeout) => clearTimeout(timeout));
      animationTimeoutRef.current = [];
      cleanup?.();
    };
  }, [fitElementToParent, createAnimeSequence]);

  return (
    <div
      ref={containerRef}
      className={`main-logo ${className}`}
      role="banner"
      aria-label="Animated anime logo"
    >
      <div className="logo-animation">
        <div className="logo-animation__wrapper">
          <div className="anime-logo">
            <div className="anime-logo__signs">
              <div className="logo-letter letter-a">
                <svg
                  className="bounced"
                  viewBox="0 0 200 240"
                  width="200"
                  height="240"
                  aria-hidden="true"
                >
                  <path
                    className="line"
                    d="M30 20h130c9.996 0 10 40 10 60v140H41c-11.004 0-11-40-11-60s-.004-60 10-60h110"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="logo-letter letter-n">
                <svg
                  className="bounced"
                  viewBox="0 0 200 240"
                  width="200"
                  height="240"
                  aria-hidden="true"
                >
                  <path
                    className="line"
                    d="M170 220V60c0-31.046-8.656-40-19.333-40H49.333C38.656 20 30 28.954 30 60v160"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="logo-letter letter-i">
                <svg
                  className="bounced"
                  viewBox="0 0 60 240"
                  width="60"
                  height="240"
                  aria-hidden="true"
                >
                  <path
                    className="line"
                    d="M30 20v200"
                    data-d2="M30 100v120"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="logo-letter letter-m">
                <svg
                  className="bounced"
                  viewBox="0 0 340 240"
                  width="340"
                  height="240"
                  fill="none"
                  fillRule="evenodd"
                  aria-hidden="true"
                >
                  <path
                    className="line"
                    d="M240,220 L240,60 C240,28.954305 231.344172,20 220.666667,20 C171.555556,20 254.832031,20 170,20 C85.1679688,20 168.444444,20 119.333333,20 C108.655828,20 100,28.954305 100,60 L100,220"
                    data-d2="M310,220 L310,60 C310,28.954305 301.344172,20 290.666667,20 C241.555556,20 254.832031,110 170,110 C85.1679688,110 98.4444444,20 49.3333333,20 C38.6558282,20 30,28.954305 30,60 L30,220"
                    data-d3="M310,220 L310,60 C310,28.954305 301.344172,20 290.666667,20 C241.555556,20 254.832031,20 170,20 C85.1679688,20 98.4444444,20 49.3333333,20 C38.6558282,20 30,28.954305 30,60 L30,220"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="logo-letter letter-e">
                <svg
                  className="bounced"
                  viewBox="0 0 200 240"
                  width="200"
                  height="240"
                  aria-hidden="true"
                >
                  <path
                    className="line"
                    d="M50 140h110c10 0 10-40 10-60s0-60-10-60H40c-10 0-10 40-10 60v80c0 20 0 60 10 60h130"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="bounce">
                <svg
                  viewBox="0 0 600 260"
                  width="600"
                  height="260"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M630,240 C630,111.154418 608.971354,40 530.160048,40 C451.348741,40 430,127.460266 430,210"
                    stroke="transparent"
                  />
                </svg>
                <div
                  className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full w-4 h-4 dot"
                  style={{ willChange: "transform, opacity" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeLogo;
