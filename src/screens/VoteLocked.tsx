import { Button } from '../components/Button';
import { ScreenShell } from '../components/ScreenShell';
import styles from './VoteLocked.module.css';

type VoteLockedProps = {
  onNext: () => void;
};

/**
 * Figma: "02 — Core Flow" > vote-locked (#2:518).
 * CRITICAL: confirms the vote was recorded without ever revealing its
 * content — see docs/GAME_RULES.md "Voting privacy".
 *
 * Assumption: the checkmark icon inside #2:531 wasn't captured in the
 * source fetch — used "✓" matching the same success treatment as
 * PlayerRow's completed state.
 */
export function VoteLocked({ onNext }: VoteLockedProps) {
  return (
    <ScreenShell>
      <div className={styles.topSection}>
        <div className={styles.centerBox}>
          <div className={styles.glow} aria-hidden="true" />
          <div className={styles.iconWrap} aria-hidden="true">
            ✓
          </div>
          <p className={styles.title}>Vote locked.</p>
          <p className={styles.subtitle}>Pass the phone to the next player.</p>
        </div>
      </div>
      <div className={styles.bottomSection}>
        <Button variant="primary" onClick={onNext}>
          Next Player
        </Button>
      </div>
    </ScreenShell>
  );
}
