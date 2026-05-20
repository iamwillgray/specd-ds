export type ButtonVariant = 'primary' | 'ghost' | 'accent' | 'danger';
export type ButtonSize    = 'sm' | 'md' | 'lg';
export type ButtonType    = 'button' | 'submit' | 'reset';

/**
 * Props for the AdmiralButton (`<admiral-button>`) component.
 *
 * @example
 * // Web Component
 * <admiral-button variant="primary" label="Scan now"></admiral-button>
 *
 * // React (auto-generated wrapper)
 * <AdmiralButton variant="primary" onClick={handleClick}>Scan now</AdmiralButton>
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
