# Gestion des Dépendances

Ce projet utilise une gestion automatisée des mises à jour de dépendances via Dependabot et GitHub Actions.

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

Un workflow GitHub Actions (`.github/workflows/ci.yml`) :
- Exécute les tests sur chaque PR
- Vérifie le lint et le build
- **Auto-merge** les PRs Dependabot pour les mises à jour mineures/patches après validation des tests

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
