# Weekend Checker

Un petit utilitaire qui répond à une seule question : est-ce le week-end selon l’heure locale de l’utilisateur ?

La règle est volontairement explicite : le week-end commence le vendredi à 12:00 et se termine le lundi à 00:00, dans le fuseau détecté par le navigateur.

## Fonctionnalités

- statut local et compte à rebours mis à jour chaque seconde ;
- fuseau et heure locale affichés ;
- calcul correct aux passages à l’heure d’été et d’hiver ;
- interface responsive, accessible et compatible avec la réduction des animations ;
- aucune authentification, base de données, télémétrie ou automatisation GitHub.

## Développement

```bash
pnpm install
pnpm dev
```

Vérifications disponibles :

```bash
pnpm test:run
pnpm exec tsc --noEmit
pnpm lint
pnpm build
```

## Architecture

- `lib/weekend.ts` contient les calculs purs de calendrier et de fuseau ;
- `lib/weekend.test.ts` couvre les bornes vendredi/lundi, plusieurs fuseaux et les changements d’heure ;
- `components/WeekendWidget.tsx` affiche le statut et le contexte local ;
- `app/globals.css` porte l’identité minimale inspirée de GitHub Dark.

## Principe d’intégrité

Weekend Checker ne crée aucun commit ni activité artificielle. Il peut être présenté comme une micro-expérience de date et de fuseau, pas comme un mécanisme de contribution GitHub.
