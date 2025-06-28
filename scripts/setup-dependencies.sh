#!/bin/bash

# Script d'initialisation de la sécurité des dépendances
echo "🔧 Configuration de la sécurité des dépendances..."

# Audit de sécurité
echo "🔍 Audit de sécurité npm..."
npm audit

# Correction automatique des vulnérabilités
echo "🛠️ Correction automatique des vulnérabilités..."
npm audit fix

# Installation de npm-check-updates globalement (optionnel)
echo "📦 Installation de npm-check-updates..."
npm install -g npm-check-updates

echo "✅ Configuration terminée !"
echo ""
echo "📋 Commandes disponibles :"
echo "  npm run check-updates  - Vérifier les mises à jour disponibles"
echo "  npm run update-deps    - Mettre à jour toutes les dépendances"
echo "  npm audit              - Audit de sécurité"
echo "  npm audit fix          - Corriger les vulnérabilités"
