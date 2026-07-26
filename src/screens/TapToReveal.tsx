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
 * The circle (#2:185) holds a fingerprint/scan icon in Figma (confirmed
 * via project owner screenshot — the source fetch didn't capture its
 * children before the icon itself could be pulled). Hand-built as a
 * simple stroke icon rather than an exact vector match, since the
 * precise Figma asset isn't available while the API is rate-limited —
 * still decorative (aria-hidden), not a second tap target; "Reveal My
 * Role" remains the only actionable control.
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
            <svg viewBox="0 0 64 64" width="64" height="64" fill="none">
              <path d="M10 40 Q32 6 54 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M15 40 Q32 14 49 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M20 40 Q32 22 44 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M32 44 L32 50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M27 52 L30 55" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M37 52 L34 55" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
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
