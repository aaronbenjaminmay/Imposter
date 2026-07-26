# CLAUDE.md

Operating contract for working on Imposter. Read this before making
changes; it takes precedence over ad-hoc judgment calls.

## Project overview

Imposter is a single-device, pass-the-phone party word game for 4–10
players (3 is allowed, no upper cap). One player is secretly the
Imposter; everyone else shares a secret word. Players pass one phone
around to privately view their role, give verbal clues, vote on who
they think the Imposter is, and reveal the result. Full behavior is in
`docs/GAME_RULES.md`.

- **Platform**: mobile web, one phone, no networking between devices.
- **Production hosting**: GitHub Pages, served from `/Imposter/`.
- **Out of scope for MVP**: accounts, login, profiles, matchmaking, room
  codes, invite links, chat, leaderboards, game history, persisted state
  across browser sessions, analytics, a CMS, a backend, a database.

## Source of truth hierarchy

When something is unclear or code and design disagree, resolve in this
order — do not silently pick one:

1. **Figma design system and product flow** (file `I5sIDhcLqnhAjNJkrcWvaN`)
2. **Figma AI Implementation Guide** (canvas "00 — AI Implementation Guide")
3. **This file (CLAUDE.md)**
4. **Source code**
5. **Developer assumptions** — lowest priority; flag instead of assuming

If code and Figma disagree: stop, name the discrepancy explicitly, and
resolve it against Figma (or ask) rather than quietly changing one to
match the other.

## Design system rules

Hierarchy: **Primitive → Semantic → Component → Screen**.

- Never invent a color when a Figma semantic token exists — check
  `docs/DESIGN_SYSTEM.md` / `src/styles/tokens.css` first.
- Never invent typography when a Figma Text Style exists.
- Never introduce arbitrary spacing when an existing spacing token fits.
- Prefer semantic tokens over primitives; prefer reusable components
  over one-off UI.
- Preserve component states/variants and Figma's visual hierarchy
  exactly — don't simplify a design to make it easier to code.
- Mobile-first is the primary implementation target; desktop is
  secondary and should not just be a scaled-up mobile layout.
- Don't introduce a visual style merely because it's convenient to
  implement.

## Component rules

- Components should correspond to the Figma component system
  (see `docs/DESIGN_SYSTEM.md`'s component table); name them to match.
- Variants/properties map to TypeScript props (discriminated unions or
  string-literal props, not loose booleans), not ad-hoc state.
- Don't duplicate a component that already exists — extend it.
- Don't build giant monolithic components; keep them composable.
- Keep game logic (`src/game/`, `src/types/`) separate from
  presentation (`src/components/`, `src/screens/`) — a theme change
  should never touch game rules, and a rule change should never require
  restyling.

## Product rules (do not infer from visual appearance alone)

These are behavioral requirements, not styling — see
`docs/GAME_RULES.md` for full detail:

- Pass-phone privacy gate before **every** private reveal or vote, no
  exceptions, no auto-advance.
- Secret word is visible only during a normal player's own reveal and
  on the final result screen — never during clues, voting, or the
  Imposter's guess.
- The Imposter never sees the secret word before the final reveal.
- Votes are private; no player sees another's vote before locking in
  their own; the vote-locked screen must not leak the previous vote.
- All votes stay hidden until everyone has voted, then reveal together.
- Ties trigger a re-vote, never a random tiebreak.
- A caught Imposter gets one final word guess (word hidden); correct
  guess flips the outcome to Imposter wins.
- "Play Again" keeps the player list and generates a new word/Imposter;
  "New Game" resets everything to `home`.
- Self-voting is allowed in this MVP (deliberate call — see
  `docs/GAME_RULES.md`).

## Accessibility rules

- Semantic HTML first (buttons are `<button>`, radio groups use radio
  semantics, ordered steps use `<ol>`, etc.).
- All interactive elements keyboard-operable with a visible focus state.
- Minimum 44px touch targets.
- Never communicate state (selected/current/completed/error) with color
  alone — always pair with a shape/icon/text change.
- Labels are persistent and visible — placeholder text is never a
  substitute for a label (Text Input's Figma spec calls this out
  explicitly, WCAG 1.3.1/3.3.2).
- Respect `prefers-reduced-motion`.

## Responsive rules

Primary target: **mobile portrait** (~390px). Secondary: tablet/desktop.
Don't just scale the mobile layout up indefinitely for larger
viewports — follow Figma's actual component guidance for how (or
whether) a screen adapts. When Figma hasn't specified desktop behavior,
say so rather than guessing a treatment.

## Code quality rules

- TypeScript `strict` is on (`tsconfig.app.json`) — keep it on, avoid
  `any`, avoid non-null assertions except where the DOM API genuinely
  guarantees non-null (e.g. `document.getElementById('root')!`).
- No unnecessary abstractions — three similar lines beats a premature
  helper. Don't build for hypothetical future requirements.
- No duplicated logic — if the same rule shows up twice, it belongs in
  `src/game/`.
- Keep dependencies minimal; justify any new one against what Vite/React
  already provide.
- Lint with `oxlint` (`npm run lint`); keep it clean.
- Add tests as real game logic (`src/game/`) is built — nothing to test
  yet at scaffold stage.

## Git rules

- GitHub (`aaronbenjaminmay/Imposter`) is the canonical repository;
  `main` is the deployable branch.
- Keep commits focused and descriptive; don't bundle unrelated changes.
- Never commit secrets, credentials, or `.env` files containing them.
- Keep build artifacts (`dist/`) out of git — already in `.gitignore`.
- Run `git status` before any change that could discard uncommitted
  work.
- Run typecheck + lint (+ tests, once they exist) before committing
  anything non-trivial.
- Don't rewrite history or force-push without explicit instruction.

## Working with Figma

Figma is the source of truth for visuals, tokens, typography,
components, states, interaction intent, responsive behavior, and
product flow — not just a reference image. Before implementing or
changing any screen or component, inspect the live Figma node via MCP
rather than working from memory or an old screenshot. If the design
seems to have a problem, flag it — don't quietly "improve" it.
