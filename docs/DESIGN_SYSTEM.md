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
| _(unnamed — see note below)_ | `#08080A` | `--color-background-canvas` |
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

**Discrepancy — screen background color**: the Design System canvas swatch
labels `#121216` as `background/primary`, "Main app background." But every
screen frame in "02 — Core Flow" (all 18, via the shared `EL-fe301294`
template) actually fills with `#08080A`; `#121216` only shows up on
elevated cards/rows *within* a screen (how-to-play step rows, the
final-result summary card, the giant tap-to-reveal circle). Resolved by
adding `--color-background-canvas` (`#08080A`) for the true outer screen
background and keeping `--color-background-primary` (`#121216`) for
elevated surfaces — matching actual screen usage over the swatch label.
Flagging in case the swatch label is what's actually stale.

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

This table is the implementation checklist for named Figma components.
Status reflects what's actually built, not aspirational.

| Figma component | Variants / states | Purpose | Code component | Status |
|---|---|---|---|---|
| Button | Primary, Secondary | Dominant CTA vs. supporting action | `components/Button.tsx` | ✅ |
| Text Input | Default, Focused, Filled | Player name entry, Imposter's word guess | `components/TextInput.tsx` | ✅ |
| Player Row | Default, Current, Completed, Pending | Clue-phase turn tracker | `components/PlayerRow.tsx` | ✅ |
| Vote Option | Default, Selected | Private vote selection (radio) | `components/VoteOption.tsx` | ✅ |
| Number Chip | Default, Selected | Player-count selector | `components/NumberChip.tsx` | ✅ |
| Player Chip | — | Removable name pill on player-names screen | `components/PlayerChip.tsx` | ✅ |
| Screen Header | — | Title + supporting text, reused across screens | `components/ScreenHeader.tsx` | TODO |
| Pass Phone Prompt | — | The privacy-gate screen body | Not separately instantiated — the actual `pass-phone`/`vote-pass-phone` screens use their own composition (`screens/PassPhone.tsx`), not this component | N/A |
| Status Bar / Home Indicator | — | Phone-chrome decoration only, not product logic | Skip — not a real product component | N/A |

Props/variants should map to a discriminated union or string-literal
prop (e.g. `variant: 'primary' | 'secondary'`), not booleans per state,
so invalid combinations are unrepresentable. TODO: finalize each
component's prop shape when it's actually built, against the live
Figma node (don't guess from this table alone).

### Code-only components (not named Figma components)

These aren't in the Components canvas as reusable components, but the
same frame structure repeats verbatim across enough Core Flow screens
that duplicating it per-screen would violate the "don't duplicate"
rule. Extracted once actual repetition was confirmed, not speculatively.

| Component | Figma pattern | Confirmed on |
|---|---|---|
| `components/ScreenShell.tsx` | Root frame template `EL-fe301294` (full-height column, space-between, `#08080A` fill) | All 18 Core Flow screens |
| `components/NavHeader.tsx` | Recurring "screen-header" frame (back arrow + Nav Title, 56px) | how-to-play, player-count, player-names, clue-phase, vote-selection |

## Screens

| Figma frame (`02 — Core Flow`) | Section | Code screen (TODO) |
|---|---|---|
| `home` | SETUP | `screens/Home.tsx` ✅ |
| `how-to-play` | SETUP | `screens/HowToPlay.tsx` ✅ |
| `player-count` | SETUP | `screens/PlayerCount.tsx` ✅ |
| `player-names` | SETUP | `screens/PlayerNames.tsx` ✅ |
| `pass-phone` | ROLE REVEAL | `screens/PassPhone.tsx` ✅ (shared with voting, see below) |
| `tap-to-reveal` | ROLE REVEAL | `screens/TapToReveal.tsx` ✅ |
| `word-reveal-normal` | ROLE REVEAL | `screens/WordReveal.tsx` ✅ |
| `imposter-reveal` | ROLE REVEAL | `screens/ImposterReveal.tsx` ✅ |
| `everyone-ready` | ROLE REVEAL | `screens/EveryoneReady.tsx` ✅ |
| `clue-phase` | GAMEPLAY | `screens/CluePhase.tsx` ✅ |
| `ready-to-vote` | GAMEPLAY | `screens/ReadyToVote.tsx` ✅ |
| `vote-pass-phone` | VOTING | reuses `PassPhone.tsx` ✅ |
| `vote-selection` | VOTING | `screens/VoteSelection.tsx` ✅ |
| `vote-locked` | VOTING | `screens/VoteLocked.tsx` ✅ |
| `votes-are-in` | VOTING | `screens/VotesAreIn.tsx` ✅ |
| `vote-reveal` | RESULTS | `screens/VoteReveal.tsx` ✅ |
| `imposter-guess` | RESULTS | `screens/ImposterGuess.tsx` ✅ |
| `final-result` | RESULTS | `screens/FinalResult.tsx` ✅ |

`pass-phone` and `vote-pass-phone` are visually and behaviorally the
same component (per the AI Implementation Guide's "Pass Phone Screen"
doc) — **resolved**: one shared `PassPhone.tsx` covers both, taking an
optional `subtitle` prop for voting's extra "Make your vote privately."
line, which is the only difference between the two Figma frames.

**Assumption — tap-to-reveal's giant circle**: the circle element
(#2:185) had no children in the captured fetch. Implemented as a
decorative glow only, not a second tap target — "Reveal My Role" is the
guide's documented primary action, and nothing confirmed the circle
duplicates it. Re-check if Figma access shows otherwise.

**Convention — uppercase display text**: several screens author their
dramatic text content in literal caps in Figma ("YOUR WORD IS", "YOU ARE
THE"). Implemented as natural-case JSX + `text-transform: uppercase` in
CSS instead of hardcoding caps strings, consistent with how Home's/
PassPhone's Overline style already works — keeps the data presentation-
independent.

**Caveat — several screens built after the Figma rate limit hit**: clue-phase
through final-result were built from the earlier full Core Flow fetch plus
the AI Implementation Guide, without being able to re-verify a few specific
details live. All confirmed working correctly in end-to-end browser testing
(3-player and 4-player games, including a forced 2-2 tie), but these
specific pieces are inferred, not captured, and worth re-checking against
Figma once available:

- **clue-phase's "turn-indicator" frame** (#2:422): no children captured.
  Implemented as an overline + name callout ("CURRENT TURN" / player name).
- **vote-locked's icon** (#2:531/#2:532): no children captured. Used "✓"
  matching PlayerRow's completed-state treatment.
- **vote-selection's title-area copy** (#2:492): not captured. Used "Who's
  the Imposter?" / "Select one player."
- **imposter-guess's Text Input copy**: not captured. Used label "Your
  guess", placeholder "Type your guess...".
- **final-result's summary-grid content** (#2:624): not captured. Built
  from the guide's explicit content list (Imposter name, secret word, vote
  breakdown, final guess) rather than Figma's actual row layout.
- **vote-reveal's tie state**: Figma's "State: Tie Vote" mock (on the
  confirmed-duplicative "03 — States" canvas) wasn't separately fetched.
  Implemented by reusing VoteReveal's own container with tie-specific copy
  and a "Vote Again" action instead of "Continue".

## Game flow

See `docs/GAME_RULES.md` for the full state-progression diagram — it's
the same content, framed around behavior rather than the Figma→code
table.

**Discrepancy — "How to Play" / secondary-action styling**: the AI
Implementation Guide's Secondary Button doc explicitly pairs it with
"How to Play" (alongside "Start Game") and "New Game" (alongside "Play
Again"). But the actual mockups don't follow that: Home's "How to Play"
renders as a plain muted text link (Text/Body SM, no border, no pill),
and final-result's "New Game" button instance uses the *Primary*
component, not Secondary. Resolved by following each screen's literal
mockup rather than the guide's generalized pairing description when they
conflict — the concrete screen is more specific evidence than the
general pattern text. Applies going forward to any screen where this
comes up again, not just Home.

**Discrepancy — off-scale spacing**: Home's `bottom-section` uses a
`20px` gap in Figma, which isn't on the documented spacing scale
(4/8/12/16/24/32). Rounded up to `--space-component-xl` (24px) rather
than hardcoding `20px`, per the "no arbitrary spacing values" rule —
even though the arbitrary value originates in Figma itself here.

**Addition — custom player count input**: Figma's `player-count` mockup
only shows chips up to "10+", with no UI for entering an exact number
above 10. Since the game has no upper cap on players (project owner
call — "10+" means "10 or more," not "exactly 10"), we need an actual
count to know how many name fields to collect on `player-names`. Added
a `TextInput` below the chip grid, shown only when "10+" is selected,
asking for the exact count (min 10). This is our own addition, not a
Figma mapping — flag if a future Figma update adds a real mock for it.

**Addition — new background token from Player Chip**: the Player Chip
component (9:60) fills with `#202028`, a third distinct value beyond
`background/primary` (#121216) and `background/secondary` (#18181E).
Added as `--color-background-tertiary` rather than rounding to a nearby
existing token, since Figma specifies it as its own value.

**Caveat — player-names built partly from cached data**: the Figma REST
API hit its per-seat rate limit (viewer/collaborator tier, multi-day
cooldown) while this screen was being built. Layout, the Text Input and
Player Chip component specs, and this screen's full behavior spec (from
the AI Implementation Guide's "PLAYER NAMES" doc) were already captured
from an earlier full fetch of the Core Flow canvas, so the screen itself
should be accurate. The one thing not independently re-verified: the
exact copy on the `list-header` row above the chip grid (a "Players"
label + count, e.g. "3/5") — the fetch that would show that row's exact
text was one level deeper than what got captured. Re-check this specific
row against Figma once the rate limit clears.

**Addition — Picture Mode (emoji on word/category reveals)**: not a
Figma mapping — a project-owner-directed feature so the game is
playable by kids who can't read yet. Rather than a separate opt-in
mode, every player always sees an emoji alongside the word (on
`word-reveal-normal` and `final-result`) or category (on
`imposter-reveal`'s hint pill), all the time. `wordBank.ts`'s
`WordEntry` carries `emoji` and `categoryEmoji` alongside `word` and
`category`, threaded through `RoundSetup` → `AppState` exactly like the
category hint before it. The emoji is real content, not decoration —
rendered without `aria-hidden`, unlike the purely decorative 📱 icon on
the pass-phone screens.

## Not yet mapped

`01 — Foundations` and `03 — States` canvases were confirmed (by
project owner) to be visual restatements of what's already captured
above (Design System + Components canvases) — no unique content to
extract from them.
