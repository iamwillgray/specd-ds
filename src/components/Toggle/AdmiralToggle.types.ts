/**
 * Props for the AdmiralToggle (`<admiral-toggle>`) component.
 *
 * @example
 * <admiral-toggle id="dark-mode" checked aria-label="Dark mode"></admiral-toggle>
 */
export interface ToggleProps {
  /** HTML id on the inner checkbox input (required for label association). */
  id: string;
  /** Checked state. @default false */
  checked?: boolean;
  /** Disabled state. @default false */
  disabled?: boolean;
  /** Accessible label. Applied as aria-label on the wrapper. */
  ariaLabel?: string;
}
