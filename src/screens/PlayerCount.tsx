import { useState } from 'react';
import { Button } from '../components/Button';
import { NavHeader } from '../components/NavHeader';
import { NumberChip } from '../components/NumberChip';
import { ScreenShell } from '../components/ScreenShell';
import { TextInput } from '../components/TextInput';
import styles from './PlayerCount.module.css';

type PlayerCountProps = {
  onBack: () => void;
  onContinue: (playerCount: number) => void;
};

const CHIPS = [3, 4, 5, 6, 7, 8, 9, '10+'] as const;
type ChipValue = (typeof CHIPS)[number];

const MIN_CUSTOM_COUNT = 10;

/**
 * Figma: "02 — Core Flow" > player-count (#2:75).
 * 4-10 is the recommended range (per the project owner: 3 is allowed if
 * a group wants it — a soft floor, not enforced — and there's no upper
 * cap; "10+" means "10 or more," not "exactly 10"). Since Figma only
 * mocks chips up to "10+" with no custom-count UI, the exact-number
 * input show below the grid is our own addition, not a Figma mapping —
 * flagged in docs/DESIGN_SYSTEM.md.
 */
export function PlayerCount({ onBack, onContinue }: PlayerCountProps) {
  const [selected, setSelected] = useState<ChipValue | null>(null);
  const [customCount, setCustomCount] = useState('');

  const customCountValue = Number(customCount);
  const isCustomCountValid = Number.isInteger(customCountValue) && customCountValue >= MIN_CUSTOM_COUNT;

  const canContinue =
    selected !== null && (selected === '10+' ? isCustomCountValid : true);

  const handleContinue = () => {
    if (!canContinue || selected === null) return;
    onContinue(selected === '10+' ? customCountValue : selected);
  };

  return (
    <ScreenShell>
      <div className={styles.topSection}>
        <NavHeader title="Setup Round" onBack={onBack} />
        <div className={styles.titleArea}>
          <h2 className={styles.title}>How many players?</h2>
          <p className={styles.subtitle}>4–10 players recommended</p>
        </div>
        <div className={styles.chipsGrid} role="radiogroup" aria-label="Number of players">
          {CHIPS.map((chip) => (
            <NumberChip key={chip} selected={selected === chip} onClick={() => setSelected(chip)}>
              {chip}
            </NumberChip>
          ))}
        </div>
        {selected === '10+' && (
          <div className={styles.customCount}>
            <TextInput
              label="Exact number of players"
              type="number"
              inputMode="numeric"
              min={MIN_CUSTOM_COUNT}
              placeholder="e.g. 12"
              value={customCount}
              onChange={(event) => setCustomCount(event.target.value)}
            />
          </div>
        )}
      </div>
      <div className={styles.bottomSection}>
        <Button variant="primary" onClick={handleContinue} disabled={!canContinue}>
          Continue
        </Button>
      </div>
    </ScreenShell>
  );
}
