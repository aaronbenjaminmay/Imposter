import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import styles from './TextInput.module.css';

type TextInputProps = {
  label: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'id'>;

/**
 * Figma: "02 — Components" > Text Input (component set 10:8).
 * Label stays visible above the field in every state (WCAG 1.3.1/3.3.2)
 * — never a placeholder-only label. Figma's Default/Focused/Filled
 * states map to plain HTML/CSS here: Default vs. Filled is just
 * "has a value or not," which `::placeholder` already handles, and
 * Focused is the native `:focus-visible` style — no manual state needed.
 * Forwards its ref to the underlying <input> so screens can refocus it
 * (player-names needs this: "Focus returns to input after adding").
 */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  { label, ...rest },
  ref,
) {
  const id = useId();
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input id={id} ref={ref} className={styles.input} {...rest} />
    </div>
  );
});
