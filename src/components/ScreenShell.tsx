import type { ReactNode } from 'react';
import styles from './ScreenShell.module.css';

/**
 * Every screen in Figma's "02 — Core Flow" shares the same root frame
 * (template EL-fe301294): full-height column, content pinned top and
 * bottom via `justify-content: space-between`, `#08080A` background.
 * This wraps that shared shell so each screen only implements its own
 * content.
 */
export function ScreenShell({ children }: { children: ReactNode }) {
  return <div className={styles.shell}>{children}</div>;
}
