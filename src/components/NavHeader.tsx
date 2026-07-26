import styles from './NavHeader.module.css';

type NavHeaderProps = {
  title: string;
  onBack: () => void;
};

/**
 * Figma: recurring "screen-header" frame (back arrow + Nav Title, 56px
 * tall) — appears verbatim on how-to-play, player-count, player-names,
 * clue-phase, and vote-selection. Not a named component in Figma's
 * "02 — Components" canvas, but repeated enough across screens to
 * warrant its own code component rather than duplicating the markup.
 * Rendered as an h1 — each screen swap acts like a page, so its heading
 * should be the page's single h1.
 */
export function NavHeader({ title, onBack }: NavHeaderProps) {
  return (
    <div className={styles.header}>
      <button type="button" className={styles.backButton} onClick={onBack} aria-label="Back">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
          <path
            d="M15 18l-6-6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
}
