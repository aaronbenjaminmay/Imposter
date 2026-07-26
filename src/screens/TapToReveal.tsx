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
 * The circle (#2:185) holds a fingerprint/scan icon in Figma. Uses the
 * real Figma asset (public/fingerprint.svg, provided directly by the
 * project owner rather than an approximation) — still decorative
 * (aria-hidden), not a second tap target; "Reveal My Role" remains the
 * only actionable control.
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
          <div className={styles.giantCircle} aria-hidden="true">
            <img src={`${import.meta.env.BASE_URL}fingerprint.svg`} alt="" width={64} height={64} />
          </div>
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
