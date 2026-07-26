import { Button } from '../components/Button';
import { ScreenShell } from '../components/ScreenShell';
import styles from './ImposterReveal.module.css';

type ImposterRevealProps = {
  category: string;
  categoryEmoji: string;
  onHideAndPass: () => void;
};

/**
 * Figma: "02 — Core Flow" > imposter-reveal (#2:211).
 * CRITICAL: the secret word must ABSOLUTELY NEVER appear on this screen
 * — this component receives a category label only, never the word
 * itself, so it's structurally impossible to render the word here by
 * mistake.
 *
 * Category hint: a project-owner-requested addition, not from Figma.
 * Gives the Imposter a narrowed clue (e.g. "Food") without revealing the
 * word, so they have a fighting chance to blend in. See docs/GAME_RULES.md
 * "Imposter privacy". The category emoji ("Picture Mode") is real content
 * here too, not decoration — not aria-hidden.
 */
export function ImposterReveal({ category, categoryEmoji, onHideAndPass }: ImposterRevealProps) {
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
            <p className={styles.categoryHint}>
              <span className={styles.categoryEmoji}>{categoryEmoji}</span> Category hint:{' '}
              <span className={styles.categoryValue}>{category}</span>
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
