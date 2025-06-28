# Gestion des Dépendances

Ce projet utilise une gestion automatisée des mises à jour de dépendances via Dependabot et GitHub Actions.

## 📦 **Dépendances Actuelles**

### Dépendances de Production

- **animejs**: ^4.0.2 - Library d'animations JavaScript
- **next**: 15.3.4 - Framework React full-stack
- **react**: ^19.1.0 - Library UI
- **react-dom**: ^19.1.0 - Renderer DOM pour React

### Dépendances de Développement

- **@eslint/eslintrc**: ^3 - Configuration ESLint
- **@tailwindcss/postcss**: ^4 - PostCSS pour Tailwind
- **@types/node**: ^24 - Types TypeScript pour Node.js
- **@types/react**: ^19 - Types TypeScript pour React
- **@types/react-dom**: ^19 - Types TypeScript pour React DOM
- **eslint**: ^9 - Linter JavaScript/TypeScript
- **eslint-config-next**: 15.3.4 - Configuration ESLint pour Next.js
- **postcss**: ^8 - Processeur CSS
- **tailwindcss**: ^3 - Framework CSS utility-first
- **typescript**: ^5 - Superset typé de JavaScript

## 🤖 Dependabot

Dependabot est configuré pour :

- Vérifier les mises à jour **chaque lundi à 9h00 (heure de Paris)**
- Créer des PRs groupées pour les mises à jour mineures et patches
- Limiter à **5 PRs ouvertes** simultanément
- Ajouter des labels automatiques (`dependencies`, `javascript`)

### Configuration

La configuration se trouve dans `.github/dependabot.yml` et surveille :

- Les dépendances npm/yarn
- Les GitHub Actions

### Mises à jour ignorées

Par défaut, les mises à jour majeures de React sont ignorées pour éviter les breaking changes.

## 🔄 Workflow CI/CD

Deux workflows GitHub Actions :

### `ci.yml` - Tests et validation

- Exécute les tests sur chaque PR
- Vérifie le lint et le build
- Teste sur Node.js 18 et 20
- Audit de sécurité automatique
- **Auto-approve** les PRs Dependabot après validation des tests

### `dependabot.yml` - Auto-merge intelligent

- **Auto-merge automatique** uniquement pour les mises à jour mineures et patches
- Les mises à jour majeures nécessitent une validation manuelle
- Utilise l'action officielle `dependabot/fetch-metadata` pour plus de fiabilité

## 📋 Scripts disponibles

### Vérification manuelle des mises à jour

```bash
npm run check-updates
```

### Mise à jour manuelle des dépendances

```bash
npm run update-deps
```

⚠️ **Attention** : Cette commande met à jour toutes les dépendances, y compris les versions majeures.

## 🛡️ Sécurité

- Les mises à jour de sécurité sont prioritaires
- Les tests automatiques valident chaque mise à jour
- Les mises à jour majeures nécessitent une validation manuelle

## 📝 Personnalisation

Pour modifier la configuration :

1. **Fréquence** : Modifier `schedule.interval` dans `dependabot.yml`
2. **Reviewers** : Ajouter vos collaborateurs dans la section `reviewers`
3. **Auto-merge** : Désactiver en supprimant le job `auto-merge-dependabot`

## 🔍 Monitoring

Consultez l'onglet "Insights > Dependency graph > Dependabot" de votre repo GitHub pour suivre l'activité des mises à jour.
