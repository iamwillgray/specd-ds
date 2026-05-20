export type ButtonVariant = 'primary' | 'ghost' | 'accent' | 'danger';
export type ButtonSize    = 'sm' | 'md' | 'lg';
export type ButtonType    = 'button' | 'submit' | 'reset';

/**
 * Props for the SpecdButton (`<specd-button>`) component.
 *
 * @example
 * // Web Component
 * <specd-button variant="primary" label="Scan now"></specd-button>
 *
 * // React (auto-generated wrapper)
 * <SpecdButton variant="primary" onClick={handleClick}>Scan now</SpecdButton>
 */
export interface ButtonProps {
  /** Button label text. If omitted, slot content is used instead. */
  label?: string;
  /** Visual style variant. @default 'primary' */
  variant?: ButtonVariant;
  /** Size. @default 'md' */
  size?: ButtonSize;
  /** Stretch to full container width. @default false */
  full?: boolean;
  /** Disabled state — prevents interaction. @default false */
  disabled?: boolean;
  /** Loading state — shows spinner, prevents interaction. @default false */
  loading?: boolean;
  /** HTML button type attribute. @default 'button' */
  type?: ButtonType;
  /** Raw SVG string rendered before the label. */
  icon?: string;
  /** Extra CSS class(es) added to the inner button element. */
  cls?: string;
}
