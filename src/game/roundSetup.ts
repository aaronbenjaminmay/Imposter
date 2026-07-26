import { getRandomWord } from './wordBank';
import type { Player } from '../types/game';

export type RoundSetup = {
  imposterId: string;
  secretWord: string;
};

/** Randomly assigns the Imposter and draws a secret word for a new round. */
export function createRound(players: readonly Player[], usedWords: readonly string[] = []): RoundSetup {
  const imposter = players[Math.floor(Math.random() * players.length)];
  return {
    imposterId: imposter.id,
    secretWord: getRandomWord(usedWords),
  };
}
