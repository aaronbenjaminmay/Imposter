# Architecture

Imposter is a static, client-side-only React app. There is no backend,
no database, and no authentication — the entire game runs on one phone
passed between players in the same room.

## Why no server

The game only needs to track state for the players currently in the
room, on the one device in their hands. Nothing needs to be shared
across devices or persisted beyond a single sitting, so a server would
add infrastructure with no product benefit. See the Figma AI
Implementation Guide's "EXPLICIT CONSTRAINTS" section — no accounts,
no room codes, no networking.

## Deployment pipeline

```
Development                 Local Vite dev server (npm run dev)
     ↓
Production Build             Static Vite build (npm run build) → dist/
     ↓
GitHub                        Repository (main branch)
     ↓
GitHub Actions                 Install → typecheck → lint → test → build
     ↓
GitHub Pages                    Hosted static site at /Imposter/
```

Pushing to `main` triggers the GitHub Actions workflow
(`.github/workflows/deploy.yml`), which builds the app and publishes
`dist/` to GitHub Pages. There is no separate staging environment for
the MVP — `main` is the deployable branch.

## Why the `/Imposter/` base path

GitHub Pages serves a project site (as opposed to a user/org site) from
`https://<user>.github.io/<repo-name>/`, not from the domain root. Every
asset URL the built app references (JS, CSS, fonts, the manifest) has to
be prefixed with that path or they'll 404 in production while working
fine in local dev (which serves from `/`). `vite.config.ts` sets
`base: '/Imposter/'` for exactly this reason — see the comment there.

If the repository is ever renamed, this value has to be updated to
match. Vite applies this `base` to the dev server too, so local
development happens at `http://localhost:5173/Imposter/`, matching
production instead of diverging from it.

## Application structure

```
src/
├── components/   Reusable UI pieces mapped 1:1 to Figma components
├── game/         Game logic and data — word bank, round rules, no JSX
├── screens/      One component per Figma screen (see docs/GAME_RULES.md)
├── styles/       Design tokens (tokens.css) and global reset (global.css)
├── types/        Shared TypeScript types (Player, Screen, GameState)
└── App.tsx       Root component — owns current screen + game state
```

Game logic is kept out of `components/` and `screens/` on purpose (see
CLAUDE.md's Product Rules) — presentation and rules should be able to
change independently.

## State management

No external state library. `App.tsx` holds one `useReducer` (state shape
and action handling in `src/game/gameReducer.ts`), passing state and
dispatched callbacks down as props. Started as plain `useState` calls
directly in `App.tsx` during early screens; consolidated into a reducer
once the state genuinely got complex enough to need it (turn indices for
the role-reveal/clue/voting loops, vote tally, round outcome) — not
introduced preemptively. Reach for something heavier than this only if a
reducer genuinely stops being enough.

## Routing

No router. The "screens" in this app are not URL-addressable routes —
they're steps in a pass-the-phone game loop driven by game state, not
navigation history (see the Figma AI Implementation Guide's "COMPONENT
FLOW RELATIONSHIPS"). A `Screen` union type plus conditional rendering in
`App.tsx` is enough. Adding React Router would imply deep-linking and
back/forward semantics that this product deliberately doesn't want (e.g.
you shouldn't be able to hit "back" past a pass-phone privacy gate).

## Testing

No test framework is wired up yet — there's no application logic to test
until screens/game rules are implemented. When tests are added, the CI
workflow's "run tests" step should be un-skipped rather than added fresh.

## Home screen install

The app is installable to a phone's home screen (iOS "Add to Home
Screen", Android/Chrome's install prompt), launching in standalone mode
(no browser chrome) via `public/manifest.webmanifest` plus the
`apple-*`/`mobile-web-app-*` meta tags in `index.html`. This is a
product decision (not from Figma) — the icon set
(`favicon.svg`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`)
is all one design: the fingerprint asset on the app's dark canvas color
with the red accent ring, matching the in-app tap-to-reveal screen.
There's no service worker and no offline caching — installability only,
nothing beyond what "add to home screen" needs.
