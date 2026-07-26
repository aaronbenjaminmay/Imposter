import { Button } from '../components/Button';
import { ScreenShell } from '../components/ScreenShell';
import styles from './VotesAreIn.module.css';

type VotesAreInProps = {
  onRevealVotes: () => void;
};

/** Figma: "02 — Core Flow" > votes-are-in (#2:541). All votes stay hidden until this dramatic-anticipation beat. */
export function VotesAreIn({ onRevealVotes }: VotesAreInProps) {
  return (
    <ScreenShell>
      <div className={styles.topSection}>
        <div className={styles.centerBox}>
          <p className={styles.title}>Everyone has voted.</p>
          <p className={styles.subtitle}>Ready to find out who the Imposter is?</p>
        </div>
      </div>
      <div className={styles.bottomSection}>
        <Button variant="primary" onClick={onRevealVotes}>
          Reveal Votes
        </Button>
      </div>
    </ScreenShell>
  );
}
