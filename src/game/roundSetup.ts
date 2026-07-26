import { getRandomWordEntry } from './wordBank';
import type { Player } from '../types/game';

export type RoundSetup = {
  imposterId: string;
  secretWord: string;
  secretWordEmoji: string;
  secretWordCategory: string;
  secretWordCategoryEmoji: string;
};

/** Randomly assigns the Imposter and draws a secret word for a new round. */
export function createRound(players: readonly Player[], usedWords: readonly string[] = []): RoundSetup {
  const imposter = players[Math.floor(Math.random() * players.length)];
  const { word, emoji, category, categoryEmoji } = getRandomWordEntry(usedWords);
  return {
    imposterId: imposter.id,
    secretWord: word,
    secretWordEmoji: emoji,
    secretWordCategory: category,
    secretWordCategoryEmoji: categoryEmoji,
  };
}
