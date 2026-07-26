import { getRandomWordEntry } from './wordBank';
import type { Player } from '../types/game';

export type RoundSetup = {
  imposterId: string;
  secretWord: string;
  secretWordCategory: string;
};

/** Randomly assigns the Imposter and draws a secret word for a new round. */
export function createRound(players: readonly Player[], usedWords: readonly string[] = []): RoundSetup {
  const imposter = players[Math.floor(Math.random() * players.length)];
  const { word, category } = getRandomWordEntry(usedWords);
  return {
    imposterId: imposter.id,
    secretWord: word,
    secretWordCategory: category,
  };
}
