# Design System Mapping

Source of truth: Figma file "Imposter — Party Word Game MVP"
(`I5sIDhcLqnhAjNJkrcWvaN`), canvases "00 — Design System" and
"02 — Components". This document maps that system onto the code in
`src/styles/tokens.css` and (eventually) `src/components/`.

Hierarchy, both in Figma and in code: **Primitive → Semantic →
Component → Screen**. Components must consume semantic tokens, never
primitives or hardcoded values. See CLAUDE.md's Design System Rules.

## Color tokens

| Figma semantic token | Value | Code variable |
|---|---|---|
| `color/background/primary` | `#121216` | `--color-background-primary` |
| `color/background/secondary` | `#18181E` | `--color-background-secondary` |
| `color/background/inverse` | `#FFFFFF` | `--color-background-inverse` |
| `color/text/primary` | `#FFFFFF` | `--color-text-primary` |
| `color/text/secondary` | `#A1A1AA` | `--color-text-secondary` |
| `color/text/tertiary` | `#52525B` | `--color-text-tertiary` |
| `color/text/on-action` | `#FFFFFF` | `--color-text-on-action` |
| `color/action/primary` | `#FF3B30` | `--color-action-primary` |
| `color/action/primary-hover` | `#E6352B` | `--color-action-primary-hover` |
| `color/feedback/success` | `#22C55E` | `--color-feedback-success` |
| `color/feedback/warning` | `#EAB308` | `--color-feedback-warning` |
| `color/feedback/error` | `#FF3B30` | `--color-feedback-error` |
| `color/game/imposter` | `#FF3B30` | `--color-game-imposter` |
| `color/game/word` | `#FFFFFF` | `--color-game-word` |
| `color/border/default` | `#52525B` | `--color-border-default` |

`color/border/default` is referenced throughout the component docs but
wasn't swatched as its own token frame in Figma — its value was inferred
from the stroke color used consistently on Text Input, Vote Option, and
Number Chip borders (`#52525B`). TODO: confirm with an explicit Figma
swatch if one gets added later.

## Typography

Two families, per Figma's "typography-architecture" frame:
- **Outfit** (display family) — headings, titles, button labels, nav titles.
- **Geist** (body family) — body text, inputs, labels, captions.

| Figma Text Style | Family / weight / size | Code variables (`--text-*`) |
|---|---|---|
| Display | Outfit Black 72 | `display-*` |
| Heading XL | Outfit ExtraBold 64 | `heading-xl-*` |
| Heading LG | Outfit ExtraBold 56 | `heading-lg-*` |
| Heading MD | Outfit ExtraBold 40 | `heading-md-*` |
| Heading SM | Outfit ExtraBold 32 | `heading-sm-*` |
| Heading XS | Outfit ExtraBold 28 | `heading-xs-*` |
| Title | Outfit ExtraBold 24 | `title-*` |
| Nav Title | Outfit SemiBold 20 | `nav-title-*` |
| Body LG | Geist Regular 20 | `body-lg-*` |
| Body MD | Geist Regular 16 | `body-md-*` |
| Body SM | Geist Regular 14 | `body-sm-*` |
| Label LG | Outfit Bold 16 | `label-lg-*` |
| Label MD | Geist Medium 16 | `label-md-*` |
| Label SM | Geist Medium 14 | `label-sm-*` |
| Overline | Geist SemiBold 16, 3px tracking | `overline-*` |
| Caption | Geist Regular 13 | `caption-*` |

Each maps to a `size` / `weight` / `line-height` (and `tracking` where
Figma specifies it) trio of CSS variables in `tokens.css`. Fonts are
loaded via Google Fonts in `index.html` (Outfit + Geist are both
published there) rather than self-hosted, to avoid bundling font files
for an MVP.

## Spacing & radius

| Figma token | Value | Code variable |
|---|---|---|
| `space/component/xs` | 4px | `--space-component-xs` |
| `space/component/sm` | 8px | `--space-component-sm` |
| `space/component/md` | 12px | `--space-component-md` |
| `space/component/lg` | 16px | `--space-component-lg` |
| `space/component/xl` | 24px | `--space-component-xl` |
| `space/section/md` | 24px | `--space-section-md` |
| `space/section/lg` | 32px | `--space-section-lg` |
| `space/page/gutter` | 24px | `--space-page-gutter` |
| `radius/control` | 28px | `--radius-control` |
| `radius/card` | 16px | `--radius-card` |
| `radius/chip` | 20px | `--radius-chip` |
| `radius/input` | 12px | `--radius-input` |
| `radius/modal` | 24px | `--radius-modal` |
| `radius/pill` | 100px | `--radius-pill` |
| `button/padding-y` | 18px | `--button-padding-y` |
| `button/padding-x` | 24px | `--button-padding-x` |
| `input/padding-y` | 16px | `--input-padding-y` |
| `input/padding-x` | 16px | `--input-padding-x` |
| `card/padding` | 18px | `--card-padding` |

## Components

None of these are implemented in code yet — this table is the
implementation checklist. Fill in the "Code component" column as each
one is built, following its Figma variants/states exactly.

| Figma component | Variants / states | Purpose | Code component (TODO) |
|---|---|---|---|
| Button | Primary, Secondary | Dominant CTA vs. supporting action | `components/Button.tsx` |
| Text Input | Default, Focused, Filled | Player name entry, Imposter's word guess | `components/TextInput.tsx` |
| Player Row | Default, Current, Completed, Pending | Clue-phase turn tracker | `components/PlayerRow.tsx` |
| Vote Option | Default, Selected | Private vote selection (radio) | `components/VoteOption.tsx` |
| Number Chip | Default, Selected | Player-count selector | `components/NumberChip.tsx` |
| Player Chip | — | Removable name pill on player-names screen | `components/PlayerChip.tsx` |
| Screen Header | — | Title + supporting text, reused across screens | `components/ScreenHeader.tsx` |
| Pass Phone Prompt | — | The privacy-gate screen body | `components/PassPhonePrompt.tsx` |
| Status Bar / Home Indicator | — | Phone-chrome decoration only, not product logic | Skip — not a real product component |

Props/variants should map to a discriminated union or string-literal
prop (e.g. `variant: 'primary' | 'secondary'`), not booleans per state,
so invalid combinations are unrepresentable. TODO: finalize each
component's prop shape when it's actually built, against the live
Figma node (don't guess from this table alone).

## Screens

| Figma frame (`02 — Core Flow`) | Section | Code screen (TODO) |
|---|---|---|
| `home` | SETUP | `screens/Home.tsx` |
| `how-to-play` | SETUP | `screens/HowToPlay.tsx` |
| `player-count` | SETUP | `screens/PlayerCount.tsx` |
| `player-names` | SETUP | `screens/PlayerNames.tsx` |
| `pass-phone` | ROLE REVEAL | `screens/PassPhone.tsx` (shared with voting, see below) |
| `tap-to-reveal` | ROLE REVEAL | `screens/TapToReveal.tsx` |
| `word-reveal-normal` | ROLE REVEAL | `screens/WordReveal.tsx` |
| `imposter-reveal` | ROLE REVEAL | `screens/ImposterReveal.tsx` |
| `everyone-ready` | ROLE REVEAL | `screens/EveryoneReady.tsx` |
| `clue-phase` | GAMEPLAY | `screens/CluePhase.tsx` |
| `ready-to-vote` | GAMEPLAY | `screens/ReadyToVote.tsx` |
| `vote-pass-phone` | VOTING | reuses `PassPhone.tsx` |
| `vote-selection` | VOTING | `screens/VoteSelection.tsx` |
| `vote-locked` | VOTING | `screens/VoteLocked.tsx` |
| `votes-are-in` | VOTING | `screens/VotesAreIn.tsx` |
| `vote-reveal` | RESULTS | `screens/VoteReveal.tsx` |
| `imposter-guess` | RESULTS | `screens/ImposterGuess.tsx` |
| `final-result` | RESULTS | `screens/FinalResult.tsx` |

`pass-phone` and `vote-pass-phone` are visually and behaviorally the
same component (per the AI Implementation Guide's "Pass Phone Screen"
doc) — TODO: confirm during implementation whether one shared
`PassPhone` screen parameterized by "what happens next" fully covers
both Figma frames, or whether they've diverged enough to need to stay
separate.

## Game flow

See `docs/GAME_RULES.md` for the full state-progression diagram — it's
the same content, framed around behavior rather than the Figma→code
table.

## Not yet mapped

`01 — Foundations` and `03 — States` canvases were confirmed (by
project owner) to be visual restatements of what's already captured
above (Design System + Components canvases) — no unique content to
extract from them.
