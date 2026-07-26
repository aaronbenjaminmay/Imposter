import type { ReactNode } from 'react';
import styles from './NumberChip.module.css';

type NumberChipProps = {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
};

/**
 * Figma: "02 — Components" > Number Chip (component set 9:59).
 * Tap-to-select option for the player-count selector. Only one chip is
 * selected at a time — the guide calls for radio-group semantics with a
 * selected state distinguishable beyond color, which here is fill vs.
 * outline, not just a hue change. Simplified from a full roving-tabindex
 * ARIA radiogroup: each chip is independently tabbable rather than
 * arrow-key navigated, which is enough for MVP keyboard operability.
 */
export function NumberChip({ selected, onClick, children }: NumberChipProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      className={`${styles.chip} ${selected ? styles.selected : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
