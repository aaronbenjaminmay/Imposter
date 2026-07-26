import { useState } from 'react';
import { Button } from '../components/Button';
import { ScreenShell } from '../components/ScreenShell';
import { TextInput } from '../components/TextInput';
import styles from './ImposterGuess.module.css';

type ImposterGuessProps = {
  onSubmitGuess: (guess: string) => void;
};

/**
 * Figma: "02 — Core Flow" > imposter-guess (#2:583).
 * CRITICAL: the secret word must not appear anywhere on this screen —
 * this component has no access to it at all, only the guess the
 * Imposter types.
 *
 * Assumption: the Text Input's label/placeholder copy for this specific
 * screen wasn't captured before the Figma rate limit hit (only the
 * generic component instance reference was). Used "Your guess" /
 * "Type your guess..." as a reasonable placeholder pair, consistent
 * with the player-name input's "Enter player name..." pattern.
 */
export function ImposterGuess({ onSubmitGuess }: ImposterGuessProps) {
  const [guess, setGuess] = useState('');

  return (
    <ScreenShell>
      <div className={styles.topSection}>
        <div className={styles.headerArea}>
          <h1 className={styles.title}>You caught the Imposter!</h1>
          <p className={styles.subtitle}>One last chance...</p>
          <p className={styles.prompt}>Imposter, what is the secret word?</p>
        </div>
        <div className={styles.inputArea}>
          <TextInput
            label="Your guess"
            placeholder="Type your guess..."
            value={guess}
            onChange={(event) => setGuess(event.target.value)}
            autoFocus
          />
        </div>
      </div>
      <div className={styles.bottomSection}>
        <Button variant="primary" onClick={() => onSubmitGuess(guess)} disabled={!guess.trim()}>
          Make My Guess
        </Button>
      </div>
    </ScreenShell>
  );
}
