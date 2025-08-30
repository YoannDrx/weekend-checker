# Weekend Checker 🎉

Une application web qui répond à la question essentielle : **"C'est bientôt le week-end ?"**

## 📖 Description

Cette application affiche **OUI** 🎉 dès le vendredi à 12:00 (heure locale) jusqu'au lundi 00:00, sinon elle affiche **PAS ENCORE** ⏰ avec un compte à rebours jusqu'au prochain vendredi 12:00.

### ✨ Fonctionnalités

- **Détection intelligente du week-end** : Vendredi 12:00 → Lundi 00:00
- **Mise à jour en temps réel** : Actualisation chaque seconde
- **Dark mode automatique** : S'adapte aux préférences système
- **Interface responsive** : Optimisée pour mobile et desktop
- **Accessibilité complète** : Sémantique HTML, ARIA, contrastes
- **Commits automatiques quotidiens** : Via GitHub Actions

## 🚀 Installation

```bash
# Cloner le projet
git clone https://github.com/votre-username/weekend-checker.git
cd weekend-checker

# Installer les dépendances
yarn install

# Lancer en développement
yarn dev
```

L'application sera disponible sur [http://localhost:3000](http://localhost:3000)

## 🧪 Tests

```bash
# Lancer les tests une fois
yarn test:run

# Lancer les tests en mode watch
yarn test

# Lancer le linting
yarn lint

# Construire pour la production
yarn build
```

## 🏗️ Architecture

```
weekend-checker/
├── app/                    # Pages Next.js (App Router)
│   ├── page.tsx           # Page principale
│   └── globals.css        # Styles globaux + Tailwind
├── components/             # Composants React
│   └── WeekendWidget.tsx  # Composant principal (client)
├── lib/                   # Logique métier
│   ├── weekend.ts         # Fonctions pures de calcul
│   └── weekend.test.ts    # Tests unitaires
├── .github/workflows/     # GitHub Actions
│   └── daily-commit.yml   # Workflow commit quotidien
└── daily-log.txt          # Log des commits automatiques
```

## 🧮 Logique de calcul

La logique est entièrement dans `lib/weekend.ts` avec des fonctions pures :

- `isWeekend(date)` : Vérifie si on est en période week-end
- `getNextFriday(date)` : Calcule le prochain vendredi 12:00
- `getWeekendEnd(date)` : Calcule la fin du week-end (lundi 00:00)
- `getTimeRemaining(from, to)` : Calcule le temps restant
- `formatTimeRemaining(time)` : Formate l'affichage

## 📅 Exemples de comportement

| Date/Heure | Statut | Description |
|------------|--------|-------------|
| Vendredi 11:59:59 | **PAS ENCORE** | Compte à rebours vers 12:00 |
| Vendredi 12:00:00 | **OUI** 🎉 | Week-end commence |
| Samedi (toute la journée) | **OUI** 🎉 | Plein week-end |
| Dimanche 23:59:59 | **OUI** 🎉 | Dernière minute |
| Lundi 00:00:00 | **PAS ENCORE** | Week-end terminé |

## 🔧 Technologies

- **[Next.js 15](https://nextjs.org)** (App Router) + TypeScript
- **[Tailwind CSS v4](https://tailwindcss.com)** (design + dark mode)
- **[Vitest](https://vitest.dev)** + Testing Library (tests)
- **[GitHub Actions](https://github.com/features/actions)** (automation)
- **Aucune librairie de dates** (uniquement `Date` et `Intl` natifs)

## 🤖 Automation

L'application inclut un workflow GitHub Actions qui :
- S'exécute quotidiennement à 12:00 UTC
- Ajoute une entrée dans `daily-log.txt`
- Commit automatiquement avec l'email `action@github.com`
- Maintient l'activité du dépôt pour les contributions GitHub

## 🎨 Dark Mode

Le dark mode est géré automatiquement via :
- CSS custom properties dans `globals.css`
- `@media (prefers-color-scheme: dark)`
- Classes Tailwind adaptatives

## ♿ Accessibilité

- Structure HTML sémantique (`<main>`, `<h1>`)
- Attributs ARIA (`role="timer"`, `aria-live="polite"`)
- Contrastes de couleurs respectant WCAG
- Textes alternatifs pour les emojis

## 🚀 Déploiement

```bash
# Construction optimisée
yarn build

# Démarrage en production
yarn start
```

L'application peut être déployée sur :
- [Vercel](https://vercel.com) (recommandé)
- [Netlify](https://netlify.com)
- Tout hébergeur supportant Next.js

## 🤝 Contribuer

1. Fork le projet
2. Créer une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit vos changements (`git commit -am 'Ajouter une nouvelle fonctionnalité'`)
4. Push la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
