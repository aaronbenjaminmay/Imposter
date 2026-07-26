import { createRound } from './roundSetup';
import type { Player, Screen, Vote } from '../types/game';

export type RoundResult = {
  outcome: 'players-win' | 'imposter-wins';
  wasImposterCaught: boolean;
  imposterGuess: string | null;
};

export type TallyResult = {
  /** null means tied — no single player got the most votes. */
  winnerId: string | null;
  counts: Record<string, number>;
};

export type AppState = {
  screen: Screen;
  playerCount: number;
  players: Player[];
  imposterId: string | null;
  secretWord: string | null;
  usedWords: string[];
  currentPlayerIndex: number;
  currentClueIndex: number;
  votes: Vote[];
  currentVoterIndex: number;
  tally: TallyResult | null;
  roundResult: RoundResult | null;
};

export const initialState: AppState = {
  screen: 'home',
  playerCount: 0,
  players: [],
  imposterId: null,
  secretWord: null,
  usedWords: [],
  currentPlayerIndex: 0,
  currentClueIndex: 0,
  votes: [],
  currentVoterIndex: 0,
  tally: null,
  roundResult: null,
};

export type GameAction =
  | { type: 'GO_TO'; screen: Screen }
  | { type: 'SET_PLAYER_COUNT'; count: number }
  | { type: 'START_ROUND'; players: Player[] }
  | { type: 'REVEAL_ROLE' }
  | { type: 'HIDE_AND_PASS' }
  | { type: 'NEXT_CLUE_PLAYER' }
  | { type: 'START_VOTING' }
  | { type: 'LOCK_IN_VOTE'; votedForId: string }
  | { type: 'NEXT_VOTER' }
  | { type: 'REVEAL_VOTES' }
  | { type: 'VOTE_AGAIN' }
  | { type: 'CONTINUE_AFTER_VOTE_REVEAL' }
  | { type: 'SUBMIT_IMPOSTER_GUESS'; guess: string }
  | { type: 'PLAY_AGAIN' }
  | { type: 'NEW_GAME' };

/** Ties are never broken randomly — see docs/GAME_RULES.md "Voting -> result flow". */
function tallyVotes(votes: readonly Vote[]): TallyResult {
  const counts: Record<string, number> = {};
  for (const vote of votes) {
    counts[vote.votedForId] = (counts[vote.votedForId] ?? 0) + 1;
  }
  const maxCount = Math.max(0, ...Object.values(counts));
  const topPlayerIds = Object.entries(counts)
    .filter(([, count]) => count === maxCount)
    .map(([id]) => id);
  return { winnerId: topPlayerIds.length === 1 ? topPlayerIds[0] : null, counts };
}

export function gameReducer(state: AppState, action: GameAction): AppState {
  switch (action.type) {
    case 'GO_TO':
      return { ...state, screen: action.screen };

    case 'SET_PLAYER_COUNT':
      return { ...state, playerCount: action.count, screen: 'player-names' };

    case 'START_ROUND': {
      const round = createRound(action.players, state.usedWords);
      return {
        ...state,
        players: action.players,
        imposterId: round.imposterId,
        secretWord: round.secretWord,
        usedWords: [...state.usedWords, round.secretWord],
        currentPlayerIndex: 0,
        screen: 'pass-phone',
      };
    }

    case 'REVEAL_ROLE': {
      const current = state.players[state.currentPlayerIndex];
      return { ...state, screen: current.id === state.imposterId ? 'imposter-reveal' : 'word-reveal-normal' };
    }

    case 'HIDE_AND_PASS': {
      const isLastPlayer = state.currentPlayerIndex === state.players.length - 1;
      return isLastPlayer
        ? { ...state, screen: 'everyone-ready' }
        : { ...state, currentPlayerIndex: state.currentPlayerIndex + 1, screen: 'pass-phone' };
    }

    case 'NEXT_CLUE_PLAYER': {
      const isLastPlayer = state.currentClueIndex === state.players.length - 1;
      return isLastPlayer
        ? { ...state, screen: 'ready-to-vote' }
        : { ...state, currentClueIndex: state.currentClueIndex + 1 };
    }

    case 'START_VOTING':
      return { ...state, votes: [], currentVoterIndex: 0, screen: 'vote-pass-phone' };

    case 'LOCK_IN_VOTE': {
      const voter = state.players[state.currentVoterIndex];
      return {
        ...state,
        votes: [...state.votes, { voterId: voter.id, votedForId: action.votedForId }],
        screen: 'vote-locked',
      };
    }

    case 'NEXT_VOTER': {
      const isLastVoter = state.currentVoterIndex === state.players.length - 1;
      return isLastVoter
        ? { ...state, screen: 'votes-are-in' }
        : { ...state, currentVoterIndex: state.currentVoterIndex + 1, screen: 'vote-pass-phone' };
    }

    case 'REVEAL_VOTES':
      return { ...state, tally: tallyVotes(state.votes), screen: 'vote-reveal' };

    case 'VOTE_AGAIN':
      return { ...state, votes: [], currentVoterIndex: 0, tally: null, screen: 'vote-pass-phone' };

    case 'CONTINUE_AFTER_VOTE_REVEAL': {
      // Never dispatched while tied — VoteReveal only offers "Vote Again" (VOTE_AGAIN) in that case.
      const wasCaught = state.tally?.winnerId === state.imposterId;
      if (wasCaught) {
        return { ...state, screen: 'imposter-guess' };
      }
      return {
        ...state,
        roundResult: { outcome: 'imposter-wins', wasImposterCaught: false, imposterGuess: null },
        screen: 'final-result',
      };
    }

    case 'SUBMIT_IMPOSTER_GUESS': {
      const guessedCorrectly =
        action.guess.trim().toLowerCase() === state.secretWord?.trim().toLowerCase();
      return {
        ...state,
        roundResult: {
          outcome: guessedCorrectly ? 'imposter-wins' : 'players-win',
          wasImposterCaught: true,
          imposterGuess: action.guess,
        },
        screen: 'final-result',
      };
    }

    case 'PLAY_AGAIN': {
      const round = createRound(state.players, state.usedWords);
      return {
        ...state,
        imposterId: round.imposterId,
        secretWord: round.secretWord,
        usedWords: [...state.usedWords, round.secretWord],
        currentPlayerIndex: 0,
        currentClueIndex: 0,
        votes: [],
        currentVoterIndex: 0,
        tally: null,
        roundResult: null,
        screen: 'pass-phone',
      };
    }

    case 'NEW_GAME':
      return initialState;
  }
}
