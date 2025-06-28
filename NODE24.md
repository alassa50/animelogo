# Configuration Node.js 24

Ce projet est optimisé pour Node.js 24 avec les dernières fonctionnalités et optimisations.

## 🚀 Fonctionnalités Node.js 24

### Performances

- **Turbopack** : Bundler stable de Next.js pour des builds ultra-rapides
- **ES2022 Target** : Utilise les dernières fonctionnalités JavaScript
- **Optimisation des imports** : Chargement optimisé des packages

### Scripts optimisés

```bash
# Développement avec Turbo (plus rapide)
npm run dev

# Vérification de type stricte
npm run type-check

# Lint avec correction automatique
npm run lint:fix

# Nettoyage des caches
npm run clean
```

## 📋 Prérequis

### Versions requises

- **Node.js**: ≥ 20.0.0 (recommandé: 24.x)
- **npm**: ≥ 9.0.0

### Vérification

```bash
# Vérifier la version de Node.js
node --version

# Utiliser la version recommandée avec nvm
nvm use
```

## ⚡ Optimisations

### TypeScript

- Target ES2022 pour les performances
- Vérifications strictes activées
- Résolution de modules optimisée

### Next.js

- Turbopack activé (bundler stable)
- Optimisation des packages
- Compression des images WebP/AVIF
- Optimisation des packages
- Compression des images WebP/AVIF

### CI/CD

- Tests sur Node.js 20, 22 et 24
- Auto-merge intelligent des dépendances
- Validation TypeScript stricte

## 🔧 Configuration

### Variables d'environnement (optionnel)

```bash
# .env.local
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1
```

### Extensions VSCode recommandées

- TypeScript et JavaScript
- Tailwind CSS IntelliSense
- ESLint
- Prettier

## 🐛 Dépannage

### Problèmes courants

1. **Cache Node.js** : `npm run clean`
2. **Types manquants** : `npm install @types/node@^24`
3. **Build lent** : Vérifier que `--turbo` est activé

### Performance

```bash
# Analyse des performances
npm run build
# Vérifier les temps de build et la taille des bundles
```
