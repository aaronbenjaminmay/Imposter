import { Button } from '../components/Button';
import { ScreenShell } from '../components/ScreenShell';
import styles from './WordReveal.module.css';

type WordRevealProps = {
  word: string;
  emoji: string;
  onHideAndPass: () => void;
};

/**
 * Figma: "02 — Core Flow" > word-reveal-normal (#2:193).
 * Shown only to non-Imposter players. CRITICAL: must never be reachable
 * by the Imposter — see docs/GAME_RULES.md "Secret word privacy".
 *
 * The emoji (project owner's "Picture Mode" request, not from Figma)
 * makes this playable without reading — not aria-hidden, since it's
 * real content a non-reading player relies on, not decoration.
 */
export function WordReveal({ word, emoji, onHideAndPass }: WordRevealProps) {
  return (
    <ScreenShell>
      <div className={styles.topSection}>
        <div className={styles.contentBox}>
          <p className={styles.label}>Your word is</p>
          <p className={styles.emoji}>{emoji}</p>
          <p className={styles.word}>{word}</p>
          <p className={styles.instructions}>{"Remember the word.\nDon't let anyone else see it."}</p>
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
