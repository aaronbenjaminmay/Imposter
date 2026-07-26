import styles from './PlayerRow.module.css';

export type PlayerRowStatus = 'default' | 'current' | 'completed' | 'pending';

type PlayerRowProps = {
  name: string;
  status: PlayerRowStatus;
};

const BADGE_GLYPH: Record<PlayerRowStatus, string> = {
  default: '○',
  current: '●',
  completed: '✓',
  pending: '○',
};

/**
 * Figma: "02 — Components" > Player Row (component set 9:46).
 * Turn tracker row for clue-phase. Completed/current/pending status is
 * conveyed by badge glyph + distinct name weight/color, not color alone.
 */
export function PlayerRow({ name, status }: PlayerRowProps) {
  const badgeClass = { default: styles.badgeDefault, current: styles.badgeCurrent, completed: styles.badgeCompleted, pending: styles.badgePending }[status];
  const nameClass = { default: styles.nameDefault, current: styles.nameCurrent, completed: styles.nameCompleted, pending: styles.namePending }[status];

  return (
    <div className={`${styles.row} ${status === 'pending' ? styles.pending : ''}`}>
      <span className={`${styles.badge} ${badgeClass}`} aria-hidden="true">
        {BADGE_GLYPH[status]}
      </span>
      <span className={`${styles.name} ${nameClass}`}>{name}</span>
    </div>
  );
}
