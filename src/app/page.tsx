"use client";

import AnimeLogoSimple from "../components/AnimeLogoSimple";
import AnimeLogo2 from "../components/AnimeLogo2";
import AnimeLogo from "../components/AnimeLogo";

// Composant Home optimisé avec une meilleure structure sémantique
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] p-8 sm:p-20 pb-20 min-h-screen font-[family-name:var(--font-geist-sans)]">
      <header className="row-start-1" />

      <main className="flex flex-col justify-center items-center gap-12 row-start-2">
        <section aria-label="Main anime logo animation">
          <AnimeLogoSimple />
        </section>

        <section aria-label="Main anime logo animation">
          <AnimeLogo2 />
        </section>

        <section aria-label="Secondary anime logo animation">
          <AnimeLogo
            text="Anime Logo 2"
            className="hover:scale-105 transition-transform duration-300 transform"
          />
        </section>
      </main>

      <footer className="row-start-3" />
    </div>
  );
}
