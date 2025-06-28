// Types pour Anime.js avec TypeScript strict
declare module "animejs" {
  export interface AnimeParams {
    targets?: string | Element | Element[] | NodeList;
    duration?: number;
    delay?: number | ((el: Element, i: number) => number);
    easing?: string;
    translateY?: number | number[];
    translateX?: number | number[];
    scale?: number | number[];
    opacity?: number | number[];
    rotate?: number | number[];
    loop?: boolean | number;
    direction?: "normal" | "reverse" | "alternate";
    autoplay?: boolean;
    begin?: () => void;
    complete?: () => void;
    update?: () => void;
    // Permettre d'autres propriétés CSS
    [key: string]: unknown;
  }

  export interface AnimeInstance {
    play(): AnimeInstance;
    pause(): AnimeInstance;
    restart(): AnimeInstance;
    reverse(): AnimeInstance;
    seek(time: number): AnimeInstance;
    finished: Promise<void>;
  }

  export function animate(
    targets: string | Element | Element[] | NodeList,
    params?: AnimeParams
  ): AnimeInstance;

  export default function anime(params: AnimeParams): AnimeInstance;
}
