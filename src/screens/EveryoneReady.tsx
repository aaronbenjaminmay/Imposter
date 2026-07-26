import { Button } from '../components/Button';
import { ScreenShell } from '../components/ScreenShell';
import styles from './EveryoneReady.module.css';

type EveryoneReadyProps = {
  onStartClues: () => void;
};

/**
 * Figma: "02 — Core Flow" > everyone-ready (#2:230).
 * Marks the shift from private phone-passing to shared verbal gameplay
 * — exits the role-reveal loop for good once the last player has seen
 * their role.
 */
export function EveryoneReady({ onStartClues }: EveryoneReadyProps) {
  return (
    <ScreenShell>
      <div className={styles.topSection}>
        <div className={styles.contentBox}>
          <p className={styles.heading}>{'Everyone knows\ntheir role.'}</p>
          <hr className={styles.divider} />
          <p className={styles.subheading}>Put the phone down.</p>
          <p className={styles.instructions}>{"It's time to play.\nDon't say the secret word."}</p>
        </div>
      </div>
      <div className={styles.bottomSection}>
        <Button variant="primary" onClick={onStartClues}>
          Start Clues
        </Button>
      </div>
    </ScreenShell>
  );
}
