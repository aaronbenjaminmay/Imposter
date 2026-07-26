import { Button } from '../components/Button';
import { ScreenShell } from '../components/ScreenShell';
import styles from './Home.module.css';

type HomeProps = {
  onStartGame: () => void;
  onHowToPlay: () => void;
};

/**
 * Figma: "02 — Core Flow" > home (#2:12).
 * Entry point. Primary action starts setup; "How to Play" is an optional
 * branch that rejoins the same flow. See docs/GAME_RULES.md "HOME".
 */
export function Home({ onStartGame, onHowToPlay }: HomeProps) {
  return (
    <ScreenShell>
      <div className={styles.topSection}>
        <div className={styles.hero}>
          <div className={styles.glow} aria-hidden="true" />
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>IMPOSTER</h1>
            <p className={styles.tagline}>
              One word. One Imposter.
              <br />
              Pass the phone and find them.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.bottomSection}>
        <Button variant="primary" onClick={onStartGame}>
          Start Game
        </Button>
        <button type="button" className={styles.howToPlayLink} onClick={onHowToPlay}>
          How to Play
        </button>
      </div>
    </ScreenShell>
  );
}
