# Anime Logo Next.js Demo

Ce projet est un template Next.js avec Tailwind CSS et une démo d'animation utilisant Anime.js sur le texte "Anime Logo".

## Démarrage

### Prérequis

- Node.js ≥ 20.0.0 (recommandé: 24.x)
- npm ≥ 9.0.0

Installez les dépendances :

```bash
npm install
```

Lancez le serveur de développement :

```bash
npm run dev
```

> ⚡ **Turbopack activé** : Builds ultra-rapides avec le bundler stable de Next.js

Ouvrez [http://localhost:3000](http://localhost:3000) pour voir la démo.

## Fonctionnalités

- Next.js (App Router, TypeScript) avec **Turbopack**
- Tailwind CSS
- Animation du texte "Anime Logo" avec Anime.js
- **Gestion automatique des dépendances** avec Dependabot
- **Optimisé pour Node.js 24** (ES2022, performances)

## 🔄 Gestion des Dépendances

Ce projet utilise une gestion automatisée des mises à jour :

### Scripts disponibles

```bash
# Vérifier les mises à jour disponibles
npm run check-updates

# Mettre à jour toutes les dépendances
npm run update-deps

# Audit de sécurité
npm audit
```

### Configuration automatique

- **Dependabot** : Mises à jour hebdomadaires automatiques
- **GitHub Actions** : Tests automatiques sur chaque PR
- **Auto-merge** : Fusion automatique des mises à jour mineures après validation

📖 Voir [DEPENDENCIES.md](./DEPENDENCIES.md) pour plus de détails.
📖 Voir [NODE24.md](./NODE24.md) pour la configuration Node.js 24.

## Fichier principal à modifier

- `src/app/page.tsx`

## Dépendances principales

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Anime.js](https://animejs.com)
