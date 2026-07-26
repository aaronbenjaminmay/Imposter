# Imposter

Imposter is a single-device, pass-the-phone party word game. One player
is secretly the Imposter; everyone else shares a secret word. Pass the
phone, reveal roles privately, give verbal clues, vote, and find out who
was lying.

Full game rules: [`docs/GAME_RULES.md`](docs/GAME_RULES.md)
Architecture & deployment: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
Design system mapping: [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md)
Project rules for contributors (including AI agents): [`CLAUDE.md`](CLAUDE.md)

## Stack

React + TypeScript + Vite, static client-side only — no backend, no
database, no accounts. Deployed to GitHub Pages via GitHub Actions.

## Development

```sh
npm install
npm run dev
```

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Local dev server with HMR |
| `npm run build` | Type-check and produce a production build in `dist/` |
| `npm run lint` | Lint with oxlint |
| `npm run preview` | Preview the production build locally |
