// Types pour Anime.js avec TypeScript strict
declare module "animejs" {
  export interface AnimeParams {
    targets?: string | Element | Element[] | NodeList | string[];
    duration?: number;
    delay?: number | ((el: Element, i: number) => number);
    easing?: string;
    translateY?:
      | number
      | number[]
      | Array<{
          value: number | number[];
          duration?: number;
          delay?: number;
          easing?: string;
          endDelay?: number;
        }>;
    translateX?: number | number[];
    scale?: number | number[];
    opacity?:
      | number
      | number[]
      | { value: number | number[]; duration?: number };
    rotate?:
      | number
      | string
      | number[]
      | { value: number | string; duration?: number };
    scaleX?:
      | number
      | number[]
      | Array<{
          value: number | number[];
          duration?: number;
          delay?: number;
          easing?: string;
        }>
      | { value: number; delay?: number; duration?: number; easing?: string };
    scaleY?:
      | number
      | number[]
      | Array<{
          value: number | number[];
          duration?: number;
          delay?: number;
          easing?: string;
        }>
      | { value: number; delay?: number; duration?: number; easing?: string };
    strokeDashoffset?: unknown[];
    transformOrigin?: string | string[];
    loop?: boolean | number;
    autoplay?: boolean;
    direction?: "normal" | "reverse" | "alternate";
    begin?: (anim: AnimeInstance) => void;
    complete?: () => void;
    update?: () => void;
    change?: (anim: AnimeInstance) => void;
    endDelay?: number;
    d?: (el: HTMLElement) => string;
    // Permettre d'autres propriétés CSS
    [key: string]: unknown;
  }

  export interface AnimeTimeline {
    add(params: AnimeParams, offset?: string | number): AnimeTimeline;
  }

  export interface AnimeInstance {
    play(): AnimeInstance;
    pause(): AnimeInstance;
    restart(): AnimeInstance;
    reverse(): AnimeInstance;
    seek(time: number): AnimeInstance;
    finished: Promise<void>;
    animatables: Array<{ target: Element }>;
  }

  export interface AnimeStatic {
    (params: AnimeParams): AnimeInstance;
    timeline(params?: {
      autoplay?: boolean;
      easing?: string;
      loop?: boolean;
    }): AnimeTimeline;
    set(
      targets: string | Element | Element[] | NodeList | string[],
      params: Record<string, unknown>
    ): void;
    path(path: string): (property: string) => number;
    stagger(
      value: number,
      options?: { from?: string | number }
    ): (el: Element, i: number) => number;
    setDashoffset: unknown;
  }

  export function animate(
    targets: string | Element | Element[] | NodeList,
    params?: AnimeParams
  ): AnimeInstance;

  const anime: AnimeStatic;
  export default anime;
}
