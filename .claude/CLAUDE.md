# CLAUDE.md

Ce fichier fournit des instructions à Claude Code pour ce projet.

---

## grepai - OBLIGATOIRE

**Tu DOIS utiliser les commandes CLI grepai pour TOUTE recherche de code.**

- ❌ INTERDIT : Grep, Glob, grep, find, rg, outils MCP grepai
- ✅ OBLIGATOIRE : `grepai search "query"` via Bash

Voir `~/.claude/CLAUDE.md` pour les instructions complètes.

---

## A propos du projet

**Weekend Checker** - Application simple pour vérifier si c'est le weekend.

## Commandes de développement

```bash
pnpm dev          # Serveur de développement
pnpm build        # Compilation production
pnpm start        # Serveur production
pnpm lint         # ESLint
pnpm test         # Tests unitaires (Vitest) - watch mode
pnpm test:run     # Tests unitaires - une fois
```

---

## Architecture

### Stack technique

- **Framework** : Next.js 16 avec App Router
- **Langage** : TypeScript (ES modules)
- **Styling** : TailwindCSS v4
- **Tests** : Vitest + Testing Library
- **Package Manager** : pnpm

