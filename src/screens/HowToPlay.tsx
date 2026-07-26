import { Button } from '../components/Button';
import { NavHeader } from '../components/NavHeader';
import { ScreenShell } from '../components/ScreenShell';
import styles from './HowToPlay.module.css';

type HowToPlayProps = {
  onBack: () => void;
  onStartGame: () => void;
};

const STEPS = [
  { title: 'PASS', description: 'Pass the phone around so everyone can secretly see their role.' },
  { title: 'CLUE', description: 'Everyone gives a clue about the secret word.' },
  { title: 'VOTE', description: 'Decide who you think the Imposter is.' },
  {
    title: 'REVEAL',
    description: "Catch the Imposter — or give them one last chance to guess the word.",
  },
] as const;

/**
 * Figma: "02 — Core Flow" > how-to-play (#2:33).
 * Brief 4-step explanation — exactly 4 steps per the AI Implementation
 * Guide ("Maximum 4 steps. Do not add detailed rules or edge cases.").
 * Rendered as an ordered list per the guide's explicit accessibility
 * note ("Use ordered list semantics"); each step's number badge is
 * decorative (aria-hidden) since the <ol> already conveys ordinality.
 */
export function HowToPlay({ onBack, onStartGame }: HowToPlayProps) {
  return (
    <ScreenShell>
      <div className={styles.topSection}>
        <NavHeader title="How to Play" onBack={onBack} />
        <ol className={styles.stepsList}>
          {STEPS.map((step, index) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.numberBadge} aria-hidden="true">
                {index + 1}
              </span>
              <div className={styles.stepText}>
                <p className={styles.stepTitle}>{step.title}</p>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className={styles.bottomSection}>
        <Button variant="primary" onClick={onStartGame}>
          Start Game
        </Button>
      </div>
    </ScreenShell>
  );
}
