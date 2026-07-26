import { Button } from '../components/Button';
import { ScreenShell } from '../components/ScreenShell';
import styles from './VoteReveal.module.css';

type VoteRevealProps =
  | { isTie: true; onVoteAgain: () => void }
  | { isTie: false; votedPlayerName: string; wasCaught: boolean; onContinue: () => void };

/**
 * Figma: "02 — Core Flow" > vote-reveal (#2:561).
 * Three states per the AI Implementation Guide: caught (-> imposter
 * guess), not caught (-> final result, Imposter wins), and tie (-> a
 * re-vote, never a random tiebreak — see docs/GAME_RULES.md). Figma's
 * own tie-state mock (in the confirmed-duplicative "03 — States" canvas)
 * wasn't separately captured, so the tie layout reuses this screen's
 * container with its own copy and a "Vote Again" action instead of
 * "Continue".
 */
export function VoteReveal(props: VoteRevealProps) {
  if (props.isTie) {
    return (
      <ScreenShell>
        <div className={styles.topSection}>
          <div className={styles.centerBox}>
            <div className={styles.content}>
              <p className={styles.label}>The vote was...</p>
              <p className={styles.name}>Tied</p>
              <p className={`${styles.verdict} ${styles.verdictNotCaught}`}>No one was voted out — vote again.</p>
            </div>
          </div>
        </div>
        <div className={styles.bottomSection}>
          <Button variant="primary" onClick={props.onVoteAgain}>
            Vote Again
          </Button>
        </div>
      </ScreenShell>
    );
  }

  const { votedPlayerName, wasCaught, onContinue } = props;

  return (
    <ScreenShell>
      <div className={styles.topSection}>
        <div className={styles.centerBox}>
          <div className={styles.glow} aria-hidden="true" />
          <div className={styles.content}>
            <p className={styles.label}>The group chose...</p>
            <p className={styles.name}>{votedPlayerName}</p>
            <p className={`${styles.verdict} ${wasCaught ? styles.verdictCaught : styles.verdictNotCaught}`}>
              {wasCaught ? `${votedPlayerName} was the Imposter!` : `${votedPlayerName} was NOT the Imposter.`}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.bottomSection}>
        <Button variant="primary" onClick={onContinue}>
          Continue
        </Button>
      </div>
    </ScreenShell>
  );
}
