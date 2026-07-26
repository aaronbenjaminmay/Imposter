import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  variant: 'primary' | 'secondary';
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;

/**
 * Figma: "02 — Components" > Button (component set 9:13).
 * Primary = the dominant CTA for a screen (Start Game, Continue, Lock In
 * Vote, Play Again). Secondary = a supporting action (New Game, How to
 * Play). Always full-width in Figma — every usage is `alignSelf: stretch`.
 */
export function Button({ variant, children, type = 'button', ...rest }: ButtonProps) {
  return (
    <button type={type} className={`${styles.button} ${styles[variant]}`} {...rest}>
      {children}
    </button>
  );
}
