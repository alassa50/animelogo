import React, { useEffect, useRef, useCallback } from "react";
import { animate } from "animejs";
import * as animeLib from "animejs";
import "./AnimeLogo.css";

/**
 * INTÉGRATION ANIME.JS V4 - IMPLÉMENTATION FINALE
 *
 * Cette implémentation utilise l'import moderne d'animejs v4 :
 * - `import { animate }` pour les animations principales
 * - Import namespace pour les fonctionnalités avancées (timeline, stagger)
 *
 * Changements par rapport à l'ancienne API :
 * - anime.set() → animate() avec duration: 0
 * - anime.timeline() → animeUtils.createTimeline()
 * - anime.stagger() → animeUtils.stagger()
 *
 * Compatibilité : ✅ TypeScript, ✅ Next.js 15, ✅ SSR
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const animeUtils = animeLib as any;

// Types pour Anime.js
interface AnimeInstance {
  play(): AnimeInstance;
  pause(): AnimeInstance;
  restart(): AnimeInstance;
  reverse(): AnimeInstance;
  seek(time: number): AnimeInstance;
  finished: Promise<void>;
  animatables: Array<{ target: Element }>;
}

// Type pour la timeline - sera défini dynamiquement
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnimeTimeline = any;

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
  const timelineRef = useRef<AnimeTimeline | null>(null);

  // Animation principale optimisée
  const createAnimeTimeline = useCallback(() => {
    if (!containerRef.current) return;

    // Configuration initiale des éléments avec animate
    animate(".letter-a", { translateX: 70, duration: 0 });
    animate(".letter-n", { translateX: 70, duration: 0 });
    animate(".letter-i", { translateX: 70, duration: 0 });
    animate(".letter-e", { translateX: -70, duration: 0 });
    animate(".dot", { translateX: 630, translateY: -200, duration: 0 });

    const animeTimeline = animeUtils
      .createTimeline({
        autoplay: true,
        easing: ANIME_CONFIG.TIMELINE_EASING,
        loop: true,
      })
      // Animation 1: Préparation ligne i
      .add(
        {
          targets: ".letter-i .line",
          duration: 0,
          begin(anim: AnimeInstance) {
            const target = anim.animatables[0]?.target as HTMLElement;
            if (target?.removeAttribute) {
              target.removeAttribute("stroke-dasharray");
            }
          },
        },
        0
      )
      // Animation 2: Rebond des lettres
      .add(
        {
          targets: ".bounced",
          transformOrigin: ["50% 100% 0px", "50% 100% 0px"],
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
          delay: animeUtils.stagger(ANIME_CONFIG.STAGGER_DELAY),
        },
        1000
      )
      // Animation 3: Point qui apparaît
      .add(
        {
          targets: ".dot",
          opacity: { value: 1, duration: 100 },
          translateY: 250,
          scaleY: [4, 0.7],
          scaleX: { value: 1.3, delay: 100, duration: 200 },
          duration: 280,
          easing: "cubicBezier(0.350, 0.560, 0.305, 1)",
        },
        "-=290"
      )
      // Animation 4: Transformation lettre M
      .add(
        {
          targets: ".letter-m .line",
          easing: "easeOutElastic(1, .8)",
          duration: ANIME_CONFIG.ELASTIC_DURATION,
          d(el: HTMLElement) {
            return (
              (el as HTMLElement & { dataset: { d2?: string } }).dataset.d2 ||
              ""
            );
          },
          begin(anim: AnimeInstance) {
            const target = anim.animatables[0]?.target as HTMLElement;
            if (target?.removeAttribute) {
              target.removeAttribute("stroke-dasharray");
            }
          },
        },
        "-=140"
      )
      // Animation 5: Glissement des lettres
      .add(
        {
          targets: [".letter-a", ".letter-n", ".letter-i", ".letter-e"],
          translateX: 0,
          easing: "easeOutElastic(1, .6)",
          duration: 800,
          delay: animeUtils.stagger(40, { from: 2.5 }),
          change(anim: AnimeInstance) {
            const target = anim.animatables[2]?.target as HTMLElement;
            if (target?.removeAttribute) {
              target.removeAttribute("stroke-dasharray");
            }
          },
        },
        "-=600"
      )
      // Animation 6: Finalisation lettre M
      .add(
        {
          targets: ".letter-m .line",
          d(el: HTMLElement) {
            return (
              (el as HTMLElement & { dataset: { d3?: string } }).dataset.d3 ||
              ""
            );
          },
          easing: "spring(.2, 200, 3, 60)",
        },
        "-=680"
      )
      // Animation 7: Point qui rebondit
      .add(
        {
          targets: ".dot",
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
        },
        "-=1273"
      )
      // Animation 8: Stabilisation du point
      .add(
        {
          targets: ".dot",
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
        },
        "-=474"
      )
      // Animation 9: Transformation finale lettre I
      .add(
        {
          targets: ".letter-i .line",
          transformOrigin: ["50% 100% 0", "50% 100% 0"],
          d(el: HTMLElement) {
            return (
              (el as HTMLElement & { dataset: { d2?: string } }).dataset.d2 ||
              ""
            );
          },
          easing: "cubicBezier(0.400, 0.530, 0.070, 1)",
          duration: 80,
        },
        "-=670"
      )
      // Animation 10: Animation des lettres
      .add(
        {
          targets: ".logo-letter",
          translateY: [
            { value: 40, duration: 150, easing: "easeOutQuart" },
            { value: 0, duration: 800, easing: "easeOutElastic(1, .5)" },
          ],
          strokeDashoffset: [animeUtils.setDashoffset, 0],
          delay: animeUtils.stagger(60, { from: "center" }),
        },
        "-=670"
      )
      // Animation 11: Finalisation rebonds
      .add(
        {
          targets: ".bounced",
          scaleY: [
            { value: 0.4, duration: 150, easing: "easeOutQuart" },
            { value: 0.5, duration: 800, easing: "easeOutElastic(1, .5)" },
          ],
          delay: animeUtils.stagger(60, { from: "center" }),
        },
        "-=1090"
      );

    timelineRef.current = animeTimeline;
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
        createAnimeTimeline();

        return cleanupResize;
      } catch (error) {
        console.error("Error initializing animation:", error);
        return undefined;
      }
    };

    const cleanup = initAnimation();

    return () => {
      // Nettoyage
      if (timelineRef.current) {
        try {
          // Utiliser any pour accéder à la méthode pause si elle existe
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const timeline = timelineRef.current as any;
          if (timeline.pause) {
            timeline.pause();
          }
        } catch (error) {
          console.warn("Error pausing timeline:", error);
        }
      }
      cleanup?.();
    };
  }, [fitElementToParent, createAnimeTimeline]);

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
