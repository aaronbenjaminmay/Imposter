import { Button } from '../components/Button';
import { ScreenShell } from '../components/ScreenShell';
import type { RoundResult } from '../game/gameReducer';
import type { Player, Vote } from '../types/game';
import styles from './FinalResult.module.css';

type FinalResultProps = {
  players: Player[];
  imposterId: string;
  secretWord: string;
  votes: Vote[];
  roundResult: RoundResult;
  onPlayAgain: () => void;
  onNewGame: () => void;
};

/**
 * Figma: "02 — Core Flow" > final-result (#2:607).
 * Reveals the word to everyone and declares the winner — the only
 * screen where players other than the Imposter's reveal see the word.
 *
 * Assumption: the summary-grid's exact row content (#2:624) wasn't
 * captured before the Figma rate limit hit. Built from the AI
 * Implementation Guide's explicit content list instead ("Imposter name,
 * secret word, vote breakdown, final guess result") — re-check the
 * actual row layout against Figma once available.
 *
 * Both "Play Again" and "New Game" render as Primary buttons, matching
 * the one captured example (not Primary+Secondary as the guide's
 * component doc describes) — see the discrepancy already logged in
 * docs/DESIGN_SYSTEM.md.
 */
export function FinalResult({
  players,
  imposterId,
  secretWord,
  votes,
  roundResult,
  onPlayAgain,
  onNewGame,
}: FinalResultProps) {
  const imposter = players.find((p) => p.id === imposterId);
  const playersWin = roundResult.outcome === 'players-win';

  return (
    <ScreenShell>
      <div className={styles.topSection}>
        <div className={styles.headline}>
          <p className={styles.wordLabel}>The word was</p>
          <p className={styles.word}>{secretWord}</p>
          <p className={styles.outcome}>{playersWin ? 'Players Win' : 'Imposter Wins'}</p>
        </div>
        <div className={styles.summaryCard}>
          <p className={styles.summaryTitle}>Game Summary</p>
          <div className={styles.summaryGrid}>
            <div className={styles.summaryRow}>
              <p className={styles.summaryLabel}>Imposter</p>
              <p className={styles.summaryValue}>{imposter?.name}</p>
            </div>
            <div className={styles.summaryRow}>
              <p className={styles.summaryLabel}>Votes</p>
              {votes.map((vote) => {
                const voter = players.find((p) => p.id === vote.voterId);
                const votedFor = players.find((p) => p.id === vote.votedForId);
                return (
                  <p key={vote.voterId} className={styles.summaryValue}>
                    {voter?.name} voted {votedFor?.name}
                  </p>
                );
              })}
            </div>
            {roundResult.wasImposterCaught && roundResult.imposterGuess && (
              <div className={styles.summaryRow}>
                <p className={styles.summaryLabel}>{imposter?.name}&apos;s guess</p>
                <p className={styles.summaryValue}>{roundResult.imposterGuess}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.bottomSection}>
        <Button variant="primary" onClick={onPlayAgain}>
          Play Again
        </Button>
        <Button variant="primary" onClick={onNewGame}>
          New Game
        </Button>
      </div>
    </ScreenShell>
  );
}
