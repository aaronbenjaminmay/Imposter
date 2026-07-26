import { Button } from '../components/Button';
import { ScreenShell } from '../components/ScreenShell';
import styles from './TapToReveal.module.css';

type TapToRevealProps = {
  playerName: string;
  onReveal: () => void;
};

/**
 * Figma: "02 — Core Flow" > tap-to-reveal (#2:173).
 * Confirmation gate before showing the private role — no role info is
 * visible yet, just the current player's name for identity confirmation.
 *
 * Assumption: the giant circle (#2:185) has no captured children in the
 * source fetch — implemented as a decorative glow, not a second tap
 * target, since "Reveal My Role" is the guide's documented primary
 * action and duplicating it onto the circle wasn't confirmed anywhere.
 */
export function TapToReveal({ playerName, onReveal }: TapToRevealProps) {
  return (
    <ScreenShell>
      <div className={styles.topSection}>
        <div className={styles.playerLabel}>
          <span className={styles.playerLabelText}>{playerName}</span>
        </div>
        <div className={styles.actionContainer}>
          <p className={styles.prompt}>Tap when you&apos;re ready</p>
          <div className={styles.giantCircle} aria-hidden="true" />
        </div>
      </div>
      <div className={styles.bottomSection}>
        <Button variant="primary" onClick={onReveal}>
          Reveal My Role
        </Button>
      </div>
    </ScreenShell>
  );
}
