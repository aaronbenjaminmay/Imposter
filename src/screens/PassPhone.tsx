import { Button } from '../components/Button';
import { ScreenShell } from '../components/ScreenShell';
import styles from './PassPhone.module.css';

type PassPhoneProps = {
  nextPlayerName: string;
  /** Only used by the voting loop ("Make your vote privately.") — the
   * role-reveal loop omits it. Identical screen otherwise, per the AI
   * Implementation Guide's "Pass Phone Screen" doc. */
  subtitle?: string;
  onReady: () => void;
};

/**
 * Figma: "02 — Core Flow" > pass-phone (#2:154) and vote-pass-phone
 * (#2:452) — confirmed identical apart from the optional subtitle line,
 * so this one component covers both (resolves the open TODO from an
 * earlier pass at docs/DESIGN_SYSTEM.md).
 *
 * CRITICAL PRIVACY GATE: must never show role/vote information — only
 * the next player's name. See docs/GAME_RULES.md "Privacy rules".
 * The 📱 icon matches the standalone "Pass Phone Prompt" component
 * (10:12), which uses the same emoji for the same purpose.
 */
export function PassPhone({ nextPlayerName, subtitle, onReady }: PassPhoneProps) {
  return (
    <ScreenShell>
      <div className={styles.topSection}>
        <div className={styles.centerContainer}>
          <p className={styles.overline}>Pass the phone to</p>
          <p className={styles.playerName}>{nextPlayerName}</p>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          <div className={styles.iconCircle} aria-hidden="true">
            📱
          </div>
        </div>
      </div>
      <div className={styles.bottomSection}>
        <Button variant="primary" onClick={onReady}>
          Ready
        </Button>
      </div>
    </ScreenShell>
  );
}
