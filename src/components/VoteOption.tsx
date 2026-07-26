import styles from './VoteOption.module.css';

type VoteOptionProps = {
  name: string;
  selected: boolean;
  onClick: () => void;
};

/**
 * Figma: "02 — Components" > Vote Option (component set 9:54).
 * Single-select radio row for the private voting screen. Must never
 * reveal previous player votes — each voter starts with nothing selected.
 */
export function VoteOption({ name, selected, onClick }: VoteOptionProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      className={`${styles.option} ${selected ? styles.selected : ''}`}
      onClick={onClick}
    >
      <span className={styles.radio}>{selected && <span className={styles.innerDot} />}</span>
      <span className={styles.name}>{name}</span>
    </button>
  );
}
