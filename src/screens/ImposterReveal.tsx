import { Button } from '../components/Button';
import { ScreenShell } from '../components/ScreenShell';
import styles from './ImposterReveal.module.css';

type ImposterRevealProps = {
  onHideAndPass: () => void;
};

/**
 * Figma: "02 — Core Flow" > imposter-reveal (#2:211).
 * CRITICAL: the secret word must ABSOLUTELY NEVER appear on this screen
 * — this component doesn't even receive the word as a prop, so it's
 * structurally impossible to render it here by mistake.
 */
export function ImposterReveal({ onHideAndPass }: ImposterRevealProps) {
  return (
    <ScreenShell>
      <div className={styles.topSection}>
        <div className={styles.contentBox}>
          <div className={styles.glow} aria-hidden="true" />
          <div className={styles.content}>
            <p className={styles.label}>You are the</p>
            <p className={styles.title}>IMPOSTER</p>
            <p className={styles.instructions}>
              {"You don't know the secret word.\nListen carefully to everyone's clues\nand try to blend in."}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.bottomSection}>
        <Button variant="primary" onClick={onHideAndPass}>
          Hide & Pass Phone
        </Button>
      </div>
    </ScreenShell>
  );
}
