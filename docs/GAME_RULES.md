# Game Rules

Source of truth: the Figma "00 — AI Implementation Guide" canvas
(PRODUCT OVERVIEW, PRODUCT RULES, SCREEN FLOW & CONTEXT frames). This
document restates it for quick reference during implementation — if
this ever disagrees with Figma, Figma wins; update this file.

## What Imposter is

A single-device, pass-the-phone party word game for a group sitting
together in person. One player is secretly the **Imposter**. Every other
player is told the same **secret word**. Players pass one phone around
to privately learn their role, then give verbal clues out loud, vote on
who they think the Imposter is, and reveal the result.

This is not a networked multiplayer game. There is no server, no
accounts, and nothing is shared between devices.

## Player count

- The player-count screen recommends **4–10 players** for a good game.
- **3 players is allowed** if the group wants to (soft floor, not
  enforced).
- There is **no upper cap**. The Figma "10+" chip means "10 or more" —
  selecting it should prompt for an exact count, not just cap at 10.

## Privacy rules (critical — these are the core UX mechanic)

- **Pass-phone privacy**: a pass-phone screen must appear before every
  single player's private reveal or vote, with no exceptions and no
  auto-advance. It shows only the next player's name — never role
  info, the word, or anyone's vote.
- **Secret word privacy**: shown only to non-Imposter players during
  their own reveal moment, and to everyone on the final result screen.
  Never visible during clue-giving, voting, or the Imposter's guess.
- **Imposter privacy**: the Imposter learns they are the Imposter but
  never sees the secret word before the final result.
- **Voting privacy**: each vote is cast privately; a player must never
  see another player's vote before locking in their own, and the
  vote-locked confirmation screen must not leak the vote to the next
  voter.
- **Vote reveal timing**: all votes stay hidden until every player has
  voted, then reveal together for dramatic effect.

## Self-voting

Players **may vote for themselves**. The Figma guide flags this as an
"(optional MVP constraint)" to disallow it — we're deliberately not
adding that restriction, to keep the voting flow simple.

## Clue phase

Verbal only — players say their clue out loud. The phone is a turn
tracker only (current / completed / pending), never a text input, and
never displays the secret word. Continue until every player has given
exactly one clue.

## Voting → result flow

1. `votes-are-in` → `vote-reveal`: reveals who got the most votes.
2. **Tie**: offer a re-vote. Never break a tie randomly.
3. **Group guessed correctly** (voted out the real Imposter): Imposter
   gets one final chance — `imposter-guess` — to guess the secret word
   without seeing it. Correct guess → **Imposter wins** despite being
   caught. Wrong guess → **players win**.
4. **Group guessed incorrectly**: skip straight to `final-result` with
   **Imposter wins**.

## Round reset

- **Play Again**: keeps the same player list, assigns a new random
  Imposter, and picks a new secret word. Returns to `player-names`.
- **New Game**: full reset, returns to `home`.

## Word bank

`src/game/wordBank.ts` holds the word pool, organized into categories
(food, animals, places, occupations, objects, entertainment, nature,
technology, sports & games, holidays) purely to keep the list easy to
maintain — categories are never shown to players and don't affect
gameplay. A word is drawn at random from the full pool each round,
excluding words already used earlier in the same session, so repeat
"Play Again" rounds stay varied.

TODO: expand categories/word count over time; no fixed target size.

## Full screen flow

```
home → how-to-play (optional) → player-count → player-names
  → [pass-phone → tap-to-reveal → (word-reveal-normal | imposter-reveal)] × N players
  → everyone-ready → clue-phase → ready-to-vote
  → [vote-pass-phone → vote-selection → vote-locked] × N players
  → votes-are-in → vote-reveal
      → (imposter-guess if group guessed correctly)
  → final-result → (player-names via "Play Again" | home via "New Game")
```

See the Figma "COMPONENT FLOW RELATIONSHIPS" frame for the annotated
version of this diagram.
