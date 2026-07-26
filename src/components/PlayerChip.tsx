import styles from './PlayerChip.module.css';

type PlayerChipProps = {
  name: string;
  onRemove: () => void;
};

/**
 * Figma: "02 — Components" > Player Chip (9:60).
 * Removable name pill on player-names. "Behavior: Remove button (×)
 * deletes the player from the list. No drag-to-reorder needed for MVP."
 */
export function PlayerChip({ name, onRemove }: PlayerChipProps) {
  return (
    <div className={styles.chip}>
      <span className={styles.name}>{name}</span>
      <button type="button" className={styles.removeButton} onClick={onRemove} aria-label={`Remove ${name}`}>
        ×
      </button>
    </div>
  );
}
