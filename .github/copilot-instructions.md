<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# 🎯 Instructions Copilot - Projet AnimeLogo

## 📋 Contexte du Projet

Ce projet est un template Next.js avec Tailwind CSS et une démo d'animation Anime.js sur le texte "Anime Logo".

## 🔧 Règles de Développement Strictes

### Anime.js - Version 4 Uniquement

- **OBLIGATOIRE** : Utiliser exclusivement Anime.js v4.0.2 ou supérieur
- **Import requis** : `import { animate } from "animejs";`
- **Interdiction** : Ne jamais utiliser les versions v3.x ou antérieures d'Anime.js
- **Syntaxe** : Utiliser la nouvelle syntaxe v4 avec la fonction `animate()` directement
- **Types** : Utiliser les types personnalisés définis dans `src/types/animejs.d.ts`

### TypeScript - Mode Strict Obligatoire

- **Langue unique** : Tout le code doit être écrit en TypeScript (.tsx/.ts)
- **Configuration** : Respecter les règles strictes du `tsconfig.json`
- **Types** : Typage explicite requis pour toutes les variables et fonctions
- **Interdiction** : Jamais d'utilisation de `any` ou de types implicites
- **Interfaces** : Définir des interfaces pour tous les props de composants

### Architecture Next.js 15.3.4

- **App Router** : Utiliser exclusivement le nouveau App Router (pas de Pages Router)
- **Composants** : "use client" requis pour les composants avec animations
- **Structure** : Respecter l'architecture `src/app/` et `src/components/`
- **Turbopack** : Utiliser `npm run dev` avec Turbopack activé

### Styling - Tailwind CSS Uniquement

- **Framework CSS** : Utiliser exclusivement Tailwind CSS v4
- **Classes** : Privilégier les classes utilitaires Tailwind
- **Responsive** : Utiliser les breakpoints Tailwind (sm:, md:, lg:, xl:)
- **Gradients** : Utiliser les classes gradient Tailwind pour les effets visuels
- **Animations CSS** : Combiner avec les animations Anime.js

### Composants React - Bonnes Pratiques

- **Hooks** : Utiliser `useRef` pour les références DOM avec Anime.js
- **useEffect** : Gérer le cycle de vie des animations dans useEffect
- **Cleanup** : Nettoyer les animations dans le cleanup de useEffect
- **Performance** : Mémoriser les refs et éviter les re-renders inutiles

### Gestion des Animations

- **Initialisation** : Masquer les éléments avant animation (opacity: 0)
- **Timing** : Utiliser des délais appropriés entre les animations
- **Easing** : Privilégier les easings naturels (easeOutElastic, easeInOutQuad)
- **Loops** : Gérer les animations en boucle avec la propriété `loop: true`
- **Cleanup** : Arrêter les animations lors du démontage du composant

### Structure des Fichiers

- **Composants** : Placer dans `src/components/` avec nommage PascalCase
- **Types** : Définir dans `src/types/` pour les types personnalisés
- **Styles** : Utiliser Tailwind dans le JSX, CSS personnalisé dans `/components/`
- **Assets** : Placer dans `public/` pour les ressources statiques

### Bonnes Pratiques de Code

- **Nommage** : Variables et fonctions en camelCase, composants en PascalCase
- **Accessibility** : Ajouter les attributs ARIA appropriés
- **SEO** : Utiliser les balises sémantiques HTML5
- **Performance** : Optimiser les animations pour 60fps
- **Responsivité** : Tester sur mobile et desktop

### Outils de Développement

- **ESLint** : Respecter les règles de linting configurées
- **Scripts** : Utiliser les scripts npm définis dans package.json
- **Build** : Tester avec `npm run build` avant deployment
- **Types** : Vérifier avec `npm run type-check`

### Exemples de Code Conformes

```typescript
// ✅ Correct - Anime.js v4 avec TypeScript strict
import { animate } from "animejs";

const MyComponent: React.FC = () => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    animate(elementRef.current, {
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 800,
      easing: "easeOutElastic(1, .6)",
    });
  }, []);

  return (
    <div ref={elementRef} className="text-6xl font-black">
      Text
    </div>
  );
};
```

### Interdictions Strictes

- ❌ Utilisation d'Anime.js v3 ou antérieur
- ❌ Code JavaScript (.js/.jsx) - TypeScript uniquement
- ❌ Types `any` ou implicites
- ❌ CSS-in-JS ou styled-components
- ❌ Pages Router de Next.js
- ❌ Composants de classe React
- ❌ Imports par défaut d'Anime.js
