import { Button } from '../components/Button';
import { ScreenShell } from '../components/ScreenShell';
import type { RoundResult } from '../game/gameReducer';
import type { Player, Vote } from '../types/game';
import styles from './FinalResult.module.css';

type FinalResultProps = {
  players: Player[];
  imposterId: string;
  secretWord: string;
  secretWordEmoji: string;
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
 * Summary card layout confirmed against the live Figma file (project
 * owner screenshot): "Imposter" and "Secret Word" as label/value rows,
 * a divider, then a "Vote Breakdown" section tallying votes per
 * candidate ("Sam (Imposter) — 4 votes"), not a per-voter list. No
 * guess row in this design — dropped from an earlier assumption-based
 * version.
 */
export function FinalResult({
  players,
  imposterId,
  secretWord,
  secretWordEmoji,
  votes,
  roundResult,
  onPlayAgain,
  onNewGame,
}: FinalResultProps) {
  const imposter = players.find((p) => p.id === imposterId);
  const playersWin = roundResult.outcome === 'players-win';

  const voteCounts = new Map<string, number>();
  for (const vote of votes) {
    voteCounts.set(vote.votedForId, (voteCounts.get(vote.votedForId) ?? 0) + 1);
  }
  const voteBreakdown = [...voteCounts.entries()]
    .map(([playerId, count]) => ({ player: players.find((p) => p.id === playerId), count }))
    .sort((a, b) => b.count - a.count);

  return (
    <ScreenShell>
      <div className={styles.topSection}>
        <div className={styles.headline}>
          <p className={styles.wordLabel}>The word was</p>
          <p className={styles.emoji}>{secretWordEmoji}</p>
          <p className={styles.word}>{secretWord}</p>
          <p className={styles.outcome}>{playersWin ? 'Players Win' : 'Imposter Wins'}</p>
        </div>
        <div className={styles.summaryCard}>
          <p className={styles.summaryTitle}>Game Summary</p>
          <div className={styles.summaryGrid}>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Imposter</span>
              <span className={styles.summaryValue}>{imposter?.name}</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Secret Word</span>
              <span className={`${styles.summaryValue} ${styles.uppercase}`}>{secretWord}</span>
            </div>
          </div>
          <hr className={styles.divider} />
          <div className={styles.summaryGrid}>
            <p className={styles.sectionHeading}>Vote Breakdown</p>
            {voteBreakdown.map(({ player, count }) => (
              <div key={player?.id} className={styles.summaryRow}>
                <span className={styles.summaryLabel}>
                  {player?.name}
                  {player?.id === imposterId && ' (Imposter)'}
                </span>
                <span className={styles.summaryValue}>
                  {count} {count === 1 ? 'vote' : 'votes'}
                </span>
              </div>
            ))}
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
