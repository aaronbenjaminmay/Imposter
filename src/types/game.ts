/**
 * Core domain types for Imposter. These describe game state shape only —
 * no game logic lives here. See docs/GAME_RULES.md for behavior and
 * docs/DESIGN_SYSTEM.md for how these map to Figma screens.
 */

export type Player = {
  id: string;
  name: string;
};

/** Screen names mirror the Figma "02 — Core Flow" frame names 1:1. */
export type Screen =
  | 'home'
  | 'how-to-play'
  | 'player-count'
  | 'player-names'
  | 'pass-phone'
  | 'tap-to-reveal'
  | 'word-reveal-normal'
  | 'imposter-reveal'
  | 'everyone-ready'
  | 'clue-phase'
  | 'ready-to-vote'
  | 'vote-pass-phone'
  | 'vote-selection'
  | 'vote-locked'
  | 'votes-are-in'
  | 'vote-reveal'
  | 'imposter-guess'
  | 'final-result';

export type Vote = {
  voterId: string;
  votedForId: string;
};
