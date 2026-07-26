import { Button } from '../components/Button';
import { ScreenShell } from '../components/ScreenShell';
import styles from './ReadyToVote.module.css';

type ReadyToVoteProps = {
  onStartVoting: () => void;
};

/** Figma: "02 — Core Flow" > ready-to-vote (#2:431). Transition screen building anticipation before the private voting loop. */
export function ReadyToVote({ onStartVoting }: ReadyToVoteProps) {
  return (
    <ScreenShell>
      <div className={styles.topSection}>
        <div className={styles.centerBox}>
          <div className={styles.glow} aria-hidden="true" />
          <div className={styles.content}>
            <p className={styles.title}>Time to vote.</p>
            <p className={styles.subtitle}>Who do you think is the Imposter?</p>
          </div>
        </div>
      </div>
      <div className={styles.bottomSection}>
        <Button variant="primary" onClick={onStartVoting}>
          Start Voting
        </Button>
      </div>
    </ScreenShell>
  );
}
